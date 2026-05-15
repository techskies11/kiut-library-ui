<template>
  <ChartMetricContainer
    class="w-full min-h-0 self-start"
    title="Interactions by Channel"
    subtitle="Responses sent by AI agents"
    :collapsible="false"
  >
    <template
      v-if="
        enableExport &&
        !props.loading
      "
      #headerExport
    >
      <FooterExport
        variant="inline"
        :loading="exportLoading"
        @export="handleExport"
      />
    </template>
    <div
      class="flex min-h-0 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
      :class="props.loading ? 'flex-1' : 'w-full shrink-0'"
    >
      <div
        v-if="props.loading"
        class="flex min-h-[380px] flex-1 flex-col items-center justify-center px-4"
      >
        <div class="mb-6 flex h-[100px] items-end justify-center gap-2.5">
          <div
            v-for="(pct, i) in loaderBarHeights"
            :key="i"
            class="w-2 animate-pulse rounded bg-gradient-to-t from-violet-400 via-violet-600 to-violet-500 opacity-70 shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] dark:from-violet-500 dark:via-violet-400 dark:to-violet-300"
            :class="loaderDelays[i]"
            :style="{ height: `${pct}%` }"
          />
        </div>
        <p
          class="animate-pulse text-[15px] font-medium tracking-tight text-[var(--kiut-text-secondary,#6b7280)]"
        >
          Loading channel metrics...
        </p>
      </div>

      <template v-else>
        <section
          v-if="dataChart.labels && dataChart.labels.length"
          class="flex w-full shrink-0 flex-col gap-4 sm:gap-6"
        >
          <div
            class="chart-line-area flex h-[230px] w-full min-w-0 shrink-0 flex-col overflow-hidden"
          >
            <LineChart :data="dataChart" :theme="theme" />
          </div>
          <div
            v-if="channelTotalsTop4.length"
            :class="cardInfoGridClass"
          >
            <CardInfo
              v-for="ch in channelTotalsTop4"
              :key="ch.name"
              :color="ch.color"
              :title="ch.label"
              :value="`${ch.percentage}%`"
              :subvalue="`${useNumberFormat(ch.total)} msgs`"
            />
          </div>
        </section>

        <section
          v-else-if="channelTotals.length"
          class="flex w-full shrink-0 flex-col gap-4 sm:gap-6"
        >
          <div :class="cardInfoGridClass">
            <CardInfo
              v-for="ch in channelTotalsTop4"
              :key="ch.name"
              :color="ch.color"
              :title="ch.label"
              :value="`${ch.percentage}%`"
              :subvalue="`${useNumberFormat(ch.total)} msgs`"
            />
          </div>
        </section>

        <section v-if="!channelTotals.length" class="flex min-h-[280px] flex-1 items-center justify-center">
          <div class="max-w-[360px] px-4 text-center">
            <div
              class="mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]"
            >
              <ChartBarIcon class="h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" />
            </div>
            <p
              class="mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]"
            >
              No channel metrics data available
            </p>
            <p
              class="m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]"
            >
              No channel data found for the selected period. Try adjusting the date range.
            </p>
          </div>
        </section>
      </template>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { ref, watch, computed, toRef } from 'vue'
import moment from 'moment'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import LineChart from '../../Line/ChartLine.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import CardInfo from '../../Utils/CardInfo/CardInfo.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

const loaderBarHeights = [30, 50, 70, 50, 40]
const loaderDelays = ['', 'delay-100', 'delay-200', 'delay-300', 'delay-[400ms]']

interface ChannelsByDay {
  [date: string]: {
    [channel: string]: number
  }
}

interface TotalByChannel {
  [channel: string]: number
}

interface MetricsData {
  airline_name?: string
  start_date?: string
  end_date?: string
  channels_by_day: ChannelsByDay
  total_by_channel: TotalByChannel
  total_conversations: number
}

const props = withDefaults(
  defineProps<{
    loading?: boolean
    data?: MetricsData | null
    theme?: Theme
    enableExport?: boolean
    exportLoading?: boolean
  }>(),
  {
    loading: false,
    data: null,
    theme: undefined,
    enableExport: false,
    exportLoading: false,
  },
)

const emit = defineEmits<{
  export: [format: ExportFormat]
}>()

const handleExport = (format: ExportFormat) => {
  emit('export', format)
}

const theme = toRef(props, 'theme')
const { isDark } = useThemeDetection(theme)

const channelColorMap: Record<string, string> = {
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

const dataChart = ref<{ labels: string[]; datasets: any[] }>({ labels: [], datasets: [] })
const metricsData = computed<MetricsData>(
  () =>
    props.data ?? {
      channels_by_day: {},
      total_by_channel: {},
      total_conversations: 0,
    },
)

const channelTotals = computed(() => {
  const totalByChannel = metricsData.value.total_by_channel || {}
  const grandTotal = Object.values(totalByChannel).reduce((sum, v) => sum + v, 0)
  if (grandTotal === 0) return []

  return Object.entries(totalByChannel)
    .sort(([, a], [, b]) => b - a)
    .map(([name, total]) => ({
      name,
      label: name.toUpperCase(),
      total,
      percentage: ((total / grandTotal) * 100).toFixed(1),
      color: channelColorMap[name.toLowerCase()] || '#9ca3af',
    }))
})

const channelTotalsTop4 = computed(() => channelTotals.value.slice(0, 4))

/** Reparto horizontal: 3 cards → 3 columnas al 100% del ancho. */
const cardInfoGridClass = computed(() => {
  const n = channelTotalsTop4.value.length
  if (n <= 1) return 'grid w-full grid-cols-1 gap-3 sm:gap-4'
  if (n === 2) return 'grid w-full grid-cols-2 gap-3 sm:gap-4'
  if (n === 3) return 'grid w-full grid-cols-3 gap-3 sm:gap-4'
  return 'grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4'
})

const processChartData = (data: MetricsData | null) => {
  if (!data || !data.channels_by_day) {
    dataChart.value = { labels: [], datasets: [] }
    return
  }

  const daysData = data.channels_by_day
  const labels = Object.keys(daysData).sort()

  if (labels.length === 0) {
    dataChart.value = { labels: [], datasets: [] }
    return
  }

  const categoriesSet = new Set<string>()
  for (const dayData of Object.values(daysData)) {
    for (const category of Object.keys(dayData)) {
      categoriesSet.add(category)
    }
  }
  const categories = Array.from(categoriesSet)

  const datasets = categories.map((category) => {
    const normalizedCategory = category.toLowerCase()
    const color = channelColorMap[normalizedCategory] || '#9ca3af'

    return {
      label: category.toUpperCase(),
      data: labels.map((date) => daysData[date]?.[category] || 0),
      borderColor: color,
    }
  })

  dataChart.value = {
    labels: labels.map((date) => moment(date).format('MMM DD')),
    datasets,
  }
}

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
/* Coincide con ChartLine: 220px trazado + 10px banda de indicadores/leyenda */
.chart-line-area {
  position: relative;
  min-height: 0;
}
</style>
