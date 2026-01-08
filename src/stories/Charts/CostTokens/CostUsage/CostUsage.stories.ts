import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CostUsage from './CostUsage.vue';

const meta: Meta<typeof CostUsage> = {
  title: 'Charts/CostTokens/CostUsage',
  component: CostUsage,
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
type Story = StoryObj<typeof CostUsage>;

const mockData = {
  "airline_name": "Clic Air",
  "start_date": "2026-01-01",
  "end_date": "2026-01-08",
  "costs_by_day": {
    "2026-01-01": {
      "input_tokens": 208625,
      "output_tokens": 8836,
      "cache_read_tokens": 675072,
      "cache_write_tokens": 0,
      "total_tokens": 892533,
      "input_cost": 0.41725,
      "output_cost": 0.070688,
      "cache_read_cost": 0.0675,
      "cache_write_cost": 0.0,
      "total_cost": 0.555438
    },
    "2026-01-02": {
      "input_tokens": 302019,
      "output_tokens": 11655,
      "cache_read_tokens": 422656,
      "cache_write_tokens": 5000,
      "total_tokens": 741330,
      "input_cost": 0.604038,
      "output_cost": 0.09324,
      "cache_read_cost": 0.042266,
      "cache_write_cost": 0.025,
      "total_cost": 0.764544
    },
    "2026-01-03": {
      "input_tokens": 185000,
      "output_tokens": 9200,
      "cache_read_tokens": 580000,
      "cache_write_tokens": 2500,
      "total_tokens": 776700,
      "input_cost": 0.370,
      "output_cost": 0.0736,
      "cache_read_cost": 0.058,
      "cache_write_cost": 0.0125,
      "total_cost": 0.5141
    },
    "2026-01-04": {
      "input_tokens": 220000,
      "output_tokens": 10500,
      "cache_read_tokens": 490000,
      "cache_write_tokens": 3200,
      "total_tokens": 723700,
      "input_cost": 0.440,
      "output_cost": 0.084,
      "cache_read_cost": 0.049,
      "cache_write_cost": 0.016,
      "total_cost": 0.589
    },
    "2026-01-05": {
      "input_tokens": 195000,
      "output_tokens": 8900,
      "cache_read_tokens": 620000,
      "cache_write_tokens": 1800,
      "total_tokens": 825700,
      "input_cost": 0.390,
      "output_cost": 0.0712,
      "cache_read_cost": 0.062,
      "cache_write_cost": 0.009,
      "total_cost": 0.5322
    },
    "2026-01-06": {
      "input_tokens": 245000,
      "output_tokens": 12000,
      "cache_read_tokens": 510000,
      "cache_write_tokens": 4100,
      "total_tokens": 771100,
      "input_cost": 0.490,
      "output_cost": 0.096,
      "cache_read_cost": 0.051,
      "cache_write_cost": 0.0205,
      "total_cost": 0.6575
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
  "total_cost": 4.798098,
  "avg_cost_per_conversation": 0.0790144
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const Empty: Story = {
  args: {
    data: {
      costs_by_day: {},
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    data: mockData,
  },
};

