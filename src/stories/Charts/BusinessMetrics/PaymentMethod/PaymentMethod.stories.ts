import type { Meta, StoryObj } from '@storybook/vue3';
import PaymentMethod from './PaymentMethod.vue';

// Data de ejemplo para las stories - Un solo método de pago
const mockSinglePaymentData = {
  airline_name: 'Clic Air',
  start_date: '2025-12-01',
  end_date: '2025-12-15',
  total_conversations: 4,
  total_amount: 662950.0,
  payment_method_breakdown: [
    {
      payment_method: 'bank_transfer',
      count: 4,
      total_amount: 662950.0,
    },
  ],
  payment_method_by_day: [
    {
      date: '2025-12-12',
      total_count: 1,
      total_amount: 177300.0,
      payment_methods: [
        {
          payment_method: 'bank_transfer',
          count: 1,
          total_amount: 177300.0,
        },
      ],
    },
    {
      date: '2025-12-11',
      total_count: 1,
      total_amount: 177300.0,
      payment_methods: [
        {
          payment_method: 'bank_transfer',
          count: 1,
          total_amount: 177300.0,
        },
      ],
    },
    {
      date: '2025-12-08',
      total_count: 1,
      total_amount: 131050.0,
      payment_methods: [
        {
          payment_method: 'bank_transfer',
          count: 1,
          total_amount: 131050.0,
        },
      ],
    },
    {
      date: '2025-12-03',
      total_count: 1,
      total_amount: 177300.0,
      payment_methods: [
        {
          payment_method: 'bank_transfer',
          count: 1,
          total_amount: 177300.0,
        },
      ],
    },
  ],
};

// Data con múltiples métodos de pago (como la imagen de referencia)
const mockMultiplePaymentData = {
  airline_name: 'Airline Demo',
  start_date: '2025-11-01',
  end_date: '2025-11-30',
  total_conversations: 34,
  total_amount: 47007.91,
  payment_method_breakdown: [
    {
      payment_method: 'bank_transfer',
      count: 4,
      total_amount: 658.09,
    },
    {
      payment_method: 'cash',
      count: 6,
      total_amount: 3711.73,
    },
    {
      payment_method: 'credit_card',
      count: 10,
      total_amount: 32165.44,
    },
    {
      payment_method: 'debit_card',
      count: 5,
      total_amount: 4508.28,
    },
    {
      payment_method: 'pagomovil',
      count: 6,
      total_amount: 3143.65,
    },
    {
      payment_method: 'zelle',
      count: 3,
      total_amount: 2820.72,
    },
  ],
  payment_method_by_day: [
    {
      date: '2025-11-12',
      total_count: 34,
      total_amount: 47007.91,
      payment_methods: [
        {
          payment_method: 'bank_transfer',
          count: 4,
          total_amount: 658.09,
        },
        {
          payment_method: 'cash',
          count: 6,
          total_amount: 3711.73,
        },
        {
          payment_method: 'credit_card',
          count: 10,
          total_amount: 32165.44,
        },
        {
          payment_method: 'debit_card',
          count: 5,
          total_amount: 4508.28,
        },
        {
          payment_method: 'pagomovil',
          count: 6,
          total_amount: 3143.65,
        },
        {
          payment_method: 'zelle',
          count: 3,
          total_amount: 2820.72,
        },
      ],
    },
  ],
};

const meta = {
  title: 'Charts/BusinessMetrics/PaymentMethod',
  component: PaymentMethod,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Payment method metrics data object',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state indicator',
    },
    enableExport: {
      control: 'boolean',
      description: 'Habilita o deshabilita el footer de exportación',
    },
    onExport: {
      action: 'export',
      description: 'Evento emitido cuando se hace clic en un botón de exportación (pdf, csv)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Component to display payment method metrics including a grid of payment method cards with totals and a detailed table with daily breakdown by payment method.',
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8f9fa' },
        { name: 'dark', value: '#1a1a1d' },
      ],
    },
  },
} satisfies Meta<typeof PaymentMethod>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vista por defecto con métricas de métodos de pago (un solo método)
 */
export const Default: Story = {
  args: {
    data: mockSinglePaymentData,
    loading: false,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Muestra el componente con un solo método de pago y el desglose diario correspondiente.',
      },
    },
  },
};

/**
 * Estado de carga
 */
export const Loading: Story = {
  args: {
    data: null,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente en estado de carga mostrando skeletons animados.',
      },
    },
  },
};

/**
 * Sin datos disponibles
 */
export const EmptyData: Story = {
  args: {
    data: {
      airline_name: 'Airline',
      start_date: '2025-12-01',
      end_date: '2025-12-15',
      total_conversations: 0,
      total_amount: 0,
      payment_method_breakdown: [],
      payment_method_by_day: [],
    },
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Componente mostrando el estado vacío cuando no hay datos disponibles.',
      },
    },
  },
};

/**
 * Con múltiples métodos de pago
 */
export const WithMultiplePaymentMethods: Story = {
  args: {
    data: mockMultiplePaymentData,
    loading: false,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Componente mostrando múltiples métodos de pago con sus respectivos totales y el desglose diario.',
      },
    },
  },
};

/**
 * Solo tarjetas de métodos de pago sin desglose diario
 */
export const WithoutDailyBreakdown: Story = {
  args: {
    data: {
      airline_name: 'Airline',
      start_date: '2025-12-01',
      end_date: '2025-12-15',
      total_conversations: 10,
      total_amount: 15000.0,
      payment_method_breakdown: [
        {
          payment_method: 'credit_card',
          count: 6,
          total_amount: 10000.0,
        },
        {
          payment_method: 'cash',
          count: 4,
          total_amount: 5000.0,
        },
      ],
      payment_method_by_day: [],
    },
    loading: false,
    enableExport: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Componente mostrando solo las tarjetas de métodos de pago sin tabla de desglose diario.',
      },
    },
  },
};

/**
 * Con más días de datos
 */
export const WithMoreDays: Story = {
  args: {
    data: {
      ...mockMultiplePaymentData,
      payment_method_by_day: [
        ...mockMultiplePaymentData.payment_method_by_day,
        {
          date: '2025-11-11',
          total_count: 25,
          total_amount: 35000.0,
          payment_methods: [
            { payment_method: 'credit_card', count: 8, total_amount: 20000.0 },
            { payment_method: 'cash', count: 5, total_amount: 5000.0 },
            { payment_method: 'debit_card', count: 7, total_amount: 7000.0 },
            { payment_method: 'zelle', count: 5, total_amount: 3000.0 },
          ],
        },
        {
          date: '2025-11-10',
          total_count: 18,
          total_amount: 22500.0,
          payment_methods: [
            { payment_method: 'credit_card', count: 5, total_amount: 12000.0 },
            { payment_method: 'bank_transfer', count: 3, total_amount: 4500.0 },
            { payment_method: 'pagomovil', count: 6, total_amount: 3500.0 },
            { payment_method: 'cash', count: 4, total_amount: 2500.0 },
          ],
        },
        {
          date: '2025-11-09',
          total_count: 12,
          total_amount: 15800.0,
          payment_methods: [
            { payment_method: 'credit_card', count: 4, total_amount: 8000.0 },
            { payment_method: 'debit_card', count: 3, total_amount: 4000.0 },
            { payment_method: 'zelle', count: 2, total_amount: 2000.0 },
            { payment_method: 'cash', count: 3, total_amount: 1800.0 },
          ],
        },
      ],
    },
    loading: false,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Componente con más días de datos para mostrar la tabla extendida.',
      },
    },
  },
};

