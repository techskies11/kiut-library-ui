<template>
  <ChartMetricContainer
    class="h-full min-h-0"
    title="Token usage"
    subtitle="Stacked by token type"
    :collapsible="false"
    :loading="loading"
  >
    <div
      class="flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
    >
      <div class="card-body">
        <section
          v-if="chartData.labels && chartData.labels.length"
          class="chart-section"
        >
          <div class="chart-container">
            <BarChart
              :data="chartData"
              :options="chartOptions"
              :stacked="true"
              :height-px="280"
            />
          </div>

          <footer class="mt-auto grid grid-cols-2 gap-3 max-[768px]:gap-2">
            <CardInfo
              title="Input"
              :value="formatCompactTokens(totalInputTokens)"
              :subvalue="pctOfTotal(totalInputTokens)"
              :color="tokenColors.input"
            />
            <CardInfo
              title="Output"
              :value="formatCompactTokens(totalOutputTokens)"
              :subvalue="pctOfTotal(totalOutputTokens)"
              :color="tokenColors.output"
            />
            <CardInfo
              title="Cache read"
              :value="formatCompactTokens(totalCacheReadTokens)"
              :subvalue="pctOfTotal(totalCacheReadTokens)"
              :color="tokenColors.cache_read"
            />
            <CardInfo
              title="Cache write"
              :value="formatCompactTokens(totalCacheWriteTokens)"
              :subvalue="pctOfTotal(totalCacheWriteTokens)"
              :color="tokenColors.cache_write"
            />
          </footer>
        </section>
        <section v-else class="empty-state">
          <div class="empty-state-content">
            <div class="empty-icon-wrapper">
              <ChartBarIcon class="empty-icon" />
            </div>
            <p class="empty-title">No token usage data</p>
            <p class="empty-description">
              Try adjusting the date range or check your filters to see token
              consumption trends.
            </p>
          </div>
        </section>
      </div>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from "vue";
import moment from "moment";
import BarChart from "../../Bar/ChartBar.vue";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";
import CardInfo from "../../Utils/CardInfo/CardInfo.vue";
import { ChartBarIcon } from "@heroicons/vue/24/outline";
import { type ExportFormat } from "../../Utils/FooterExport";
import { useNumberFormat } from "../../../../plugins/numberFormat";
import {
  useThemeDetection,
  type Theme,
} from "../../../../composables/useThemeDetection";

interface TokenDayData {
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  cache_read_tokens?: number;
  cache_write_tokens?: number;
}

interface TokensByDay {
  [date: string]: TokenDayData;
}

interface TokenUsageData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  tokens_by_day?: TokensByDay;
  total_tokens?: number;
  total_input_tokens?: number;
  total_cache_read_tokens?: number;
  total_cache_write_tokens?: number;
  total_output_tokens?: number;
}

const props = withDefaults(
  defineProps<{
    data?: TokenUsageData;
    loading?: boolean;
    options?: Record<string, unknown>;
    theme?: Theme;
    enableExport?: boolean;
    exportLoading?: boolean;
  }>(),
  {
    data: () => ({}),
    loading: false,
    options: undefined,
    theme: undefined,
    enableExport: false,
    exportLoading: false,
  },
);

defineEmits<{
  export: [format: ExportFormat];
}>();

const { isDark, colors } = useThemeDetection(toRef(props, "theme"));

const chartFontFamily =
  "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const LEGEND_BOX_PX = 10;
const BAR_TOP_RADIUS = 3;

const formatDate = (dateStr: string): string => moment(dateStr).format("MMM D");

const tokenColors = {
  input: "#a78bfa",
  output: "#22d3ee",
  cache_read: "#4ade80",
  cache_write: "#fb923c",
};

const formatCompactTokens = (value: number): string => {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (abs >= 1_000_000) {
    return `${sign}${(abs / 1_000_000).toFixed(1)}M`;
  }
  if (abs >= 1_000) {
    return `${sign}${(abs / 1_000).toFixed(1)}K`;
  }
  return useNumberFormat(value);
};

const totalInputTokens = computed(() => {
  const tokensData = props.data?.tokens_by_day || {};
  return Object.values(tokensData).reduce(
    (sum, day) => sum + (day.input_tokens || 0),
    0,
  );
});

const totalOutputTokens = computed(() => {
  const tokensData = props.data?.tokens_by_day || {};
  return Object.values(tokensData).reduce(
    (sum, day) => sum + (day.output_tokens || 0),
    0,
  );
});

const totalCacheReadTokens = computed(() => {
  const tokensData = props.data?.tokens_by_day || {};
  return Object.values(tokensData).reduce(
    (sum, day) => sum + (day.cache_read_tokens || 0),
    0,
  );
});

const totalCacheWriteTokens = computed(() => {
  const tokensData = props.data?.tokens_by_day || {};
  return Object.values(tokensData).reduce(
    (sum, day) => sum + (day.cache_write_tokens || 0),
    0,
  );
});

const totalTokens = computed(
  () =>
    totalInputTokens.value +
    totalOutputTokens.value +
    totalCacheReadTokens.value +
    totalCacheWriteTokens.value,
);

const pctOfTotal = (part: number): string => {
  if (totalTokens.value <= 0) return "0% of total";
  return `${((part / totalTokens.value) * 100).toFixed(1)}% of total`;
};

const chartData = computed(() => {
  const tokensData = props.data?.tokens_by_day || {};
  const sortedKeys = Object.keys(tokensData).sort();

  if (sortedKeys.length === 0) {
    return { labels: [], datasets: [] };
  }

  const labels = sortedKeys.map((d) => formatDate(d));

  const datasets = [
    {
      label: "Input",
      data: sortedKeys.map((date) => tokensData[date]?.input_tokens || 0),
      backgroundColor: tokenColors.input,
      borderColor: tokenColors.input,
      borderWidth: 0,
      borderRadius: 0,
    },
    {
      label: "Output",
      data: sortedKeys.map((date) => tokensData[date]?.output_tokens || 0),
      backgroundColor: tokenColors.output,
      borderColor: tokenColors.output,
      borderWidth: 0,
      borderRadius: 0,
    },
    {
      label: "Cache read",
      data: sortedKeys.map((date) => tokensData[date]?.cache_read_tokens || 0),
      backgroundColor: tokenColors.cache_read,
      borderColor: tokenColors.cache_read,
      borderWidth: 0,
      borderRadius: 0,
    },
    {
      label: "Cache write",
      data: sortedKeys.map((date) => tokensData[date]?.cache_write_tokens || 0),
      backgroundColor: tokenColors.cache_write,
      borderColor: tokenColors.cache_write,
      borderWidth: 0,
      borderRadius: {
        topLeft: BAR_TOP_RADIUS,
        topRight: BAR_TOP_RADIUS,
        bottomLeft: 0,
        bottomRight: 0,
      },
    },
  ];

  return {
    labels,
    datasets,
  };
});

const chartOptions = computed(() => {
  if (props.options) return props.options;

  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    datasets: {
      bar: {
        maxBarThickness: 40, // más fino
        categoryPercentage: 0.9, // barras más anchas en su slot
        barPercentage: 0.9,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        align: "center" as const,
        labels: {
          font: {
            family: chartFontFamily,
            size: 13,
            weight: "500",
          },
          color: colors.value.textSecondary,
          padding: 12,
          boxWidth: LEGEND_BOX_PX,
          boxHeight: LEGEND_BOX_PX,
          usePointStyle: false,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: colors.value.tooltipBg,
        titleColor: colors.value.tooltipText,
        bodyColor: colors.value.tooltipText,
        borderColor: isDark.value
          ? "rgba(198, 125, 255, 0.2)"
          : "rgba(148, 163, 184, 0.2)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          family: chartFontFamily,
          size: 13,
          weight: "600",
        },
        bodyFont: {
          family: chartFontFamily,
          size: 12,
          weight: "500",
        },
        callbacks: {
          label: function (context: {
            dataset: { label?: string };
            parsed: { y: number | null };
          }) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += useNumberFormat(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        border: { display: false },
        grid: { display: false },
        ticks: {
          font: { family: chartFontFamily, size: 12, weight: "500" },
          color: colors.value.textSecondary,
          padding: 8,
          maxTicksLimit: 8,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        border: { display: false },
        grid: {
          color: colors.value.gridLines,
          lineWidth: 1,
          drawTicks: false,
          borderDash: [4, 4],
        },
        ticks: {
          font: { family: chartFontFamily, size: 12, weight: "500" },
          color: colors.value.textSecondary,
          padding: 8,
          callback: function (value: string | number) {
            return formatCompactTokens(Number(value));
          },
        },
      },
    },
  };
});

defineExpose({ isDark });
</script>

<style scoped>
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
  margin-bottom: 24px;
}

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
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .chart-section {
    padding-right: 8px;
  }
}
</style>
