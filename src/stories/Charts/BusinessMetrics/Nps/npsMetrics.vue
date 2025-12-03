<template>
  <div class="nps-metrics-container">
    <!-- Header Section -->
    <header class="nps-header glass rounded-2xl p-6 mb-6 border border-purple-200/20 shadow-glass">
      <div class="flex items-center gap-4">
        <div class="icon-wrapper bg-gradient-primary p-3 rounded-xl shadow-purple-sm">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h1 class="font-display text-2xl font-bold gradient-text">NPS Analytics Dashboard</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 font-sans">Net Promoter Score Metrics & Insights</p>
        </div>
      </div>
    </header>

    <!-- Charts Grid -->
    <div class="flex flex-col gap-6">
      <NpsOverviewMetrics
        :dates="dates"
        :airline_name="airline_name"
      />
      <NpsDailyMetrics
        :dates="dates"
        :airline_name="airline_name"
      />
    </div>
  </div>
</template>

<script setup>
import NpsOverviewMetrics from './npsOverviewMetrics.vue'
import NpsDailyMetrics from './npsDailyMetrics.vue'

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
</script>

<style scoped>
.nps-metrics-container {
  padding: 1.5rem;
}

.nps-header {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.dark .nps-header {
  background: rgba(26, 26, 29, 0.7);
}

.icon-wrapper {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.icon-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(198, 125, 255, 0.4);
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, #C67DFF 0%, #5D4B93 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Gradient Background */
.bg-gradient-primary {
  background: linear-gradient(135deg, #C67DFF 0%, #5D4B93 100%);
}

/* Glass Effect */
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.dark .glass {
  background: rgba(26, 26, 29, 0.7);
}

/* Shadow utilities */
.shadow-glass {
  box-shadow: 0 8px 32px rgba(93, 75, 147, 0.1);
}

.shadow-purple-sm {
  box-shadow: 0 4px 20px rgba(198, 125, 255, 0.25);
}
</style>
