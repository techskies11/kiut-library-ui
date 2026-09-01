import type { Meta, StoryObj } from '@storybook/vue3'
import TransactionsChart from './TransactionsChart.vue'

const mockData = {
  airline_name: '2W',
  start_date: '2026-01-01',
  end_date: '2026-01-31',
  total_sell_success: 96,
  total_by_currency: [{ currency: 'USD', total_value: 42000, count: 96 }],
  sales_by_channel_by_day: [
    { date: '2026-01-10', channels: { whatsapp: 12, web: 4 } },
    { date: '2026-01-11', channels: { whatsapp: 18, web: 6 } },
  ],
  breakdown: [
    { key: 'seller|ticket', count: 60, percentage: 62.5 },
    { key: 'seller|ancillaries', count: 20, percentage: 20.8 },
    { key: 'checkin|ancillaries', count: 16, percentage: 16.7 },
  ],
  transactions_by_day: [
    {
      date: '2026-01-10',
      count: 16,
      breakdown: { 'seller|ticket': 10, 'seller|ancillaries': 6 },
    },
    {
      date: '2026-01-11',
      count: 24,
      breakdown: { 'seller|ticket': 14, 'checkin|ancillaries': 10 },
    },
  ],
}

const customBreakdownOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'agent_and_product', label: 'Agente y producto' },
]

const customTitles = {
  all: 'Transacciones',
  agent_and_product: 'Transacciones por agente y producto',
}

const meta: Meta<typeof TransactionsChart> = {
  title: 'Charts/BusinessMetrics/TransactionsChart',
  component: TransactionsChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    loading: false,
    data: mockData,
    breakdownBy: 'all',
  },
}

export const AgentAndProductBreakdown: Story = {
  args: {
    loading: false,
    data: mockData,
    breakdownBy: 'agent_and_product',
  },
}

export const CustomI18nOverrides: Story = {
  args: {
    loading: false,
    data: mockData,
    breakdownBy: 'agent_and_product',
    breakdownOptions: customBreakdownOptions,
    titles: customTitles,
    subtitle: 'Transacciones exitosas',
    emptyTitle: 'Sin datos de transacciones',
    emptyDescription: 'Ajusta el rango de fechas.',
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
    data: {
      ...mockData,
      total_sell_success: 0,
      breakdown: [],
      transactions_by_day: [],
      sales_by_channel_by_day: [],
      total_by_currency: [],
    },
  },
}
