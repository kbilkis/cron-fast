import { describe, it, expect } from "vitest";
import { nextRun, previousRun, nextRuns, isValid, parse, isMatch } from "../src/index.js";

describe("workerd (Cloudflare Workers) compatibility", () => {
  it("should calculate next run time", () => {
    const next = nextRun("0 9 * * *");
    expect(next).toBeInstanceOf(Date);
    expect(next.getTime()).toBeGreaterThan(Date.now());
  });

  it("should calculate previous run time", () => {
    const prev = previousRun("0 9 * * *");
    expect(prev).toBeInstanceOf(Date);
    expect(prev.getTime()).toBeLessThan(Date.now());
  });

  it("should calculate multiple next runs", () => {
    const runs = nextRuns("0 9 * * *", 3);
    expect(Array.isArray(runs)).toBe(true);
    expect(runs.length).toBe(3);
    // Verify they're in chronological order
    const timestamps = runs.map((d) => d.getTime());
    expect(timestamps[0]).toBeLessThan(timestamps[1]);
    expect(timestamps[1]).toBeLessThan(timestamps[2]);
  });

  it("should validate cron expressions", () => {
    expect(isValid("0 9 * * *")).toBe(true);
    expect(isValid("invalid")).toBe(false);
  });

  it("should parse cron expressions", () => {
    const parsed = parse("*/15 9-17 * * 1-5");
    expect(parsed).toBeDefined();
    expect(parsed.minute).toBeDefined();
    expect(parsed.hour).toBeDefined();
    expect(parsed.day).toBeDefined();
    expect(parsed.month).toBeDefined();
    expect(parsed.weekday).toBeDefined();
  });

  it("should match dates against cron expressions", () => {
    const date = new Date("2026-03-15T09:00:00Z");
    expect(isMatch("0 9 * * *", date)).toBe(true);
    expect(isMatch("0 10 * * *", date)).toBe(false);
  });

  it("should work with timezone options", () => {
    const next = nextRun("0 9 * * *", { timezone: "America/New_York" });
    expect(next).toBeInstanceOf(Date);
    expect(next.getTime()).toBeGreaterThan(Date.now());
  });
});
