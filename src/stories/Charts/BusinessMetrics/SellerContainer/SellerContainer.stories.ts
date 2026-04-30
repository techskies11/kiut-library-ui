import type { Meta, StoryObj } from '@storybook/vue3'
import SellerContainer from './SellerContainer.vue'

const mockSellerData = {
  total_seller_conversations: 5000,
  total_sell_started: 4200,
  total_sell_get_quote: 3500,
  total_sell_booking_created: 2800,
  total_sell_success: 2400,
  total_sell_bank_transfer: 210,
  total_sell_cash_option: 145,
  total_value_sell_success: [
    { currency: 'USD', total_value: 850000, count: 1500 },
    { currency: 'MXN', total_value: 7200000, count: 900 },
  ],
  total_value_sell_bank_transfer: [
    { currency: 'USD', total_value: 73000, count: 125 },
    { currency: 'MXN', total_value: 650000, count: 85 },
  ],
  total_value_sell_cash_option: [
    { currency: 'USD', total_value: 42000, count: 75 },
    { currency: 'MXN', total_value: 360000, count: 70 },
  ],
  seller_by_day: [
    {
      date: '2024-11-01',
      seller_conversations: 180,
      sell_started_count: 150,
      sell_get_quote_count: 125,
      sell_booking_created_count: 100,
      sell_success_count: 85,
      sell_bank_transfer_count: 8,
      sell_cash_option_count: 5,
      daily_value_sell_success: [
        { currency: 'USD', total_value: 24500, count: 50 },
        { currency: 'MXN', total_value: 315000, count: 35 },
      ],
      daily_value_sell_bank_transfer: [{ currency: 'USD', total_value: 5200, count: 8 }],
      daily_value_sell_cash_option: [{ currency: 'MXN', total_value: 42000, count: 5 }],
    },
    {
      date: '2024-11-02',
      seller_conversations: 165,
      sell_started_count: 140,
      sell_get_quote_count: 115,
      sell_booking_created_count: 92,
      sell_success_count: 78,
      sell_bank_transfer_count: 6,
      sell_cash_option_count: 7,
      daily_value_sell_success: [
        { currency: 'USD', total_value: 22000, count: 46 },
        { currency: 'MXN', total_value: 286000, count: 32 },
      ],
      daily_value_sell_bank_transfer: [{ currency: 'USD', total_value: 4300, count: 6 }],
      daily_value_sell_cash_option: [{ currency: 'MXN', total_value: 51000, count: 7 }],
    },
    {
      date: '2024-11-03',
      seller_conversations: 195,
      sell_started_count: 165,
      sell_get_quote_count: 140,
      sell_booking_created_count: 112,
      sell_success_count: 96,
      sell_bank_transfer_count: 9,
      sell_cash_option_count: 4,
      daily_value_sell_success: [
        { currency: 'USD', total_value: 29500, count: 58 },
        { currency: 'MXN', total_value: 342000, count: 38 },
      ],
      daily_value_sell_bank_transfer: [{ currency: 'USD', total_value: 6800, count: 9 }],
      daily_value_sell_cash_option: [{ currency: 'MXN', total_value: 36000, count: 4 }],
    },
  ],
}

const mockFailedData = {
  total_sell_failed: 400,
  failed_by_reason_by_day: [
    {
      date: '2024-11-01',
      reasons: [
        { reason: 'payment_processing', failed_count: 8 },
        { reason: 'seat_selection', failed_count: 5 },
        { reason: 'timeout', failed_count: 2 },
      ],
    },
    {
      date: '2024-11-02',
      reasons: [
        { reason: 'payment_processing', failed_count: 6 },
        { reason: 'booking_validation', failed_count: 4 },
        { reason: 'system_error', failed_count: 4 },
      ],
    },
    {
      date: '2024-11-03',
      reasons: [
        { reason: 'payment_processing', failed_count: 10 },
        { reason: 'flight_availability', failed_count: 4 },
        { reason: 'passenger_data', failed_count: 2 },
      ],
    },
  ],
}

const mockSalesByChannelData = {
  airline_name: 'AeroLineas Plus',
  start_date: '2025-07-01',
  end_date: '2025-07-10',
  total_sell_success: 142,
  total_by_currency: [
    { currency: 'USD', total_value: 48350.00, count: 85 },
    { currency: 'MXN', total_value: 312500.00, count: 57 },
  ],
  sales_by_channel_by_day: [
    { date: '2025-07-01', channels: { whatsapp: 8, sms: 3, voice: 2 } },
    { date: '2025-07-02', channels: { whatsapp: 10, sms: 4, voice: 1 } },
    { date: '2025-07-03', channels: { whatsapp: 12, sms: 5, voice: 3 } },
    { date: '2025-07-04', channels: { whatsapp: 9, sms: 3, voice: 2 } },
    { date: '2025-07-05', channels: { whatsapp: 15, sms: 6, voice: 4 } },
    { date: '2025-07-06', channels: { whatsapp: 11, sms: 4, voice: 2 } },
    { date: '2025-07-07', channels: { whatsapp: 13, sms: 5, voice: 3 } },
    { date: '2025-07-08', channels: { whatsapp: 7, sms: 2, voice: 1 } },
    { date: '2025-07-09', channels: { whatsapp: 6, sms: 1, voice: 0 } },
    { date: '2025-07-10', channels: { whatsapp: 4, sms: 1, voice: 1 } },
  ],
}

const mockChannelComparison = [
  { channel: 'sms', current: 34, previous: 28, delta: 21.4 },
  { channel: 'voice', current: 19, previous: 22, delta: -13.6 },
  { channel: 'whatsapp', current: 95, previous: 78, delta: 21.8 },
]

const meta = {
  title: 'Charts/BusinessMetrics/SellerContainer',
  component: SellerContainer,
  tags: ['autodocs'],
  argTypes: {
    containerInitiallyOpen: {
      control: 'boolean',
      description: 'Contenedor principal “Seller” abierto o cerrado al montar',
    },
    childrenInitiallyOpen: {
      control: 'boolean',
      description: 'Bloque Seller interno abierto o cerrado al montar',
    },
    loading: {
      control: 'boolean',
      description: 'Loading en todos los bloques',
    },
    sellerLoading: { control: 'boolean' },
    salesByChannelLoading: { control: 'boolean' },
    enableExport: { control: 'boolean' },
    exportLoading: { control: 'boolean' },
    onExport: {
      action: 'export',
      description: 'Payload { source, format }',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Agrupa Seller y Sales by Channel bajo un único colapsable “Seller”. El evento export identifica si la acción viene del funnel o del desglose por canal.',
      },
    },
  },
} satisfies Meta<typeof SellerContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    containerInitiallyOpen: false,
    childrenInitiallyOpen: true,
    loading: false,
    sellerLoading: false,
    salesByChannelLoading: false,
    enableExport: true,
    exportLoading: false,
    sellerData: mockSellerData,
    failedData: mockFailedData,
    salesByChannelData: mockSalesByChannelData,
    channelComparison: mockChannelComparison,
  },
}

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
}

export const CollapsedOuter: Story = {
  args: {
    ...Default.args,
    containerInitiallyOpen: false,
  },
}
