import type { Meta, StoryObj } from '@storybook/vue3';
import BookingManager from './BookingManager.vue';

// Data de ejemplo para las stories
const mockBookingData = {
  total_booking_initiated: 15000,
  total_booking_started: 12500,
  total_payment_initiated: 8000,
  total_not_found: 500,
  total_cancelled: 800,
  total_no_pending_balance: 300,
  total_errors: 200,
  total_payment_success: 6500,
  total_payment_failed: 1500,
  booking_manager_by_day: [
    {
      date: '2024-11-01',
      booking_initiated_count: 500,
      booking_started_count: 420,
      payment_initiated_count: 280,
      not_found_count: 15,
      cancelled_count: 25,
      no_pending_balance_count: 10,
      error_count: 5,
      payment_success_count: 230,
      payment_failed_count: 50,
    },
    {
      date: '2024-11-02',
      booking_initiated_count: 480,
      booking_started_count: 400,
      payment_initiated_count: 260,
      not_found_count: 18,
      cancelled_count: 28,
      no_pending_balance_count: 12,
      error_count: 8,
      payment_success_count: 210,
      payment_failed_count: 50,
    },
    {
      date: '2024-11-03',
      booking_initiated_count: 520,
      booking_started_count: 440,
      payment_initiated_count: 300,
      not_found_count: 12,
      cancelled_count: 22,
      no_pending_balance_count: 8,
      error_count: 6,
      payment_success_count: 250,
      payment_failed_count: 50,
    },
  ],
};

const meta = {
  title: 'Charts/BusinessMetrics/BookingManager',
  component: BookingManager,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Booking manager metrics data object'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state indicator'
    },
    error: {
      control: 'text',
      description: 'Error message to display'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Component to display booking manager metrics including a Sankey flow chart showing booking workflow, payment success badge, and detailed daily overview table with payment results and outcomes.'
      }
    }
  }
} satisfies Meta<typeof BookingManager>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vista por defecto con métricas de booking manager
 */
export const Default: Story = {
  args: {
    data: mockBookingData,
    loading: false,
    error: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el componente completo con el flujo Sankey, badge de pagos exitosos y tabla de métricas diarias.'
      }
    }
  }
};

/**
 * Estado de carga
 */
export const Loading: Story = {
  args: {
    data: mockBookingData,
    loading: true,
    error: null,
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
 * Estado de error
 */
export const Error: Story = {
  args: {
    data: mockBookingData,
    loading: false,
    error: 'Failed to load booking manager metrics. Please try again.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente mostrando un mensaje de error.'
      }
    }
  }
};

/**
 * Sin datos disponibles
 */
export const EmptyData: Story = {
  args: {
    data: {
      total_booking_initiated: 0,
      total_booking_started: 0,
      total_payment_initiated: 0,
      total_not_found: 0,
      total_cancelled: 0,
      total_no_pending_balance: 0,
      total_errors: 0,
      total_payment_success: 0,
      total_payment_failed: 0,
      booking_manager_by_day: [],
    },
    loading: false,
    error: null,
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
 * Con muchos datos diarios
 */
export const WithMoreDays: Story = {
  args: {
    data: {
      ...mockBookingData,
      booking_manager_by_day: [
        ...mockBookingData.booking_manager_by_day,
        {
          date: '2024-11-04',
          booking_initiated_count: 550,
          booking_started_count: 460,
          payment_initiated_count: 320,
          not_found_count: 10,
          cancelled_count: 20,
          no_pending_balance_count: 6,
          error_count: 4,
          payment_success_count: 270,
          payment_failed_count: 50,
        },
        {
          date: '2024-11-05',
          booking_initiated_count: 490,
          booking_started_count: 410,
          payment_initiated_count: 270,
          not_found_count: 16,
          cancelled_count: 26,
          no_pending_balance_count: 11,
          error_count: 7,
          payment_success_count: 220,
          payment_failed_count: 50,
        },
      ],
    },
    loading: false,
    error: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente con más días de datos para mostrar la tabla extendida.'
      }
    }
  }
};

