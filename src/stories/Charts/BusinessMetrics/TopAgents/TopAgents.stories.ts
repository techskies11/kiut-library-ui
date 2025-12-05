import type { Meta, StoryObj } from '@storybook/vue3';
import TopAgents from './TopAgents.vue';

const meta = {
  title: 'Charts/BusinessMetrics/TopAgents',
  component: TopAgents,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Shows loading animation when true'
    },
    data: {
      control: 'object',
      description: 'Top agents data from API with top_agents array'
    },
    options: {
      control: 'object',
      description: 'Chart.js options for customization'
    }
  },
} satisfies Meta<typeof TopAgents>;

export default meta;
type Story = StoryObj<typeof meta>;

// Datos de ejemplo basados en la estructura real de la API
const sampleData = {
  airline_name: '2W',
  start_date: '2025-12-01',
  end_date: '2025-12-05',
  top_agents: [
    {
      agent_type: 'triage',
      total_usage: 1923,
      total_tokens: 3693274,
      total_cost: 1.274346,
      total_input_tokens: 389841,
      total_output_tokens: 61833,
      total_read_tokens: 3241600,
      total_write_tokens: 0,
      total_input_tokens_cost: 0.779682,
      total_output_tokens_cost: 0.494664,
      total_read_tokens_cost: 0.0,
      total_write_tokens_cost: 0.0,
      conversations: 377,
      avg_tokens_per_conversation: 9796.48,
      avg_cost_per_conversation: 0.0034
    },
    {
      agent_type: 'faq',
      total_usage: 357,
      total_tokens: 1907838,
      total_cost: 1.08076,
      total_input_tokens: 353716,
      total_output_tokens: 46666,
      total_read_tokens: 1507456,
      total_write_tokens: 0,
      total_input_tokens_cost: 0.707432,
      total_output_tokens_cost: 0.373328,
      total_read_tokens_cost: 0.0,
      total_write_tokens_cost: 0.0,
      conversations: 354,
      avg_tokens_per_conversation: 5389.37,
      avg_cost_per_conversation: 0.0031
    },
    {
      agent_type: 'checkin',
      total_usage: 245,
      total_tokens: 1250000,
      total_cost: 0.85,
      conversations: 220,
      avg_tokens_per_conversation: 5681.82,
      avg_cost_per_conversation: 0.0039
    },
    {
      agent_type: 'seller',
      total_usage: 180,
      total_tokens: 980000,
      total_cost: 0.65,
      conversations: 165,
      avg_tokens_per_conversation: 5939.39,
      avg_cost_per_conversation: 0.0039
    }
  ]
};

// Historia con datos por defecto
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
      airline_name: '2W',
      start_date: '2025-12-01',
      end_date: '2025-12-05',
      top_agents: []
    },
    loading: false,
  },
};

// Historia solo con triage (debería mostrar empty state ya que se filtra)
export const OnlyTriageAgent: Story = {
  args: {
    data: {
      airline_name: '2W',
      start_date: '2025-12-01',
      end_date: '2025-12-05',
      top_agents: [
        {
          agent_type: 'triage',
          total_usage: 1923,
          conversations: 377,
          avg_tokens_per_conversation: 9796.48,
          avg_cost_per_conversation: 0.0034
        }
      ]
    },
    loading: false,
  },
};

// Historia con múltiples agentes
export const MultipleAgents: Story = {
  args: {
    data: {
      airline_name: '2W',
      start_date: '2025-12-01',
      end_date: '2025-12-05',
      top_agents: [
        {
          agent_type: 'triage',
          conversations: 500,
          avg_cost_per_conversation: 0.0034
        },
        {
          agent_type: 'faq',
          conversations: 450,
          avg_cost_per_conversation: 0.0031
        },
        {
          agent_type: 'checkin',
          conversations: 380,
          avg_cost_per_conversation: 0.0039
        },
        {
          agent_type: 'seller',
          conversations: 290,
          avg_cost_per_conversation: 0.0039
        },
        {
          agent_type: 'disruption_manager',
          conversations: 175,
          avg_cost_per_conversation: 0.0042
        },
        {
          agent_type: 'booking_manager',
          conversations: 120,
          avg_cost_per_conversation: 0.0038
        },
        {
          agent_type: 'human',
          conversations: 85,
          avg_cost_per_conversation: 0.0025
        },
        {
          agent_type: 'agency',
          conversations: 65,
          avg_cost_per_conversation: 0.0032
        },
        {
          agent_type: 'loyalty',
          conversations: 45,
          avg_cost_per_conversation: 0.0028
        }
      ]
    },
    loading: false,
  },
};

// Historia con un solo agente (no triage)
export const SingleAgent: Story = {
  args: {
    data: {
      airline_name: '2W',
      start_date: '2025-12-01',
      end_date: '2025-12-05',
      top_agents: [
        {
          agent_type: 'checkin',
          total_usage: 500,
          conversations: 450,
          avg_tokens_per_conversation: 5000,
          avg_cost_per_conversation: 0.0035
        }
      ]
    },
    loading: false,
  },
};

// Historia con datos de alta conversación
export const HighVolume: Story = {
  args: {
    data: {
      airline_name: '2W',
      start_date: '2025-12-01',
      end_date: '2025-12-31',
      top_agents: [
        {
          agent_type: 'triage',
          conversations: 15000,
          avg_cost_per_conversation: 0.0034
        },
        {
          agent_type: 'faq',
          conversations: 12500,
          avg_cost_per_conversation: 0.0031
        },
        {
          agent_type: 'checkin',
          conversations: 8750,
          avg_cost_per_conversation: 0.0039
        },
        {
          agent_type: 'seller',
          conversations: 5200,
          avg_cost_per_conversation: 0.0042
        },
        {
          agent_type: 'disruption_manager',
          conversations: 3100,
          avg_cost_per_conversation: 0.0045
        }
      ]
    },
    loading: false,
  },
};

