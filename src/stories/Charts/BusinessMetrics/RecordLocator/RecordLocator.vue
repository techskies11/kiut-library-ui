<template>
  <article class="record-locator-card">
    <header class="card-header">
      <div class="header-content">
        <h3 class="card-title">Checkin by Record Locator Metrics</h3>
        <p class="card-subtitle">Checkin by record locator retrieval and completion analysis</p>
      </div>
    </header>

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

      <!-- Table Data -->
      <section v-if="tableData && tableData.length > 0" class="table-section">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr class="table-header-row">
                <th class="table-header">Date</th>
                <th class="table-header">Checkin Init</th>
                <th class="table-header">Booking Retrieve (%)</th>
                <th class="table-header">Checkin Started</th>
                <th class="table-header">Checkin Completed (%)</th>
                <th class="table-header">Checkin Closed (%)</th>
                <th class="table-header">Checkin Failed (%)</th>
                <th class="table-header">Abandoned (%)</th>
                <th class="table-header" v-if="props.isAvianca">Create Payment</th>
                <th class="table-header" v-if="props.isAvianca">Failed Payment</th>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr
                v-for="row in tableData"
                :key="row.date"
                class="table-row"
              >
                <td class="table-cell font-medium">
                  {{ moment(row.date).format('DD/MM/YYYY') }}
                </td>
                <td class="table-cell text-center">
                  {{ useNumberFormat(row.checkin_initiated) }}
                </td>
                <td class="table-cell text-center">
                  {{ formatValueWithPercentage(row.record_locator_init_count, row.checkin_initiated) }}
                </td>
                <td class="table-cell text-center">
                  {{ useNumberFormat(row.record_locator_started_count) }}
                </td>
                <td class="table-cell text-center">
                  {{ formatValueWithPercentage(row.record_locator_completed_count, row.record_locator_started_count) }}
                </td>
                <td class="table-cell text-center success-value">
                  {{ formatValueWithPercentage(row.record_locator_closed_count, row.record_locator_started_count) }}
                </td>
                <td class="table-cell text-center failed-value">
                  {{ formatValueWithPercentage(row.record_locator_failed_count, row.record_locator_started_count) }}
                </td>
                <td class="table-cell text-center warning-value">
                  {{ formatValueWithPercentage(row.record_locator_abandoned_count, row.record_locator_started_count) }}
                </td>
                <td class="table-cell text-center" v-if="props.isAvianca">
                  {{ useNumberFormat(row.record_locator_create_payment_count) }}
                </td>
                <td class="table-cell text-center failed-value" v-if="props.isAvianca">
                  {{ useNumberFormat(row.record_locator_create_payment_failed_count) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <FooterExport v-if="enableExport" @export="handleExport" :loading="exportLoading" />
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
  </article>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import moment from 'moment'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import SankeyChart from '../../Sankey/SankeyChart.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

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
  record_locator_by_day: RecordLocatorDayData[];
}

const props = withDefaults(defineProps<{
  data?: RecordLocatorData;
  loading?: boolean;
  isAvianca?: boolean;
  theme?: Theme;
  enableExport?: boolean;
  exportLoading?: boolean;
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
    record_locator_by_day: [],
  }),
  loading: false,
  isAvianca: false,
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

// Computed para ordenar los datos por día
const tableData = computed(() => {
  if (!props.data?.record_locator_by_day) return []
  return [...props.data.record_locator_by_day].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
})

const recordLocatorData = computed(() => props.data)

// Computed para colores dinámicos del Sankey
const sankeyNodeColors = computed(() => ({
  // Main flow progression - from blue to cyan to green
  'Checkin Init': '#93C5FD', // Blue for started state
  'Booking retrive': '#67E8F9', // Light cyan
  'Checkin Started': '#22D3EE', // Medium cyan
  'Checkin Completed': '#A7F3D0', // Light green
  'Checkin Closed': '#7BE39E', // Green for success

  // Abandoned states - progressive red
  'Abandoned (Init)': '#FCA5A5', // Light red
  'Abandoned (Started)': '#F87171', // Medium red
  'Abandoned (Flow)': '#EF4444', // Darker red

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

  if (!recordLocatorData.value.total_checkin_initiated) {
    return { nodes, links }
  }

  // Nodos principales del flujo
  nodes.push({ name: 'Checkin Init' })
  nodes.push({ name: 'Booking retrive' })
  nodes.push({ name: 'Checkin Started' })
  nodes.push({ name: 'Checkin Completed' })
  nodes.push({ name: 'Checkin Closed' })

  // Enlaces del flujo feliz
  const initiated = recordLocatorData.value.total_checkin_initiated
  const recordLocatorInit = recordLocatorData.value.total_record_locator_init
  const recordLocatorStarted = recordLocatorData.value.total_record_locator_started
  const recordLocatorCompleted = recordLocatorData.value.total_record_locator_completed
  const recordLocatorClosed = recordLocatorData.value.total_record_locator_closed
  const recordLocatorFailed = recordLocatorData.value.total_record_locator_failed
  const recordLocatorAbandoned = recordLocatorData.value.total_record_locator_abandoned
  const recordLocatorInitAbandoned = recordLocatorData.value.total_record_locator_init_abandoned

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
  if (abandonedBeforeInit > 0) {
    const percentage = Math.round((abandonedBeforeInit / initiated) * 100)
    nodes.push({ name: 'Abandoned (Init)' })
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
  if (recordLocatorInitAbandoned > 0) {
    const percentage = Math.round((recordLocatorInitAbandoned / initiated) * 100)
    nodes.push({ name: 'Abandoned (Started)' })
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
    nodes.push({ name: 'Checkin Failed' })
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
    nodes.push({ name: 'Abandoned (Flow)' })
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
/* Main Card Styles */
.record-locator-card {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--kiut-bg-card-gradient);
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: var(--kiut-shadow-card);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.record-locator-card:hover {
  box-shadow: var(--kiut-shadow-card-hover);
  transform: translateY(-2px);
}

/* Header Styles */
.card-header {
  margin-bottom: 28px;
  position: relative;
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
  font-size: .875rem;
  font-weight: 400;
  color: var(--kiut-text-secondary);
  margin: 0px;
  line-height: 1.25rem;
}

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

/* Table Section */
.table-section {
  animation: fadeIn 0.6s ease-out 0.1s backwards;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 16px;
  border: 1px solid var(--kiut-border-table);
  box-shadow: var(--kiut-shadow-chart-wrapper);
  background: var(--kiut-bg-table);
  flex: 1;
}

.data-table {
  width: 100%;
  font-size: 0.875rem;
  border-collapse: separate;
  border-spacing: 0;
}

.table-header-row {
  background: var(--kiut-bg-table-header);
}

.table-header {
  padding: 16px 12px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--kiut-text-table-header);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid var(--kiut-border-table);
}

.table-header:first-child {
  border-top-left-radius: 16px;
}

.table-header:last-child {
  border-top-right-radius: 16px;
}

.table-body {
  background: var(--kiut-bg-table);
}

.table-row {
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--kiut-border-table-row);
}

.table-row:hover {
  background: var(--kiut-bg-table-hover);
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 16px 12px;
  font-size: 0.875rem;
  color: var(--kiut-text-primary);
  white-space: nowrap;
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
  .table-wrapper {
    overflow-x: scroll;
  }
  
  .table-cell {
    padding: 12px 8px;
    font-size: 0.8125rem;
  }
}

@media (max-width: 768px) {
  .record-locator-card {
    padding: 20px 24px;
    border-radius: 16px;
  }

  .card-title {
    font-size: 20px;
  }

  .card-subtitle {
    font-size: 13px;
  }

  .card-header {
    margin-bottom: 24px;
  }

  .chart-wrapper {
    padding: 16px;
  }

  .table-header {
    padding: 12px 8px;
    font-size: 0.7rem;
  }

  .table-cell {
    padding: 12px 8px;
    font-size: 0.8125rem;
  }
}
</style>
