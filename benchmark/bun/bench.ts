import { run, bench, summary } from "mitata";

import { nextRun, previousRun, isValid, parse } from "../../src/index.js";
import { Cron } from "croner";
import { CronExpressionParser } from "cron-parser";
import { parseCronExpression } from "cron-schedule";
import cronValidateModule from "cron-validate";

import { executionCases, validationCases } from "../cases.ts";

const cronValidate = (cronValidateModule as any).default || cronValidateModule;

// --- nextRun ---

for (const tc of executionCases) {
  summary(() => {
    bench(`cron-fast: nextRun ${tc.cron}`, () => nextRun(tc.cron, { from: tc.from }));
    bench(`croner: nextRun ${tc.cron}`, () =>
      new Cron(tc.cron, { startAt: tc.from, paused: true }).nextRun(tc.from));
    bench(`cron-parser: nextRun ${tc.cron}`, () =>
      CronExpressionParser.parse(tc.cron, { currentDate: tc.from }).next().toDate());
    bench(`cron-schedule: nextRun ${tc.cron}`, () =>
      parseCronExpression(tc.cron).getNextDate(tc.from));
  });
}

// --- previousRun ---

for (const tc of executionCases) {
  summary(() => {
    bench(`cron-fast: previousRun ${tc.cron}`, () => previousRun(tc.cron, { from: tc.from }));
    bench(`croner: previousRun ${tc.cron}`, () =>
      new Cron(tc.cron, { startAt: tc.from, paused: true }).previousRuns(1, tc.from));
    bench(`cron-parser: previousRun ${tc.cron}`, () =>
      CronExpressionParser.parse(tc.cron, { currentDate: tc.from }).prev().toDate());
    bench(`cron-schedule: previousRun ${tc.cron}`, () =>
      parseCronExpression(tc.cron).getPrevDate(tc.from));
  });
}

// --- validation ---

for (const cron of validationCases) {
  summary(() => {
    bench(`cron-fast: validate ${cron}`, () => isValid(cron));
    bench(`cron-validate: validate ${cron}`, () => cronValidate(cron));
    bench(`cron-schedule: validate ${cron}`, () => {
      try {
        parseCronExpression(cron);
      } catch {
        /* invalid */
      }
    });
    bench(`cron-parser: validate ${cron}`, () => {
      try {
        CronExpressionParser.parse(cron);
      } catch {
        /* invalid */
      }
    });
    bench(`croner: validate ${cron}`, () => {
      try {
        new Cron(cron, { paused: true });
      } catch {
        /* invalid */
      }
    });
  });
}

// --- parsing ---

for (const cron of validationCases) {
  summary(() => {
    bench(`cron-fast: parse ${cron}`, () => parse(cron));
    bench(`cron-validate: parse ${cron}`, () => cronValidate(cron));
    bench(`cron-schedule: parse ${cron}`, () => parseCronExpression(cron));
    bench(`cron-parser: parse ${cron}`, () => CronExpressionParser.parse(cron));
    bench(`croner: parse ${cron}`, () => new Cron(cron, { paused: true }));
  });
}

const isJson = process.argv.includes("--json");
await run(isJson ? { format: "json" } : {});
