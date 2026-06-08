import type { Meta, StoryObj } from '@storybook/vue3'
import AgentHumanConversations from './AgentHumanConversations.vue'

const baseAgentRows = [
  {
    date: '2026-03-15',
    agent_name: 'Sofia Martinez',
    agent_email: 'sofia.martinez@airline.com',
    assigned_count: 28,
    closed_count: 26,
    avg_time_to_assign_seconds: 58,
    avg_conversation_duration_seconds: 510,
  },
  {
    date: '2026-03-15',
    agent_name: 'James Chen',
    agent_email: 'james.chen@airline.com',
    assigned_count: 31,
    closed_count: 29,
    avg_time_to_assign_seconds: 72,
    avg_conversation_duration_seconds: 540,
  },
  {
    date: '2026-03-14',
    agent_name: 'Maria Garcia',
    agent_email: 'maria.garcia@example.com',
    assigned_count: 24,
    closed_count: 22,
    avg_time_to_assign_seconds: 65,
    avg_conversation_duration_seconds: 480,
  },
  {
    date: '2026-03-14',
    agent_name: 'David Lee',
    agent_email: 'david.lee@example.com',
    assigned_count: 19,
    closed_count: 18,
    avg_time_to_assign_seconds: 80,
    avg_conversation_duration_seconds: 600,
  },
  {
    date: '2026-03-13',
    agent_name: 'Sarah Johnson',
    agent_email: 'sarah.johnson@example.com',
    assigned_count: 22,
    closed_count: 21,
    avg_time_to_assign_seconds: 90,
    avg_conversation_duration_seconds: 570,
  },
  {
    date: '2026-03-13',
    agent_name: 'Michael Brown',
    agent_email: 'michael.brown@example.com',
    assigned_count: 17,
    closed_count: 16,
    avg_time_to_assign_seconds: 102,
    avg_conversation_duration_seconds: 630,
  },
  {
    date: '2026-03-12',
    agent_name: 'Emma Wilson',
    agent_email: 'emma.wilson@example.com',
    assigned_count: 20,
    closed_count: 19,
    avg_time_to_assign_seconds: 76,
    avg_conversation_duration_seconds: 495,
  },
  {
    date: '2026-03-12',
    agent_name: 'James Taylor',
    agent_email: 'james.taylor@example.com',
    assigned_count: 15,
    closed_count: 14,
    avg_time_to_assign_seconds: 110,
    avg_conversation_duration_seconds: 720,
  },
]

const baseData = {
  airline_name: 'Clic Air',
  start_date: '2026-03-01',
  end_date: '2026-03-15',
  total_enqueued: 1284,
  total_assigned: 176,
  total_closed: 1196,
  avg_time_to_assign_seconds: 84,
  avg_conversation_duration_seconds: 612,
  agents_by_day: baseAgentRows,
}

const meta = {
  title: 'Charts/BusinessMetrics/AgentHumanConversations',
  component: AgentHumanConversations,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Agent human conversation data with assignments and closures',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state indicator',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Theme mode (light or dark)',
    },
    previousTotalEnqueued: {
      control: 'number',
      description: 'Previous period total enqueued for trend badge',
    },
    previousTotalClosed: {
      control: 'number',
      description: 'Previous period total closed for trend badge',
    },
    previousAvgTimeToAssignSeconds: {
      control: 'number',
      description: 'Previous period avg assign time (seconds) for trend badge',
    },
    previousAvgConversationDurationSeconds: {
      control: 'number',
      description: 'Previous period avg resolution time (seconds) for trend badge',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Human agent conversation analytics with KPI cards and a sortable agent performance table (by date or aggregated).',
      },
    },
  },
} satisfies Meta<typeof AgentHumanConversations>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    loading: false,
    data: baseData,
  },
}

export const WithTrendBadges: Story = {
  args: {
    loading: false,
    data: baseData,
    previousTotalEnqueued: 1185,
    previousTotalClosed: 1126,
    previousAvgTimeToAssignSeconds: 88,
    previousAvgConversationDurationSeconds: 622,
  },
}

export const TableViewModes: Story = {
  args: {
    loading: false,
    data: baseData,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use the table dropdown to switch between By date and Aggregated. More than 6 rows trigger View more.',
      },
    },
  },
}

export const ExtendedPeriod: Story = {
  args: {
    loading: false,
    data: {
      ...baseData,
      start_date: '2026-01-01',
      end_date: '2026-01-10',
      agents_by_day: [
        ...baseAgentRows,
        {
          date: '2026-01-10',
          agent_name: 'Olivia Martinez',
          agent_email: 'olivia.martinez@example.com',
          assigned_count: 12,
          closed_count: 11,
          avg_time_to_assign_seconds: 95,
          avg_conversation_duration_seconds: 540,
        },
        {
          date: '2026-01-09',
          agent_name: 'William Davis',
          agent_email: 'william.davis@example.com',
          assigned_count: 14,
          closed_count: 13,
          avg_time_to_assign_seconds: 88,
          avg_conversation_duration_seconds: 510,
        },
      ],
    },
  },
}

export const SingleDay: Story = {
  args: {
    loading: false,
    data: {
      ...baseData,
      start_date: '2026-03-15',
      end_date: '2026-03-15',
      agents_by_day: baseAgentRows.filter((row) => row.date === '2026-03-15'),
    },
  },
}

export const AgentsWithoutNames: Story = {
  args: {
    loading: false,
    data: {
      ...baseData,
      agents_by_day: [
        {
          date: '2026-03-15',
          agent_name: '',
          agent_email: 'agent1@example.com',
          assigned_count: 5,
          closed_count: 5,
          avg_time_to_assign_seconds: 60,
          avg_conversation_duration_seconds: 420,
        },
        {
          date: '2026-03-15',
          agent_name: '',
          agent_email: 'agent2@example.com',
          assigned_count: 5,
          closed_count: 4,
          avg_time_to_assign_seconds: 75,
          avg_conversation_duration_seconds: 480,
        },
      ],
    },
  },
}

export const Empty: Story = {
  args: {
    loading: false,
    data: {
      airline_name: 'Clic Air',
      start_date: '2026-01-01',
      end_date: '2026-01-08',
      total_assigned: 0,
      total_closed: 0,
      total_enqueued: 0,
      agents_by_day: [],
    },
  },
}

export const EnqueuedOnly: Story = {
  args: {
    loading: false,
    data: {
      airline_name: 'Clic Air',
      start_date: '2026-03-01',
      end_date: '2026-03-15',
      total_enqueued: 420,
      total_closed: 0,
      agents_by_day: [],
    },
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    data: {
      total_assigned: 0,
      total_closed: 0,
      agents_by_day: [],
    },
  },
}

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    theme: 'dark',
    previousTotalEnqueued: 1185,
    previousTotalClosed: 1126,
    previousAvgTimeToAssignSeconds: 88,
    previousAvgConversationDurationSeconds: 622,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const HighVolume: Story = {
  args: {
    loading: false,
    data: {
      ...baseData,
      total_enqueued: 2500,
      total_closed: 2350,
      agents_by_day: Array.from({ length: 10 }, (_, index) => ({
        date: '2026-03-15',
        agent_name: `Agent ${index + 1}`,
        agent_email: `agent${index + 1}@example.com`,
        assigned_count: 25 - index,
        closed_count: 24 - index,
        avg_time_to_assign_seconds: 60 + index * 5,
        avg_conversation_duration_seconds: 480 + index * 30,
      })),
    },
  },
}

/** Payload real de API: filas placeholder (email "—") y nulls se filtran en la tabla. */
export const RealApiResponse: Story = {
  args: {
    loading: false,
    data: {
      airline_name: '2W',
      start_date: '2026-05-09',
      end_date: '2026-06-08',
      total_assigned: 6,
      total_closed: 3,
      total_enqueued: 37,
      avg_time_to_assign_seconds: null,
      avg_conversation_duration_seconds: 43126.773460000004,
      agents_by_day: [
        {
          date: '2026-05-09',
          agent_email: '—',
          agent_name: null,
          agent_tag: null,
          assigned_count: 0,
          closed_count: 0,
          avg_time_to_assign_seconds: null,
          avg_conversation_duration_seconds: null,
          day_total_assigned: 0,
          day_total_closed: 0,
          day_total_enqueued: 2,
          day_avg_time_to_assign_seconds: null,
          day_avg_conversation_duration_seconds: null,
        },
        {
          date: '2026-05-12',
          agent_email: 'dmedina@onservice.ai',
          agent_name: 'Diego Medina',
          assigned_count: 0,
          closed_count: 1,
          avg_time_to_assign_seconds: null,
          avg_conversation_duration_seconds: null,
        },
        {
          date: '2026-05-21',
          agent_email: 'dvasconcelo@techskies11.com',
          agent_name: null,
          assigned_count: 2,
          closed_count: 0,
          avg_time_to_assign_seconds: null,
          avg_conversation_duration_seconds: null,
        },
        {
          date: '2026-05-21',
          agent_email: 'lcoronado@techskies11.com',
          agent_name: 'Laura Coronado',
          assigned_count: 0,
          closed_count: 1,
          avg_time_to_assign_seconds: null,
          avg_conversation_duration_seconds: 190.781631,
        },
        {
          date: '2026-05-26',
          agent_email: 'dmedina@onservice.ai',
          agent_name: null,
          assigned_count: 1,
          closed_count: 0,
          avg_time_to_assign_seconds: null,
          avg_conversation_duration_seconds: null,
        },
        {
          date: '2026-05-27',
          agent_email: 'dmedina@onservice.ai',
          agent_name: 'Diego Medina',
          assigned_count: 0,
          closed_count: 1,
          avg_time_to_assign_seconds: null,
          avg_conversation_duration_seconds: 86062.765289,
        },
        {
          date: '2026-05-29',
          agent_email: 'dvasconcelo@techskies11.com',
          agent_name: null,
          assigned_count: 2,
          closed_count: 0,
          avg_time_to_assign_seconds: null,
          avg_conversation_duration_seconds: null,
        },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ejemplo con forma real de API: KPIs desde totales agregados; la tabla omite filas sin agente (email "—") o sin actividad.',
      },
    },
  },
}
