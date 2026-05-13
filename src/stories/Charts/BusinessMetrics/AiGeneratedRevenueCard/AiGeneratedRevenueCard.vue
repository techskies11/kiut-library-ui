<template>
  <ChartMetricContainer title="Total Conversations" :collapsible="false" class="total-conv-metric w-full">
    <template #title>
      <div class="header-title-group">
        <div class="icon-wrapper">
          <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-2.407-1.204a5.97 5.97 0 01-1.593-.98l-3.5-2.625a2.25 2.25 0 010-3.602l3.5-2.625a5.97 5.97 0 011.593-.98L9 5.25l.813 2.846a2.25 2.25 0 001.341 1.457l2.846.813-2.846.813a2.25 2.25 0 00-1.341 1.457zM15.75 5.25l.537 1.879a1.5 1.5 0 00.894.975l1.879.537-1.879.537a1.5 1.5 0 00-.894.975l-.537 1.879-.537-1.879a1.5 1.5 0 00-.894-.975l-1.879-.537 1.879-.537a1.5 1.5 0 00.894-.975l.537-1.879zM18 12.75l.537 1.879a1.5 1.5 0 00.894.975l1.879.537-1.879.537a1.5 1.5 0 00-.894.975L18 19.53l-.537-1.879a1.5 1.5 0 00-.894-.975l-1.879-.537 1.879-.537a1.5 1.5 0 00.894-.975L18 12.75z" />
          </svg>
        
        </div>
        <span class="kpi-heading-text">AI-Generated Revenue</span>
      </div>
    </template>
    <template #headerAside>
      <div v-if="!loading && hasPreviousData" :class="['change-badge', changeBadgeClass]">{{ changeLabel }}</div>
    </template>

    <div :class="['highlight-inner', { 'highlight-inner--dark': isDark }]">
      <div v-if="loading" class="loading-state">
        <div class="shimmer shimmer-value"></div>
        <div class="shimmer shimmer-label"></div>
      </div>

      <div v-else class="card-body">
        <span class="metric-value">{{ formattedRevenue }}</span>
        <span class="metric-label">AI-Generated Revenue</span>
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

const formattedRevenue = computed(() => `${props.currencyCode} ${useCompactCurrencyFormat(props.totalRevenue)}`)

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
.header-title-group {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.kpi-heading-text {
  font-family: 'Space Grotesk', 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
  letter-spacing: -0.02em;
}

.highlight-inner--dark .kpi-heading-text {
  color: #f1f5f9;
}

.highlight-inner {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 120px;
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

.highlight-inner--dark .change-badge--up { color: #22c55e; }
.highlight-inner--dark .change-badge--down { color: #f87171; }
.highlight-inner--dark .change-badge--neutral { color: #94a3b8; }

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
  color: #059669;
}

.highlight-inner--dark .metric-value {
  color: #34d399;
}

.metric-label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #64748b;
}

.highlight-inner--dark .metric-label {
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

.highlight-inner--dark .shimmer {
  background: linear-gradient(
    90deg,
    rgba(198, 125, 255, 0.06) 25%,
    rgba(198, 125, 255, 0.14) 50%,
    rgba(198, 125, 255, 0.06) 75%
  );
  background-size: 200% 100%;
}

.shimmer-value { width: 70%; height: 36px; }
.shimmer-label { width: 45%; height: 16px; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
