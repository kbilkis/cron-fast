import { describe as describeCron } from "../src/describe.js";
import { describe, it, expect } from "vitest";

describe("describe", () => {
  it("should describe simple expressions", () => {
    expect(describeCron("*/5 * * * *")).toBe("Every 5 minutes");
    expect(describeCron("0 * * * *")).toBe("At minute 0");
    expect(describeCron("0 0 * * *")).toBe("At 12:00 AM");
    expect(describeCron("0 12 * * *")).toBe("At 12:00 PM");
    expect(describeCron("30 14 * * *")).toBe("At 2:30 PM");
    expect(describeCron("15 9 * * *")).toBe("At 9:15 AM");
  });

  it("should describe complex minute patterns", () => {
    expect(describeCron("*/15 * * * *")).toBe("Every 15 minutes");
    expect(describeCron("0,15,30,45 * * * *")).toBe("Every 15 minutes"); // Same as */15
    expect(describeCron("5-10 * * * *")).toBe("At minutes 5-10");
    expect(describeCron("0,5,10 * * * *")).toBe("At minutes 0, 5, 10"); // Not a complete step pattern
  });

  it("should describe hour patterns", () => {
    expect(describeCron("0 */2 * * *")).toBe("At minute 0, every 2 hours");
    expect(describeCron("0 9-17 * * *")).toBe("At minute 0, between 9 AM and 5 PM");
    expect(describeCron("0 3,4 * * *")).toBe("At 3:00 AM, 4:00 AM");
  });

  it("should describe day patterns", () => {
    expect(describeCron("0 0 1 * *")).toBe("At 12:00 AM, on day 1 of the month");
    expect(describeCron("0 0 1-4 * *")).toBe("At 12:00 AM, on days 1-4 of the month");
    expect(describeCron("0 0 */5 * *")).toBe("At 12:00 AM, every 5 days");
  });

  it("should describe weekday patterns", () => {
    expect(describeCron("0 0 * * 0")).toBe("At 12:00 AM, on Sunday");
    expect(describeCron("0 0 * * 1-5")).toBe("At 12:00 AM, on weekdays");
    expect(describeCron("0 0 * * 0,6")).toBe("At 12:00 AM, on weekends");
    expect(describeCron("0 0 * * 6")).toBe("At 12:00 AM, on Saturday");
  });

  it("should describe month patterns", () => {
    expect(describeCron("0 0 1 1 *")).toBe("At 12:00 AM, on day 1 of the month, in January");
    expect(describeCron("0 0 1 */3 *")).toBe("At 12:00 AM, on day 1 of the month, every 3 months");
    expect(describeCron("0 0 1 1-6 *")).toBe("At 12:00 AM, on day 1 of the month, in January-June");
  });

  it("should describe day OR weekday logic", () => {
    expect(describeCron("0 0 1 * 1")).toBe("At 12:00 AM, on day 1 of the month or on Monday");
    expect(describeCron("0 0 15 * 5")).toBe("At 12:00 AM, on day 15 of the month or on Friday");
  });

  it("should describe the complex example", () => {
    expect(describeCron("*/15 3,4 1-4 */3 6")).toBe(
      "Every 15 minutes, at 3 AM, 4 AM, on days 1-4 of the month or on Saturday, every 3 months",
    );
  });

  it("should describe common cron patterns", () => {
    expect(describeCron("0 0 * * *")).toBe("At 12:00 AM");
    expect(describeCron("0 0 * * 1")).toBe("At 12:00 AM, on Monday");
    expect(describeCron("30 2 * * *")).toBe("At 2:30 AM");
    expect(describeCron("0 */6 * * *")).toBe("At 12:00 AM, 6:00 AM, 12:00 PM, 6:00 PM");
    expect(describeCron("0 6,12,18 * * *")).toBe("At 6:00 AM, 12:00 PM, 6:00 PM");
  });

  it("should handle wildcards correctly", () => {
    expect(describeCron("* * * * *")).toBe("Every minute");
    expect(describeCron("0 * * * *")).toBe("At minute 0");
    expect(describeCron("* 0 * * *")).toBe("Every minute, at 12 AM");
  });

  it("should describe complex real-world scenarios", () => {
    // Business hours: Every 30 minutes during work hours on weekdays
    expect(describeCron("*/30 9-17 * * 1-5")).toBe(
      "Every 30 minutes, between 9 AM and 5 PM, on weekdays",
    );

    // Backup: Daily at 3:30 AM
    expect(describeCron("30 3 * * *")).toBe("At 3:30 AM");

    // Weekly report: Every Monday at 9 AM
    expect(describeCron("0 9 * * 1")).toBe("At 9:00 AM, on Monday");

    // Quarterly: First day of every 3 months at midnight
    expect(describeCron("0 0 1 */3 *")).toBe("At 12:00 AM, on day 1 of the month, every 3 months");

    // Every 15 minutes during specific hours
    expect(describeCron("*/15 8,9,10 * * *")).toBe("Every 15 minutes, between 8 AM and 10 AM");

    // Multiple specific times
    expect(describeCron("0 6,12,18 * * *")).toBe("At 6:00 AM, 12:00 PM, 6:00 PM");

    // Weekend mornings
    expect(describeCron("0 10 * * 0,6")).toBe("At 10:00 AM, on weekends");

    // Last week of month (approximation with days 25-31)
    expect(describeCron("0 0 25-31 * *")).toBe("At 12:00 AM, on days 25-31 of the month");

    // Every 2 hours during night
    expect(describeCron("0 0-6/2 * * *")).toBe("At 12:00 AM, 2:00 AM, 4:00 AM, 6:00 AM");

    // Specific days in specific months
    expect(describeCron("0 12 15 1,7 *")).toBe(
      "At 12:00 PM, on day 15 of the month, in January, July",
    );

    // Every 5 minutes during lunch hour
    expect(describeCron("*/5 12 * * 1-5")).toBe("Every 5 minutes, at 12 PM, on weekdays");

    // Multiple days and times
    expect(describeCron("30 8,17 * * 1,3,5")).toBe(
      "At 8:30 AM, 5:30 PM, on Monday, Wednesday, Friday",
    );

    // Early morning every other day (approximation)
    expect(describeCron("0 5 */2 * *")).toBe("At 5:00 AM, every 2 days");

    // Bi-weekly (every 14 days, approximation)
    expect(describeCron("0 9 */14 * *")).toBe("At 9:00 AM, on days 1, 15, 29 of the month");

    // Summer months, weekdays, business hours
    expect(describeCron("0 9-17 * 6-8 1-5")).toBe(
      "At minute 0, between 9 AM and 5 PM, on weekdays, in June-August",
    );

    // Every 10 minutes during peak hours
    expect(describeCron("*/10 8-11,14-17 * * 1-5")).toBe(
      "Every 10 minutes, at 8 AM, 9 AM, 10 AM, 11 AM, 2 PM, and 3 more, on weekdays",
    );

    // First Monday of month at 9 AM (approximation with days 1-7)
    expect(describeCron("0 9 1-7 * 1")).toBe("At 9:00 AM, on days 1-7 of the month or on Monday");

    // Every 6 hours starting at midnight
    expect(describeCron("0 */6 * * *")).toBe("At 12:00 AM, 6:00 AM, 12:00 PM, 6:00 PM");

    // Specific minutes in an hour
    expect(describeCron("5,15,25,35,45,55 * * * *")).toBe("At minutes 5, 15, 25, and 3 more");
  });

  it("should describe edge cases", () => {
    // All specific values
    expect(describeCron("5 14 15 3 2")).toBe(
      "At 2:05 PM, on day 15 of the month or on Tuesday, in March",
    );

    // Single values everywhere
    expect(describeCron("0 0 1 1 1")).toBe(
      "At 12:00 AM, on day 1 of the month or on Monday, in January",
    );

    // Maximum ranges
    expect(describeCron("0-59 0-23 1-31 1-12 0-6")).toBe("Every minute");

    // Step from non-zero
    expect(describeCron("5-55/10 * * * *")).toBe("At minutes 5, 15, 25, and 3 more");
  });

  it("should handle very long/complex expressions", () => {
    // Many specific minutes (detected as step pattern)
    expect(describeCron("0,5,10,15,20,25,30,35,40,45,50,55 * * * *")).toBe("Every 5 minutes");

    // Many specific hours (more than 5, so truncated)
    expect(describeCron("0 1,2,3,4,5,6,7,8,9,10,11,12 * * *")).toBe(
      "At minute 0, between 1 AM and 12 PM",
    );

    // Many specific days
    expect(describeCron("0 0 1,5,10,15,20,25,30 * *")).toBe(
      "At 12:00 AM, on days 1, 5, 10, and 4 more of the month",
    );

    // Many specific months (detected as range)
    expect(describeCron("0 0 1 1,2,3,4,5,6,7,8,9,10 *")).toBe(
      "At 12:00 AM, on day 1 of the month, in January-October",
    );

    // Complex combination with many values
    expect(describeCron("0,15,30,45 8,9,10,11,12,13,14,15,16,17 * * 1,2,3,4,5")).toBe(
      "Every 15 minutes, between 8 AM and 5 PM, on weekdays",
    );

    // Very specific: multiple minutes, hours, days, months, and weekdays
    expect(describeCron("5,10,15,20 6,12,18 1,15 1,4,7,10 1,3,5")).toBe(
      "At minutes 5, 10, 15, and 1 more, at 6 AM, 12 PM, 6 PM, on days 1, 15 of the month or on Monday, Wednesday, Friday, every 3 months",
    );

    // Long range with specific weekdays
    expect(describeCron("0 9-17 1-15 * 1,2,3,4,5")).toBe(
      "At minute 0, between 9 AM and 5 PM, on days 1-15 of the month or on weekdays",
    );

    // Multiple ranges and lists combined
    expect(describeCron("0,30 6-8,14-16,20-22 * * *")).toBe(
      "Every 30 minutes, at 6 AM, 7 AM, 8 AM, 2 PM, 3 PM, and 4 more",
    );

    // Extreme: many specific values across all fields
    expect(describeCron("1,2,3,4,5 7,8,9,10,11 2,4,6,8,10 2,5,8,11 0,6")).toBe(
      "At minutes 1-5, between 7 AM and 11 AM, on days 2, 4, 6, and 2 more of the month or on weekends, in February, May, August, November",
    );
  });
});
