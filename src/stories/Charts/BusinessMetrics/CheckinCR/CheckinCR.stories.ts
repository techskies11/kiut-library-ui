import type { Meta, StoryObj } from '@storybook/vue3'
import CheckinCR from './CheckinCR.vue'

const meta: Meta<typeof CheckinCR> = {
  title: 'Charts/BusinessMetrics/CheckinCR',
  component: CheckinCR,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof CheckinCR>

export const Default: Story = {
  args: {
    checkinCr: 68.4,
    previousCheckinCr: 66.6,
    loading: false,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Down: Story = {
  args: {
    checkinCr: 62.1,
    previousCheckinCr: 66.6,
    loading: false,
  },
}
