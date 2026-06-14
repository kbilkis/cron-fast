import { describe, bench } from "vitest";
import { executionCases } from "../cases.js";
import { adapters } from "./_libs.js";

for (const tc of executionCases) {
  describe(`previousRun: ${tc.name}`, () => {
    bench("cron-fast", () => {
      adapters.previousRun["cron-fast"](tc.cron, tc.from);
    });

    bench("croner", () => {
      adapters.previousRun.croner(tc.cron, tc.from);
    });

    bench("cron-parser", () => {
      adapters.previousRun["cron-parser"](tc.cron, tc.from);
    });

    bench("cron-schedule", () => {
      adapters.previousRun["cron-schedule"](tc.cron, tc.from);
    });
  });
}
