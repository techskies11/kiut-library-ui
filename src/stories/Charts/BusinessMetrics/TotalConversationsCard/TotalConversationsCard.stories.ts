import type { Meta, StoryObj } from '@storybook/vue3'
import TotalConversationsCard from './TotalConversationsCard.vue'

const meta: Meta<typeof TotalConversationsCard> = {
  title: 'Charts/BusinessMetrics/TotalConversationsCard',
  component: TotalConversationsCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof TotalConversationsCard>

export const Default: Story = {
  args: {
    totalConversations: 12482,
    previousTotalConversations: 10550,
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
    totalConversations: 8320,
    previousTotalConversations: 10550,
    loading: false,
  },
}
