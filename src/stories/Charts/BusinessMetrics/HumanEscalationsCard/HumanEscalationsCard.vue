<template>
  <CardMetric
    label="Human Escalations"
    :value="rateLabel"
    :loading="loading"
    :theme="theme"
    :current-value="escalationRatePercentage"
    :previous-value="previousEscalationRatePercentage"
    ref="cardMetricRef"
  >
    <template #icon>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
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
    </template>
  </CardMetric>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import CardMetric from '../../Utils/CardMetric/CardMetric.vue'
import type { Theme } from '../../../../composables/useThemeDetection'

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

const cardMetricRef = ref<InstanceType<typeof CardMetric> | null>(null)

const rateLabel = computed(() => `${Number(props.escalationRatePercentage || 0).toFixed(2)}%`)

const isDark = computed(() => unref(cardMetricRef.value?.isDark) ?? false)
const changePercent = computed(() => unref(cardMetricRef.value?.changePercent) ?? 0)

defineExpose({ isDark, changePercent })
</script>
