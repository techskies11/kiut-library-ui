// Number formatting utility for Storybook
export const useNumberFormat = (value: number | undefined | null): string => {
  if (value === undefined || value === null) {
    return '0';
  }
  
  return new Intl.NumberFormat('en-US').format(value);
};

export const useCurrencyFormat = (value: number | undefined | null, currency: string = 'USD'): string => {
  if (value === undefined || value === null) {
    return '$0.00';
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const useCompactNumberFormat = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '0'

  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  if (abs >= 1_000_000) {
    const millions = abs / 1_000_000
    const formatted =
      millions >= 10 || Number.isInteger(millions)
        ? millions.toFixed(0)
        : millions.toFixed(1)
    return `${sign}${formatted}M`
  }
  if (abs >= 1_000) {
    const thousands = abs / 1_000
    const formatted =
      thousands >= 10 || Number.isInteger(thousands)
        ? thousands.toFixed(0)
        : thousands.toFixed(1)
    return `${sign}${formatted}K`
  }

  return `${sign}${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(abs)}`
}

export const useCompactCurrencyFormat = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '0';

  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (abs >= 1_000_000) {
    return `${sign}${(abs / 1_000_000).toFixed(2)}M`;
  }
  if (abs > 99_999) {
    return `${sign}${(abs / 1_000).toFixed(1)}K`;
  }
  return `${sign}${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(abs)}`;
};

