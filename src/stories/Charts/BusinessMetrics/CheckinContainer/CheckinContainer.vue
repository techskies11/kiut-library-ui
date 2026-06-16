<template>
  <ChartMetricContainer
    class="checkin-container-root w-full"
    title="Check in"
    subtitle="Check-in flows and segment breakdown."
    :default-open="containerInitiallyOpen"
    :loading="loading"
  >
    <div class="checkin-container__body">
      <Checkin
        v-if="showCheckin"
        class="w-full min-h-0"
        :collapsible="false"
        :initially-open="childrenInitiallyOpen"
        :loading="effectiveCheckinLoading"
        :checkin-data="checkinData"
        :failed-data="checkinFailedData"
        :enable-export="enableExport"
        :export-loading="exportLoading"
        @export="(fmt) => handleChildExport('checkin', fmt)"
      />
      <CheckinSegments
        :collapsible="false"
        :initially-open="childrenInitiallyOpen"
        :loading="effectiveSegmentsLoading"
        :data="segmentsData ?? []"
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
import Checkin from '../Checkin/Checkin.vue'
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

/** Origen dentro del grupo Check in (para rutear exports en la app consumidora). */
export type CheckinContainerExportSource = 'checkin' | 'checkinSegments'

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
    segmentsLoading?: boolean
    showCheckin?: boolean
    enableExport?: boolean
    exportLoading?: boolean
    theme?: Theme
    /** Shape Checkin.vue (métricas de flujo) */
    checkinData?: object
    checkinFailedData?: object
    /** Shape CheckinSegments */
    segmentsData?: SegmentDatum[];
  }>(),
  {
    containerInitiallyOpen: false,
    childrenInitiallyOpen: true,
    loading: false,
    checkinLoading: false,
    segmentsLoading: false,
    showCheckin: true,
    enableExport: false,
    exportLoading: false,
    theme: undefined,
  }
)

const emit = defineEmits<{
  export: [payload: CheckinContainerExportPayload]
}>()

const effectiveCheckinLoading = computed(() => props.loading || props.checkinLoading)
const effectiveSegmentsLoading = computed(() => props.loading || props.segmentsLoading)

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
