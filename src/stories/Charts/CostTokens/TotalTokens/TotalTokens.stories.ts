import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TotalTokens from './TotalTokens.vue'

const meta: Meta<typeof TotalTokens> = {
  title: 'Charts/CostTokens/TotalTokens',
  component: TotalTokens,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Compact KPI card for total LLM token consumption.

## Usage
\`\`\`vue
<TotalTokens
  :totalTokens="15000000"
  :previousTotalTokens="14200000"
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
    totalTokens: {
      control: 'number',
      description: 'Total tokens consumed in the selected period',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    previousTotalTokens: {
      control: 'number',
      description: 'Previous period total for the change badge',
      table: {
        type: { summary: 'number | null' },
        defaultValue: { summary: 'null' },
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
type Story = StoryObj<typeof TotalTokens>

export const Default: Story = {
  args: {
    totalTokens: 15_000_000,
    previousTotalTokens: 14_200_000,
    loading: false,
  },
}

export const Loading: Story = {
  args: {
    totalTokens: 0,
    previousTotalTokens: null,
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    totalTokens: 0,
    previousTotalTokens: null,
    loading: false,
  },
}

export const HighValues: Story = {
  args: {
    totalTokens: 125_750_000,
    previousTotalTokens: 110_000_000,
    loading: false,
  },
}

export const TokensDecrease: Story = {
  args: {
    totalTokens: 12_500_000,
    previousTotalTokens: 15_000_000,
    loading: false,
  },
}

export const Dark: Story = {
  args: {
    totalTokens: 15_000_000,
    previousTotalTokens: 14_200_000,
    loading: false,
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
