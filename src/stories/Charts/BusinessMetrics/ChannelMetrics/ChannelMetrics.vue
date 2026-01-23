<template>
  <article class="channel-metrics-card">
    <header class="card-header">
      <div class="header-content">
        <h3 class="card-title">Channel Metrics</h3>
        <p class="card-subtitle">Communication channels performance</p>
      </div>
    </header>

    <!-- Content when loaded -->
    <div class="card-body" v-if="!props.loading">
      <!-- KPI Cards -->
      <div class="kpi-grid" v-if="Object.keys(metricsData.total_by_channel).length">
        <div
          class="kpi-card"
          v-for="channel in Object.keys(metricsData.total_by_channel)"
          :key="channel"
        >
          <span class="kpi-label">{{ channel.toUpperCase() }}</span>
          <span class="kpi-value">{{ useNumberFormat(metricsData.total_by_channel[channel]) }}</span>
        </div>
        <div class="kpi-card total-card">
          <span class="kpi-label">Total Conversations</span>
          <span class="kpi-value">{{ useNumberFormat(metricsData.total_conversations) }}</span>
        </div>
      </div>

      <!-- Chart Section -->
      <section v-if="dataChart.labels && dataChart.labels.length" class="chart-section">
        <LineChart :data="dataChart" :options="lineOptions" />

        <FooterExport v-if="enableExport" @export="handleExport" :loading="exportLoading" />
      </section>

      <!-- Empty State -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p class="empty-title">No channel metrics data available</p>
          <p class="empty-description">No channel data found for the selected period. Try adjusting the date range.</p>
        </div>
      </section>
    </div>

    <!-- Loading State con animación CSS personalizada -->
    <div class="loading-state" v-else>
      <div class="loading-container">
        <div class="chart-bars-loader">
          <div class="bar bar-1"></div>
          <div class="bar bar-2"></div>
          <div class="bar bar-3"></div>
          <div class="bar bar-4"></div>
          <div class="bar bar-5"></div>
        </div>
        <p class="loading-text">Loading channel metrics...</p>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, watch, computed, toRef } from 'vue'
import moment from 'moment'
import LineChart from '../../Line/ChartLine.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

interface ChannelsByDay {
  [date: string]: {
    [channel: string]: number;
  };
}

interface TotalByChannel {
  [channel: string]: number;
}

interface MetricsData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  channels_by_day: ChannelsByDay;
  total_by_channel: TotalByChannel;
  total_conversations: number;
}

const props = withDefaults(defineProps<{
  loading?: boolean;
  data?: MetricsData | null;
  theme?: Theme;
  enableExport?: boolean;
  exportLoading?: boolean;
}>(), {
  loading: false,
  data: null,
  theme: undefined,
  enableExport: false,
  exportLoading: false
})

const emit = defineEmits<{
  export: [format: ExportFormat]
}>()

const handleExport = (format: ExportFormat) => {
  emit('export', format)
}

// Theme detection with prop fallback
const { isDark, colors } = useThemeDetection(toRef(props, 'theme'))

const dataChart = ref<{ labels: string[]; datasets: any[] }>({ labels: [], datasets: [] })
const metricsData = computed<MetricsData>(() => props.data ?? {
  channels_by_day: {},
  total_by_channel: {},
  total_conversations: 0,
})

const lineOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          family: "'DM Sans', sans-serif",
          size: 12,
        },
        color: colors.value.textSecondary,
      },
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: colors.value.tooltipBg,
      titleColor: colors.value.tooltipText,
      bodyColor: colors.value.textSecondary,
      borderColor: isDark.value ? 'rgba(198, 125, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      titleFont: {
        family: "'Space Grotesk', sans-serif",
        size: 14,
        weight: 600,
      },
      bodyFont: {
        family: "'DM Sans', sans-serif",
        size: 13,
      },
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: "'DM Sans', sans-serif",
          size: 11,
        },
        color: colors.value.textSecondary,
      },
    },
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      beginAtZero: true,
      grid: {
        color: colors.value.gridLines,
      },
      ticks: {
        font: {
          family: "'DM Sans', sans-serif",
          size: 11,
        },
        color: colors.value.textSecondary,
      },
    },
  },
  interaction: {
    mode: 'nearest' as const,
    axis: 'x' as const,
    intersect: false,
  },
}))

const processChartData = (data: MetricsData | null) => {
  if (!data || !data.channels_by_day) {
    dataChart.value = { labels: [], datasets: [] }
    return
  }

  const daysData = data.channels_by_day
  const labels = Object.keys(daysData).sort()

  if (labels.length === 0) {
    dataChart.value = { labels: [], datasets: [] }
    return
  }

  // Obtener todas las categorías únicas de canales
  const categoriesSet = new Set<string>()
  for (const dayData of Object.values(daysData)) {
    for (const category of Object.keys(dayData)) {
      categoriesSet.add(category)
    }
  }
  const categories = Array.from(categoriesSet)

  // Mapa de colores para los canales más comunes
  const colorMap: { [key: string]: string } = {
    wsp: '#98FB98',
    whatsapp: '#98FB98',
    voice: '#a78bfa',
    sms: '#fbbf24',
    web_chat: '#60a5fa',
    email: '#f472b6',
  }

  // Crear datasets para cada canal
  const datasets = categories.map(category => {
    const normalizedCategory = category.toLowerCase()
    const color = colorMap[normalizedCategory] || '#9ca3af'
    
    return {
      label: category.toUpperCase(),
      data: labels.map(date => daysData[date]?.[category] || 0),
      borderColor: color,
      backgroundColor: `${color}40`, // 40 = 25% opacity in hex
      borderWidth: 2,
      fill: true,
      tension: 0.3,
      pointBackgroundColor: color,
      pointBorderColor: color,
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    }
  })

  dataChart.value = {
    labels: labels.map(date => moment(date).format('MMM DD')),
    datasets,
  }
}

// Procesar datos cuando cambie el prop data
watch(
  () => props.data,
  (newData) => {
    processChartData(newData ?? null)
  },
  { deep: true, immediate: true }
)

// Expose isDark for potential use in templates
defineExpose({ isDark })
</script>

<style scoped>
/* Main Card Styles */
.channel-metrics-card {
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

.channel-metrics-card:hover {
  box-shadow: var(--kiut-shadow-card-hover);
  transform: translateY(-2px);
}

/* Header Styles */
.card-header {
  margin-bottom: 28px;
  position: relative;
}

.header-content {
  width: 100%;
  text-align: left;
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

/* Card Body */
.card-body {
  animation: fadeIn 0.5s ease-out;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* KPI Grid */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.kpi-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  background: var(--kiut-bg-stats-badge);
  border: 1px solid var(--kiut-border-light);
  border-radius: 10px;
  transition: all 0.2s ease;
  text-align: center;
}

.kpi-card:hover {
  background: var(--kiut-bg-card);
  border-color: var(--kiut-border-color);
}

.kpi-card.total-card {
  grid-column: 1 / -1;
  background: var(--kiut-bg-card);
  border: 2px solid var(--kiut-primary-light);
}

.kpi-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--kiut-text-secondary);
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.kpi-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--kiut-text-primary);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* Chart Section */
.chart-section {
  animation: fadeIn 0.5s ease-out 0.1s backwards;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  background: linear-gradient(to top, var(--kiut-primary-light) 0%, var(--kiut-primary) 50%, var(--kiut-primary-hover) 100%);
  border-radius: 4px;
  animation: wave 1.5s ease-in-out infinite;
  box-shadow: var(--kiut-shadow-loader);
}

.bar-1 { height: 30%; animation-delay: 0s; }
.bar-2 { height: 50%; animation-delay: 0.1s; }
.bar-3 { height: 70%; animation-delay: 0.2s; }
.bar-4 { height: 50%; animation-delay: 0.3s; }
.bar-5 { height: 40%; animation-delay: 0.4s; }

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
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
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
@media (max-width: 768px) {
  .channel-metrics-card {
    padding: 20px 24px;
    border-radius: 16px;
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

  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .kpi-card {
    padding: 10px 12px;
  }

  .kpi-label {
    font-size: 0.6875rem;
  }

  .kpi-value {
    font-size: 1.125rem;
  }
}
</style>
