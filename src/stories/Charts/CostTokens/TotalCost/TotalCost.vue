<template>
  <ChartMetricContainer
    class="h-full min-h-0"
    title="Total Cost"
    :collapsible="false"
    :loading="loading"
  >
    <div
      class="flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
    >
        <div class="container-value">
          <div class="value">
            {{ formattedTotalCost }}
          </div>
        </div>

        <div class="stats-section">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-label">Daily Average</div>
              <div class="stat-value">{{ formattedDailyMean }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Peak Day</div>
              <div class="stat-date">{{ peakDayDate }}</div>
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
    totalCost?: number
    dailyMean?: number
    peakDayDate?: string
    peakDayValue?: number
    loading?: boolean
  }>(),
  {
    totalCost: 0,
    dailyMean: 0,
    peakDayDate: '-',
    peakDayValue: 0,
    loading: false,
  },
)

const formattedTotalCost = computed(() => useCurrencyFormat(props.totalCost))
const formattedDailyMean = computed(() => useCurrencyFormat(props.dailyMean))
const formattedPeakValue = computed(() => useCurrencyFormat(props.peakDayValue))
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
  background-image: linear-gradient(to right, #7f22fe, #155dfc);
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

  .stat-label {
    font-size: 0.625rem;
  }

  .stat-value {
    font-size: 0.875rem;
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
