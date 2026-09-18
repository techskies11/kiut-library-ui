<template>
  <CardMetric
    :label="label"
    :value="formattedTotalCost"
    :tooltip="tooltip"
    :loading="loading"
    :theme="theme"
    ref="cardMetricRef"
  >
    <template #icon>
      <slot name="icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path
            d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
          />
        </svg>
      </slot>
    </template>

    <template #headerAside>
      <div
        v-if="hasPreviousData"
        :class="['change-badge', invertedBadgeClass, { 'change-badge--dark': isDark }]"
      >
        {{ changeLabel }}
      </div>
    </template>

    <template #value>
      <div class="metric-row">
        <span class="metric-value">{{ formattedTotalCost }}</span>
        <span v-if="showDailyMean" class="metric-daily">({{ formattedDailyMean }}/day)</span>
      </div>
    </template>
  </CardMetric>
</template>

<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import CardMetric from '../../Utils/CardMetric/CardMetric.vue'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'
import { useCompactCurrencyFormat } from '../../../../plugins/numberFormat'

const DEFAULT_LABEL = 'LLM cost'
const DEFAULT_TOOLTIP =
  'Total LLM spend for the selected period, with the daily average shown in parentheses.'

const props = withDefaults(
  defineProps<{
    totalCost?: number
    dailyMean?: number
    /** @deprecated Peak day is no longer shown in the compact card layout. */
    peakDayDate?: string
    /** @deprecated Peak day is no longer shown in the compact card layout. */
    peakDayValue?: number
    previousTotalCost?: number | null
    label?: string
    tooltip?: string
    loading?: boolean
    theme?: Theme
  }>(),
  {
    totalCost: 0,
    dailyMean: 0,
    peakDayDate: '-',
    peakDayValue: 0,
    previousTotalCost: null,
    label: DEFAULT_LABEL,
    tooltip: DEFAULT_TOOLTIP,
    loading: false,
    theme: undefined,
  },
)

const cardMetricRef = ref<InstanceType<typeof CardMetric> | null>(null)
const { isDark } = useThemeDetection(toRef(props, 'theme'))

const formattedTotalCost = computed(() => useCompactCurrencyFormat(props.totalCost))

const showDailyMean = computed(() => props.dailyMean > 0)

const formattedDailyMean = computed(() => {
  if (!showDailyMean.value) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(props.dailyMean)
})

const hasPreviousData = computed(
  () => props.previousTotalCost !== null && props.previousTotalCost !== undefined,
)

const changePercent = computed(() => {
  if (!hasPreviousData.value) return 0
  const previousValue = props.previousTotalCost!
  if (previousValue === 0) return props.totalCost > 0 ? 100 : 0
  return ((props.totalCost - previousValue) / previousValue) * 100
})

const changeLabel = computed(() => {
  const pct = changePercent.value.toFixed(1)
  if (changePercent.value > 0) return `+${pct}%`
  return `${pct}%`
})

const invertedBadgeClass = computed(() => {
  if (changePercent.value < 0) return 'change-badge--up'
  if (changePercent.value > 0) return 'change-badge--down'
  return 'change-badge--neutral'
})

defineExpose({ isDark, changePercent })
</script>

<style scoped>
.metric-row {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  gap: 6px;
  flex-wrap: wrap;
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

.metric-daily {
  font-family:
    'Inter',
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  color: #6b7280;
}

:global(.dark) .metric-daily {
  color: #9ca3af;
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

.change-badge--dark.change-badge--up,
:global(.dark) .change-badge--up {
  background: rgba(74, 222, 128, 0.14);
  color: #4ade80;
}

.change-badge--dark.change-badge--down,
:global(.dark) .change-badge--down {
  background: rgba(251, 113, 133, 0.16);
  color: #fb7185;
}

.change-badge--dark.change-badge--neutral,
:global(.dark) .change-badge--neutral {
  background: rgba(148, 163, 184, 0.12);
  color: #94a3b8;
}
</style>
