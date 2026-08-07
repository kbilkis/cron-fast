import { describe, bench } from "vitest";
import { adapters } from "./_libs.js";
import { validationVariedCases } from "../cases.js";

const VARIED = validationVariedCases;
const N = VARIED.length;
let i = 0;
const next = (): string => VARIED[i++ % N];

describe("validateVaried: varied inputs (anti-cache)", () => {
  bench("cron-fast", () => {
    adapters.validation["cron-fast"](next());
  });

  bench("cron-validate", () => {
    adapters.validation["cron-validate"](next());
  });

  bench("cron-schedule", () => {
    adapters.validation["cron-schedule"](next());
  });

  bench("cron-parser", () => {
    adapters.validation["cron-parser"](next());
  });

  bench("croner", () => {
    adapters.validation.croner(next());
  });
});
