import type { Meta, StoryObj } from '@storybook/vue3'
import SellerCompletionTime from './SellerCompletionTime.vue'

const mockByDay: Record<string, number | null> = {
  '2026-02-01': 720,
  '2026-02-05': 810,
  '2026-02-09': null,
  '2026-02-13': 765,
  '2026-02-17': 690,
  '2026-02-21': 840,
  '2026-02-25': 700,
  '2026-03-01': 780,
  '2026-03-05': 750,
  '2026-03-09': 735,
}

const meta = {
  title: 'Charts/BusinessMetrics/SellerCompletionTime',
  component: SellerCompletionTime,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template:
        '<div class="box-border h-[420px] w-full max-w-5xl px-2 py-4"><story /></div>',
    }),
  ],
} satisfies Meta<typeof SellerCompletionTime>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    loading: false,
    data: {
      avg_sell_completion_time_seconds: 765,
      avg_sell_completion_time_formatted: '12m 45s',
      avg_sell_completion_time_by_day: mockByDay,
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
      avg_sell_completion_time_by_day: {},
    },
  },
}
