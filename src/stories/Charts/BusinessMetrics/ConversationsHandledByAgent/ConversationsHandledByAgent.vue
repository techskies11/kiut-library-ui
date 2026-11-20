<template>
  <ChartMetricContainer
    class="w-full min-h-0 self-start"
    :title="title"
    :subtitle="subtitle"
    :collapsible="false"
    :loading="loading"
  >
    <p
      v-if="error"
      class="m-0 px-1 py-8 text-center text-sm text-[var(--kiut-text-danger,var(--kiut-danger,#dc2626))]"
    >
      {{ errorMessage }}
    </p>
    <div
      v-else-if="!items.length"
      class="flex min-h-[180px] items-center justify-center px-4 text-center text-sm text-[var(--kiut-text-secondary,#737373)]"
    >
      {{ emptyTitle }}
    </div>
    <div v-else class="w-full min-w-0">
      <ChartBar
        :data="chartData"
        :options="chartOptions"
        :height-px="heightPx"
        :theme="theme"
      />
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ChartBar from "../../Bar/ChartBar.vue";
import ChartMetricContainer from "../../Utils/ChartMetricContainer/ChartMetricContainer.vue";
import { kiutColor } from "../../../../utils/kiutColor";
import type { Theme } from "../../../../composables/useThemeDetection";

export interface ConversationsHandledByAgentItem {
  agent: string;
  conversations: number;
}

const props = withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    seriesLabel: string;
    items?: ConversationsHandledByAgentItem[];
    loading?: boolean;
    error?: boolean;
    errorMessage?: string;
    emptyTitle?: string;
    theme?: Theme;
  }>(),
  {
    subtitle: "",
    items: () => [],
    loading: false,
    error: false,
    errorMessage: "",
    emptyTitle: "",
    theme: undefined,
  },
);

const heightPx = computed(() => Math.max(220, props.items.length * 36));

const chartData = computed(() => ({
  labels: props.items.map((row) => row.agent),
  datasets: [
    {
      label: props.seriesLabel,
      data: props.items.map((row) => row.conversations),
      backgroundColor: kiutColor("--kiut-primary", "#5D4B93"),
      borderRadius: 8,
    },
  ],
}));

const chartOptions = {
  indexAxis: "y" as const,
  plugins: { legend: { display: false } },
};
</script>
