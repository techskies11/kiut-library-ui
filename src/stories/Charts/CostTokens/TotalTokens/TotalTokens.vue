<template>
  <ChartMetricContainer class="h-full min-h-0" title="Total Tokens" :collapsible="false">
    <div
      class="flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
    >
      <template v-if="!loading">
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
      </template>

      <div v-else class="loading-state">
        <div class="loading-container">
          <div class="chart-lines-loader">
            <div class="line line-1"></div>
            <div class="line line-2"></div>
            <div class="line line-3"></div>
            <div class="line line-4"></div>
            <div class="line line-5"></div>
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

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.chart-lines-loader {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
  height: 100px;
  margin-bottom: 24px;
}

.line {
  width: 8px;
  background: linear-gradient(
    to top,
    var(--kiut-primary-light) 0%,
    var(--kiut-primary) 50%,
    var(--kiut-primary-hover) 100%
  );
  border-radius: 4px;
  animation: wave 1.5s ease-in-out infinite;
  box-shadow: var(--kiut-shadow-loader);
}

.line-1 {
  height: 30%;
  animation-delay: 0s;
}
.line-2 {
  height: 50%;
  animation-delay: 0.1s;
}
.line-3 {
  height: 70%;
  animation-delay: 0.2s;
}
.line-4 {
  height: 50%;
  animation-delay: 0.3s;
}
.line-5 {
  height: 40%;
  animation-delay: 0.4s;
}

@keyframes wave {
  0%,
  100% {
    transform: scaleY(1);
    opacity: 0.7;
  }
  50% {
    transform: scaleY(1.6);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .value {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .loading-state {
    min-height: 150px;
  }

  .chart-lines-loader {
    height: 80px;
    gap: 8px;
  }

  .line {
    width: 6px;
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

  .loading-state {
    min-height: 120px;
  }

  .chart-lines-loader {
    height: 60px;
    margin-bottom: 16px;
  }
}
</style>
