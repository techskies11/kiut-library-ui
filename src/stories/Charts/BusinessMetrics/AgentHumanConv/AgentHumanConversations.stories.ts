import type { Meta, StoryObj } from '@storybook/vue3'
import AgentHumanConversations from './AgentHumanConversations.vue'

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
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Displays agent human conversation metrics showing assignments and closures by agent, grouped by date.',
      },
    },
  },
} satisfies Meta<typeof AgentHumanConversations>

export default meta
type Story = StoryObj<typeof meta>

// Default story with sample data
export const Default: Story = {
  args: {
    loading: false,
    data: {
      airline_name: 'Clic Air',
      start_date: '2026-01-01',
      end_date: '2026-01-08',
      total_assigned: 42,
      total_closed: 38,
      agents_by_day: [
        {
          date: '2026-01-08',
          agent_name: 'John Smith',
          agent_email: 'john.smith@example.com',
          assigned_count: 8,
          closed_count: 7,
        },
        {
          date: '2026-01-08',
          agent_name: 'Maria Garcia',
          agent_email: 'maria.garcia@example.com',
          assigned_count: 6,
          closed_count: 6,
        },
        {
          date: '2026-01-08',
          agent_name: 'David Lee',
          agent_email: 'david.lee@example.com',
          assigned_count: 5,
          closed_count: 4,
        },
        {
          date: '2026-01-07',
          agent_name: 'Sarah Johnson',
          agent_email: 'sarah.johnson@example.com',
          assigned_count: 7,
          closed_count: 6,
        },
        {
          date: '2026-01-07',
          agent_name: 'Michael Brown',
          agent_email: 'michael.brown@example.com',
          assigned_count: 5,
          closed_count: 5,
        },
        {
          date: '2026-01-07',
          agent_name: 'Emma Wilson',
          agent_email: 'emma.wilson@example.com',
          assigned_count: 4,
          closed_count: 4,
        },
        {
          date: '2026-01-06',
          agent_name: 'James Taylor',
          agent_email: 'james.taylor@example.com',
          assigned_count: 7,
          closed_count: 6,
        },
      ],
    },
  },
}

// Story with many agents across multiple days
export const ExtendedPeriod: Story = {
  args: {
    loading: false,
    data: {
      airline_name: 'Clic Air',
      start_date: '2026-01-01',
      end_date: '2026-01-10',
      total_assigned: 125,
      total_closed: 118,
      agents_by_day: [
        // Day 1
        {
          date: '2026-01-10',
          agent_name: 'John Smith',
          agent_email: 'john.smith@example.com',
          assigned_count: 10,
          closed_count: 9,
        },
        {
          date: '2026-01-10',
          agent_name: 'Maria Garcia',
          agent_email: 'maria.garcia@example.com',
          assigned_count: 8,
          closed_count: 8,
        },
        {
          date: '2026-01-10',
          agent_name: 'David Lee',
          agent_email: 'david.lee@example.com',
          assigned_count: 7,
          closed_count: 7,
        },
        {
          date: '2026-01-10',
          agent_name: 'Sarah Johnson',
          agent_email: 'sarah.johnson@example.com',
          assigned_count: 6,
          closed_count: 6,
        },
        // Day 2
        {
          date: '2026-01-09',
          agent_name: 'Michael Brown',
          agent_email: 'michael.brown@example.com',
          assigned_count: 9,
          closed_count: 8,
        },
        {
          date: '2026-01-09',
          agent_name: 'Emma Wilson',
          agent_email: 'emma.wilson@example.com',
          assigned_count: 7,
          closed_count: 7,
        },
        {
          date: '2026-01-09',
          agent_name: 'James Taylor',
          agent_email: 'james.taylor@example.com',
          assigned_count: 6,
          closed_count: 6,
        },
        {
          date: '2026-01-09',
          agent_name: 'Olivia Martinez',
          agent_email: 'olivia.martinez@example.com',
          assigned_count: 5,
          closed_count: 5,
        },
        // Day 3
        {
          date: '2026-01-08',
          agent_name: 'William Davis',
          agent_email: 'william.davis@example.com',
          assigned_count: 8,
          closed_count: 7,
        },
        {
          date: '2026-01-08',
          agent_name: 'Sophia Rodriguez',
          agent_email: 'sophia.rodriguez@example.com',
          assigned_count: 7,
          closed_count: 7,
        },
        {
          date: '2026-01-08',
          agent_name: 'Lucas Anderson',
          agent_email: 'lucas.anderson@example.com',
          assigned_count: 6,
          closed_count: 5,
        },
        // Day 4
        {
          date: '2026-01-07',
          agent_name: 'Isabella Thomas',
          agent_email: 'isabella.thomas@example.com',
          assigned_count: 9,
          closed_count: 9,
        },
        {
          date: '2026-01-07',
          agent_name: 'Mason Jackson',
          agent_email: 'mason.jackson@example.com',
          assigned_count: 7,
          closed_count: 7,
        },
        {
          date: '2026-01-07',
          agent_name: 'Ava White',
          agent_email: 'ava.white@example.com',
          assigned_count: 6,
          closed_count: 6,
        },
        // Day 5
        {
          date: '2026-01-06',
          agent_name: 'Ethan Harris',
          agent_email: 'ethan.harris@example.com',
          assigned_count: 8,
          closed_count: 8,
        },
        {
          date: '2026-01-06',
          agent_name: 'Mia Martin',
          agent_email: 'mia.martin@example.com',
          assigned_count: 7,
          closed_count: 6,
        },
        {
          date: '2026-01-06',
          agent_name: 'Alexander Thompson',
          agent_email: 'alexander.thompson@example.com',
          assigned_count: 5,
          closed_count: 5,
        },
      ],
    },
  },
}

// Story with a single day
export const SingleDay: Story = {
  args: {
    loading: false,
    data: {
      airline_name: 'Clic Air',
      start_date: '2026-01-08',
      end_date: '2026-01-08',
      total_assigned: 15,
      total_closed: 14,
      agents_by_day: [
        {
          date: '2026-01-08',
          agent_name: 'John Smith',
          agent_email: 'john.smith@example.com',
          assigned_count: 8,
          closed_count: 7,
        },
        {
          date: '2026-01-08',
          agent_name: 'Maria Garcia',
          agent_email: 'maria.garcia@example.com',
          assigned_count: 7,
          closed_count: 7,
        },
      ],
    },
  },
}

// Story with agents without names
export const AgentsWithoutNames: Story = {
  args: {
    loading: false,
    data: {
      airline_name: 'Clic Air',
      start_date: '2026-01-08',
      end_date: '2026-01-08',
      total_assigned: 10,
      total_closed: 9,
      agents_by_day: [
        {
          date: '2026-01-08',
          agent_name: '',
          agent_email: 'agent1@example.com',
          assigned_count: 5,
          closed_count: 5,
        },
        {
          date: '2026-01-08',
          agent_name: '',
          agent_email: 'agent2@example.com',
          assigned_count: 5,
          closed_count: 4,
        },
      ],
    },
  },
}

// Empty state
export const Empty: Story = {
  args: {
    loading: false,
    data: {
      airline_name: 'Clic Air',
      start_date: '2026-01-01',
      end_date: '2026-01-08',
      total_assigned: 0,
      total_closed: 0,
      agents_by_day: [],
    },
  },
}

// Loading state
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

// Dark theme example
export const DarkTheme: Story = {
  args: {
    ...Default.args,
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

// High volume example
export const HighVolume: Story = {
  args: {
    loading: false,
    data: {
      airline_name: 'Clic Air',
      start_date: '2026-01-08',
      end_date: '2026-01-08',
      total_assigned: 250,
      total_closed: 235,
      agents_by_day: [
        {
          date: '2026-01-08',
          agent_name: 'Top Performer',
          agent_email: 'top.performer@example.com',
          assigned_count: 50,
          closed_count: 48,
        },
        {
          date: '2026-01-08',
          agent_name: 'High Achiever',
          agent_email: 'high.achiever@example.com',
          assigned_count: 45,
          closed_count: 43,
        },
        {
          date: '2026-01-08',
          agent_name: 'Star Agent',
          agent_email: 'star.agent@example.com',
          assigned_count: 40,
          closed_count: 38,
        },
        {
          date: '2026-01-08',
          agent_name: 'Senior Agent',
          agent_email: 'senior.agent@example.com',
          assigned_count: 35,
          closed_count: 34,
        },
        {
          date: '2026-01-08',
          agent_name: 'Regular Agent',
          agent_email: 'regular.agent@example.com',
          assigned_count: 30,
          closed_count: 29,
        },
        {
          date: '2026-01-08',
          agent_name: 'Junior Agent',
          agent_email: 'junior.agent@example.com',
          assigned_count: 25,
          closed_count: 22,
        },
        {
          date: '2026-01-08',
          agent_name: 'New Agent',
          agent_email: 'new.agent@example.com',
          assigned_count: 25,
          closed_count: 21,
        },
      ],
    },
  },
}
