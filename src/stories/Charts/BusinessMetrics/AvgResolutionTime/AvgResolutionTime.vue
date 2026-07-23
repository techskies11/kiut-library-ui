<template>
  <ChartMetricContainer
    class="w-full min-h-0 self-start"
    :title="chartTitle"
    subtitle="How long conversations take to resolve"
    :collapsible="false"
    :loading="loading"
  >
    <template #headerExport>
      <FooterExport
        v-if="enableExport && !loading"
        variant="inline"
        :loading="exportLoading"
        @export="handleExport"
      />
    </template>
    <template #headerAside>
      <div class="flex justify-end">
        <div class="w-52">
          <Select
            :model-value="selectedBreakdown"
            :options="BREAKDOWN_OPTIONS"
            @update:model-value="onBreakdownChange"
          />
        </div>
      </div>
    </template>
    <div
      class="flex min-h-0 w-full shrink-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
    >
      <div class="w-full shrink-0 flex min-h-0 flex-col">
        <section
          v-if="dataChart.labels.length && dataChart.datasets.length"
          class="flex w-full shrink-0 flex-col gap-4 sm:gap-6"
        >
          <div
            class="chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden"
          >
            <LineChart :data="dataChart" :options="chartOptions" :theme="theme" />
          </div>

          <div
            v-if="activeCards.length"
            class="grid w-full gap-3 md:gap-4"
            :style="cardInfoGridStyle"
          >
            <CardInfo
              v-for="item in activeCards"
              :key="`card-${item.key}`"
              class="min-w-0"
              :color="item.color"
              :title="item.label"
              :value="item.formattedValue"
              :subvalue="item.subvalue"
            />
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
              No resolution time data available
            </p>
            <p
              class="m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]"
            >
              No conversations found for the selected period. Try adjusting
              the date range.
            </p>
          </div>
        </section>
      </div>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'
import moment from 'moment'
import LineChart from '../../Line/ChartLine.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import CardInfo from '../../Utils/CardInfo/CardInfo.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { formatDurationSeconds } from '../../formatDuration'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'
import Select, { type KiutSelectOption, type KiutSelectValue } from '../../../../components/Inputs/Select.vue'
import { normalizeAgentDisplayName } from '../../../../utils/agentDisplayName'

interface AvgResolutionTimeDayBreakdown {
  ai_agent: number | null
  human: number | null
  hybrid: number | null
}

interface AvgResolutionTimeBreakdownItem {
  key: string
  label: string
  total_conversations: number
  avg_resolution_time_seconds: number | null
  avg_resolution_time_formatted: string | null
  percentage: number
}

interface AvgResolutionTimeData {
  ai_agent_total_conversations: number
  ai_agent_avg_resolution_time_seconds: number | null
  ai_agent_avg_resolution_time_formatted: string | null
  human_total_conversations: number
  human_avg_resolution_time_seconds: number | null
  human_avg_resolution_time_formatted: string | null
  hybrid_total_conversations: number
  hybrid_avg_resolution_time_seconds: number | null
  hybrid_avg_resolution_time_formatted: string | null
  overall_total_conversations?: number
  overall_avg_resolution_time_seconds?: number | null
  overall_avg_resolution_time_formatted?: string | null
  resolution_time_by_day: Record<string, AvgResolutionTimeDayBreakdown>
  overall_resolution_time_by_day?: Record<string, number | null>
  channel_breakdown_items?: AvgResolutionTimeBreakdownItem[]
  channel_resolution_time_by_day?: Record<string, Record<string, number | null>>
  agent_breakdown_items?: AvgResolutionTimeBreakdownItem[]
  agent_resolution_time_by_day?: Record<string, Record<string, number | null>>
  agent_channel_breakdown_items?: AvgResolutionTimeBreakdownItem[]
  agent_channel_resolution_time_by_day?: Record<string, Record<string, number | null>>
}

const props = withDefaults(
  defineProps<{
    loading?: boolean
    data?: AvgResolutionTimeData | null
    breakdownBy?: string
    theme?: Theme
    enableExport?: boolean
    exportLoading?: boolean
  }>(),
  {
    loading: false,
    data: null,
    breakdownBy: 'all',
    theme: undefined,
    enableExport: false,
    exportLoading: false,
  },
)

const emit = defineEmits<{
  changeBreakdown: [value: string]
  export: [format: ExportFormat]
}>()

const handleExport = (format: ExportFormat): void => {
  emit('export', format)
}

const BREAKDOWN_OPTIONS: KiutSelectOption<KiutSelectValue>[] = [
  { value: 'all', label: 'All' },
  { value: 'agent', label: 'Agent' },
  { value: 'resolution_mode', label: 'Resolution Mode' },
  { value: 'channel', label: 'Channel' },
  { value: 'agent_channel', label: 'Channel & Agent' },
]

const theme = toRef(props, 'theme')
const { isDark } = useThemeDetection(theme)
const selectedBreakdown = ref(props.breakdownBy)

const chartTitle = computed(() => {
  const titleSuffix: Record<string, string> = {
    resolution_mode: 'Resolution Mode',
    agent: 'Agent',
    channel: 'Channel',
    agent_channel: 'Channel & Agent',
  }
  const suffix = titleSuffix[selectedBreakdown.value]
  return suffix ? `Average resolution time by ${suffix}` : 'Average resolution time'
})

const onBreakdownChange = (value: KiutSelectValue): void => {
  selectedBreakdown.value = String(value)
  emit('changeBreakdown', selectedBreakdown.value)
}

const OVERALL_COLOR = '#8b5cf6'

const SEGMENTS = [
  { key: 'ai_agent', label: 'AI Agent', color: '#8b5cf6' },
  { key: 'human', label: 'Human', color: '#f59e0b' },
  { key: 'hybrid', label: 'AI + Human', color: '#06b6d4' },
] as const

// Keep in sync with ChannelMetrics.vue's `channelColorMap` ("Conversations by
// Channel" chart) so the same channel always renders with the same color
// across both charts.
const CHANNEL_COLOR_MAP: Record<string, string> = {
  wsp: '#25D366',
  whatsapp: '#25D366',
  voice: '#8b5cf6',
  sms: '#f59e0b',
  web_chat: '#06b6d4',
  email: '#ec4899',
  messenger: '#0084ff',
  telegram: '#0088cc',
  instagram: '#E4405F',
}
const DEFAULT_CHANNEL_COLOR = '#9ca3af'

const getChannelColor = (channelKey: string): string =>
  CHANNEL_COLOR_MAP[channelKey.toLowerCase()] || DEFAULT_CHANNEL_COLOR

// Keep in sync with TopAgents.vue's `colorMap` ("Top Agents" chart) so the
// same agent always renders with the same color across both charts.
const AGENT_COLOR_MAP: Record<string, string> = {
  checkin: '#3B82F6',
  faq: '#EF4444',
  disruption_manager: '#F59E0B',
  booking_manager: '#a78bfa',
  triage: '#10B981',
  seller: '#06B6D4',
  human: '#F472B6',
  agency: '#6366F1',
  loyalty: '#EAB308',
}
const DEFAULT_AGENT_COLOR = '#94a3b8'

const getAgentColor = (agentKey: string): string =>
  AGENT_COLOR_MAP[agentKey.toLowerCase()] || DEFAULT_AGENT_COLOR

// Combined "agent | channel" keys are colored by their agent half, so the
// same agent keeps a consistent hue regardless of which channel it is paired
// with in this breakdown.
const getAgentChannelColor = (key: string): string => {
  const [agentPart] = key.split('|').map((part) => part.trim())
  return getAgentColor(agentPart || key)
}

const formatBreakdownLabel = (label: string): string => {
  if (!label) return 'Unknown'
  const normalized = normalizeAgentDisplayName(label).replace(/_/g, ' ').trim()
  if (!normalized) return 'Unknown'
  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

const metricsData = computed<AvgResolutionTimeData>(() => {
  return (
    props.data ?? {
      ai_agent_total_conversations: 0,
      ai_agent_avg_resolution_time_seconds: null,
      ai_agent_avg_resolution_time_formatted: null,
      human_total_conversations: 0,
      human_avg_resolution_time_seconds: null,
      human_avg_resolution_time_formatted: null,
      hybrid_total_conversations: 0,
      hybrid_avg_resolution_time_seconds: null,
      hybrid_avg_resolution_time_formatted: null,
      overall_total_conversations: 0,
      overall_avg_resolution_time_seconds: null,
      overall_avg_resolution_time_formatted: null,
      resolution_time_by_day: {},
      overall_resolution_time_by_day: {},
      channel_breakdown_items: [],
      channel_resolution_time_by_day: {},
      agent_breakdown_items: [],
      agent_resolution_time_by_day: {},
      agent_channel_breakdown_items: [],
      agent_channel_resolution_time_by_day: {},
    }
  )
})

const dataChart = ref<{ labels: string[]; datasets: any[] }>({
  labels: [],
  datasets: [],
})

const segmentCards = computed(() => {
  const data = metricsData.value
  const totalsBySegment: Record<string, number> = {
    ai_agent: data.ai_agent_total_conversations,
    human: data.human_total_conversations,
    hybrid: data.hybrid_total_conversations,
  }
  const formattedBySegment: Record<string, string | null> = {
    ai_agent: data.ai_agent_avg_resolution_time_formatted,
    human: data.human_avg_resolution_time_formatted,
    hybrid: data.hybrid_avg_resolution_time_formatted,
  }

  return SEGMENTS.map((segment) => ({
    key: segment.key,
    label: segment.label,
    color: segment.color,
    formattedValue: formattedBySegment[segment.key] || '-',
    subvalue: `${totalsBySegment[segment.key] || 0} conversations`,
  }))
})

const buildBreakdownCards = (
  items: AvgResolutionTimeBreakdownItem[],
  colorFn: (key: string) => string,
) =>
  items.map((item) => ({
    key: item.key,
    label: formatBreakdownLabel(item.label),
    color: colorFn(item.key),
    formattedValue: item.avg_resolution_time_formatted || '-',
    subvalue: `${item.total_conversations} conversations (${item.percentage.toFixed(1)}%)`,
  }))

const channelCards = computed(() =>
  buildBreakdownCards(metricsData.value.channel_breakdown_items ?? [], getChannelColor),
)
const agentCards = computed(() =>
  buildBreakdownCards(metricsData.value.agent_breakdown_items ?? [], getAgentColor),
)
const agentChannelCards = computed(() =>
  buildBreakdownCards(
    metricsData.value.agent_channel_breakdown_items ?? [],
    getAgentChannelColor,
  ),
)

const activeCards = computed(() => {
  switch (selectedBreakdown.value) {
    case 'channel':
      return channelCards.value
    case 'agent':
      return agentCards.value
    case 'agent_channel':
      return agentChannelCards.value
    case 'resolution_mode':
      return segmentCards.value
    default:
      // "All" is the single blended average shown by the chart line itself;
      // no highlight card is needed alongside it.
      return []
  }
})

const cardInfoGridStyle = computed(() => {
  const cols = activeCards.value.length
  if (cols <= 0) return undefined
  return { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }
})

const secondsToMinutes = (seconds: number | null): number | null => {
  if (seconds === null || seconds === undefined) return null
  return Number((seconds / 60).toFixed(2))
}

// Kept alongside `dataChart` (indexed the same way: [datasetIndex][dataIndex])
// so the tooltip can format the exact, unrounded seconds value instead of
// reversing the display-scaled (rounded-to-minutes) chart value back to
// seconds, which would lose precision.
const rawSecondsByDataset = ref<(number | null)[][]>([])

const processOverallChartData = (data: AvgResolutionTimeData | null): void => {
  const byDay = data?.overall_resolution_time_by_day ?? {}
  const dates = Object.keys(byDay).sort((a, b) => a.localeCompare(b))

  if (!dates.length) {
    dataChart.value = { labels: [], datasets: [] }
    rawSecondsByDataset.value = []
    return
  }

  rawSecondsByDataset.value = [dates.map((date) => byDay[date] ?? null)]

  dataChart.value = {
    labels: dates.map((date) => moment(date).format('MMM DD')),
    datasets: [
      {
        label: 'All',
        data: rawSecondsByDataset.value[0].map((seconds) => secondsToMinutes(seconds)),
        borderColor: OVERALL_COLOR,
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.35,
        spanGaps: true,
      },
    ],
  }
}

const processSegmentChartData = (data: AvgResolutionTimeData | null): void => {
  const byDay = data?.resolution_time_by_day ?? {}
  const dates = Object.keys(byDay).sort((a, b) => a.localeCompare(b))

  if (!dates.length) {
    dataChart.value = { labels: [], datasets: [] }
    rawSecondsByDataset.value = []
    return
  }

  rawSecondsByDataset.value = SEGMENTS.map((segment) =>
    dates.map((date) => byDay[date]?.[segment.key] ?? null),
  )

  dataChart.value = {
    labels: dates.map((date) => moment(date).format('MMM DD')),
    datasets: SEGMENTS.map((segment, index) => ({
      label: segment.label,
      data: rawSecondsByDataset.value[index].map((seconds) => secondsToMinutes(seconds)),
      borderColor: segment.color,
      backgroundColor: 'transparent',
      fill: false,
      tension: 0.35,
      spanGaps: true,
    })),
  }
}

const processBreakdownChartData = (
  byDay: Record<string, Record<string, number | null>>,
  items: AvgResolutionTimeBreakdownItem[],
  colorFn: (key: string) => string,
): void => {
  const dates = Object.keys(byDay).sort((a, b) => a.localeCompare(b))

  if (!dates.length || !items.length) {
    dataChart.value = { labels: [], datasets: [] }
    rawSecondsByDataset.value = []
    return
  }

  const keys = items.map((item) => item.key)

  rawSecondsByDataset.value = keys.map((key) => dates.map((date) => byDay[date]?.[key] ?? null))

  dataChart.value = {
    labels: dates.map((date) => moment(date).format('MMM DD')),
    datasets: keys.map((key, index) => {
      const item = items.find((entry) => entry.key === key)
      return {
        label: formatBreakdownLabel(item?.label || key),
        data: rawSecondsByDataset.value[index].map((seconds) => secondsToMinutes(seconds)),
        borderColor: colorFn(key),
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.35,
        spanGaps: true,
      }
    }),
  }
}

const processChartData = (data: AvgResolutionTimeData | null): void => {
  switch (selectedBreakdown.value) {
    case 'channel':
      processBreakdownChartData(
        data?.channel_resolution_time_by_day ?? {},
        data?.channel_breakdown_items ?? [],
        getChannelColor,
      )
      return
    case 'agent':
      processBreakdownChartData(
        data?.agent_resolution_time_by_day ?? {},
        data?.agent_breakdown_items ?? [],
        getAgentColor,
      )
      return
    case 'agent_channel':
      processBreakdownChartData(
        data?.agent_channel_resolution_time_by_day ?? {},
        data?.agent_channel_breakdown_items ?? [],
        getAgentChannelColor,
      )
      return
    case 'resolution_mode':
      processSegmentChartData(data)
      return
    default:
      processOverallChartData(data)
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
        label: (context: any) => {
          const label = context.dataset.label || ''
          const rawSeconds = rawSecondsByDataset.value[context.datasetIndex]?.[context.dataIndex]
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

watch(
  () => props.breakdownBy,
  (newValue) => {
    selectedBreakdown.value = newValue
    processChartData(props.data ?? null)
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
