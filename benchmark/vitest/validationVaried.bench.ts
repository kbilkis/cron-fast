import { describe, test } from "vitest";
import { adapters } from "./_libs.js";

const { validation: validationAdapters } = adapters;
import { validationVariedCases } from "../cases.js";

const VARIED = validationVariedCases;
const N = VARIED.length;
let i = 0;
const next = (): string => VARIED[i++ % N];

describe("validateVaried: varied inputs (anti-cache)", () => {
  test("compare", async ({ bench }) => {
    await bench.compare(
      bench("cron-fast", () => {
        validationAdapters["cron-fast"](next());
      }),
      bench("cron-validate", () => {
        validationAdapters["cron-validate"](next());
      }),
      bench("cron-schedule", () => {
        validationAdapters["cron-schedule"](next());
      }),
      bench("cron-parser", () => {
        validationAdapters["cron-parser"](next());
      }),
      bench("croner", () => {
        validationAdapters.croner(next());
      }),
    );
  });
});
