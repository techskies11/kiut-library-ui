<template>
  <ChartMetricContainer
    class="dn-metrics-root h-full min-h-0"
    title="Disruption Notifier"
    subtitle="Passenger notification effectiveness and delivery analysis"
  >
    <template
      v-if="enableExport && !props.loading && hasData"
      #headerExport
    >
      <FooterExport
        variant="inline"
        @export="handleExport"
        :loading="exportLoading"
      />
    </template>

    <!-- Loading State -->
    <div class="loading-state" v-if="props.loading">
      <div class="loading-container">
        <div class="chart-bars-loader">
          <div class="bar bar-1"></div>
          <div class="bar bar-2"></div>
          <div class="bar bar-3"></div>
          <div class="bar bar-4"></div>
          <div class="bar bar-5"></div>
        </div>
        <p class="loading-text">Loading disruption notifier data...</p>
      </div>
    </div>

    <!-- Content when loaded -->
    <div v-else class="card-body">
      <template v-if="hasData">

        <!-- 1. PASSENGER DISRUPTION FUNNEL -->
        <section class="chart-section">
          <div class="chart-header">
            <h4 class="section-title">Passenger Disruption Funnel</h4>
          </div>
          <div class="chart-wrapper">
            <SankeyChart
              v-if="funnelData.nodes.length > 0 && funnelData.links.length > 0"
              :data="funnelData"
              :node-colors="funnelColors"
              height="350px"
            />
            <div v-else class="empty-chart">
              <p class="empty-chart-text">No processing data available for visualization</p>
            </div>
          </div>
        </section>

        <!-- Summary cards (Total Records + business KPIs) -->
        <div class="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          <CardInfo
            color="#3b82f6"
            title="Total Records"
            :value="useNumberFormat(docTotals.row_count_total)"
          />
          <CardInfo
            color="#8b5cf6"
            title="Passengers Affected"
            :value="useNumberFormat(affected)"
          />
          <CardInfo
            color="#10b981"
            title="Successfully Notified"
            :value="useNumberFormat(procTotals.notification_sent)"
            :subvalue="pct(procTotals.notification_sent, affected)"
          />
          <CardInfo
            color="#ef4444"
            title="Not Notified"
            :value="useNumberFormat(notNotified)"
            :subvalue="pct(notNotified, affected)"
          />
          <CardInfo
            color="#f59e0b"
            title="Main Failure Reason"
            :value="topFailure.reason"
            :subvalue="topFailure.count > 0 ? `${useNumberFormat(topFailure.count)} cases` : undefined"
          />
        </div>

        <!-- 2. FAILURE ANALYSIS (chrome de tabla: Utils/Table) -->
        <section v-if="failureRows.length > 0" class="dn-failure-section">
          <div class="section-header">
            <h4 class="section-title">Why Passengers Were Not Notified</h4>
          </div>
          <div class="w-full min-w-0">
            <Table
              :columns="failureTableColumns"
              :rows="failureTableRows"
              :max-visible-rows="3"
              row-key="id"
            >
              <template #cell-reason="{ row }">
                <span class="failure-reason">{{ row.reason }}</span>
              </template>
              <template #cell-count="{ row }">
                <span class="failure-count">{{ useNumberFormat(row.count as number) }}</span>
              </template>
              <template #cell-impact="{ row }">
                <div class="impact-bar-container">
                  <div class="impact-bar" :style="{ width: (row.impactPct as number) + '%' }"></div>
                  <span class="impact-label">{{ row.impactPct }}%</span>
                </div>
              </template>
            </Table>
          </div>
        </section>

        <div class="dn-trend-health-block flex flex-col gap-0">
          <!-- 3. TREND: Notification Success Rate by Day -->
          <section v-if="trendChartData.labels.length > 0" class="chart-section dn-trend-chart-section">
            <div class="chart-header">
              <h4 class="section-title">Notification Success Rate by Day</h4>
            </div>
            <div class="dn-trend-chart-area min-h-[280px] w-full min-w-0 flex-1">
              <LineChart :data="trendChartData" :options="trendOptions" :theme="props.theme" />
            </div>
          </section>

          <!-- 4. SYSTEM HEALTH (collapsible) -->
          <details class="system-health">
            <summary class="system-health-toggle">
              <svg class="toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              System Health Details
            </summary>
            <div class="system-health-content">
              <div class="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                <CardInfo
                  title="Docs Started"
                  :value="useNumberFormat(docTotals.processing_started)"
                />
                <CardInfo
                  title="Docs Completed"
                  :value="useNumberFormat(docTotals.processing_completed)"
                />
                <CardInfo
                  title="Docs Failed"
                  :value="useNumberFormat(docTotals.processing_failed)"
                />
                <CardInfo
                  title="Processing Started"
                  :value="useNumberFormat(procTotals.processing_started)"
                />
                <CardInfo
                  title="Processing Success"
                  :value="useNumberFormat(procTotals.processing_success)"
                />
                <CardInfo
                  title="Notification Failed"
                  :value="useNumberFormat(procTotals.notification_failed)"
                />
              </div>
            </div>
          </details>
        </div>

      </template>

      <!-- Empty State -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <p class="empty-title">No disruption notifier data</p>
          <p class="empty-description">No disruption notification data found for the selected period. Try adjusting the date range.</p>
        </div>
      </section>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import moment from 'moment'
import SankeyChart from '../../Sankey/SankeyChart.vue'
import LineChart from '../../Line/ChartLine.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import CardInfo from '../../Utils/CardInfo/CardInfo.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'
import Table, { type TableColumn } from '../../Utils/Table/Table.vue'

interface DocumentCountItem {
  date: string;
  processing_started: number;
  processing_completed: number;
  processing_failed: number;
  row_count_total: number;
}

interface ProcessingCountItem {
  date: string;
  processing_started: number;
  processing_success: number;
  notification_sent: number;
  dq_error_phone_not_found: number;
  dq_error_flight_not_found: number;
  dq_error_booking_not_found: number;
  dq_error_other: number;
  notification_failed: number;
}

interface DisruptionNotifierData {
  documentCounts: { items: DocumentCountItem[] };
  processingCounts: { items: ProcessingCountItem[] };
}

const props = withDefaults(defineProps<{
  data?: DisruptionNotifierData;
  loading?: boolean;
  theme?: Theme;
  enableExport?: boolean;
  exportLoading?: boolean;
}>(), {
  data: () => ({
    documentCounts: { items: [] },
    processingCounts: { items: [] },
  }),
  loading: false,
  theme: undefined,
  enableExport: false,
  exportLoading: false,
})

const emit = defineEmits<{
  export: [format: ExportFormat]
}>()

const handleExport = (format: ExportFormat) => {
  emit('export', format)
}

const { isDark, colors } = useThemeDetection(toRef(props, 'theme'))

const hasData = computed(() => {
  const docs = props.data?.documentCounts?.items || []
  const procs = props.data?.processingCounts?.items || []
  return docs.length > 0 || procs.length > 0
})

const docTotals = computed(() => {
  const items = props.data?.documentCounts?.items || []
  return {
    processing_started: items.reduce((s, i) => s + i.processing_started, 0),
    processing_completed: items.reduce((s, i) => s + i.processing_completed, 0),
    processing_failed: items.reduce((s, i) => s + i.processing_failed, 0),
    row_count_total: items.reduce((s, i) => s + i.row_count_total, 0),
  }
})

const procTotals = computed(() => {
  const items = props.data?.processingCounts?.items || []
  return {
    processing_started: items.reduce((s, i) => s + i.processing_started, 0),
    processing_success: items.reduce((s, i) => s + i.processing_success, 0),
    notification_sent: items.reduce((s, i) => s + i.notification_sent, 0),
    notification_failed: items.reduce((s, i) => s + i.notification_failed, 0),
    dq_phone: items.reduce((s, i) => s + i.dq_error_phone_not_found, 0),
    dq_flight: items.reduce((s, i) => s + i.dq_error_flight_not_found, 0),
    dq_booking: items.reduce((s, i) => s + i.dq_error_booking_not_found, 0),
    dq_other: items.reduce((s, i) => s + i.dq_error_other, 0),
    totalDqErrors: items.reduce((s, i) =>
      s + i.dq_error_phone_not_found + i.dq_error_flight_not_found + i.dq_error_booking_not_found + i.dq_error_other, 0),
  }
})

const affected = computed(() => docTotals.value.row_count_total || procTotals.value.processing_started)
const notNotified = computed(() => Math.max(0, affected.value - procTotals.value.notification_sent))

const pct = (value: number, total: number): string => {
  if (!total) return '0%'
  return `${Math.round((value / total) * 100)}%`
}

const topFailure = computed(() => {
  const reasons = [
    { reason: 'Booking not found', count: procTotals.value.dq_booking },
    { reason: 'Phone not found', count: procTotals.value.dq_phone },
    { reason: 'Flight not found', count: procTotals.value.dq_flight },
    { reason: 'Notification failed', count: procTotals.value.notification_failed },
    { reason: 'Other', count: procTotals.value.dq_other },
  ].filter(r => r.count > 0).sort((a, b) => b.count - a.count)
  return reasons.length > 0 ? reasons[0] : { reason: 'None', count: 0 }
})

const failureRows = computed(() => {
  const total = affected.value
  return [
    { reason: 'Booking not found', count: procTotals.value.dq_booking },
    { reason: 'Flight not found', count: procTotals.value.dq_flight },
    { reason: 'Phone not found', count: procTotals.value.dq_phone },
    { reason: 'Notification failed', count: procTotals.value.notification_failed },
    { reason: 'Other', count: procTotals.value.dq_other },
  ].map(r => ({
    ...r,
    impactPct: total > 0 ? Math.round((r.count / total) * 100) : 0,
  }))
})

const failureTableColumns: TableColumn[] = [
  { key: 'reason', label: 'Reason', align: 'left' },
  { key: 'count', label: 'Count', align: 'center' },
  { key: 'impact', label: 'Impact', align: 'center' },
]

const failureTableRows = computed((): Record<string, unknown>[] =>
  failureRows.value.map((r) => ({
    id: r.reason,
    reason: r.reason,
    count: r.count,
    impactPct: r.impactPct,
  }))
)

// Funnel: Records detected → Valid reservations → Contactable → Notified
const funnelData = computed(() => {
  const records = affected.value
  const valid = procTotals.value.processing_success
  const contactable = Math.max(0, valid - procTotals.value.totalDqErrors)
  const notified = procTotals.value.notification_sent
  const invalidRecords = Math.max(0, records - valid)
  const dqTotal = procTotals.value.totalDqErrors
  const notContactable = Math.max(0, contactable - notified)

  const fl = (v: number, t: number): string => {
    const p = t > 0 ? Math.round((v / t) * 100) : 0
    return `${v.toLocaleString()} (${p}%)`
  }

  const nodes = [
    { name: 'Records Detected' },
    { name: 'Valid Reservations' },
    { name: 'Invalid / Unprocessed' },
    { name: 'Contactable' },
    { name: 'Data Quality Issues' },
    { name: 'Notified' },
    { name: 'Not Delivered' },
  ]

  const links: { source: string; target: string; value: number; label: string }[] = []

  if (valid > 0) links.push({ source: 'Records Detected', target: 'Valid Reservations', value: valid, label: fl(valid, records) })
  if (invalidRecords > 0) links.push({ source: 'Records Detected', target: 'Invalid / Unprocessed', value: invalidRecords, label: fl(invalidRecords, records) })
  if (contactable > 0) links.push({ source: 'Valid Reservations', target: 'Contactable', value: contactable, label: fl(contactable, records) })
  if (dqTotal > 0) links.push({ source: 'Valid Reservations', target: 'Data Quality Issues', value: dqTotal, label: fl(dqTotal, records) })
  if (notified > 0) links.push({ source: 'Contactable', target: 'Notified', value: notified, label: fl(notified, records) })
  if (notContactable > 0) links.push({ source: 'Contactable', target: 'Not Delivered', value: notContactable, label: fl(notContactable, records) })

  return { nodes, links }
})

const funnelColors: Record<string, string> = {
  'Records Detected': '#DBEAFE',
  'Valid Reservations': '#D1FAE5',
  'Invalid / Unprocessed': '#FEE2E2',
  'Contactable': '#BBF7D0',
  'Data Quality Issues': '#FED7AA',
  'Notified': '#86EFAC',
  'Not Delivered': '#FCA5A5',
}

// Trend: notification success rate per day
const trendChartData = computed(() => {
  const procItems = [...(props.data?.processingCounts?.items || [])].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  const docItems = props.data?.documentCounts?.items || []
  const docMap: Record<string, number> = {}
  for (const d of docItems) {
    docMap[d.date] = (docMap[d.date] || 0) + d.row_count_total
  }

  const allDates = [...new Set([...procItems.map(i => i.date), ...docItems.map(i => i.date)])].sort()

  const labels = allDates.map(d => moment(d).format('MMM DD'))
  const rateData = allDates.map(date => {
    const proc = procItems.find(p => p.date === date)
    const notified = proc?.notification_sent || 0
    const total = docMap[date] || proc?.processing_started || 0
    return total > 0 ? Math.round((notified / total) * 100) : 0
  })
  const volumeData = allDates.map(date => {
    const proc = procItems.find(p => p.date === date)
    return proc?.notification_sent || 0
  })

  return {
    labels,
    datasets: [
      {
        label: 'Success Rate (%)',
        data: rateData,
        borderColor: '#8b5cf6',
        yAxisID: 'y',
      },
      {
        label: 'Notifications Sent',
        data: volumeData,
        borderColor: '#10b981',
        yAxisID: 'y1',
      },
    ],
  }
})

const trendOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 18,
      bottom: 2,
      left: 4,
      right: 8,
    },
  },
  interaction: { mode: 'index' as const, intersect: false },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index' as const, intersect: false,
      backgroundColor: colors.value.tooltipBg, titleColor: colors.value.tooltipText, bodyColor: colors.value.textSecondary,
      borderColor: isDark.value ? 'rgba(198,125,255,0.2)' : 'rgba(0,0,0,0.1)', borderWidth: 1, padding: 12, cornerRadius: 8,
      callbacks: {
        label: (ctx: any) => {
          if (ctx.datasetIndex === 0) return ` Success Rate: ${ctx.raw}%`
          return ` Notifications: ${ctx.raw}`
        },
      },
    },
  },
  scales: {
    x: {
      display: true,
      grid: { display: false },
      ticks: {
        font: {
          family: "'Inter', ui-sans-serif, system-ui, sans-serif",
          size: 11,
        },
        color: colors.value.textSecondary,
      },
    },
    y: { type: 'linear' as const, display: true, position: 'left' as const, beginAtZero: true, max: 100, grid: { color: colors.value.gridLines },
      ticks: {
        font: {
          family: "'Inter', ui-sans-serif, system-ui, sans-serif",
          size: 11,
        },
        color: colors.value.textSecondary,
        callback: (v: unknown) =>
          `${v}%`,
      },
      title: {
        display: true,
        text: 'Success Rate',
        font: {
          family: "'Inter', ui-sans-serif, system-ui, sans-serif",
          size: 11,
        },
        color: colors.value.textSecondary,
      },
    },
    y1: { type: 'linear' as const, display: true, position: 'right' as const, beginAtZero: true, grid: { drawOnChartArea: false },
      ticks: {
        font: {
          family: "'Inter', ui-sans-serif, system-ui, sans-serif",
          size: 11,
        },
        color: colors.value.textSecondary,
      },
      title: {
        display: true,
        text: 'Volume',
        font: {
          family: "'Inter', ui-sans-serif, system-ui, sans-serif",
          size: 11,
        },
        color: colors.value.textSecondary,
      },
    },
  },
}))

defineExpose({ isDark })
</script>

<style scoped>
.card-body { animation: fadeIn 0.5s ease-out; flex: 1; display: flex; flex-direction: column; gap: 24px; }

/* Chart Sections */
.chart-section { display: flex; flex-direction: column; gap: 8px; }
.chart-header { display: flex; align-items: center; }
.chart-wrapper { background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%); border-radius: 16px; padding: 20px; border: 1px solid rgba(0, 0, 0, 0.05); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); }
.empty-chart { display: flex; align-items: center; justify-content: center; height: 300px; }
.empty-chart-text { color: var(--kiut-text-secondary, #64748b); font-size: 0.875rem; }

/* Failure Analysis block (tabla: Utils/Table) */
.dn-failure-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Failure Analysis table cell content */
.section-header { margin-bottom: 12px; }
.section-title { font-family: 'Space Grotesk', 'DM Sans', sans-serif; font-size: 1rem; font-weight: 600; color: var(--kiut-text-primary, #1e293b); margin: 0; }
.failure-reason { font-size: 0.8125rem; font-weight: 500; color: var(--kiut-text-primary, #1e293b); }
.failure-count { font-size: 0.8125rem; font-weight: 600; display: inline-block; width: 100%; text-align: center; }

/* Trend + System Health: sin hueco vertical extra; lienzo respira arriba */
.dn-trend-health-block .system-health { margin-top: 0; }
.dn-trend-chart-area { padding-top: 10px; padding-bottom: 0; }
.dn-trend-chart-area :deep(.chart-line-root ul) {
  margin-top: 0;
  padding-top: 0.375rem;
  padding-bottom: 0;
}

/* Impact Bar */
.impact-bar-container { display: flex; align-items: center; gap: 8px; min-width: 120px; }
.impact-bar { height: 6px; border-radius: 3px; background: linear-gradient(90deg, #f59e0b, #ef4444); min-width: 2px; transition: width 0.5s ease; }
.impact-label { font-size: 0.75rem; font-weight: 600; color: var(--kiut-text-secondary, #64748b); white-space: nowrap; }

/* System Health Collapsible */
.system-health { margin-top: 4px; border: 1px solid var(--kiut-border-light, rgba(0,0,0,0.06)); border-radius: 12px; overflow: hidden; }
.system-health-toggle {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 16px; cursor: pointer;
  font-size: 0.8125rem; font-weight: 500; color: var(--kiut-text-secondary, #94a3b8);
  background: var(--kiut-bg-stats-badge, #f8fafc);
  list-style: none; user-select: none; transition: color 0.2s;
}
.system-health-toggle:hover { color: var(--kiut-text-primary, #475569); }
.system-health-toggle::-webkit-details-marker { display: none; }
.toggle-icon { width: 16px; height: 16px; flex-shrink: 0; }
.system-health[open] .toggle-icon { transform: rotate(90deg); }
.system-health-content { padding: 16px; }

/* Empty State */
.empty-state { display: flex; align-items: center; justify-content: center; min-height: 280px; }
.empty-state-content { text-align: center; max-width: 360px; animation: fadeIn 0.6s ease-out; }
.empty-icon-wrapper { display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: var(--kiut-bg-empty-icon, linear-gradient(135deg, #dbeafe, #bfdbfe)); border-radius: 20px; margin: 0 auto 20px; box-shadow: var(--kiut-shadow-empty-icon, 0 4px 12px rgba(59, 130, 246, 0.15)); }
.empty-icon { width: 40px; height: 40px; color: #3b82f6; }
.empty-title { font-size: 18px; font-weight: 600; color: var(--kiut-text-primary, #1e293b); margin: 0 0 8px 0; }
.empty-description { font-size: 14px; font-weight: 400; color: var(--kiut-text-secondary, #64748b); line-height: 1.6; margin: 0; }

/* Loading State */
.loading-state { display: flex; align-items: center; justify-content: center; min-height: 380px; }
.loading-container { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; }
.chart-bars-loader { display: flex; align-items: flex-end; justify-content: center; gap: 10px; height: 100px; margin-bottom: 24px; }
.bar { width: 8px; background: linear-gradient(to top, var(--kiut-primary-light, #c67dff), var(--kiut-primary, #8b5cf6), var(--kiut-primary-hover, #7c3aed)); border-radius: 4px; animation: wave 1.5s ease-in-out infinite; box-shadow: var(--kiut-shadow-loader, 0 4px 12px rgba(139, 92, 246, 0.4)); }
.bar-1 { height: 30%; animation-delay: 0s; } .bar-2 { height: 50%; animation-delay: 0.1s; } .bar-3 { height: 70%; animation-delay: 0.2s; } .bar-4 { height: 50%; animation-delay: 0.3s; } .bar-5 { height: 40%; animation-delay: 0.4s; }
.loading-text { font-size: 15px; font-weight: 500; color: var(--kiut-text-secondary, #64748b); animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
@keyframes wave { 0%, 100% { transform: scaleY(1); opacity: 0.7; } 50% { transform: scaleY(1.6); opacity: 1; } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
