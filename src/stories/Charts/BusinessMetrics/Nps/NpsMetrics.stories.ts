import type { Meta, StoryObj } from '@storybook/vue3';
import NpsMetrics from './npsMetrics.vue';

const meta = {
  title: 'Charts/BusinessMetrics/NpsMetrics',
  component: NpsMetrics,
  tags: ['autodocs'],
  argTypes: {
    dates: {
      control: 'object',
      description: 'Array with start and end dates [startDate, endDate]'
    },
    airline_name: {
      control: 'text',
      description: 'Airline name to filter the NPS metrics'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Dashboard component for NPS (Net Promoter Score) analytics. Displays an overview histogram with score distribution and a daily candlestick chart showing NPS trends over time.'
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8f9fa' },
        { name: 'dark', value: '#1a1a1d' },
      ],
    },
  }
} satisfies Meta<typeof NpsMetrics>;

export default meta;
type Story = StoryObj<typeof meta>;

// Fechas de ejemplo
const today = new Date();
const thirtyDaysAgo = new Date(today);
thirtyDaysAgo.setDate(today.getDate() - 30);

/**
 * Vista por defecto con métricas NPS para un rango de 30 días
 */
export const Default: Story = {
  args: {
    dates: [thirtyDaysAgo, today],
    airline_name: 'example_airline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el dashboard completo de NPS con el histograma de distribución y el gráfico de velas diario para los últimos 30 días.'
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
        story: 'Métricas NPS para la última semana. Ideal para análisis de tendencias a corto plazo.'
      }
    }
  }
};

/**
 * Vista con rango de fechas de 14 días
 */
export const LastTwoWeeks: Story = {
  args: {
    dates: [
      new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000),
      today
    ],
    airline_name: 'example_airline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Métricas NPS para las últimas dos semanas.'
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
        story: 'Métricas NPS para los últimos 90 días (trimestre). Útil para identificar tendencias a largo plazo.'
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
        story: 'Dashboard NPS mostrando métricas para una aerolínea diferente.'
      }
    }
  }
};

