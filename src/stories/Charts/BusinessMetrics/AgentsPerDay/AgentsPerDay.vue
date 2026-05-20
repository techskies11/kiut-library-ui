<template>
  <ChartMetricContainer
    title="Agents Total Messages per Day"
    subtitle="Daily agent interactions (stacked)"
    :collapsible="false"
  >
    <template #headerExport>
      <FooterExport
        v-if="enableExport && !loading"
        variant="inline"
        :loading="exportLoading"
        @export="handleExport"
      />
    </template>
    <div
      class="ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:min-h-0 ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]"
    >
      <div
        v-if="loading"
        class="ku:flex ku:min-h-[320px] ku:flex-col ku:items-center ku:justify-center ku:px-4"
      >
        <div class="ku:mb-6 ku:flex ku:h-[100px] ku:items-end ku:justify-center ku:gap-2.5">
          <div
            v-for="(pct, i) in loaderBarHeights"
            :key="i"
            class="ku:w-2 ku:animate-pulse ku:rounded ku:bg-gradient-to-t ku:from-violet-400 ku:via-violet-600 ku:to-violet-500 ku:opacity-70 ku:shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] ku:dark:from-violet-500 ku:dark:via-violet-400 ku:dark:to-violet-300"
            :class="loaderDelays[i]"
            :style="{ height: `${pct}%` }"
          />
        </div>
        <p
          class="ku:animate-pulse ku:text-[15px] ku:font-medium ku:tracking-tight ku:text-[var(--kiut-text-secondary,#6b7280)]"
        >
          Loading chart data...
        </p>
      </div>

      <section
        v-else-if="chartData.labels && chartData.labels.length"
        class="ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:gap-4 ku:sm:gap-6"
      >
        <div class="ku:w-full ku:shrink-0 ku:sm:pr-2">
          <BarChart :data="chartData" :stacked="true" :theme="theme" :options="options" />
        </div>
      </section>

      <section v-else class="ku:flex ku:min-h-[280px] ku:w-full ku:items-center ku:justify-center">
        <div class="ku:max-w-[360px] ku:text-center">
          <div
            class="ku:mx-auto ku:mb-5 ku:inline-flex ku:h-20 ku:w-20 ku:items-center ku:justify-center ku:rounded-[20px] ku:bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] ku:shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]"
          >
            <ChartBarIcon class="ku:h-10 ku:w-10 ku:text-[var(--kiut-primary,#8b5cf6)]" />
          </div>
          <p
            class="ku:mb-2 ku:text-lg ku:font-semibold ku:tracking-tight ku:text-[var(--kiut-text-primary,#171717)] ku:dark:text-[var(--kiut-text-primary,#e5e5e5)]"
          >
            No agents data per day
          </p>
          <p
            class="ku:m-0 ku:text-sm ku:leading-relaxed ku:text-[var(--kiut-text-secondary,#737373)] ku:dark:text-[var(--kiut-text-secondary,#a3a3a3)]"
          >
            Try adjusting the date range or check your filters to see daily agent interactions.
          </p>
        </div>
      </section>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import BarChart from '../../Bar/ChartBar.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

interface AgentsByDay {
  [date: string]: {
    [category: string]: number
  }
}

interface AgentsPerDayData {
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
    data?: AgentsPerDayData
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

const loaderBarHeights = [30, 50, 70, 50, 40]
const loaderDelays = ['', 'ku:delay-100', 'ku:delay-200', 'ku:delay-300', 'ku:delay-[400ms]']

const theme = toRef(props, 'theme')
const options = toRef(props, 'options')

const { isDark } = useThemeDetection(theme)

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}-${month}`
}

const chartData = computed(() => {
  const daysData = props.data?.agents_by_day || {}
  const sortedKeys = Object.keys(daysData).sort()

  if (sortedKeys.length === 0) {
    return { labels: [], datasets: [] }
  }

  const labels = sortedKeys.map((d) => formatDate(d))

  const categoriesSet = new Set<string>()
  for (const dayData of Object.values(daysData)) {
    for (const category of Object.keys(dayData)) {
      categoriesSet.add(category)
    }
  }
  const categories = Array.from(categoriesSet)

  const borderFromBg = (color: string): string => color

  const datasets = categories.map((category) => ({
    label: category,
    data: sortedKeys.map((date) => daysData[date]?.[category] || 0),
    backgroundColor: `${colorMap[category] || '#94a3b8'}80`,
    borderColor: borderFromBg(colorMap[category] || '#94a3b8'),
    borderWidth: 1,
  }))

  return {
    labels,
    datasets,
  }
})

defineExpose({ isDark })
</script>
