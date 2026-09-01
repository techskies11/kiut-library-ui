import type { Meta, StoryObj } from '@storybook/vue3'
import AiGeneratedChart from './AiGeneratedChart.vue'

const mockData = {
  airline_name: '2W',
  start_date: '2026-01-01',
  end_date: '2026-01-31',
  currency: 'USD',
  total_ai_revenue: 12500,
  total_ai_revenue_usd: 12500,
  breakdown: [
    { key: 'seller|ticket', total: 8000, total_usd: 8000, percentage: 64 },
    { key: 'seller|ancillaries', total: 2500, total_usd: 2500, percentage: 20 },
    { key: 'checkin|ancillaries', total: 2000, total_usd: 2000, percentage: 16 },
  ],
  ai_revenue_by_day: [
    {
      date: '2026-01-10',
      ai_revenue: 4200,
      ai_revenue_usd: 4200,
      breakdown: {
        'seller|ticket': { ai_revenue: 3000, ai_revenue_usd: 3000 },
        'seller|ancillaries': { ai_revenue: 1200, ai_revenue_usd: 1200 },
      },
    },
    {
      date: '2026-01-11',
      ai_revenue: 8300,
      ai_revenue_usd: 8300,
      breakdown: {
        'seller|ticket': { ai_revenue: 5000, ai_revenue_usd: 5000 },
        'checkin|ancillaries': { ai_revenue: 3300, ai_revenue_usd: 3300 },
      },
    },
  ],
}

const customBreakdownOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'agent_and_product', label: 'Agente y producto' },
]

const customTitles = {
  all: 'Ingresos IA',
  agent_and_product: 'Ingresos por agente y producto',
}

const meta: Meta<typeof AiGeneratedChart> = {
  title: 'Charts/BusinessMetrics/AiGeneratedChart',
  component: AiGeneratedChart,
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
    subtitle: 'Ingresos generados por IA',
    emptyTitle: 'Sin datos de ingresos',
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
      total_ai_revenue: 0,
      total_ai_revenue_usd: 0,
      breakdown: [],
      ai_revenue_by_day: [],
    },
  },
}
