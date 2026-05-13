<template>
  <ChartMetricContainer
    class="w-full min-h-0 self-start"
    title="Interactions by Agent"
    subtitle="Responses sent by AI agents"
    :collapsible="false"
  >
    <template
      v-if="
        enableExport &&
        !props.loading &&
        ((dataChart.labels && dataChart.labels.length > 0) ||
          agentTotals.length > 0)
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
          Loading agent metrics...
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
            <LineChart :data="dataChart" :options="options" :theme="theme" />
          </div>
          <div
            v-if="agentTotalsTop4.length"
            :class="cardInfoGridClass"
          >
            <CardInfo
              v-for="agent in agentTotalsTop4"
              :key="agent.name"
              :color="agent.color"
              :title="agent.label"
              :value="`${agent.percentage}%`"
              :subvalue="`${useNumberFormat(agent.total)} msgs`"
            />
          </div>
        </section>

        <section
          v-else-if="agentTotals.length"
          class="flex w-full shrink-0 flex-col gap-4 sm:gap-6"
        >
          <div :class="cardInfoGridClass">
            <CardInfo
              v-for="agent in agentTotalsTop4"
              :key="agent.name"
              :color="agent.color"
              :title="agent.label"
              :value="`${agent.percentage}%`"
              :subvalue="`${useNumberFormat(agent.total)} msgs`"
            />
          </div>
        </section>

        <section v-if="!agentTotals.length" class="flex min-h-[280px] flex-1 items-center justify-center">
          <div class="max-w-[360px] px-4 text-center">
            <div
              class="mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-[20px] bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]"
            >
              <ChartBarIcon class="h-10 w-10 text-[var(--kiut-primary,#8b5cf6)]" />
            </div>
            <p
              class="mb-2 text-lg font-semibold tracking-tight text-[var(--kiut-text-primary,#171717)] dark:text-[var(--kiut-text-primary,#e5e5e5)]"
            >
              No agent interactions data
            </p>
            <p
              class="m-0 text-sm leading-relaxed text-[var(--kiut-text-secondary,#737373)] dark:text-[var(--kiut-text-secondary,#a3a3a3)]"
            >
              Try adjusting the date range or check your filters to see agent interaction trends.
            </p>
          </div>
        </section>
      </template>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import moment from 'moment'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import LineChart from '../../Line/ChartLine.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import CardInfo from '../../Utils/CardInfo/CardInfo.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'
import { useNumberFormat } from '../../../../plugins/numberFormat'

const loaderBarHeights = [30, 50, 70, 50, 40]
const loaderDelays = ['', 'delay-100', 'delay-200', 'delay-300', 'delay-[400ms]']

interface AgentsByDay {
  [date: string]: {
    [category: string]: number
  }
}

interface AgentInteractionsData {
  airline_name?: string
  start_date?: string
  end_date?: string
  agents_by_day?: AgentsByDay
  total_unique_agents?: number
}

const colorMap: Record<string, string> = {
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

const props = withDefaults(
  defineProps<{
    data?: AgentInteractionsData
    loading?: boolean
    options?: Record<string, any>
    theme?: Theme
    enableExport?: boolean
    exportLoading?: boolean
  }>(),
  {
    data: () => ({}),
    loading: false,
    options: undefined,
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

const dataChart = computed(() => {
  const daysData = props.data?.agents_by_day || {}
  const sortedLabels = Object.keys(daysData).sort()

  if (sortedLabels.length === 0) {
    return { labels: [], datasets: [] }
  }

  const categoriesSet = new Set<string>()
  for (const dayData of Object.values(daysData)) {
    for (const category of Object.keys(dayData)) {
      categoriesSet.add(category)
    }
  }
  const categories = Array.from(categoriesSet)

  const datasets = categories.map((category) => {
    const normalized = category.toLowerCase()
    const color = colorMap[normalized] || colorMap[category] || '#94a3b8'
    return {
      label: category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' '),
      data: sortedLabels.map((date) => daysData[date]?.[category] || 0),
      borderColor: color,
    }
  })

  return {
    labels: sortedLabels.map((date) => moment(date).format('MMM DD')),
    datasets,
  }
})

const agentTotals = computed(() => {
  const daysData = props.data?.agents_by_day || {}
  const totalsMap: Record<string, number> = {}

  for (const dayData of Object.values(daysData)) {
    for (const [agent, count] of Object.entries(dayData)) {
      totalsMap[agent] = (totalsMap[agent] || 0) + count
    }
  }

  const grandTotal = Object.values(totalsMap).reduce((sum, v) => sum + v, 0)
  if (grandTotal === 0) return []

  return Object.entries(totalsMap)
    .sort(([, a], [, b]) => b - a)
    .map(([name, total]) => {
      const normalized = name.toLowerCase()
      return {
        name,
        label: name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' '),
        total,
        percentage: ((total / grandTotal) * 100).toFixed(1),
        color: colorMap[normalized] || colorMap[name] || '#94a3b8',
      }
    })
})

const agentTotalsTop4 = computed(() => agentTotals.value.slice(0, 4))

/** Reparto horizontal: 3 cards → 3 columnas al 100% del ancho. */
const cardInfoGridClass = computed(() => {
  const n = agentTotalsTop4.value.length
  if (n <= 1) return 'grid w-full grid-cols-1 gap-3 sm:gap-4'
  if (n === 2) return 'grid w-full grid-cols-2 gap-3 sm:gap-4'
  if (n === 3) return 'grid w-full grid-cols-3 gap-3 sm:gap-4'
  return 'grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4'
})

defineExpose({ isDark })
</script>

<style scoped>
/* Coincide con ChartLine: 220px trazado + 10px banda de indicadores/leyenda (230px) */
.chart-line-area {
  position: relative;
  min-height: 0;
}
</style>
