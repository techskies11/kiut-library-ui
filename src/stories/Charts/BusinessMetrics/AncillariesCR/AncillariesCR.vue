<template>
  <CardMetric
    label="Ancillaries CR"
    :value="formattedCr"
    :loading="loading"
    :theme="theme"
    :current-value="ancillariesCr"
    :previous-value="previousAncillariesCr"
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
        <path d="M12 3v18" />
        <path d="M5 8h14" />
        <path d="M7 12h10" />
        <path d="M9 16h6" />
        <rect x="4" y="4" width="16" height="16" rx="2" />
      </svg>
    </template>
  </CardMetric>
</template>

<script setup lang="ts">
import { computed, ref, unref } from "vue";
import CardMetric from "../../Utils/CardMetric/CardMetric.vue";
import type { Theme } from "../../../../composables/useThemeDetection";

const props = withDefaults(
  defineProps<{
    /** Ancillaries conversion rate as a percentage (e.g. 42.0). */
    ancillariesCr?: number;
    previousAncillariesCr?: number | null;
    loading?: boolean;
    theme?: Theme;
  }>(),
  {
    ancillariesCr: 0,
    previousAncillariesCr: null,
    loading: false,
    theme: undefined,
  },
);

const cardMetricRef = ref<InstanceType<typeof CardMetric> | null>(null);

const formattedCr = computed(
  () => `${Number(props.ancillariesCr || 0).toFixed(1)}%`,
);

const isDark = computed(() => unref(cardMetricRef.value?.isDark) ?? false);
const changePercent = computed(
  () => unref(cardMetricRef.value?.changePercent) ?? 0,
);

defineExpose({ isDark, changePercent });
</script>
