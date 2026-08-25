import type { Meta, StoryObj } from '@storybook/vue3'
import CheckinInteractions from './CheckinInteractions.vue'

const mockByDay: Record<string, number | null> = {
  '2026-02-01': 9.1,
  '2026-02-05': 7.4,
  '2026-02-09': null,
  '2026-02-13': 6.2,
  '2026-02-17': 8.0,
  '2026-02-21': 7.1,
  '2026-02-25': 6.5,
  '2026-03-01': 8.8,
  '2026-03-05': 7.6,
  '2026-03-09': 7.0,
}

const meta = {
  title: 'Charts/BusinessMetrics/CheckinInteractions',
  component: CheckinInteractions,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template:
        '<div class="box-border h-[420px] w-full max-w-5xl px-2 py-4"><story /></div>',
    }),
  ],
} satisfies Meta<typeof CheckinInteractions>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    loading: false,
    data: {
      avg_checkin_interactions_to_complete: 7.4,
      avg_checkin_interactions_by_day: mockByDay,
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
      avg_checkin_interactions_by_day: {},
    },
  },
}
