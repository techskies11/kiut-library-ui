import type { Meta, StoryObj } from '@storybook/vue3'
import TransactionsChart from './TransactionsChart.vue'

const meta = {
  title: 'Charts/BusinessMetrics/TransactionsChart',
  component: TransactionsChart,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    data: {
      control: 'object',
      description: 'Transactions data including totals, breakdown items and daily breakdown',
    },
    breakdownBy: {
      control: 'select',
      options: ['all', 'payment_method', 'agent_type', 'channel', 'channel_and_agent'],
      description: 'Active breakdown dimension',
    },
    enableExport: {
      control: 'boolean',
      description: 'Shows PDF/CSV export buttons in the header',
    },
    exportLoading: {
      control: 'boolean',
      description: 'Loading state of the export buttons',
    },
    onChangeBreakdown: {
      action: 'changeBreakdown',
      description: 'Emitted when the breakdown select changes',
    },
    onExport: {
      action: 'export',
      description: 'Emitted when an export button is clicked (pdf | csv)',
    },
  },
  decorators: [
    () => ({
      template: '<div class="box-border h-[560px] w-full max-w-5xl px-2 py-4"><story /></div>',
    }),
  ],
} satisfies Meta<typeof TransactionsChart>

export default meta
type Story = StoryObj<typeof meta>

const salesByChannelByDay = [
  { date: '2026-05-01', channels: { web: 40, whatsapp: 12 } },
  { date: '2026-05-02', channels: { web: 55, whatsapp: 18 } },
  { date: '2026-05-03', channels: { web: 48, whatsapp: 15 } },
]

const transactionsByDay = [
  { date: '2026-05-01', count: 52, breakdown: { credit_card: 30, debit_card: 15, cash: 7 } },
  { date: '2026-05-02', count: 73, breakdown: { credit_card: 42, debit_card: 21, cash: 10 } },
  { date: '2026-05-03', count: 63, breakdown: { credit_card: 36, debit_card: 18, cash: 9 } },
]

export const Default: Story = {
  args: {
    loading: false,
    enableExport: true,
    breakdownBy: 'all',
    data: {
      airline_name: 'Demo Airline',
      start_date: '2026-05-01',
      end_date: '2026-05-03',
      total_sell_success: 188,
      sales_by_channel_by_day: salesByChannelByDay,
      breakdown: [],
      transactions_by_day: [],
    },
  },
}

export const ByPaymentMethod: Story = {
  args: {
    loading: false,
    enableExport: true,
    breakdownBy: 'payment_method',
    data: {
      airline_name: 'Demo Airline',
      start_date: '2026-05-01',
      end_date: '2026-05-03',
      total_sell_success: 188,
      sales_by_channel_by_day: salesByChannelByDay,
      breakdown: [
        { key: 'credit_card', count: 108, percentage: 57.4 },
        { key: 'debit_card', count: 54, percentage: 28.7 },
        { key: 'cash', count: 26, percentage: 13.8 },
      ],
      transactions_by_day: transactionsByDay,
    },
  },
}

export const ByChannel: Story = {
  args: {
    loading: false,
    enableExport: true,
    breakdownBy: 'channel',
    data: {
      airline_name: 'Demo Airline',
      start_date: '2026-05-01',
      end_date: '2026-05-03',
      total_sell_success: 188,
      sales_by_channel_by_day: salesByChannelByDay,
      breakdown: [
        { key: 'web', count: 143, percentage: 76.1 },
        { key: 'whatsapp', count: 45, percentage: 23.9 },
      ],
      transactions_by_day: [
        { date: '2026-05-01', count: 52, breakdown: { web: 40, whatsapp: 12 } },
        { date: '2026-05-02', count: 73, breakdown: { web: 55, whatsapp: 18 } },
        { date: '2026-05-03', count: 63, breakdown: { web: 48, whatsapp: 15 } },
      ],
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
      total_sell_success: 0,
      sales_by_channel_by_day: [],
      breakdown: [],
      transactions_by_day: [],
    },
  },
}
