<template>
  <article class="dn-metrics-card">
    <header class="card-header">
      <div class="header-content">
        <div class="title-section">
          <h3 class="card-title">Disruption Notifier</h3>
          <p class="card-subtitle">Passenger notification effectiveness and delivery analysis</p>
        </div>
        <div class="total-docs-badge" v-if="!props.loading">
          <p class="badge-label">Total Records</p>
          <p class="badge-value">{{ useNumberFormat(docTotals.row_count_total) }}</p>
        </div>
      </div>
    </header>

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

        <!-- 1. BUSINESS OUTCOME KPIs -->
        <div class="kpi-grid">
          <div class="kpi-card kpi-neutral">
            <span class="kpi-label">Passengers Affected</span>
            <span class="kpi-value">{{ useNumberFormat(affected) }}</span>
          </div>
          <div class="kpi-card kpi-success">
            <span class="kpi-label">Successfully Notified</span>
            <span class="kpi-value kpi-value-success">{{ useNumberFormat(procTotals.notification_sent) }}</span>
            <span class="kpi-pct">{{ pct(procTotals.notification_sent, affected) }}</span>
          </div>
          <div class="kpi-card kpi-danger">
            <span class="kpi-label">Not Notified</span>
            <span class="kpi-value kpi-value-error">{{ useNumberFormat(notNotified) }}</span>
            <span class="kpi-pct">{{ pct(notNotified, affected) }}</span>
          </div>
          <div class="kpi-card kpi-warning">
            <span class="kpi-label">Main Failure Reason</span>
            <span class="kpi-value kpi-value-reason">{{ topFailure.reason }}</span>
            <span class="kpi-pct">{{ useNumberFormat(topFailure.count) }} cases</span>
          </div>
        </div>

        <!-- 2. PASSENGER DISRUPTION FUNNEL -->
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

        <!-- 3. FAILURE ANALYSIS -->
        <section v-if="failureRows.length > 0" class="table-section">
          <div class="section-header">
            <h4 class="section-title">Why Passengers Were Not Notified</h4>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr class="table-header-row">
                  <th class="table-header text-left">Reason</th>
                  <th class="table-header text-center">Count</th>
                  <th class="table-header text-center">Impact</th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr v-for="row in failureRows" :key="row.reason" class="table-row">
                  <td class="table-cell text-left font-medium">{{ row.reason }}</td>
                  <td class="table-cell text-center font-semibold">{{ useNumberFormat(row.count) }}</td>
                  <td class="table-cell text-center">
                    <div class="impact-bar-container">
                      <div class="impact-bar" :style="{ width: row.impactPct + '%' }"></div>
                      <span class="impact-label">{{ row.impactPct }}%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 4. TREND: Notification Success Rate by Day -->
        <section v-if="trendChartData.labels.length > 0" class="chart-section">
          <div class="chart-header">
            <h4 class="section-title">Notification Success Rate by Day</h4>
          </div>
          <div class="chart-wrapper">
            <LineChart :data="trendChartData" :options="trendOptions" />
          </div>
        </section>

        <!-- 5. SYSTEM HEALTH (collapsible) -->
        <details class="system-health">
          <summary class="system-health-toggle">
            <svg class="toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            System Health Details
          </summary>
          <div class="system-health-content">
            <div class="sys-kpi-grid">
              <div class="sys-kpi"><span class="sys-label">Docs Started</span><span class="sys-value">{{ useNumberFormat(docTotals.processing_started) }}</span></div>
              <div class="sys-kpi"><span class="sys-label">Docs Completed</span><span class="sys-value">{{ useNumberFormat(docTotals.processing_completed) }}</span></div>
              <div class="sys-kpi"><span class="sys-label">Docs Failed</span><span class="sys-value sys-error">{{ useNumberFormat(docTotals.processing_failed) }}</span></div>
              <div class="sys-kpi"><span class="sys-label">Processing Started</span><span class="sys-value">{{ useNumberFormat(procTotals.processing_started) }}</span></div>
              <div class="sys-kpi"><span class="sys-label">Processing Success</span><span class="sys-value">{{ useNumberFormat(procTotals.processing_success) }}</span></div>
              <div class="sys-kpi"><span class="sys-label">Notification Failed</span><span class="sys-value sys-error">{{ useNumberFormat(procTotals.notification_failed) }}</span></div>
            </div>
          </div>
        </details>

        <FooterExport v-if="enableExport" @export="handleExport" :loading="exportLoading" />
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
  </article>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import moment from 'moment'
import SankeyChart from '../../Sankey/SankeyChart.vue'
import LineChart from '../../Line/ChartLine.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

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
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#7c3aed',
        pointBorderWidth: 2,
        yAxisID: 'y',
      },
      {
        label: 'Notifications Sent',
        data: volumeData,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
        borderWidth: 1.5,
        borderDash: [4, 4],
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#059669',
        pointBorderWidth: 2,
        yAxisID: 'y1',
      },
    ],
  }
})

const trendOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index' as const, intersect: false },
  plugins: {
    legend: { display: true, position: 'top' as const, labels: { usePointStyle: true, padding: 16, font: { family: "'DM Sans', sans-serif", size: 11 }, color: colors.value.textSecondary } },
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
    x: { display: true, grid: { display: false }, ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: colors.value.textSecondary } },
    y: { type: 'linear' as const, display: true, position: 'left' as const, beginAtZero: true, max: 100, grid: { color: colors.value.gridLines },
      ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: colors.value.textSecondary, callback: (v: any) => v + '%' },
      title: { display: true, text: 'Success Rate', font: { family: "'DM Sans', sans-serif", size: 11 }, color: colors.value.textSecondary },
    },
    y1: { type: 'linear' as const, display: true, position: 'right' as const, beginAtZero: true, grid: { drawOnChartArea: false },
      ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: colors.value.textSecondary },
      title: { display: true, text: 'Volume', font: { family: "'DM Sans', sans-serif", size: 11 }, color: colors.value.textSecondary },
    },
  },
}))

defineExpose({ isDark })
</script>

<style scoped>
.dn-metrics-card {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--kiut-bg-card-gradient, linear-gradient(to bottom, #ffffff 0%, #fafafa 100%));
  border-radius: 20px; padding: 28px 32px;
  box-shadow: var(--kiut-shadow-card, 0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -3px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05));
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative; overflow: hidden; display: flex; flex-direction: column; height: 100%;
}
.dn-metrics-card:hover { box-shadow: var(--kiut-shadow-card-hover, 0 4px 6px rgba(0,0,0,0.05), 0 20px 25px -5px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)); transform: translateY(-2px); }
.card-header { margin-bottom: 28px; }
.header-content { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; }
.title-section { flex: 1; text-align: left; }
.card-title { font-family: 'Space Grotesk', 'DM Sans', sans-serif; margin: 0; letter-spacing: -0.02em; background: linear-gradient(135deg, var(--kiut-primary-light, #c67dff), var(--kiut-primary-default, #5d4b93)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 600; font-size: 1.125rem; line-height: 1.75rem; }
.card-subtitle { font-size: .875rem; font-weight: 400; color: var(--kiut-text-secondary, #64748b); margin: 0; line-height: 1.25rem; }
.total-docs-badge { background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 16px; padding: 12px 20px; min-width: 120px; text-align: center; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15); transition: transform 0.2s ease, box-shadow 0.2s ease; }
.total-docs-badge:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2); }
.total-docs-badge .badge-label { font-size: 0.7rem; font-weight: 600; color: #1d4ed8; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 2px 0; }
.total-docs-badge .badge-value { font-family: 'Space Grotesk', sans-serif; font-size: 1.375rem; font-weight: 700; color: #1e40af; margin: 0; letter-spacing: -0.02em; }
.card-body { animation: fadeIn 0.5s ease-out; flex: 1; display: flex; flex-direction: column; gap: 24px; }

/* KPI Grid - 4 business outcome cards */
.kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.kpi-card { display: flex; flex-direction: column; gap: 4px; padding: 16px 14px; background: var(--kiut-bg-stats-badge, #f8fafc); border: 1px solid var(--kiut-border-light, rgba(0,0,0,0.05)); border-radius: 12px; text-align: center; transition: all 0.2s ease; }
.kpi-card:hover { background: var(--kiut-bg-card, #fff); transform: translateY(-1px); }
.kpi-neutral { border-top: 3px solid #8b5cf6; }
.kpi-success { border-top: 3px solid #10b981; }
.kpi-danger { border-top: 3px solid #ef4444; }
.kpi-warning { border-top: 3px solid #f59e0b; }
.kpi-label { font-size: 0.7rem; font-weight: 500; color: var(--kiut-text-secondary, #64748b); line-height: 1.2; }
.kpi-value { font-family: 'Space Grotesk', sans-serif; font-size: 1.375rem; font-weight: 700; color: var(--kiut-text-primary, #1e293b); letter-spacing: -0.02em; }
.kpi-value-success { color: #059669; }
.kpi-value-error { color: #dc2626; }
.kpi-value-reason { font-size: 0.9rem; color: #92400e; }
.kpi-pct { font-size: 0.75rem; color: var(--kiut-text-secondary, #94a3b8); font-weight: 500; }

/* Chart Sections */
.chart-section { display: flex; flex-direction: column; gap: 8px; }
.chart-header { display: flex; align-items: center; }
.chart-wrapper { background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%); border-radius: 16px; padding: 20px; border: 1px solid rgba(0, 0, 0, 0.05); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); }
.empty-chart { display: flex; align-items: center; justify-content: center; height: 300px; }
.empty-chart-text { color: var(--kiut-text-secondary, #64748b); font-size: 0.875rem; }

/* Failure Analysis Table */
.table-section { display: flex; flex-direction: column; }
.section-header { margin-bottom: 12px; }
.section-title { font-family: 'Space Grotesk', 'DM Sans', sans-serif; font-size: 1rem; font-weight: 600; color: var(--kiut-text-primary, #1e293b); margin: 0; }
.table-wrapper { overflow-x: auto; border-radius: 12px; border: 1px solid var(--kiut-border-light, rgba(0,0,0,0.08)); background: var(--kiut-bg-card, white); }
.data-table { width: 100%; font-size: 0.8125rem; border-collapse: separate; border-spacing: 0; }
.table-header-row { background: var(--kiut-bg-stats-badge, linear-gradient(to bottom, #f9fafb, #f3f4f6)); }
.table-header { padding: 12px 16px; font-size: 0.7rem; font-weight: 600; color: var(--kiut-text-primary, #374151); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid var(--kiut-border-light, #e5e7eb); }
.table-body { background: var(--kiut-bg-card, white); }
.table-row { transition: background-color 0.2s ease; border-bottom: 1px solid var(--kiut-border-light, #f3f4f6); }
.table-row:hover { background: var(--kiut-bg-stats-badge, #fafafa); }
.table-row:last-child { border-bottom: none; }
.table-cell { padding: 12px 16px; font-size: 0.8125rem; color: var(--kiut-text-primary, #1e293b); }
.text-left { text-align: left; }
.text-center { text-align: center; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }

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
.sys-kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.sys-kpi { display: flex; flex-direction: column; gap: 2px; padding: 10px 12px; background: var(--kiut-bg-card, white); border: 1px solid var(--kiut-border-light, rgba(0,0,0,0.05)); border-radius: 8px; text-align: center; }
.sys-label { font-size: 0.65rem; font-weight: 500; color: var(--kiut-text-secondary, #94a3b8); text-transform: uppercase; letter-spacing: 0.03em; }
.sys-value { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 600; color: var(--kiut-text-primary, #475569); }
.sys-error { color: #dc2626; }

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
@media (max-width: 1024px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } .sys-kpi-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) {
  .dn-metrics-card { padding: 20px 24px; border-radius: 16px; }
  .kpi-grid { grid-template-columns: 1fr 1fr; }
  .sys-kpi-grid { grid-template-columns: 1fr 1fr; }
  .card-title { font-size: 1rem; }
  .header-content { flex-direction: column; gap: 16px; }
}
</style>
