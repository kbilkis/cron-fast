import { nextRun, previousRun, nextRuns, isValid, parse } from "../../src/index.js";
import { Cron } from "croner";
import { CronExpressionParser } from "cron-parser";
import { parseCronExpression } from "cron-schedule";
import cronValidateModule from "cron-validate";

const cronValidate = (cronValidateModule as any).default || cronValidateModule;

export const adapters = {
  nextRun: {
    "cron-fast": (cron: string, from: Date) => nextRun(cron, { from }),
    croner: (cron: string, from: Date) =>
      new Cron(cron, { startAt: from, paused: true }).nextRun(from),
    "cron-parser": (cron: string, from: Date) =>
      CronExpressionParser.parse(cron, { currentDate: from }).next().toDate(),
    "cron-schedule": (cron: string, from: Date) => parseCronExpression(cron).getNextDate(from),
  },
  previousRun: {
    "cron-fast": (cron: string, from: Date) => previousRun(cron, { from }),
    croner: (cron: string, from: Date) =>
      new Cron(cron, { startAt: from, paused: true }).previousRuns(1, from),
    "cron-parser": (cron: string, from: Date) =>
      CronExpressionParser.parse(cron, { currentDate: from }).prev().toDate(),
    "cron-schedule": (cron: string, from: Date) => parseCronExpression(cron).getPrevDate(from),
  },
  nextRuns: {
    "cron-fast": (cron: string, from: Date) => nextRuns(cron, 100, { from }),
    croner: (cron: string, from: Date) =>
      new Cron(cron, { startAt: from, paused: true }).nextRuns(100, from),
    "cron-parser": (cron: string, from: Date) =>
      CronExpressionParser.parse(cron, { currentDate: from }).take(100),
    "cron-schedule": (cron: string, from: Date) =>
      parseCronExpression(cron).getNextDates(100, from),
  },
  validation: {
    "cron-fast": (cron: string) => isValid(cron),
    croner: (cron: string) => {
      try {
        new Cron(cron, { paused: true });
      } catch {
        /* invalid */
      }
    },
    "cron-parser": (cron: string) => {
      try {
        CronExpressionParser.parse(cron);
      } catch {
        /* invalid */
      }
    },
    "cron-schedule": (cron: string) => {
      try {
        parseCronExpression(cron);
      } catch {
        /* invalid */
      }
    },
    "cron-validate": (cron: string) => cronValidate(cron),
  },
  parsing: {
    "cron-fast": (cron: string) => parse(cron),
    croner: (cron: string) => new Cron(cron, { paused: true }),
    "cron-parser": (cron: string) => CronExpressionParser.parse(cron),
    "cron-schedule": (cron: string) => parseCronExpression(cron),
    "cron-validate": (cron: string) => cronValidate(cron),
  },
} as const;
