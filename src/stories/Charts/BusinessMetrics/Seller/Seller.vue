<template>
  <article class="seller-metrics-card">
    <header class="card-header">
      <div class="header-content">
        <div class="title-section">
          <h3 class="card-title">Seller Metrics</h3>
          <p class="card-subtitle">Sales performance and failure analysis</p>
        </div>
        <div class="total-sales-badge">
          <p class="badge-label">Total Sales Value</p>
          <p class="badge-value">{{ useCurrencyFormat(sellerData.total_value_sell_success) }}</p>
        </div>
      </div>
    </header>

    <!-- Loading State con animación CSS personalizada -->
    <div class="loading-state" v-if="loading">
      <div class="loading-container">
        <div class="chart-flow-loader">
          <div class="flow-line flow-1"></div>
          <div class="flow-line flow-2"></div>
          <div class="flow-line flow-3"></div>
          <div class="flow-line flow-4"></div>
          <div class="flow-line flow-5"></div>
        </div>
        <p class="loading-text">Loading sales data...</p>
      </div>
    </div>

    <!-- Content when loaded -->
    <div v-else class="card-body">
      <!-- Sankey Flow Chart -->
      <section v-if="sankeyData.nodes.length > 0" class="chart-section">
        <div class="chart-wrapper">
          <SankeyChart
            :data="sankeyData"
            :node-colors="sankeyNodeColors"
            title=""
            height="320px"
          />
        </div>
      </section>

      <!-- Empty State for Chart -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="empty-title">No sales data available</p>
          <p class="empty-description">No sales data found for the selected period. Try adjusting the date range.</p>
        </div>
      </section>

      <!-- Table Data -->
      <section v-if="tableData && tableData.length > 0" class="table-section">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr class="table-header-row">
                <th class="table-header">Date</th>
                <th class="table-header">Sell Initiated</th>
                <th class="table-header">Sell Started</th>
                <th class="table-header">Get Quote</th>
                <th class="table-header">Booking Created</th>
                <th class="table-header">Sell Success</th>
                <th class="table-header">Total Sales Value</th>
                <th class="table-header">Failed</th>
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
                  {{ useNumberFormat(row.seller_conversations || 0) }}
                </td>
                <td class="table-cell text-center">
                  {{ formatValueWithPercentage(row.sell_started_count, row.seller_conversations || row.sell_started_count) }}
                </td>
                <td class="table-cell text-center">
                  {{ formatValueWithPercentage(row.sell_get_quote_count, row.seller_conversations || row.sell_started_count) }}
                </td>
                <td class="table-cell text-center">
                  {{ formatValueWithPercentage(row.sell_booking_created_count, row.seller_conversations || row.sell_started_count) }}
                </td>
                <td class="table-cell text-center">
                  {{ formatValueWithPercentage(row.sell_success_count, row.seller_conversations || row.sell_started_count) }}
                </td>
                <td class="table-cell text-center success-value">
                  {{ useCurrencyFormat(row.daily_value_sell_success) }}
                </td>
                <td class="table-cell text-left">
                  <div v-if="row.reasons && row.reasons.length > 0" class="failed-reasons">
                    <div
                      v-for="reason in row.reasons"
                      :key="reason.reason"
                      class="failed-reason-item"
                    >
                      <span class="reason-name">{{ reason.reason }}:</span>
                      <span class="reason-count">{{ reason.failed_count }}</span>
                    </div>
                  </div>
                  <div v-else class="empty-cell">-</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import moment from 'moment'
import {
  getSellerMetrics,
  getSellerFailedMetrics,
} from '../../../../services/modules/business-metrics'
import SankeyChart from '../../Sankey/SankeyChart.vue'
import { useNumberFormat, useCurrencyFormat } from '../../../../plugins/numberFormat'

interface FailedReason {
  reason: string;
  failed_count: number;
}

interface SellerDayData {
  date: string;
  seller_conversations: number;
  sell_started_count: number;
  sell_get_quote_count: number;
  sell_booking_created_count: number;
  sell_success_count: number;
  daily_value_sell_success: number;
  reasons?: FailedReason[];
}

interface SellerData {
  total_seller_conversations: number;
  total_sell_started: number;
  total_sell_get_quote: number;
  total_sell_booking_created: number;
  total_sell_success: number;
  total_value_sell_success: number;
  seller_by_day: SellerDayData[];
}

interface FailedData {
  total_sell_failed: number;
  failed_by_reason_by_day: {
    date: string;
    reasons: FailedReason[];
  }[];
}

const props = withDefaults(defineProps<{
  dates?: Date[];
  airline_name?: string;
}>(), {
  dates: () => [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()],
  airline_name: 'default_airline'
})

const loading = ref(true)
const tableData = ref<SellerDayData[]>([])

const sellerData = ref<SellerData>({
  total_seller_conversations: 0,
  total_sell_started: 0,
  total_sell_get_quote: 0,
  total_sell_booking_created: 0,
  total_sell_success: 0,
  total_value_sell_success: 0,
  seller_by_day: [],
})

const failedData = ref<FailedData>({
  total_sell_failed: 0,
  failed_by_reason_by_day: [],
})

const sankeyData = computed(() => {
  const {
    total_seller_conversations: conversations = 0,
    total_sell_started: started = 0,
    total_sell_booking_created: bookingCreated = 0,
    total_sell_success: success = 0,
  } = sellerData.value
  const { failed_by_reason_by_day = [] } = failedData.value

  if (conversations === 0) return { nodes: [], links: [] }

  const nodes: { name: string; value: number }[] = [
    { name: 'Sell Initiated', value: conversations },
    { name: 'Sell Started', value: started },
    { name: 'Booking Created', value: bookingCreated },
    { name: 'Sell Success', value: success },
  ]

  const links: { source: string; target: string; value: number; label: string }[] = []

  // Initial drop-off
  const droppedBeforeSales = conversations - started
  if (droppedBeforeSales > 0) {
    const percentage = Math.round((droppedBeforeSales / conversations) * 100)
    nodes.push({ name: 'Abandoned (Init)', value: droppedBeforeSales })
    links.push({
      source: 'Sell Initiated',
      target: 'Abandoned (Init)',
      value: droppedBeforeSales,
      label: `${droppedBeforeSales.toLocaleString()} (${percentage}%)`,
    })
  }

  // Flow from Conversations to Sell Started
  if (started > 0) {
    const percentage = Math.round((started / conversations) * 100)
    links.push({
      source: 'Sell Initiated',
      target: 'Sell Started',
      value: started,
      label: `${started.toLocaleString()} (${percentage}%)`,
    })
  }

  // Collect all failure reasons
  const failedByReasons: Record<string, number> = failed_by_reason_by_day.reduce((acc, dayData) => {
    if (dayData.reasons && Array.isArray(dayData.reasons)) {
      dayData.reasons.forEach(reasonData => {
        const reason = reasonData.reason
        const count = reasonData.failed_count
        acc[reason] = (acc[reason] || 0) + count
      })
    }
    return acc
  }, {} as Record<string, number>)

  // Main sequential flow
  if (bookingCreated > 0) {
    const percentage = Math.round((bookingCreated / conversations) * 100)
    links.push({
      source: 'Sell Started',
      target: 'Booking Created',
      value: bookingCreated,
      label: `${bookingCreated.toLocaleString()} (${percentage}%)`,
    })
  }

  if (success > 0) {
    const percentage = Math.round((success / conversations) * 100)
    links.push({
      source: 'Booking Created',
      target: 'Sell Success',
      value: success,
      label: `${success.toLocaleString()} (${percentage}%)`,
    })
  }

  // Failed flows
  const failedAtBooking = started - bookingCreated
  if (failedAtBooking > 0) {
    const percentage = Math.round((failedAtBooking / conversations) * 100)
    nodes.push({ name: 'Failed at Booking', value: failedAtBooking })
    links.push({
      source: 'Sell Started',
      target: 'Failed at Booking',
      value: failedAtBooking,
      label: `${failedAtBooking.toLocaleString()} (${percentage}%)`,
    })
  }

  // Specific failure reasons
  if (Object.keys(failedByReasons).length > 0) {
    const totalFailedReasons = Object.values(failedByReasons).reduce((sum, count) => sum + count, 0)
    const withoutReason = failedAtBooking - totalFailedReasons

    Object.entries(failedByReasons)
      .filter(([, count]) => count > 0)
      .sort(([, a], [, b]) => b - a)
      .forEach(([reason, count]) => {
        const percentage = Math.round((count / conversations) * 100)
        nodes.push({ name: `Failed: ${reason}`, value: count })
        links.push({
          source: 'Failed at Booking',
          target: `Failed: ${reason}`,
          value: count,
          label: `${count.toLocaleString()} (${percentage}%)`,
        })
      })

    if (withoutReason > 0) {
      const percentage = Math.round((withoutReason / conversations) * 100)
      nodes.push({ name: 'Failed: Without Reason', value: withoutReason })
      links.push({
        source: 'Failed at Booking',
        target: 'Failed: Without Reason',
        value: withoutReason,
        label: `${withoutReason.toLocaleString()} (${percentage}%)`,
      })
    }
  }

  const failedAtCompletion = bookingCreated - success
  if (failedAtCompletion > 0) {
    const percentage = Math.round((failedAtCompletion / conversations) * 100)
    nodes.push({ name: 'Failed at Completion', value: failedAtCompletion })
    links.push({
      source: 'Booking Created',
      target: 'Failed at Completion',
      value: failedAtCompletion,
      label: `${failedAtCompletion.toLocaleString()} (${percentage}%)`,
    })
  }

  return { nodes, links }
})

const SANKEY_SELLER_COLORS: Record<string, string> = {
  'Sell Initiated': '#DBEAFE',
  'Abandoned (Init)': '#FEE2E2',
  'Sell Started': '#93C5FD',
  'Get Quote': '#C7D2FE',
  'Booking Created': '#8B8CF6',
  'Sell Success': '#7BE39E',
  'Sell Failed': '#FCA5A5',
  'Failed at Quote': '#FCA5A5',
  'Failed at Booking': '#F87171',
  'Failed at Completion': '#EF4444',
  'Failed: rejected': '#F87171',
  'Failed: payment_processing': '#EF4444',
  'Failed: seat_selection': '#F87171',
  'Failed: booking_validation': '#EF4444',
  'Failed: flight_availability': '#DC2626',
  'Failed: passenger_data': '#F87171',
  'Failed: system_error': '#DC2626',
  'Failed: timeout': '#EF4444',
  'Failed: Without Reason': '#F87171',
}

const sankeyNodeColors = computed(() => SANKEY_SELLER_COLORS)

const calculatePercentage = (value: number, total: number): string => {
  if (!total || total === 0) return '0%'
  return `${Math.round((value / total) * 100)}%`
}

const formatValueWithPercentage = (value: number, total: number): string => {
  const formattedValue = useNumberFormat(value)
  const percentage = calculatePercentage(value, total)
  return `${formattedValue} (${percentage})`
}

const DEFAULT_SELLER_DATA: SellerData = {
  total_seller_conversations: 0,
  total_sell_started: 0,
  total_sell_get_quote: 0,
  total_sell_booking_created: 0,
  total_sell_success: 0,
  total_value_sell_success: 0,
  seller_by_day: [],
}

const DEFAULT_FAILED_DATA: FailedData = {
  total_sell_failed: 0,
  failed_by_reason_by_day: [],
}

const searchData = async () => {
  loading.value = true

  try {
    const [startDate, endDate] = props.dates.map(date => moment(date).format('YYYY-MM-DD'))

    const [sellerResponse, failedResponse] = await Promise.all([
      getSellerMetrics(props.airline_name, startDate, endDate),
      getSellerFailedMetrics(props.airline_name, startDate, endDate),
    ])

    sellerData.value = sellerResponse
    failedData.value = failedResponse
    tableData.value = [...sellerResponse.seller_by_day]

    // Merge failed data with seller data by date
    failedResponse.failed_by_reason_by_day.forEach((failedItem: { date: string; reasons: FailedReason[] }) => {
      const idx = tableData.value.findIndex(sellerItem => sellerItem.date === failedItem.date)
      if (idx !== -1) {
        tableData.value[idx] = { ...tableData.value[idx], reasons: failedItem.reasons }
      } else {
        tableData.value.push({
          date: failedItem.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: failedItem.reasons,
        })
      }
    })

    // Sort by date
    tableData.value.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  } catch (error) {
    console.error('Error fetching seller metrics:', error)
    sellerData.value = DEFAULT_SELLER_DATA
    failedData.value = DEFAULT_FAILED_DATA
  } finally {
    loading.value = false
  }
}

onMounted(searchData)
watch(
  () => props.dates,
  (newDates) => {
    if (newDates?.[0] && newDates?.[1]) searchData()
  },
  { deep: true }
)
</script>

<style scoped>
/* Main Card Styles */
.seller-metrics-card {
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

.seller-metrics-card:hover {
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

.total-sales-badge {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 16px;
  padding: 16px 24px;
  min-width: 140px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.total-sales-badge:hover {
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

.success-value {
  font-weight: 600;
  color: #059669;
}

.failed-reasons {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.failed-reason-item {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 0.75rem;
}

.reason-name {
  color: #64748b;
  text-transform: capitalize;
}

.reason-count {
  font-weight: 600;
  color: #ef4444;
}

.empty-cell {
  text-align: center;
  color: #cbd5e1;
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
  background: linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%);
  border-radius: 20px;
  margin: 0 auto 20px;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
}

.empty-icon {
  width: 40px;
  height: 40px;
  color: #8b5cf6;
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
  background: linear-gradient(to top, #c67dff 0%, #8b5cf6 50%, #7c3aed 100%);
  border-radius: 5px;
  animation: wave 1.5s ease-in-out infinite;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
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
}

@media (max-width: 768px) {
  .seller-metrics-card {
    padding: 20px 24px;
    border-radius: 16px;
  }

  .header-content {
    flex-direction: column;
    gap: 16px;
  }

  .total-sales-badge {
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

