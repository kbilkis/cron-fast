import { describe, it, expect } from "vitest";
import {
  matches,
  findNext,
  findPrevious,
  getDaysInMonth,
  isOrMode,
  matchesDayOrWeekday,
} from "../src/matcher.js";
import { parse } from "../src/parser.js";
import type { ParsedCron } from "../src/types.js";

describe("matcher", () => {
  describe("matches", () => {
    it("should match exact time", () => {
      const parsed = parse("30 14 * * *");
      const date = new Date("2026-03-15T14:30:00Z");

      expect(matches(parsed, date)).toBe(true);
    });

    it("should not match different minute", () => {
      const parsed = parse("30 14 * * *");
      const date = new Date("2026-03-15T14:31:00Z");

      expect(matches(parsed, date)).toBe(false);
    });

    it("should not match different hour", () => {
      const parsed = parse("30 14 * * *");
      const date = new Date("2026-03-15T15:30:00Z");

      expect(matches(parsed, date)).toBe(false);
    });

    it("should match wildcard minute", () => {
      const parsed = parse("* 14 * * *");
      const date1 = new Date("2026-03-15T14:00:00Z");
      const date2 = new Date("2026-03-15T14:30:00Z");
      const date3 = new Date("2026-03-15T14:59:00Z");

      expect(matches(parsed, date1)).toBe(true);
      expect(matches(parsed, date2)).toBe(true);
      expect(matches(parsed, date3)).toBe(true);
    });

    it("should match step values", () => {
      const parsed = parse("*/15 * * * *");
      const date1 = new Date("2026-03-15T14:00:00Z");
      const date2 = new Date("2026-03-15T14:15:00Z");
      const date3 = new Date("2026-03-15T14:30:00Z");
      const date4 = new Date("2026-03-15T14:45:00Z");
      const date5 = new Date("2026-03-15T14:10:00Z");

      expect(matches(parsed, date1)).toBe(true);
      expect(matches(parsed, date2)).toBe(true);
      expect(matches(parsed, date3)).toBe(true);
      expect(matches(parsed, date4)).toBe(true);
      expect(matches(parsed, date5)).toBe(false);
    });

    it("should match specific day of month", () => {
      const parsed = parse("0 9 15 * *");
      const date1 = new Date("2026-03-15T09:00:00Z");
      const date2 = new Date("2026-03-16T09:00:00Z");

      expect(matches(parsed, date1)).toBe(true);
      expect(matches(parsed, date2)).toBe(false);
    });

    it("should match specific month", () => {
      const parsed = parse("0 9 * 3 *");
      const date1 = new Date("2026-03-15T09:00:00Z");
      const date2 = new Date("2026-04-15T09:00:00Z");

      expect(matches(parsed, date1)).toBe(true);
      expect(matches(parsed, date2)).toBe(false);
    });

    it("should match specific weekday", () => {
      const parsed = parse("0 9 * * 1"); // Monday
      const monday = new Date("2026-03-16T09:00:00Z"); // Monday
      const tuesday = new Date("2026-03-17T09:00:00Z"); // Tuesday

      expect(matches(parsed, monday)).toBe(true);
      expect(matches(parsed, tuesday)).toBe(false);
    });

    it("should use OR logic when both day and weekday are specified", () => {
      // Run on 15th OR on Mondays
      const parsed = parse("0 9 15 * 1");
      const june15Monday = new Date("2026-06-15T09:00:00Z"); // 15th AND Monday
      const march16Monday = new Date("2026-03-16T09:00:00Z"); // 16th but Monday
      const march15Sunday = new Date("2026-03-15T09:00:00Z"); // 15th but Sunday
      const march17Tuesday = new Date("2026-03-17T09:00:00Z"); // 17th and Tuesday

      expect(matches(parsed, june15Monday)).toBe(true); // Matches both day=15 AND weekday=Monday
      expect(matches(parsed, march16Monday)).toBe(true); // Matches weekday=Monday only
      expect(matches(parsed, march15Sunday)).toBe(true); // Matches day=15 only
      expect(matches(parsed, march17Tuesday)).toBe(false); // Matches neither
    });

    it("should match range of values", () => {
      const parsed = parse("0 9-17 * * *"); // 9 AM to 5 PM
      const date1 = new Date("2026-03-15T09:00:00Z");
      const date2 = new Date("2026-03-15T12:00:00Z");
      const date3 = new Date("2026-03-15T17:00:00Z");
      const date4 = new Date("2026-03-15T08:00:00Z");
      const date5 = new Date("2026-03-15T18:00:00Z");

      expect(matches(parsed, date1)).toBe(true);
      expect(matches(parsed, date2)).toBe(true);
      expect(matches(parsed, date3)).toBe(true);
      expect(matches(parsed, date4)).toBe(false);
      expect(matches(parsed, date5)).toBe(false);
    });

    it("should match list of values", () => {
      const parsed = parse("0 9,12,15 * * *");
      const date1 = new Date("2026-03-15T09:00:00Z");
      const date2 = new Date("2026-03-15T12:00:00Z");
      const date3 = new Date("2026-03-15T15:00:00Z");
      const date4 = new Date("2026-03-15T10:00:00Z");

      expect(matches(parsed, date1)).toBe(true);
      expect(matches(parsed, date2)).toBe(true);
      expect(matches(parsed, date3)).toBe(true);
      expect(matches(parsed, date4)).toBe(false);
    });

    describe("boundary values", () => {
      it("should match all wildcards expression * * * * *", () => {
        // This is the identity element of cron expressions - matches any possible date
        const parsed = parse("* * * * *");

        // Test across various dates to ensure it truly matches everything
        const dates = [
          new Date("2026-01-01T00:00:00Z"), // Year start, midnight
          new Date("2026-12-31T23:59:00Z"), // Year end, last minute
          new Date("2026-06-15T12:30:00Z"), // Mid-year, mid-day
          new Date("2024-02-29T00:00:00Z"), // Leap year Feb 29
          new Date("2026-02-28T23:59:00Z"), // Non-leap year Feb 28
        ];

        for (const date of dates) {
          expect(matches(parsed, date)).toBe(true);
        }
      });

      it("should match minute boundary values 0 and 59", () => {
        // Testing the edges of the minute field (0-59)
        const parsedAt0 = parse("0 * * * *");
        const parsedAt59 = parse("59 * * * *");

        const minute0 = new Date("2026-03-15T14:00:00Z");
        const minute59 = new Date("2026-03-15T14:59:00Z");
        const minute30 = new Date("2026-03-15T14:30:00Z");

        expect(matches(parsedAt0, minute0)).toBe(true);
        expect(matches(parsedAt0, minute59)).toBe(false);
        expect(matches(parsedAt0, minute30)).toBe(false);

        expect(matches(parsedAt59, minute59)).toBe(true);
        expect(matches(parsedAt59, minute0)).toBe(false);
        expect(matches(parsedAt59, minute30)).toBe(false);
      });

      it("should match hour boundary values 0 and 23", () => {
        // Testing the edges of the hour field (0-23)
        const parsedAt0 = parse("0 0 * * *");
        const parsedAt23 = parse("0 23 * * *");

        const hour0 = new Date("2026-03-15T00:00:00Z");
        const hour23 = new Date("2026-03-15T23:00:00Z");
        const hour12 = new Date("2026-03-15T12:00:00Z");

        expect(matches(parsedAt0, hour0)).toBe(true);
        expect(matches(parsedAt0, hour23)).toBe(false);
        expect(matches(parsedAt0, hour12)).toBe(false);

        expect(matches(parsedAt23, hour23)).toBe(true);
        expect(matches(parsedAt23, hour0)).toBe(false);
        expect(matches(parsedAt23, hour12)).toBe(false);
      });

      it("should match day boundary values 1 and 31", () => {
        // Testing the edges of the day-of-month field (1-31)
        const parsedAt1 = parse("0 0 1 * *");
        const parsedAt31 = parse("0 0 31 * *");

        const day1 = new Date("2026-03-01T00:00:00Z");
        const day31 = new Date("2026-03-31T00:00:00Z");
        const day15 = new Date("2026-03-15T00:00:00Z");

        expect(matches(parsedAt1, day1)).toBe(true);
        expect(matches(parsedAt1, day31)).toBe(false);
        expect(matches(parsedAt1, day15)).toBe(false);

        expect(matches(parsedAt31, day31)).toBe(true);
        expect(matches(parsedAt31, day1)).toBe(false);
        expect(matches(parsedAt31, day15)).toBe(false);
      });

      it("should match month boundary values 0 (January) and 11 (December)", () => {
        // Note: Internally months are 0-indexed (0=Jan, 11=Dec)
        // Parser converts from cron's 1-indexed format (1-12) to 0-indexed
        const parsedJan = parse("0 0 1 1 *"); // January
        const parsedDec = parse("0 0 1 12 *"); // December

        const jan1 = new Date("2026-01-01T00:00:00Z");
        const dec1 = new Date("2026-12-01T00:00:00Z");
        const jun1 = new Date("2026-06-01T00:00:00Z");

        expect(matches(parsedJan, jan1)).toBe(true);
        expect(matches(parsedJan, dec1)).toBe(false);
        expect(matches(parsedJan, jun1)).toBe(false);

        expect(matches(parsedDec, dec1)).toBe(true);
        expect(matches(parsedDec, jan1)).toBe(false);
        expect(matches(parsedDec, jun1)).toBe(false);
      });

      it("should match weekday boundary values 0 (Sunday) and 6 (Saturday)", () => {
        const parsedSunday = parse("0 0 * * 0"); // Sunday
        const parsedSaturday = parse("0 0 * * 6"); // Saturday

        // 2026-03-15 is a Sunday, 2026-03-21 is a Saturday
        const sunday = new Date("2026-03-15T00:00:00Z");
        const saturday = new Date("2026-03-21T00:00:00Z");
        const wednesday = new Date("2026-03-18T00:00:00Z");

        expect(matches(parsedSunday, sunday)).toBe(true);
        expect(matches(parsedSunday, saturday)).toBe(false);
        expect(matches(parsedSunday, wednesday)).toBe(false);

        expect(matches(parsedSaturday, saturday)).toBe(true);
        expect(matches(parsedSaturday, sunday)).toBe(false);
        expect(matches(parsedSaturday, wednesday)).toBe(false);
      });
    });

    describe("complex expressions", () => {
      it("should match multiple ranges like 10-20,30-40", () => {
        // This tests the comma operator combining two distinct ranges
        const parsed = parse("10-20,30-40 * * * *");

        // Inside first range
        expect(matches(parsed, new Date("2026-03-15T00:10:00Z"))).toBe(true);
        expect(matches(parsed, new Date("2026-03-15T00:15:00Z"))).toBe(true);
        expect(matches(parsed, new Date("2026-03-15T00:20:00Z"))).toBe(true);

        // Gap between ranges (21-29)
        expect(matches(parsed, new Date("2026-03-15T00:21:00Z"))).toBe(false);
        expect(matches(parsed, new Date("2026-03-15T00:25:00Z"))).toBe(false);
        expect(matches(parsed, new Date("2026-03-15T00:29:00Z"))).toBe(false);

        // Inside second range
        expect(matches(parsed, new Date("2026-03-15T00:30:00Z"))).toBe(true);
        expect(matches(parsed, new Date("2026-03-15T00:35:00Z"))).toBe(true);
        expect(matches(parsed, new Date("2026-03-15T00:40:00Z"))).toBe(true);

        // Outside both ranges
        expect(matches(parsed, new Date("2026-03-15T00:05:00Z"))).toBe(false);
        expect(matches(parsed, new Date("2026-03-15T00:45:00Z"))).toBe(false);
      });

      it("should match step with range like 10-20/5", () => {
        // This tests step values applied to a specific range (not wildcard)
        // 10-20/5 should match: 10, 15, 20
        const parsed = parse("10-20/5 * * * *");

        expect(matches(parsed, new Date("2026-03-15T00:10:00Z"))).toBe(true);
        expect(matches(parsed, new Date("2026-03-15T00:15:00Z"))).toBe(true);
        expect(matches(parsed, new Date("2026-03-15T00:20:00Z"))).toBe(true);

        // Values in range but not on step boundary
        expect(matches(parsed, new Date("2026-03-15T00:11:00Z"))).toBe(false);
        expect(matches(parsed, new Date("2026-03-15T00:14:00Z"))).toBe(false);
        expect(matches(parsed, new Date("2026-03-15T00:16:00Z"))).toBe(false);

        // Values outside range
        expect(matches(parsed, new Date("2026-03-15T00:05:00Z"))).toBe(false);
        expect(matches(parsed, new Date("2026-03-15T00:25:00Z"))).toBe(false);
      });

      it("should match complex business hours expression */5 9-17 * * 1-5", () => {
        // Classic "every 5 minutes during business hours on weekdays" pattern
        const parsed = parse("*/5 9-17 * * 1-5");

        // Monday March 16, 2026 - weekday
        const monday9am = new Date("2026-03-16T09:00:00Z");
        const monday9_05 = new Date("2026-03-16T09:05:00Z");
        const monday9_03 = new Date("2026-03-16T09:03:00Z");
        const monday17pm = new Date("2026-03-16T17:00:00Z");
        const monday18pm = new Date("2026-03-16T18:00:00Z");

        expect(matches(parsed, monday9am)).toBe(true);
        expect(matches(parsed, monday9_05)).toBe(true);
        expect(matches(parsed, monday9_03)).toBe(false); // Not on 5-minute boundary
        expect(matches(parsed, monday17pm)).toBe(true);
        expect(matches(parsed, monday18pm)).toBe(false); // Outside business hours

        // Sunday March 15, 2026 - weekend
        const sunday9am = new Date("2026-03-15T09:00:00Z");
        expect(matches(parsed, sunday9am)).toBe(false); // Not a weekday
      });

      it("should match combination of list and range 1,15,30-45", () => {
        // Tests mixing single values with ranges
        const parsed = parse("1,15,30-45 * * * *");

        // Single values
        expect(matches(parsed, new Date("2026-03-15T00:01:00Z"))).toBe(true);
        expect(matches(parsed, new Date("2026-03-15T00:15:00Z"))).toBe(true);

        // In range
        expect(matches(parsed, new Date("2026-03-15T00:30:00Z"))).toBe(true);
        expect(matches(parsed, new Date("2026-03-15T00:37:00Z"))).toBe(true);
        expect(matches(parsed, new Date("2026-03-15T00:45:00Z"))).toBe(true);

        // Not in any specified value
        expect(matches(parsed, new Date("2026-03-15T00:02:00Z"))).toBe(false);
        expect(matches(parsed, new Date("2026-03-15T00:29:00Z"))).toBe(false);
        expect(matches(parsed, new Date("2026-03-15T00:46:00Z"))).toBe(false);
      });

      it("should match last day of February in non-leap year (28 days)", () => {
        // 2026 is not a leap year, Feb has 28 days
        const parsed = parse("0 0 28 2 *");

        const feb28 = new Date("2026-02-28T00:00:00Z");
        const feb27 = new Date("2026-02-27T00:00:00Z");
        const mar1 = new Date("2026-03-01T00:00:00Z");

        expect(matches(parsed, feb28)).toBe(true);
        expect(matches(parsed, feb27)).toBe(false);
        expect(matches(parsed, mar1)).toBe(false);
      });

      it("should match last day of February in leap year (29 days)", () => {
        // 2024 is a leap year, Feb has 29 days
        const parsed = parse("0 0 29 2 *");

        const feb29 = new Date("2024-02-29T00:00:00Z");
        const feb28 = new Date("2024-02-28T00:00:00Z");
        const mar1 = new Date("2024-03-01T00:00:00Z");

        expect(matches(parsed, feb29)).toBe(true);
        expect(matches(parsed, feb28)).toBe(false);
        expect(matches(parsed, mar1)).toBe(false);
      });

      it("should match day 31 only in months with 31 days", () => {
        const parsed = parse("0 0 31 * *");

        // January - 31 days
        expect(matches(parsed, new Date("2026-01-31T00:00:00Z"))).toBe(true);

        // February - 28/29 days (no 31st)
        // Feb 31 doesn't exist, so no date to test

        // March - 31 days
        expect(matches(parsed, new Date("2026-03-31T00:00:00Z"))).toBe(true);

        // April - 30 days (no 31st)

        // May - 31 days
        expect(matches(parsed, new Date("2026-05-31T00:00:00Z"))).toBe(true);

        // June - 30 days (no 31st)

        // July - 31 days
        expect(matches(parsed, new Date("2026-07-31T00:00:00Z"))).toBe(true);

        // August - 31 days
        expect(matches(parsed, new Date("2026-08-31T00:00:00Z"))).toBe(true);

        // September - 30 days (no 31st)

        // October - 31 days
        expect(matches(parsed, new Date("2026-10-31T00:00:00Z"))).toBe(true);

        // November - 30 days (no 31st)

        // December - 31 days
        expect(matches(parsed, new Date("2026-12-31T00:00:00Z"))).toBe(true);
      });

      it("should match day 30 in months with at least 30 days", () => {
        const parsed = parse("0 0 30 * *");

        // January - 31 days
        expect(matches(parsed, new Date("2026-01-30T00:00:00Z"))).toBe(true);

        // February - 28/29 days (no 30th in non-leap year)

        // April - 30 days
        expect(matches(parsed, new Date("2026-04-30T00:00:00Z"))).toBe(true);

        // June - 30 days
        expect(matches(parsed, new Date("2026-06-30T00:00:00Z"))).toBe(true);

        // September - 30 days
        expect(matches(parsed, new Date("2026-09-30T00:00:00Z"))).toBe(true);

        // November - 30 days
        expect(matches(parsed, new Date("2026-11-30T00:00:00Z"))).toBe(true);
      });
    });

    describe("year boundary transitions", () => {
      it("should match year boundary December 31", () => {
        const parsed = parse("0 23 31 12 *");

        const dec31_23 = new Date("2026-12-31T23:00:00Z");
        const dec31_22 = new Date("2026-12-31T22:00:00Z");
        const jan1_00 = new Date("2027-01-01T00:00:00Z");

        expect(matches(parsed, dec31_23)).toBe(true);
        expect(matches(parsed, dec31_22)).toBe(false);
        expect(matches(parsed, jan1_00)).toBe(false);
      });

      it("should match year boundary January 1", () => {
        const parsed = parse("0 0 1 1 *");

        const jan1_00 = new Date("2027-01-01T00:00:00Z");
        const dec31_23 = new Date("2026-12-31T23:00:00Z");
        const jan1_01 = new Date("2027-01-01T01:00:00Z");

        expect(matches(parsed, jan1_00)).toBe(true);
        expect(matches(parsed, dec31_23)).toBe(false);
        expect(matches(parsed, jan1_01)).toBe(false);
      });

      it("should correctly handle year transition across midnight", () => {
        // Test a cron that runs every minute at year boundary
        const parsed = parse("* * 31 12 *");

        // Last minutes of the year
        expect(matches(parsed, new Date("2026-12-31T23:59:00Z"))).toBe(true);
        expect(matches(parsed, new Date("2026-12-31T00:00:00Z"))).toBe(true);

        // First minute of new year - different month/day, shouldn't match Dec 31 expression
        expect(matches(parsed, new Date("2027-01-01T00:00:00Z"))).toBe(false);

        // But should match Jan 1 expression
        const parsedJan1 = parse("* * 1 1 *");
        expect(matches(parsedJan1, new Date("2027-01-01T00:00:00Z"))).toBe(true);
      });
    });
  });

  describe("findNext", () => {
    it("should find next value equal to target", () => {
      const values = [0, 15, 30, 45];
      expect(findNext(values, 15)).toBe(15);
    });

    it("should find next value greater than target", () => {
      const values = [0, 15, 30, 45];
      expect(findNext(values, 16)).toBe(30);
    });

    it("should return first value if target is before all", () => {
      const values = [0, 15, 30, 45];
      expect(findNext(values, -1)).toBe(0);
    });

    it("should return null if target is after all values", () => {
      const values = [0, 15, 30, 45];
      expect(findNext(values, 50)).toBeNull();
    });

    it("should work with single value", () => {
      const values = [30];
      expect(findNext(values, 20)).toBe(30);
      expect(findNext(values, 30)).toBe(30);
      expect(findNext(values, 40)).toBeNull();
    });

    it("should work with unsorted values", () => {
      const values = [30, 0, 45, 15];
      expect(findNext(values, 10)).toBe(30);
    });

    it("should return null for empty array", () => {
      // The empty array is the identity element for "no possible values"
      // Any target should return null since there's nothing to find
      expect(findNext([], 0)).toBeNull();
      expect(findNext([], 50)).toBeNull();
      expect(findNext([], -100)).toBeNull();
    });

    it("should handle negative targets", () => {
      // Negative targets could represent "before the start" in some contexts
      const values = [0, 15, 30, 45];

      // All negative targets should return the first element
      expect(findNext(values, -1)).toBe(0);
      expect(findNext(values, -100)).toBe(0);
      expect(findNext(values, -999999)).toBe(0);
    });

    it("should handle floating point targets with truncation behavior", () => {
      // Testing how the function handles non-integer targets
      // The function uses >= comparison, so 15.5 should find 30 (next integer >= 15.5)
      const values = [0, 15, 30, 45];

      expect(findNext(values, 15.5)).toBe(30);
      expect(findNext(values, 14.9)).toBe(15);
      expect(findNext(values, 0.1)).toBe(15);
      expect(findNext(values, 29.999)).toBe(30);
      expect(findNext(values, 30.0)).toBe(30);
      expect(findNext(values, 30.001)).toBe(45);
    });

    it("should handle target at array boundaries", () => {
      // Testing edge cases where target equals first or last element
      const values = [0, 15, 30, 45];

      // Target at first element
      expect(findNext(values, 0)).toBe(0);

      // Target at last element
      expect(findNext(values, 45)).toBe(45);

      // Target just before first element
      expect(findNext(values, -1)).toBe(0);

      // Target just after last element
      expect(findNext(values, 46)).toBeNull();
    });

    it("should handle large arrays efficiently", () => {
      // Stress test with a large array - testing correctness, not just performance
      const values = Array.from({ length: 10000 }, (_, i) => i * 2); // 0, 2, 4, ..., 19998

      expect(findNext(values, 0)).toBe(0);
      expect(findNext(values, 1)).toBe(2);
      expect(findNext(values, 9998)).toBe(9998);
      expect(findNext(values, 9999)).toBe(10000);
      expect(findNext(values, 19998)).toBe(19998);
      expect(findNext(values, 19999)).toBeNull();
    });

    it("should handle sparse-like arrays with gaps", () => {
      // Array with significant gaps between values
      const values = [0, 100, 500, 1000, 5000, 10000];

      expect(findNext(values, 0)).toBe(0);
      expect(findNext(values, 50)).toBe(100);
      expect(findNext(values, 100)).toBe(100);
      expect(findNext(values, 101)).toBe(500);
      expect(findNext(values, 6000)).toBe(10000);
      expect(findNext(values, 10001)).toBeNull();
    });

    it("should handle array with duplicate-adjacent values", () => {
      // While cron values shouldn't have duplicates, testing the function's robustness
      const values = [0, 0, 15, 15, 15, 30, 45, 45];

      expect(findNext(values, 0)).toBe(0);
      expect(findNext(values, 15)).toBe(15);
      expect(findNext(values, 14)).toBe(15);
      expect(findNext(values, 16)).toBe(30);
    });
  });

  describe("findPrevious", () => {
    it("should find previous value equal to target", () => {
      const values = [0, 15, 30, 45];
      expect(findPrevious(values, 30)).toBe(30);
    });

    it("should find previous value less than target", () => {
      const values = [0, 15, 30, 45];
      expect(findPrevious(values, 35)).toBe(30);
    });

    it("should return last value if target is after all", () => {
      const values = [0, 15, 30, 45];
      expect(findPrevious(values, 50)).toBe(45);
    });

    it("should return null if target is before all values", () => {
      const values = [0, 15, 30, 45];
      expect(findPrevious(values, -1)).toBeNull();
    });

    it("should work with single value", () => {
      const values = [30];
      expect(findPrevious(values, 40)).toBe(30);
      expect(findPrevious(values, 30)).toBe(30);
      expect(findPrevious(values, 20)).toBeNull();
    });

    it("should work with unsorted values", () => {
      const values = [30, 0, 45, 15];
      expect(findPrevious(values, 20)).toBe(15);
    });

    it("should return null for empty array", () => {
      // The empty array is the identity element for "no possible values"
      // Any target should return null since there's nothing to find
      expect(findPrevious([], 0)).toBeNull();
      expect(findPrevious([], 50)).toBeNull();
      expect(findPrevious([], -100)).toBeNull();
    });

    it("should handle negative targets", () => {
      // Negative targets - only values <= negative target should match
      const values = [0, 15, 30, 45];

      // -1 is less than all values, so should return null
      expect(findPrevious(values, -1)).toBeNull();
      expect(findPrevious(values, -100)).toBeNull();

      // But if we have negative values in the array...
      const negativeValues = [-50, -25, 0, 25, 50];
      expect(findPrevious(negativeValues, -1)).toBe(-25);
      expect(findPrevious(negativeValues, -26)).toBe(-50);
      expect(findPrevious(negativeValues, -50)).toBe(-50);
      expect(findPrevious(negativeValues, -51)).toBeNull();
    });

    it("should handle floating point targets with truncation behavior", () => {
      // Testing how the function handles non-integer targets
      // The function uses <= comparison, so 29.9 should find 30 (if 30 <= 29.9 is false, it keeps looking)
      // Actually 29.9: 30 is not <= 29.9, so it keeps looking, finds 15
      const values = [0, 15, 30, 45];

      expect(findPrevious(values, 15.5)).toBe(15);
      expect(findPrevious(values, 14.9)).toBe(0);
      expect(findPrevious(values, 30.001)).toBe(30);
      expect(findPrevious(values, 30.0)).toBe(30);
      expect(findPrevious(values, 29.999)).toBe(15);
      expect(findPrevious(values, 0.1)).toBe(0);
    });

    it("should handle target at array boundaries", () => {
      // Testing edge cases where target equals first or last element
      const values = [0, 15, 30, 45];

      // Target at first element
      expect(findPrevious(values, 0)).toBe(0);

      // Target at last element
      expect(findPrevious(values, 45)).toBe(45);

      // Target just before first element
      expect(findPrevious(values, -1)).toBeNull();

      // Target just after last element
      expect(findPrevious(values, 46)).toBe(45);
      expect(findPrevious(values, 1000)).toBe(45);
    });

    it("should handle large arrays efficiently", () => {
      // Stress test with a large array - testing correctness, not just performance
      const values = Array.from({ length: 10000 }, (_, i) => i * 2); // 0, 2, 4, ..., 19998

      expect(findPrevious(values, 0)).toBe(0);
      expect(findPrevious(values, 1)).toBe(0);
      expect(findPrevious(values, 9998)).toBe(9998);
      expect(findPrevious(values, 9999)).toBe(9998);
      expect(findPrevious(values, 19998)).toBe(19998);
      expect(findPrevious(values, 19999)).toBe(19998);
      expect(findPrevious(values, 20000)).toBe(19998);
    });

    it("should handle sparse-like arrays with gaps", () => {
      // Array with significant gaps between values
      const values = [0, 100, 500, 1000, 5000, 10000];

      expect(findPrevious(values, 0)).toBe(0);
      expect(findPrevious(values, 50)).toBe(0);
      expect(findPrevious(values, 100)).toBe(100);
      expect(findPrevious(values, 101)).toBe(100);
      expect(findPrevious(values, 6000)).toBe(5000);
      expect(findPrevious(values, 10001)).toBe(10000);
    });

    it("should handle array with duplicate-adjacent values", () => {
      // Testing the function's robustness with duplicates
      const values = [0, 0, 15, 15, 15, 30, 45, 45];

      expect(findPrevious(values, 0)).toBe(0);
      expect(findPrevious(values, 15)).toBe(15);
      expect(findPrevious(values, 16)).toBe(15);
      expect(findPrevious(values, 14)).toBe(0);
    });
  });

  describe("getDaysInMonth", () => {
    it("should return 31 for January", () => {
      expect(getDaysInMonth(2026, 0)).toBe(31);
    });

    it("should return 28 for February in non-leap year", () => {
      expect(getDaysInMonth(2026, 1)).toBe(28);
      expect(getDaysInMonth(2027, 1)).toBe(28);
    });

    it("should return 29 for February in leap year", () => {
      expect(getDaysInMonth(2028, 1)).toBe(29);
      expect(getDaysInMonth(2024, 1)).toBe(29);
    });

    it("should return 31 for March", () => {
      expect(getDaysInMonth(2026, 2)).toBe(31);
    });

    it("should return 30 for April", () => {
      expect(getDaysInMonth(2026, 3)).toBe(30);
    });

    it("should return 31 for May", () => {
      expect(getDaysInMonth(2026, 4)).toBe(31);
    });

    it("should return 30 for June", () => {
      expect(getDaysInMonth(2026, 5)).toBe(30);
    });

    it("should return 31 for July", () => {
      expect(getDaysInMonth(2026, 6)).toBe(31);
    });

    it("should return 31 for August", () => {
      expect(getDaysInMonth(2026, 7)).toBe(31);
    });

    it("should return 30 for September", () => {
      expect(getDaysInMonth(2026, 8)).toBe(30);
    });

    it("should return 31 for October", () => {
      expect(getDaysInMonth(2026, 9)).toBe(31);
    });

    it("should return 30 for November", () => {
      expect(getDaysInMonth(2026, 10)).toBe(30);
    });

    it("should return 31 for December", () => {
      expect(getDaysInMonth(2026, 11)).toBe(31);
    });

    it("should handle leap year 2000 (divisible by 400)", () => {
      expect(getDaysInMonth(2000, 1)).toBe(29);
    });

    it("should handle non-leap year 1900 (divisible by 100 but not 400)", () => {
      expect(getDaysInMonth(1900, 1)).toBe(28);
    });

    it("should handle year 0 (JS year 0 is 1900)", () => {
      // JavaScript's Date(0, ...) is year 1900, not year 0 AD
      expect(getDaysInMonth(0, 0)).toBe(31); // January 1900
      expect(getDaysInMonth(0, 1)).toBe(28); // Feb 1900 - NOT a leap year (divisible by 100, not 400)
      expect(getDaysInMonth(0, 11)).toBe(31); // December 1900
    });

    it("should handle negative years (BC years in JS Date)", () => {
      // JavaScript Date represents years before 1 AD as negative
      // The leap year calculation should still work
      expect(getDaysInMonth(-1, 0)).toBe(31); // January
      expect(getDaysInMonth(-1, 1)).toBe(28); // Feb - year -1 (2 BC) is not a leap year
      expect(getDaysInMonth(-4, 1)).toBe(29); // Feb - year -4 (5 BC) should be a leap year
    });

    it("should handle far future years", () => {
      // Testing years far in the future - the Gregorian calendar rules should still apply
      expect(getDaysInMonth(9999, 0)).toBe(31); // January
      expect(getDaysInMonth(9999, 1)).toBe(28); // Feb 9999 is not a leap year (not div by 4)
      expect(getDaysInMonth(10000, 1)).toBe(29); // Feb 10000 is a leap year (div by 4)
      expect(getDaysInMonth(10000, 3)).toBe(30); // April
    });

    it("should handle year 2100 (non-leap year, divisible by 100 but not 400)", () => {
      // 2100 is NOT a leap year (divisible by 100 but not 400)
      expect(getDaysInMonth(2100, 1)).toBe(28);
    });

    it("should handle year 2400 (leap year, divisible by 400)", () => {
      // 2400 IS a leap year (divisible by 400)
      expect(getDaysInMonth(2400, 1)).toBe(29);
    });

    it("should handle century boundaries correctly", () => {
      // Test multiple century transitions
      // 1700: not leap (div by 100, not 400)
      expect(getDaysInMonth(1700, 1)).toBe(28);
      // 1800: not leap (div by 100, not 400)
      expect(getDaysInMonth(1800, 1)).toBe(28);
      // 1900: not leap (div by 100, not 400)
      expect(getDaysInMonth(1900, 1)).toBe(28);
      // 2000: leap (div by 400)
      expect(getDaysInMonth(2000, 1)).toBe(29);
    });

    it("should handle months at edge of valid range (0 and 11)", () => {
      // Month 0 = January, Month 11 = December
      expect(getDaysInMonth(2026, 0)).toBe(31);
      expect(getDaysInMonth(2026, 11)).toBe(31);

      // Verify February is month 1 (0-indexed)
      expect(getDaysInMonth(2024, 1)).toBe(29);
      expect(getDaysInMonth(2026, 1)).toBe(28);
    });
  });

  describe("isOrMode", () => {
    it("should return false when both day and weekday are wildcards", () => {
      // When both are *, we don't need OR logic - everything matches
      const parsed = parse("* * * * *");
      expect(isOrMode(parsed)).toBe(false);
    });

    it("should return false when day is wildcard but weekday is restricted", () => {
      // Only weekday matters, no OR logic needed
      const parsed = parse("0 0 * * 1");
      expect(isOrMode(parsed)).toBe(false);
    });

    it("should return false when weekday is wildcard but day is restricted", () => {
      // Only day matters, no OR logic needed
      const parsed = parse("0 0 15 * *");
      expect(isOrMode(parsed)).toBe(false);
    });

    it("should return true when both day and weekday are restricted", () => {
      // This is the OR mode case - match if day OR weekday matches
      const parsed = parse("0 0 15 * 1");
      expect(isOrMode(parsed)).toBe(true);
    });

    it("should return true for complex expressions with both day and weekday restricted", () => {
      // Using ranges/lists for both
      const parsed1 = parse("0 0 1,15 * 1-5");
      expect(isOrMode(parsed1)).toBe(true);

      const parsed2 = parse("0 0 1-31 * 0,6");
      expect(isOrMode(parsed2)).toBe(true);
    });

    it("should return false when day uses step but is still effectively wildcard", () => {
      // */1 matches all days (1-31) but parser checks dayStr === "*" strictly,
      // so dayIsWildcard is false. However weekday IS wildcard, so isOrMode is false.
      const parsed = parse("0 0 */1 * *");
      expect(isOrMode(parsed)).toBe(false);
    });
  });

  describe("matchesDayOrWeekday", () => {
    // Helper to create a minimal ParsedCron for testing
    const createParsed = (
      day: number[],
      weekday: number[],
      dayIsWildcard: boolean,
      weekdayIsWildcard: boolean,
    ): ParsedCron => ({
      minute: [0],
      hour: [0],
      day,
      month: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      weekday,
      dayIsWildcard,
      weekdayIsWildcard,
    });

    it("should return true when both are wildcards (always matches)", () => {
      const parsed = createParsed(
        [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
          26, 27, 28, 29, 30, 31,
        ],
        [0, 1, 2, 3, 4, 5, 6],
        true,
        true,
      );

      // Should match any day and any weekday
      expect(matchesDayOrWeekday(parsed, 15, 1)).toBe(true); // 15th, Monday
      expect(matchesDayOrWeekday(parsed, 1, 0)).toBe(true); // 1st, Sunday
      expect(matchesDayOrWeekday(parsed, 31, 6)).toBe(true); // 31st, Saturday
    });

    it("should return true when only day matches (day restricted, weekday wildcard)", () => {
      const parsed = createParsed([15], [0, 1, 2, 3, 4, 5, 6], false, true);

      // Day 15 should match regardless of weekday
      expect(matchesDayOrWeekday(parsed, 15, 0)).toBe(true); // 15th, Sunday
      expect(matchesDayOrWeekday(parsed, 15, 3)).toBe(true); // 15th, Wednesday

      // Other days should not match
      expect(matchesDayOrWeekday(parsed, 14, 1)).toBe(false);
      expect(matchesDayOrWeekday(parsed, 16, 5)).toBe(false);
    });

    it("should return true when only weekday matches (weekday restricted, day wildcard)", () => {
      const parsed = createParsed(
        [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
          26, 27, 28, 29, 30, 31,
        ],
        [1],
        true,
        false,
      );

      // Monday (1) should match regardless of day
      expect(matchesDayOrWeekday(parsed, 1, 1)).toBe(true); // 1st, Monday
      expect(matchesDayOrWeekday(parsed, 15, 1)).toBe(true); // 15th, Monday
      expect(matchesDayOrWeekday(parsed, 31, 1)).toBe(true); // 31st, Monday

      // Other weekdays should not match
      expect(matchesDayOrWeekday(parsed, 15, 0)).toBe(false); // Sunday
      expect(matchesDayOrWeekday(parsed, 15, 2)).toBe(false); // Tuesday
    });

    it("should use OR logic when both are restricted", () => {
      // Day 15 OR Monday
      const parsed = createParsed([15], [1], false, false);

      // Both match
      expect(matchesDayOrWeekday(parsed, 15, 1)).toBe(true); // 15th AND Monday

      // Only day matches
      expect(matchesDayOrWeekday(parsed, 15, 0)).toBe(true); // 15th but Sunday

      // Only weekday matches
      expect(matchesDayOrWeekday(parsed, 16, 1)).toBe(true); // 16th but Monday

      // Neither matches
      expect(matchesDayOrWeekday(parsed, 16, 0)).toBe(false); // 16th, Sunday
      expect(matchesDayOrWeekday(parsed, 14, 2)).toBe(false); // 14th, Tuesday
    });

    it("should respect daysInMonth parameter when provided", () => {
      // This is important for February - day 31 should not match in Feb
      const parsed = createParsed([31], [0, 1, 2, 3, 4, 5, 6], false, true);

      // Without daysInMonth, day 31 would match
      expect(matchesDayOrWeekday(parsed, 31, 1)).toBe(true);

      // With daysInMonth = 28 (February non-leap), day 31 should NOT match
      expect(matchesDayOrWeekday(parsed, 31, 1, 28)).toBe(false);

      // With daysInMonth = 29 (February leap), day 31 should still NOT match
      expect(matchesDayOrWeekday(parsed, 31, 1, 29)).toBe(false);

      // With daysInMonth = 31, day 31 should match
      expect(matchesDayOrWeekday(parsed, 31, 1, 31)).toBe(true);

      // Day 30 should not match if daysInMonth is 28
      const parsed30 = createParsed([30], [0, 1, 2, 3, 4, 5, 6], false, true);
      expect(matchesDayOrWeekday(parsed30, 30, 1, 28)).toBe(false);
      expect(matchesDayOrWeekday(parsed30, 30, 1, 30)).toBe(true);
    });

    it("should validate day against daysInMonth in OR mode", () => {
      // Both day and weekday restricted - should use OR logic
      const parsed = createParsed([31], [1], false, false);

      // In February (28 days), day 31 is invalid but Monday still matches
      expect(matchesDayOrWeekday(parsed, 31, 1, 28)).toBe(true); // Monday matches via OR

      // If it's not Monday either, should be false
      expect(matchesDayOrWeekday(parsed, 31, 0, 28)).toBe(false); // Neither matches

      // In January (31 days), day 31 is valid
      expect(matchesDayOrWeekday(parsed, 31, 0, 31)).toBe(true); // Day 31 matches
      expect(matchesDayOrWeekday(parsed, 31, 3, 31)).toBe(true); // Both match
    });

    it("should handle multiple days and weekdays in OR mode", () => {
      // Days 1,15 OR weekdays Mon,Wed,Fri
      const parsed = createParsed([1, 15], [1, 3, 5], false, false);

      // Matches via day
      expect(matchesDayOrWeekday(parsed, 1, 0)).toBe(true); // 1st, Sunday
      expect(matchesDayOrWeekday(parsed, 15, 2)).toBe(true); // 15th, Tuesday

      // Matches via weekday
      expect(matchesDayOrWeekday(parsed, 8, 1)).toBe(true); // 8th, Monday
      expect(matchesDayOrWeekday(parsed, 22, 3)).toBe(true); // 22nd, Wednesday

      // Matches both
      expect(matchesDayOrWeekday(parsed, 1, 1)).toBe(true); // 1st, Monday

      // Matches neither
      expect(matchesDayOrWeekday(parsed, 8, 0)).toBe(false); // 8th, Sunday
      expect(matchesDayOrWeekday(parsed, 22, 6)).toBe(false); // 22nd, Saturday
    });
  });
});
