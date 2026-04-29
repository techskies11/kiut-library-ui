<template>
  <details class="csat-container-card metric-collapsible" :open="containerInitiallyOpen">
    <summary class="card-header metric-collapsible__summary csat-container__summary">
      <div class="header-content">
        <h2 class="csat-container__title font-sans">CSAT</h2>
        <p class="csat-container__subtitle font-sans">
          Customer satisfaction score distribution and daily trend metrics.
        </p>
      </div>
      <svg class="metric-collapsible__chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>

    <div class="csat-container__body">
      <NpsMetrics
        :data="data"
        :loading="loading"
        :enable-export="enableExport"
        @export="handleExport"
      />
    </div>
  </details>
</template>

<script setup lang="ts">
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
    containerInitiallyOpen: true,
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
@import '../metric-collapsible.css';

.csat-container-card {
  font-family: var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif), 'Inter', sans-serif;
  background: var(--kiut-bg-card-gradient);
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: var(--kiut-shadow-card);
  transition:
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.csat-container-card:hover {
  box-shadow: var(--kiut-shadow-card-hover);
  transform: translateY(-2px);
}

.csat-container__summary {
  margin-bottom: 0;
}

.metric-collapsible[open] .csat-container__summary {
  margin-bottom: 20px;
}

.csat-container__title {
  margin: 0;
  line-height: 1.35;
  letter-spacing: -0.02em;
  font-weight: 600;
  font-size: 1.375rem;
  background: linear-gradient(135deg, var(--kiut-primary-light, #818cf8), var(--kiut-primary-default, #6366f1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.csat-container__subtitle {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--kiut-text-secondary);
  margin: 4px 0 0 0;
  line-height: 1.25rem;
}

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
