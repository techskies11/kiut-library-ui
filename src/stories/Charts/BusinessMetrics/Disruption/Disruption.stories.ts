import type { Meta, StoryObj } from '@storybook/vue3';
import Disruption from './Disruption.vue';

// Data de ejemplo para las stories
const mockDisruptionData = {
  total_disruption_conversations: 5000,
  total_disruption_initiated: 4200,
  total_voluntary: 2800,
  total_involuntary: 1100,
  total_accepted: 850,
  total_confirmed: 2400,
  total_sell_success: 1800,
  total_sell_failed: 200,
  total_finished: 1800,
  total_payment_success: 1800,
  disruption_by_day: [
    {
      date: '2024-11-01',
      disruption_conversations: 180,
      disruption_initiated_count: 150,
      voluntary_count: 100,
      involuntary_count: 40,
      accepted_count: 30,
      confirmed_count: 85,
      sell_success_count: 65,
      sell_failed_count: 8,
    },
    {
      date: '2024-11-02',
      disruption_conversations: 165,
      disruption_initiated_count: 140,
      voluntary_count: 95,
      involuntary_count: 35,
      accepted_count: 28,
      confirmed_count: 80,
      sell_success_count: 60,
      sell_failed_count: 6,
    },
    {
      date: '2024-11-03',
      disruption_conversations: 195,
      disruption_initiated_count: 165,
      voluntary_count: 110,
      involuntary_count: 45,
      accepted_count: 35,
      confirmed_count: 95,
      sell_success_count: 72,
      sell_failed_count: 10,
    },
  ],
};

const meta = {
  title: 'Charts/BusinessMetrics/Disruption',
  component: Disruption,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Disruption metrics data object'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state indicator'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Component to display disruption metrics including a Sankey flow chart showing voluntary/involuntary workflows, payment success badge, and detailed daily overview table with badges for each flow stage.'
      }
    }
  }
} satisfies Meta<typeof Disruption>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vista por defecto con métricas de disruption
 */
export const Default: Story = {
  args: {
    data: mockDisruptionData,
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el componente completo con el flujo Sankey, badge de pagos exitosos y tabla de métricas diarias con badges de voluntary/involuntary.'
      }
    }
  }
};

/**
 * Estado de carga
 */
export const Loading: Story = {
  args: {
    data: mockDisruptionData,
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
    data: {
      total_disruption_conversations: 0,
      total_disruption_initiated: 0,
      total_voluntary: 0,
      total_involuntary: 0,
      total_accepted: 0,
      total_confirmed: 0,
      total_sell_success: 0,
      total_sell_failed: 0,
      total_finished: 0,
      total_payment_success: 0,
      disruption_by_day: [],
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
 * Con más días de datos
 */
export const WithMoreDays: Story = {
  args: {
    data: {
      ...mockDisruptionData,
      disruption_by_day: [
        ...mockDisruptionData.disruption_by_day,
        {
          date: '2024-11-04',
          disruption_conversations: 210,
          disruption_initiated_count: 180,
          voluntary_count: 120,
          involuntary_count: 50,
          accepted_count: 40,
          confirmed_count: 100,
          sell_success_count: 78,
          sell_failed_count: 9,
        },
        {
          date: '2024-11-05',
          disruption_conversations: 175,
          disruption_initiated_count: 148,
          voluntary_count: 98,
          involuntary_count: 38,
          accepted_count: 30,
          confirmed_count: 82,
          sell_success_count: 62,
          sell_failed_count: 7,
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
