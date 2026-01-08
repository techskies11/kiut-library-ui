import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ConversationCount from './ConversationCount.vue';

const meta: Meta<typeof ConversationCount> = {
  title: 'Charts/CostTokens/ConversationCount',
  component: ConversationCount,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' },
    loading: { control: 'boolean' },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConversationCount>;

const mockData = {
  "airline_name": "Clic Air",
  "start_date": "2026-01-01",
  "end_date": "2026-01-08",
  "total_conversations": 15,
  "conversations_by_day": {
    "2026-01-07": 6,
    "2026-01-08": 9
  }
};

const mockDataExtended = {
  "airline_name": "Clic Air",
  "start_date": "2026-01-01",
  "end_date": "2026-01-08",
  "total_conversations": 48,
  "conversations_by_day": {
    "2026-01-01": 5,
    "2026-01-02": 7,
    "2026-01-03": 4,
    "2026-01-04": 8,
    "2026-01-05": 6,
    "2026-01-06": 9,
    "2026-01-07": 10,
    "2026-01-08": 9
  }
};

const mockDataHighVolume = {
  "airline_name": "Avianca",
  "start_date": "2026-01-01",
  "end_date": "2026-01-15",
  "total_conversations": 247,
  "conversations_by_day": {
    "2026-01-01": 12,
    "2026-01-02": 18,
    "2026-01-03": 15,
    "2026-01-04": 20,
    "2026-01-05": 16,
    "2026-01-06": 22,
    "2026-01-07": 19,
    "2026-01-08": 25,
    "2026-01-09": 14,
    "2026-01-10": 17,
    "2026-01-11": 21,
    "2026-01-12": 16,
    "2026-01-13": 18,
    "2026-01-14": 10,
    "2026-01-15": 24
  }
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const Extended: Story = {
  args: {
    data: mockDataExtended,
  },
};

export const HighVolume: Story = {
  args: {
    data: mockDataHighVolume,
  },
};

export const Empty: Story = {
  args: {
    data: {
      conversations_by_day: {},
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    data: mockData,
  },
};

export const DarkTheme: Story = {
  args: {
    data: mockDataExtended,
    theme: 'dark',
  },
};

