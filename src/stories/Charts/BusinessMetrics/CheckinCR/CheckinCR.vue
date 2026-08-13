<template>
  <CardMetric
    label="Check-in CR"
    :value="formattedCr"
    :tooltip="tooltip"
    :loading="loading"
    :theme="theme"
    :current-value="checkinCr"
    :previous-value="previousCheckinCr"
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
        <path d="M2 22h20" />
        <path
          d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"
        />
      </svg>
    </template>
  </CardMetric>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import CardMetric from '../../Utils/CardMetric/CardMetric.vue'
import type { Theme } from '../../../../composables/useThemeDetection'

const DEFAULT_TOOLTIP =
  'Percentage of Check In Success relative to Check In Started.'

const props = withDefaults(
  defineProps<{
    /** Check-in conversion rate as a percentage (e.g. 68.4). */
    checkinCr?: number
    previousCheckinCr?: number | null
    loading?: boolean
    theme?: Theme
    tooltip?: string
  }>(),
  {
    checkinCr: 0,
    previousCheckinCr: null,
    loading: false,
    theme: undefined,
    tooltip: DEFAULT_TOOLTIP,
  },
)

const cardMetricRef = ref<InstanceType<typeof CardMetric> | null>(null)

const formattedCr = computed(() => `${Number(props.checkinCr || 0).toFixed(1)}%`)

const isDark = computed(() => unref(cardMetricRef.value?.isDark) ?? false)
const changePercent = computed(() => unref(cardMetricRef.value?.changePercent) ?? 0)

defineExpose({ isDark, changePercent })
</script>
