#!/usr/bin/env node
import { previousRun, nextRuns, isValid, parse, describe, isMatch } from "./index.js";

interface CliOptions {
  expression: string;
  next?: number;
  prev?: number;
  timezone?: string;
  from?: Date;
  describe: boolean;
  validate: boolean;
  json: boolean;
  match?: Date;
  help: boolean;
}

function showHelp(): void {
  console.log(`Usage: cron-fast <expression> [options]

A command-line tool for cron-fast — fast and tiny cron parser.

Options:
  --next <n>      Show next N execution times
  --prev <n>      Show previous N execution times
  --tz <zone>     IANA timezone (e.g., America/New_York)
  --from <date>   Reference date in ISO 8601 format
  --describe      Output human-readable description
  --validate      Exit 0 if valid, 1 if invalid (no output)
  --match <date>  Check if date matches the expression
  --json          Output results as JSON
  --help          Show this help message

Examples:
  cron-fast "0 9 * * 1-5" --next 5 --tz America/New_York
  cron-fast "*/15 * * * *" --describe
  cron-fast "0 0 1 * *" --validate
  cron-fast "0 9 * * *" --match 2026-03-16T09:00:00Z --tz Europe/London
`);
}

function parseArgError(flag: string, value: string): never {
  console.error(`Error: Invalid value for ${flag}: ${value}`);
  process.exit(1);
}

function parseArgs(argv: string[]): CliOptions {
  const args = argv.slice(2);
  if (args.length === 0 || args.includes("--help")) {
    return { expression: "", help: true, describe: false, validate: false, json: false };
  }

  const options: CliOptions = {
    expression: "",
    describe: false,
    validate: false,
    json: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (!arg.startsWith("-")) {
      if (!options.expression) options.expression = arg;
      continue;
    }

    switch (arg) {
      case "--next":
      case "--prev": {
        const value = args[++i];
        if (value === undefined) break;
        const n = parseInt(value, 10);
        if (!Number.isFinite(n) || n < 0) parseArgError(arg, value);
        if (arg === "--next") options.next = n;
        else options.prev = n;
        break;
      }
      case "--tz": {
        const value = args[++i];
        if (value === undefined) break;
        options.timezone = value;
        break;
      }
      case "--from":
      case "--match": {
        const value = args[++i];
        if (value === undefined) break;
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) parseArgError(arg, value);
        if (arg === "--from") options.from = d;
        else options.match = d;
        break;
      }
      case "--describe":
        options.describe = true;
        break;
      case "--validate":
        options.validate = true;
        break;
      case "--json":
        options.json = true;
        break;
      case "--help":
        options.help = true;
        break;
    }
  }

  return options;
}

function formatLocal(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "shortOffset",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  // Some environments render midnight as hour 24 (h24 cycle); fold back to 0.
  const hour = String(Number(get("hour")) % 24).padStart(2, "0");
  return `${get("weekday")} ${get("month")} ${get("day")} ${hour}:${get("minute")}:${get("second")} ${get("timeZoneName")}`;
}

function formatRun(date: Date, timezone?: string): string {
  try {
    const iso = date.toISOString();
    return `${iso}  (${formatLocal(date, timezone ?? "UTC")})`;
  } catch {
    return date.toISOString();
  }
}

function runCli(): void {
  const options = parseArgs(process.argv);

  if (options.help) {
    showHelp();
    process.exit(0);
  }

  if (!options.expression) {
    console.error("Error: Missing cron expression. Try: cron-fast --help");
    process.exit(1);
  }

  // Validate mode
  if (options.validate) {
    const valid = isValid(options.expression);
    process.exit(valid ? 0 : 1);
  }

  // Check validity first (so we can give a nice error)
  try {
    parse(options.expression);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    if (options.json) {
      console.log(JSON.stringify({ error: message, expression: options.expression }, null, 2));
    } else {
      console.error(`Error: ${message}`);
    }
    process.exit(1);
  }

  const cronOptions = {
    timezone: options.timezone,
    from: options.from,
  };

  // --match mode
  if (options.match !== undefined) {
    const result = isMatch(
      options.expression,
      options.match,
      options.timezone ? { timezone: options.timezone } : undefined,
    );
    if (options.json) {
      console.log(
        JSON.stringify(
          {
            expression: options.expression,
            date: options.match.toISOString(),
            timezone: options.timezone,
            matches: result,
          },
          null,
          2,
        ),
      );
    } else {
      console.log(result ? "true" : "false");
    }
    process.exit(0);
  }

  // --describe mode
  if (options.describe) {
    const description = describe(options.expression);
    if (options.json) {
      console.log(
        JSON.stringify(
          {
            expression: options.expression,
            description,
          },
          null,
          2,
        ),
      );
    } else {
      console.log(description);
    }
    process.exit(0);
  }

  // Default: show next runs
  const count = options.next ?? options.prev ?? 1;
  const direction = options.prev !== undefined ? "prev" : "next";

  let runs: Date[];
  if (direction === "prev") {
    runs = [];
    let current = options.from;
    for (let i = 0; i < count; i++) {
      const run = previousRun(options.expression, { ...cronOptions, from: current });
      runs.push(run);
      current = new Date(run.getTime() - 60000);
    }
  } else {
    runs = nextRuns(options.expression, count, cronOptions);
  }

  if (options.json) {
    console.log(
      JSON.stringify(
        {
          expression: options.expression,
          description: describe(options.expression),
          timezone: options.timezone,
          from: cronOptions.from?.toISOString(),
          direction,
          runs: runs.map((r) => r.toISOString()),
        },
        null,
        2,
      ),
    );
  } else {
    const description = describe(options.expression);
    console.log(
      `${direction === "next" ? "Next" : "Previous"} ${count} run${count === 1 ? "" : "s"} for: ${options.expression}`,
    );
    console.log(`${description}`);
    if (options.timezone) {
      console.log(`${options.timezone} timezone`);
    }
    console.log();
    runs.forEach((run, i) => {
      console.log(`${i + 1}. ${formatRun(run, options.timezone)}`);
    });
  }
}

runCli();
