import { nextRun, previousRun, nextRuns, isValid, parse } from "../../src/index.js";
import { Cron } from "npm:croner";
import { CronExpressionParser } from "npm:cron-parser";
import { parseCronExpression } from "npm:cron-schedule";
import cronValidateModule from "npm:cron-validate";

import { executionCases, validationCases, nextRunsCases } from "../cases.ts";

const cronValidate = (cronValidateModule as any).default || cronValidateModule;

// --- Adapters ---

const nextRunAdapters = {
  "cron-fast": (cron: string, from: Date) => nextRun(cron, { from }),
  croner: (cron: string, from: Date) =>
    new Cron(cron, { startAt: from, paused: true }).nextRun(from),
  "cron-parser": (cron: string, from: Date) =>
    CronExpressionParser.parse(cron, { currentDate: from }).next().toDate(),
  "cron-schedule": (cron: string, from: Date) => parseCronExpression(cron).getNextDate(from),
};

const nextRunsAdapters = {
  "cron-fast": (cron: string, from: Date) => nextRuns(cron, 100, { from }),
  croner: (cron: string, from: Date) =>
    new Cron(cron, { startAt: from, paused: true }).nextRuns(100, from),
  "cron-parser": (cron: string, from: Date) =>
    CronExpressionParser.parse(cron, { currentDate: from }).take(100),
  "cron-schedule": (cron: string, from: Date) => parseCronExpression(cron).getNextDates(100, from),
};

const previousRunAdapters = {
  "cron-fast": (cron: string, from: Date) => previousRun(cron, { from }),
  croner: (cron: string, from: Date) =>
    new Cron(cron, { startAt: from, paused: true }).previousRuns(1, from),
  "cron-parser": (cron: string, from: Date) =>
    CronExpressionParser.parse(cron, { currentDate: from }).prev().toDate(),
  "cron-schedule": (cron: string, from: Date) => parseCronExpression(cron).getPrevDate(from),
};

const validationAdapters = {
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
};

const parsingAdapters = {
  "cron-fast": (cron: string) => parse(cron),
  croner: (cron: string) => new Cron(cron, { paused: true }),
  "cron-parser": (cron: string) => CronExpressionParser.parse(cron),
  "cron-schedule": (cron: string) => parseCronExpression(cron),
  "cron-validate": (cron: string) => cronValidate(cron),
};

// --- Benchmarks: nextRun ---

for (const tc of executionCases) {
  for (const [lib, fn] of Object.entries(nextRunAdapters)) {
    Deno.bench(
      `nextRun: ${tc.cron} (${lib})`,
      { group: `nextRun: ${tc.cron}`, baseline: lib === "cron-fast" },
      () => {
        fn(tc.cron, tc.from);
      },
    );
  }
}

// --- Benchmarks: nextRuns ---

for (const tc of nextRunsCases) {
  for (const [lib, fn] of Object.entries(nextRunsAdapters)) {
    Deno.bench(
      `nextRuns: ${tc.cron} (${lib})`,
      { group: `nextRuns: ${tc.cron}`, baseline: lib === "cron-fast" },
      () => {
        fn(tc.cron, tc.from);
      },
    );
  }
}

// --- Benchmarks: previousRun ---

for (const tc of executionCases) {
  for (const [lib, fn] of Object.entries(previousRunAdapters)) {
    Deno.bench(
      `previousRun: ${tc.cron} (${lib})`,
      { group: `previousRun: ${tc.cron}`, baseline: lib === "cron-fast" },
      () => {
        fn(tc.cron, tc.from);
      },
    );
  }
}

// --- Benchmarks: validation ---

for (const cron of validationCases) {
  for (const [lib, fn] of Object.entries(validationAdapters)) {
    Deno.bench(
      `validation: ${cron} (${lib})`,
      { group: `validation: ${cron}`, baseline: lib === "cron-fast" },
      () => {
        fn(cron);
      },
    );
  }
}

// --- Benchmarks: parsing ---

for (const cron of validationCases) {
  for (const [lib, fn] of Object.entries(parsingAdapters)) {
    Deno.bench(
      `parsing: ${cron} (${lib})`,
      { group: `parsing: ${cron}`, baseline: lib === "cron-fast" },
      () => {
        fn(cron);
      },
    );
  }
}
