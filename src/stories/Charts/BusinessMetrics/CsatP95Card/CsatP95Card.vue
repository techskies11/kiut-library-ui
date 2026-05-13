<template>
  <ChartMetricContainer title="CSAT Metrics" :collapsible="false" class="csat-p95-metric w-full">
    <template #title>
      <div class="header-title-group">
        <div class="icon-wrapper">
          <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.41a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-1.01l5.518-.442a.563.563 0 00.475-.345l2.125-5.11z" />
          </svg>
        </div>
        <span class="csat-p95-title-text">CSAT Metrics</span>
      </div>
    </template>
    <template #headerAside>
      <div v-if="!loading && hasPreviousData" :class="['change-badge', changeBadgeClass]">{{ changeLabel }}</div>
    </template>

    <div :class="['csat-p95-inner', { 'csat-p95-inner--dark': isDark }]">
      <div v-if="loading" class="loading-state">
        <div class="shimmer shimmer-value"></div>
        <div class="shimmer shimmer-label"></div>
      </div>

      <div v-else class="card-body">
        <span class="metric-value">{{ formattedCsat }}</span>
        <span class="metric-label">CSAT P95</span>
      </div>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

const props = withDefaults(defineProps<{
  csatP95?: number;
  previousCsatP95?: number | null;
  loading?: boolean;
  theme?: Theme;
}>(), {
  csatP95: 0,
  previousCsatP95: null,
  loading: false,
  theme: undefined,
})

const { isDark } = useThemeDetection(toRef(props, 'theme'))

const formattedCsat = computed(() => `${props.csatP95.toFixed(1)}`)

const hasPreviousData = computed(() =>
  props.previousCsatP95 !== null && props.previousCsatP95 !== undefined
)

const changePercent = computed(() => {
  if (!hasPreviousData.value) return 0
  const previousValue = props.previousCsatP95!
  if (previousValue === 0) return props.csatP95 > 0 ? 100 : 0
  return ((props.csatP95 - previousValue) / previousValue) * 100
})

const changeLabel = computed(() => {
  const sign = changePercent.value > 0 ? '+' : ''
  return `${sign}${changePercent.value.toFixed(1)}% vs prev.`
})

const changeBadgeClass = computed(() => {
  if (changePercent.value > 0) return 'change-badge--up'
  if (changePercent.value < 0) return 'change-badge--down'
  return 'change-badge--neutral'
})

defineExpose({ isDark, changePercent })
</script>

<style scoped>
.csat-p95-title-text {
  font-family: 'Space Grotesk', 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
  letter-spacing: -0.02em;
}

.csat-p95-inner--dark .csat-p95-title-text {
  color: #f1f5f9;
}

.csat-p95-inner {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 120px;
}

.header-title-group {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.icon-wrapper {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon {
  width: 20px;
  height: 20px;
  color: #8b5cf6;
}

.change-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  line-height: 1;
}

.change-badge--up {
  background: rgba(16, 185, 129, 0.12);
  color: #16a34a;
}

.change-badge--down {
  background: rgba(239, 68, 68, 0.12);
  color: #dc2626;
}

.change-badge--neutral {
  background: rgba(148, 163, 184, 0.14);
  color: #64748b;
}

.csat-p95-inner--dark .change-badge--up { color: #22c55e; }
.csat-p95-inner--dark .change-badge--down { color: #f87171; }
.csat-p95-inner--dark .change-badge--neutral { color: #94a3b8; }

.card-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-value {
  font-family: 'Space Grotesk', 'DM Sans', sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #1e293b;
}

.csat-p95-inner--dark .metric-value {
  color: #f1f5f9;
}

.metric-label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #64748b;
}

.csat-p95-inner--dark .metric-label {
  color: #9ca3af;
}

.loading-state {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.shimmer {
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    rgba(93, 75, 147, 0.06) 25%,
    rgba(93, 75, 147, 0.12) 50%,
    rgba(93, 75, 147, 0.06) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.8s ease-in-out infinite;
}

.csat-p95-inner--dark .shimmer {
  background: linear-gradient(
    90deg,
    rgba(198, 125, 255, 0.06) 25%,
    rgba(198, 125, 255, 0.14) 50%,
    rgba(198, 125, 255, 0.06) 75%
  );
  background-size: 200% 100%;
}

.shimmer-value { width: 40%; height: 36px; }
.shimmer-label { width: 35%; height: 16px; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
