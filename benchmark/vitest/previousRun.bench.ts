import { describe, test } from "vitest";
import { executionCases } from "../cases.js";
import { adapters } from "./_libs.js";

const { previousRun: previousRunAdapters } = adapters;

for (const tc of executionCases) {
  describe(`previousRun: ${tc.cron}`, () => {
    test("compare", async ({ bench }) => {
      await bench.compare(
        bench("cron-fast", () => {
          previousRunAdapters["cron-fast"](tc.cron, tc.from);
        }),
        bench("croner", () => {
          previousRunAdapters.croner(tc.cron, tc.from);
        }),
        bench("cron-parser", () => {
          previousRunAdapters["cron-parser"](tc.cron, tc.from);
        }),
        bench("cron-schedule", () => {
          previousRunAdapters["cron-schedule"](tc.cron, tc.from);
        }),
      );
    });
  });
}
