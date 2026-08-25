import { describe, expect, it } from 'vitest'
import {
  buildCheckinKpiFromRecord,
  mergeCheckinKpiWithPrevious,
} from './buildCheckinKpiFromRecord'

describe('buildCheckinKpiFromRecord', () => {
  it('computes KPI values from record locator totals', () => {
    const result = buildCheckinKpiFromRecord({
      total_checkin_initiated: 1720,
      total_record_locator_closed: 1350,
      total_record_locator_failed: 150,
      total_record_locator_init_abandoned: 200,
      total_checkin_pre_init_abandoned_error: 10,
      total_checkin_pre_init_abandoned_voluntary: 10,
    })

    expect(result.checkinInitiated).toBe(1720)
    expect(result.successCount).toBe(1350)
    expect(result.successRatePct).toBeCloseTo(78.488, 2)
    expect(result.errorCount).toBe(150)
    expect(result.errorRatePct).toBeCloseTo(8.72, 2)
    expect(result.abandonCount).toBe(220)
    expect(result.abandonRatePct).toBeCloseTo(12.79, 2)
  })

  it('maps average interactions to complete with one decimal', () => {
    const result = buildCheckinKpiFromRecord({
      total_checkin_initiated: 10,
      avg_checkin_interactions_to_complete: 7.42,
    })

    expect(result.avgInteractionsToComplete).toBe(7.42)
    expect(result.avgInteractionsToCompleteFormatted).toBe('7.4')
  })

  it('falls back to failed payload when record has no failed total', () => {
    const result = buildCheckinKpiFromRecord(
      { total_checkin_initiated: 100, total_record_locator_closed: 80 },
      { total_checkin_failed: 12 },
    )

    expect(result.errorCount).toBe(12)
    expect(result.errorRatePct).toBeCloseTo(12)
  })

  it('returns zeros when record is missing', () => {
    expect(buildCheckinKpiFromRecord(undefined)).toEqual({
      checkinInitiated: 0,
      successRatePct: 0,
      successCount: 0,
      errorRatePct: 0,
      errorCount: 0,
      abandonRatePct: 0,
      abandonCount: 0,
      avgCompletionTimeSeconds: null,
      avgCompletionTimeFormatted: null,
      avgInteractionsToComplete: null,
      avgInteractionsToCompleteFormatted: null,
    })
  })
})

describe('mergeCheckinKpiWithPrevious', () => {
  it('attaches previous period rates for trend badges', () => {
    const current = buildCheckinKpiFromRecord({
      total_checkin_initiated: 1720,
      total_record_locator_closed: 1350,
      total_record_locator_failed: 150,
      total_record_locator_init_abandoned: 220,
    })
    const previous = buildCheckinKpiFromRecord({
      total_checkin_initiated: 1587,
      total_record_locator_closed: 1219,
      total_record_locator_failed: 136,
      total_record_locator_init_abandoned: 206,
    })

    const merged = mergeCheckinKpiWithPrevious(current, previous)

    expect(merged.previousCheckinInitiated).toBe(1587)
    expect(merged.previousSuccessRatePct).toBeCloseTo(76.81, 2)
    expect(merged.previousErrorRatePct).toBeCloseTo(8.57, 2)
    expect(merged.previousAbandonRatePct).toBeCloseTo(12.98, 2)
    expect(merged.previousAvgInteractionsToComplete).toBeNull()
  })
})
