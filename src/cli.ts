#!/usr/bin/env node
import { nextRun, previousRun, nextRuns, isValid, parse, describe, isMatch } from "./index.js";

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

function parseArgs(argv: string[]): CliOptions {
  const args = argv.slice(2);
  if (args.length === 0 || args.includes("--help")) {
    return { expression: "", help: true, describe: false, validate: false, json: false };
  }

  // First positional argument is the cron expression
  let expression = "";
  const remainingArgs: string[] = [];

  for (const arg of args) {
    if (!arg.startsWith("-") && !expression) {
      expression = arg;
    } else {
      remainingArgs.push(arg);
    }
  }

  const options: CliOptions = {
    expression,
    describe: false,
    validate: false,
    json: false,
    help: false,
  };

  for (let i = 0; i < remainingArgs.length; i++) {
    const arg = remainingArgs[i];
    const next = remainingArgs[i + 1];

    switch (arg) {
      case "--next":
        if (next !== undefined) {
          options.next = parseInt(next, 10);
          i++;
        }
        break;
      case "--prev":
        if (next !== undefined) {
          options.prev = parseInt(next, 10);
          i++;
        }
        break;
      case "--tz":
        if (next !== undefined) {
          options.timezone = next;
          i++;
        }
        break;
      case "--from":
        if (next !== undefined) {
          options.from = new Date(next);
          i++;
        }
        break;
      case "--match":
        if (next !== undefined) {
          options.match = new Date(next);
          i++;
        }
        break;
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

function formatRun(date: Date, timezone?: string): string {
  try {
    const local = timezone
      ? date.toLocaleString("en-US", {
          timeZone: timezone,
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      : date.toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "UTC",
        });

    const iso = date.toISOString();
    return `${iso}  (${local})`;
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
