<template>
  <CardMetric
    label="Booking Manager CR"
    :value="formattedCr"
    :loading="loading"
    :theme="theme"
    :current-value="bookingManagerCr"
    :previous-value="previousBookingManagerCr"
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
        <path d="m15 11-1 9" />
        <path d="m19 11-4-7" />
        <path d="M2 11h20" />
        <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
        <path d="M4.5 15.5h15" />
        <path d="m5 11 4-7" />
        <path d="m9 11 1 9" />
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
    /** Booking Manager conversion rate as a percentage (e.g. 42.1). */
    bookingManagerCr?: number
    previousBookingManagerCr?: number | null
    loading?: boolean
    theme?: Theme
  }>(),
  {
    bookingManagerCr: 0,
    previousBookingManagerCr: null,
    loading: false,
    theme: undefined,
  },
)

const cardMetricRef = ref<InstanceType<typeof CardMetric> | null>(null)

const formattedCr = computed(
  () => `${Number(props.bookingManagerCr || 0).toFixed(1)}%`,
)

const isDark = computed(() => unref(cardMetricRef.value?.isDark) ?? false)
const changePercent = computed(() => unref(cardMetricRef.value?.changePercent) ?? 0)

defineExpose({ isDark, changePercent })
</script>
