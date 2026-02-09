import type { ParsedCron, CronOptions } from "./types.js";
import { parse } from "./parser.js";
import { matches, findNext, findPrevious, getDaysInMonth } from "./matcher.js";
import { convertToTimezone, convertFromTimezone } from "./timezone.js";

const MAX_ITERATIONS = 1000;
const ONE_MINUTE_MS = 60_000;

type Direction = "next" | "prev";

/** Direction-specific operations for unified forward/backward traversal */
const DIR = {
  next: {
    find: findNext,
    minute: (p: ParsedCron) => p.minute[0],
    hour: (p: ParsedCron) => p.hour[0],
    offset: 1,
  },
  prev: {
    find: findPrevious,
    minute: (p: ParsedCron) => p.minute.at(-1)!,
    hour: (p: ParsedCron) => p.hour.at(-1)!,
    offset: -1,
  },
} as const;

/** Get the next execution time for a cron expression */
export function nextRun(expression: string, options?: CronOptions): Date {
  const parsed = parse(expression);
  const from = options?.from || new Date();
  const tz = options?.timezone;

  const start = tz ? convertToTimezone(from, tz) : new Date(from);
  start.setUTCSeconds(0, 0);
  start.setUTCMinutes(start.getUTCMinutes() + 1);

  const result = findMatch(parsed, start, "next", tz);
  if (!result) throw new Error("No matching time found within reasonable search window");
  return result;
}

/** Get the previous execution time for a cron expression */
export function previousRun(expression: string, options?: CronOptions): Date {
  const parsed = parse(expression);
  const from = options?.from || new Date();
  const tz = options?.timezone;

  const start = tz ? convertToTimezone(from, tz) : new Date(from);
  start.setUTCSeconds(0, 0);
  start.setUTCMinutes(start.getUTCMinutes() - 1);

  const result = findMatch(parsed, start, "prev", tz);
  if (!result) throw new Error("No matching time found within reasonable search window");
  return result;
}

/** Get next N execution times */
export function nextRuns(expression: string, count: number, options?: CronOptions): Date[] {
  if (count <= 0) return [];

  const results: Date[] = [];
  let current = options?.from || new Date();

  for (let i = 0; i < count; i++) {
    const next = nextRun(expression, { ...options, from: current });
    results.push(next);
    current = new Date(next.getTime() + ONE_MINUTE_MS);
  }
  return results;
}

/** Check if a date matches the cron expression */
export function isMatch(
  expression: string,
  date: Date,
  options?: Pick<CronOptions, "timezone">,
): boolean {
  const parsed = parse(expression);
  const checkDate = options?.timezone ? convertToTimezone(date, options.timezone) : new Date(date);
  return matches(parsed, checkDate);
}

/** Find matching time using smart field-increment algorithm */
function findMatch(parsed: ParsedCron, start: Date, dir: Direction, tz?: string): Date | null {
  const current = new Date(start);

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    if (matches(parsed, current)) {
      return tz ? convertFromTimezone(current, tz) : current;
    }
    advanceDate(parsed, current, dir);
  }
  return null;
}

/**
 * Advance date to next/prev candidate time by mutating the date in place.
 *
 * Algorithm:
 * 1. Check fields from LARGEST (month) to SMALLEST (minute)
 * 2. When a field doesn't match, jump to the next valid value for that field
 * 3. Reset all smaller fields to their boundary (first value for 'next', last for 'prev')
 *
 * Example (direction='next', cron='0 9 * * *' meaning 9:00 AM daily):
 *   Current: March 15, 10:30 AM
 *   - Month (March)? ✓ matches
 *   - Day (15)? ✓ matches
 *   - Hour (10)? ✗ not in [9] → no next hour today → cascade to next day
 *   - Result: March 16, 9:00 AM
 *
 * @param parsed - The parsed cron expression
 * @param date - The date to mutate (modified in place)
 * @param dir - Direction to advance ('next' or 'prev')
 */
function advanceDate(parsed: ParsedCron, date: Date, dir: Direction): void {
  const d = DIR[dir];
  const minute = date.getUTCMinutes();
  const hour = date.getUTCHours();
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const daysInMonth = getDaysInMonth(year, month);

  // Month mismatch
  if (!parsed.month.includes(month)) {
    moveToMonth(parsed, date, dir, month, year);
    return;
  }

  // Day mismatch
  if (!parsed.day.includes(day) || day > daysInMonth) {
    moveToDay(parsed, date, dir, day, month, year, daysInMonth);
    return;
  }

  // Hour mismatch
  if (!parsed.hour.includes(hour)) {
    const targetHour = d.find(parsed.hour, hour + d.offset);
    if (targetHour !== null) {
      // Found valid hour in same day → reset minute to boundary
      date.setUTCHours(targetHour);
      date.setUTCMinutes(d.minute(parsed));
    } else {
      // No valid hour left today → move to next/prev day
      moveToDay(parsed, date, dir, day, month, year, daysInMonth);
    }
    return;
  }

  // Minute mismatch
  if (!parsed.minute.includes(minute)) {
    const targetMinute = d.find(parsed.minute, minute + d.offset);
    if (targetMinute !== null) {
      // Found valid minute in same hour
      date.setUTCMinutes(targetMinute);
    } else {
      // No valid minute left → try next hour
      const targetHour = d.find(parsed.hour, hour + d.offset);
      if (targetHour !== null) {
        date.setUTCHours(targetHour);
        date.setUTCMinutes(d.minute(parsed));
      } else {
        // No valid hour left → move to next/prev day
        moveToDay(parsed, date, dir, day, month, year, daysInMonth);
      }
    }
    return;
  }

  // Weekday mismatch: all fields match but wrong day-of-week.
  // Skip directly to next/prev day since no hour/minute on this day can match.
  moveToDay(parsed, date, dir, day, month, year, daysInMonth);
}

function moveToMonth(
  parsed: ParsedCron,
  date: Date,
  dir: Direction,
  currentMonth: number,
  currentYear: number,
): void {
  const d = DIR[dir];
  const targetMonth = d.find(parsed.month, currentMonth + d.offset);

  if (targetMonth !== null) {
    resetToMonthBoundary(parsed, date, currentYear, targetMonth, dir);
  } else {
    const boundaryMonth = dir === "next" ? parsed.month[0] : parsed.month.at(-1)!;
    resetToMonthBoundary(parsed, date, currentYear + d.offset, boundaryMonth, dir);
  }
}

function moveToDay(
  parsed: ParsedCron,
  date: Date,
  dir: Direction,
  currentDay: number,
  currentMonth: number,
  currentYear: number,
  daysInMonth: number,
): void {
  const d = DIR[dir];
  const targetDay = d.find(parsed.day, currentDay + d.offset);
  const dayIsValid =
    dir === "next" ? targetDay !== null && targetDay <= daysInMonth : targetDay !== null;

  if (dayIsValid) {
    date.setUTCDate(targetDay!);
    date.setUTCHours(d.hour(parsed));
    date.setUTCMinutes(d.minute(parsed));
  } else {
    moveToMonth(parsed, date, dir, currentMonth, currentYear);
  }
}

function resetToMonthBoundary(
  parsed: ParsedCron,
  date: Date,
  year: number,
  month: number,
  dir: Direction,
): void {
  const d = DIR[dir];
  date.setUTCFullYear(year);
  date.setUTCDate(1);
  date.setUTCMonth(month);

  const daysInMonth = getDaysInMonth(year, month);

  if (dir === "next") {
    const validDay = findNext(parsed.day, 1);
    date.setUTCDate(validDay !== null && validDay <= daysInMonth ? validDay : parsed.day[0]);
  } else {
    const prevDay = findPrevious(parsed.day, daysInMonth);
    if (prevDay !== null) {
      date.setUTCDate(prevDay);
    } else {
      // No valid day in this month, move to previous month
      moveToMonth(parsed, date, dir, month, year);
      return;
    }
  }

  date.setUTCHours(d.hour(parsed));
  date.setUTCMinutes(d.minute(parsed));
}
