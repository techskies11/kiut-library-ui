<template>
  <CardMetric
    label="Cost"
    :value="formattedCost"
    prefix="USD"
    :loading="loading"
    :theme="theme"
    ref="cardMetricRef"
  >
    <template #icon>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
      </svg>
    </template>

    <template #headerAside>
      <div
        v-if="hasPreviousData"
        :class="['change-badge', invertedBadgeClass]"
      >
        {{ changeLabel }}
      </div>
    </template>
  </CardMetric>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import CardMetric from '../../Utils/CardMetric/CardMetric.vue'
import type { Theme } from '../../../../composables/useThemeDetection'
import { useNumberFormat } from '../../../../plugins/numberFormat'

const COST_PER_CONVERSATION_USD = 1

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

const cardMetricRef = ref<InstanceType<typeof CardMetric> | null>(null)

const cost = computed(() => props.totalConversations * COST_PER_CONVERSATION_USD)

const previousCost = computed(() => {
  if (props.previousTotalConversations === null || props.previousTotalConversations === undefined) {
    return null
  }
  return props.previousTotalConversations * COST_PER_CONVERSATION_USD
})

const formattedCost = computed(() => useNumberFormat(cost.value))

const hasPreviousData = computed(
  () => previousCost.value !== null && previousCost.value !== undefined,
)

const changePercent = computed(() => {
  if (!hasPreviousData.value) return 0
  const previousValue = previousCost.value!
  if (previousValue === 0) return cost.value > 0 ? 100 : 0
  return ((cost.value - previousValue) / previousValue) * 100
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

const isDark = computed(() => unref(cardMetricRef.value?.isDark) ?? false)

defineExpose({ isDark, changePercent })
</script>

<style scoped>
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

:deep(.card-metric--dark) .change-badge--up {
  background: #162d24;
  color: #4ade80;
}

:deep(.card-metric--dark) .change-badge--down {
  background: #3f1d20;
  color: #fb7185;
}

:deep(.card-metric--dark) .change-badge--neutral {
  background: rgba(148, 163, 184, 0.12);
  color: #94a3b8;
}
</style>
