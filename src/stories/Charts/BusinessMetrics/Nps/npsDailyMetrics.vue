<template>
  <article class="nps-daily-card">
    <header class="card-header">
      <div class="header-content">
        <div class="title-section">
          <h3 class="card-title">NPS Daily Metrics</h3>
          <p class="card-subtitle">Daily NPS Distribution</p>
        </div>
        <div v-if="npsData && npsData.nps_by_day && npsData.nps_by_day.length > 0" class="stats-badge">
          <p class="badge-label">Days</p>
          <p class="badge-value">{{ npsData.nps_by_day.length }}</p>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="props.loading" class="loading-state">
      <div class="loading-container">
        <div class="chart-flow-loader">
          <div class="flow-line flow-1"></div>
          <div class="flow-line flow-2"></div>
          <div class="flow-line flow-3"></div>
          <div class="flow-line flow-4"></div>
          <div class="flow-line flow-5"></div>
        </div>
        <p class="loading-text">Loading daily NPS data...</p>
      </div>
    </div>
    
    <!-- Daily Candlestick Section -->
    <div v-else-if="npsData && npsData.nps_by_day && npsData.nps_by_day.length > 0" class="card-body">
      <div class="chart-wrapper" ref="chartContainerRef">
        <CandlestickChart
          v-if="dailyCandlestickData && dailyCandlestickData.length > 0"
          :candlestick-data="dailyCandlestickData"
          :chart-width="dailyChartWidth"
          :chart-height="chartHeight"
          :chart-margin="chartMargin"
          :chart-bottom-margin="chartBottomMargin"
          :show-legend="true"
          :rotation="0"
          :candle-width="30"
          @candle-hover="handleCandleHover"
          @candle-leave="handleCandleLeave"
        />
        
        <!-- Custom Tooltip -->
        <div
          v-if="tooltip.visible"
          class="tooltip-overlay"
          :style="{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`
          }"
        >
          <div class="tooltip-content">
            <div class="tooltip-title">{{ tooltip.date }}</div>
            <div class="tooltip-divider"></div>
            <div class="tooltip-stats">
              <div class="tooltip-stat-row">
                <span class="tooltip-label tooltip-min">Min:</span>
                <span class="tooltip-value">{{ tooltip.min }}</span>
              </div>
              <div class="tooltip-stat-row">
                <span class="tooltip-label tooltip-q1">Q1:</span>
                <span class="tooltip-value">{{ tooltip.q1 }}</span>
              </div>
              <div class="tooltip-stat-row">
                <span class="tooltip-label tooltip-median">Median:</span>
                <span class="tooltip-value">{{ tooltip.median }}</span>
              </div>
              <div class="tooltip-stat-row">
                <span class="tooltip-label tooltip-avg">Avg:</span>
                <span class="tooltip-value">{{ tooltip.avg }}</span>
              </div>
              <div class="tooltip-stat-row">
                <span class="tooltip-label tooltip-q3">Q3:</span>
                <span class="tooltip-value">{{ tooltip.q3 }}</span>
              </div>
              <div class="tooltip-stat-row">
                <span class="tooltip-label tooltip-max">Max:</span>
                <span class="tooltip-value">{{ tooltip.max }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterExport v-if="enableExport" @export="handleExport" />
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-state-content">
        <div class="empty-icon-wrapper">
          <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p class="empty-title">No daily NPS data available</p>
        <p class="empty-description">No daily NPS data found for the selected period. Try adjusting the date range.</p>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, computed, toRef } from 'vue'
import moment from 'moment'
import CandlestickChart from '../../Candlestick/CandlestickChart.vue'
import { FooterExport } from '../../Utils/FooterExport'
import { useThemeDetection } from '../../../../composables/useThemeDetection'

const emit = defineEmits(['export'])

const handleExport = (format) => {
  emit('export', format)
}

const props = defineProps({
  data: {
    type: Object,
    default: () => null
  },
  loading: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: undefined
  },
  enableExport: {
    type: Boolean,
    default: false
  }
})

// Theme detection with prop fallback
const { isDark } = useThemeDetection(toRef(props, 'theme'))

const npsData = computed(() => props.data)
const chartContainerRef = ref(null)

// Tooltip state
const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  date: '',
  min: '',
  max: '',
  q1: '',
  avg: '',
  q3: '',
  median: ''
})

// Chart dimensions
const chartHeight = 400
const chartMargin = 60
const chartBottomMargin = 90
const boxplotSpacing = 120

// Calculate chart widths based on number of daily entries
const dailyChartWidth = computed(() => {
  if (!npsData.value || !npsData.value.nps_by_day) return 800
  const dailyCount = npsData.value.nps_by_day.length
  return Math.max(800, chartMargin * 2 + dailyCount * boxplotSpacing)
})

// Helper function to convert value to Y coordinate
const valueToY = (value, plotHeight) => {
  const valueRange = 10
  const normalized = (value - 1) / (valueRange - 1)
  return chartMargin + plotHeight - (normalized * plotHeight)
}

const formatDateShort = (dateString) => {
  if (!dateString) return ''
  return moment(dateString).format('DD-MM-YYYY')
}

// Daily candlestick data
const dailyCandlestickData = computed(() => {
  if (!npsData.value || !npsData.value.nps_by_day || npsData.value.nps_by_day.length === 0) {
    return []
  }
  
  const data = []
  const plotHeight = chartHeight - chartMargin - chartBottomMargin
  
  npsData.value.nps_by_day.forEach((day, index) => {
    const min = day.min_score || 0
    const q1 = day.q1_score || 0
    const median = day.median_score || 0
    const q3 = day.q3_score || 0
    const max = day.max_score || 0
    const average = day.average_score || 0
    
    // Candlestick: open=Q1, high=Max, low=Min, close=Q3
    data.push({
      label: formatDateShort(day.date),
      responseCount: day.nps_responses_count || 0,
      isTotal: false,
      open: q1,      // Q1 as open
      high: max,     // Max as high
      low: min,      // Min as low
      close: q3,     // Q3 as close
      median,
      average,
      openY: valueToY(q1, plotHeight),
      highY: valueToY(max, plotHeight),
      lowY: valueToY(min, plotHeight),
      closeY: valueToY(q3, plotHeight),
      medianY: valueToY(median, plotHeight),
      averageY: average > 0 ? valueToY(average, plotHeight) : null,
      centerX: chartMargin + (index + 1) * boxplotSpacing,
    })
  })
  
  return data
})

// Tooltip handlers
const handleCandleHover = (event, candle) => {
  if (!chartContainerRef.value || !candle || candle.horizontal) return
  
  const containerRect = chartContainerRef.value.getBoundingClientRect()
  const mouseX = event.clientX
  const mouseY = event.clientY
  
  // Tooltip dimensions
  const tooltipWidth = 140
  const tooltipHeight = 160
  const padding = 10
  const offset = 15
  
  // Calculate position relative to container
  let tooltipX = mouseX - containerRect.left - tooltipWidth / 2
  let tooltipY = mouseY - containerRect.top - tooltipHeight - offset
  
  // Clamp horizontal position within container bounds
  tooltipX = Math.max(padding, Math.min(tooltipX, containerRect.width - tooltipWidth - padding))
  
  // If tooltip would go above container, position it below cursor
  if (tooltipY < padding) {
    tooltipY = mouseY - containerRect.top + offset
  }
  
  // Clamp vertical position within container bounds
  tooltipY = Math.max(padding, Math.min(tooltipY, containerRect.height - tooltipHeight - padding))
  
  // Update tooltip
  tooltip.value = {
    visible: true,
    x: tooltipX,
    y: tooltipY,
    date: candle.label || '',
    min: candle.low !== undefined ? candle.low.toFixed(1) : 'N/A',
    max: candle.high !== undefined ? candle.high.toFixed(1) : 'N/A',
    q1: candle.open !== undefined ? candle.open.toFixed(1) : 'N/A',
    avg: candle.average !== undefined && candle.average > 0 ? candle.average.toFixed(1) : 'N/A',
    q3: candle.close !== undefined ? candle.close.toFixed(1) : 'N/A',
    median: candle.median !== undefined ? candle.median.toFixed(1) : 'N/A'
  }
}

const handleCandleLeave = () => {
  tooltip.value.visible = false
}

// Expose isDark for potential use in templates
defineExpose({ isDark })
</script>

<style scoped>
/* Main Card Styles - Consistente con otros componentes */
.nps-daily-card {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--kiut-bg-card-gradient);
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: var(--kiut-shadow-card);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.nps-daily-card:hover {
  box-shadow: var(--kiut-shadow-card-hover);
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

/* Stats Badge - KPI Style */
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
}

/* Chart Wrapper */
.chart-wrapper {
  position: relative;
  background: var(--kiut-bg-chart-wrapper);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--kiut-border-light);
  box-shadow: var(--kiut-shadow-chart-wrapper);
  overflow-x: auto;
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
  min-height: 320px;
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
  height: 100px;
  margin-bottom: 24px;
}

.flow-line {
  width: 10px;
  background: linear-gradient(to top, var(--kiut-primary-light) 0%, var(--kiut-primary) 50%, var(--kiut-primary-hover) 100%);
  border-radius: 5px;
  animation: wave 1.5s ease-in-out infinite;
  box-shadow: var(--kiut-shadow-loader);
}

.flow-1 { height: 35%; animation-delay: 0s; }
.flow-2 { height: 55%; animation-delay: 0.1s; }
.flow-3 { height: 75%; animation-delay: 0.2s; }
.flow-4 { height: 55%; animation-delay: 0.3s; }
.flow-5 { height: 45%; animation-delay: 0.4s; }

.loading-text {
  font-size: 15px;
  font-weight: 500;
  color: var(--kiut-text-secondary);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  letter-spacing: -0.01em;
}

/* Tooltip Styles */
.tooltip-overlay {
  position: absolute;
  z-index: 1000;
  pointer-events: none;
}

.tooltip-content {
  background: var(--kiut-tooltip-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--kiut-border-color);
  border-radius: 12px;
  padding: 12px 16px;
  min-width: 150px;
  box-shadow: 0 8px 32px rgba(93, 75, 147, 0.3);
}

.tooltip-title {
  color: var(--kiut-tooltip-text);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 6px;
  text-align: center;
  background: linear-gradient(135deg, #C67DFF 0%, #F496A6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tooltip-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--kiut-border-color), transparent);
  margin: 6px 0;
}

.tooltip-stats {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tooltip-stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.tooltip-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 9px;
  font-weight: 600;
  line-height: 1.2;
}

/* Tooltip color variations */
.tooltip-min { color: #73D1D3; }
.tooltip-q1 { color: #1EC383; }
.tooltip-median { color: #C67DFF; }
.tooltip-avg { color: #F3A332; }
.tooltip-q3 { color: #7D8AFA; }
.tooltip-max { color: #F496A6; }

.tooltip-value {
  color: var(--kiut-tooltip-text);
  font-family: 'DM Sans', sans-serif;
  font-size: 9px;
  font-weight: 500;
  line-height: 1.2;
  text-align: right;
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

/* Responsive */
@media (max-width: 768px) {
  .nps-daily-card {
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

  .chart-wrapper {
    padding: 16px;
  }
}
</style>
