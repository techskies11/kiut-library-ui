<template>
  <ChartMetricContainer
    class="sales-channel-root h-full min-h-0"
    title="Sales by Channel"
    subtitle="Successful sales breakdown by communication channel"
    :default-open="initiallyOpen"
  >
    <template
      v-if="enableExport && !props.loading && chartData.labels.length > 0"
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
        <p class="loading-text">Loading sales data...</p>
      </div>
    </div>

    <!-- Content -->
    <div v-else class="card-body">
      <section v-if="chartData.labels.length > 0" class="chart-section">
        <BarChart :data="chartData" :stacked="true" />
      </section>

      <!-- Empty State -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="empty-title">No sales data available</p>
          <p class="empty-description">No sales by channel data found for the selected period. Try adjusting the date range.</p>
        </div>
      </section>

      <!-- Channel Comparison Cards -->
      <section v-if="channelComparison.length > 0" class="comparison-section">
        <div class="comparison-grid">
          <CardInfo
            v-for="(item, index) in channelComparison"
            :key="item.channel"
            :color="getChannelColor(item.channel, index)"
            :title="channelDisplayTitle(item.channel)"
            :value="useNumberFormat(item.current)"
            :subvalue="comparisonSubvalue(item)"
          />
        </div>
      </section>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import moment from 'moment'
import BarChart from '../../Bar/ChartBar.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { CardInfo } from '../../Utils/CardInfo'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

interface CurrencyBreakdown {
  currency: string;
  total_value: number;
  count: number;
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
  total_by_currency: CurrencyBreakdown[];
  sales_by_channel_by_day: DailySalesByChannel[];
}

interface ChannelComparisonItem {
  channel: string;
  current: number;
  previous: number;
  delta: number | null;
}

const CHANNEL_COLORS: Record<string, string> = {
  wsp: '#6DD4A1',
  whatsapp: '#6DD4A1',
  voice: '#7BA3E8',
  sms: '#F5C26B',
  web_chat: '#85D0E8',
  email: '#F28B8B',
  messenger: '#8BB5F2',
  telegram: '#7DC8E8',
  instagram: '#F29BC4',
  webchat: '#85D0E8',
  web: '#C9A0F2',
}

const DEFAULT_COLORS = ['#B0C4DE', '#C9A0F2', '#F5C26B', '#8BE8B0', '#F2A07A', '#7BA3E8']

const props = withDefaults(defineProps<{
  data?: SalesByChannelData;
  loading?: boolean;
  theme?: Theme;
  enableExport?: boolean;
  exportLoading?: boolean;
  channelComparison?: ChannelComparisonItem[];
  initiallyOpen?: boolean;
}>(), {
  data: () => ({
    total_sell_success: 0,
    total_by_currency: [],
    sales_by_channel_by_day: [],
  }),
  loading: false,
  theme: undefined,
  enableExport: false,
  exportLoading: false,
  channelComparison: () => [],
  initiallyOpen: true,
})

const emit = defineEmits<{
  export: [format: ExportFormat]
}>()

const handleExport = (format: ExportFormat) => {
  emit('export', format)
}

const { isDark } = useThemeDetection(toRef(props, 'theme'))

const totalSellSuccess = computed(() => props.data?.total_sell_success ?? 0)

const allChannels = computed(() => {
  const channelSet = new Set<string>()
  for (const day of props.data?.sales_by_channel_by_day ?? []) {
    for (const ch of Object.keys(day.channels)) {
      channelSet.add(ch)
    }
  }
  return Array.from(channelSet).sort()
})

const getChannelColor = (channel: string, index: number): string => {
  return CHANNEL_COLORS[channel.toLowerCase()] ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length]
}

function channelDisplayTitle(channel: string): string {
  return channel.replace(/_/g, ' ').toUpperCase()
}

function comparisonSubvalue(item: ChannelComparisonItem): string {
  if (item.delta === null) return 'No previous data'
  const prev = useNumberFormat(item.previous)
  const pct = `${Math.abs(item.delta).toFixed(1)}%`
  if (item.delta === 0) return `0.0% vs prev. period (${prev})`
  const arrow = item.delta > 0 ? '↑' : '↓'
  return `${arrow} ${pct} vs prev. period (${prev})`
}

const chartData = computed(() => {
  const days = props.data?.sales_by_channel_by_day ?? []
  if (days.length === 0) return { labels: [] as string[], datasets: [] }

  const labels = days.map(d => moment(d.date).format('MMM-DD'))
  const datasets = allChannels.value.map((channel, idx) => ({
    label: channel,
    data: days.map(d => d.channels[channel] ?? 0),
    backgroundColor: getChannelColor(channel, idx),
    borderRadius: 4,
  }))

  return { labels, datasets }
})

defineExpose({ isDark })
</script>

<style scoped>
.card-body {
  animation: fadeIn 0.5s ease-out;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chart-section {
  animation: fadeIn 0.5s ease-out;
  width: 100%;
}
.comparison-section {
  margin-top: 24px;
  width: 100%;
  animation: fadeIn 0.6s ease-out 0.15s backwards;
}

.comparison-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
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

.chart-bars-loader {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
  height: 120px;
  margin-bottom: 24px;
}

.bar {
  width: 10px;
  background: linear-gradient(to top, var(--kiut-primary-light) 0%, var(--kiut-primary) 50%, var(--kiut-primary-hover) 100%);
  border-radius: 5px;
  animation: wave 1.5s ease-in-out infinite;
  box-shadow: var(--kiut-shadow-loader);
}

.bar-1 { height: 35%; animation-delay: 0s; }
.bar-2 { height: 55%; animation-delay: 0.1s; }
.bar-3 { height: 75%; animation-delay: 0.2s; }
.bar-4 { height: 55%; animation-delay: 0.3s; }
.bar-5 { height: 45%; animation-delay: 0.4s; }

.loading-text {
  font-size: 15px;
  font-weight: 500;
  color: var(--kiut-text-secondary);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  letter-spacing: -0.01em;
}

@keyframes wave {
  0%, 100% { transform: scaleY(1); opacity: 0.7; }
  50% { transform: scaleY(1.6); opacity: 1; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
