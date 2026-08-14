<template>
  <ChartMetricContainer
    class="ancillaries-metrics-root h-full min-h-0"
    title="Ancillaries"
    subtitle="Ancillary offer conversion funnel"
    :default-open="initiallyOpen"
    :loading="props.loading"
  >
    <div class="card-body">
      <section v-if="sankeyData.nodes.length > 0" class="chart-section">
        <div class="chart-wrapper">
          <SankeyChart :data="sankeyData" height="420px" :node-gap="16" />
        </div>
      </section>

      <section v-else class="empty-state">
        <div class="empty-state-content">
          <p class="empty-title">No ancillaries data available</p>
          <p class="empty-description">
            No ancillary funnel events found for the selected period. Try
            adjusting the date range.
          </p>
        </div>
      </section>

      <section class="ancillaries-value-cards">
        <CardInfo
          class="ancillaries-value-card"
          color="var(--kiut-success)"
          title="Ancillaries CR"
          :value="formattedCr"
        />
        <CardInfo
          class="ancillaries-value-card"
          color="var(--kiut-primary, #5d4b93)"
          title="Offered"
          :value="useNumberFormat(offered)"
        />
        <CardInfo
          class="ancillaries-value-card"
          color="var(--kiut-success)"
          title="Selected"
          :value="useNumberFormat(selected)"
        />
        <CardInfo
          class="ancillaries-value-card"
          color="var(--kiut-primary, #5d4b93)"
          title="Paid"
          :value="useNumberFormat(paid)"
        />
        <CardInfo
          class="ancillaries-value-card"
          color="var(--kiut-error, #ef4444)"
          title="Declined"
          :value="useNumberFormat(declined)"
        />
      </section>

      <section
        v-if="tableRows.length > 0"
        class="ancillaries-daily-section"
      >
        <div class="w-full min-w-0">
          <Table
            :columns="tableColumns"
            :rows="tableRows"
            :max-visible-rows="3"
            row-key="id"
          >
            <template #cell-date="{ row }">
              <span class="sl-cell font-medium">{{
                moment(String(row.date)).format("MMM DD")
              }}</span>
            </template>
            <template #cell-offered="{ row }">
              <span class="sl-cell text-center">{{
                useNumberFormat(Number(row.offered_count) || 0)
              }}</span>
            </template>
            <template #cell-selected="{ row }">
              <span class="sl-cell text-center">{{
                useNumberFormat(Number(row.selected_count) || 0)
              }}</span>
            </template>
            <template #cell-paid="{ row }">
              <span class="sl-cell text-center">{{
                useNumberFormat(Number(row.paid_count) || 0)
              }}</span>
            </template>
            <template #cell-declined="{ row }">
              <span class="sl-cell text-center">{{
                useNumberFormat(Number(row.declined_count) || 0)
              }}</span>
            </template>
            <template #cell-reasons="{ row }">
              <div
                v-if="(dayFromRow(row).reasons || []).length > 0"
                class="failed-reasons"
              >
                <div
                  v-for="reason in dayFromRow(row).reasons || []"
                  :key="reason.reason"
                  class="failed-reason-item"
                >
                  <span class="reason-name">{{ reason.reason }}:</span>
                  <span class="reason-count">{{ reason.count }}</span>
                </div>
              </div>
              <div v-else class="empty-cell">-</div>
            </template>
          </Table>
        </div>
      </section>
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
import { useNumberFormat } from "../../../../plugins/numberFormat";
import {
  useThemeDetection,
  type Theme,
} from "../../../../composables/useThemeDetection";
import Table, { type TableColumn } from "../../Utils/Table/Table.vue";
import CardInfo from "../../Utils/CardInfo/CardInfo.vue";

interface DeclinedReason {
  reason: string;
  count: number;
}

interface AncillariesDayData {
  date: string;
  offered_count: number;
  selected_count: number;
  declined_count: number;
  paid_count?: number;
  reasons?: DeclinedReason[];
}

interface AncillariesData {
  total_ancillaries_offered: number;
  total_ancillaries_selected: number;
  total_ancillaries_declined: number;
  total_ancillaries_paid?: number;
  ancillaries_cr: number;
  declined_by_reason?: DeclinedReason[];
  ancillaries_by_day: AncillariesDayData[];
  declined_by_reason_by_day?: {
    date: string;
    reasons: DeclinedReason[];
  }[];
}

function dayFromRow(r: Record<string, unknown>): AncillariesDayData {
  return r as unknown as AncillariesDayData;
}

const props = withDefaults(
  defineProps<{
    ancillariesData?: AncillariesData;
    loading?: boolean;
    theme?: Theme;
    initiallyOpen?: boolean;
  }>(),
  {
    ancillariesData: () => ({
      total_ancillaries_offered: 0,
      total_ancillaries_selected: 0,
      total_ancillaries_declined: 0,
      total_ancillaries_paid: 0,
      ancillaries_cr: 0,
      declined_by_reason: [],
      ancillaries_by_day: [],
      declined_by_reason_by_day: [],
    }),
    loading: false,
    theme: undefined,
    initiallyOpen: true,
  },
);

const { isDark } = useThemeDetection(toRef(props, "theme"));

const offered = computed(
  () => props.ancillariesData?.total_ancillaries_offered || 0,
);
const selected = computed(
  () => props.ancillariesData?.total_ancillaries_selected || 0,
);
const declined = computed(
  () => props.ancillariesData?.total_ancillaries_declined || 0,
);
const paid = computed(
  () => props.ancillariesData?.total_ancillaries_paid || 0,
);
const ancillariesCr = computed(
  () => props.ancillariesData?.ancillaries_cr || 0,
);
const formattedCr = computed(
  () => `${Number(ancillariesCr.value || 0).toFixed(1)}%`,
);

const humanizeReason = (reason: string): string =>
  reason
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formatDeclineNodeLabel = (reason: string): string =>
  `Declined:\n${humanizeReason(reason)}`;

const sankeyData = computed(() => {
  const offeredCount = offered.value;
  const selectedCount = selected.value;
  const declinedCount = declined.value;
  const paidCount = paid.value;
  const declinedByReason = props.ancillariesData?.declined_by_reason || [];

  if (offeredCount === 0) return { nodes: [], links: [] };

  const nodes: {
    name: string;
    value: number;
    status?: "success" | "abandon" | "error";
    label?: string;
  }[] = [
    { name: "Offered", value: offeredCount, status: "success" },
    { name: "Selected", value: selectedCount, status: "success" },
  ];

  const links: {
    source: string;
    target: string;
    value: number;
    label: string;
  }[] = [];

  if (selectedCount > 0) {
    links.push({
      source: "Offered",
      target: "Selected",
      value: selectedCount,
      label: formatSankeyLinkLabel(selectedCount, offeredCount),
    });
  }

  if (paidCount > 0) {
    nodes.push({ name: "Paid", value: paidCount, status: "success" });
    const paidSource = selectedCount > 0 ? "Selected" : "Offered";
    const paidDenom = selectedCount > 0 ? selectedCount : offeredCount;
    links.push({
      source: paidSource,
      target: "Paid",
      value: paidCount,
      label: formatSankeyLinkLabel(paidCount, paidDenom),
    });
  }

  const reasonTotals = declinedByReason.reduce(
    (acc, item) => {
      if (item.count > 0) {
        acc[item.reason] = (acc[item.reason] || 0) + item.count;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const reasonSum = Object.values(reasonTotals).reduce((sum, n) => sum + n, 0);
  const declinedWithoutReason = Math.max(0, declinedCount - reasonSum);

  Object.entries(reasonTotals)
    .sort(([, a], [, b]) => b - a)
    .forEach(([reason, count]) => {
      const nodeName = `Declined: ${reason}`;
      nodes.push({
        name: nodeName,
        value: count,
        status: "error",
        label: formatDeclineNodeLabel(reason),
      });
      links.push({
        source: "Offered",
        target: nodeName,
        value: count,
        label: formatSankeyLinkLabel(count, offeredCount),
      });
    });

  if (declinedWithoutReason > 0) {
    nodes.push({
      name: "Declined: Without Reason",
      value: declinedWithoutReason,
      status: "error",
      label: "Declined:\nWithout Reason",
    });
    links.push({
      source: "Offered",
      target: "Declined: Without Reason",
      value: declinedWithoutReason,
      label: formatSankeyLinkLabel(declinedWithoutReason, offeredCount),
    });
  }

  const noResponse = Math.max(
    0,
    offeredCount - selectedCount - declinedCount,
  );
  if (noResponse > 0) {
    nodes.push({
      name: "No Response",
      value: noResponse,
      status: "abandon",
    });
    links.push({
      source: "Offered",
      target: "No Response",
      value: noResponse,
      label: formatSankeyLinkLabel(noResponse, offeredCount),
    });
  }

  return { nodes, links };
});

const tableData = computed(() => {
  const days = [...(props.ancillariesData?.ancillaries_by_day || [])];
  const reasonsByDay = props.ancillariesData?.declined_by_reason_by_day || [];

  reasonsByDay.forEach((dayReasons) => {
    const idx = days.findIndex((d) => d.date === dayReasons.date);
    if (idx !== -1) {
      days[idx] = { ...days[idx], reasons: dayReasons.reasons };
    } else {
      days.push({
        date: dayReasons.date,
        offered_count: 0,
        selected_count: 0,
        declined_count: 0,
        paid_count: 0,
        reasons: dayReasons.reasons,
      });
    }
  });

  return days.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
});

const tableColumns = computed<TableColumn[]>(() => [
  { key: "date", label: "Date", align: "center" },
  { key: "offered", label: "Offered", align: "center" },
  { key: "selected", label: "Selected", align: "center" },
  { key: "paid", label: "Paid", align: "center" },
  { key: "declined", label: "Declined", align: "center" },
  { key: "reasons", label: "Decline Reasons", align: "left" },
]);

const tableRows = computed((): Record<string, unknown>[] =>
  tableData.value.map((row) => ({
    id: row.date,
    ...row,
  })),
);

defineExpose({
  isDark,
  formatSankeyPercentage,
});
</script>

<style scoped>
.card-body {
  animation: fadeIn 0.5s ease-out;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 0;
}

.chart-section,
.chart-wrapper {
  width: 100%;
  min-width: 0;
}

.ancillaries-value-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  padding: 1.5rem;
}

.empty-state-content {
  text-align: center;
}

.empty-title {
  font-weight: 600;
  margin-bottom: 0.35rem;
}

.empty-description {
  opacity: 0.7;
  font-size: 0.9rem;
}

.failed-reasons {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.failed-reason-item {
  display: flex;
  gap: 0.35rem;
  font-size: 0.85rem;
}

.reason-name {
  opacity: 0.75;
}

.empty-cell {
  opacity: 0.45;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
