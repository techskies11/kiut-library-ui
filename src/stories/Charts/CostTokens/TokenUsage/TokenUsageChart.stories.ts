import type { Meta, StoryObj } from '@storybook/vue3-vite';
import TokenUsageChart from './TokenUsageChart.vue';

const meta: Meta<typeof TokenUsageChart> = {
  title: 'Charts/CostTokens/TokenUsageChart',
  component: TokenUsageChart,
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
type Story = StoryObj<typeof TokenUsageChart>;

const mockData = {
  "airline_name": "Aeroméxico",
  "start_date": "2025-07-01",
  "end_date": "2025-07-05",
  "tokens_by_day": {
    "2025-07-01": {
      "input_tokens": 200000,
      "output_tokens": 20000,
      "cache_read_tokens": 680000,
      "cache_write_tokens": 5000,
      "total_tokens": 905000
    },
    "2025-07-02": {
      "input_tokens": 100000,
      "output_tokens": 15000,
      "cache_read_tokens": 0,
      "cache_write_tokens": 0,
      "total_tokens": 115000
    },
    "2025-07-03": {
      "input_tokens": 180000,
      "output_tokens": 18000,
      "cache_read_tokens": 550000,
      "cache_write_tokens": 4000,
      "total_tokens": 752000
    },
    "2025-07-04": {
      "input_tokens": 220000,
      "output_tokens": 25000,
      "cache_read_tokens": 400000,
      "cache_write_tokens": 6000,
      "total_tokens": 651000
    },
    "2025-07-05": {
      "input_tokens": 150000,
      "output_tokens": 22000,
      "cache_read_tokens": 320000,
      "cache_write_tokens": 3500,
      "total_tokens": 495500
    }
  },
  "total_tokens": 2918500,
  "total_input_tokens": 850000,
  "total_cache_read_tokens": 1950000,
  "total_cache_write_tokens": 18500,
  "total_output_tokens": 100000
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const Empty: Story = {
  args: {
    data: {
      tokens_by_day: {},
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    data: mockData,
  },
};
