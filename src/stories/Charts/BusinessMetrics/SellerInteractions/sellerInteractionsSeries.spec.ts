import { describe, expect, it } from 'vitest'
import { buildSellerInteractionsSeries } from './sellerInteractionsSeries'

describe('buildSellerInteractionsSeries', () => {
  it('returns empty series when there are no numeric samples', () => {
    expect(buildSellerInteractionsSeries({})).toEqual({ dates: [], values: [] })
    expect(buildSellerInteractionsSeries({ '2026-03-01': null })).toEqual({
      dates: [],
      values: [],
    })
  })

  it('sorts dates and keeps null gaps', () => {
    expect(
      buildSellerInteractionsSeries({
        '2026-03-03': 8.2,
        '2026-03-01': 5.1,
        '2026-03-02': null,
      }),
    ).toEqual({
      dates: ['2026-03-01', '2026-03-02', '2026-03-03'],
      values: [5.1, null, 8.2],
    })
  })
})
