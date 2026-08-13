<template>
  <ChartMetricContainer
    class="checkin-metrics-root h-full min-h-0"
    title="Check-in Metrics"
    subtitle="Check-in performance and failure analysis"
    :collapsible="collapsible"
    :default-open="props.initiallyOpen"
    :loading="loading"
  >
    <template #headerExport>
      <FooterExport
        v-if="enableExport && !loading"
        variant="inline"
        @export="handleExport"
        :loading="exportLoading"
      />
    </template>
    <div class="card-body">
      <!-- Sankey Flow Chart -->
      <div v-if="sankeyData.nodes.length > 0" class="sankey-section">
        <SankeyChart
          :data="sankeyData"
          height="400px"
          :use-gradient="false"
          :node-gap="16"
        />
      </div>

      <!-- Table Data (chrome de tabla: Utils/Table) -->
      <div
        v-if="tableData && tableData.length > 0"
        class="checkin-metrics-daily-section"
      >
        <div class="w-full min-w-0">
          <Table
            :columns="checkinMetricsTableColumns"
            :rows="checkinMetricsTableRows"
            :max-visible-rows="3"
            row-key="id"
          >
            <template #cell-date="{ row }">
              <span class="font-medium whitespace-nowrap">{{
                formatDate(String(row.date))
              }}</span>
            </template>
            <template #cell-checkinInit="{ row }">
              <span>{{ formatNumber(row.checkin_initiated as number) }}</span>
            </template>
            <template #cell-bookingRetrieved="{ row }">
              <span>{{
                formatValueWithPercentage(
                  row.record_locator_started_count as number,
                  row.checkin_initiated as number,
                )
              }}</span>
            </template>
            <template #cell-closed="{ row }">
              <span>{{
                formatValueWithPercentage(
                  row.record_locator_closed_count as number,
                  row.checkin_initiated as number,
                )
              }}</span>
            </template>
            <template #cell-completed="{ row }">
              <span class="cell-success">{{
                formatValueWithPercentage(
                  row.record_locator_completed_count as number,
                  row.checkin_initiated as number,
                )
              }}</span>
            </template>
            <template #cell-failed="{ row }">
              <span class="cell-danger">{{
                formatValueWithPercentage(
                  row.unrecovered_count as number,
                  row.checkin_initiated as number,
                )
              }}</span>
            </template>
            <template #cell-createPayment="{ row }">
              <span>{{
                formatNumber(
                  (row.record_locator_create_payment_count as number) ?? 0,
                )
              }}</span>
            </template>
            <template #cell-reasons="{ row }">
              <div
                v-if="
                  Array.isArray(row.failed_steps) && row.failed_steps.length > 0
                "
                class="reasons-list"
              >
                <div
                  v-for="step in row.failed_steps"
                  :key="step.step_name"
                  class="reason-item"
                >
                  <span class="reason-name"
                    >{{ formatStepName(step.step_name) }}:</span
                  >
                  <span class="reason-count">{{ step.failed_count }}</span>
                </div>
              </div>
              <div v-else class="no-reasons">-</div>
            </template>
          </Table>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <ChartBarIcon class="empty-icon" />
          </div>
          <p class="empty-title">No check-in data available</p>
          <p class="empty-description">
            Try adjusting the date range or check your filters to see check-in
            metrics.
          </p>
        </div>
      </div>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from "vue";
import moment from "moment";
import SankeyChart from "../../Sankey/SankeyChart.vue";
import {
  formatSankeyLinkLabel,
  formatSankeyPercentage,
} from "../../Sankey/sankeyFormatters";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";
import { ChartBarIcon } from "@heroicons/vue/24/outline";
import { FooterExport, type ExportFormat } from "../../Utils/FooterExport";
import {
  useThemeDetection,
  type Theme,
} from "../../../../composables/useThemeDetection";
import Table, { type TableColumn } from "../../Utils/Table/Table.vue";

type SankeyNodeStatus = "success" | "abandon" | "error";

// Types
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
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  total_record_locator_init?: number;
  total_record_locator_started?: number;
  total_record_locator_completed?: number;
  total_record_locator_closed?: number;
  total_record_locator_init_abandoned?: number;
  total_checkin_initiated?: number;
  total_record_locator_unrecovered?: number;
  total_record_locator_init_abandoned_error?: number | null;
  total_record_locator_init_abandoned_voluntary?: number | null;
  total_checkin_pre_init_abandoned_error?: number | null;
  total_checkin_pre_init_abandoned_voluntary?: number | null;
  total_checkin_retrieval_user_error?: number | null;
  total_checkin_retrieval_business_rule?: number | null;
  total_checkin_retrieval_tech_error?: number | null;
  total_checkin_retrieval_unknown_error?: number | null;
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

interface UnrecoveredByStep {
  step_name: string;
  count: number;
}

interface UnrecoveredByStepByDay {
  date: string;
  steps: { step_name: string; count: number }[];
}

interface UnrecoveredByDay {
  date: string;
  unrecovered_count: number;
}

interface FailedData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  total_checkin_failed?: number;
  total_checkin_unrecovered?: number;
  total_checkin_init_abandoned?: number;
  failed_by_step_by_day?: FailedByDay[];
  unrecovered_by_step_by_day?: UnrecoveredByStepByDay[];
  unrecovered_by_day?: UnrecoveredByDay[];
  unrecovered_by_step?: UnrecoveredByStep[];
}

interface TableRow extends CheckinByDay {
  failed_steps: FailedStep[];
  unrecovered_count: number;
}

const props = withDefaults(
  defineProps<{
    initiallyOpen?: boolean;
    /** Si es false, el card siempre abierto sin chevron (p. ej. dentro de CheckinContainer). */
    collapsible?: boolean;
    checkinData?: CheckinData;
    failedData?: FailedData;
    loading?: boolean;
    theme?: Theme;
    enableExport?: boolean;
    exportLoading?: boolean;
    /** Show Create Payment column (Avianca). */
    isAvianca?: boolean;
  }>(),
  {
    initiallyOpen: false,
    collapsible: true,
    checkinData: () => ({
      total_record_locator_init: 0,
      total_checkin_initiated: 0,
      total_record_locator_init_abandoned: 0,
      total_record_locator_started: 0,
      total_record_locator_completed: 0,
      total_record_locator_closed: 0,
      total_record_locator_unrecovered: 0,
      total_record_locator_init_abandoned_error: null,
      total_record_locator_init_abandoned_voluntary: null,
      total_checkin_pre_init_abandoned_error: null,
      total_checkin_pre_init_abandoned_voluntary: null,
      record_locator_by_day: [],
    }),
    failedData: () => ({
      total_checkin_failed: 0,
      failed_by_step_by_day: [],
      unrecovered_by_step: [],
    }),
    loading: false,
    theme: undefined,
    enableExport: false,
    exportLoading: false,
    isAvianca: false,
  },
);

const emit = defineEmits<{
  export: [format: ExportFormat];
}>();

const handleExport = (format: ExportFormat) => {
  emit("export", format);
};

// Theme detection with prop fallback
const { isDark } = useThemeDetection(toRef(props, "theme"));

// Utility functions
const formatNumber = (value: number | undefined): string => {
  if (value === undefined || value === null) return "0";
  return value.toLocaleString();
};

const formatDate = (dateStr: string): string => {
  // Parse as local calendar date (Y-M-D parts) to avoid UTC midnight → previous day shift
  const [year, month, day] = dateStr.split("-").map(Number);
  return moment([year, month - 1, day]).format("MMM DD");
};

const formatStepName = (stepName: string): string => {
  return stepName.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

const calculatePercentage = (value: number, total: number): string =>
  formatSankeyPercentage(value, total);

const formatValueWithPercentage = (
  value: number | undefined,
  total: number | undefined,
): string => {
  const v = value || 0;
  const t = total || 0;
  const formattedValue = formatNumber(v);
  const percentage = calculatePercentage(v, t);
  return `${formattedValue} (${percentage})`;
};

// Computed: Datos combinados para la tabla
const tableData = computed((): TableRow[] => {
  const checkinByDay = props.checkinData?.record_locator_by_day || [];
  const failedByDay = props.failedData?.failed_by_step_by_day || [];
  const unrecoveredByDay = props.failedData?.unrecovered_by_day || [];

  const combined = checkinByDay.map((dayData) => {
    const failedDayData = failedByDay.find((d) => d.date === dayData.date);
    const unrecoveredDayData = unrecoveredByDay.find(
      (d) => d.date === dayData.date,
    );
    return {
      ...dayData,
      failed_steps: failedDayData?.steps || [],
      unrecovered_count: unrecoveredDayData?.unrecovered_count || 0,
    };
  });

  return combined.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
});

const BOARDING_PASS_FAILED_STEPS = new Set([
  "choose_boardingpass",
  "boarding_pass",
  "generate_boarding_pass",
]);

const isBoardingPassFailedStep = (stepName: string | undefined): boolean => {
  if (!stepName) return false;
  const normalized = stepName.toLowerCase().trim();
  return (
    BOARDING_PASS_FAILED_STEPS.has(normalized) ||
    normalized.includes("boarding_pass")
  );
};

const getBoardingPassFailedCount = (failedData: FailedData | undefined): number => {
  const byDay = failedData?.failed_by_step_by_day || [];
  let total = 0;
  for (const day of byDay) {
    for (const step of day.steps || []) {
      if (isBoardingPassFailedStep(step.step_name)) {
        total += step.failed_count || 0;
      }
    }
  }
  if (total > 0) return total;

  // Fallback when failed_by_step_by_day is empty
  for (const step of failedData?.unrecovered_by_step || []) {
    if (isBoardingPassFailedStep(step.step_name)) {
      total += step.count || 0;
    }
  }
  return total;
};

// Shared labels: closed = PSS accepted; completed = BP issued
const checkinMetricsBaseColumns: TableColumn[] = [
  { key: "date", label: "Date", align: "center" },
  { key: "checkinInit", label: "Initiated by agent", align: "center" },
  { key: "bookingRetrieved", label: "Check In Started (%)", align: "center" },
  { key: "closed", label: "Check In Success (%)", align: "center" },
  { key: "completed", label: "Boarding Pass Issued (%)", align: "center" },
  { key: "failed", label: "Errors (%)", align: "center" },
  { key: "reasons", label: "Failed (Reasons)", align: "center" },
];

const createPaymentColumn: TableColumn = {
  key: "createPayment",
  label: "Create Payment",
  align: "center",
};

const checkinMetricsTableColumns = computed((): TableColumn[] => {
  return props.isAvianca
    ? [...checkinMetricsBaseColumns, createPaymentColumn]
    : checkinMetricsBaseColumns;
});

const checkinMetricsTableRows = computed((): Record<string, unknown>[] =>
  tableData.value.map((row) => ({
    id: row.date,
    date: row.date,
    checkin_initiated: row.checkin_initiated,
    record_locator_init_count: row.record_locator_init_count,
    record_locator_started_count: row.record_locator_started_count,
    record_locator_completed_count: row.record_locator_completed_count,
    record_locator_closed_count: row.record_locator_closed_count,
    unrecovered_count: row.unrecovered_count,
    failed_steps: row.failed_steps,
    record_locator_create_payment_count:
      row.record_locator_create_payment_count,
  })),
);

// Computed: Datos del Sankey
const sankeyData = computed(() => {
  const nodes: { name: string; value?: number; status?: SankeyNodeStatus }[] = [];
  const links: {
    source: string;
    target: string;
    value: number;
    label: string;
  }[] = [];
  const nodeNames = new Set<string>();
  const addNode = (
    name: string,
    extra: { value?: number; status?: SankeyNodeStatus } = {},
  ): void => {
    if (!nodeNames.has(name)) {
      nodes.push({ name, ...extra });
      nodeNames.add(name);
    }
  };

  if (!props.checkinData?.total_checkin_initiated) {
    return { nodes, links };
  }

  const initiated = props.checkinData.total_checkin_initiated || 0;

  addNode("Initiated by agent", { value: initiated });
  addNode("Check In Started");
  // Shared: closed = PSS accepted; completed = BP issued
  addNode("Check In Success");
  addNode("Boarding Pass Issued");

  const init = props.checkinData.total_record_locator_init || 0;
  const abandonedInit =
    props.checkinData.total_record_locator_init_abandoned || 0;
  const preInitAbandonedErrorRaw =
    props.checkinData.total_checkin_pre_init_abandoned_error;
  const preInitAbandonedVoluntaryRaw =
    props.checkinData.total_checkin_pre_init_abandoned_voluntary;
  const hasPreInitAbandonedSplit =
    (preInitAbandonedErrorRaw !== null &&
      preInitAbandonedErrorRaw !== undefined) ||
    (preInitAbandonedVoluntaryRaw !== null &&
      preInitAbandonedVoluntaryRaw !== undefined);
  const preInitAbandonedError = hasPreInitAbandonedSplit
    ? Math.max(Number(preInitAbandonedErrorRaw) || 0, 0)
    : 0;
  const preInitAbandonedVoluntary = hasPreInitAbandonedSplit
    ? Math.max(Number(preInitAbandonedVoluntaryRaw) || 0, 0)
    : 0;
  const abandonedErrorRaw =
    props.checkinData.total_record_locator_init_abandoned_error;
  const abandonedVoluntaryRaw =
    props.checkinData.total_record_locator_init_abandoned_voluntary;
  const hasAbandonedSplit =
    (abandonedErrorRaw !== null && abandonedErrorRaw !== undefined) ||
    (abandonedVoluntaryRaw !== null && abandonedVoluntaryRaw !== undefined);
  const abandonedError = hasAbandonedSplit
    ? Math.max(Number(abandonedErrorRaw) || 0, 0)
    : 0;
  const abandonedVoluntary = hasAbandonedSplit
    ? Math.max(Number(abandonedVoluntaryRaw) || 0, 0)
    : 0;
  const abandonedStartedFallback = hasAbandonedSplit
    ? Math.max(abandonedInit - abandonedError - abandonedVoluntary, 0)
    : abandonedInit;
  const bookingSuccess = Math.max(init - abandonedInit, 0);
  const started = props.checkinData.total_record_locator_started || 0;
  const completed = props.checkinData.total_record_locator_completed || 0;
  const closed = props.checkinData.total_record_locator_closed || 0;
  const totalUnrecovered =
    props.checkinData.total_record_locator_unrecovered || 0;

  // Collapsed funnel: Checkin Init -> Booking Retrieved | unified abandon | unified error
  const abandonedBeforeInit = Math.max(initiated - init, 0);
  const unifiedPreRetrievedError =
    preInitAbandonedError + abandonedError;
  const unifiedPreRetrievedAbandon = hasPreInitAbandonedSplit
    ? preInitAbandonedVoluntary +
      (hasAbandonedSplit
        ? abandonedVoluntary + abandonedStartedFallback
        : abandonedInit)
    : abandonedBeforeInit +
      (hasAbandonedSplit
        ? abandonedVoluntary + abandonedStartedFallback
        : abandonedInit);

  if (bookingSuccess > 0) {
    links.push({
      source: "Initiated by agent",
      target: "Check In Started",
      value: bookingSuccess,
      label: formatSankeyLinkLabel(bookingSuccess, initiated),
    });
  }

  if (unifiedPreRetrievedAbandon > 0) {
    addNode("Abandoned: No booking provided", { status: "abandon" });
    links.push({
      source: "Initiated by agent",
      target: "Abandoned: No booking provided",
      value: unifiedPreRetrievedAbandon,
      label: formatSankeyLinkLabel(unifiedPreRetrievedAbandon, initiated),
    });
  }

  const retrievalUserErrorRaw =
    props.checkinData.total_checkin_retrieval_user_error;
  const retrievalBusinessRuleRaw =
    props.checkinData.total_checkin_retrieval_business_rule;
  const retrievalTechErrorRaw =
    props.checkinData.total_checkin_retrieval_tech_error;
  const retrievalUnknownErrorRaw =
    props.checkinData.total_checkin_retrieval_unknown_error;
  const hasRetrievalErrorSplit =
    retrievalUserErrorRaw != null ||
    retrievalBusinessRuleRaw != null ||
    retrievalTechErrorRaw != null ||
    retrievalUnknownErrorRaw != null;

  const addRetrievalErrorNode = (
    name: string,
    raw: number | null | undefined,
  ): void => {
    const value = Math.max(Number(raw) || 0, 0);
    if (value > 0) {
      addNode(name, { status: "error" });
      links.push({
        source: "Initiated by agent",
        target: name,
        value,
        label: formatSankeyLinkLabel(value, initiated),
      });
    }
  };

  if (hasRetrievalErrorSplit) {
    addRetrievalErrorNode("Error: User error", retrievalUserErrorRaw);
    addRetrievalErrorNode("Error: Business rule", retrievalBusinessRuleRaw);
    addRetrievalErrorNode("Error: Tech error", retrievalTechErrorRaw);
    addRetrievalErrorNode("Error: Unknown error", retrievalUnknownErrorRaw);
  } else if (unifiedPreRetrievedError > 0) {
    addNode("Error: On Retrieval", { status: "error" });
    links.push({
      source: "Initiated by agent",
      target: "Error: On Retrieval",
      value: unifiedPreRetrievedError,
      label: formatSankeyLinkLabel(unifiedPreRetrievedError, initiated),
    });
  }

  // Shared funnel: Check-in Closed (PSS) → BP Issued | BP Error | Abandoned after Closed
  // Applies to AV and KIU: closed happens before BP emission; abandon between them is possible.
  if (closed > 0) {
    links.push({
      source: "Check In Started",
      target: "Check In Success",
      value: closed,
      label: formatSankeyLinkLabel(closed, initiated),
    });
  }

  const rawBpFailed = getBoardingPassFailedCount(props.failedData);
  const bpFailed = Math.min(rawBpFailed, Math.max(closed - completed, 0));

  if (completed > 0) {
    links.push({
      source: "Check In Success",
      target: "Boarding Pass Issued",
      value: completed,
      label: formatSankeyLinkLabel(completed, initiated),
    });
  }

  if (bpFailed > 0) {
    addNode("Error: BP Not Issued", { status: "error" });
    links.push({
      source: "Check In Success",
      target: "Error: BP Not Issued",
      value: bpFailed,
      label: formatSankeyLinkLabel(bpFailed, initiated),
    });
  }

  const abandonedAfterClosed = Math.max(closed - completed - bpFailed, 0);
  if (abandonedAfterClosed > 0) {
    // AV keeps Abandoned after Closed distinct from flow abandon (before Closed).
    const afterClosedNode = props.isAvianca
      ? "Abandoned after Closed"
      : "Abandoned: Check In Incomplete";
    addNode(afterClosedNode, { status: "abandon" });
    links.push({
      source: "Check In Success",
      target: afterClosedNode,
      value: abandonedAfterClosed,
      label: formatSankeyLinkLabel(abandonedAfterClosed, initiated),
    });
  }

  // Unrecovered excludes closed reservations; these failed before PSS close
  if (totalUnrecovered > 0) {
    addNode("Error: On Check In Process", { status: "error" });
    links.push({
      source: "Check In Started",
      target: "Error: On Check In Process",
      value: totalUnrecovered,
      label: formatSankeyLinkLabel(totalUnrecovered, initiated),
    });
  }

  const abandonedBeforeClosed = Math.max(started - closed - totalUnrecovered, 0);
  if (abandonedBeforeClosed > 0) {
    addNode("Abandoned: Check In Incomplete", { status: "abandon" });
    links.push({
      source: "Check In Started",
      target: "Abandoned: Check In Incomplete",
      value: abandonedBeforeClosed,
      label: formatSankeyLinkLabel(abandonedBeforeClosed, initiated),
    });
  }

  return { nodes, links };
});

// Expose isDark for potential use in templates
defineExpose({ isDark });
</script>

<style scoped>
/* Card Body */
.card-body {
  animation: fadeIn 0.5s ease-out;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Sankey Section */
.sankey-section {
  margin-bottom: 32px;
}

/* Bloque tabla diaria (celdas: reasons-list, cell-success, etc.) */
.checkin-metrics-daily-section {
  margin-top: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reasons-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.reason-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
}

.reason-name {
  color: var(--kiut-text-secondary);
}

.reason-count {
  font-weight: 600;
  color: var(--kiut-danger);
}

.no-reasons {
  color: var(--kiut-text-muted);
  text-align: center;
}

.cell-success {
  color: #059669 !important;
  font-weight: 600;
}

.cell-danger {
  color: #dc2626 !important;
  font-weight: 600;
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
}

.empty-state-content {
  text-align: center;
  max-width: 360px;
  animation: fadeIn 0.6s ease-out;
}

.empty-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: var(--kiut-bg-empty-icon);
  border-radius: 20px;
  margin: 0 auto 20px;
  box-shadow: var(--kiut-shadow-empty-icon);
}

.empty-icon {
  width: 40px;
  height: 40px;
  color: var(--kiut-primary);
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--kiut-text-primary);
  margin: 0 0 8px 0;
  letter-spacing: -0.01em;
}

.empty-description {
  font-size: 14px;
  font-weight: 400;
  color: var(--kiut-text-secondary);
  line-height: 1.6;
  margin: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
