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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
import { formatSankeyLinkLabel } from "../../Sankey/sankeyFormatters";

export interface SalesVolumeDay {
  date: string;
  initiated: number;
  success: number;
  abandoned: number;
  errors: number;
}

export interface SalesVolumeData {
  by_day: SalesVolumeDay[];
}

interface CurrencyValue {
  currency: string;
  total_value: number;
  count: number;
}

interface FailedReason {
  reason: string;
  failed_count: number;
}

interface SellerDayData {
  date: string;
  seller_conversations: number;
  sell_started_count: number;
  sell_get_quote_count: number;
  sell_booking_created_count: number;
  sell_success_count: number;
  sell_success_bank_transfer_count?: number;
  sell_success_cash_count?: number;
  daily_value_sell_success: number | CurrencyValue[];
  daily_value_sell_success_bank_transfer?: CurrencyValue[];
  daily_value_sell_success_cash?: CurrencyValue[];
  reasons?: FailedReason[];
}

export interface SellerData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  total_seller_conversations: number;
  total_sell_started: number;
  total_sell_get_quote: number;
  total_sell_booking_created: number;
  total_sell_success: number;
  total_sell_success_bank_transfer?: number;
  total_sell_success_cash?: number;
  total_value_sell_success: number | CurrencyValue[];
  total_value_sell_success_bank_transfer?: CurrencyValue[];
  total_value_sell_success_cash?: CurrencyValue[];
  seller_by_day: SellerDayData[];
}

interface FailedByReasonDay {
  date: string;
  reasons: FailedReason[];
}

interface FailedData {
  total_sell_failed: number;
  failed_by_reason_by_day: FailedByReasonDay[];
}

const SERIES = [
  { key: "initiated" as const, label: "Initiated", color: "#3B82F6" },
  { key: "success" as const, label: "Success", color: "#10B981" },
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

function isSellerData(
  data: SellerData | SalesVolumeData,
): data is SellerData {
  return "seller_by_day" in data;
}

function successForDay(day: SellerDayData): number {
  return (
    (day.sell_success_count || 0) +
    (day.sell_success_bank_transfer_count ?? 0) +
    (day.sell_success_cash_count ?? 0)
  );
}

function errorsForDay(day: SellerDayData): number {
  if (!day.reasons?.length) return 0;
  return day.reasons.reduce((sum, reason) => sum + (reason.failed_count || 0), 0);
}

function toVolumeDay(day: SellerDayData): SalesVolumeDay {
  const initiated = day.seller_conversations || 0;
  const success = successForDay(day);
  const errors = errorsForDay(day);
  const abandoned = Math.max(0, initiated - success - errors);

  return {
    date: day.date,
    initiated,
    success,
    abandoned,
    errors,
  };
}

function volumeDaysFromSeller(
  sellerData?: SellerData | null,
  failedData?: FailedData | null,
): SalesVolumeDay[] {
  const data = [...(sellerData?.seller_by_day ?? [])];

  if (failedData?.failed_by_reason_by_day) {
    failedData.failed_by_reason_by_day.forEach((failedItem) => {
      const idx = data.findIndex((sellerItem) => sellerItem.date === failedItem.date);
      if (idx !== -1) {
        data[idx] = { ...data[idx], reasons: failedItem.reasons };
      } else {
        data.push({
          date: failedItem.date,
          seller_conversations: 0,
          sell_started_count: 0,
          sell_get_quote_count: 0,
          sell_booking_created_count: 0,
          sell_success_count: 0,
          daily_value_sell_success: 0,
          reasons: failedItem.reasons,
        });
      }
    });
  }

  return data
    .map(toVolumeDay)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

const props = withDefaults(
  defineProps<{
    loading?: boolean;
    /** Shape Seller API o override plano `by_day` (stories). */
    data?: SellerData | SalesVolumeData | null;
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
    failedData: null,
    theme: undefined,
    enableExport: false,
    exportLoading: false,
    title: "Sales Volume",
    subtitle: "Daily sales volume by outcome, with share over initiated",
    emptyTitle: "No sales volume data",
    emptyDescription:
      "No daily sales outcomes found for the selected period. Try adjusting the date range.",
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

const volumeDays = computed((): SalesVolumeDay[] => {
  if (props.data && isSellerData(props.data) && props.data.seller_by_day?.length) {
    return volumeDaysFromSeller(props.data, props.failedData);
  }
  if (props.data && "by_day" in props.data) {
    return props.data.by_day ?? [];
  }
  return [];
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
