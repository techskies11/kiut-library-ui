import type { Meta, StoryObj } from '@storybook/vue3'
import CheckinKPI from './CheckinKPI.vue'

const meta: Meta<typeof CheckinKPI> = {
  title: 'Charts/BusinessMetrics/CheckinKPI',
  component: CheckinKPI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    () => ({
      template: '<div class="p-6 w-full max-w-[1200px]"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof CheckinKPI>

export const Default: Story = {
  args: {
    checkinInitiated: 1720,
    previousCheckinInitiated: 1587,
    successRatePct: 78.5,
    successCount: 1350,
    previousSuccessRatePct: 76.9,
    errorRatePct: 8.7,
    errorCount: 150,
    previousErrorRatePct: 8.6,
    abandonRatePct: 12.8,
    abandonCount: 220,
    previousAbandonRatePct: 13.0,
    avgCompletionTimeSeconds: 186,
    avgCompletionTimeFormatted: '3m 6s',
    previousAvgCompletionTimeSeconds: 210,
    avgInteractionsToComplete: 7.4,
    avgInteractionsToCompleteFormatted: '7.4',
    previousAvgInteractionsToComplete: 8.0,
    loading: false,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Dark: Story = {
  args: {
    ...Default.args,
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const CustomLabels: Story = {
  args: {
    ...Default.args,
    labels: {
      initiated: 'Check-ins iniciados',
      success: '% Éxito check-in',
      errors: '% Errores',
      abandon: '% Abandono',
      avgInteractionsToComplete: 'Interacciones para completar',
    },
  },
}
