import { describe, expect, it } from 'vitest'
import {
  buildSellerCompletionTimeSeries,
  secondsToMinutes,
} from './sellerCompletionTimeSeries'

describe('buildSellerCompletionTimeSeries', () => {
  it('returns empty series when there are no numeric samples', () => {
    expect(buildSellerCompletionTimeSeries({})).toEqual({ dates: [], seconds: [] })
    expect(buildSellerCompletionTimeSeries({ '2026-03-01': null })).toEqual({
      dates: [],
      seconds: [],
    })
  })

  it('sorts dates and keeps null gaps', () => {
    expect(
      buildSellerCompletionTimeSeries({
        '2026-03-03': 180,
        '2026-03-01': 90,
        '2026-03-02': null,
      }),
    ).toEqual({
      dates: ['2026-03-01', '2026-03-02', '2026-03-03'],
      seconds: [90, null, 180],
    })
  })
})

describe('secondsToMinutes', () => {
  it('converts seconds to two-decimal minutes', () => {
    expect(secondsToMinutes(90)).toBe(1.5)
    expect(secondsToMinutes(null)).toBeNull()
  })
})
