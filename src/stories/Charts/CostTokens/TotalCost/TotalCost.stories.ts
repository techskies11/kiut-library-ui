import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TotalCost from './TotalCost.vue'

const meta: Meta<typeof TotalCost> = {
  title: 'Charts/CostTokens/TotalCost',
  component: TotalCost,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Compact KPI card for total LLM spend.

## Features
- Wallet icon and optional period-over-period change badge
- Total cost with daily average inline (\`($147/day)\`)
- Loading skeleton via \`CardMetric\`
- Light and dark theme support

## Usage
\`\`\`vue
<TotalCost
  :totalCost="2198"
  :dailyMean="147"
  :previousTotalCost="2033.5"
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
  argTypes: {
    totalCost: {
      control: 'number',
      description: 'Total LLM cost for the selected period',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    dailyMean: {
      control: 'number',
      description: 'Average daily LLM cost',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    previousTotalCost: {
      control: 'number',
      description: 'Previous period total for the change badge',
      table: {
        type: { summary: 'number | null' },
        defaultValue: { summary: 'null' },
      },
    },
    label: {
      control: 'text',
      description: 'Metric label shown below the value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'LLM cost'" },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TotalCost>

export const Default: Story = {
  args: {
    totalCost: 2198,
    dailyMean: 147,
    previousTotalCost: 2033.5,
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

export const Empty: Story = {
  args: {
    totalCost: 0,
    dailyMean: 0,
    previousTotalCost: null,
    loading: false,
  },
}

export const HighValues: Story = {
  args: {
    totalCost: 125750.99,
    dailyMean: 17964.43,
    previousTotalCost: 110200,
    loading: false,
  },
}

export const CostDecrease: Story = {
  args: {
    totalCost: 1800,
    dailyMean: 120,
    previousTotalCost: 2198,
    loading: false,
  },
}

export const Dark: Story = {
  args: {
    totalCost: 2198,
    dailyMean: 147,
    previousTotalCost: 2033.5,
    loading: false,
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
