import type { Meta, StoryObj } from '@storybook/vue3'
import BookingManagerCR from './BookingManagerCR.vue'

const meta: Meta<typeof BookingManagerCR> = {
  title: 'Charts/BusinessMetrics/BookingManagerCR',
  component: BookingManagerCR,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof BookingManagerCR>

export const Default: Story = {
  args: {
    bookingManagerCr: 42.1,
    previousBookingManagerCr: 41.4,
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
    bookingManagerCr: 38.5,
    previousBookingManagerCr: 41.4,
    loading: false,
  },
}
