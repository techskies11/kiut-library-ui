import type { Meta, StoryObj } from '@storybook/vue3'
import HumanEscalations from './HumanEscalations.vue'

const meta: Meta<typeof HumanEscalations> = {
  title: 'Charts/BusinessMetrics/HumanEscalations',
  component: HumanEscalations,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HumanEscalations>

export const Default: Story = {
  args: {
    loading: false,
    breakdownBy: 'agent',
    data: {
      total_conversations: 1200,
      total_escalated_conversations: 132,
      escalation_rate_percentage: 11,
      breakdown_by: 'agent',
      breakdown_items: [
        { key: 'checkin', label: 'Check-in', total_escalated_conversations: 32, percentage: 24.24 },
        { key: 'faq', label: 'FAQ', total_escalated_conversations: 15, percentage: 11.36 },
        { key: 'booking_manager', label: 'Manage Booking', total_escalated_conversations: 26, percentage: 19.7 },
        { key: 'seller', label: 'Seller', total_escalated_conversations: 34, percentage: 25.76 },
        { key: 'triage', label: 'Triage', total_escalated_conversations: 25, percentage: 18.94 },
      ],
      breakdown_by_day: [
        {
          date: '2026-05-01',
          total_escalated_conversations: 25,
          items: [
            { key: 'checkin', label: 'Check-in', escalated_conversations: 4, percentage: 16 },
            { key: 'faq', label: 'FAQ', escalated_conversations: 3, percentage: 12 },
            { key: 'booking_manager', label: 'Manage Booking', escalated_conversations: 6, percentage: 24 },
            { key: 'seller', label: 'Seller', escalated_conversations: 7, percentage: 28 },
            { key: 'triage', label: 'Triage', escalated_conversations: 5, percentage: 20 },
          ],
        },
        {
          date: '2026-05-02',
          total_escalated_conversations: 22,
          items: [
            { key: 'checkin', label: 'Check-in', escalated_conversations: 3, percentage: 13.64 },
            { key: 'faq', label: 'FAQ', escalated_conversations: 2, percentage: 9.09 },
            { key: 'booking_manager', label: 'Manage Booking', escalated_conversations: 5, percentage: 22.73 },
            { key: 'seller', label: 'Seller', escalated_conversations: 7, percentage: 31.82 },
            { key: 'triage', label: 'Triage', escalated_conversations: 5, percentage: 22.73 },
          ],
        },
      ],
      escalations_by_day: [
        {
          date: '2026-05-01',
          total_conversations: 220,
          total_escalated_conversations: 25,
          escalation_rate_percentage: 11.36,
        },
        {
          date: '2026-05-02',
          total_conversations: 180,
          total_escalated_conversations: 22,
          escalation_rate_percentage: 12.22,
        },
        {
          date: '2026-05-03',
          total_conversations: 210,
          total_escalated_conversations: 18,
          escalation_rate_percentage: 8.57,
        },
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
    breakdownBy: 'agent',
    data: {
      total_conversations: 0,
      total_escalated_conversations: 0,
      escalation_rate_percentage: 0,
      breakdown_by: 'agent',
      breakdown_items: [],
      breakdown_by_day: [],
      escalations_by_day: [],
    },
  },
}
