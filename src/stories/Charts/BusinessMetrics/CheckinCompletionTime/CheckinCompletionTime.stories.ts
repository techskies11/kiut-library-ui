import type { Meta, StoryObj } from '@storybook/vue3'
import CheckinCompletionTime from './CheckinCompletionTime.vue'

const mockByDay: Record<string, number | null> = {
  '2026-02-01': 180,
  '2026-02-05': 240,
  '2026-02-09': null,
  '2026-02-13': 210,
  '2026-02-17': 195,
  '2026-02-21': 260,
  '2026-02-25': 175,
  '2026-03-01': 220,
  '2026-03-05': 205,
  '2026-03-09': 190,
}

const meta = {
  title: 'Charts/BusinessMetrics/CheckinCompletionTime',
  component: CheckinCompletionTime,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template:
        '<div class="box-border h-[420px] w-full max-w-5xl px-2 py-4"><story /></div>',
    }),
  ],
} satisfies Meta<typeof CheckinCompletionTime>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    loading: false,
    data: {
      avg_checkin_completion_time_seconds: 205,
      avg_checkin_completion_time_formatted: '3m 25s',
      avg_checkin_completion_time_by_day: mockByDay,
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
      avg_checkin_completion_time_by_day: {},
    },
  },
}
