<template>
  <ChartMetricContainer
    class="payment-method-root h-full min-h-0"
    title="Payment Method Metrics"
    subtitle="Sales breakdown by payment method"
  >
    <template
      v-if="enableExport && !loading && hasDailyBreakdown"
      #headerExport
    >
      <FooterExport
        variant="inline"
        @export="handleExport"
        :loading="exportLoading"
      />
    </template>
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
          <CardInfo
            v-for="(pm, index) in metricsData.payment_method_breakdown"
            :key="pm.payment_method"
            class="payment-method-card-item min-w-0"
            :color="cardAccentColors[index % cardAccentColors.length]"
            :title="formatPaymentMethod(pm.payment_method)"
            :value="formatPaymentCardValue(pm)"
            :subvalue="`${formatCount(pm.count)} ${formatCount(pm.count) === 1 ? 'sale' : 'sales'}`"
          />
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

      <!-- Daily Breakdown Table (chrome: Utils/Table) -->
      <section v-if="hasDailyBreakdown" class="payment-method-daily-section">
        <p class="section-label">Daily Breakdown</p>
        <div class="w-full min-w-0">
          <Table
            :columns="paymentDailyColumns"
            :rows="paymentDailyTableRows"
            :max-visible-rows="3"
            row-key="id"
          >
            <template #cell-date="{ row }">
              <span class="font-medium">{{ formatDate(String(row.date)) }}</span>
            </template>
            <template #cell-totalSales="{ row }">
              <span class="text-center">{{ useNumberFormat((row.total_count as number) ?? 0) }}</span>
            </template>
            <template #cell-totalAmount="{ row }">
              <span class="text-center success-value">
                <template v-if="Array.isArray(row.total_amount_by_currency) && row.total_amount_by_currency.length > 0">
                  <div class="currency-cell-list">
                    <span
                      v-for="item in row.total_amount_by_currency"
                      :key="`${row.date}-${item.currency}`"
                    >
                      {{ item.currency }} {{ formatCurrency(item.total_value) }}
                    </span>
                  </div>
                </template>
                <template v-else>{{ formatCurrency(Number(row.total_amount ?? 0)) }}</template>
              </span>
            </template>
            <template #cell-paymentMethods="{ row }">
              <div class="payment-tags">
                <div
                  v-for="pm in (Array.isArray(row.payment_methods) ? row.payment_methods : [])"
                  :key="pm.payment_method"
                  class="payment-tag"
                >
                  <span class="tag-name">{{ formatPaymentMethod(pm.payment_method) }}</span>
                  <span class="tag-separator">•</span>
                  <span class="tag-amount" v-if="!pm.total_amount_by_currency || pm.total_amount_by_currency.length === 0">
                    {{ formatCurrency(pm.total_amount) }}
                  </span>
                  <span v-else class="tag-amount">
                    {{ pm.total_amount_by_currency.map(c => `${c.currency} ${formatCurrency(c.total_value)}`).join(' / ') }}
                  </span>
                  <span class="tag-count">({{ formatCount(pm.count) }})</span>
                </div>
              </div>
            </template>
          </Table>
        </div>
      </section>

      <!-- Empty State for Table when no daily breakdown -->
      <div v-else-if="hasPaymentMethods" class="empty-table-state">
        <p class="empty-table-text">No daily breakdown available</p>
      </div>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { ref, computed, toRef, onMounted, watch } from 'vue'
import moment from 'moment'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import CardInfo from '../../Utils/CardInfo/CardInfo.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useNumberFormat, useCurrencyFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'
import { CreditCardIcon } from '@heroicons/vue/24/outline'
import Table, { type TableColumn } from '../../Utils/Table/Table.vue'

// Types
interface PaymentMethodItem {
  payment_method: string
  count: number
  total_amount: number
  total_amount_by_currency?: CurrencyBreakdown[]
}

interface DayBreakdown {
  date: string
  total_count: number
  total_amount: number
  total_amount_by_currency?: CurrencyBreakdown[]
  payment_methods: PaymentMethodItem[]
}

interface PaymentMethodData {
  airline_name?: string
  start_date?: string
  end_date?: string
  total_conversations?: number
  total_amount?: number
  total_sell_usd?: number
  total_amount_by_currency?: CurrencyBreakdown[]
  payment_method_breakdown?: PaymentMethodItem[]
  payment_method_by_day?: DayBreakdown[]
}

interface CurrencyBreakdown {
  currency: string
  total_value: number
  total_sell_usd?: number
  count: number
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
  total_amount_by_currency: [],
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

const sortedPaymentMethodByDay = computed(() => {
  if (!metricsData.value.payment_method_by_day || metricsData.value.payment_method_by_day.length === 0) {
    return []
  }
  return [...metricsData.value.payment_method_by_day].sort((a, b) => {
    return moment(a.date).valueOf() - moment(b.date).valueOf()
  })
})

const paymentDailyColumns: TableColumn[] = [
  { key: 'date', label: 'Date', align: 'left' },
  { key: 'totalSales', label: 'Total Sales', align: 'center' },
  { key: 'totalAmount', label: 'Total Amount', align: 'center' },
  { key: 'paymentMethods', label: 'Payment Methods', align: 'left' },
]

const paymentDailyTableRows = computed((): Record<string, unknown>[] =>
  sortedPaymentMethodByDay.value.map((day) => ({
    id: day.date,
    date: day.date,
    total_count: day.total_count,
    total_amount: day.total_amount,
    total_amount_by_currency: day.total_amount_by_currency,
    payment_methods: day.payment_methods,
  }))
)

// Normalize payment method data to ensure all fields are present
const normalizePaymentMethodData = (data: PaymentMethodData | null): PaymentMethodData => {
  if (!data) {
    return {
      airline_name: props.airlineName,
      start_date: '',
      end_date: '',
      total_conversations: 0,
      total_amount: 0,
      total_amount_by_currency: [],
      payment_method_breakdown: [],
      payment_method_by_day: [],
    }
  }

  // Normalize payment_method_breakdown
  const normalizedBreakdown = (data.payment_method_breakdown || []).map(pm => ({
    payment_method: pm.payment_method || 'Unknown',
    total_amount: pm.total_amount ?? 0,
    count: pm.count ?? 0,
    total_amount_by_currency: pm.total_amount_by_currency ?? [],
  }))

  // Normalize payment_method_by_day
  const normalizedByDay = (data.payment_method_by_day || []).map(day => ({
    date: day.date || '',
    total_count: day.total_count ?? 0,
    total_amount: day.total_amount ?? 0,
    total_amount_by_currency: day.total_amount_by_currency ?? [],
    payment_methods: (day.payment_methods || []).map(pm => ({
      payment_method: pm.payment_method || 'Unknown',
      total_amount: pm.total_amount ?? 0,
      count: pm.count ?? 0,
      total_amount_by_currency: pm.total_amount_by_currency ?? [],
    })),
  }))

  return {
    airline_name: data.airline_name || props.airlineName,
    start_date: data.start_date || '',
    end_date: data.end_date || '',
    total_conversations: data.total_conversations ?? 0,
    total_amount: data.total_amount ?? 0,
    total_sell_usd: data.total_sell_usd,
    total_amount_by_currency: data.total_amount_by_currency ?? [],
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

/** Accent color for CardInfo indicator dot (cycles by index) */
const cardAccentColors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#f43f5e', '#06b6d4']

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

const formatPaymentCardValue = (pm: PaymentMethodItem): string => {
  const byCur = pm.total_amount_by_currency
  if (byCur && byCur.length > 0) {
    return byCur.map((item) => `${item.currency} ${formatCurrency(item.total_value)}`).join(' · ')
  }
  return formatCurrency(pm.total_amount)
}

// Format date
const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return moment(dateStr).format('MMM DD')
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

.currency-breakdown-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.currency-breakdown-item {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--kiut-text-primary);
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
  /* CardInfo aporta borde/fondo; solo aseguramos grid item */
  min-width: 0;
}

.currency-cell-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.72rem;
  color: var(--kiut-text-secondary);
}

/* Daily breakdown block (Utils/Table) */
.payment-method-daily-section {
  animation: fadeIn 0.6s ease-out 0.1s backwards;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  .payment-method-daily-section {
    overflow-x: auto;
  }
}

</style>



