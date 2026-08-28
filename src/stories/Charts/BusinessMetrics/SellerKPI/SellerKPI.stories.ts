import type { Meta, StoryObj } from '@storybook/vue3'
import SellerKPI from './SellerKPI.vue'

const meta: Meta<typeof SellerKPI> = {
  title: 'Charts/BusinessMetrics/SellerKPI',
  component: SellerKPI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    () => ({
      template: '<div class="p-6 w-full max-w-[1400px]"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof SellerKPI>

export const Default: Story = {
  args: {
    salesInitiated: 1200,
    previousSalesInitiated: 1067,
    successRatePct: 50.8,
    successCount: 610,
    previousSuccessRatePct: 48.7,
    errorRatePct: 5.0,
    errorCount: 60,
    previousErrorRatePct: 5.06,
    abandonRatePct: 44.2,
    abandonCount: 530,
    previousAbandonRatePct: 45.6,
    revenueUsd: 48920,
    revenueFormatted: 'USD 48,920',
    previousRevenueUsd: 45000,
    avgCompletionTimeSeconds: 765,
    avgCompletionTimeFormatted: '12m 45s',
    previousAvgCompletionTimeSeconds: 810,
    avgInteractionsToComplete: 11.2,
    avgInteractionsToCompleteFormatted: '11.2',
    previousAvgInteractionsToComplete: 12.1,
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
      initiated: 'Ventas iniciadas',
      success: '% Éxito de ventas',
      errors: '% Errores',
      abandon: '% Abandono',
      revenue: 'Ingresos',
      avgCompletionTime: 'Tiempo medio de cierre',
      avgInteractionsToComplete: 'Interacciones para completar',
    },
  },
}

export const Empty: Story = {
  args: {
    salesInitiated: 0,
    successRatePct: 0,
    successCount: 0,
    errorRatePct: 0,
    errorCount: 0,
    abandonRatePct: 0,
    abandonCount: 0,
    revenueUsd: null,
    revenueFormatted: null,
    avgCompletionTimeSeconds: null,
    avgCompletionTimeFormatted: null,
    avgInteractionsToComplete: null,
    avgInteractionsToCompleteFormatted: null,
  },
}

export const WithoutOptionalMetrics: Story = {
  args: {
    salesInitiated: 1200,
    previousSalesInitiated: 1067,
    successRatePct: 50.8,
    successCount: 610,
    previousSuccessRatePct: 48.7,
    errorRatePct: 5.0,
    errorCount: 60,
    previousErrorRatePct: 5.06,
    abandonRatePct: 44.2,
    abandonCount: 530,
    previousAbandonRatePct: 45.6,
    revenueUsd: null,
    revenueFormatted: null,
    avgCompletionTimeSeconds: null,
    avgCompletionTimeFormatted: null,
    avgInteractionsToComplete: null,
    avgInteractionsToCompleteFormatted: null,
  },
}
