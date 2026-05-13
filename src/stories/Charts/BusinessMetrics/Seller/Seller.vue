<template>
  <ChartMetricContainer
    class="seller-metrics-root h-full min-h-0"
    title="Seller Metrics"
    subtitle="Sales performance and failure analysis"
    :default-open="initiallyOpen"
  >
    <template
      v-if="enableExport && !props.loading && tableData && tableData.length > 0"
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

      <section class="seller-value-cards">
        <CardInfo
          class="seller-value-card"
          color="var(--kiut-success)"
          title="Total Sales Value"
          :value="totalSalesCardValue"
        />
        <CardInfo
          class="seller-value-card"
          color="#d97706"
          title="Bank Transfer Value"
          :value="bankTransferCardValue"
        />
        <CardInfo
          class="seller-value-card"
          color="#ca8a04"
          title="Cash Option Value"
          :value="cashOptionCardValue"
        />
      </section>

      <!-- Table Data (chrome: Utils/Table) -->
      <section v-if="tableData && tableData.length > 0" class="seller-daily-section">
        <div class="w-full min-w-0">
          <Table
            :columns="sellerTableColumns"
            :rows="sellerTableRows"
            :max-visible-rows="3"
            row-key="id"
          >
            <template #cell-date="{ row }">
              <span class="sl-cell font-medium">{{ moment(String(row.date)).format('MMM DD') }}</span>
            </template>
            <template #cell-sellInitiated="{ row }">
              <span class="sl-cell text-center">{{ useNumberFormat(Number(row.seller_conversations) || 0) }}</span>
            </template>
            <template #cell-sellStarted="{ row }">
              <span class="sl-cell text-center">{{ formatValueWithPercentage(sellerDayFromRow(row).sell_started_count, sellerDayFromRow(row).seller_conversations || sellerDayFromRow(row).sell_started_count) }}</span>
            </template>
            <template #cell-getQuote="{ row }">
              <span class="sl-cell text-center">{{ formatValueWithPercentage(sellerDayFromRow(row).sell_get_quote_count, sellerDayFromRow(row).seller_conversations || sellerDayFromRow(row).sell_started_count) }}</span>
            </template>
            <template #cell-bookingCreated="{ row }">
              <span class="sl-cell text-center">{{ formatValueWithPercentage(sellerDayFromRow(row).sell_booking_created_count, sellerDayFromRow(row).seller_conversations || sellerDayFromRow(row).sell_started_count) }}</span>
            </template>
            <template #cell-bankTransfer="{ row }">
              <span class="sl-cell text-center">{{ useNumberFormat(Number(row.sell_bank_transfer_count) || 0) }}</span>
            </template>
            <template #cell-btValue="{ row }">
              <span class="sl-cell text-center success-value">
                <div
                  v-if="Array.isArray(sellerDayFromRow(row).daily_value_sell_success_bank_transfer) && (sellerDayFromRow(row).daily_value_sell_success_bank_transfer as CurrencyValue[]).length > 0"
                  class="currency-cell-list"
                >
                  <span
                    v-for="item in (sellerDayFromRow(row).daily_value_sell_success_bank_transfer as CurrencyValue[])"
                    :key="`${row.date}-bt-success-${item.currency}`"
                  >
                    {{ item.currency }} {{ useCompactCurrencyFormat(item.total_value) }}
                  </span>
                </div>
                <span v-else class="empty-cell">-</span>
              </span>
            </template>
            <template #cell-btSuccess="{ row }">
              <span class="sl-cell text-center success-value">{{ useNumberFormat(Number(sellerDayFromRow(row).sell_success_bank_transfer_count) || 0) }}</span>
            </template>
            <template #cell-cashOption="{ row }">
              <span class="sl-cell text-center">{{ useNumberFormat(Number(row.sell_cash_option_count) || 0) }}</span>
            </template>
            <template #cell-coValue="{ row }">
              <span class="sl-cell text-center success-value">
                <div
                  v-if="Array.isArray(sellerDayFromRow(row).daily_value_sell_success_cash) && (sellerDayFromRow(row).daily_value_sell_success_cash as CurrencyValue[]).length > 0"
                  class="currency-cell-list"
                >
                  <span
                    v-for="item in (sellerDayFromRow(row).daily_value_sell_success_cash as CurrencyValue[])"
                    :key="`${row.date}-co-success-${item.currency}`"
                  >
                    {{ item.currency }} {{ useCompactCurrencyFormat(item.total_value) }}
                  </span>
                </div>
                <span v-else class="empty-cell">-</span>
              </span>
            </template>
            <template #cell-cashSuccess="{ row }">
              <span class="sl-cell text-center success-value">{{ useNumberFormat(Number(sellerDayFromRow(row).sell_success_cash_count) || 0) }}</span>
            </template>
            <template #cell-sellSuccess="{ row }">
              <span class="sl-cell text-center">{{ formatValueWithPercentage(sellerDayFromRow(row).sell_success_count, sellerDayFromRow(row).seller_conversations || sellerDayFromRow(row).sell_started_count) }}</span>
            </template>
            <template #cell-totalSalesValue="{ row }">
              <span class="sl-cell text-center success-value">
                <div
                  v-if="Array.isArray(row.daily_value_sell_success) && row.daily_value_sell_success.length > 0"
                  class="currency-cell-list"
                >
                  <span
                    v-for="item in row.daily_value_sell_success"
                    :key="`${row.date}-${item.currency}`"
                  >
                    {{ item.currency }} {{ useCompactCurrencyFormat(item.total_value) }}
                  </span>
                </div>
                <span v-else>{{ formatCurrencyValue(sellerDayFromRow(row).daily_value_sell_success) }}</span>
              </span>
            </template>
            <template #cell-failed="{ row }">
              <div v-if="(sellerDayFromRow(row).reasons || []).length > 0" class="failed-reasons">
                <div
                  v-for="reason in (sellerDayFromRow(row).reasons || [])"
                  :key="reason.reason"
                  class="failed-reason-item"
                >
                  <span class="reason-name">{{ reason.reason }}:</span>
                  <span class="reason-count">{{ reason.failed_count }}</span>
                </div>
              </div>
              <div v-else class="empty-cell">-</div>
            </template>
          </Table>
        </div>
      </section>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import moment from 'moment'
import SankeyChart from '../../Sankey/SankeyChart.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useNumberFormat, useCurrencyFormat, useCompactCurrencyFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'
import Table, { type TableColumn } from '../../Utils/Table/Table.vue'
import CardInfo from '../../Utils/CardInfo/CardInfo.vue'

interface FailedReason {
  reason: string;
  failed_count: number;
}

interface CurrencyValue {
  currency: string;
  total_value: number;
  count: number;
}

interface SellerDayData {
  date: string;
  seller_conversations: number;
  sell_started_count: number;
  sell_get_quote_count: number;
  sell_booking_created_count: number;
  sell_success_count: number;
  sell_bank_transfer_count: number;
  sell_cash_option_count: number;
  sell_success_bank_transfer_count?: number;
  sell_success_cash_count?: number;
  daily_value_sell_success: number | CurrencyValue[];
  daily_value_sell_bank_transfer: CurrencyValue[];
  daily_value_sell_cash_option: CurrencyValue[];
  daily_value_sell_success_bank_transfer?: CurrencyValue[];
  daily_value_sell_success_cash?: CurrencyValue[];
  reasons?: FailedReason[];
}

function sellerDayFromRow(r: Record<string, unknown>): SellerDayData {
  return r as unknown as SellerDayData
}

interface SellerData {
  total_seller_conversations: number;
  total_sell_started: number;
  total_sell_get_quote: number;
  total_sell_booking_created: number;
  total_sell_success: number;
  total_sell_bank_transfer: number;
  total_sell_cash_option: number;
  total_sell_success_bank_transfer?: number;
  total_sell_success_cash?: number;
  total_value_sell_success: number | CurrencyValue[];
  total_value_sell_bank_transfer: CurrencyValue[];
  total_value_sell_cash_option: CurrencyValue[];
  total_value_sell_success_bank_transfer?: CurrencyValue[];
  total_value_sell_success_cash?: CurrencyValue[];
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
  sellerData?: SellerData;
  failedData?: FailedData;
  loading?: boolean;
  theme?: Theme;
  enableExport?: boolean;
  exportLoading?: boolean;
  initiallyOpen?: boolean;
}>(), {
  sellerData: () => ({
    total_seller_conversations: 0,
    total_sell_started: 0,
    total_sell_get_quote: 0,
    total_sell_booking_created: 0,
    total_sell_success: 0,
    total_sell_bank_transfer: 0,
    total_sell_cash_option: 0,
    total_value_sell_success: 0,
    total_value_sell_bank_transfer: [],
    total_value_sell_cash_option: [],
    seller_by_day: [],
  }),
  failedData: () => ({
    total_sell_failed: 0,
    failed_by_reason_by_day: [],
  }),
  loading: false,
  theme: undefined,
  enableExport: false,
  exportLoading: false,
  initiallyOpen: true
})

const emit = defineEmits<{
  export: [format: ExportFormat]
}>()

const handleExport = (format: ExportFormat) => {
  emit('export', format)
}

// Theme detection with prop fallback
const { isDark } = useThemeDetection(toRef(props, 'theme'))

// Computed para combinar y ordenar los datos de la tabla
const tableData = computed(() => {
  if (!props.sellerData?.seller_by_day) return []
  
  const data = [...props.sellerData.seller_by_day] as SellerDayData[]
  
  // Merge failed data with seller data by date
  if (props.failedData?.failed_by_reason_by_day) {
    props.failedData.failed_by_reason_by_day.forEach((failedItem) => {
      const idx = data.findIndex(sellerItem => sellerItem.date === failedItem.date)
      if (idx !== -1) {
        data[idx] = { ...data[idx], reasons: failedItem.reasons }
      } else {
        data.push({
          date: failedItem.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          sell_bank_transfer_count: 0,
          sell_cash_option_count: 0,
          daily_value_sell_success: 0,
          daily_value_sell_bank_transfer: [],
          daily_value_sell_cash_option: [],
          reasons: failedItem.reasons,
        })
      }
    })
  }
  
  // Sort by date
  return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const sellerTableColumns: TableColumn[] = [
  { key: 'date', label: 'Date', align: 'center' },
  { key: 'sellInitiated', label: 'Sell Initiated', align: 'center' },
  { key: 'sellStarted', label: 'Sell Started', align: 'center' },
  { key: 'getQuote', label: 'Get Quote', align: 'center' },
  { key: 'bookingCreated', label: 'Booking Created', align: 'center' },
  { key: 'bankTransfer', label: 'Bank Transfer', align: 'center' },
  { key: 'btValue', label: 'BT Success Value', align: 'center' },
  { key: 'btSuccess', label: 'BT Success', align: 'center' },
  { key: 'cashOption', label: 'Cash Option', align: 'center' },
  { key: 'coValue', label: 'CO Success Value', align: 'center' },
  { key: 'cashSuccess', label: 'Cash Success', align: 'center' },
  { key: 'sellSuccess', label: 'Sell Success', align: 'center' },
  { key: 'totalSalesValue', label: 'Total Sales Value', align: 'center' },
  { key: 'failed', label: 'Failed', align: 'left' },
]

const sellerTableRows = computed((): Record<string, unknown>[] =>
  tableData.value.map((row) => ({
    id: row.date,
    ...row,
  }))
)

const sellerData = computed(() => props.sellerData)
const failedData = computed(() => props.failedData)
const totalSalesByCurrency = computed(() =>
  Array.isArray(props.sellerData.total_value_sell_success) ? props.sellerData.total_value_sell_success : [],
)
const bankTransferByCurrency = computed(() =>
  Array.isArray(props.sellerData.total_value_sell_bank_transfer) ? props.sellerData.total_value_sell_bank_transfer : [],
)
const cashOptionByCurrency = computed(() =>
  Array.isArray(props.sellerData.total_value_sell_cash_option) ? props.sellerData.total_value_sell_cash_option : [],
)

const totalSalesCardValue = computed((): string => {
  const items = totalSalesByCurrency.value
  if (items.length > 0) {
    return items
      .map((item) => `${item.currency} ${useCompactCurrencyFormat(item.total_value)}`)
      .join(' · ')
  }
  return formatCurrencyValue(props.sellerData.total_value_sell_success)
})

function formatCurrencyBreakdownCard(items: CurrencyValue[]): string {
  if (items.length > 0) {
    return items
      .map((item) => `${item.currency} ${useCompactCurrencyFormat(item.total_value)}`)
      .join(' · ')
  }
  return '—'
}

const bankTransferCardValue = computed((): string =>
  formatCurrencyBreakdownCard(bankTransferByCurrency.value),
)

const cashOptionCardValue = computed((): string =>
  formatCurrencyBreakdownCard(cashOptionByCurrency.value),
)

const sankeyData = computed(() => {
  const {
    total_seller_conversations: conversations = 0,
    total_sell_started: started = 0,
    total_sell_booking_created: bookingCreated = 0,
    total_sell_success: success = 0,
    total_sell_bank_transfer: bankTransfer = 0,
    total_sell_cash_option: cashOption = 0,
    total_sell_success_bank_transfer: successBankTransfer = 0,
    total_sell_success_cash: successCash = 0,
  } = sellerData.value
  const { failed_by_reason_by_day = [] } = failedData.value

  if (conversations === 0) return { nodes: [], links: [] }

  // Sell Success (online) = total sell_success minus the offline-confirmed ones
  const successOnline = Math.max(0, success - (successBankTransfer ?? 0) - (successCash ?? 0))

  const nodes: { name: string; value: number }[] = [
    { name: 'Sell Initiated', value: conversations },
    { name: 'Sell Started', value: started },
    { name: 'Booking Created', value: bookingCreated },
    { name: 'Sell Success', value: successOnline },
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

  // From Booking Created: independent branches for payment methods, success, and failure
  if (bankTransfer > 0) {
    const percentage = Math.round((bankTransfer / conversations) * 100)
    nodes.push({ name: 'Bank Transfer', value: bankTransfer })
    links.push({
      source: 'Booking Created',
      target: 'Bank Transfer',
      value: bankTransfer,
      label: `${bankTransfer.toLocaleString()} (${percentage}%)`,
    })
  }

  if (cashOption > 0) {
    const percentage = Math.round((cashOption / conversations) * 100)
    nodes.push({ name: 'Cash Option', value: cashOption })
    links.push({
      source: 'Booking Created',
      target: 'Cash Option',
      value: cashOption,
      label: `${cashOption.toLocaleString()} (${percentage}%)`,
    })
  }

  if (successOnline > 0) {
    const percentage = Math.round((successOnline / conversations) * 100)
    links.push({
      source: 'Booking Created',
      target: 'Sell Success',
      value: successOnline,
      label: `${successOnline.toLocaleString()} (${percentage}%)`,
    })
  }

  // ETL-confirmed success nodes after Bank Transfer and Cash Option
  if ((successBankTransfer ?? 0) > 0) {
    const percentage = Math.round(((successBankTransfer ?? 0) / conversations) * 100)
    nodes.push({ name: 'Bank Transfer Success', value: successBankTransfer ?? 0 })
    links.push({
      source: 'Bank Transfer',
      target: 'Bank Transfer Success',
      value: successBankTransfer ?? 0,
      label: `${(successBankTransfer ?? 0).toLocaleString()} (${percentage}%)`,
    })
  }

  if ((successCash ?? 0) > 0) {
    const percentage = Math.round(((successCash ?? 0) / conversations) * 100)
    nodes.push({ name: 'Cash Option Success', value: successCash ?? 0 })
    links.push({
      source: 'Cash Option',
      target: 'Cash Option Success',
      value: successCash ?? 0,
      label: `${(successCash ?? 0).toLocaleString()} (${percentage}%)`,
    })
  }

  const failedAtCompletion = bookingCreated - successOnline - bankTransfer - cashOption
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

  // Failed flows from Sell Started
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

  return { nodes, links }
})

const SANKEY_SELLER_COLORS: Record<string, string> = {
  'Sell Initiated': '#DBEAFE',
  'Abandoned (Init)': '#FEE2E2',
  'Sell Started': '#93C5FD',
  'Get Quote': '#C7D2FE',
  'Booking Created': '#8B8CF6',
  'Bank Transfer': '#fde68a',
  'Cash Option': '#fde68a',
  'Bank Transfer Success': '#4ade80',
  'Cash Option Success': '#4ade80',
  'Other Payment': '#818CF8',
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

// Helper to extract total value from currency array or number
const getTotalValue = (value: number | CurrencyValue[] | undefined): number => {
  if (value === undefined || value === null) return 0
  if (typeof value === 'number') return value
  if (Array.isArray(value)) {
    return value.reduce((sum, item) => sum + (item.total_value || 0), 0)
  }
  return 0
}

// Format currency value handling both number and array formats
const formatCurrencyValue = (value: number | CurrencyValue[] | undefined): string => {
  return useCompactCurrencyFormat(getTotalValue(value))
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

/* Chart Section */
.chart-section {
  margin-bottom: 28px;
  animation: fadeIn 0.5s ease-out;
}

.seller-value-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 28px;
  animation: fadeIn 0.55s ease-out 0.05s backwards;
}

.seller-value-card {
  min-width: 0;
}

@media (max-width: 768px) {
  .seller-value-cards {
    grid-template-columns: 1fr;
  }
}

.chart-wrapper {
  background: var(--kiut-bg-chart-wrapper);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--kiut-border-light);
  box-shadow: var(--kiut-shadow-chart-wrapper);
}

/* Daily table block (Utils/Table) */
.seller-daily-section {
  animation: fadeIn 0.6s ease-out 0.1s backwards;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.success-value {
  font-weight: 600;
  color: var(--kiut-success);
}

.warning-value {
  font-weight: 600;
  color: #92400e;
}

.currency-cell-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
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
  color: var(--kiut-text-secondary);
  text-transform: capitalize;
}

.reason-count {
  font-weight: 600;
  color: var(--kiut-danger);
}

.empty-cell {
  text-align: center;
  color: var(--kiut-text-muted);
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  margin-bottom: 28px;
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
  .seller-daily-section {
    overflow-x: auto;
  }
}

@media (max-width: 768px) {
  .chart-wrapper {
    padding: 16px;
  }
}
</style>
