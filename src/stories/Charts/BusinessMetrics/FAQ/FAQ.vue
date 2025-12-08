<template>
  <article class="faq-metrics-card">
    <header class="card-header">
      <div class="header-content">
        <h3 class="card-title">FAQ Metrics</h3>
        <p class="card-subtitle">Daily FAQ consultation and retrieval metrics</p>
      </div>
    </header>

    <!-- Content when loaded -->
    <div class="card-body" v-if="!props.loading">
      <!-- KPI Cards -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-label">Total FAQ</span>
          <span class="kpi-value">{{ useNumberFormat(metricsData.total_faq_events) }}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Documents Found</span>
          <span class="kpi-value">{{ useNumberFormat(metricsData.total_documents_found) }}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Airline Info</span>
          <span class="kpi-value">{{ useNumberFormat(metricsData.total_airline_information_retrieved) }}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Booking Info</span>
          <span class="kpi-value">{{ useNumberFormat(metricsData.total_booking_info_retrieved) }}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Flight Status</span>
          <span class="kpi-value">{{ useNumberFormat(metricsData.total_flight_status_retrieved) }}</span>
        </div>
      </div>

      <!-- Chart Section -->
      <section v-if="dataChart.labels && dataChart.labels.length" class="chart-section">
        <LineChart :data="dataChart" :options="lineOptions" />

        <FooterExport v-if="enableExport" @export="handleExport" />
      </section>

      <!-- Empty State -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p class="empty-title">No FAQ data available</p>
          <p class="empty-description">No FAQ consultation data found for the selected period. Try adjusting the date range.</p>
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
        <p class="loading-text">Loading FAQ metrics...</p>
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

interface FaqDayData {
  date: string;
  faq_events_count: number;
  documents_found_count: number;
  airline_information_retrieved_count: number;
  booking_info_retrieved_count: number;
  flight_status_retrieved_count: number;
}

interface MetricsData {
  total_faq_events: number;
  total_documents_found: number;
  total_airline_information_retrieved: number;
  total_booking_info_retrieved: number;
  total_flight_status_retrieved: number;
  faq_by_day: FaqDayData[];
}

const props = withDefaults(defineProps<{
  loading?: boolean;
  data?: MetricsData | null;
  theme?: Theme;
  enableExport?: boolean;
}>(), {
  loading: false,
  data: null,
  theme: undefined,
  enableExport: false
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
  total_faq_events: 0,
  total_documents_found: 0,
  total_airline_information_retrieved: 0,
  total_booking_info_retrieved: 0,
  total_flight_status_retrieved: 0,
  faq_by_day: [],
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
  if (!data) {
    dataChart.value = { labels: [], datasets: [] }
    return
  }

  const faqData = data.faq_by_day || []

  if (faqData.length > 0) {
    const labels = faqData.map((item: FaqDayData) => moment(item.date).format('MMM DD'))
    const airlineInfo = faqData.map((item: FaqDayData) => item.airline_information_retrieved_count || 0)
    const flightStatus = faqData.map((item: FaqDayData) => item.flight_status_retrieved_count || 0)
    const bookingInfo = faqData.map((item: FaqDayData) => item.booking_info_retrieved_count || 0)

    dataChart.value = {
      labels,
      datasets: [
        {
          label: 'Airline Information',
          data: airlineInfo,
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#8b5cf6',
          pointBorderColor: '#7c3aed',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Flight Status',
          data: flightStatus,
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#06b6d4',
          pointBorderColor: '#0891b2',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Booking Information',
          data: bookingInfo,
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#f59e0b',
          pointBorderColor: '#d97706',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    }
  } else {
    dataChart.value = { labels: [], datasets: [] }
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
.faq-metrics-card {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--kiut-bg-card-gradient);
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: var(--kiut-shadow-card);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.faq-metrics-card:hover {
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
}

/* KPI Grid */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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

.kpi-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--kiut-text-secondary);
  line-height: 1.2;
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
  .faq-metrics-card {
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
    grid-template-columns: repeat(3, 1fr);
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

  .chart-wrapper {
    padding: 16px;
    height: 280px;
  }
}
</style>
