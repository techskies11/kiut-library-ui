<template>
  <div class="chart-container">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

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
}>();

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = props.data;

// Función para capitalizar texto
const capitalizeText = (text: any): any => {
  if (typeof text === 'string') {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  return text;
};

const defaultOptions = {
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
        color: '#475569',
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
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      titleColor: '#f1f5f9',
      bodyColor: '#e2e8f0',
      borderColor: 'rgba(148, 163, 184, 0.2)',
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
      borderColor: '#ffffff',
      hoverOffset: 8,
    },
  },
  animation: {
    animateRotate: true,
    animateScale: true,
  },
};

const chartOptions = props.options || defaultOptions;
</script>

<style scoped>
.chart-container {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  height: 100%;
  min-height: 320px;
  max-height: 420px;
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

