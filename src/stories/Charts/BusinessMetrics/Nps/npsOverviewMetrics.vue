<template>
  <article class="nps-overview-card">
    <header class="card-header">
      <div class="header-content">
        <div class="title-section">
          <h3 class="card-title">NPS Overview Metrics</h3>
          <p class="card-subtitle">Overall NPS Distribution</p>
        </div>
        <div v-if="npsData && npsData.total_nps_responses > 0" class="stats-badge">
          <p class="badge-label">Responses</p>
          <p class="badge-value">{{ npsData.total_nps_responses }}</p>
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
        <p class="loading-text">Loading NPS data...</p>
      </div>
    </div>
    
    <!-- Histogram Section -->
    <div v-else-if="npsData && npsData.total_nps_responses > 0" class="card-body">
      <div class="chart-wrapper">
        <HistogramChart
          :histogram="npsData.histogram || []"
          :min-score="npsData.min_score || 0"
          :max-score="npsData.max_score || 0"
          :q1-score="npsData.q1_score || 0"
          :median-score="npsData.median_score || 0"
          :q3-score="npsData.q3_score || 0"
          :average-score="npsData.average_score || 0"
          :chart-width="chartWidth"
          :chart-height="chartHeight"
          :chart-margin="chartMargin"
          :chart-bottom-margin="chartBottomMargin"
        />
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
        <p class="empty-title">No NPS data available</p>
        <p class="empty-description">No NPS data found for the selected period. Try adjusting the date range.</p>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, toRef } from 'vue'
import HistogramChart from '../../Histogram/HistogramChart.vue'
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

// Chart dimensions (responsive to container width)
const chartWidth = computed(() => {
  return Math.max(600, window.innerWidth * 0.85)
})
const chartHeight = 500
const chartMargin = 60
const chartBottomMargin = 80

// Expose isDark for potential use in templates
defineExpose({ isDark })
</script>

<style scoped>
/* Main Card Styles - Consistente con otros componentes */
.nps-overview-card {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--kiut-bg-card-gradient);
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: var(--kiut-shadow-card);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.nps-overview-card:hover {
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
  background: var(--kiut-bg-chart-wrapper);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--kiut-border-light);
  box-shadow: var(--kiut-shadow-chart-wrapper);
  display: flex;
  justify-content: center;
  align-items: center;
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
  .nps-overview-card {
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
