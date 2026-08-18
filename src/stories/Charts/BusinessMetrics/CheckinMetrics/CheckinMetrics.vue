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

interface FailedData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  total_checkin_failed?: number;
  total_checkin_unrecovered?: number;
  total_checkin_init_abandoned?: number;
  failed_by_step_by_day?: FailedByDay[];
  unrecovered_by_step_by_day?: UnrecoveredByStepByDay[];
  unrecovered_by_step?: UnrecoveredByStep[];
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
    /** Avianca-specific Sankey labels (abandon node naming). */
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
  margin-bottom: 0;
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
