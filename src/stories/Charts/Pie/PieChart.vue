<template>
  <div class="chart-container">
    <Pie :data="chartData" :options="computedOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useThemeDetection, type Theme } from '../../../composables/useThemeDetection';

const props = defineProps<{
  data: {
    labels: string[];
    datasets: Array<{
      label?: string;
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
      borderWidth?: number;
      hoverOffset?: number;
    }>;
  };
  options?: Record<string, any>;
  doughnut?: boolean;
  theme?: Theme;
}>();

ChartJS.register(ArcElement, Tooltip, Legend);

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
    cutout: props.doughnut ? '60%' : 0,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        align: 'center' as const,
        labels: {
          font: {
            family: "'DM Sans', sans-serif",
            size: 13,
            weight: 500 as any,
          },
          color: colors.value.textSecondary,
          padding: 16,
          boxWidth: 14,
          boxHeight: 14,
          borderRadius: 4,
          usePointStyle: true,
          pointStyle: 'circle',
          generateLabels: function(chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const meta = chart.getDatasetMeta(0);
                const dataset = data.datasets[0];
                const value = dataset.data[i];
                const backgroundColor = Array.isArray(dataset.backgroundColor)
                  ? dataset.backgroundColor[i]
                  : dataset.backgroundColor;
                
                return {
                  text: `${capitalizeText(label)}: ${value}`,
                  fillStyle: backgroundColor,
                  hidden: meta.data[i]?.hidden || false,
                  index: i,
                };
              });
            }
            return [];
          },
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
            if (tooltipItems.length > 0) {
              return String(capitalizeText(tooltipItems[0].label));
            }
            return '';
          },
          label: function(context: any): string {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${capitalizeText(label)}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: isDark.value ? '#1a1a1d' : '#ffffff',
        hoverOffset: 8,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
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
  min-height: 320px;
  max-height: 420px;
  background: var(--kiut-bg-chart-wrapper);
  border-radius: 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
