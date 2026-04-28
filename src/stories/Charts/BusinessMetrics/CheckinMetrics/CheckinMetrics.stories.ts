import type { Meta, StoryObj } from '@storybook/vue3';
import CheckinMetrics from './CheckinMetrics.vue';

const meta = {
  title: 'Charts/BusinessMetrics/CheckinMetrics',
  component: CheckinMetrics,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Shows loading animation when true'
    },
    checkinData: {
      control: 'object',
      description: 'Check-in record locator metrics data from checkin-record-locator-metrics API'
    },
    failedData: {
      control: 'object',
      description: 'Failed check-in data (by conversation) included in the same API response'
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
} satisfies Meta<typeof CheckinMetrics>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCheckinData = {
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
      checkin_initiated: 3
    },
    {
      date: '2025-12-02',
      record_locator_init_count: 2,
      record_locator_started_count: 2,
      record_locator_completed_count: 1,
      record_locator_closed_count: 1,
      record_locator_abandoned_count: 0,
      checkin_initiated: 2
    },
    {
      date: '2025-11-19',
      record_locator_init_count: 12,
      record_locator_started_count: 12,
      record_locator_completed_count: 0,
      record_locator_closed_count: 0,
      record_locator_abandoned_count: 0,
      checkin_initiated: 16
    },
    {
      date: '2025-11-18',
      record_locator_init_count: 13,
      record_locator_started_count: 13,
      record_locator_completed_count: 0,
      record_locator_closed_count: 0,
      record_locator_abandoned_count: 0,
      checkin_initiated: 15
    },
    {
      date: '2025-11-17',
      record_locator_init_count: 19,
      record_locator_started_count: 19,
      record_locator_completed_count: 0,
      record_locator_closed_count: 0,
      record_locator_abandoned_count: 0,
      checkin_initiated: 21
    }
  ]
};

const sampleFailedData = {
  airline_name: 'Clic Air',
  start_date: '2025-11-01',
  end_date: '2025-12-05',
  total_checkin_failed: 5,
  total_checkin_unrecovered: 0,
  total_checkin_init_abandoned: 12,
  failed_by_step_by_day: [
    {
      date: '2025-11-03',
      steps: [
        { step_name: 'checkin_segments', failed_count: 1 }
      ]
    },
    {
      date: '2025-11-05',
      steps: [
        { step_name: 'save_missing_info', failed_count: 2 },
        { step_name: 'checkin_segments', failed_count: 1 }
      ]
    },
    {
      date: '2025-12-02',
      steps: [
        { step_name: 'passenger_checkin', failed_count: 1 }
      ]
    }
  ],
  unrecovered_by_step: []
};

export const Default: Story = {
  args: {
    checkinData: sampleCheckinData,
    failedData: sampleFailedData,
    loading: false,
    enableExport: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    checkinData: {
      airline_name: 'Test Air',
      start_date: '2025-12-01',
      end_date: '2025-12-05',
      total_record_locator_init: 0,
      total_record_locator_started: 0,
      total_record_locator_completed: 0,
      total_record_locator_closed: 0,
      total_record_locator_init_abandoned: 0,
      total_checkin_initiated: 0,
      record_locator_by_day: []
    },
    failedData: {
      airline_name: 'Test Air',
      start_date: '2025-12-01',
      end_date: '2025-12-05',
      total_checkin_failed: 0,
      total_checkin_unrecovered: 0,
      total_checkin_init_abandoned: 0,
      failed_by_step_by_day: [],
      unrecovered_by_step: []
    },
    loading: false,
  },
};

export const HighVolumeWithErrors: Story = {
  args: {
    checkinData: {
      airline_name: '2W',
      start_date: '2025-11-24',
      end_date: '2025-11-28',
      total_record_locator_init: 1250,
      total_record_locator_started: 1130,
      total_record_locator_completed: 980,
      total_record_locator_closed: 920,
      total_record_locator_init_abandoned: 120,
      total_checkin_initiated: 1500,
      total_record_locator_unrecovered: 50,
      record_locator_by_day: [
        {
          date: '2025-11-24',
          record_locator_init_count: 420,
          record_locator_started_count: 380,
          record_locator_completed_count: 320,
          record_locator_closed_count: 310,
          record_locator_abandoned_count: 40,
          checkin_initiated: 500
        },
        {
          date: '2025-11-25',
          record_locator_init_count: 450,
          record_locator_started_count: 400,
          record_locator_completed_count: 350,
          record_locator_closed_count: 330,
          record_locator_abandoned_count: 50,
          checkin_initiated: 520
        },
        {
          date: '2025-11-26',
          record_locator_init_count: 380,
          record_locator_started_count: 350,
          record_locator_completed_count: 310,
          record_locator_closed_count: 280,
          record_locator_abandoned_count: 30,
          checkin_initiated: 480
        }
      ]
    },
    failedData: {
      airline_name: '2W',
      start_date: '2025-11-24',
      end_date: '2025-11-28',
      total_checkin_failed: 150,
      total_checkin_unrecovered: 50,
      total_checkin_init_abandoned: 120,
      failed_by_step_by_day: [
        {
          date: '2025-11-24',
          steps: [
            { step_name: 'get_seatmap', failed_count: 15 },
            { step_name: 'save_missing_info', failed_count: 8 }
          ]
        },
        {
          date: '2025-11-25',
          steps: [
            { step_name: 'get_seatmap', failed_count: 20 },
            { step_name: 'checkin_segments', failed_count: 12 }
          ]
        },
        {
          date: '2025-11-26',
          steps: [
            { step_name: 'assign_seat', failed_count: 10 },
            { step_name: 'get_seatmap', failed_count: 18 }
          ]
        }
      ],
      unrecovered_by_step: [
        { step_name: 'get_seatmap', count: 35 },
        { step_name: 'save_missing_info', count: 12 },
        { step_name: 'checkin_segments', count: 8 }
      ]
    },
    loading: false,
  },
};

export const PerfectFlow: Story = {
  args: {
    checkinData: {
      airline_name: 'Perfect Air',
      start_date: '2025-12-01',
      end_date: '2025-12-03',
      total_record_locator_init: 100,
      total_record_locator_started: 100,
      total_record_locator_completed: 100,
      total_record_locator_closed: 100,
      total_record_locator_init_abandoned: 0,
      total_checkin_initiated: 100,
      record_locator_by_day: [
        {
          date: '2025-12-01',
          record_locator_init_count: 35,
          record_locator_started_count: 35,
          record_locator_completed_count: 35,
          record_locator_closed_count: 35,
          record_locator_abandoned_count: 0,
          checkin_initiated: 35
        },
        {
          date: '2025-12-02',
          record_locator_init_count: 40,
          record_locator_started_count: 40,
          record_locator_completed_count: 40,
          record_locator_closed_count: 40,
          record_locator_abandoned_count: 0,
          checkin_initiated: 40
        },
        {
          date: '2025-12-03',
          record_locator_init_count: 25,
          record_locator_started_count: 25,
          record_locator_completed_count: 25,
          record_locator_closed_count: 25,
          record_locator_abandoned_count: 0,
          checkin_initiated: 25
        }
      ]
    },
    failedData: {
      airline_name: 'Perfect Air',
      start_date: '2025-12-01',
      end_date: '2025-12-03',
      total_checkin_failed: 0,
      total_checkin_unrecovered: 0,
      total_checkin_init_abandoned: 0,
      failed_by_step_by_day: [],
      unrecovered_by_step: []
    },
    loading: false,
  },
};

export const HighAbandonment: Story = {
  args: {
    checkinData: {
      airline_name: 'Abandon Air',
      start_date: '2025-12-01',
      end_date: '2025-12-05',
      total_record_locator_init: 200,
      total_record_locator_started: 150,
      total_record_locator_completed: 80,
      total_record_locator_closed: 60,
      total_record_locator_init_abandoned: 100,
      total_checkin_initiated: 500,
      record_locator_by_day: [
        {
          date: '2025-12-01',
          record_locator_init_count: 40,
          record_locator_started_count: 30,
          record_locator_completed_count: 16,
          record_locator_closed_count: 12,
          record_locator_abandoned_count: 20,
          checkin_initiated: 100
        },
        {
          date: '2025-12-02',
          record_locator_init_count: 45,
          record_locator_started_count: 35,
          record_locator_completed_count: 18,
          record_locator_closed_count: 14,
          record_locator_abandoned_count: 22,
          checkin_initiated: 110
        },
        {
          date: '2025-12-03',
          record_locator_init_count: 38,
          record_locator_started_count: 28,
          record_locator_completed_count: 15,
          record_locator_closed_count: 11,
          record_locator_abandoned_count: 18,
          checkin_initiated: 95
        },
        {
          date: '2025-12-04',
          record_locator_init_count: 42,
          record_locator_started_count: 32,
          record_locator_completed_count: 17,
          record_locator_closed_count: 13,
          record_locator_abandoned_count: 20,
          checkin_initiated: 105
        },
        {
          date: '2025-12-05',
          record_locator_init_count: 35,
          record_locator_started_count: 25,
          record_locator_completed_count: 14,
          record_locator_closed_count: 10,
          record_locator_abandoned_count: 20,
          checkin_initiated: 90
        }
      ]
    },
    failedData: {
      airline_name: 'Abandon Air',
      start_date: '2025-12-01',
      end_date: '2025-12-05',
      total_checkin_failed: 30,
      total_checkin_unrecovered: 20,
      total_checkin_init_abandoned: 100,
      failed_by_step_by_day: [
        {
          date: '2025-12-01',
          steps: [
            { step_name: 'get_seatmap', failed_count: 5 },
            { step_name: 'checkin_segments', failed_count: 3 }
          ]
        },
        {
          date: '2025-12-02',
          steps: [
            { step_name: 'save_missing_info', failed_count: 6 },
            { step_name: 'passenger_checkin', failed_count: 4 }
          ]
        }
      ],
      unrecovered_by_step: [
        { step_name: 'get_seatmap', count: 12 },
        { step_name: 'save_missing_info', count: 8 }
      ]
    },
    loading: false,
  },
};

export const BoardingPassErrors: Story = {
  args: {
    checkinData: {
      airline_name: 'BP Error Air',
      start_date: '2025-12-01',
      end_date: '2025-12-03',
      total_record_locator_init: 100,
      total_record_locator_started: 100,
      total_record_locator_completed: 100,
      total_record_locator_closed: 70,
      total_record_locator_init_abandoned: 0,
      total_checkin_initiated: 100,
      record_locator_by_day: [
        {
          date: '2025-12-01',
          record_locator_init_count: 35,
          record_locator_started_count: 35,
          record_locator_completed_count: 35,
          record_locator_closed_count: 24,
          record_locator_abandoned_count: 0,
          checkin_initiated: 35
        },
        {
          date: '2025-12-02',
          record_locator_init_count: 40,
          record_locator_started_count: 40,
          record_locator_completed_count: 40,
          record_locator_closed_count: 28,
          record_locator_abandoned_count: 0,
          checkin_initiated: 40
        },
        {
          date: '2025-12-03',
          record_locator_init_count: 25,
          record_locator_started_count: 25,
          record_locator_completed_count: 25,
          record_locator_closed_count: 18,
          record_locator_abandoned_count: 0,
          checkin_initiated: 25
        }
      ]
    },
    failedData: {
      airline_name: 'BP Error Air',
      start_date: '2025-12-01',
      end_date: '2025-12-03',
      total_checkin_failed: 0,
      total_checkin_unrecovered: 0,
      total_checkin_init_abandoned: 0,
      failed_by_step_by_day: [],
      unrecovered_by_step: []
    },
    loading: false,
  },
};
