<template>
  <ChartMetricContainer
    class="nps-resolution-root min-h-0"
    title="CSAT Resolution"
    subtitle="Resolution answers distribution (1=Si, 2=No)"
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
        <div v-if="hasResolutionData" class="card-body">
          <ChartBar
            :data="barData"
            :options="barOptions"
            :uppercase-legend-labels="true"
          />
        </div>

        <div v-else class="empty-state">
          <p class="empty-title">No resolution answers available</p>
          <p class="empty-description">
            This airline has the resolution survey configured, but no responses were
            found for the selected dates.
          </p>
        </div>
      </div>
    </Transition>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ChartBar from "../../Bar/ChartBar.vue";
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

const resolutionBreakdown = computed(
  () => props.data?.resolution_breakdown || [],
);
const hasResolutionData = computed(() =>
  resolutionBreakdown.value.some((item: any) => Number(item.count || 0) > 0),
);

const barData = computed(() => {
  const rows = resolutionBreakdown.value;
  return {
    labels: rows.map((item: any) => item.label || String(item.score)),
    datasets: [
      {
        label: "Resolution %",
        data: rows.map((item: any) => Number(item.percentage || 0)),
        backgroundColor: ["#10B981", "#EF4444"],
        borderRadius: 8,
      },
    ],
  };
});

const barOptions = {
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.parsed.y.toFixed(2)}%`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: (value: number) => `${value}%`,
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

.loading-text {
  font-size: 15px;
  color: var(--kiut-text-secondary);
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
  max-width: 460px;
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