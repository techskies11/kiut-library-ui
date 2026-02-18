<template>
  <article class="payment-method-card">
    <header class="card-header">
      <div class="header-content">
        <div class="title-section">
          <h3 class="card-title">Payment Method Metrics</h3>
          <p class="card-subtitle">Sales breakdown by payment method</p>
        </div>
        <div class="stats-badge" v-if="!loading && metricsData.total_amount">
          <p class="badge-label">Total Amount</p>
          <p class="badge-value">{{ formatCurrency(metricsData.total_amount) }}</p>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <div class="loading-state" v-if="loading">
      <div class="loading-container">
        <div class="chart-lines-loader">
          <div class="line line-1"></div>
          <div class="line line-2"></div>
          <div class="line line-3"></div>
          <div class="line line-4"></div>
          <div class="line line-5"></div>
        </div>
        <p class="loading-text">Loading payment data...</p>
      </div>
    </div>

    <!-- Content when loaded -->
    <div v-else class="card-body">
      <!-- Payment Method Cards -->
      <section v-if="hasPaymentMethods" class="payment-methods-section">
        <p class="section-label">Sales by Payment Method</p>
        <div class="payment-methods-grid">
          <div
            v-for="(pm, index) in metricsData.payment_method_breakdown"
            :key="pm.payment_method"
            class="payment-method-card-item"
            :style="getCardStyle(index)"
          >
            <div class="payment-card-content">
              <!-- Payment Method Icon & Name -->
              <div class="payment-card-header">
                <component :is="getPaymentIcon(pm.payment_method)" class="payment-icon" :style="getIconStyle(index)" />
                <span class="payment-name" :style="getTextStyle(index)">
                  {{ formatPaymentMethod(pm.payment_method) }}
                </span>
              </div>
              <!-- Amount -->
              <p class="payment-amount" :style="[getValueStyle(index), getAmountSizeStyle(pm.total_amount)]">
                {{ formatCurrency(pm.total_amount) }}
              </p>
              <!-- Count Badge -->
              <div class="payment-badge-wrapper">
                <span class="payment-badge" :style="getBadgeStyle(index)">
                  {{ formatCount(pm.count) }} {{ formatCount(pm.count) === 1 ? 'sale' : 'sales' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Empty State for Cards -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <CreditCardIcon class="empty-icon" />
          </div>
          <p class="empty-title">No payment data available</p>
          <p class="empty-description">No payment method data found for the selected period. Try adjusting the date range.</p>
        </div>
      </section>

      <!-- Daily Breakdown Table -->
      <section v-if="hasDailyBreakdown" class="table-section">
        <p class="section-label">Daily Breakdown</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr class="table-header-row">
                <th class="table-header text-left">Date</th>
                <th class="table-header text-center">Total Sales</th>
                <th class="table-header text-center">Total Amount</th>
                <th class="table-header text-left">Payment Methods</th>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr
                v-for="day in sortedPaymentMethodByDay"
                :key="day.date"
                class="table-row"
              >
                <td class="table-cell font-medium">
                  {{ formatDate(day.date) }}
                </td>
                <td class="table-cell text-center">
                  {{ useNumberFormat(day.total_count ?? 0) }}
                </td>
                <td class="table-cell text-center success-value">
                  {{ formatCurrency(day.total_amount) }}
                </td>
                <td class="table-cell">
                  <div class="payment-tags">
                    <div
                      v-for="pm in day.payment_methods || []"
                      :key="pm.payment_method"
                      class="payment-tag"
                    >
                      <span class="tag-name">{{ formatPaymentMethod(pm.payment_method) }}</span>
                      <span class="tag-separator">•</span>
                      <span class="tag-amount">{{ formatCurrency(pm.total_amount) }}</span>
                      <span class="tag-count">({{ formatCount(pm.count) }})</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <FooterExport v-if="enableExport" @export="handleExport" :loading="exportLoading" />
      </section>

      <!-- Empty State for Table when no daily breakdown -->
      <div v-else-if="hasPaymentMethods" class="empty-table-state">
        <p class="empty-table-text">No daily breakdown available</p>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed, toRef, onMounted, watch } from 'vue'
import moment from 'moment'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useNumberFormat, useCurrencyFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'
import {
  CreditCardIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  DevicePhoneMobileIcon,
  CurrencyDollarIcon,
  WalletIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/vue/24/outline'

// Types
interface PaymentMethodItem {
  payment_method: string
  count: number
  total_amount: number
}

interface DayBreakdown {
  date: string
  total_count: number
  total_amount: number
  payment_methods: PaymentMethodItem[]
}

interface PaymentMethodData {
  airline_name?: string
  start_date?: string
  end_date?: string
  total_conversations?: number
  total_amount?: number
  payment_method_breakdown?: PaymentMethodItem[]
  payment_method_by_day?: DayBreakdown[]
}

// Props
const props = withDefaults(defineProps<{
  /** Optional: pass API response directly instead of using fetchFunction */
  data?: PaymentMethodData | null
  dates?: Date[] | string[]
  airlineName?: string
  fetchFunction?: (airlineName: string, startDate: string, endDate: string) => Promise<PaymentMethodData>
  theme?: Theme
  enableExport?: boolean
  exportLoading?: boolean
}>(), {
  data: undefined,
  dates: () => [],
  airlineName: '',
  fetchFunction: undefined,
  theme: undefined,
  enableExport: false,
  exportLoading: false
})

// Emits
const emit = defineEmits<{
  export: [format: ExportFormat]
}>()

// Theme detection
const { isDark } = useThemeDetection(toRef(props, 'theme'))

// State
const loading = ref(false)
const metricsData = ref<PaymentMethodData>({
  airline_name: '',
  start_date: '',
  end_date: '',
  total_conversations: 0,
  total_amount: 0,
  payment_method_breakdown: [],
  payment_method_by_day: [],
})

// Constants
const UNREGISTERED_PAYMENT_LABEL = 'Not Registered'

// Computed
const hasPaymentMethods = computed(() => {
  return metricsData.value.payment_method_breakdown && metricsData.value.payment_method_breakdown.length > 0
})

const hasDailyBreakdown = computed(() => {
  return metricsData.value.payment_method_by_day && metricsData.value.payment_method_by_day.length > 0
})

// Sort payment_method_by_day by date ascending
const sortedPaymentMethodByDay = computed(() => {
  if (!metricsData.value.payment_method_by_day || metricsData.value.payment_method_by_day.length === 0) {
    return []
  }
  return [...metricsData.value.payment_method_by_day].sort((a, b) => {
    return moment(a.date).valueOf() - moment(b.date).valueOf()
  })
})

// Normalize payment method data to ensure all fields are present
const normalizePaymentMethodData = (data: PaymentMethodData | null): PaymentMethodData => {
  if (!data) {
    return {
      airline_name: props.airlineName,
      start_date: '',
      end_date: '',
      total_conversations: 0,
      total_amount: 0,
      payment_method_breakdown: [],
      payment_method_by_day: [],
    }
  }

  // Normalize payment_method_breakdown
  const normalizedBreakdown = (data.payment_method_breakdown || []).map(pm => ({
    payment_method: pm.payment_method || 'Unknown',
    total_amount: pm.total_amount ?? 0,
    count: pm.count ?? 0,
  }))

  // Normalize payment_method_by_day
  const normalizedByDay = (data.payment_method_by_day || []).map(day => ({
    date: day.date || '',
    total_count: day.total_count ?? 0,
    total_amount: day.total_amount ?? 0,
    payment_methods: (day.payment_methods || []).map(pm => ({
      payment_method: pm.payment_method || 'Unknown',
      total_amount: pm.total_amount ?? 0,
      count: pm.count ?? 0,
    })),
  }))

  return {
    airline_name: data.airline_name || props.airlineName,
    start_date: data.start_date || '',
    end_date: data.end_date || '',
    total_conversations: data.total_conversations ?? 0,
    total_amount: data.total_amount ?? 0,
    payment_method_breakdown: normalizedBreakdown,
    payment_method_by_day: normalizedByDay,
  }
}

// Fetch data function
const searchData = async () => {
  if (!props.fetchFunction || !props.dates || props.dates.length < 2 || !props.airlineName) {
    return
  }

  loading.value = true
  try {
    const [startDate, endDate] = props.dates.map(date => moment(date).format('YYYY-MM-DD'))
    const response = await props.fetchFunction(props.airlineName, startDate, endDate)
    metricsData.value = normalizePaymentMethodData(response)
  } catch (error) {
    console.error('Error fetching payment method metrics:', error)
    metricsData.value = normalizePaymentMethodData(null)
  } finally {
    loading.value = false
  }
}

// Card styling by index
const cardColors = [
  { bg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '#a7f3d0', text: '#047857', value: '#065f46', icon: '#10b981', badge: '#059669' },
  { bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '#93c5fd', text: '#1d4ed8', value: '#1e40af', icon: '#3b82f6', badge: '#2563eb' },
  { bg: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', border: '#d8b4fe', text: '#7c3aed', value: '#6d28d9', icon: '#8b5cf6', badge: '#7c3aed' },
  { bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', border: '#fcd34d', text: '#b45309', value: '#92400e', icon: '#f59e0b', badge: '#d97706' },
  { bg: 'linear-gradient(135deg, #fff1f2 0%, #fce7f3 100%)', border: '#fda4af', text: '#be123c', value: '#9f1239', icon: '#f43f5e', badge: '#e11d48' },
  { bg: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)', border: '#67e8f9', text: '#0e7490', value: '#155e75', icon: '#06b6d4', badge: '#0891b2' },
]

const getCardStyle = (index: number) => {
  const color = cardColors[index % cardColors.length]
  return {
    background: color.bg,
    borderColor: color.border,
  }
}

const getTextStyle = (index: number) => {
  const color = cardColors[index % cardColors.length]
  return { color: color.text }
}

const getValueStyle = (index: number) => {
  const color = cardColors[index % cardColors.length]
  return { color: color.value }
}

const getIconStyle = (index: number) => {
  const color = cardColors[index % cardColors.length]
  return { color: color.icon }
}

const getBadgeStyle = (index: number) => {
  const color = cardColors[index % cardColors.length]
  return { color: color.badge }
}

// Get dynamic font size based on amount length
const getAmountSizeStyle = (amount: number | undefined | null) => {
  const formatted = formatCurrency(amount)
  const length = formatted.length

  if (length > 18) return { fontSize: '0.75rem' } // Very long amounts like $1,234,567,890.00
  if (length > 15) return { fontSize: '0.875rem' } // Long amounts like $123,456,789.00
  if (length > 12) return { fontSize: '1rem' } // Medium amounts like $1,234,567.00
  return { fontSize: '1.125rem' } // Normal amounts
}

// Get appropriate icon for payment method
const getPaymentIcon = (method: string) => {
  const methodLower = method?.toLowerCase() || ''
  // Unregistered/Unknown payment methods
  if (!method || methodLower === 'unknown') return QuestionMarkCircleIcon
  if (methodLower.includes('credit') || methodLower.includes('debit')) return CreditCardIcon
  if (methodLower.includes('cash') || methodLower.includes('efectivo')) return BanknotesIcon
  if (methodLower.includes('bank') || methodLower.includes('transfer')) return BuildingLibraryIcon
  if (methodLower.includes('zelle') || methodLower.includes('pago') || methodLower.includes('movil')) return DevicePhoneMobileIcon
  if (methodLower.includes('wallet')) return WalletIcon
  return CurrencyDollarIcon
}

// Format payment method name
const formatPaymentMethod = (method: string) => {
  if (!method || method.toLowerCase() === 'unknown') return UNREGISTERED_PAYMENT_LABEL
  return method.replace(/_/g, ' ')
}

// Format currency
const formatCurrency = (value: number | undefined | null) => {
  if (value === null || value === undefined) return '$0.00'
  return useCurrencyFormat(value)
}

// Format date
const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return moment(dateStr).format('DD/MM/YYYY')
}

// Format count with default value
const formatCount = (count: number | undefined | null): number => {
  if (count === null || count === undefined || Number.isNaN(Number(count))) return 0
  return Number(count)
}

// Handle export
const handleExport = (format: ExportFormat) => {
  emit('export', format)
}

// Sync metricsData when data prop is provided (no fetch)
function applyDataProp() {
  const d = props.data
  const hasData = d && (
    (Array.isArray(d.payment_method_breakdown) && d.payment_method_breakdown.length > 0) ||
    (Array.isArray(d.payment_method_by_day) && d.payment_method_by_day.length > 0)
  )
  if (hasData) {
    loading.value = false
    metricsData.value = normalizePaymentMethodData(d)
  }
}

// Lifecycle hooks
onMounted(() => {
  if (props.data) {
    applyDataProp()
  } else {
    searchData()
  }
})

watch(
  () => props.data,
  (newData) => {
    if (newData) {
      applyDataProp()
    }
  },
  { deep: true }
)

watch(
  () => props.dates,
  (newDates) => {
    if (props.data) return
    if (newDates && newDates[0] && newDates[1]) {
      searchData()
    }
  },
  { deep: true }
)

// Expose for potential use
defineExpose({ isDark })
</script>

<style scoped>
/* Main Card Styles */
.payment-method-card {
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

.payment-method-card:hover {
  box-shadow: var(--kiut-shadow-card-hover);
  transform: translateY(-2px);
}

/* Header Styles */
.card-header {
  margin-bottom: 28px;
  position: relative;
  text-align: left;
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

/* Stats Badge */
.stats-badge {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  background: var(--kiut-bg-stats-badge);
  border: 1px solid var(--kiut-border-light);
  border-radius: 10px;
  transition: all 0.2s ease;
  text-align: center;
  min-width: 80px;
}

.stats-badge:hover {
  background: var(--kiut-bg-card);
  border-color: var(--kiut-border-color);
}

.badge-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--kiut-text-secondary);
  line-height: 1.2;
  margin: 0;
}

.badge-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--kiut-text-primary);
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0;
}

/* Card Body */
.card-body {
  animation: fadeIn 0.5s ease-out;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Section Label */
.section-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--kiut-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 12px 0;
}

/* Payment Methods Grid */
.payment-methods-section {
  margin-bottom: 28px;
  animation: fadeIn 0.5s ease-out;
}

.payment-methods-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (min-width: 768px) {
  .payment-methods-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .payment-methods-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

.payment-method-card-item {
  border-radius: 12px;
  border: 1px solid;
  padding: 16px;
  transition: all 0.2s ease;
  cursor: default;
}

.payment-method-card-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.payment-card-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.payment-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.payment-icon {
  width: 20px;
  height: 20px;
}

.payment-name {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
}

.payment-amount {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.payment-badge-wrapper {
  display: flex;
  align-items: center;
  gap: 4px;
}

.payment-badge {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.6);
  font-weight: 500;
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

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.font-medium {
  font-weight: 500;
}

.success-value {
  font-weight: 600;
  color: var(--kiut-success);
}

/* Payment Tags in Table */
.payment-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.payment-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--kiut-bg-stats-badge);
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 0.8125rem;
}

.tag-name {
  font-weight: 500;
  text-transform: capitalize;
  color: var(--kiut-text-primary);
}

.tag-separator {
  color: var(--kiut-text-muted);
}

.tag-amount {
  font-weight: 600;
  color: var(--kiut-success);
}

.tag-count {
  font-size: 0.75rem;
  color: var(--kiut-text-muted);
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

.empty-table-state {
  padding: 32px;
  text-align: center;
}

.empty-table-text {
  font-size: 0.875rem;
  color: var(--kiut-text-muted);
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

.chart-lines-loader {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
  height: 100px;
  margin-bottom: 24px;
}

.line {
  width: 8px;
  background: linear-gradient(to top, var(--kiut-primary-light) 0%, var(--kiut-primary) 50%, var(--kiut-primary-hover) 100%);
  border-radius: 4px;
  animation: wave 1.5s ease-in-out infinite;
  box-shadow: var(--kiut-shadow-loader);
}

.line-1 { height: 30%; animation-delay: 0s; }
.line-2 { height: 50%; animation-delay: 0.1s; }
.line-3 { height: 70%; animation-delay: 0.2s; }
.line-4 { height: 50%; animation-delay: 0.3s; }
.line-5 { height: 40%; animation-delay: 0.4s; }

.loading-text {
  font-size: 15px;
  font-weight: 500;
  color: var(--kiut-text-secondary);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  letter-spacing: -0.01em;
  margin: 0;
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
  .payment-method-card {
    padding: 20px 24px;
    border-radius: 16px;
  }

  .header-content {
    flex-direction: column;
    gap: 16px;
  }

  .stats-badge {
    min-width: auto;
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



