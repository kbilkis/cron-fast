import { describe, test } from "vitest";
import { executionCases } from "../cases.js";
import { adapters } from "./_libs.js";

const { nextRun: nextRunAdapters } = adapters;

for (const tc of executionCases) {
  describe(`nextRun: ${tc.cron}`, () => {
    test("compare", async ({ bench }) => {
      await bench.compare(
        bench("cron-fast", () => {
          nextRunAdapters["cron-fast"](tc.cron, tc.from);
        }),
        bench("croner", () => {
          nextRunAdapters.croner(tc.cron, tc.from);
        }),
        bench("cron-parser", () => {
          nextRunAdapters["cron-parser"](tc.cron, tc.from);
        }),
        bench("cron-schedule", () => {
          nextRunAdapters["cron-schedule"](tc.cron, tc.from);
        }),
      );
    });
  });
}
