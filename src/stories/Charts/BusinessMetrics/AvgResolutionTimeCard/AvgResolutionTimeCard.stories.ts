import type { Meta, StoryObj } from '@storybook/vue3'
import AvgResolutionTimeCard from './AvgResolutionTimeCard.vue'

const meta: Meta<typeof AvgResolutionTimeCard> = {
  title: 'Charts/BusinessMetrics/AvgResolutionTimeCard',
  component: AvgResolutionTimeCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AvgResolutionTimeCard>

export const Default: Story = {
  args: {
    aiAgentAvgResolutionTimeSeconds: 8145,
    humanAvgResolutionTimeSeconds: 2415,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    aiAgentAvgResolutionTimeSeconds: null,
    humanAvgResolutionTimeSeconds: null,
  },
}
