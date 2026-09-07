import { describe, test } from "vitest";
import { nextRunsCases } from "../cases.js";
import { adapters } from "./_libs.js";

const { nextRuns: nextRunsAdapters } = adapters;

for (const tc of nextRunsCases) {
  describe(`nextRuns: ${tc.cron}`, () => {
    test("compare", async ({ bench }) => {
      await bench.compare(
        bench("cron-fast", () => {
          nextRunsAdapters["cron-fast"](tc.cron, tc.from);
        }),
        bench("croner", () => {
          nextRunsAdapters.croner(tc.cron, tc.from);
        }),
        bench("cron-parser", () => {
          nextRunsAdapters["cron-parser"](tc.cron, tc.from);
        }),
        bench("cron-schedule", () => {
          nextRunsAdapters["cron-schedule"](tc.cron, tc.from);
        }),
      );
    });
  });
}
