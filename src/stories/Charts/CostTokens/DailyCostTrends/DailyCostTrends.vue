<template>
  <article class="daily-cost-trends-card">
    <header class="card-header">
      <div class="header-content">
        <h3 class="card-title">Daily Cost Trends</h3>
        <p class="card-subtitle">Mean USD/conversation per day</p>
      </div>
    </header>

    <div class="card-body" v-if="!loading">
      <section v-if="hasData" class="chart-section">
        <div class="chart-container">
          <LineChart :data="chartData" :options="chartOptions" />
        </div>
      </section>
      
      <!-- Empty State -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <ChartBarIcon class="empty-icon" />
          </div>
          <p class="empty-title">No daily cost trends data</p>
          <p class="empty-description">Try adjusting the date range or check your filters.</p>
        </div>
      </section>
    </div>
    
    <!-- Loading state -->
    <div class="loading-state" v-else>
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
  </article>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import LineChart from '../../Line/ChartLine.vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { useCurrencyFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

// Modelo de datos para costs_by_day
interface CostDayData {
  input_tokens: number;
  output_tokens: number;
  cache_read_tokens: number;
  cache_write_tokens: number;
  total_tokens: number;
  input_cost: number;
  output_cost: number;
  cache_read_cost: number;
  cache_write_cost: number;
  total_cost: number;
}

interface CostsByDay {
  [date: string]: CostDayData;
}

interface CostUsageData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  costs_by_day?: CostsByDay;
  total_cost?: number;
  avg_cost_per_conversation?: number;
}

// Modelo de datos para conversations_by_day
interface ConversationsByDay {
  [date: string]: number;
}

interface ConversationCountData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  total_conversations?: number;
  conversations_by_day?: ConversationsByDay;
}

const props = withDefaults(defineProps<{
  costData?: CostUsageData;
  conversationData?: ConversationCountData;
  loading?: boolean;
  options?: Record<string, any>;
  theme?: Theme;
}>(), {
  costData: () => ({}),
  conversationData: () => ({}),
  loading: false,
  options: undefined,
  theme: undefined,
});

// Theme detection with prop fallback
const { isDark, colors } = useThemeDetection(toRef(props, 'theme'))

// Función para formatear fecha a MM-DD
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${month}-${day}`;
};

// Check if we have data
const hasData = computed(() => {
  const costsData = props.costData?.costs_by_day || {};
  const conversationsData = props.conversationData?.conversations_by_day || {};
  return Object.keys(costsData).length > 0 && Object.keys(conversationsData).length > 0;
});

// Calculate mean USD per conversation per day
const chartData = computed(() => {
  const costsData = props.costData?.costs_by_day || {};
  const conversationsData = props.conversationData?.conversations_by_day || {};
  
  // Get all dates that have both cost and conversation data
  const dates = Object.keys(costsData).filter(date => conversationsData[date]);
  const sortedDates = dates.sort();

  if (sortedDates.length === 0) {
    return { labels: [], datasets: [] };
  }

  const labels = sortedDates.map(d => formatDate(d));
  
  // Calculate mean cost per conversation for each day
  const meanCostPerDay = sortedDates.map(date => {
    const cost = costsData[date]?.total_cost || 0;
    const conversations = conversationsData[date] || 0;
    return conversations > 0 ? cost / conversations : 0;
  });

  return {
    labels,
    datasets: [
      {
        label: 'Mean USD/conv',
        data: meanCostPerDay,
        backgroundColor: '#a78bfa80',
        borderColor: '#a78bfa',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 2,
      }
    ]
  };
});

const chartOptions = computed(() => {
  if (props.options) return props.options;
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'center' as const,
        labels: {
          font: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 500 as any,
          },
          color: colors.value.textSecondary,
          padding: 12,
          boxWidth: 40,
          boxHeight: 12,
          borderRadius: 4,
          usePointStyle: false,
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: colors.value.tooltipBg,
        titleColor: colors.value.tooltipText,
        bodyColor: colors.value.tooltipText,
        borderColor: isDark.value ? 'rgba(198, 125, 255, 0.2)' : 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          family: "'DM Sans', sans-serif",
          size: 13,
          weight: 600 as any,
        },
        bodyFont: {
          family: "'DM Sans', sans-serif",
          size: 12,
          weight: 500 as any,
        },
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += useCurrencyFormat(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        border: { display: false },
        grid: { display: false },
        ticks: {
          font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 as any },
          color: colors.value.textSecondary,
          padding: 8,
        }
      },
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: {
          color: colors.value.gridLines,
          lineWidth: 1,
          drawTicks: false,
        },
        ticks: {
          font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 as any },
          color: colors.value.textSecondary,
          padding: 8,
          callback: function(value: any) {
            return useCurrencyFormat(value);
          }
        }
      }
    }
  };
});

defineExpose({ isDark })
</script>

<style scoped>
/* Main Card Styles */
.daily-cost-trends-card {
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

.header-content {
  width: 100%;
  text-align: left;
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
  margin: 0px;
  line-height: 1.25rem;
}

/* Card Body */
.card-body {
  min-height: 300px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chart-section {
  animation: fadeIn 0.5s ease-out;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chart-container {
  height: 320px;
  flex: 1;
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
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

/* Responsive Design */
@media (max-width: 768px) {
  .daily-cost-trends-card {
    padding: 20px 24px;
    border-radius: 16px;
  }
  
  .card-title { font-size: 20px; }
  .card-subtitle { font-size: 13px; }
  .card-header { margin-bottom: 24px; }
  
  .chart-container {
    height: 280px;
  }
}
</style>

