import type { Meta, StoryObj } from '@storybook/vue3'
import CheckinContainer from './CheckinContainer.vue'

const mockCheckinData = {
  airline_name: 'Clic Air',
  start_date: '2025-11-01',
  end_date: '2025-12-05',
  total_record_locator_init: 36,
  total_record_locator_started: 137,
  total_record_locator_completed: 24,
  total_record_locator_closed: 9,
  total_record_locator_init_abandoned: 21,
  total_checkin_initiated: 167,
  record_locator_by_day: [
    {
      date: '2025-12-03',
      record_locator_init_count: 5,
      record_locator_started_count: 5,
      record_locator_completed_count: 3,
      record_locator_closed_count: 3,
      record_locator_abandoned_count: 0,
      checkin_initiated: 3,
    },
    {
      date: '2025-12-02',
      record_locator_init_count: 2,
      record_locator_started_count: 2,
      record_locator_completed_count: 1,
      record_locator_closed_count: 1,
      record_locator_abandoned_count: 0,
      checkin_initiated: 2,
    },
    {
      date: '2025-11-19',
      record_locator_init_count: 12,
      record_locator_started_count: 12,
      record_locator_completed_count: 0,
      record_locator_closed_count: 0,
      record_locator_abandoned_count: 0,
      checkin_initiated: 16,
    },
  ],
}

const mockCheckinFailedData = {
  airline_name: 'Clic Air',
  start_date: '2025-11-01',
  end_date: '2025-12-05',
  total_checkin_failed: 5,
  total_checkin_unrecovered: 0,
  total_checkin_init_abandoned: 12,
  failed_by_step_by_day: [
    {
      date: '2025-11-03',
      steps: [{ step_name: 'checkin_segments', failed_count: 1 }],
    },
    {
      date: '2025-11-05',
      steps: [
        { step_name: 'save_missing_info', failed_count: 2 },
        { step_name: 'checkin_segments', failed_count: 1 },
      ],
    },
    {
      date: '2025-12-02',
      steps: [{ step_name: 'passenger_checkin', failed_count: 1 }],
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
    segmentsLoading: { control: 'boolean' },
    showCheckin: {
      control: 'boolean',
      description:
        'Muestra el bloque CheckinMetrics.vue (métricas record locator) antes de Segmentos',
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
          'Agrupa métricas Check-in (Sankey CheckinMetrics.vue) y Checkin Segments bajo un único colapsable “Check in”. Los exports pueden indicar origen checkin | checkinSegments.',
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
