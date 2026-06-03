<template>
  <ChartMetricContainer
    class="nps-daily-root h-full min-h-0"
    title="CSAT P95 by Date"
    subtitle="Daily P95 trend for CSAT responses"
    :collapsible="false"
    :loading="props.loading"
  >
    <template #headerExport>
      <FooterExport
        v-if="enableExport && !props.loading"
        variant="inline"
        @export="handleExport"
        :loading="exportLoading"
      />
    </template>

    <div
      v-if="props.loading"
      class="bm-status shrink-0"
      aria-busy="true"
      aria-label="Loading chart"
    >
      <div class="flex-1 bm-skeleton-blink" aria-hidden="true"></div>
    </div>

    <div v-else-if="hasData" class="card-body">
      <ChartLine
        :data="lineData"
        :options="lineOptions"
        :uppercase-legend-labels="true"
      />
    </div>

    <div v-else class="empty-state">
      <p class="empty-title">No daily CSAT P95 available</p>
      <p class="empty-description">
        No CSAT P95 points were found for the selected date range.
      </p>
    </div>
  </ChartMetricContainer>
</template>

<script setup>
import { computed } from "vue";
import moment from "moment";
import ChartLine from "../../Line/ChartLine.vue";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";
import { FooterExport } from "../../Utils/FooterExport";

const emit = defineEmits(["export"]);

const handleExport = (format) => {
  emit("export", format);
};

const props = defineProps({
  data: {
    type: Object,
    default: () => null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  enableExport: {
    type: Boolean,
    default: false,
  },
  exportLoading: {
    type: Boolean,
    default: false,
  },
});

const series = computed(() => props.data?.csat_p95_by_day || []);
const hasData = computed(() => series.value.length > 0);

const lineData = computed(() => ({
  labels: series.value.map((point) => moment(point.date).format("DD-MM-YYYY")),
  datasets: [
    {
      label: "CSAT P95",
      data: series.value.map((point) => Number(point.p95_score || 0)),
      borderColor: "#7C3AED",
      pointBorderColor: "#7C3AED",
      pointBackgroundColor: "#FFFFFF",
      tension: 0.25,
    },
  ],
}));

const lineOptions = {
  scales: {
    y: {
      min: 0,
      max: 11,
      ticks: {
        callback: (value) => Number(value).toFixed(2),
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => context.parsed.y.toFixed(2),
      },
    },
  },
};
</script>

<style scoped>
.card-body {
  animation: fadeIn 0.5s ease-out;
}

.bm-status,
.empty-state {
  min-height: 220px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--kiut-text-primary);
  margin-bottom: 8px;
}

.empty-description {
  font-size: 14px;
  color: var(--kiut-text-secondary);
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
<style>
@import "../bm-shared.css";
</style>