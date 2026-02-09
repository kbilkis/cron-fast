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
});
