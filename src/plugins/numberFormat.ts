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

