<template>
  <ChartMetricContainer
    class="ku:w-full ku:min-h-0 ku:self-start"
    title="Human escalations"
    subtitle="% of conversations transferred to human agents"
    :collapsible="false"
  >
    <template #headerAside>
      <div class="ku:flex ku:justify-end">
        <select
          v-model="selectedBreakdown"
          class="ku:rounded-xl ku:border ku:border-[var(--kiut-border-light,#d1d5db)] ku:bg-[var(--kiut-bg-card,#ffffff)] ku:px-3 ku:py-2 ku:text-sm ku:text-[var(--kiut-text-primary,#111827)] ku:dark:border-[var(--kiut-border-light,#374151)] ku:dark:bg-[var(--kiut-bg-card,#111827)] ku:dark:text-[var(--kiut-text-primary,#f9fafb)]"
          @change="emitChangeBreakdown"
        >
          <option value="all">All</option>
          <option value="agent">By Agent</option>
          <option value="channel">By Channel</option>
          <option value="agent_channel">By Agent/Channel</option>
        </select>
      </div>
    </template>
    <div
      class="ku:flex ku:min-h-0 ku:flex-col ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
      :class="props.loading ? 'ku:flex-1' : 'ku:w-full ku:shrink-0'"
    >
      <div
        v-if="props.loading"
        class="ku:flex ku:min-h-[380px] ku:flex-1 ku:flex-col ku:items-center ku:justify-center ku:px-4"
      >
        <div class="ku:mb-6 ku:flex ku:h-[100px] ku:items-end ku:justify-center ku:gap-2.5">
          <div
            v-for="(pct, i) in loaderBarHeights"
            :key="i"
            class="ku:w-2 ku:animate-pulse ku:rounded ku:bg-gradient-to-t ku:from-violet-400 ku:via-violet-600 ku:to-violet-500 ku:opacity-70"
            :class="loaderDelays[i]"
            :style="{ height: `${pct}%` }"
          />
        </div>
        <p class="ku:animate-pulse ku:text-[15px] ku:font-medium ku:tracking-tight ku:text-[var(--kiut-text-secondary,#6b7280)]">
          Loading human escalations...
        </p>
      </div>

      <template v-else>
        <section
          v-if="dataChart.labels && dataChart.labels.length && dataChart.datasets.length"
          class="ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:gap-4 ku:sm:gap-6"
        >
          <div class="chart-line-area ku:flex ku:h-[230px] ku:w-full ku:min-w-0 ku:shrink-0 ku:flex-col ku:overflow-hidden">
            <LineChart :data="dataChart" :theme="theme" />
          </div>

          <div class="ku:flex ku:flex-wrap ku:gap-4">
            <div
              v-for="item in legendItems"
              :key="`legend-${item.key}`"
              class="ku:inline-flex ku:items-center ku:gap-2 ku:text-sm"
            >
              <span class="ku:inline-block ku:h-2.5 ku:w-2.5 ku:rounded-full" :style="{ backgroundColor: item.color }"></span>
              <span class="ku:text-[var(--kiut-text-primary,#111827)]">{{ item.label }}</span>
            </div>
          </div>

          <div class="ku:grid ku:w-full ku:grid-cols-1 ku:gap-3 ku:sm:grid-cols-2 ku:lg:grid-cols-5">
            <div
              v-for="item in topCards"
              :key="`card-${item.key}`"
              class="ku:rounded-xl ku:border ku:border-[var(--kiut-border-light,#e5e7eb)] ku:p-3"
            >
              <p class="ku:flex ku:items-center ku:gap-2 ku:truncate ku:text-sm ku:font-medium ku:text-[var(--kiut-text-secondary,#6b7280)]">
                <span class="ku:inline-block ku:h-2.5 ku:w-2.5 ku:rounded-full" :style="{ backgroundColor: item.color }"></span>
                <span class="ku:truncate">{{ item.label }}</span>
              </p>
              <p class="ku:mt-1 ku:text-2xl ku:font-bold ku:text-[var(--kiut-text-primary,#111827)]">
                {{ item.percentage.toFixed(1) }}%
              </p>
            </div>
          </div>
        </section>

        <section v-else class="ku:flex ku:min-h-[280px] ku:flex-1 ku:items-center ku:justify-center">
          <div class="ku:max-w-[360px] ku:px-4 ku:text-center">
            <p
              class="ku:mb-2 ku:text-lg ku:font-semibold ku:tracking-tight ku:text-[var(--kiut-text-primary,#171717)] ku:dark:text-[var(--kiut-text-primary,#e5e5e5)]"
            >
              No human escalations data available
            </p>
            <p
              class="ku:m-0 ku:text-sm ku:leading-relaxed ku:text-[var(--kiut-text-secondary,#737373)] ku:dark:text-[var(--kiut-text-secondary,#a3a3a3)]"
            >
              No escalation data found for the selected period. Try adjusting the date range.
            </p>
          </div>
        </section>
      </template>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'
import moment from 'moment'
import LineChart from '../../Line/ChartLine.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

interface HumanEscalationBreakdownItem {
  key: string
  label: string
  total_escalated_conversations: number
  percentage: number
}

interface HumanEscalationBreakdownDayItem {
  key: string
  label: string
  escalated_conversations: number
  percentage: number
}

interface HumanEscalationGroupedDay {
  date: string
  total_escalated_conversations: number
  items: HumanEscalationBreakdownDayItem[]
}

interface HumanEscalationsData {
  total_conversations: number
  total_escalated_conversations: number
  escalation_rate_percentage: number
  breakdown_by?: string
  breakdown_items?: HumanEscalationBreakdownItem[]
  breakdown_by_day?: HumanEscalationGroupedDay[]
  escalations_by_day: Array<{
    date: string
    total_conversations: number
    total_escalated_conversations: number
    escalation_rate_percentage: number
  }>
}

const props = withDefaults(
  defineProps<{
    loading?: boolean
    data?: HumanEscalationsData | null
    breakdownBy?: string
    theme?: Theme
  }>(),
  {
    loading: false,
    data: null,
    breakdownBy: 'all',
    theme: undefined,
  },
)

const emit = defineEmits<{
  changeBreakdown: [value: string]
}>()

const loaderBarHeights = [30, 50, 70, 50, 40]
const loaderDelays = ['', 'ku:delay-100', 'ku:delay-200', 'ku:delay-300', 'ku:delay-[400ms]']
const theme = toRef(props, 'theme')
const { isDark } = useThemeDetection(theme)
const selectedBreakdown = ref(props.breakdownBy)

const metricsData = computed<HumanEscalationsData>(() => {
  return (
    props.data ?? {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: 'all',
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: [],
    }
  )
})

const dataChart = ref<{ labels: string[]; datasets: any[] }>({ labels: [], datasets: [] })
const topCards = ref<Array<{ key: string; label: string; percentage: number; color: string }>>([])
const legendItems = ref<Array<{ key: string; label: string; color: string }>>([])
const palette = ['#3b82f6', '#f59e0b', '#06b6d4', '#8b5cf6', '#22c55e', '#ef4444', '#14b8a6']

const getColor = (index: number): string => palette[index % palette.length]

const emitChangeBreakdown = (): void => {
  emit('changeBreakdown', selectedBreakdown.value)
}

const formatSeriesLabel = (label: string): string => {
  if (!label) return ''
  const normalizedLabel = label.replace(/_/g, ' ').trim()
  const withoutStateSuffix = normalizedLabel.replace(/\s+state$/i, '').trim()
  if (!withoutStateSuffix) return ''
  return withoutStateSuffix.charAt(0).toUpperCase() + withoutStateSuffix.slice(1)
}

const processChartData = (data: HumanEscalationsData | null): void => {
  if (selectedBreakdown.value === 'all') {
    const daily = data?.escalations_by_day ?? []
    if (!daily.length) {
      dataChart.value = { labels: [], datasets: [] }
      topCards.value = []
      legendItems.value = []
      return
    }

    const sorted = [...daily].sort((a, b) => a.date.localeCompare(b.date))
    dataChart.value = {
      labels: sorted.map(item => moment(item.date).format('MMM DD')),
      datasets: [
        {
          label: 'All',
          data: sorted.map(item => Number(item.escalation_rate_percentage || 0)),
          borderColor: '#8b5cf6',
          backgroundColor: 'transparent',
          fill: false,
          tension: 0.35,
        },
      ],
    }
    topCards.value = []
    legendItems.value = []
    return
  }

  const breakdownDays = data?.breakdown_by_day ?? []
  const breakdownItems = data?.breakdown_items ?? []

  if (!breakdownDays.length) {
    dataChart.value = { labels: [], datasets: [] }
    topCards.value = []
    legendItems.value = []
    return
  }

  const sortedDays = [...breakdownDays].sort((a, b) => a.date.localeCompare(b.date))
  const seriesKeys = breakdownItems.slice(0, 5).map(item => item.key)
  const labels = sortedDays.map(day => moment(day.date).format('MMM DD'))

  const datasets = seriesKeys.map((key, index) => {
    const item = breakdownItems.find(entry => entry.key === key)
    return {
      label: formatSeriesLabel(item?.label || key),
      data: sortedDays.map(day => {
        const found = day.items.find(entry => entry.key === key)
        return Number(found?.percentage || 0)
      }),
      borderColor: getColor(index),
      backgroundColor: 'transparent',
      fill: false,
      tension: 0.35,
    }
  })

  dataChart.value = {
    labels,
    datasets,
  }

  topCards.value = breakdownItems.slice(0, 5).map((item, index) => ({
    key: item.key,
    label: formatSeriesLabel(item.label),
    percentage: Number(item.percentage || 0),
    color: getColor(index),
  }))

  legendItems.value = breakdownItems.slice(0, 5).map((item, index) => ({
    key: item.key,
    label: formatSeriesLabel(item.label),
    color: getColor(index),
  }))
}

watch(
  () => props.data,
  newData => {
    processChartData(newData ?? null)
  },
  { deep: true, immediate: true },
)

watch(
  () => props.breakdownBy,
  newValue => {
    selectedBreakdown.value = newValue
    processChartData(metricsData.value)
  },
)

defineExpose({ isDark })
</script>

<style scoped>
.chart-line-area {
  position: relative;
  min-height: 0;
}
</style>
