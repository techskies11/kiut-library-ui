import { describe, expect, it } from 'vitest'
import {
  buildSellerKpiFromRecord,
  mergeSellerKpiWithPrevious,
} from './buildSellerKpiFromRecord'

describe('buildSellerKpiFromRecord', () => {
  it('includes bank transfer and cash in success count when reported separately', () => {
    const result = buildSellerKpiFromRecord({
      total_seller_conversations: 10_463,
      total_sell_success: 34,
      total_sell_success_bank_transfer: 5,
      total_sell_success_cash: 3,
    })

    expect(result.successCount).toBe(42)
    expect(result.successRatePct).toBeCloseTo((42 / 10_463) * 100, 4)
  })

  it('uses total_seller_conversations for Sales Initiated (Initiated by agent)', () => {
    const result = buildSellerKpiFromRecord({
      total_seller_conversations: 10_463,
      total_sell_started: 8_092,
      total_sell_success: 34,
    })

    expect(result.salesInitiated).toBe(10_463)
  })

  it('computes abandon and errors from funnel stage gaps (Sankey aligned)', () => {
    const result = buildSellerKpiFromRecord(
      {
        total_seller_conversations: 1200,
        total_sell_started: 900,
        total_sell_booking_created: 800,
        total_sell_success: 610,
        total_value_sell_success_usd: 48920,
      },
      { total_sell_failed: 60 },
    )

    expect(result.salesInitiated).toBe(1200)
    expect(result.successCount).toBe(610)
    expect(result.successRatePct).toBeCloseTo(50.833, 2)
    expect(result.errorCount).toBe(290)
    expect(result.errorRatePct).toBeCloseTo(24.167, 2)
    expect(result.abandonCount).toBe(300)
    expect(result.abandonRatePct).toBe(25)
    expect(result.revenueUsd).toBe(48920)
    expect(result.revenueFormatted).toBe('USD 48,920')
  })

  it('matches dashboard scenario: abandon is pre-sales drop, errors are booking + completion gaps', () => {
    const result = buildSellerKpiFromRecord({
      total_seller_conversations: 3_847,
      total_sell_started: 2_910,
      total_sell_booking_created: 146,
      total_sell_success: 3,
      total_sell_success_cash: 1,
    })

    expect(result.abandonCount).toBe(937)
    expect(result.errorCount).toBe(2_906)
    expect(result.successCount).toBe(4)
  })

  it('uses explicit abandon only when funnel totals are unavailable', () => {
    const result = buildSellerKpiFromRecord({
      total_sell_started: 100,
      total_sell_success: 40,
      total_sell_abandoned: 25,
    })

    expect(result.abandonCount).toBe(25)
    expect(result.abandonRatePct).toBe(25)
  })

  it('adds bank transfer and cash USD into revenue KPI when values are split', () => {
    const result = buildSellerKpiFromRecord({
      total_seller_conversations: 100,
      total_sell_success: 3,
      total_sell_success_cash: 1,
      total_value_sell_success_usd: 430,
      total_value_sell_success_cash: [{ currency: 'USD', total_value: 50, count: 1 }],
    })

    expect(result.revenueUsd).toBe(480)
    expect(result.revenueFormatted).toBe('USD 480')
  })

  it('formats USD from currency breakdown when usd total is missing', () => {
    const result = buildSellerKpiFromRecord({
      total_sell_started: 10,
      total_value_sell_success: [{ currency: 'USD', total_value: 12500, count: 4 }],
    })

    expect(result.revenueUsd).toBe(12500)
    expect(result.revenueFormatted).toBe('USD 12,500')
  })

  it('does not fall back to other currencies when dashboard currency is missing from breakdown', () => {
    const result = buildSellerKpiFromRecord(
      {
        total_sell_started: 10,
        total_value_sell_success: [{ currency: 'MXN', total_value: 125000, count: 4 }],
      },
      undefined,
      { revenueCurrency: 'EUR' },
    )

    expect(result.revenueUsd).toBeNull()
    expect(result.revenueFormatted).toBeNull()
  })

  it('uses dashboard revenue currency instead of defaulting to USD', () => {
    const result = buildSellerKpiFromRecord(
      {
        total_seller_conversations: 100,
        total_value_sell_success: [
          { currency: 'MXN', total_value: 125000, count: 4 },
          { currency: 'USD', total_value: 430, count: 3 },
        ],
        total_value_sell_success_cash: [{ currency: 'MXN', total_value: 5000, count: 1 }],
        total_sell_success: 3,
        total_sell_success_cash: 1,
      },
      undefined,
      { revenueCurrency: 'MXN' },
    )

    expect(result.revenueUsd).toBe(130_000)
    expect(result.revenueFormatted).toBe('MXN 130,000')
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
    const current = buildSellerKpiFromRecord({
      total_seller_conversations: 1200,
      total_sell_started: 900,
      total_sell_booking_created: 800,
      total_sell_success: 610,
      total_value_sell_success_usd: 48920,
    })
    const previous = buildSellerKpiFromRecord({
      total_seller_conversations: 1067,
      total_sell_started: 800,
      total_sell_booking_created: 700,
      total_sell_success: 519,
      total_value_sell_success_usd: 45000,
    })

    const merged = mergeSellerKpiWithPrevious(current, previous)

    expect(merged.previousSalesInitiated).toBe(1067)
    expect(merged.previousSuccessRatePct).toBeCloseTo(48.64, 2)
    expect(merged.previousErrorRatePct).toBeCloseTo(24.18, 2)
    expect(merged.previousAbandonRatePct).toBeCloseTo(25.02, 2)
    expect(merged.previousRevenueUsd).toBe(45000)
    expect(merged.previousAvgInteractionsToComplete).toBeNull()
  })
})
