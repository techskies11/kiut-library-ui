<template>
  <ChartMetricContainer
    :collapsible="false"
    :class="['csat-p95-metric', 'w-full', { 'csat-p95-metric--dark': isDark }]"
  >
    <template #title>
      <div class="header-title-group">
        <div class="icon-wrapper" aria-hidden="true">
          <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.41a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-1.01l5.518-.442a.563.563 0 00.475-.345l2.125-5.11z" />
          </svg>
        </div>
      </div>
    </template>
    <template #headerAside>
      <div v-if="!loading && hasPreviousData" :class="['change-badge', changeBadgeClass]">{{ changeLabel }}</div>
    </template>

    <div class="highlight-inner">
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
  const pct = changePercent.value.toFixed(1)
  if (changePercent.value > 0) return `+${pct}%`
  return `${pct}%`
})

const changeBadgeClass = computed(() => {
  if (changePercent.value > 0) return 'change-badge--up'
  if (changePercent.value < 0) return 'change-badge--down'
  return 'change-badge--neutral'
})

defineExpose({ isDark, changePercent })
</script>

<style scoped>
.csat-p95-metric.chart-metric-container--static {
  padding: 16px;
  border-radius: 20px;
  border-color: var(--kiut-border-table);
  background-color: var(--kiut-bg-card);
}

.csat-p95-metric :deep(.card-header) {
  margin-bottom: 0;
}

.csat-p95-metric :deep(.metric-header-content) {
  align-items: center;
}

.header-title-group {
  display: inline-flex;
  align-items: center;
  min-width: 0;
}

.highlight-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  text-align: left;
}

.icon-wrapper {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.card-icon {
  width: 22px;
  height: 22px;
  color: #7c3aed;
}

.csat-p95-metric--dark .card-icon {
  color: #8b5cf6;
}

.change-badge {
  font-family:
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif),
    'Inter',
    sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
  line-height: 1;
  letter-spacing: 0.01em;
}

.change-badge--up {
  background: #dcfce7;
  color: #166534;
}

.change-badge--down {
  background: #fee2e2;
  color: #b91c1c;
}

.change-badge--neutral {
  background: rgba(148, 163, 184, 0.16);
  color: #64748b;
}

.csat-p95-metric--dark .change-badge--up {
  background: #162d24;
  color: #4ade80;
}

.csat-p95-metric--dark .change-badge--down {
  background: #3f1d20;
  color: #fb7185;
}

.csat-p95-metric--dark .change-badge--neutral {
  background: rgba(148, 163, 184, 0.12);
  color: #94a3b8;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  text-align: left;
}

.metric-value {
  font-family:
    'Inter',
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--kiut-text-primary);
}

.metric-label {
  font-family:
    'Inter',
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.25;
  color: #61616b;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  text-align: left;
}

.shimmer {
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    rgba(93, 75, 147, 0.06) 25%,
    rgba(93, 75, 147, 0.12) 50%,
    rgba(93, 75, 147, 0.06) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.8s ease-in-out infinite;
}

.csat-p95-metric--dark .shimmer {
  background: linear-gradient(
    90deg,
    rgba(198, 125, 255, 0.06) 25%,
    rgba(198, 125, 255, 0.14) 50%,
    rgba(198, 125, 255, 0.06) 75%
  );
  background-size: 200% 100%;
}

.shimmer-value {
  width: 40%;
  height: 26px;
}

.shimmer-label {
  width: 38%;
  height: 15px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
