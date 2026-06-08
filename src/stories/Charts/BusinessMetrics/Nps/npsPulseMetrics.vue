<template>
  <ChartMetricContainer
    class="nps-pulse-root h-full min-h-0"
    title="CSAT Pulse"
    subtitle="Weighted index: Σ(frequency × weight) / total surveys × 100"
    :collapsible="false"
    :loading="props.loading"
  >
    <Transition name="bm-fade" mode="out-in">
      <div
        v-if="props.loading"
        key="loading"
        class="bm-status shrink-0"
        aria-busy="true"
        aria-label="Loading chart"
      >
        <div class="flex-1 bm-skeleton-blink" aria-hidden="true"></div>
      </div>

      <div v-else key="content">
        <div v-if="hasPulseData" class="card-body">
          <ChartLine
            :data="lineData"
            :options="lineOptions"
            :uppercase-legend-labels="true"
          />
        </div>

        <div v-else class="empty-state">
          <p class="empty-title">No CSAT Pulse data available</p>
          <p class="empty-description">
            No CSAT pulse points were found for the selected date range.
          </p>
        </div>
      </div>
    </Transition>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ChartLine from "../../Line/ChartLine.vue";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const pulseByDay = computed(() => props.data?.csat_pulse_by_day || []);
const hasPulseData = computed(() => pulseByDay.value.length > 0);

const lineData = computed(() => ({
  labels: pulseByDay.value.map((point: any) => point.date || ""),
  datasets: [
    {
      label: "CSAT Pulse",
      data: pulseByDay.value.map((point: any) => Number(point.csat_pulse || 0)),
      borderColor: "#2563EB",
      pointBorderColor: "#2563EB",
      pointBackgroundColor: "#FFFFFF",
      tension: 0.25,
    },
  ],
}));

const lineOptions = {
  scales: {
    y: {
      min: -200,
      max: 100,
      ticks: {
        callback: (value: number) => `${value}%`,
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.parsed.y.toFixed(2)}%`,
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