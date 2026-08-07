import type { ParsedCron } from "./types.js";

/**
 * Check if a date matches the cron expression
 */
export function matches(parsed: ParsedCron, date: Date): boolean {
  const minute = date.getUTCMinutes();
  const hour = date.getUTCHours();
  const day = date.getUTCDate();
  const month = date.getUTCMonth(); // 0-indexed (0 = Jan, 11 = Dec)
  const weekday = date.getUTCDay();

  // Check if all fields match; wildcard fields skip the .includes scan
  return (
    (parsed.minuteIsWildcard || parsed.minute.includes(minute)) &&
    (parsed.hourIsWildcard || parsed.hour.includes(hour)) &&
    (parsed.monthIsWildcard || parsed.month.includes(month)) &&
    matchesDayOrWeekday(parsed, day, weekday)
  );
}

/**
 * Check if we're in OR mode (both day and weekday are restricted, not wildcards)
 * In OR mode, we must check every day because any day might match via weekday
 */
export function isOrMode(parsed: ParsedCron): boolean {
  return !parsed.dayIsWildcard && !parsed.weekdayIsWildcard;
}

/**
 * Day-of-month and day-of-week use OR logic by default
 * If both are restricted (not *), match either one
 *
 * @param daysInMonth - Optional validation that day is valid for the month (used by scheduler)
 */
export function matchesDayOrWeekday(
  parsed: ParsedCron,
  day: number,
  weekday: number,
  daysInMonth?: number,
): boolean {
  // Both wildcards: always matches (skip both .includes scans)
  if (parsed.dayIsWildcard && parsed.weekdayIsWildcard) return true;

  // Only weekday restricted
  if (parsed.dayIsWildcard) return parsed.weekday.includes(weekday);

  // Only day restricted
  if (parsed.weekdayIsWildcard) {
    if (daysInMonth !== undefined && day > daysInMonth) return false;
    return parsed.day.includes(day);
  }

  // Both restricted -> OR
  const dayOk =
    daysInMonth !== undefined
      ? day <= daysInMonth && parsed.day.includes(day)
      : parsed.day.includes(day);
  return dayOk || parsed.weekday.includes(weekday);
}

/**
 * Find the next value in a sorted array that is >= target
 * Returns null if no such value exists
 *
 * @param values - MUST be sorted in ascending order
 * @param target - The minimum value to find
 */
export function findNext(values: number[], target: number): number | null {
  for (const value of values) {
    if (value >= target) {
      return value;
    }
  }
  return null;
}

/**
 * Find the previous value in a sorted array that is <= target
 * Returns null if no such value exists
 *
 * @param values - MUST be sorted in ascending order
 * @param target - The maximum value to find
 */
export function findPrevious(values: number[], target: number): number | null {
  for (let i = values.length - 1; i >= 0; i--) {
    if (values[i] <= target) {
      return values[i];
    }
  }
  return null;
}

/**
 * Get the number of days in a month
 *
 * @param year - The year
 * @param month - The month (0-indexed: 0 = January, 11 = December)
 * @returns The number of days in the month
 */
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function getDaysInMonth(year: number, month: number): number {
  // JS Date treats years 0-99 as 1900-1999
  if (year >= 0 && year < 100) year += 1900;
  if (month === 1 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) return 29;
  return DAYS_IN_MONTH[month];
}
