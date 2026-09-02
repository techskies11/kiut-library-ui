import type { Meta, StoryObj } from '@storybook/vue3'
import SellerInteractions from './SellerInteractions.vue'

const mockByDay: Record<string, number | null> = {
  '2026-02-01': 11.2,
  '2026-02-05': 9.4,
  '2026-02-09': null,
  '2026-02-13': 8.1,
  '2026-02-17': 10.0,
  '2026-02-21': 9.1,
  '2026-02-25': 8.5,
  '2026-03-01': 10.8,
  '2026-03-05': 9.6,
  '2026-03-09': 9.0,
}

const meta = {
  title: 'Charts/BusinessMetrics/SellerInteractions',
  component: SellerInteractions,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template:
        '<div class="box-border h-[420px] w-full max-w-5xl px-2 py-4"><story /></div>',
    }),
  ],
} satisfies Meta<typeof SellerInteractions>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    loading: false,
    data: {
      avg_sell_interactions_to_complete: 9.6,
      avg_sell_interactions_by_day: mockByDay,
    },
    enableExport: true,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    data: null,
  },
}

export const EmptyState: Story = {
  args: {
    loading: false,
    data: {
      avg_sell_interactions_by_day: {},
    },
  },
}
