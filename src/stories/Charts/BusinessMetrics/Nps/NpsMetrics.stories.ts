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
  p95_score: 10,
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
  csat_p95_by_day: [
    {
      date: '2024-11-01',
      p95_score: 10,
    },
    {
      date: '2024-11-02',
      p95_score: 10,
    },
    {
      date: '2024-11-03',
      p95_score: 10,
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
        component: 'Dashboard component for CSAT analytics. Displays histogram distribution and daily P95 trend.'
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
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el dashboard de CSAT con histograma y tendencia diaria de P95.'
      }
    }
  }
};

/**
 * Estado de carga
 */
export const Loading: Story = {
  args: {
    data: {},
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
      p95_score: 0,
      average_score: 0,
      histogram: [],
      csat_p95_by_day: [],
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
      csat_p95_by_day: [
        ...mockNpsData.csat_p95_by_day,
        {
          date: '2024-11-04',
          p95_score: 10,
        },
        {
          date: '2024-11-05',
          p95_score: 10,
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

