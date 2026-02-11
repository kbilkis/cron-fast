import type { ParsedCron } from "./types.js";
import { parse } from "./parser.js";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ORDINAL_SUFFIXES = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"] as const;

/**
 * Generate a human-readable description of a cron expression.
 * Returns empty string if the expression is invalid.
 */
export function describe(expression: string): string {
  const parsed = parse(expression);
  if (!parsed) return "";

  const parts: string[] = [];

  // Check if we can use simple time format (specific minute and hour)
  const hasSpecificTime = parsed.minute.length === 1 && parsed.hour.length === 1;
  const hasHourStep = parsed.hour.length >= 2 && detectStep(parsed.hour, 0, 23) !== null;
  const hasMultipleSpecificTimes =
    parsed.minute.length === 1 && parsed.hour.length > 1 && parsed.hour.length <= 5 && !hasHourStep;

  if (hasSpecificTime && !hasHourStep) {
    // Use "At HH:MM AM/PM" format
    parts.push(`At ${formatTime(parsed.hour[0], parsed.minute[0])}`);
  } else if (hasMultipleSpecificTimes) {
    // Use "At HH:MM AM/PM or HH:MM AM/PM or ..." format for multiple specific times
    const times = parsed.hour.map((h) => formatTime(h, parsed.minute[0]));
    parts.push(`At ${formatStringList(times)}`);
  } else if (parsed.minute.length === 1 && parsed.minute[0] === 0 && parsed.hour.length === 24) {
    // "0 * * * *" -> Every hour
    parts.push("Every hour");
  } else {
    // Minute (skip if single minute 0 with hour step - implied in "every N hours")
    const singleMinuteZero = parsed.minute.length === 1 && parsed.minute[0] === 0;
    if (!(singleMinuteZero && hasHourStep)) {
      parts.push(describeMinute(parsed.minute));
    }

    // Hour
    if (parsed.hour.length < 24) {
      parts.push(describeHour(parsed.hour));
    }
  }

  // Day and Weekday (handle OR logic)
  const dayPart = describeDay(parsed.day, parsed.dayIsWildcard);
  const weekdayPart = describeWeekday(parsed.weekday, parsed.weekdayIsWildcard);
  const monthPart = parsed.month.length < 12 ? describeMonth(parsed.month) : null;

  // Combine day/weekday/month - no comma between day and month for better flow
  if (dayPart && weekdayPart) {
    const combined = `${dayPart} or ${weekdayPart}`;
    parts.push(monthPart ? `${combined} ${monthPart}` : combined);
  } else if (dayPart) {
    parts.push(monthPart ? `${dayPart} ${monthPart}` : dayPart);
  } else if (weekdayPart) {
    parts.push(monthPart ? `${weekdayPart} ${monthPart}` : weekdayPart);
  } else if (monthPart) {
    parts.push(monthPart);
  }

  return parts.join(", ");
}

function describeMinute(minutes: number[]): string {
  if (minutes.length === 60) {
    return "Every minute";
  }

  if (minutes.length === 1) {
    return `At minute ${minutes[0]}`;
  }

  // Check for step pattern (must start at 0 and cover significant range)
  const step = detectStep(minutes, 0, 59);
  if (step && minutes[0] === 0 && step > 1) {
    return `Every ${step} minutes`;
  }

  // Check for range
  if (isConsecutive(minutes) && minutes.length > 2) {
    return `At minutes ${minutes[0]}-${minutes[minutes.length - 1]}`;
  }

  // List specific minutes
  return `At minutes ${formatList(minutes)}`;
}

function describeHour(hours: number[]): string {
  if (hours.length === 1) {
    return `at ${formatHour(hours[0])}`;
  }

  // Check for step pattern (must start at 0 and cover significant range)
  const step = detectStep(hours, 0, 23);
  if (step && hours[0] === 0 && hours.length >= 4) {
    return `every ${step} hours`;
  }

  // Check for range (only if more than 2 consecutive hours)
  if (isConsecutive(hours) && hours.length > 2) {
    return `between ${formatHour(hours[0])} and ${formatHour(hours[hours.length - 1])}`;
  }

  // List specific hours
  const hourStrings = hours.map(formatHour);
  return `at ${formatStringList(hourStrings)}`;
}

function describeDay(days: number[], isWildcard: boolean): string {
  if (isWildcard || days.length === 31) {
    return "";
  }

  if (days.length === 1) {
    return `on the ${formatOrdinal(days[0])}`;
  }

  // Check for step pattern (must start at 1 for days)
  const step = detectStep(days, 1, 31);
  if (step && days[0] === 1 && days.length >= 4) {
    return `every ${step} days`;
  }

  // Check for range
  if (isConsecutive(days) && days.length > 1) {
    return `on the ${formatOrdinal(days[0])} through ${formatOrdinal(days[days.length - 1])}`;
  }

  // List specific days
  const dayStrings = days.map(formatOrdinal);
  return `on the ${formatStringList(dayStrings)}`;
}

function describeWeekday(weekdays: number[], isWildcard: boolean): string {
  if (isWildcard || weekdays.length === 7) {
    return "";
  }

  if (weekdays.length === 1) {
    return `on ${formatWeekday(weekdays[0], true)}`;
  }

  // Check for weekdays (Mon-Fri)
  if (
    weekdays.length === 5 &&
    weekdays.includes(1) &&
    weekdays.includes(2) &&
    weekdays.includes(3) &&
    weekdays.includes(4) &&
    weekdays.includes(5)
  ) {
    return "on weekdays";
  }

  // Check for weekend
  if (weekdays.length === 2 && weekdays.includes(0) && weekdays.includes(6)) {
    return "on weekends";
  }

  // Check for wrap-around (e.g., Fri-Sun = [0, 5, 6])
  const wrapAround = detectWeekdayWrapAround(weekdays);
  if (wrapAround) {
    return `on ${formatWeekday(wrapAround.start)} through ${formatWeekday(0)}`;
  }

  // Check for range
  if (isConsecutive(weekdays)) {
    return `on ${formatWeekday(weekdays[0])} through ${formatWeekday(weekdays[weekdays.length - 1])}`;
  }

  // List specific weekdays
  const weekdayStrings = weekdays.map((d) => formatWeekday(d, true));
  return `on ${formatStringList(weekdayStrings)}`;
}

function describeMonth(months: number[]): string {
  if (months.length === 1) {
    return `in ${MONTH_NAMES[months[0]]}`;
  }

  // Check for step pattern (must start at 0 for months since they're 0-indexed)
  const step = detectStep(months, 0, 11);
  if (step && months[0] === 0 && months.length >= 3) {
    return `every ${step} months`;
  }

  // Check for range (only if more than 2 consecutive months)
  if (isConsecutive(months) && months.length > 1) {
    return `in ${MONTH_NAMES[months[0]]}-${MONTH_NAMES[months[months.length - 1]]}`;
  }

  // List specific months
  const monthStrings = months.map((m) => MONTH_NAMES[m]);
  return `in ${formatStringList(monthStrings)}`;
}

function formatHour(hour: number): string {
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}

function formatTime(hour: number, minute: number): string {
  const h = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const period = hour < 12 ? "AM" : "PM";
  const m = minute.toString().padStart(2, "0");
  return `${h}:${m} ${period}`;
}

function formatOrdinal(n: number): string {
  if (n >= 11 && n <= 13) return `${n}th`;
  return `${n}${ORDINAL_SUFFIXES[n % 10]}`;
}

function formatWeekday(day: number, plural: boolean = false): string {
  const name = WEEKDAY_NAMES[day];
  return plural ? `${name}s` : name;
}

function formatList(numbers: number[]): string {
  const strings = numbers.map(String);
  return formatStringList(strings);
}

export function formatStringList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} or ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, or ${items[items.length - 1]}`;
}

export function detectStep(values: number[], min: number, max: number): number | null {
  if (values.length < 2) return null;

  const step = values[1] - values[0];
  if (step <= 0) return null;

  // Check if all values follow the step pattern
  for (let i = 0; i < values.length - 1; i++) {
    if (values[i + 1] - values[i] !== step) {
      return null;
    }
  }

  // Only return step if it starts from min and is a complete step pattern
  // A complete step pattern goes from min to as close to max as possible
  if (values[0] === min) {
    // Calculate the expected last value for a complete step pattern
    const expectedLast = min + Math.floor((max - min) / step) * step;
    // Check if the last value matches what we'd expect from */step
    if (values[values.length - 1] === expectedLast) {
      return step;
    }
  }

  return null;
}

export function isConsecutive(values: number[]): boolean {
  if (values.length < 2) return false;

  for (let i = 0; i < values.length - 1; i++) {
    if (values[i + 1] - values[i] !== 1) {
      return false;
    }
  }

  return true;
}

export function detectWeekdayWrapAround(weekdays: number[]): { start: number } | null {
  if (weekdays.length < 3) return null;
  if (!weekdays.includes(0)) return null;

  const withoutSunday = weekdays.filter((d) => d !== 0);
  if (withoutSunday.length === 0) return null;

  const minWeekday = Math.min(...withoutSunday);
  if (minWeekday === 1) return null;

  const maxWeekday = Math.max(...withoutSunday);
  const expectedCount = maxWeekday - minWeekday + 2;
  if (weekdays.length !== expectedCount) return null;

  for (let i = minWeekday; i <= maxWeekday; i++) {
    if (!withoutSunday.includes(i)) return null;
  }

  return { start: minWeekday };
}
