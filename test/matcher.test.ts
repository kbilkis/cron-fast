import { describe, it, expect } from "vitest";
import { matches, findNext, findPrevious, getDaysInMonth } from "../src/matcher.js";
import { parse } from "../src/parser.js";

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
  });
});
