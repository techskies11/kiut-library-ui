<template>
  <component
    :is="embedded ? 'div' : ChartMetricContainer"
    :class="embedded ? 'w-full min-h-0' : 'w-full min-h-0 self-start'"
    v-bind="containerProps"
  >
    <template v-if="!embedded" #headerExport>
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
  </component>
</template>

<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'
import moment from 'moment'
import LineChart from '../../Line/ChartLine.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { formatDurationSeconds } from '../../formatDuration'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

export interface CheckinCompletionTimeData {
  avg_checkin_completion_time_seconds?: number | null
  avg_checkin_completion_time_formatted?: string | null
  avg_checkin_completion_time_by_day?: Record<string, number | null>
}

const SERIES_COLOR = '#8b5cf6'

const props = withDefaults(
  defineProps<{
    loading?: boolean
    data?: CheckinCompletionTimeData | null
    theme?: Theme
    enableExport?: boolean
    exportLoading?: boolean
    title?: string
    subtitle?: string
    emptyTitle?: string
    emptyDescription?: string
    /** Skip ChartMetricContainer chrome when nested in a parent with a view select. */
    embedded?: boolean
  }>(),
  {
    loading: false,
    data: null,
    theme: undefined,
    enableExport: false,
    exportLoading: false,
    embedded: false,
    title: 'Avg check-in completion time',
    subtitle: 'Daily average from initiated to boarding pass issued or error',
    emptyTitle: 'No check-in completion time data',
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

const containerProps = computed(() =>
  props.embedded
    ? {}
    : {
        title: props.title,
        subtitle: props.subtitle,
        collapsible: false,
        loading: props.loading,
      },
)

const dataChart = ref<{ labels: string[]; datasets: Array<Record<string, unknown>> }>({
  labels: [],
  datasets: [],
})

const rawSecondsByDay = ref<(number | null)[]>([])

const secondsToMinutes = (seconds: number | null): number | null => {
  if (seconds === null || seconds === undefined) return null
  return Number((seconds / 60).toFixed(2))
}

const hasChartValues = (byDay: Record<string, number | null>): boolean => {
  return Object.values(byDay).some((value) => value !== null && value !== undefined)
}

const processChartData = (data: CheckinCompletionTimeData | null): void => {
  const byDay = data?.avg_checkin_completion_time_by_day ?? {}
  const dates = Object.keys(byDay).sort((a, b) => a.localeCompare(b))

  if (!dates.length || !hasChartValues(byDay)) {
    dataChart.value = { labels: [], datasets: [] }
    rawSecondsByDay.value = []
    return
  }

  rawSecondsByDay.value = dates.map((date) => byDay[date] ?? null)

  dataChart.value = {
    labels: dates.map((date) => moment(date).format('MMM DD')),
    datasets: [
      {
        label: 'Avg completion time',
        data: rawSecondsByDay.value.map((seconds) => secondsToMinutes(seconds)),
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
        callback: (value: number | string) => `${value}m`,
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: { datasetIndex: number; dataIndex: number; dataset: { label?: string } }) => {
          const label = context.dataset.label || ''
          const rawSeconds = rawSecondsByDay.value[context.dataIndex]
          if (rawSeconds === null || rawSeconds === undefined) return `${label}: -`
          return `${label}: ${formatDurationSeconds(rawSeconds)}`
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
