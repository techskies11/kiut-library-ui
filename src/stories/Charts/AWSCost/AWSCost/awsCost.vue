<template>
  <article class="rounded-xl shadow-md bg-white p-6">
    <header class="flex gap-3 mb-6 items-start">
      <div class="w-2 h-10 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mt-1"></div>
      <div class="text-left flex-1">
        <h3 class="font-bold text-xl text-gray-800">AWS Cost</h3>
        <p class="text-sm text-gray-500">AWS vs Allocated costs over time</p>
      </div>
      <div class="flex flex-col items-end">
        <span class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Cost</span>
        <span class="px-3 rounded-md bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 text-lg font-bold text-gray-800">
          {{ useCurrencyFormat(total) }}
        </span>
      </div>
    </header>

    <div v-if="!loading" class="flex flex-col gap-4">
      <section v-if="dataChart.labels.length">
        <LineChart :data="dataChart" :options="lineOptions" />
      </section>
      <section v-else>
        <div class="flex flex-col items-center justify-center py-12">
          <ChartBarIcon class="w-12 h-12 text-gray-400 mb-3" />
          <p class="text-gray-500 text-center text-sm mb-1">No AWS cost data for the selected period.</p>
          <span class="text-xs text-gray-400">Try adjusting the date range or check your filters.</span>
        </div>
      </section>
    </div>
    <div class="flex justify-center items-center" v-else>
      <Skeleton width="100%" height="230px" />
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import moment from 'moment'
import { getAwsCostPerAirlineDetailed } from '../../services/modules/aws'
import LineChart from '../../components/charts/LineChart.vue'
import { Skeleton } from 'primevue'
import { useCurrencyFormat } from '../../plugins/numberFormat'
import { ChartBarIcon } from '@heroicons/vue/24/outline'

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

const loading = ref(true)
const dataChart = ref({})
const lineOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
    title: { display: true, text: 'AWS vs Allocated Cost per day' }
  },
  elements: {
    point: { radius: 2 }
  },
  scales: {
    y: {
      type: 'linear',
      position: 'left',
      title: { display: true, text: 'USD' },
      beginAtZero: true
    },
    y1: {
      type: 'linear',
      position: 'right',
      grid: { drawOnChartArea: false },
      title: { display: true, text: 'Conversations' },
      beginAtZero: true,
      suggestedMax: undefined
    }
  }
})
const total = ref(0)

const loadData = async () => {
  try {
    loading.value = true
    const startDate = moment(props.dates[0]).format('YYYY-MM-DD')
    const endDate = moment(props.dates[1]).format('YYYY-MM-DD')
    // Use per-airline API and stack costs by service
    const { total: t, totalAllocated, days, awsCostSeries, allocatedCostSeries, airlineConversationsSeries } = await getAwsCostPerAirlineDetailed(props.airline_name, startDate, endDate)
    total.value = typeof totalAllocated === 'number' && totalAllocated > 0 ? totalAllocated : t

    const labels = (days || []).map(d => moment(d).format('DD-MM'))

    dataChart.value = {
      labels,
      datasets: [
        { label: 'AWS Cost', data: awsCostSeries || [], borderColor: '#22c55e', backgroundColor: '#22c55e40', tension: 0.3, yAxisID: 'y' },
        { label: 'Allocated Cost', data: allocatedCostSeries || [], borderColor: '#3b82f6', backgroundColor: '#3b82f640', tension: 0.3, yAxisID: 'y' },
        { label: 'Conversations', data: airlineConversationsSeries || [], borderColor: '#f59e0b', backgroundColor: '#f59e0b40', tension: 0.2, yAxisID: 'y1' }
      ]
    }

    // Dynamically suggest max for conversation axis to avoid 0..1 scale
    const maxConv = Math.max(...((airlineConversationsSeries && airlineConversationsSeries.length ? airlineConversationsSeries : [0])))
    lineOptions.value = {
      ...lineOptions.value,
      scales: {
        ...lineOptions.value.scales,
        y1: { ...lineOptions.value.scales.y1, suggestedMax: maxConv > 0 ? Math.ceil(maxConv * 1.1) : 5 }
      }
    }
  } catch (e) {
    console.error(e)
    dataChart.value = { labels: [], datasets: [] }
    total.value = 0
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
watch(() => props.dates, () => props.dates[0] && props.dates[1] && loadData())
</script>


