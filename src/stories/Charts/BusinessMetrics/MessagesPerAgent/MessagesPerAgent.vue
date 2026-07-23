<template>
  <ChartMetricContainer
    class="w-full min-h-0 self-start"
    :title="props.title"
    :subtitle="props.subtitle"
    :collapsible="false"
    :loading="props.loading"
  >
    <template #headerAside>
      <div v-if="props.breakdownOptions.length" class="w-52">
        <Select
          :model-value="props.breakdownBy"
          :options="props.breakdownOptions"
          @update:model-value="handleBreakdownChange"
        />
      </div>
    </template>
    <template #headerExport>
      <FooterExport
        v-if="enableExport && !props.loading"
        variant="inline"
        :loading="exportLoading"
        @export="handleExport"
      />
    </template>
    <div
      class="flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
    >
      <div class="w-full shrink-0 flex min-h-0 flex-col">
        <section
          v-if="dataChart.labels && dataChart.labels.length"
          class="flex w-full shrink-0 flex-col gap-3"
        >
          <div
            class="chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden"
          >
            <LineChart :data="dataChart" :options="options" :theme="theme" />
          </div>
          <div
            v-if="props.showSummaryCards && agentTotalsTop4.length"
            class="grid w-full gap-3 md:gap-4"
            :style="cardInfoGridStyle"
          >
            <CardInfo
              v-for="agent in agentTotalsTop4"
              :key="agent.name"
              class="min-w-0"
              :color="agent.color"
              :title="agent.label"
              :value="`${agent.percentage}%`"
              :subvalue="`${useNumberFormat(agent.total)} ${props.unit}`"
            />
          </div>
        </section>

        <section
          v-else-if="props.showSummaryCards && agentTotals.length"
          class="flex w-full shrink-0 flex-col gap-4 sm:gap-6"
        >
          <div
            class="grid w-full gap-3 md:gap-4"
            :style="cardInfoGridStyle"
          >
            <CardInfo
              v-for="agent in agentTotalsTop4"
              :key="agent.name"
              class="min-w-0"
              :color="agent.color"
              :title="agent.label"
              :value="`${agent.percentage}%`"
              :subvalue="`${useNumberFormat(agent.total)} ${props.unit}`"
            />
          </div>
        </section>

        <section
          v-if="!agentTotals.length"
          class="flex min-h-[280px] flex-1 items-center justify-center"
        >
          <div class="max-w-[360px] px-4 text-center">
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
              {{ props.emptyTitle }}
            </p>
            <p
              class="m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]"
            >
              {{ props.emptyDescription }}
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
import { ChartBarIcon } from "@heroicons/vue/24/outline";
import LineChart from "../../Line/ChartLine.vue";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";
import CardInfo from "../../Utils/CardInfo/CardInfo.vue";
import { FooterExport, type ExportFormat } from "../../Utils/FooterExport";
import {
  useThemeDetection,
  type Theme,
} from "../../../../composables/useThemeDetection";
import { useNumberFormat } from "../../../../plugins/numberFormat";
import Select, { type KiutSelectValue } from "../../../../components/Inputs/Select.vue";
import { normalizeAgentDisplayName } from "../../../../utils/agentDisplayName";

const loaderBarHeights = [30, 50, 70, 50, 40];
const loaderDelays = [
  "",
  "delay-100",
  "delay-200",
  "delay-300",
  "delay-[400ms]",
];

interface AgentsByDay {
  [date: string]: {
    [category: string]: number;
  };
}

interface AgentInteractionsData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  agents_by_day?: AgentsByDay;
  total_unique_agents?: number;
}

interface BreakdownOption {
  value: string;
  label: string;
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
  unassigned: "#64748B",
};
const fallbackColors = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"];

const props = withDefaults(
  defineProps<{
    data?: AgentInteractionsData;
    loading?: boolean;
    options?: Record<string, any>;
    theme?: Theme;
    enableExport?: boolean;
    exportLoading?: boolean;
    title?: string;
    subtitle?: string;
    unit?: string;
    totalConversations?: number;
    emptyTitle?: string;
    emptyDescription?: string;
    breakdownBy?: string;
    breakdownOptions?: BreakdownOption[];
    showSummaryCards?: boolean;
    maxSeries?: number;
  }>(),
  {
    data: () => ({}),
    loading: false,
    options: undefined,
    theme: undefined,
    enableExport: false,
    exportLoading: false,
    title: "Interactions by Agent",
    subtitle: "Responses sent by AI agents",
    unit: "msgs",
    totalConversations: undefined,
    emptyTitle: "No agent interactions data",
    emptyDescription:
      "Try adjusting the date range or check your filters to see agent interaction trends.",
    breakdownBy: "",
    breakdownOptions: () => [],
    showSummaryCards: true,
    maxSeries: undefined,
  },
);

const emit = defineEmits<{
  export: [format: ExportFormat];
  changeBreakdown: [value: string];
}>();

const handleExport = (format: ExportFormat) => {
  emit("export", format);
};

const handleBreakdownChange = (value: KiutSelectValue): void => {
  emit("changeBreakdown", String(value));
};

const getSeriesColor = (value: string): string => {
  const normalized = value.toLowerCase();
  const configuredColor = colorMap[normalized] || colorMap[value];
  if (configuredColor) return configuredColor;

  const hash = Array.from(normalized).reduce(
    (currentHash, character) => ((currentHash << 5) - currentHash + character.charCodeAt(0)) | 0,
    0,
  );
  return fallbackColors[Math.abs(hash) % fallbackColors.length];
};

const theme = toRef(props, "theme");
const { isDark } = useThemeDetection(theme);

const formatAgentLabel = (value: string): string => {
  const normalized = normalizeAgentDisplayName(value).replace(/_/g, " ");
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

const categoryTotals = computed(() => {
  const totalsMap: Record<string, number> = {};

  for (const dayData of Object.values(props.data?.agents_by_day || {})) {
    for (const [category, count] of Object.entries(dayData)) {
      totalsMap[category] = (totalsMap[category] || 0) + count;
    }
  }

  return totalsMap;
});

const dataChart = computed(() => {
  const daysData = props.data?.agents_by_day || {};
  const sortedLabels = Object.keys(daysData).sort();

  if (sortedLabels.length === 0) {
    return { labels: [], datasets: [] };
  }

  const categories = Object.keys(categoryTotals.value)
    .sort(
      (left, right) =>
        categoryTotals.value[right] - categoryTotals.value[left] || left.localeCompare(right),
    )
    .slice(0, props.maxSeries);

  const datasets = categories.map((category) => {
    return {
      label: formatAgentLabel(category),
      data: sortedLabels.map((date) => daysData[date]?.[category] || 0),
      borderColor: getSeriesColor(category),
    };
  });

  return {
    labels: sortedLabels.map((date) => moment(date).format("MMM DD")),
    datasets,
  };
});

const agentTotals = computed(() => {
  const groupedTotal = Object.values(categoryTotals.value).reduce((sum, v) => sum + v, 0);
  const grandTotal = props.totalConversations ?? groupedTotal;
  if (grandTotal === 0) return [];

  return Object.entries(categoryTotals.value)
    .sort(([, a], [, b]) => b - a)
    .map(([name, total]) => {
      return {
        name,
        label: formatAgentLabel(name),
        total,
        percentage: ((total / grandTotal) * 100).toFixed(1),
        color: getSeriesColor(name),
      };
    });
});

const agentTotalsTop4 = computed(() => agentTotals.value.slice(0, 4));

const cardInfoGridStyle = computed(() => {
  const cols = agentTotalsTop4.value.length;
  if (cols <= 0) return undefined;
  return { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` };
});

defineExpose({ isDark });
</script>

<style scoped>
/* Coincide con ChartLine: 220px trazado + 10px banda de indicadores/leyenda (230px) */
.chart-line-area {
  position: relative;
  min-height: 0;
}
</style>
