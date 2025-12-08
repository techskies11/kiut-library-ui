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
  </div>
</template>

<script setup>
import NpsOverviewMetrics from './npsOverviewMetrics.vue'
import NpsDailyMetrics from './npsDailyMetrics.vue'

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
  }
})
</script>

<style scoped>
.nps-metrics-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
