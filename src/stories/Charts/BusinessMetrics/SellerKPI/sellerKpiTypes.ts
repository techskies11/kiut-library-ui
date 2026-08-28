import type { Theme } from '../../../../composables/useThemeDetection'

export interface SellerKpiLabels {
  initiated?: string
  success?: string
  errors?: string
  abandon?: string
  revenue?: string
  avgCompletionTime?: string
  avgInteractionsToComplete?: string
}

export const DEFAULT_SELLER_KPI_LABELS: Required<SellerKpiLabels> = {
  initiated: 'Sales Initiated',
  success: '% Sales Success',
  errors: '% Errors',
  abandon: '% Abandon',
  revenue: 'Revenue',
  avgCompletionTime: 'Avg Completion Time',
  avgInteractionsToComplete: 'Interactions to Complete',
}

export interface SellerKpiProps {
  loading?: boolean
  theme?: Theme
  /** Custom labels for each KPI card. Unset keys use defaults. */
  labels?: SellerKpiLabels

  salesInitiated?: number
  previousSalesInitiated?: number | null

  successRatePct?: number
  successCount?: number
  previousSuccessRatePct?: number | null

  errorRatePct?: number
  errorCount?: number
  previousErrorRatePct?: number | null

  abandonRatePct?: number
  abandonCount?: number
  previousAbandonRatePct?: number | null

  revenueUsd?: number | null
  revenueFormatted?: string | null
  previousRevenueUsd?: number | null

  avgCompletionTimeSeconds?: number | null
  avgCompletionTimeFormatted?: string | null
  previousAvgCompletionTimeSeconds?: number | null

  avgInteractionsToComplete?: number | null
  avgInteractionsToCompleteFormatted?: string | null
  previousAvgInteractionsToComplete?: number | null
}
