import type { Meta, StoryObj } from '@storybook/vue3';
import Seller from './Seller.vue';

// Data de ejemplo para las stories
const mockSellerData = {
  total_seller_conversations: 5000,
  total_sell_started: 4200,
  total_sell_get_quote: 3500,
  total_sell_booking_created: 2800,
  total_sell_success: 2400,
  total_value_sell_success: 1250000,
  seller_by_day: [
    {
      date: '2024-11-01',
      seller_conversations: 180,
      sell_started_count: 150,
      sell_get_quote_count: 125,
      sell_booking_created_count: 100,
      sell_success_count: 85,
      daily_value_sell_success: 42500,
    },
    {
      date: '2024-11-02',
      seller_conversations: 165,
      sell_started_count: 140,
      sell_get_quote_count: 115,
      sell_booking_created_count: 92,
      sell_success_count: 78,
      daily_value_sell_success: 39000,
    },
    {
      date: '2024-11-03',
      seller_conversations: 195,
      sell_started_count: 165,
      sell_get_quote_count: 140,
      sell_booking_created_count: 112,
      sell_success_count: 96,
      daily_value_sell_success: 48000,
    },
  ],
};

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
};

const meta = {
  title: 'Charts/BusinessMetrics/Seller',
  component: Seller,
  tags: ['autodocs'],
  argTypes: {
    sellerData: {
      control: 'object',
      description: 'Seller metrics data object'
    },
    failedData: {
      control: 'object',
      description: 'Failed sales data with reasons by day'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state indicator'
    },
    enableExport: {
      control: 'boolean',
      description: 'Habilita o deshabilita el footer de exportación',
    },
    onExport: {
      action: 'export',
      description: 'Evento emitido cuando se hace clic en un botón de exportación (pdf, csv, xlsx)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Component to display seller metrics including a Sankey flow chart showing sales funnel, total sales value badge, and detailed table with daily performance data and failure reasons.'
      }
    }
  }
} satisfies Meta<typeof Seller>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vista por defecto con métricas de ventas
 */
export const Default: Story = {
  args: {
    sellerData: mockSellerData,
    failedData: mockFailedData,
    loading: false,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el componente completo con el flujo Sankey, badge de ventas totales y tabla de métricas de ventas.'
      }
    }
  }
};

/**
 * Estado de carga
 */
export const Loading: Story = {
  args: {
    sellerData: mockSellerData,
    failedData: mockFailedData,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente en estado de carga mostrando la animación de loading.'
      }
    }
  }
};

/**
 * Sin datos disponibles
 */
export const EmptyData: Story = {
  args: {
    sellerData: {
      total_seller_conversations: 0,
      total_sell_started: 0,
      total_sell_get_quote: 0,
      total_sell_booking_created: 0,
      total_sell_success: 0,
      total_value_sell_success: 0,
      seller_by_day: [],
    },
    failedData: {
      total_sell_failed: 0,
      failed_by_reason_by_day: [],
    },
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente mostrando el estado vacío cuando no hay datos disponibles.'
      }
    }
  }
};

/**
 * Solo datos de ventas sin fallos
 */
export const WithoutFailures: Story = {
  args: {
    sellerData: mockSellerData,
    failedData: {
      total_sell_failed: 0,
      failed_by_reason_by_day: [],
    },
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Métricas de ventas sin datos de fallos.'
      }
    }
  }
};

/**
 * Con más días de datos
 */
export const WithMoreDays: Story = {
  args: {
    sellerData: {
      ...mockSellerData,
      seller_by_day: [
        ...mockSellerData.seller_by_day,
        {
          date: '2024-11-04',
          seller_conversations: 210,
          sell_started_count: 180,
          sell_get_quote_count: 150,
          sell_booking_created_count: 120,
          sell_success_count: 105,
          daily_value_sell_success: 52500,
        },
        {
          date: '2024-11-05',
          seller_conversations: 175,
          sell_started_count: 148,
          sell_get_quote_count: 122,
          sell_booking_created_count: 98,
          sell_success_count: 82,
          daily_value_sell_success: 41000,
        },
      ],
    },
    failedData: {
      ...mockFailedData,
      failed_by_reason_by_day: [
        ...mockFailedData.failed_by_reason_by_day,
        {
          date: '2024-11-04',
          reasons: [
            { reason: 'payment_processing', failed_count: 9 },
            { reason: 'rejected', failed_count: 6 },
          ],
        },
        {
          date: '2024-11-05',
          reasons: [
            { reason: 'payment_processing', failed_count: 7 },
            { reason: 'timeout', failed_count: 5 },
            { reason: 'system_error', failed_count: 4 },
          ],
        },
      ],
    },
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente con más días de datos para mostrar la tabla extendida.'
      }
    }
  }
};

