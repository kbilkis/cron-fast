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

  // Check if all fields match
  return (
    parsed.minute.includes(minute) &&
    parsed.hour.includes(hour) &&
    parsed.month.includes(month) &&
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
  const dayMatches =
    daysInMonth !== undefined
      ? parsed.day.includes(day) && day <= daysInMonth
      : parsed.day.includes(day);
  const weekdayMatches = parsed.weekday.includes(weekday);

  // If both are restricted, use OR logic (standard cron behavior)
  if (isOrMode(parsed)) {
    return dayMatches || weekdayMatches;
  }

  // If only one is restricted, it must match
  if (!parsed.dayIsWildcard) {
    return dayMatches;
  }
  if (!parsed.weekdayIsWildcard) {
    return weekdayMatches;
  }

  // Both wildcards, always matches
  return true;
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
export function getDaysInMonth(year: number, month: number): number {
  // Create date for first day of next month, then go back one day
  return new Date(year, month + 1, 0).getDate();
}
