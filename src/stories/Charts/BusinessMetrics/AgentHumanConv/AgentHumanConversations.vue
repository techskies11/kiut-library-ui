<template>
  <ChartMetricContainer
    class="agent-human-conv-root h-full min-h-0"
    title="Agent Human Conversations"
    subtitle="Human conversation assignments and closures by agent"
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
    <Transition name="bm-fade" mode="out-in">
      <div
        v-if="loading"
        key="loading"
        class="card-body loading-body"
        :class="{ 'agent-human-conv--dark': isDark }"
        aria-busy="true"
        aria-label="Loading agent human conversations"
      >
        <div
          class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 md:gap-4"
          aria-hidden="true"
        >
          <CardMetric
            v-for="n in 4"
            :key="`kpi-skeleton-${n}`"
            label="Loading"
            value=""
            label-position="header"
            :loading="true"
            :theme="theme"
          />
        </div>

        <section
          class="table-skeleton mt-6 w-full min-w-0"
          aria-hidden="true"
        >
          <div class="table-skeleton__header">
            <div class="table-skeleton__titles">
              <div class="bm-skeleton-blink skeleton-section-title" />
              <div class="bm-skeleton-blink skeleton-section-subtitle" />
            </div>
            <div class="bm-skeleton-blink skeleton-table-select" />
          </div>

          <div class="table-skeleton__table">
            <div class="bm-skeleton-blink skeleton-table-head" />
            <div
              v-for="n in TABLE_SKELETON_ROWS"
              :key="`table-row-skeleton-${n}`"
              class="bm-skeleton-blink skeleton-table-row"
            />
          </div>

          <div class="bm-skeleton-blink skeleton-view-more" />
        </section>
      </div>

      <div v-else key="content" class="card-body">
        <div
          v-if="hasData"
          class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 md:gap-4"
          :class="{ 'agent-human-conv--dark': isDark }"
        >
          <CardMetric
            label="Conversations Opened"
            label-position="header"
            :value="formatNumber(totalEnqueued)"
            :theme="theme"
            :current-value="totalEnqueued"
            :previous-value="previousTotalEnqueued"
          >
            <template #icon>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            </template>
          </CardMetric>

          <CardMetric
            label="Conversations Closed"
            label-position="header"
            :value="formatNumber(totalClosed)"
            :theme="theme"
            :current-value="totalClosed"
            :previous-value="previousTotalClosed"
          >
            <template #icon>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </template>
            <template #value>
              <div class="kpi-closed-value">
                <span class="kpi-closed-value__main">{{
                  formatNumber(totalClosed)
                }}</span>
                <span v-if="closedPctLabel" class="kpi-closed-value__pct">{{
                  closedPctLabel
                }}</span>
              </div>
            </template>
          </CardMetric>

          <CardMetric
            label="Avg Time to Assign"
            label-position="header"
            :value="formatDurationSeconds(avgAssignSeconds)"
            :theme="theme"
            :current-value="avgAssignSeconds ?? 0"
            :previous-value="previousAvgTimeToAssignSeconds"
          >
            <template #icon>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </template>
            <template v-if="assignDurationTrend" #headerAside>
              <div :class="['duration-trend-badge', assignDurationTrend.class]">
                {{ assignDurationTrend.label }}
              </div>
            </template>
          </CardMetric>

          <CardMetric
            label="Avg Resolution Time"
            label-position="header"
            :value="formatDurationSeconds(avgResolutionSeconds)"
            :theme="theme"
            :current-value="avgResolutionSeconds ?? 0"
            :previous-value="previousAvgConversationDurationSeconds"
          >
            <template #icon>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </template>
            <template v-if="resolutionDurationTrend" #headerAside>
              <div
                :class="['duration-trend-badge', resolutionDurationTrend.class]"
              >
                {{ resolutionDurationTrend.label }}
              </div>
            </template>
          </CardMetric>
        </div>

        <ChartMetricContainer
          v-if="hasAgentRows"
          class="agent-table-section mt-6"
          title="Conversations Managed by Agent"
          subtitle="Daily performance per human agent"
          :collapsible="false"
        >
          <template #headerAside>
            <div class="flex justify-end">
              <select
                v-model="tableViewMode"
                class="rounded-xl border border-[var(--kiut-border-light,#d1d5db)] bg-[var(--kiut-bg-card,#ffffff)] px-3 py-2 text-sm text-[var(--kiut-text-primary,#111827)] dark:border-[var(--kiut-border-light,#374151)] dark:bg-[var(--kiut-bg-card,#111827)] dark:text-[var(--kiut-text-primary,#f9fafb)]"
              >
                <option value="by_date">By date</option>
                <option value="aggregated">Aggregated</option>
              </select>
            </div>
          </template>

          <div class="table-section w-full min-w-0">
            <Table
              :columns="agentTableColumns"
              :rows="visibleTableRows"
              :sort-key="sortKey"
              :sort-direction="sortDirection"
              row-key="id"
              @sort="onSortColumn"
            >
              <template #cell-date="{ row }">
                <span class="ah-cell name-cell">{{
                  formatCompactDate(String(row.date))
                }}</span>
              </template>
              <template #cell-name="{ row }">
                <span class="ah-cell name-cell">{{
                  formatAgentName(row.agent_name as string | null)
                }}</span>
              </template>
              <template #cell-email="{ row }">
                <span class="ah-cell email-cell">{{ row.agent_email }}</span>
              </template>
              <template #cell-handled="{ row }">
                <span class="ah-cell">{{
                  formatNumber(Number(row.handled))
                }}</span>
              </template>
              <template #cell-avgAssignation="{ row }">
                <span class="ah-cell">{{
                  formatDurationSeconds(
                    row.avg_assignation_seconds as number | null,
                  )
                }}</span>
              </template>
              <template #cell-avgResolution="{ row }">
                <span class="ah-cell">{{
                  formatDurationSeconds(
                    row.avg_resolution_seconds as number | null,
                  )
                }}</span>
              </template>
            </Table>

            <button
              v-if="tableHasMoreRows"
              type="button"
              class="view-more-btn"
              @click="showAllTableRows = !showAllTableRows"
            >
              {{
                showAllTableRows
                  ? "View less"
                  : `View more (${hiddenTableRowCount} rows)`
              }}
              <svg
                :class="[
                  'view-more-icon',
                  { 'view-more-icon-rotated': showAllTableRows },
                ]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </ChartMetricContainer>

        <div v-else-if="!hasData" class="empty-state">
          <div class="empty-state-content">
            <div class="empty-icon-wrapper">
              <svg
                class="empty-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <p class="empty-title">No agent human conversation data available</p>
            <p class="empty-description">
              Try adjusting the date range or check your filters.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, ref, toRef, watch } from "vue";
import { useNumberFormat } from "../../../../plugins/numberFormat";
import {
  useThemeDetection,
  type Theme,
} from "../../../../composables/useThemeDetection";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";
import CardMetric from "../../Utils/CardMetric/CardMetric.vue";
import { FooterExport, type ExportFormat } from "../../Utils/FooterExport";
import Table, {
  type TableColumn,
  type TableSortDirection,
} from "../../../../components/Table/Table.vue";

interface AgentDayData {
  date: string;
  agent_email: string;
  agent_name?: string | null;
  agent_tag?: string | null;
  assigned_count: number;
  closed_count: number;
  avg_time_to_assign_seconds?: number | null;
  avg_conversation_duration_seconds?: number | null;
  day_total_assigned?: number;
  day_total_closed?: number;
  day_total_enqueued?: number;
  day_avg_time_to_assign_seconds?: number | null;
  day_avg_conversation_duration_seconds?: number | null;
}

interface AgentHumanConvData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  total_assigned?: number;
  total_closed?: number;
  total_enqueued?: number;
  avg_time_to_assign_seconds?: number | null;
  avg_conversation_duration_seconds?: number | null;
  agents_by_day?: AgentDayData[];
}

interface AgentTableRow {
  id: string;
  date?: string;
  dateSort?: number;
  agent_name: string;
  agent_email: string;
  handled: number;
  avg_assignation_seconds: number | null;
  avg_resolution_seconds: number | null;
}

type TableViewMode = "by_date" | "aggregated";
type SortKey =
  | "date"
  | "name"
  | "email"
  | "handled"
  | "avgAssignation"
  | "avgResolution";

const props = withDefaults(
  defineProps<{
    data?: AgentHumanConvData;
    loading?: boolean;
    theme?: Theme;
    enableExport?: boolean;
    exportLoading?: boolean;
    previousTotalEnqueued?: number | null;
    previousTotalClosed?: number | null;
    previousAvgTimeToAssignSeconds?: number | null;
    previousAvgConversationDurationSeconds?: number | null;
  }>(),
  {
    data: () => ({
      total_assigned: 0,
      total_closed: 0,
      total_enqueued: 0,
      avg_time_to_assign_seconds: null,
      avg_conversation_duration_seconds: null,
      agents_by_day: [],
    }),
    loading: false,
    theme: undefined,
    enableExport: false,
    exportLoading: false,
    previousTotalEnqueued: null,
    previousTotalClosed: null,
    previousAvgTimeToAssignSeconds: null,
    previousAvgConversationDurationSeconds: null,
  },
);

const emit = defineEmits<{
  export: [format: ExportFormat];
}>();

const handleExport = (format: ExportFormat) => {
  emit("export", format);
};

const { isDark } = useThemeDetection(toRef(props, "theme"));

const PLACEHOLDER_EMAILS = new Set(["—", "-", "–", ""]);

function isValidAgentEmail(email: string | null | undefined): boolean {
  const normalized = email?.trim() ?? "";
  return normalized.length > 0 && !PLACEHOLDER_EMAILS.has(normalized);
}

/** Filas con agente identificable y actividad (asignación o cierre). */
function isDisplayableAgentRow(agent: AgentDayData): boolean {
  if (!isValidAgentEmail(agent.agent_email)) return false;
  const assigned = agent.assigned_count ?? 0;
  const closed = agent.closed_count ?? 0;
  return assigned > 0 || closed > 0;
}

function getHandledCount(agent: AgentDayData): number {
  return (agent.assigned_count ?? 0) + (agent.closed_count ?? 0);
}

function formatAgentName(name: string | null | undefined): string {
  const normalized = name?.trim();
  return normalized ? normalized : "—";
}

const displayAgentRows = computed(() =>
  (props.data?.agents_by_day ?? []).filter(isDisplayableAgentRow),
);

const hasAgentRows = computed(() => displayAgentRows.value.length > 0);

const hasData = computed(() => {
  const hasEnqueued = (props.data?.total_enqueued ?? 0) > 0;
  return hasAgentRows.value || hasEnqueued;
});

const tableViewMode = ref<TableViewMode>("by_date");
const sortKey = ref<SortKey>("date");
const sortDirection = ref<TableSortDirection>("desc");
const showAllTableRows = ref(false);

const MAX_VISIBLE_ROWS = 6;
const TABLE_SKELETON_ROWS = MAX_VISIBLE_ROWS;

watch(tableViewMode, (mode) => {
  showAllTableRows.value = false;
  if (mode === "aggregated") {
    sortKey.value = "name";
    sortDirection.value = "asc";
  } else {
    sortKey.value = "date";
    sortDirection.value = "desc";
  }
});

function computeChangePercent(
  current: number,
  previous: number | null | undefined,
): number | null {
  if (previous === null || previous === undefined) return null;
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

function formatChangeLabel(percent: number): string {
  const pct = percent.toFixed(1);
  if (percent > 0) return `+${pct}%`;
  return `${pct}%`;
}

function trendBadgeClass(
  percent: number,
  lowerIsBetter = false,
): string {
  const effective = lowerIsBetter ? -percent : percent;
  if (effective > 0) return "change-badge--up";
  if (effective < 0) return "change-badge--down";
  return "change-badge--neutral";
}

function buildDurationTrend(
  current: number | null,
  previous: number | null | undefined,
): { label: string; class: string } | null {
  if (current === null) return null;
  const change = computeChangePercent(current, previous);
  if (change === null) return null;
  return {
    label: formatChangeLabel(change),
    class: trendBadgeClass(change, true),
  };
}

const totalEnqueued = computed(() => props.data?.total_enqueued ?? 0);
const totalClosed = computed(() => props.data?.total_closed ?? 0);
const avgAssignSeconds = computed(
  () => props.data?.avg_time_to_assign_seconds ?? null,
);
const avgResolutionSeconds = computed(
  () => props.data?.avg_conversation_duration_seconds ?? null,
);

const closedPctLabel = computed(() => {
  if (totalEnqueued.value <= 0) return null;
  const pct = ((totalClosed.value / totalEnqueued.value) * 100).toFixed(1);
  return `(${pct}%)`;
});

const assignDurationTrend = computed(() =>
  buildDurationTrend(
    avgAssignSeconds.value,
    props.previousAvgTimeToAssignSeconds,
  ),
);

const resolutionDurationTrend = computed(() =>
  buildDurationTrend(
    avgResolutionSeconds.value,
    props.previousAvgConversationDurationSeconds,
  ),
);

function mapAgentToRow(agent: AgentDayData, index: number): AgentTableRow {
  return {
    id: `${agent.date}-${agent.agent_email}-${index}`,
    date: agent.date,
    dateSort: new Date(agent.date).getTime(),
    agent_name: agent.agent_name ?? "",
    agent_email: agent.agent_email,
    handled: getHandledCount(agent),
    avg_assignation_seconds: agent.avg_time_to_assign_seconds ?? null,
    avg_resolution_seconds: agent.avg_conversation_duration_seconds ?? null,
  };
}

function aggregateAgents(agents: AgentDayData[]): AgentTableRow[] {
  const map = new Map<
    string,
    {
      agent_name: string;
      agent_email: string;
      handled: number;
      assignSum: number;
      assignWeight: number;
      resolutionSum: number;
      resolutionWeight: number;
    }
  >();

  for (const agent of agents) {
    if (!isDisplayableAgentRow(agent)) continue;

    const key = agent.agent_email.trim();
    if (!map.has(key)) {
      map.set(key, {
        agent_name: agent.agent_name?.trim() ?? "",
        agent_email: key,
        handled: 0,
        assignSum: 0,
        assignWeight: 0,
        resolutionSum: 0,
        resolutionWeight: 0,
      });
    }

    const acc = map.get(key)!;
    const assigned = agent.assigned_count ?? 0;
    const closed = agent.closed_count ?? 0;
    acc.handled += getHandledCount(agent);

    if (agent.agent_name?.trim()) {
      acc.agent_name = agent.agent_name.trim();
    }

    if (agent.avg_time_to_assign_seconds != null && assigned > 0) {
      acc.assignSum += agent.avg_time_to_assign_seconds * assigned;
      acc.assignWeight += assigned;
    }

    if (agent.avg_conversation_duration_seconds != null && closed > 0) {
      acc.resolutionSum += agent.avg_conversation_duration_seconds * closed;
      acc.resolutionWeight += closed;
    }
  }

  return Array.from(map.values()).map((acc, index) => ({
    id: `agg-${acc.agent_email}-${index}`,
    agent_name: acc.agent_name,
    agent_email: acc.agent_email,
    handled: acc.handled,
    avg_assignation_seconds:
      acc.assignWeight > 0 ? acc.assignSum / acc.assignWeight : null,
    avg_resolution_seconds:
      acc.resolutionWeight > 0
        ? acc.resolutionSum / acc.resolutionWeight
        : null,
  }));
}

const baseTableRows = computed<AgentTableRow[]>(() => {
  const agents = displayAgentRows.value;
  if (tableViewMode.value === "aggregated") {
    return aggregateAgents(agents);
  }
  return agents.map(mapAgentToRow);
});

function compareRows(
  a: AgentTableRow,
  b: AgentTableRow,
  key: SortKey,
  direction: TableSortDirection,
): number {
  const dir = direction === "asc" ? 1 : -1;
  let cmp = 0;

  switch (key) {
    case "date":
      cmp = (a.dateSort ?? 0) - (b.dateSort ?? 0);
      break;
    case "name":
      cmp = (a.agent_name || "").localeCompare(b.agent_name || "", undefined, {
        sensitivity: "base",
      });
      break;
    case "email":
      cmp = a.agent_email.localeCompare(b.agent_email, undefined, {
        sensitivity: "base",
      });
      break;
    case "handled":
      cmp = a.handled - b.handled;
      break;
    case "avgAssignation":
      cmp =
        (a.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY) -
        (b.avg_assignation_seconds ?? Number.NEGATIVE_INFINITY);
      break;
    case "avgResolution":
      cmp =
        (a.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY) -
        (b.avg_resolution_seconds ?? Number.NEGATIVE_INFINITY);
      break;
  }

  if (cmp !== 0) return cmp * dir;

  if (tableViewMode.value === "by_date" && key !== "date") {
    const dateCmp = (b.dateSort ?? 0) - (a.dateSort ?? 0);
    if (dateCmp !== 0) return dateCmp;
  }

  return (a.agent_name || "").localeCompare(b.agent_name || "", undefined, {
    sensitivity: "base",
  });
}

const sortedTableRows = computed(() => {
  const rows = [...baseTableRows.value];
  rows.sort((a, b) => compareRows(a, b, sortKey.value, sortDirection.value));
  return rows;
});

const agentTableColumns = computed<TableColumn[]>(() => {
  const cols: TableColumn[] = [];

  if (tableViewMode.value === "by_date") {
    cols.push({
      key: "date",
      label: "Date",
      align: "left",
      sortable: true,
    });
  }

  cols.push(
    { key: "name", label: "Name", align: "left", sortable: true },
    { key: "email", label: "Email", align: "left", sortable: true },
    { key: "handled", label: "Handled", align: "center", sortable: true },
    {
      key: "avgAssignation",
      label: "Avg Assignation",
      align: "center",
      sortable: true,
    },
    {
      key: "avgResolution",
      label: "Avg Resolution",
      align: "center",
      sortable: true,
    },
  );

  return cols;
});

const hiddenTableRowCount = computed(() =>
  Math.max(0, sortedTableRows.value.length - MAX_VISIBLE_ROWS),
);

const tableHasMoreRows = computed(
  () => sortedTableRows.value.length > MAX_VISIBLE_ROWS,
);

const visibleTableRows = computed((): Record<string, unknown>[] => {
  const rows =
    showAllTableRows.value || !tableHasMoreRows.value
      ? sortedTableRows.value
      : sortedTableRows.value.slice(0, MAX_VISIBLE_ROWS);
  return rows as unknown as Record<string, unknown>[];
});

function onSortColumn(key: string): void {
  const sortableKey = key as SortKey;
  showAllTableRows.value = false;

  if (sortKey.value === sortableKey) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    return;
  }

  sortKey.value = sortableKey;
  if (sortableKey === "date") {
    sortDirection.value = "desc";
  } else if (sortableKey === "name" || sortableKey === "email") {
    sortDirection.value = "asc";
  } else {
    sortDirection.value = "desc";
  }
}

const formatNumber = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return "0";
  return useNumberFormat(value);
};

const formatDurationSeconds = (value: number | null | undefined): string => {
  if (value === undefined || value === null) {
    return "—";
  }
  if (value < 60) {
    return `${Math.round(value)}s`;
  }

  const totalSeconds = Math.round(value);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes < 60) {
    return `${minutes}m ${seconds}s`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

const formatCompactDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

defineExpose({ isDark });
</script>

<style scoped>
@import "../view-more-cta.css";

.card-body {
  animation: fadeIn 0.5s ease-out;
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.loading-body {
  animation: none;
}

.table-skeleton__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.table-skeleton__titles {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 8px;
}

.skeleton-section-title {
  width: min(100%, 260px);
  height: 20px;
  border-radius: 8px;
}

.skeleton-section-subtitle {
  width: min(100%, 220px);
  height: 14px;
  border-radius: 6px;
}

.skeleton-table-select {
  width: 120px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 12px;
}

.table-skeleton__table {
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid var(--kiut-border-light, #e5e7eb);
  background: var(--kiut-bg-secondary, #ffffff);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.skeleton-table-head {
  height: 48px;
  border-radius: 0;
}

.skeleton-table-row {
  height: 56px;
  border-radius: 0;
  border-top: 1px solid var(--kiut-border-light, #e5e7eb);
}

.skeleton-table-row:last-child {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.skeleton-view-more {
  width: 148px;
  height: 14px;
  margin-top: 10px;
  border-radius: 6px;
}

:global(.dark) .table-skeleton__table,
.agent-human-conv--dark .table-skeleton__table {
  border-color: var(--kiut-border-light, #2d2d39);
  background: var(--kiut-bg-secondary, #141419);
}

:global(.dark) .skeleton-table-row,
.agent-human-conv--dark .skeleton-table-row {
  border-top-color: var(--kiut-border-light, #2d2d39);
}

.agent-table-section {
  padding: 0;
  background: transparent;
  border: none;
}

.agent-table-section :deep(.chart-metric-container) {
  padding: 0;
  background: transparent;
}

.kpi-closed-value {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  gap: 8px;
  flex-wrap: wrap;
  text-align: left;
}

.kpi-closed-value__main {
  font-family:
    "Inter",
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--kiut-text-primary);
}

.kpi-closed-value__pct {
  font-family:
    "Inter",
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  color: #9191a1;
}

.duration-trend-badge {
  font-family:
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif),
    "Inter",
    sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
  line-height: 1;
  letter-spacing: 0.01em;
}

.duration-trend-badge.change-badge--up {
  background: #dcfce7;
  color: #166534;
}

.duration-trend-badge.change-badge--down {
  background: #fee2e2;
  color: #b91c1c;
}

.duration-trend-badge.change-badge--neutral {
  background: rgba(148, 163, 184, 0.16);
  color: #64748b;
}

:global(.dark) .duration-trend-badge.change-badge--up,
:global(.dark-mode) .duration-trend-badge.change-badge--up,
.agent-human-conv--dark .duration-trend-badge.change-badge--up {
  background: #162d24;
  color: #4ade80;
}

:global(.dark) .duration-trend-badge.change-badge--down,
:global(.dark-mode) .duration-trend-badge.change-badge--down,
.agent-human-conv--dark .duration-trend-badge.change-badge--down {
  background: #3f1d20;
  color: #fb7185;
}

:global(.dark) .duration-trend-badge.change-badge--neutral,
:global(.dark-mode) .duration-trend-badge.change-badge--neutral,
.agent-human-conv--dark .duration-trend-badge.change-badge--neutral {
  background: rgba(148, 163, 184, 0.12);
  color: #94a3b8;
}

.table-section {
  display: flex;
  flex-direction: column;
}

.ah-cell {
  display: inline-block;
  width: 100%;
  font-size: 0.875rem;
  color: var(--kiut-text-primary);
}

.name-cell {
  font-weight: 500;
  text-align: left !important;
  white-space: nowrap;
}

.email-cell {
  text-align: left !important;
  color: var(--kiut-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  flex: 1;
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

@media (max-width: 768px) {
  .table-skeleton__header {
    flex-direction: column;
    align-items: stretch;
  }

  .skeleton-table-select {
    width: 100%;
  }

  .email-cell {
    max-width: 150px;
  }
}
</style>
<style>
@import "../bm-shared.css";
</style>
