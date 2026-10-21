import {
  computeSellerFunnelBreakdown,
  mergeSellerCurrencyBreakdowns,
  resolveSellerRevenueAmount,
  resolveSellerSuccessTotal,
  type FailedData,
  type SellerData,
} from '../Seller/sellerFunnelMetrics'
import type { SellerKpiProps } from './sellerKpiTypes'

export interface SellerCurrencyBreakdown {
  currency: string
  total_value: number
  count?: number
}

export interface SellerRecordKpiShape {
  total_seller_conversations?: number
  total_sell_started?: number
  total_sell_booking_created?: number
  total_sell_success?: number
  total_sell_success_bank_transfer?: number
  total_sell_success_cash?: number
  total_sell_abandoned?: number
  total_value_sell_success?: number | SellerCurrencyBreakdown[]
  total_value_sell_success_usd?: number
  total_value_sell_success_bank_transfer?: SellerCurrencyBreakdown[]
  total_value_sell_success_cash?: SellerCurrencyBreakdown[]
  avg_sell_completion_time_seconds?: number | null
  avg_sell_completion_time_formatted?: string | null
  avg_sell_interactions_to_complete?: number | null
}

export interface SellerFailedKpiShape {
  total_sell_failed?: number
}

export type SellerKpiValues = Omit<SellerKpiProps, 'loading' | 'theme' | 'labels'>

export interface BuildSellerKpiOptions {
  /** Dashboard display currency for the revenue KPI (default USD). */
  revenueCurrency?: string
}

function normalizeRevenueCurrency(currencyCode?: string): string {
  const normalized = (currencyCode ?? 'USD').trim().toUpperCase()
  return normalized || 'USD'
}

function toPercent(count: number, initiated: number): number {
  if (!initiated) return 0
  return (count / initiated) * 100
}

function formatInteractions(value: number | null | undefined): string | null {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return null
  }
  return Number(value).toFixed(1)
}

function formatAmount(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(value))
}

function formatCurrencyAmount(currencyCode: string, value: number): string {
  return `${currencyCode} ${formatAmount(value)}`
}

function currencyBreakdown(
  value: number | SellerCurrencyBreakdown[] | undefined,
): SellerCurrencyBreakdown[] {
  if (Array.isArray(value)) return value
  if (typeof value === 'number' && Number.isFinite(value)) {
    return [{ currency: 'USD', total_value: value }]
  }
  return []
}

function formatRevenue(
  amount: number | null,
  currencyCode: string,
  record?: SellerRecordKpiShape | null,
): string | null {
  if (amount !== null) return formatCurrencyAmount(currencyCode, amount)

  const currency = normalizeRevenueCurrency(currencyCode)
  const hasPaymentMethodValues =
    (record?.total_value_sell_success_bank_transfer?.length ?? 0) > 0 ||
    (record?.total_value_sell_success_cash?.length ?? 0) > 0
  const items = hasPaymentMethodValues
    ? mergeSellerCurrencyBreakdowns(
        record?.total_value_sell_success,
        record?.total_value_sell_success_bank_transfer,
        record?.total_value_sell_success_cash,
      )
    : currencyBreakdown(record?.total_value_sell_success)

  const currencyItems = items.filter(
    (item) => item.currency.toUpperCase() === currency,
  )
  if (currencyItems.length) {
    return currencyItems
      .map((item) => formatCurrencyAmount(item.currency.toUpperCase(), item.total_value))
      .join(' · ')
  }

  return null
}

function resolveSellerKpiFunnelCounts(
  record?: SellerRecordKpiShape | null,
  failed?: SellerFailedKpiShape | null,
): { initiated: number; success: number; errorCount: number; abandonCount: number } {
  const funnel = computeSellerFunnelBreakdown(
    record as SellerData | undefined,
    failed as FailedData | undefined,
  )

  const initiated =
    funnel?.initiated ??
    record?.total_seller_conversations ??
    record?.total_sell_started ??
    0
  const success = funnel?.success ?? resolveSellerSuccessTotal(record)

  if (funnel) {
    return {
      initiated,
      success,
      errorCount: funnel.totalErrors,
      abandonCount: funnel.totalAbandoned,
    }
  }

  const started = record?.total_sell_started ?? 0
  const bookingCreated = record?.total_sell_booking_created ?? 0
  const failedAtBooking = Math.max(started - bookingCreated, 0)
  const failedAtCompletion = Math.max(bookingCreated - success, 0)

  return {
    initiated,
    success,
    errorCount: failedAtBooking + failedAtCompletion,
    abandonCount:
      record?.total_sell_abandoned ?? Math.max(0, initiated - started),
  }
}

export function buildSellerKpiFromRecord(
  record?: SellerRecordKpiShape | null,
  failed?: SellerFailedKpiShape | null,
  options?: BuildSellerKpiOptions,
): SellerKpiValues {
  const revenueCurrency = normalizeRevenueCurrency(options?.revenueCurrency)
  const { initiated, success, errorCount, abandonCount } = resolveSellerKpiFunnelCounts(
    record,
    failed,
  )
  const avgInteractions = record?.avg_sell_interactions_to_complete ?? null
  const revenueUsd = resolveSellerRevenueAmount(record, revenueCurrency)

  return {
    salesInitiated: initiated,
    successRatePct: toPercent(success, initiated),
    successCount: success,
    errorRatePct: toPercent(errorCount, initiated),
    errorCount,
    abandonRatePct: toPercent(abandonCount, initiated),
    abandonCount,
    revenueUsd,
    revenueFormatted: formatRevenue(revenueUsd, revenueCurrency, record),
    avgCompletionTimeSeconds: record?.avg_sell_completion_time_seconds ?? null,
    avgCompletionTimeFormatted: record?.avg_sell_completion_time_formatted ?? null,
    avgInteractionsToComplete: avgInteractions,
    avgInteractionsToCompleteFormatted: formatInteractions(avgInteractions),
  }
}

export function mergeSellerKpiWithPrevious(
  current: SellerKpiValues,
  previous?: SellerKpiValues | null,
): SellerKpiValues {
  if (!previous) {
    return {
      ...current,
      previousSalesInitiated: null,
      previousSuccessRatePct: null,
      previousErrorRatePct: null,
      previousAbandonRatePct: null,
      previousRevenueUsd: null,
      previousAvgCompletionTimeSeconds: null,
      previousAvgInteractionsToComplete: null,
    }
  }

  return {
    ...current,
    previousSalesInitiated: previous.salesInitiated ?? null,
    previousSuccessRatePct: previous.successRatePct ?? null,
    previousErrorRatePct: previous.errorRatePct ?? null,
    previousAbandonRatePct: previous.abandonRatePct ?? null,
    previousRevenueUsd: previous.revenueUsd ?? null,
    previousAvgCompletionTimeSeconds: previous.avgCompletionTimeSeconds ?? null,
    previousAvgInteractionsToComplete: previous.avgInteractionsToComplete ?? null,
  }
}
