import { describe, test } from "vitest";
import { validationCases } from "../cases.js";
import { adapters } from "./_libs.js";

const { parsing: parsingAdapters } = adapters;

for (const cron of validationCases) {
  describe(`parsing: ${cron}`, () => {
    test("compare", async ({ bench }) => {
      await bench.compare(
        bench("cron-fast", () => {
          parsingAdapters["cron-fast"](cron);
        }),
        bench("cron-validate", () => {
          parsingAdapters["cron-validate"](cron);
        }),
        bench("cron-schedule", () => {
          parsingAdapters["cron-schedule"](cron);
        }),
        bench("cron-parser", () => {
          parsingAdapters["cron-parser"](cron);
        }),
        bench("croner", () => {
          parsingAdapters.croner(cron);
        }),
      );
    });
  });
}
