import type { Meta, StoryObj } from '@storybook/vue3';
import Seller from './Seller.vue';

const meta = {
  title: 'Charts/BusinessMetrics/Seller',
  component: Seller,
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
        component: 'Component to display seller metrics including a Sankey flow chart showing sales funnel, total sales value badge, and detailed table with daily performance data and failure reasons.'
      }
    }
  }
} satisfies Meta<typeof Seller>;

export default meta;
type Story = StoryObj<typeof meta>;

// Fechas de ejemplo
const today = new Date();
const thirtyDaysAgo = new Date(today);
thirtyDaysAgo.setDate(today.getDate() - 30);

/**
 * Vista por defecto con métricas de ventas para un rango de fechas
 */
export const Default: Story = {
  args: {
    dates: [thirtyDaysAgo, today],
    airline_name: 'example_airline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el componente completo con el flujo Sankey, badge de ventas totales y tabla de métricas de ventas para los últimos 30 días.'
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
        story: 'Métricas de ventas para la última semana.'
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
        story: 'Métricas de ventas para los últimos 90 días (trimestre).'
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
        story: 'Componente mostrando métricas de ventas para una aerolínea diferente.'
      }
    }
  }
};

