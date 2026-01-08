import type { Meta, StoryObj } from '@storybook/vue3-vite';
import TopAgentsAnalysis from './TopAgentsAnalysis.vue';

const meta: Meta<typeof TopAgentsAnalysis> = {
  title: 'Charts/CostTokens/TopAgentsAnalysis',
  component: TopAgentsAnalysis,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' },
    loading: { control: 'boolean' },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopAgentsAnalysis>;

const mockData = {
  "airline_name": "Clic Air",
  "start_date": "2026-01-01",
  "end_date": "2026-01-08",
  "top_agents": [
    {
      "agent_type": "seller",
      "total_usage": 242,
      "total_tokens": 1435676,
      "total_cost": 1.051494,
      "total_input_tokens": 454207,
      "total_output_tokens": 17885,
      "total_read_tokens": 963584,
      "total_write_tokens": 0,
      "total_input_tokens_cost": 0.908414,
      "total_output_tokens_cost": 0.14308,
      "total_read_tokens_cost": 0.0,
      "total_write_tokens_cost": 0.0,
      "conversations": 15,
      "avg_tokens_per_conversation": 95711.73,
      "avg_cost_per_conversation": 0.0701
    },
    {
      "agent_type": "triage",
      "total_usage": 95,
      "total_tokens": 190140,
      "total_cost": 0.127232,
      "total_input_tokens": 53456,
      "total_output_tokens": 2540,
      "total_read_tokens": 134144,
      "total_write_tokens": 0,
      "total_input_tokens_cost": 0.106912,
      "total_output_tokens_cost": 0.02032,
      "total_read_tokens_cost": 0.0,
      "total_write_tokens_cost": 0.0,
      "conversations": 15,
      "avg_tokens_per_conversation": 12676.0,
      "avg_cost_per_conversation": 0.0085
    },
    {
      "agent_type": "booking_manager",
      "total_usage": 1,
      "total_tokens": 3047,
      "total_cost": 0.00649,
      "total_input_tokens": 2981,
      "total_output_tokens": 66,
      "total_read_tokens": 0,
      "total_write_tokens": 0,
      "total_input_tokens_cost": 0.005962,
      "total_output_tokens_cost": 0.000528,
      "total_read_tokens_cost": 0.0,
      "total_write_tokens_cost": 0.0,
      "conversations": 1,
      "avg_tokens_per_conversation": 3047.0,
      "avg_cost_per_conversation": 0.0065
    }
  ]
};

const mockDataExtended = {
  "airline_name": "Avianca",
  "start_date": "2026-01-01",
  "end_date": "2026-01-15",
  "top_agents": [
    {
      "agent_type": "seller",
      "total_usage": 450,
      "total_tokens": 2850000,
      "total_cost": 2.145,
      "total_input_tokens": 890000,
      "total_output_tokens": 35000,
      "total_read_tokens": 1925000,
      "total_write_tokens": 0,
      "total_input_tokens_cost": 1.78,
      "total_output_tokens_cost": 0.28,
      "total_read_tokens_cost": 0.085,
      "total_write_tokens_cost": 0.0,
      "conversations": 28,
      "avg_tokens_per_conversation": 101785.71,
      "avg_cost_per_conversation": 0.0766
    },
    {
      "agent_type": "triage",
      "total_usage": 180,
      "total_tokens": 385000,
      "total_cost": 0.256,
      "total_input_tokens": 105000,
      "total_output_tokens": 5000,
      "total_read_tokens": 275000,
      "total_write_tokens": 0,
      "total_input_tokens_cost": 0.21,
      "total_output_tokens_cost": 0.04,
      "total_read_tokens_cost": 0.006,
      "total_write_tokens_cost": 0.0,
      "conversations": 28,
      "avg_tokens_per_conversation": 13750.0,
      "avg_cost_per_conversation": 0.0091
    },
    {
      "agent_type": "booking_manager",
      "total_usage": 15,
      "total_tokens": 48000,
      "total_cost": 0.095,
      "total_input_tokens": 45000,
      "total_output_tokens": 1000,
      "total_read_tokens": 2000,
      "total_write_tokens": 0,
      "total_input_tokens_cost": 0.09,
      "total_output_tokens_cost": 0.008,
      "total_read_tokens_cost": 0.0,
      "total_write_tokens_cost": 0.0,
      "conversations": 12,
      "avg_tokens_per_conversation": 4000.0,
      "avg_cost_per_conversation": 0.0079
    },
    {
      "agent_type": "payment_assistant",
      "total_usage": 8,
      "total_tokens": 25000,
      "total_cost": 0.048,
      "total_input_tokens": 22000,
      "total_output_tokens": 500,
      "total_read_tokens": 2500,
      "total_write_tokens": 0,
      "total_input_tokens_cost": 0.044,
      "total_output_tokens_cost": 0.004,
      "total_read_tokens_cost": 0.0,
      "total_write_tokens_cost": 0.0,
      "conversations": 5,
      "avg_tokens_per_conversation": 5000.0,
      "avg_cost_per_conversation": 0.0096
    },
    {
      "agent_type": "faq_assistant",
      "total_usage": 12,
      "total_tokens": 18000,
      "total_cost": 0.032,
      "total_input_tokens": 15000,
      "total_output_tokens": 800,
      "total_read_tokens": 2200,
      "total_write_tokens": 0,
      "total_input_tokens_cost": 0.03,
      "total_output_tokens_cost": 0.0064,
      "total_read_tokens_cost": 0.0,
      "total_write_tokens_cost": 0.0,
      "conversations": 8,
      "avg_tokens_per_conversation": 2250.0,
      "avg_cost_per_conversation": 0.004
    }
  ]
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const Extended: Story = {
  args: {
    data: mockDataExtended,
  },
};

export const SingleAgent: Story = {
  args: {
    data: {
      "airline_name": "Test Airline",
      "start_date": "2026-01-01",
      "end_date": "2026-01-08",
      "top_agents": [
        {
          "agent_type": "seller",
          "total_usage": 150,
          "total_tokens": 950000,
          "total_cost": 0.725,
          "total_input_tokens": 300000,
          "total_output_tokens": 12000,
          "total_read_tokens": 638000,
          "total_write_tokens": 0,
          "total_input_tokens_cost": 0.6,
          "total_output_tokens_cost": 0.096,
          "total_read_tokens_cost": 0.029,
          "total_write_tokens_cost": 0.0,
          "conversations": 10,
          "avg_tokens_per_conversation": 95000.0,
          "avg_cost_per_conversation": 0.0725
        }
      ]
    },
  },
};

export const Empty: Story = {
  args: {
    data: {
      "airline_name": "Empty Airline",
      "start_date": "2026-01-01",
      "end_date": "2026-01-08",
      "top_agents": []
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    data: mockData,
  },
};

export const DarkTheme: Story = {
  args: {
    data: mockDataExtended,
    theme: 'dark',
  },
};

