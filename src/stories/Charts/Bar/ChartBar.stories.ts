import type { Meta, StoryObj } from '@storybook/vue3';
import BarChart from './ChartBar.vue';

const meta: Meta<typeof BarChart> = {
  title: 'Charts/Bar',
  component: BarChart,
  tags: ['autodocs'],
  argTypes: {
    stacked: {
      control: 'boolean',
      description: 'Enable stacked bar chart',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

// Datos de ejemplo para gráfico simple
const simpleData = {
  labels: ['january', 'february', 'march', 'april', 'may', 'june'],
  datasets: [
    {
      label: 'sales',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: '#C67DFF',
      borderRadius: 8,
    },
  ],
};

// Datos de ejemplo para gráfico múltiple
const multipleData = {
  labels: ['january', 'february', 'march', 'april', 'may', 'june'],
  datasets: [
    {
      label: 'product A',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: '#C67DFF',
      borderRadius: 8,
    },
    {
      label: 'product B',
      data: [45, 67, 60, 70, 80, 65],
      backgroundColor: '#8b5cf6',
      borderRadius: 8,
    },
    {
      label: 'product C',
      data: [30, 40, 50, 45, 60, 70],
      backgroundColor: '#5d4b93',
      borderRadius: 8,
    },
  ],
};

// Datos de ejemplo para gráfico apilado
const stackedData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'revenue',
      data: [40, 50, 60, 70],
      backgroundColor: '#C67DFF',
      borderRadius: 8,
    },
    {
      label: 'expenses',
      data: [30, 35, 40, 45],
      backgroundColor: '#8b5cf6',
      borderRadius: 8,
    },
    {
      label: 'profit',
      data: [10, 15, 20, 25],
      backgroundColor: '#5d4b93',
      borderRadius: 8,
    },
  ],
};

// Datos con gradientes de color
const gradientData = {
  labels: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
  datasets: [
    {
      label: 'weekly visits',
      data: [120, 190, 130, 150, 200, 180, 170],
      backgroundColor: [
        '#f3e8ff',
        '#e9d5ff',
        '#d8b4fe',
        '#c084fc',
        '#a855f7',
        '#9333ea',
        '#7e22ce',
      ],
      borderRadius: 10,
    },
  ],
};

// Story: Gráfico simple
export const Simple: Story = {
  args: {
    data: simpleData,
    stacked: false,
  },
};

// Story: Múltiples datasets
export const Multiple: Story = {
  args: {
    data: multipleData,
    stacked: false,
  },
};

// Story: Gráfico apilado
export const Stacked: Story = {
  args: {
    data: stackedData,
    stacked: true,
  },
};

// Story: Con opciones personalizadas
export const CustomOptions: Story = {
  args: {
    data: simpleData,
    stacked: false,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom' as const,
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  },
};

// Story: Horizontal Bar Chart
export const Horizontal: Story = {
  args: {
    data: {
      labels: ['category A', 'category B', 'category C', 'category D', 'category E'],
      datasets: [
        {
          label: 'performance',
          data: [85, 72, 90, 68, 95],
          backgroundColor: '#C67DFF',
          borderRadius: 8,
        },
      ],
    },
    stacked: false,
    options: {
      indexAxis: 'y' as const,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  },
};

