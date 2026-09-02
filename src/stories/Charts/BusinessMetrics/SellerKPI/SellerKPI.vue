<template>
  <div
    class="seller-kpi w-full"
    :class="{ 'seller-kpi--dark': isDark }"
    data-testid="seller-kpi"
  >
    <div
      class="grid gap-3"
      :class="kpiGridClass"
    >
      <CardMetric
        class="min-w-0"
        :label="resolvedLabels.initiated"
        label-position="header"
        :value="formatNumber(salesInitiated)"
        :loading="loading"
        :theme="theme"
        :current-value="salesInitiated"
        :previous-value="previousSalesInitiated"
      >
        <template #icon>
          <PaperAirplaneIcon class="h-2 w-2" />
        </template>
      </CardMetric>

      <CardMetric
        class="min-w-0"
        :label="resolvedLabels.success"
        label-position="header"
        :value="successValueLabel"
        :loading="loading"
        :theme="theme"
        :current-value="successRatePct"
        :previous-value="previousSuccessRatePct"
      >
        <template #icon>
          <CheckCircleIcon class="h-2 w-2" />
        </template>
        <template #value>
          <div class="kpi-value-with-count">
            <span class="kpi-value-with-count__main">{{
              successValueLabel
            }}</span>
            <span
              v-if="successCountLabel"
              class="kpi-value-with-count__secondary"
            >
              {{ successCountLabel }}
            </span>
          </div>
        </template>
      </CardMetric>

      <CardMetric
        class="min-w-0"
        :label="resolvedLabels.errors"
        label-position="header"
        :value="errorValueLabel"
        :loading="loading"
        :theme="theme"
        :current-value="errorRatePct"
        :previous-value="null"
      >
        <template #icon>
          <XCircleIcon class="h-1 w-1" />
        </template>
        <template v-if="errorTrend" #headerAside>
          <div :class="['percent-trend-badge', errorTrend.class]">
            {{ errorTrend.label }}
          </div>
        </template>
        <template #value>
          <div class="kpi-value-with-count">
            <span class="kpi-value-with-count__main">{{
              errorValueLabel
            }}</span>
            <span
              v-if="errorCountLabel"
              class="kpi-value-with-count__secondary"
            >
              {{ errorCountLabel }}
            </span>
          </div>
        </template>
      </CardMetric>

      <CardMetric
        class="min-w-0"
        :label="resolvedLabels.abandon"
        label-position="header"
        :value="abandonValueLabel"
        :loading="loading"
        :theme="theme"
        :current-value="abandonRatePct"
        :previous-value="null"
      >
        <template #icon>
          <ArrowLeftEndOnRectangleIcon class="h-1 w-1" />
        </template>
        <template v-if="abandonTrend" #headerAside>
          <div :class="['percent-trend-badge', abandonTrend.class]">
            {{ abandonTrend.label }}
          </div>
        </template>
        <template #value>
          <div class="kpi-value-with-count">
            <span class="kpi-value-with-count__main">{{
              abandonValueLabel
            }}</span>
            <span
              v-if="abandonCountLabel"
              class="kpi-value-with-count__secondary"
            >
              {{ abandonCountLabel }}
            </span>
          </div>
        </template>
      </CardMetric>

      <CardMetric
        v-if="loading || showRevenue"
        class="min-w-0"
        :label="resolvedLabels.revenue"
        label-position="header"
        :value="revenueValueLabel"
        :loading="loading"
        :theme="theme"
        :current-value="props.revenueUsd ?? 0"
        :previous-value="props.previousRevenueUsd"
      >
        <template #icon>
          <CurrencyDollarIcon class="h-2 w-2" />
        </template>
      </CardMetric>

      <CardMetric
        v-if="loading || showAvgCompletionTime"
        class="min-w-0"
        :label="resolvedLabels.avgCompletionTime"
        label-position="header"
        :value="avgCompletionValueLabel"
        :loading="loading"
        :theme="theme"
        :current-value="props.avgCompletionTimeSeconds ?? 0"
        :previous-value="props.previousAvgCompletionTimeSeconds"
      >
        <template #icon>
          <ClockIcon class="h-2 w-2" />
        </template>
      </CardMetric>

      <CardMetric
        v-if="loading || showAvgInteractions"
        class="min-w-0"
        :label="resolvedLabels.avgInteractionsToComplete"
        label-position="header"
        :value="avgInteractionsValueLabel"
        :loading="loading"
        :theme="theme"
        :current-value="props.avgInteractionsToComplete ?? 0"
        :previous-value="props.previousAvgInteractionsToComplete"
      >
        <template #icon>
          <ChatBubbleLeftRightIcon class="h-2 w-2" />
        </template>
        <template v-if="interactionsTrend" #headerAside>
          <div :class="['percent-trend-badge', interactionsTrend.class]">
            {{ interactionsTrend.label }}
          </div>
        </template>
      </CardMetric>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef } from "vue";
import CardMetric from "../../Utils/CardMetric/CardMetric.vue";
import { useNumberFormat } from "../../../../plugins/numberFormat";
import { useThemeDetection } from "../../../../composables/useThemeDetection";
import {
  buildPercentTrend,
  formatPercent,
} from "../CheckinKPI/checkinKpiFormatters";
import {
  DEFAULT_SELLER_KPI_LABELS,
  type SellerKpiProps,
} from "./sellerKpiTypes";
import {
  ArrowLeftEndOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PaperAirplaneIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";

const props = withDefaults(defineProps<SellerKpiProps>(), {
  loading: false,
  theme: undefined,
  labels: () => ({}),
  salesInitiated: 0,
  previousSalesInitiated: null,
  successRatePct: 0,
  successCount: 0,
  previousSuccessRatePct: null,
  errorRatePct: 0,
  errorCount: 0,
  previousErrorRatePct: null,
  abandonRatePct: 0,
  abandonCount: 0,
  previousAbandonRatePct: null,
  revenueUsd: null,
  revenueFormatted: null,
  previousRevenueUsd: null,
  avgCompletionTimeSeconds: null,
  avgCompletionTimeFormatted: null,
  previousAvgCompletionTimeSeconds: null,
  avgInteractionsToComplete: null,
  avgInteractionsToCompleteFormatted: null,
  previousAvgInteractionsToComplete: null,
});

const { isDark } = useThemeDetection(toRef(props, "theme"));

const resolvedLabels = computed(() => ({
  ...DEFAULT_SELLER_KPI_LABELS,
  ...props.labels,
}));

function formatNumber(value: number): string {
  return useNumberFormat(value);
}

function formatCountLabel(count: number): string | null {
  if (!count) return null;
  return `(${formatNumber(count)})`;
}

const successValueLabel = computed(() => formatPercent(props.successRatePct));
const successCountLabel = computed(() => formatCountLabel(props.successCount));

const errorValueLabel = computed(() => formatPercent(props.errorRatePct));
const errorCountLabel = computed(() => formatCountLabel(props.errorCount));
const errorTrend = computed(() =>
  buildPercentTrend(props.errorRatePct, props.previousErrorRatePct, true),
);

const abandonValueLabel = computed(() => formatPercent(props.abandonRatePct));
const abandonCountLabel = computed(() => formatCountLabel(props.abandonCount));
const abandonTrend = computed(() =>
  buildPercentTrend(props.abandonRatePct, props.previousAbandonRatePct, true),
);

const showRevenue = computed(
  () =>
    Boolean(props.revenueFormatted?.trim()) ||
    (props.revenueUsd !== null && props.revenueUsd !== undefined),
);
const showAvgCompletionTime = computed(
  () =>
    Boolean(props.avgCompletionTimeFormatted?.trim()) ||
    (props.avgCompletionTimeSeconds !== null &&
      props.avgCompletionTimeSeconds !== undefined),
);
const showAvgInteractions = computed(
  () =>
    props.avgInteractionsToComplete !== null &&
    props.avgInteractionsToComplete !== undefined,
);

const kpiColumnCount = computed(() => {
  if (props.loading) return 7;
  return (
    4 +
    Number(showRevenue.value) +
    Number(showAvgCompletionTime.value) +
    Number(showAvgInteractions.value)
  );
});

const kpiGridClass = computed(() =>
  kpiColumnCount.value >= 7 ? "grid-cols-7" : "grid-cols-6",
);

const revenueValueLabel = computed(() =>
  props.revenueFormatted?.trim() ? props.revenueFormatted : "—",
);

const avgCompletionValueLabel = computed(() =>
  props.avgCompletionTimeFormatted?.trim()
    ? props.avgCompletionTimeFormatted
    : "—",
);

const avgInteractionsValueLabel = computed(() =>
  props.avgInteractionsToCompleteFormatted?.trim()
    ? props.avgInteractionsToCompleteFormatted
    : "—",
);
const interactionsTrend = computed(() => {
  if (
    props.avgInteractionsToComplete === null ||
    props.avgInteractionsToComplete === undefined
  ) {
    return null;
  }
  return buildPercentTrend(
    props.avgInteractionsToComplete,
    props.previousAvgInteractionsToComplete,
    true,
  );
});

defineExpose({ isDark });
</script>

<style scoped>
.kpi-value-with-count {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  gap: 2px;
  flex-wrap: wrap;
  text-align: left;
}

.kpi-value-with-count__main {
  font-family:
    "Inter", var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--kiut-text-primary);
}

.kpi-value-with-count__secondary {
  font-family:
    "Inter", var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 10px;
  font-weight: 700;
  line-height: 1.2;
  color: #9191a1;
}

.percent-trend-badge {
  font-family:
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif), "Inter",
    sans-serif;
  font-size: 9px;
  font-weight: 600;
  padding: 4px 6px;
  border-radius: 999px;
  line-height: 1;
  letter-spacing: 0.01em;
}

.percent-trend-badge.change-badge--up {
  background: #dcfce7;
  color: #166534;
}

.percent-trend-badge.change-badge--down {
  background: #fee2e2;
  color: #b91c1c;
}

.percent-trend-badge.change-badge--neutral {
  background: rgba(148, 163, 184, 0.16);
  color: #64748b;
}

.seller-kpi--dark .percent-trend-badge.change-badge--up {
  background: rgba(74, 222, 128, 0.14);
  color: #4ade80;
}

.seller-kpi--dark .percent-trend-badge.change-badge--down {
  background: rgba(251, 113, 133, 0.16);
  color: #fb7185;
}

.seller-kpi--dark .percent-trend-badge.change-badge--neutral {
  background: rgba(148, 163, 184, 0.12);
  color: #94a3b8;
}

.seller-kpi :deep(.metric-label-text) {
  font-size: 10px;
}

.seller-kpi :deep(.metric-value) {
  font-size: 18px;
}

.seller-kpi :deep(.change-badge) {
  font-size: 9px;
  padding: 4px 6px;
}

.seller-kpi :deep(.chart-metric-container) {
  padding: 10px;
}
</style>
