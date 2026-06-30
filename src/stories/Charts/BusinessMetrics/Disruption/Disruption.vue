<template>
  <ChartMetricContainer
    class="disruption-metrics-root h-full min-h-0"
    title="Disruption Manager Metrics"
    subtitle="Disruption workflow performance and completion tracking"
    :loading="loading"
  >
    <template #headerExport>
      <FooterExport
        v-if="enableExport && !props.loading"
        variant="inline"
        @export="handleExport"
        :loading="exportLoading"
      />
    </template>
    <div class="card-body">
      <!-- Sankey Visualization -->
      <section class="chart-section">
        <div class="chart-wrapper">
          <SankeyChart
            v-if="sankeyData.nodes.length > 0 && sankeyData.links.length > 0"
            :data="sankeyData"
            height="500px"
            :use-gradient="false"
            :node-gap="24"
          />
          <div v-else class="empty-chart">
            <p class="empty-chart-text">
              No disruption data available for visualization
            </p>
          </div>
        </div>
      </section>

      <section class="payment-success-summary">
        <CardInfo
          color="#22c55e"
          title="Payment Success Value"
          :value="paymentSuccessCardValue"
        />
      </section>

      <!-- Daily Overview Table (chrome de tabla: Utils/Table) -->
      <section
        v-if="tableData && tableData.length > 0"
        class="disruption-daily-section"
      >
        <div class="section-header">
          <h4 class="section-title">Daily Overview</h4>
        </div>

        <div class="w-full min-w-0">
          <Table
            :columns="disruptionTableColumns"
            :rows="disruptionTableRows"
            :max-visible-rows="3"
            row-key="id"
          >
            <template #cell-date="{ row }">
              <span class="font-medium text-center">{{
                moment(String(row.date)).format("MMM DD")
              }}</span>
            </template>
            <template #cell-initiated="{ row }">
              <span class="text-center">{{
                useNumberFormat(Number(row.disruption_conversations))
              }}</span>
            </template>
            <template #cell-started="{ row }">
              <span class="text-center">
                {{ useNumberFormat(Number(row.disruption_initiated_count)) }}
                <span class="percentage-text">
                  ({{
                    calculatePercentage(
                      Number(row.disruption_initiated_count),
                      Number(row.disruption_conversations),
                    )
                  }})
                </span>
              </span>
            </template>
            <template #cell-abandoned="{ row }">
              <span class="text-center">
                <span class="abandoned-value">
                  {{
                    useNumberFormat(
                      Number(row.disruption_initiated_count) -
                        Number(row.voluntary_count) -
                        Number(row.involuntary_count),
                    )
                  }}
                  ({{
                    calculatePercentage(
                      Number(row.disruption_initiated_count) -
                        Number(row.voluntary_count) -
                        Number(row.involuntary_count),
                      Number(row.disruption_conversations),
                    )
                  }})
                </span>
              </span>
            </template>
            <template #cell-voluntary="{ row }">
              <div class="badges-container badges-wrap">
                <template
                  v-for="(r, i) in [disruptionDayFromRow(row)]"
                  :key="i"
                >
                  <Tag color="neutral" :outlined="true">
                    VOL {{ useNumberFormat(r.voluntary_count) }} ({{
                      calculatePercentage(
                        r.voluntary_count,
                        r.disruption_conversations,
                      )
                    }})
                  </Tag>
                  <Tag color="success">
                    Confirm {{ useNumberFormat(r.confirmed_count) }} ({{
                      calculatePercentage(
                        r.confirmed_count,
                        r.disruption_conversations,
                      )
                    }})
                  </Tag>
                  <Tag color="warning">
                    Not Confirm
                    {{
                      useNumberFormat(r.voluntary_count - r.confirmed_count)
                    }}
                    ({{
                      calculatePercentage(
                        r.voluntary_count - r.confirmed_count,
                        r.disruption_conversations,
                      )
                    }})
                  </Tag>
                  <Tag color="danger">
                    Reject {{ useNumberFormat(r.sell_failed_count) }} ({{
                      calculatePercentage(
                        r.sell_failed_count,
                        r.disruption_conversations,
                      )
                    }})
                  </Tag>
                  <Tag color="orange">
                    Not Paid
                    {{
                      useNumberFormat(
                        Math.max(
                          0,
                          r.confirmed_count -
                            getSellSuccessCount(r) -
                            r.sell_failed_count,
                        ),
                      )
                    }}
                    ({{
                      calculatePercentage(
                        Math.max(
                          0,
                          r.confirmed_count -
                            getSellSuccessCount(r) -
                            r.sell_failed_count,
                        ),
                        r.disruption_conversations,
                      )
                    }})
                  </Tag>
                  <Tag color="success" :outlined="true">
                    Finish {{ useNumberFormat(getSellSuccessCount(r)) }} ({{
                      calculatePercentage(
                        getSellSuccessCount(r),
                        r.disruption_conversations,
                      )
                    }})
                  </Tag>
                  <Tag
                    v-for="item in r.payment_success_total || []"
                    :key="`${r.date}-${item.currency}`"
                    color="neutral"
                  >
                    {{ item.currency }} {{ formatCurrency(item.total_value) }}
                  </Tag>
                </template>
              </div>
            </template>
            <template #cell-involuntary="{ row }">
              <div class="badges-container badges-wrap">
                <template
                  v-for="(r, i) in [disruptionDayFromRow(row)]"
                  :key="i"
                >
                  <Tag color="purple">
                    INV {{ useNumberFormat(r.involuntary_count) }} ({{
                      calculatePercentage(
                        r.involuntary_count,
                        r.disruption_conversations,
                      )
                    }})
                  </Tag>
                  <Tag color="danger">
                    Human
                    {{
                      useNumberFormat(r.involuntary_count - r.accepted_count)
                    }}
                    ({{
                      calculatePercentage(
                        r.involuntary_count - r.accepted_count,
                        r.disruption_conversations,
                      )
                    }})
                  </Tag>
                  <Tag color="success">
                    Accept {{ useNumberFormat(r.accepted_count) }} ({{
                      calculatePercentage(
                        r.accepted_count,
                        r.disruption_conversations,
                      )
                    }})
                  </Tag>
                </template>
              </div>
            </template>
          </Table>
        </div>
      </section>

      <!-- Empty State -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <svg
              class="empty-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p class="empty-title">No disruption data available</p>
          <p class="empty-description">
            No disruption data found for the selected period. Try adjusting the
            date range.
          </p>
        </div>
      </section>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import moment from "moment";
import {
  useCurrencyFormat,
  useNumberFormat,
} from "../../../../plugins/numberFormat";
import Tag from "../../../../components/Tag/Tag.vue";
import SankeyChart from "../../Sankey/SankeyChart.vue";
import { formatSankeyLinkLabel, formatSankeyPercentage } from "../../Sankey/sankeyFormatters";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";
import CardInfo from "../../Utils/CardInfo/CardInfo.vue";
import { FooterExport, type ExportFormat } from "../../Utils/FooterExport";
import Table, { type TableColumn } from "../../Utils/Table/Table.vue";

interface DisruptionDayData {
  date: string;
  disruption_conversations: number;
  disruption_initiated_count: number;
  voluntary_count: number;
  involuntary_count: number;
  accepted_count: number;
  confirmed_count: number;
  sell_success_count?: number;
  sell_failed_count: number;
  payment_success_total?: TotalPaymentSuccess[];
}

interface TotalPaymentSuccess {
  total_value: number;
  currency: string;
  count: number;
}

interface DisruptionData {
  total_disruption_conversations: number;
  total_disruption_initiated: number;
  total_voluntary: number;
  total_involuntary: number;
  total_accepted: number;
  total_confirmed: number;
  total_sell_success?: number;
  total_sell_failed: number;
  total_finished: number;
  total_payment_success?: TotalPaymentSuccess[];
  disruption_by_day: DisruptionDayData[];
}

function disruptionDayFromRow(r: Record<string, unknown>): DisruptionDayData {
  return r as unknown as DisruptionDayData;
}

const props = withDefaults(
  defineProps<{
    data?: DisruptionData;
    loading?: boolean;
    enableExport?: boolean;
    exportLoading?: boolean;
  }>(),
  {
    data: () => ({
      total_disruption_conversations: 0,
      total_disruption_initiated: 0,
      total_voluntary: 0,
      total_involuntary: 0,
      total_accepted: 0,
      total_confirmed: 0,
      total_sell_success: 0,
      total_sell_failed: 0,
      total_finished: 0,
      total_payment_success: [],
      disruption_by_day: [],
    }),
    loading: false,
    enableExport: false,
    exportLoading: false,
  },
);

const emit = defineEmits<{
  export: [format: ExportFormat];
}>();

const handleExport = (format: ExportFormat) => {
  emit("export", format);
};

// Computed para ordenar los datos por día
const tableData = computed(() => {
  if (!props.data?.disruption_by_day) return [];
  return [...props.data.disruption_by_day].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
});

const disruptionTableColumns: TableColumn[] = [
  { key: "date", label: "Date", align: "center" },
  { key: "initiated", label: "Initiated", align: "center" },
  { key: "started", label: "Started", align: "center" },
  { key: "abandoned", label: "Abandoned (%)", align: "center" },
  { key: "voluntary", label: "Voluntary", align: "left" },
  { key: "involuntary", label: "Involuntary", align: "left" },
];

const disruptionTableRows = computed((): Record<string, unknown>[] =>
  tableData.value.map((row) => ({
    id: row.date,
    ...row,
  })),
);

const totalPaymentSuccessByCurrency = computed(() => {
  return props.data?.total_payment_success || [];
});

const paymentSuccessCardValue = computed(() => {
  const items = totalPaymentSuccessByCurrency.value;
  if (items.length === 0) return formatCurrency(0);
  return items
    .map((item) => `${item.currency} ${formatCurrency(item.total_value)}`)
    .join(" · ");
});

const calculatePercentage = (value: number, total: number): string =>
  formatSankeyPercentage(value, total);

const formatCurrency = (value: number): string => {
  return useCurrencyFormat(value);
};

const getPaymentSuccessCount = (payments?: TotalPaymentSuccess[]): number => {
  return (payments ?? []).reduce((total, item) => total + (item.count ?? 0), 0);
};

const getSellSuccessCount = (row: DisruptionDayData): number => {
  if (typeof row.sell_success_count === "number") {
    return row.sell_success_count;
  }

  return getPaymentSuccessCount(row.payment_success_total);
};

const sankeyData = computed(() => {
  const data = props.data;
  const conversations = data.total_disruption_conversations || 0;
  const initiated = data.total_disruption_initiated || 0;
  const voluntary = data.total_voluntary || 0;
  const involuntary = data.total_involuntary || 0;
  const accepted = data.total_accepted || 0;
  const confirmed = data.total_confirmed || 0;
  const sellSuccess =
    typeof data.total_sell_success === "number"
      ? data.total_sell_success
      : getPaymentSuccessCount(data.total_payment_success);
  const sellFailed = data.total_sell_failed || 0;

  // Calculate abandoned and other derived values
  const abandonedFromConversations = Math.max(0, conversations - initiated);
  const abandonedFromInitiated = Math.max(
    0,
    initiated - voluntary - involuntary,
  );
  const notAccepted = Math.max(0, involuntary - accepted);
  const notConfirmed = Math.max(0, voluntary - confirmed);
  const rejected = sellFailed;
  const notPaid = Math.max(0, confirmed - sellSuccess - rejected);

  // Helper function to format label with percentage
  const formatLabel = (value: number, total: number): string =>
    formatSankeyLinkLabel(value, total);

  // Define nodes
  const nodes = [
    { name: "Initiated", status: "success" as const },
    { name: "Started", status: "success" as const },
    { name: "Voluntary", status: "success" as const },
    { name: "Confirmed", status: "success" as const },
    { name: "Paid", status: "success" as const },
    { name: "Not Paid", status: "abandon" as const },
    { name: "Rejected", status: "error" as const },
    { name: "Not Confirmed", status: "abandon" as const },
    { name: "Involuntary", status: "success" as const },
    { name: "Accepted", status: "success" as const },
    { name: "Redirect to Human", status: "error" as const },
    { name: "Abandoned (Init)", status: "abandon" as const },
    { name: "Abandoned (Start)", status: "abandon" as const },
  ];

  // Define links with flows
  const links: {
    source: string;
    target: string;
    value: number;
    label: string;
  }[] = [];

  // First level: Conversations splits
  if (initiated > 0) {
    links.push({
      source: "Initiated",
      target: "Started",
      value: initiated,
      label: formatLabel(initiated, conversations),
    });
  }
  if (abandonedFromConversations > 0) {
    links.push({
      source: "Initiated",
      target: "Abandoned (Init)",
      value: abandonedFromConversations,
      label: formatLabel(abandonedFromConversations, conversations),
    });
  }

  // Second level: Initiated splits
  if (voluntary > 0) {
    links.push({
      source: "Started",
      target: "Voluntary",
      value: voluntary,
      label: formatLabel(voluntary, conversations),
    });
  }
  if (involuntary > 0) {
    links.push({
      source: "Started",
      target: "Involuntary",
      value: involuntary,
      label: formatLabel(involuntary, conversations),
    });
  }
  if (abandonedFromInitiated > 0) {
    links.push({
      source: "Started",
      target: "Abandoned (Start)",
      value: abandonedFromInitiated,
      label: formatLabel(abandonedFromInitiated, conversations),
    });
  }

  // Third level: Involuntary splits
  if (accepted > 0) {
    links.push({
      source: "Involuntary",
      target: "Accepted",
      value: accepted,
      label: formatLabel(accepted, conversations),
    });
  }
  if (notAccepted > 0) {
    links.push({
      source: "Involuntary",
      target: "Redirect to Human",
      value: notAccepted,
      label: formatLabel(notAccepted, conversations),
    });
  }

  // Third level: Voluntary splits
  if (confirmed > 0) {
    links.push({
      source: "Voluntary",
      target: "Confirmed",
      value: confirmed,
      label: formatLabel(confirmed, conversations),
    });
  }
  if (notConfirmed > 0) {
    links.push({
      source: "Voluntary",
      target: "Not Confirmed",
      value: notConfirmed,
      label: formatLabel(notConfirmed, conversations),
    });
  }

  // Fourth level: Confirmed splits
  if (sellSuccess > 0) {
    links.push({
      source: "Confirmed",
      target: "Paid",
      value: sellSuccess,
      label: formatLabel(sellSuccess, conversations),
    });
  }
  if (rejected > 0) {
    links.push({
      source: "Confirmed",
      target: "Rejected",
      value: rejected,
      label: formatLabel(rejected, conversations),
    });
  }
  if (notPaid > 0) {
    links.push({
      source: "Confirmed",
      target: "Not Paid",
      value: notPaid,
      label: formatLabel(notPaid, conversations),
    });
  }

  return { nodes, links };
});
</script>

<style scoped>
/* Card Body */
.card-body {
  animation: fadeIn 0.5s ease-out;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Chart Section */
.chart-section {
  margin-bottom: 12px;
  animation: fadeIn 0.5s ease-out;
}

.empty-chart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.empty-chart-text {
  color: var(--kiut-text-secondary);
  font-size: 0.875rem;
}

.payment-success-summary {
  margin-bottom: 28px;
  max-width: 28rem;
  margin-inline: auto;
}

.section-header {
  margin-bottom: 16px;
}

.section-title {
  font-family: "Space Grotesk", "DM Sans", sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--kiut-text-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

/* Bloque Daily Overview (tabla; celdas con Tag) */
.disruption-daily-section {
  animation: fadeIn 0.6s ease-out 0.1s backwards;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.percentage-text {
  color: var(--kiut-text-secondary);
  font-size: 0.75rem;
}

.abandoned-value {
  color: var(--kiut-text-secondary);
  font-size: 0.8125rem;
}

.badges-container {
  display: flex;
  gap: 6px;
}

.badges-wrap {
  flex-wrap: wrap;
  align-items: center;
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
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
  background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);
  border-radius: 20px;
  margin: 0 auto 20px;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.15);
}

.empty-icon {
  width: 40px;
  height: 40px;
  color: #f97316;
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

/* Responsive Design */
@media (max-width: 1024px) {
  .badges-container {
    min-width: 280px;
  }
}

@media (max-width: 768px) {
  .chart-wrapper {
    padding: 16px;
  }
}
</style>
