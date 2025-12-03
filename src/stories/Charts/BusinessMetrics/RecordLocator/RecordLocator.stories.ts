import type { Meta, StoryObj } from '@storybook/vue3';
import RecordLocator from './RecordLocator.vue';

const meta = {
  title: 'Charts/BusinessMetrics/RecordLocator',
  component: RecordLocator,
  tags: ['autodocs'],
  argTypes: {
    dates: {
      control: 'object',
      description: 'Array with start and end dates [startDate, endDate]'
    },
    airline_name: {
      control: 'text',
      description: 'Airline name to filter the metrics. Use "avianca" to show payment columns.'
    }
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

// Fechas de ejemplo
const today = new Date();
const thirtyDaysAgo = new Date(today);
thirtyDaysAgo.setDate(today.getDate() - 30);

/**
 * Vista por defecto con métricas de record locator para un rango de fechas
 */
export const Default: Story = {
  args: {
    dates: [thirtyDaysAgo, today],
    airline_name: 'example_airline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el componente completo con el flujo Sankey y tabla de métricas de record locator para los últimos 30 días.'
      }
    }
  }
};

/**
 * Vista para Avianca con columnas de pago
 */
export const Avianca: Story = {
  args: {
    dates: [thirtyDaysAgo, today],
    airline_name: 'avianca',
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
 * Vista con rango de fechas de 7 días
 */
export const LastWeek: Story = {
  args: {
    dates: [
      new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
      today
    ],
    airline_name: 'example_airline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Métricas de record locator para la última semana.'
      }
    }
  }
};

/**
 * Vista con rango de fechas de 90 días
 */
export const LastQuarter: Story = {
  args: {
    dates: [
      new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000),
      today
    ],
    airline_name: 'example_airline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Métricas de record locator para los últimos 90 días (trimestre).'
      }
    }
  }
};

