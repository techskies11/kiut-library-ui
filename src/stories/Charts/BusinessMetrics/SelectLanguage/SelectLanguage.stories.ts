import type { Meta, StoryObj } from '@storybook/vue3'
import SelectLanguage from './SelectLanguage.vue'

const meta: Meta<typeof SelectLanguage> = {
  title: 'Charts/BusinessMetrics/SelectLanguage',
  component: SelectLanguage,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof SelectLanguage>

export const Default: Story = {
  args: {
    loading: false,
    data: {
      items: [
        { date: '2026-01-25', language: 'es', count: 12 },
        { date: '2026-01-25', language: 'en', count: 8 },
        { date: '2026-01-26', language: 'es', count: 15 },
        { date: '2026-01-26', language: 'en', count: 5 },
        { date: '2026-01-26', language: 'pt', count: 3 },
        { date: '2026-01-27', language: 'es', count: 20 },
        { date: '2026-01-27', language: 'en', count: 10 },
        { date: '2026-01-28', language: 'es', count: 1 },
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

export const SingleLanguage: Story = {
  args: {
    loading: false,
    data: {
      items: [
        { date: '2026-01-28', language: 'es', count: 1 },
      ],
    },
  },
}
