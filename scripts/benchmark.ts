import { nextRun, previousRun, isValid, parse } from "../src/index.js";
import { Cron } from "croner";
import { CronExpressionParser } from "cron-parser";
import { parseCronExpression } from "cron-schedule";
import cronValidateModule from "cron-validate";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cronValidate = (cronValidateModule as any).default || cronValidateModule;

// Get library versions
const rootDir = process.cwd();
const getVersion = (pkg: string) => {
  try {
    const pkgJson = JSON.parse(
      readFileSync(join(rootDir, "node_modules", pkg, "package.json"), "utf-8"),
    );
    return pkgJson.version;
  } catch {
    return "unknown";
  }
};

const versions = {
  "cron-fast": JSON.parse(readFileSync(join(rootDir, "package.json"), "utf-8")).version,
  croner: getVersion("croner"),
  "cron-parser": getVersion("cron-parser"),
  "cron-schedule": getVersion("cron-schedule"),
  "cron-validate": getVersion("cron-validate"),
};

interface BenchmarkResult {
  name: string;
  library: string;
  opsPerSecond: number;
  avgTimeMs: number;
  iterations: number;
}

function benchmark(
  name: string,
  library: string,
  fn: () => void,
  durationMs = 1000,
): BenchmarkResult {
  // Warmup
  for (let i = 0; i < 100; i++) {
    fn();
  }

  // Actual benchmark - run for fixed duration
  let iterations = 0;
  const start = performance.now();
  const endTime = start + durationMs;

  while (performance.now() < endTime) {
    fn();
    iterations++;
  }

  const end = performance.now();
  const totalTimeMs = end - start;
  const avgTimeMs = totalTimeMs / iterations;
  const opsPerSecond = Math.round(1000 / avgTimeMs);

  return {
    name,
    library,
    opsPerSecond,
    avgTimeMs,
    iterations,
  };
}

function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

console.log("🚀 Cron Scheduler Benchmark - Library Comparison\n");
console.log("Library versions:");
Object.entries(versions).forEach(([lib, ver]) => {
  console.log(`  ${lib.padEnd(15)}: v${ver}`);
});
console.log("\nComparing: cron-fast vs croner vs cron-parser vs cron-schedule vs cron-validate\n");

const testCases = [
  {
    name: "Next minute",
    cron: "* * * * *",
    from: new Date("2026-01-15T10:30:00Z"),
  },
  {
    name: "Specific time today",
    cron: "0 15 * * *",
    from: new Date("2026-01-15T10:30:00Z"),
  },
  {
    name: "Next day at midnight",
    cron: "0 0 * * *",
    from: new Date("2026-01-15T23:30:00Z"),
  },
  {
    name: "Next Monday",
    cron: "0 9 * * 1",
    from: new Date("2026-01-15T10:00:00Z"),
  },
  {
    name: "First of next month",
    cron: "0 0 1 * *",
    from: new Date("2026-01-15T10:00:00Z"),
  },
  {
    name: "31st of month (skips Feb)",
    cron: "0 12 31 * *",
    from: new Date("2026-02-15T10:00:00Z"),
  },
  {
    name: "Every 15 minutes",
    cron: "*/15 * * * *",
    from: new Date("2026-01-15T10:07:00Z"),
  },
  {
    name: "Christmas at noon",
    cron: "0 12 25 12 *",
    from: new Date("2026-01-15T10:00:00Z"),
  },
];

const results: BenchmarkResult[] = [];

console.log("Running benchmarks (1 second per test)...\n");

// Benchmark 1: nextRun/next execution
console.log("📅 Benchmark 1: Next Execution Time\n");

for (const testCase of testCases) {
  // cron-fast
  results.push(
    benchmark(testCase.name, "cron-fast", () => {
      nextRun(testCase.cron, { from: testCase.from });
    }),
  );

  // croner
  results.push(
    benchmark(testCase.name, "croner", () => {
      const job = new Cron(testCase.cron, { startAt: testCase.from, paused: true });
      job.nextRun(testCase.from);
    }),
  );

  // cron-parser
  results.push(
    benchmark(testCase.name, "cron-parser", () => {
      const interval = CronExpressionParser.parse(testCase.cron, {
        currentDate: testCase.from,
      });
      interval.next().toDate();
    }),
  );

  // cron-schedule
  results.push(
    benchmark(testCase.name, "cron-schedule", () => {
      const cron = parseCronExpression(testCase.cron);
      cron.getNextDate(testCase.from);
    }),
  );
}

// Benchmark 2: previousRun/prev execution
console.log("📅 Benchmark 2: Previous Execution Time\n");

const prevResults: BenchmarkResult[] = [];

for (const testCase of testCases) {
  // cron-fast
  prevResults.push(
    benchmark(testCase.name, "cron-fast", () => {
      previousRun(testCase.cron, { from: testCase.from });
    }),
  );

  // croner
  prevResults.push(
    benchmark(testCase.name, "croner", () => {
      const job = new Cron(testCase.cron, { startAt: testCase.from, paused: true });
      job.previousRuns(1, testCase.from);
    }),
  );

  // cron-parser
  prevResults.push(
    benchmark(testCase.name, "cron-parser", () => {
      const interval = CronExpressionParser.parse(testCase.cron, {
        currentDate: testCase.from,
      });
      interval.prev().toDate();
    }),
  );

  // cron-schedule
  prevResults.push(
    benchmark(testCase.name, "cron-schedule", () => {
      const cron = parseCronExpression(testCase.cron);
      cron.getPrevDate(testCase.from);
    }),
  );
}

// Benchmark 3: Validation
console.log("✅ Benchmark 3: Validation\n");

const validationResults: BenchmarkResult[] = [];
const validationCases = testCases.map((tc) => tc.cron);

for (const cronExpr of validationCases) {
  // cron-fast
  validationResults.push(
    benchmark(cronExpr, "cron-fast", () => {
      isValid(cronExpr);
    }),
  );

  // croner
  validationResults.push(
    benchmark(cronExpr, "croner", () => {
      try {
        new Cron(cronExpr, { paused: true });
      } catch {
        // Invalid
      }
    }),
  );

  // cron-parser
  validationResults.push(
    benchmark(cronExpr, "cron-parser", () => {
      try {
        CronExpressionParser.parse(cronExpr);
      } catch {
        // Invalid
      }
    }),
  );

  // cron-schedule
  validationResults.push(
    benchmark(cronExpr, "cron-schedule", () => {
      try {
        parseCronExpression(cronExpr);
      } catch {
        // Invalid
      }
    }),
  );

  // cron-validate
  validationResults.push(
    benchmark(cronExpr, "cron-validate", () => {
      cronValidate(cronExpr);
    }),
  );
}

// Benchmark 4: Parsing
console.log("🔍 Benchmark 4: Parsing\n");

const parseResults: BenchmarkResult[] = [];

for (const cronExpr of validationCases) {
  // cron-fast
  parseResults.push(
    benchmark(cronExpr, "cron-fast", () => {
      parse(cronExpr);
    }),
  );

  // croner
  parseResults.push(
    benchmark(cronExpr, "croner", () => {
      new Cron(cronExpr, { paused: true });
    }),
  );

  // cron-parser
  parseResults.push(
    benchmark(cronExpr, "cron-parser", () => {
      CronExpressionParser.parse(cronExpr);
    }),
  );

  // cron-schedule
  parseResults.push(
    benchmark(cronExpr, "cron-schedule", () => {
      parseCronExpression(cronExpr);
    }),
  );

  // cron-validate
  parseResults.push(
    benchmark(cronExpr, "cron-validate", () => {
      cronValidate(cronExpr);
    }),
  );
}

// Helper function to print results table
function printResultsTable(
  title: string,
  results: BenchmarkResult[],
  libraries: string[],
  testNames: string[],
) {
  console.log(`\n${title}\n`);

  const colWidth = 14;
  const nameWidth = 33;

  // Header
  const header = `│ ${"Test Case".padEnd(nameWidth)} │ ${libraries.map((lib) => lib.padStart(colWidth)).join(" │ ")} │`;
  const separator = `├─${"─".repeat(nameWidth)}─┼─${libraries.map(() => "─".repeat(colWidth)).join("─┼─")}─┤`;
  const topBorder = `┌─${"─".repeat(nameWidth)}─┬─${libraries.map(() => "─".repeat(colWidth)).join("─┬─")}─┐`;
  const bottomBorder = `└─${"─".repeat(nameWidth)}─┴─${libraries.map(() => "─".repeat(colWidth)).join("─┴─")}─┘`;

  console.log(topBorder);
  console.log(header);
  console.log(separator);

  testNames.forEach((testName) => {
    const name = testName.padEnd(nameWidth);
    const values = libraries.map((lib) => {
      const result = results.find((r) => r.name === testName && r.library === lib);
      return result
        ? formatNumber(result.opsPerSecond).padStart(colWidth)
        : "N/A".padStart(colWidth);
    });
    console.log(`│ ${name} │ ${values.join(" │ ")} │`);
  });

  console.log(bottomBorder);

  // Calculate and display averages
  console.log("\n📊 Average Performance:");
  libraries.forEach((lib) => {
    const libResults = results.filter((r) => r.library === lib);
    const avg = Math.round(
      libResults.reduce((sum, r) => sum + r.opsPerSecond, 0) / libResults.length,
    );
    console.log(`   ${lib.padEnd(15)}: ${formatNumber(avg)} ops/sec`);
  });

  // Calculate speedup vs cron-fast
  const cronFastResults = results.filter((r) => r.library === "cron-fast");
  const cronFastAvg = Math.round(
    cronFastResults.reduce((sum, r) => sum + r.opsPerSecond, 0) / cronFastResults.length,
  );

  console.log("\n⚡ Speedup vs cron-fast:");
  libraries.forEach((lib) => {
    if (lib !== "cron-fast") {
      const libResults = results.filter((r) => r.library === lib);
      const libAvg = Math.round(
        libResults.reduce((sum, r) => sum + r.opsPerSecond, 0) / libResults.length,
      );
      const speedup = (cronFastAvg / libAvg).toFixed(1);
      console.log(
        `   ${lib.padEnd(15)}: ${speedup}x ${cronFastAvg > libAvg ? "faster" : "slower"}`,
      );
    }
  });
}

function updateReadme(
  nextAvgs: Record<string, number>,
  prevAvgs: Record<string, number>,
  validationAvgs: Record<string, number>,
  parseAvgs: Record<string, number>,
): void {
  const readmePath = join(rootDir, "README.md");
  let readme = readFileSync(readmePath, "utf-8");

  // Update version line
  const versionLine = `> Tested with cron-fast v${versions["cron-fast"]}, croner v${versions.croner}, cron-parser v${versions["cron-parser"]}, cron-schedule v${versions["cron-schedule"]}`;
  readme = readme.replace(/> Tested with cron-fast v.*\n/, versionLine + "\n");

  // Find and replace the performance table
  const tableStart = readme.indexOf("| Operation");
  const tableEnd = readme.indexOf("\nSee [detailed benchmarks and feature comparison]");

  if (tableStart === -1 || tableEnd === -1) {
    throw new Error("Could not find performance table in README.md");
  }

  const formatOps = (n: number) => `${Math.round(n / 1000)}k ops/s`;

  const newTable = `| Operation    | cron-fast              | croner                 | cron-parser            | cron-schedule          |
| ------------ | ---------------------- | ---------------------- | ---------------------- | ---------------------- |
| Next run     | **${formatOps(nextAvgs["cron-fast"])}** | ${formatOps(nextAvgs.croner)} | ${formatOps(nextAvgs["cron-parser"])} | ${formatOps(nextAvgs["cron-schedule"])} |
| Previous run | **${formatOps(prevAvgs["cron-fast"])}** | ${formatOps(prevAvgs.croner)} | ${formatOps(prevAvgs["cron-parser"])} | ${formatOps(prevAvgs["cron-schedule"])} |
| Validation   | **${formatOps(validationAvgs["cron-fast"])}** | ${formatOps(validationAvgs.croner)} | ${formatOps(validationAvgs["cron-parser"])} | ${formatOps(validationAvgs["cron-schedule"])} |
| Parsing      | **${formatOps(parseAvgs["cron-fast"])}** | ${formatOps(parseAvgs.croner)} | ${formatOps(parseAvgs["cron-parser"])} | ${formatOps(parseAvgs["cron-schedule"])} |
`;

  readme = readme.slice(0, tableStart) + newTable + readme.slice(tableEnd);

  writeFileSync(readmePath, readme, "utf-8");
  console.log("  ✓ Updated README.md");
}

function updateBenchmarkDoc(
  results: BenchmarkResult[],
  prevResults: BenchmarkResult[],
  validationResults: BenchmarkResult[],
  parseResults: BenchmarkResult[],
): void {
  const docPath = join(rootDir, "docs/benchmark-comparison.md");
  let doc = readFileSync(docPath, "utf-8");

  // Update the version line
  const versionLine = `> Tested with cron-fast v${versions["cron-fast"]}, croner v${versions.croner}, cron-parser v${versions["cron-parser"]}, cron-schedule v${versions["cron-schedule"]}, cron-validate v${versions["cron-validate"]}`;
  doc = doc.replace(/> Tested with.*\n/, versionLine + "\n");

  // Helper to calculate averages
  const calcAvg = (results: BenchmarkResult[], lib: string) => {
    const libResults = results.filter((r) => r.library === lib);
    return Math.round(libResults.reduce((sum, r) => sum + r.opsPerSecond, 0) / libResults.length);
  };

  // Helper to format ops/sec
  const formatOps = (n: number) => `~${Math.round(n / 1000)}k`;

  // Helper to calculate speedup
  const calcSpeedup = (cronFastAvg: number, libAvg: number) => {
    const ratio = cronFastAvg / libAvg;
    return ratio > 1 ? `${ratio.toFixed(1)}x faster` : `${(1 / ratio).toFixed(1)}x slower`;
  };

  // Calculate averages for each benchmark
  const nextAvgs = {
    "cron-fast": calcAvg(results, "cron-fast"),
    croner: calcAvg(results, "croner"),
    "cron-parser": calcAvg(results, "cron-parser"),
    "cron-schedule": calcAvg(results, "cron-schedule"),
  };

  const prevAvgs = {
    "cron-fast": calcAvg(prevResults, "cron-fast"),
    croner: calcAvg(prevResults, "croner"),
    "cron-parser": calcAvg(prevResults, "cron-parser"),
    "cron-schedule": calcAvg(prevResults, "cron-schedule"),
  };

  const validationAvgs = {
    "cron-fast": calcAvg(validationResults, "cron-fast"),
    croner: calcAvg(validationResults, "croner"),
    "cron-parser": calcAvg(validationResults, "cron-parser"),
    "cron-schedule": calcAvg(validationResults, "cron-schedule"),
    "cron-validate": calcAvg(validationResults, "cron-validate"),
  };

  const parseAvgs = {
    "cron-fast": calcAvg(parseResults, "cron-fast"),
    croner: calcAvg(parseResults, "croner"),
    "cron-parser": calcAvg(parseResults, "cron-parser"),
    "cron-schedule": calcAvg(parseResults, "cron-schedule"),
    "cron-validate": calcAvg(parseResults, "cron-validate"),
  };

  // Update Next Execution Time table
  const nextTable = `| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ${formatOps(nextAvgs["cron-fast"])} | baseline |
| cron-schedule | ${formatOps(nextAvgs["cron-schedule"])} | ${calcSpeedup(nextAvgs["cron-fast"], nextAvgs["cron-schedule"])} |
| croner        | ${formatOps(nextAvgs.croner)} | ${calcSpeedup(nextAvgs["cron-fast"], nextAvgs.croner)} |
| cron-parser   | ${formatOps(nextAvgs["cron-parser"])} | ${calcSpeedup(nextAvgs["cron-fast"], nextAvgs["cron-parser"])} |`;

  doc = doc.replace(
    /### Next Execution Time\n\n\| Library.*?\n\| -.*?\n(?:\| .*?\n)+/s,
    `### Next Execution Time\n\n${nextTable}\n`,
  );

  // Update Previous Execution Time table
  const prevTable = `| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ${formatOps(prevAvgs["cron-fast"])} | baseline |
| cron-schedule | ${formatOps(prevAvgs["cron-schedule"])} | ${calcSpeedup(prevAvgs["cron-fast"], prevAvgs["cron-schedule"])} |
| croner        | ${formatOps(prevAvgs.croner)} | ${calcSpeedup(prevAvgs["cron-fast"], prevAvgs.croner)} |
| cron-parser   | ${formatOps(prevAvgs["cron-parser"])} | ${calcSpeedup(prevAvgs["cron-fast"], prevAvgs["cron-parser"])} |`;

  doc = doc.replace(
    /### Previous Execution Time\n\n\| Library.*?\n\| -.*?\n(?:\| .*?\n)+/s,
    `### Previous Execution Time\n\n${prevTable}\n`,
  );

  // Update Validation table
  const validationTable = `| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ${formatOps(validationAvgs["cron-fast"])} | baseline |
| cron-validate | ${formatOps(validationAvgs["cron-validate"])} | ${calcSpeedup(validationAvgs["cron-fast"], validationAvgs["cron-validate"])} |
| cron-schedule | ${formatOps(validationAvgs["cron-schedule"])} | ${calcSpeedup(validationAvgs["cron-fast"], validationAvgs["cron-schedule"])} |
| cron-parser   | ${formatOps(validationAvgs["cron-parser"])} | ${calcSpeedup(validationAvgs["cron-fast"], validationAvgs["cron-parser"])} |
| croner        | ${formatOps(validationAvgs.croner)} | ${calcSpeedup(validationAvgs["cron-fast"], validationAvgs.croner)} |`;

  doc = doc.replace(
    /### Validation\n\n\| Library.*?\n\| -.*?\n(?:\| .*?\n)+/s,
    `### Validation\n\n${validationTable}\n`,
  );

  // Update Parsing table
  const parseTable = `| Library       | Avg ops/sec | vs cron-fast |
| ------------- | ----------- | ------------ |
| **cron-fast** | ${formatOps(parseAvgs["cron-fast"])} | baseline |
| cron-validate | ${formatOps(parseAvgs["cron-validate"])} | ${calcSpeedup(parseAvgs["cron-fast"], parseAvgs["cron-validate"])} |
| cron-schedule | ${formatOps(parseAvgs["cron-schedule"])} | ${calcSpeedup(parseAvgs["cron-fast"], parseAvgs["cron-schedule"])} |
| cron-parser   | ${formatOps(parseAvgs["cron-parser"])} | ${calcSpeedup(parseAvgs["cron-fast"], parseAvgs["cron-parser"])} |
| croner        | ${formatOps(parseAvgs.croner)} | ${calcSpeedup(parseAvgs["cron-fast"], parseAvgs.croner)} |`;

  doc = doc.replace(
    /### Parsing\n\n\| Library.*?\n\| -.*?\n(?:\| .*?\n)+/s,
    `### Parsing\n\n${parseTable}\n`,
  );

  writeFileSync(docPath, doc, "utf-8");
  console.log("  ✓ Updated docs/benchmark-comparison.md");
}

// Print all results
const testNames = testCases.map((tc) => tc.name);
const allLibraries = ["cron-fast", "croner", "cron-parser", "cron-schedule"];
const allLibrariesWithValidate = [
  "cron-fast",
  "croner",
  "cron-parser",
  "cron-schedule",
  "cron-validate",
];

const shouldUpdate = process.argv.includes("--update");

if (!shouldUpdate) {
  printResultsTable("📅 Next Execution Time Results", results, allLibraries, testNames);
  printResultsTable("📅 Previous Execution Time Results", prevResults, allLibraries, testNames);
  printResultsTable(
    "✅ Validation Results",
    validationResults,
    allLibrariesWithValidate,
    validationCases,
  );
  printResultsTable("🔍 Parsing Results", parseResults, allLibrariesWithValidate, validationCases);

  console.log(`\n✨ All benchmarks completed (1 second per test)\n`);
  console.log("💡 Run with --update flag to update README.md and docs/benchmark-comparison.md\n");
} else {
  console.log("\n📝 Updating documentation...\n");

  // Calculate averages for each benchmark type
  const calcAvg = (results: BenchmarkResult[], lib: string) => {
    const libResults = results.filter((r) => r.library === lib);
    return Math.round(libResults.reduce((sum, r) => sum + r.opsPerSecond, 0) / libResults.length);
  };

  const nextAvgs = {
    "cron-fast": calcAvg(results, "cron-fast"),
    croner: calcAvg(results, "croner"),
    "cron-parser": calcAvg(results, "cron-parser"),
    "cron-schedule": calcAvg(results, "cron-schedule"),
  };

  const prevAvgs = {
    "cron-fast": calcAvg(prevResults, "cron-fast"),
    croner: calcAvg(prevResults, "croner"),
    "cron-parser": calcAvg(prevResults, "cron-parser"),
    "cron-schedule": calcAvg(prevResults, "cron-schedule"),
  };

  const validationAvgs = {
    "cron-fast": calcAvg(validationResults, "cron-fast"),
    croner: calcAvg(validationResults, "croner"),
    "cron-parser": calcAvg(validationResults, "cron-parser"),
    "cron-schedule": calcAvg(validationResults, "cron-schedule"),
    "cron-validate": calcAvg(validationResults, "cron-validate"),
  };

  const parseAvgs = {
    "cron-fast": calcAvg(parseResults, "cron-fast"),
    croner: calcAvg(parseResults, "croner"),
    "cron-parser": calcAvg(parseResults, "cron-parser"),
    "cron-schedule": calcAvg(parseResults, "cron-schedule"),
    "cron-validate": calcAvg(parseResults, "cron-validate"),
  };

  updateReadme(nextAvgs, prevAvgs, validationAvgs, parseAvgs);
  updateBenchmarkDoc(results, prevResults, validationResults, parseResults);

  console.log("✅ Documentation updated successfully!\n");
}
