export interface FailedReason {
  reason: string;
  failed_count: number;
}

export interface CurrencyValue {
  currency: string;
  total_value: number;
  count: number;
}

export interface SellerDayData {
  date: string;
  seller_conversations: number;
  sell_started_count: number;
  sell_get_quote_count: number;
  sell_booking_created_count: number;
  sell_success_count: number;
  sell_success_bank_transfer_count?: number;
  sell_success_cash_count?: number;
  daily_value_sell_success: number | CurrencyValue[];
  daily_value_sell_success_bank_transfer?: CurrencyValue[];
  daily_value_sell_success_cash?: CurrencyValue[];
  reasons?: FailedReason[];
}

export interface SellerData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  total_seller_conversations: number;
  total_sell_started: number;
  total_sell_get_quote: number;
  total_sell_booking_created: number;
  total_sell_success: number;
  total_sell_success_bank_transfer?: number;
  total_sell_success_cash?: number;
  total_value_sell_success: number | CurrencyValue[];
  total_value_sell_success_bank_transfer?: CurrencyValue[];
  total_value_sell_success_cash?: CurrencyValue[];
  seller_by_day: SellerDayData[];
}

export interface FailedByReasonDay {
  date: string;
  reasons: FailedReason[];
}

export interface FailedData {
  total_sell_failed?: number;
  failed_by_reason_by_day: FailedByReasonDay[];
}

export interface SalesVolumeDay {
  date: string;
  initiated: number;
  success: number;
  abandoned: number;
  errors: number;
}

export interface SellerFunnelBreakdown {
  initiated: number;
  started: number;
  bookingCreated: number;
  successOnline: number;
  successBankTransfer: number;
  successCash: number;
  success: number;
  droppedBeforeSales: number;
  failedAtBooking: number;
  failedAtCompletion: number;
  totalAbandoned: number;
  totalErrors: number;
  failedByReasons: Record<string, number>;
}

function allocateProportionally(total: number, weights: number[]): number[] {
  if (total <= 0 || weights.length === 0) {
    return weights.map(() => 0);
  }

  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
  if (weightSum <= 0) {
    return weights.map(() => 0);
  }

  const raw = weights.map((weight) => (total * weight) / weightSum);
  const allocated = raw.map(Math.floor);
  let remainder = total - allocated.reduce((sum, value) => sum + value, 0);

  const ranked = raw
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction);

  for (let i = 0; i < remainder; i += 1) {
    allocated[ranked[i % ranked.length].index] += 1;
  }

  return allocated;
}

function weightsOrFallback(weights: number[], fallback: number[]): number[] {
  return weights.some((weight) => weight > 0) ? weights : fallback;
}

export function successForDay(day: SellerDayData): number {
  return (
    (day.sell_success_count || 0) +
    (day.sell_success_bank_transfer_count ?? 0) +
    (day.sell_success_cash_count ?? 0)
  );
}

export function aggregateFailedByReasons(
  failedData?: FailedData | null,
): Record<string, number> {
  const failedByReasons: Record<string, number> = {};

  for (const dayData of failedData?.failed_by_reason_by_day ?? []) {
    for (const reasonData of dayData.reasons ?? []) {
      const reason = reasonData.reason;
      failedByReasons[reason] =
        (failedByReasons[reason] || 0) + (reasonData.failed_count || 0);
    }
  }

  return failedByReasons;
}

export function mergeSellerDaysWithFailed(
  sellerData?: SellerData | null,
  failedData?: FailedData | null,
): SellerDayData[] {
  const data = [...(sellerData?.seller_by_day ?? [])];

  for (const failedItem of failedData?.failed_by_reason_by_day ?? []) {
    const idx = data.findIndex((sellerItem) => sellerItem.date === failedItem.date);
    if (idx !== -1) {
      data[idx] = { ...data[idx], reasons: failedItem.reasons };
    } else {
      data.push({
        date: failedItem.date,
        seller_conversations: 0,
        sell_started_count: 0,
        sell_get_quote_count: 0,
        sell_booking_created_count: 0,
        sell_success_count: 0,
        daily_value_sell_success: 0,
        reasons: failedItem.reasons,
      });
    }
  }

  return data;
}

export function computeSellerFunnelBreakdown(
  sellerData?: SellerData | null,
  failedData?: FailedData | null,
): SellerFunnelBreakdown | null {
  const initiated = sellerData?.total_seller_conversations || 0;
  if (!initiated) return null;

  const started = sellerData?.total_sell_started || 0;
  const bookingCreated = sellerData?.total_sell_booking_created || 0;
  const successOnline = sellerData?.total_sell_success || 0;
  const successBankTransfer = sellerData?.total_sell_success_bank_transfer || 0;
  const successCash = sellerData?.total_sell_success_cash || 0;
  const success = successOnline + successBankTransfer + successCash;

  const droppedBeforeSales = Math.max(initiated - started, 0);
  const failedAtBooking = Math.max(started - bookingCreated, 0);
  const failedAtCompletion = Math.max(bookingCreated - success, 0);

  return {
    initiated,
    started,
    bookingCreated,
    successOnline,
    successBankTransfer,
    successCash,
    success,
    droppedBeforeSales,
    failedAtBooking,
    failedAtCompletion,
    totalAbandoned: droppedBeforeSales,
    totalErrors: failedAtBooking + failedAtCompletion,
    failedByReasons: aggregateFailedByReasons(failedData),
  };
}

export function computeSalesVolumeDays(
  sellerData?: SellerData | null,
  failedData?: FailedData | null,
): SalesVolumeDay[] {
  const days = mergeSellerDaysWithFailed(sellerData, failedData);
  if (!days.length) return [];

  const funnel = computeSellerFunnelBreakdown(sellerData, failedData);
  if (!funnel) return [];

  const initiatedWeights = days.map((day) => day.seller_conversations || 0);
  const startedWeights = days.map((day) => day.sell_started_count || 0);
  const bookingWeights = days.map((day) => day.sell_booking_created_count || 0);
  const successWeights = days.map((day) => successForDay(day));

  const preSalesGapWeights = days.map((_day, index) =>
    Math.max(initiatedWeights[index] - startedWeights[index], 0),
  );
  const failedAtBookingWeights = days.map((_day, index) =>
    Math.max(startedWeights[index] - bookingWeights[index], 0),
  );
  const failedAtCompletionWeights = days.map((_day, index) =>
    Math.max(bookingWeights[index] - successWeights[index], 0),
  );

  const abandonedByDay = allocateProportionally(
    funnel.totalAbandoned,
    weightsOrFallback(preSalesGapWeights, initiatedWeights),
  );
  const failedAtBookingByDay = allocateProportionally(
    funnel.failedAtBooking,
    weightsOrFallback(failedAtBookingWeights, startedWeights),
  );
  const failedAtCompletionByDay = allocateProportionally(
    funnel.failedAtCompletion,
    weightsOrFallback(failedAtCompletionWeights, bookingWeights),
  );

  return [...days]
    .map((day, index) => ({
      date: day.date,
      initiated: initiatedWeights[index],
      success: successWeights[index],
      abandoned: abandonedByDay[index],
      errors: failedAtBookingByDay[index] + failedAtCompletionByDay[index],
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
