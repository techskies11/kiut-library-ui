<template>
  <article class="glass-card rounded-2xl p-6 w-full border border-purple-200/20 shadow-glass transition-all duration-300 hover:shadow-glass-lg">
    <header class="flex items-center gap-4 mb-6">
      <!-- Gradient Accent Bar -->
      <div class="w-1.5 h-12 bg-gradient-cyan-purple rounded-full"></div>
      <div class="flex-1">
        <h3 class="font-display font-bold text-xl text-gray-800 dark:text-gray-100">
          NPS Overview Metrics
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 font-sans">
          Overall NPS Distribution
        </p>
      </div>
      <!-- Stats Badge -->
      <div v-if="npsData && npsData.total_nps_responses > 0" class="stats-badge">
        <span class="text-xs font-semibold text-white">
          {{ npsData.total_nps_responses }} responses
        </span>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="loading-spinner"></div>
    </div>
    
    <!-- Histogram Section -->
    <div v-else-if="npsData && npsData.total_nps_responses > 0" class="histogram-container">
      <HistogramChart
        :histogram="npsData.histogram || []"
        :min-score="npsData.min_score || 0"
        :max-score="npsData.max_score || 0"
        :q1-score="npsData.q1_score || 0"
        :median-score="npsData.median_score || 0"
        :q3-score="npsData.q3_score || 0"
        :average-score="npsData.average_score || 0"
        :chart-width="chartWidth"
        :chart-height="chartHeight"
        :chart-margin="chartMargin"
        :chart-bottom-margin="chartBottomMargin"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon-wrapper">
        <ChartBarIcon class="w-8 h-8 text-purple-400" />
      </div>
      <p class="text-gray-600 dark:text-gray-300 text-center text-sm font-medium mb-1">
        No NPS data for the selected period
      </p>
      <span class="text-xs text-gray-400 dark:text-gray-500">
        Try adjusting the date range or check your filters
      </span>
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { getNpsMetrics } from '../../../../services/modules/business-metrics'
import moment from 'moment'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import HistogramChart from '../../Histogram/HistogramChart.vue'

const props = defineProps({
  dates: {
    type: Array,
    required: true
  },
  airline_name: {
    type: String,
    required: true
  }
})

const npsData = ref(null)
const loading = ref(true)

// Chart dimensions (responsive to container width)
const chartWidth = computed(() => {
  // Use 100% of container width minus padding
  return Math.max(600, window.innerWidth * 0.85)
})
const chartHeight = 500
const chartMargin = 60
const chartBottomMargin = 80

const searchData = async () => {
  try {
    loading.value = true
    const startDate = moment(props.dates[0]).format('YYYY-MM-DD')
    const endDate = moment(props.dates[1]).format('YYYY-MM-DD')
    const response = await getNpsMetrics(props.airline_name, startDate, endDate)
    console.log('NPS Overview Data received:', response)
    npsData.value = response
  } catch (error) {
    console.error('Error fetching NPS overview data:', error)
    npsData.value = null
  } finally {
    loading.value = false
  }
}

onMounted(async () => searchData())
watch(() => props.dates, async () => props.dates[0] && props.dates[1] && searchData())
</script>

<style scoped>
/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.dark .glass-card {
  background: rgba(26, 26, 29, 0.8);
}

/* Gradient Accent */
.bg-gradient-cyan-purple {
  background: linear-gradient(180deg, #73D1D3 0%, #5D4B93 100%);
}

/* Stats Badge */
.stats-badge {
  background: linear-gradient(135deg, #C67DFF 0%, #5D4B93 100%);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  box-shadow: 0 4px 15px rgba(198, 125, 255, 0.3);
}

/* Loading Spinner */
.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(198, 125, 255, 0.2);
  border-top-color: #C67DFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
}

.empty-icon-wrapper {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, rgba(198, 125, 255, 0.1) 0%, rgba(93, 75, 147, 0.1) 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border: 1px solid rgba(198, 125, 255, 0.2);
}

/* Histogram Container */
.histogram-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
}

/* Shadow Utilities */
.shadow-glass {
  box-shadow: 0 8px 32px rgba(93, 75, 147, 0.1);
}

.shadow-glass-lg {
  box-shadow: 0 12px 48px rgba(93, 75, 147, 0.15);
}
</style>
