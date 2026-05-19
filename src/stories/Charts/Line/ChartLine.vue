<template>
  <div
    class="chart-line-root flex h-full min-h-[230px] w-full shrink-0 flex-col bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] min-w-0"
  >
    <div class="chart-line-canvas-host relative min-h-0 w-full flex-1">
      <Line ref="lineChartRef" :data="chartData" :options="computedOptions" />
    </div>
    <!-- Leyenda HTML: círculo + trazos horizontales (Chart.js solo dibuja elipse en canvas). -->
    <ul
      v-if="legendEntries.length > 0"
      class="chart-line-indicators mt-0 flex shrink-0 list-none flex-nowrap items-center justify-center gap-x-4 overflow-x-auto overflow-y-hidden px-1 pb-0.5 pt-0.5"
      role="list"
    >
      <li v-for="(entry, i) in legendEntries" :key="entry.key" role="listitem">
        <button
          type="button"
          class="inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[11px] font-medium leading-snug transition-opacity outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--kiut-bg-secondary)] dark:focus-visible:ring-offset-[#1a1a1d]"
          :class="datasetVisible[i] !== false ? 'opacity-100' : 'opacity-45 line-through'"
          :style="{ color: entry.color }"
          :aria-pressed="datasetVisible[i] !== false"
          :aria-label="`${entry.label}. ${datasetVisible[i] !== false ? 'Visible' : 'Oculta'}. Pulsa para alternar.`"
          @click="toggleLegend(i)"
        >
          <span class="inline-flex shrink-0 items-center" aria-hidden="true">
            <span class="h-0.5 w-2 shrink-0 rounded-full bg-current" />
            <span
              class="relative z-[1] box-border size-2 shrink-0 rounded-full border-2 bg-transparent"
              :style="{ borderColor: entry.color }"
            />
            <span class="h-0.5 w-2 shrink-0 rounded-full bg-current" />
          </span>
          <span>{{ entry.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useThemeDetection, type Theme } from '../../../composables/useThemeDetection';
import {
  CHART_X_MAX_TICKS,
  CHART_Y_MAX_TICKS,
  applyChartAxisTickLimits,
} from '../chartAxisTicks';
import {
  applyInterFontToChartOptions,
  CHART_INTER_FONT_FAMILY,
} from '../chartInterFont';

const props = defineProps<{
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor?: string | string[];
      backgroundColor?: string;
      tension?: number;
      fill?: boolean;
      pointBackgroundColor?: string | string[];
      pointHoverBackgroundColor?: string | string[];
      pointBorderColor?: string | string[];
      pointHoverBorderColor?: string | string[];
      pointBorderWidth?: number;
      pointHoverBorderWidth?: number;
    }>;
  };
  options?: Record<string, any>;
  theme?: Theme;
}>();

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

ChartJS.defaults.font.family = CHART_INTER_FONT_FAMILY;

const lineChartRef = ref<{ chart: ChartJS | null } | null>(null);

const { isDark, colors } = useThemeDetection(toRef(props, 'theme'));

const defaultPointCenterFill = computed(() => colors.value.bgCard);

const chartData = computed(() => {
  const hole = defaultPointCenterFill.value;
  return {
    labels: props.data.labels,
    datasets: props.data.datasets.map((ds) => {
      const c = ds.borderColor;
      const lineColorRaw = Array.isArray(c) ? c[0] : c;
      const lineHue =
        typeof lineColorRaw === 'string' && lineColorRaw.length > 0
          ? lineColorRaw
          : colors.value.textSecondary;

      const pointFill =
        ds.pointBackgroundColor !== undefined ? ds.pointBackgroundColor : hole;
      const pointHoverFill =
        ds.pointHoverBackgroundColor !== undefined
          ? ds.pointHoverBackgroundColor
          : pointFill;
      const pointBw = ds.pointBorderWidth ?? 2;
      const pointHoverBw = ds.pointHoverBorderWidth ?? pointBw;

      return {
        ...ds,
        fill: ds.fill ?? false,
        pointBackgroundColor: pointFill,
        pointHoverBackgroundColor: pointHoverFill,
        pointBorderColor: ds.pointBorderColor ?? lineHue,
        pointHoverBorderColor: ds.pointHoverBorderColor ?? lineHue,
        pointBorderWidth: pointBw,
        pointHoverBorderWidth: pointHoverBw,
      };
    }),
  };
});

const capitalizeText = (text: any): any => {
  if (typeof text === 'string') {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  return text;
};

function lineColorForDataset(dataset: (typeof props.data.datasets)[0]): string {
  const c = dataset.borderColor;
  const raw = Array.isArray(c) ? c[0] : c;
  return typeof raw === 'string' && raw.length > 0 ? raw : colors.value.textSecondary;
}

const legendEntries = computed(() =>
  chartData.value.datasets.map((ds, i) => ({
    key: `${ds.label ?? 'dataset'}-${i}`,
    label: capitalizeText(ds.label || ''),
    color: lineColorForDataset(ds as (typeof props.data.datasets)[0]),
  })),
);

/** Visible por defecto; sincronizado con Chart.getDatasetVisibility al alternar. */
const datasetVisible = ref<boolean[]>([]);

watch(
  () => chartData.value.datasets.length,
  (len) => {
    const next = Array.from({ length: len }, (_, i) => datasetVisible.value[i] ?? true);
    datasetVisible.value = next;
  },
  { immediate: true },
);

function toggleLegend(index: number) {
  const wrap = lineChartRef.value;
  const chart = wrap?.chart;
  if (!chart || index < 0 || index >= chart.data.datasets.length) return;
  const visible = !chart.isDatasetVisible(index);
  chart.setDatasetVisibility(index, visible);
  datasetVisible.value[index] = visible;
  chart.update();
}

function deepMergeChartOptions(
  base: Record<string, any>,
  override: Record<string, any>,
): Record<string, any> {
  if (override === undefined || override === null) return base;
  if (Array.isArray(override)) return override;
  if (typeof override !== 'object') return override;
  if (base === undefined || base === null) return override;
  if (Array.isArray(base)) return override;
  if (typeof base !== 'object') return override;
  const out: Record<string, any> = { ...base };
  for (const key of Object.keys(override)) {
    const ov = override[key];
    if (ov === undefined) continue;
    out[key] = deepMergeChartOptions(base[key], ov);
  }
  return out;
}

const computedOptions = computed(() => {
  const defaults: Record<string, any> = {
    font: {
      family: CHART_INTER_FONT_FAMILY,
    },
    color: colors.value.textSecondary,
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    plugins: {
      colors: { enabled: false },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: colors.value.tooltipBg,
        titleColor: colors.value.tooltipText,
        bodyColor: colors.value.textSecondary,
        borderColor: colors.value.tooltipBorder,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          family: CHART_INTER_FONT_FAMILY,
          size: 14,
          weight: '600',
        },
        bodyFont: {
          family: CHART_INTER_FONT_FAMILY,
          size: 13,
        },
        callbacks: {
          title: function titleCb(tooltipItems: any[]): string {
            return tooltipItems.length > 0
              ? String(capitalizeText(tooltipItems[0].label))
              : '';
          },
          label: function labelCb(context: any): string {
            let label = String(capitalizeText(context.dataset.label || ''));
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: colors.value.gridLines,
          lineWidth: 1,
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
            size: 11,
          },
          color: colors.value.textSecondary,
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        grid: {
          color: colors.value.gridLines,
        },
        ticks: {
          maxTicksLimit: CHART_Y_MAX_TICKS,
          font: {
            family: CHART_INTER_FONT_FAMILY,
            size: 11,
          },
          color: colors.value.textSecondary,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        borderCapStyle: 'round' as const,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
        hoverBorderWidth: 2,
      },
    },
  };

  const merged = props.options ? deepMergeChartOptions(defaults, props.options) : defaults;
  return applyInterFontToChartOptions(
    applyChartAxisTickLimits(merged as Record<string, unknown>),
  ) as Record<string, any>;
});

defineExpose({ isDark });
</script>

<style scoped>
/* Canvas flex-1; leyenda en una fila (scroll horizontal si hace falta). Mínimo total ~230px sin padre con altura. */
.chart-line-canvas-host :deep(> div) {
  height: 100%;
  width: 100%;
}
.chart-line-canvas-host :deep(canvas) {
  max-height: none;
}
</style>
