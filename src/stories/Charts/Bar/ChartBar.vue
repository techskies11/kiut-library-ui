<template>
  <div class="relative h-[230px] w-full shrink-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]">
    <Bar :data="chartData" :options="computedOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useThemeDetection, type Theme } from '../../../composables/useThemeDetection'
import {
  CHART_X_MAX_TICKS,
  CHART_Y_MAX_TICKS,
  applyChartAxisTickLimits,
} from '../chartAxisTicks'
import {
  applyInterFontToChartOptions,
  CHART_INTER_FONT_FAMILY,
} from '../chartInterFont'

const props = defineProps<{
  data: {
    labels: string[]
    datasets: Array<{
      label: string
      data: number[]
      backgroundColor?: string | string[]
      borderColor?: string | string[]
      borderWidth?: number
      borderRadius?: number
    }>
  }
  options?: Record<string, any>
  stacked?: boolean
  uppercaseLegendLabels?: boolean
  theme?: Theme
}>()

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

ChartJS.defaults.font.family = CHART_INTER_FONT_FAMILY

const { isDark, colors } = useThemeDetection(toRef(props, 'theme'))

/** Leyenda en cuadrados sólidos; ChartLine usa usePointStyle + pointStyleWidth (línea + círculo). */
const LEGEND_BOX_PX = 10

const chartData = computed(() => props.data)

const capitalizeText = (text: any): any => {
  if (typeof text === 'string') {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }
  return text
}

const formatLegendText = (text: any): any => {
  if (typeof text !== 'string') return text
  if (props.uppercaseLegendLabels) return text.toUpperCase()
  return capitalizeText(text)
}

function deepMergeChartOptions(
  base: Record<string, any>,
  override: Record<string, any>,
): Record<string, any> {
  if (override === undefined || override === null) return base
  if (Array.isArray(override)) return override
  if (typeof override !== 'object') return override
  if (base === undefined || base === null) return override
  if (Array.isArray(base)) return override
  if (typeof base !== 'object') return override
  const out: Record<string, any> = { ...base }
  for (const key of Object.keys(override)) {
    const ov = override[key]
    if (ov === undefined) continue
    out[key] = deepMergeChartOptions(base[key], ov)
  }
  return out
}

const computedOptions = computed(() => {
  const defaults: Record<string, any> = {
    font: {
      family: CHART_INTER_FONT_FAMILY,
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        align: 'center' as const,
        labels: {
          font: {
            family: CHART_INTER_FONT_FAMILY,
            size: 13,
            weight: '500',
          },
          padding: 12,
          boxWidth: LEGEND_BOX_PX,
          boxHeight: LEGEND_BOX_PX,
          usePointStyle: false,
          generateLabels: function (chart: any) {
            const datasets = chart.data.datasets
            return datasets.map((dataset: any, i: number) => {
              const fillRaw = Array.isArray(dataset.backgroundColor)
                ? dataset.backgroundColor[0]
                : dataset.backgroundColor
              const strokeRaw = Array.isArray(dataset.borderColor)
                ? dataset.borderColor[0]
                : dataset.borderColor
              const stroke =
                typeof strokeRaw === 'string' && strokeRaw.length > 0
                  ? strokeRaw
                  : typeof fillRaw === 'string' && fillRaw.length > 0
                    ? fillRaw
                    : colors.value.textSecondary
              return {
                text: formatLegendText(dataset.label || ''),
                fillStyle: typeof fillRaw === 'string' ? fillRaw : stroke,
                strokeStyle: stroke,
                lineWidth: 0,
                fontColor: stroke,
                hidden: !chart.isDatasetVisible(i),
                index: i,
                datasetIndex: i,
              }
            })
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: colors.value.tooltipBg,
        titleColor: colors.value.tooltipText,
        bodyColor: isDark.value ? '#d1d5db' : '#e2e8f0',
        borderColor: isDark.value
          ? 'rgba(198, 125, 255, 0.2)'
          : 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          family: CHART_INTER_FONT_FAMILY,
          size: 13,
          weight: '600',
        },
        bodyFont: {
          family: CHART_INTER_FONT_FAMILY,
          size: 12,
          weight: '500',
        },
        boxPadding: 6,
        callbacks: {
          title: function (tooltipItems: any[]): string {
            return tooltipItems.length > 0 ? String(capitalizeText(tooltipItems[0].label)) : ''
          },
          label: function (context: any): string {
            let label = String(capitalizeText(context.dataset.label || ''))
            if (label) {
              label += ': '
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y
            }
            return label
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: props.stacked || false,
        border: {
          display: false,
        },
        grid: {
          display: false,
          drawTicks: false,
        },
        ticks: {
          maxTicksLimit: CHART_Y_MAX_TICKS,
          font: {
            family: CHART_INTER_FONT_FAMILY,
            size: 12,
            weight: '500',
          },
          color: colors.value.textSecondary,
          padding: 8,
          callback: function (tickValue: any): any {
            return capitalizeText(tickValue)
          },
        },
      },
      x: {
        stacked: props.stacked || false,
        offset: true,
        border: {
          display: false,
        },
        grid: {
          display: false,
          drawTicks: false,
        },
        ticks: {
          maxTicksLimit: CHART_X_MAX_TICKS,
          autoSkip: true,
          autoSkipPadding: 8,
          minRotation: 0,
          maxRotation: 0,
          font: {
            family: CHART_INTER_FONT_FAMILY,
            size: 12,
            weight: '500',
          },
          color: colors.value.textSecondary,
          padding: 8,
          callback: function (value: any): any {
            const label = (this as any).getLabelForValue(value)
            return capitalizeText(label)
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 8,
        borderWidth: 0,
      },
    },
    datasets: {
      bar: {
        maxBarThickness: 52,
        categoryPercentage: 0.58,
        barPercentage: 0.82,
      },
    },
  }

  const merged = props.options ? deepMergeChartOptions(defaults, props.options) : defaults
  return applyInterFontToChartOptions(
    applyChartAxisTickLimits(merged as Record<string, unknown>),
  ) as Record<string, any>
})

defineExpose({ isDark })
</script>

<style scoped>
/* Altura total 230px (220px trazado + 10px banda de leyenda/indicadores en Chart.js). */
:deep(> div) {
  height: 100%;
  width: 100%;
}
:deep(canvas) {
  max-height: none;
}
</style>
