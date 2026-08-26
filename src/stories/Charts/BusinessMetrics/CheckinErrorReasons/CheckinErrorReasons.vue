<template>
  <ChartMetricContainer
    class="checkin-error-reasons-root h-full min-h-0"
    title="Check-in Error Reasons"
    subtitle="Distribution of error reasons on booking retrieve"
    :collapsible="collapsible"
    :default-open="initiallyOpen"
    :loading="loading"
  >
    <template #headerAside>
      <div class="stage-select flex items-center justify-end gap-3">
        <div class="w-44">
          <Select
            :model-value="stage"
            :options="stageOptions"
            aria-label-trigger="Check-in error stage"
            :show-option-check="false"
            @update:model-value="onStageChange"
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

    <div class="card-body">
      <div v-if="hasData" class="error-reasons-content">
        <p class="total-summary">
          Total errors:
          <span class="total-summary__value">{{
            formatNumber(totalErrors)
          }}</span>
          <template v-if="isProcessStage">
            <span class="total-summary__divider">·</span>
            Unrecovered:
            <span class="total-summary__value">{{
              formatNumber(totalUnrecovered)
            }}</span>
            <span class="total-summary__divider">·</span>
            BP not issued:
            <span class="total-summary__value">{{
              formatNumber(totalBpNotIssued)
            }}</span>
          </template>
        </p>

        <template v-if="isProcessStage">
          <section
            v-for="section in processSections"
            :key="section.key"
            class="table-section error-reasons-section"
          >
            <h4 class="section-title">{{ section.title }}</h4>
            <p v-if="section.subtitle" class="section-subtitle">
              {{ section.subtitle }}
            </p>
            <ErrorReasonsTable
              v-if="section.rows.length > 0"
              :rows="section.rows"
            />
            <p v-else class="section-empty">No errors in this cohort.</p>
          </section>
        </template>

        <section v-else class="table-section">
          <ErrorReasonsTable
            v-if="retrieveRows.length > 0"
            :rows="retrieveRows"
          />
        </section>
      </div>

      <div v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <ExclamationTriangleIcon class="empty-icon" />
          </div>
          <p class="empty-title">No error reasons for this stage</p>
          <p class="empty-description">
            Try another stage or adjust the date range to see terminal check-in
            failures.
          </p>
        </div>
      </div>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";
import { FooterExport, type ExportFormat } from "../../Utils/FooterExport";
import Select, {
  type KiutSelectOption,
  type KiutSelectValue,
} from "../../../../components/Inputs/Select.vue";
import ErrorReasonsTable from "./ErrorReasonsTable.vue";

export type CheckinErrorStage = "on_retrieve" | "on_check_in_process";

export interface CheckinErrorLogDetail {
  message: string;
  count: number;
  percentage_of_total: number;
}

export interface CheckinErrorCategory {
  outcome_group: "unrecovered" | "bp_not_issued" | null;
  category_key: string;
  category_label: string;
  error_count: number;
  percentage: number;
  raw_logs: CheckinErrorLogDetail[];
}

export interface CheckinErrorReasonsBreakdown {
  stage: CheckinErrorStage;
  total_errors: number;
  total_unrecovered: number | null;
  total_bp_not_issued: number | null;
  categories: CheckinErrorCategory[];
}

export interface ErrorReasonTableRow {
  id: string;
  category_label: string;
  error_count: number;
  percentage: number;
  children: ErrorReasonTableRow[];
}

const props = withDefaults(
  defineProps<{
    initiallyOpen?: boolean;
    collapsible?: boolean;
    loading?: boolean;
    stage?: CheckinErrorStage;
    errorReasons?: CheckinErrorReasonsBreakdown | null;
    enableExport?: boolean;
    exportLoading?: boolean;
  }>(),
  {
    initiallyOpen: false,
    collapsible: false,
    loading: false,
    stage: "on_retrieve",
    errorReasons: null,
    enableExport: false,
    exportLoading: false,
  },
);

const emit = defineEmits<{
  "update:stage": [stage: CheckinErrorStage];
  export: [format: ExportFormat];
}>();

const handleExport = (format: ExportFormat): void => {
  emit("export", format);
};

const stageOptions: KiutSelectOption<KiutSelectValue>[] = [
  { label: "On Retrieve", value: "on_retrieve" },
  { label: "On Check In Process", value: "on_check_in_process" },
];

const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "0";
  return value.toLocaleString();
};

const onStageChange = (value: KiutSelectValue): void => {
  if (value === "on_retrieve" || value === "on_check_in_process") {
    emit("update:stage", value);
  }
};

const breakdown = computed(() => props.errorReasons);

const isProcessStage = computed(() => props.stage === "on_check_in_process");
const totalErrors = computed(() => breakdown.value?.total_errors ?? 0);
const totalUnrecovered = computed(
  () => breakdown.value?.total_unrecovered ?? 0,
);
const totalBpNotIssued = computed(
  () => breakdown.value?.total_bp_not_issued ?? 0,
);

const mapCategoryToRow = (
  category: CheckinErrorCategory,
  prefix: string,
): ErrorReasonTableRow => ({
  id: `${prefix}-${category.category_key}`,
  category_label: category.category_label,
  error_count: category.error_count,
  percentage: category.percentage,
  children: (category.raw_logs || []).map((log, index) => ({
    id: `${prefix}-${category.category_key}-log-${index}`,
    category_label: log.message,
    error_count: log.count,
    percentage: log.percentage_of_total,
    children: [],
  })),
});

const retrieveRows = computed((): ErrorReasonTableRow[] => {
  const categories = breakdown.value?.categories ?? [];
  return categories.map((category) => mapCategoryToRow(category, "retrieve"));
});

const processSections = computed(() => {
  const categories = breakdown.value?.categories ?? [];
  const unrecovered = categories.filter(
    (item) => item.outcome_group === "unrecovered",
  );
  const bpNotIssued = categories.filter(
    (item) => item.outcome_group === "bp_not_issued",
  );

  return [
    {
      key: "unrecovered",
      title: "Error: On Check In Process",
      subtitle: "Reservations that failed before PSS close (unrecovered)",
      rows: unrecovered.map((category) =>
        mapCategoryToRow(category, "unrecovered"),
      ),
    },
    {
      key: "bp_not_issued",
      title: "Error: BP Not Issued",
      subtitle: "Closed reservations where boarding pass was not issued",
      rows: bpNotIssued.map((category) =>
        mapCategoryToRow(category, "bp-not-issued"),
      ),
    },
  ];
});

const hasData = computed(() => {
  if (!breakdown.value) return false;
  return (
    (breakdown.value.categories?.length ?? 0) > 0 ||
    breakdown.value.total_errors > 0
  );
});
</script>

<style scoped>
.card-body {
  animation: fadeIn 0.5s ease-out;
}

.total-summary {
  margin: 0 0 16px;
  font-size: 0.875rem;
  color: var(--kiut-text-secondary);
}

.total-summary__value {
  font-weight: 600;
  color: var(--kiut-text-primary);
}

.total-summary__divider {
  margin: 0 8px;
  color: var(--kiut-text-muted);
}

.error-reasons-section + .error-reasons-section {
  margin-top: 24px;
}

.section-title {
  margin: 0 0 4px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--kiut-text-primary);
}

.section-subtitle {
  margin: 0 0 12px;
  font-size: 0.8125rem;
  color: var(--kiut-text-secondary);
}

.section-empty {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--kiut-text-muted);
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 240px;
}

.empty-state-content {
  text-align: center;
  max-width: 360px;
}

.empty-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  background: var(--kiut-bg-empty-icon);
  border-radius: 16px;
  margin: 0 auto 16px;
}

.empty-icon {
  width: 36px;
  height: 36px;
  color: var(--kiut-primary);
}

.empty-title {
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--kiut-text-primary);
}

.empty-description {
  margin: 0;
  font-size: 0.875rem;
  color: var(--kiut-text-secondary);
  line-height: 1.5;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
