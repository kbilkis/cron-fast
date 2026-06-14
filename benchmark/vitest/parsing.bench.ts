import { describe, bench } from "vitest";
import { validationCases } from "../cases.js";
import { adapters } from "./_libs.js";

for (const cron of validationCases) {
  describe(`parsing: ${cron}`, () => {
    bench("cron-fast", () => {
      adapters.parsing["cron-fast"](cron);
    });

    bench("cron-validate", () => {
      adapters.parsing["cron-validate"](cron);
    });

    bench("cron-schedule", () => {
      adapters.parsing["cron-schedule"](cron);
    });

    bench("cron-parser", () => {
      adapters.parsing["cron-parser"](cron);
    });

    bench("croner", () => {
      adapters.parsing.croner(cron);
    });
  });
}
