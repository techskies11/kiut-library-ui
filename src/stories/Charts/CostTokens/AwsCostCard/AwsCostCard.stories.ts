import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AwsCostCard from './AwsCostCard.vue'

const meta: Meta<typeof AwsCostCard> = {
  title: 'Charts/CostTokens/AwsCostCard',
  component: AwsCostCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Compact KPI card for allocated AWS infrastructure spend.

## Usage
\`\`\`vue
<AwsCostCard
  :totalCost="26841"
  :dailyMean="1789"
  :previousTotalCost="26000"
  :loading="false"
/>
\`\`\`
        `,
      },
    },
  },
  decorators: [
    () => ({
      template: '<div style="width: 320px;"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof AwsCostCard>

export const Default: Story = {
  args: {
    totalCost: 26841,
    dailyMean: 1789,
    previousTotalCost: 26000,
    loading: false,
  },
}

export const Loading: Story = {
  args: {
    totalCost: 0,
    dailyMean: 0,
    previousTotalCost: null,
    loading: true,
  },
}

export const CostDecrease: Story = {
  args: {
    totalCost: 24000,
    dailyMean: 1600,
    previousTotalCost: 26841,
    loading: false,
  },
}

export const Dark: Story = {
  args: {
    totalCost: 26841,
    dailyMean: 1789,
    previousTotalCost: 26000,
    loading: false,
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
