<template>
  <ChartMetricContainer class="h-full min-h-0" title="Total Tokens" :collapsible="false" :loading="loading">
    <div
      class="flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
    >
        <div class="container-value">
          <div class="value">
            {{ formattedTotalTokens }}
          </div>
        </div>

        <div class="stats-section">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-label">Input</div>
              <div class="stat-value">{{ formattedInputTokens }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Output</div>
              <div class="stat-value">{{ formattedOutputTokens }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Cache Read</div>
              <div class="stat-value">{{ formattedCacheReadTokens }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Cache Write</div>
              <div class="stat-value">{{ formattedCacheWriteTokens }}</div>
            </div>
          </div>
        </div>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { useNumberFormat } from '../../../../plugins/numberFormat'

const props = withDefaults(
  defineProps<{
    totalTokens?: number
    inputTokens?: number
    outputTokens?: number
    cacheReadTokens?: number
    cacheWriteTokens?: number
    loading?: boolean
  }>(),
  {
    totalTokens: 0,
    inputTokens: 0,
    outputTokens: 0,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    loading: false,
  },
)

const formattedTotalTokens = computed(() => useNumberFormat(props.totalTokens))
const formattedInputTokens = computed(() => useNumberFormat(props.inputTokens))
const formattedOutputTokens = computed(() => useNumberFormat(props.outputTokens))
const formattedCacheReadTokens = computed(() => useNumberFormat(props.cacheReadTokens))
const formattedCacheWriteTokens = computed(() => useNumberFormat(props.cacheWriteTokens))
</script>

<style scoped>
.container-value {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.value {
  font-weight: bold;
  background-image: linear-gradient(to right, #2563eb, #4f46e5);
  background-clip: text;
  color: transparent;
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.stats-section {
  padding-top: 0.75rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.stat-item {
  text-align: center;
  padding: 0.375rem;
  background-color: var(--kiut-bg-stats-badge, rgba(255, 255, 255, 0.6));
  border: 1px solid var(--kiut-border-light);
  border-radius: 1.125rem;
}

.stat-label {
  color: var(--kiut-text-secondary, #6a7282);
  font-size: 0.625rem;
  line-height: 0.875rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  margin-bottom: 0.125rem;
}

.stat-value {
  font-weight: bold;
  font-size: 0.8125rem;
  color: var(--kiut-text-primary, #1e2939);
}

@media (max-width: 768px) {
  .value {
    font-size: 1.5rem;
    line-height: 2rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .value {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}
</style>
