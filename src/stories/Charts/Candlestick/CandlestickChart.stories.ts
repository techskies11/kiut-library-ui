import type { Meta, StoryObj } from '@storybook/vue3';
import CandlestickChart from './CandlestickChart.vue';

const meta: Meta<typeof CandlestickChart> = {
  title: 'Charts/Candlestick',
  component: CandlestickChart,
  tags: ['autodocs'],
  argTypes: {
    showLegend: {
      control: 'boolean',
      description: 'Show chart legend',
      defaultValue: true,
    },
    chartWidth: {
      control: 'number',
      description: 'Chart width',
      defaultValue: 800,
    },
    chartHeight: {
      control: 'number',
      description: 'Chart height',
      defaultValue: 400,
    },
  },
};

export default meta;
type Story = StoryObj<typeof CandlestickChart>;

// Helper function to calculate candlestick positions
const calculateCandlestickPositions = (
  data: any[],
  chartWidth: number,
  chartHeight: number,
  chartMargin: number,
  chartBottomMargin: number
) => {
  const plotWidth = chartWidth - 2 * chartMargin;
  const plotHeight = chartHeight - chartMargin - chartBottomMargin;
  const candleSpacing = plotWidth / (data.length + 1);

  return data.map((item, index) => {
    const centerX = chartMargin + candleSpacing * (index + 1);
    
    const normalizeY = (value: number) => {
      const normalized = (value - 1) / 9;
      return chartMargin + plotHeight - (normalized * plotHeight);
    };

    return {
      ...item,
      centerX,
      lowY: normalizeY(item.low),
      q1Y: normalizeY(item.q1),
      medianY: normalizeY(item.median),
      q3Y: normalizeY(item.q3),
      highY: normalizeY(item.high),
      averageY: item.average ? normalizeY(item.average) : undefined,
    };
  });
};

// Data: Weekly satisfaction scores
const weeklyScores = calculateCandlestickPositions(
  [
    {
      label: 'week 1',
      low: 3.5,
      q1: 5.2,
      median: 6.8,
      q3: 8.1,
      high: 9.2,
      average: 6.9,
      responseCount: 45,
      isTotal: false,
    },
    {
      label: 'week 2',
      low: 4.0,
      q1: 5.8,
      median: 7.2,
      q3: 8.4,
      high: 9.5,
      average: 7.3,
      responseCount: 52,
      isTotal: false,
    },
    {
      label: 'week 3',
      low: 3.8,
      q1: 6.0,
      median: 7.5,
      q3: 8.6,
      high: 9.8,
      average: 7.6,
      responseCount: 48,
      isTotal: false,
    },
    {
      label: 'total',
      low: 3.5,
      q1: 5.7,
      median: 7.2,
      q3: 8.4,
      high: 9.8,
      average: 7.3,
      responseCount: 145,
      isTotal: true,
    },
  ],
  800,
  400,
  70,
  90
);

// Data: Monthly performance
const monthlyPerformance = calculateCandlestickPositions(
  [
    {
      label: 'january',
      low: 4.2,
      q1: 6.0,
      median: 7.5,
      q3: 8.5,
      high: 9.5,
      average: 7.4,
      responseCount: 120,
      isTotal: false,
    },
    {
      label: 'february',
      low: 4.5,
      q1: 6.2,
      median: 7.8,
      q3: 8.7,
      high: 9.6,
      average: 7.7,
      responseCount: 135,
      isTotal: false,
    },
    {
      label: 'march',
      low: 4.0,
      q1: 6.5,
      median: 8.0,
      q3: 9.0,
      high: 9.8,
      average: 7.9,
      responseCount: 142,
      isTotal: false,
    },
  ],
  800,
  400,
  70,
  90
);

// Data: Agent comparison
const agentComparison = calculateCandlestickPositions(
  [
    {
      label: 'agent 1',
      low: 5.0,
      q1: 6.5,
      median: 7.8,
      q3: 8.8,
      high: 9.5,
      average: 7.7,
      responseCount: 89,
      isTotal: false,
    },
    {
      label: 'agent 2',
      low: 4.5,
      q1: 6.0,
      median: 7.5,
      q3: 8.5,
      high: 9.3,
      average: 7.4,
      responseCount: 76,
      isTotal: false,
    },
    {
      label: 'agent 3',
      low: 5.5,
      q1: 7.0,
      median: 8.2,
      q3: 9.0,
      high: 9.8,
      average: 8.1,
      responseCount: 92,
      isTotal: false,
    },
    {
      label: 'agent 4',
      low: 4.0,
      q1: 5.8,
      median: 7.2,
      q3: 8.3,
      high: 9.2,
      average: 7.1,
      responseCount: 68,
      isTotal: false,
    },
  ],
  800,
  400,
  70,
  90
);

// Data: Quarterly metrics with total
const quarterlyMetrics = calculateCandlestickPositions(
  [
    {
      label: 'Q1 2024',
      low: 4.5,
      q1: 6.2,
      median: 7.5,
      q3: 8.5,
      high: 9.3,
      average: 7.4,
      responseCount: 234,
      isTotal: false,
    },
    {
      label: 'Q2 2024',
      low: 5.0,
      q1: 6.8,
      median: 8.0,
      q3: 8.9,
      high: 9.6,
      average: 7.9,
      responseCount: 267,
      isTotal: false,
    },
    {
      label: 'Q3 2024',
      low: 5.2,
      q1: 7.0,
      median: 8.2,
      q3: 9.0,
      high: 9.7,
      average: 8.1,
      responseCount: 289,
      isTotal: false,
    },
    {
      label: 'Q4 2024',
      low: 4.8,
      q1: 6.5,
      median: 7.8,
      q3: 8.7,
      high: 9.5,
      average: 7.7,
      responseCount: 256,
      isTotal: false,
    },
    {
      label: 'total',
      low: 4.5,
      q1: 6.6,
      median: 7.9,
      q3: 8.8,
      high: 9.7,
      average: 7.8,
      responseCount: 1046,
      isTotal: true,
    },
  ],
  800,
  400,
  70,
  90
);

// Data: Product ratings
const productRatings = calculateCandlestickPositions(
  [
    {
      label: 'product A',
      low: 5.5,
      q1: 7.0,
      median: 8.2,
      q3: 9.0,
      high: 9.8,
      average: 8.1,
      responseCount: 156,
      isTotal: false,
    },
    {
      label: 'product B',
      low: 4.2,
      q1: 5.8,
      median: 7.0,
      q3: 8.2,
      high: 9.0,
      average: 6.9,
      responseCount: 142,
      isTotal: false,
    },
    {
      label: 'product C',
      low: 6.0,
      q1: 7.5,
      median: 8.5,
      q3: 9.2,
      high: 9.9,
      average: 8.4,
      responseCount: 178,
      isTotal: false,
    },
  ],
  800,
  400,
  70,
  90
);

// Story: Default - Weekly scores
export const Default: Story = {
  args: {
    candlestickData: weeklyScores,
    showLegend: true,
  },
};

// Story: Monthly performance
export const MonthlyPerformance: Story = {
  args: {
    candlestickData: monthlyPerformance,
    showLegend: true,
  },
};

// Story: Agent comparison
export const AgentComparison: Story = {
  args: {
    candlestickData: agentComparison,
    showLegend: true,
  },
};

// Story: Quarterly metrics with total
export const QuarterlyMetrics: Story = {
  args: {
    candlestickData: quarterlyMetrics,
    showLegend: true,
  },
};

// Story: Product ratings
export const ProductRatings: Story = {
  args: {
    candlestickData: productRatings,
    showLegend: true,
  },
};

// Story: Without legend
export const WithoutLegend: Story = {
  args: {
    candlestickData: weeklyScores,
    showLegend: false,
  },
};

// Story: Custom dimensions
export const CustomSize: Story = {
  args: {
    candlestickData: calculateCandlestickPositions(
      [
        {
          label: 'group 1',
          low: 3.0,
          q1: 5.0,
          median: 7.0,
          q3: 8.5,
          high: 9.5,
          average: 6.8,
          responseCount: 50,
          isTotal: false,
        },
        {
          label: 'group 2',
          low: 4.0,
          q1: 6.0,
          median: 7.5,
          q3: 8.8,
          high: 9.8,
          average: 7.4,
          responseCount: 55,
          isTotal: false,
        },
      ],
      1000,
      500,
      80,
      100
    ),
    showLegend: true,
    chartWidth: 1000,
    chartHeight: 500,
    chartMargin: 80,
    chartBottomMargin: 100,
  },
};

