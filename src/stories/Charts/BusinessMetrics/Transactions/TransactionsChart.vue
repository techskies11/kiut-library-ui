<template>
  <ChartMetricContainer
    class="w-full min-h-0 self-start"
    :title="chartTitle"
    :subtitle="props.subtitle"
    :collapsible="false"
    :loading="loading"
  >
    <template #headerAside>
      <div class="stage-select flex items-center justify-end gap-3">
        <div class="w-52">
          <Select
            :model-value="selectedBreakdown"
            :options="resolvedBreakdownOptions"
            @update:model-value="onBreakdownChange"
          />
        </div>
        <FooterExport
          v-if="enableExport && !loading"
          variant="inline"
          :loading="exportLoading"
          @export="handleExport"
        />
      </div>
    </template>

    <div
      class="flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
      :class="props.loading ? 'flex-1' : 'w-full shrink-0'"
    >
      <Transition name="bm-fade" mode="out-in">
        <div
          v-if="props.loading"
          key="loading"
          class="bm-status shrink-0"
          aria-busy="true"
          aria-label="Loading chart"
        >
          <div class="flex-1 bm-skeleton-blink" aria-hidden="true"></div>
        </div>

        <div v-else key="content" class="w-full shrink-0 flex min-h-0 flex-col">
          <section
            v-if="
              dataChart.labels &&
              dataChart.labels.length &&
              dataChart.datasets.length
            "
            class="flex w-full shrink-0 flex-col gap-4 sm:gap-6"
          >
            <!-- Chart area -->
            <div
              class="chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden"
            >
              <ChartBar
                v-if="isStackedBar"
                :data="dataChart"
                :options="barChartOptions"
                :theme="theme"
              />
              <LineChart
                v-else
                :data="dataChart"
                :options="lineChartOptions"
                :theme="theme"
              />
            </div>

            <!-- CardInfo breakdown cards (hidden in "all" mode) -->
            <div
              v-if="topCards.length"
              class="grid w-full gap-3 md:gap-4"
              :style="cardInfoGridStyle"
            >
              <CardInfo
                v-for="item in topCards"
                :key="`card-${item.key}`"
                class="min-w-0"
                :color="item.color"
                :title="item.label"
                :value="item.amount"
                :subvalue="`${item.percentage.toFixed(1)}%`"
              />
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
      </Transition>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, ref, toRef, watch } from "vue";
import moment from "moment";
import LineChart from "../../Line/ChartLine.vue";
import ChartBar from "../../Bar/ChartBar.vue";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";
import CardInfo from "../../Utils/CardInfo/CardInfo.vue";
import {
  useThemeDetection,
  type Theme,
} from "../../../../composables/useThemeDetection";
import Select, {
  type KiutSelectOption,
  type KiutSelectValue,
} from "../../../../components/Inputs/Select.vue";
import { normalizeAgentDisplayName } from "../../../../utils/agentDisplayName";
import { FooterExport, type ExportFormat } from "../../Utils/FooterExport";

// ── Types ──────────────────────────────────────────────────────────────────

interface TransactionBreakdownItem {
  key: string;
  count: number;
  percentage: number;
}

interface DailySalesByChannelBreakdown {
  date: string;
  channels: Record<string, number>;
}

interface DailyTransactionsBreakdown {
  date: string;
  count: number;
  breakdown: Record<string, number>;
}

interface TransactionsData {
  airline_name: string;
  start_date: string;
  end_date: string;
  total_sell_success: number;
  sales_by_channel_by_day: DailySalesByChannelBreakdown[];
  breakdown: TransactionBreakdownItem[];
  transactions_by_day: DailyTransactionsBreakdown[];
}

// ── Props / Emits ──────────────────────────────────────────────────────────

const DEFAULT_BREAKDOWN_OPTIONS: KiutSelectOption<KiutSelectValue>[] = [
  { value: "all", label: "All" },
  { value: "payment_method", label: "Payment Method" },
  { value: "agent_type", label: "Agent" },
  { value: "channel", label: "Channel" },
  { value: "channel_and_agent", label: "Channel & Agent" },
  { value: "agent_and_product", label: "Agent & Product" },
];

const DEFAULT_TITLES: Record<string, string> = {
  all: "Transactions",
  payment_method: "Transactions by Payment Method",
  agent_type: "Transactions by Agent",
  channel: "Transactions by Channel",
  channel_and_agent: "Transactions by Channel & Agent",
  agent_and_product: "Transactions by Agent & Product",
};

const props = withDefaults(
  defineProps<{
    loading?: boolean;
    data?: TransactionsData | null;
    breakdownBy?: string;
    breakdownOptions?: KiutSelectOption<KiutSelectValue>[];
    titles?: Record<string, string>;
    subtitle?: string;
    emptyTitle?: string;
    emptyDescription?: string;
    theme?: Theme;
    enableExport?: boolean;
    exportLoading?: boolean;
  }>(),
  {
    loading: false,
    data: null,
    breakdownBy: "all",
    breakdownOptions: () => DEFAULT_BREAKDOWN_OPTIONS,
    titles: () => DEFAULT_TITLES,
    subtitle: "Number of transactions generated by agents",
    emptyTitle: "No transaction data available",
    emptyDescription:
      "No transactions found for the selected period. Try adjusting the date range.",
    theme: undefined,
    enableExport: false,
    exportLoading: false,
  },
);

const emit = defineEmits<{
  changeBreakdown: [value: string];
  export: [format: ExportFormat];
}>();

// ── Internal state ─────────────────────────────────────────────────────────

const theme = toRef(props, "theme");
const { isDark, colors } = useThemeDetection(theme);

const selectedBreakdown = ref(props.breakdownBy);

const resolvedBreakdownOptions = computed(
  () => props.breakdownOptions ?? DEFAULT_BREAKDOWN_OPTIONS,
);

const chartTitle = computed(
  () => props.titles[selectedBreakdown.value] ?? props.titles.all ?? DEFAULT_TITLES.all,
);

const isStackedBar = computed(
  () => selectedBreakdown.value === "payment_method",
);

const handleExport = (format: ExportFormat): void => {
  emit("export", format);
};

// ── Color palette ──────────────────────────────────────────────────────────

const palette = [
  "#8b5cf6",
  "#34d399",
  "#f59e0b",
  "#60a5fa",
  "#f472b6",
  "#fb923c",
  "#4ade80",
  "#e879f9",
];

const getColor = (index: number): string => palette[index % palette.length];

// ── Formatting helpers ─────────────────────────────────────────────────────

const formatCompact = (value: number): string => {
  if (!value) return "0";
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return (value / 1_000_000).toFixed(2) + "M";
  if (abs >= 100_000) return (value / 1_000).toFixed(1) + "K";
  return Math.round(value).toLocaleString();
};

const formatKey = (key: string): string => {
  if (!key || key === "unknown") return "Unknown";
  return normalizeAgentDisplayName(key)
    .split(/[_|]/)
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ""))
    .join(" ");
};

// ── Chart data ─────────────────────────────────────────────────────────────

const dataChart = ref<{ labels: string[]; datasets: any[] }>({
  labels: [],
  datasets: [],
});

const topCards = ref<
  Array<{
    key: string;
    label: string;
    amount: string;
    percentage: number;
    color: string;
  }>
>([]);

const cardInfoGridStyle = computed(() => {
  const cols = Math.min(topCards.value.length, 5);
  if (cols <= 0) return undefined;
  return { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` };
});

const sumChannelCounts = (channels: Record<string, number>): number =>
  Object.values(channels ?? {}).reduce(
    (acc, value) => acc + Number(value ?? 0),
    0,
  );

const processChartData = (data: TransactionsData | null): void => {
  const breakdownItems = data?.breakdown ?? [];

  if (selectedBreakdown.value === "all") {
    const days = data?.sales_by_channel_by_day ?? [];
    if (!days.length) {
      dataChart.value = { labels: [], datasets: [] };
      topCards.value = [];
      return;
    }

    const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
    dataChart.value = {
      labels: sorted.map((d) => moment(d.date).format("MMM DD")),
      datasets: [
        {
          label: "Transactions",
          data: sorted.map((d) => sumChannelCounts(d.channels)),
          borderColor: palette[0],
          backgroundColor: "transparent",
          fill: false,
          tension: 0.35,
        },
      ],
    };
    topCards.value = [];
    return;
  }

  const days = data?.transactions_by_day ?? [];
  if (!days.length) {
    dataChart.value = { labels: [], datasets: [] };
    topCards.value = [];
    return;
  }

  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const labels = sorted.map((d) => moment(d.date).format("MMM DD"));

  // Collect unique dimension keys ordered by aggregate total (top 7 max)
  const orderedKeys = breakdownItems.slice(0, 7).map((b) => b.key);

  const datasets = orderedKeys.map((key, idx) => {
    const color = getColor(idx);
    const seriesData = sorted.map((d) => Number((d.breakdown ?? {})[key] ?? 0));

    if (isStackedBar.value) {
      return {
        label: formatKey(key),
        data: seriesData,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
        borderRadius: 3,
      };
    }
    return {
      label: formatKey(key),
      data: seriesData,
      borderColor: color,
      backgroundColor: "transparent",
      fill: false,
      tension: 0.35,
    };
  });

  dataChart.value = { labels, datasets };

  // Breakdown cards (top 5)
  topCards.value = breakdownItems.slice(0, 5).map((item, idx) => ({
    key: item.key,
    label: formatKey(item.key),
    amount: formatCompact(item.count),
    percentage: Number(item.percentage ?? 0),
    color: getColor(idx),
  }));
};

// ── Chart options ──────────────────────────────────────────────────────────

const yTicks = computed(() => ({
  callback: (value: number | string) => formatCompact(Number(value)),
  color: colors.value.textSecondary,
  padding: 8,
}));

const xAxis = computed(() => ({
  border: { display: false },
  grid: { color: colors.value.gridLines, lineWidth: 1, drawTicks: false },
  ticks: { color: colors.value.textSecondary, padding: 8 },
}));

const yAxis = computed(() => ({
  beginAtZero: true,
  border: { display: false },
  grid: { color: colors.value.gridLines, lineWidth: 1, drawTicks: false },
  ticks: yTicks.value,
}));

const lineChartOptions = computed(() => ({
  scales: {
    x: xAxis.value,
    y: yAxis.value,
  },
}));

const barChartOptions = computed(() => ({
  scales: {
    x: { ...xAxis.value, stacked: true },
    y: { ...yAxis.value, stacked: true },
  },
}));

// ── Watchers ───────────────────────────────────────────────────────────────

watch(
  () => props.data,
  (newData) => processChartData(newData ?? null),
  { deep: true, immediate: true },
);

watch(
  () => props.breakdownBy,
  (newValue) => {
    selectedBreakdown.value = newValue;
    processChartData(props.data ?? null);
  },
);

const onBreakdownChange = (value: KiutSelectValue): void => {
  selectedBreakdown.value = String(value);
  emit("changeBreakdown", selectedBreakdown.value);
};

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
