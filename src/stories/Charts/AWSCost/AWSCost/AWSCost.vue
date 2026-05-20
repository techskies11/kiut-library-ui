<template>
  <ChartMetricContainer
    :title="normalizedData.airline_name || 'AWS Cost'"
    subtitle="AWS vs Allocated costs over time"
    :collapsible="false"
  >
    <div class="ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:min-h-0 ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]">
      <!-- Loading -->
      <div
        v-if="loading"
        class="ku:flex ku:min-h-[320px] ku:flex-col ku:items-center ku:justify-center ku:px-4"
      >
        <div class="ku:mb-6 ku:flex ku:h-[100px] ku:items-end ku:justify-center ku:gap-2.5">
          <div
            v-for="(pct, i) in loaderBarHeights"
            :key="i"
            class="ku:w-2 ku:animate-pulse ku:rounded ku:bg-gradient-to-t ku:from-violet-400 ku:via-violet-600 ku:to-violet-500 ku:opacity-70 ku:dark:from-violet-500 ku:dark:via-violet-400 ku:dark:to-violet-300"
            :class="loaderDelays[i]"
            :style="{ height: `${pct}%` }"
          />
        </div>
        <p class="ku:animate-pulse ku:text-[15px] ku:font-medium ku:tracking-tight ku:text-[var(--kiut-text-secondary,#6b7280)]">
          Loading chart data...
        </p>
      </div>

      <!-- Chart + totals -->
      <div v-else-if="normalizedData.daily.length > 0" class="ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:min-h-0">
        <div class="ku:flex ku:h-[230px] ku:max-h-[230px] ku:w-full ku:shrink-0 ku:flex-col ku:min-h-0 ku:mb-4">
          <ChartLine class="ku:h-full ku:min-h-0 ku:w-full" :data="chartData" :options="chartOptions" />
        </div>
        <div class="ku:grid ku:w-full ku:grid-cols-1 ku:gap-3 ku:sm:grid-cols-2">
          <CardInfo
            :color="colors.primaryLight"
            title="Total Allocated"
            :value="useCurrencyFormat(normalizedData.total_allocated_cost)"
          />
          <CardInfo
            color="#FF9900"
            title="Total AWS"
            :value="useCurrencyFormat(normalizedData.total_cost)"
          />
        </div>
      </div>

      <!-- Empty -->
      <section v-else class="ku:flex ku:min-h-[280px] ku:w-full ku:items-center ku:justify-center">
        <div class="ku:max-w-[360px] ku:text-center">
          <div
            class="ku:mx-auto ku:mb-5 ku:inline-flex ku:h-20 ku:w-20 ku:items-center ku:justify-center ku:rounded-[20px] ku:bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))]"
          >
            <ChartBarIcon class="ku:h-10 ku:w-10 ku:text-[var(--kiut-primary,#8b5cf6)]" />
          </div>
          <p class="ku:mb-2 ku:text-lg ku:font-semibold ku:tracking-tight ku:text-[var(--kiut-text-primary,#171717)] ku:dark:text-[var(--kiut-text-primary,#e5e5e5)]">
            Sin datos de costos
          </p>
          <p class="ku:m-0 ku:text-sm ku:leading-relaxed ku:text-[var(--kiut-text-secondary,#737373)] ku:dark:text-[var(--kiut-text-secondary,#a3a3a3)]">
            No se encontró información para el periodo seleccionado. Intenta ajustar el rango de fechas.
          </p>
        </div>
      </section>
    </div>
  </ChartMetricContainer>
</template>

<script setup>
import { computed, toRef } from 'vue'
import ChartLine from '../../Line/ChartLine.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import CardInfo from '../../Utils/CardInfo/CardInfo.vue'
import { useCurrencyFormat } from '../../../../plugins/numberFormat'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { useThemeDetection } from '../../../../composables/useThemeDetection'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      airline_name: '',
      start_date: '',
      end_date: '',
      daily: [],
      total_allocated_cost: 0,
      total_cost: 0,
      total_conversations: 0,
      total_airline_conversations: 0,
    }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: undefined,
  },
})

const { isDark, colors } = useThemeDetection(toRef(props, 'theme'))

const loaderBarHeights = [30, 50, 70, 50, 40]
const loaderDelays = ['', 'ku:delay-100', 'ku:delay-200', 'ku:delay-300', 'ku:delay-[400ms]']

// Normalize data: support both API shape (daily[]) and flattened shape (days + *Series)
const normalizedData = computed(() => {
  const d = props.data ?? {}
  const daily = d.daily
  const days = d.days
  const hasDaily = Array.isArray(daily) && daily.length > 0
  const hasSeries =
    Array.isArray(days) &&
    days.length > 0 &&
    Array.isArray(d.allocatedCostSeries) &&
    d.allocatedCostSeries.length === days.length

  let dailyList = []
  if (hasDaily) {
    dailyList = daily
  } else if (hasSeries) {
    dailyList = days.map((date, i) => ({
      date,
      allocated_cost: d.allocatedCostSeries[i] ?? 0,
      aws_cost: d.awsCostSeries[i] ?? 0,
      airline_conversations: d.airlineConversationsSeries[i] ?? 0,
    }))
  }

  return {
    daily: dailyList,
    total_allocated_cost: d.total_allocated_cost ?? d.totalAllocated ?? 0,
    total_cost: d.total_cost ?? d.total ?? 0,
    total_conversations: d.total_conversations ?? d.totalConversations ?? 0,
    total_airline_conversations: d.total_airline_conversations ?? d.totalAirlineConversations ?? 0,
    airline_name: d.airline_name,
  }
})

const chartData = computed(() => {
  const daily = normalizedData.value.daily
  const labels = daily.map((d) => d.date)
  return {
    labels,
    datasets: [
      {
        label: 'Allocated Cost',
        data: daily.map((d) => d.allocated_cost),
        borderColor: colors.value.primaryLight,
        backgroundColor: isDark.value ? 'rgba(198, 125, 255, 0.15)' : 'rgba(198, 125, 255, 0.08)',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
        yAxisID: 'y',
      },
      {
        label: 'AWS Cost',
        data: daily.map((d) => d.aws_cost),
        borderColor: '#FF9900',
        backgroundColor: 'transparent',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: false,
        yAxisID: 'y',
      },
      {
        label: 'Airline Conv.',
        data: daily.map((d) => d.airline_conversations),
        borderColor: colors.value.info,
        backgroundColor: isDark.value ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        yAxisID: 'y1',
      },
    ],
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 6,
      bottom: 4,
      left: 0,
      right: 4,
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    tooltip: {
      padding: 12,
      backgroundColor: colors.value.tooltipBg,
      titleColor: colors.value.tooltipText,
      bodyColor: colors.value.tooltipText,
      borderColor: colors.value.tooltipBorder,
      borderWidth: 1,
      cornerRadius: 12,
      displayColors: true,
      usePointStyle: true,
      callbacks: {
        label(context) {
          const prefix = context.dataset.label ? `${context.dataset.label}: ` : ''
          const v = context.parsed.y
          if (context.dataset.yAxisID === 'y') {
            return prefix + useCurrencyFormat(v)
          }
          return prefix + String(v)
        },
      },
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      grid: {
        color: colors.value.gridLines,
        drawBorder: false,
      },
      ticks: {
        color: colors.value.textSecondary,
        font: { family: "'Inter', ui-sans-serif, system-ui, sans-serif", size: 10 },
        callback: (val) => useCurrencyFormat(val),
      },
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: { display: false },
      ticks: {
        color: colors.value.textSecondary,
        font: { family: "'Inter', ui-sans-serif, system-ui, sans-serif", size: 10 },
      },
    },
    x: {
      grid: { display: false },
      ticks: {
        color: colors.value.textSecondary,
        font: { family: "'Inter', ui-sans-serif, system-ui, sans-serif", size: 10 },
      },
    },
  },
}))
</script>
