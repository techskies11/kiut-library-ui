<template>
  <ChartMetricContainer
    class="checkin-container-root w-full"
    title="Check in"
    subtitle="Check-in flows and segment breakdown."
    :default-open="containerInitiallyOpen"
    :loading="loading"
    lazy-mount
    @open="emit('open')"
  >
    <div class="checkin-container__body">
      <CheckinKPI
        v-if="showKpi"
        v-bind="resolvedKpiProps"
        :loading="effectiveKpiLoading"
        :theme="theme"
      />
      <CheckinMetrics
        v-if="showCheckin"
        class="w-full min-h-0"
        :collapsible="false"
        :initially-open="childrenInitiallyOpen"
        :loading="effectiveCheckinLoading"
        :checkin-data="checkinData"
        :failed-data="checkinFailedData"
        :enable-export="enableExport"
        :export-loading="exportLoading"
        :is-avianca="showPaymentLinks"
        @export="(fmt) => handleChildExport('checkin', fmt)"
      />
      <div
        class="checkin-container__split grid grid-cols-1 items-stretch gap-6"
        :class="{ 'lg:grid-cols-2': showErrorReasons }"
      >
        <div
          class="checkin-container__split-cell flex min-h-0 min-w-0 flex-col"
        >
          <ChartMetricContainer
            class="w-full min-h-0 self-start"
            :title="trendTitle"
            :subtitle="trendSubtitle"
            :collapsible="false"
            :loading="effectiveCheckinLoading"
          >
            <template #headerAside>
              <div class="stage-select flex items-center justify-end gap-3">
                <div class="w-56">
                  <Select
                    :model-value="selectedTrend"
                    :options="TREND_OPTIONS"
                    aria-label-trigger="Check-in trend view"
                    :show-option-check="false"
                    @update:model-value="onTrendChange"
                  />
                </div>
                <FooterExport
                  v-if="enableExport && !effectiveCheckinLoading"
                  variant="inline"
                  :loading="exportLoading"
                  @export="(fmt) => handleChildExport(trendExportSource, fmt)"
                />
              </div>
            </template>

            <Transition name="checkin-trend-fade" mode="out-in">
              <CheckinVolume
                v-if="selectedTrend === 'volume'"
                key="volume"
                embedded
                class="w-full min-h-0"
                :checkin-data="checkinData"
                :failed-data="checkinFailedData"
                :theme="theme"
              />
              <CheckinInteractions
                v-else-if="selectedTrend === 'interactions'"
                key="interactions"
                embedded
                class="w-full min-h-0"
                :data="interactionsData"
                :theme="theme"
                :empty-title="interactionsEmptyTitle"
                :empty-description="interactionsEmptyDescription"
              />
              <CheckinCompletionTime
                v-else
                key="completionTime"
                embedded
                class="w-full min-h-0"
                :data="completionTimeData"
                :theme="theme"
                :empty-title="completionTimeEmptyTitle"
                :empty-description="completionTimeEmptyDescription"
              />
            </Transition>
          </ChartMetricContainer>
        </div>
        <div
          v-if="showErrorReasons"
          class="checkin-container__split-cell flex min-h-0 min-w-0 flex-col"
        >
          <CheckinErrorReasons
            class="h-full min-h-0 w-full"
            :collapsible="false"
            :initially-open="childrenInitiallyOpen"
            :loading="effectiveErrorReasonsLoading"
            :stage="errorReasonsStage"
            :error-reasons="errorReasons"
            :enable-export="enableExport"
            :export-loading="exportLoading"
            @update:stage="emit('update:errorReasonsStage', $event)"
            @export="(fmt) => handleChildExport('checkinErrorReasons', fmt)"
          />
        </div>
      </div>
      <CheckinSegments
        v-if="showSegments"
        class="w-full min-h-0"
        :collapsible="false"
        :initially-open="childrenInitiallyOpen"
        :loading="effectiveSegmentsLoading"
        :data="segmentsData ?? []"
        :theme="theme"
        :enable-export="enableExport"
        :export-loading="exportLoading"
        @export="handleSegmentsExport"
      />
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";
import CheckinKPI from "../CheckinKPI/CheckinKPI.vue";
import CheckinMetrics from "../CheckinMetrics/CheckinMetrics.vue";
import CheckinSegments from "../CheckinSegments/checkinSegments.vue";
import {
  buildCheckinKpiFromRecord,
  mergeCheckinKpiWithPrevious,
  type CheckinFailedKpiShape,
  type CheckinRecordKpiShape,
} from "../CheckinKPI/buildCheckinKpiFromRecord";
import type {
  CheckinKpiLabels,
  CheckinKpiProps,
} from "../CheckinKPI/checkinKpiTypes";
import CheckinVolume from "../CheckinVolume/CheckinVolume.vue";
import CheckinErrorReasons, {
  type CheckinErrorReasonsBreakdown,
  type CheckinErrorStage,
} from "../CheckinErrorReasons/CheckinErrorReasons.vue";
import CheckinInteractions, {
  type CheckinInteractionsData,
} from "../CheckinInteractions/CheckinInteractions.vue";
import CheckinCompletionTime, {
  type CheckinCompletionTimeData,
} from "../CheckinCompletionTime/CheckinCompletionTime.vue";
import type { Theme } from "../../../../composables/useThemeDetection";
import { FooterExport, type ExportFormat } from "../../Utils/FooterExport";
import Select, {
  type KiutSelectOption,
  type KiutSelectValue,
} from "../../../../components/Inputs/Select.vue";

interface SegmentDatum {
  departure_airport: string;
  conexion_airport: string;
  arrival_airport: string;
  segment_init_count: number;
  segment_started_count: number;
  segment_completed_count: number;
  segment_closed_count: number;
}

/** Origen dentro del grupo Check in (para rutear exports en la app consumidora). */
export type CheckinContainerExportSource =
  | "checkin"
  | "checkinSegments"
  | "checkinVolume"
  | "checkinErrorReasons"
  | "checkinInteractions"
  | "checkinCompletionTime";

const TREND_VIEWS = ["volume", "interactions", "completionTime"] as const;
export type CheckinTrendView = (typeof TREND_VIEWS)[number];

const TREND_OPTIONS: KiutSelectOption<KiutSelectValue>[] = [
  { value: "volume", label: "Volume" },
  { value: "interactions", label: "Avg interactions" },
  { value: "completionTime", label: "Avg completion time" },
];

function isTrendView(value: string): value is CheckinTrendView {
  return (TREND_VIEWS as readonly string[]).includes(value);
}

export interface CheckinContainerExportPayload {
  source: CheckinContainerExportSource;
  format: ExportFormat;
}

type CheckinSegmentsExportPayload =
  | ExportFormat
  | CheckinContainerExportPayload;

const props = withDefaults(
  defineProps<{
    containerInitiallyOpen?: boolean;
    childrenInitiallyOpen?: boolean;
    /** Si es true, aplica loading a todas las vistas hijas. */
    loading?: boolean;
    checkinLoading?: boolean;
    segmentsLoading?: boolean;
    errorReasonsLoading?: boolean;
    showCheckin?: boolean;
    showSegments?: boolean;
    showErrorReasons?: boolean;
    enableExport?: boolean;
    exportLoading?: boolean;
    theme?: Theme;
    showKpi?: boolean;
    kpiLoading?: boolean;
    /** Override manual de KPIs (opcional). */
    kpiProps?: Partial<CheckinKpiProps>;
    /** Labels custom para las tarjetas KPI (se fusionan con defaults). */
    kpiLabels?: CheckinKpiLabels;
    /** Periodo anterior para tendencias de KPI (opcional). */
    previousCheckinData?: object;
    previousCheckinFailedData?: object;
    /** Shape CheckinMetrics.vue (métricas record locator) */
    checkinData?: object;
    checkinFailedData?: object;
    /** Shape CheckinSegments */
    segmentsData?: SegmentDatum[];
    /** Shape CheckinErrorReasons (sits beside Checkin Volume). */
    errorReasons?: CheckinErrorReasonsBreakdown | null;
    errorReasonsStage?: CheckinErrorStage;
    /** Show Create Payment column in check-in table (Avianca). Maps to CheckinMetrics `isAvianca`. */
    showPaymentLinks?: boolean;
    /** Daily avg interactions series (checkin-avg-interactions-metrics API). */
    interactionsData?: CheckinInteractionsData | null;
    interactionsTitle?: string;
    interactionsSubtitle?: string;
    interactionsEmptyTitle?: string;
    interactionsEmptyDescription?: string;
    /** Daily avg completion time series (checkin-completion-time-metrics API). */
    completionTimeData?: CheckinCompletionTimeData | null;
    completionTimeTitle?: string;
    completionTimeSubtitle?: string;
    completionTimeEmptyTitle?: string;
    completionTimeEmptyDescription?: string;
    /** Active view in the Volume / Interactions / Completion time select. */
    trendView?: CheckinTrendView;
  }>(),
  {
    containerInitiallyOpen: false,
    childrenInitiallyOpen: true,
    loading: false,
    checkinLoading: false,
    segmentsLoading: false,
    errorReasonsLoading: false,
    showCheckin: true,
    showSegments: true,
    showErrorReasons: true,
    showKpi: true,
    enableExport: false,
    exportLoading: false,
    theme: undefined,
    showPaymentLinks: false,
    errorReasons: null,
    errorReasonsStage: "on_retrieve",
    trendView: "volume",
  },
);

const emit = defineEmits<{
  open: [];
  export: [payload: CheckinContainerExportPayload];
  "update:errorReasonsStage": [stage: CheckinErrorStage];
  "update:trendView": [view: CheckinTrendView];
}>();

const selectedTrend = ref<CheckinTrendView>(props.trendView);

watch(
  () => props.trendView,
  (view) => {
    selectedTrend.value = view;
  },
);

const trendTitle = computed(() => {
  if (selectedTrend.value === "interactions") {
    return props.interactionsTitle ?? "Avg interactions to complete";
  }
  if (selectedTrend.value === "completionTime") {
    return props.completionTimeTitle ?? "Avg check-in completion time";
  }
  return "Check-in Volume Over Time";
});

const trendSubtitle = computed(() => {
  if (selectedTrend.value === "interactions") {
    return (
      props.interactionsSubtitle ??
      "Average number of interaction turns from initiated to check-in closed"
    );
  }
  if (selectedTrend.value === "completionTime") {
    return (
      props.completionTimeSubtitle ??
      "Daily average from initiated to boarding pass issued or error"
    );
  }
  return "Daily check-in volume by outcome, with share over initiated";
});

const trendExportSource = computed((): CheckinContainerExportSource => {
  if (selectedTrend.value === "interactions") return "checkinInteractions";
  if (selectedTrend.value === "completionTime") return "checkinCompletionTime";
  return "checkinVolume";
});

function onTrendChange(value: KiutSelectValue): void {
  const next = String(value);
  if (!isTrendView(next)) return;
  selectedTrend.value = next;
  emit("update:trendView", next);
}

const effectiveKpiLoading = computed(() =>
  props.loading ? false : (props.kpiLoading ?? props.checkinLoading),
);
const effectiveCheckinLoading = computed(() =>
  props.loading ? false : props.checkinLoading,
);
const effectiveSegmentsLoading = computed(() =>
  props.loading ? false : props.segmentsLoading,
);
const effectiveErrorReasonsLoading = computed(() =>
  props.loading ? false : props.errorReasonsLoading,
);

const resolvedKpiProps = computed<CheckinKpiProps>(() => {
  const current = buildCheckinKpiFromRecord(
    props.checkinData as CheckinRecordKpiShape | undefined,
    props.checkinFailedData as CheckinFailedKpiShape | undefined,
  );
  const previous = buildCheckinKpiFromRecord(
    props.previousCheckinData as CheckinRecordKpiShape | undefined,
    props.previousCheckinFailedData as CheckinFailedKpiShape | undefined,
  );
  const merged = mergeCheckinKpiWithPrevious(current, previous);

  return {
    ...merged,
    ...props.kpiProps,
    labels: {
      ...props.kpiProps?.labels,
      ...props.kpiLabels,
    },
  };
});

function handleChildExport(
  source: CheckinContainerExportSource,
  format: ExportFormat,
) {
  emit("export", { source, format });
}

function isContainerExportPayload(
  payload: CheckinSegmentsExportPayload,
): payload is CheckinContainerExportPayload {
  return typeof payload === "object" && payload !== null && "source" in payload;
}

function handleSegmentsExport(payload: CheckinSegmentsExportPayload) {
  if (isContainerExportPayload(payload)) {
    emit("export", payload);
    return;
  }

  handleChildExport("checkinSegments", payload);
}
</script>

<style scoped>
.checkin-container__body {
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: fadeIn 0.45s ease-out;
}

.checkin-container__split-cell :deep(.chart-metric-container) {
  height: 100%;
  align-self: stretch;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.checkin-trend-fade-enter-active,
.checkin-trend-fade-leave-active {
  transition: opacity 0.2s ease;
}

.checkin-trend-fade-enter-from,
.checkin-trend-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .checkin-trend-fade-enter-active,
  .checkin-trend-fade-leave-active {
    transition: none;
  }
}
</style>
