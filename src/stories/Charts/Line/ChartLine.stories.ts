import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ChartLine from './ChartLine.vue';

const meta = {
  title: 'Charts/Line',
  component: ChartLine,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="h-[230px] w-full min-w-[280px]"><story /></div>',
    }),
  ],
  argTypes: {
    data: { control: 'object' },
    options: { control: 'object' },
    areaGradient: { control: 'boolean' },
  },
} satisfies Meta<typeof ChartLine>;

export default meta;
type Story = StoryObj<typeof meta>;

// Historia por defecto
export const Default: Story = {
  args: {
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Datos de Ejemplo',
          data: [65, 59, 80, 81, 56, 55],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
        },
      ],
    },
  },
};

// Comparación de múltiples líneas
export const MultipleLines: Story = {
  args: {
    data: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: [
        {
          label: 'Producto A',
          data: [30, 45, 60, 70, 50, 75, 85],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.3,
        },
        {
          label: 'Producto B',
          data: [20, 35, 40, 50, 60, 55, 70],
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.3,
        },
        {
          label: 'Producto C',
          data: [15, 25, 35, 45, 40, 50, 60],
          borderColor: 'rgb(255, 206, 86)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          tension: 0.3,
        },
      ],
    },
  },
};

// Una sola línea destacada (el área bajo la curva depende de `fill` en el dataset)
export const SingleProminentLine: Story = {
  args: {
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Usuarios activos',
          data: [120, 150, 180, 220, 250, 280, 320],
          borderColor: 'rgb(153, 102, 255)',
          backgroundColor: 'rgba(153, 102, 255, 0.3)',
          tension: 0.4,
        },
      ],
    },
  },
};

// Gráfica con datos simples
export const SimpleChart: Story = {
  args: {
    data: {
      labels: ['A', 'B', 'C', 'D', 'E'],
      datasets: [
        {
          label: 'Dataset Simple',
          data: [10, 20, 15, 25, 30],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
        },
      ],
    },
  },
};

export const GradientArea: Story = {
  args: {
    areaGradient: true,
    data: {
      labels: [
        'Feb 1',
        'Feb 5',
        'Feb 9',
        'Feb 13',
        'Feb 17',
        'Feb 21',
        'Feb 25',
        'Mar 1',
        'Mar 5',
        'Mar 9',
        'Mar 13',
        'Mar 18',
        'Mar 22',
        'Mar 26',
        'Mar 31',
      ],
      datasets: [
        {
          label: 'Initiated',
          data: [240, 255, 268, 250, 275, 260, 248, 270, 285, 258, 240, 214, 230, 245, 238],
          borderColor: 'rgb(59, 130, 246)',
          tension: 0.4,
        },
        {
          label: 'Success',
          data: [180, 195, 210, 198, 225, 205, 190, 220, 238, 200, 185, 164, 178, 192, 186],
          borderColor: 'rgb(34, 197, 94)',
          tension: 0.4,
        },
        {
          label: 'Abandoned',
          data: [38, 42, 36, 40, 35, 39, 41, 37, 34, 40, 36, 34, 38, 35, 37],
          borderColor: 'rgb(249, 115, 22)',
          tension: 0.4,
        },
        {
          label: 'Errors',
          data: [18, 16, 20, 17, 15, 19, 18, 16, 14, 18, 17, 16, 15, 17, 16],
          borderColor: 'rgb(239, 68, 68)',
          tension: 0.4,
        },
      ],
    },
  },
};