export function secondsToMinutes(seconds: number | null): number | null {
  if (seconds === null || seconds === undefined) return null
  return Number((seconds / 60).toFixed(2))
}

export function hasChartValues(byDay: Record<string, number | null>): boolean {
  return Object.values(byDay).some((value) => value !== null && value !== undefined)
}

export function buildSellerCompletionTimeSeries(
  byDay: Record<string, number | null> | undefined,
): { dates: string[]; seconds: (number | null)[] } {
  const source = byDay ?? {}
  const dates = Object.keys(source).sort((a, b) => a.localeCompare(b))

  if (!dates.length || !hasChartValues(source)) {
    return { dates: [], seconds: [] }
  }

  return {
    dates,
    seconds: dates.map((date) => source[date] ?? null),
  }
}
