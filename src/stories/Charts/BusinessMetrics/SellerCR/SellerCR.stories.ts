import type { Meta, StoryObj } from '@storybook/vue3'
import SellerCR from './SellerCR.vue'

const meta: Meta<typeof SellerCR> = {
  title: 'Charts/BusinessMetrics/SellerCR',
  component: SellerCR,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof SellerCR>

export const Default: Story = {
  args: {
    sellerCr: 50.8,
    previousSellerCr: 48.8,
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
    sellerCr: 45.2,
    previousSellerCr: 48.8,
    loading: false,
  },
}
