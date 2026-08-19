<template>
  <ChartMetricContainer
    class="w-full min-h-0 self-start"
    :title="props.title"
    :subtitle="props.subtitle"
    :collapsible="false"
    :loading="props.loading"
  >
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
      <section
        v-if="dataChart.labels.length"
        class="flex w-full shrink-0 flex-col"
      >
        <div
          class="chart-line-area flex h-[280px] w-full min-w-0 shrink-0 flex-col overflow-hidden"
        >
          <LineChart
            :data="dataChart"
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
  </ChartMetricContainer>
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

export interface CheckinVolumeDay {
  date: string;
  initiated: number;
  success: number;
  abandoned: number;
  errors: number;
}

export interface CheckinVolumeData {
  by_day: CheckinVolumeDay[];
}

/** Same daily shape as CheckinMetrics (`record_locator_by_day`). */
interface CheckinByDay {
  date: string;
  checkin_initiated: number;
  record_locator_init_count: number;
  record_locator_started_count: number;
  record_locator_completed_count: number;
  record_locator_closed_count: number;
  record_locator_abandoned_count: number;
  record_locator_create_payment_count?: number;
}

interface CheckinData {
  record_locator_by_day?: CheckinByDay[];
}

interface FailedStep {
  step_name: string;
  failed_count: number;
}

interface FailedByDay {
  date: string;
  steps: FailedStep[];
}

interface UnrecoveredByDay {
  date: string;
  unrecovered_count: number;
}

interface FailedData {
  failed_by_step_by_day?: FailedByDay[];
  unrecovered_by_day?: UnrecoveredByDay[];
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

function errorsForDay(date: string, failedData?: FailedData | null): number {
  const unrecovered = failedData?.unrecovered_by_day?.find((d) => d.date === date);
  if (unrecovered) return unrecovered.unrecovered_count || 0;
  const failedDay = failedData?.failed_by_step_by_day?.find((d) => d.date === date);
  if (!failedDay?.steps?.length) return 0;
  return failedDay.steps.reduce((sum, step) => sum + (step.failed_count || 0), 0);
}

function volumeDaysFromCheckin(
  checkinData?: CheckinData | null,
  failedData?: FailedData | null,
): CheckinVolumeDay[] {
  const days = checkinData?.record_locator_by_day ?? [];
  return [...days]
    .map((day) => ({
      date: day.date,
      initiated: day.checkin_initiated || 0,
      success: day.record_locator_closed_count || 0,
      abandoned: day.record_locator_abandoned_count || 0,
      errors: errorsForDay(day.date, failedData),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
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
  }>(),
  {
    loading: false,
    data: null,
    checkinData: null,
    failedData: null,
    theme: undefined,
    enableExport: false,
    exportLoading: false,
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

defineExpose({ isDark });
</script>
