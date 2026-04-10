import type { Meta, StoryObj } from '@storybook/vue3'
import AiGeneratedRevenueCard from './AiGeneratedRevenueCard.vue'

const meta: Meta<typeof AiGeneratedRevenueCard> = {
  title: 'Charts/BusinessMetrics/AiGeneratedRevenueCard',
  component: AiGeneratedRevenueCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof AiGeneratedRevenueCard>

export const Default: Story = {
  args: {
    totalRevenue: 45280,
    previousTotalRevenue: 40250,
    currencyCode: 'USD',
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
    totalRevenue: 35000,
    previousTotalRevenue: 40250,
    currencyCode: 'USD',
    loading: false,
  },
}
