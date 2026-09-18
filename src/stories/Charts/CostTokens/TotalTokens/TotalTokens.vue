<template>
  <CardMetric
    :label="label"
    :value="formattedTotalTokens"
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
          <circle cx="9" cy="12" r="6" />
          <circle cx="15" cy="12" r="6" />
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
      <span class="metric-value">{{ formattedTotalTokens }}</span>
    </template>
  </CardMetric>
</template>

<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import CardMetric from '../../Utils/CardMetric/CardMetric.vue'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'
import { useCompactNumberFormat } from '../../../../plugins/numberFormat'

const DEFAULT_LABEL = 'Total tokens'
const DEFAULT_TOOLTIP = 'Total LLM tokens consumed during the selected period.'

const props = withDefaults(
  defineProps<{
    totalTokens?: number
    previousTotalTokens?: number | null
    /** @deprecated Token breakdown is no longer shown in the compact card layout. */
    inputTokens?: number
    /** @deprecated Token breakdown is no longer shown in the compact card layout. */
    outputTokens?: number
    /** @deprecated Token breakdown is no longer shown in the compact card layout. */
    cacheReadTokens?: number
    /** @deprecated Token breakdown is no longer shown in the compact card layout. */
    cacheWriteTokens?: number
    label?: string
    tooltip?: string
    loading?: boolean
    theme?: Theme
  }>(),
  {
    totalTokens: 0,
    previousTotalTokens: null,
    inputTokens: 0,
    outputTokens: 0,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    label: DEFAULT_LABEL,
    tooltip: DEFAULT_TOOLTIP,
    loading: false,
    theme: undefined,
  },
)

const cardMetricRef = ref<InstanceType<typeof CardMetric> | null>(null)
const { isDark } = useThemeDetection(toRef(props, 'theme'))

const formattedTotalTokens = computed(() => useCompactNumberFormat(props.totalTokens))

const hasPreviousData = computed(
  () => props.previousTotalTokens !== null && props.previousTotalTokens !== undefined,
)

const changePercent = computed(() => {
  if (!hasPreviousData.value) return 0
  const previousValue = props.previousTotalTokens!
  if (previousValue === 0) return props.totalTokens > 0 ? 100 : 0
  return ((props.totalTokens - previousValue) / previousValue) * 100
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
