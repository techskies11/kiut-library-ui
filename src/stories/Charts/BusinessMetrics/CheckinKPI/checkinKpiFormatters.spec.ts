import { describe, expect, it } from 'vitest'
import {
  buildPercentTrend,
  computeChangePercent,
  formatChangeLabel,
  formatPercent,
  trendBadgeClass,
} from './checkinKpiFormatters'

describe('checkinKpiFormatters', () => {
  describe('computeChangePercent', () => {
    it('returns null when previous is null', () => {
      expect(computeChangePercent(100, null)).toBeNull()
    })

    it('returns 100 when previous is zero and current is positive', () => {
      expect(computeChangePercent(10, 0)).toBe(100)
    })

    it('computes positive change', () => {
      expect(computeChangePercent(110, 100)).toBeCloseTo(10)
    })
  })

  describe('formatChangeLabel', () => {
    it('prefixes positive values with plus sign', () => {
      expect(formatChangeLabel(8.4)).toBe('+8.4%')
    })

    it('keeps negative values as-is', () => {
      expect(formatChangeLabel(-1.3)).toBe('-1.3%')
    })
  })

  describe('trendBadgeClass', () => {
    it('marks increase as up when higher is better', () => {
      expect(trendBadgeClass(5)).toBe('change-badge--up')
    })

    it('marks increase as down when lower is better', () => {
      expect(trendBadgeClass(0.6, true)).toBe('change-badge--down')
    })

    it('marks decrease as up when lower is better', () => {
      expect(trendBadgeClass(-1.3, true)).toBe('change-badge--up')
    })
  })

  describe('buildPercentTrend', () => {
    it('builds badge for error rate increase', () => {
      const trend = buildPercentTrend(8.7, 8.1, true)
      expect(trend?.label).toBe('+7.4%')
      expect(trend?.class).toBe('change-badge--down')
    })

    it('builds badge for abandon rate decrease', () => {
      const trend = buildPercentTrend(12.8, 13.0, true)
      expect(trend?.label).toBe('-1.5%')
      expect(trend?.class).toBe('change-badge--up')
    })
  })

  describe('formatPercent', () => {
    it('formats with one decimal place', () => {
      expect(formatPercent(78.5)).toBe('78.5%')
    })
  })
})
