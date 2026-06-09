export const formatSankeyPercentage = (value: number, total: number): string => {
  if (!total) return '0.0%';
  return `${((value / total) * 100).toFixed(1)}%`;
};

export const formatSankeyLinkLabel = (value: number, total: number): string =>
  `${value.toLocaleString()} (${formatSankeyPercentage(value, total)})`;
