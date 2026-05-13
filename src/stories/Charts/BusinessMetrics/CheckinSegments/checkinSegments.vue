<template>
  <ChartMetricContainer
    class="checkin-segments-root h-full min-h-0"
    title="Checkin Segments"
    subtitle="Breakdown by flight segment with connection when applicable"
    :collapsible="collapsible"
    :default-open="initiallyOpen"
  >
    <template
      v-if="enableExport && !props.loading && props.data.length > 0"
      #headerExport
    >
      <FooterExport
        variant="inline"
        @export="handleExport"
        :loading="exportLoading"
      />
    </template>
    <!-- Loading State con animación CSS personalizada -->
    <div class="loading-state" v-if="props.loading">
      <div class="loading-container">
        <div class="chart-flow-loader">
          <div class="flow-line flow-1"></div>
          <div class="flow-line flow-2"></div>
          <div class="flow-line flow-3"></div>
          <div class="flow-line flow-4"></div>
          <div class="flow-line flow-5"></div>
        </div>
        <p class="loading-text">Loading segment data...</p>
      </div>
    </div>

    <!-- Content when loaded -->
    <div v-else class="card-body">
      <section v-if="props.data.length > 0" class="checkin-segments-daily-section">
        <div class="w-full min-w-0">
          <Table
            :columns="tableColumns"
            :rows="tableRows"
            :max-visible-rows="3"
            row-key="id"
          >
            <template #cell-departure="{ row }">
              <span class="segment-plain">{{ formatAirport(row.departure_airport as string) }}</span>
            </template>
            <template #cell-connection="{ row }">
              <span
                class="segment-plain"
                :class="{
                  'segment-plain--muted': formatAirport(row.conexion_airport as string) === '-'
                }"
              >
                {{ formatAirport(row.conexion_airport as string) }}
              </span>
            </template>
            <template #cell-arrival="{ row }">
              <span class="segment-plain">{{ formatAirport(row.arrival_airport as string) }}</span>
            </template>
            <template #cell-trip="{ row }">
              <span class="segment-plain">
                {{ isRoundtrip(row as unknown as SegmentData) ? 'Roundtrip' : 'One way' }}
              </span>
            </template>
            <template #cell-init="{ row }">
              {{ useNumberFormat(row.segment_init_count as number) }}
            </template>
            <template #cell-started="{ row }">
              <span class="percentage-value">{{ calculatePercentage(row.segment_started_count as number, row.segment_init_count as number) }}</span>
            </template>
            <template #cell-completed="{ row }">
              <span class="percentage-value">{{ calculatePercentage(row.segment_completed_count as number, row.segment_init_count as number) }}</span>
            </template>
            <template #cell-closed="{ row }">
              <span class="percentage-value success">{{ calculatePercentage(row.segment_closed_count as number, row.segment_init_count as number) }}</span>
            </template>
          </Table>
        </div>
      </section>

      <!-- Empty State -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="empty-title">No segment data available</p>
          <p class="empty-description">No flight segment data found for the selected period. Try adjusting the date range.</p>
        </div>
      </section>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'
import Table, { type TableColumn } from '../../Utils/Table/Table.vue'

interface SegmentData {
  departure_airport: string;
  conexion_airport: string;
  arrival_airport: string;
  segment_init_count: number;
  segment_started_count: number;
  segment_completed_count: number;
  segment_closed_count: number;
}

const props = withDefaults(defineProps<{
  data?: SegmentData[];
  loading?: boolean;
  /** Initial expanded state for the collapsible card */
  initiallyOpen?: boolean;
  /** Si es false, el card siempre abierto sin chevron (p. ej. dentro de CheckinContainer). */
  collapsible?: boolean;
  theme?: Theme;
  enableExport?: boolean;
  exportLoading?: boolean;
}>(), {
  data: () => [],
  loading: false,
  initiallyOpen: false,
  collapsible: true,
  theme: undefined,
  enableExport: false,
  exportLoading: false
})

const emit = defineEmits<{
  export: [format: ExportFormat]
}>()

const handleExport = (format: ExportFormat) => {
  emit('export', format)
}

// Theme detection with prop fallback
const { isDark } = useThemeDetection(toRef(props, 'theme'))

const tableColumns: TableColumn[] = [
  { key: 'departure', label: 'Departure', align: 'center' },
  { key: 'connection', label: 'Connection', align: 'center' },
  { key: 'arrival', label: 'Arrival', align: 'center' },
  { key: 'trip', label: 'Trip', align: 'center' },
  { key: 'init', label: 'Init', align: 'center' },
  { key: 'started', label: 'Started (%)', align: 'center' },
  { key: 'completed', label: 'Completed (%)', align: 'center' },
  { key: 'closed', label: 'Closed (%)', align: 'center' },
]

const tableRows = computed((): Record<string, unknown>[] =>
  props.data.map((row, idx) => ({
    id: `segment-${idx}-${row.departure_airport}-${row.arrival_airport}-${row.segment_init_count}-${row.segment_started_count}`,
    departure_airport: row.departure_airport,
    conexion_airport: row.conexion_airport,
    arrival_airport: row.arrival_airport,
    segment_init_count: row.segment_init_count,
    segment_started_count: row.segment_started_count,
    segment_completed_count: row.segment_completed_count,
    segment_closed_count: row.segment_closed_count,
  }))
)

const calculatePercentage = (value: number, total: number): string => {
  if (!total || total === 0 || !value) return '0%'
  return `${Math.round((value / total) * 100)}%`
}

const formatAirport = (value: string | null | undefined): string => {
  if (!value || value === 'None') return '-'
  const str = String(value).trim()
  // Remove suffix like _0, _1, _23 at the end
  return str.replace(/_[0-9]+$/i, '')
}

const isRoundtrip = (row: SegmentData): boolean => {
  const dep = formatAirport(row?.departure_airport)
  const arr = formatAirport(row?.arrival_airport)
  if (dep === '-' || arr === '-') return false
  return dep === arr
}

// Expose isDark for potential use in templates
defineExpose({ isDark })
</script>

<style scoped>
/* Card Body */
.card-body {
  animation: fadeIn 0.5s ease-out;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Bloque tabla segmentos (chrome de <table>: Utils/Table) */
.checkin-segments-daily-section {
  animation: fadeIn 0.5s ease-out;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Celdas de aeropuerto / tipo de viaje sin pills */
.segment-plain {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--kiut-text-primary);
}

.segment-plain--muted {
  color: var(--kiut-text-muted);
}
/* Percentage Value */
.percentage-value {
  font-weight: 500;
  color: var(--kiut-text-secondary);
}

.percentage-value.success {
  color: var(--kiut-success);
  font-weight: 600;
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
}

.empty-state-content {
  text-align: center;
  max-width: 360px;
  animation: fadeIn 0.6s ease-out;
}

.empty-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: var(--kiut-bg-empty-icon);
  border-radius: 20px;
  margin: 0 auto 20px;
  box-shadow: var(--kiut-shadow-empty-icon);
}

.empty-icon {
  width: 40px;
  height: 40px;
  color: var(--kiut-primary);
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--kiut-text-primary);
  margin: 0 0 8px 0;
  letter-spacing: -0.01em;
}

.empty-description {
  font-size: 14px;
  font-weight: 400;
  color: var(--kiut-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Loading State */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.chart-flow-loader {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
  height: 100px;
  margin-bottom: 24px;
}

.flow-line {
  width: 10px;
  background: linear-gradient(to top, var(--kiut-primary-light) 0%, var(--kiut-primary) 50%, var(--kiut-primary-hover) 100%);
  border-radius: 5px;
  animation: wave 1.5s ease-in-out infinite;
  box-shadow: var(--kiut-shadow-loader);
}

.flow-1 { height: 35%; animation-delay: 0s; }
.flow-2 { height: 55%; animation-delay: 0.1s; }
.flow-3 { height: 75%; animation-delay: 0.2s; }
.flow-4 { height: 55%; animation-delay: 0.3s; }
.flow-5 { height: 45%; animation-delay: 0.4s; }

.loading-text {
  font-size: 15px;
  font-weight: 500;
  color: var(--kiut-text-secondary);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  letter-spacing: -0.01em;
}

/* Animations */
@keyframes wave {
  0%, 100% {
    transform: scaleY(1);
    opacity: 0.7;
  }
  50% {
    transform: scaleY(1.6);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .airport-badge {
    padding: 4px 8px;
    font-size: 0.75rem;
  }

  .trip-badge {
    padding: 4px 8px;
    font-size: 0.7rem;
  }
}
</style>
