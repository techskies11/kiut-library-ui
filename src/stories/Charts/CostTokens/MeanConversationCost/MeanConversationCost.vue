<template>
  <ChartMetricContainer
    class="h-full min-h-0"
    title="Mean Conversation Cost"
    :collapsible="false"
    :loading="loading"
  >
    <div
      class="flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
    >
        <div class="container-value">
          <div class="value" :class="getCostColorClass(mean)">
            {{ meanFormatted }}
          </div>
        </div>

        <div class="stats-section">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-label">Min (daily)</div>
              <div class="stat-value">
                {{ minFormatted }}
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Peak Day</div>
              <div class="stat-date">{{ peakDay }}</div>
              <div class="stat-value">{{ formattedPeakValue }}</div>
            </div>
          </div>
        </div>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { useCurrencyFormat } from '../../../../plugins/numberFormat'

const props = withDefaults(
  defineProps<{
    mean?: number
    minDaily?: number
    peakDay?: string
    peakDayValue?: number
    loading?: boolean
  }>(),
  {
    mean: 0,
    minDaily: 0,
    peakDay: '-',
    peakDayValue: 0,
    loading: false,
  },
)

const meanFormatted = computed(() => useCurrencyFormat(props.mean))
const minFormatted = computed(() => useCurrencyFormat(props.minDaily))
const formattedPeakValue = computed(() => useCurrencyFormat(props.peakDayValue))

const getCostColorClass = (value: number) => {
  if (value === null || value === undefined || isNaN(value)) return 'cost-neutral'
  if (value < 0.05) return 'cost-low'
  if (value <= 0.12) return 'cost-medium'
  return 'cost-high'
}
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
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: transparent;
}

.cost-neutral {
  color: #9ca3af;
  background: none;
  -webkit-text-fill-color: unset;
}

.cost-low {
  background: linear-gradient(to right, #22c55e, #10b981);
  background-clip: text;
  -webkit-background-clip: text;
}

.cost-medium {
  background: linear-gradient(to right, #facc15, #ca8a04);
  background-clip: text;
  -webkit-background-clip: text;
}

.cost-high {
  background: linear-gradient(to right, #ef4444, #b91c1c);
  background-clip: text;
  -webkit-background-clip: text;
}

.stats-section {
  padding-top: 0.75rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.stat-item {
  text-align: center;
  padding: 0.625rem;
  background-color: var(--kiut-bg-stats-badge, rgba(255, 255, 255, 0.6));
  border: 1px solid var(--kiut-border-light);
  border-radius: 1.125rem;
}

.stat-label {
  color: var(--kiut-text-secondary, #6a7282);
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-weight: bold;
  font-size: 1rem;
  color: var(--kiut-text-primary, #1e2939);
}

.stat-date {
  font-size: 0.75rem;
  color: var(--kiut-text-primary, #101112);
  margin-bottom: 0.125rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  .value {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .stats-grid {
    gap: 0.5rem;
  }

  .stat-item {
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .value {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .stats-section {
    padding-top: 0.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: 0.5rem 0.75rem;
  }

  .stat-label {
    margin-bottom: 0;
  }
}
</style>
