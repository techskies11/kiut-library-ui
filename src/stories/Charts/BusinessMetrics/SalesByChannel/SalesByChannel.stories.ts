import type { Meta, StoryObj } from '@storybook/vue3';
import SalesByChannel from './SalesByChannel.vue';

const mockData = {
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
};

const mockSingleCurrency = {
  airline_name: 'Quick Air',
  start_date: '2025-08-01',
  end_date: '2025-08-05',
  total_sell_success: 45,
  total_by_currency: [
    { currency: 'USD', total_value: 15200.00, count: 45 },
  ],
  sales_by_channel_by_day: [
    { date: '2025-08-01', channels: { whatsapp: 6, web_chat: 3 } },
    { date: '2025-08-02', channels: { whatsapp: 8, web_chat: 4 } },
    { date: '2025-08-03', channels: { whatsapp: 7, web_chat: 2 } },
    { date: '2025-08-04', channels: { whatsapp: 5, web_chat: 5 } },
    { date: '2025-08-05', channels: { whatsapp: 3, web_chat: 2 } },
  ],
};

const mockHighVolume = {
  airline_name: 'MegaAir International',
  start_date: '2025-07-01',
  end_date: '2025-07-07',
  total_sell_success: 1245,
  total_by_currency: [
    { currency: 'USD', total_value: 325000.00, count: 620 },
    { currency: 'EUR', total_value: 180000.00, count: 310 },
    { currency: 'MXN', total_value: 1250000.00, count: 315 },
  ],
  sales_by_channel_by_day: [
    { date: '2025-07-01', channels: { whatsapp: 85, sms: 25, voice: 18, web_chat: 32, email: 12 } },
    { date: '2025-07-02', channels: { whatsapp: 92, sms: 28, voice: 22, web_chat: 35, email: 15 } },
    { date: '2025-07-03', channels: { whatsapp: 78, sms: 22, voice: 15, web_chat: 28, email: 10 } },
    { date: '2025-07-04', channels: { whatsapp: 105, sms: 32, voice: 25, web_chat: 40, email: 18 } },
    { date: '2025-07-05', channels: { whatsapp: 98, sms: 30, voice: 20, web_chat: 38, email: 14 } },
    { date: '2025-07-06', channels: { whatsapp: 88, sms: 26, voice: 19, web_chat: 34, email: 13 } },
    { date: '2025-07-07', channels: { whatsapp: 95, sms: 29, voice: 21, web_chat: 36, email: 16 } },
  ],
};

const meta = {
  title: 'Charts/BusinessMetrics/SalesByChannel',
  component: SalesByChannel,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Loading state of the component',
    },
    data: {
      control: 'object',
      description: 'Sales by channel metrics data',
    },
    channelComparison: {
      control: 'object',
      description: 'Per-channel comparison with previous period (current, previous, delta %)',
    },
    enableExport: {
      control: 'boolean',
      description: 'Show export footer buttons',
    },
    onExport: {
      action: 'export',
      description: 'Emitted when an export button is clicked (pdf | csv | xlsx)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Stacked bar chart showing successful sales broken down by communication channel (WhatsApp, SMS, Voice, etc.) per day, with total currency breakdown.',
      },
    },
  },
} satisfies Meta<typeof SalesByChannel>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockComparison = [
  { channel: 'sms', current: 34, previous: 28, delta: 21.4 },
  { channel: 'voice', current: 19, previous: 22, delta: -13.6 },
  { channel: 'whatsapp', current: 95, previous: 78, delta: 21.8 },
];

const mockComparisonHighVolume = [
  { channel: 'email', current: 98, previous: 85, delta: 15.3 },
  { channel: 'sms', current: 192, previous: 210, delta: -8.6 },
  { channel: 'voice', current: 141, previous: 141, delta: 0 },
  { channel: 'web_chat', current: 243, previous: 195, delta: 24.6 },
  { channel: 'whatsapp', current: 641, previous: 520, delta: 23.3 },
];

export const Default: Story = {
  args: {
    loading: false,
    data: mockData,
    channelComparison: mockComparison,
    enableExport: true,
  },
};

export const SingleCurrency: Story = {
  args: {
    loading: false,
    data: mockSingleCurrency,
    channelComparison: [
      { channel: 'web_chat', current: 16, previous: 12, delta: 33.3 },
      { channel: 'whatsapp', current: 29, previous: 35, delta: -17.1 },
    ],
    enableExport: true,
  },
};

export const HighVolume: Story = {
  args: {
    loading: false,
    data: mockHighVolume,
    channelComparison: mockComparisonHighVolume,
    enableExport: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    data: undefined,
  },
};

export const EmptyState: Story = {
  args: {
    loading: false,
    data: {
      total_sell_success: 0,
      total_by_currency: [],
      sales_by_channel_by_day: [],
    },
  },
};
