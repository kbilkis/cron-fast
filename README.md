# cron-fast

[![npm version](https://badge.fury.io/js/cron-fast.svg)](https://www.npmjs.com/package/cron-fast)
[![npm provenance](https://img.shields.io/badge/provenance-attested-brightgreen)](https://www.npmjs.com/package/cron-fast)
[![JSR](https://jsr.io/badges/@kbilkis/cron-fast)](https://jsr.io/@kbilkis/cron-fast)
[![JSR Score](https://jsr.io/badges/@kbilkis/cron-fast/score)](https://jsr.io/@kbilkis/cron-fast)
[![CI](https://github.com/kbilkis/cron-fast/actions/workflows/ci.yml/badge.svg)](https://github.com/kbilkis/cron-fast/actions/workflows/ci.yml)
[![codecov](https://codecov.io/github/kbilkis/cron-fast/graph/badge.svg?token=5MXFKS45XV)](https://codecov.io/github/kbilkis/cron-fast)
[![npm bundle size](https://img.shields.io/bundlejs/size/cron-fast)](https://bundlejs.com/?q=cron-fast)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Fast and tiny JavaScript/TypeScript cron parser with timezone support.** Works everywhere: Node.js, Deno, Bun, Cloudflare Workers, and browsers. Zero dependencies.

## Features

- **Universal** - Works in Node.js, Deno, Bun, Cloudflare Workers, and browsers
- **Lightweight** - Zero dependencies
- **Fast** - Optimal field increment algorithm
- **Tree-shakeable** - Import only what you need
- **Timezone support** - Built-in timezone handling using native `Intl`
- **Modern** - ESM + CJS, TypeScript-first
- **Fully tested** - Comprehensive test coverage across all runtimes
- **Simple API** - Clean, intuitive interface
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

Get the next execution time for a cron expression.

```typescript
nextRun("0 9 * * *"); // Next 9:00 AM UTC
nextRun("0 9 * * *", { timezone: "Europe/London" }); // Next 9:00 AM London time
nextRun("0 9 * * *", { from: new Date("2026-03-15") }); // Next after Mar 15, 2026
```

### `previousRun(expression, options?)`

Get the previous execution time.

```typescript
previousRun("0 9 * * *"); // Last 9:00 AM UTC
previousRun("0 9 * * *", { timezone: "Asia/Tokyo" });
```

### `nextRuns(expression, count, options?)`

Get next N execution times.

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

Check if a date matches the cron expression.

```typescript
isMatch("0 9 * * *", new Date("2026-03-15T09:00:00Z")); // true
```

### `parse(expression)`

Parse a cron expression into its components.

```typescript
parse("0 9 * * 1-5");
// Returns: { minute: [0], hour: [9], day: [1, 2, ..., 31], month: [0, 1, 2, ..., 11], weekday: [1,2,3,4,5] }
```

### `describe(expression)`

Get a human-readable description of a cron expression.

```typescript
describe("*/5 * * * *"); // "Every 5 minutes"
describe("0 9 * * 1-5"); // "At minute 0, between 9 AM and 5 PM, on weekdays"
describe("*/15 3,4 1-4 */3 6");
// "Every 15 minutes, at 3 AM, 4 AM, on days 1-4 of the month or on Saturday, every 3 months"
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

cron-fast is extremely lightweight and fully tree-shakeable. Here are the actual bundle sizes for different import scenarios (tested with v0.3.0):

| Import                                                 | Raw      | Minified | Gzipped     |
| ------------------------------------------------------ | -------- | -------- | ----------- |
| `Full bundle (all exports)                           ` | 21.39 KB | 9.55 KB  | **3.52 KB** |
| `nextRun only                                        ` | 12.64 KB | 5.43 KB  | **2.12 KB** |
| `previousRun only                                    ` | 12.65 KB | 5.43 KB  | **2.12 KB** |
| `nextRuns only                                       ` | 13.03 KB | 5.58 KB  | **2.18 KB** |
| `isValid only                                        ` | 4.00 KB  | 1.81 KB  | **951 B**   |
| `parse only                                          ` | 3.89 KB  | 1.76 KB  | **926 B**   |
| `describe only                                       ` | 11.04 KB | 5.11 KB  | **2.06 KB** |
| `isMatch only                                        ` | 5.59 KB  | 2.54 KB  | **1.22 KB** |
| `Validation only (isValid + parse)                   ` | 4.01 KB  | 1.81 KB  | **952 B**   |
| `Scheduling only (nextRun + previousRun + nextRuns)  ` | 13.52 KB | 5.83 KB  | **2.20 KB** |

Import only what you need:

```typescript
// Small bundle - only validation (~900 B gzipped)
import { isValid } from "cron-fast";

// Medium bundle - one function + dependencies (~2 KB gzipped)
import { nextRun } from "cron-fast";

// Full bundle - everything (~2.3 KB gzipped)
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
// Validate before using
if (!isValid(userInput)) {
  throw new Error("Invalid cron expression");
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

- **Timezone handling**: The cron expression is interpreted in the timezone you specify, but the returned Date is always in UTC
- **Daylight saving time**: Use IANA timezone names (like "America/New_York") instead of abbreviations (like "EST")
- **Validation**: Always check `isValid()` before parsing user input
- **Day 0 and 7**: Both represent Sunday in the day-of-week field
- **Ranges are inclusive**: `1-5` includes both 1 and 5

## Performance

cron-fast is designed for speed and efficiency. Here's how it compares to popular alternatives:

> Tested with cron-fast v0.3.0, croner v10.0.1, cron-parser v5.5.0, cron-schedule v6.0.0 on Node.js v22.18.0

| Operation    | cron-fast      | croner    | cron-parser | cron-schedule |
| ------------ | -------------- | --------- | ----------- | ------------- |
| Next run     | **354k ops/s** | 29k ops/s | 29k ops/s   | 387k ops/s    |
| Previous run | **353k ops/s** | 29k ops/s | 25k ops/s   | 343k ops/s    |
| Validation   | **545k ops/s** | 33k ops/s | 94k ops/s   | 473k ops/s    |
| Parsing      | **517k ops/s** | 32k ops/s | 93k ops/s   | 465k ops/s    |

See [detailed benchmarks and feature comparison](docs/benchmark-comparison.md) (including Deno and Bun runtimes) for more information.

Run benchmarks yourself: `pnpm benchmark`

## License

MIT - see [LICENSE](LICENSE) for details.
