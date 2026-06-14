export interface ExecutionTestCase {
  name: string;
  cron: string;
  from: Date;
}

export const executionCases: ExecutionTestCase[] = [
  {
    name: "Every minute",
    cron: "* * * * *",
    from: new Date("2026-01-15T10:30:00Z"),
  },
  {
    name: "Sparse: First of month",
    cron: "0 0 1 * *",
    from: new Date("2026-01-15T10:00:00Z"),
  },
  {
    name: "Sparse: 31st (skips months)",
    cron: "0 12 31 * *",
    from: new Date("2026-02-15T10:00:00Z"),
  },
  {
    name: "Step: Every 15 minutes",
    cron: "*/15 * * * *",
    from: new Date("2026-01-15T10:07:00Z"),
  },
  {
    name: "Specific: 9 AM daily",
    cron: "0 9 * * *",
    from: new Date("2026-01-15T10:30:00Z"),
  },
  {
    name: "OR-mode: 15th OR Monday",
    cron: "0 9 15 * 1",
    from: new Date("2026-01-15T10:00:00Z"),
  },
  {
    name: "Weekdays: Mon-Fri 9 AM",
    cron: "0 9 * * 1-5",
    from: new Date("2026-01-15T10:00:00Z"),
  },
];

export const validationCases: string[] = executionCases.map((tc) => tc.cron);

export const libraryNames = ["cron-fast", "croner", "cron-parser", "cron-schedule"] as const;

export const libraryNamesWithValidate = [
  "cron-fast",
  "croner",
  "cron-parser",
  "cron-schedule",
  "cron-validate",
] as const;
