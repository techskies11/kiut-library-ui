<template>
  <article class="disruption-metrics-card">
    <header class="card-header">
      <div class="header-content">
        <div class="title-section">
          <h3 class="card-title">Disruption Metrics</h3>
          <p class="card-subtitle">Disruption workflow performance and completion tracking</p>
        </div>
        <div class="payment-success-badge" v-if="!props.loading">
          <p class="badge-label">Payment Success</p>
          <p class="badge-value">{{ useNumberFormat(props.data.total_payment_success || 0) }}</p>
        </div>
      </div>
    </header>

    <!-- Loading State con animación CSS personalizada -->
    <div class="loading-state" v-if="props.loading">
      <div class="loading-container">
        <div class="chart-bars-loader">
          <div class="bar bar-1"></div>
          <div class="bar bar-2"></div>
          <div class="bar bar-3"></div>
          <div class="bar bar-4"></div>
          <div class="bar bar-5"></div>
        </div>
        <p class="loading-text">Loading disruption data...</p>
      </div>
    </div>

    <!-- Content when loaded -->
    <div v-else class="card-body">
      <!-- Sankey Visualization -->
      <section class="chart-section">
        <div class="chart-wrapper">
          <SankeyChart
            v-if="sankeyData.nodes.length > 0 && sankeyData.links.length > 0"
            :data="sankeyData"
            :node-colors="nodeColors"
            height="500px"
          />
          <div v-else class="empty-chart">
            <p class="empty-chart-text">No disruption data available for visualization</p>
          </div>
        </div>
      </section>

      <!-- Daily Overview Table -->
      <section v-if="tableData && tableData.length > 0" class="table-section">
        <div class="section-header">
          <h4 class="section-title">Daily Overview</h4>
        </div>

        <!-- Legend -->
        <div class="legend-container">
          <p class="legend-title">Legend</p>
          <div class="legend-items">
            <div class="legend-group">
              <span class="legend-label">Voluntary:</span>
              <span class="badge badge-vol">VOL</span>
            </div>
            <div class="legend-group">
              <span class="legend-label">Involuntary:</span>
              <span class="badge badge-inv">INV</span>
            </div>
            <div class="legend-note">
              <span>Vol=Voluntary</span>
              <span>•</span>
              <span>Inv=Involuntary</span>
            </div>
          </div>
        </div>

        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr class="table-header-row">
                <th class="table-header">Date</th>
                <th class="table-header">Initiated</th>
                <th class="table-header">Started</th>
                <th class="table-header">Abandoned (%)</th>
                <th class="table-header">Voluntary</th>
                <th class="table-header">Involuntary</th>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr v-for="row in tableData" :key="row.date" class="table-row">
                <!-- Date -->
                <td class="table-cell font-medium text-center">
                  {{ moment(row.date).format('DD/MM') }}
                </td>

                <!-- Initiated -->
                <td class="table-cell text-center">
                  {{ useNumberFormat(row.disruption_conversations) }}
                </td>

                <!-- Started -->
                <td class="table-cell text-center">
                  {{ useNumberFormat(row.disruption_initiated_count) }}
                  <span class="percentage-text">
                    ({{ calculatePercentage(row.disruption_initiated_count, row.disruption_conversations) }})
                  </span>
                </td>

                <!-- Abandoned -->
                <td class="table-cell text-center">
                  <span class="abandoned-value">
                    {{ useNumberFormat(row.disruption_initiated_count - row.voluntary_count - row.involuntary_count) }}
                    ({{ calculatePercentage(row.disruption_initiated_count - row.voluntary_count - row.involuntary_count, row.disruption_conversations) }})
                  </span>
                </td>

                <!-- Voluntary badges -->
                <td class="table-cell">
                  <div class="badges-container badges-wrap">
                    <span class="badge badge-vol">
                      VOL {{ useNumberFormat(row.voluntary_count) }}
                      ({{ calculatePercentage(row.voluntary_count, row.disruption_conversations) }})
                    </span>
                    <span class="badge badge-confirm">
                      Confirm {{ useNumberFormat(row.confirmed_count) }}
                      ({{ calculatePercentage(row.confirmed_count, row.disruption_conversations) }})
                    </span>
                    <span class="badge badge-not-confirm">
                      Not Confirm {{ useNumberFormat(row.voluntary_count - row.confirmed_count) }}
                      ({{ calculatePercentage(row.voluntary_count - row.confirmed_count, row.disruption_conversations) }})
                    </span>
                    <span class="badge badge-reject">
                      Reject {{ useNumberFormat(row.sell_failed_count) }}
                      ({{ calculatePercentage(row.sell_failed_count, row.disruption_conversations) }})
                    </span>
                    <span class="badge badge-not-paid">
                      Not Paid {{ useNumberFormat(Math.max(0, row.confirmed_count - row.sell_success_count - row.sell_failed_count)) }}
                      ({{ calculatePercentage(Math.max(0, row.confirmed_count - row.sell_success_count - row.sell_failed_count), row.disruption_conversations) }})
                    </span>
                    <span class="badge badge-success">
                      Finish {{ useNumberFormat(row.sell_success_count) }}
                      ({{ calculatePercentage(row.sell_success_count, row.disruption_conversations) }})
                    </span>
                  </div>
                </td>

                <!-- Involuntary badges -->
                <td class="table-cell">
                  <div class="badges-container badges-wrap">
                    <span class="badge badge-inv">
                      INV {{ useNumberFormat(row.involuntary_count) }}
                      ({{ calculatePercentage(row.involuntary_count, row.disruption_conversations) }})
                    </span>
                    <span class="badge badge-human">
                      Human {{ useNumberFormat(row.involuntary_count - row.accepted_count) }}
                      ({{ calculatePercentage(row.involuntary_count - row.accepted_count, row.disruption_conversations) }})
                    </span>
                    <span class="badge badge-accept">
                      Accept {{ useNumberFormat(row.accepted_count) }}
                      ({{ calculatePercentage(row.accepted_count, row.disruption_conversations) }})
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <FooterExport v-if="enableExport" @export="handleExport" />
      </section>

      <!-- Empty State -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p class="empty-title">No disruption data available</p>
          <p class="empty-description">No disruption data found for the selected period. Try adjusting the date range.</p>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import SankeyChart from '../../Sankey/SankeyChart.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'

interface DisruptionDayData {
  date: string;
  disruption_conversations: number;
  disruption_initiated_count: number;
  voluntary_count: number;
  involuntary_count: number;
  accepted_count: number;
  confirmed_count: number;
  sell_success_count: number;
  sell_failed_count: number;
}

interface DisruptionData {
  total_disruption_conversations: number;
  total_disruption_initiated: number;
  total_voluntary: number;
  total_involuntary: number;
  total_accepted: number;
  total_confirmed: number;
  total_sell_success: number;
  total_sell_failed: number;
  total_finished: number;
  total_payment_success: number;
  disruption_by_day: DisruptionDayData[];
}

const props = withDefaults(defineProps<{
  data?: DisruptionData;
  loading?: boolean;
  enableExport?: boolean;
}>(), {
  data: () => ({
    total_disruption_conversations: 0,
    total_disruption_initiated: 0,
    total_voluntary: 0,
    total_involuntary: 0,
    total_accepted: 0,
    total_confirmed: 0,
    total_sell_success: 0,
    total_sell_failed: 0,
    total_finished: 0,
    total_payment_success: 0,
    disruption_by_day: [],
  }),
  loading: false,
  enableExport: false
})

const emit = defineEmits<{
  export: [format: ExportFormat]
}>()

const handleExport = (format: ExportFormat) => {
  emit('export', format)
}

// Computed para ordenar los datos por día
const tableData = computed(() => {
  if (!props.data?.disruption_by_day) return []
  return [...props.data.disruption_by_day].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
})

const calculatePercentage = (value: number, total: number): string => {
  if (!total || total === 0) return '0%'
  return `${Math.round((value / total) * 100)}%`
}

const sankeyData = computed(() => {
  const data = props.data
  const conversations = data.total_disruption_conversations || 0
  const initiated = data.total_disruption_initiated || 0
  const voluntary = data.total_voluntary || 0
  const involuntary = data.total_involuntary || 0
  const accepted = data.total_accepted || 0
  const confirmed = data.total_confirmed || 0
  const sellSuccess = data.total_sell_success || 0
  const sellFailed = data.total_sell_failed || 0

  // Calculate abandoned and other derived values
  const abandonedFromConversations = Math.max(0, conversations - initiated)
  const abandonedFromInitiated = Math.max(0, initiated - voluntary - involuntary)
  const notAccepted = Math.max(0, involuntary - accepted)
  const notConfirmed = Math.max(0, voluntary - confirmed)
  const rejected = sellFailed
  const notPaid = Math.max(0, confirmed - sellSuccess - rejected)

  // Helper function to format label with percentage
  const formatLabel = (value: number, total: number): string => {
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0
    return `${value.toLocaleString()} (${percentage}%)`
  }

  // Define nodes
  const nodes = [
    { name: 'Initiated' },
    { name: 'Started' },
    { name: 'Voluntary' },
    { name: 'Confirmed' },
    { name: 'Paid' },
    { name: 'Not Paid' },
    { name: 'Rejected' },
    { name: 'Not Confirmed' },
    { name: 'Involuntary' },
    { name: 'Accepted' },
    { name: 'Redirect to Human' },
    { name: 'Abandoned (Init)' },
    { name: 'Abandoned (Start)' },
  ]

  // Define links with flows
  const links: { source: string; target: string; value: number; label: string }[] = []

  // First level: Conversations splits
  if (initiated > 0) {
    links.push({
      source: 'Initiated',
      target: 'Started',
      value: initiated,
      label: formatLabel(initiated, conversations),
    })
  }
  if (abandonedFromConversations > 0) {
    links.push({
      source: 'Initiated',
      target: 'Abandoned (Init)',
      value: abandonedFromConversations,
      label: formatLabel(abandonedFromConversations, conversations),
    })
  }

  // Second level: Initiated splits
  if (voluntary > 0) {
    links.push({
      source: 'Started',
      target: 'Voluntary',
      value: voluntary,
      label: formatLabel(voluntary, conversations),
    })
  }
  if (involuntary > 0) {
    links.push({
      source: 'Started',
      target: 'Involuntary',
      value: involuntary,
      label: formatLabel(involuntary, conversations),
    })
  }
  if (abandonedFromInitiated > 0) {
    links.push({
      source: 'Started',
      target: 'Abandoned (Start)',
      value: abandonedFromInitiated,
      label: formatLabel(abandonedFromInitiated, conversations),
    })
  }

  // Third level: Involuntary splits
  if (accepted > 0) {
    links.push({
      source: 'Involuntary',
      target: 'Accepted',
      value: accepted,
      label: formatLabel(accepted, conversations),
    })
  }
  if (notAccepted > 0) {
    links.push({
      source: 'Involuntary',
      target: 'Redirect to Human',
      value: notAccepted,
      label: formatLabel(notAccepted, conversations),
    })
  }

  // Third level: Voluntary splits
  if (confirmed > 0) {
    links.push({
      source: 'Voluntary',
      target: 'Confirmed',
      value: confirmed,
      label: formatLabel(confirmed, conversations),
    })
  }
  if (notConfirmed > 0) {
    links.push({
      source: 'Voluntary',
      target: 'Not Confirmed',
      value: notConfirmed,
      label: formatLabel(notConfirmed, conversations),
    })
  }

  // Fourth level: Confirmed splits
  if (sellSuccess > 0) {
    links.push({
      source: 'Confirmed',
      target: 'Paid',
      value: sellSuccess,
      label: formatLabel(sellSuccess, conversations),
    })
  }
  if (rejected > 0) {
    links.push({
      source: 'Confirmed',
      target: 'Rejected',
      value: rejected,
      label: formatLabel(rejected, conversations),
    })
  }
  if (notPaid > 0) {
    links.push({
      source: 'Confirmed',
      target: 'Not Paid',
      value: notPaid,
      label: formatLabel(notPaid, conversations),
    })
  }

  return { nodes, links }
})

const nodeColors: Record<string, string> = {
  'Initiated': '#E5E7EB',
  'Started': '#DBEAFE',
  'Abandoned (Start)': '#FEE2E2',
  'Voluntary': '#FED7AA',
  'Involuntary': '#E9D5FF',
  'Abandoned (Init)': '#FEE2E2',
  'Accepted': '#86EFAC',
  'Redirect to Human': '#FCA5A5',
  'Confirmed': '#BFDBFE',
  'Not Confirmed': '#FED7AA',
  'Paid': '#86EFAC',
  'Rejected': '#FCA5A5',
  'Not Paid': '#FED7AA',
}

</script>

<style scoped>
/* Main Card Styles */
.disruption-metrics-card {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(to bottom, #ffffff 0%, #fafafa 100%);
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 10px 15px -3px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.disruption-metrics-card:hover {
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

/* Header Styles */
.card-header {
  margin-bottom: 28px;
  position: relative;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
}

.title-section {
  flex: 1;
}

.card-title {
  font-family: 'Space Grotesk', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #c67dff, #5d4b93);
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
  color: #64748b;
  margin: 0px;
  line-height: 1.25rem;
}

.payment-success-badge {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 16px;
  padding: 16px 24px;
  min-width: 140px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.payment-success-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.2);
}

.badge-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #047857;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 4px 0;
}

.badge-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.375rem;
  font-weight: 700;
  color: #065f46;
  margin: 0;
  letter-spacing: -0.02em;
}

/* Card Body */
.card-body {
  animation: fadeIn 0.5s ease-out;
}

/* Chart Section */
.chart-section {
  margin-bottom: 28px;
  animation: fadeIn 0.5s ease-out;
}

.chart-wrapper {
  background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.empty-chart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.empty-chart-text {
  color: #64748b;
  font-size: 0.875rem;
}

/* Section Header */
.section-header {
  margin-bottom: 16px;
}

.section-title {
  font-family: 'Space Grotesk', 'DM Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  letter-spacing: -0.01em;
}

/* Legend */
.legend-container {
  margin-bottom: 16px;
  padding: 16px;
  background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.legend-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 12px 0;
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.legend-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.legend-note {
  display: flex;
  gap: 8px;
  font-size: 0.7rem;
  color: #94a3b8;
  font-style: italic;
}

/* Table Section */
.table-section {
  animation: fadeIn 0.6s ease-out 0.1s backwards;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  background: white;
}

.data-table {
  width: 100%;
  font-size: 0.8125rem;
  border-collapse: separate;
  border-spacing: 0;
}

.table-header-row {
  background: linear-gradient(to bottom, #f9fafb 0%, #f3f4f6 100%);
}

.table-header {
  padding: 14px 10px;
  text-align: center;
  font-size: 0.7rem;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #e5e7eb;
}

.table-header:first-child {
  border-top-left-radius: 16px;
}

.table-header:last-child {
  border-top-right-radius: 16px;
}

.table-body {
  background: white;
}

.table-row {
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f3f4f6;
}

.table-row:hover {
  background: linear-gradient(to right, #fafafa 0%, #f9fafb 100%);
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 14px 10px;
  font-size: 0.8125rem;
  color: #1e293b;
}

.percentage-text {
  color: #64748b;
  font-size: 0.75rem;
}

.abandoned-value {
  color: #64748b;
  font-size: 0.8125rem;
}

/* Badges */
.badges-container {
  display: flex;
  gap: 4px;
}

.badges-wrap {
  flex-wrap: wrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.65rem;
  font-weight: 500;
  white-space: nowrap;
}

.badge-vol {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1d4ed8;
}

.badge-inv {
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
  color: #7c3aed;
}

.badge-confirm {
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  color: #0369a1;
}

.badge-not-confirm {
  background: linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%);
  color: #0e7490;
}

.badge-reject {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #b91c1c;
}

.badge-not-paid {
  background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);
  color: #c2410c;
}

.badge-success {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #047857;
}

.badge-human {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #b91c1c;
}

.badge-accept {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #047857;
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
  background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);
  border-radius: 20px;
  margin: 0 auto 20px;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.15);
}

.empty-icon {
  width: 40px;
  height: 40px;
  color: #f97316;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
  letter-spacing: -0.01em;
}

.empty-description {
  font-size: 14px;
  font-weight: 400;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* Loading State */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 380px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.chart-bars-loader {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
  height: 100px;
  margin-bottom: 24px;
}

.bar {
  width: 8px;
  background: linear-gradient(to top, #c67dff 0%, #8b5cf6 50%, #7c3aed 100%);
  border-radius: 4px;
  animation: wave 1.5s ease-in-out infinite;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
}

.bar-1 {
  height: 30%;
  animation-delay: 0s;
}

.bar-2 {
  height: 50%;
  animation-delay: 0.1s;
}

.bar-3 {
  height: 70%;
  animation-delay: 0.2s;
}

.bar-4 {
  height: 50%;
  animation-delay: 0.3s;
}

.bar-5 {
  height: 40%;
  animation-delay: 0.4s;
}

.loading-text {
  font-size: 15px;
  font-weight: 500;
  color: #64748b;
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
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
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
    font-size: 0.75rem;
  }

  .badges-container {
    min-width: 280px;
  }
}

@media (max-width: 768px) {
  .disruption-metrics-card {
    padding: 20px 24px;
    border-radius: 16px;
  }

  .header-content {
    flex-direction: column;
    gap: 16px;
  }

  .payment-success-badge {
    width: 100%;
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
    font-size: 0.65rem;
  }

  .table-cell {
    padding: 12px 8px;
    font-size: 0.75rem;
  }

  .badge {
    font-size: 0.6rem;
    padding: 2px 6px;
  }
}
</style>
