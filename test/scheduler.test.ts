import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { nextRun, previousRun, nextRuns, isMatch } from "../src/scheduler.js";
import { getDaysInMonth } from "../src/matcher.js";

// Passthrough spy: delegates to the real implementation unless a test overrides it,
// so the rest of this file runs against effectively unmocked behavior.
vi.mock("../src/matcher.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/matcher.js")>();
  return { ...actual, getDaysInMonth: vi.fn(actual.getDaysInMonth) };
});

describe("scheduler", () => {
  describe("Invalid cron expression handling", () => {
    describe("nextRun", () => {
      it("should throw for invalid cron expression", () => {
        expect(() => nextRun("invalid")).toThrow('Invalid cron expression: "invalid"');
      });

      it("should throw for empty string", () => {
        expect(() => nextRun("")).toThrow('Invalid cron expression: ""');
      });

      it("should throw for wrong number of fields", () => {
        expect(() => nextRun("* * *")).toThrow('Invalid cron expression: "* * *"');
      });

      it("should throw for impossible day/month combination", () => {
        expect(() => nextRun("0 0 31 2 *")).toThrow('Invalid cron expression: "0 0 31 2 *"');
      });
    });

    describe("previousRun", () => {
      it("should throw for invalid cron expression", () => {
        expect(() => previousRun("invalid")).toThrow('Invalid cron expression: "invalid"');
      });

      it("should throw for empty string", () => {
        expect(() => previousRun("")).toThrow('Invalid cron expression: ""');
      });
    });

    describe("nextRuns", () => {
      it("should throw for invalid cron expression", () => {
        expect(() => nextRuns("invalid", 5)).toThrow('Invalid cron expression: "invalid"');
      });

      it("should throw for empty string", () => {
        expect(() => nextRuns("", 3)).toThrow('Invalid cron expression: ""');
      });
    });

    describe("isMatch", () => {
      it("should throw for invalid cron expression", () => {
        const date = new Date("2026-03-15T09:00:00Z");
        expect(() => isMatch("invalid", date)).toThrow('Invalid cron expression: "invalid"');
      });

      it("should throw for empty string", () => {
        const date = new Date("2026-03-15T09:00:00Z");
        expect(() => isMatch("", date)).toThrow('Invalid cron expression: ""');
      });
    });

    describe("iteration limit guard", () => {
      it("should throw when no match is found within the iteration limit", () => {
        // Force the search to never find a matching day: every month appears to have 0 days,
        // so the loop walks year by year without ever matching and exhausts MAX_ITERATIONS.
        vi.mocked(getDaysInMonth).mockReturnValue(0);
        try {
          expect(() => nextRun("0 0 1 1 *", { from: new Date("2026-06-15T12:30:00Z") })).toThrow(
            'No match found for "0 0 1 1 *" within iteration limit',
          );
        } finally {
          vi.mocked(getDaysInMonth).mockRestore();
        }
      });
    });
  });

  describe("Basic functionality", () => {
    describe("nextRun", () => {
      it("should find next run for simple expression", () => {
        const from = new Date("2026-03-15T14:30:00Z");
        const next = nextRun("0 15 * * *", { from });

        expect(next.getUTCHours()).toBe(15);
        expect(next.getUTCMinutes()).toBe(0);
        expect(next.getUTCDate()).toBe(15);
      });

      it("should roll over to next day", () => {
        const from = new Date("2026-03-15T23:30:00Z");
        const next = nextRun("0 9 * * *", { from });

        expect(next.getUTCDate()).toBe(16);
        expect(next.getUTCHours()).toBe(9);
        expect(next.getUTCMinutes()).toBe(0);
      });

      it("should handle every 15 minutes", () => {
        const from = new Date("2026-03-15T14:07:00Z");
        const next = nextRun("*/15 * * * *", { from });

        expect(next.getUTCMinutes()).toBe(15);
      });

      it("should handle specific weekdays", () => {
        // Mar 16, 2026 is Monday
        const from = new Date("2026-03-16T09:00:00Z");
        const next = nextRun("0 9 * * 1", { from }); // Every Monday at 9 AM

        // Should be next Monday (Mar 23)
        expect(next.getUTCDate()).toBe(23);
        expect(next.getUTCDay()).toBe(1); // Monday
      });

      it("should handle month boundaries", () => {
        const from = new Date("2026-03-31T23:00:00Z");
        const next = nextRun("0 9 1 * *", { from }); // 1st of month at 9 AM

        expect(next.getUTCMonth()).toBe(3); // April
        expect(next.getUTCDate()).toBe(1);
      });

      it("should handle year boundaries", () => {
        const from = new Date("2026-12-31T23:00:00Z");
        const next = nextRun("0 0 1 1 *", { from }); // Jan 1 at midnight

        expect(next.getUTCFullYear()).toBe(2027);
        expect(next.getUTCMonth()).toBe(0);
        expect(next.getUTCDate()).toBe(1);
      });

      it("should work with timezone", () => {
        const from = new Date("2026-03-15T14:00:00Z"); // 2 PM UTC = 10 AM EDT (DST started Mar 8, 2026)
        const next = nextRun("0 10 * * *", { from, timezone: "America/New_York" });

        // Next 10 AM EDT should be same day (after DST, EDT is UTC-4)
        expect(next.getUTCHours()).toBe(14); // 10 AM EDT = 2 PM UTC
      });
    });

    describe("previousRun", () => {
      it("should find previous run", () => {
        const from = new Date("2026-03-15T14:30:00Z");
        const prev = previousRun("0 9 * * *", { from });

        expect(prev.getUTCHours()).toBe(9);
        expect(prev.getUTCMinutes()).toBe(0);
        expect(prev.getUTCDate()).toBe(15);
      });

      it("should roll back to previous day", () => {
        const from = new Date("2026-03-15T08:00:00Z");
        const prev = previousRun("0 9 * * *", { from });

        expect(prev.getUTCDate()).toBe(14);
        expect(prev.getUTCHours()).toBe(9);
      });

      it("should default to current time when no from option is given", () => {
        const before = Date.now();
        const prev = previousRun("* * * * *");
        const after = Date.now();

        // every-minute expression: previous run falls within the two minutes before "now"
        expect(prev.getTime()).toBeLessThanOrEqual(after);
        expect(prev.getTime()).toBeGreaterThanOrEqual(before - 120_000);
      });
    });

    describe("nextRuns", () => {
      it("should return multiple next runs", () => {
        const from = new Date("2026-03-15T14:00:00Z");
        const runs = nextRuns("0 9 * * *", 3, { from });

        expect(runs).toHaveLength(3);
        expect(runs[0].getUTCDate()).toBe(16);
        expect(runs[1].getUTCDate()).toBe(17);
        expect(runs[2].getUTCDate()).toBe(18);
      });

      it("should handle empty count", () => {
        const runs = nextRuns("* * * * *", 0);
        expect(runs).toHaveLength(0);
      });

      it("should agree with chained nextRun calls", () => {
        const from = new Date("2026-03-15T10:00:00Z");
        const chained: Date[] = [];
        let current = from;
        for (let i = 0; i < 5; i++) {
          current = nextRun("* * * * *", { from: current });
          chained.push(current);
          current = new Date(current.getTime() + 1);
        }
        const batch = nextRuns("* * * * *", 5, { from });
        expect(batch.map((d) => d.getTime())).toEqual(chained.map((d) => d.getTime()));
      });

      it("should return consecutive runs in the given timezone", () => {
        // 08:00 Tokyo on June 15 = 2026-06-14T23:00Z; next 9 AM Tokyo runs
        const runs = nextRuns("0 9 * * *", 2, {
          from: new Date("2026-06-14T23:00:00Z"),
          timezone: "Asia/Tokyo",
        });

        expect(runs.map((d) => d.toISOString())).toEqual([
          "2026-06-15T00:00:00.000Z",
          "2026-06-16T00:00:00.000Z",
        ]);
      });

      it("should not skip matches for every-minute expressions", () => {
        const from = new Date("2026-03-15T14:11:30Z");
        const runs = nextRuns("* * * * *", 4, { from });

        expect(runs.map((d) => d.toISOString())).toEqual([
          "2026-03-15T14:12:00.000Z",
          "2026-03-15T14:13:00.000Z",
          "2026-03-15T14:14:00.000Z",
          "2026-03-15T14:15:00.000Z",
        ]);
      });
    });

    describe("dates before year 1", () => {
      it("should handle negative years (proleptic Gregorian) in weekday calculation", () => {
        const from = new Date(Date.UTC(-5, 5, 15, 10, 30));
        const next = nextRun("0 0 * * 0", { from });

        // reference: step minute-by-minute with the engine's own calendar
        const ref = new Date(from.getTime() + 60_000);
        while (!(ref.getUTCDay() === 0 && ref.getUTCHours() === 0 && ref.getUTCMinutes() === 0)) {
          ref.setUTCMinutes(ref.getUTCMinutes() + 1);
        }

        expect(next.toISOString()).toBe(ref.toISOString());
      });
    });

    describe("isMatch", () => {
      it("should find next run with wildcard minute and restricted hour", () => {
        const from = new Date("2026-03-15T14:30:00Z");
        const next = nextRun("* 9 * * *", { from });

        expect(next.toISOString()).toBe("2026-03-16T09:00:00.000Z");
      });

      it("should find next run with wildcard minute and restricted month", () => {
        const from = new Date("2026-01-15T10:05:00Z");
        const next = nextRun("* 10 * 2 *", { from });

        expect(next.toISOString()).toBe("2026-02-01T10:00:00.000Z");
      });

      it("should match exact time", () => {
        const date = new Date("2026-03-16T09:00:00Z");
        expect(isMatch("0 9 * * *", date)).toBe(true);
      });

      it("should not match different time", () => {
        const date = new Date("2026-03-16T09:30:00Z");
        expect(isMatch("0 9 * * *", date)).toBe(false);
      });

      it("should match with step values", () => {
        const date = new Date("2026-03-16T09:15:00Z");
        expect(isMatch("*/15 * * * *", date)).toBe(true);
      });

      it("should match weekday", () => {
        const date = new Date("2026-03-16T09:00:00Z"); // Monday
        expect(isMatch("0 9 * * 1", date)).toBe(true);
        expect(isMatch("0 9 * * 2", date)).toBe(false);
      });
    });
  });

  describe("ISO 8601 date support", () => {
    describe("parsing ISO 8601 strings as input", () => {
      it("should work with UTC dates (Z suffix)", () => {
        const from = new Date("2026-03-15T14:30:00Z");
        const next = nextRun("0 15 * * *", { from });

        expect(next.getUTCHours()).toBe(15);
        expect(next.getUTCMinutes()).toBe(0);
      });

      it("should work with timezone offset (+HH:MM)", () => {
        // 9:30 AM EST = 2:30 PM UTC
        const from = new Date("2026-03-15T09:30:00-05:00");
        const next = nextRun("0 15 * * *", { from });

        // Should find next 3 PM UTC
        expect(next.getUTCHours()).toBe(15);
        expect(next.getUTCMinutes()).toBe(0);
        expect(next.getUTCDate()).toBe(15);
      });

      it("should work with positive timezone offset", () => {
        // 8:30 PM in UTC+6 = 2:30 PM UTC
        const from = new Date("2026-03-15T20:30:00+06:00");
        const next = nextRun("0 15 * * *", { from });

        // Should find next 3 PM UTC (same day since we're at 2:30 PM)
        expect(next.getUTCHours()).toBe(15);
        expect(next.getUTCDate()).toBe(15);
      });

      it("should work with milliseconds", () => {
        const from = new Date("2026-03-15T14:30:00.500Z");
        const next = nextRun("0 15 * * *", { from });

        expect(next.getUTCHours()).toBe(15);
        expect(next.getUTCMinutes()).toBe(0);
        expect(next.getUTCSeconds()).toBe(0);
        expect(next.getUTCMilliseconds()).toBe(0);
      });

      it("should treat different representations of same moment equally", () => {
        // All these represent the same moment: Mar 15, 2026 at 2:30 PM UTC
        const utc = new Date("2026-03-15T14:30:00Z");
        const est = new Date("2026-03-15T09:30:00-05:00");
        const plus6 = new Date("2026-03-15T20:30:00+06:00");

        // All should produce the same next run
        const nextUtc = nextRun("0 15 * * *", { from: utc });
        const nextEst = nextRun("0 15 * * *", { from: est });
        const nextPlus6 = nextRun("0 15 * * *", { from: plus6 });

        expect(nextUtc.getTime()).toBe(nextEst.getTime());
        expect(nextUtc.getTime()).toBe(nextPlus6.getTime());
      });
    });

    describe("output format", () => {
      it("should always return dates that produce UTC ISO strings", () => {
        const next = nextRun("0 9 * * *");
        const isoString = next.toISOString();

        // Should end with Z (UTC)
        expect(isoString).toMatch(/Z$/);

        // Should be valid ISO 8601
        expect(isoString).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
      });

      it("should return dates that can be parsed back", () => {
        const next = nextRun("0 9 * * *");
        const isoString = next.toISOString();

        // Should be able to parse it back
        const parsed = new Date(isoString);
        expect(parsed.getTime()).toBe(next.getTime());
      });
    });

    describe("timezone-aware calculations with ISO 8601", () => {
      it("should handle timezone option with ISO 8601 input", () => {
        // Start at 2 PM UTC (10 AM EDT - DST started Mar 8, 2026)
        const from = new Date("2026-03-15T14:00:00Z");

        // Find next 10 AM EDT
        const next = nextRun("0 10 * * *", {
          from,
          timezone: "America/New_York",
        });

        // 10 AM EDT = 2 PM UTC (EDT is UTC-4)
        expect(next.getUTCHours()).toBe(14);
        expect(next.toISOString()).toMatch(/Z$/);
      });

      it("should work with offset input and timezone option", () => {
        // Start at 9 AM EDT (using offset notation - DST started Mar 8, 2026, so EDT is UTC-4)
        const from = new Date("2026-03-15T09:00:00-04:00");

        // Find next 10 AM EDT
        const next = nextRun("0 10 * * *", {
          from,
          timezone: "America/New_York",
        });

        // Should be same day at 10 AM EDT = 2 PM UTC
        expect(next.getUTCHours()).toBe(14);
        expect(next.getUTCDate()).toBe(15);
      });
    });

    describe("isMatch with ISO 8601", () => {
      it("should match with UTC ISO string", () => {
        const date = new Date("2026-03-16T09:00:00Z");
        expect(isMatch("0 9 * * *", date)).toBe(true);
      });

      it("should match with offset ISO string", () => {
        // 9 AM UTC = 4 AM EST
        const date = new Date("2026-03-16T04:00:00-05:00");
        expect(isMatch("0 9 * * *", date)).toBe(true);
      });

      it("should match with timezone option and ISO input", () => {
        // 9 AM EDT in UTC notation (DST started Mar 8, 2026, so EDT is UTC-4)
        const date = new Date("2026-03-16T13:00:00Z");
        expect(isMatch("0 9 * * *", date, { timezone: "America/New_York" })).toBe(true);
      });
    });

    describe("previousRun with ISO 8601", () => {
      it("should work with UTC ISO string", () => {
        const from = new Date("2026-03-15T14:30:00Z");
        const prev = previousRun("0 9 * * *", { from });

        expect(prev.getUTCHours()).toBe(9);
        expect(prev.getUTCDate()).toBe(15);
      });

      it("should work with offset ISO string", () => {
        // 2:30 PM EST = 7:30 PM UTC
        const from = new Date("2026-03-15T14:30:00-05:00");
        const prev = previousRun("0 9 * * *", { from });

        // Previous 9 AM UTC
        expect(prev.getUTCHours()).toBe(9);
        expect(prev.getUTCDate()).toBe(15);
      });
    });

    describe("edge cases", () => {
      it("should handle dates near DST transitions", () => {
        // March 8, 2026 - DST starts in US (2 AM -> 3 AM)
        const from = new Date("2026-03-08T06:00:00Z"); // 1 AM EST
        const next = nextRun("0 9 * * *", {
          from,
          timezone: "America/New_York",
        });

        // Should find 9 AM EDT (which is 1 PM UTC after DST - EDT is UTC-4)
        expect(next.getUTCHours()).toBe(13); // 9 AM EDT = 1 PM UTC
        expect(next.getUTCDate()).toBe(8);
      });

      it("should handle year boundaries with ISO dates", () => {
        const from = new Date("2026-12-31T23:00:00Z");
        const next = nextRun("0 0 1 1 *", { from });

        expect(next.getUTCFullYear()).toBe(2027);
        expect(next.getUTCMonth()).toBe(0);
        expect(next.getUTCDate()).toBe(1);
        expect(next.toISOString()).toMatch(/^2027-01-01T00:00:00\.000Z$/);
      });

      it("should handle leap year with ISO dates", () => {
        // Feb 29, 2028 exists (leap year)
        const from = new Date("2028-02-28T12:00:00Z");
        const next = nextRun("0 9 29 2 *", { from });

        expect(next.getUTCFullYear()).toBe(2028);
        expect(next.getUTCMonth()).toBe(1); // February
        expect(next.getUTCDate()).toBe(29);
      });

      it("should handle various ISO 8601 formats", () => {
        const formats = [
          "2026-03-15T14:30:00Z", // Basic UTC
          "2026-03-15T14:30:00.000Z", // With milliseconds
          "2026-03-15T09:30:00-05:00", // With negative offset
          "2026-03-15T20:30:00+06:00", // With positive offset
          "2026-03-15T14:30:00.123Z", // With fractional seconds
        ];

        // All represent the same moment (or close to it)
        const results = formats.map((format) => {
          const from = new Date(format);
          return nextRun("0 15 * * *", { from });
        });

        // All should produce the same or very close results
        const firstTime = results[0].getTime();
        results.forEach((result) => {
          expect(Math.abs(result.getTime() - firstTime)).toBeLessThan(1000);
        });
      });
    });

    describe("round-trip compatibility", () => {
      it("should maintain precision through parse-format-parse cycle", () => {
        const original = nextRun("0 9 * * *");
        const isoString = original.toISOString();
        const parsed = new Date(isoString);

        expect(parsed.getTime()).toBe(original.getTime());
      });

      it("should work with dates from external systems", () => {
        // Simulate dates from various sources
        const postgresDate = "2026-03-15T14:30:00+00:00";
        const mongoDate = "2026-03-15T14:30:00.000Z";
        const apiDate = "2026-03-15T09:30:00-05:00";

        const next1 = nextRun("0 15 * * *", { from: new Date(postgresDate) });
        const next2 = nextRun("0 15 * * *", { from: new Date(mongoDate) });
        const next3 = nextRun("0 15 * * *", { from: new Date(apiDate) });

        // All should produce the same result
        expect(next1.getTime()).toBe(next2.getTime());
        expect(next1.getTime()).toBe(next3.getTime());
      });
    });
  });

  describe("Month boundaries and leap years", () => {
    describe("getDaysInMonth helper", () => {
      it("should return correct days for February (non-leap year)", () => {
        const days = getDaysInMonth(2026, 1); // Passing 1 for February (0-indexed)
        expect(days).toBe(28);
      });

      it("should return correct days for February (leap year)", () => {
        const days = getDaysInMonth(2028, 1); // Passing 1 for February (0-indexed)
        expect(days).toBe(29);
      });

      it("should return correct days for January", () => {
        const days = getDaysInMonth(2026, 0); // Passing 0 for January (0-indexed)
        expect(days).toBe(31);
      });

      it("should return correct days for April (30 days)", () => {
        const days = getDaysInMonth(2026, 3); // Passing 3 for April (0-indexed)
        expect(days).toBe(30);
      });

      it("should return correct days for December", () => {
        const days = getDaysInMonth(2026, 11); // Passing 11 for December (0-indexed)
        expect(days).toBe(31);
      });
    });

    describe("nextRun with month boundaries", () => {
      it("should correctly handle end of February in non-leap year", () => {
        const from = new Date("2026-02-28T23:59:00Z");
        const next = nextRun("0 0 * * *", { from });

        expect(next.toISOString()).toBe("2026-03-01T00:00:00.000Z");
      });

      it("should correctly handle end of February in leap year", () => {
        const from = new Date("2028-02-28T23:59:00Z");
        const next = nextRun("0 0 * * *", { from });

        expect(next.toISOString()).toBe("2028-02-29T00:00:00.000Z");
      });

      it("should correctly handle Feb 29 to March 1 in leap year", () => {
        const from = new Date("2028-02-29T23:59:00Z");
        const next = nextRun("0 0 * * *", { from });

        expect(next.toISOString()).toBe("2028-03-01T00:00:00.000Z");
      });

      it("should correctly handle end of January", () => {
        const from = new Date("2026-01-31T23:59:00Z");
        const next = nextRun("0 0 * * *", { from });

        expect(next.toISOString()).toBe("2026-02-01T00:00:00.000Z");
      });

      it("should correctly handle end of April (30 days)", () => {
        const from = new Date("2026-04-30T23:59:00Z");
        const next = nextRun("0 0 * * *", { from });

        expect(next.toISOString()).toBe("2026-05-01T00:00:00.000Z");
      });

      it("should correctly handle cron on 31st of month", () => {
        const from = new Date("2026-01-15T00:00:00Z");
        const next = nextRun("0 12 31 * *", { from });

        expect(next.toISOString()).toBe("2026-01-31T12:00:00.000Z");
      });

      it("should skip months without 31 days when cron specifies day 31", () => {
        const from = new Date("2026-01-31T13:00:00Z"); // After Jan 31 noon
        const next = nextRun("0 12 31 * *", { from });

        // February doesn't have 31 days, should skip to March 31
        expect(next.toISOString()).toBe("2026-03-31T12:00:00.000Z");
      });

      it("should skip February in non-leap years when cron specifies day 29", () => {
        const from = new Date("2026-01-29T13:00:00Z"); // After Jan 29 noon
        const next = nextRun("0 12 29 * *", { from });

        // February 2026 doesn't have 29 days (not a leap year), should skip to March 29
        expect(next.toISOString()).toBe("2026-03-29T12:00:00.000Z");
      });

      it("should include February in leap years when cron specifies day 29", () => {
        const from = new Date("2028-01-29T13:00:00Z"); // After Jan 29 noon
        const next = nextRun("0 12 29 * *", { from });

        // February 2028 has 29 days (leap year), should run on Feb 29
        expect(next.toISOString()).toBe("2028-02-29T12:00:00.000Z");
      });

      it("should skip February when cron specifies day 30", () => {
        const from = new Date("2026-01-30T13:00:00Z"); // After Jan 30 noon
        const next = nextRun("0 12 30 * *", { from });

        // February never has 30 days, should skip to March 30
        expect(next.toISOString()).toBe("2026-03-30T12:00:00.000Z");
      });
    });

    describe("previousRun with month boundaries", () => {
      it("should correctly handle beginning of March (non-leap year)", () => {
        const from = new Date("2026-03-01T00:01:00Z");
        const prev = previousRun("0 0 * * *", { from });

        expect(prev.toISOString()).toBe("2026-03-01T00:00:00.000Z");
      });

      it("should correctly handle beginning of March (leap year)", () => {
        const from = new Date("2028-03-01T00:01:00Z");
        const prev = previousRun("0 0 * * *", { from });

        expect(prev.toISOString()).toBe("2028-03-01T00:00:00.000Z");
      });

      it("should skip months without day 31 when walking backwards across years", () => {
        // April has 30 days, so "31" never matches in April; previous match is May 31 of the prior year
        const from = new Date("2026-04-10T12:00:00Z");
        const prev = previousRun("0 0 31 4,5 *", { from });

        expect(prev.toISOString()).toBe("2025-05-31T00:00:00.000Z");
      });

      it("should skip impossible day in earlier listed month when walking backwards", () => {
        // From May 31 00:00:30, the May 31 00:00 run is already in the past and
        // must be returned (the April candidate would be invalid anyway)
        const from = new Date("2026-05-31T00:00:30Z");
        const prev = previousRun("0 0 31 4,5 *", { from });

        expect(prev.toISOString()).toBe("2026-05-31T00:00:00.000Z");
      });
    });

    describe("isMatch with specific months", () => {
      it("should match dates in February correctly", () => {
        const febDate = new Date("2026-02-15T10:00:00Z");
        expect(isMatch("0 10 * 2 *", febDate)).toBe(true);

        const janDate = new Date("2026-01-15T10:00:00Z");
        expect(isMatch("0 10 * 2 *", janDate)).toBe(false);
      });

      it("should match dates in December correctly", () => {
        const decDate = new Date("2026-12-25T10:00:00Z");
        expect(isMatch("0 10 * 12 *", decDate)).toBe(true);

        const novDate = new Date("2026-11-25T10:00:00Z");
        expect(isMatch("0 10 * 12 *", novDate)).toBe(false);
      });

      it("should match date ranges correctly", () => {
        const juneDate = new Date("2026-06-15T10:00:00Z");
        const julyDate = new Date("2026-07-15T10:00:00Z");
        const augDate = new Date("2026-08-15T10:00:00Z");
        const mayDate = new Date("2026-05-15T10:00:00Z");

        expect(isMatch("0 10 * 6-8 *", juneDate)).toBe(true);
        expect(isMatch("0 10 * 6-8 *", julyDate)).toBe(true);
        expect(isMatch("0 10 * 6-8 *", augDate)).toBe(true);
        expect(isMatch("0 10 * 6-8 *", mayDate)).toBe(false);
      });
    });
  });

  describe("Past dates support", () => {
    describe("nextRun with past dates", () => {
      it("should calculate next run from a date in 2020", () => {
        const from = new Date("2020-06-15T14:30:00Z");
        const next = nextRun("0 15 * * *", { from });

        expect(next.getUTCHours()).toBe(15);
        expect(next.getUTCMinutes()).toBe(0);
        expect(next.getUTCFullYear()).toBe(2020);
        expect(next.getUTCMonth()).toBe(5); // June
        expect(next.getUTCDate()).toBe(15);
      });
      it("should handle year boundaries in the past", () => {
        const from = new Date("2019-12-31T23:00:00Z");
        const next = nextRun("0 0 1 1 *", { from });

        expect(next.getUTCFullYear()).toBe(2020);
        expect(next.getUTCMonth()).toBe(0); // January
        expect(next.getUTCDate()).toBe(1);
      });

      it("should handle leap year in the past (2020)", () => {
        const from = new Date("2020-02-28T12:00:00Z");
        const next = nextRun("0 9 29 2 *", { from });

        expect(next.getUTCFullYear()).toBe(2020);
        expect(next.getUTCMonth()).toBe(1); // February
        expect(next.getUTCDate()).toBe(29);
      });

      it("should work with timezones for past dates", () => {
        const from = new Date("2021-03-15T14:00:00Z");
        const next = nextRun("0 10 * * *", {
          from,
          timezone: "America/New_York",
        });

        // March 2021: DST started March 14, so EDT (UTC-4)
        expect(next.getUTCHours()).toBe(14); // 10 AM EDT = 2 PM UTC
        expect(next.getTime()).toBeGreaterThan(from.getTime());
      });
    });

    describe("previousRun with seconds in current minute", () => {
      it("should return the already-started minute when called mid-minute", () => {
        // At 9:01:30, the 9:01 run already started (9:01:00 < 9:01:30),
        // so previousRun should return 9:01, not 9:00
        const from = new Date("2025-03-15T09:01:30Z");
        const prev = previousRun("* * * * *", { from });

        expect(prev.getUTCHours()).toBe(9);
        expect(prev.getUTCMinutes()).toBe(1);
        expect(prev.getUTCSeconds()).toBe(0);
        expect(prev.getTime()).toBeLessThan(from.getTime());
      });

      it("should return previous minute when at exact minute boundary (9:01:00)", () => {
        // At exactly 9:01:00, the run itself is at `from`, so the previous run is 9:00
        const from = new Date("2025-03-15T09:01:00Z");
        const prev = previousRun("* * * * *", { from });

        expect(prev.getUTCHours()).toBe(9);
        expect(prev.getUTCMinutes()).toBe(0);
        expect(prev.getUTCSeconds()).toBe(0);
      });

      it("should return current minute when called just after minute boundary (9:00:00.001)", () => {
        // 1 ms into the minute: the 9:00 run is in the past
        const from = new Date("2025-03-15T09:00:00.001Z");
        const prev = previousRun("* * * * *", { from });

        expect(prev.getUTCHours()).toBe(9);
        expect(prev.getUTCMinutes()).toBe(0);
        expect(prev.getUTCSeconds()).toBe(0);
      });

      it("should not skip to the previous hour when called mid-minute (sparse schedule)", () => {
        // The 9:00 run started 30s before `from` and must be returned
        const from = new Date("2026-03-15T09:00:30Z");
        const prev = previousRun("0 * * * *", { from });

        expect(prev.toISOString()).toBe("2026-03-15T09:00:00.000Z");
      });

      it("should not skip an entire year when called one second before the run", () => {
        const from = new Date("2026-12-31T23:59:59Z");
        const prev = previousRun("59 23 31 12 *", { from });

        expect(prev.toISOString()).toBe("2026-12-31T23:59:00.000Z");
      });
    });

    describe("previousRun with past dates", () => {
      it("should calculate previous run from a date in 2018", () => {
        const from = new Date("2018-08-20T14:30:00Z");
        const prev = previousRun("0 9 * * *", { from });

        expect(prev.getUTCHours()).toBe(9);
        expect(prev.getUTCMinutes()).toBe(0);
        expect(prev.getUTCFullYear()).toBe(2018);
        expect(prev.getUTCMonth()).toBe(7); // August
        expect(prev.getUTCDate()).toBe(20);
      });

      it("should handle month boundaries in the past", () => {
        const from = new Date("2019-03-01T08:00:00Z");
        const prev = previousRun("0 9 * * *", { from });

        expect(prev.getUTCFullYear()).toBe(2019);
        expect(prev.getUTCMonth()).toBe(1); // February
        expect(prev.getUTCDate()).toBe(28); // 2019 is not a leap year
      });
    });

    describe("isMatch with past dates", () => {
      it("should match dates from 2015", () => {
        const date = new Date("2015-07-04T09:00:00Z");
        expect(isMatch("0 9 * * *", date)).toBe(true);
        expect(isMatch("0 10 * * *", date)).toBe(false);
      });

      it("should match weekdays correctly for past dates", () => {
        // July 4, 2015 was a Saturday (day 6)
        const date = new Date("2015-07-04T09:00:00Z");
        expect(isMatch("0 9 * * 6", date)).toBe(true);
        expect(isMatch("0 9 * * 0", date)).toBe(false);
      });

      it("should match specific months in the past", () => {
        const date = new Date("2017-12-25T10:00:00Z");
        expect(isMatch("0 10 * 12 *", date)).toBe(true);
        expect(isMatch("0 10 * 11 *", date)).toBe(false);
      });
    });

    describe("nextRuns with past dates", () => {
      it("should generate multiple runs from a past date", () => {
        const from = new Date("2019-01-01T00:00:00Z");
        const runs = nextRuns("0 0 * * *", 5, { from });

        expect(runs).toHaveLength(5);
        expect(runs[0].getUTCFullYear()).toBe(2019);
        expect(runs[0].getUTCDate()).toBe(2);
        expect(runs[1].getUTCDate()).toBe(3);
        expect(runs[2].getUTCDate()).toBe(4);
        expect(runs[3].getUTCDate()).toBe(5);
        expect(runs[4].getUTCDate()).toBe(6);
      });
    });

    describe("DST transitions in past years", () => {
      it("should handle DST spring forward in 2019", () => {
        // March 10, 2019: DST started in US (2 AM -> 3 AM)
        const from = new Date("2019-03-09T00:00:00Z");
        const next = nextRun("30 2 * * *", {
          from,
          timezone: "America/New_York",
        });

        expect(next).toBeInstanceOf(Date);
        expect(next.getTime()).toBeGreaterThan(from.getTime());
      });

      it("should handle DST fall back in 2020", () => {
        // November 1, 2020: DST ended in US (2 AM -> 1 AM)
        const from = new Date("2020-10-31T00:00:00Z");
        const next = nextRun("30 2 * * *", {
          from,
          timezone: "America/New_York",
        });

        expect(next).toBeInstanceOf(Date);
        expect(next.getTime()).toBeGreaterThan(from.getTime());
      });
    });

    describe("edge cases with very old dates", () => {
      it("should work with dates from 2000", () => {
        const from = new Date("2000-01-01T00:00:00Z");
        const next = nextRun("0 12 * * *", { from });

        expect(next.getUTCFullYear()).toBe(2000);
        expect(next.getUTCMonth()).toBe(0);
        expect(next.getUTCDate()).toBe(1);
        expect(next.getUTCHours()).toBe(12);
      });

      it("should handle leap year 2000", () => {
        // 2000 was a leap year (divisible by 400)
        const from = new Date("2000-02-28T12:00:00Z");
        const next = nextRun("0 9 29 2 *", { from });

        expect(next.getUTCFullYear()).toBe(2000);
        expect(next.getUTCMonth()).toBe(1); // February
        expect(next.getUTCDate()).toBe(29);
      });
    });
  });

  describe("Timezone handling", () => {
    let originalTZ: string | undefined;

    beforeEach(() => {
      originalTZ = process.env.TZ;
    });

    afterEach(() => {
      if (originalTZ === undefined) {
        delete process.env.TZ;
      } else {
        process.env.TZ = originalTZ;
      }
    });

    describe("system timezone independence", () => {
      it("should produce consistent results regardless of system timezone", () => {
        const cronExpr = "0 9 * * *";
        const from = new Date("2026-02-05T00:00:00Z");

        process.env.TZ = "UTC";
        const resultUTC = nextRun(cronExpr, { from, timezone: "America/New_York" });

        process.env.TZ = "Asia/Tokyo";
        const resultTokyo = nextRun(cronExpr, { from, timezone: "America/New_York" });

        process.env.TZ = "America/Los_Angeles";
        const resultLA = nextRun(cronExpr, { from, timezone: "America/New_York" });

        expect(resultUTC.getTime()).toBe(resultTokyo.getTime());
        expect(resultUTC.getTime()).toBe(resultLA.getTime());
      });

      it("should handle timezone conversion correctly when system TZ differs", () => {
        const cronExpr = "0 12 * * *";
        const from = new Date("2026-06-15T00:00:00Z");

        const timezones = [
          "UTC",
          "America/New_York",
          "Europe/London",
          "Asia/Tokyo",
          "Australia/Sydney",
        ];
        const results: Date[] = [];

        for (const tz of timezones) {
          process.env.TZ = tz;
          const result = nextRun(cronExpr, { from, timezone: "America/Chicago" });
          results.push(result);
        }

        const firstTime = results[0].getTime();
        for (let i = 1; i < results.length; i++) {
          expect(results[i].getTime()).toBe(firstTime);
        }
      });

      it("should work correctly without timezone option regardless of system TZ", () => {
        const cronExpr = "0 10 * * *";
        const from = new Date("2026-03-01T00:00:00Z");

        process.env.TZ = "UTC";
        const resultUTC = nextRun(cronExpr, { from });

        process.env.TZ = "Asia/Shanghai";
        const resultShanghai = nextRun(cronExpr, { from });

        expect(resultUTC.getTime()).toBe(resultShanghai.getTime());
      });
    });

    describe("cross-timezone consistency", () => {
      it("should schedule next minute consistently across timezones", () => {
        const stockholm = nextRun("* * * * *", { timezone: "Europe/Stockholm" });
        const newYork = nextRun("* * * * *", { timezone: "America/New_York" });

        const diff = Math.abs(stockholm.getTime() - newYork.getTime());
        expect(diff).toBeLessThan(2 * 60 * 1000);
      });

      it("should maintain correct UTC offset between timezones", () => {
        const refTime = new Date("2026-09-01T00:00:00Z");

        const stockholmNoon = nextRun("0 12 30 10 *", {
          from: refTime,
          timezone: "Europe/Stockholm",
        });
        const newYorkNoon = nextRun("0 12 30 10 *", {
          from: refTime,
          timezone: "America/New_York",
        });

        // Stockholm is UTC+1 (CET) and New York is UTC-4 (EDT) in October 2026
        const diffHours = (newYorkNoon.getTime() - stockholmNoon.getTime()) / 1000 / 3600;
        expect(diffHours).toBe(5);
      });

      it("should produce correct UTC timestamps for local times", () => {
        const refTime = new Date("2026-02-08T12:00:00Z");

        const stockholm = nextRun("0 23 * * 2", {
          from: refTime,
          timezone: "Europe/Stockholm",
        });

        const newYork = nextRun("0 23 * * 2", {
          from: refTime,
          timezone: "America/New_York",
        });

        // Stockholm is UTC+1 in February, so 11 PM = 10 PM UTC same day
        expect(stockholm.getUTCMonth()).toBe(1);
        expect(stockholm.getUTCDate()).toBe(10);
        expect(stockholm.getUTCHours()).toBe(22);
        expect(stockholm.getUTCFullYear()).toBe(2026);

        // New York is UTC-5 in February, so 11 PM = 4 AM UTC next day
        expect(newYork.getUTCMonth()).toBe(1);
        expect(newYork.getUTCDate()).toBe(11);
        expect(newYork.getUTCHours()).toBe(4);
        expect(newYork.getUTCFullYear()).toBe(2026);
      });
    });

    describe("DST transitions", () => {
      it("should handle spring forward transition (2 AM -> 3 AM)", () => {
        // March 8, 2026: clocks spring forward from 2 AM to 3 AM in US
        const from = new Date("2026-03-07T00:00:00Z");
        const next = nextRun("30 2 * * *", {
          from,
          timezone: "America/New_York",
        });

        expect(next).toBeInstanceOf(Date);
        expect(next.getTime()).toBeGreaterThan(from.getTime());
      });

      it("should handle fall back transition (2 AM occurs twice)", () => {
        // November 1, 2026: clocks fall back from 2 AM to 1 AM in US
        const from = new Date("2026-10-31T00:00:00Z");
        const next = nextRun("30 2 * * *", {
          from,
          timezone: "America/New_York",
        });

        expect(next).toBeInstanceOf(Date);
        expect(next.getTime()).toBeGreaterThan(from.getTime());
      });

      it("should fire the FIRST pass of a repeated hour (Europe/London)", () => {
        // 2025-10-26 London: 01:30 occurs twice — 00:30Z (BST) and 01:30Z (GMT).
        const next = nextRun("30 1 * * *", {
          from: new Date("2025-10-26T00:00:00Z"),
          timezone: "Europe/London",
        });
        expect(next.toISOString()).toBe("2025-10-26T00:30:00.000Z");
      });

      it("should fire the FIRST pass of a repeated hour (Europe/Athens)", () => {
        // 2016-10-30 Athens: wall 03:00 occurs twice — 00:00Z (EEST) and
        // 01:00Z (EET). Hourly schedule must emit 00:00Z first.
        const next = nextRun("0 3 * * *", {
          from: new Date("2016-10-29T23:00:01Z"),
          timezone: "Europe/Athens",
        });
        expect(next.toISOString()).toBe("2016-10-30T00:00:00.000Z");
      });

      it("previousRun should also resolve a repeated hour to the FIRST pass", () => {
        // From wall 02:00 London on the fall-back day, the previous 01:30 is
        // the first pass (00:30Z BST), not the second (01:30Z GMT).
        const prev = previousRun("30 1 * * *", {
          from: new Date("2025-10-26T02:00:00Z"),
          timezone: "Europe/London",
        });
        expect(prev.toISOString()).toBe("2025-10-26T00:30:00.000Z");
      });

      it("should keep west-of-UTC fall-back behavior unchanged (America/New_York)", () => {
        // 2025-11-02 NY: 01:30 occurs at 05:30Z (EDT) and 06:30Z (EST); first pass.
        const next = nextRun("30 1 * * *", {
          from: new Date("2025-11-02T04:00:00Z"),
          timezone: "America/New_York",
        });
        expect(next.toISOString()).toBe("2025-11-02T05:30:00.000Z");
      });

      it("should fire each repeated wall hour once, at the first pass (Europe/London hourly)", () => {
        // 2025-10-26 London: wall 01:00 occurs at 00:00Z (BST) and 01:00Z (GMT).
        // The hourly schedule fires the first pass, skips the second, then
        // resumes: 02:00 GMT wall = 02:00Z.
        const from = new Date("2025-10-25T23:00:01Z");
        const runs = nextRuns("0 * * * *", 3, { from, timezone: "Europe/London" });
        expect(runs.map((r) => r.toISOString())).toEqual([
          "2025-10-26T00:00:00.000Z",
          "2025-10-26T02:00:00.000Z",
          "2025-10-26T03:00:00.000Z",
        ]);
      });

      it("should fire each repeated wall hour once, at the first pass (Europe/Athens hourly)", () => {
        // 2016-10-30 Athens: wall 03:00 occurs at 00:00Z (EEST) and 01:00Z (EET).
        const from = new Date("2016-10-29T23:00:01Z");
        const runs = nextRuns("0 * * * *", 3, { from, timezone: "Europe/Athens" });
        expect(runs.map((r) => r.toISOString())).toEqual([
          "2016-10-30T00:00:00.000Z",
          "2016-10-30T02:00:00.000Z",
          "2016-10-30T03:00:00.000Z",
        ]);
      });

      it("should fire every stepped minute inside a repeated hour at its first pass", () => {
        // 2016-10-30 Athens: wall 03:00/03:20/03:40 each occur twice (EEST pass
        // at 00:xxZ, EET pass at 01:xxZ). No run may be dropped and no wall
        // minute may fire twice.
        const from = new Date("2016-10-29T23:00:01Z");
        const runs = nextRuns("*/20 3 * * *", 4, { from, timezone: "Europe/Athens" });
        expect(runs.map((r) => r.toISOString())).toEqual([
          "2016-10-30T00:00:00.000Z",
          "2016-10-30T00:20:00.000Z",
          "2016-10-30T00:40:00.000Z",
          "2016-10-31T01:00:00.000Z",
        ]);
      });

      it("should return strictly increasing runs across east-of-UTC fall-back (London)", () => {
        // from = 00:00Z London on the fall-back day (wall 01:00 BST, first
        // pass). Wall minutes 01:01-01:59 all repeat an hour later; every
        // emitted run must be after `from` and strictly increasing.
        const from = new Date("2025-10-26T00:00:00Z");
        const runs = nextRuns("* * * * *", 3, { from, timezone: "Europe/London" });
        expect(runs.map((r) => r.toISOString())).toEqual([
          "2025-10-26T00:01:00.000Z",
          "2025-10-26T00:02:00.000Z",
          "2025-10-26T00:03:00.000Z",
        ]);
      });

      it("should treat UTC, Etc/UTC, GMT and Etc/GMT identically in scheduling", () => {
        // Zero-offset zones take an identity fast path; results must match
        // the no-timezone (UTC wall clock) call exactly.
        const from = new Date("2026-03-15T05:30:00Z");
        const expected = nextRun("0 9 * * 1-5", { from }).toISOString();
        for (const tz of ["UTC", "Etc/UTC", "GMT", "Etc/GMT"]) {
          expect(nextRun("0 9 * * 1-5", { from, timezone: tz }).toISOString()).toBe(expected);
        }
      });

      it("should not return a time in the past during fall-back ambiguity", () => {
        // from = 2026-11-01T06:00:00Z = 1:00 AM EST (second pass of the repeated hour).
        // 1:30 AM occurs at both 05:30Z (EDT) and 06:30Z (EST); only 06:30Z is after `from`.
        const from = new Date("2026-11-01T06:00:00Z");
        const next = nextRun("30 1 * * *", {
          from,
          timezone: "America/New_York",
        });

        expect(next.toISOString()).toBe("2026-11-01T06:30:00.000Z");
      });

      it("should not return a time in the past during fall-back ambiguity for stepped minutes", () => {
        // from = 2026-11-01T06:00:00Z = 1:00 AM EST; next */7 wall minute is 1:07 AM,
        // which occurs at 05:07Z (EDT, before `from`) and 06:07Z (EST, after)
        const from = new Date("2026-11-01T06:00:00Z");
        const next = nextRun("*/7 * * * *", {
          from,
          timezone: "America/New_York",
        });

        expect(next.toISOString()).toBe("2026-11-01T06:07:00.000Z");
      });

      it("should return strictly increasing runs across fall-back ambiguity in nextRuns", () => {
        // from = 2026-11-01T06:00:00Z = 1:00 AM EST; wall minutes 1:01-1:59 also
        // existed an hour earlier (EDT). Every emitted run must be after `from`
        // and after the previous run.
        const from = new Date("2026-11-01T06:00:00Z");
        const runs = nextRuns("* * * * *", 3, { from, timezone: "America/New_York" });

        expect(runs.map((r) => r.toISOString())).toEqual([
          "2026-11-01T06:01:00.000Z",
          "2026-11-01T06:02:00.000Z",
          "2026-11-01T06:03:00.000Z",
        ]);
      });

      it("should resolve 30-minute fall-back duplicates (Lord Howe)", () => {
        // 2026-04-05 02:00 -> 01:30 (+11:00 -> +10:30). Wall 01:45 occurs at
        // 14:45Z (before `from`) and 15:15Z (after). The later duplicate must win.
        const next = nextRun("45 1 * * *", {
          from: new Date("2026-04-04T14:50:00Z"),
          timezone: "Australia/Lord_Howe",
        });

        expect(next.toISOString()).toBe("2026-04-05T15:15:00.000Z");
      });

      it("should resolve fall-back duplicates on a 45-minute-offset zone (Chatham)", () => {
        // 2026-04-05 03:45 -> 02:45 (+13:45 -> +12:45). Wall 03:30 occurs at
        // 13:45Z and 14:45Z; from is between them, so the later duplicate must win.
        const next = nextRun("30 3 * * *", {
          from: new Date("2026-04-04T14:20:00Z"),
          timezone: "Pacific/Chatham",
        });

        expect(next.toISOString()).toBe("2026-04-04T14:45:00.000Z");
      });

      it("should handle UTC timezone correctly", () => {
        const from = new Date("2026-10-31T20:00:00Z");
        const next = nextRun("0 12 * * *", {
          from,
          timezone: "Etc/UTC",
        });

        expect(next.getUTCHours()).toBe(12);
      });
    });

    describe("year-long DST stability", () => {
      it("should handle 365 consecutive days at midnight in America/New_York", () => {
        const startDate = new Date("2026-01-01T12:00:00.000Z");
        let current = new Date(startDate);

        const runs: Date[] = [];
        for (let i = 0; i < 365; i++) {
          current = nextRun("0 0 * * *", {
            from: current,
            timezone: "America/New_York",
          });
          runs.push(new Date(current));
          current = new Date(current.getTime() + 60000);
        }

        // Expected: 364 days between first and last run (365 runs spanning 364 days)
        const expectedLast = new Date(runs[0].getTime() + 364 * 24 * 60 * 60 * 1000);

        // Check timestamp is within DST tolerance
        const diff = Math.abs(runs[364].getTime() - expectedLast.getTime());
        expect(diff).toBeLessThan(3 * 60 * 60 * 1000); // 3 hours max

        // Check we're on the correct calendar date (within 1 day)
        const lastRun = runs[364];
        const expectedYear = expectedLast.getUTCFullYear();
        const expectedMonth = expectedLast.getUTCMonth();
        const expectedDay = expectedLast.getUTCDate();

        expect(lastRun.getUTCFullYear()).toBe(expectedYear);
        expect(lastRun.getUTCMonth()).toBe(expectedMonth);
        expect(Math.abs(lastRun.getUTCDate() - expectedDay)).toBeLessThanOrEqual(1);
      });

      it("should handle 365 consecutive days at 2:30 AM in America/New_York", () => {
        // 2:30 AM doesn't exist during spring DST transition
        const startDate = new Date("2026-01-01T12:00:00.000Z");
        let current = new Date(startDate);

        const runs: Date[] = [];
        for (let i = 0; i < 365; i++) {
          current = nextRun("30 2 * * *", {
            from: current,
            timezone: "America/New_York",
          });
          runs.push(new Date(current));
          current = new Date(current.getTime() + 60000);
        }

        // Expected: 364 days between first and last run
        const expectedLast = new Date(runs[0].getTime() + 364 * 24 * 60 * 60 * 1000);

        // Check timestamp is within DST tolerance
        const diff = Math.abs(runs[364].getTime() - expectedLast.getTime());
        expect(diff).toBeLessThan(3 * 60 * 60 * 1000); // 3 hours max

        // Check we're on the correct calendar date (within 1 day)
        const lastRun = runs[364];
        const expectedYear = expectedLast.getUTCFullYear();
        const expectedMonth = expectedLast.getUTCMonth();
        const expectedDay = expectedLast.getUTCDate();

        expect(lastRun.getUTCFullYear()).toBe(expectedYear);
        expect(lastRun.getUTCMonth()).toBe(expectedMonth);
        expect(Math.abs(lastRun.getUTCDate() - expectedDay)).toBeLessThanOrEqual(1);
      });

      it("should handle 365 consecutive days at 1:30 AM in America/New_York", () => {
        const startDate = new Date("2026-01-01T12:00:00.000Z");
        let current = new Date(startDate);

        const runs: Date[] = [];
        for (let i = 0; i < 365; i++) {
          current = nextRun("30 1 * * *", {
            from: current,
            timezone: "America/New_York",
          });
          runs.push(new Date(current));
          current = new Date(current.getTime() + 60000);
        }

        // Expected: 364 days between first and last run
        const expectedLast = new Date(runs[0].getTime() + 364 * 24 * 60 * 60 * 1000);

        // Check timestamp is within DST tolerance
        const diff = Math.abs(runs[364].getTime() - expectedLast.getTime());
        expect(diff).toBeLessThan(3 * 60 * 60 * 1000); // 3 hours max

        // Check we're on the correct calendar date (within 1 day)
        const lastRun = runs[364];
        const expectedYear = expectedLast.getUTCFullYear();
        const expectedMonth = expectedLast.getUTCMonth();
        const expectedDay = expectedLast.getUTCDate();

        expect(lastRun.getUTCFullYear()).toBe(expectedYear);
        expect(lastRun.getUTCMonth()).toBe(expectedMonth);
        expect(Math.abs(lastRun.getUTCDate() - expectedDay)).toBeLessThanOrEqual(1);
      });

      it("should handle 365 consecutive days at 2:30 AM in Europe/Berlin", () => {
        const startDate = new Date("2026-02-15T12:00:00.000Z");
        let current = new Date(startDate);

        const runs: Date[] = [];
        for (let i = 0; i < 365; i++) {
          current = nextRun("30 2 * * *", {
            from: current,
            timezone: "Europe/Berlin",
          });
          runs.push(new Date(current));
          current = new Date(current.getTime() + 60000);
        }

        // Expected: 364 days between first and last run
        const expectedLast = new Date(runs[0].getTime() + 364 * 24 * 60 * 60 * 1000);

        // Check timestamp is within DST tolerance
        const diff = Math.abs(runs[364].getTime() - expectedLast.getTime());
        expect(diff).toBeLessThan(3 * 60 * 60 * 1000); // 3 hours max

        // Check we're on the correct calendar date (within 1 day)
        const lastRun = runs[364];
        const expectedYear = expectedLast.getUTCFullYear();
        const expectedMonth = expectedLast.getUTCMonth();
        const expectedDay = expectedLast.getUTCDate();

        expect(lastRun.getUTCFullYear()).toBe(expectedYear);
        expect(lastRun.getUTCMonth()).toBe(expectedMonth);
        expect(Math.abs(lastRun.getUTCDate() - expectedDay)).toBeLessThanOrEqual(1);
      });
    });
  });

  describe("Field mismatches and rollovers", () => {
    describe("OR mode month boundaries", () => {
      it("should return null in OR mode next when day exceeds daysInMonth", () => {
        const from = new Date("2026-01-31T23:59:00Z");
        const next = nextRun("0 0 15 * 1", { from });
        expect(next.getUTCDate()).toBe(2);
        expect(next.getUTCMonth()).toBe(1);
        expect(next.getUTCDay()).toBe(1);
      });

      it("should return null in OR mode prev when day goes below 1", () => {
        const from = new Date("2026-02-01T00:01:00Z");
        const prev = previousRun("0 0 15 * 1", { from });
        expect(prev.getUTCDate()).toBe(26);
        expect(prev.getUTCMonth()).toBe(0);
        expect(prev.getUTCDay()).toBe(1);
      });

      it("should trigger month rollover in OR mode next", () => {
        const from = new Date("2026-01-31T10:00:00Z");
        const next = nextRun("0 9 15 * 1", { from });
        expect(next.getUTCMonth()).toBe(1);
      });

      it("should trigger month rollover in OR mode prev", () => {
        const from = new Date("2026-03-01T08:00:00Z");
        const prev = previousRun("0 10 15 * 1", { from });
        expect(prev.getUTCMonth()).toBe(1);
      });

      it("should handle OR mode crossing month end with next", () => {
        const from = new Date("2026-04-30T23:59:00Z");
        const next = nextRun("0 0 * * 1", { from });
        expect(next.getUTCDate()).toBeGreaterThan(0);
      });

      it("should handle OR mode crossing month start with prev", () => {
        const from = new Date("2026-05-01T00:01:00Z");
        const prev = previousRun("0 0 * * 1", { from });
        expect(prev.getUTCDate()).toBeGreaterThan(0);
      });
    });

    describe("field match but advance needed", () => {
      it("should call moveToDay when matches returns false despite matching fields", () => {
        const from = new Date("2026-03-15T09:00:00Z");
        const next = nextRun("0 9 15 * *", { from });
        expect(next.getTime()).toBeGreaterThan(from.getTime());
      });
    });

    describe("minute field mismatch", () => {
      it("should set valid minute in same hour for next direction", () => {
        const from = new Date("2026-03-15T10:05:00Z");
        const next = nextRun("15,30,45 10 * * *", { from });
        expect(next.getUTCMinutes()).toBe(15);
        expect(next.getUTCHours()).toBe(10);
      });

      it("should set valid minute in same hour for prev direction", () => {
        const from = new Date("2026-03-15T10:35:00Z");
        const prev = previousRun("0,15,30 10 * * *", { from });
        expect(prev.getUTCMinutes()).toBe(30);
        expect(prev.getUTCHours()).toBe(10);
      });
    });

    describe("hour field mismatch", () => {
      it("should set hours and minutes when valid hour found in same day", () => {
        const from = new Date("2026-03-15T08:30:00Z");
        const next = nextRun("0 10,14 * * *", { from });
        expect(next.getUTCHours()).toBe(10);
        expect(next.getUTCMinutes()).toBe(0);
      });

      it("should set hours and minutes for prev direction", () => {
        const from = new Date("2026-03-15T20:30:00Z");
        const prev = previousRun("0 10,14 * * *", { from });
        expect(prev.getUTCHours()).toBe(14);
        expect(prev.getUTCMinutes()).toBe(0);
      });
    });

    describe("day field mismatch", () => {
      it("should moveToDay when day mismatch but month matches", () => {
        const from = new Date("2026-03-10T10:00:00Z");
        const next = nextRun("0 9 15 * *", { from });
        expect(next.getUTCDate()).toBe(15);
      });

      it("should moveToDay when weekday mismatch", () => {
        const from = new Date("2026-03-11T10:00:00Z");
        const next = nextRun("0 9 * * 1", { from });
        expect(next.getUTCDay()).toBe(1);
      });

      it("should moveToDay in prev direction when day mismatch", () => {
        const from = new Date("2026-03-20T08:00:00Z");
        const prev = previousRun("0 9 15 * *", { from });
        expect(prev.getUTCDate()).toBe(15);
      });
    });

    describe("without timezone option", () => {
      it("should return date directly when no timezone specified", () => {
        const from = new Date("2026-03-15T10:30:00Z");
        const next = nextRun("0 15 * * *", { from });
        expect(next.getUTCHours()).toBe(15);
        expect(next.getUTCMinutes()).toBe(0);
      });

      it("should work with previousRun without timezone", () => {
        const from = new Date("2026-03-15T15:30:00Z");
        const prev = previousRun("0 9 * * *", { from });
        expect(prev.getUTCHours()).toBe(9);
      });
    });
  });

  describe("Edge case coverage", () => {
    describe("minute rollover to next hour (scheduler.ts:160-161)", () => {
      it("should rollover to next hour when no valid minute exists in current hour", () => {
        const from = new Date("2026-03-15T10:58:00Z");
        const next = nextRun("30,45 11 * * *", { from });

        expect(next.getUTCDate()).toBe(15);
        expect(next.getUTCHours()).toBe(11);
        expect(next.getUTCMinutes()).toBe(30);
      });

      it("should hit exact branch for minute rollover with targetHour (lines 160-161)", () => {
        const from = new Date("2026-03-15T14:45:00Z");
        const next = nextRun("0,15 15,16 * * *", { from });

        expect(next.getUTCHours()).toBe(15);
        expect(next.getUTCMinutes()).toBe(0);
      });

      it("should handle prev direction minute rollover to prev hour (lines 160-161)", () => {
        const from = new Date("2026-03-15T14:05:00Z");
        const prev = previousRun("45,59 13,14 * * *", { from });

        expect(prev.getUTCHours()).toBe(13);
        expect(prev.getUTCMinutes()).toBe(59);
      });

      it("should handle minute rollover when at minute 59", () => {
        const from = new Date("2026-03-15T23:58:00Z");
        const next = nextRun("30 0 * * *", { from });

        expect(next.getUTCDate()).toBe(16);
        expect(next.getUTCHours()).toBe(0);
        expect(next.getUTCMinutes()).toBe(30);
      });

      it("should handle minute rollover with restricted minutes in current hour", () => {
        const from = new Date("2026-03-15T14:40:00Z");
        const next = nextRun("0,15,30 15 * * *", { from });

        expect(next.getUTCDate()).toBe(15);
        expect(next.getUTCHours()).toBe(15);
        expect(next.getUTCMinutes()).toBe(0);
      });

      it("should skip to next hour when no valid minutes left in current hour", () => {
        const from = new Date("2026-03-15T10:50:00Z");
        const next = nextRun("15,30 11 * * *", { from });

        expect(next.getUTCDate()).toBe(15);
        expect(next.getUTCHours()).toBe(11);
        expect(next.getUTCMinutes()).toBe(15);
      });

      it("should use nextRuns to iterate through hour boundaries", () => {
        const from = new Date("2026-03-15T10:30:00Z");
        const runs = nextRuns("30,45 11 * * *", 3, { from });

        expect(runs).toHaveLength(3);
        expect(runs[0].getUTCHours()).toBe(11);
        expect(runs[0].getUTCMinutes()).toBe(30);
        expect(runs[1].getUTCMinutes()).toBe(45);
        expect(runs[2].getUTCDate()).toBe(16);
        expect(runs[2].getUTCHours()).toBe(11);
        expect(runs[2].getUTCMinutes()).toBe(30);
      });
    });

    describe("month boundary with invalid day (scheduler.ts:239-241)", () => {
      it("should move to previous month when current month has no valid day", () => {
        const from = new Date("2026-04-01T00:00:00Z");
        const prev = previousRun("0 12 31 * *", { from });

        expect(prev.getUTCMonth()).toBe(2);
        expect(prev.getUTCDate()).toBe(31);
        expect(prev.getUTCHours()).toBe(12);
        expect(prev.getUTCMinutes()).toBe(0);
      });

      it("should trigger resetToMonthBoundary when no valid day in month for prev direction", () => {
        const from = new Date("2026-05-01T12:00:00Z");
        const prev = previousRun("0 9 31 * *", { from });

        expect(prev.getUTCMonth()).toBe(2);
        expect(prev.getUTCDate()).toBe(31);
        expect(prev.getUTCHours()).toBe(9);
      });

      it("should handle February with day 31 going to January", () => {
        const from = new Date("2026-03-01T00:00:00Z");
        const prev = previousRun("0 9 31 * *", { from });

        expect(prev.getUTCMonth()).toBe(0);
        expect(prev.getUTCDate()).toBe(31);
        expect(prev.getUTCHours()).toBe(9);
      });

      it("should cross a whole year backwards when day never fits the listed month (non-leap)", () => {
        // Feb 29 doesn't fit 2026 or 2025 (non-leap); previous match from
        // March 2026 is Feb 29, 2024
        const from = new Date("2026-03-01T00:01:00Z");
        const prev = previousRun("0 0 29 2 *", { from });

        expect(prev.toISOString()).toBe("2024-02-29T00:00:00.000Z");
      });

      it("should handle April 31 case when going backwards", () => {
        const from = new Date("2026-05-01T00:00:00Z");
        const prev = previousRun("0 12 31 * *", { from });

        expect(prev.getUTCMonth()).toBe(2);
        expect(prev.getUTCDate()).toBe(31);
      });

      it("should handle June 31 case when going backwards", () => {
        const from = new Date("2026-07-01T00:00:00Z");
        const prev = previousRun("0 12 31 * *", { from });

        expect(prev.getUTCMonth()).toBe(4);
        expect(prev.getUTCDate()).toBe(31);
      });

      it("should handle September 31 case when going backwards", () => {
        const from = new Date("2026-10-01T00:00:00Z");
        const prev = previousRun("0 12 31 * *", { from });

        expect(prev.getUTCMonth()).toBe(7);
        expect(prev.getUTCDate()).toBe(31);
      });

      it("should handle November 31 case when going backwards", () => {
        const from = new Date("2026-12-01T00:00:00Z");
        const prev = previousRun("0 12 31 * *", { from });

        expect(prev.getUTCMonth()).toBe(9);
        expect(prev.getUTCDate()).toBe(31);
      });

      it("should trigger moveToMonth recursion for prev with no valid days", () => {
        const from = new Date("2026-06-15T12:00:00Z");
        const prev = previousRun("0 12 31 1 *", { from });

        expect(prev.getUTCMonth()).toBe(0);
        expect(prev.getUTCDate()).toBe(31);
        expect(prev.getUTCFullYear()).toBe(2026);
      });
    });

    describe("MAX_ITERATIONS safety (lines 93-94)", () => {
      it("should find matches efficiently without hitting iteration limit", () => {
        const from = new Date("2026-01-01T00:00:00Z");
        // "0 0 29 2 1" means: midnight on (Feb 29 OR Monday in Feb)
        // Standard cron uses OR logic when both day and weekday are specified
        // Next match: 2026-02-02 (first Monday in Feb after start date)
        const sparseCron = "0 0 29 2 1";

        const next = nextRun(sparseCron, { from });

        expect(next.getUTCDate()).toBe(2);
        expect(next.getUTCMonth()).toBe(1); // February
        expect(next.getUTCFullYear()).toBe(2026);
        expect(next.getUTCDay()).toBe(1); // Monday
      });

      it("should schedule impossible day/month with restricted weekday via OR", () => {
        // "0 0 31 2 1": Feb 31 never exists, so this fires on Mondays in February.
        // First Monday in Feb 2026 is Feb 2nd.
        const from = new Date("2026-01-01T00:00:00Z");
        const next = nextRun("0 0 31 2 1", { from });
        expect(next.toISOString()).toBe("2026-02-02T00:00:00.000Z");
        expect(next.getUTCDay()).toBe(1); // Monday
      });

      it("should handle OR logic in prev direction (day 29 OR Monday)", () => {
        const from = new Date("2028-03-01T00:00:00Z");
        // "0 0 29 2 1" means: midnight on (Feb 29 OR Monday in Feb)
        // Previous match should be Feb 29, 2028 (Tuesday, but matches day 29)
        const sparseCron = "0 0 29 2 1";

        const prev = previousRun(sparseCron, { from });

        expect(prev.getUTCDate()).toBe(29);
        expect(prev.getUTCMonth()).toBe(1); // February
        expect(prev.getUTCFullYear()).toBe(2028);
      });

      it("should handle OR logic in prev direction crossing month boundary", () => {
        // Start from Feb 1, go backwards with OR logic
        const from = new Date("2026-02-01T00:00:00Z");
        // "0 0 29 2 1" means: midnight on (Feb 29 OR Monday in Feb)
        // Previous match should be in February 2025 (last Monday)
        const sparseCron = "0 0 29 2 1";

        const prev = previousRun(sparseCron, { from });

        // Should find last Monday in February 2025
        expect(prev.getUTCMonth()).toBe(1); // February
        expect(prev.getUTCFullYear()).toBe(2025);
        expect(prev.getUTCDay()).toBe(1); // Monday
      });

      it("should handle sparse cron expressions within iteration limit", () => {
        const from = new Date("2026-01-01T00:00:00Z");
        const next = nextRun("0 0 31 12 *", { from });

        expect(next.getUTCDate()).toBe(31);
        expect(next.getUTCMonth()).toBe(11);
        expect(next.getUTCFullYear()).toBe(2026);
      });
    });

    describe("Day and weekday OR logic", () => {
      it("should match only day when weekday is wildcard (0 0 15 * *)", () => {
        // Day 15, weekday wildcard - should match ONLY day 15
        const cron = "0 0 15 * *";
        const feb15 = new Date("2026-02-15T00:00:00Z"); // Sunday, day 15
        const feb16 = new Date("2026-02-16T00:00:00Z"); // Monday, day 16

        expect(isMatch(cron, feb15)).toBe(true); // Matches day 15
        expect(isMatch(cron, feb16)).toBe(false); // Doesn't match (not day 15)
      });

      it("should match only weekday when day is wildcard (0 0 * * 1)", () => {
        // Day wildcard, Monday - should match ONLY Mondays
        const cron = "0 0 * * 1";
        const feb15 = new Date("2026-02-15T00:00:00Z"); // Sunday, day 15
        const feb16 = new Date("2026-02-16T00:00:00Z"); // Monday, day 16

        expect(isMatch(cron, feb15)).toBe(false); // Doesn't match (not Monday)
        expect(isMatch(cron, feb16)).toBe(true); // Matches Monday
      });

      it("should use OR logic when both day and weekday are restricted (0 0 15 * 1)", () => {
        // Day 15 OR Monday - should match either condition
        const cron = "0 0 15 * 1";
        const feb15 = new Date("2026-02-15T00:00:00Z"); // Sunday, day 15
        const feb16 = new Date("2026-02-16T00:00:00Z"); // Monday, day 16
        const feb17 = new Date("2026-02-17T00:00:00Z"); // Tuesday, day 17

        expect(isMatch(cron, feb15)).toBe(true); // Matches day 15 (even though not Monday)
        expect(isMatch(cron, feb16)).toBe(true); // Matches Monday (even though not day 15)
        expect(isMatch(cron, feb17)).toBe(false); // Doesn't match (neither day 15 nor Monday)
      });

      it("should find next occurrence with day-only restriction", () => {
        // Day 15, weekday wildcard - should find next day 15
        const from = new Date("2026-02-01T00:00:00Z");
        const next = nextRun("0 0 15 * *", { from });

        expect(next.getUTCDate()).toBe(15);
        expect(next.getUTCMonth()).toBe(1); // February
        expect(next.getUTCFullYear()).toBe(2026);
      });

      it("should find next occurrence with weekday-only restriction", () => {
        // Day wildcard, Monday - should find next Monday
        const from = new Date("2026-02-15T00:00:00Z"); // Sunday
        const next = nextRun("0 0 * * 1", { from });

        expect(next.getUTCDay()).toBe(1); // Monday
        expect(next.getUTCDate()).toBe(16);
        expect(next.getUTCMonth()).toBe(1); // February
      });

      it("should find next occurrence with OR logic (day 15 OR Monday)", () => {
        // Day 15 OR Monday - should find next occurrence of either
        const from = new Date("2026-02-14T00:00:00Z"); // Saturday, day 14
        const next = nextRun("0 0 15 * 1", { from });

        // Next match is Feb 15 (Sunday, day 15) - matches day condition
        expect(next.getUTCDate()).toBe(15);
        expect(next.getUTCMonth()).toBe(1); // February
        expect(next.getUTCFullYear()).toBe(2026);
      });

      it("should find multiple occurrences with OR logic", () => {
        // Day 15 OR Monday - get next 5 occurrences
        const from = new Date("2026-02-01T00:00:00Z");
        const runs = nextRuns("0 0 15 * 1", 5, { from });

        // Should get: Feb 2 (Mon), Feb 9 (Mon), Feb 15 (Sun, day 15), Feb 16 (Mon), Feb 23 (Mon)
        expect(runs[0].toISOString()).toBe("2026-02-02T00:00:00.000Z");
        expect(runs[1].toISOString()).toBe("2026-02-09T00:00:00.000Z");
        expect(runs[2].toISOString()).toBe("2026-02-15T00:00:00.000Z");
        expect(runs[3].toISOString()).toBe("2026-02-16T00:00:00.000Z");
        expect(runs[4].toISOString()).toBe("2026-02-23T00:00:00.000Z");
      });

      it("should treat explicit all weekdays (0-6) as restricted, not wildcard", () => {
        // Day 15, weekdays 0-6 (all days explicitly listed)
        // According to cron standard: * is wildcard, but 0-6 is restricted
        // When both day and weekday are restricted, use OR logic
        // Result: day 15 OR (Sun OR Mon OR ... OR Sat) = matches every day
        const cron = "0 0 15 * 0-6";
        const feb15 = new Date("2026-02-15T00:00:00Z"); // Sunday, day 15
        const feb16 = new Date("2026-02-16T00:00:00Z"); // Monday, day 16

        // Feb 15: matches day 15 OR weekday (Sunday is in 0-6) = true
        expect(isMatch(cron, feb15)).toBe(true);

        // Feb 16: doesn't match day 15, but matches weekday (Monday is in 0-6) = true
        // This is the key difference from wildcard behavior
        expect(isMatch(cron, feb16)).toBe(true);
      });
    });
  });

  describe("Error handling", () => {
    describe("nextRuns edge cases", () => {
      it("should return empty array for zero count", () => {
        const runs = nextRuns("* * * * *", 0);
        expect(runs).toHaveLength(0);
      });

      it("should return empty array for negative count", () => {
        const runs = nextRuns("* * * * *", -1);
        expect(runs).toHaveLength(0);
      });

      it("should handle floating point count (truncated by loop)", () => {
        const runs = nextRuns("* * * * *", 2.5 as number);
        // for loop runs for i=0,1,2 (3 times) since 2 < 2.5 but 3 > 2.5
        expect(runs).toHaveLength(3);
      });
    });

    describe("invalid timezone", () => {
      it("should throw for invalid timezone in nextRun", () => {
        const from = new Date("2026-03-15T14:00:00Z");
        expect(() => nextRun("0 9 * * *", { from, timezone: "Invalid/Timezone" })).toThrow(
          /time zone/i,
        );
      });

      it("should throw for invalid timezone in previousRun", () => {
        const from = new Date("2026-03-15T14:00:00Z");
        expect(() => previousRun("0 9 * * *", { from, timezone: "NotATimezone" })).toThrow(
          /time zone/i,
        );
      });

      it("should throw for invalid timezone in isMatch", () => {
        const date = new Date("2026-03-15T09:00:00Z");
        expect(() => isMatch("0 9 * * *", date, { timezone: "Fake/Zone" })).toThrow(/time zone/i);
      });

      it("should throw for empty timezone string in nextRun", () => {
        const from = new Date("2026-03-15T14:00:00Z");
        expect(() => nextRun("0 9 * * *", { from, timezone: "" })).toThrow(/time zone/i);
      });
    });
  });
});
