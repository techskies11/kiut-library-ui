<template>
  <ChartMetricContainer
    class="ku:w-full ku:min-h-0 ku:self-start"
    title="FAQ Metrics"
    subtitle="FAQ volume by category"
    :collapsible="false"
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
            class="ku:w-2 ku:animate-pulse ku:rounded ku:bg-gradient-to-t ku:from-violet-400 ku:via-violet-600 ku:to-violet-500 ku:opacity-70 ku:shadow-[var(--kiut-shadow-loader,0_4px_14px_rgba(139,92,246,0.25))] ku:dark:from-violet-500 ku:dark:via-violet-400 ku:dark:to-violet-300"
            :class="loaderDelays[i]"
            :style="{ height: `${pct}%` }"
          />
        </div>
        <p
          class="ku:animate-pulse ku:text-[15px] ku:font-medium ku:tracking-tight ku:text-[var(--kiut-text-secondary,#6b7280)]"
        >
          Loading FAQ metrics...
        </p>
      </div>

      <template v-else>
        <section
          v-if="dataChart.labels && dataChart.labels.length"
          class="ku:flex ku:w-full ku:shrink-0 ku:flex-col ku:gap-3"
        >
          <div
            class="chart-line-area ku:flex ku:h-[230px] ku:w-full ku:min-w-0 ku:shrink-0 ku:flex-col ku:overflow-hidden"
          >
            <LineChart :data="dataChart" :theme="theme" />
          </div>
          <div :class="cardInfoGridClass">
            <CardInfo
              v-for="card in faqMetricCards"
              :key="card.name"
              :color="card.color"
              :title="card.label"
              :value="card.value"
              :subvalue="card.subvalue"
            />
          </div>
        </section>

        <section v-else class="ku:flex ku:min-h-[280px] ku:flex-1 ku:items-center ku:justify-center">
          <div class="ku:max-w-[360px] ku:px-4 ku:text-center">
            <div
              class="ku:mx-auto ku:mb-5 ku:inline-flex ku:h-20 ku:w-20 ku:items-center ku:justify-center ku:rounded-[20px] ku:bg-[var(--kiut-bg-empty-icon,rgba(139,92,246,0.12))] ku:shadow-[var(--kiut-shadow-empty-icon,0_8px_24px_rgba(139,92,246,0.15))]"
            >
              <svg
                class="ku:h-10 ku:w-10 ku:text-[var(--kiut-primary,#8b5cf6)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p
              class="ku:mb-2 ku:text-lg ku:font-semibold ku:tracking-tight ku:text-[var(--kiut-text-primary,#171717)] ku:dark:text-[var(--kiut-text-primary,#e5e5e5)]"
            >
              No FAQ data available
            </p>
            <p
              class="ku:m-0 ku:text-sm ku:leading-relaxed ku:text-[var(--kiut-text-secondary,#737373)] ku:dark:text-[var(--kiut-text-secondary,#a3a3a3)]"
            >
              No FAQ consultation data found for the selected period. Try adjusting the date range.
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
import LineChart from '../../Line/ChartLine.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import CardInfo from '../../Utils/CardInfo/CardInfo.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

const loaderBarHeights = [30, 50, 70, 50, 40]
const loaderDelays = ['', 'ku:delay-100', 'ku:delay-200', 'ku:delay-300', 'ku:delay-[400ms]']

interface FaqDayData {
  date: string
  faq_events_count: number
  documents_found_count: number
  airline_information_retrieved_count: number
  booking_info_retrieved_count: number
  flight_status_retrieved_count: number
}

interface MetricsData {
  total_faq_events: number
  total_documents_found: number
  total_airline_information_retrieved: number
  total_booking_info_retrieved: number
  total_flight_status_retrieved: number
  faq_by_day: FaqDayData[]
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

const faqColorMap: Record<string, string> = {
  airline_information: '#8b5cf6',
  booking_info: '#f59e0b',
  flight_status: '#06b6d4',
}

const dataChart = ref<{ labels: string[]; datasets: any[] }>({ labels: [], datasets: [] })
const metricsData = computed<MetricsData>(
  () =>
    props.data ?? {
      total_faq_events: 0,
      total_documents_found: 0,
      total_airline_information_retrieved: 0,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 0,
      faq_by_day: [],
    },
)

const faqMetricCards = computed(() => {
  const m = metricsData.value
  const catSum =
    m.total_airline_information_retrieved +
    m.total_booking_info_retrieved +
    m.total_flight_status_retrieved
  const catPct = (n: number) => (catSum > 0 ? ((n / catSum) * 100).toFixed(1) : '0.0')
  const faqEvents = m.total_faq_events
  const docSubvalue =
    faqEvents > 0 ? `${((m.total_documents_found / faqEvents) * 100).toFixed(1)}% of FAQ events` : undefined

  return [
    {
      name: 'airline_information',
      label: 'Airline Info',
      color: faqColorMap.airline_information,
      value: `${catPct(m.total_airline_information_retrieved)}%`,
      subvalue: `${useNumberFormat(m.total_airline_information_retrieved)} consultas`,
    },
    {
      name: 'booking_info',
      label: 'Booking Info',
      color: faqColorMap.booking_info,
      value: `${catPct(m.total_booking_info_retrieved)}%`,
      subvalue: `${useNumberFormat(m.total_booking_info_retrieved)} consultas`,
    },
    {
      name: 'flight_status',
      label: 'Flight Status',
      color: faqColorMap.flight_status,
      value: `${catPct(m.total_flight_status_retrieved)}%`,
      subvalue: `${useNumberFormat(m.total_flight_status_retrieved)} consultas`,
    },
    {
      name: 'documents_found',
      label: 'Documents found',
      color: '#64748b',
      value: useNumberFormat(m.total_documents_found),
      subvalue: docSubvalue,
    },
  ]
})

/** Reparto horizontal: 3 cards → 3 columnas al 100% del ancho. */
const cardInfoGridClass = computed(() => {
  const n = faqMetricCards.value.length
  if (n <= 1) return 'ku:grid ku:w-full ku:grid-cols-1 ku:gap-3 ku:sm:gap-4'
  if (n === 2) return 'ku:grid ku:w-full ku:grid-cols-2 ku:gap-3 ku:sm:gap-4'
  if (n === 3) return 'ku:grid ku:w-full ku:grid-cols-3 ku:gap-3 ku:sm:gap-4'
  return 'ku:grid ku:w-full ku:grid-cols-2 ku:gap-3 ku:sm:grid-cols-4 ku:sm:gap-4'
})

const processChartData = (data: MetricsData | null) => {
  if (!data) {
    dataChart.value = { labels: [], datasets: [] }
    return
  }

  const faqData = data.faq_by_day || []

  if (faqData.length > 0) {
    const labels = faqData.map((item: FaqDayData) => moment(item.date).format('MMM DD'))
    const airlineInfo = faqData.map((item: FaqDayData) => item.airline_information_retrieved_count || 0)
    const flightStatus = faqData.map((item: FaqDayData) => item.flight_status_retrieved_count || 0)
    const bookingInfo = faqData.map((item: FaqDayData) => item.booking_info_retrieved_count || 0)

    dataChart.value = {
      labels,
      datasets: [
        {
          label: 'Airline Information',
          data: airlineInfo,
          borderColor: faqColorMap.airline_information,
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          fill: true,
        },
        {
          label: 'Flight Status',
          data: flightStatus,
          borderColor: faqColorMap.flight_status,
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          fill: true,
        },
        {
          label: 'Booking Information',
          data: bookingInfo,
          borderColor: faqColorMap.booking_info,
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          fill: true,
        },
      ],
    }
  } else {
    dataChart.value = { labels: [], datasets: [] }
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
