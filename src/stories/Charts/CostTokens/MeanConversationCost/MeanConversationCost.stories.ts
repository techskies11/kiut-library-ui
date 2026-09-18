import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MeanConversationCost from './MeanConversationCost.vue'

const meta: Meta<typeof MeanConversationCost> = {
  title: 'Charts/CostTokens/MeanConversationCost',
  component: MeanConversationCost,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Compact KPI card for average LLM cost per conversation.

## Usage
\`\`\`vue
<MeanConversationCost
  :mean="0.176"
  :previousMean="0.184"
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
    mean: {
      control: 'number',
      description: 'Average cost per conversation for the selected period',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    previousMean: {
      control: 'number',
      description: 'Previous period average for the change badge',
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
type Story = StoryObj<typeof MeanConversationCost>

export const Default: Story = {
  args: {
    mean: 0.176,
    previousMean: 0.184,
    loading: false,
  },
}

export const Loading: Story = {
  args: {
    mean: 0,
    previousMean: null,
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    mean: 0,
    previousMean: null,
    loading: false,
  },
}

export const HighMean: Story = {
  args: {
    mean: 150.43,
    previousMean: 140,
    loading: false,
  },
}

export const CostDecrease: Story = {
  args: {
    mean: 0.15,
    previousMean: 0.176,
    loading: false,
  },
}

export const Dark: Story = {
  args: {
    mean: 0.176,
    previousMean: 0.184,
    loading: false,
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
