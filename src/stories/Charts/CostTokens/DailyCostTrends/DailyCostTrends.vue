<template>
  <ChartMetricContainer
    class="h-full min-h-0"
    title="Average cost"
    :subtitle="chartSubtitle"
    :collapsible="false"
    :loading="loading"
  >
    <template #headerAside>
      <div class="flex items-center justify-end gap-3">
        <div class="w-44">
          <Select
            :model-value="selectedMetricType"
            :options="METRIC_TYPE_OPTIONS"
            aria-label-trigger="Average cost metric"
            :show-option-check="false"
            @update:model-value="onMetricTypeChange"
          />
        </div>
        <div class="w-28">
          <Select
            :model-value="selectedScopeBreakdown"
            :options="SCOPE_BREAKDOWN_OPTIONS"
            aria-label-trigger="Average cost scope"
            :show-option-check="false"
            @update:model-value="onScopeBreakdownChange"
          />
        </div>
      </div>
    </template>

    <div class="flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]">

    <div class="card-body">
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
          <p class="empty-title">No average cost data</p>
          <p class="empty-description">Try adjusting the date range or check your filters.</p>
        </div>
      </section>
    </div>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'
import moment from 'moment'
import LineChart from '../../Line/ChartLine.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { useCurrencyFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'
import Select, {
  type KiutSelectOption,
  type KiutSelectValue,
} from '../../../../components/Inputs/Select.vue'
import { CHART_INTER_FONT_FAMILY } from '../../chartInterFont'

type AverageCostMetricType = 'per_conversation' | 'per_interaction'
type AverageCostScopeBreakdown = 'all'

const METRIC_TYPE_OPTIONS: KiutSelectOption<AverageCostMetricType>[] = [
  { value: 'per_conversation', label: 'Per conversation' },
  { value: 'per_interaction', label: 'Per interaction', disabled: true },
]

const SCOPE_BREAKDOWN_OPTIONS: KiutSelectOption<AverageCostScopeBreakdown>[] = [
  { value: 'all', label: 'All' },
]

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
  daily_mean_cost_per_conversation?: Array<{ date: string; value: number }>;
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
  metricType?: AverageCostMetricType;
  scopeBreakdown?: AverageCostScopeBreakdown;
}>(), {
  costData: () => ({}),
  conversationData: () => ({}),
  loading: false,
  options: undefined,
  theme: undefined,
  metricType: 'per_conversation',
  scopeBreakdown: 'all',
});

const emit = defineEmits<{
  'update:metricType': [value: AverageCostMetricType];
  'update:scopeBreakdown': [value: AverageCostScopeBreakdown];
}>()

// Theme detection with prop fallback
const { isDark, colors } = useThemeDetection(toRef(props, 'theme'))

const selectedMetricType = ref<AverageCostMetricType>(props.metricType)
const selectedScopeBreakdown = ref<AverageCostScopeBreakdown>(props.scopeBreakdown)

watch(
  () => props.metricType,
  (value) => {
    selectedMetricType.value = value
  },
)

watch(
  () => props.scopeBreakdown,
  (value) => {
    selectedScopeBreakdown.value = value
  },
)

const chartSubtitle = computed(() => {
  if (selectedScopeBreakdown.value === 'all') {
    return 'Aggregated across all agents'
  }
  return 'Average cost over time'
})

const formatDate = (dateStr: string): string => moment(dateStr).format('MMM D')

const formatAxisCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(value)

function onMetricTypeChange(value: KiutSelectValue): void {
  if (value !== 'per_conversation' && value !== 'per_interaction') return
  if (value === 'per_interaction') return
  selectedMetricType.value = value
  emit('update:metricType', value)
}

function onScopeBreakdownChange(value: KiutSelectValue): void {
  if (value !== 'all') return
  selectedScopeBreakdown.value = value
  emit('update:scopeBreakdown', value)
}

// Check if we have data
const hasData = computed(() => {
  const backendSeries = props.costData?.daily_mean_cost_per_conversation || [];
  if (Array.isArray(backendSeries) && backendSeries.length > 0) {
    return true;
  }
  const costsData = props.costData?.costs_by_day || {};
  const conversationsData = props.conversationData?.conversations_by_day || {};
  return Object.keys(costsData).length > 0 && Object.keys(conversationsData).length > 0;
});

// Calculate mean USD per conversation per day
const chartData = computed(() => {
  const backendSeries = props.costData?.daily_mean_cost_per_conversation || [];
  if (backendSeries.length > 0) {
    const sortedSeries = [...backendSeries].sort((a, b) => a.date.localeCompare(b.date));
    return {
      labels: sortedSeries.map((point) => formatDate(point.date)),
      datasets: [
        {
          label: 'Average cost',
          data: sortedSeries.map((point) => Number(point.value) || 0),
          backgroundColor: '#8b45dc',
          borderColor: '#8b45dc',
          borderWidth: 2,
          tension: 0.4,
          fill: false,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: '#8b45dc',
          pointBorderWidth: 2,
        }
      ]
    };
  }

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
        label: 'Average cost',
        data: meanCostPerDay,
        backgroundColor: '#a78bfa80',
        borderColor: '#a78bfa',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#a78bfa',
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
        display: false,
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
          family: CHART_INTER_FONT_FAMILY,
          size: 13,
          weight: 600 as any,
        },
        bodyFont: {
          family: CHART_INTER_FONT_FAMILY,
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
        grid: {
          color: colors.value.gridLines,
          lineWidth: 1,
          drawTicks: false,
          borderDash: [4, 4],
        },
        ticks: {
          font: { family: CHART_INTER_FONT_FAMILY, size: 12, weight: 500 as any },
          color: colors.value.textSecondary,
          padding: 8,
          maxTicksLimit: 8,
        }
      },
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: {
          color: colors.value.gridLines,
          lineWidth: 1,
          drawTicks: false,
          borderDash: [4, 4],
        },
        ticks: {
          font: { family: CHART_INTER_FONT_FAMILY, size: 12, weight: 500 as any },
          color: colors.value.textSecondary,
          padding: 8,
          callback: function(value: string | number) {
            return formatAxisCurrency(Number(value));
          }
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
}

.chart-container {
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

