import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// --- Types ---

interface NormalizedResult {
  category: "nextRun" | "nextRuns" | "previousRun" | "validation" | "parsing";
  testCase: string;
  library: string;
  opsPerSecond: number;
  meanNs?: number;
  p99Ns?: number;
  rme?: number;
}

type Category = NormalizedResult["category"];

const EXEC_LIBS = ["cron-fast", "cron-schedule", "cron-parser", "croner"] as const;
const VALIDATE_LIBS = [
  "cron-fast",
  "cron-schedule",
  "cron-parser",
  "croner",
  "cron-validate",
] as const;

// --- Parsers ---

function normalizeCategory(cat: string): Category {
  switch (cat) {
    case "nextRun":
      return "nextRun";
    case "nextRuns":
      return "nextRuns";
    case "previousRun":
      return "previousRun";
    case "validation":
    case "validate":
      return "validation";
    case "parsing":
    case "parse":
      return "parsing";
    default:
      throw new Error(`Unknown category: ${cat}`);
  }
}

function parseVitest(json: any): { results: NormalizedResult[]; runtimeVer: string } {
  const results: NormalizedResult[] = [];
  for (const file of json.files ?? []) {
    for (const group of file.groups ?? []) {
      const parts = group.fullName.split(" > ");
      const groupName = parts[parts.length - 1];
      const colonIdx = groupName.indexOf(": ");
      const category = normalizeCategory(groupName.substring(0, colonIdx));
      const testCase = groupName.substring(colonIdx + 2);

      for (const bench of group.benchmarks ?? []) {
        results.push({
          category,
          testCase,
          library: bench.name,
          opsPerSecond: bench.hz,
          meanNs: bench.mean != null ? bench.mean * 1e6 : undefined,
          p99Ns: bench.p99 != null ? bench.p99 * 1e6 : undefined,
          rme: bench.rme,
        });
      }
    }
  }
  return { results, runtimeVer: process.version.slice(1) };
}

function parseDeno(json: any): { results: NormalizedResult[]; runtimeVer: string } {
  const results: NormalizedResult[] = [];
  const runtimeVer = (json.runtime ?? "").replace(/Deno\//, "").split(" ")[0] || "unknown";
  for (const bench of json.benches ?? []) {
    const colonIdx = bench.group.indexOf(": ");
    const category = normalizeCategory(bench.group.substring(0, colonIdx));
    const testCase = bench.group.substring(colonIdx + 2);

    const libMatch = bench.name.match(/\(([^)]+)\)$/);
    const library = libMatch ? libMatch[1] : "unknown";
    const ok = bench.results?.[0]?.ok;
    const avg = ok?.avg;
    if (avg == null) continue;

    results.push({
      category,
      testCase,
      library,
      opsPerSecond: 1e9 / avg,
      meanNs: avg,
      p99Ns: ok?.p99,
    });
  }
  return { results, runtimeVer };
}

function parseMitata(json: any): { results: NormalizedResult[]; runtimeVer: string } {
  const results: NormalizedResult[] = [];
  for (const bench of json.benchmarks ?? []) {
    const alias: string = bench.alias ?? "";
    const colonIdx = alias.indexOf(": ");
    if (colonIdx === -1) continue;
    const library = alias.substring(0, colonIdx);
    const rest = alias.substring(colonIdx + 2);

    const catMatch = rest.match(/^(nextRuns|nextRun|previousRun|validate|parse)\s+/);
    if (!catMatch) continue;
    const category = normalizeCategory(catMatch[1]);
    const testCase = rest.substring(catMatch[0].length);

    const stats = bench.runs?.[0]?.stats;
    const avg = stats?.avg;
    if (avg == null || avg === 0) continue;

    results.push({
      category,
      testCase,
      library,
      opsPerSecond: 1e9 / avg,
      meanNs: avg,
      p99Ns: stats?.p99,
    });
  }
  return { results, runtimeVer: "" };
}

// --- Helpers ---

function detectAndParse(jsonStr: string): { results: NormalizedResult[]; runtimeVer: string } {
  const json = JSON.parse(jsonStr);
  if (json.files) return parseVitest(json);
  if (json.runtime?.includes("Deno")) return parseDeno(json);
  if (json.benchmarks?.[0]?.alias) return parseMitata(json);
  throw new Error("Unrecognized JSON format");
}

function calcAvg(results: NormalizedResult[], category: Category, library: string): number {
  const filtered = results.filter((r) => r.category === category && r.library === library);
  if (filtered.length === 0) return 0;
  return Math.round(filtered.reduce((sum, r) => sum + r.opsPerSecond, 0) / filtered.length);
}

function formatOps(n: number): string {
  return `~${Math.round(n / 1000)}k`;
}

function formatNs(ns: number): string {
  return `${Math.round(ns).toLocaleString("en-US")} ns`;
}

function formatReadmeOps(n: number): string {
  return `${Math.round(n / 1000)}k ops/s`;
}

function calcSpeedup(cronFastAvg: number, libAvg: number): string {
  if (libAvg === 0) return "N/A";
  const ratio = cronFastAvg / libAvg;
  return ratio >= 1
    ? `${ratio.toFixed(1)}x faster`
    : `${(libAvg / cronFastAvg).toFixed(1)}x slower`;
}

function getVersion(pkg: string): string {
  try {
    const pkgJson = JSON.parse(
      readFileSync(join(process.cwd(), "node_modules", pkg, "package.json"), "utf-8"),
    );
    return pkgJson.version;
  } catch {
    return "unknown";
  }
}

// --- Doc generators ---

function updateReadme(
  results: NormalizedResult[],
  versions: Record<string, string>,
  runtimeVer: string,
): void {
  const readmePath = join(process.cwd(), "README.md");
  let readme = readFileSync(readmePath, "utf-8");

  const versionLine = `> Tested with cron-fast v${versions["cron-fast"]}, croner v${versions.croner}, cron-parser v${versions["cron-parser"]}, cron-schedule v${versions["cron-schedule"]} on Node.js v${runtimeVer}`;
  readme = readme.replace(/> Tested with cron-fast v.*\n/, versionLine + "\n");

  const libs = EXEC_LIBS;
  const categories: [string, Category][] = [
    ["Next run", "nextRun"],
    ["Next 100 runs", "nextRuns"],
    ["Previous run", "previousRun"],
    ["Validation", "validation"],
    ["Parsing", "parsing"],
  ];

  const rows = categories
    .map(([label, cat]) => {
      const cells = libs.map((lib) => {
        const avg = calcAvg(results, cat, lib);
        return lib === "cron-fast" ? `**${formatReadmeOps(avg)}**` : formatReadmeOps(avg);
      });
      return `| ${label} | ${cells.join(" | ")} |`;
    })
    .join("\n");

  const tableStart = readme.indexOf("| Operation");
  const tableEnd = readme.indexOf("\nSee [detailed benchmarks]");
  if (tableStart === -1 || tableEnd === -1) {
    throw new Error("Could not find performance table in README.md");
  }

  const newTable = `| Operation    | cron-fast       | cron-schedule | cron-parser | croner    |
| ------------ | --------------- | ------------- | ----------- | --------- |
${rows}
`;

  readme = readme.slice(0, tableStart) + newTable + readme.slice(tableEnd);
  writeFileSync(readmePath, readme, "utf-8");
  console.log("  ✓ Updated README.md");
}

function buildSummaryTable(
  results: NormalizedResult[],
  category: Category,
  libs: string[],
): string {
  const cronFastAvg = calcAvg(results, category, "cron-fast");
  const rows = libs.map((lib) => {
    const avg = calcAvg(results, category, lib);
    const speedup = lib === "cron-fast" ? "baseline" : calcSpeedup(cronFastAvg, avg);
    const name = lib === "cron-fast" ? `**${lib}**` : lib;
    return `| ${name.padEnd(13)} | ${formatOps(avg).padStart(11)} | ${speedup} |`;
  });

  return `| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
${rows.join("\n")}`;
}

function buildDetailedTable(
  results: NormalizedResult[],
  category: Category,
  testCases: string[],
  libs: string[],
): string {
  const header = `| Test Case | ${libs.join(" | ")} |`;
  const separator = `| --- | ${libs.map(() => "---:").join(" | ")} |`;

  const rows = testCases.map((tc) => {
    const cronFastOps =
      results.find((r) => r.category === category && r.testCase === tc && r.library === "cron-fast")
        ?.opsPerSecond ?? 0;

    const vals = libs.map((lib) => {
      const r = results.find(
        (x) => x.category === category && x.testCase === tc && x.library === lib,
      );
      if (!r) return "N/A";
      let cell = formatOps(r.opsPerSecond);
      if (r.rme != null) cell += ` ±${r.rme.toFixed(1)}%`;
      if (lib !== "cron-fast" && cronFastOps > 0) {
        const ratio = cronFastOps / r.opsPerSecond;
        if (ratio >= 1.1) return `${cell} ✓`;
        if (ratio <= 0.9) return `${cell} ✗`;
      }
      return cell;
    });
    return `| ${tc} | ${vals.join(" | ")} |`;
  });

  return [header, separator, ...rows].join("\n");
}

function buildLatencyTable(
  results: NormalizedResult[],
  category: Category,
  testCases: string[],
  libs: string[],
): string {
  const header = `| Test Case | ${libs.join(" | ")} |`;
  const separator = `| --- | ${libs.map(() => "---:").join(" | ")} |`;

  const rows = testCases.map((tc) => {
    const vals = libs.map((lib) => {
      const r = results.find(
        (x) => x.category === category && x.testCase === tc && x.library === lib,
      );
      if (!r?.meanNs) return "N/A";
      const mean = formatNs(r.meanNs);
      const p99 = r.p99Ns != null ? formatNs(r.p99Ns) : "—";
      return `${mean} / ${p99}`;
    });
    return `| ${tc} | ${vals.join(" | ")} |`;
  });

  return [header, separator, ...rows].join("\n");
}

function updateBenchmarkDoc(
  results: NormalizedResult[],
  runtime: string,
  runtimeVer: string,
  versions: Record<string, string>,
): void {
  const docPath = join(process.cwd(), `docs/benchmark-comparison-${runtime}.md`);
  let doc = readFileSync(docPath, "utf-8");

  const allLibs = [...EXEC_LIBS];
  const allLibsWithValidate = [...VALIDATE_LIBS];

  const testCases = [
    ...new Set(results.filter((r) => r.category === "nextRun").map((r) => r.testCase)),
  ];
  const nextRunsTestCases = [
    ...new Set(results.filter((r) => r.category === "nextRuns").map((r) => r.testCase)),
  ];
  const validationTestCases = [
    ...new Set(results.filter((r) => r.category === "validation").map((r) => r.testCase)),
  ];

  // Update version line
  const versionLine = `> Tested with ${runtime} v${runtimeVer}, cron-fast v${versions["cron-fast"]}, croner v${versions.croner}, cron-parser v${versions["cron-parser"]}, cron-schedule v${versions["cron-schedule"]}, cron-validate v${versions["cron-validate"]}`;
  doc = doc.replace(/> Tested with.*\n/, versionLine + "\n");

  // Update summary tables
  const tableConfigs: [string, Category, string[]][] = [
    ["Next Execution Time", "nextRun", allLibs],
    ["Next 100 Runs Time", "nextRuns", allLibs],
    ["Previous Execution Time", "previousRun", allLibs],
    ["Validation", "validation", allLibsWithValidate],
    ["Parsing", "parsing", allLibsWithValidate],
  ];

  for (const [heading, cat, libs] of tableConfigs) {
    const table = buildSummaryTable(results, cat, libs);
    const pattern = new RegExp(
      `### ${heading}\\n\\n\\| Library.*?\\n\\| -.*?\\n(?:\\| .*?\\n)+`,
      "s",
    );
    doc = doc.replace(pattern, `### ${heading}\n\n${table}\n`);
  }

  // Update detailed per-test section
  const detailedSection = `
## Detailed Per-Test Results

### Next Execution - Throughput (ops/sec)

${buildDetailedTable(results, "nextRun", testCases, [...EXEC_LIBS])}

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next Execution - Latency (mean / p99)

${buildLatencyTable(results, "nextRun", testCases, [...EXEC_LIBS])}

### Next 100 Runs - Throughput (ops/sec)

${buildDetailedTable(results, "nextRuns", nextRunsTestCases, [...EXEC_LIBS])}

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Next 100 Runs - Latency (mean / p99)

${buildLatencyTable(results, "nextRuns", nextRunsTestCases, [...EXEC_LIBS])}

### Previous Execution - Throughput (ops/sec)

${buildDetailedTable(results, "previousRun", testCases, [...EXEC_LIBS])}

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Previous Execution - Latency (mean / p99)

${buildLatencyTable(results, "previousRun", testCases, [...EXEC_LIBS])}

### Validation - Throughput (ops/sec)

${buildDetailedTable(results, "validation", validationTestCases, [...VALIDATE_LIBS])}

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Validation - Latency (mean / p99)

${buildLatencyTable(results, "validation", validationTestCases, [...VALIDATE_LIBS])}

### Parsing - Throughput (ops/sec)

${buildDetailedTable(results, "parsing", validationTestCases, [...VALIDATE_LIBS])}

✓ = cron-fast is faster (≥10% faster) | ✗ = cron-fast is slower (≥10% slower)

### Parsing - Latency (mean / p99)

${buildLatencyTable(results, "parsing", validationTestCases, [...VALIDATE_LIBS])}
`;

  if (doc.includes("## Detailed Per-Test Results")) {
    doc = doc.replace(/## Detailed Per-Test Results[\s\S]*$/, detailedSection.trim());
  } else {
    doc += "\n" + detailedSection;
  }

  writeFileSync(docPath, doc, "utf-8");
  console.log(`  ✓ Updated docs/benchmark-comparison-${runtime}.md`);
}

// --- Main ---

const runtime = process.argv[2] as string;
const jsonPath = process.argv[3] as string;
const runtimeVerOverride = process.argv[4];

if (!runtime || !jsonPath) {
  console.error(
    "Usage: tsx scripts/update-bench-docs.ts <node|deno|bun> <json-file> [runtime-version]",
  );
  process.exit(1);
}

const jsonStr = readFileSync(jsonPath, "utf-8");
const { results, runtimeVer: detectedVer } = detectAndParse(jsonStr);
const finalRuntimeVer = runtimeVerOverride || detectedVer || "unknown";

const versions: Record<string, string> = {
  "cron-fast": JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf-8")).version,
  croner: getVersion("croner"),
  "cron-parser": getVersion("cron-parser"),
  "cron-schedule": getVersion("cron-schedule"),
  "cron-validate": getVersion("cron-validate"),
};

console.log(`\n📝 Updating docs for ${runtime} v${finalRuntimeVer}...\n`);

updateBenchmarkDoc(results, runtime, finalRuntimeVer, versions);

if (runtime === "node") {
  updateReadme(results, versions, finalRuntimeVer);
}

console.log("\n✅ Documentation updated successfully!\n");
