import { describe, bench } from "vitest";
import { validationCases } from "../cases.js";
import { adapters } from "./_libs.js";

for (const cron of validationCases) {
  describe(`validation: ${cron}`, () => {
    bench("cron-fast", () => {
      adapters.validation["cron-fast"](cron);
    });

    bench("cron-validate", () => {
      adapters.validation["cron-validate"](cron);
    });

    bench("cron-schedule", () => {
      adapters.validation["cron-schedule"](cron);
    });

    bench("cron-parser", () => {
      adapters.validation["cron-parser"](cron);
    });

    bench("croner", () => {
      adapters.validation.croner(cron);
    });
  });
}
