<template>
  <ChartMetricContainer
    class="w-full min-h-0 self-start"
    title="Human escalations"
    subtitle="% of conversations transferred to human agents"
    :collapsible="false"
    :loading="loading"
  >
    <template #headerAside>
      <div class="flex justify-end">
        <select
          v-model="selectedBreakdown"
          class="rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]"
          @change="emitChangeBreakdown"
        >
          <option value="all">All</option>
          <option value="agent">By Agent</option>
          <option value="channel">By Channel</option>
          <option value="agent_channel">By Agent/Channel</option>
        </select>
      </div>
    </template>
    <div
      class="flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
      :class="props.loading ? 'flex-1' : 'w-full shrink-0'"
    >
      <div
        v-if="props.loading"
        class="bm-status shrink-0"
        aria-busy="true"
        aria-label="Loading chart"
      >
        <div class="flex-1 bm-skeleton-blink" aria-hidden="true"></div>
      </div>

      <template v-else>
        <section
          v-if="
            dataChart.labels &&
            dataChart.labels.length &&
            dataChart.datasets.length
          "
          class="flex w-full shrink-0 flex-col gap-4 sm:gap-6"
        >
          <div
            class="chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden"
          >
            <LineChart :data="dataChart" :theme="theme" />
          </div>

          <div class="flex flex-wrap gap-4">
            <div
              v-for="item in legendItems"
              :key="`legend-${item.key}`"
              class="inline-flex items-center gap-2 text-sm"
            >
              <span
                class="inline-block h-2.5 w-2.5 rounded-full"
                :style="{ backgroundColor: item.color }"
              ></span>
              <span class="text-[var(--kiut-text-primary,#111827)]">{{
                item.label
              }}</span>
            </div>
          </div>

          <div
            class="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
          >
            <div
              v-for="item in topCards"
              :key="`card-${item.key}`"
              class="rounded-xl border border-[var(--kiut-border-light,#e5e7eb)] p-3"
            >
              <p
                class="flex items-center gap-2 truncate text-sm font-medium text-[var(--kiut-text-secondary,#6b7280)]"
              >
                <span
                  class="inline-block h-2.5 w-2.5 rounded-full"
                  :style="{ backgroundColor: item.color }"
                ></span>
                <span class="truncate">{{ item.label }}</span>
              </p>
              <p
                class="mt-1 text-2xl font-bold text-[var(--kiut-text-primary,#111827)]"
              >
                {{ item.percentage.toFixed(1) }}%
              </p>
            </div>
          </div>
        </section>

        <section
          v-else
          class="flex min-h-[280px] flex-1 items-center justify-center"
        >
          <div class="max-w-[360px] px-4 text-center">
            <p
              class="mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]"
            >
              No human escalations data available
            </p>
            <p
              class="m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]"
            >
              No escalation data found for the selected period. Try adjusting
              the date range.
            </p>
          </div>
        </section>
      </template>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, ref, toRef, watch } from "vue";
import moment from "moment";
import LineChart from "../../Line/ChartLine.vue";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";
import {
  useThemeDetection,
  type Theme,
} from "../../../../composables/useThemeDetection";

interface HumanEscalationBreakdownItem {
  key: string;
  label: string;
  total_escalated_conversations: number;
  percentage: number;
}

interface HumanEscalationBreakdownDayItem {
  key: string;
  label: string;
  escalated_conversations: number;
  percentage: number;
}

interface HumanEscalationGroupedDay {
  date: string;
  total_escalated_conversations: number;
  items: HumanEscalationBreakdownDayItem[];
}

interface HumanEscalationsData {
  total_conversations: number;
  total_escalated_conversations: number;
  escalation_rate_percentage: number;
  breakdown_by?: string;
  breakdown_items?: HumanEscalationBreakdownItem[];
  breakdown_by_day?: HumanEscalationGroupedDay[];
  escalations_by_day: Array<{
    date: string;
    total_conversations: number;
    total_escalated_conversations: number;
    escalation_rate_percentage: number;
  }>;
}

const props = withDefaults(
  defineProps<{
    loading?: boolean;
    data?: HumanEscalationsData | null;
    breakdownBy?: string;
    theme?: Theme;
  }>(),
  {
    loading: false,
    data: null,
    breakdownBy: "all",
    theme: undefined,
  },
);

const emit = defineEmits<{
  changeBreakdown: [value: string];
}>();

const loaderBarHeights = [30, 50, 70, 50, 40];
const loaderDelays = [
  "",
  "delay-100",
  "delay-200",
  "delay-300",
  "delay-[400ms]",
];
const theme = toRef(props, "theme");
const { isDark } = useThemeDetection(theme);
const selectedBreakdown = ref(props.breakdownBy);

const metricsData = computed<HumanEscalationsData>(() => {
  return (
    props.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: "all",
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: [],
    }
  );
});

const dataChart = ref<{ labels: string[]; datasets: any[] }>({
  labels: [],
  datasets: [],
});
const topCards = ref<
  Array<{ key: string; label: string; percentage: number; color: string }>
>([]);
const legendItems = ref<Array<{ key: string; label: string; color: string }>>(
  [],
);
const palette = [
  "#3b82f6",
  "#f59e0b",
  "#06b6d4",
  "#8b5cf6",
  "#22c55e",
  "#ef4444",
  "#14b8a6",
];

const getColor = (index: number): string => palette[index % palette.length];

const emitChangeBreakdown = (): void => {
  emit("changeBreakdown", selectedBreakdown.value);
};

const formatSeriesLabel = (label: string): string => {
  if (!label) return "";
  const normalizedLabel = label.replace(/_/g, " ").trim();
  const withoutStateSuffix = normalizedLabel.replace(/\s+state$/i, "").trim();
  if (!withoutStateSuffix) return "";
  return (
    withoutStateSuffix.charAt(0).toUpperCase() + withoutStateSuffix.slice(1)
  );
};

const processChartData = (data: HumanEscalationsData | null): void => {
  if (selectedBreakdown.value === "all") {
    const daily = data?.escalations_by_day ?? [];
    if (!daily.length) {
      dataChart.value = { labels: [], datasets: [] };
      topCards.value = [];
      legendItems.value = [];
      return;
    }

    const sorted = [...daily].sort((a, b) => a.date.localeCompare(b.date));
    dataChart.value = {
      labels: sorted.map((item) => moment(item.date).format("MMM DD")),
      datasets: [
        {
          label: "All",
          data: sorted.map((item) =>
            Number(item.escalation_rate_percentage || 0),
          ),
          borderColor: "#8b5cf6",
          backgroundColor: "transparent",
          fill: false,
          tension: 0.35,
        },
      ],
    };
    topCards.value = [];
    legendItems.value = [];
    return;
  }

  const breakdownDays = data?.breakdown_by_day ?? [];
  const breakdownItems = data?.breakdown_items ?? [];

  if (!breakdownDays.length) {
    dataChart.value = { labels: [], datasets: [] };
    topCards.value = [];
    legendItems.value = [];
    return;
  }

  const sortedDays = [...breakdownDays].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  const seriesKeys = breakdownItems.slice(0, 5).map((item) => item.key);
  const labels = sortedDays.map((day) => moment(day.date).format("MMM DD"));

  const datasets = seriesKeys.map((key, index) => {
    const item = breakdownItems.find((entry) => entry.key === key);
    return {
      label: formatSeriesLabel(item?.label || key),
      data: sortedDays.map((day) => {
        const found = day.items.find((entry) => entry.key === key);
        return Number(found?.percentage || 0);
      }),
      borderColor: getColor(index),
      backgroundColor: "transparent",
      fill: false,
      tension: 0.35,
    };
  });

  dataChart.value = {
    labels,
    datasets,
  };

  topCards.value = breakdownItems.slice(0, 5).map((item, index) => ({
    key: item.key,
    label: formatSeriesLabel(item.label),
    percentage: Number(item.percentage || 0),
    color: getColor(index),
  }));

  legendItems.value = breakdownItems.slice(0, 5).map((item, index) => ({
    key: item.key,
    label: formatSeriesLabel(item.label),
    color: getColor(index),
  }));
};

watch(
  () => props.data,
  (newData) => {
    processChartData(newData ?? null);
  },
  { deep: true, immediate: true },
);

watch(
  () => props.breakdownBy,
  (newValue) => {
    selectedBreakdown.value = newValue;
    processChartData(metricsData.value);
  },
);

defineExpose({ isDark });
</script>

<style scoped>
.chart-line-area {
  position: relative;
  min-height: 0;
}
</style>
<style>
@import "../bm-shared.css";
</style>