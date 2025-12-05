<template>
  <div class="nps-metrics-container">
    <NpsOverviewMetrics
      :data="data"
      :loading="loading"
    />
    <NpsDailyMetrics
      :data="data"
      :loading="loading"
    />
  </div>
</template>

<script setup>
import NpsOverviewMetrics from './npsOverviewMetrics.vue'
import NpsDailyMetrics from './npsDailyMetrics.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => null
  },
  loading: {
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
