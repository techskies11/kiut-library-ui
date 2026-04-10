import type { Meta, StoryObj } from '@storybook/vue3'
import CsatP95Card from './CsatP95Card.vue'

const meta: Meta<typeof CsatP95Card> = {
  title: 'Charts/BusinessMetrics/CsatP95Card',
  component: CsatP95Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof CsatP95Card>

export const Default: Story = {
  args: {
    csatP95: 4.6,
    previousCsatP95: 4.59,
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
    csatP95: 4.2,
    previousCsatP95: 4.6,
    loading: false,
  },
}
