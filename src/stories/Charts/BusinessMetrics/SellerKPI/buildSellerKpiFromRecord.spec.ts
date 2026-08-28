import { describe, expect, it } from 'vitest'
import {
  buildSellerKpiFromRecord,
  mergeSellerKpiWithPrevious,
} from './buildSellerKpiFromRecord'

describe('buildSellerKpiFromRecord', () => {
  it('computes KPI values from seller totals and failed payload', () => {
    const result = buildSellerKpiFromRecord(
      {
        total_sell_started: 1200,
        total_sell_success: 610,
        total_value_sell_success_usd: 48920,
      },
      { total_sell_failed: 60 },
    )

    expect(result.salesInitiated).toBe(1200)
    expect(result.successCount).toBe(610)
    expect(result.successRatePct).toBeCloseTo(50.833, 2)
    expect(result.errorCount).toBe(60)
    expect(result.errorRatePct).toBeCloseTo(5)
    expect(result.abandonCount).toBe(530)
    expect(result.abandonRatePct).toBeCloseTo(44.166, 2)
    expect(result.revenueUsd).toBe(48920)
    expect(result.revenueFormatted).toBe('USD 48,920')
  })

  it('uses explicit abandon when provided', () => {
    const result = buildSellerKpiFromRecord(
      {
        total_sell_started: 100,
        total_sell_success: 40,
        total_sell_abandoned: 25,
      },
      { total_sell_failed: 10 },
    )

    expect(result.abandonCount).toBe(25)
    expect(result.abandonRatePct).toBe(25)
  })

  it('formats USD from currency breakdown when usd total is missing', () => {
    const result = buildSellerKpiFromRecord({
      total_sell_started: 10,
      total_value_sell_success: [{ currency: 'USD', total_value: 12500, count: 4 }],
    })

    expect(result.revenueUsd).toBe(12500)
    expect(result.revenueFormatted).toBe('USD 12,500')
  })

  it('formats non-USD breakdown when usd total is missing', () => {
    const result = buildSellerKpiFromRecord({
      total_sell_started: 10,
      total_value_sell_success: [{ currency: 'MXN', total_value: 125000, count: 4 }],
    })

    expect(result.revenueUsd).toBeNull()
    expect(result.revenueFormatted).toBe('MXN 125,000')
  })

  it('maps average interactions to complete with one decimal', () => {
    const result = buildSellerKpiFromRecord({
      total_sell_started: 10,
      avg_sell_interactions_to_complete: 11.24,
    })

    expect(result.avgInteractionsToComplete).toBe(11.24)
    expect(result.avgInteractionsToCompleteFormatted).toBe('11.2')
  })

  it('returns zeros when record is missing', () => {
    expect(buildSellerKpiFromRecord(undefined)).toEqual({
      salesInitiated: 0,
      successRatePct: 0,
      successCount: 0,
      errorRatePct: 0,
      errorCount: 0,
      abandonRatePct: 0,
      abandonCount: 0,
      revenueUsd: null,
      revenueFormatted: null,
      avgCompletionTimeSeconds: null,
      avgCompletionTimeFormatted: null,
      avgInteractionsToComplete: null,
      avgInteractionsToCompleteFormatted: null,
    })
  })
})

describe('mergeSellerKpiWithPrevious', () => {
  it('attaches previous period rates for trend badges', () => {
    const current = buildSellerKpiFromRecord(
      {
        total_sell_started: 1200,
        total_sell_success: 610,
        total_value_sell_success_usd: 48920,
      },
      { total_sell_failed: 60 },
    )
    const previous = buildSellerKpiFromRecord(
      {
        total_sell_started: 1067,
        total_sell_success: 519,
        total_value_sell_success_usd: 45000,
      },
      { total_sell_failed: 54 },
    )

    const merged = mergeSellerKpiWithPrevious(current, previous)

    expect(merged.previousSalesInitiated).toBe(1067)
    expect(merged.previousSuccessRatePct).toBeCloseTo(48.64, 2)
    expect(merged.previousErrorRatePct).toBeCloseTo(5.06, 2)
    expect(merged.previousAbandonRatePct).toBeCloseTo(46.3, 1)
    expect(merged.previousRevenueUsd).toBe(45000)
    expect(merged.previousAvgInteractionsToComplete).toBeNull()
  })
})
