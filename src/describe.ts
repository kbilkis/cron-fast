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

/**
 * Generate a human-readable description of a cron expression
 */
export function describe(expression: string): string {
  const parsed: ParsedCron = parse(expression);

  const parts: string[] = [];

  // Check if we can use simple time format (specific minute and hour)
  const hasSpecificTime = parsed.minute.length === 1 && parsed.hour.length === 1;
  const hasMultipleSpecificTimes =
    parsed.minute.length === 1 && parsed.hour.length > 1 && parsed.hour.length <= 5;

  if (hasSpecificTime) {
    // Use "At HH:MM AM/PM" format
    parts.push(`At ${formatTime(parsed.hour[0], parsed.minute[0])}`);
  } else if (hasMultipleSpecificTimes) {
    // Use "At HH:MM AM/PM, HH:MM AM/PM, ..." format for multiple specific times
    const times = parsed.hour.map((h) => formatTime(h, parsed.minute[0]));
    parts.push(`At ${times.join(", ")}`);
  } else {
    // Minute
    parts.push(describeMinute(parsed.minute));

    // Hour
    if (parsed.hour.length < 24) {
      parts.push(describeHour(parsed.hour));
    }
  }

  // Day and Weekday (handle OR logic)
  const dayPart = describeDay(parsed.day, parsed.dayIsWildcard);
  const weekdayPart = describeWeekday(parsed.weekday, parsed.weekdayIsWildcard);

  if (dayPart && weekdayPart) {
    parts.push(`${dayPart} or ${weekdayPart}`);
  } else if (dayPart) {
    parts.push(dayPart);
  } else if (weekdayPart) {
    parts.push(weekdayPart);
  }

  // Month
  if (parsed.month.length < 12) {
    parts.push(describeMonth(parsed.month));
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
    if (step === 1) {
      return "every hour";
    }
    return `every ${step} hours`;
  }

  // Check for range (only if more than 2 consecutive hours)
  if (isConsecutive(hours) && hours.length > 2) {
    return `between ${formatHour(hours[0])} and ${formatHour(hours[hours.length - 1])}`;
  }

  // List specific hours
  const hourStrings = hours.map(formatHour);
  if (hourStrings.length <= 5) {
    return `at ${hourStrings.join(", ")}`;
  }
  return `at ${hourStrings.slice(0, 5).join(", ")}, and ${hourStrings.length - 5} more`;
}

function describeDay(days: number[], isWildcard: boolean): string {
  if (isWildcard || days.length === 31) {
    return "";
  }

  if (days.length === 1) {
    return `on day ${days[0]} of the month`;
  }

  // Check for step pattern (must start at 1 for days)
  const step = detectStep(days, 1, 31);
  if (step && days[0] === 1 && days.length >= 4) {
    if (step === 1) {
      return "every day";
    }
    return `every ${step} days`;
  }

  // Check for range (only if more than 2 consecutive days)
  if (isConsecutive(days) && days.length > 1) {
    return `on days ${days[0]}-${days[days.length - 1]} of the month`;
  }

  // List specific days
  return `on days ${formatList(days)} of the month`;
}

function describeWeekday(weekdays: number[], isWildcard: boolean): string {
  if (isWildcard || weekdays.length === 7) {
    return "";
  }

  if (weekdays.length === 1) {
    return `on ${WEEKDAY_NAMES[weekdays[0]]}`;
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

  // Check for range
  if (isConsecutive(weekdays)) {
    return `on ${WEEKDAY_NAMES[weekdays[0]]}-${WEEKDAY_NAMES[weekdays[weekdays.length - 1]]}`;
  }

  // List specific weekdays
  return `on ${weekdays.map((d) => WEEKDAY_NAMES[d]).join(", ")}`;
}

function describeMonth(months: number[]): string {
  if (months.length === 1) {
    return `in ${MONTH_NAMES[months[0]]}`;
  }

  // Check for step pattern (must start at 0 for months since they're 0-indexed)
  const step = detectStep(months, 0, 11);
  if (step && months[0] === 0 && months.length >= 3) {
    if (step === 1) {
      return "every month";
    }
    return `every ${step} months`;
  }

  // Check for range (only if more than 2 consecutive months)
  if (isConsecutive(months) && months.length > 1) {
    return `in ${MONTH_NAMES[months[0]]}-${MONTH_NAMES[months[months.length - 1]]}`;
  }

  // List specific months
  return `in ${months.map((m) => MONTH_NAMES[m]).join(", ")}`;
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

function formatList(numbers: number[]): string {
  if (numbers.length <= 3) {
    return numbers.join(", ");
  }
  return `${numbers.slice(0, 3).join(", ")}, and ${numbers.length - 3} more`;
}

function detectStep(values: number[], min: number, max: number): number | null {
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

function isConsecutive(values: number[]): boolean {
  if (values.length < 2) return false;

  for (let i = 0; i < values.length - 1; i++) {
    if (values[i + 1] - values[i] !== 1) {
      return false;
    }
  }

  return true;
}
