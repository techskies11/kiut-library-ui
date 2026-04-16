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

