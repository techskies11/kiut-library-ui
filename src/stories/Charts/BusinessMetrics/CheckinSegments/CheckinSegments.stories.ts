import type { Meta, StoryObj } from '@storybook/vue3';
import CheckinSegments from './checkinSegments.vue';

// Data de ejemplo para las stories
const mockSegmentsData = [
  {
    departure_airport: 'MEX',
    conexion_airport: 'None',
    arrival_airport: 'CUN',
    segment_init_count: 1500,
    segment_started_count: 1350,
    segment_completed_count: 1200,
    segment_closed_count: 1150,
  },
  {
    departure_airport: 'GDL',
    conexion_airport: 'MEX',
    arrival_airport: 'MIA',
    segment_init_count: 800,
    segment_started_count: 720,
    segment_completed_count: 650,
    segment_closed_count: 600,
  },
  {
    departure_airport: 'CUN',
    conexion_airport: 'None',
    arrival_airport: 'CUN',
    segment_init_count: 500,
    segment_started_count: 480,
    segment_completed_count: 450,
    segment_closed_count: 440,
  },
  {
    departure_airport: 'TIJ',
    conexion_airport: 'None',
    arrival_airport: 'MEX',
    segment_init_count: 650,
    segment_started_count: 590,
    segment_completed_count: 520,
    segment_closed_count: 500,
  },
  {
    departure_airport: 'MTY',
    conexion_airport: 'MEX',
    arrival_airport: 'LAX',
    segment_init_count: 420,
    segment_started_count: 380,
    segment_completed_count: 340,
    segment_closed_count: 320,
  },
];

const meta = {
  title: 'Charts/BusinessMetrics/CheckinSegments',
  component: CheckinSegments,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of segment data objects'
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
        component: 'Component to display check-in segments breakdown by flight routes, showing departure, connection (if applicable), arrival airports with trip type indicators and completion percentages.'
      }
    }
  }
} satisfies Meta<typeof CheckinSegments>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vista por defecto con métricas de segmentos de check-in
 */
export const Default: Story = {
  args: {
    data: mockSegmentsData,
    loading: false,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra la tabla de segmentos con aeropuertos de salida, conexión, llegada, tipo de viaje y porcentajes de completado.'
      }
    }
  }
};

/**
 * Estado de carga
 */
export const Loading: Story = {
  args: {
    data: [],
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
    data: [],
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
 * Solo vuelos directos (sin conexión)
 */
export const DirectFlightsOnly: Story = {
  args: {
    data: mockSegmentsData.filter(s => s.conexion_airport === 'None'),
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra solo los segmentos de vuelos directos sin conexión.'
      }
    }
  }
};

/**
 * Vuelos con conexión
 */
export const WithConnections: Story = {
  args: {
    data: mockSegmentsData.filter(s => s.conexion_airport !== 'None'),
    loading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra solo los segmentos de vuelos con conexión.'
      }
    }
  }
};

