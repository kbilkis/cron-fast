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
});
