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
      description: 'Agent interactions data from API with agents_by_day'
    },
    options: {
      control: 'object',
      description: 'Chart.js options for customization'
    }
  },
} satisfies Meta<typeof MessagesPerAgent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Datos de ejemplo con el nuevo modelo de la API
const sampleData = {
  airline_name: '2W',
  start_date: '2025-11-24',
  end_date: '2025-11-27',
  agents_by_day: {
    '2025-11-24': {
      checkin: 26,
      triage: 4,
      seller: 0
    },
    '2025-11-25': {
      checkin: 20,
      triage: 8,
      seller: 12
    },
    '2025-11-26': {
      checkin: 0,
      triage: 15,
      seller: 40
    },
    '2025-11-27': {
      checkin: 17,
      triage: 12,
      seller: 17
    }
  },
  total_unique_agents: 3
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
      agents_by_day: {}
    },
    loading: false,
  },
};

// Historia con múltiples categorías de agentes
export const MultipleAgents: Story = {
  args: {
    data: {
      airline_name: '2W',
      start_date: '2025-12-01',
      end_date: '2025-12-05',
      agents_by_day: {
        '2025-12-01': {
          faq: 357,
          triage: 1921,
          checkin: 150,
          seller: 80
        },
        '2025-12-02': {
          faq: 280,
          triage: 1500,
          checkin: 200,
          disruption_manager: 45
        },
        '2025-12-03': {
          triage: 2,
          faq: 100,
          booking_manager: 30
        },
        '2025-12-04': {
          faq: 450,
          triage: 2100,
          checkin: 180,
          seller: 120,
          human: 25
        },
        '2025-12-05': {
          faq: 380,
          triage: 1800,
          checkin: 160,
          agency: 50
        }
      },
      total_unique_agents: 8
    },
    loading: false,
  },
};


