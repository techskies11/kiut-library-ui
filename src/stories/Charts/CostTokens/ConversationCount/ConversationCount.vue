<template>
  <ChartMetricContainer
    class="h-full min-h-0"
    title="Conversation Count"
    subtitle="Conversations over time"
    :collapsible="false"
  >
    <div class="flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]">

    <div class="card-body" v-if="!loading">
      <section v-if="chartData.labels && chartData.labels.length" class="chart-section">
        <div class="chart-container">
          <LineChart :data="chartData" :options="chartOptions" />
        </div>
        <div class="mt-4 w-full min-w-0">
          <CardInfo
            class="min-w-0 w-full"
            title="Total"
            :value="formattedTotalConversations"
          />
        </div>
      </section>
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <ChartBarIcon class="empty-icon" />
          </div>
          <p class="empty-title">No conversation count data</p>
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
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import LineChart from '../../Line/ChartLine.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import CardInfo from '../../Utils/CardInfo/CardInfo.vue'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

// Modelo de datos para conversations_by_day
interface ConversationsByDay {
  [date: string]: number;
}

// Modelo de datos que recibe el componente
interface ConversationCountData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  total_conversations?: number;
  conversations_by_day?: ConversationsByDay;
}

const props = withDefaults(defineProps<{
  data?: ConversationCountData;
  loading?: boolean;
  options?: Record<string, any>;
  theme?: Theme;
}>(), {
  data: () => ({}),
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

const formattedTotalConversations = computed(() =>
  useNumberFormat(props.data?.total_conversations ?? 0)
)

// Computed que procesa conversations_by_day y genera labels + datasets para el gráfico
const chartData = computed(() => {
  const conversationsData = props.data?.conversations_by_day || {};
  const sortedKeys = Object.keys(conversationsData).sort();

  if (sortedKeys.length === 0) {
    return { labels: [], datasets: [] };
  }

  const labels = sortedKeys.map(d => formatDate(d));

  const datasets = [
    {
      label: 'Conversations',
      data: sortedKeys.map(date => conversationsData[date] || 0),
      backgroundColor: '#a78bfa80',
      borderColor: '#a78bfa',
      borderWidth: 2,
      tension: 0.4,
      fill: false,
      pointRadius: 4,
      pointHoverRadius: 6,
    }
  ];

  return {
    labels,
    datasets
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
        align: 'end' as const,
        labels: {
          font: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 500 as any,
          },
          color: colors.value.textSecondary,
          padding: 12,
          boxWidth: 12,
          boxHeight: 12,
          borderRadius: 4,
          usePointStyle: true,
          pointStyle: 'circle',
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
              label += context.parsed.y;
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        border: { display: false },
        grid: { color: colors.value.gridLines, lineWidth: 1, drawTicks: false },
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
        }
      }
    }
  };
});

defineExpose({ isDark })
</script>

<style scoped>
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
  justify-content: space-between;
}

.chart-container {
  height: 320px;
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
  background: linear-gradient(to top, #C67DFF 0%, #5D4B93 50%, #4a3a75 100%);
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
  .chart-container {
    height: 280px;
  }
}
</style>

