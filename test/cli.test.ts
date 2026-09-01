import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";

const cli = "node dist/cli.cjs";

function run(args: string): { stdout: string; stderr: string; exitCode: number } {
  try {
    const stdout = execSync(`${cli} ${args}`, { encoding: "utf-8", stdio: "pipe" });
    return { stdout: stdout.trim(), stderr: "", exitCode: 0 };
  } catch (e: any) {
    return {
      stdout: (e.stdout ?? "").toString().trim(),
      stderr: (e.stderr ?? "").toString().trim(),
      exitCode: e.status ?? 1,
    };
  }
}

describe("cli", () => {
  it("should show help", () => {
    const result = run("--help");
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("Usage: cron-fast");
    expect(result.stdout).toContain("--next");
    expect(result.stdout).toContain("--describe");
    expect(result.stdout).toContain("--validate");
  });

  it("should show help when called with no args", () => {
    const result = run("");
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("Usage: cron-fast");
  });

  it("should show help with --help flag", () => {
    const result = run("--help");
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("--next");
    expect(result.stdout).toContain("--validate");
  });

  it("should reject an invalid expression", () => {
    const result = run('"invalid" --next 1');
    expect(result.exitCode).toBe(1);
  });

  it("should validate a valid expression (exit 0)", () => {
    const result = run('"0 9 * * *" --validate');
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe("");
  });

  it("should reject an invalid expression (exit 1)", () => {
    const result = run('"invalid" --validate');
    expect(result.exitCode).toBe(1);
  });

  it("should describe an expression", () => {
    const result = run('"*/15 * * * *" --describe');
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe("Every 15 minutes");
  });

  it("should show next runs", () => {
    const result = run('"0 9 * * *" --next 3 --from 2026-03-15T10:00:00Z');
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("2026-03-16");
    expect(result.stdout).toContain("2026-03-17");
    expect(result.stdout).toContain("2026-03-18");
  });

  it("should show previous runs", () => {
    const result = run('"0 12 * * *" --prev 3 --from 2026-03-16T10:00:00Z');
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("2026-03-15");
    expect(result.stdout).toContain("2026-03-14");
  });

  it("should match a date", () => {
    const result = run('"0 9 * * *" --match 2026-03-16T09:00:00Z');
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe("true");
  });

  it("should not match a wrong date", () => {
    const result = run('"0 9 * * *" --match 2026-03-16T10:00:00Z');
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe("false");
  });

  it("should output json", () => {
    const result = run('"0 9 * * *" --next 2 --json --from 2026-03-15T10:00:00Z');
    expect(result.exitCode).toBe(0);
    const json = JSON.parse(result.stdout);
    expect(json.expression).toBe("0 9 * * *");
    expect(json.runs).toHaveLength(2);
    expect(json.description).toContain("9:00 AM");
  });

  it("should handle timezone", () => {
    const result = run('"0 9 * * *" --next 1 --tz America/New_York --from 2026-03-15T10:00:00Z');
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  it("should schedule and display in the given timezone", () => {
    // 17:56:30Z = 20:56:30 Vilnius (EEST, UTC+3). Hours */6 must match the
    // Vilnius wall clock, so the next run is Sep 2 00:00 wall = 21:00Z —
    // not 18:00Z (which only matches if hours were evaluated in UTC).
    const result = run('"* */6 * * *" --next 1 --tz Europe/Vilnius --from 2026-09-01T17:56:30Z');
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("Europe/Vilnius timezone");
    expect(result.stdout).toContain("2026-09-01T21:00:00.000Z"); // UTC ISO
    expect(result.stdout).toContain("Sep 2 00:00:00 GMT+3"); // Vilnius wall clock + offset
    expect(result.stdout).not.toContain("2026-09-01T18:00:00.000Z");
  });

  it("should label UTC runs with GMT offset when no timezone is given", () => {
    const result = run('"0 9 * * *" --next 1 --from 2026-03-15T10:00:00Z');
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("2026-03-16T09:00:00.000Z");
    expect(result.stdout).toMatch(/09:00:00\s+GMT/); // UTC-labeled display
  });

  it("should error on invalid expression in next mode", () => {
    const result = run('"0 0 31 2 *" --next 1');
    expect(result.exitCode).toBe(1);
  });

  it("should json-error on invalid expression", () => {
    const result = run('"bad" --next 1 --json');
    expect(result.exitCode).toBe(1);
    const json = JSON.parse(result.stdout);
    expect(json.error).toBeDefined();
  });

  it("should error cleanly for unparseable --from date", () => {
    const result = run('"0 9 * * *" --from not-a-date');
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toMatch(/--from/i);
    expect(result.stderr).toMatch(/date/i);
    expect(result.stderr).not.toContain("RangeError");
  });

  it("should error for unparseable --match date instead of printing false", () => {
    const result = run('"0 9 * * *" --match not-a-date');
    expect(result.exitCode).toBe(1);
    expect(result.stdout).not.toBe("false");
    expect(result.stderr).toMatch(/--match/i);
  });

  it("should error for unparseable --match date in json mode without RangeError", () => {
    const result = run('"0 9 * * *" --match not-a-date --json');
    expect(result.exitCode).toBe(1);
    expect(result.stderr + result.stdout).not.toContain("RangeError");
  });

  it("should error for non-numeric --next count", () => {
    const result = run('"0 9 * * *" --next abc');
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toMatch(/--next/i);
  });

  it("should error for non-numeric --prev count", () => {
    const result = run('"0 9 * * *" --prev abc');
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toMatch(/--prev/i);
  });

  it("should error for negative --next count", () => {
    const result = run('"0 9 * * *" --next -1');
    expect(result.exitCode).toBe(1);
  });

  it("should accept valued flags before the expression", () => {
    const result = run('--tz America/New_York "0 9 * * 1-5" --next 2');
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("Next");
  });

  it("should accept --next and its value before the expression", () => {
    const result = run('--next 2 "0 9 * * 1-5"');
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("Next");
  });

  it("should accept --from before the expression", () => {
    const result = run('--from 2026-03-15T10:00:00Z "0 9 * * *" --next 1');
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("2026-03-16");
  });
});
