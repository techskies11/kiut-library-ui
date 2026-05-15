<template>
  <ChartMetricContainer
    :collapsible="false"
    :class="['ai-revenue-metric', 'w-full', { 'ai-revenue-metric--dark': isDark }]"
  >
    <template #title>
      <div class="header-title-group">
        <div class="icon-wrapper" aria-hidden="true">
          <svg
            class="card-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
            <path d="M12 18V6" />
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
        <div class="metric-row">
          <span class="metric-currency">{{ props.currencyCode }}</span>
          <span class="metric-value">{{ formattedAmount }}</span>
        </div>
        <span class="metric-label">AI Revenue</span>
      </div>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'
import { useCompactCurrencyFormat } from '../../../../plugins/numberFormat'

const props = withDefaults(defineProps<{
  totalRevenue?: number;
  previousTotalRevenue?: number | null;
  currencyCode?: string;
  loading?: boolean;
  theme?: Theme;
}>(), {
  totalRevenue: 0,
  previousTotalRevenue: null,
  currencyCode: 'USD',
  loading: false,
  theme: undefined,
})

const { isDark } = useThemeDetection(toRef(props, 'theme'))

const formattedAmount = computed(() => useCompactCurrencyFormat(props.totalRevenue))

const hasPreviousData = computed(() =>
  props.previousTotalRevenue !== null && props.previousTotalRevenue !== undefined
)

const changePercent = computed(() => {
  if (!hasPreviousData.value) return 0
  const previousValue = props.previousTotalRevenue!
  if (previousValue === 0) return props.totalRevenue > 0 ? 100 : 0
  return ((props.totalRevenue - previousValue) / previousValue) * 100
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
.ai-revenue-metric.chart-metric-container--static {
  padding: 16px;
  border-radius: 20px;
  border-color: var(--kiut-border-table);
  background-color: var(--kiut-bg-card);
}

.ai-revenue-metric :deep(.card-header) {
  margin-bottom: 0;
}

.ai-revenue-metric :deep(.metric-header-content) {
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

.ai-revenue-metric--dark .card-icon {
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

.ai-revenue-metric--dark .change-badge--up {
  background: #162d24;
  color: #4ade80;
}

.ai-revenue-metric--dark .change-badge--down {
  background: #3f1d20;
  color: #fb7185;
}

.ai-revenue-metric--dark .change-badge--neutral {
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

.metric-row {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  gap: 8px;
  flex-wrap: wrap;
  text-align: left;
}

.metric-currency {
  font-family: 'Inter', var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0;
  color: #9191a1;
}

.metric-value {
  font-family:
    'Inter',
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 28px;
  font-weight: 700;
  line-height: 1.1;
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

.ai-revenue-metric--dark .shimmer {
  background: linear-gradient(
    90deg,
    rgba(198, 125, 255, 0.06) 25%,
    rgba(198, 125, 255, 0.14) 50%,
    rgba(198, 125, 255, 0.06) 75%
  );
  background-size: 200% 100%;
}

.shimmer-value {
  width: 70%;
  height: 30px;
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
