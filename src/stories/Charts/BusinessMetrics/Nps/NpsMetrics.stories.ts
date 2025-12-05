import type { Meta, StoryObj } from '@storybook/vue3';
import NpsMetrics from './npsMetrics.vue';

// Data de ejemplo para las stories
const mockNpsData = {
  total_nps_responses: 1250,
  min_score: 1,
  max_score: 10,
  q1_score: 6,
  median_score: 8,
  q3_score: 9,
  average_score: 7.5,
  histogram: [
    { score: 1, count: 25 },
    { score: 2, count: 18 },
    { score: 3, count: 32 },
    { score: 4, count: 45 },
    { score: 5, count: 78 },
    { score: 6, count: 125 },
    { score: 7, count: 198 },
    { score: 8, count: 285 },
    { score: 9, count: 312 },
    { score: 10, count: 132 },
  ],
  nps_by_day: [
    {
      date: '2024-11-01',
      nps_responses_count: 45,
      min_score: 2,
      max_score: 10,
      q1_score: 6,
      median_score: 8,
      q3_score: 9,
      average_score: 7.6,
    },
    {
      date: '2024-11-02',
      nps_responses_count: 52,
      min_score: 1,
      max_score: 10,
      q1_score: 5,
      median_score: 7,
      q3_score: 9,
      average_score: 7.2,
    },
    {
      date: '2024-11-03',
      nps_responses_count: 48,
      min_score: 3,
      max_score: 10,
      q1_score: 6,
      median_score: 8,
      q3_score: 9,
      average_score: 7.8,
    },
  ],
};

const meta = {
  title: 'Charts/BusinessMetrics/NpsMetrics',
  component: NpsMetrics,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'NPS metrics data object'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state indicator'
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

/**
 * Vista por defecto con métricas NPS
 */
export const Default: Story = {
  args: {
    data: mockNpsData,
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el dashboard completo de NPS con el histograma de distribución y el gráfico de velas diario.'
      }
    }
  }
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
        story: 'Dashboard NPS en estado de carga.'
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
      total_nps_responses: 0,
      min_score: 0,
      max_score: 0,
      q1_score: 0,
      median_score: 0,
      q3_score: 0,
      average_score: 0,
      histogram: [],
      nps_by_day: [],
    },
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard NPS mostrando el estado vacío cuando no hay datos disponibles.'
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
      ...mockNpsData,
      nps_by_day: [
        ...mockNpsData.nps_by_day,
        {
          date: '2024-11-04',
          nps_responses_count: 55,
          min_score: 2,
          max_score: 10,
          q1_score: 6,
          median_score: 8,
          q3_score: 9,
          average_score: 7.9,
        },
        {
          date: '2024-11-05',
          nps_responses_count: 42,
          min_score: 1,
          max_score: 10,
          q1_score: 5,
          median_score: 7,
          q3_score: 9,
          average_score: 7.1,
        },
      ],
    },
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard NPS con más días de datos para mostrar tendencias extendidas.'
      }
    }
  }
};

