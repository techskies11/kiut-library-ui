import type { Meta, StoryObj } from '@storybook/vue3'
import CheckinContainer from './CheckinContainer.vue'
import type { CheckinErrorReasonsBreakdown } from '../CheckinErrorReasons/CheckinErrorReasons.vue'

const mockCheckinData = {
  airline_name: 'Clic Air',
  start_date: '2025-11-01',
  end_date: '2025-12-05',
  total_record_locator_init: 1500,
  total_record_locator_started: 1420,
  total_record_locator_completed: 1380,
  total_record_locator_closed: 1350,
  total_record_locator_failed: 150,
  total_record_locator_init_abandoned: 200,
  total_checkin_pre_init_abandoned_error: 10,
  total_checkin_pre_init_abandoned_voluntary: 10,
  total_checkin_initiated: 1720,
  avg_checkin_completion_time_seconds: 186,
  avg_checkin_completion_time_formatted: '3m 6s',
  avg_checkin_interactions_to_complete: 7.4,
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
  total_checkin_failed: 150,
  total_checkin_unrecovered: 0,
  total_checkin_init_abandoned: 220,
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
  unrecovered_by_day: [
    { date: '2025-12-03', unrecovered_count: 0 },
    { date: '2025-12-02', unrecovered_count: 1 },
    { date: '2025-11-19', unrecovered_count: 2 },
  ],
}

const mockPreviousCheckinData = {
  ...mockCheckinData,
  total_checkin_initiated: 1587,
  total_record_locator_closed: 1219,
  total_record_locator_failed: 136,
  total_record_locator_init_abandoned: 196,
  total_checkin_pre_init_abandoned_error: 8,
  total_checkin_pre_init_abandoned_voluntary: 8,
  avg_checkin_interactions_to_complete: 8.0,
}

const mockPreviousCheckinFailedData = {
  ...mockCheckinFailedData,
  total_checkin_failed: 136,
  total_checkin_init_abandoned: 212,
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

const mockErrorReasons: CheckinErrorReasonsBreakdown = {
  stage: 'on_retrieve',
  total_errors: 42,
  total_unrecovered: null,
  total_bp_not_issued: null,
  categories: [
    {
      outcome_group: null,
      category_key: 'user_error',
      category_label: 'User error',
      error_count: 18,
      percentage: 42.9,
      raw_logs: [
        { message: 'LAST_NAME_MISMATCH', count: 12, percentage_of_total: 28.6 },
        { message: 'INVALID_RECORD_LOCATOR', count: 6, percentage_of_total: 14.3 },
      ],
    },
    {
      outcome_group: null,
      category_key: 'tech_error',
      category_label: 'Tech error',
      error_count: 14,
      percentage: 33.3,
      raw_logs: [
        { message: 'UPSTREAM_CHECKIN_ERROR', count: 10, percentage_of_total: 23.8 },
        { message: 'TIMEOUT', count: 4, percentage_of_total: 9.5 },
      ],
    },
    {
      outcome_group: null,
      category_key: 'business_rule',
      category_label: 'Business rule',
      error_count: 10,
      percentage: 23.8,
      raw_logs: [
        { message: 'CHECKIN_NOT_OPEN', count: 10, percentage_of_total: 23.8 },
      ],
    },
  ],
}

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
    errorReasonsLoading: { control: 'boolean' },
    showCheckin: {
      control: 'boolean',
      description:
        'Muestra el bloque CheckinMetrics.vue (métricas record locator) antes de Segmentos',
    },
    showErrorReasons: {
      control: 'boolean',
      description: 'Muestra Check-in Error Reasons al lado de Checkin Volume',
    },
    errorReasonsStage: {
      control: 'select',
      options: ['on_retrieve', 'on_check_in_process'],
    },
    enableExport: { control: 'boolean' },
    exportLoading: { control: 'boolean' },
    onExport: {
      action: 'export',
      description:
        'Payload { source, format } (checkin | checkinSegments | checkinVolume | checkinErrorReasons)',
    },
    'onUpdate:errorReasonsStage': {
      action: 'update:errorReasonsStage',
      description: 'Emitted when the error-reasons stage select changes',
    },
    trendView: {
      control: 'select',
      options: ['volume', 'interactions', 'completionTime'],
      description: 'Active view in the Volume / Interactions / Completion time select',
    },
    'onUpdate:trendView': {
      action: 'update:trendView',
      description: 'Emitted when the trend view select changes',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Agrupa métricas Check-in (Sankey), Volume + Error Reasons (lado a lado), Segments y un gráfico de tendencia (Volume / Avg interactions / Avg completion time) con select, como Transactions. Los exports indican origen checkin | checkinVolume | checkinErrorReasons | checkinSegments | checkinInteractions | checkinCompletionTime.',
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
    showErrorReasons: true,
    errorReasonsStage: 'on_retrieve',
    errorReasons: mockErrorReasons,
    interactionsData: {
      avg_checkin_interactions_to_complete: 7.4,
      avg_checkin_interactions_by_day: {
        '2025-12-03': 6.2,
        '2025-12-02': 7.1,
        '2025-11-19': 8.0,
      },
    },
    completionTimeData: {
      avg_checkin_completion_time_seconds: 186,
      avg_checkin_completion_time_formatted: '3m 6s',
      avg_checkin_completion_time_by_day: {
        '2025-12-03': 180,
        '2025-12-02': 210,
        '2025-11-19': 195,
      },
    },
    trendView: 'volume',
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

export const WithKpiTrends: Story = {
  args: {
    ...Default.args,
    containerInitiallyOpen: true,
    previousCheckinData: mockPreviousCheckinData,
    previousCheckinFailedData: mockPreviousCheckinFailedData,
  },
}
