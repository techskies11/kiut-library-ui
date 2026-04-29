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

const mockCheckinMetricsData = {
  airline_name: 'Clic Air',
  start_date: '2025-11-01',
  end_date: '2025-12-05',
  total_record_locator_init: 36,
  total_record_locator_started: 137,
  total_record_locator_completed: 24,
  total_record_locator_closed: 9,
  total_record_locator_failed: 3,
  total_record_locator_abandoned: 1,
  total_record_locator_init_abandoned: 21,
  total_checkin_initiated: 167,
  record_locator_by_day: [
    {
      date: '2025-12-03',
      record_locator_init_count: 5,
      record_locator_started_count: 5,
      record_locator_completed_count: 3,
      record_locator_closed_count: 3,
      record_locator_failed_count: 1,
      record_locator_abandoned_count: 0,
      checkin_initiated: 3,
    },
    {
      date: '2025-12-02',
      record_locator_init_count: 2,
      record_locator_started_count: 2,
      record_locator_completed_count: 1,
      record_locator_closed_count: 1,
      record_locator_failed_count: 0,
      record_locator_abandoned_count: 0,
      checkin_initiated: 2,
    },
  ],
}

const mockCheckinMetricsFailedData = {
  airline_name: 'Clic Air',
  start_date: '2025-11-01',
  end_date: '2025-12-05',
  total_checkin_failed: 5,
  total_checkin_unrecovered: 0,
  total_checkin_init_abandoned: 12,
  failed_by_step_by_day: [
    {
      date: '2025-11-05',
      steps: [
        { step_name: 'save_missing_info', failed_count: 2 },
        { step_name: 'checkin_segments', failed_count: 1 },
      ],
    },
  ],
  unrecovered_by_step: [],
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
    checkinMetricsLoading: { control: 'boolean' },
    recordLocatorLoading: { control: 'boolean' },
    segmentsLoading: { control: 'boolean' },
    showCheckin: {
      control: 'boolean',
      description: 'Renderiza el bloque Checkin dentro de CheckinSegments',
    },
    showCheckinMetrics: {
      control: 'boolean',
      description: 'Renderiza CheckinMetrics dentro de CheckinSegments cuando se necesita mantener ese bloque',
    },
    isAvianca: { control: 'boolean' },
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
          'Agrupa Record Locator y Checkin Segments bajo un único colapsable “Check in”. CheckinSegments puede recibir la data necesaria para renderizar bloques internos de check-in.',
      },
    },
  },
} satisfies Meta<typeof CheckinContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    containerInitiallyOpen: true,
    childrenInitiallyOpen: true,
    loading: false,
    checkinLoading: false,
    checkinMetricsLoading: false,
    recordLocatorLoading: false,
    segmentsLoading: false,
    showCheckin: true,
    showCheckinMetrics: false,
    isAvianca: false,
    enableExport: true,
    exportLoading: false,
    checkinData: mockCheckinData,
    checkinFailedData: mockCheckinFailedData,
    recordLocatorData: mockCheckinMetricsData,
    checkinMetricsData: mockCheckinMetricsData,
    checkinMetricsFailedData: mockCheckinMetricsFailedData,
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
