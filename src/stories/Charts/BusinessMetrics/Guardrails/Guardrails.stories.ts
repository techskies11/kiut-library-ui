import type { Meta, StoryObj } from '@storybook/vue3'
import Guardrails from './Guardrails.vue'

const meta: Meta<typeof Guardrails> = {
  title: 'Charts/BusinessMetrics/Guardrails',
  component: Guardrails,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Guardrails>

export const Default: Story = {
  args: {
    loading: false,
    data: {
      items: [
        { date: '2026-01-09', guardrail_type: 'SEXUAL', guardrail_action: 'BLOCKED', guardrail_source: 'user', count: 1 },
        { date: '2026-01-16', guardrail_type: 'SEXUAL', guardrail_action: 'BLOCKED', guardrail_source: 'user', count: 1 },
        { date: '2026-01-27', guardrail_type: 'SEXUAL', guardrail_action: 'BLOCKED', guardrail_source: 'user', count: 2 },
        { date: '2026-01-28', guardrail_type: 'HATE', guardrail_action: 'WARNED', guardrail_source: 'user', count: 1 },
        { date: '2026-01-29', guardrail_type: 'VIOLENCE', guardrail_action: 'BLOCKED', guardrail_source: 'assistant', count: 1 },
      ],
    },
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    loading: false,
    data: { items: [] },
  },
}
