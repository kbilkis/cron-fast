function isValidTimezone(timezone: string): boolean {
  if (typeof timezone !== "string" || !timezone.trim()) return false;
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
}

/**
 * Convert a UTC date to wall-clock time in the target timezone.
 * @throws {Error} If timezone is invalid
 */
export function convertToTimezone(date: Date, timezone: string): Date {
  if (!isValidTimezone(timezone)) throw new Error(`Invalid timezone: "${timezone}"`);

  const str = date.toLocaleString("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Parse formatted string: "MM/DD/YYYY, HH:mm:ss"
  const [datePart, timePart] = str.split(", ");
  const [month, day, year] = datePart.split("/").map(Number);
  let [hour, minute, second] = timePart.split(":").map(Number);

  if (hour === 24) hour = 0; // Normalize "24:00:00" to "00:00:00"

  return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
}

/**
 * Convert a timezone-local date back to UTC (inverse of convertToTimezone).
 * @throws {Error} If timezone is invalid
 *
 * Note: During DST fall-back, multiple UTC times map to the same wall-clock time.
 * The result is implementation-defined. Avoid scheduling during DST transition hours
 * for predictable behavior.
 */
export function convertFromTimezone(date: Date, timezone: string): Date {
  if (!isValidTimezone(timezone)) throw new Error(`Invalid timezone: "${timezone}"`);

  // Target time as a comparable number (for checking if we found it)
  const targetTime = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );

  // Start with a guess: interpret the wall-clock time as UTC
  let guess = targetTime;
  let bestGuess = guess;
  let bestDiff = Infinity;

  // Iteratively refine the guess (usually converges in 1-2 iterations)
  for (let i = 0; i < 3; i++) {
    const testDate = new Date(guess);
    const testStr = testDate.toLocaleString("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    // Parse what wall-clock time this guess produces
    const [testDatePart, testTimePart] = testStr.split(", ");
    const [testMonth, testDay, testYear] = testDatePart.split("/").map(Number);
    let [testHour, testMinute, testSecond] = testTimePart.split(":").map(Number);

    if (testHour === 24) testHour = 0; // Normalize "24:00:00" to "00:00:00"

    const gotTime = Date.UTC(testYear, testMonth - 1, testDay, testHour, testMinute, testSecond);

    // Track the best guess (closest to target, but prefer later times if equal distance)
    const diff = Math.abs(targetTime - gotTime);
    if (diff < bestDiff || (diff === bestDiff && guess > bestGuess)) {
      bestDiff = diff;
      bestGuess = guess;
    }

    // Note: During DST fall-back, two UTC times map to the same wall-clock time.
    // This returns whichever solution the iteration converges to first (implementation-defined).
    if (gotTime === targetTime) return new Date(guess);

    // Otherwise, adjust the guess by the difference
    guess += targetTime - gotTime;
  }

  // If we didn't find an exact match after 3 iterations, we're likely in a DST gap
  // (e.g., 2:30 AM during spring forward doesn't exist)
  // Try one more time: check if adding 1 hour to the target gets us closer
  const oneHourLater = targetTime + 3600000;
  let guessLater = oneHourLater;

  for (let i = 0; i < 2; i++) {
    const testStr = new Date(guessLater).toLocaleString("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const [testDatePart, testTimePart] = testStr.split(", ");
    const [testMonth, testDay, testYear] = testDatePart.split("/").map(Number);
    let [testHour, testMinute, testSecond] = testTimePart.split(":").map(Number);

    if (testHour === 24) testHour = 0; // Normalize "24:00:00" to "00:00:00"

    const gotTime = Date.UTC(testYear, testMonth - 1, testDay, testHour, testMinute, testSecond);

    if (gotTime === oneHourLater) {
      // Target time was in a DST gap, return the time after the gap
      return new Date(guessLater);
    }
    guessLater += oneHourLater - gotTime;
  }

  // Return the best guess we found
  return new Date(bestGuess);
}
