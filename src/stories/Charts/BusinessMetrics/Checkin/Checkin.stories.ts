import type { Meta, StoryObj } from '@storybook/vue3';
import Checkin from './Checkin.vue';

const meta = {
  title: 'Charts/BusinessMetrics/Checkin',
  component: Checkin,
  tags: ['autodocs'],
  argTypes: {
    dates: {
      control: 'object',
      description: 'Array with start and end dates [startDate, endDate]'
    },
    airline_name: {
      control: 'text',
      description: 'Airline name to filter the metrics'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Component to display check-in metrics including a Sankey flow chart and detailed table with performance indicators.'
      }
    }
  }
} satisfies Meta<typeof Checkin>;

export default meta;
type Story = StoryObj<typeof meta>;

// Fechas de ejemplo
const today = new Date();
const thirtyDaysAgo = new Date(today);
thirtyDaysAgo.setDate(today.getDate() - 30);

/**
 * Vista por defecto con métricas de check-in para un rango de fechas
 */
export const Default: Story = {
  args: {
    dates: [thirtyDaysAgo, today],
    airline_name: 'example_airline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el componente completo con el flujo Sankey y la tabla de métricas de check-in para los últimos 30 días.'
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
        story: 'Métricas de check-in para la última semana.'
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
        story: 'Métricas de check-in para los últimos 90 días (trimestre).'
      }
    }
  }
};

/**
 * Vista con aerolínea diferente
 */
export const DifferentAirline: Story = {
  args: {
    dates: [thirtyDaysAgo, today],
    airline_name: 'different_airline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente mostrando métricas para una aerolínea diferente.'
      }
    }
  }
};

