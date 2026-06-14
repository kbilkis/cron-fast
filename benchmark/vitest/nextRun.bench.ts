import { describe, bench } from "vitest";
import { executionCases } from "../cases.js";
import { adapters } from "./_libs.js";

for (const tc of executionCases) {
  describe(`nextRun: ${tc.name}`, () => {
    bench("cron-fast", () => {
      adapters.nextRun["cron-fast"](tc.cron, tc.from);
    });

    bench("croner", () => {
      adapters.nextRun.croner(tc.cron, tc.from);
    });

    bench("cron-parser", () => {
      adapters.nextRun["cron-parser"](tc.cron, tc.from);
    });

    bench("cron-schedule", () => {
      adapters.nextRun["cron-schedule"](tc.cron, tc.from);
    });
  });
}
