<template>
  <div class="nps-metrics-container">
    <NpsOverviewMetrics
      :data="data"
      :loading="loading"
      :enable-export="enableExport"
      @export="handleExport"
    />
    <NpsDailyMetrics
      :data="data"
      :loading="loading"
      :enable-export="enableExport"
      @export="handleExport"
    />
    <NpsResolutionMetrics
      v-if="showResolutionChart"
      :data="data"
      :loading="loading"
    />
    <NpsPulseMetrics
      v-if="showCsatPulseChart"
      :data="data"
      :loading="loading"
    />
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
</script>

<style scoped>
.nps-metrics-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
