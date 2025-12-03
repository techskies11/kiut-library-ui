import type { Meta, StoryObj } from '@storybook/vue3';
import MessagesPerAgent from './MessagesPerAgent.vue';

const meta = {
  title: 'Charts/BusinessMetrics/MessagesPerAgent',
  component: MessagesPerAgent,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Shows loading animation when true'
    },
    data: {
      control: 'object',
      description: 'Chart data with labels and datasets'
    },
    options: {
      control: 'object',
      description: 'Chart.js options for customization'
    }
  },
} satisfies Meta<typeof MessagesPerAgent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Datos de ejemplo basados en la imagen
const sampleData = {
  labels: ['2025-11-24', '2025-11-25', '2025-11-26', '2025-11-27'],
  datasets: [
    {
      label: 'checkin',
      data: [26, 20, 0, 17],
      borderColor: '#3B82F6',
      backgroundColor: '#3B82F680',
      tension: 0.3,
    },
    {
      label: 'triage',
      data: [4, 8, 15, 12],
      borderColor: '#10B981',
      backgroundColor: '#10B98180',
      tension: 0.3,
    },
    {
      label: 'seller',
      data: [0, 12, 40, 17],
      borderColor: '#06B6D4',
      backgroundColor: '#06B6D480',
      tension: 0.3,
    },
  ],
};

// Historia con datos
export const Default: Story = {
  args: {
    data: sampleData,
    loading: false,
  },
};

// Historia en estado de carga
export const Loading: Story = {
  args: {
    loading: true,
  },
};

// Historia sin datos
export const EmptyState: Story = {
  args: {
    data: {
      labels: [],
      datasets: [],
    },
    loading: false,
  },
};


