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
export function parse(expression: string): ParsedCron {
  const trimmed = expression.trim();

  if (!trimmed) {
    throw new Error("Cron expression cannot be empty");
  }

  const parts = trimmed.split(/\s+/);

  if (parts.length !== 5) {
    throw new Error(`Invalid cron expression: expected 5 fields, got ${parts.length}`);
  }

  const [minuteStr, hourStr, dayStr, monthStr, weekdayStr] = parts;

  const weekdays = parseField(weekdayStr, 0, 7, WEEKDAY_NAMES).map((d) => (d === 7 ? 0 : d));

  const parsed: ParsedCron = {
    minute: parseField(minuteStr, 0, 59),
    hour: parseField(hourStr, 0, 23),
    day: parseField(dayStr, 1, 31),
    month: parseField(monthStr, 1, 12, MONTH_NAMES).map((m) => m - 1), // Convert to 0-indexed (0 = Jan, 11 = Dec)
    weekday: Array.from(new Set(weekdays)).sort((a, b) => a - b), // Dedupe and sort
  };

  // Validate day/month combinations
  validateDayMonthCombinations(parsed);

  return parsed;
}

/**
 * Validate that day/month combinations are possible
 * Rejects expressions like "0 0 31 2 *" (Feb 31) or "0 0 30 2 *" (Feb 30)
 */
function validateDayMonthCombinations(parsed: ParsedCron): void {
  // If day or month is wildcard, no validation needed
  const dayIsWildcard = parsed.day.length === 31;
  const monthIsWildcard = parsed.month.length === 12;

  if (dayIsWildcard || monthIsWildcard) {
    return;
  }

  // Days in each month (0-indexed: 0=Jan, 11=Dec)
  // February can have 29 days in leap years
  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Check if any specified month can accommodate any specified day
  let hasValidCombination = false;

  for (const month of parsed.month) {
    const maxDaysInMonth = daysInMonth[month];

    for (const day of parsed.day) {
      if (day <= maxDaysInMonth) {
        hasValidCombination = true;
        break;
      }
    }

    if (hasValidCombination) {
      break;
    }
  }

  if (!hasValidCombination) {
    throw new Error(`Invalid cron expression: no valid day/month combination exists`);
  }
}

/**
 * Parse a single cron field (e.g., star-slash-5, 1-10, 1,3,5)
 */
function parseField(
  field: string,
  min: number,
  max: number,
  names?: Record<string, number>,
): number[] {
  const values = new Set<number>();

  // Handle wildcard
  if (field === "*") {
    for (let i = min; i <= max; i++) {
      values.add(i);
    }
    return Array.from(values).sort((a, b) => a - b);
  }

  // Split by comma for multiple values
  const parts = field.split(",");

  for (const part of parts) {
    // Handle step values (e.g., star-slash-5 or 10-20/2)
    if (part.includes("/")) {
      const [range, stepStr] = part.split("/");
      const step = parseInt(stepStr, 10);

      if (isNaN(step) || step <= 0) {
        throw new Error(`Invalid step value: ${stepStr}`);
      }

      let start = min;
      let end = max;

      if (range !== "*") {
        if (range.includes("-")) {
          const [startStr, endStr] = range.split("-");
          start = parseValue(startStr, names);
          end = parseValue(endStr, names);
        } else {
          start = parseValue(range, names);
        }
      }

      for (let i = start; i <= end; i += step) {
        if (i >= min && i <= max) {
          values.add(i);
        }
      }
    }
    // Handle ranges (e.g., 1-5)
    else if (part.includes("-")) {
      const [startStr, endStr] = part.split("-");
      const start = parseValue(startStr, names);
      const end = parseValue(endStr, names);

      if (start > end) {
        throw new Error(`Invalid range: ${part}`);
      }

      for (let i = start; i <= end; i++) {
        if (i >= min && i <= max) {
          values.add(i);
        }
      }
    }
    // Handle single values
    else {
      const value = parseValue(part, names);
      if (value >= min && value <= max) {
        values.add(value);
      } else {
        throw new Error(`Value ${value} out of range [${min}-${max}]`);
      }
    }
  }

  if (values.size === 0) {
    throw new Error(`No valid values in field: ${field}`);
  }

  return Array.from(values).sort((a, b) => a - b);
}

/**
 * Parse a single value (number or name)
 */
function parseValue(value: string, names?: Record<string, number>): number {
  const lower = value.toLowerCase();

  if (names && lower in names) {
    return names[lower];
  }

  const num = parseInt(value, 10);
  if (isNaN(num)) {
    throw new Error(`Invalid value: ${value}`);
  }

  return num;
}

/**
 * Validate a cron expression
 */
export function isValid(expression: string): boolean {
  try {
    parse(expression);
    return true;
  } catch {
    return false;
  }
}
