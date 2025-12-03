import type { Meta, StoryObj } from '@storybook/vue3';
import PieChart from './PieChart.vue';

const meta: Meta<typeof PieChart> = {
  title: 'Charts/Pie',
  component: PieChart,
  tags: ['autodocs'],
  argTypes: {
    doughnut: {
      control: 'boolean',
      description: 'Enable doughnut chart style',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof PieChart>;

// Paleta de colores púrpura
const purpleColors = [
  '#C67DFF',  // Primary light
  '#8b5cf6',  // Primary medium
  '#5d4b93',  // Primary dark
  '#a855f7',  // Accent
  '#7c3aed',  // Vibrant
];

// Datos de ejemplo: Distribución de ventas
const salesDistribution = {
  labels: ['electronics', 'clothing', 'food', 'home & garden', 'sports'],
  datasets: [
    {
      data: [30, 25, 20, 15, 10],
      backgroundColor: purpleColors,
      borderWidth: 2,
      hoverOffset: 8,
    },
  ],
};

// Datos de ejemplo: Distribución de usuarios
const userDistribution = {
  labels: ['desktop', 'mobile', 'tablet'],
  datasets: [
    {
      data: [45, 40, 15],
      backgroundColor: ['#C67DFF', '#8b5cf6', '#5d4b93'],
      borderWidth: 2,
      hoverOffset: 8,
    },
  ],
};

// Datos con más categorías
const detailedData = {
  labels: ['category A', 'category B', 'category C', 'category D', 'category E', 'category F', 'category G'],
  datasets: [
    {
      data: [18, 16, 14, 12, 15, 13, 12],
      backgroundColor: [
        '#f3e8ff',
        '#e9d5ff',
        '#d8b4fe',
        '#c084fc',
        '#a855f7',
        '#9333ea',
        '#7e22ce',
      ],
      borderWidth: 2,
      hoverOffset: 8,
    },
  ],
};

// Datos simples con 3 categorías
const simpleData = {
  labels: ['approved', 'pending', 'rejected'],
  datasets: [
    {
      data: [60, 30, 10],
      backgroundColor: ['#C67DFF', '#8b5cf6', '#5d4b93'],
      borderWidth: 2,
      hoverOffset: 10,
    },
  ],
};

// Story: Gráfico de pastel simple
export const Simple: Story = {
  args: {
    data: salesDistribution,
    doughnut: false,
  },
};

// Story: Gráfico de dona (doughnut)
export const Doughnut: Story = {
  args: {
    data: salesDistribution,
    doughnut: true,
  },
};

// Story: Distribución de usuarios
export const UserDistribution: Story = {
  args: {
    data: userDistribution,
    doughnut: false,
  },
};

// Story: Doughnut con distribución de usuarios
export const UserDoughnut: Story = {
  args: {
    data: userDistribution,
    doughnut: true,
  },
};

// Story: Con muchas categorías
export const DetailedCategories: Story = {
  args: {
    data: detailedData,
    doughnut: false,
  },
};

// Story: Doughnut detallado
export const DetailedDoughnut: Story = {
  args: {
    data: detailedData,
    doughnut: true,
  },
};

// Story: Status simple
export const StatusDistribution: Story = {
  args: {
    data: simpleData,
    doughnut: false,
  },
};

// Story: Con opciones personalizadas
export const CustomOptions: Story = {
  args: {
    data: salesDistribution,
    doughnut: false,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right' as const,
          align: 'center' as const,
        },
      },
    },
  },
};

// Story: Doughnut con centro personalizado
export const CustomDoughnut: Story = {
  args: {
    data: {
      labels: ['completed', 'in progress', 'pending', 'cancelled'],
      datasets: [
        {
          data: [42, 28, 20, 10],
          backgroundColor: ['#C67DFF', '#8b5cf6', '#a855f7', '#5d4b93'],
          borderWidth: 3,
          hoverOffset: 12,
        },
      ],
    },
    doughnut: true,
    options: {
      cutout: '70%',
      responsive: true,
      maintainAspectRatio: false,
    },
  },
};

