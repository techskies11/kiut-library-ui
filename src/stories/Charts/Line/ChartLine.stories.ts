import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ChartLine from './ChartLine.vue';

const meta = {
  title: 'Charts/Line',
  component: ChartLine,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' },
    options: { control: 'object' },
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

// Gráfica con área rellena
export const FilledArea: Story = {
  args: {
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Usuarios Activos',
          data: [120, 150, 180, 220, 250, 280, 320],
          borderColor: 'rgb(153, 102, 255)',
          backgroundColor: 'rgba(153, 102, 255, 0.3)',
          fill: true,
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