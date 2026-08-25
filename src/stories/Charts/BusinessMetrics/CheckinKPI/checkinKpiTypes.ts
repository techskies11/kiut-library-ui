import type { Theme } from '../../../../composables/useThemeDetection'

export interface CheckinKpiLabels {
  initiated?: string
  success?: string
  errors?: string
  abandon?: string
  avgCompletionTime?: string
}

export const DEFAULT_CHECKIN_KPI_LABELS: Required<CheckinKpiLabels> = {
  initiated: 'Check-in Initiated',
  success: '% Check-in Success',
  errors: '% Errors',
  abandon: '% Abandon',
  avgCompletionTime: 'Avg completion time',
}

export interface CheckinKpiProps {
  loading?: boolean
  theme?: Theme
  /** Custom labels for each KPI card. Unset keys use defaults. */
  labels?: CheckinKpiLabels

  checkinInitiated?: number
  previousCheckinInitiated?: number | null

  successRatePct?: number
  successCount?: number
  previousSuccessRatePct?: number | null

  errorRatePct?: number
  errorCount?: number
  previousErrorRatePct?: number | null

  abandonRatePct?: number
  abandonCount?: number
  previousAbandonRatePct?: number | null

  avgCompletionTimeSeconds?: number | null
  avgCompletionTimeFormatted?: string | null
  previousAvgCompletionTimeSeconds?: number | null
}
