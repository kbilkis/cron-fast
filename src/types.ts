/**
 * Options for cron execution time calculations
 */
export interface CronOptions {
  /** IANA timezone string (e.g., 'America/New_York', 'Europe/London') */
  timezone?: string;
  /** Reference date to calculate from (defaults to now) */
  from?: Date;
}

/**
 * Parsed cron expression with valid values for each field
 *
 * Note: Internally, months are stored as 0-indexed (0 = January, 11 = December)
 * to match JavaScript's Date object convention. The parser automatically converts
 * from cron's 1-indexed format (1-12) to 0-indexed (0-11).
 */
export interface ParsedCron {
  minute: number[]; // 0-59
  hour: number[]; // 0-23
  day: number[]; // 1-31
  month: number[]; // 0-11 (0 = January, 11 = December)
  weekday: number[]; // 0-6 (0 = Sunday, 6 = Saturday)
}
