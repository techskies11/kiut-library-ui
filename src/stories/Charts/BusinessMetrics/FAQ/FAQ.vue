<template>
  <article class="faq-metrics-card">
    <header class="card-header">
      <div class="header-content">
        <h3 class="card-title">FAQ Metrics</h3>
        <p class="card-subtitle">Daily FAQ consultation and retrieval metrics</p>
      </div>
    </header>

    <!-- Content when loaded -->
    <div class="card-body" v-if="!loading">
      <!-- KPI Cards -->
      <div class="kpi-grid">
        <div class="kpi-card kpi-purple">
          <p class="kpi-label">Total FAQ</p>
          <p class="kpi-value">{{ useNumberFormat(metricsData.total_faq_events) }}</p>
        </div>
        <div class="kpi-card kpi-blue">
          <p class="kpi-label">Documents Found</p>
          <p class="kpi-value">{{ useNumberFormat(metricsData.total_documents_found) }}</p>
        </div>
        <div class="kpi-card kpi-green">
          <p class="kpi-label">Airline Info</p>
          <p class="kpi-value">{{ useNumberFormat(metricsData.total_airline_information_retrieved) }}</p>
        </div>
        <div class="kpi-card kpi-orange">
          <p class="kpi-label">Booking Info</p>
          <p class="kpi-value">{{ useNumberFormat(metricsData.total_booking_info_retrieved) }}</p>
        </div>
        <div class="kpi-card kpi-cyan">
          <p class="kpi-label">Flight Status</p>
          <p class="kpi-value">{{ useNumberFormat(metricsData.total_flight_status_retrieved) }}</p>
        </div>
      </div>

      <!-- Chart Section -->
      <section v-if="dataChart.labels && dataChart.labels.length" class="chart-section">
        <div class="chart-wrapper">
          <LineChart :data="dataChart" :options="lineOptions" />
        </div>
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
import { ref, onMounted, watch, computed } from 'vue'
import moment from 'moment'
import { getFaqMetrics } from '../../../../services/modules/business-metrics'
import LineChart from '../../Line/ChartLine.vue'
import { useNumberFormat } from '../../../../plugins/numberFormat'

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
  dates?: Date[];
  airline_name?: string;
}>(), {
  dates: () => [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()],
  airline_name: 'default_airline'
})

const loading = ref(true)
const dataChart = ref<{ labels: string[]; datasets: any[] }>({ labels: [], datasets: [] })
const metricsData = ref<MetricsData>({
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
      },
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#1e293b',
      bodyColor: '#64748b',
      borderColor: 'rgba(0, 0, 0, 0.1)',
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
        color: '#64748b',
      },
    },
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        font: {
          family: "'DM Sans', sans-serif",
          size: 11,
        },
        color: '#64748b',
      },
    },
  },
  interaction: {
    mode: 'nearest' as const,
    axis: 'x' as const,
    intersect: false,
  },
}))

const searchData = async () => {
  try {
    loading.value = true
    const startDate = moment(props.dates[0]).format('YYYY-MM-DD')
    const endDate = moment(props.dates[1]).format('YYYY-MM-DD')

    const response = await getFaqMetrics(props.airline_name, startDate, endDate)
    metricsData.value = response

    // Formatear datos para el gráfico
    const faqData = response?.faq_by_day || []

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
  } catch (error) {
    console.error('Error fetching FAQ metrics data:', error)
    dataChart.value = { labels: [], datasets: [] }
    metricsData.value = {
      total_faq_events: 0,
      total_documents_found: 0,
      total_airline_information_retrieved: 0,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 0,
      faq_by_day: [],
    }
  } finally {
    loading.value = false
  }
}

onMounted(searchData)
watch(
  () => props.dates,
  (newDates) => {
    if (newDates?.[0] && newDates?.[1]) searchData()
  },
  { deep: true }
)
</script>

<style scoped>
/* Main Card Styles */
.faq-metrics-card {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(to bottom, #ffffff 0%, #fafafa 100%);
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 10px 15px -3px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.faq-metrics-card:hover {
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

/* Header Styles */
.card-header {
  margin-bottom: 28px;
  position: relative;
}

.header-content {
  width: 100%;
}

.card-title {
  font-family: 'Space Grotesk', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  margin: 0;
  line-height: 1.3;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #c67dff, #5d4b93);
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
  color: #64748b;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 28px;
}

@media (min-width: 768px) {
  .kpi-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .kpi-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.kpi-card {
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.kpi-purple {
  background: linear-gradient(135deg, #f3e8ff 0%, #ede9fe 50%, #ddd6fe 100%);
}

.kpi-purple .kpi-label { color: #7c3aed; }
.kpi-purple .kpi-value { color: #5b21b6; }

.kpi-blue {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%);
}

.kpi-blue .kpi-label { color: #2563eb; }
.kpi-blue .kpi-value { color: #1d4ed8; }

.kpi-green {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%);
}

.kpi-green .kpi-label { color: #059669; }
.kpi-green .kpi-value { color: #047857; }

.kpi-orange {
  background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 50%, #fdba74 100%);
}

.kpi-orange .kpi-label { color: #ea580c; }
.kpi-orange .kpi-value { color: #c2410c; }

.kpi-cyan {
  background: linear-gradient(135deg, #cffafe 0%, #a5f3fc 50%, #67e8f9 100%);
}

.kpi-cyan .kpi-label { color: #0891b2; }
.kpi-cyan .kpi-value { color: #0e7490; }

.kpi-label {
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 8px 0;
  letter-spacing: -0.01em;
}

.kpi-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
}

/* Chart Section */
.chart-section {
  animation: fadeIn 0.5s ease-out 0.1s backwards;
}

.chart-wrapper {
  background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  height: 320px;
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
  background: linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%);
  border-radius: 20px;
  margin: 0 auto 20px;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
}

.empty-icon {
  width: 40px;
  height: 40px;
  color: #8b5cf6;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
  letter-spacing: -0.01em;
}

.empty-description {
  font-size: 14px;
  font-weight: 400;
  color: #64748b;
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
  background: linear-gradient(to top, #c67dff 0%, #8b5cf6 50%, #7c3aed 100%);
  border-radius: 4px;
  animation: wave 1.5s ease-in-out infinite;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
}

.bar-1 {
  height: 30%;
  animation-delay: 0s;
}

.bar-2 {
  height: 50%;
  animation-delay: 0.1s;
}

.bar-3 {
  height: 70%;
  animation-delay: 0.2s;
}

.bar-4 {
  height: 50%;
  animation-delay: 0.3s;
}

.bar-5 {
  height: 40%;
  animation-delay: 0.4s;
}

.loading-text {
  font-size: 15px;
  font-weight: 500;
  color: #64748b;
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

  .kpi-card {
    padding: 16px;
    min-height: 90px;
  }

  .kpi-value {
    font-size: 1.5rem;
  }

  .chart-wrapper {
    padding: 16px;
    height: 280px;
  }
}
</style>

