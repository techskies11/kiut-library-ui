import type { Meta, StoryObj } from '@storybook/vue3';
import FAQ from './FAQ.vue';

// Datos de ejemplo para las stories
const mockFaqData = {
  total_faq_events: 15420,
  total_documents_found: 12350,
  total_airline_information_retrieved: 8920,
  total_booking_info_retrieved: 4230,
  total_flight_status_retrieved: 6180,
  faq_by_day: [
    { date: '2024-11-01', faq_events_count: 520, documents_found_count: 410, airline_information_retrieved_count: 290, booking_info_retrieved_count: 140, flight_status_retrieved_count: 200 },
    { date: '2024-11-02', faq_events_count: 480, documents_found_count: 390, airline_information_retrieved_count: 270, booking_info_retrieved_count: 130, flight_status_retrieved_count: 190 },
    { date: '2024-11-03', faq_events_count: 550, documents_found_count: 440, airline_information_retrieved_count: 310, booking_info_retrieved_count: 150, flight_status_retrieved_count: 210 },
    { date: '2024-11-04', faq_events_count: 610, documents_found_count: 490, airline_information_retrieved_count: 350, booking_info_retrieved_count: 170, flight_status_retrieved_count: 240 },
    { date: '2024-11-05', faq_events_count: 580, documents_found_count: 460, airline_information_retrieved_count: 330, booking_info_retrieved_count: 160, flight_status_retrieved_count: 220 },
    { date: '2024-11-06', faq_events_count: 490, documents_found_count: 400, airline_information_retrieved_count: 280, booking_info_retrieved_count: 135, flight_status_retrieved_count: 195 },
    { date: '2024-11-07', faq_events_count: 530, documents_found_count: 420, airline_information_retrieved_count: 300, booking_info_retrieved_count: 145, flight_status_retrieved_count: 205 },
    { date: '2024-11-08', faq_events_count: 620, documents_found_count: 500, airline_information_retrieved_count: 360, booking_info_retrieved_count: 175, flight_status_retrieved_count: 250 },
    { date: '2024-11-09', faq_events_count: 590, documents_found_count: 470, airline_information_retrieved_count: 340, booking_info_retrieved_count: 165, flight_status_retrieved_count: 230 },
    { date: '2024-11-10', faq_events_count: 540, documents_found_count: 430, airline_information_retrieved_count: 305, booking_info_retrieved_count: 148, flight_status_retrieved_count: 208 },
  ]
};

const mockWeekData = {
  total_faq_events: 3580,
  total_documents_found: 2890,
  total_airline_information_retrieved: 2100,
  total_booking_info_retrieved: 980,
  total_flight_status_retrieved: 1420,
  faq_by_day: [
    { date: '2024-11-24', faq_events_count: 510, documents_found_count: 410, airline_information_retrieved_count: 300, booking_info_retrieved_count: 140, flight_status_retrieved_count: 200 },
    { date: '2024-11-25', faq_events_count: 520, documents_found_count: 420, airline_information_retrieved_count: 305, booking_info_retrieved_count: 142, flight_status_retrieved_count: 205 },
    { date: '2024-11-26', faq_events_count: 500, documents_found_count: 400, airline_information_retrieved_count: 290, booking_info_retrieved_count: 135, flight_status_retrieved_count: 195 },
    { date: '2024-11-27', faq_events_count: 530, documents_found_count: 430, airline_information_retrieved_count: 315, booking_info_retrieved_count: 148, flight_status_retrieved_count: 212 },
    { date: '2024-11-28', faq_events_count: 480, documents_found_count: 385, airline_information_retrieved_count: 280, booking_info_retrieved_count: 130, flight_status_retrieved_count: 188 },
    { date: '2024-11-29', faq_events_count: 540, documents_found_count: 435, airline_information_retrieved_count: 320, booking_info_retrieved_count: 150, flight_status_retrieved_count: 218 },
    { date: '2024-11-30', faq_events_count: 500, documents_found_count: 410, airline_information_retrieved_count: 290, booking_info_retrieved_count: 135, flight_status_retrieved_count: 202 },
  ]
};

const meta = {
  title: 'Charts/BusinessMetrics/FAQ',
  component: FAQ,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Estado de carga del componente'
    },
    data: {
      control: 'object',
      description: 'Datos de métricas FAQ incluyendo totales y datos por día'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente para mostrar métricas de FAQ incluyendo tarjetas KPI y un gráfico de líneas con tendencias diarias de consultas de información de aerolínea, estado de vuelo e información de reservas.'
      }
    }
  }
} satisfies Meta<typeof FAQ>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vista por defecto con métricas de FAQ
 */
export const Default: Story = {
  args: {
    loading: false,
    data: mockFaqData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el componente completo con los KPIs y el gráfico de líneas de métricas de FAQ.'
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
    data: mockWeekData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Métricas de FAQ para la última semana con menos puntos de datos.'
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
    data: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el estado de carga con la animación de barras.'
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
    data: {
      total_faq_events: 0,
      total_documents_found: 0,
      total_airline_information_retrieved: 0,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 0,
      faq_by_day: []
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el estado vacío cuando no hay datos disponibles para el período seleccionado.'
      }
    }
  }
};

/**
 * Con datos parciales (solo algunos KPIs tienen valores)
 */
export const PartialData: Story = {
  args: {
    loading: false,
    data: {
      total_faq_events: 5420,
      total_documents_found: 4350,
      total_airline_information_retrieved: 3200,
      total_booking_info_retrieved: 0,
      total_flight_status_retrieved: 1800,
      faq_by_day: [
        { date: '2024-11-28', faq_events_count: 500, documents_found_count: 400, airline_information_retrieved_count: 300, booking_info_retrieved_count: 0, flight_status_retrieved_count: 180 },
        { date: '2024-11-29', faq_events_count: 520, documents_found_count: 420, airline_information_retrieved_count: 310, booking_info_retrieved_count: 0, flight_status_retrieved_count: 190 },
        { date: '2024-11-30', faq_events_count: 480, documents_found_count: 380, airline_information_retrieved_count: 280, booking_info_retrieved_count: 0, flight_status_retrieved_count: 170 },
      ]
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente mostrando datos parciales donde algunos KPIs están en cero.'
      }
    }
  }
};
