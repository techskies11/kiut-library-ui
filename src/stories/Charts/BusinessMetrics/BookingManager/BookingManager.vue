<template>
  <ChartMetricContainer
    class="booking-manager-root h-full min-h-0"
    title="Booking Manager Metrics"
    subtitle="Booking manager workflow tracking and analysis"
    :loading="loading"
    lazy-mount
    @open="emit('open')"
  >
    <template #headerExport>
      <FooterExport
        v-if="enableExport && !props.loading && !props.error"
        variant="inline"
        @export="handleExport"
        :loading="exportLoading"
      />
    </template>
    <Transition name="bm-fade" mode="out-in">
      <div v-if="props.error" key="error" class="error-state">
        <div class="error-content">
          <div class="error-icon-wrapper">
            <svg
              class="error-icon"
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
          <p class="error-title">Error loading data</p>
          <p class="error-description">{{ props.error }}</p>
        </div>
      </div>

      <div v-else key="content" class="card-body">
      <!-- Sankey Flow Chart -->
      <section class="chart-section">
        <div class="chart-wrapper">
          <SankeyChart
            :data="sankeyData"
            height="500px"
            :use-gradient="false"
            :node-gap="24"
          />
        </div>
      </section>

      <section class="payment-success-summary">
        <CardInfo
          color="#22c55e"
          title="Payment Success Value"
          :value="paymentSuccessCardValue"
        />
      </section>

      <!-- Daily Overview Table -->
      <section v-if="sortedDayData.length > 0" class="booking-daily-section">
        <div class="section-header">
          <h4 class="section-title">Daily Overview</h4>
        </div>
        <div class="w-full min-w-0">
          <Table
            :columns="bookingManagerColumns"
            :rows="bookingManagerTableRows"
            :max-visible-rows="3"
            row-key="id"
          >
            <template #cell-date="{ row }">
              <span class="font-medium">{{
                moment(String(row.date)).format("MMM DD")
              }}</span>
            </template>
            <template #cell-initiated="{ row }">
              <span>{{
                useNumberFormat(Number(row.booking_initiated_count))
              }}</span>
            </template>
            <template #cell-started="{ row }">
              <span>
                {{ useNumberFormat(Number(row.booking_started_count)) }}
                <span class="percentage-text">
                  ({{
                    calculatePercentage(
                      Number(row.booking_started_count),
                      Number(row.booking_initiated_count),
                    )
                  }})
                </span>
              </span>
            </template>
            <template #cell-paymentInitiated="{ row }">
              <span>{{
                useNumberFormat(Number(row.payment_initiated_count))
              }}</span>
            </template>
            <template #cell-paymentResults="{ row }">
              <div class="badges-container">
                <Tag color="success">
                  Success:
                  {{
                    useNumberFormat(
                      getPaymentSuccessCount(bookingDayFromRow(row)),
                    )
                  }}
                </Tag>
                <Tag color="danger">
                  Failed:
                  {{ useNumberFormat(Number(row.payment_failed_count) || 0) }}
                </Tag>
              </div>
            </template>
            <template #cell-paymentValue="{ row }">
              <template
                v-if="
                  getPaymentSuccessValueByCurrency(bookingDayFromRow(row))
                    .length > 0
                "
              >
                <div class="badges-container">
                  <span
                    v-for="item in getPaymentSuccessValueByCurrency(
                      bookingDayFromRow(row),
                    )"
                    :key="`${row.date}-${item.currency}`"
                    class="badge badge-currency"
                  >
                    {{ item.currency }} {{ formatCurrency(item.total_value) }}
                  </span>
                </div>
              </template>
              <span v-else class="percentage-text">N/A</span>
            </template>
            <template #cell-outcomes="{ row }">
              <div class="badges-container">
                <Tag color="danger">
                  Not Found:
                  {{
                    row.not_found_count
                      ? useNumberFormat(Number(row.not_found_count))
                      : "N/A"
                  }}
                </Tag>
                <Tag color="warning">
                  Cancelled:
                  {{
                    row.cancelled_count
                      ? useNumberFormat(Number(row.cancelled_count))
                      : "N/A"
                  }}
                </Tag>
                <Tag color="orange">
                  No Balance:
                  {{
                    row.no_pending_balance_count
                      ? useNumberFormat(Number(row.no_pending_balance_count))
                      : "N/A"
                  }}
                </Tag>
                <Tag color="danger">
                  Errors:
                  {{
                    row.error_count
                      ? useNumberFormat(Number(row.error_count))
                      : "N/A"
                  }}
                </Tag>
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p class="empty-title">No booking manager data available</p>
          <p class="empty-description">
            No booking manager data found for the selected period. Try adjusting
            the date range.
          </p>
        </div>
      </section>
    </div>
    </Transition>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import moment from "moment";
import SankeyChart from "../../Sankey/SankeyChart.vue";
import { formatSankeyLinkLabel, formatSankeyPercentage } from "../../Sankey/sankeyFormatters";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";
import CardInfo from "../../Utils/CardInfo/CardInfo.vue";
import Tag from "../../../../components/Tag/Tag.vue";
import { FooterExport, type ExportFormat } from "../../Utils/FooterExport";
import {
  useCurrencyFormat,
  useCompactCurrencyFormat,
  useNumberFormat,
} from "../../../../plugins/numberFormat";
import Table, { type TableColumn } from "../../Utils/Table/Table.vue";

interface BookingDayData {
  date: string;
  booking_initiated_count: number;
  booking_started_count: number;
  payment_initiated_count: number;
  not_found_count: number;
  cancelled_count: number;
  no_pending_balance_count: number;
  error_count: number;
  payment_success_count?: number;
  payment_failed_count: number;
  payment_success_value?: BookingManagerCurrencyBreakdown[];
}

function bookingDayFromRow(row: Record<string, unknown>): BookingDayData {
  return row as unknown as BookingDayData;
}

interface BookingData {
  total_booking_initiated: number;
  total_booking_started: number;
  total_payment_initiated: number;
  total_not_found: number;
  total_cancelled: number;
  total_no_pending_balance: number;
  total_errors: number;
  total_payment_success?: number;
  total_payment_failed: number;
  total_payment_success_value?: BookingManagerCurrencyBreakdown[];
  total_sell_usd?: number;
  booking_manager_by_day: BookingDayData[];
}

interface BookingManagerCurrencyBreakdown {
  currency: string;
  total_value: number;
  count: number;
}

const props = withDefaults(
  defineProps<{
    data?: BookingData;
    loading?: boolean;
    error?: string | null;
    enableExport?: boolean;
    exportLoading?: boolean;
  }>(),
  {
    data: () => ({
      total_booking_initiated: 0,
      total_booking_started: 0,
      total_payment_initiated: 0,
      total_not_found: 0,
      total_cancelled: 0,
      total_no_pending_balance: 0,
      total_errors: 0,
      total_payment_success: 0,
      total_payment_failed: 0,
      total_payment_success_value: [],
      booking_manager_by_day: [],
    }),
    loading: false,
    error: null,
    enableExport: false,
    exportLoading: false,
  },
);

const emit = defineEmits<{
  open: [];
  export: [format: ExportFormat];
}>();

const handleExport = (format: ExportFormat) => {
  emit("export", format);
};

// Computed para ordenar los datos por día
const sortedDayData = computed(() => {
  if (!props.data?.booking_manager_by_day) return [];
  return [...props.data.booking_manager_by_day].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
});

const bookingManagerColumns: TableColumn[] = [
  { key: "date", label: "Date", align: "center" },
  { key: "initiated", label: "Initiated", align: "center" },
  { key: "started", label: "Started", align: "center" },
  { key: "paymentInitiated", label: "Payment Initiated", align: "center" },
  { key: "paymentResults", label: "Payment Results", align: "left" },
  { key: "paymentValue", label: "Payment Value", align: "left" },
  { key: "outcomes", label: "Outcomes", align: "left" },
];

const bookingManagerTableRows = computed((): Record<string, unknown>[] =>
  sortedDayData.value.map((day) => ({
    id: day.date,
    ...day,
  })),
);

const totalPaymentSuccessValueByCurrency = computed(() => {
  return props.data?.total_payment_success_value || [];
});

const paymentSuccessCardValue = computed(() => {
  const items = totalPaymentSuccessValueByCurrency.value;
  if (items.length === 0) return formatCompactCurrency(0);
  return items
    .map(
      (item) => `${item.currency} ${formatCompactCurrency(item.total_value)}`,
    )
    .join(" · ");
});

const getPaymentSuccessValueByCurrency = (
  day: BookingDayData,
): BookingManagerCurrencyBreakdown[] => {
  return day.payment_success_value || [];
};

const getPaymentSuccessCount = (day: BookingDayData): number => {
  if (typeof day.payment_success_count === "number") {
    return day.payment_success_count;
  }
  return (day.payment_success_value || []).reduce(
    (total, item) => total + (item.count || 0),
    0,
  );
};

const formatCurrency = (value: number): string => {
  return useCurrencyFormat(value);
};

const formatCompactCurrency = (value: number | undefined | null): string => {
  if (value === null || value === undefined) return "0";
  return useCompactCurrencyFormat(value);
};

const totalPaymentSuccessUsd = computed(() => {
  return (props.data?.total_payment_success_value || []).reduce(
    (sum, item) => sum + (item.total_value || 0),
    0,
  );
});

const sankeyData = computed(() => {
  const data = props.data;
  const initiated = data.total_booking_initiated || 0;
  const started = data.total_booking_started || 0;
  const paymentInitiated = data.total_payment_initiated || 0;
  const notFound = data.total_not_found || 0;
  const cancelled = data.total_cancelled || 0;
  const noPendingBalance = data.total_no_pending_balance || 0;
  const errors = data.total_errors || 0;
  const paymentSuccess =
    typeof data.total_payment_success === "number"
      ? data.total_payment_success
      : (data.total_payment_success_value || []).reduce(
          (total, item) => total + (item.count || 0),
          0,
        );
  const paymentFailed = data.total_payment_failed || 0;

  // Calculate abandoned values
  const abandonedFromInitiated = Math.max(0, initiated - started);
  const abandonedFromStarted = Math.max(
    0,
    started -
      paymentInitiated -
      notFound -
      cancelled -
      noPendingBalance -
      errors,
  );

  // Helper function to format label with percentage
  const formatLabel = (value: number, total: number): string =>
    formatSankeyLinkLabel(value, total);

  // Define nodes
  const nodes = [
    { name: "Initiated", status: "success" as const },
    { name: "Started", status: "success" as const },
    { name: "Payment Initiated", status: "success" as const },
    { name: "Not Found", status: "error" as const },
    { name: "Cancelled", status: "abandon" as const },
    { name: "No Pending Balance", status: "abandon" as const },
    { name: "Errors", status: "error" as const },
    { name: "Payment Success", status: "success" as const },
    { name: "Payment Failed", status: "error" as const },
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

  // First level: Initiated splits
  if (started > 0) {
    links.push({
      source: "Initiated",
      target: "Started",
      value: started,
      label: formatLabel(started, initiated),
    });
  }

  if (abandonedFromInitiated > 0) {
    links.push({
      source: "Initiated",
      target: "Abandoned (Init)",
      value: abandonedFromInitiated,
      label: formatLabel(abandonedFromInitiated, initiated),
    });
  }

  // Second level: Started splits
  if (paymentInitiated > 0) {
    links.push({
      source: "Started",
      target: "Payment Initiated",
      value: paymentInitiated,
      label: formatLabel(paymentInitiated, started),
    });
  }

  if (notFound > 0) {
    links.push({
      source: "Started",
      target: "Not Found",
      value: notFound,
      label: formatLabel(notFound, started),
    });
  }

  if (cancelled > 0) {
    links.push({
      source: "Started",
      target: "Cancelled",
      value: cancelled,
      label: formatLabel(cancelled, started),
    });
  }

  if (noPendingBalance > 0) {
    links.push({
      source: "Started",
      target: "No Pending Balance",
      value: noPendingBalance,
      label: formatLabel(noPendingBalance, started),
    });
  }

  if (errors > 0) {
    links.push({
      source: "Started",
      target: "Errors",
      value: errors,
      label: formatLabel(errors, started),
    });
  }

  if (abandonedFromStarted > 0) {
    links.push({
      source: "Started",
      target: "Abandoned (Start)",
      value: abandonedFromStarted,
      label: formatLabel(abandonedFromStarted, started),
    });
  }

  // Third level: Payment Initiated splits
  if (paymentSuccess > 0) {
    links.push({
      source: "Payment Initiated",
      target: "Payment Success",
      value: paymentSuccess,
      label: formatLabel(paymentSuccess, paymentInitiated),
    });
  }

  if (paymentFailed > 0) {
    links.push({
      source: "Payment Initiated",
      target: "Payment Failed",
      value: paymentFailed,
      label: formatLabel(paymentFailed, paymentInitiated),
    });
  }

  return { nodes, links };
});

const calculatePercentage = (value: number, total: number): string =>
  formatSankeyPercentage(value, total);
</script>

<style scoped>
.payment-success-summary {
  margin-bottom: 28px;
  max-width: 28rem;
  margin-inline: auto;
}

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

/* Section Header */
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

/* Bloque Daily Overview (la tabla usa estilos del Utils Table) */
.booking-daily-section {
  animation: fadeIn 0.6s ease-out 0.1s backwards;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.percentage-text {
  color: var(--kiut-text-secondary);
  font-size: 0.8125rem;
}

/* Badges */
.badges-container {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-currency {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1d4ed8;
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
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border-radius: 20px;
  margin: 0 auto 20px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.empty-icon {
  width: 40px;
  height: 40px;
  color: #3b82f6;
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

/* Error State */
.error-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
}

.error-content {
  text-align: center;
  max-width: 360px;
  animation: fadeIn 0.6s ease-out;
}

.error-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border-radius: 20px;
  margin: 0 auto 20px;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
}

.error-icon {
  width: 40px;
  height: 40px;
  color: #ef4444;
}

.error-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--kiut-text-primary);
  margin: 0 0 8px 0;
  letter-spacing: -0.01em;
}

.error-description {
  font-size: 14px;
  font-weight: 400;
  color: var(--kiut-text-secondary);
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.retry-button {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 10px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.retry-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
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
    min-width: 200px;
  }
}

@media (max-width: 768px) {
  .chart-wrapper {
    padding: 16px;
  }
}
</style>
<style>
@import "../bm-shared.css";
</style>