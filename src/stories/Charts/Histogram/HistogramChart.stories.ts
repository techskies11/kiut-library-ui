import type { Meta, StoryObj } from '@storybook/vue3';
import HistogramChart from './HistogramChart.vue';

const meta: Meta<typeof HistogramChart> = {
  title: 'Charts/Histogram',
  component: HistogramChart,
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
      defaultValue: 450,
    },
  },
};

export default meta;
type Story = StoryObj<typeof HistogramChart>;

// Data: Normal distribution centered around 7
const normalDistribution = [
  { score: 1, count: 5 },
  { score: 2, count: 8 },
  { score: 3, count: 15 },
  { score: 4, count: 28 },
  { score: 5, count: 45 },
  { score: 6, count: 68 },
  { score: 7, count: 85 },
  { score: 8, count: 70 },
  { score: 9, count: 42 },
  { score: 10, count: 20 },
];

// Data: Skewed left (high scores)
const skewedLeft = [
  { score: 1, count: 3 },
  { score: 2, count: 5 },
  { score: 3, count: 8 },
  { score: 4, count: 12 },
  { score: 5, count: 20 },
  { score: 6, count: 35 },
  { score: 7, count: 55 },
  { score: 8, count: 75 },
  { score: 9, count: 95 },
  { score: 10, count: 110 },
];

// Data: Skewed right (low scores)
const skewedRight = [
  { score: 1, count: 120 },
  { score: 2, count: 95 },
  { score: 3, count: 70 },
  { score: 4, count: 50 },
  { score: 5, count: 35 },
  { score: 6, count: 22 },
  { score: 7, count: 15 },
  { score: 8, count: 10 },
  { score: 9, count: 6 },
  { score: 10, count: 3 },
];

// Data: Bimodal distribution (two peaks)
const bimodal = [
  { score: 1, count: 15 },
  { score: 2, count: 25 },
  { score: 3, count: 65 },
  { score: 4, count: 50 },
  { score: 5, count: 30 },
  { score: 6, count: 35 },
  { score: 7, count: 45 },
  { score: 8, count: 70 },
  { score: 9, count: 28 },
  { score: 10, count: 12 },
];

// Data: Uniform distribution
const uniform = [
  { score: 1, count: 48 },
  { score: 2, count: 52 },
  { score: 3, count: 50 },
  { score: 4, count: 49 },
  { score: 5, count: 51 },
  { score: 6, count: 50 },
  { score: 7, count: 48 },
  { score: 8, count: 52 },
  { score: 9, count: 49 },
  { score: 10, count: 51 },
];

// Data: Customer satisfaction scores
const customerSatisfaction = [
  { score: 1, count: 8 },
  { score: 2, count: 12 },
  { score: 3, count: 18 },
  { score: 4, count: 25 },
  { score: 5, count: 35 },
  { score: 6, count: 48 },
  { score: 7, count: 62 },
  { score: 8, count: 75 },
  { score: 9, count: 58 },
  { score: 10, count: 42 },
];

// Story: Default - Normal distribution
export const Default: Story = {
  args: {
    histogram: normalDistribution,
    minScore: 2.5,
    q1Score: 5.0,
    medianScore: 7.0,
    q3Score: 8.5,
    maxScore: 9.8,
    averageScore: 6.8,
    showLegend: true,
  },
};

// Story: Skewed left (high scores)
export const SkewedLeft: Story = {
  args: {
    histogram: skewedLeft,
    minScore: 1.5,
    q1Score: 6.0,
    medianScore: 8.2,
    q3Score: 9.5,
    maxScore: 10.0,
    averageScore: 7.8,
    showLegend: true,
  },
};

// Story: Skewed right (low scores)
export const SkewedRight: Story = {
  args: {
    histogram: skewedRight,
    minScore: 1.0,
    q1Score: 1.8,
    medianScore: 3.2,
    q3Score: 5.0,
    maxScore: 8.5,
    averageScore: 3.5,
    showLegend: true,
  },
};

// Story: Bimodal distribution
export const Bimodal: Story = {
  args: {
    histogram: bimodal,
    minScore: 1.5,
    q1Score: 3.2,
    medianScore: 5.8,
    q3Score: 8.0,
    maxScore: 9.5,
    averageScore: 5.9,
    showLegend: true,
  },
};

// Story: Uniform distribution
export const Uniform: Story = {
  args: {
    histogram: uniform,
    minScore: 1.0,
    q1Score: 3.5,
    medianScore: 5.5,
    q3Score: 7.5,
    maxScore: 10.0,
    averageScore: 5.5,
    showLegend: true,
  },
};

// Story: Customer satisfaction
export const CustomerSatisfaction: Story = {
  args: {
    histogram: customerSatisfaction,
    minScore: 1.8,
    q1Score: 5.2,
    medianScore: 7.5,
    q3Score: 8.8,
    maxScore: 9.9,
    averageScore: 7.2,
    showLegend: true,
  },
};

// Story: Without legend
export const WithoutLegend: Story = {
  args: {
    histogram: normalDistribution,
    minScore: 2.5,
    q1Score: 5.0,
    medianScore: 7.0,
    q3Score: 8.5,
    maxScore: 9.8,
    averageScore: 6.8,
    showLegend: false,
  },
};

// Story: Custom dimensions
export const CustomSize: Story = {
  args: {
    histogram: normalDistribution,
    minScore: 2.5,
    q1Score: 5.0,
    medianScore: 7.0,
    q3Score: 8.5,
    maxScore: 9.8,
    averageScore: 6.8,
    showLegend: true,
    chartWidth: 1000,
    chartHeight: 500,
    chartMargin: 70,
    chartBottomMargin: 90,
  },
};

// Story: High variance
export const HighVariance: Story = {
  args: {
    histogram: [
      { score: 1, count: 40 },
      { score: 2, count: 35 },
      { score: 3, count: 30 },
      { score: 4, count: 28 },
      { score: 5, count: 25 },
      { score: 6, count: 26 },
      { score: 7, count: 30 },
      { score: 8, count: 32 },
      { score: 9, count: 38 },
      { score: 10, count: 42 },
    ],
    minScore: 1.2,
    q1Score: 3.0,
    medianScore: 5.5,
    q3Score: 8.0,
    maxScore: 9.8,
    averageScore: 5.6,
    showLegend: true,
  },
};

// Story: Low variance (concentrated)
export const LowVariance: Story = {
  args: {
    histogram: [
      { score: 1, count: 2 },
      { score: 2, count: 5 },
      { score: 3, count: 10 },
      { score: 4, count: 25 },
      { score: 5, count: 55 },
      { score: 6, count: 80 },
      { score: 7, count: 75 },
      { score: 8, count: 30 },
      { score: 9, count: 12 },
      { score: 10, count: 4 },
    ],
    minScore: 3.5,
    q1Score: 5.2,
    medianScore: 6.2,
    q3Score: 7.0,
    maxScore: 8.5,
    averageScore: 6.1,
    showLegend: true,
  },
};





