import { describe, expect, it } from 'vitest'
import {
  computeCheckinFunnelBreakdown,
  computeCheckinVolumeDays,
  getBoardingPassFailedCount,
} from './checkinFunnelMetrics'

const collapsedPreRetrievedFunnelCheckinData = {
  airline_name: '2W',
  start_date: '2026-08-01',
  end_date: '2026-08-02',
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
  record_locator_by_day: [
    {
      date: '2026-08-01',
      checkin_initiated: 48,
      record_locator_init_count: 7,
      record_locator_started_count: 5,
      record_locator_closed_count: 1,
      record_locator_completed_count: 2,
      record_locator_abandoned_count: 0,
    },
    {
      date: '2026-08-02',
      checkin_initiated: 56,
      record_locator_init_count: 13,
      record_locator_started_count: 9,
      record_locator_closed_count: 2,
      record_locator_completed_count: 2,
      record_locator_abandoned_count: 0,
    },
  ],
}

const collapsedPreRetrievedFunnelFailedData = {
  airline_name: '2W',
  start_date: '2026-08-01',
  end_date: '2026-08-02',
  total_checkin_failed: 80,
  total_checkin_unrecovered: 51,
  failed_by_step_by_day: [
    {
      date: '2026-08-01',
      steps: [{ step_name: 'get_checkin_availability', failed_count: 24 }],
    },
    {
      date: '2026-08-02',
      steps: [
        { step_name: 'get_checkin_availability', failed_count: 37 },
        { step_name: 'assign_seat', failed_count: 4 },
      ],
    },
  ],
  unrecovered_by_step: [{ step_name: 'assign_seat', count: 51 }],
  unrecovered_by_day: [
    { date: '2026-08-01', unrecovered_count: 20 },
    { date: '2026-08-02', unrecovered_count: 31 },
  ],
}

const retrievalErrorCategoriesCheckinData = {
  ...collapsedPreRetrievedFunnelCheckinData,
  total_checkin_retrieval_user_error: 180,
  total_checkin_retrieval_business_rule: 140,
  total_checkin_retrieval_tech_error: 50,
  total_checkin_retrieval_unknown_error: 40,
}

const aviancaCheckinData = {
  airline_name: 'Avianca',
  start_date: '2026-07-28',
  end_date: '2026-07-28',
  total_checkin_initiated: 24,
  total_record_locator_init: 18,
  total_record_locator_started: 18,
  total_record_locator_completed: 2,
  total_record_locator_closed: 12,
  total_record_locator_init_abandoned: 0,
  total_record_locator_unrecovered: 1,
  record_locator_by_day: [
    {
      date: '2026-07-28',
      checkin_initiated: 24,
      record_locator_init_count: 18,
      record_locator_started_count: 18,
      record_locator_completed_count: 2,
      record_locator_closed_count: 12,
      record_locator_abandoned_count: 5,
      record_locator_create_payment_count: 2,
    },
  ],
}

const aviancaFailedData = {
  airline_name: 'Avianca',
  start_date: '2026-07-28',
  end_date: '2026-07-28',
  total_checkin_failed: 11,
  total_checkin_unrecovered: 1,
  failed_by_step_by_day: [
    {
      date: '2026-07-28',
      steps: [
        { step_name: 'choose_boardingpass', failed_count: 10 },
        { step_name: 'confirm_traveler_info', failed_count: 1 },
      ],
    },
  ],
  unrecovered_by_step: [{ step_name: 'confirm_traveler_info', count: 1 }],
  unrecovered_by_day: [{ date: '2026-07-28', unrecovered_count: 1 }],
}

function sumVolumeDays(days: ReturnType<typeof computeCheckinVolumeDays>, key: 'initiated' | 'success' | 'abandoned' | 'errors') {
  return days.reduce((total, day) => total + day[key], 0)
}

describe('computeCheckinFunnelBreakdown', () => {
  it('computes collapsed pre-retrieved funnel totals', () => {
    const funnel = computeCheckinFunnelBreakdown(
      collapsedPreRetrievedFunnelCheckinData,
      collapsedPreRetrievedFunnelFailedData,
    )

    expect(funnel).not.toBeNull()
    expect(funnel?.initiated).toBe(896)
    expect(funnel?.success).toBe(28)
    expect(funnel?.preRetrievedAbandon).toBe(338)
    expect(funnel?.preRetrievalErrors).toBe(410)
    expect(funnel?.totalAbandoned).toBe(
      funnel!.preRetrievedAbandon +
        funnel!.abandonedBeforeClosed +
        funnel!.abandonedAfterClosed,
    )
    expect(funnel?.totalErrors).toBe(
      funnel!.preRetrievalErrors + funnel!.totalUnrecovered + funnel!.bpFailed,
    )
  })

  it('uses retrieval error categories when split totals are present', () => {
    const funnel = computeCheckinFunnelBreakdown(
      retrievalErrorCategoriesCheckinData,
      collapsedPreRetrievedFunnelFailedData,
    )

    expect(funnel?.hasRetrievalErrorSplit).toBe(true)
    expect(funnel?.preRetrievalErrors).toBe(410)
    expect(funnel?.retrievalUserError).toBe(180)
    expect(funnel?.retrievalBusinessRule).toBe(140)
    expect(funnel?.retrievalTechError).toBe(50)
    expect(funnel?.retrievalUnknownError).toBe(40)
  })

  it('caps boarding pass failures and computes abandoned after closed for Avianca', () => {
    const funnel = computeCheckinFunnelBreakdown(
      aviancaCheckinData,
      aviancaFailedData,
    )

    expect(getBoardingPassFailedCount(aviancaFailedData)).toBe(10)
    expect(funnel?.bpFailed).toBe(10)
    expect(funnel?.abandonedAfterClosed).toBe(0)
    expect(funnel?.abandonedBeforeClosed).toBe(5)
    expect(funnel?.totalUnrecovered).toBe(1)
    expect(funnel?.totalErrors).toBe(11)
  })
})

describe('computeCheckinVolumeDays', () => {
  it('sums daily volume metrics to match funnel totals for the period', () => {
    const funnel = computeCheckinFunnelBreakdown(
      collapsedPreRetrievedFunnelCheckinData,
      collapsedPreRetrievedFunnelFailedData,
    )
    const days = computeCheckinVolumeDays(
      collapsedPreRetrievedFunnelCheckinData,
      collapsedPreRetrievedFunnelFailedData,
    )

    expect(sumVolumeDays(days, 'initiated')).toBe(funnel?.initiated)
    expect(sumVolumeDays(days, 'success')).toBe(funnel?.success)
    expect(sumVolumeDays(days, 'abandoned')).toBe(funnel?.totalAbandoned)
    expect(sumVolumeDays(days, 'errors')).toBe(funnel?.totalErrors)
  })

  it('includes retrieval errors in daily error totals', () => {
    const days = computeCheckinVolumeDays(
      retrievalErrorCategoriesCheckinData,
      collapsedPreRetrievedFunnelFailedData,
    )
    const funnel = computeCheckinFunnelBreakdown(
      retrievalErrorCategoriesCheckinData,
      collapsedPreRetrievedFunnelFailedData,
    )

    expect(sumVolumeDays(days, 'errors')).toBe(funnel?.totalErrors)
    expect(sumVolumeDays(days, 'errors')).toBeGreaterThan(51)
  })

  it('matches Avianca single-day success, abandoned, and error counts', () => {
    const days = computeCheckinVolumeDays(aviancaCheckinData, aviancaFailedData)
    const funnel = computeCheckinFunnelBreakdown(
      aviancaCheckinData,
      aviancaFailedData,
    )

    expect(days).toHaveLength(1)
    expect(days[0].success).toBe(12)
    expect(days[0].abandoned).toBe(funnel?.totalAbandoned)
    expect(days[0].errors).toBe(funnel?.totalErrors)
    expect(days[0].abandoned).toBe(11)
    expect(days[0].errors).toBe(11)
  })
})
