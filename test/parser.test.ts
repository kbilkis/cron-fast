import { describe, it, expect } from "vitest";
import { parse, isValid } from "../src/parser.js";

describe("parser", () => {
  describe("parse", () => {
    it("should parse simple wildcard expression", () => {
      const result = parse("* * * * *");
      expect(result.minute).toHaveLength(60);
      expect(result.hour).toHaveLength(24);
      expect(result.day).toHaveLength(31);
      expect(result.month).toHaveLength(12);
      expect(result.weekday).toHaveLength(7);
    });

    it("should parse specific values", () => {
      const result = parse("30 9 15 6 1");
      expect(result.minute).toEqual([30]);
      expect(result.hour).toEqual([9]);
      expect(result.day).toEqual([15]);
      expect(result.month).toEqual([5]); // June = 5 (0-indexed)
      expect(result.weekday).toEqual([1]);
    });

    it("should parse ranges", () => {
      const result = parse("0-30 9-17 * * 1-5");
      expect(result.minute).toHaveLength(31);
      expect(result.minute[0]).toBe(0);
      expect(result.minute[30]).toBe(30);
      expect(result.hour).toEqual([9, 10, 11, 12, 13, 14, 15, 16, 17]);
      expect(result.weekday).toEqual([1, 2, 3, 4, 5]);
    });

    it("should parse step values", () => {
      const result = parse("*/15 */6 * * *");
      expect(result.minute).toEqual([0, 15, 30, 45]);
      expect(result.hour).toEqual([0, 6, 12, 18]);
    });

    it("should parse step values with ranges", () => {
      const result = parse("10-40/10 * * * *");
      expect(result.minute).toEqual([10, 20, 30, 40]);
    });

    it("should parse comma-separated values", () => {
      const result = parse("0,15,30,45 9,12,15 * * *");
      expect(result.minute).toEqual([0, 15, 30, 45]);
      expect(result.hour).toEqual([9, 12, 15]);
    });

    it("should parse month names", () => {
      const result = parse("0 0 1 jan,jun,dec *");
      expect(result.month).toEqual([0, 5, 11]); // Jan=0, Jun=5, Dec=11 (0-indexed)
    });

    it("should parse weekday names", () => {
      const result = parse("0 9 * * mon-fri");
      expect(result.weekday).toEqual([1, 2, 3, 4, 5]);
    });

    it("should normalize weekday 7 to 0", () => {
      const result = parse("0 0 * * 7");
      expect(result.weekday).toEqual([0]);
    });

    it("should handle mixed case names", () => {
      const result = parse("0 0 * JAN,FEB *");
      expect(result.month).toEqual([0, 1]); // Jan=0, Feb=1 (0-indexed)
    });

    it("should throw on empty expression", () => {
      expect(() => parse("")).toThrow("cannot be empty");
    });

    it("should throw on wrong number of fields", () => {
      expect(() => parse("* * *")).toThrow("expected 5 fields");
    });

    it("should throw on invalid step value", () => {
      expect(() => parse("*/0 * * * *")).toThrow("Invalid step");
    });

    it("should throw on invalid range", () => {
      expect(() => parse("50-10 * * * *")).toThrow("Invalid range");
    });

    it("should throw on out of range value", () => {
      expect(() => parse("60 * * * *")).toThrow("out of range");
    });

    it("should throw on impossible day/month combination (Feb 31)", () => {
      expect(() => parse("0 0 31 2 *")).toThrow("no valid day/month combination");
    });

    it("should throw on impossible day/month combination (Feb 30)", () => {
      expect(() => parse("0 0 30 2 *")).toThrow("no valid day/month combination");
    });

    it("should allow Feb 29 (exists in leap years)", () => {
      expect(() => parse("0 0 29 2 *")).not.toThrow();
    });

    it("should allow day 31 with wildcard month", () => {
      expect(() => parse("0 0 31 * *")).not.toThrow();
    });

    it("should allow wildcard day with specific month", () => {
      expect(() => parse("0 0 * 2 *")).not.toThrow();
    });
  });

  describe("isValid", () => {
    it("should return true for valid expressions", () => {
      expect(isValid("* * * * *")).toBe(true);
      expect(isValid("0 9 * * *")).toBe(true);
      expect(isValid("*/15 * * * *")).toBe(true);
      expect(isValid("0 9 * * mon-fri")).toBe(true);
    });

    it("should return false for invalid expressions", () => {
      expect(isValid("")).toBe(false);
      expect(isValid("invalid")).toBe(false);
      expect(isValid("* * *")).toBe(false);
      expect(isValid("60 * * * *")).toBe(false);
    });
  });
});
