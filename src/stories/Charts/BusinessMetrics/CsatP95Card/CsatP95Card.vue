<template>
  <CardMetric
    label="CSAT P95"
    :value="formattedCsat"
    :loading="loading"
    :theme="theme"
    :current-value="csatP95"
    :previous-value="previousCsatP95"
    ref="cardMetricRef"
  >
    <template #icon>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321 1.01l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.41a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-1.01l5.518-.442a.563.563 0 00.475-.345l2.125-5.11z" />
      </svg>
    </template>
  </CardMetric>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import CardMetric from '../../Utils/CardMetric/CardMetric.vue'
import type { Theme } from '../../../../composables/useThemeDetection'

const props = withDefaults(defineProps<{
  csatP95?: number;
  previousCsatP95?: number | null;
  loading?: boolean;
  theme?: Theme;
}>(), {
  csatP95: 0,
  previousCsatP95: null,
  loading: false,
  theme: undefined,
})

const cardMetricRef = ref<InstanceType<typeof CardMetric> | null>(null)

const formattedCsat = computed(() => `${props.csatP95.toFixed(1)}`)

const isDark = computed(() => unref(cardMetricRef.value?.isDark) ?? false)
const changePercent = computed(() => unref(cardMetricRef.value?.changePercent) ?? 0)

defineExpose({ isDark, changePercent })
</script>
