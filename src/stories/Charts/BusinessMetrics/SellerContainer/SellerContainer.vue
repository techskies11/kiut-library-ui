<template>
  <ChartMetricContainer
    class="seller-container-root w-full"
    title="Seller"
    subtitle="Sales funnel performance and successful sales by communication channel."
    :default-open="containerInitiallyOpen"
    :loading="loading"
    lazy-mount
    @open="emit('open')"
  >
    <div class="seller-container__body">
      <SellerKPI
        v-if="showKpi"
        v-bind="resolvedKpiProps"
        :loading="effectiveKpiLoading"
        :theme="theme"
      />
      <Seller
        :initially-open="childrenInitiallyOpen"
        :seller-data="sellerData"
        :failed-data="failedData"
        :loading="effectiveSellerLoading"
        :theme="theme"
        :enable-export="enableExport"
        :export-loading="effectiveSellerExportLoading"
        :show-payment-method-details="showPaymentMethodDetails"
        @export="(fmt) => handleChildExport('seller', fmt)"
      />
      <ChartMetricContainer
        class="w-full min-h-0 self-start"
        :title="trendTitle"
        :subtitle="trendSubtitle"
        :collapsible="false"
        :loading="effectiveSellerLoading"
      >
        <template #headerAside>
          <div class="stage-select flex items-center justify-end gap-3">
            <div class="w-56">
              <Select
                :model-value="selectedTrend"
                :options="TREND_OPTIONS"
                aria-label-trigger="Seller trend view"
                :show-option-check="false"
                @update:model-value="onTrendChange"
              />
            </div>
            <FooterExport
              v-if="enableExport && !effectiveSellerLoading"
              variant="inline"
              :loading="effectiveSellerExportLoading"
              @export="(fmt) => handleChildExport(trendExportSource, fmt)"
            />
          </div>
        </template>

        <Transition name="seller-trend-fade" mode="out-in">
          <SalesVolume
            v-if="selectedTrend === 'volume'"
            key="volume"
            embedded
            class="w-full min-h-0"
            :data="sellerData"
            :failed-data="failedData"
            :theme="theme"
          />
          <SellerInteractions
            v-else-if="selectedTrend === 'interactions'"
            key="interactions"
            embedded
            class="w-full min-h-0"
            :data="interactionsData"
            :theme="theme"
            :empty-title="interactionsEmptyTitle"
            :empty-description="interactionsEmptyDescription"
          />
          <SellerCompletionTime
            v-else
            key="completionTime"
            embedded
            class="w-full min-h-0"
            :data="completionTimeData"
            :theme="theme"
            :empty-title="completionTimeEmptyTitle"
            :empty-description="completionTimeEmptyDescription"
          />
        </Transition>
      </ChartMetricContainer>
      <SalesByChannel
        v-if="showSalesByChannel"
        :initially-open="childrenInitiallyOpen"
        :data="salesByChannelData"
        :channel-comparison="channelComparison"
        :loading="effectiveSalesByChannelLoading"
        :theme="theme"
        :enable-export="enableExport"
        :export-loading="effectiveSalesByChannelExportLoading"
        @export="(fmt) => handleChildExport('salesByChannel', fmt)"
      />
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import SellerKPI from '../SellerKPI/SellerKPI.vue'
import Seller from '../Seller/Seller.vue'
import SalesVolume from '../SalesVolume/SalesVolume.vue'
import SalesByChannel from '../SalesByChannel/SalesByChannel.vue'
import SellerInteractions, {
  type SellerInteractionsData,
} from '../SellerInteractions/SellerInteractions.vue'
import SellerCompletionTime, {
  type SellerCompletionTimeData,
} from '../SellerCompletionTime/SellerCompletionTime.vue'
import type { Theme } from '../../../../composables/useThemeDetection'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import Select, {
  type KiutSelectOption,
  type KiutSelectValue,
} from '../../../../components/Inputs/Select.vue'
import {
  buildSellerKpiFromRecord,
  mergeSellerKpiWithPrevious,
  type SellerFailedKpiShape,
  type SellerRecordKpiShape,
} from '../SellerKPI/buildSellerKpiFromRecord'
import type { SellerKpiLabels, SellerKpiProps } from '../SellerKPI/sellerKpiTypes'

export type SellerContainerExportSource =
  | 'seller'
  | 'salesVolume'
  | 'salesByChannel'
  | 'sellerInteractions'
  | 'sellerCompletionTime'

const TREND_VIEWS = ['volume', 'interactions', 'completionTime'] as const
export type SellerTrendView = (typeof TREND_VIEWS)[number]

const TREND_OPTIONS: KiutSelectOption<KiutSelectValue>[] = [
  { value: 'volume', label: 'Volume' },
  { value: 'interactions', label: 'Avg interactions' },
  { value: 'completionTime', label: 'Avg completion time' },
]

function isTrendView(value: string): value is SellerTrendView {
  return (TREND_VIEWS as readonly string[]).includes(value)
}

export interface SellerContainerExportPayload {
  source: SellerContainerExportSource
  format: ExportFormat
}

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
  sell_success_bank_transfer_count?: number;
  sell_success_cash_count?: number;
  daily_value_sell_success: number | CurrencyValue[];
  daily_value_sell_success_bank_transfer?: CurrencyValue[];
  daily_value_sell_success_cash?: CurrencyValue[];
  reasons?: FailedReason[];
}

interface SellerData {
  total_seller_conversations: number;
  total_sell_started: number;
  total_sell_get_quote: number;
  total_sell_booking_created: number;
  total_sell_success: number;
  total_sell_success_bank_transfer?: number;
  total_sell_success_cash?: number;
  total_sell_abandoned?: number;
  total_value_sell_success: number | CurrencyValue[];
  total_value_sell_success_usd?: number;
  total_value_sell_success_bank_transfer?: CurrencyValue[];
  total_value_sell_success_cash?: CurrencyValue[];
  avg_sell_completion_time_seconds?: number | null;
  avg_sell_completion_time_formatted?: string | null;
  avg_sell_interactions_to_complete?: number | null;
  seller_by_day: SellerDayData[];
}

interface FailedData {
  total_sell_failed: number;
  failed_by_reason_by_day: {
    date: string;
    reasons: FailedReason[];
  }[];
}

interface DailySalesByChannel {
  date: string;
  channels: Record<string, number>;
}

interface SalesByChannelData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  total_sell_success: number;
  total_by_currency: CurrencyValue[];
  sales_by_channel_by_day: DailySalesByChannel[];
}

interface ChannelComparisonItem {
  channel: string;
  current: number;
  previous: number;
  delta: number | null;
}

const props = withDefaults(
  defineProps<{
    containerInitiallyOpen?: boolean
    childrenInitiallyOpen?: boolean
    /** Si es true, aplica loading a todas las vistas hijas. */
    loading?: boolean
    sellerLoading?: boolean
    salesByChannelLoading?: boolean
    enableExport?: boolean
    exportLoading?: boolean
    sellerExportLoading?: boolean
    salesByChannelExportLoading?: boolean
    showPaymentMethodDetails?: boolean
    /** Si es false, oculta el bloque Sales by Channel. */
    showSalesByChannel?: boolean
    theme?: Theme
    /** Shape Seller.vue */
    sellerData?: SellerData
    /** Shape Seller.vue failedData */
    failedData?: FailedData
    /** Shape SalesByChannel.vue */
    salesByChannelData?: SalesByChannelData
    /** Shape SalesByChannel.vue channelComparison */
    channelComparison?: ChannelComparisonItem[]
    showKpi?: boolean
    kpiLoading?: boolean
    kpiProps?: Partial<SellerKpiProps>
    kpiLabels?: SellerKpiLabels
    previousSellerData?: SellerData
    previousFailedData?: FailedData
    /** Daily avg interactions series (seller-avg-interactions-metrics API). */
    interactionsData?: SellerInteractionsData | null
    interactionsTitle?: string
    interactionsSubtitle?: string
    interactionsEmptyTitle?: string
    interactionsEmptyDescription?: string
    /** Daily avg completion time series (seller-completion-time-metrics API). */
    completionTimeData?: SellerCompletionTimeData | null
    completionTimeTitle?: string
    completionTimeSubtitle?: string
    completionTimeEmptyTitle?: string
    completionTimeEmptyDescription?: string
    /** Active view in the Volume / Interactions / Completion time select. */
    trendView?: SellerTrendView
  }>(),
  {
    containerInitiallyOpen: false,
    childrenInitiallyOpen: true,
    loading: false,
    sellerLoading: false,
    salesByChannelLoading: false,
    enableExport: false,
    exportLoading: false,
    sellerExportLoading: false,
    salesByChannelExportLoading: false,
    showPaymentMethodDetails: false,
    showSalesByChannel: true,
    showKpi: true,
    theme: undefined,
    channelComparison: () => [],
    trendView: 'volume',
  }
)

const emit = defineEmits<{
  open: []
  export: [payload: SellerContainerExportPayload]
  'update:trendView': [view: SellerTrendView]
}>()

const selectedTrend = ref<SellerTrendView>(props.trendView)

watch(
  () => props.trendView,
  (view) => {
    selectedTrend.value = view
  },
)

const trendTitle = computed(() => {
  if (selectedTrend.value === 'interactions') {
    return props.interactionsTitle ?? 'Avg interactions to complete'
  }
  if (selectedTrend.value === 'completionTime') {
    return props.completionTimeTitle ?? 'Avg completion time'
  }
  return 'Sales Volume'
})

const trendSubtitle = computed(() => {
  if (selectedTrend.value === 'interactions') {
    return (
      props.interactionsSubtitle ??
      'Average number of interaction turns taken to complete the flow'
    )
  }
  if (selectedTrend.value === 'completionTime') {
    return props.completionTimeSubtitle ?? 'Average time users take to complete the flow'
  }
  return 'Daily sales volume by outcome, with share over initiated'
})

const trendExportSource = computed((): SellerContainerExportSource => {
  if (selectedTrend.value === 'interactions') return 'sellerInteractions'
  if (selectedTrend.value === 'completionTime') return 'sellerCompletionTime'
  return 'salesVolume'
})

function onTrendChange(value: KiutSelectValue): void {
  const next = String(value)
  if (!isTrendView(next)) return
  selectedTrend.value = next
  emit('update:trendView', next)
}

const effectiveKpiLoading = computed(() =>
  props.loading ? false : (props.kpiLoading ?? props.sellerLoading),
)
const effectiveSellerLoading = computed(() =>
  props.loading ? false : props.sellerLoading,
)
const effectiveSalesByChannelLoading = computed(() =>
  props.loading ? false : props.salesByChannelLoading,
)

const resolvedKpiProps = computed<SellerKpiProps>(() => {
  const current = buildSellerKpiFromRecord(
    props.sellerData as SellerRecordKpiShape | undefined,
    props.failedData as SellerFailedKpiShape | undefined,
  )
  const previous = props.previousSellerData
    ? buildSellerKpiFromRecord(
        props.previousSellerData as SellerRecordKpiShape,
        props.previousFailedData as SellerFailedKpiShape | undefined,
      )
    : null
  const merged = mergeSellerKpiWithPrevious(current, previous)

  return {
    ...merged,
    ...props.kpiProps,
    labels: {
      ...props.kpiProps?.labels,
      ...props.kpiLabels,
    },
  }
})
const effectiveSellerExportLoading = computed(() => props.exportLoading || props.sellerExportLoading)
const effectiveSalesByChannelExportLoading = computed(() => props.exportLoading || props.salesByChannelExportLoading)

function handleChildExport(source: SellerContainerExportSource, format: ExportFormat) {
  emit('export', { source, format })
}
</script>

<style scoped>
.seller-container__body {
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: fadeIn 0.45s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.seller-trend-fade-enter-active,
.seller-trend-fade-leave-active {
  transition: opacity 0.2s ease;
}

.seller-trend-fade-enter-from,
.seller-trend-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .seller-trend-fade-enter-active,
  .seller-trend-fade-leave-active {
    transition: none;
  }
}
</style>
