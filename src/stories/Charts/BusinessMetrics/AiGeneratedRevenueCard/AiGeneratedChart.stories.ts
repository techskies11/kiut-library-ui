import type { Meta, StoryObj } from '@storybook/vue3'
import AiGeneratedChart from './AiGeneratedChart.vue'

const meta = {
  title: 'Charts/BusinessMetrics/AiGeneratedChart',
  component: AiGeneratedChart,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    data: {
      control: 'object',
      description: 'AI revenue data including totals, breakdown items and daily breakdown',
    },
    breakdownBy: {
      control: 'select',
      options: ['all', 'payment_method', 'agent_type', 'channel', 'channel_and_agent'],
      description: 'Active breakdown dimension',
    },
    onChangeBreakdown: {
      action: 'changeBreakdown',
      description: 'Emitted when the breakdown select changes',
    },
  },
  decorators: [
    () => ({
      template: '<div class="box-border h-[560px] w-full max-w-5xl px-2 py-4"><story /></div>',
    }),
  ],
} satisfies Meta<typeof AiGeneratedChart>

export default meta
type Story = StoryObj<typeof meta>

const sampleDays = [
  {
    date: '2026-05-01',
    ai_revenue: 42000,
    ai_revenue_usd: 42000,
    breakdown: {
      credit_card: { ai_revenue: 25000, ai_revenue_usd: 25000 },
      debit_card: { ai_revenue: 12000, ai_revenue_usd: 12000 },
      cash: { ai_revenue: 5000, ai_revenue_usd: 5000 },
    },
  },
  {
    date: '2026-05-02',
    ai_revenue: 55000,
    ai_revenue_usd: 55000,
    breakdown: {
      credit_card: { ai_revenue: 30000, ai_revenue_usd: 30000 },
      debit_card: { ai_revenue: 18000, ai_revenue_usd: 18000 },
      cash: { ai_revenue: 7000, ai_revenue_usd: 7000 },
    },
  },
  {
    date: '2026-05-03',
    ai_revenue: 48000,
    ai_revenue_usd: 48000,
    breakdown: {
      credit_card: { ai_revenue: 27000, ai_revenue_usd: 27000 },
      debit_card: { ai_revenue: 14000, ai_revenue_usd: 14000 },
      cash: { ai_revenue: 7000, ai_revenue_usd: 7000 },
    },
  },
]

export const Default: Story = {
  args: {
    loading: false,
    breakdownBy: 'all',
    data: {
      airline_name: 'Demo Airline',
      start_date: '2026-05-01',
      end_date: '2026-05-03',
      currency: 'USD',
      total_ai_revenue: 145000,
      total_ai_revenue_usd: 145000,
      breakdown: [],
      ai_revenue_by_day: sampleDays,
    },
  },
}

export const ByPaymentMethod: Story = {
  args: {
    loading: false,
    breakdownBy: 'payment_method',
    data: {
      airline_name: 'Demo Airline',
      start_date: '2026-05-01',
      end_date: '2026-05-03',
      currency: 'USD',
      total_ai_revenue: 145000,
      total_ai_revenue_usd: 145000,
      breakdown: [
        { key: 'credit_card', total: 82000, total_usd: 82000, percentage: 56.6 },
        { key: 'debit_card', total: 44000, total_usd: 44000, percentage: 30.3 },
        { key: 'cash', total: 19000, total_usd: 19000, percentage: 13.1 },
      ],
      ai_revenue_by_day: sampleDays,
    },
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    data: null,
  },
}

export const Empty: Story = {
  args: {
    loading: false,
    breakdownBy: 'all',
    data: {
      airline_name: 'Demo Airline',
      start_date: '2026-05-01',
      end_date: '2026-05-03',
      currency: 'USD',
      total_ai_revenue: 0,
      total_ai_revenue_usd: 0,
      breakdown: [],
      ai_revenue_by_day: [],
    },
  },
}
