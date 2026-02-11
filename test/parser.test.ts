import { describe, it, expect } from "vitest";
import { parse, isValid } from "../src/parser.js";

describe("parser", () => {
  describe("parse", () => {
    describe("wildcard expressions", () => {
      it("should parse simple wildcard expression", () => {
        const result = parse("* * * * *");
        expect(result.minute).toHaveLength(60);
        expect(result.hour).toHaveLength(24);
        expect(result.day).toHaveLength(31);
        expect(result.month).toHaveLength(12);
        expect(result.weekday).toHaveLength(7);
      });

      it("should handle leading and trailing whitespace", () => {
        const result = parse("  * * * * *  ");
        expect(result.minute).toHaveLength(60);
        expect(result.hour).toHaveLength(24);
      });

      it("should handle multiple spaces between fields", () => {
        const result = parse("*   *    *\t\t*\n\n*");
        expect(result.minute).toHaveLength(60);
        expect(result.hour).toHaveLength(24);
      });

      it("should handle tabs between fields", () => {
        const result = parse("*\t*\t*\t*\t*");
        expect(result.minute).toHaveLength(60);
      });

      it("should set wildcard flags correctly for wildcard expression", () => {
        const result = parse("* * * * *");
        expect(result.dayIsWildcard).toBe(true);
        expect(result.weekdayIsWildcard).toBe(true);
      });

      it("should set wildcard flags to false for non-wildcard values", () => {
        const result = parse("0 0 1 1 0");
        expect(result.dayIsWildcard).toBe(false);
        expect(result.weekdayIsWildcard).toBe(false);
      });

      it("should set wildcard flags to false for ranges equivalent to wildcard", () => {
        // 1-31 is equivalent to * for days, but should NOT set the wildcard flag
        const result = parse("0 0 1-31 1 0");
        expect(result.dayIsWildcard).toBe(false);
      });
    });

    describe("specific values", () => {
      it("should parse specific values", () => {
        const result = parse("30 9 15 6 1");
        expect(result.minute).toEqual([30]);
        expect(result.hour).toEqual([9]);
        expect(result.day).toEqual([15]);
        expect(result.month).toEqual([5]); // June = 5 (0-indexed)
        expect(result.weekday).toEqual([1]);
      });

      it("should handle minimum boundary values", () => {
        const result = parse("0 0 1 1 0");
        expect(result.minute).toEqual([0]);
        expect(result.hour).toEqual([0]);
        expect(result.day).toEqual([1]);
        expect(result.month).toEqual([0]); // January = 0 (0-indexed)
        expect(result.weekday).toEqual([0]); // Sunday = 0
      });

      it("should handle maximum boundary values", () => {
        const result = parse("59 23 31 12 6");
        expect(result.minute).toEqual([59]);
        expect(result.hour).toEqual([23]);
        expect(result.day).toEqual([31]);
        expect(result.month).toEqual([11]); // December = 11 (0-indexed)
        expect(result.weekday).toEqual([6]); // Saturday = 6
      });

      it("should return sorted arrays", () => {
        const result = parse("45,15,30 12,9,15 * * *");
        expect(result.minute).toEqual([15, 30, 45]); // Should be sorted
        expect(result.hour).toEqual([9, 12, 15]); // Should be sorted
      });

      it("should not contain duplicates", () => {
        const result = parse("5,5,5,10,10,15 1,1,1 * * *");
        expect(result.minute).toEqual([5, 10, 15]); // No duplicates
        expect(result.hour).toEqual([1]); // No duplicates
      });
    });

    describe("ranges", () => {
      it("should parse ranges", () => {
        const result = parse("0-30 9-17 * * 1-5");
        expect(result.minute).toHaveLength(31);
        expect(result.minute[0]).toBe(0);
        expect(result.minute[30]).toBe(30);
        expect(result.hour).toEqual([9, 10, 11, 12, 13, 14, 15, 16, 17]);
        expect(result.weekday).toEqual([1, 2, 3, 4, 5]);
      });

      it("should handle single-element range (start equals end)", () => {
        const result = parse("5-5 10-10 * * *");
        expect(result.minute).toEqual([5]);
        expect(result.hour).toEqual([10]);
      });

      it("should handle full field range", () => {
        const result = parse("0-59 0-23 * * *");
        expect(result.minute).toHaveLength(60);
        expect(result.minute[0]).toBe(0);
        expect(result.minute[59]).toBe(59);
        expect(result.hour).toHaveLength(24);
      });

      it("should handle range at field boundaries", () => {
        const result = parse("0-1 22-23 30-31 * *");
        expect(result.minute).toEqual([0, 1]);
        expect(result.hour).toEqual([22, 23]);
        expect(result.day).toEqual([30, 31]);
      });

      it("should handle weekday range including Sunday (0)", () => {
        const result = parse("* * * * 0-2");
        expect(result.weekday).toEqual([0, 1, 2]);
      });

      it("should handle day range at minimum boundary", () => {
        const result = parse("* * 1-5 * *");
        expect(result.day).toEqual([1, 2, 3, 4, 5]);
      });

      it("should handle month range at boundaries", () => {
        const result = parse("* * * 1-3 *");
        expect(result.month).toEqual([0, 1, 2]); // Jan=0, Feb=1, Mar=2
      });
    });

    describe("step values", () => {
      it("should parse step values", () => {
        const result = parse("*/15 */6 * * *");
        expect(result.minute).toEqual([0, 15, 30, 45]);
        expect(result.hour).toEqual([0, 6, 12, 18]);
      });

      it("should parse step values with ranges", () => {
        const result = parse("10-40/10 * * * *");
        expect(result.minute).toEqual([10, 20, 30, 40]);
      });

      it("should parse step values with single start value", () => {
        const result = parse("10/15 * * * *");
        expect(result.minute).toEqual([10, 25, 40, 55]);
      });

      it("should handle step of 1 (equivalent to range)", () => {
        const result = parse("0-5/1 * * * *");
        expect(result.minute).toEqual([0, 1, 2, 3, 4, 5]);
      });

      it("should handle large step that produces single value", () => {
        const result = parse("0-10/100 * * * *");
        expect(result.minute).toEqual([0]); // Only 0 is within range and divisible by step from start
      });

      it("should handle step that does not evenly divide range", () => {
        const result = parse("0-10/3 * * * *");
        expect(result.minute).toEqual([0, 3, 6, 9]);
      });

      it("should handle step starting from non-zero value", () => {
        const result = parse("5/10 * * * *");
        expect(result.minute).toEqual([5, 15, 25, 35, 45, 55]);
      });

      it("should handle step with wildcard", () => {
        const result = parse("*/10 * * * *");
        expect(result.minute).toEqual([0, 10, 20, 30, 40, 50]);
      });

      it("should handle step on hour field", () => {
        const result = parse("* */3 * * *");
        expect(result.hour).toEqual([0, 3, 6, 9, 12, 15, 18, 21]);
      });

      it("should handle step on day field", () => {
        const result = parse("* * */5 * *");
        expect(result.day).toEqual([1, 6, 11, 16, 21, 26, 31]);
      });

      it("should handle step on month field", () => {
        const result = parse("* * * */2 *");
        expect(result.month).toEqual([0, 2, 4, 6, 8, 10]); // Jan, Mar, May, Jul, Sep, Nov
      });

      it("should handle step on weekday field", () => {
        const result = parse("* * * * */2");
        expect(result.weekday).toEqual([0, 2, 4, 6]);
      });
    });

    describe("comma-separated values", () => {
      it("should parse comma-separated values", () => {
        const result = parse("0,15,30,45 9,12,15 * * *");
        expect(result.minute).toEqual([0, 15, 30, 45]);
        expect(result.hour).toEqual([9, 12, 15]);
      });

      it("should handle single value (no commas)", () => {
        const result = parse("30 12 * * *");
        expect(result.minute).toEqual([30]);
        expect(result.hour).toEqual([12]);
      });

      it("should handle many comma-separated values", () => {
        const result = parse("0,5,10,15,20,25,30,35,40,45,50,55 * * * *");
        expect(result.minute).toEqual([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
      });

      it("should mix ranges and single values", () => {
        const result = parse("0,10-15,30 * * * *");
        expect(result.minute).toEqual([0, 10, 11, 12, 13, 14, 15, 30]);
      });

      it("should mix step values and single values", () => {
        const result = parse("0,*/20,50 * * * *");
        expect(result.minute).toEqual([0, 20, 40, 50]);
      });

      it("should mix ranges, steps, and single values", () => {
        const result = parse("5,10-20/5,55 * * * *");
        expect(result.minute).toContain(5);
        expect(result.minute).toContain(10);
        expect(result.minute).toContain(15);
        expect(result.minute).toContain(20);
        expect(result.minute).toContain(55);
      });

      it("should handle duplicate values across comma-separated parts", () => {
        const result = parse("5,5-10,7,10 * * * *");
        expect(result.minute).toEqual([5, 6, 7, 8, 9, 10]);
        expect(result.minute.length).toBe(new Set(result.minute).size); // No duplicates
      });
    });

    describe("month names", () => {
      it("should parse month names", () => {
        const result = parse("0 0 1 jan,jun,dec *");
        expect(result.month).toEqual([0, 5, 11]); // Jan=0, Jun=5, Dec=11 (0-indexed)
      });

      it("should parse all month names individually", () => {
        expect(parse("0 0 1 jan *").month).toEqual([0]);
        expect(parse("0 0 1 feb *").month).toEqual([1]);
        expect(parse("0 0 1 mar *").month).toEqual([2]);
        expect(parse("0 0 1 apr *").month).toEqual([3]);
        expect(parse("0 0 1 may *").month).toEqual([4]);
        expect(parse("0 0 1 jun *").month).toEqual([5]);
        expect(parse("0 0 1 jul *").month).toEqual([6]);
        expect(parse("0 0 1 aug *").month).toEqual([7]);
        expect(parse("0 0 1 sep *").month).toEqual([8]);
        expect(parse("0 0 1 oct *").month).toEqual([9]);
        expect(parse("0 0 1 nov *").month).toEqual([10]);
        expect(parse("0 0 1 dec *").month).toEqual([11]);
      });

      it("should parse month name ranges", () => {
        const result = parse("0 0 1 jan-mar *");
        expect(result.month).toEqual([0, 1, 2]); // Jan=0, Feb=1, Mar=2
      });

      it("should parse month name range across multiple months", () => {
        const result = parse("0 0 1 apr-jul *");
        expect(result.month).toEqual([3, 4, 5, 6]); // Apr=3 through Jul=6
      });

      it("should handle mixed case names", () => {
        const result = parse("0 0 * JAN,FEB *");
        expect(result.month).toEqual([0, 1]); // Jan=0, Feb=1 (0-indexed)
      });

      it("should handle mixed case ranges", () => {
        const result = parse("0 0 1 JaN-MaR *");
        expect(result.month).toEqual([0, 1, 2]);
      });

      it("should NOT support full month names (only 3-letter codes)", () => {
        // The parser only supports 3-letter codes: jan, feb, mar, etc.
        // Full names like JANUARY are not supported
        expect(parse("0 0 1 JANUARY *")).toBeNull();
      });

      it("should mix month names and numbers in comma-separated list", () => {
        const result = parse("0 0 1 jan,3,jun,12 *");
        expect(result.month).toEqual([0, 2, 5, 11]); // Jan=0, Mar=2, Jun=5, Dec=11
      });
    });

    describe("weekday names", () => {
      it("should parse weekday names", () => {
        const result = parse("0 9 * * mon-fri");
        expect(result.weekday).toEqual([1, 2, 3, 4, 5]);
      });

      it("should parse all weekday names individually", () => {
        expect(parse("0 0 * * sun").weekday).toEqual([0]);
        expect(parse("0 0 * * mon").weekday).toEqual([1]);
        expect(parse("0 0 * * tue").weekday).toEqual([2]);
        expect(parse("0 0 * * wed").weekday).toEqual([3]);
        expect(parse("0 0 * * thu").weekday).toEqual([4]);
        expect(parse("0 0 * * fri").weekday).toEqual([5]);
        expect(parse("0 0 * * sat").weekday).toEqual([6]);
      });

      it("should parse weekday name ranges", () => {
        const result = parse("0 0 * * tue-thu");
        expect(result.weekday).toEqual([2, 3, 4]);
      });

      it("should normalize weekday 7 to 0", () => {
        const result = parse("0 0 * * 7");
        expect(result.weekday).toEqual([0]);
      });

      it("should handle both 0 and 7 for Sunday in same expression", () => {
        const result = parse("0 0 * * 0,7");
        expect(result.weekday).toEqual([0]); // Both normalize to 0, deduplicated
      });

      it("should handle mixed case weekday names", () => {
        const result = parse("0 0 * * MON,TUE,WED");
        expect(result.weekday).toEqual([1, 2, 3]);
      });

      it("should mix weekday names and numbers", () => {
        const result = parse("0 0 * * sun,2,fri");
        expect(result.weekday).toEqual([0, 2, 5]);
      });

      it("should handle weekday step with names in range", () => {
        const result = parse("0 0 * * mon-fri/2");
        expect(result.weekday).toEqual([1, 3, 5]);
      });
    });

    describe("error cases - empty and malformed input", () => {
      it("should return null for empty expression", () => {
        expect(parse("")).toBeNull();
      });

      it("should return null for whitespace-only expression", () => {
        expect(parse("     ")).toBeNull();
      });

      it("should return null for tab-only expression", () => {
        expect(parse("\t\t\t")).toBeNull();
      });

      it("should return null for newline-only expression", () => {
        expect(parse("\n\n")).toBeNull();
      });

      it("should return null for mixed whitespace-only expression", () => {
        expect(parse("  \t\n  ")).toBeNull();
      });

      it("should return null for wrong number of fields - too few", () => {
        expect(parse("* * *")).toBeNull();
      });

      it("should return null for wrong number of fields - too many", () => {
        expect(parse("* * * * * *")).toBeNull();
      });

      it("should return null for single field", () => {
        expect(parse("*")).toBeNull();
      });

      it("should return null for four fields", () => {
        expect(parse("* * * *")).toBeNull();
      });
    });

    describe("error cases - step values", () => {
      it("should return null for invalid step value (zero)", () => {
        expect(parse("*/0 * * * *")).toBeNull();
      });

      it("should return null for negative step value", () => {
        expect(parse("*/-5 * * * *")).toBeNull();
      });

      it("should return null for non-numeric step value", () => {
        expect(parse("*/abc * * * *")).toBeNull();
      });

      it("should return null for step with empty string", () => {
        expect(parse("/5 * * * *")).toBeNull();
      });

      it("should return null for step at end only", () => {
        expect(parse("5/ * * * *")).toBeNull();
      });

      it("should return null for invalid range format in step value", () => {
        expect(parse("10-20-30/5 * * * *")).toBeNull();
      });

      it("should return null for invalid start value in range with step", () => {
        expect(parse("abc-20/5 * * * *")).toBeNull();
      });

      it("should return null for invalid end value in range with step", () => {
        expect(parse("10-xyz/5 * * * *")).toBeNull();
      });
    });

    describe("error cases - ranges", () => {
      it("should return null for invalid range (start > end)", () => {
        expect(parse("50-10 * * * *")).toBeNull();
      });

      it("should return null for out of range value in simple range", () => {
        expect(parse("70-80 * * * *")).toBeNull();
      });

      it("should return null for out of range value in step range", () => {
        expect(parse("70-80/5 * * * *")).toBeNull();
      });

      it("should return null for range with only dash", () => {
        expect(parse("- * * * *")).toBeNull();
      });

      it("should return null for multiple dashes in range (malformed input)", () => {
        // Previously this was a parser quirk that silently accepted "1-5-10" as "1-5".
        // Now we return null to catch malformed input early.
        expect(parse("1-5-10 * * * *")).toBeNull();
      });
    });

    describe("error cases - out of range values", () => {
      it("should return null for minute out of range (60)", () => {
        expect(parse("60 * * * *")).toBeNull();
      });

      it("should return null for minute out of range (negative)", () => {
        expect(parse("-1 * * * *")).toBeNull();
      });

      it("should return null for minute out of range (100)", () => {
        expect(parse("100 * * * *")).toBeNull();
      });

      it("should return null for hour out of range (24)", () => {
        expect(parse("* 24 * * *")).toBeNull();
      });

      it("should return null for hour out of range (negative)", () => {
        expect(parse("* -1 * * *")).toBeNull();
      });

      it("should return null for day out of range (0)", () => {
        expect(parse("* * 0 * *")).toBeNull();
      });

      it("should return null for day out of range (32)", () => {
        expect(parse("* * 32 * *")).toBeNull();
      });

      it("should return null for month out of range (0)", () => {
        // Month 0 is invalid because months are 1-12 in cron format
        expect(parse("* * * 0 *")).toBeNull();
      });

      it("should return null for month out of range (13)", () => {
        expect(parse("* * * 13 *")).toBeNull();
      });

      it("should return null for weekday out of range (8)", () => {
        expect(parse("* * * * 8")).toBeNull();
      });
    });

    describe("error cases - invalid value names", () => {
      it("should return null for invalid weekday name", () => {
        expect(parse("0 0 * * notaday")).toBeNull();
      });

      it("should return null for invalid month name", () => {
        expect(parse("0 0 1 notamonth *")).toBeNull();
      });

      it("should return null for partial month name", () => {
        expect(parse("0 0 1 janu *")).toBeNull();
      });

      it("should return null for partial weekday name", () => {
        expect(parse("0 0 * * mond")).toBeNull();
      });

      it("should return null for completely invalid field value", () => {
        expect(parse("abc * * * *")).toBeNull();
      });

      it("should return null for special characters in value", () => {
        expect(parse("@ * * * *")).toBeNull();
      });
    });

    describe("error cases - comma-separated issues", () => {
      it("should return null for empty part between commas", () => {
        expect(parse("1,,3 * * * *")).toBeNull();
      });

      it("should return null for trailing comma", () => {
        expect(parse("1,2, * * * *")).toBeNull();
      });

      it("should return null for leading comma", () => {
        expect(parse(",1,2 * * * *")).toBeNull();
      });

      it("should return null for invalid value in comma list", () => {
        expect(parse("1,2,abc,4 * * * *")).toBeNull();
      });
    });

    describe("day/month validation", () => {
      it("should return null for impossible day/month combination (Feb 31)", () => {
        expect(parse("0 0 31 2 *")).toBeNull();
      });

      it("should return null for impossible day/month combination (Feb 30)", () => {
        expect(parse("0 0 30 2 *")).toBeNull();
      });

      it("should return null for impossible day/month combination (Apr 31)", () => {
        expect(parse("0 0 31 4 *")).toBeNull();
      });

      it("should return null for impossible day/month combination (Jun 31)", () => {
        expect(parse("0 0 31 6 *")).toBeNull();
      });

      it("should return null for impossible day/month combination (Sep 31)", () => {
        expect(parse("0 0 31 9 *")).toBeNull();
      });

      it("should return null for impossible day/month combination (Nov 31)", () => {
        expect(parse("0 0 31 11 *")).toBeNull();
      });

      it("should allow Feb 29 (exists in leap years)", () => {
        expect(parse("0 0 29 2 *")).not.toBeNull();
      });

      it("should allow day 31 with wildcard month", () => {
        expect(parse("0 0 31 * *")).not.toBeNull();
      });

      it("should allow wildcard day with specific month", () => {
        expect(parse("0 0 * 2 *")).not.toBeNull();
      });

      it("should allow day 31 in January", () => {
        expect(parse("0 0 31 1 *")).not.toBeNull();
      });

      it("should allow day 31 in March", () => {
        expect(parse("0 0 31 3 *")).not.toBeNull();
      });

      it("should allow day 31 in May", () => {
        expect(parse("0 0 31 5 *")).not.toBeNull();
      });

      it("should allow day 31 in July", () => {
        expect(parse("0 0 31 7 *")).not.toBeNull();
      });

      it("should allow day 31 in August", () => {
        expect(parse("0 0 31 8 *")).not.toBeNull();
      });

      it("should allow day 31 in October", () => {
        expect(parse("0 0 31 10 *")).not.toBeNull();
      });

      it("should allow day 31 in December", () => {
        expect(parse("0 0 31 12 *")).not.toBeNull();
      });

      it("should allow day 30 in April", () => {
        expect(parse("0 0 30 4 *")).not.toBeNull();
      });

      it("should allow day 30 in June", () => {
        expect(parse("0 0 30 6 *")).not.toBeNull();
      });

      it("should allow day 30 in September", () => {
        expect(parse("0 0 30 9 *")).not.toBeNull();
      });

      it("should allow day 30 in November", () => {
        expect(parse("0 0 30 11 *")).not.toBeNull();
      });

      it("should handle multiple months with mixed valid/invalid days", () => {
        // Days 30-31 in Feb,Apr - Feb 30-31 invalid, but Apr 30 valid
        expect(parse("0 0 30-31 2,4 *")).not.toBeNull();
      });

      it("should return null when all day/month combinations are invalid", () => {
        // Day 31 only in Feb,Apr,Jun,Sep,Nov (all have < 31 days)
        expect(parse("0 0 31 2,4,6,9,11 *")).toBeNull();
      });

      it("should allow with month name for valid day", () => {
        expect(parse("0 0 31 jan *")).not.toBeNull();
      });

      it("should return null with month name for invalid day", () => {
        expect(parse("0 0 31 apr *")).toBeNull();
      });
    });
  });

  describe("isValid", () => {
    describe("should return true for valid expressions", () => {
      it("should validate wildcard expression", () => {
        expect(isValid("* * * * *")).toBe(true);
      });

      it("should validate specific values", () => {
        expect(isValid("0 9 * * *")).toBe(true);
      });

      it("should validate step values", () => {
        expect(isValid("*/15 * * * *")).toBe(true);
      });

      it("should validate ranges with names", () => {
        expect(isValid("0 9 * * mon-fri")).toBe(true);
      });

      it("should validate complex expressions", () => {
        expect(isValid("0,15,30,45 9-17 * * mon-fri")).toBe(true);
      });

      it("should validate expression with whitespace", () => {
        expect(isValid("  * * * * *  ")).toBe(true);
      });

      it("should validate boundary values", () => {
        expect(isValid("0 0 1 1 0")).toBe(true);
        expect(isValid("59 23 31 12 6")).toBe(true);
      });

      it("should validate month names", () => {
        expect(isValid("0 0 1 jan *")).toBe(true);
        expect(isValid("0 0 1 jan,feb,mar *")).toBe(true);
      });

      it("should validate weekday names", () => {
        expect(isValid("0 0 * * mon")).toBe(true);
        expect(isValid("0 0 * * mon-fri")).toBe(true);
      });

      it("should validate Feb 29", () => {
        expect(isValid("0 0 29 2 *")).toBe(true);
      });
    });

    describe("should return false for invalid expressions", () => {
      it("should reject empty expression", () => {
        expect(isValid("")).toBe(false);
      });

      it("should reject whitespace-only expression", () => {
        expect(isValid("     ")).toBe(false);
      });

      it("should reject invalid string", () => {
        expect(isValid("invalid")).toBe(false);
      });

      it("should reject wrong number of fields", () => {
        expect(isValid("* * *")).toBe(false);
        expect(isValid("* * * * * *")).toBe(false);
      });

      it("should reject out of range minute", () => {
        expect(isValid("60 * * * *")).toBe(false);
        expect(isValid("-1 * * * *")).toBe(false);
      });

      it("should reject out of range hour", () => {
        expect(isValid("* 24 * * *")).toBe(false);
      });

      it("should reject out of range day", () => {
        expect(isValid("* * 0 * *")).toBe(false);
        expect(isValid("* * 32 * *")).toBe(false);
      });

      it("should reject out of range month", () => {
        expect(isValid("* * * 0 *")).toBe(false);
        expect(isValid("* * * 13 *")).toBe(false);
      });

      it("should reject out of range weekday", () => {
        expect(isValid("* * * * 8")).toBe(false);
      });

      it("should reject invalid step value", () => {
        expect(isValid("*/0 * * * *")).toBe(false);
      });

      it("should reject invalid range", () => {
        expect(isValid("50-10 * * * *")).toBe(false);
      });

      it("should reject invalid day/month combination", () => {
        expect(isValid("0 0 31 2 *")).toBe(false);
        expect(isValid("0 0 30 2 *")).toBe(false);
      });

      it("should reject invalid names", () => {
        expect(isValid("0 0 * * notaday")).toBe(false);
        expect(isValid("0 0 1 notamonth *")).toBe(false);
      });
    });
  });
});
