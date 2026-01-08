import type { Meta, StoryObj } from '@storybook/vue3-vite';
import MessageRoles from './MessageRoles.vue';

const meta: Meta<typeof MessageRoles> = {
  title: 'Charts/CostTokens/MessageRoles',
  component: MessageRoles,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' },
    loading: { control: 'boolean' },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
    enableExport: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof MessageRoles>;

const mockData = {
  "airline_name": "Clic Air",
  "start_date": "2026-01-01",
  "end_date": "2026-01-08",
  "message_role_by_day": {
    "2026-01-07": {
      "assistant": {
        "message_count": 74,
        "total_tokens": 892533,
        "total_cost": 0.487938,
        "avg_tokens_per_message": 12061.256756756757,
        "avg_cost_per_message": 0.006593756756756757
      },
      "user": {
        "message_count": 65,
        "total_tokens": 0,
        "total_cost": 0.0,
        "avg_tokens_per_message": 0.0,
        "avg_cost_per_message": 0.0
      }
    },
    "2026-01-08": {
      "assistant": {
        "message_count": 93,
        "total_tokens": 736330,
        "total_cost": 0.697278,
        "avg_tokens_per_message": 7917.5268817204305,
        "avg_cost_per_message": 0.0074976129032258065
      },
      "user": {
        "message_count": 106,
        "total_tokens": 0,
        "total_cost": 0.0,
        "avg_tokens_per_message": 0.0,
        "avg_cost_per_message": 0.0
      }
    }
  },
  "total_by_role": {
    "assistant": {
      "message_count": 167,
      "total_tokens": 1628863,
      "total_cost": 1.185216,
      "avg_tokens_per_message": 9753.670658682635,
      "avg_cost_per_message": 0.007097101796407186
    },
    "user": {
      "message_count": 171,
      "total_tokens": 0,
      "total_cost": 0.0,
      "avg_tokens_per_message": 0.0,
      "avg_cost_per_message": 0.0
    }
  }
};

const mockDataWithSystem = {
  "airline_name": "Avianca",
  "start_date": "2026-01-01",
  "end_date": "2026-01-15",
  "message_role_by_day": {
    "2026-01-07": {
      "assistant": {
        "message_count": 150,
        "total_tokens": 1890000,
        "total_cost": 1.245,
        "avg_tokens_per_message": 12600.0,
        "avg_cost_per_message": 0.0083
      },
      "system": {
        "message_count": 150,
        "total_tokens": 45000,
        "total_cost": 0.0225,
        "avg_tokens_per_message": 300.0,
        "avg_cost_per_message": 0.00015
      },
      "user": {
        "message_count": 145,
        "total_tokens": 0,
        "total_cost": 0.0,
        "avg_tokens_per_message": 0.0,
        "avg_cost_per_message": 0.0
      }
    },
    "2026-01-08": {
      "assistant": {
        "message_count": 180,
        "total_tokens": 2268000,
        "total_cost": 1.494,
        "avg_tokens_per_message": 12600.0,
        "avg_cost_per_message": 0.0083
      },
      "system": {
        "message_count": 180,
        "total_tokens": 54000,
        "total_cost": 0.027,
        "avg_tokens_per_message": 300.0,
        "avg_cost_per_message": 0.00015
      },
      "user": {
        "message_count": 175,
        "total_tokens": 0,
        "total_cost": 0.0,
        "avg_tokens_per_message": 0.0,
        "avg_cost_per_message": 0.0
      }
    }
  },
  "total_by_role": {
    "assistant": {
      "message_count": 330,
      "total_tokens": 4158000,
      "total_cost": 2.739,
      "avg_tokens_per_message": 12600.0,
      "avg_cost_per_message": 0.0083
    },
    "system": {
      "message_count": 330,
      "total_tokens": 99000,
      "total_cost": 0.0495,
      "avg_tokens_per_message": 300.0,
      "avg_cost_per_message": 0.00015
    },
    "user": {
      "message_count": 320,
      "total_tokens": 0,
      "total_cost": 0.0,
      "avg_tokens_per_message": 0.0,
      "avg_cost_per_message": 0.0
    }
  }
};

const mockDataOnlyAssistant = {
  "airline_name": "Test Airline",
  "start_date": "2026-01-01",
  "end_date": "2026-01-08",
  "message_role_by_day": {
    "2026-01-07": {
      "assistant": {
        "message_count": 100,
        "total_tokens": 1200000,
        "total_cost": 0.792,
        "avg_tokens_per_message": 12000.0,
        "avg_cost_per_message": 0.00792
      }
    }
  },
  "total_by_role": {
    "assistant": {
      "message_count": 100,
      "total_tokens": 1200000,
      "total_cost": 0.792,
      "avg_tokens_per_message": 12000.0,
      "avg_cost_per_message": 0.00792
    }
  }
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const WithSystem: Story = {
  args: {
    data: mockDataWithSystem,
  },
};

export const OnlyAssistant: Story = {
  args: {
    data: mockDataOnlyAssistant,
  },
};

export const Empty: Story = {
  args: {
    data: {
      total_by_role: {},
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
    data: mockDataWithSystem,
    theme: 'dark',
  },
};

export const WithExport: Story = {
  args: {
    data: mockDataWithSystem,
    enableExport: true,
  },
};

