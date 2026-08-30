const IS_ZERO_OFFSET = (tz: string) =>
  tz === "UTC" || tz === "Etc/UTC" || tz === "GMT" || tz === "Etc/GMT";

/**
 * Wall-clock time of `date` in `tz` as a UTC timestamp (ms).
 * Some environments render midnight as hour 24 (h24 cycle), so fold it back to 0.
 */
function wallClockMs(date: Date, tz: string): number {
  const str = date.toLocaleString("en-US", {
    timeZone: tz,
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
  const [hour, minute, second] = timePart.split(":").map(Number);

  return Date.UTC(year, month - 1, day, hour % 24, minute, second);
}

/**
 * Convert a UTC date to wall-clock time in the target timezone.
 */
export function convertToTimezone(date: Date, timezone: string): Date {
  if (IS_ZERO_OFFSET(timezone)) return new Date(date.getTime());
  return new Date(wallClockMs(date, timezone));
}

/**
 * Convert a timezone-local date back to UTC (inverse of convertToTimezone).
 *
 * Note: During DST fall-back, multiple UTC times map to the same wall-clock time.
 * The result is implementation-defined. Avoid scheduling during DST transition hours
 * for predictable behavior.
 */
export function convertFromTimezone(date: Date, timezone: string): Date {
  // Target time as a comparable number (for checking if we found it)
  const targetTime = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
  if (IS_ZERO_OFFSET(timezone)) return new Date(targetTime);

  // Start with a guess below the wall-clock time: real fall-back overlaps are
  // at most 2h wide, so targetTime - 3h always sits before the ambiguous
  // window and the refinement converges forward onto the FIRST pass of a
  // repeated wall time instead of the second.
  let guess = targetTime - 10800000;
  let bestGuess = guess;
  let bestDiff = Infinity;

  // Iteratively refine the guess (usually converges in 1-2 iterations)
  for (let i = 0; i < 3; i++) {
    // Parse what wall-clock time this guess produces
    const gotTime = wallClockMs(new Date(guess), timezone);

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
    const gotTime = wallClockMs(new Date(guessLater), timezone);

    if (gotTime === oneHourLater) {
      // Target time was in a DST gap, return the time after the gap
      return new Date(guessLater);
    }
    guessLater += oneHourLater - gotTime;
  }

  // Return the best guess we found
  return new Date(bestGuess);
}
