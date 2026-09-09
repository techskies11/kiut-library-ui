export function hasChartValues(byDay: Record<string, number | null>): boolean {
  return Object.values(byDay).some((value) => value !== null && value !== undefined)
}

export function buildSellerInteractionsSeries(
  byDay: Record<string, number | null> | undefined,
): { dates: string[]; values: (number | null)[] } {
  const source = byDay ?? {}
  const dates = Object.keys(source).sort((a, b) => a.localeCompare(b))

  if (!dates.length || !hasChartValues(source)) {
    return { dates: [], values: [] }
  }

  return {
    dates,
    values: dates.map((date) => source[date] ?? null),
  }
}
