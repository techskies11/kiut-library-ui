<template>
  <details class="sales-channel-card metric-collapsible" :open="initiallyOpen">
    <summary class="card-header metric-collapsible__summary">
      <div class="header-content">
        <div class="title-section">
          <h3 class="card-title">Sales by Channel</h3>
          <p class="card-subtitle">Successful sales breakdown by communication channel</p>
        </div>
      </div>
      <svg class="metric-collapsible__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>

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
        <div class="chart-wrapper">
          <BarChart :data="chartData" :stacked="true" />
        </div>
        <FooterExport v-if="enableExport" @export="handleExport" :loading="exportLoading" />
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
          <div
            v-for="item in channelComparison"
            :key="item.channel"
            class="comparison-card"
          >
            <div class="comparison-color-bar" :style="{ backgroundColor: getChannelColor(item.channel, channelComparison.indexOf(item)) }"></div>
            <div class="comparison-content">
              <span class="comparison-channel">{{ item.channel }}</span>
              <span class="comparison-value">{{ useNumberFormat(item.current) }}</span>
              <div class="comparison-delta" v-if="item.delta !== null">
                <span :class="['delta-badge', item.delta > 0 ? 'delta-up' : item.delta < 0 ? 'delta-down' : 'delta-neutral']">
                  <svg v-if="item.delta > 0" class="delta-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
                  <svg v-else-if="item.delta < 0" class="delta-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                  {{ Math.abs(item.delta).toFixed(1) }}%
                </span>
                <span class="delta-label">vs prev. period ({{ useNumberFormat(item.previous) }})</span>
              </div>
              <div class="comparison-delta" v-else>
                <span class="delta-label">No previous data</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </details>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import moment from 'moment'
import BarChart from '../../Bar/ChartBar.vue'
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
@import '../metric-collapsible.css';

.sales-channel-card {
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

.sales-channel-card:hover {
  box-shadow: var(--kiut-shadow-card-hover);
  transform: translateY(-2px);
}

.card-header {
  margin-bottom: 28px;
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
  margin: 0;
  line-height: 1.25rem;
}

.total-badge {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 16px;
  padding: 16px 24px;
  min-width: 140px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.total-badge:hover {
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
  letter-spacing: -0.02em;
  margin: 0;
}

.currency-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
}

.currency-item {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #065f46;
  letter-spacing: -0.01em;
}

.card-body {
  animation: fadeIn 0.5s ease-out;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chart-section {
  animation: fadeIn 0.5s ease-out;
  flex: 1;
}

.chart-wrapper {
  background: var(--kiut-bg-chart-wrapper);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--kiut-border-light);
  box-shadow: var(--kiut-shadow-chart-wrapper);
}

/* Comparison Cards */
.comparison-section {
  margin-top: 24px;
  animation: fadeIn 0.6s ease-out 0.15s backwards;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.comparison-card {
  background: var(--kiut-bg-chart-wrapper);
  border: 1px solid var(--kiut-border-light);
  border-radius: 14px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: var(--kiut-shadow-chart-wrapper);
}

.comparison-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.comparison-color-bar {
  height: 4px;
  width: 100%;
}

.comparison-content {
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.comparison-channel {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--kiut-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.comparison-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--kiut-text-primary);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.comparison-delta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.delta-badge {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
}

.delta-icon {
  width: 14px;
  height: 14px;
}

.delta-up {
  color: #059669;
  background: rgba(16, 185, 129, 0.12);
}

.delta-down {
  color: #DC2626;
  background: rgba(239, 68, 68, 0.12);
}

.delta-neutral {
  color: #6B7280;
  background: rgba(107, 114, 128, 0.12);
}

.delta-label {
  font-size: 0.7rem;
  color: var(--kiut-text-secondary);
  font-weight: 400;
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

@media (max-width: 768px) {
  .sales-channel-card {
    padding: 20px 24px;
    border-radius: 16px;
  }
  .header-content {
    flex-direction: column;
    gap: 16px;
  }
  .total-badge {
    min-width: auto;
  }
  .card-title {
    font-size: 20px;
  }
  .card-subtitle {
    font-size: 13px;
  }
  .chart-wrapper {
    padding: 16px;
  }
}
</style>
