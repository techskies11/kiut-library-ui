<template>
  <ChartMetricContainer
    class="csat-container-root w-full"
    title="CSAT"
    subtitle="Customer satisfaction score distribution and daily trend metrics."
    :default-open="containerInitiallyOpen"
  >
    <div class="csat-container__body">
      <NpsMetrics
        :data="data"
        :loading="loading"
        :enable-export="enableExport"
        @export="handleExport"
      />
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import NpsMetrics from '../Nps/npsMetrics.vue'
import type { ExportFormat } from '../../Utils/FooterExport'

export interface CSATContainerExportPayload {
  source: 'npsMetrics'
  format: ExportFormat
}

withDefaults(
  defineProps<{
    containerInitiallyOpen?: boolean
    loading?: boolean
    enableExport?: boolean
    /** Shape NpsMetrics.vue */
    data?: object
  }>(),
  {
    containerInitiallyOpen: false,
    loading: false,
    enableExport: false,
    data: undefined,
  }
)

const emit = defineEmits<{
  export: [payload: CSATContainerExportPayload]
}>()

function handleExport(format: ExportFormat) {
  emit('export', { source: 'npsMetrics', format })
}
</script>

<style scoped>
.csat-container__body {
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: fadeIn 0.45s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
