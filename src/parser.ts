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

  // Single-pass whitespace tokenization into 5 fields (no regex, no substring allocs)
  const bounds: number[] = [];
  let p = 0;
  while (p < n && isWs(s.charCodeAt(p))) p++;
  while (p < n) {
    const lo = p;
    while (p < n && !isWs(s.charCodeAt(p))) p++;
    bounds.push(lo, p);
    while (p < n && isWs(s.charCodeAt(p))) p++;
  }

  if (bounds.length === 0) throw new Error(`Invalid cron expression: "${expression}"`);
  if (bounds.length !== 10)
    throw new Error(
      `Invalid cron expression: "${expression}" - expected 5 fields, got ${bounds.length / 2}`,
    );

  const minuteIsWildcard = isStar(s, bounds[0], bounds[1]);
  const minute = minuteIsWildcard ? WC_MINUTE : parseFieldAt(s, bounds[0], bounds[1], 0, 59);
  if (!minute) throw new Error(`Invalid cron expression: "${expression}" - invalid minute field`);

  const hourIsWildcard = isStar(s, bounds[2], bounds[3]);
  const hour = hourIsWildcard ? WC_HOUR : parseFieldAt(s, bounds[2], bounds[3], 0, 23);
  if (!hour) throw new Error(`Invalid cron expression: "${expression}" - invalid hour field`);

  const dayIsWildcard = isStar(s, bounds[4], bounds[5]);
  const day = dayIsWildcard ? WC_DAY : parseFieldAt(s, bounds[4], bounds[5], 1, 31);
  if (!day) throw new Error(`Invalid cron expression: "${expression}" - invalid day field`);

  const monthIsWildcard = isStar(s, bounds[6], bounds[7]);
  const month = monthIsWildcard
    ? WC_MONTH
    : parseFieldAt(s, bounds[6], bounds[7], 1, 12, MONTH_NAMES);
  if (!month) throw new Error(`Invalid cron expression: "${expression}" - invalid month field`);

  const weekdayIsWildcard = isStar(s, bounds[8], bounds[9]);
  const weekdayRaw = weekdayIsWildcard
    ? null
    : parseFieldAt(s, bounds[8], bounds[9], 0, 7, WEEKDAY_NAMES);
  if (!weekdayIsWildcard && !weekdayRaw)
    throw new Error(`Invalid cron expression: "${expression}" - invalid weekday field`);

  // Normalize Sunday (7 -> 0); wildcard uses the pre-normalized constant.
  const weekdays = weekdayIsWildcard ? WC_WEEKDAY : normalizeWeekday(weekdayRaw as number[]);

  // month is 1-indexed from parsing; shift to 0-indexed in place (skip wildcard).
  if (!monthIsWildcard) {
    for (let i = 0; i < month.length; i++) month[i]--;
  }

  const parsed: ParsedCron = {
    minute,
    hour,
    day,
    month,
    weekday: weekdays,
    minuteIsWildcard,
    hourIsWildcard,
    dayIsWildcard,
    monthIsWildcard,
    weekdayIsWildcard,
  };

  if (!hasValidDayMonthCombinations(parsed))
    throw new Error(`Invalid cron expression: "${expression}" - impossible day/month combination`);

  return parsed;
}

function normalizeWeekday(weekdayRaw: number[]): number[] {
  const hasZero = weekdayRaw.indexOf(0) !== -1;
  const weekdays: number[] = [];
  for (const d of weekdayRaw) {
    if (d === 7) {
      if (!hasZero) weekdays.push(0);
    } else {
      weekdays.push(d);
    }
  }
  return weekdays;
}

/**
 * Check if day/month combinations are possible.
 * Returns false for expressions like "0 0 31 2 *" (Feb 31).
 */
function hasValidDayMonthCombinations(parsed: ParsedCron): boolean {
  if (parsed.dayIsWildcard || parsed.month.length === 12) return true;

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

function isStar(s: string, lo: number, hi: number): boolean {
  return hi - lo === 1 && s.charCodeAt(lo) === 42; // '*'
}

/**
 * Parse a single cron field over substring s[lo..hi) (char-level, no split/substring allocs).
 * Semantics mirror the original: star, a, a-b, a-b/N, star/N, a/N, comma lists.
 */
function parseFieldAt(
  s: string,
  lo: number,
  hi: number,
  min: number,
  max: number,
  names?: Record<string, number>,
): number[] | null {
  if (isStar(s, lo, hi)) {
    const values: number[] = [];
    for (let i = min; i <= max; i++) values.push(i);
    return values;
  }

  const values: number[] = [];
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
      start = read();
      if (start < 0) return null;
      if (i < hi && s.charCodeAt(i) === 45) {
        // '-'
        isRange = true;
        i++;
        end = read();
        if (end < 0) return null;
        if (start > end) return null;
      } else {
        end = start;
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
        if (v >= min && v <= max) values.push(v);
      }
    } else {
      // pure single value: validate strictly (matches original behavior)
      if (start < min || start > max) return null;
      values.push(start);
    }

    if (i < hi) {
      if (s.charCodeAt(i) === 44) i++;
      // ','
      else return null;
      if (i >= hi) return null; // trailing comma
    }
  }

  if (values.length === 0) return null;
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
