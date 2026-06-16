import type { Meta, StoryObj } from '@storybook/vue3'
import CheckinContainer from './CheckinContainer.vue'

const mockCheckinData = {
  total_checkin_init: 8500,
  total_checkin_initiated: 10000,
  total_checkin_init_abandoned: 500,
  total_checkin_started: 7200,
  total_checkin_completed: 6800,
  total_checkin_closed: 6500,
  total_checkin_unrecovered: 200,
  checkin_by_day: [
    {
      date: '2024-11-01',
      checkin_initiated_count: 350,
      checkin_init_count: 300,
      checkin_started_count: 250,
      checkin_completed_count: 240,
      checkin_closed_count: 230,
    },
    {
      date: '2024-11-02',
      checkin_initiated_count: 380,
      checkin_init_count: 320,
      checkin_started_count: 270,
      checkin_completed_count: 260,
      checkin_closed_count: 250,
    },
  ],
}

const mockCheckinFailedData = {
  total_checkin_failed: 120,
  failed_by_step_by_day: [
    {
      date: '2024-11-01',
      steps: [
        { step_name: 'get_seatmap', failed_count: 8 },
        { step_name: 'assign_seat', failed_count: 4 },
      ],
    },
    {
      date: '2024-11-02',
      steps: [{ step_name: 'checkin_segments', failed_count: 5 }],
    },
  ],
  unrecovered_by_step: [
    { step_name: 'get_seatmap', count: 20 },
    { step_name: 'assign_seat', count: 12 },
  ],
}

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
]

const meta = {
  title: 'Charts/BusinessMetrics/CheckinContainer',
  component: CheckinContainer,
  tags: ['autodocs'],
  argTypes: {
    containerInitiallyOpen: {
      control: 'boolean',
      description: 'Contenedor principal “Check in” abierto o cerrado al montar',
    },
    childrenInitiallyOpen: {
      control: 'boolean',
      description: 'Cada gráfico interno abierto o cerrado al montar',
    },
    loading: {
      control: 'boolean',
      description: 'Loading en todos los bloques',
    },
    checkinLoading: { control: 'boolean' },
    segmentsLoading: { control: 'boolean' },
    showCheckin: {
      control: 'boolean',
      description:
        'Muestra el bloque Sankey/tablas Checkin.vue (métricas de flujo `checkin_*`) antes de Segmentos',
    },
    enableExport: { control: 'boolean' },
    exportLoading: { control: 'boolean' },
    onExport: {
      action: 'export',
      description: 'Payload { source, format }',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Agrupa métricas de flujo Check-in (Sankey Checkin.vue) y Checkin Segments bajo un único colapsable “Check in”. Los exports pueden indicar origen checkin | checkinSegments.',
      },
    },
  },
} satisfies Meta<typeof CheckinContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    containerInitiallyOpen: false,
    childrenInitiallyOpen: true,
    loading: false,
    checkinLoading: false,
    segmentsLoading: false,
    showCheckin: true,
    enableExport: true,
    exportLoading: false,
    checkinData: mockCheckinData,
    checkinFailedData: mockCheckinFailedData,
    segmentsData: mockSegmentsData,
  },
}

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
}

export const CollapsedOuter: Story = {
  args: {
    ...Default.args,
    containerInitiallyOpen: false,
  },
}
