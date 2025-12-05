<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="computedOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useThemeDetection, type Theme } from '../../../composables/useThemeDetection';

const props = defineProps<{
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
      borderRadius?: number;
    }>;
  };
  options?: Record<string, any>;
  stacked?: boolean;
  theme?: Theme;
}>();

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Theme detection with prop fallback
const { isDark, colors } = useThemeDetection(toRef(props, 'theme'));

const chartData = props.data;

// Función para capitalizar texto
const capitalizeText = (text: any): any => {
  if (typeof text === 'string') {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  return text;
};

// Computed options that react to theme changes
const computedOptions = computed(() => {
  if (props.options) return props.options;
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          font: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 500 as any,
          },
          color: colors.value.textSecondary,
          padding: 12,
          boxWidth: 12,
          boxHeight: 12,
          borderRadius: 4,
          usePointStyle: true,
          pointStyle: 'rectRounded',
        },
        generateLabels: function(chart: any) {
          const datasets = chart.data.datasets;
          return datasets.map((dataset: any, i: number) => ({
            text: capitalizeText(dataset.label || ''),
            fillStyle: Array.isArray(dataset.backgroundColor) 
              ? dataset.backgroundColor[0] 
              : dataset.backgroundColor,
            strokeStyle: Array.isArray(dataset.borderColor)
              ? dataset.borderColor[0]
              : dataset.borderColor,
            lineWidth: dataset.borderWidth,
            hidden: !chart.isDatasetVisible(i),
            index: i,
            datasetIndex: i,
          }));
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: colors.value.tooltipBg,
        titleColor: colors.value.tooltipText,
        bodyColor: isDark.value ? '#d1d5db' : '#e2e8f0',
        borderColor: isDark.value ? 'rgba(198, 125, 255, 0.2)' : 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          family: "'DM Sans', sans-serif",
          size: 13,
          weight: 600 as any,
        },
        bodyFont: {
          family: "'DM Sans', sans-serif",
          size: 12,
          weight: 500 as any,
        },
        boxPadding: 6,
        callbacks: {
          title: function(tooltipItems: any[]): string {
            return tooltipItems.length > 0 ? String(capitalizeText(tooltipItems[0].label)) : '';
          },
          label: function(context: any): string {
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
      y: {
        beginAtZero: true,
        stacked: props.stacked || false,
        border: {
          display: false,
        },
        grid: {
          color: colors.value.gridLines,
          lineWidth: 1,
          drawTicks: false,
        },
        ticks: {
          font: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500 as any,
          },
          color: colors.value.textSecondary,
          padding: 8,
          callback: function(tickValue: any): any {
            return capitalizeText(tickValue);
          },
        },
      },
      x: {
        stacked: props.stacked || false,
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500 as any,
          },
          color: colors.value.textSecondary,
          padding: 8,
          callback: function(value: any): any {
            const label = (this as any).getLabelForValue(value);
            return capitalizeText(label);
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
  };
});

// Expose isDark for potential use in templates
defineExpose({ isDark });
</script>

<style scoped>
.chart-container {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  height: 100%;
  min-height: 300px;
  max-height: 420px;
  background: var(--kiut-bg-chart-wrapper);
  border-radius: 16px;
  position: relative;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .chart-container {
    min-height: 280px;
    max-height: 380px;
  }
}

@media (max-width: 480px) {
  .chart-container {
    min-height: 240px;
    max-height: 340px;
  }
}
</style>
