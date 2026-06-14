import { describe, bench } from "vitest";
import { nextRunsCases } from "../cases.js";
import { adapters } from "./_libs.js";

for (const tc of nextRunsCases) {
  describe(`nextRuns: ${tc.cron}`, () => {
    bench("cron-fast", () => {
      adapters.nextRuns["cron-fast"](tc.cron, tc.from);
    });

    bench("croner", () => {
      adapters.nextRuns.croner(tc.cron, tc.from);
    });

    bench("cron-parser", () => {
      adapters.nextRuns["cron-parser"](tc.cron, tc.from);
    });

    bench("cron-schedule", () => {
      adapters.nextRuns["cron-schedule"](tc.cron, tc.from);
    });
  });
}
