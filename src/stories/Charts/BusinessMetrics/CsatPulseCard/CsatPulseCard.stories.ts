import type { Meta, StoryObj } from '@storybook/vue3'
import CsatPulseCard from './CsatPulseCard.vue'

const meta: Meta<typeof CsatPulseCard> = {
  title: 'Charts/BusinessMetrics/CsatPulseCard',
  component: CsatPulseCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof CsatPulseCard>

export const Default: Story = {
  args: {
    csatPulse: 87.4,
    previousCsatPulse: 85.2,
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
    csatPulse: 78.5,
    previousCsatPulse: 85.2,
    loading: false,
  },
}
