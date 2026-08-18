import type { ParsedCron, CronOptions } from "./types.js";
import { parse } from "./parser.js";
import { matches, findNext, findPrevious, getDaysInMonth } from "./matcher.js";
import { convertToTimezone, convertFromTimezone } from "./timezone.js";

const MAX_ITERATIONS = 1000;

type Direction = "next" | "prev";

/** Get the next execution time for a cron expression. Throws if expression or timezone is invalid, or if no match is found within iteration limit. */
export function nextRun(expression: string, options?: CronOptions): Date {
  const parsed = parse(expression);

  const from = options?.from || new Date();
  const tz = options?.timezone;

  const start = tz !== undefined ? convertToTimezone(from, tz) : new Date(from);
  start.setUTCSeconds(0, 0);
  start.setUTCMinutes(start.getUTCMinutes() + 1);

  return findMatch(parsed, start, "next", tz, expression);
}

/** Get the previous execution time for a cron expression. Throws if expression or timezone is invalid, or if no match is found within iteration limit. */
export function previousRun(expression: string, options?: CronOptions): Date {
  const parsed = parse(expression);

  const from = options?.from || new Date();
  const tz = options?.timezone;

  const start = tz !== undefined ? convertToTimezone(from, tz) : new Date(from);
  start.setUTCSeconds(0, 0);
  start.setUTCMinutes(start.getUTCMinutes() - 1);

  return findMatch(parsed, start, "prev", tz, expression);
}

/** Get next N execution times. Throws if expression or timezone is invalid. */
export function nextRuns(expression: string, count: number, options?: CronOptions): Date[] {
  if (count <= 0) return [];

  const parsed = parse(expression);
  const tz = options?.timezone;

  const results: Date[] = [];
  let current = options?.from || new Date();

  for (let i = 0; i < count; i++) {
    const start = tz !== undefined ? convertToTimezone(current, tz) : new Date(current);
    start.setUTCSeconds(0, 0);
    start.setUTCMinutes(start.getUTCMinutes() + 1);
    const next = findMatch(parsed, start, "next", tz, expression);
    results.push(next);
    current = next;
  }
  return results;
}

/** Check if a date matches the cron expression. Throws if expression or timezone is invalid. */
export function isMatch(
  expression: string,
  date: Date,
  options?: Pick<CronOptions, "timezone">,
): boolean {
  const parsed = parse(expression);

  const tz = options?.timezone;
  const checkDate = tz !== undefined ? convertToTimezone(date, tz) : new Date(date);
  return matches(parsed, checkDate);
}

/** Find matching time using smart field-increment algorithm (integer-time loop) */
function findMatch(
  parsed: ParsedCron,
  start: Date,
  dir: Direction,
  tz?: string,
  expression?: string,
): Date {
  const next = dir === "next";
  const st = {
    year: start.getUTCFullYear(),
    month: start.getUTCMonth(),
    day: start.getUTCDate(),
    hour: start.getUTCHours(),
    minute: start.getUTCMinutes(),
  };

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    if (intMatches(parsed, st)) {
      if (i === 0) return tz !== undefined ? convertFromTimezone(start, tz) : start;
      const d = new Date(Date.UTC(st.year, st.month, st.day, st.hour, st.minute, 0, 0));
      return tz !== undefined ? convertFromTimezone(d, tz) : d;
    }
    intAdvanceDate(parsed, st, next);
  }
  throw new Error(`No match found for "${expression}" within iteration limit`);
}

/** Weekday (0=Sun..6=Sat) from civil date via Howard Hinnant's days_from_civil. */
function weekdayOf(year: number, month: number, day: number): number {
  const m = month + 1;
  const y2 = year - (m <= 2 ? 1 : 0);
  const era = Math.trunc((y2 >= 0 ? y2 : y2 - 399) / 400);
  const yoe = y2 - era * 400;
  const mp = m + (m > 2 ? -3 : 9);
  const doy = Math.trunc((153 * mp + 2) / 5) + day - 1;
  const doe = yoe * 365 + Math.trunc(yoe / 4) - Math.trunc(yoe / 100) + doy;
  const days = era * 146097 + doe - 719468;
  return ((days % 7) + 4 + 7) % 7;
}

/** Match check on integer fields; wildcard fields skip the .includes scan. */
function intMatches(
  parsed: ParsedCron,
  st: { year: number; month: number; day: number; hour: number; minute: number },
): boolean {
  if (!(parsed.minuteIsWildcard || parsed.minute.includes(st.minute))) return false;
  if (!(parsed.hourIsWildcard || parsed.hour.includes(st.hour))) return false;
  if (!(parsed.monthIsWildcard || parsed.month.includes(st.month))) return false;
  if (!parsed.dayIsWildcard && !parsed.weekdayIsWildcard) {
    if (parsed.day.includes(st.day)) return true;
    return parsed.weekday.includes(weekdayOf(st.year, st.month, st.day));
  }
  if (!parsed.dayIsWildcard) return parsed.day.includes(st.day);
  if (!parsed.weekdayIsWildcard)
    return parsed.weekday.includes(weekdayOf(st.year, st.month, st.day));
  return true;
}

/** Integer translation of the advance/moveToDay/moveToMonth/resetToMonthBoundary cascade. */
function intAdvanceDate(
  parsed: ParsedCron,
  st: { year: number; month: number; day: number; hour: number; minute: number },
  next: boolean,
): void {
  const off = next ? 1 : -1;
  const bHour = next ? parsed.hour[0] : parsed.hour.at(-1)!;
  const bMin = next ? parsed.minute[0] : parsed.minute.at(-1)!;

  // Month mismatch
  if (!(parsed.monthIsWildcard || parsed.month.includes(st.month))) {
    const targetMonth = next
      ? findNext(parsed.month, st.month + off)
      : findPrevious(parsed.month, st.month + off);
    if (targetMonth !== null) {
      intResetToMonthBoundary(parsed, st, st.year, targetMonth, next, bHour, bMin);
    } else {
      const boundaryMonth = next ? parsed.month[0] : parsed.month.at(-1)!;
      intResetToMonthBoundary(parsed, st, st.year + off, boundaryMonth, next, bHour, bMin);
    }
    return;
  }

  const dim = getDaysInMonth(st.year, st.month);

  // Day/Weekday mismatch (with daysInMonth bound)
  const dayIn = parsed.day.includes(st.day) && st.day <= dim;
  let dayOk: boolean;
  if (!parsed.dayIsWildcard && !parsed.weekdayIsWildcard) {
    const wd = weekdayOf(st.year, st.month, st.day);
    dayOk = dayIn || parsed.weekday.includes(wd);
  } else if (!parsed.dayIsWildcard) {
    dayOk = dayIn;
  } else if (!parsed.weekdayIsWildcard) {
    const wd = weekdayOf(st.year, st.month, st.day);
    dayOk = parsed.weekday.includes(wd);
  } else {
    dayOk = true;
  }
  if (!dayOk) {
    intMoveToDay(parsed, st, next, dim, bHour, bMin);
    return;
  }

  // Hour mismatch
  if (!(parsed.hourIsWildcard || parsed.hour.includes(st.hour))) {
    const targetHour = next
      ? findNext(parsed.hour, st.hour + off)
      : findPrevious(parsed.hour, st.hour + off);
    if (targetHour !== null) {
      st.hour = targetHour;
      st.minute = bMin;
    } else {
      intMoveToDay(parsed, st, next, dim, bHour, bMin);
    }
    return;
  }

  // Minute mismatch
  if (!(parsed.minuteIsWildcard || parsed.minute.includes(st.minute))) {
    const targetMinute = next
      ? findNext(parsed.minute, st.minute + off)
      : findPrevious(parsed.minute, st.minute + off);
    if (targetMinute !== null) {
      st.minute = targetMinute;
    } else {
      const targetHour = next
        ? findNext(parsed.hour, st.hour + off)
        : findPrevious(parsed.hour, st.hour + off);
      if (targetHour !== null) {
        st.hour = targetHour;
        st.minute = bMin;
      } else {
        intMoveToDay(parsed, st, next, dim, bHour, bMin);
      }
    }
  }
}

function intMoveToDay(
  parsed: ParsedCron,
  st: { year: number; month: number; day: number; hour: number; minute: number },
  next: boolean,
  daysInMonth: number,
  bHour: number,
  bMin: number,
): void {
  const off = next ? 1 : -1;
  const inOrMode = !parsed.dayIsWildcard && !parsed.weekdayIsWildcard;
  let targetDay: number | null;
  if (inOrMode) {
    const t = st.day + off;
    if (next && t > daysInMonth) targetDay = null;
    else if (!next && t < 1) targetDay = null;
    else targetDay = t;
  } else {
    targetDay = next ? findNext(parsed.day, st.day + off) : findPrevious(parsed.day, st.day + off);
  }
  const dayIsValid = next ? targetDay !== null && targetDay <= daysInMonth : targetDay !== null;
  if (dayIsValid) {
    st.day = targetDay!;
    st.hour = bHour;
    st.minute = bMin;
  } else {
    const targetMonth = next
      ? findNext(parsed.month, st.month + off)
      : findPrevious(parsed.month, st.month + off);
    if (targetMonth !== null) {
      intResetToMonthBoundary(parsed, st, st.year, targetMonth, next, bHour, bMin);
    } else {
      const boundaryMonth = next ? parsed.month[0] : parsed.month.at(-1)!;
      intResetToMonthBoundary(parsed, st, st.year + off, boundaryMonth, next, bHour, bMin);
    }
  }
}

function intResetToMonthBoundary(
  parsed: ParsedCron,
  st: { year: number; month: number; day: number; hour: number; minute: number },
  year: number,
  month: number,
  next: boolean,
  bHour: number,
  bMin: number,
): void {
  st.year = year;
  st.month = month;
  const dim = getDaysInMonth(year, month);
  const inOrMode = !parsed.dayIsWildcard && !parsed.weekdayIsWildcard;
  if (next) {
    const startDay = inOrMode ? 1 : (findNext(parsed.day, 1) ?? parsed.day[0]);
    st.day = Math.min(startDay, dim);
  } else {
    const startDay = inOrMode ? dim : findPrevious(parsed.day, dim);
    if (startDay === null) {
      const off = -1;
      const targetMonth = findPrevious(parsed.month, month + off);
      if (targetMonth !== null) {
        intResetToMonthBoundary(parsed, st, year, targetMonth, next, bHour, bMin);
      } else {
        const boundaryMonth = parsed.month.at(-1)!;
        intResetToMonthBoundary(parsed, st, year + off, boundaryMonth, next, bHour, bMin);
      }
      return;
    }
    st.day = startDay;
  }
  st.hour = bHour;
  st.minute = bMin;
}
