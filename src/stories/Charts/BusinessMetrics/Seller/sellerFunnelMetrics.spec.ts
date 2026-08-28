import { describe, expect, it } from 'vitest'
import {
  computeSalesVolumeDays,
  computeSellerFunnelBreakdown,
} from './sellerFunnelMetrics'

const mockSellerData = {
  total_seller_conversations: 5000,
  total_sell_started: 4200,
  total_sell_get_quote: 3500,
  total_sell_booking_created: 2800,
  total_sell_success: 2400,
  total_value_sell_success: 1250000,
  seller_by_day: [
    {
      date: '2024-11-01',
      seller_conversations: 180,
      sell_started_count: 150,
      sell_get_quote_count: 125,
      sell_booking_created_count: 100,
      sell_success_count: 85,
      daily_value_sell_success: 42500,
    },
    {
      date: '2024-11-02',
      seller_conversations: 165,
      sell_started_count: 140,
      sell_get_quote_count: 115,
      sell_booking_created_count: 92,
      sell_success_count: 78,
      daily_value_sell_success: 39000,
    },
    {
      date: '2024-11-03',
      seller_conversations: 195,
      sell_started_count: 165,
      sell_get_quote_count: 140,
      sell_booking_created_count: 112,
      sell_success_count: 96,
      daily_value_sell_success: 48000,
    },
  ],
}

const mockFailedData = {
  total_sell_failed: 400,
  failed_by_reason_by_day: [
    {
      date: '2024-11-01',
      reasons: [
        { reason: 'payment_processing', failed_count: 8 },
        { reason: 'seat_selection', failed_count: 5 },
        { reason: 'timeout', failed_count: 2 },
      ],
    },
    {
      date: '2024-11-02',
      reasons: [
        { reason: 'payment_processing', failed_count: 6 },
        { reason: 'booking_validation', failed_count: 4 },
        { reason: 'system_error', failed_count: 4 },
      ],
    },
    {
      date: '2024-11-03',
      reasons: [
        { reason: 'payment_processing', failed_count: 10 },
        { reason: 'flight_availability', failed_count: 4 },
        { reason: 'passenger_data', failed_count: 2 },
      ],
    },
  ],
}

function sumVolumeDays(
  days: ReturnType<typeof computeSalesVolumeDays>,
  key: 'initiated' | 'success' | 'abandoned' | 'errors',
) {
  return days.reduce((total, day) => total + day[key], 0)
}

describe('computeSellerFunnelBreakdown', () => {
  it('computes seller funnel totals aligned with Sankey categories', () => {
    const funnel = computeSellerFunnelBreakdown(mockSellerData, mockFailedData)

    expect(funnel).not.toBeNull()
    expect(funnel?.initiated).toBe(5000)
    expect(funnel?.success).toBe(2400)
    expect(funnel?.droppedBeforeSales).toBe(800)
    expect(funnel?.failedAtBooking).toBe(1400)
    expect(funnel?.failedAtCompletion).toBe(400)
    expect(funnel?.totalAbandoned).toBe(800)
    expect(funnel?.totalErrors).toBe(1800)
  })

  it('includes payment method success channels in total success', () => {
    const funnel = computeSellerFunnelBreakdown(
      {
        ...mockSellerData,
        total_sell_success: 100,
        total_sell_success_bank_transfer: 20,
        total_sell_success_cash: 10,
      },
      mockFailedData,
    )

    expect(funnel?.success).toBe(130)
    expect(funnel?.failedAtCompletion).toBe(
      mockSellerData.total_sell_booking_created - 130,
    )
  })
})

describe('computeSalesVolumeDays', () => {
  it('sums daily volume metrics to match funnel totals for the period', () => {
    const funnel = computeSellerFunnelBreakdown(mockSellerData, mockFailedData)
    const days = computeSalesVolumeDays(mockSellerData, mockFailedData)

    expect(sumVolumeDays(days, 'abandoned')).toBe(funnel?.totalAbandoned)
    expect(sumVolumeDays(days, 'errors')).toBe(funnel?.totalErrors)
  })

  it('uses funnel errors instead of only failed reason counts for a day', () => {
    const days = computeSalesVolumeDays(mockSellerData, mockFailedData)
    const dayOne = days.find((day) => day.date === '2024-11-01')

    expect(dayOne?.success).toBe(85)
    expect(dayOne?.abandoned).toBeGreaterThan(0)
    expect(dayOne?.errors).toBeGreaterThan(15)
  })

  it('matches exact single-day metrics when daily data covers the full period', () => {
    const singleDaySellerData = {
      ...mockSellerData,
      total_seller_conversations: 180,
      total_sell_started: 150,
      total_sell_booking_created: 100,
      total_sell_success: 85,
      seller_by_day: [mockSellerData.seller_by_day[0]],
    }
    const singleDayFailedData = {
      total_sell_failed: 65,
      failed_by_reason_by_day: [mockFailedData.failed_by_reason_by_day[0]],
    }

    const days = computeSalesVolumeDays(singleDaySellerData, singleDayFailedData)

    expect(days).toHaveLength(1)
    expect(days[0].initiated).toBe(180)
    expect(days[0].success).toBe(85)
    expect(days[0].abandoned).toBe(30)
    expect(days[0].errors).toBe(65)
  })
})
