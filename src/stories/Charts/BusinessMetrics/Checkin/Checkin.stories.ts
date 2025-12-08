import type { Meta, StoryObj } from '@storybook/vue3';
import Checkin from './Checkin.vue';

// Datos mock para checkin
const mockCheckinData = {
  total_checkin_init: 8500,
  total_checkin_initiated: 10000,
  total_checkin_init_abandoned: 500,
  total_checkin_started: 7200,
  total_checkin_completed: 6800,
  total_checkin_closed: 6500,
  total_checkin_unrecovered: 200,
  checkin_by_day: [
    { date: '2024-11-01', checkin_initiated_count: 350, checkin_init_count: 300, checkin_started_count: 250, checkin_completed_count: 240, checkin_closed_count: 230 },
    { date: '2024-11-02', checkin_initiated_count: 380, checkin_init_count: 320, checkin_started_count: 270, checkin_completed_count: 260, checkin_closed_count: 250 },
    { date: '2024-11-03', checkin_initiated_count: 420, checkin_init_count: 360, checkin_started_count: 310, checkin_completed_count: 295, checkin_closed_count: 285 },
    { date: '2024-11-04', checkin_initiated_count: 390, checkin_init_count: 340, checkin_started_count: 290, checkin_completed_count: 275, checkin_closed_count: 265 },
    { date: '2024-11-05', checkin_initiated_count: 410, checkin_init_count: 350, checkin_started_count: 300, checkin_completed_count: 285, checkin_closed_count: 275 },
  ]
};

const mockFailedData = {
  total_checkin_failed: 400,
  failed_by_step_by_day: [
    { date: '2024-11-01', steps: [{ step_name: 'get_seatmap', failed_count: 15 }, { step_name: 'assign_seat', failed_count: 8 }] },
    { date: '2024-11-02', steps: [{ step_name: 'get_seatmap', failed_count: 18 }, { step_name: 'save_missing_info', failed_count: 5 }] },
    { date: '2024-11-03', steps: [{ step_name: 'checkin_segments', failed_count: 12 }, { step_name: 'assign_seat', failed_count: 10 }] },
    { date: '2024-11-04', steps: [{ step_name: 'get_seatmap', failed_count: 14 }, { step_name: 'checkin_segments', failed_count: 7 }] },
    { date: '2024-11-05', steps: [{ step_name: 'assign_seat', failed_count: 11 }, { step_name: 'save_missing_info', failed_count: 6 }] },
  ],
  unrecovered_by_step: [
    { step_name: 'get_seatmap', count: 85 },
    { step_name: 'assign_seat', count: 60 },
    { step_name: 'checkin_segments', count: 35 },
    { step_name: 'save_missing_info', count: 20 },
  ]
};

const mockWeekData = {
  total_checkin_init: 2100,
  total_checkin_initiated: 2500,
  total_checkin_init_abandoned: 120,
  total_checkin_started: 1800,
  total_checkin_completed: 1700,
  total_checkin_closed: 1620,
  total_checkin_unrecovered: 50,
  checkin_by_day: [
    { date: '2024-11-24', checkin_initiated_count: 360, checkin_init_count: 300, checkin_started_count: 260, checkin_completed_count: 245, checkin_closed_count: 235 },
    { date: '2024-11-25', checkin_initiated_count: 350, checkin_init_count: 295, checkin_started_count: 255, checkin_completed_count: 240, checkin_closed_count: 230 },
    { date: '2024-11-26', checkin_initiated_count: 370, checkin_init_count: 315, checkin_started_count: 270, checkin_completed_count: 255, checkin_closed_count: 245 },
  ]
};

const mockWeekFailedData = {
  total_checkin_failed: 80,
  failed_by_step_by_day: [
    { date: '2024-11-24', steps: [{ step_name: 'get_seatmap', failed_count: 10 }] },
    { date: '2024-11-25', steps: [{ step_name: 'assign_seat', failed_count: 8 }] },
    { date: '2024-11-26', steps: [{ step_name: 'checkin_segments', failed_count: 7 }] },
  ],
  unrecovered_by_step: [
    { step_name: 'get_seatmap', count: 25 },
    { step_name: 'assign_seat', count: 15 },
  ]
};

const meta = {
  title: 'Charts/BusinessMetrics/Checkin',
  component: Checkin,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Estado de carga del componente'
    },
    checkinData: {
      control: 'object',
      description: 'Datos de métricas de check-in incluyendo totales y datos por día'
    },
    failedData: {
      control: 'object',
      description: 'Datos de errores de check-in por paso y por día'
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
        component: 'Componente para mostrar métricas de check-in incluyendo un diagrama Sankey de flujo y una tabla detallada con indicadores de rendimiento.'
      }
    }
  }
} satisfies Meta<typeof Checkin>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vista por defecto con métricas de check-in
 */
export const Default: Story = {
  args: {
    loading: false,
    checkinData: mockCheckinData,
    failedData: mockFailedData,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el componente completo con el flujo Sankey y la tabla de métricas de check-in.'
      }
    }
  }
};

/**
 * Vista con datos de la última semana
 */
export const LastWeek: Story = {
  args: {
    loading: false,
    checkinData: mockWeekData,
    failedData: mockWeekFailedData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Métricas de check-in para la última semana con menos puntos de datos.'
      }
    }
  }
};

/**
 * Estado de carga
 */
export const Loading: Story = {
  args: {
    loading: true,
    checkinData: null,
    failedData: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el estado de carga con la animación de flujo.'
      }
    }
  }
};

/**
 * Estado vacío (sin datos)
 */
export const EmptyState: Story = {
  args: {
    loading: false,
    checkinData: {
      total_checkin_init: 0,
      total_checkin_initiated: 0,
      total_checkin_init_abandoned: 0,
      total_checkin_started: 0,
      total_checkin_completed: 0,
      total_checkin_closed: 0,
      total_checkin_unrecovered: 0,
      checkin_by_day: []
    },
    failedData: {
      total_checkin_failed: 0,
      failed_by_step_by_day: [],
      unrecovered_by_step: []
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el estado vacío cuando no hay datos disponibles.'
      }
    }
  }
};

/**
 * Solo con datos de checkin (sin errores)
 */
export const WithoutFailures: Story = {
  args: {
    loading: false,
    checkinData: {
      ...mockCheckinData,
      total_checkin_unrecovered: 0,
    },
    failedData: {
      total_checkin_failed: 0,
      failed_by_step_by_day: [],
      unrecovered_by_step: []
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el flujo de check-in sin errores no recuperables.'
      }
    }
  }
};
