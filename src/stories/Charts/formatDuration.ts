/**
 * Format a duration in seconds showing only the top 2 non-zero time units.
 *
 * Mirrors the backend formatting algorithm so chart tooltips and cards stay
 * consistent with the API-provided `*_formatted` fields.
 *
 * Examples: 8145s (2h 15m 45s) -> "2h 15m", 2120s (35m 20s) -> "35m 20s", 45s -> "45s"
 */
export function formatDurationSeconds(seconds: number | null | undefined): string {
  if (seconds === null || seconds === undefined || Number.isNaN(seconds)) return '-'

  // Clamp negative durations to zero (mirrors the backend formatter) so bad
  // data never renders as a misleadingly wrapped-around positive duration
  // (e.g. -5 must never render as "59m 55s").
  const totalSeconds = Math.max(0, Math.round(seconds))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const secs = totalSeconds % 60

  if (hours > 0) return `${hours}h ${minutes}m`
  if (minutes > 0) return `${minutes}m ${secs}s`
  return `${secs}s`
}
