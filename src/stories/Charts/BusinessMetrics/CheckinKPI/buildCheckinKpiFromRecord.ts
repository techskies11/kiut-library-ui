import type { CheckinKpiProps } from './checkinKpiTypes'
import {
  computeCheckinFunnelBreakdown,
  type CheckinData,
  type FailedData,
} from '../CheckinMetrics/checkinFunnelMetrics'

export type CheckinRecordKpiShape = CheckinData & {
  total_record_locator_failed?: number
  avg_checkin_completion_time_seconds?: number | null
  avg_checkin_completion_time_formatted?: string | null
  avg_checkin_interactions_to_complete?: number | null
}

export type CheckinFailedKpiShape = FailedData

export type CheckinKpiValues = Omit<CheckinKpiProps, 'loading' | 'theme' | 'labels'>

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

export function buildCheckinKpiFromRecord(
  record?: CheckinRecordKpiShape | null,
  failed?: CheckinFailedKpiShape | null,
): CheckinKpiValues {
  const funnel = computeCheckinFunnelBreakdown(record, failed)
  const avgInteractions = record?.avg_checkin_interactions_to_complete ?? null

  const initiated = funnel?.initiated ?? record?.total_checkin_initiated ?? 0
  const closed = funnel?.success ?? record?.total_record_locator_closed ?? 0
  const abandonCount = funnel?.totalAbandoned ?? 0
  const errorCount = funnel?.totalErrors ?? 0

  return {
    checkinInitiated: initiated,
    successRatePct: toPercent(closed, initiated),
    successCount: closed,
    errorRatePct: toPercent(errorCount, initiated),
    errorCount,
    abandonRatePct: toPercent(abandonCount, initiated),
    abandonCount,
    avgCompletionTimeSeconds: record?.avg_checkin_completion_time_seconds ?? null,
    avgCompletionTimeFormatted: record?.avg_checkin_completion_time_formatted ?? null,
    avgInteractionsToComplete: avgInteractions,
    avgInteractionsToCompleteFormatted: formatInteractions(avgInteractions),
  }
}

export function mergeCheckinKpiWithPrevious(
  current: CheckinKpiValues,
  previous?: CheckinKpiValues | null,
): CheckinKpiValues {
  if (!previous) {
    return {
      ...current,
      previousCheckinInitiated: null,
      previousSuccessRatePct: null,
      previousErrorRatePct: null,
      previousAbandonRatePct: null,
      previousAvgCompletionTimeSeconds: null,
      previousAvgInteractionsToComplete: null,
    }
  }

  return {
    ...current,
    previousCheckinInitiated: previous.checkinInitiated ?? null,
    previousSuccessRatePct: previous.successRatePct ?? null,
    previousErrorRatePct: previous.errorRatePct ?? null,
    previousAbandonRatePct: previous.abandonRatePct ?? null,
    previousAvgCompletionTimeSeconds: previous.avgCompletionTimeSeconds ?? null,
    previousAvgInteractionsToComplete: previous.avgInteractionsToComplete ?? null,
  }
}
