import { describe, expect, it } from 'vitest'
import {
  buildCheckinKpiFromRecord,
  mergeCheckinKpiWithPrevious,
} from './buildCheckinKpiFromRecord'

const mockCheckinData = {
  total_record_locator_init: 1500,
  total_record_locator_started: 1420,
  total_record_locator_completed: 1380,
  total_record_locator_closed: 1350,
  total_record_locator_failed: 150,
  total_record_locator_init_abandoned: 200,
  total_checkin_pre_init_abandoned_error: 10,
  total_checkin_pre_init_abandoned_voluntary: 10,
  total_checkin_initiated: 1720,
}

const collapsedPreRetrievedFunnelCheckinData = {
  total_checkin_initiated: 896,
  total_record_locator_init: 200,
  total_record_locator_started: 148,
  total_record_locator_closed: 28,
  total_record_locator_completed: 43,
  total_record_locator_init_abandoned: 52,
  total_record_locator_init_abandoned_error: 11,
  total_record_locator_init_abandoned_voluntary: 41,
  total_checkin_pre_init_abandoned_error: 399,
  total_checkin_pre_init_abandoned_voluntary: 297,
  total_record_locator_unrecovered: 51,
}

describe('buildCheckinKpiFromRecord', () => {
  it('computes KPI values aligned with check-in funnel totals', () => {
    const result = buildCheckinKpiFromRecord(mockCheckinData, {
      total_checkin_failed: 150,
      failed_by_step_by_day: [],
    })

    expect(result.checkinInitiated).toBe(1720)
    expect(result.successCount).toBe(1350)
    expect(result.successRatePct).toBeCloseTo(78.488, 2)
    expect(result.abandonCount).toBe(280)
    expect(result.abandonRatePct).toBeCloseTo(16.279, 2)
    expect(result.errorCount).toBe(10)
    expect(result.errorRatePct).toBeCloseTo(0.581, 2)
  })

  it('maps average interactions to complete with one decimal', () => {
    const result = buildCheckinKpiFromRecord({
      total_checkin_initiated: 10,
      avg_checkin_interactions_to_complete: 7.42,
    })

    expect(result.avgInteractionsToComplete).toBe(7.42)
    expect(result.avgInteractionsToCompleteFormatted).toBe('7.4')
  })

  it('uses Sankey-aligned abandon and error totals for collapsed funnel data', () => {
    const result = buildCheckinKpiFromRecord(
      collapsedPreRetrievedFunnelCheckinData,
      { failed_by_step_by_day: [] },
    )

    expect(result.checkinInitiated).toBe(896)
    expect(result.successCount).toBe(28)
    expect(result.abandonCount).toBe(407)
    expect(result.errorCount).toBe(461)
    expect(result.abandonRatePct).toBeCloseTo(45.424, 2)
    expect(result.errorRatePct).toBeCloseTo(51.451, 2)
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
      ...mockCheckinData,
      total_checkin_initiated: 1720,
      total_record_locator_closed: 1350,
    })
    const previous = buildCheckinKpiFromRecord({
      ...mockCheckinData,
      total_checkin_initiated: 1587,
      total_record_locator_closed: 1219,
      total_record_locator_started: 1300,
      total_record_locator_init: 1400,
    })

    const merged = mergeCheckinKpiWithPrevious(current, previous)

    expect(merged.previousCheckinInitiated).toBe(1587)
    expect(merged.previousSuccessRatePct).toBeCloseTo(76.81, 2)
    expect(merged.previousErrorRatePct).toBe(previous.errorRatePct)
    expect(merged.previousAbandonRatePct).toBe(previous.abandonRatePct)
    expect(merged.previousAvgInteractionsToComplete).toBeNull()
  })
})
