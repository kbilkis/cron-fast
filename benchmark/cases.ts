export interface ExecutionTestCase {
  cron: string;
  from: Date;
}

export const executionCases: ExecutionTestCase[] = [
  { cron: "* * * * *", from: new Date("2026-01-15T10:30:00Z") },
  { cron: "0 0 1 * *", from: new Date("2026-01-15T10:00:00Z") },
  { cron: "0 12 31 * *", from: new Date("2026-02-15T10:00:00Z") },
  { cron: "*/15 * * * *", from: new Date("2026-01-15T10:07:00Z") },
  { cron: "0 9 * * *", from: new Date("2026-01-15T10:30:00Z") },
  { cron: "0 9 15 * 1", from: new Date("2026-01-15T10:00:00Z") },
  { cron: "0 9 * * 1-5", from: new Date("2026-01-15T10:00:00Z") },
];

export const validationCases: string[] = executionCases.map((tc) => tc.cron);

export const nextRunsCases: ExecutionTestCase[] = [
  { cron: "* * * * *", from: new Date("2026-01-15T10:30:00Z") },
  { cron: "0 9 * * 1-5", from: new Date("2026-01-15T10:00:00Z") },
];
