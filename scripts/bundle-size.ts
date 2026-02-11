/**
 * Bundle size analysis script
 *
 * Usage:
 *   pnpm bundle-size          - Display bundle sizes only
 *   pnpm update-bundle-size   - Display and update README.md
 */
import { build } from "esbuild";
import { gzipSync } from "node:zlib";
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const rootDir = process.cwd();
const indexPath = join(rootDir, "src/index.ts");

// Get package version
const packageJson = JSON.parse(readFileSync(join(rootDir, "package.json"), "utf-8"));
const version = packageJson.version;

const scenarios = [
  {
    name: "Full bundle (all exports)",
    code: `import * as cron from "${indexPath}";\nconsole.log(cron);`,
  },
  {
    name: "nextRun only",
    code: `import { nextRun } from "${indexPath}";\nconsole.log(nextRun);`,
  },
  {
    name: "previousRun only",
    code: `import { previousRun } from "${indexPath}";\nconsole.log(previousRun);`,
  },
  {
    name: "nextRuns only",
    code: `import { nextRuns } from "${indexPath}";\nconsole.log(nextRuns);`,
  },
  {
    name: "isValid only",
    code: `import { isValid } from "${indexPath}";\nconsole.log(isValid);`,
  },
  {
    name: "parse only",
    code: `import { parse } from "${indexPath}";\nconsole.log(parse);`,
  },
  {
    name: "describe only",
    code: `import { describe } from "${indexPath}";\nconsole.log(describe);`,
  },
  {
    name: "isMatch only",
    code: `import { isMatch } from "${indexPath}";\nconsole.log(isMatch);`,
  },
  {
    name: "Validation only (isValid + parse)",
    code: `import { isValid, parse } from "${indexPath}";\nconsole.log(isValid, parse);`,
  },
  {
    name: "Scheduling only (nextRun + previousRun + nextRuns)",
    code: `import { nextRun, previousRun, nextRuns } from "${indexPath}";\nconsole.log(nextRun, previousRun, nextRuns);`,
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

function generateMarkdownTable(results: BundleResult[]): string {
  const rows = results.map((result) => {
    const name = result.name.padEnd(52);
    const raw = formatBytes(result.raw).padStart(8);
    const minified = formatBytes(result.minified).padStart(7);
    const gzipped = `**${formatBytes(result.gzipped)}**`.padStart(13);
    return `| \`${name}\` | ${raw} | ${minified} | ${gzipped} |`;
  });

  return [
    "| Import                                               | Raw      | Minified | Gzipped     |",
    "| ---------------------------------------------------- | -------- | -------- | ----------- |",
    ...rows,
  ].join("\n");
}

function updateReadme(table: string): void {
  const readmePath = join(rootDir, "README.md");
  let readme = readFileSync(readmePath, "utf-8");

  // Update version in the bundle size section header
  const versionPattern = /\(tested with v[\d.]+\)/;
  readme = readme.replace(versionPattern, `(tested with v${version})`);

  // Find the bundle size table and replace it
  const tableStart = readme.indexOf("| Import");
  const tableEnd = readme.indexOf("\n\nImport only what you need:");

  if (tableStart === -1 || tableEnd === -1) {
    throw new Error("Could not find bundle size table in README.md");
  }

  readme = readme.slice(0, tableStart) + table + readme.slice(tableEnd);

  writeFileSync(readmePath, readme, "utf-8");
  console.log("✅ README.md updated successfully!");
}

async function main() {
  const shouldUpdate = process.argv.includes("--update");

  console.log(`📦 cron-fast v${version} - Bundle Size Analysis\n`);
  console.log("Analyzing bundle sizes...\n");

  const results: BundleResult[] = [];

  for (const scenario of scenarios) {
    const result = await analyzeBundle(scenario.name, scenario.code);
    results.push(result);
    console.log(`✓ ${scenario.name}: ${formatBytes(result.gzipped)} gzipped`);
  }

  if (shouldUpdate) {
    console.log("\n📝 Generating markdown table...");
    const table = generateMarkdownTable(results);

    console.log("\n📄 Updating README.md...");
    updateReadme(table);
  } else {
    console.log("\n✅ Bundle size analysis complete!");
    console.log("💡 Run with --update flag to update README.md");
  }
}

main().catch(console.error);
