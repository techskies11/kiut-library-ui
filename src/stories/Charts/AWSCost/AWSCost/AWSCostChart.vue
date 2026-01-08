<template>
  <article class="aws-cost-card">
    <header class="card-header">
      <div class="header-main">
        <div class="header-content">
          <h3 class="card-title">{{ data.airline_name || 'AWS Cost Analysis' }}</h3>
          <p class="card-subtitle">AWS vs Allocated costs over time</p>
        </div>
        
        <div class="header-stats">
          <div class="stat-badge primary">
            <span class="stat-label">Total Allocated</span>
            <span class="stat-value">{{ useCurrencyFormat(data.total_allocated_cost) }}</span>
          </div>
          <div class="stat-badge secondary">
            <span class="stat-label">Total AWS</span>
            <span class="stat-value">{{ useCurrencyFormat(data.total_cost) }}</span>
          </div>
        </div>
      </div>
    </header>

    <div class="card-body">
      <!-- Loading state -->
      <div class="loading-state" v-if="loading">
        <div class="loading-container">
          <div class="chart-lines-loader">
            <div class="line line-1"></div>
            <div class="line line-2"></div>
            <div class="line line-3"></div>
            <div class="line line-4"></div>
            <div class="line line-5"></div>
          </div>
          <p class="loading-text">Loading chart data...</p>
        </div>
      </div>

      <div v-else-if="data.daily && data.daily.length" class="chart-section">
        <div class="chart-container">
          <ChartLine :data="chartData" :options="chartOptions" />
        </div>
        
        <footer class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">Total Conv.</span>
            <span class="kpi-value">{{ useNumberFormat(data.total_conversations) }}</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Airline Conv.</span>
            <span class="kpi-value">{{ useNumberFormat(data.total_airline_conversations) }}</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Avg. Cost / Conv.</span>
            <span class="kpi-value">{{ useCurrencyFormat(data.total_allocated_cost / (data.total_conversations || 1)) }}</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Efficiency</span>
            <span class="kpi-value gradient-text">
              {{ ((data.total_airline_conversations / (data.total_conversations || 1)) * 100).toFixed(1) }}%
            </span>
          </div>
        </footer>
      </div>

      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <ChartBarIcon class="empty-icon" />
          </div>
          <p class="empty-title">Sin datos de costos</p>
          <p class="empty-description">No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.</p>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup>
import { computed, toRef } from 'vue'
import ChartLine from '../../Line/ChartLine.vue'
import { useCurrencyFormat, useNumberFormat } from '../../../../plugins/numberFormat'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { useThemeDetection } from '../../../../composables/useThemeDetection'

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      airline_name: '',
      start_date: '',
      end_date: '',
      daily: [],
      total_allocated_cost: 0,
      total_cost: 0,
      total_conversations: 0,
      total_airline_conversations: 0
    })
  },
  loading: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: undefined
  }
})

const { isDark, colors } = useThemeDetection(toRef(props, 'theme'))

const chartData = computed(() => {
  const labels = props.data.daily.map(d => d.date)
  return {
    labels,
    datasets: [
      {
        label: 'Allocated Cost',
        data: props.data.daily.map(d => d.allocated_cost),
        borderColor: colors.value.primaryLight,
        backgroundColor: isDark.value ? 'rgba(198, 125, 255, 0.15)' : 'rgba(198, 125, 255, 0.08)',
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
        yAxisID: 'y'
      },
      {
        label: 'AWS Cost',
        data: props.data.daily.map(d => d.aws_cost),
        borderColor: '#FF9900', // Amazon Orange/Yellow
        backgroundColor: 'transparent',
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.4,
        fill: false,
        yAxisID: 'y'
      },
      {
        label: 'Airline Conv.',
        data: props.data.daily.map(d => d.airline_conversations),
        borderColor: colors.value.info,
        backgroundColor: isDark.value ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.3,
        yAxisID: 'y1'
      }
    ]
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
        boxWidth: 8,
        boxHeight: 8,
        color: colors.value.textSecondary,
        font: { 
          family: "'DM Sans', sans-serif", 
          size: 11,
          weight: '600'
        }
      }
    },
    tooltip: {
      padding: 12,
      backgroundColor: colors.value.tooltipBg,
      titleColor: colors.value.tooltipText,
      bodyColor: colors.value.tooltipText,
      borderColor: colors.value.tooltipBorder,
      borderWidth: 1,
      cornerRadius: 12,
      displayColors: true,
      usePointStyle: true
    }
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      grid: { 
        color: colors.value.gridLines,
        drawBorder: false
      },
      ticks: {
        color: colors.value.textSecondary,
        font: { family: "'DM Sans', sans-serif", size: 10 },
        callback: (val) => useCurrencyFormat(val)
      }
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: { display: false },
      ticks: {
        color: colors.value.textSecondary,
        font: { family: "'DM Sans', sans-serif", size: 10 }
      }
    },
    x: {
      grid: { display: false },
      ticks: {
        color: colors.value.textSecondary,
        font: { family: "'DM Sans', sans-serif", size: 10 }
      }
    }
  }
}))
</script>

<style scoped>
.aws-cost-card {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--kiut-bg-card-gradient);
  border-radius: 20px;
  padding: 28px 32px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Header Styles */
.card-header {
  margin-bottom: 32px;
  position: relative;
}

.header-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.header-content {
  flex: 1;
}

.card-title {
  font-family: 'Space Grotesk', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
  margin: 0;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--kiut-primary-light), var(--kiut-primary-default));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-subtitle {
  font-size: .875rem;
  font-weight: 400;
  color: var(--kiut-text-secondary);
  margin: 4px 0 0 0;
  line-height: 1.25rem;
}

/* Header Stats Badges */
.header-stats {
  display: flex;
  gap: 12px;
}

.stat-badge {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 8px 16px;
  border-radius: 16px;
  border: 1px solid var(--kiut-border-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-badge.primary {
  background: linear-gradient(135deg, var(--kiut-primary-light), var(--kiut-primary-default));
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-badge.primary .stat-label {
  color: rgba(255, 255, 255, 0.7);
}

.stat-badge.primary .stat-value {
  color: #ffffff;
}

.stat-badge.secondary {
  background: var(--kiut-bg-secondary);
}

.stat-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--kiut-text-muted);
  margin-bottom: 2px;
}

.stat-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--kiut-text-primary);
}

/* Card Body */
.card-body {
  min-height: 350px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chart-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: fadeIn 0.5s ease-out;
}

.chart-container {
  height: 320px;
  margin-bottom: 24px;
}

/* Footer KPI Grid */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: auto;
}

.kpi-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  background: var(--kiut-bg-stats-badge);
  border: 1px solid var(--kiut-border-light);
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

.gradient-text {
  background: linear-gradient(135deg, var(--kiut-primary-light) 0%, var(--kiut-primary-default) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
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
  flex: 1;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.chart-lines-loader {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
  height: 100px;
  margin-bottom: 24px;
}

.line {
  width: 8px;
  background: linear-gradient(to top, var(--kiut-primary-light) 0%, var(--kiut-primary) 50%, var(--kiut-primary-hover) 100%);
  border-radius: 4px;
  animation: wave 1.5s ease-in-out infinite;
}

.line-1 { height: 30%; animation-delay: 0s; }
.line-2 { height: 50%; animation-delay: 0.1s; }
.line-3 { height: 70%; animation-delay: 0.2s; }
.line-4 { height: 50%; animation-delay: 0.3s; }
.line-5 { height: 40%; animation-delay: 0.4s; }

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
@media (max-width: 1024px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .aws-cost-card {
    padding: 20px 24px;
  }
  
  .header-main {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-stats {
    margin-top: 12px;
  }
  
  .card-title {
    font-size: 1.125rem;
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

