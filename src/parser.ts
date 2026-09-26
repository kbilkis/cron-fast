import type { ParsedCron } from "./types.js";

const MONTH_NAMES: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

const WEEKDAY_NAMES: Record<string, number> = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

/**
 * Parse a cron expression into structured format
 *
 * Cron format: minute hour day month weekday
 * - minute: 0-59
 * - hour: 0-23
 * - day: 1-31
 * - month: 1-12 (or JAN-DEC)
 * - weekday: 0-7 (or SUN-SAT, where 0 and 7 are Sunday)
 *
 * Note: Months are converted from cron's 1-indexed format (1-12) to
 * JavaScript's 0-indexed format (0-11) for internal consistency.
 *
 * @throws {Error} If the expression is invalid
 */
function isWs(c: number): boolean {
  return c === 32 || (c >= 9 && c <= 13);
}

function isNameChar(c: number): boolean {
  return (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
}

function rangeArray(lo: number, hi: number): number[] {
  const a: number[] = [];
  for (let i = lo; i <= hi; i++) a.push(i);
  return a;
}

// Shared wildcard expansions; returned by reference for `*` fields.
const WC_MINUTE = rangeArray(0, 59);
const WC_HOUR = rangeArray(0, 23);
const WC_DAY = rangeArray(1, 31);
const WC_MONTH = rangeArray(0, 11);
const WC_WEEKDAY = rangeArray(0, 6);

export function parse(expression: string): ParsedCron {
  const s = expression;
  const n = s.length;

  // Fused single-pass scan: the moment a field's bounds are known (whitespace
  // hit or end of string), run the star check inline and parse that field.
  // No bounds array, no second pass.
  let minute: number[] | null = null;
  let hour: number[] | null = null;
  let day: number[] | null = null;
  let month: number[] | null = null;
  let weekdayRaw: number[] | null = null;
  let minuteIsWildcard = false;
  let hourIsWildcard = false;
  let dayIsWildcard = false;
  let monthIsWildcard = false;
  let weekdayIsWildcard = false;
  // Error precedence: the field-count error must fire before content errors,
  // so remember the first content failure (1=minute..5=weekday) and throw it
  // only after the count check.
  let badField = 0;

  let fields = 0;
  let p = 0;
  while (p < n && isWs(s.charCodeAt(p))) p++;
  while (p < n) {
    const lo = p;
    while (p < n && !isWs(s.charCodeAt(p))) p++;
    const hi = p;
    while (p < n && isWs(s.charCodeAt(p))) p++;

    const idx = fields++;
    if (idx > 4 || badField !== 0) continue; // extras counted, content unchecked
    if (idx === 0) {
      minuteIsWildcard = hi - lo === 1 && s.charCodeAt(lo) === 42;
      minute = minuteIsWildcard ? WC_MINUTE : parseFieldAt(s, lo, hi, 0, 59);
      if (!minute) badField = 1;
    } else if (idx === 1) {
      hourIsWildcard = hi - lo === 1 && s.charCodeAt(lo) === 42;
      hour = hourIsWildcard ? WC_HOUR : parseFieldAt(s, lo, hi, 0, 23);
      if (!hour) badField = 2;
    } else if (idx === 2) {
      dayIsWildcard = hi - lo === 1 && s.charCodeAt(lo) === 42;
      day = dayIsWildcard ? WC_DAY : parseFieldAt(s, lo, hi, 1, 31);
      if (!day) badField = 3;
    } else if (idx === 3) {
      monthIsWildcard = hi - lo === 1 && s.charCodeAt(lo) === 42;
      month = monthIsWildcard ? WC_MONTH : parseFieldAt(s, lo, hi, 1, 12, MONTH_NAMES);
      if (!month) badField = 4;
    } else {
      weekdayIsWildcard = hi - lo === 1 && s.charCodeAt(lo) === 42;
      if (!weekdayIsWildcard) {
        weekdayRaw = parseFieldAt(s, lo, hi, 0, 7, WEEKDAY_NAMES);
        if (!weekdayRaw) badField = 5;
      }
    }
  }

  if (fields === 0) throw new Error(`Invalid cron expression: "${expression}"`);
  if (fields !== 5) throw new Error(`Invalid cron expression: "${expression}" - field count`);
  if (badField !== 0) {
    const name = ["minute", "hour", "day", "month", "weekday"][badField - 1];
    throw new Error(`Invalid cron expression: "${expression}" - ${name}`);
  }

  // Normalize Sunday (7 -> 0); wildcard uses the pre-normalized constant.
  const weekdays = weekdayIsWildcard ? WC_WEEKDAY : normalizeWeekday(weekdayRaw!);

  // month is 1-indexed from parsing; shift to 0-indexed in place (skip wildcard).
  if (!monthIsWildcard) {
    for (let i = 0; i < month!.length; i++) month![i]--;
  }

  const parsed: ParsedCron = {
    minute: minute!,
    hour: hour!,
    day: day!,
    month: month!,
    weekday: weekdays,
    minuteIsWildcard,
    hourIsWildcard,
    dayIsWildcard,
    monthIsWildcard,
    weekdayIsWildcard,
  };

  if (!hasValidDayMonthCombinations(parsed))
    throw new Error(`Invalid cron expression: "${expression}" - impossible day/month`);

  return parsed;
}

function normalizeWeekday(weekdayRaw: number[]): number[] {
  const hasZero = weekdayRaw.indexOf(0) !== -1;
  const weekdays: number[] = [];
  for (const d of weekdayRaw) {
    if (d === 7) {
      if (!hasZero) weekdays.unshift(0);
    } else {
      weekdays.push(d);
    }
  }
  return weekdays;
}

/**
 * Check if day/month combinations are possible.
 * Returns false for expressions like "0 0 31 2 *" (Feb 31).
 * Skipped when the weekday field is restricted: day/weekday use OR semantics,
 * so a restricted weekday (e.g. Mondays) can still match even when the
 * day/month combo never occurs (e.g. "0 0 31 2 1" fires on Mondays in Feb).
 */
function hasValidDayMonthCombinations(parsed: ParsedCron): boolean {
  if (parsed.dayIsWildcard || parsed.month.length === 12 || !parsed.weekdayIsWildcard) return true;

  // Days in each month (0-indexed: 0=Jan, 11=Dec)
  // February can have 29 days in leap years
  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  for (const month of parsed.month) {
    const maxDays = daysInMonth[month];
    for (const day of parsed.day) {
      if (day <= maxDays) return true;
    }
  }

  return false;
}

/**
 * Parse a single cron field over substring s[lo..hi) (char-level, no split/substring allocs).
 * Semantics mirror the original: star, a, a-b, a-b/N, star/N, a/N, comma lists.
 */
// All parseFieldAt call sites pre-check for a lone '*' and use the shared WC_*
// constants, so every field reaching here contains at least one non-'*' character.
function parseFieldAt(
  s: string,
  lo: number,
  hi: number,
  min: number,
  max: number,
  names?: Record<string, number>,
): number[] | null {
  const len = hi - lo;
  if (len <= 2) {
    const d0 = s.charCodeAt(lo) - 48;
    if (d0 >= 0 && d0 <= 9) {
      let v = d0;
      let plain = true;
      if (len === 2) {
        const d1 = s.charCodeAt(lo + 1) - 48;
        if (d1 >= 0 && d1 <= 9) v = v * 10 + d1;
        else plain = false;
      }
      if (plain) {
        if (v < min || v > max) return null;
        return [v];
      }
    }
  }

  const values: number[] = [];
  let prev = -1;
  let needsSort = false;
  let i = lo;

  // Read a value at i (advances i in place). Returns the value, or -1 if invalid.
  const read = (): number => {
    const c = s.charCodeAt(i);
    if (c >= 48 && c <= 57) {
      // digits
      let v = 0;
      while (i < hi) {
        const d = s.charCodeAt(i);
        if (d < 48 || d > 57) break;
        v = v * 10 + (d - 48);
        i++;
      }
      return v;
    }
    if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) {
      // name (rare)
      const start = i;
      while (i < hi) {
        const d = s.charCodeAt(i);
        if (!((d >= 65 && d <= 90) || (d >= 97 && d <= 122))) break;
        i++;
      }
      const nm = names && names[s.slice(start, i).toLowerCase()];
      return nm !== undefined ? nm : -1;
    }
    return -1;
  };

  while (i < hi) {
    let isStar2 = false;
    let isRange = false;
    let start: number;
    let end: number;

    if (s.charCodeAt(i) === 42) {
      // '*'
      isStar2 = true;
      start = min;
      end = max;
      i++;
    } else {
      const tokStartStart = i;
      start = read();
      if (start < 0) return null;
      if (i < hi && s.charCodeAt(i) === 45) {
        // '-'
        isRange = true;
        i++;
        const tokEnd = i;
        end = read();
        if (end < 0) return null;
        if (max === 7) {
          if (end === 0 && isNameChar(s.charCodeAt(tokEnd))) end = 7;
          if (start === 0 && isNameChar(s.charCodeAt(tokStartStart))) start = end === 7 ? 7 : 0;
        }
        if (start > end) return null;
        if (start < min || end > max) return null;
      } else {
        end = start;
        if (start < min || start > max) return null;
      }
    }

    let step = 1;
    let hasStep = false;
    if (i < hi && s.charCodeAt(i) === 47) {
      // '/'
      hasStep = true;
      i++;
      step = read();
      if (step <= 0) return null;
      // single value + step → range to max
      if (!isStar2 && !isRange) end = max;
    }

    if (hasStep || isStar2 || isRange) {
      for (let v = start; v <= end; v += step) {
        if (v <= prev) needsSort = true;
        prev = v;
        values.push(v);
      }
    } else {
      if (start <= prev) needsSort = true;
      prev = start;
      values.push(start);
    }

    if (i < hi) {
      if (s.charCodeAt(i) === 44) i++;
      // ','
      else return null;
      if (i >= hi) return null; // trailing comma
    }
  }

  if (!needsSort) return values;
  return values.sort((a, b) => a - b).filter((v, idx, arr) => idx === 0 || arr[idx - 1] !== v);
}

/** Validate a cron expression */
export function isValid(expression: string): boolean {
  try {
    parse(expression);
    return true;
  } catch {
    return false;
  }
}
