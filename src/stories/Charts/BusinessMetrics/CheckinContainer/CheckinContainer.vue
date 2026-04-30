<template>
  <details class="checkin-container-card metric-collapsible" :open="containerInitiallyOpen">
    <summary class="card-header metric-collapsible__summary checkin-container__summary">
      <div class="header-content">
        <h2 class="card-title font-sans">Check in</h2>
        <p class="card-subtitle font-sans">Check-in flows, metrics by record locator and segment breakdown.</p>
      </div>
      <svg class="metric-collapsible__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>

    <div class="checkin-container__body">
      <RecordLocator
        :loading="effectiveRecordLocatorLoading"
        :data="effectiveRecordLocatorData"
        :is-avianca="isAvianca"
        :theme="theme"
        :enable-export="enableExport"
        :export-loading="exportLoading"
        @export="(fmt) => handleChildExport('recordLocator', fmt)"
      />
      <CheckinSegments
        :initially-open="childrenInitiallyOpen"
        :loading="effectiveSegmentsLoading"
        :data="segmentsData"
        :show-checkin="showCheckin"
        :show-checkin-metrics="showCheckinMetrics"
        :checkin-loading="effectiveCheckinLoading"
        :checkin-metrics-loading="effectiveCheckinMetricsLoading"
        :checkin-data="checkinData"
        :checkin-failed-data="checkinFailedData"
        :checkin-metrics-data="checkinMetricsData"
        :checkin-metrics-failed-data="checkinMetricsFailedData"
        :theme="theme"
        :enable-export="enableExport"
        :export-loading="exportLoading"
        @export="handleSegmentsExport"
      />
    </div>
  </details>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RecordLocator from '../RecordLocator/RecordLocator.vue'
import CheckinSegments from '../CheckinSegments/checkinSegments.vue'
import type { Theme } from '../../../../composables/useThemeDetection'
import type { ExportFormat } from '../../Utils/FooterExport'

interface SegmentDatum {
  departure_airport: string;
  conexion_airport: string;
  arrival_airport: string;
  segment_init_count: number;
  segment_started_count: number;
  segment_completed_count: number;
  segment_closed_count: number;
}

interface RecordLocatorDayData {
  date: string;
  checkin_initiated: number;
  record_locator_init_count: number;
  record_locator_started_count: number;
  record_locator_completed_count: number;
  record_locator_closed_count: number;
  record_locator_failed_count: number;
  record_locator_abandoned_count: number;
  record_locator_create_payment_count?: number;
  record_locator_create_payment_failed_count?: number;
}

interface RecordLocatorData {
  total_checkin_initiated: number;
  total_record_locator_init: number;
  total_record_locator_started: number;
  total_record_locator_completed: number;
  total_record_locator_closed: number;
  total_record_locator_failed: number;
  total_record_locator_abandoned: number;
  total_record_locator_init_abandoned: number;
  total_record_locator_init_abandoned_error?: number | null;
  total_record_locator_init_abandoned_voluntary?: number | null;
  total_checkin_pre_init_abandoned_error?: number | null;
  total_checkin_pre_init_abandoned_voluntary?: number | null;
  record_locator_by_day: RecordLocatorDayData[];
}

/** Origen dentro del grupo Check in (para rutear exports en la app consumidora). */
export type CheckinContainerExportSource = 'recordLocator' | 'checkin' | 'checkinMetrics' | 'checkinSegments'

export interface CheckinContainerExportPayload {
  source: CheckinContainerExportSource
  format: ExportFormat
}

type CheckinSegmentsExportPayload = ExportFormat | CheckinContainerExportPayload

const props = withDefaults(
  defineProps<{
    containerInitiallyOpen?: boolean
    childrenInitiallyOpen?: boolean
    /** Si es true, aplica loading a todas las vistas hijas. */
    loading?: boolean
    checkinLoading?: boolean
    checkinMetricsLoading?: boolean
    recordLocatorLoading?: boolean
    segmentsLoading?: boolean
    showCheckin?: boolean
    showCheckinMetrics?: boolean
    enableExport?: boolean
    exportLoading?: boolean
    isAvianca?: boolean
    theme?: Theme
    /** Shape Checkin.vue (métricas de flujo) */
    checkinData?: object
    checkinFailedData?: object
    /** Shape CheckinMetrics.vue */
    checkinMetricsData?: object
    checkinMetricsFailedData?: object
    /** Shape RecordLocator.vue. Si no se pasa, usa checkinMetricsData por compatibilidad. */
    recordLocatorData?: RecordLocatorData
    /** Shape CheckinSegments */
    segmentsData?: SegmentDatum[];
  }>(),
  {
    containerInitiallyOpen: true,
    childrenInitiallyOpen: true,
    loading: false,
    checkinLoading: false,
    checkinMetricsLoading: false,
    recordLocatorLoading: false,
    segmentsLoading: false,
    showCheckin: true,
    showCheckinMetrics: false,
    enableExport: false,
    exportLoading: false,
    isAvianca: false,
    theme: undefined,
  }
)

const emit = defineEmits<{
  export: [payload: CheckinContainerExportPayload]
}>()

const effectiveCheckinLoading = computed(() => props.loading || props.checkinLoading)
const effectiveCheckinMetricsLoading = computed(() => props.loading || props.checkinMetricsLoading)
const effectiveRecordLocatorLoading = computed(() => props.loading || props.recordLocatorLoading || props.checkinMetricsLoading)
const effectiveSegmentsLoading = computed(() => props.loading || props.segmentsLoading)
const effectiveRecordLocatorData = computed(() => props.recordLocatorData ?? props.checkinMetricsData as RecordLocatorData | undefined)

function handleChildExport(source: CheckinContainerExportSource, format: ExportFormat) {
  emit('export', { source, format })
}

function isContainerExportPayload(payload: CheckinSegmentsExportPayload): payload is CheckinContainerExportPayload {
  return typeof payload === 'object' && payload !== null && 'source' in payload
}

function handleSegmentsExport(payload: CheckinSegmentsExportPayload) {
  if (isContainerExportPayload(payload)) {
    emit('export', payload)
    return
  }

  handleChildExport('checkinSegments', payload)
}
</script>

<style scoped>
@import '../metric-collapsible.css';

.checkin-container-card {
  font-family: var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif), 'Inter', sans-serif;
  background: var(--kiut-bg-card-gradient);
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: var(--kiut-shadow-card);
  transition:
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.checkin-container-card:hover {
  box-shadow: var(--kiut-shadow-card-hover);
  transform: translateY(-2px);
}

.checkin-container__summary {
  margin-bottom: 0;
}

.metric-collapsible[open] .checkin-container__summary {
  margin-bottom: 20px;
}

.card-header {
  position: relative;
  text-align: left;
}

.header-content {
  width: 100%;
  text-align: left;
}

.card-title {
  font-family: 'Space Grotesk', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--kiut-primary-light), var(--kiut-primary-default));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.card-subtitle {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--kiut-text-secondary);
  margin: 0;
  line-height: 1.25rem;
}

.checkin-container__body {
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: fadeIn 0.45s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
