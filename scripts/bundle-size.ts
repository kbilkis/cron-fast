#!/usr/bin/env node
/**
 * Analyze bundle sizes for different import scenarios
 */
import { build } from "esbuild";
import { gzipSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const rootDir = process.cwd();
const indexPath = join(rootDir, "src/index.ts");

const scenarios = [
  {
    name: "Full bundle (all exports)",
    code: `import * as cron from "${indexPath}";
console.log(cron);`,
  },
  {
    name: "nextRun only",
    code: `import { nextRun } from "${indexPath}";
console.log(nextRun);`,
  },
  {
    name: "previousRun only",
    code: `import { previousRun } from "${indexPath}";
console.log(previousRun);`,
  },
  {
    name: "nextRuns only",
    code: `import { nextRuns } from "${indexPath}";
console.log(nextRuns);`,
  },
  {
    name: "isValid only",
    code: `import { isValid } from "${indexPath}";
console.log(isValid);`,
  },
  {
    name: "parse only",
    code: `import { parse } from "${indexPath}";
console.log(parse);`,
  },
  {
    name: "isMatch only",
    code: `import { isMatch } from "${indexPath}";
console.log(isMatch);`,
  },
  {
    name: "Validation only (isValid + parse)",
    code: `import { isValid, parse } from "${indexPath}";
console.log(isValid, parse);`,
  },
  {
    name: "Scheduling only (nextRun + previousRun + nextRuns)",
    code: `import { nextRun, previousRun, nextRuns } from "${indexPath}";
console.log(nextRun, previousRun, nextRuns);`,
  },
];

interface BundleResult {
  name: string;
  raw: number;
  minified: number;
  gzipped: number;
}

async function analyzeBundle(name: string, code: string): Promise<BundleResult> {
  const tempDir = join(process.cwd(), ".bundle-analysis");
  mkdirSync(tempDir, { recursive: true });

  const entryFile = join(tempDir, "entry.ts");
  writeFileSync(entryFile, code);

  // Build with esbuild
  const result = await build({
    entryPoints: [entryFile],
    bundle: true,
    minify: true,
    format: "esm",
    target: "es2020",
    write: false,
    treeShaking: true,
  });

  const minified = result.outputFiles[0].contents;
  const minifiedSize = minified.length;

  // Build without minification for raw size
  const rawResult = await build({
    entryPoints: [entryFile],
    bundle: true,
    minify: false,
    format: "esm",
    target: "es2020",
    write: false,
    treeShaking: true,
  });

  const raw = rawResult.outputFiles[0].contents;
  const rawSize = raw.length;

  // Gzip the minified bundle
  const gzipped = gzipSync(minified);
  const gzippedSize = gzipped.length;

  return {
    name,
    raw: rawSize,
    minified: minifiedSize,
    gzipped: gzippedSize,
  };
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  console.log("📦 Analyzing bundle sizes...\n");

  const results: BundleResult[] = [];

  for (const scenario of scenarios) {
    const result = await analyzeBundle(scenario.name, scenario.code);
    results.push(result);
  }

  // Print results
  console.log("Bundle Size Analysis");
  console.log("=".repeat(80));
  console.log(
    `${"Scenario".padEnd(50)} ${"Raw".padStart(10)} ${"Minified".padStart(10)} ${"Gzipped".padStart(10)}`,
  );
  console.log("-".repeat(80));

  for (const result of results) {
    console.log(
      `${result.name.padEnd(50)} ${formatBytes(result.raw).padStart(10)} ${formatBytes(result.minified).padStart(10)} ${formatBytes(result.gzipped).padStart(10)}`,
    );
  }

  console.log("=".repeat(80));

  // Generate markdown table
  console.log("\n📝 Markdown for README:\n");
  console.log("| Import | Raw | Minified | Gzipped |");
  console.log("|--------|-----|----------|---------|");

  for (const result of results) {
    console.log(
      `| \`${result.name}\` | ${formatBytes(result.raw)} | ${formatBytes(result.minified)} | **${formatBytes(result.gzipped)}** |`,
    );
  }

  console.log("\n✅ Done!");
}

main().catch(console.error);
