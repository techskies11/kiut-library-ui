<template>
  <ChartMetricContainer
    title=""
    :collapsible="false"
    :class="['total-conv-metric', 'w-full', { 'total-conv-metric--dark': isDark }]"
  >
    <template #title>
      <div class="header-title-group">
        <div class="icon-wrapper" aria-hidden="true">
          <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
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
        <span class="metric-value">{{ formattedTotal }}</span>
        <span class="metric-label">Total Conversations</span>
      </div>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'
import { useNumberFormat } from '../../../../plugins/numberFormat'

const props = withDefaults(defineProps<{
  totalConversations?: number;
  previousTotalConversations?: number | null;
  loading?: boolean;
  theme?: Theme;
}>(), {
  totalConversations: 0,
  previousTotalConversations: null,
  loading: false,
  theme: undefined,
})

const { isDark } = useThemeDetection(toRef(props, 'theme'))

const formattedTotal = computed(() => useNumberFormat(props.totalConversations))

const hasPreviousData = computed(() =>
  props.previousTotalConversations !== null && props.previousTotalConversations !== undefined
)

const changePercent = computed(() => {
  if (!hasPreviousData.value) return 0
  const previousValue = props.previousTotalConversations!
  if (previousValue === 0) return props.totalConversations > 0 ? 100 : 0
  return ((props.totalConversations - previousValue) / previousValue) * 100
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
/* Tarjeta: borde redondeado, padding y borde al estilo de la maqueta light/dark (tokens Kiut) */
.total-conv-metric.chart-metric-container--static {
  padding: 16px;
  border-radius: 20px;
  border-color: var(--kiut-border-table);
  background-color: var(--kiut-bg-card);
}

.total-conv-metric .card-header {
  margin-bottom: 20px;
}

.total-conv-metric .metric-header-content {
  align-items: center;
}

.metric-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-title-group {
  display: inline-flex;
  align-items: center;
  min-width: 0;
}

.highlight-inner {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.icon-wrapper {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon {
  width: 22px;
  height: 22px;
  color: #7c3aed;
}

.total-conv-metric--dark .card-icon {
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

.total-conv-metric--dark .change-badge--up {
  background: #162d24;
  color: #4ade80;
}

.total-conv-metric--dark .change-badge--down {
  background: #3f1d20;
  color: #fb7185;
}

.total-conv-metric--dark .change-badge--neutral {
  background: rgba(148, 163, 184, 0.12);
  color: #94a3b8;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  gap: 12px;
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

.total-conv-metric--dark .shimmer {
  background: linear-gradient(
    90deg,
    rgba(198, 125, 255, 0.06) 25%,
    rgba(198, 125, 255, 0.14) 50%,
    rgba(198, 125, 255, 0.06) 75%
  );
  background-size: 200% 100%;
}

.shimmer-value {
  width: 58%;
  height: 26px;
}

.shimmer-label {
  width: 42%;
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
