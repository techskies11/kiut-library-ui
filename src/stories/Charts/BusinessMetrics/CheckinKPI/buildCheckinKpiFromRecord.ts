import type { CheckinKpiProps } from './checkinKpiTypes'

export interface CheckinRecordKpiShape {
  total_checkin_initiated?: number
  total_record_locator_closed?: number
  total_record_locator_failed?: number
  total_record_locator_init_abandoned?: number
  total_checkin_pre_init_abandoned_error?: number
  total_checkin_pre_init_abandoned_voluntary?: number
  avg_checkin_completion_time_seconds?: number | null
  avg_checkin_completion_time_formatted?: string | null
}

export interface CheckinFailedKpiShape {
  total_checkin_failed?: number
}

export type CheckinKpiValues = Omit<CheckinKpiProps, 'loading' | 'theme' | 'labels'>

function toPercent(count: number, initiated: number): number {
  if (!initiated) return 0
  return (count / initiated) * 100
}

export function buildCheckinKpiFromRecord(
  record?: CheckinRecordKpiShape | null,
  failed?: CheckinFailedKpiShape | null,
): CheckinKpiValues {
  const initiated = record?.total_checkin_initiated ?? 0
  const closed = record?.total_record_locator_closed ?? 0
  const failedCount =
    record?.total_record_locator_failed ?? failed?.total_checkin_failed ?? 0
  const abandon =
    (record?.total_checkin_pre_init_abandoned_error ?? 0) +
    (record?.total_checkin_pre_init_abandoned_voluntary ?? 0) +
    (record?.total_record_locator_init_abandoned ?? 0)

  return {
    checkinInitiated: initiated,
    successRatePct: toPercent(closed, initiated),
    successCount: closed,
    errorRatePct: toPercent(failedCount, initiated),
    errorCount: failedCount,
    abandonRatePct: toPercent(abandon, initiated),
    abandonCount: abandon,
    avgCompletionTimeSeconds: record?.avg_checkin_completion_time_seconds ?? null,
    avgCompletionTimeFormatted: record?.avg_checkin_completion_time_formatted ?? null,
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
    }
  }

  return {
    ...current,
    previousCheckinInitiated: previous.checkinInitiated ?? null,
    previousSuccessRatePct: previous.successRatePct ?? null,
    previousErrorRatePct: previous.errorRatePct ?? null,
    previousAbandonRatePct: previous.abandonRatePct ?? null,
    previousAvgCompletionTimeSeconds: previous.avgCompletionTimeSeconds ?? null,
  }
}
