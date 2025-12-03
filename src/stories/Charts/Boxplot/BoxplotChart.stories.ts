import type { Meta, StoryObj } from '@storybook/vue3';
import BoxplotChart from './BoxplotChart.vue';

const meta: Meta<typeof BoxplotChart> = {
  title: 'Charts/Boxplot',
  component: BoxplotChart,
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
type Story = StoryObj<typeof BoxplotChart>;

// Helper function to calculate boxplot positions
const calculateBoxplotPositions = (data: any[], chartWidth: number, chartHeight: number, chartMargin: number, chartBottomMargin: number) => {
  const plotWidth = chartWidth - 2 * chartMargin;
  const plotHeight = chartHeight - chartMargin - chartBottomMargin;
  const boxWidth = plotWidth / (data.length + 1);

  return data.map((item, index) => {
    const centerX = chartMargin + boxWidth * (index + 1);
    
    // Normalize values (assuming range 1-10)
    const normalizeY = (value: number) => {
      const normalized = (value - 1) / 9;
      return chartMargin + plotHeight - (normalized * plotHeight);
    };

    return {
      ...item,
      centerX,
      minY: normalizeY(item.min),
      q1Y: normalizeY(item.q1),
      medianY: normalizeY(item.median),
      q3Y: normalizeY(item.q3),
      maxY: normalizeY(item.max),
      averageY: item.average ? normalizeY(item.average) : undefined,
    };
  });
};

// Data: Weekly performance scores
const weeklyScores = calculateBoxplotPositions([
  {
    label: 'week 1',
    min: 3.5,
    q1: 5.2,
    median: 6.8,
    q3: 8.1,
    max: 9.2,
    average: 6.9,
    responseCount: 45,
    isTotal: false,
  },
  {
    label: 'week 2',
    min: 4.0,
    q1: 5.8,
    median: 7.2,
    q3: 8.4,
    max: 9.5,
    average: 7.3,
    responseCount: 52,
    isTotal: false,
  },
  {
    label: 'week 3',
    min: 3.8,
    q1: 6.0,
    median: 7.5,
    q3: 8.6,
    max: 9.8,
    average: 7.6,
    responseCount: 48,
    isTotal: false,
  },
  {
    label: 'total',
    min: 3.5,
    q1: 5.7,
    median: 7.2,
    q3: 8.4,
    max: 9.8,
    average: 7.3,
    responseCount: 145,
    isTotal: true,
  },
], 800, 400, 70, 90);

// Data: Monthly satisfaction ratings
const monthlySatisfaction = calculateBoxplotPositions([
  {
    label: 'january',
    min: 4.2,
    q1: 6.0,
    median: 7.5,
    q3: 8.5,
    max: 9.5,
    average: 7.4,
    responseCount: 120,
    isTotal: false,
  },
  {
    label: 'february',
    min: 4.5,
    q1: 6.2,
    median: 7.8,
    q3: 8.7,
    max: 9.6,
    average: 7.7,
    responseCount: 135,
    isTotal: false,
  },
  {
    label: 'march',
    min: 4.0,
    q1: 6.5,
    median: 8.0,
    q3: 9.0,
    max: 9.8,
    average: 7.9,
    responseCount: 142,
    isTotal: false,
  },
], 800, 400, 70, 90);

// Data: Product ratings comparison
const productRatings = calculateBoxplotPositions([
  {
    label: 'product A',
    min: 5.0,
    q1: 6.5,
    median: 7.8,
    q3: 8.8,
    max: 9.5,
    average: 7.7,
    responseCount: 89,
    isTotal: false,
  },
  {
    label: 'product B',
    min: 4.5,
    q1: 6.0,
    median: 7.5,
    q3: 8.5,
    max: 9.3,
    average: 7.4,
    responseCount: 76,
    isTotal: false,
  },
  {
    label: 'product C',
    min: 5.5,
    q1: 7.0,
    median: 8.2,
    q3: 9.0,
    max: 9.8,
    average: 8.1,
    responseCount: 92,
    isTotal: false,
  },
  {
    label: 'product D',
    min: 4.0,
    q1: 5.8,
    median: 7.2,
    q3: 8.3,
    max: 9.2,
    average: 7.1,
    responseCount: 68,
    isTotal: false,
  },
], 800, 400, 70, 90);

// Data: Quarterly metrics
const quarterlyMetrics = calculateBoxplotPositions([
  {
    label: 'Q1',
    min: 4.5,
    q1: 6.2,
    median: 7.5,
    q3: 8.5,
    max: 9.3,
    average: 7.4,
    responseCount: 234,
    isTotal: false,
  },
  {
    label: 'Q2',
    min: 5.0,
    q1: 6.8,
    median: 8.0,
    q3: 8.9,
    max: 9.6,
    average: 7.9,
    responseCount: 267,
    isTotal: false,
  },
  {
    label: 'Q3',
    min: 5.2,
    q1: 7.0,
    median: 8.2,
    q3: 9.0,
    max: 9.7,
    average: 8.1,
    responseCount: 289,
    isTotal: false,
  },
  {
    label: 'Q4',
    min: 4.8,
    q1: 6.5,
    median: 7.8,
    q3: 8.7,
    max: 9.5,
    average: 7.7,
    responseCount: 256,
    isTotal: false,
  },
  {
    label: 'total',
    min: 4.5,
    q1: 6.6,
    median: 7.9,
    q3: 8.8,
    max: 9.7,
    average: 7.8,
    responseCount: 1046,
    isTotal: true,
  },
], 800, 400, 70, 90);

// Story: Default - Weekly scores
export const Default: Story = {
  args: {
    boxplotData: weeklyScores,
    showLegend: true,
  },
};

// Story: Monthly satisfaction
export const MonthlySatisfaction: Story = {
  args: {
    boxplotData: monthlySatisfaction,
    showLegend: true,
  },
};

// Story: Product ratings comparison
export const ProductComparison: Story = {
  args: {
    boxplotData: productRatings,
    showLegend: true,
  },
};

// Story: Quarterly metrics with total
export const QuarterlyMetrics: Story = {
  args: {
    boxplotData: quarterlyMetrics,
    showLegend: true,
  },
};

// Story: Without legend
export const WithoutLegend: Story = {
  args: {
    boxplotData: weeklyScores,
    showLegend: false,
  },
};

// Story: Custom dimensions
export const CustomSize: Story = {
  args: {
    boxplotData: calculateBoxplotPositions([
      {
        label: 'group 1',
        min: 3.0,
        q1: 5.0,
        median: 7.0,
        q3: 8.5,
        max: 9.5,
        average: 6.8,
        responseCount: 50,
        isTotal: false,
      },
      {
        label: 'group 2',
        min: 4.0,
        q1: 6.0,
        median: 7.5,
        q3: 8.8,
        max: 9.8,
        average: 7.4,
        responseCount: 55,
        isTotal: false,
      },
    ], 1000, 500, 80, 100),
    showLegend: true,
    chartWidth: 1000,
    chartHeight: 500,
    chartMargin: 80,
    chartBottomMargin: 100,
  },
};

