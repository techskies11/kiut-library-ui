<template>
  <ChartMetricContainer
    :collapsible="false"
    :class="['human-escalations-metric', 'ku:w-full', { 'human-escalations-metric--dark': isDark }]"
  >
    <template #title>
      <div class="header-title-group">
        <div class="icon-wrapper" aria-hidden="true">
          <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 19.5a7.5 7.5 0 0 1 9.36-7.29"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m17.25 15.75 4.5 4.5"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21.75 15.75-4.5 4.5"
            />
          </svg>
        </div>
      </div>
    </template>
    <template #headerAside>
      <div v-if="!loading && hasPreviousData" :class="['change-badge', changeBadgeClass]">
        {{ changeLabel }}
      </div>
    </template>

    <div class="highlight-inner">
      <div v-if="loading" class="loading-state">
        <div class="shimmer shimmer-value"></div>
        <div class="shimmer shimmer-label"></div>
      </div>

      <div v-else class="card-body">
        <span class="metric-value">{{ rateLabel }}</span>
        <span class="metric-label">Human Escalations</span>
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
    escalationRatePercentage?: number
    previousEscalationRatePercentage?: number | null
    loading?: boolean
    theme?: Theme
  }>(),
  {
    escalationRatePercentage: 0,
    previousEscalationRatePercentage: null,
    loading: false,
    theme: undefined,
  },
)

const { isDark } = useThemeDetection(toRef(props, 'theme'))
const rateLabel = computed(() => `${Number(props.escalationRatePercentage || 0).toFixed(2)}%`)

const hasPreviousData = computed(
  () =>
    props.previousEscalationRatePercentage !== null &&
    props.previousEscalationRatePercentage !== undefined,
)

const changePercent = computed(() => {
  if (!hasPreviousData.value) return 0
  const previousValue = props.previousEscalationRatePercentage!
  if (previousValue === 0) return props.escalationRatePercentage > 0 ? 100 : 0
  return ((props.escalationRatePercentage - previousValue) / previousValue) * 100
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
</script>

<style scoped>
.human-escalations-metric.chart-metric-container--static {
  padding: 16px;
  border-radius: 20px;
  border-color: var(--kiut-border-table);
  background-color: var(--kiut-bg-card);
}

.human-escalations-metric :deep(.card-header) {
  margin-bottom: 0;
}

.human-escalations-metric :deep(.metric-header-content) {
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

.human-escalations-metric--dark .card-icon {
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

.human-escalations-metric--dark .change-badge--up {
  background: #162d24;
  color: #4ade80;
}

.human-escalations-metric--dark .change-badge--down {
  background: #3f1d20;
  color: #fb7185;
}

.human-escalations-metric--dark .change-badge--neutral {
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

.human-escalations-metric--dark .shimmer {
  background: linear-gradient(
    90deg,
    rgba(198, 125, 255, 0.06) 25%,
    rgba(198, 125, 255, 0.14) 50%,
    rgba(198, 125, 255, 0.06) 75%
  );
  background-size: 200% 100%;
}

.shimmer-value {
  width: 52%;
  height: 26px;
}

.shimmer-label {
  width: 44%;
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
