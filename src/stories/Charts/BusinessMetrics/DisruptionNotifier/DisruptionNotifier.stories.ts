import type { Meta, StoryObj } from '@storybook/vue3'
import DisruptionNotifier from './DisruptionNotifier.vue'

const meta: Meta<typeof DisruptionNotifier> = {
  title: 'Charts/BusinessMetrics/DisruptionNotifier',
  component: DisruptionNotifier,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof DisruptionNotifier>

export const Default: Story = {
  args: {
    loading: false,
    data: {
      documentCounts: {
        items: [
          { date: '2026-02-11', processing_started: 1, processing_completed: 0, processing_failed: 0 },
          { date: '2026-02-12', processing_started: 7, processing_completed: 4, processing_failed: 0 },
          { date: '2026-02-13', processing_started: 6, processing_completed: 6, processing_failed: 0 },
          { date: '2026-02-16', processing_started: 3, processing_completed: 3, processing_failed: 0 },
        ],
      },
      processingCounts: {
        items: [
          { date: '2026-02-12', processing_started: 1, processing_success: 3, notification_sent: 1, dq_error_phone_not_found: 0, dq_error_flight_not_found: 0, dq_error_booking_not_found: 0, dq_error_other: 0, notification_failed: 0 },
          { date: '2026-02-13', processing_started: 13, processing_success: 13, notification_sent: 4, dq_error_phone_not_found: 0, dq_error_flight_not_found: 0, dq_error_booking_not_found: 0, dq_error_other: 0, notification_failed: 0 },
          { date: '2026-02-16', processing_started: 6, processing_success: 0, notification_sent: 0, dq_error_phone_not_found: 0, dq_error_flight_not_found: 0, dq_error_booking_not_found: 5, dq_error_other: 0, notification_failed: 0 },
        ],
      },
    },
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    loading: false,
    data: {
      documentCounts: { items: [] },
      processingCounts: { items: [] },
    },
  },
}

export const WithErrors: Story = {
  args: {
    loading: false,
    data: {
      documentCounts: {
        items: [
          { date: '2026-02-12', processing_started: 10, processing_completed: 5, processing_failed: 3 },
          { date: '2026-02-13', processing_started: 8, processing_completed: 2, processing_failed: 4 },
        ],
      },
      processingCounts: {
        items: [
          { date: '2026-02-12', processing_started: 5, processing_success: 2, notification_sent: 1, dq_error_phone_not_found: 2, dq_error_flight_not_found: 1, dq_error_booking_not_found: 0, dq_error_other: 0, notification_failed: 1 },
          { date: '2026-02-13', processing_started: 8, processing_success: 3, notification_sent: 2, dq_error_phone_not_found: 0, dq_error_flight_not_found: 0, dq_error_booking_not_found: 3, dq_error_other: 1, notification_failed: 2 },
        ],
      },
    },
  },
}
