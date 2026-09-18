import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DailyCostTrends from './DailyCostTrends.vue';

const meta: Meta<typeof DailyCostTrends> = {
  title: 'Charts/CostTokens/DailyCostTrends',
  component: DailyCostTrends,
  tags: ['autodocs'],
  argTypes: {
    costData: { control: 'object' },
    conversationData: { control: 'object' },
    loading: { control: 'boolean' },
    metricType: {
      control: 'select',
      options: ['per_conversation', 'per_interaction'],
    },
    scopeBreakdown: {
      control: 'select',
      options: ['all'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DailyCostTrends>;

interface CostDayData {
  input_tokens: number;
  output_tokens: number;
  cache_read_tokens: number;
  cache_write_tokens: number;
  total_tokens: number;
  input_cost: number;
  output_cost: number;
  cache_read_cost: number;
  cache_write_cost: number;
  total_cost: number;
}

interface MockDataset {
  airline_name: string;
  start_date: string;
  end_date: string;
  costs_by_day: Record<string, CostDayData>;
  total_cost: number;
  avg_cost_per_conversation: number;
  daily_mean_cost_per_conversation: Array<{ date: string; value: number }>;
}

interface MockConversationDataset {
  airline_name: string;
  start_date: string;
  end_date: string;
  total_conversations: number;
  conversations_by_day: Record<string, number>;
}

/** Builds a realistic mock with backend daily_mean_cost_per_conversation series. */
function buildMockDataset(
  airlineName: string,
  startDate: string,
  days: number,
  meanCostPattern: (dayIndex: number) => number,
): { costData: MockDataset; conversationData: MockConversationDataset } {
  const start = new Date(`${startDate}T00:00:00`);
  const costsByDay: Record<string, CostDayData> = {};
  const conversationsByDay: Record<string, number> = {};
  const dailyMeanSeries: Array<{ date: string; value: number }> = [];
  let totalCost = 0;
  let totalConversations = 0;

  for (let i = 0; i < days; i += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const dateKey = date.toISOString().slice(0, 10);
    const conversations = 8 + ((i * 3) % 11);
    const meanCost = meanCostPattern(i);
    const dayTotalCost = meanCost * conversations;

    conversationsByDay[dateKey] = conversations;
    dailyMeanSeries.push({ date: dateKey, value: meanCost });
    totalCost += dayTotalCost;
    totalConversations += conversations;

    const inputShare = 0.72;
    const outputShare = 0.28;
    costsByDay[dateKey] = {
      input_tokens: Math.round(dayTotalCost * 420_000),
      output_tokens: Math.round(dayTotalCost * 18_000),
      cache_read_tokens: Math.round(dayTotalCost * 1_200_000),
      cache_write_tokens: 0,
      total_tokens: Math.round(dayTotalCost * 1_638_000),
      input_cost: dayTotalCost * inputShare,
      output_cost: dayTotalCost * outputShare,
      cache_read_cost: 0,
      cache_write_cost: 0,
      total_cost: dayTotalCost,
    };
  }

  const endDate = new Date(start);
  endDate.setDate(start.getDate() + days - 1);

  const costData: MockDataset = {
    airline_name: airlineName,
    start_date: startDate,
    end_date: endDate.toISOString().slice(0, 10),
    costs_by_day: costsByDay,
    total_cost: totalCost,
    avg_cost_per_conversation: totalCost / totalConversations,
    daily_mean_cost_per_conversation: dailyMeanSeries,
  };

  const conversationData: MockConversationDataset = {
    airline_name: airlineName,
    start_date: startDate,
    end_date: endDate.toISOString().slice(0, 10),
    total_conversations: totalConversations,
    conversations_by_day: conversationsByDay,
  };

  return { costData, conversationData };
}

/** Wave pattern similar to the Average cost design mock (Mar 1–15). */
const marchMock = buildMockDataset('Avianca', '2026-03-01', 15, (i) => {
  const wave = [0.018, 0.022, 0.019, 0.024, 0.028, 0.026, 0.021, 0.017, 0.02, 0.025, 0.03, 0.032, 0.027, 0.023, 0.019];
  return wave[i % wave.length];
});

/** Fuller month for scroll / axis density checks. */
const monthMock = buildMockDataset('Clic Air', '2026-01-01', 31, (i) => {
  const base = 0.014 + Math.sin(i / 4) * 0.006;
  const spike = i === 10 || i === 22 ? 0.009 : 0;
  return Math.max(0.008, base + spike);
});

/** Short sparse dataset (legacy fallback path without backend series). */
const sparseCostData = {
  airline_name: 'Clic Air',
  start_date: '2026-01-07',
  end_date: '2026-01-08',
  costs_by_day: {
    '2026-01-07': {
      input_tokens: 208625,
      output_tokens: 8836,
      cache_read_tokens: 675072,
      cache_write_tokens: 0,
      total_tokens: 892533,
      input_cost: 0.41725,
      output_cost: 0.070688,
      cache_read_cost: 0,
      cache_write_cost: 0,
      total_cost: 0.487938,
    },
    '2026-01-08': {
      input_tokens: 302019,
      output_tokens: 11655,
      cache_read_tokens: 422656,
      cache_write_tokens: 0,
      total_tokens: 736330,
      input_cost: 0.604038,
      output_cost: 0.09324,
      cache_read_cost: 0,
      cache_write_cost: 0,
      total_cost: 0.697278,
    },
  },
  total_cost: 1.185216,
  avg_cost_per_conversation: 0.0790144,
};

const sparseConversationData = {
  airline_name: 'Clic Air',
  start_date: '2026-01-07',
  end_date: '2026-01-08',
  total_conversations: 15,
  conversations_by_day: {
    '2026-01-07': 6,
    '2026-01-08': 9,
  },
};

export const Default: Story = {
  args: {
    costData: marchMock.costData,
    conversationData: marchMock.conversationData,
  },
};

export const FullMonth: Story = {
  args: {
    costData: monthMock.costData,
    conversationData: monthMock.conversationData,
  },
};

export const SparseFallback: Story = {
  name: 'Sparse (computed fallback)',
  args: {
    costData: sparseCostData,
    conversationData: sparseConversationData,
  },
};

export const Empty: Story = {
  args: {
    costData: {
      costs_by_day: {},
      daily_mean_cost_per_conversation: [],
    },
    conversationData: {
      conversations_by_day: {},
    },
  },
};

export const MissingConversationData: Story = {
  args: {
    costData: marchMock.costData,
    conversationData: {
      conversations_by_day: {},
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    costData: marchMock.costData,
    conversationData: marchMock.conversationData,
  },
};

export const DarkTheme: Story = {
  args: {
    costData: marchMock.costData,
    conversationData: marchMock.conversationData,
    theme: 'dark',
  },
};
