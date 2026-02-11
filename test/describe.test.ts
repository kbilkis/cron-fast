import {
  describe as describeCron,
  formatStringList,
  detectStep,
  isConsecutive,
  detectWeekdayWrapAround,
} from "../src/describe.js";
import { describe, it, expect } from "vitest";

describe("describe", () => {
  it("should describe simple expressions", () => {
    expect(describeCron("*/5 * * * *")).toBe("Every 5 minutes");
    expect(describeCron("0 * * * *")).toBe("Every hour");
    expect(describeCron("0 0 * * *")).toBe("At 12:00 AM");
    expect(describeCron("0 12 * * *")).toBe("At 12:00 PM");
    expect(describeCron("30 14 * * *")).toBe("At 2:30 PM");
    expect(describeCron("15 9 * * *")).toBe("At 9:15 AM");
  });

  it("should describe complex minute patterns", () => {
    expect(describeCron("*/15 * * * *")).toBe("Every 15 minutes");
    expect(describeCron("0,15,30,45 * * * *")).toBe("Every 15 minutes");
    expect(describeCron("5-10 * * * *")).toBe("At minutes 5-10");
    expect(describeCron("0,5,10 * * * *")).toBe("At minutes 0, 5, or 10");
  });

  it("should describe hour patterns", () => {
    expect(describeCron("0 */2 * * *")).toBe("every 2 hours");
    expect(describeCron("0 9-17 * * *")).toBe("At minute 0, between 9 AM and 5 PM");
    expect(describeCron("0 3,4 * * *")).toBe("At 3:00 AM or 4:00 AM");
  });

  it("should describe day patterns", () => {
    expect(describeCron("0 0 1 * *")).toBe("At 12:00 AM, on the 1st");
    expect(describeCron("0 0 1-4 * *")).toBe("At 12:00 AM, on the 1st through 4th");
    expect(describeCron("0 0 */5 * *")).toBe("At 12:00 AM, every 5 days");
  });

  it("should describe weekday patterns", () => {
    expect(describeCron("0 0 * * 0")).toBe("At 12:00 AM, on Sundays");
    expect(describeCron("0 0 * * 1-5")).toBe("At 12:00 AM, on weekdays");
    expect(describeCron("0 0 * * 0,6")).toBe("At 12:00 AM, on weekends");
    expect(describeCron("0 0 * * 6")).toBe("At 12:00 AM, on Saturdays");
  });

  it("should describe month patterns", () => {
    expect(describeCron("0 0 1 1 *")).toBe("At 12:00 AM, on the 1st in January");
    expect(describeCron("0 0 1 */3 *")).toBe("At 12:00 AM, on the 1st every 3 months");
    expect(describeCron("0 0 1 1-6 *")).toBe("At 12:00 AM, on the 1st in January-June");
  });

  it("should describe day OR weekday logic", () => {
    expect(describeCron("0 0 1 * 1")).toBe("At 12:00 AM, on the 1st or on Mondays");
    expect(describeCron("0 0 15 * 5")).toBe("At 12:00 AM, on the 15th or on Fridays");
  });

  it("should describe the complex example", () => {
    expect(describeCron("*/15 3,4 1-4 */3 6")).toBe(
      "Every 15 minutes, at 3 AM or 4 AM, on the 1st through 4th or on Saturdays every 3 months",
    );
  });

  it("should describe common cron patterns", () => {
    expect(describeCron("0 0 * * *")).toBe("At 12:00 AM");
    expect(describeCron("0 0 * * 1")).toBe("At 12:00 AM, on Mondays");
    expect(describeCron("30 2 * * *")).toBe("At 2:30 AM");
    expect(describeCron("0 */6 * * *")).toBe("every 6 hours");
    expect(describeCron("0 6,12,18 * * *")).toBe("At 6:00 AM, 12:00 PM, or 6:00 PM");
  });

  it("should handle wildcards correctly", () => {
    expect(describeCron("* * * * *")).toBe("Every minute");
    expect(describeCron("0 * * * *")).toBe("Every hour");
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
    expect(describeCron("0 9 * * 1")).toBe("At 9:00 AM, on Mondays");

    // Quarterly: First day of every 3 months at midnight
    expect(describeCron("0 0 1 */3 *")).toBe("At 12:00 AM, on the 1st every 3 months");

    // Every 15 minutes during specific hours
    expect(describeCron("*/15 8,9,10 * * *")).toBe("Every 15 minutes, between 8 AM and 10 AM");

    // Multiple specific times
    expect(describeCron("0 6,12,18 * * *")).toBe("At 6:00 AM, 12:00 PM, or 6:00 PM");

    // Weekend mornings
    expect(describeCron("0 10 * * 0,6")).toBe("At 10:00 AM, on weekends");

    // Last week of month (approximation with days 25-31)
    expect(describeCron("0 0 25-31 * *")).toBe("At 12:00 AM, on the 25th through 31st");

    // Every 2 hours during night
    expect(describeCron("0 0-6/2 * * *")).toBe("At 12:00 AM, 2:00 AM, 4:00 AM, or 6:00 AM");

    // Specific days in specific months
    expect(describeCron("0 12 15 1,7 *")).toBe("At 12:00 PM, on the 15th in January or July");

    // Every 5 minutes during lunch hour
    expect(describeCron("*/5 12 * * 1-5")).toBe("Every 5 minutes, at 12 PM, on weekdays");

    // Multiple days and times
    expect(describeCron("30 8,17 * * 1,3,5")).toBe(
      "At 8:30 AM or 5:30 PM, on Mondays, Wednesdays, or Fridays",
    );

    // Early morning every other day (approximation)
    expect(describeCron("0 5 */2 * *")).toBe("At 5:00 AM, every 2 days");

    // Bi-weekly (every 14 days, approximation)
    expect(describeCron("0 9 */14 * *")).toBe("At 9:00 AM, on the 1st, 15th, or 29th");

    // Summer months, weekdays, business hours
    expect(describeCron("0 9-17 * 6-8 1-5")).toBe(
      "At minute 0, between 9 AM and 5 PM, on weekdays in June-August",
    );

    // Every 10 minutes during peak hours
    expect(describeCron("*/10 8-11,14-17 * * 1-5")).toBe(
      "Every 10 minutes, at 8 AM, 9 AM, 10 AM, 11 AM, 2 PM, 3 PM, 4 PM, or 5 PM, on weekdays",
    );

    // First Monday of month at 9 AM (approximation with days 1-7)
    expect(describeCron("0 9 1-7 * 1")).toBe("At 9:00 AM, on the 1st through 7th or on Mondays");

    // Every 6 hours starting at midnight
    expect(describeCron("0 */6 * * *")).toBe("every 6 hours");

    // Specific minutes in an hour
    expect(describeCron("5,15,25,35,45,55 * * * *")).toBe("At minutes 5, 15, 25, 35, 45, or 55");
  });

  it("should describe edge cases", () => {
    // All specific values
    expect(describeCron("5 14 15 3 2")).toBe("At 2:05 PM, on the 15th or on Tuesdays in March");

    // Single values everywhere
    expect(describeCron("0 0 1 1 1")).toBe("At 12:00 AM, on the 1st or on Mondays in January");

    // Maximum ranges
    expect(describeCron("0-59 0-23 1-31 1-12 0-6")).toBe("Every minute");

    // Step from non-zero
    expect(describeCron("5-55/10 * * * *")).toBe("At minutes 5, 15, 25, 35, 45, or 55");
  });

  it("should handle very long/complex expressions", () => {
    // Many specific minutes (detected as step pattern)
    expect(describeCron("0,5,10,15,20,25,30,35,40,45,50,55 * * * *")).toBe("Every 5 minutes");

    // Many specific hours (more than 5, detected as range)
    expect(describeCron("0 1,2,3,4,5,6,7,8,9,10,11,12 * * *")).toBe(
      "At minute 0, between 1 AM and 12 PM",
    );

    // Many specific days
    expect(describeCron("0 0 1,5,10,15,20,25,30 * *")).toBe(
      "At 12:00 AM, on the 1st, 5th, 10th, 15th, 20th, 25th, or 30th",
    );

    // Many specific months (detected as range)
    expect(describeCron("0 0 1 1,2,3,4,5,6,7,8,9,10 *")).toBe(
      "At 12:00 AM, on the 1st in January-October",
    );

    // Complex combination with many values
    expect(describeCron("0,15,30,45 8,9,10,11,12,13,14,15,16,17 * * 1,2,3,4,5")).toBe(
      "Every 15 minutes, between 8 AM and 5 PM, on weekdays",
    );

    // Very specific: multiple minutes, hours, days, months, and weekdays
    expect(describeCron("5,10,15,20 6,12,18 1,15 1,4,7,10 1,3,5")).toBe(
      "At minutes 5, 10, 15, or 20, at 6 AM, 12 PM, or 6 PM, on the 1st or 15th or on Mondays, Wednesdays, or Fridays every 3 months",
    );

    // Long range with specific weekdays
    expect(describeCron("0 9-17 1-15 * 1,2,3,4,5")).toBe(
      "At minute 0, between 9 AM and 5 PM, on the 1st through 15th or on weekdays",
    );

    // Multiple ranges and lists combined
    expect(describeCron("0,30 6-8,14-16,20-22 * * *")).toBe(
      "Every 30 minutes, at 6 AM, 7 AM, 8 AM, 2 PM, 3 PM, 4 PM, 8 PM, 9 PM, or 10 PM",
    );

    // Extreme: many specific values across all fields
    expect(describeCron("1,2,3,4,5 7,8,9,10,11 2,4,6,8,10 2,5,8,11 0,6")).toBe(
      "At minutes 1-5, between 7 AM and 11 AM, on the 2nd, 4th, 6th, 8th, or 10th or on weekends in February, May, August, or November",
    );
  });

  it("should handle weekday wrap-around", () => {
    // Fri-Sun (5-7 normalizes to [0, 5, 6])
    expect(describeCron("0 9 * * 5-7")).toBe("At 9:00 AM, on Friday through Sunday");

    // Thu-Sun (4-7 normalizes to [0, 4, 5, 6])
    expect(describeCron("0 9 * * 4-7")).toBe("At 9:00 AM, on Thursday through Sunday");

    // Wed-Sun (3-7 normalizes to [0, 3, 4, 5, 6])
    expect(describeCron("0 9 * * 3-7")).toBe("At 9:00 AM, on Wednesday through Sunday");

    // Tue combined with Wed-Sun range (2,3-7 normalizes to [0, 2, 3, 4, 5, 6])
    expect(describeCron("0 9 * * 2,3-7")).toBe("At 9:00 AM, on Tuesday through Sunday");
  });

  // ==========================================================================
  // BOUNDARY VALUES
  // ==========================================================================

  it("should handle boundary minute values", () => {
    expect(describeCron("59 * * * *")).toBe("At minute 59");
    expect(describeCron("1 * * * *")).toBe("At minute 1");
  });

  it("should handle boundary hour values", () => {
    expect(describeCron("0 23 * * *")).toBe("At 11:00 PM");
    expect(describeCron("0 13 * * *")).toBe("At 1:00 PM");
    expect(describeCron("30 0 * * *")).toBe("At 12:30 AM");
    expect(describeCron("30 23 * * *")).toBe("At 11:30 PM");
  });

  it("should handle boundary day values and special ordinals", () => {
    expect(describeCron("0 0 31 * *")).toBe("At 12:00 AM, on the 31st");
    expect(describeCron("0 0 11 * *")).toBe("At 12:00 AM, on the 11th");
    expect(describeCron("0 0 12 * *")).toBe("At 12:00 AM, on the 12th");
    expect(describeCron("0 0 13 * *")).toBe("At 12:00 AM, on the 13th");
    expect(describeCron("0 0 21 * *")).toBe("At 12:00 AM, on the 21st");
    expect(describeCron("0 0 22 * *")).toBe("At 12:00 AM, on the 22nd");
    expect(describeCron("0 0 23 * *")).toBe("At 12:00 AM, on the 23rd");
  });

  // ==========================================================================
  // WEEKDAY NORMALIZATION (Sunday can be 0 or 7)
  // ==========================================================================

  it("should normalize Sunday as either 0 or 7", () => {
    expect(describeCron("0 0 * * 7")).toBe("At 12:00 AM, on Sundays");
    expect(describeCron("0 0 * * 0")).toBe("At 12:00 AM, on Sundays");
  });

  // ==========================================================================
  // MONTH AND WEEKDAY NAME PARSING (case insensitivity)
  // ==========================================================================

  it("should parse month names case-insensitively", () => {
    expect(describeCron("0 0 1 JAN *")).toBe("At 12:00 AM, on the 1st in January");
    expect(describeCron("0 0 1 jan *")).toBe("At 12:00 AM, on the 1st in January");
    expect(describeCron("0 0 1 Jan *")).toBe("At 12:00 AM, on the 1st in January");
  });

  it("should parse weekday names case-insensitively", () => {
    expect(describeCron("0 0 * * SUN")).toBe("At 12:00 AM, on Sundays");
    expect(describeCron("0 0 * * mon")).toBe("At 12:00 AM, on Mondays");
  });

  // ==========================================================================
  // MULTIPLE NON-CONSECUTIVE RANGES
  // ==========================================================================

  it("should handle multiple non-consecutive ranges in minute field", () => {
    expect(describeCron("0-10,20-30 * * * *")).toBe(
      "At minutes 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, or 30",
    );
  });

  it("should handle multiple non-consecutive ranges in hour field", () => {
    expect(describeCron("0 1-5,10-15 * * *")).toBe(
      "At minute 0, at 1 AM, 2 AM, 3 AM, 4 AM, 5 AM, 10 AM, 11 AM, 12 PM, 1 PM, 2 PM, or 3 PM",
    );
    expect(describeCron("0 1-3,7-9 * * *")).toBe(
      "At minute 0, at 1 AM, 2 AM, 3 AM, 7 AM, 8 AM, or 9 AM",
    );
  });

  it("should handle multiple non-consecutive ranges in day field", () => {
    expect(describeCron("0 0 1-5,10-15 * *")).toBe(
      "At 12:00 AM, on the 1st, 2nd, 3rd, 4th, 5th, 10th, 11th, 12th, 13th, 14th, or 15th",
    );
    expect(describeCron("0 0 1-3,7-9 * *")).toBe(
      "At 12:00 AM, on the 1st, 2nd, 3rd, 7th, 8th, or 9th",
    );
  });

  it("should handle multiple non-consecutive ranges in month field", () => {
    expect(describeCron("0 0 1 1-3,6-9 *")).toBe(
      "At 12:00 AM, on the 1st in January, February, March, June, July, August, or September",
    );
    expect(describeCron("0 0 1 1-6,9-12 *")).toBe(
      "At 12:00 AM, on the 1st in January, February, March, April, May, June, September, October, November, or December",
    );
  });

  it("should handle multiple non-consecutive ranges in weekday field", () => {
    expect(describeCron("0 0 * * 0-2,4-6")).toBe(
      "At 12:00 AM, on Sundays, Mondays, Tuesdays, Thursdays, Fridays, or Saturdays",
    );
  });

  // ==========================================================================
  // EXACTLY 2 VALUES - CONSECUTIVE VS NON-CONSECUTIVE
  // ==========================================================================

  it("should handle exactly 2 consecutive values differently by field type", () => {
    expect(describeCron("5,6 * * * *")).toBe("At minutes 5 or 6");
    expect(describeCron("0 9,10 * * *")).toBe("At 9:00 AM or 10:00 AM");
    expect(describeCron("0 0 1,2 * *")).toBe("At 12:00 AM, on the 1st through 2nd");
    expect(describeCron("0 0 1 JAN,FEB *")).toBe("At 12:00 AM, on the 1st in January-February");
    expect(describeCron("0 0 * * 1,2")).toBe("At 12:00 AM, on Monday through Tuesday");
  });

  it("should handle exactly 2 non-consecutive values", () => {
    expect(describeCron("5,15 * * * *")).toBe("At minutes 5 or 15");
    expect(describeCron("0 9,15 * * *")).toBe("At 9:00 AM or 3:00 PM");
    expect(describeCron("0 0 1,15 * *")).toBe("At 12:00 AM, on the 1st or 15th");
    expect(describeCron("0 0 1 1,6 *")).toBe("At 12:00 AM, on the 1st in January or June");
    expect(describeCron("0 0 * * 1,5")).toBe("At 12:00 AM, on Mondays or Fridays");
  });

  // ==========================================================================
  // 3+ CONSECUTIVE VALUES - WHEN DOES LIST BECOME RANGE?
  // ==========================================================================

  it("should convert 3+ consecutive values to ranges where appropriate", () => {
    expect(describeCron("5,6,7 * * * *")).toBe("At minutes 5-7");
    expect(describeCron("0 9,10,11 * * *")).toBe("At 9:00 AM, 10:00 AM, or 11:00 AM");
    expect(describeCron("0 0 1,2,3 * *")).toBe("At 12:00 AM, on the 1st through 3rd");
  });

  // ==========================================================================
  // STEP PATTERNS FROM NON-ZERO START
  // ==========================================================================

  it("should list values for step patterns that don't start at 0", () => {
    expect(describeCron("10-50/20 * * * *")).toBe("At minutes 10, 30, or 50");
    expect(describeCron("5-25/5 * * * *")).toBe("At minutes 5, 10, 15, 20, or 25");
    expect(describeCron("0-30/15 * * * *")).toBe("At minutes 0, 15, or 30");
    expect(describeCron("0-12/6 * * * *")).toBe("At minutes 0, 6, or 12");
  });

  it("should handle step with single value (degenerate case)", () => {
    expect(describeCron("5-5/1 * * * *")).toBe("At minute 5");
  });

  // ==========================================================================
  // OR LOGIC WITH MONTH
  // ==========================================================================

  it("should handle OR logic combining day, weekday, and month", () => {
    expect(describeCron("0 0 1 6 1")).toBe("At 12:00 AM, on the 1st or on Mondays in June");
  });

  it("should handle non-consecutive months in list", () => {
    expect(describeCron("0 0 1 1,6,12 *")).toBe(
      "At 12:00 AM, on the 1st in January, June, or December",
    );
  });

  // ==========================================================================
  // LEAP YEAR AND DATE VALIDATION
  // ==========================================================================

  it("should allow Feb 29 (leap years)", () => {
    expect(describeCron("0 0 29 2 *")).toBe("At 12:00 AM, on the 29th in February");
  });

  it("should reject impossible date combinations", () => {
    expect(() => describeCron("0 0 31 2 *")).toThrow(
      "Invalid cron expression: no valid day/month combination exists",
    );
    expect(() => describeCron("0 0 30 2 *")).toThrow(
      "Invalid cron expression: no valid day/month combination exists",
    );
    expect(() => describeCron("0 0 31 4 *")).toThrow(
      "Invalid cron expression: no valid day/month combination exists",
    );
    expect(() => describeCron("0 0 31 6 *")).toThrow(
      "Invalid cron expression: no valid day/month combination exists",
    );
    expect(() => describeCron("0 0 31 9 *")).toThrow(
      "Invalid cron expression: no valid day/month combination exists",
    );
    expect(() => describeCron("0 0 31 11 *")).toThrow(
      "Invalid cron expression: no valid day/month combination exists",
    );
  });

  // ==========================================================================
  // FIRST AND LAST OF YEAR
  // ==========================================================================

  it("should handle first and last day of year", () => {
    expect(describeCron("0 0 1 1 *")).toBe("At 12:00 AM, on the 1st in January");
    expect(describeCron("0 12 1 1 *")).toBe("At 12:00 PM, on the 1st in January");
    expect(describeCron("0 0 31 12 *")).toBe("At 12:00 AM, on the 31st in December");
    expect(describeCron("59 23 31 12 *")).toBe("At 11:59 PM, on the 31st in December");
  });

  // ==========================================================================
  // EXPLICIT FULL RANGES (should behave as wildcards)
  // ==========================================================================

  it("should treat explicit full ranges as wildcards", () => {
    expect(describeCron("0-59 * * * *")).toBe("Every minute");
    expect(describeCron("* 0-23 * * *")).toBe("Every minute");
    expect(describeCron("* * 1-31 * *")).toBe("Every minute");
    expect(describeCron("* * * 1-12 *")).toBe("Every minute");
    expect(describeCron("* * * * 0-6")).toBe("Every minute");
    expect(describeCron("* * * * 0-7")).toBe("Every minute");
    expect(describeCron("0 0-23 * * *")).toBe("Every hour");
  });

  it("should handle month-only expressions (day and weekday are wildcards)", () => {
    // This tests the code path where dayPart is empty, weekdayPart is empty, but monthPart exists
    expect(describeCron("0 0 * 1 *")).toBe("At 12:00 AM, in January");
    expect(describeCron("0 0 * 6 *")).toBe("At 12:00 AM, in June");
    expect(describeCron("0 0 * 12 *")).toBe("At 12:00 AM, in December");
    expect(describeCron("30 14 * 3 *")).toBe("At 2:30 PM, in March");
    expect(describeCron("59 23 * 2 *")).toBe("At 11:59 PM, in February");
  });

  it("should handle month-list with wildcard day and weekday", () => {
    expect(describeCron("0 0 * 1,6 *")).toBe("At 12:00 AM, in January or June");
    // Consecutive months become a range
    expect(describeCron("0 0 * 1,2,3 *")).toBe("At 12:00 AM, in January-March");
  });

  describe("extreme boundary values", () => {
    it("should handle maximum values in all fields simultaneously", () => {
      // Last minute of last hour of last day of last month on Saturday
      expect(describeCron("59 23 31 12 6")).toBe(
        "At 11:59 PM, on the 31st or on Saturdays in December",
      );
    });

    it("should handle minimum values in all fields", () => {
      // First minute of first hour of first day of first month on Sunday
      // Note: Months are 1-indexed (1=January), not 0-indexed
      expect(describeCron("0 0 1 1 0")).toBe("At 12:00 AM, on the 1st or on Sundays in January");
    });

    it("should handle midnight and noon edge cases", () => {
      expect(describeCron("0 0 * * *")).toBe("At 12:00 AM");
      expect(describeCron("0 12 * * *")).toBe("At 12:00 PM");
      expect(describeCron("59 11 * * *")).toBe("At 11:59 AM");
      expect(describeCron("1 12 * * *")).toBe("At 12:01 PM");
      expect(describeCron("1 0 * * *")).toBe("At 12:01 AM");
    });
  });

  describe("complex mixed patterns", () => {
    it("should handle step + range + list in same expression", () => {
      // Step in minutes, range in hours, list in days
      expect(describeCron("*/10 9-17 1,15 * *")).toBe(
        "Every 10 minutes, between 9 AM and 5 PM, on the 1st or 15th",
      );
    });

    it("should handle maximum complexity with all field types", () => {
      // Multiple values in each field with different patterns
      // Note: 1,4,7,10 for months is detected as step pattern "every 3 months"
      expect(describeCron("*/5 6-18 1-7 1,4,7,10 1-5")).toBe(
        "Every 5 minutes, between 6 AM and 6 PM, on the 1st through 7th or on weekdays every 3 months",
      );
    });

    it("should handle step patterns that nearly complete the range", () => {
      // */3 hours would be 0,3,6,9,12,15,18,21 - almost all hours
      expect(describeCron("0 */3 * * *")).toBe("every 3 hours");
    });

    it("should handle overlapping patterns (ranges that include steps)", () => {
      // 0-12/6 gives 0,6,12 which is a partial step
      expect(describeCron("0 0-12/6 * * *")).toBe("At 12:00 AM, 6:00 AM, or 12:00 PM");
    });
  });

  describe("ordinal edge cases", () => {
    it("should handle all special ordinal cases", () => {
      // 11th, 12th, 13th are special (not 11st, 12nd, 13rd)
      expect(describeCron("0 0 11 * *")).toBe("At 12:00 AM, on the 11th");
      expect(describeCron("0 0 12 * *")).toBe("At 12:00 AM, on the 12th");
      expect(describeCron("0 0 13 * *")).toBe("At 12:00 AM, on the 13th");
      // 21st, 22nd, 23rd, 31st
      expect(describeCron("0 0 21 * *")).toBe("At 12:00 AM, on the 21st");
      expect(describeCron("0 0 22 * *")).toBe("At 12:00 AM, on the 22nd");
      expect(describeCron("0 0 23 * *")).toBe("At 12:00 AM, on the 23rd");
      expect(describeCron("0 0 31 * *")).toBe("At 12:00 AM, on the 31st");
      // 1st, 2nd, 3rd
      expect(describeCron("0 0 1 * *")).toBe("At 12:00 AM, on the 1st");
      expect(describeCron("0 0 2 * *")).toBe("At 12:00 AM, on the 2nd");
      expect(describeCron("0 0 3 * *")).toBe("At 12:00 AM, on the 3rd");
    });

    it("should handle ordinals in lists", () => {
      expect(describeCron("0 0 1,2,3,11,12,13,21,22,23 * *")).toBe(
        "At 12:00 AM, on the 1st, 2nd, 3rd, 11th, 12th, 13th, 21st, 22nd, or 23rd",
      );
    });
  });

  describe("very long descriptions", () => {
    it("should produce long output with many non-consecutive values", () => {
      // Many minutes that don't form a pattern
      const result = describeCron("1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39 * * * *");
      expect(result).toBe(
        "At minutes 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, or 39",
      );
    });

    it("should produce very long output with many hours", () => {
      // Non-consecutive hours
      const result = describeCron("0 0,2,4,6,8,10,12,14,16,18,20,22 * * *");
      expect(result).toBe("every 2 hours");
    });

    it("should produce long output with many days", () => {
      // Note: 1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31 is detected as step pattern "every 2 days"
      const result = describeCron("0 0 1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31 * *");
      expect(result).toBe("At 12:00 AM, every 2 days");
      // Use non-step pattern for long output (1,4,7,10... is step of 3)
      // Use a truly random pattern that won't be detected as step
      const result2 = describeCron("0 0 1,2,5,9,14,20,27 * *");
      expect(result2).toBe("At 12:00 AM, on the 1st, 2nd, 5th, 9th, 14th, 20th, or 27th");
    });

    it("should produce maximum length description with all verbose fields", () => {
      // Maximum verbosity: non-pattern values in all fields
      const result = describeCron(
        "1,7,13,19,25,31,37,43,49,55 1,4,7,10,13,16,19,22 2,5,8,11,14,17,20,23,26,29 1,3,5,7,9 1,2,4,6",
      );
      expect(result).toContain("At minutes");
      expect(result).toContain("at");
      expect(result).toContain("on the");
      expect(result).toContain("or on");
      expect(result).toContain("in");
      expect(result.length).toBeGreaterThan(100);
    });

    it("should handle maximum combined verbosity", () => {
      // All fields non-wildcard, non-pattern
      // Note: 1,8,15,22,29 for days is detected as step pattern "every 7 days"
      const result = describeCron("5,15,25,35,45,55 3,7,11,15,19,23 1,8,15,22,29 2,5,8,11 0,2,4,6");
      expect(result).toBe(
        "At minutes 5, 15, 25, 35, 45, or 55, at 3 AM, 7 AM, 11 AM, 3 PM, 7 PM, or 11 PM, every 7 days or on Sundays, Tuesdays, Thursdays, or Saturdays in February, May, August, or November",
      );
    });
  });

  describe("weekday combinations", () => {
    it("should handle all possible weekday ranges", () => {
      expect(describeCron("0 0 * * 0-1")).toBe("At 12:00 AM, on Sunday through Monday");
      expect(describeCron("0 0 * * 0-2")).toBe("At 12:00 AM, on Sunday through Tuesday");
      expect(describeCron("0 0 * * 0-3")).toBe("At 12:00 AM, on Sunday through Wednesday");
      expect(describeCron("0 0 * * 0-4")).toBe("At 12:00 AM, on Sunday through Thursday");
      expect(describeCron("0 0 * * 0-5")).toBe("At 12:00 AM, on Sunday through Friday");
      // 0-6 is all 7 weekdays, which is a wildcard - specific time format is used
      expect(describeCron("0 0 * * 0-6")).toBe("At 12:00 AM");
    });

    it("should handle non-contiguous weekday combinations", () => {
      expect(describeCron("0 0 * * 0,2,4")).toBe("At 12:00 AM, on Sundays, Tuesdays, or Thursdays");
      expect(describeCron("0 0 * * 1,3,5")).toBe("At 12:00 AM, on Mondays, Wednesdays, or Fridays");
    });

    it("should handle all wrap-around cases", () => {
      // Sat-Sun
      expect(describeCron("0 0 * * 6-7")).toBe("At 12:00 AM, on weekends");
      // Fri-Sun
      expect(describeCron("0 0 * * 5-7")).toBe("At 12:00 AM, on Friday through Sunday");
      // Thu-Sun
      expect(describeCron("0 0 * * 4-7")).toBe("At 12:00 AM, on Thursday through Sunday");
      // Wed-Sun
      expect(describeCron("0 0 * * 3-7")).toBe("At 12:00 AM, on Wednesday through Sunday");
      // Tue-Sun
      expect(describeCron("0 0 * * 2-7")).toBe("At 12:00 AM, on Tuesday through Sunday");
      // Mon-Sun normalizes to all 7 weekdays (1,2,3,4,5,6,0), which is a wildcard
      expect(describeCron("0 0 * * 1-7")).toBe("At 12:00 AM");
    });
  });

  describe("month combinations", () => {
    it("should handle all month ranges", () => {
      // Note: Months are 1-indexed (1=January, 12=December)
      expect(describeCron("0 0 1 1-2 *")).toBe("At 12:00 AM, on the 1st in January-February");
      expect(describeCron("0 0 1 1-3 *")).toBe("At 12:00 AM, on the 1st in January-March");
      expect(describeCron("0 0 1 1-6 *")).toBe("At 12:00 AM, on the 1st in January-June");
      expect(describeCron("0 0 1 6-8 *")).toBe("At 12:00 AM, on the 1st in June-August");
      expect(describeCron("0 0 1 9-11 *")).toBe("At 12:00 AM, on the 1st in September-November");
    });

    it("should handle quarterly patterns", () => {
      expect(describeCron("0 0 1 */3 *")).toBe("At 12:00 AM, on the 1st every 3 months");
      expect(describeCron("0 0 1 */4 *")).toBe("At 12:00 AM, on the 1st every 4 months");
      // */6 gives [0,6] but months are 1-indexed, so this is [1,7] = January and July
      expect(describeCron("0 0 1 */6 *")).toBe("At 12:00 AM, on the 1st in January or July");
    });

    it("should handle non-consecutive months", () => {
      // Note: Months are 1-indexed (1=Jan, 4=Apr, 7=Jul, 10=Oct)
      expect(describeCron("0 0 1 1,4,7,10 *")).toBe("At 12:00 AM, on the 1st every 3 months");
      expect(describeCron("0 0 1 2,5,8,11 *")).toBe(
        "At 12:00 AM, on the 1st in February, May, August, or November",
      );
    });
  });

  describe("unusual but valid combinations", () => {
    it("should handle single values in all fields", () => {
      // Note: Month 6 is June, month 7 is July
      expect(describeCron("30 14 15 7 3")).toBe("At 2:30 PM, on the 15th or on Wednesdays in July");
    });

    it("should handle Feb 29 (leap year day)", () => {
      expect(describeCron("0 0 29 2 *")).toBe("At 12:00 AM, on the 29th in February");
    });

    it("should handle the last day of each month type", () => {
      // 31-day months: Jan(1), Mar(3), May(5), Jul(7), Aug(8), Oct(10), Dec(12)
      expect(describeCron("0 0 31 1 *")).toBe("At 12:00 AM, on the 31st in January");
      expect(describeCron("0 0 31 3 *")).toBe("At 12:00 AM, on the 31st in March");
      expect(describeCron("0 0 31 7 *")).toBe("At 12:00 AM, on the 31st in July");
      expect(describeCron("0 0 31 12 *")).toBe("At 12:00 AM, on the 31st in December");
      // 30-day months: Apr(4), Jun(6), Sep(9), Nov(11)
      expect(describeCron("0 0 30 4 *")).toBe("At 12:00 AM, on the 30th in April");
      expect(describeCron("0 0 30 6 *")).toBe("At 12:00 AM, on the 30th in June");
    });

    it("should handle step patterns with large steps", () => {
      expect(describeCron("*/20 * * * *")).toBe("Every 20 minutes");
      expect(describeCron("*/30 * * * *")).toBe("Every 30 minutes");
      // */12 hours gives [0, 12] which is 2 values - uses "At X or Y" format
      expect(describeCron("0 */12 * * *")).toBe("at 12 AM or 12 PM");
    });

    it("should handle ranges spanning specific boundaries", () => {
      // Hour range crossing noon - 5 hours with single minute 0 uses "At X:00 or Y:00" format
      expect(describeCron("0 10-14 * * *")).toBe(
        "At 10:00 AM, 11:00 AM, 12:00 PM, 1:00 PM, or 2:00 PM",
      );
      // Hour range crossing midnight is NOT supported (22-2 is invalid, start > end)
      // Using explicit list for wrap-around hours - note that hours get sorted,
      // so 22,23,0,1,2 becomes 0,1,2,22,23, which with minute 0 gives "At X:00" format
      expect(describeCron("0 22,23,0,1,2 * * *")).toBe(
        "At 12:00 AM, 1:00 AM, 2:00 AM, 10:00 PM, or 11:00 PM",
      );
    });
  });

  describe("time formatting edge cases", () => {
    it("should format 12-hour times correctly at boundaries", () => {
      expect(describeCron("0 0 * * *")).toBe("At 12:00 AM"); // Midnight
      expect(describeCron("0 12 * * *")).toBe("At 12:00 PM"); // Noon
      expect(describeCron("1 0 * * *")).toBe("At 12:01 AM");
      expect(describeCron("59 0 * * *")).toBe("At 12:59 AM");
      expect(describeCron("0 1 * * *")).toBe("At 1:00 AM");
      expect(describeCron("0 11 * * *")).toBe("At 11:00 AM");
      expect(describeCron("0 13 * * *")).toBe("At 1:00 PM");
      expect(describeCron("0 23 * * *")).toBe("At 11:00 PM");
    });

    it("should format minute values with leading zeros", () => {
      expect(describeCron("5 0 * * *")).toBe("At 12:05 AM");
      expect(describeCron("0 0 * * *")).toBe("At 12:00 AM");
      expect(describeCron("59 23 * * *")).toBe("At 11:59 PM");
    });
  });

  describe("multiple specific times detection", () => {
    it("should detect 2-5 specific times with same minute", () => {
      expect(describeCron("0 9,17 * * *")).toBe("At 9:00 AM or 5:00 PM");
      expect(describeCron("0 9,12,17 * * *")).toBe("At 9:00 AM, 12:00 PM, or 5:00 PM");
      expect(describeCron("0 6,9,12,15,18 * * *")).toBe(
        "At 6:00 AM, 9:00 AM, 12:00 PM, 3:00 PM, or 6:00 PM",
      );
    });

    it("should switch to range description for 6+ consecutive hours", () => {
      expect(describeCron("0 9,10,11,12,13,14 * * *")).toBe("At minute 0, between 9 AM and 2 PM");
    });
  });
});

describe("helper functions", () => {
  describe("formatStringList", () => {
    it("should handle empty array", () => {
      expect(formatStringList([])).toBe("");
    });

    it("should handle single item", () => {
      expect(formatStringList(["10 AM"])).toBe("10 AM");
    });

    it("should handle two items with 'or'", () => {
      expect(formatStringList(["10 AM", "2 PM"])).toBe("10 AM or 2 PM");
    });

    it("should handle three+ items with commas and final 'or'", () => {
      expect(formatStringList(["a", "b", "c"])).toBe("a, b, or c");
      expect(formatStringList(["a", "b", "c", "d"])).toBe("a, b, c, or d");
    });
  });

  describe("detectStep", () => {
    it("should return null for single value", () => {
      expect(detectStep([5], 0, 59)).toBe(null);
    });

    it("should return null for descending values (step <= 0)", () => {
      expect(detectStep([10, 5, 1], 0, 59)).toBe(null);
      expect(detectStep([5, 5, 5], 0, 59)).toBe(null);
    });

    it("should return null for non-step patterns", () => {
      expect(detectStep([0, 5, 11, 15], 0, 59)).toBe(null);
    });

    it("should return null for step patterns not starting at min", () => {
      expect(detectStep([5, 10, 15, 20], 0, 59)).toBe(null);
    });

    it("should return null for partial step patterns", () => {
      expect(detectStep([0, 5, 10], 0, 59)).toBe(null);
    });

    it("should detect complete step patterns", () => {
      expect(detectStep([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55], 0, 59)).toBe(5);
      expect(detectStep([0, 10, 20, 30, 40, 50], 0, 59)).toBe(10);
      expect(detectStep([0, 15, 30, 45], 0, 59)).toBe(15);
    });
  });

  describe("isConsecutive", () => {
    it("should return false for single value", () => {
      expect(isConsecutive([5])).toBe(false);
    });

    it("should return false for empty array", () => {
      expect(isConsecutive([])).toBe(false);
    });

    it("should return true for consecutive values", () => {
      expect(isConsecutive([1, 2, 3])).toBe(true);
      expect(isConsecutive([5, 6, 7, 8, 9])).toBe(true);
    });

    it("should return false for non-consecutive values", () => {
      expect(isConsecutive([1, 3, 5])).toBe(false);
      expect(isConsecutive([1, 2, 4])).toBe(false);
    });
  });

  describe("detectWeekdayWrapAround", () => {
    it("should return null for less than 3 weekdays", () => {
      expect(detectWeekdayWrapAround([0])).toBe(null);
      expect(detectWeekdayWrapAround([0, 6])).toBe(null);
    });

    it("should return null when Sunday (0) is not included", () => {
      expect(detectWeekdayWrapAround([1, 2, 3])).toBe(null);
      expect(detectWeekdayWrapAround([2, 3, 4, 5, 6])).toBe(null);
    });

    it("should return null when only Sunday is present", () => {
      expect(detectWeekdayWrapAround([0])).toBe(null);
    });

    it("should return null when all values are Sunday (with duplicates)", () => {
      // This tests line 301 - withoutSunday.length === 0
      expect(detectWeekdayWrapAround([0, 0, 0])).toBe(null);
    });

    it("should return null when min weekday is Monday (not a wrap-around)", () => {
      expect(detectWeekdayWrapAround([0, 1, 2, 3, 4, 5, 6])).toBe(null);
    });

    it("should return null when there's a gap in the wrap-around range", () => {
      expect(detectWeekdayWrapAround([0, 2, 4, 5, 6])).toBe(null);
    });

    it("should return null when count matches but gap exists (with duplicates)", () => {
      // This tests the gap detection in the for loop (line 311)
      // Count is 6, expectedCount is 6, but there's a gap at 4
      expect(detectWeekdayWrapAround([0, 0, 2, 3, 5, 6])).toBe(null);
    });

    it("should detect valid wrap-around patterns", () => {
      expect(detectWeekdayWrapAround([0, 5, 6])).toEqual({ start: 5 });
      expect(detectWeekdayWrapAround([0, 4, 5, 6])).toEqual({ start: 4 });
      expect(detectWeekdayWrapAround([0, 3, 4, 5, 6])).toEqual({ start: 3 });
      expect(detectWeekdayWrapAround([0, 2, 3, 4, 5, 6])).toEqual({ start: 2 });
    });
  });
});
