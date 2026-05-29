<template>
  <CardMetric
    label="CSAT Pulse"
    :value="formattedPulse"
    :loading="loading"
    :theme="theme"
    :current-value="csatPulse"
    :previous-value="previousCsatPulse"
    ref="cardMetricRef"
  >
    <template #icon>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12h3l2-6 4 12 3-8 2 2h4" />
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

const cardMetricRef = ref<InstanceType<typeof CardMetric> | null>(null)

const formattedPulse = computed(() => `${props.csatPulse.toFixed(1)}%`)

const isDark = computed(() => unref(cardMetricRef.value?.isDark) ?? false)
const changePercent = computed(() => unref(cardMetricRef.value?.changePercent) ?? 0)

defineExpose({ isDark, changePercent })
</script>
