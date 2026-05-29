<template>
  <CardMetric
    label="AI Revenue"
    :value="formattedAmount"
    :prefix="currencyCode"
    value-size="large"
    :loading="loading"
    :theme="theme"
    :current-value="totalRevenue"
    :previous-value="previousTotalRevenue"
    ref="cardMetricRef"
  >
    <template #icon>
      <svg
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
    </template>
  </CardMetric>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import CardMetric from '../../Utils/CardMetric/CardMetric.vue'
import type { Theme } from '../../../../composables/useThemeDetection'
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

const cardMetricRef = ref<InstanceType<typeof CardMetric> | null>(null)

const formattedAmount = computed(() => useCompactCurrencyFormat(props.totalRevenue))

const isDark = computed(() => unref(cardMetricRef.value?.isDark) ?? false)
const changePercent = computed(() => unref(cardMetricRef.value?.changePercent) ?? 0)

defineExpose({ isDark, changePercent })
</script>
