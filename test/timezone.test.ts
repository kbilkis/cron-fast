import { describe, it, expect } from "vitest";
import { convertFromTimezone, convertToTimezone } from "../src/timezone.js";

describe("Timezone Edge Cases - Deep Dive", () => {
  it("should verify convertToTimezone and convertFromTimezone are inverses", () => {
    const original = new Date("2026-06-15T10:30:00Z");
    const timezone = "America/Chicago";

    // Convert to timezone
    const converted = convertToTimezone(original, timezone);

    // Convert back
    const restored = convertFromTimezone(converted, timezone);

    // Should be identical
    expect(restored.getTime()).toBe(original.getTime());
  });

  it("should test multiple round-trips through different timezones", () => {
    const timezones = [
      "America/New_York",
      "Europe/London",
      "Asia/Tokyo",
      "Australia/Sydney",
      "America/Los_Angeles",
      "Europe/Paris",
    ];

    const original = new Date("2026-03-15T18:45:30Z");

    for (const tz of timezones) {
      const converted = convertToTimezone(original, tz);
      const restored = convertFromTimezone(converted, tz);

      expect(restored.getTime()).toBe(original.getTime());
    }
  });

  it("should handle DST transitions correctly", () => {
    // Test around DST transition in New York (March 8, 2026, 2 AM -> 3 AM)
    const beforeDST = new Date("2026-03-08T06:00:00Z"); // 1 AM EST (before transition)
    const afterDST = new Date("2026-03-08T08:00:00Z"); // 4 AM EDT (after transition)
    // Skip the transition hour itself (2-3 AM doesn't exist)

    const timezone = "America/New_York";

    for (const date of [beforeDST, afterDST]) {
      const converted = convertToTimezone(date, timezone);
      const restored = convertFromTimezone(converted, timezone);

      expect(restored.getTime()).toBe(date.getTime());
    }
  });

  describe("Half-hour offset timezones", () => {
    it("should round-trip through Asia/Kolkata (IST +5:30)", () => {
      // India Standard Time is UTC+5:30 - a half-hour offset
      const timezone = "Asia/Kolkata";
      const dates = [
        new Date("2026-03-15T00:00:00Z"), // UTC midnight -> 5:30 AM IST
        new Date("2026-03-15T18:30:00Z"), // UTC 6:30 PM -> midnight IST
        new Date("2026-03-15T05:30:00Z"), // Should be 11:00 AM IST
      ];

      for (const date of dates) {
        const converted = convertToTimezone(date, timezone);
        const restored = convertFromTimezone(converted, timezone);

        expect(restored.getTime()).toBe(date.getTime());
      }
    });

    it("should correctly convert UTC midnight to Asia/Kolkata", () => {
      const timezone = "Asia/Kolkata";
      const utcMidnight = new Date("2026-03-15T00:00:00Z");

      const converted = convertToTimezone(utcMidnight, timezone);

      // UTC 00:00 -> IST 05:30
      expect(converted.getUTCHours()).toBe(5);
      expect(converted.getUTCMinutes()).toBe(30);
      expect(converted.getUTCDate()).toBe(15);
    });

    it("should round-trip through Asia/Kabul (AFT +4:30)", () => {
      // Afghanistan Time is UTC+4:30
      const timezone = "Asia/Kabul";
      const dates = [
        new Date("2026-03-15T00:00:00Z"),
        new Date("2026-03-15T19:30:00Z"),
        new Date("2026-06-21T12:00:00Z"),
      ];

      for (const date of dates) {
        const converted = convertToTimezone(date, timezone);
        const restored = convertFromTimezone(converted, timezone);

        expect(restored.getTime()).toBe(date.getTime());
      }
    });

    it("should round-trip through America/St_Johns (NST -3:30)", () => {
      // Newfoundland Standard Time is UTC-3:30
      const timezone = "America/St_Johns";
      const dates = [
        new Date("2026-03-15T00:00:00Z"),
        new Date("2026-03-15T12:00:00Z"),
        new Date("2026-06-21T18:00:00Z"),
      ];

      for (const date of dates) {
        const converted = convertToTimezone(date, timezone);
        const restored = convertFromTimezone(converted, timezone);

        expect(restored.getTime()).toBe(date.getTime());
      }
    });

    it("should round-trip through Australia/Adelaide (ACST +9:30)", () => {
      // Australian Central Standard Time is UTC+9:30
      const timezone = "Australia/Adelaide";
      const dates = [
        new Date("2026-03-15T00:00:00Z"),
        new Date("2026-03-15T14:30:00Z"), // Should be midnight in Adelaide
        new Date("2026-06-21T12:00:00Z"),
      ];

      for (const date of dates) {
        const converted = convertToTimezone(date, timezone);
        const restored = convertFromTimezone(converted, timezone);

        expect(restored.getTime()).toBe(date.getTime());
      }
    });
  });

  describe("45-minute offset timezones", () => {
    it("should round-trip through Asia/Kathmandu (NPT +5:45)", () => {
      // Nepal Time is UTC+5:45 - one of the few 45-minute offset timezones
      const timezone = "Asia/Kathmandu";
      const dates = [
        new Date("2026-03-15T00:00:00Z"), // UTC midnight -> 5:45 AM NPT
        new Date("2026-03-15T18:15:00Z"), // UTC 6:15 PM -> midnight NPT
        new Date("2026-06-21T12:00:00Z"),
      ];

      for (const date of dates) {
        const converted = convertToTimezone(date, timezone);
        const restored = convertFromTimezone(converted, timezone);

        expect(restored.getTime()).toBe(date.getTime());
      }
    });

    it("should correctly convert UTC midnight to Asia/Kathmandu", () => {
      const timezone = "Asia/Kathmandu";
      const utcMidnight = new Date("2026-03-15T00:00:00Z");

      const converted = convertToTimezone(utcMidnight, timezone);

      // UTC 00:00 -> NPT 05:45
      expect(converted.getUTCHours()).toBe(5);
      expect(converted.getUTCMinutes()).toBe(45);
      expect(converted.getUTCDate()).toBe(15);
    });

    it("should round-trip through Pacific/Chatham (+12:45 standard, +13:45 DST)", () => {
      // Chatham Islands have a unique 45-minute offset with DST
      const timezone = "Pacific/Chatham";

      // Standard time (April to September - Southern Hemisphere winter)
      const standardTime = new Date("2026-06-15T12:00:00Z");
      const convertedStd = convertToTimezone(standardTime, timezone);
      const restoredStd = convertFromTimezone(convertedStd, timezone);
      expect(restoredStd.getTime()).toBe(standardTime.getTime());

      // DST time (late September to early April - Southern Hemisphere summer)
      // Note: Chatham DST typically starts last Sunday of September
      const dstTime = new Date("2026-12-15T12:00:00Z");
      const convertedDst = convertToTimezone(dstTime, timezone);
      const restoredDst = convertFromTimezone(convertedDst, timezone);
      expect(restoredDst.getTime()).toBe(dstTime.getTime());
    });
  });

  describe("Extreme offset timezones", () => {
    it("should round-trip through Pacific/Kiritimati (+14)", () => {
      // Line Islands (Kiritimati) is UTC+14 - the easternmost timezone
      // It's the first to enter a new calendar day
      const timezone = "Pacific/Kiritimati";
      const dates = [
        new Date("2026-03-15T00:00:00Z"), // UTC midnight -> 14:00 (2 PM) same day
        new Date("2026-03-15T10:00:00Z"), // UTC 10 AM -> midnight next day
        new Date("2026-06-21T12:00:00Z"),
      ];

      for (const date of dates) {
        const converted = convertToTimezone(date, timezone);
        const restored = convertFromTimezone(converted, timezone);

        expect(restored.getTime()).toBe(date.getTime());
      }
    });

    it("should correctly handle day boundary crossing for Pacific/Kiritimati", () => {
      const timezone = "Pacific/Kiritimati";

      // UTC 10:00 -> Kiritimati 00:00 (next day)
      const utc10am = new Date("2026-03-15T10:00:00Z");
      const converted = convertToTimezone(utc10am, timezone);

      // Should be next day
      expect(converted.getUTCDate()).toBe(16);
      expect(converted.getUTCHours()).toBe(0);
      expect(converted.getUTCMinutes()).toBe(0);
    });

    it("should round-trip through Pacific/Niue (-11)", () => {
      // Niue is UTC-11 - one of the westernmost timezones
      // It's among the last to enter a new calendar day
      const timezone = "Pacific/Niue";
      const dates = [
        new Date("2026-03-15T00:00:00Z"), // UTC midnight -> 1 PM previous day
        new Date("2026-03-15T11:00:00Z"), // UTC 11 AM -> midnight same day
        new Date("2026-06-21T12:00:00Z"),
      ];

      for (const date of dates) {
        const converted = convertToTimezone(date, timezone);
        const restored = convertFromTimezone(converted, timezone);

        expect(restored.getTime()).toBe(date.getTime());
      }
    });

    it("should correctly handle day boundary crossing for Pacific/Niue", () => {
      const timezone = "Pacific/Niue";

      // UTC midnight -> Niue 1 PM previous day
      const utcMidnight = new Date("2026-03-15T00:00:00Z");
      const converted = convertToTimezone(utcMidnight, timezone);

      // Should be previous day
      expect(converted.getUTCDate()).toBe(14);
      expect(converted.getUTCHours()).toBe(13); // 1 PM
      expect(converted.getUTCMinutes()).toBe(0);
    });

    it("should round-trip through Pacific/Kanton (+13)", () => {
      // Kanton Island (Phoenix Islands) is UTC+13 - no DST
      const timezone = "Pacific/Kanton";
      const dates = [new Date("2026-03-15T00:00:00Z"), new Date("2026-06-21T12:00:00Z")];

      for (const date of dates) {
        const converted = convertToTimezone(date, timezone);
        const restored = convertFromTimezone(converted, timezone);

        expect(restored.getTime()).toBe(date.getTime());
      }
    });
  });

  describe("Year boundary conversions", () => {
    it("should handle New Year transition in positive offset timezone", () => {
      // In Tokyo (+9), UTC 15:00 Dec 31 -> Jan 1 00:00
      const timezone = "Asia/Tokyo";
      const utcDec31_15 = new Date("2026-12-31T15:00:00Z");

      const converted = convertToTimezone(utcDec31_15, timezone);

      // Should be January 1 in Tokyo
      expect(converted.getUTCFullYear()).toBe(2027);
      expect(converted.getUTCMonth()).toBe(0); // January
      expect(converted.getUTCDate()).toBe(1);
      expect(converted.getUTCHours()).toBe(0);
    });

    it("should handle New Year transition in extreme positive offset", () => {
      // In Kiritimati (+14), UTC 10:00 Dec 31 -> Jan 1 00:00
      const timezone = "Pacific/Kiritimati";
      const utcDec31_10 = new Date("2026-12-31T10:00:00Z");

      const converted = convertToTimezone(utcDec31_10, timezone);

      // Should be January 1 in Kiritimati
      expect(converted.getUTCFullYear()).toBe(2027);
      expect(converted.getUTCMonth()).toBe(0); // January
      expect(converted.getUTCDate()).toBe(1);
      expect(converted.getUTCHours()).toBe(0);
    });

    it("should handle New Year transition in negative offset timezone", () => {
      // In Niue (-11), UTC 11:00 Jan 1 -> Jan 1 00:00 (same day at midnight)
      const timezone = "Pacific/Niue";
      const utcJan1_11 = new Date("2027-01-01T11:00:00Z");

      const converted = convertToTimezone(utcJan1_11, timezone);

      // Should be January 1 00:00 in Niue
      expect(converted.getUTCFullYear()).toBe(2027);
      expect(converted.getUTCMonth()).toBe(0); // January
      expect(converted.getUTCDate()).toBe(1);
      expect(converted.getUTCHours()).toBe(0);
    });

    it("should round-trip across year boundary", () => {
      const timezones = ["Asia/Tokyo", "Pacific/Kiritimati", "Pacific/Niue", "America/Los_Angeles"];
      const yearBoundaryDates = [
        new Date("2026-12-31T23:00:00Z"),
        new Date("2027-01-01T00:00:00Z"),
        new Date("2027-01-01T01:00:00Z"),
      ];

      for (const tz of timezones) {
        for (const date of yearBoundaryDates) {
          const converted = convertToTimezone(date, tz);
          const restored = convertFromTimezone(converted, tz);

          expect(restored.getTime()).toBe(date.getTime());
        }
      }
    });
  });

  describe("Far future and past dates", () => {
    it("should round-trip far future dates (year 2100)", () => {
      const timezones = ["America/New_York", "Asia/Tokyo", "Europe/London"];
      const farFutureDates = [
        new Date("2100-01-01T00:00:00Z"),
        new Date("2100-06-15T12:30:45Z"),
        new Date("2100-12-31T23:59:59Z"),
      ];

      for (const tz of timezones) {
        for (const date of farFutureDates) {
          const converted = convertToTimezone(date, tz);
          const restored = convertFromTimezone(converted, tz);

          expect(restored.getTime()).toBe(date.getTime());
        }
      }
    });

    it("should round-trip far past dates (year 1970)", () => {
      const timezones = ["America/New_York", "Asia/Tokyo", "Europe/London"];
      const farPastDates = [
        new Date("1970-01-01T00:00:00Z"), // Unix epoch
        new Date("1970-06-15T12:30:45Z"),
      ];

      for (const tz of timezones) {
        for (const date of farPastDates) {
          const converted = convertToTimezone(date, tz);
          const restored = convertFromTimezone(converted, tz);

          expect(restored.getTime()).toBe(date.getTime());
        }
      }
    });
  });

  describe("24:00:00 format handling", () => {
    it("should handle timezone conversions near midnight", () => {
      const timezone = "Pacific/Auckland";
      const original = new Date("2026-03-15T00:00:00Z");

      const converted = convertToTimezone(original, timezone);
      const restored = convertFromTimezone(converted, timezone);

      expect(restored.getTime()).toBe(original.getTime());
    });

    it("should handle conversions across midnight boundary", () => {
      const timezone = "Asia/Tokyo";
      const dates = [
        new Date("2026-03-15T14:59:59Z"),
        new Date("2026-03-15T15:00:00Z"),
        new Date("2026-03-15T23:59:59Z"),
        new Date("2026-03-16T00:00:00Z"),
      ];

      for (const date of dates) {
        const converted = convertToTimezone(date, timezone);
        const restored = convertFromTimezone(converted, timezone);

        expect(restored.getTime()).toBe(date.getTime());
      }
    });

    it("should normalize hours in convertToTimezone", () => {
      const timezone = "Asia/Tokyo";
      const utcMidnight = new Date("2026-03-15T00:00:00Z");

      const converted = convertToTimezone(utcMidnight, timezone);

      expect(converted.getUTCHours()).toBeGreaterThanOrEqual(0);
      expect(converted.getUTCHours()).toBeLessThan(24);
    });

    it("should normalize hours in convertFromTimezone iteration", () => {
      const timezone = "Pacific/Auckland";
      const dates = [
        new Date("2026-03-15T11:00:00Z"),
        new Date("2026-03-15T11:30:00Z"),
        new Date("2026-03-15T11:59:59Z"),
      ];

      for (const date of dates) {
        const converted = convertToTimezone(date, timezone);
        const restored = convertFromTimezone(converted, timezone);

        expect(restored.getUTCHours()).toBeGreaterThanOrEqual(0);
        expect(restored.getUTCHours()).toBeLessThan(24);
        expect(restored.getTime()).toBe(date.getTime());
      }
    });

    it("should handle edge case conversions at day boundaries in multiple timezones", () => {
      const timezones = [
        "Pacific/Auckland",
        "Australia/Sydney",
        "Asia/Tokyo",
        "Asia/Shanghai",
        "Europe/Moscow",
      ];

      const utcTimes = [
        new Date("2026-03-15T10:00:00Z"),
        new Date("2026-03-15T11:00:00Z"),
        new Date("2026-03-15T12:00:00Z"),
        new Date("2026-03-15T13:00:00Z"),
        new Date("2026-03-15T14:00:00Z"),
      ];

      for (const tz of timezones) {
        for (const time of utcTimes) {
          const converted = convertToTimezone(time, tz);
          const restored = convertFromTimezone(converted, tz);

          expect(restored.getUTCHours()).toBeGreaterThanOrEqual(0);
          expect(restored.getUTCHours()).toBeLessThan(24);
          expect(restored.getTime()).toBe(time.getTime());
        }
      }
    });

    it("should handle DST gap scenarios", () => {
      const timezone = "America/New_York";
      const beforeDST = new Date("2026-03-08T06:59:59Z");

      const converted = convertToTimezone(beforeDST, timezone);
      const restored = convertFromTimezone(converted, timezone);

      expect(restored.getTime()).toBe(beforeDST.getTime());
    });

    it("should handle multiple iterations in convertFromTimezone", () => {
      const timezone = "Europe/London";
      const date = new Date("2026-03-28T00:30:00Z");

      const converted = convertToTimezone(date, timezone);
      const restored = convertFromTimezone(converted, timezone);

      expect(restored.getTime()).toBe(date.getTime());
    });
  });

  describe("Error handling", () => {
    describe("invalid timezone strings", () => {
      it("should return null for completely invalid timezone", () => {
        const date = new Date("2026-03-15T12:00:00Z");
        expect(convertToTimezone(date, "Invalid/Timezone")).toBeNull();
      });

      it("should return null for misspelled timezone", () => {
        const date = new Date("2026-03-15T12:00:00Z");
        expect(convertToTimezone(date, "America/New_York_City")).toBeNull();
      });

      it("should return null for made-up timezone", () => {
        const date = new Date("2026-03-15T12:00:00Z");
        expect(convertToTimezone(date, "Mars/Colony")).toBeNull();
      });

      it("should accept lowercase timezone (Intl is case-insensitive)", () => {
        const date = new Date("2026-03-15T12:00:00Z");
        expect(convertToTimezone(date, "america/new_york")).not.toBeNull();
      });

      it("should return null for invalid timezone in convertFromTimezone", () => {
        const date = new Date("2026-03-15T12:00:00Z");
        expect(convertFromTimezone(date, "NotReal/Place")).toBeNull();
      });
    });

    describe("empty and whitespace timezone", () => {
      it("should return null for empty string timezone", () => {
        const date = new Date("2026-03-15T12:00:00Z");
        expect(convertToTimezone(date, "")).toBeNull();
      });

      it("should return null for whitespace-only timezone", () => {
        const date = new Date("2026-03-15T12:00:00Z");
        expect(convertToTimezone(date, "   ")).toBeNull();
      });

      it("should return null for empty string in convertFromTimezone", () => {
        const date = new Date("2026-03-15T12:00:00Z");
        expect(convertFromTimezone(date, "")).toBeNull();
      });
    });

    describe("edge case timezones", () => {
      it("should accept UTC timezone", () => {
        const date = new Date("2026-03-15T12:00:00Z");
        const converted = convertToTimezone(date, "UTC");
        expect(converted.getTime()).toBe(date.getTime());
      });

      it("should accept Etc/UTC timezone", () => {
        const date = new Date("2026-03-15T12:00:00Z");
        const converted = convertToTimezone(date, "Etc/UTC");
        expect(converted.getTime()).toBe(date.getTime());
      });

      it("should accept Zulu timezone alias", () => {
        const date = new Date("2026-03-15T12:00:00Z");
        expect(convertToTimezone(date, "Zulu")).not.toBeNull();
      });
    });
  });
});
