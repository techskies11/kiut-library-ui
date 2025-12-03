<template>
  <article class="glass-card rounded-2xl p-6 w-full border border-purple-200/20 shadow-glass transition-all duration-300 hover:shadow-glass-lg">
    <header class="flex items-center gap-4 mb-6">
      <!-- Gradient Accent Bar -->
      <div class="w-1.5 h-12 bg-gradient-purple-pink rounded-full"></div>
      <div class="flex-1">
        <h3 class="font-display font-bold text-xl text-gray-800 dark:text-gray-100">
          NPS Daily Metrics
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 font-sans">
          Daily NPS Distribution
        </p>
      </div>
      <!-- Days Badge -->
      <div v-if="npsData && npsData.nps_by_day && npsData.nps_by_day.length > 0" class="stats-badge">
        <span class="text-xs font-semibold text-white">
          {{ npsData.nps_by_day.length }} days
        </span>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="loading-spinner"></div>
    </div>
    
    <!-- Daily Candlestick Section -->
    <div v-else-if="npsData && npsData.nps_by_day && npsData.nps_by_day.length > 0" class="chart-wrapper" ref="chartContainerRef">
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
      
      <!-- Custom Tooltip with Glass Effect -->
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

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon-wrapper">
        <ChartBarIcon class="w-8 h-8 text-purple-400" />
      </div>
      <p class="text-gray-600 dark:text-gray-300 text-center text-sm font-medium mb-1">
        No daily NPS data for the selected period
      </p>
      <span class="text-xs text-gray-400 dark:text-gray-500">
        Try adjusting the date range or check your filters
      </span>
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { getNpsMetrics } from '../../../../services/modules/business-metrics'
import moment from 'moment'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import CandlestickChart from '../../Candlestick/CandlestickChart.vue'

const props = defineProps({
  dates: {
    type: Array,
    required: true
  },
  airline_name: {
    type: String,
    required: true
  }
})

const npsData = ref(null)
const loading = ref(true)
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

const searchData = async () => {
  try {
    loading.value = true
    const startDate = moment(props.dates[0]).format('YYYY-MM-DD')
    const endDate = moment(props.dates[1]).format('YYYY-MM-DD')
    const response = await getNpsMetrics(props.airline_name, startDate, endDate)
    console.log('NPS Daily Data received:', response)
    npsData.value = response
  } catch (error) {
    console.error('Error fetching NPS daily data:', error)
    npsData.value = null
  } finally {
    loading.value = false
  }
}

onMounted(async () => searchData())
watch(() => props.dates, async () => props.dates[0] && props.dates[1] && searchData())
</script>

<style scoped>
/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.dark .glass-card {
  background: rgba(26, 26, 29, 0.8);
}

/* Gradient Accent */
.bg-gradient-purple-pink {
  background: linear-gradient(180deg, #5D4B93 0%, #F496A6 100%);
}

/* Stats Badge */
.stats-badge {
  background: linear-gradient(135deg, #F496A6 0%, #5D4B93 100%);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  box-shadow: 0 4px 15px rgba(244, 150, 166, 0.3);
}

/* Loading Spinner */
.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(198, 125, 255, 0.2);
  border-top-color: #C67DFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
}

.empty-icon-wrapper {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, rgba(198, 125, 255, 0.1) 0%, rgba(93, 75, 147, 0.1) 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border: 1px solid rgba(198, 125, 255, 0.2);
}

/* Chart Wrapper */
.chart-wrapper {
  position: relative;
  width: 100%;
  padding: 1rem 0;
}

/* Shadow Utilities */
.shadow-glass {
  box-shadow: 0 8px 32px rgba(93, 75, 147, 0.1);
}

.shadow-glass-lg {
  box-shadow: 0 12px 48px rgba(93, 75, 147, 0.15);
}

/* Tooltip Styles - Glass Effect */
.tooltip-overlay {
  position: absolute;
  z-index: 1000;
  pointer-events: none;
}

.tooltip-content {
  background: rgba(26, 26, 29, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(198, 125, 255, 0.3);
  border-radius: 12px;
  padding: 12px 16px;
  min-width: 150px;
  box-shadow: 0 8px 32px rgba(93, 75, 147, 0.3);
}

.tooltip-title {
  color: #ffffff;
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
  background: linear-gradient(90deg, transparent, rgba(198, 125, 255, 0.4), transparent);
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

/* Tooltip color variations matching design system */
.tooltip-min { color: #73D1D3; }
.tooltip-q1 { color: #1EC383; }
.tooltip-median { color: #C67DFF; }
.tooltip-avg { color: #F3A332; }
.tooltip-q3 { color: #7D8AFA; }
.tooltip-max { color: #F496A6; }

.tooltip-value {
  color: #ffffff;
  font-family: 'DM Sans', sans-serif;
  font-size: 9px;
  font-weight: 500;
  line-height: 1.2;
  text-align: right;
}
</style>

