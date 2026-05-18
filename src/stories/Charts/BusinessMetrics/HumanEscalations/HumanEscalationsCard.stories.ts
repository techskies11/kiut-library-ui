import type { Meta, StoryObj } from '@storybook/vue3'
import HumanEscalationsCard from './HumanEscalationsCard.vue'

const meta: Meta<typeof HumanEscalationsCard> = {
  title: 'Charts/Business Metrics/Human Escalations Card',
  component: HumanEscalationsCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HumanEscalationsCard>

export const Default: Story = {
  args: {
    escalationRatePercentage: 11.25,
    previousEscalationRatePercentage: 9.5,
  },
}
