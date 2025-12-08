import type { Meta, StoryObj } from '@storybook/vue3';
import AgentsPerDay from './AgentsPerDay.vue';

const meta = {
  title: 'Charts/BusinessMetrics/AgentsPerDay',
  component: AgentsPerDay,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Shows loading animation when true'
    },
    data: {
      control: 'object',
      description: 'Agent interactions data from API with agents_by_day'
    },
    options: {
      control: 'object',
      description: 'Chart.js options for customization'
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
} satisfies Meta<typeof AgentsPerDay>;

export default meta;
type Story = StoryObj<typeof meta>;

// Datos de ejemplo basados en la estructura real de la API
const sampleData = {
  airline_name: '2W',
  start_date: '2025-12-01',
  end_date: '2025-12-05',
  agents_by_day: {
    '2025-12-01': {
      faq: 357,
      triage: 1921
    },
    '2025-12-03': {
      triage: 2
    }
  },
  total_unique_agents: 2
};

// Historia con datos por defecto
export const Default: Story = {
  args: {
    data: sampleData,
    loading: false,
    enableExport: true,
  },
};

// Historia en estado de carga
export const Loading: Story = {
  args: {
    loading: true,
  },
};

// Historia sin datos
export const EmptyState: Story = {
  args: {
    data: {
      airline_name: '2W',
      start_date: '2025-12-01',
      end_date: '2025-12-05',
      agents_by_day: {},
      total_unique_agents: 0
    },
    loading: false,
  },
};

// Historia con múltiples categorías de agentes
export const MultipleAgents: Story = {
  args: {
    data: {
      airline_name: '2W',
      start_date: '2025-12-01',
      end_date: '2025-12-07',
      agents_by_day: {
        '2025-12-01': {
          faq: 357,
          triage: 1921,
          checkin: 150,
          seller: 80
        },
        '2025-12-02': {
          faq: 280,
          triage: 1500,
          checkin: 200,
          disruption_manager: 45
        },
        '2025-12-03': {
          triage: 2,
          faq: 100,
          booking_manager: 30
        },
        '2025-12-04': {
          faq: 450,
          triage: 2100,
          checkin: 180,
          seller: 120,
          human: 25
        },
        '2025-12-05': {
          faq: 380,
          triage: 1800,
          checkin: 160,
          agency: 50
        },
        '2025-12-06': {
          faq: 320,
          triage: 1650,
          checkin: 140,
          loyalty: 35
        },
        '2025-12-07': {
          faq: 290,
          triage: 1400,
          checkin: 120,
          seller: 95
        }
      },
      total_unique_agents: 9
    },
    loading: false,
  },
};

// Historia con un solo día
export const SingleDay: Story = {
  args: {
    data: {
      airline_name: '2W',
      start_date: '2025-12-01',
      end_date: '2025-12-01',
      agents_by_day: {
        '2025-12-01': {
          faq: 450,
          triage: 2100,
          checkin: 180,
          seller: 120
        }
      },
      total_unique_agents: 4
    },
    loading: false,
  },
};

// Historia con un solo tipo de agente
export const SingleAgentType: Story = {
  args: {
    data: {
      airline_name: '2W',
      start_date: '2025-12-01',
      end_date: '2025-12-05',
      agents_by_day: {
        '2025-12-01': {
          checkin: 250
        },
        '2025-12-02': {
          checkin: 320
        },
        '2025-12-03': {
          checkin: 180
        },
        '2025-12-04': {
          checkin: 410
        },
        '2025-12-05': {
          checkin: 290
        }
      },
      total_unique_agents: 1
    },
    loading: false,
  },
};

// Historia con alto volumen de datos
export const HighVolume: Story = {
  args: {
    data: {
      airline_name: '2W',
      start_date: '2025-12-01',
      end_date: '2025-12-14',
      agents_by_day: {
        '2025-12-01': { faq: 1200, triage: 5500, checkin: 800, seller: 450 },
        '2025-12-02': { faq: 1350, triage: 5800, checkin: 920, seller: 520 },
        '2025-12-03': { faq: 1100, triage: 5200, checkin: 750, seller: 380 },
        '2025-12-04': { faq: 1450, triage: 6100, checkin: 980, seller: 580 },
        '2025-12-05': { faq: 1280, triage: 5600, checkin: 850, seller: 490 },
        '2025-12-06': { faq: 980, triage: 4200, checkin: 620, seller: 320 },
        '2025-12-07': { faq: 850, triage: 3800, checkin: 540, seller: 280 },
        '2025-12-08': { faq: 1320, triage: 5900, checkin: 890, seller: 510 },
        '2025-12-09': { faq: 1400, triage: 6200, checkin: 950, seller: 560 },
        '2025-12-10': { faq: 1250, triage: 5500, checkin: 820, seller: 470 },
        '2025-12-11': { faq: 1380, triage: 6000, checkin: 910, seller: 530 },
        '2025-12-12': { faq: 1150, triage: 5300, checkin: 780, seller: 420 },
        '2025-12-13': { faq: 920, triage: 4100, checkin: 580, seller: 300 },
        '2025-12-14': { faq: 780, triage: 3500, checkin: 480, seller: 250 }
      },
      total_unique_agents: 4
    },
    loading: false,
  },
};

// Historia con todos los tipos de agentes
export const AllAgentTypes: Story = {
  args: {
    data: {
      airline_name: '2W',
      start_date: '2025-12-01',
      end_date: '2025-12-05',
      agents_by_day: {
        '2025-12-01': {
          checkin: 250,
          faq: 380,
          disruption_manager: 45,
          booking_manager: 60,
          triage: 1200,
          seller: 150,
          human: 25,
          agency: 40,
          loyalty: 30
        },
        '2025-12-02': {
          checkin: 280,
          faq: 420,
          disruption_manager: 52,
          booking_manager: 70,
          triage: 1350,
          seller: 180,
          human: 32,
          agency: 48,
          loyalty: 38
        },
        '2025-12-03': {
          checkin: 220,
          faq: 350,
          disruption_manager: 38,
          booking_manager: 55,
          triage: 1100,
          seller: 130,
          human: 20,
          agency: 35,
          loyalty: 25
        },
        '2025-12-04': {
          checkin: 310,
          faq: 460,
          disruption_manager: 58,
          booking_manager: 78,
          triage: 1450,
          seller: 200,
          human: 38,
          agency: 55,
          loyalty: 42
        },
        '2025-12-05': {
          checkin: 270,
          faq: 400,
          disruption_manager: 48,
          booking_manager: 65,
          triage: 1280,
          seller: 165,
          human: 28,
          agency: 42,
          loyalty: 35
        }
      },
      total_unique_agents: 9
    },
    loading: false,
  },
};

