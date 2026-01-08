import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ModelUsage from './ModelUsage.vue';

const meta: Meta<typeof ModelUsage> = {
  title: 'Charts/CostTokens/ModelUsage',
  component: ModelUsage,
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
type Story = StoryObj<typeof ModelUsage>;

const mockData = {
  "airline_name": "Clic Air",
  "start_date": "2026-01-01",
  "end_date": "2026-01-08",
  "model_usage_by_day": {
    "2026-01-07": {
      "by_provider": {
        "OPEN_AI": {
          "message_count": 74,
          "total_tokens": 892533,
          "total_cost": 0.487938,
          "avg_tokens_per_message": 12061.26,
          "avg_cost_per_message": 0.006593
        }
      },
      "by_model": {
        "gpt-4.1-2025-04-14": {
          "message_count": 74,
          "total_tokens": 892533,
          "total_cost": 0.487938,
          "avg_tokens_per_message": 12061.26,
          "avg_cost_per_message": 0.006593
        }
      }
    },
    "2026-01-08": {
      "by_provider": {
        "OPEN_AI": {
          "message_count": 93,
          "total_tokens": 736330,
          "total_cost": 0.697278,
          "avg_tokens_per_message": 7917.52,
          "avg_cost_per_message": 0.007498
        }
      },
      "by_model": {
        "gpt-4.1-2025-04-14": {
          "message_count": 93,
          "total_tokens": 736330,
          "total_cost": 0.697278,
          "avg_tokens_per_message": 7917.52,
          "avg_cost_per_message": 0.007498
        }
      }
    }
  },
  "total_by_provider": {
    "OPEN_AI": {
      "message_count": 167,
      "total_tokens": 1628863,
      "total_cost": 1.185216,
      "avg_tokens_per_message": 9753.670658682635,
      "avg_cost_per_message": 0.007097101796407186
    }
  },
  "total_by_model": {
    "gpt-4.1-2025-04-14": {
      "message_count": 167,
      "total_tokens": 1628863,
      "total_cost": 1.185216,
      "avg_tokens_per_message": 9753.670658682635,
      "avg_cost_per_message": 0.007097101796407186
    }
  }
};

const mockDataMultipleModels = {
  "airline_name": "Avianca",
  "start_date": "2026-01-01",
  "end_date": "2026-01-15",
  "model_usage_by_day": {
    "2026-01-07": {
      "by_provider": {
        "OPEN_AI": {
          "message_count": 120,
          "total_tokens": 1250000,
          "total_cost": 0.875,
          "avg_tokens_per_message": 10416.67,
          "avg_cost_per_message": 0.00729
        },
        "ANTHROPIC": {
          "message_count": 45,
          "total_tokens": 580000,
          "total_cost": 0.435,
          "avg_tokens_per_message": 12888.89,
          "avg_cost_per_message": 0.00967
        }
      },
      "by_model": {
        "gpt-4.1-2025-04-14": {
          "message_count": 85,
          "total_tokens": 892000,
          "total_cost": 0.625,
          "avg_tokens_per_message": 10494.12,
          "avg_cost_per_message": 0.00735
        },
        "gpt-3.5-turbo": {
          "message_count": 35,
          "total_tokens": 358000,
          "total_cost": 0.250,
          "avg_tokens_per_message": 10228.57,
          "avg_cost_per_message": 0.00714
        },
        "claude-3-sonnet": {
          "message_count": 45,
          "total_tokens": 580000,
          "total_cost": 0.435,
          "avg_tokens_per_message": 12888.89,
          "avg_cost_per_message": 0.00967
        }
      }
    }
  },
  "total_by_provider": {
    "OPEN_AI": {
      "message_count": 450,
      "total_tokens": 4850000,
      "total_cost": 3.425,
      "avg_tokens_per_message": 10777.78,
      "avg_cost_per_message": 0.00761
    },
    "ANTHROPIC": {
      "message_count": 180,
      "total_tokens": 2320000,
      "total_cost": 1.740,
      "avg_tokens_per_message": 12888.89,
      "avg_cost_per_message": 0.00967
    },
    "GOOGLE": {
      "message_count": 120,
      "total_tokens": 1450000,
      "total_cost": 0.870,
      "avg_tokens_per_message": 12083.33,
      "avg_cost_per_message": 0.00725
    }
  },
  "total_by_model": {
    "gpt-4.1-2025-04-14": {
      "message_count": 320,
      "total_tokens": 3450000,
      "total_cost": 2.425,
      "avg_tokens_per_message": 10781.25,
      "avg_cost_per_message": 0.00758
    },
    "gpt-3.5-turbo": {
      "message_count": 130,
      "total_tokens": 1400000,
      "total_cost": 1.000,
      "avg_tokens_per_message": 10769.23,
      "avg_cost_per_message": 0.00769
    },
    "claude-3-sonnet": {
      "message_count": 140,
      "total_tokens": 1800000,
      "total_cost": 1.350,
      "avg_tokens_per_message": 12857.14,
      "avg_cost_per_message": 0.00964
    },
    "claude-3-opus": {
      "message_count": 40,
      "total_tokens": 520000,
      "total_cost": 0.390,
      "avg_tokens_per_message": 13000.00,
      "avg_cost_per_message": 0.00975
    },
    "gemini-pro": {
      "message_count": 120,
      "total_tokens": 1450000,
      "total_cost": 0.870,
      "avg_tokens_per_message": 12083.33,
      "avg_cost_per_message": 0.00725
    }
  }
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const MultipleModels: Story = {
  args: {
    data: mockDataMultipleModels,
  },
};

export const ProviderView: Story = {
  args: {
    data: mockDataMultipleModels,
  },
  play: async ({ canvasElement }) => {
    // Simulate clicking the Provider tab
    const providerButton = canvasElement.querySelector('button[aria-selected="false"]');
    if (providerButton instanceof HTMLElement) {
      providerButton.click();
    }
  },
};

export const Empty: Story = {
  args: {
    data: {
      total_by_provider: {},
      total_by_model: {},
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
    data: mockDataMultipleModels,
    theme: 'dark',
  },
};

export const WithExport: Story = {
  args: {
    data: mockDataMultipleModels,
    enableExport: true,
  },
};

