<template>
  <ChartMetricContainer
    class="checkin-container-root w-full"
    title="Check in"
    subtitle="Check-in flows, metrics by record locator and segment breakdown."
    :default-open="containerInitiallyOpen"
  >
    <div class="checkin-container__body">
      <RecordLocator
        :collapsible="false"
        :loading="effectiveRecordLocatorLoading"
        :data="effectiveRecordLocatorData"
        :is-avianca="isAvianca"
        :theme="theme"
        :enable-export="enableExport"
        :export-loading="exportLoading"
        @export="(fmt) => handleChildExport('recordLocator', fmt)"
      />
      <CheckinSegments
        :collapsible="false"
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
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
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
    containerInitiallyOpen: false,
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
