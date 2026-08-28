import type { SellerKpiProps } from './sellerKpiTypes'

export interface SellerCurrencyBreakdown {
  currency: string
  total_value: number
  count?: number
}

export interface SellerRecordKpiShape {
  total_sell_started?: number
  total_sell_success?: number
  total_sell_success_bank_transfer?: number
  total_sell_success_cash?: number
  total_sell_abandoned?: number
  total_value_sell_success?: number | SellerCurrencyBreakdown[]
  total_value_sell_success_usd?: number
  avg_sell_completion_time_seconds?: number | null
  avg_sell_completion_time_formatted?: string | null
  avg_sell_interactions_to_complete?: number | null
}

export interface SellerFailedKpiShape {
  total_sell_failed?: number
}

export type SellerKpiValues = Omit<SellerKpiProps, 'loading' | 'theme' | 'labels'>

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

function formatUsd(value: number): string {
  return `USD ${formatAmount(value)}`
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

function resolveRevenueUsd(record?: SellerRecordKpiShape | null): number | null {
  if (typeof record?.total_value_sell_success_usd === 'number') {
    return record.total_value_sell_success_usd
  }
  const usd = currencyBreakdown(record?.total_value_sell_success).find(
    (item) => item.currency.toUpperCase() === 'USD',
  )
  return usd ? usd.total_value : null
}

function formatRevenue(
  usd: number | null,
  record?: SellerRecordKpiShape | null,
): string | null {
  if (usd !== null) return formatUsd(usd)
  const items = currencyBreakdown(record?.total_value_sell_success)
  if (!items.length) return null
  return items.map((item) => `${item.currency} ${formatAmount(item.total_value)}`).join(' · ')
}

export function buildSellerKpiFromRecord(
  record?: SellerRecordKpiShape | null,
  failed?: SellerFailedKpiShape | null,
): SellerKpiValues {
  const initiated = record?.total_sell_started ?? 0
  const success = record?.total_sell_success ?? 0
  const failedCount = failed?.total_sell_failed ?? 0
  const abandon =
    record?.total_sell_abandoned ?? Math.max(0, initiated - success - failedCount)
  const avgInteractions = record?.avg_sell_interactions_to_complete ?? null
  const revenueUsd = resolveRevenueUsd(record)

  return {
    salesInitiated: initiated,
    successRatePct: toPercent(success, initiated),
    successCount: success,
    errorRatePct: toPercent(failedCount, initiated),
    errorCount: failedCount,
    abandonRatePct: toPercent(abandon, initiated),
    abandonCount: abandon,
    revenueUsd,
    revenueFormatted: formatRevenue(revenueUsd, record),
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
