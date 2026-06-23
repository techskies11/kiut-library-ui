<template>
  <div
    class="nps-metrics-container flex flex-col gap-6 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
  >
    <div class="grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2">
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

    <div
      v-if="showOptionalCharts"
      class="grid w-full items-start gap-6"
      :class="optionalChartsGridClass"
    >
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
        :enable-export="enableExport"
        @export="handleExport"
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

const showOptionalCharts = computed(() => optionalChartsCount.value > 0)

const optionalChartsGridClass = computed(() =>
  optionalChartsCount.value > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1',
)
</script>
