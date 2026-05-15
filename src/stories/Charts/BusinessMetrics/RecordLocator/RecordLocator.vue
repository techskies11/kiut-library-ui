<template>
  <ChartMetricContainer
    class="record-locator-root h-full min-h-0"
    title="Checkin by Record Locator Metrics"
    subtitle="Checkin by record locator retrieval and completion analysis"
    :collapsible="collapsible"
  >
    <template
      v-if="enableExport && !props.loading"
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
        <p class="loading-text">Loading record locator data...</p>
      </div>
    </div>

    <!-- Content when loaded -->
    <div v-else class="card-body">
      <!-- Sankey Flow Chart -->
      <section v-if="sankeyData.nodes.length > 0" class="chart-section">
        <div class="chart-wrapper">
          <SankeyChart
            :data="sankeyData"
            :height="'500px'"
            :node-colors="sankeyNodeColors"
            :use-gradient="false"
            :node-gap="30"
          />
        </div>
      </section>

      <!-- Table Data (chrome: Utils/Table) -->
      <section v-if="tableData && tableData.length > 0" class="record-locator-daily-section">
        <div class="w-full min-w-0">
          <Table
            :columns="recordLocatorColumns"
            :rows="recordLocatorTableRows"
            :max-visible-rows="3"
            row-key="id"
          >
            <template #cell-date="{ row }">
              <span class="cell-plain font-medium">{{ moment(String(row.date)).format('MMM DD') }}</span>
            </template>
            <template #cell-checkinInit="{ row }">
              <span class="cell-plain text-center">{{ useNumberFormat(row.checkin_initiated as number) }}</span>
            </template>
            <template #cell-bookingRetrieve="{ row }">
              <span class="cell-plain text-center">{{ formatValueWithPercentage(row.record_locator_init_count as number, row.checkin_initiated as number) }}</span>
            </template>
            <template #cell-checkinStarted="{ row }">
              <span class="cell-plain text-center">{{ useNumberFormat(row.record_locator_started_count as number) }}</span>
            </template>
            <template #cell-checkinCompleted="{ row }">
              <span class="cell-plain text-center">{{ formatValueWithPercentage(row.record_locator_completed_count as number, row.record_locator_started_count as number) }}</span>
            </template>
            <template #cell-checkinClosed="{ row }">
              <span class="cell-plain text-center success-value">{{ formatValueWithPercentage(row.record_locator_closed_count as number, row.record_locator_started_count as number) }}</span>
            </template>
            <template #cell-checkinFailed="{ row }">
              <span class="cell-plain text-center failed-value">{{ formatValueWithPercentage(row.record_locator_failed_count as number, row.record_locator_started_count as number) }}</span>
            </template>
            <template #cell-abandoned="{ row }">
              <span class="cell-plain text-center warning-value">{{ formatValueWithPercentage(row.record_locator_abandoned_count as number, row.record_locator_started_count as number) }}</span>
            </template>
            <template #cell-createPayment="{ row }">
              <span class="cell-plain text-center">{{ useNumberFormat((row.record_locator_create_payment_count as number) ?? 0) }}</span>
            </template>
            <template #cell-failedPayment="{ row }">
              <span class="cell-plain text-center failed-value">{{ useNumberFormat((row.record_locator_create_payment_failed_count as number) ?? 0) }}</span>
            </template>
          </Table>
        </div>
      </section>

      <!-- Empty State -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <p class="empty-title">No record locator data available</p>
          <p class="empty-description">No record locator data found for the selected period. Try adjusting the date range.</p>
        </div>
      </section>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import moment from 'moment'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import SankeyChart from '../../Sankey/SankeyChart.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'
import Table, { type TableColumn } from '../../Utils/Table/Table.vue'

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

const props = withDefaults(defineProps<{
  data?: RecordLocatorData;
  loading?: boolean;
  isAvianca?: boolean;
  theme?: Theme;
  enableExport?: boolean;
  exportLoading?: boolean;
  /** Si es false, el card siempre abierto sin chevron (p. ej. dentro de CheckinContainer). */
  collapsible?: boolean;
}>(), {
  data: () => ({
    total_checkin_initiated: 0,
    total_record_locator_init: 0,
    total_record_locator_started: 0,
    total_record_locator_completed: 0,
    total_record_locator_closed: 0,
    total_record_locator_failed: 0,
    total_record_locator_abandoned: 0,
    total_record_locator_init_abandoned: 0,
    total_record_locator_init_abandoned_error: null,
    total_record_locator_init_abandoned_voluntary: null,
    total_checkin_pre_init_abandoned_error: null,
    total_checkin_pre_init_abandoned_voluntary: null,
    record_locator_by_day: [],
  }),
  loading: false,
  isAvianca: false,
  theme: undefined,
  enableExport: false,
  exportLoading: false,
  collapsible: true,
})

const emit = defineEmits<{
  export: [format: ExportFormat]
}>()

const handleExport = (format: ExportFormat) => {
  emit('export', format)
}

// Theme detection with prop fallback
const { isDark } = useThemeDetection(toRef(props, 'theme'))

// Computed para ordenar los datos por día
const tableData = computed(() => {
  if (!props.data?.record_locator_by_day) return []
  return [...props.data.record_locator_by_day].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
})

const baseRecordLocatorColumns: TableColumn[] = [
  { key: 'date', label: 'Date', align: 'center' },
  { key: 'checkinInit', label: 'Checkin Init', align: 'center' },
  { key: 'bookingRetrieve', label: 'Booking Retrieve (%)', align: 'center' },
  { key: 'checkinStarted', label: 'Checkin Started', align: 'center' },
  { key: 'checkinCompleted', label: 'Checkin Completed (%)', align: 'center' },
  { key: 'checkinClosed', label: 'Checkin Closed (%)', align: 'center' },
  { key: 'checkinFailed', label: 'Checkin Failed (%)', align: 'center' },
  { key: 'abandoned', label: 'Abandoned (%)', align: 'center' },
]

const aviancaExtraColumns: TableColumn[] = [
  { key: 'createPayment', label: 'Create Payment', align: 'center' },
  { key: 'failedPayment', label: 'Failed Payment', align: 'center' },
]

const recordLocatorColumns = computed(() =>
  props.isAvianca ? [...baseRecordLocatorColumns, ...aviancaExtraColumns] : baseRecordLocatorColumns
)

const recordLocatorTableRows = computed((): Record<string, unknown>[] =>
  tableData.value.map((row) => ({
    id: row.date,
    date: row.date,
    checkin_initiated: row.checkin_initiated,
    record_locator_init_count: row.record_locator_init_count,
    record_locator_started_count: row.record_locator_started_count,
    record_locator_completed_count: row.record_locator_completed_count,
    record_locator_closed_count: row.record_locator_closed_count,
    record_locator_failed_count: row.record_locator_failed_count,
    record_locator_abandoned_count: row.record_locator_abandoned_count,
    record_locator_create_payment_count: row.record_locator_create_payment_count,
    record_locator_create_payment_failed_count: row.record_locator_create_payment_failed_count,
  }))
)

const recordLocatorData = computed(() => props.data)

// Computed para colores dinámicos del Sankey
const sankeyNodeColors = computed(() => ({
  // Main flow progression - from blue to cyan to green
  'Checkin Init': '#93C5FD', // Blue for started state
  'Booking retrive': '#67E8F9', // Light cyan
  'Checkin Started': '#22D3EE', // Medium cyan
  'Checkin Completed': '#A7F3D0', // Light green
  'Checkin Closed': '#7BE39E', // Green for success

  // Abandoned states
  'Abandoned (Init)': '#FACC15',
  'Booking not retreived': '#F87171',
  'Abandoned (Started)': '#FACC15',
  'Error': '#F87171',
  'Abandoned (Flow)': '#FACC15',

  // Failed states
  'Checkin Failed': '#F87171', // Medium red for main failed node
}))

const calculatePercentage = (value: number, total: number): string => {
  if (!total || total === 0) return '0%'
  return `${Math.round((value / total) * 100)}%`
}

const formatValueWithPercentage = (value: number, total: number): string => {
  const formattedValue = useNumberFormat(value)
  const percentage = calculatePercentage(value, total)
  return `${formattedValue} (${percentage})`
}


// Computed para generar datos del Sankey
const sankeyData = computed(() => {
  const nodes: { name: string }[] = []
  const links: { source: string; target: string; value: number; label: string }[] = []
  const nodeNames = new Set<string>()
  const addNode = (name: string): void => {
    if (!nodeNames.has(name)) {
      nodes.push({ name })
      nodeNames.add(name)
    }
  }

  if (!recordLocatorData.value.total_checkin_initiated) {
    return { nodes, links }
  }

  // Nodos principales del flujo
  addNode('Checkin Init')
  addNode('Booking retrive')
  addNode('Checkin Started')
  addNode('Checkin Completed')
  addNode('Checkin Closed')

  // Enlaces del flujo feliz
  const initiated = recordLocatorData.value.total_checkin_initiated
  const recordLocatorInit = recordLocatorData.value.total_record_locator_init
  const recordLocatorStarted = recordLocatorData.value.total_record_locator_started
  const recordLocatorCompleted = recordLocatorData.value.total_record_locator_completed
  const recordLocatorClosed = recordLocatorData.value.total_record_locator_closed
  const recordLocatorFailed = recordLocatorData.value.total_record_locator_failed
  const recordLocatorAbandoned = recordLocatorData.value.total_record_locator_abandoned
  const recordLocatorInitAbandoned = recordLocatorData.value.total_record_locator_init_abandoned
  const preInitAbandonedErrorRaw = recordLocatorData.value.total_checkin_pre_init_abandoned_error
  const preInitAbandonedVoluntaryRaw = recordLocatorData.value.total_checkin_pre_init_abandoned_voluntary
  const hasPreInitAbandonedSplit =
    (preInitAbandonedErrorRaw !== null && preInitAbandonedErrorRaw !== undefined) ||
    (preInitAbandonedVoluntaryRaw !== null && preInitAbandonedVoluntaryRaw !== undefined)
  const preInitAbandonedError = hasPreInitAbandonedSplit
    ? Math.max(Number(preInitAbandonedErrorRaw) || 0, 0)
    : 0
  const preInitAbandonedVoluntary = hasPreInitAbandonedSplit
    ? Math.max(Number(preInitAbandonedVoluntaryRaw) || 0, 0)
    : 0
  const initAbandonedErrorRaw = recordLocatorData.value.total_record_locator_init_abandoned_error
  const initAbandonedVoluntaryRaw = recordLocatorData.value.total_record_locator_init_abandoned_voluntary
  const hasInitAbandonedSplit =
    (initAbandonedErrorRaw !== null && initAbandonedErrorRaw !== undefined) ||
    (initAbandonedVoluntaryRaw !== null && initAbandonedVoluntaryRaw !== undefined)
  const initAbandonedError = hasInitAbandonedSplit
    ? Math.max(Number(initAbandonedErrorRaw) || 0, 0)
    : 0
  const initAbandonedVoluntary = hasInitAbandonedSplit
    ? Math.max(Number(initAbandonedVoluntaryRaw) || 0, 0)
    : 0

  // Flujo principal: Checkin Init -> Booking retrive
  if (recordLocatorInit > 0) {
    const percentage = Math.round((recordLocatorInit / initiated) * 100)
    links.push({
      source: 'Checkin Init',
      target: 'Booking retrive',
      value: recordLocatorInit,
      label: `${recordLocatorInit.toLocaleString()} (${percentage}%)`,
    })
  }

  // Abandono 1: Checkin Init -> Abandonados (antes de Booking retrive)
  const abandonedBeforeInit = initiated - recordLocatorInit
  if (hasPreInitAbandonedSplit) {
    if (preInitAbandonedVoluntary > 0) {
      const percentage = Math.round((preInitAbandonedVoluntary / initiated) * 100)
      addNode('Abandoned (Init)')
      links.push({
        source: 'Checkin Init',
        target: 'Abandoned (Init)',
        value: preInitAbandonedVoluntary,
        label: `${preInitAbandonedVoluntary.toLocaleString()} (${percentage}%)`,
      })
    }

    if (preInitAbandonedError > 0) {
      const percentage = Math.round((preInitAbandonedError / initiated) * 100)
      addNode('Booking not retreived')
      links.push({
        source: 'Checkin Init',
        target: 'Booking not retreived',
        value: preInitAbandonedError,
        label: `${preInitAbandonedError.toLocaleString()} (${percentage}%)`,
      })
    }
  } else if (abandonedBeforeInit > 0) {
    const percentage = Math.round((abandonedBeforeInit / initiated) * 100)
    addNode('Abandoned (Init)')
    links.push({
      source: 'Checkin Init',
      target: 'Abandoned (Init)',
      value: abandonedBeforeInit,
      label: `${abandonedBeforeInit.toLocaleString()} (${percentage}%)`,
    })
  }

  // Flujo principal: Booking retrive -> Checkin Started
  if (recordLocatorStarted > 0) {
    const percentage = Math.round((recordLocatorStarted / initiated) * 100)
    links.push({
      source: 'Booking retrive',
      target: 'Checkin Started',
      value: recordLocatorStarted,
      label: `${recordLocatorStarted.toLocaleString()} (${percentage}%)`,
    })
  }

  // Abandono 2: Booking retrive -> Abandonados
  if (hasInitAbandonedSplit) {
    if (initAbandonedError > 0) {
      const percentage = Math.round((initAbandonedError / initiated) * 100)
      addNode('Error')
      links.push({
        source: 'Booking retrive',
        target: 'Error',
        value: initAbandonedError,
        label: `${initAbandonedError.toLocaleString()} (${percentage}%)`,
      })
    }

    if (initAbandonedVoluntary > 0) {
      const percentage = Math.round((initAbandonedVoluntary / initiated) * 100)
      addNode('Abandoned (Started)')
      links.push({
        source: 'Booking retrive',
        target: 'Abandoned (Started)',
        value: initAbandonedVoluntary,
        label: `${initAbandonedVoluntary.toLocaleString()} (${percentage}%)`,
      })
    }
  } else if (recordLocatorInitAbandoned > 0) {
    const percentage = Math.round((recordLocatorInitAbandoned / initiated) * 100)
    addNode('Abandoned (Started)')
    links.push({
      source: 'Booking retrive',
      target: 'Abandoned (Started)',
      value: recordLocatorInitAbandoned,
      label: `${recordLocatorInitAbandoned.toLocaleString()} (${percentage}%)`,
    })
  }

  // Flujo principal: Checkin Started -> Checkin Completed
  if (recordLocatorCompleted > 0) {
    const percentage = Math.round((recordLocatorCompleted / recordLocatorStarted) * 100)
    links.push({
      source: 'Checkin Started',
      target: 'Checkin Completed',
      value: recordLocatorCompleted,
      label: `${recordLocatorCompleted.toLocaleString()} (${percentage}%)`,
    })
  }

  // Flujo principal: Checkin Completed -> Checkin Closed
  if (recordLocatorClosed > 0) {
    const percentage = Math.round((recordLocatorClosed / recordLocatorStarted) * 100)
    links.push({
      source: 'Checkin Completed',
      target: 'Checkin Closed',
      value: recordLocatorClosed,
      label: `${recordLocatorClosed.toLocaleString()} (${percentage}%)`,
    })
  }

  // Failed: Checkin Started -> Checkin Failed
  if (recordLocatorFailed > 0) {
    const percentage = Math.round((recordLocatorFailed / recordLocatorStarted) * 100)
    addNode('Checkin Failed')
    links.push({
      source: 'Checkin Started',
      target: 'Checkin Failed',
      value: recordLocatorFailed,
      label: `${recordLocatorFailed.toLocaleString()} (${percentage}%)`,
    })
  }

  // Abandoned: Checkin Started -> Abandoned
  if (recordLocatorAbandoned > 0) {
    const percentage = Math.round((recordLocatorAbandoned / recordLocatorStarted) * 100)
    addNode('Abandoned (Flow)')
    links.push({
      source: 'Checkin Started',
      target: 'Abandoned (Flow)',
      value: recordLocatorAbandoned,
      label: `${recordLocatorAbandoned.toLocaleString()} (${percentage}%)`,
    })
  }

  return { nodes, links }
})

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

/* Chart Section */
.chart-section {
  margin-bottom: 28px;
  animation: fadeIn 0.5s ease-out;
}

.chart-wrapper {
  background: var(--kiut-bg-chart-wrapper);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--kiut-border-light);
  box-shadow: var(--kiut-shadow-chart-wrapper);
}

/* Daily table block (Utils/Table) */
.record-locator-daily-section {
  animation: fadeIn 0.6s ease-out 0.1s backwards;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cell-plain {
  display: inline-block;
  width: 100%;
  font-size: 0.875rem;
  color: var(--kiut-text-primary);
  white-space: nowrap;
}

.cell-plain.text-center {
  text-align: center;
}

.success-value {
  color: var(--kiut-success);
  font-weight: 500;
}

.failed-value {
  color: var(--kiut-danger);
  font-weight: 500;
}

.warning-value {
  color: var(--kiut-warning);
  font-weight: 500;
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
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
  min-height: 400px;
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
  height: 120px;
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
@media (max-width: 1024px) {
  .record-locator-daily-section {
    overflow-x: auto;
  }

  .cell-plain {
    padding: 0;
    font-size: 0.8125rem;
  }
}

@media (max-width: 768px) {
  .chart-wrapper {
    padding: 16px;
  }

  .cell-plain {
    font-size: 0.8125rem;
  }
}
</style>
