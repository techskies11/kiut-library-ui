<template>
  <ChartMetricContainer
    title="Agents Total Messages per Day"
    subtitle="Daily agent interactions (stacked)"
    :collapsible="false"
    :loading="loading"
  >
    <template #headerExport>
      <FooterExport
        v-if="enableExport && !loading"
        variant="inline"
        :loading="exportLoading"
        @export="handleExport"
      />
    </template>
    <div
      class="flex w-full shrink-0 flex-col min-h-0 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
    >
      <Transition name="bm-fade" mode="out-in">
        <div
          v-if="loading"
          key="loading"
          class="flex h-[320px] flex-col gap-3 px-4 pb-4"
          aria-busy="true"
          aria-label="Loading chart"
          :class="['sk-root', { 'sk-root--dark': isDark }]"
        >
          <div
            class="flex-1 skeleton-shimmer"
            style="border-radius: 10px"
            aria-hidden="true"
          />
        </div>

        <section
          v-else-if="chartData.labels && chartData.labels.length"
          key="chart"
          class="flex w-full shrink-0 flex-col gap-4 sm:gap-6"
        >
          <div class="w-full shrink-0 sm:pr-2">
            <BarChart
              :data="chartData"
              :stacked="true"
              :theme="theme"
              :options="options"
            />
          </div>
        </section>

        <section
          v-else
          key="empty"
          class="flex min-h-[280px] w-full items-center justify-center"
        >
          <div class="max-w-[360px] text-center">
            <div
              class="mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]"
            >
              <ChartBarIcon
                class="h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]"
              />
            </div>
            <p
              class="mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]"
            >
              No agents data per day
            </p>
            <p
              class="m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]"
            >
              Try adjusting the date range or check your filters to see daily
              agent interactions.
            </p>
          </div>
        </section>
      </Transition>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from "vue";
import BarChart from "../../Bar/ChartBar.vue";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";
import { ChartBarIcon } from "@heroicons/vue/24/outline";
import { FooterExport, type ExportFormat } from "../../Utils/FooterExport";
import {
  useThemeDetection,
  type Theme,
} from "../../../../composables/useThemeDetection";

interface AgentsByDay {
  [date: string]: {
    [category: string]: number;
  };
}

interface AgentsPerDayData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  agents_by_day?: AgentsByDay;
  total_unique_agents?: number;
}

const colorMap: Record<string, string> = {
  checkin: "#3B82F6",
  faq: "#EF4444",
  disruption_manager: "#F59E0B",
  booking_manager: "#a78bfa",
  triage: "#10B981",
  seller: "#06B6D4",
  human: "#F472B6",
  agency: "#6366F1",
  loyalty: "#EAB308",
};

const props = withDefaults(
  defineProps<{
    data?: AgentsPerDayData;
    loading?: boolean;
    options?: Record<string, any>;
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

const emit = defineEmits<{
  export: [format: ExportFormat];
}>();

const handleExport = (format: ExportFormat) => {
  emit("export", format);
};

const loaderBarHeights = [30, 50, 70, 50, 40];
const loaderDelays = [
  "",
  "delay-100",
  "delay-200",
  "delay-300",
  "delay-[400ms]",
];

const theme = toRef(props, "theme");
const options = toRef(props, "options");

const { isDark } = useThemeDetection(theme);

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}-${month}`;
};

const chartData = computed(() => {
  const daysData = props.data?.agents_by_day || {};
  const sortedKeys = Object.keys(daysData).sort();

  if (sortedKeys.length === 0) {
    return { labels: [], datasets: [] };
  }

  const labels = sortedKeys.map((d) => formatDate(d));

  const categoriesSet = new Set<string>();
  for (const dayData of Object.values(daysData)) {
    for (const category of Object.keys(dayData)) {
      categoriesSet.add(category);
    }
  }
  const categories = Array.from(categoriesSet);

  const borderFromBg = (color: string): string => color;

  const datasets = categories.map((category) => ({
    label: category,
    data: sortedKeys.map((date) => daysData[date]?.[category] || 0),
    backgroundColor: `${colorMap[category] || "#94a3b8"}80`,
    borderColor: borderFromBg(colorMap[category] || "#94a3b8"),
    borderWidth: 1,
  }));

  return {
    labels,
    datasets,
  };
});

defineExpose({ isDark });
</script>
<style scoped>
@import "../bm-shared.css";

.skeleton-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  text-align: left;
}

.skeleton-shimmer {
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    rgba(93, 75, 147, 0.06) 25%,
    rgba(93, 75, 147, 0.12) 50%,
    rgba(93, 75, 147, 0.06) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.8s ease-in-out infinite;
}

.sk-root--dark .skeleton-shimmer {
  background: linear-gradient(
    90deg,
    rgba(198, 125, 255, 0.06) 25%,
    rgba(198, 125, 255, 0.14) 50%,
    rgba(198, 125, 255, 0.06) 75%
  );
  background-size: 200% 100%;
}

.skeleton-title {
  width: 20%;
  height: 20px;
  border-radius: 999px;
}

.skeleton-value {
  width: 100%;
  height: 100%;
}

.skeleton-label {
  width: 38%;
  height: 15px;
}
</style>
