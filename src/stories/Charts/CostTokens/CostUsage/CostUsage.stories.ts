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

const dayTemplate = (
  inputCost: number,
  outputCost: number,
  cacheReadCost: number,
  cacheWriteCost: number,
) => ({
  input_tokens: Math.round(inputCost * 500_000),
  output_tokens: Math.round(outputCost * 120_000),
  cache_read_tokens: Math.round(cacheReadCost * 1_000_000),
  cache_write_tokens: Math.round(cacheWriteCost * 50_000),
  total_tokens: 0,
  input_cost: inputCost,
  output_cost: outputCost,
  cache_read_cost: cacheReadCost,
  cache_write_cost: cacheWriteCost,
  total_cost: inputCost + outputCost + cacheReadCost + cacheWriteCost,
});

const mockData = {
  airline_name: 'Clic Air',
  start_date: '2026-03-01',
  end_date: '2026-03-15',
  costs_by_day: {
    '2026-03-01': dayTemplate(1.05, 1.62, 0.06, 0.28),
    '2026-03-02': dayTemplate(0.92, 1.48, 0.04, 0.22),
    '2026-03-03': dayTemplate(1.18, 1.75, 0.08, 0.31),
    '2026-03-04': dayTemplate(0.88, 1.55, 0.05, 0.19),
    '2026-03-05': dayTemplate(1.12, 1.68, 0.07, 0.35),
    '2026-03-06': dayTemplate(0.95, 1.42, 0.03, 0.24),
    '2026-03-07': dayTemplate(1.08, 1.81, 0.09, 0.27),
    '2026-03-08': dayTemplate(0.99, 1.59, 0.06, 0.33),
    '2026-03-09': dayTemplate(1.15, 1.72, 0.04, 0.21),
    '2026-03-10': dayTemplate(0.91, 1.51, 0.08, 0.29),
    '2026-03-11': dayTemplate(1.06, 1.64, 0.05, 0.26),
    '2026-03-12': dayTemplate(1.02, 1.78, 0.07, 0.32),
    '2026-03-13': dayTemplate(0.97, 1.46, 0.06, 0.18),
    '2026-03-14': dayTemplate(1.14, 1.69, 0.04, 0.34),
    '2026-03-15': dayTemplate(1.08, 1.56, 0.09, 0.23),
  },
  total_cost: 48.37,
  avg_cost_per_conversation: 0.0790144,
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
