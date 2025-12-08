<template>
  <article class="booking-manager-card">
    <header class="card-header">
      <div class="header-content">
        <div class="title-section">
          <h3 class="card-title">Booking Manager Metrics</h3>
          <p class="card-subtitle">Booking manager workflow tracking and analysis</p>
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
        <div class="chart-flow-loader">
          <div class="flow-line flow-1"></div>
          <div class="flow-line flow-2"></div>
          <div class="flow-line flow-3"></div>
          <div class="flow-line flow-4"></div>
          <div class="flow-line flow-5"></div>
        </div>
        <p class="loading-text">Loading booking data...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="props.error" class="error-state">
      <div class="error-content">
        <div class="error-icon-wrapper">
          <svg class="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p class="error-title">Error loading data</p>
        <p class="error-description">{{ props.error }}</p>
      </div>
    </div>

    <!-- Content when loaded -->
    <div v-else class="card-body">
      <!-- Sankey Flow Chart -->
      <section class="chart-section">
        <div class="chart-wrapper">
          <SankeyChart
            :data="sankeyData"
            :node-colors="nodeColors"
            height="500px"
            :node-gap="15"
          />
        </div>
      </section>

      <!-- Daily Overview Table -->
      <section v-if="sortedDayData.length > 0" class="table-section">
        <div class="section-header">
          <h4 class="section-title">Daily Overview</h4>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr class="table-header-row">
                <th class="table-header">Date</th>
                <th class="table-header">Initiated</th>
                <th class="table-header">Started</th>
                <th class="table-header">Payment Initiated</th>
                <th class="table-header">Payment Results</th>
                <th class="table-header">Outcomes</th>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr
                v-for="day in sortedDayData"
                :key="day.date"
                class="table-row"
              >
                <td class="table-cell font-medium">
                  {{ moment(day.date).format('DD/MM/YYYY') }}
                </td>
                <td class="table-cell text-center">
                  {{ useNumberFormat(day.booking_initiated_count) }}
                </td>
                <td class="table-cell text-center">
                  {{ useNumberFormat(day.booking_started_count) }}
                  <span class="percentage-text">
                    ({{ calculatePercentage(day.booking_started_count, day.booking_initiated_count) }})
                  </span>
                </td>
                <td class="table-cell text-center">
                  {{ useNumberFormat(day.payment_initiated_count) }}
                </td>
                <td class="table-cell">
                  <div class="badges-container">
                    <span class="badge badge-success">
                      Success: {{ day.payment_success_count ? useNumberFormat(day.payment_success_count) : 'N/A' }}
                    </span>
                    <span class="badge badge-error">
                      Failed: {{ day.payment_failed_count ? useNumberFormat(day.payment_failed_count) : 'N/A' }}
                    </span>
                  </div>
                </td>
                <td class="table-cell">
                  <div class="badges-container">
                    <span class="badge badge-error">
                      Not Found: {{ day.not_found_count ? useNumberFormat(day.not_found_count) : 'N/A' }}
                    </span>
                    <span class="badge badge-warning">
                      Cancelled: {{ day.cancelled_count ? useNumberFormat(day.cancelled_count) : 'N/A' }}
                    </span>
                    <span class="badge badge-yellow">
                      No Balance: {{ day.no_pending_balance_count ? useNumberFormat(day.no_pending_balance_count) : 'N/A' }}
                    </span>
                    <span class="badge badge-error">
                      Errors: {{ day.error_count ? useNumberFormat(day.error_count) : 'N/A' }}
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p class="empty-title">No booking manager data available</p>
          <p class="empty-description">No booking manager data found for the selected period. Try adjusting the date range.</p>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'
import SankeyChart from '../../Sankey/SankeyChart.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useNumberFormat } from '../../../../plugins/numberFormat'

interface BookingDayData {
  date: string;
  booking_initiated_count: number;
  booking_started_count: number;
  payment_initiated_count: number;
  not_found_count: number;
  cancelled_count: number;
  no_pending_balance_count: number;
  error_count: number;
  payment_success_count: number;
  payment_failed_count: number;
}

interface BookingData {
  total_booking_initiated: number;
  total_booking_started: number;
  total_payment_initiated: number;
  total_not_found: number;
  total_cancelled: number;
  total_no_pending_balance: number;
  total_errors: number;
  total_payment_success: number;
  total_payment_failed: number;
  booking_manager_by_day: BookingDayData[];
}

const props = withDefaults(defineProps<{
  data?: BookingData;
  loading?: boolean;
  error?: string | null;
  enableExport?: boolean;
}>(), {
  data: () => ({
    total_booking_initiated: 0,
    total_booking_started: 0,
    total_payment_initiated: 0,
    total_not_found: 0,
    total_cancelled: 0,
    total_no_pending_balance: 0,
    total_errors: 0,
    total_payment_success: 0,
    total_payment_failed: 0,
    booking_manager_by_day: [],
  }),
  loading: false,
  error: null,
  enableExport: false
})

const emit = defineEmits<{
  export: [format: ExportFormat]
}>()

const handleExport = (format: ExportFormat) => {
  emit('export', format)
}

// Computed para ordenar los datos por día
const sortedDayData = computed(() => {
  if (!props.data?.booking_manager_by_day) return []
  return [...props.data.booking_manager_by_day].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
})

const sankeyData = computed(() => {
  const data = props.data
  const initiated = data.total_booking_initiated || 0
  const started = data.total_booking_started || 0
  const paymentInitiated = data.total_payment_initiated || 0
  const notFound = data.total_not_found || 0
  const cancelled = data.total_cancelled || 0
  const noPendingBalance = data.total_no_pending_balance || 0
  const errors = data.total_errors || 0
  const paymentSuccess = data.total_payment_success || 0
  const paymentFailed = data.total_payment_failed || 0

  // Calculate abandoned values
  const abandonedFromInitiated = Math.max(0, initiated - started)
  const abandonedFromStarted = Math.max(0, started - paymentInitiated - notFound - cancelled - noPendingBalance - errors)

  // Helper function to format label with percentage
  const formatLabel = (value: number, total: number): string => {
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0
    return `${value.toLocaleString()} (${percentage}%)`
  }

  // Define nodes
  const nodes = [
    { name: 'Initiated' },
    { name: 'Started' },
    { name: 'Payment Initiated' },
    { name: 'Not Found' },
    { name: 'Cancelled' },
    { name: 'No Pending Balance' },
    { name: 'Errors' },
    { name: 'Payment Success' },
    { name: 'Payment Failed' },
    { name: 'Abandoned (Init)' },
    { name: 'Abandoned (Start)' },
  ]

  // Define links with flows
  const links: { source: string; target: string; value: number; label: string }[] = []

  // First level: Initiated splits
  if (started > 0) {
    links.push({
      source: 'Initiated',
      target: 'Started',
      value: started,
      label: formatLabel(started, initiated),
    })
  }

  if (abandonedFromInitiated > 0) {
    links.push({
      source: 'Initiated',
      target: 'Abandoned (Init)',
      value: abandonedFromInitiated,
      label: formatLabel(abandonedFromInitiated, initiated),
    })
  }

  // Second level: Started splits
  if (paymentInitiated > 0) {
    links.push({
      source: 'Started',
      target: 'Payment Initiated',
      value: paymentInitiated,
      label: formatLabel(paymentInitiated, started),
    })
  }

  if (notFound > 0) {
    links.push({
      source: 'Started',
      target: 'Not Found',
      value: notFound,
      label: formatLabel(notFound, started),
    })
  }

  if (cancelled > 0) {
    links.push({
      source: 'Started',
      target: 'Cancelled',
      value: cancelled,
      label: formatLabel(cancelled, started),
    })
  }

  if (noPendingBalance > 0) {
    links.push({
      source: 'Started',
      target: 'No Pending Balance',
      value: noPendingBalance,
      label: formatLabel(noPendingBalance, started),
    })
  }

  if (errors > 0) {
    links.push({
      source: 'Started',
      target: 'Errors',
      value: errors,
      label: formatLabel(errors, started),
    })
  }

  if (abandonedFromStarted > 0) {
    links.push({
      source: 'Started',
      target: 'Abandoned (Start)',
      value: abandonedFromStarted,
      label: formatLabel(abandonedFromStarted, started),
    })
  }

  // Third level: Payment Initiated splits
  if (paymentSuccess > 0) {
    links.push({
      source: 'Payment Initiated',
      target: 'Payment Success',
      value: paymentSuccess,
      label: formatLabel(paymentSuccess, paymentInitiated),
    })
  }

  if (paymentFailed > 0) {
    links.push({
      source: 'Payment Initiated',
      target: 'Payment Failed',
      value: paymentFailed,
      label: formatLabel(paymentFailed, paymentInitiated),
    })
  }

  return { nodes, links }
})

const nodeColors: Record<string, string> = {
  'Initiated': '#DBEAFE',
  'Started': '#93C5FD',
  'Payment Initiated': '#FED7AA',
  'Not Found': '#FECACA',
  'Cancelled': '#FED7AA',
  'No Pending Balance': '#FEF08A',
  'Errors': '#FCA5A5',
  'Payment Success': '#86EFAC',
  'Payment Failed': '#FCA5A5',
  'Abandoned (Init)': '#FEE2E2',
  'Abandoned (Start)': '#FEE2E2',
}

const calculatePercentage = (value: number, total: number): string => {
  if (!total || total === 0) return '0%'
  return `${Math.round((value / total) * 100)}%`
}
</script>

<style scoped>
/* Main Card Styles */
.booking-manager-card {
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

.booking-manager-card:hover {
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
  font-size: 0.875rem;
  border-collapse: separate;
  border-spacing: 0;
}

.table-header-row {
  background: linear-gradient(to bottom, #f9fafb 0%, #f3f4f6 100%);
}

.table-header {
  padding: 16px 12px;
  text-align: center;
  font-size: 0.75rem;
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
  padding: 16px 12px;
  font-size: 0.875rem;
  color: #1e293b;
  white-space: nowrap;
}

.percentage-text {
  color: #64748b;
  font-size: 0.8125rem;
}

/* Badges */
.badges-container {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-success {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
}

.badge-error {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #991b1b;
}

.badge-warning {
  background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);
  color: #9a3412;
}

.badge-yellow {
  background: linear-gradient(135deg, #fef9c3 0%, #fef08a 100%);
  color: #854d0e;
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
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border-radius: 20px;
  margin: 0 auto 20px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.empty-icon {
  width: 40px;
  height: 40px;
  color: #3b82f6;
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

/* Error State */
.error-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
}

.error-content {
  text-align: center;
  max-width: 360px;
  animation: fadeIn 0.6s ease-out;
}

.error-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border-radius: 20px;
  margin: 0 auto 20px;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
}

.error-icon {
  width: 40px;
  height: 40px;
  color: #ef4444;
}

.error-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
  letter-spacing: -0.01em;
}

.error-description {
  font-size: 14px;
  font-weight: 400;
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.retry-button {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 10px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.retry-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
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
  background: linear-gradient(to top, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
  border-radius: 5px;
  animation: wave 1.5s ease-in-out infinite;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.flow-1 {
  height: 35%;
  animation-delay: 0s;
}

.flow-2 {
  height: 55%;
  animation-delay: 0.1s;
}

.flow-3 {
  height: 75%;
  animation-delay: 0.2s;
}

.flow-4 {
  height: 55%;
  animation-delay: 0.3s;
}

.flow-5 {
  height: 45%;
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
    font-size: 0.8125rem;
  }

  .badges-container {
    min-width: 200px;
  }
}

@media (max-width: 768px) {
  .booking-manager-card {
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
    font-size: 0.7rem;
  }

  .table-cell {
    padding: 12px 8px;
    font-size: 0.8125rem;
  }
}
</style>

