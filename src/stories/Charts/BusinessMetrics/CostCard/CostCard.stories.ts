import type { Meta, StoryObj } from '@storybook/vue3'
import CostCard from './CostCard.vue'

const meta: Meta<typeof CostCard> = {
  title: 'Charts/BusinessMetrics/CostCard',
  component: CostCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof CostCard>

export const Default: Story = {
  args: {
    totalConversations: 3124,
    previousTotalConversations: 3295,
    loading: false,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Up: Story = {
  args: {
    totalConversations: 3500,
    previousTotalConversations: 3124,
    loading: false,
  },
}

export const Down: Story = {
  args: {
    totalConversations: 2800,
    previousTotalConversations: 3295,
    loading: false,
  },
}
