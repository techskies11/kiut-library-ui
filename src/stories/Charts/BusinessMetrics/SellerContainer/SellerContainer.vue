<template>
  <ChartMetricContainer
    class="seller-container-root w-full"
    title="Seller"
    subtitle="Sales funnel performance and successful sales by communication channel."
    :default-open="containerInitiallyOpen"
  >
    <div class="seller-container__body">
      <Seller
        :initially-open="childrenInitiallyOpen"
        :seller-data="sellerData"
        :failed-data="failedData"
        :loading="effectiveSellerLoading"
        :theme="theme"
        :enable-export="enableExport"
        :export-loading="effectiveSellerExportLoading"
        @export="(fmt) => handleChildExport('seller', fmt)"
      />
      <SalesByChannel
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
import { computed } from 'vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import Seller from '../Seller/Seller.vue'
import SalesByChannel from '../SalesByChannel/SalesByChannel.vue'
import type { Theme } from '../../../../composables/useThemeDetection'
import type { ExportFormat } from '../../Utils/FooterExport'

export type SellerContainerExportSource = 'seller' | 'salesByChannel'

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
  sell_bank_transfer_count: number;
  sell_cash_option_count: number;
  daily_value_sell_success: number | CurrencyValue[];
  daily_value_sell_bank_transfer: CurrencyValue[];
  daily_value_sell_cash_option: CurrencyValue[];
  reasons?: FailedReason[];
}

interface SellerData {
  total_seller_conversations: number;
  total_sell_started: number;
  total_sell_get_quote: number;
  total_sell_booking_created: number;
  total_sell_success: number;
  total_sell_bank_transfer: number;
  total_sell_cash_option: number;
  total_value_sell_success: number | CurrencyValue[];
  total_value_sell_bank_transfer: CurrencyValue[];
  total_value_sell_cash_option: CurrencyValue[];
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
    theme?: Theme
    /** Shape Seller.vue */
    sellerData?: SellerData
    /** Shape Seller.vue failedData */
    failedData?: FailedData
    /** Shape SalesByChannel.vue */
    salesByChannelData?: SalesByChannelData
    /** Shape SalesByChannel.vue channelComparison */
    channelComparison?: ChannelComparisonItem[]
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
    theme: undefined,
    channelComparison: () => [],
  }
)

const emit = defineEmits<{
  export: [payload: SellerContainerExportPayload]
}>()

const effectiveSellerLoading = computed(() => props.loading || props.sellerLoading)
const effectiveSalesByChannelLoading = computed(() => props.loading || props.salesByChannelLoading)
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
</style>
