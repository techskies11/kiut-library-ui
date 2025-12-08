import type { Meta, StoryObj } from '@storybook/vue3';
import RecordLocator from './RecordLocator.vue';

// Data de ejemplo para las stories
const mockRecordLocatorData = {
  total_checkin_initiated: 10000,
  total_record_locator_init: 8500,
  total_record_locator_started: 7200,
  total_record_locator_completed: 6500,
  total_record_locator_closed: 6000,
  total_record_locator_failed: 400,
  total_record_locator_abandoned: 800,
  total_record_locator_init_abandoned: 1300,
  record_locator_by_day: [
    {
      date: '2024-11-01',
      checkin_initiated: 350,
      record_locator_init_count: 300,
      record_locator_started_count: 250,
      record_locator_completed_count: 230,
      record_locator_closed_count: 210,
      record_locator_failed_count: 15,
      record_locator_abandoned_count: 25,
      record_locator_create_payment_count: 180,
      record_locator_create_payment_failed_count: 12,
    },
    {
      date: '2024-11-02',
      checkin_initiated: 320,
      record_locator_init_count: 280,
      record_locator_started_count: 240,
      record_locator_completed_count: 220,
      record_locator_closed_count: 200,
      record_locator_failed_count: 12,
      record_locator_abandoned_count: 28,
      record_locator_create_payment_count: 165,
      record_locator_create_payment_failed_count: 10,
    },
    {
      date: '2024-11-03',
      checkin_initiated: 380,
      record_locator_init_count: 330,
      record_locator_started_count: 280,
      record_locator_completed_count: 260,
      record_locator_closed_count: 240,
      record_locator_failed_count: 18,
      record_locator_abandoned_count: 22,
      record_locator_create_payment_count: 200,
      record_locator_create_payment_failed_count: 15,
    },
  ],
};

const meta = {
  title: 'Charts/BusinessMetrics/RecordLocator',
  component: RecordLocator,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Record locator metrics data object'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state indicator'
    },
    isAvianca: {
      control: 'boolean',
      description: 'Show Avianca-specific payment columns'
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
        component: 'Component to display check-in by record locator metrics including a Sankey flow chart and detailed table with completion rates and abandonment analysis.'
      }
    }
  }
} satisfies Meta<typeof RecordLocator>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vista por defecto con métricas de record locator
 */
export const Default: Story = {
  args: {
    data: mockRecordLocatorData,
    loading: false,
    isAvianca: false,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el componente completo con el flujo Sankey y tabla de métricas de record locator.'
      }
    }
  }
};

/**
 * Estado de carga
 */
export const Loading: Story = {
  args: {
    data: mockRecordLocatorData,
    loading: true,
    isAvianca: false,
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
 * Vista para Avianca con columnas de pago
 */
export const Avianca: Story = {
  args: {
    data: mockRecordLocatorData,
    loading: false,
    isAvianca: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Métricas de record locator para Avianca, incluyendo columnas adicionales de Create Payment y Failed Payment.'
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
      total_checkin_initiated: 0,
      total_record_locator_init: 0,
      total_record_locator_started: 0,
      total_record_locator_completed: 0,
      total_record_locator_closed: 0,
      total_record_locator_failed: 0,
      total_record_locator_abandoned: 0,
      total_record_locator_init_abandoned: 0,
      record_locator_by_day: [],
    },
    loading: false,
    isAvianca: false,
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
 * Con más días de datos
 */
export const WithMoreDays: Story = {
  args: {
    data: {
      ...mockRecordLocatorData,
      record_locator_by_day: [
        ...mockRecordLocatorData.record_locator_by_day,
        {
          date: '2024-11-04',
          checkin_initiated: 400,
          record_locator_init_count: 350,
          record_locator_started_count: 300,
          record_locator_completed_count: 280,
          record_locator_closed_count: 260,
          record_locator_failed_count: 20,
          record_locator_abandoned_count: 20,
          record_locator_create_payment_count: 220,
          record_locator_create_payment_failed_count: 18,
        },
        {
          date: '2024-11-05',
          checkin_initiated: 360,
          record_locator_init_count: 310,
          record_locator_started_count: 265,
          record_locator_completed_count: 245,
          record_locator_closed_count: 225,
          record_locator_failed_count: 16,
          record_locator_abandoned_count: 24,
          record_locator_create_payment_count: 190,
          record_locator_create_payment_failed_count: 14,
        },
      ],
    },
    loading: false,
    isAvianca: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente con más días de datos para mostrar la tabla extendida.'
      }
    }
  }
};

