<template>
  <ChartMetricContainer
    class="w-full min-h-0 self-start"
    :title="props.title"
    :subtitle="props.subtitle"
    :collapsible="false"
    :loading="props.loading"
  >
    <template #headerExport>
      <FooterExport
        v-if="enableExport && !props.loading"
        variant="inline"
        :loading="exportLoading"
        @export="handleExport"
      />
    </template>
    <div
      class="flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
    >
      <section
        v-if="dataChart.labels.length && dataChart.datasets.length"
        class="flex w-full shrink-0 flex-col gap-4"
      >
        <div
          class="chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden"
        >
          <LineChart :data="dataChart as never" :options="chartOptions" :theme="theme" />
        </div>
      </section>

      <section
        v-else
        class="flex min-h-[280px] flex-1 items-center justify-center"
      >
        <div class="max-w-[360px] px-4 text-center">
          <p
            class="mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]"
          >
            {{ props.emptyTitle }}
          </p>
          <p
            class="m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]"
          >
            {{ props.emptyDescription }}
          </p>
        </div>
      </section>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'
import moment from 'moment'
import LineChart from '../../Line/ChartLine.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

export interface CheckinInteractionsData {
  avg_checkin_interactions_to_complete?: number | null
  avg_checkin_interactions_by_day?: Record<string, number | null>
}

const SERIES_COLOR = '#8b5cf6'

const props = withDefaults(
  defineProps<{
    loading?: boolean
    data?: CheckinInteractionsData | null
    theme?: Theme
    enableExport?: boolean
    exportLoading?: boolean
    title?: string
    subtitle?: string
    emptyTitle?: string
    emptyDescription?: string
  }>(),
  {
    loading: false,
    data: null,
    theme: undefined,
    enableExport: false,
    exportLoading: false,
    title: 'Avg interactions to complete',
    subtitle: 'Average number of interaction turns from initiated to check-in closed',
    emptyTitle: 'No check-in interaction data',
    emptyDescription:
      'No completed check-in flows found for the selected period. Try adjusting the date range.',
  },
)

const emit = defineEmits<{
  export: [format: ExportFormat]
}>()

const handleExport = (format: ExportFormat): void => {
  emit('export', format)
}

const theme = toRef(props, 'theme')
const { isDark } = useThemeDetection(theme)

const dataChart = ref<{ labels: string[]; datasets: Array<Record<string, unknown>> }>({
  labels: [],
  datasets: [],
})

const rawValuesByDay = ref<(number | null)[]>([])

const formatInteractions = (value: number | null): string => {
  if (value === null || value === undefined) return '-'
  return value.toFixed(1)
}

const hasChartValues = (byDay: Record<string, number | null>): boolean => {
  return Object.values(byDay).some((value) => value !== null && value !== undefined)
}

const processChartData = (data: CheckinInteractionsData | null): void => {
  const byDay = data?.avg_checkin_interactions_by_day ?? {}
  const dates = Object.keys(byDay).sort((a, b) => a.localeCompare(b))

  if (!dates.length || !hasChartValues(byDay)) {
    dataChart.value = { labels: [], datasets: [] }
    rawValuesByDay.value = []
    return
  }

  rawValuesByDay.value = dates.map((date) => byDay[date] ?? null)

  dataChart.value = {
    labels: dates.map((date) => moment(date).format('MMM DD')),
    datasets: [
      {
        label: 'Avg interactions to complete',
        data: rawValuesByDay.value,
        borderColor: SERIES_COLOR,
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.35,
        spanGaps: true,
      },
    ],
  }
}

const chartOptions = computed(() => ({
  scales: {
    y: {
      min: 0,
      ticks: {
        callback: (value: number | string) => Number(value).toFixed(0),
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: { datasetIndex: number; dataIndex: number; dataset: { label?: string } }) => {
          const label = context.dataset.label || ''
          const rawValue = rawValuesByDay.value[context.dataIndex]
          if (rawValue === null || rawValue === undefined) return `${label}: -`
          return `${label}: ${formatInteractions(rawValue)}`
        },
      },
    },
  },
}))

watch(
  () => props.data,
  (newData) => {
    processChartData(newData ?? null)
  },
  { deep: true, immediate: true },
)

defineExpose({ isDark })
</script>

<style scoped>
.chart-line-area {
  position: relative;
  min-height: 0;
}
</style>
