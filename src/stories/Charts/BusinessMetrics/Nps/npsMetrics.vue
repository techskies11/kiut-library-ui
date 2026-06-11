<template>
  <div
    class="nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
  >
    <div
      v-if="layoutMode !== 'three'"
      class="grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2"
    >
      <NpsOverviewMetrics
        class="min-w-0"
        :data="data"
        :loading="loading"
        :enable-export="enableExport"
        @export="handleExport"
      />
      <NpsDailyMetrics
        class="min-w-0"
        :data="data"
        :loading="loading"
        :enable-export="enableExport"
        @export="handleExport"
      />
    </div>

    <NpsOverviewMetrics
      v-else
      class="min-w-0"
      :data="data"
      :loading="loading"
      :enable-export="enableExport"
      @export="handleExport"
    />

    <div
      v-if="layoutMode === 'three'"
      class="grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2"
    >
      <NpsDailyMetrics
        class="min-w-0"
        :data="data"
        :loading="loading"
        :enable-export="enableExport"
        @export="handleExport"
      />
      <NpsResolutionMetrics
        v-if="showResolutionChart"
        class="min-w-0"
        :data="data"
        :loading="loading"
      />
      <NpsPulseMetrics
        v-if="showCsatPulseChart"
        class="min-w-0"
        :data="data"
        :loading="loading"
      />
    </div>

    <div
      v-if="layoutMode === 'four'"
      class="grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2"
    >
      <NpsResolutionMetrics
        class="min-w-0"
        :data="data"
        :loading="loading"
      />
      <NpsPulseMetrics
        class="min-w-0"
        :data="data"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import NpsOverviewMetrics from './npsOverviewMetrics.vue'
import NpsDailyMetrics from './npsDailyMetrics.vue'
import NpsResolutionMetrics from './npsResolutionMetrics.vue'
import NpsPulseMetrics from './npsPulseMetrics.vue'

const emit = defineEmits(['export'])

const handleExport = (format) => {
  emit('export', format)
}

const props = defineProps({
  data: {
    type: Object,
    default: () => null
  },
  loading: {
    type: Boolean,
    default: false
  },
  enableExport: {
    type: Boolean,
    default: false
  },
  showResolutionChart: {
    type: Boolean,
    default: false,
  },
  showCsatPulseChart: {
    type: Boolean,
    default: false,
  },
})

const showResolutionChart = computed(() => props.showResolutionChart)
const showCsatPulseChart = computed(() => props.showCsatPulseChart)

const optionalChartsCount = computed(
  () =>
    (showResolutionChart.value ? 1 : 0) + (showCsatPulseChart.value ? 1 : 0),
)

const layoutMode = computed(() => {
  if (optionalChartsCount.value === 1) return 'three'
  if (optionalChartsCount.value === 2) return 'four'
  return 'two'
})
</script>
