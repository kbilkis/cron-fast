# cron-fast

[![npm version](https://img.shields.io/npm/v/cron-fast.svg?logo=npm)](https://www.npmjs.com/package/cron-fast)
[![npm provenance](https://img.shields.io/badge/provenance-attested-brightgreen?logo=npm)](https://www.npmjs.com/package/cron-fast)
[![JSR](https://jsr.io/badges/@kbilkis/cron-fast)](https://jsr.io/@kbilkis/cron-fast)
[![JSR Score](https://jsr.io/badges/@kbilkis/cron-fast/score)](https://jsr.io/@kbilkis/cron-fast)
[![CI](https://github.com/kbilkis/cron-fast/actions/workflows/ci.yml/badge.svg)](https://github.com/kbilkis/cron-fast/actions/workflows/ci.yml)
[![codecov](https://codecov.io/github/kbilkis/cron-fast/graph/badge.svg)](https://codecov.io/github/kbilkis/cron-fast)
[![npm bundle size](https://img.shields.io/bundlejs/size/cron-fast?logo=esbuild)](https://bundlejs.com/?q=cron-fast)
[![Snyk](https://snyk.io/test/npm/cron-fast/badge.svg)](https://snyk.io/test/npm/cron-fast)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Fast and tiny JavaScript/TypeScript cron parser with timezone support.** Works everywhere: Node.js, Deno, Bun, Cloudflare Workers, and browsers. Zero dependencies.

## Features

- **Parse & validate** - Convert cron expressions to structured data and check validity
- **Get execution times** - Calculate next, previous, or multiple scheduled runs
- **Match dates** - Check if a date matches a cron expression
- **Describe** - Convert cron expressions to human-readable text (e.g., "Every 5 minutes")
- **Timezone support** - Full IANA timezone support using native `Intl` API

## Why cron-fast?

- **Universal** - Works in Node.js, Deno, Bun, Cloudflare Workers, and browsers
- **Zero dependencies** - Lightweight and secure
- **Fast** - Optimal field increment algorithm with 10x+ performance vs alternatives
- **Tree-shakeable** - Import only what you need
- **Modern** - ESM + CJS, TypeScript-first
- **Fully tested** - Comprehensive test coverage across all runtimes
- **ISO 8601 compatible** - Works with all standard date formats

## Installation

```bash
# Node.js (npm)
npm install cron-fast

# Node.js (pnpm)
pnpm add cron-fast

# Node.js (yarn)
yarn add cron-fast

# Deno (JSR)
deno add jsr:@kbilkis/cron-fast

# Bun
bun add cron-fast

# Any runtime (JSR)
npx jsr add @kbilkis/cron-fast
```

## Quick Start

```typescript
import { nextRun, previousRun, isValid } from "cron-fast";

// Get next execution time (UTC)
const next = nextRun("0 9 * * *");
console.log(next); // Next 9:00 AM UTC

// With timezone
const nextNY = nextRun("0 9 * * *", { timezone: "America/New_York" });
console.log(nextNY); // Next 9:00 AM Eastern Time

// Get previous execution
const prev = previousRun("*/15 * * * *");

// Validate expression
if (isValid("0 9 * * *")) {
  console.log("Valid cron expression!");
}
```

## API

### `nextRun(expression, options?)`

Get the next execution time for a cron expression. **Throws** if the expression or timezone is invalid.

```typescript
nextRun("0 9 * * *"); // Next 9:00 AM UTC
nextRun("0 9 * * *", { timezone: "Europe/London" }); // Next 9:00 AM London time
nextRun("0 9 * * *", { from: new Date("2026-03-15") }); // Next after Mar 15, 2026
```

### `previousRun(expression, options?)`

Get the previous execution time. **Throws** if the expression or timezone is invalid.

```typescript
previousRun("0 9 * * *"); // Last 9:00 AM UTC
previousRun("0 9 * * *", { timezone: "Asia/Tokyo" });
```

### `nextRuns(expression, count, options?)`

Get next N execution times. **Throws** if the expression or timezone is invalid.

```typescript
nextRuns("0 9 * * *", 5); // Next 5 occurrences
```

### `isValid(expression)`

Validate a cron expression.

```typescript
isValid("0 9 * * *"); // true
isValid("invalid"); // false
```

### `isMatch(expression, date, options?)`

Check if a date matches the cron expression. **Throws** if the expression or timezone is invalid.

```typescript
isMatch("0 9 * * *", new Date("2026-03-15T09:00:00Z")); // true
```

### `parse(expression)`

Parse a cron expression into its components. **Throws** if the expression is invalid.

```typescript
parse("0 9 * * 1-5");
// Returns: { minute: [0], hour: [9], day: [1, 2, ..., 31], month: [0, 1, 2, ..., 11], weekday: [1,2,3,4,5] }
```

### `describe(expression)`

Get a human-readable description of a cron expression. Returns `"Invalid cron expression"` if the expression is invalid.

```typescript
describe("*/5 * * * *"); // "Every 5 minutes"
describe("0 9 * * 1-5"); // "At minute 0, between 9 AM and 5 PM, on weekdays"
describe("*/15 3,4 1-4 */3 6");
// "Every 15 minutes, at 3 AM, 4 AM, on days 1-4 of the month or on Saturday, every 3 months"
describe("invalid"); // "Invalid cron expression"
```

## Cron Expression Format

```
* * * * *
│ │ │ │ │
│ │ │ │ └─ Day of Week (0-7, SUN-SAT)
│ │ │ └─── Month (1-12, JAN-DEC)
│ │ └───── Day of Month (1-31)
│ └─────── Hour (0-23)
└───────── Minute (0-59)
```

### Supported Special Characters

- `*` - Any value
- `,` - Value list (e.g., `1,3,5`)
- `-` - Range (e.g., `1-5`)
- `/` - Step values (e.g., `*/5`)

## ISO 8601 Date Support

cron-fast fully supports ISO 8601 date formats for input:

```typescript
// All these formats work:
nextRun("0 9 * * *", { from: new Date("2026-03-15T14:30:00Z") }); // UTC
nextRun("0 9 * * *", { from: new Date("2026-03-15T09:30:00-05:00") }); // With offset
nextRun("0 9 * * *", { from: new Date("2026-03-15T14:30:00.500Z") }); // With milliseconds

// Different representations of the same moment produce identical results
const utc = new Date("2026-03-15T14:30:00Z");
const est = new Date("2026-03-15T09:30:00-05:00"); // Same moment
nextRun("0 9 * * *", { from: utc }).getTime() === nextRun("0 9 * * *", { from: est }).getTime(); // true
```

**Note:** All returned Date objects are in UTC (ending with `Z` in `.toISOString()`). Use `.toLocaleString()` to display in any timezone.

## Bundle Size

cron-fast is extremely lightweight and fully tree-shakeable. Here are the actual bundle sizes for different import scenarios (tested with v2.2.0):

| Import                                                 | Raw      | Minified | Gzipped     |
| ------------------------------------------------------ | -------- | -------- | ----------- |
| `Full bundle (all exports)                           ` | 21.87 KB | 10.13 KB | **3.62 KB** |
| `nextRun only                                        ` | 13.13 KB | 6.04 KB  | **2.23 KB** |
| `previousRun only                                    ` | 13.14 KB | 6.04 KB  | **2.23 KB** |
| `nextRuns only                                       ` | 13.51 KB | 6.19 KB  | **2.29 KB** |
| `isValid only                                        ` | 4.45 KB  | 2.24 KB  | **992 B**   |
| `parse only                                          ` | 4.34 KB  | 2.20 KB  | **969 B**   |
| `describe only                                       ` | 11.56 KB | 5.59 KB  | **2.11 KB** |
| `isMatch only                                        ` | 6.36 KB  | 3.16 KB  | **1.34 KB** |
| `Validation only (isValid + parse)                   ` | 4.46 KB  | 2.25 KB  | **993 B**   |
| `Scheduling only (nextRun + previousRun + nextRuns)  ` | 13.92 KB | 6.37 KB  | **2.31 KB** |

Import only what you need:

```typescript
// Small bundle - only validation
import { isValid } from "cron-fast";

// Medium bundle - one function + dependencies
import { nextRun } from "cron-fast";

// Full bundle - everything
import * as cron from "cron-fast";
```

## Advanced Usage

### Working with Timezones

```typescript
// Cron expression is interpreted in the specified timezone
const next = nextRun("0 9 * * *", { timezone: "America/New_York" });

// The returned Date is always UTC internally
console.log(next.toISOString()); // "2026-03-15T13:00:00.000Z" (9 AM EDT = 1 PM UTC)

// Display in any timezone
console.log(next.toLocaleString("en-US", { timeZone: "America/New_York" }));
// "3/15/2026, 9:00:00 AM"
```

### Multiple Executions

```typescript
// Get next 10 runs
const runs = nextRuns("0 */6 * * *", 10); // Every 6 hours

// With timezone
const runsNY = nextRuns("0 9 * * 1-5", 5, { timezone: "America/New_York" });
// Next 5 weekday mornings in New York
```

### Validation and Parsing

```typescript
// Functions throw on invalid input, but you can pre-validate user input
if (!isValid(userInput)) {
  console.log("Invalid cron expression");
  return;
}

// Or use try/catch
try {
  const next = nextRun(userInput);
} catch (e) {
  console.log("Invalid cron expression");
}

// Parse to see what it means
const parsed = parse("*/15 9-17 * * 1-5");
console.log(parsed);
// {
//   minute: [0, 15, 30, 45],
//   hour: [9, 10, 11, 12, 13, 14, 15, 16, 17],
//   day: [1-31],
//   month: [1-12],
//   weekday: [1, 2, 3, 4, 5]
// }
```

### Check if Date Matches

```typescript
const now = new Date();

if (isMatch("0 9 * * 1-5", now)) {
  console.log("It's 9 AM on a weekday!");
}

// With timezone
if (isMatch("0 9 * * *", now, { timezone: "America/New_York" })) {
  console.log("It's 9 AM in New York!");
}
```

## Tips & Gotchas

- **Invalid input throws**: Most functions (`nextRun`, `previousRun`, `nextRuns`, `isMatch`, `parse`) throw an error for invalid cron expressions. `nextRun`, `previousRun`, `nextRuns`, and `isMatch` also throw for invalid timezones. Use `isValid()` to pre-validate user input, or wrap calls in try/catch. Note: `describe()` returns `"Invalid cron expression"` instead of throwing.
- **Timezone handling**: The cron expression is interpreted in the timezone you specify, but the returned Date is always in UTC
- **Daylight saving time**: Use IANA timezone names (like "America/New_York") instead of abbreviations (like "EST")
- **Day 0 and 7**: Both represent Sunday in the day-of-week field
- **Ranges are inclusive**: `1-5` includes both 1 and 5

## Performance

cron-fast is designed for speed and efficiency. Here's how it compares to popular alternatives:

> Tested with cron-fast v2.2.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0 on Node.js v22.18.0

| Operation    | cron-fast      | croner    | cron-parser | cron-schedule |
| ------------ | -------------- | --------- | ----------- | ------------- |
| Next run     | **484k ops/s** | 30k ops/s | 33k ops/s   | 380k ops/s    |
| Previous run | **551k ops/s** | 31k ops/s | 38k ops/s   | 393k ops/s    |
| Validation   | **651k ops/s** | 28k ops/s | 78k ops/s   | 372k ops/s    |
| Parsing      | **718k ops/s** | 29k ops/s | 86k ops/s   | 430k ops/s    |

See [detailed benchmarks and feature comparison](docs/benchmark-comparison.md) (including Deno and Bun runtimes) for more information.

Run benchmarks yourself: `pnpm benchmark`

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Contributors

- [Kasparas Bilkis](https://github.com/kbilkis) - Creator and maintainer

## License

MIT - see [LICENSE](LICENSE) for details.
