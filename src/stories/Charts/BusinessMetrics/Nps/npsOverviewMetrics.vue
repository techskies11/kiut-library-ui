<template>
  <ChartMetricContainer
    class="nps-overview-root h-full min-h-0"
    title="CSAT Overview Metrics"
    subtitle="Overall CSAT Distribution"
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
        <div
          v-if="npsData && npsData.total_nps_responses > 0"
          class="card-body"
        >
      <div class="chart-wrapper">
        <HistogramChart
          :histogram="npsData.histogram || []"
          :min-score="npsData.min_score || 0"
          :max-score="npsData.max_score || 0"
          :q1-score="npsData.q1_score || 0"
          :median-score="npsData.median_score || 0"
          :q3-score="npsData.q3_score || 0"
          :average-score="npsData.average_score || 0"
          :chart-width="chartWidth"
          :chart-height="chartHeight"
          :chart-margin="chartMargin"
          :chart-bottom-margin="chartBottomMargin"
        />
      </div>
      <div
        class="overview-card-infos mt-4 flex w-full flex-col gap-3 sm:flex-row sm:gap-4"
      >
        <CardInfo
          class="min-w-0 flex-1"
          title="Responses"
          :value="String(npsData.total_nps_responses)"
        />
        <CardInfo
          v-if="npsData.p95_score > 0"
          class="min-w-0 flex-1"
          title="Percentile 95"
          :value="String(npsData.p95_score)"
        />
      </div>
        </div>

        <div v-else class="empty-state">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <p class="empty-title">No NPS data available</p>
            <p class="empty-description">
              No NPS data found for the selected period. Try adjusting the date
              range.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </ChartMetricContainer>
</template>

<script setup>
import { computed, toRef } from "vue";
import HistogramChart from "../../Histogram/HistogramChart.vue";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";
import CardInfo from "../../Utils/CardInfo/CardInfo.vue";
import { FooterExport } from "../../Utils/FooterExport";
import { useThemeDetection } from "../../../../composables/useThemeDetection";

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
  theme: {
    type: String,
    default: undefined,
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

// Theme detection with prop fallback
const { isDark } = useThemeDetection(toRef(props, "theme"));

const npsData = computed(() => props.data);

// Chart dimensions (responsive to container width)
const chartWidth = computed(() => {
  return Math.max(600, window.innerWidth * 0.85);
});
const chartHeight = 500;
const chartMargin = 60;
const chartBottomMargin = 80;

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

/* Responsive */
@media (max-width: 768px) {
  .chart-wrapper {
    padding: 16px;
  }
}
</style>
<style>
@import "../bm-shared.css";
</style>
