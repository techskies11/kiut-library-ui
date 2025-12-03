import type { Meta, StoryObj } from '@storybook/vue3';
import FAQ from './FAQ.vue';

const meta = {
  title: 'Charts/BusinessMetrics/FAQ',
  component: FAQ,
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
        component: 'Component to display FAQ metrics including KPI cards and a line chart showing daily consultation trends for airline information, flight status, and booking information.'
      }
    }
  }
} satisfies Meta<typeof FAQ>;

export default meta;
type Story = StoryObj<typeof meta>;

// Fechas de ejemplo
const today = new Date();
const thirtyDaysAgo = new Date(today);
thirtyDaysAgo.setDate(today.getDate() - 30);

/**
 * Vista por defecto con métricas de FAQ para un rango de fechas
 */
export const Default: Story = {
  args: {
    dates: [thirtyDaysAgo, today],
    airline_name: 'example_airline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el componente completo con los KPIs y el gráfico de líneas de métricas de FAQ para los últimos 30 días.'
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
        story: 'Métricas de FAQ para la última semana.'
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
        story: 'Métricas de FAQ para los últimos 90 días (trimestre).'
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
        story: 'Componente mostrando métricas de FAQ para una aerolínea diferente.'
      }
    }
  }
};

