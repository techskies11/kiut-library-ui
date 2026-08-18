export interface PercentTrendBadge {
  label: string;
  class: string;
}

export function computeChangePercent(
  current: number,
  previous: number | null | undefined,
): number | null {
  if (previous === null || previous === undefined) return null;
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export function formatChangeLabel(percent: number): string {
  const pct = percent.toFixed(1);
  if (percent > 0) return `+${pct}%`;
  return `${pct}%`;
}

export function trendBadgeClass(
  percent: number,
  lowerIsBetter = false,
): string {
  const effective = lowerIsBetter ? -percent : percent;
  if (effective > 0) return "change-badge--up";
  if (effective < 0) return "change-badge--down";
  return "change-badge--neutral";
}

export function buildPercentTrend(
  current: number,
  previous: number | null | undefined,
  lowerIsBetter = false,
): PercentTrendBadge | null {
  const change = computeChangePercent(current, previous);
  if (change === null) return null;
  return {
    label: formatChangeLabel(change),
    class: trendBadgeClass(change, lowerIsBetter),
  };
}

export function formatPercent(value: number): string {
  return `${Number(value || 0).toFixed(1)}%`;
}
