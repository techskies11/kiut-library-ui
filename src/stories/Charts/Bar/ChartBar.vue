<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
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
}>();

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
        color: '#475569',
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
        color: 'rgba(148, 163, 184, 0.12)',
        lineWidth: 1,
        drawTicks: false,
      },
      ticks: {
        font: {
          family: "'DM Sans', sans-serif",
          size: 12,
          weight: 500 as any,
        },
        color: '#64748b',
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
        color: '#64748b',
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

const chartOptions = props.options || defaultOptions;
</script>

<style scoped>
.chart-container {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  height: 100%;
  min-height: 300px;
  max-height: 420px;
  padding: 24px;
  background: linear-gradient(to bottom, #ffffff 0%, #fefefe 100%);
  border-radius: 16px;
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.03),
    0 4px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
  position: relative;
}

.chart-container:hover {
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 8px 16px rgba(0, 0, 0, 0.08);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .chart-container {
    padding: 16px;
    min-height: 280px;
    max-height: 380px;
  }
}

@media (max-width: 480px) {
  .chart-container {
    padding: 12px;
    min-height: 240px;
    max-height: 340px;
  }
}
</style>

