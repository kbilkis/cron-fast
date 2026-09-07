import { describe, test } from "vitest";
import { validationCases } from "../cases.js";
import { adapters } from "./_libs.js";

const { validation: validationAdapters } = adapters;

for (const cron of validationCases) {
  describe(`validation: ${cron}`, () => {
    test("compare", async ({ bench }) => {
      await bench.compare(
        bench("cron-fast", () => {
          validationAdapters["cron-fast"](cron);
        }),
        bench("cron-validate", () => {
          validationAdapters["cron-validate"](cron);
        }),
        bench("cron-schedule", () => {
          validationAdapters["cron-schedule"](cron);
        }),
        bench("cron-parser", () => {
          validationAdapters["cron-parser"](cron);
        }),
        bench("croner", () => {
          validationAdapters.croner(cron);
        }),
      );
    });
  });
}
