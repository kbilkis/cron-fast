import { nextRun, previousRun, nextRuns, isValid, parse, describe } from "../src/index.js";

console.log("=== cron-fast Examples ===\n");

// Example 1: Basic usage
console.log('1. Next run for "0 9 * * *" (9 AM daily):');
const next = nextRun("0 9 * * *");
console.log(`   ${next.toISOString()}\n`);

// Example 2: With timezone
console.log('2. Next run for "0 9 * * *" in New York timezone:');
const nextNY = nextRun("0 9 * * *", { timezone: "America/New_York" });
console.log(`   ${nextNY.toISOString()}`);
console.log(`   (${nextNY.toLocaleString("en-US", { timeZone: "America/New_York" })})\n`);

// Example 3: Every 15 minutes
console.log('3. Next 5 runs for "*/15 * * * *" (every 15 minutes):');
const runs = nextRuns("*/15 * * * *", 5);
runs.forEach((run, i) => {
  console.log(`   ${i + 1}. ${run.toISOString()}`);
});
console.log();

// Example 4: Weekdays only
console.log('4. Next run for "0 9 * * 1-5" (9 AM weekdays):');
const weekdayRun = nextRun("0 9 * * 1-5");
console.log(`   ${weekdayRun.toISOString()}`);
console.log(
  `   Day of week: ${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][weekdayRun.getUTCDay()]}\n`,
);

// Example 5: Previous run
console.log('5. Previous run for "0 */6 * * *" (every 6 hours):');
const prev = previousRun("0 */6 * * *");
console.log(`   ${prev.toISOString()}\n`);

// Example 6: Validation
console.log("6. Validate cron expressions:");
console.log(`   "0 9 * * *" is valid: ${isValid("0 9 * * *")}`);
console.log(`   "invalid" is valid: ${isValid("invalid")}\n`);

// Example 7: Parse expression
console.log('7. Parse "0 9 * * 1-5":');
const parsed = parse("0 9 * * 1-5");
console.log(`   Minutes: ${parsed.minute}`);
console.log(`   Hours: ${parsed.hour}`);
console.log(`   Weekdays: ${parsed.weekday} (Mon-Fri)\n`);

// Example 8: Human-readable descriptions
console.log("8. Human-readable descriptions:");
console.log(`   "*/5 * * * *" → ${describe("*/5 * * * *")}`);
console.log(`   "0 9 * * 1-5" → ${describe("0 9 * * 1-5")}`);
console.log(`   "30 14 * * *" → ${describe("30 14 * * *")}`);
console.log(`   "0 */6 * * *" → ${describe("0 */6 * * *")}\n`);

console.log("=== Performance Test ===\n");
const iterations = 10000;
const start = performance.now();
for (let i = 0; i < iterations; i++) {
  nextRun("*/15 * * * *");
}
const end = performance.now();
const opsPerSec = Math.round((iterations / (end - start)) * 1000);
console.log(`Calculated ${iterations} next runs in ${(end - start).toFixed(2)}ms`);
console.log(`Performance: ${opsPerSec.toLocaleString()} ops/sec`);
