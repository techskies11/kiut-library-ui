<template>
  <ChartMetricContainer
    :collapsible="false"
    :class="['csat-pulse-metric', 'w-full', { 'csat-pulse-metric--dark': isDark }]"
  >
    <template #title>
      <div class="header-title-group">
        <div class="icon-wrapper" aria-hidden="true">
          <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12h3l2-6 4 12 3-8 2 2h4" />
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
        <span class="metric-value">{{ formattedPulse }}</span>
        <span class="metric-label">CSAT Pulse</span>
      </div>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

const props = withDefaults(
  defineProps<{
    csatPulse?: number
    previousCsatPulse?: number | null
    loading?: boolean
    theme?: Theme
  }>(),
  {
    csatPulse: 0,
    previousCsatPulse: null,
    loading: false,
    theme: undefined,
  },
)

const { isDark } = useThemeDetection(toRef(props, 'theme'))

const formattedPulse = computed(() => `${props.csatPulse.toFixed(1)}%`)
const hasPreviousData = computed(() => props.previousCsatPulse !== null && props.previousCsatPulse !== undefined)

const changePercent = computed(() => {
  if (!hasPreviousData.value) return 0
  const previousValue = props.previousCsatPulse!
  if (previousValue === 0) return props.csatPulse > 0 ? 100 : 0
  return ((props.csatPulse - previousValue) / Math.abs(previousValue)) * 100
})

const changeLabel = computed(() => {
  const pct = changePercent.value.toFixed(1)
  if (changePercent.value > 0) return `+${pct}% vs prev.`
  return `${pct}% vs prev.`
})

const changeBadgeClass = computed(() => {
  if (changePercent.value > 0) return 'change-badge--up'
  if (changePercent.value < 0) return 'change-badge--down'
  return 'change-badge--neutral'
})

defineExpose({ isDark, changePercent })
</script>

<style scoped>
.csat-pulse-metric :deep(.card-header) {
  margin-bottom: 0;
}

.csat-pulse-metric :deep(.metric-header-content) {
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

.csat-pulse-metric--dark .card-icon {
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

.csat-pulse-metric--dark .change-badge--up {
  background: #162d24;
  color: #4ade80;
}

.csat-pulse-metric--dark .change-badge--down {
  background: #3f1d20;
  color: #fb7185;
}

.csat-pulse-metric--dark .change-badge--neutral {
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
    rgba(37, 99, 235, 0.06) 25%,
    rgba(37, 99, 235, 0.14) 50%,
    rgba(37, 99, 235, 0.06) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.8s ease-in-out infinite;
}

.csat-pulse-metric--dark .shimmer {
  background: linear-gradient(
    90deg,
    rgba(96, 165, 250, 0.06) 25%,
    rgba(96, 165, 250, 0.14) 50%,
    rgba(96, 165, 250, 0.06) 75%
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
