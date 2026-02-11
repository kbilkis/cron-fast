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
 */
export function parse(expression: string): ParsedCron | null {
  const trimmed = expression.trim();
  if (!trimmed) return null;

  const parts = trimmed.split(/\s+/);
  if (parts.length !== 5) return null;

  const [minuteStr, hourStr, dayStr, monthStr, weekdayStr] = parts;

  const minute = parseField(minuteStr, 0, 59);
  if (!minute) return null;

  const hour = parseField(hourStr, 0, 23);
  if (!hour) return null;

  const day = parseField(dayStr, 1, 31);
  if (!day) return null;

  const month = parseField(monthStr, 1, 12, MONTH_NAMES);
  if (!month) return null;

  const weekdayRaw = parseField(weekdayStr, 0, 7, WEEKDAY_NAMES);
  if (!weekdayRaw) return null;

  const weekdays = weekdayRaw.map((d) => (d === 7 ? 0 : d));

  const parsed: ParsedCron = {
    minute,
    hour,
    day,
    month: month.map((m) => m - 1),
    weekday: Array.from(new Set(weekdays)).sort((a, b) => a - b),
    dayIsWildcard: dayStr.trim() === "*",
    weekdayIsWildcard: weekdayStr.trim() === "*",
  };

  if (!hasValidDayMonthCombinations(parsed)) return null;

  return parsed;
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

/**
 * Parse a single cron field (e.g., star-slash-5, 1-10, 1,3,5)
 */
function parseField(
  field: string,
  min: number,
  max: number,
  names?: Record<string, number>,
): number[] | null {
  const values = new Set<number>();

  if (field === "*") {
    for (let i = min; i <= max; i++) values.add(i);
    return Array.from(values).sort((a, b) => a - b);
  }

  const parts = field.split(",");

  for (const part of parts) {
    // Handle step values (e.g., */5 or 10-20/2)
    if (part.includes("/")) {
      const [range, stepStr] = part.split("/");
      const step = parseInt(stepStr, 10);
      if (isNaN(step) || step <= 0) return null;

      let start = min;
      let end = max;

      if (range !== "*") {
        if (range.includes("-")) {
          const rangeParts = range.split("-");
          if (rangeParts.length > 2) return null;
          const startVal = parseValue(rangeParts[0], names);
          const endVal = parseValue(rangeParts[1], names);
          if (startVal === null || endVal === null) return null;
          start = startVal;
          end = endVal;
        } else {
          const v = parseValue(range, names);
          if (v === null) return null;
          start = v;
        }
      }

      for (let i = start; i <= end; i += step) {
        if (i >= min && i <= max) values.add(i);
      }
    }
    // Handle ranges (e.g., 1-5)
    else if (part.includes("-")) {
      const rangeParts = part.split("-");
      if (rangeParts.length > 2) return null;

      const start = parseValue(rangeParts[0], names);
      const end = parseValue(rangeParts[1], names);
      if (start === null || end === null) return null;
      if (start > end) return null;

      for (let i = start; i <= end; i++) {
        if (i >= min && i <= max) values.add(i);
      }
    }
    // Handle single values
    else {
      const value = parseValue(part, names);
      if (value === null) return null;
      if (value < min || value > max) return null;
      values.add(value);
    }
  }

  if (values.size === 0) return null;
  return Array.from(values).sort((a, b) => a - b);
}

/**
 * Parse a single value (number or name)
 */
function parseValue(value: string, names?: Record<string, number>): number | null {
  const lower = value.toLowerCase();
  if (names && lower in names) return names[lower];

  const num = parseInt(value, 10);
  return isNaN(num) ? null : num;
}

/** Validate a cron expression */
export function isValid(expression: string): boolean {
  return parse(expression) !== null;
}
