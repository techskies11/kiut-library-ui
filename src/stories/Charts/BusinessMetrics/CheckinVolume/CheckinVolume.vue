<template>
  <component
    :is="embedded ? 'div' : ChartMetricContainer"
    :class="embedded ? 'w-full min-h-0' : 'w-full min-h-0 self-start'"
    v-bind="containerProps"
  >
    <template v-if="!embedded" #headerExport>
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
      <section
        v-if="dataChart.labels.length"
        class="flex w-full shrink-0 flex-col"
      >
        <div
          class="chart-line-area flex h-[280px] w-full min-w-0 shrink-0 flex-col overflow-hidden"
        >
          <LineChart
            :data="dataChart"
            :options="chartOptions"
            :theme="theme"
            area-gradient
          />
        </div>
      </section>

      <section
        v-else
        class="flex min-h-[280px] flex-1 items-center justify-center"
      >
        <div class="max-w-[360px] px-4 text-center">
          <div
            class="mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(59,130,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(59,130,246,0.15))]"
          >
            <svg
              class="h-10 w-10 text-[var(--kiut-primary,#3b82f6)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.75"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
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
  </component>
</template>

<script setup lang="ts">
import { computed, toRef } from "vue";
import moment from "moment";
import LineChart from "../../Line/ChartLine.vue";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";
import { FooterExport, type ExportFormat } from "../../Utils/FooterExport";
import {
  useThemeDetection,
  type Theme,
} from "../../../../composables/useThemeDetection";
import { formatSankeyLinkLabel } from "../../Sankey/sankeyFormatters";
import {
  computeCheckinVolumeDays,
  type CheckinData,
  type CheckinVolumeDay,
  type FailedData,
} from "../CheckinMetrics/checkinFunnelMetrics";

export type { CheckinVolumeDay };

export interface CheckinVolumeData {
  by_day: CheckinVolumeDay[];
}

const SERIES = [
  { key: "initiated" as const, label: "Initiated", color: "#3B82F6" },
  { key: "success" as const, label: "Success", color: "#22C55E" },
  { key: "abandoned" as const, label: "Abandoned", color: "#F97316" },
  { key: "errors" as const, label: "Errors", color: "#EF4444" },
];

function formatChartDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  if (year && month && day) {
    return moment([year, month - 1, day]).format("MMM D");
  }
  return moment(dateStr).format("MMM D");
}

function volumeDaysFromCheckin(
  checkinData?: CheckinData | null,
  failedData?: FailedData | null,
): CheckinVolumeDay[] {
  return computeCheckinVolumeDays(checkinData, failedData);
}

const props = withDefaults(
  defineProps<{
    loading?: boolean;
    /** Override plano (stories). Si hay `checkinData`, se ignora. */
    data?: CheckinVolumeData | null;
    /** Mismos props que CheckinMetrics. */
    checkinData?: CheckinData | null;
    failedData?: FailedData | null;
    theme?: Theme;
    enableExport?: boolean;
    exportLoading?: boolean;
    title?: string;
    subtitle?: string;
    emptyTitle?: string;
    emptyDescription?: string;
    /** Skip ChartMetricContainer chrome when nested in a parent with a view select. */
    embedded?: boolean;
  }>(),
  {
    loading: false,
    data: null,
    checkinData: null,
    failedData: null,
    theme: undefined,
    enableExport: false,
    exportLoading: false,
    embedded: false,
    title: "Check-in Volume Over Time",
    subtitle: "Daily check-in volume by outcome, with share over initiated",
    emptyTitle: "No check-in volume data",
    emptyDescription: "No daily check-in outcomes found for the selected period. Try adjusting the date range.",
  },
);

const emit = defineEmits<{
  export: [format: ExportFormat];
}>();

const handleExport = (format: ExportFormat) => {
  emit("export", format);
};

const theme = toRef(props, "theme");
const { isDark } = useThemeDetection(theme);

const containerProps = computed(() =>
  props.embedded
    ? {}
    : {
        title: props.title,
        subtitle: props.subtitle,
        collapsible: false,
        loading: props.loading,
      },
);

const volumeDays = computed((): CheckinVolumeDay[] => {
  if (props.checkinData?.record_locator_by_day?.length) {
    return volumeDaysFromCheckin(props.checkinData, props.failedData);
  }
  return props.data?.by_day ?? [];
});

const dataChart = computed(() => {
  const days = volumeDays.value;
  return {
    labels: days.map((item) => formatChartDate(item.date)),
    datasets: SERIES.map((series) => ({
      label: series.label,
      data: days.map((item) => item[series.key] || 0),
      borderColor: series.color,
      tension: 0.4,
    })),
  };
});

const initiatedByIndex = computed(() =>
  volumeDays.value.map((day) => day.initiated || 0),
);

const chartOptions = computed(() => ({
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: {
          dataset: { label?: string };
          parsed: { y: number | null };
          dataIndex: number;
        }) => {
          const label = context.dataset.label || "";
          const value = context.parsed.y ?? 0;
          const initiated = initiatedByIndex.value[context.dataIndex] ?? 0;
          return `${label}: ${formatSankeyLinkLabel(value, initiated)}`;
        },
      },
    },
  },
}));

defineExpose({ isDark });
</script>
