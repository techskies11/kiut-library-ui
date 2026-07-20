<template>
  <CardMetric
    label="Seller CR"
    :value="formattedCr"
    :loading="loading"
    :theme="theme"
    :current-value="sellerCr"
    :previous-value="previousSellerCr"
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
        <path d="M16 10a4 4 0 0 1-8 0" />
        <path d="M3.103 6.034h17.794" />
        <path
          d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"
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
    /** Seller conversion rate as a percentage (e.g. 50.8). */
    sellerCr?: number
    previousSellerCr?: number | null
    loading?: boolean
    theme?: Theme
  }>(),
  {
    sellerCr: 0,
    previousSellerCr: null,
    loading: false,
    theme: undefined,
  },
)

const cardMetricRef = ref<InstanceType<typeof CardMetric> | null>(null)

const formattedCr = computed(() => `${Number(props.sellerCr || 0).toFixed(1)}%`)

const isDark = computed(() => unref(cardMetricRef.value?.isDark) ?? false)
const changePercent = computed(() => unref(cardMetricRef.value?.changePercent) ?? 0)

defineExpose({ isDark, changePercent })
</script>
