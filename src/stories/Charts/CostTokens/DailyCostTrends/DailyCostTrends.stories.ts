import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DailyCostTrends from './DailyCostTrends.vue';

const meta: Meta<typeof DailyCostTrends> = {
  title: 'Charts/CostTokens/DailyCostTrends',
  component: DailyCostTrends,
  tags: ['autodocs'],
  argTypes: {
    costData: { control: 'object' },
    conversationData: { control: 'object' },
    loading: { control: 'boolean' },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DailyCostTrends>;

const mockCostData = {
  "airline_name": "Clic Air",
  "start_date": "2026-01-01",
  "end_date": "2026-01-08",
  "costs_by_day": {
    "2026-01-07": {
      "input_tokens": 208625,
      "output_tokens": 8836,
      "cache_read_tokens": 675072,
      "cache_write_tokens": 0,
      "total_tokens": 892533,
      "input_cost": 0.41725,
      "output_cost": 0.070688,
      "cache_read_cost": 0.0,
      "cache_write_cost": 0.0,
      "total_cost": 0.487938
    },
    "2026-01-08": {
      "input_tokens": 302019,
      "output_tokens": 11655,
      "cache_read_tokens": 422656,
      "cache_write_tokens": 0,
      "total_tokens": 736330,
      "input_cost": 0.604038,
      "output_cost": 0.09324,
      "cache_read_cost": 0.0,
      "cache_write_cost": 0.0,
      "total_cost": 0.697278
    }
  },
  "total_cost": 1.185216,
  "avg_cost_per_conversation": 0.0790144
};

const mockConversationData = {
  "airline_name": "Clic Air",
  "start_date": "2026-01-01",
  "end_date": "2026-01-08",
  "total_conversations": 15,
  "conversations_by_day": {
    "2026-01-07": 6,
    "2026-01-08": 9
  }
};

const mockCostDataExtended = {
  "airline_name": "Avianca",
  "start_date": "2026-01-01",
  "end_date": "2026-01-15",
  "costs_by_day": {
    "2026-01-01": {
      "input_tokens": 180000,
      "output_tokens": 7500,
      "cache_read_tokens": 520000,
      "cache_write_tokens": 0,
      "total_tokens": 707500,
      "input_cost": 0.36,
      "output_cost": 0.06,
      "cache_read_cost": 0.0,
      "cache_write_cost": 0.0,
      "total_cost": 0.42
    },
    "2026-01-02": {
      "input_tokens": 195000,
      "output_tokens": 8200,
      "cache_read_tokens": 580000,
      "cache_write_tokens": 0,
      "total_tokens": 783200,
      "input_cost": 0.39,
      "output_cost": 0.0656,
      "cache_read_cost": 0.0,
      "cache_write_cost": 0.0,
      "total_cost": 0.4556
    },
    "2026-01-03": {
      "input_tokens": 210000,
      "output_tokens": 9000,
      "cache_read_tokens": 630000,
      "cache_write_tokens": 0,
      "total_tokens": 849000,
      "input_cost": 0.42,
      "output_cost": 0.072,
      "cache_read_cost": 0.0,
      "cache_write_cost": 0.0,
      "total_cost": 0.492
    },
    "2026-01-04": {
      "input_tokens": 188000,
      "output_tokens": 7800,
      "cache_read_tokens": 560000,
      "cache_write_tokens": 0,
      "total_tokens": 755800,
      "input_cost": 0.376,
      "output_cost": 0.0624,
      "cache_read_cost": 0.0,
      "cache_write_cost": 0.0,
      "total_cost": 0.4384
    },
    "2026-01-05": {
      "input_tokens": 220000,
      "output_tokens": 9500,
      "cache_read_tokens": 680000,
      "cache_write_tokens": 0,
      "total_tokens": 909500,
      "input_cost": 0.44,
      "output_cost": 0.076,
      "cache_read_cost": 0.0,
      "cache_write_cost": 0.0,
      "total_cost": 0.516
    },
    "2026-01-06": {
      "input_tokens": 205000,
      "output_tokens": 8500,
      "cache_read_tokens": 615000,
      "cache_write_tokens": 0,
      "total_tokens": 828500,
      "input_cost": 0.41,
      "output_cost": 0.068,
      "cache_read_cost": 0.0,
      "cache_write_cost": 0.0,
      "total_cost": 0.478
    },
    "2026-01-07": {
      "input_tokens": 208625,
      "output_tokens": 8836,
      "cache_read_tokens": 675072,
      "cache_write_tokens": 0,
      "total_tokens": 892533,
      "input_cost": 0.41725,
      "output_cost": 0.070688,
      "cache_read_cost": 0.0,
      "cache_write_cost": 0.0,
      "total_cost": 0.487938
    },
    "2026-01-08": {
      "input_tokens": 302019,
      "output_tokens": 11655,
      "cache_read_tokens": 422656,
      "cache_write_tokens": 0,
      "total_tokens": 736330,
      "input_cost": 0.604038,
      "output_cost": 0.09324,
      "cache_read_cost": 0.0,
      "cache_write_cost": 0.0,
      "total_cost": 0.697278
    }
  },
  "total_cost": 3.905004,
  "avg_cost_per_conversation": 0.065
};

const mockConversationDataExtended = {
  "airline_name": "Avianca",
  "start_date": "2026-01-01",
  "end_date": "2026-01-15",
  "total_conversations": 60,
  "conversations_by_day": {
    "2026-01-01": 5,
    "2026-01-02": 7,
    "2026-01-03": 8,
    "2026-01-04": 6,
    "2026-01-05": 9,
    "2026-01-06": 7,
    "2026-01-07": 6,
    "2026-01-08": 12
  }
};

export const Default: Story = {
  args: {
    costData: mockCostData,
    conversationData: mockConversationData,
  },
};

export const Extended: Story = {
  args: {
    costData: mockCostDataExtended,
    conversationData: mockConversationDataExtended,
  },
};

export const Empty: Story = {
  args: {
    costData: {
      costs_by_day: {},
    },
    conversationData: {
      conversations_by_day: {},
    },
  },
};

export const MissingConversationData: Story = {
  args: {
    costData: mockCostData,
    conversationData: {
      conversations_by_day: {},
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    costData: mockCostData,
    conversationData: mockConversationData,
  },
};

export const DarkTheme: Story = {
  args: {
    costData: mockCostDataExtended,
    conversationData: mockConversationDataExtended,
    theme: 'dark',
  },
};

