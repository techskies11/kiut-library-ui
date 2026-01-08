import type { Meta, StoryObj } from '@storybook/vue3-vite';
import TotalCost from './TotalCost.vue';

const meta: Meta<typeof TotalCost> = {
  title: 'Charts/CostTokens/TotalCost',
  component: TotalCost,
  tags: ['autodocs'],
  argTypes: {
    dates: { control: 'array' },
    airline_name: { control: 'string' },
    costUsage: { control: 'object' },
    conversationCount: { control: 'object' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TotalCost>;

const mockCostUsage = {
  total_cost: 1250.75,
  costs_by_day: {
    '2023-10-01': { total_cost: 150.25 },
    '2023-10-02': { total_cost: 200.50 },
    '2023-10-03': { total_cost: 175.00 },
    '2023-10-04': { total_cost: 300.00 },
    '2023-10-05': { total_cost: 125.00 },
    '2023-10-06': { total_cost: 180.00 },
    '2023-10-07': { total_cost: 120.00 },
  }
};

const mockConversationCount = {
  total_conversations: 5000,
};

export const Default: Story = {
  args: {
    dates: [new Date('2023-10-01'), new Date('2023-10-07')],
    airline_name: 'Aeroméxico',
    costUsage: mockCostUsage,
    conversationCount: mockConversationCount,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    dates: [new Date('2023-10-01'), new Date('2023-10-07')],
    airline_name: 'Aeroméxico',
    costUsage: mockCostUsage,
    conversationCount: mockConversationCount,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    dates: [new Date('2023-10-01'), new Date('2023-10-07')],
    airline_name: 'Aeroméxico',
    costUsage: {
      total_cost: 0,
      costs_by_day: {}
    },
    conversationCount: {
      total_conversations: 0,
    },
    loading: false,
  },
};

