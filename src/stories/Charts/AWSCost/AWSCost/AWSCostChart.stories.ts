import type { Meta, StoryObj } from '@storybook/vue3-vite';
import AWSCostChart from './AWSCostChart.vue';

const meta: Meta<typeof AWSCostChart> = {
  title: 'Charts/AWS/AWSCostChart',
  component: AWSCostChart,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof AWSCostChart>;

const mockData = {
  airline_name: "Aeroméxico",
  start_date: "2023-10-01",
  end_date: "2023-10-15",
  daily: [
    { date: "01-10", aws_cost: 120.5, total_conversations: 1500, airline_conversations: 450, allocated_cost: 110.2 },
    { date: "02-10", aws_cost: 135.2, total_conversations: 1650, airline_conversations: 480, allocated_cost: 125.5 },
    { date: "03-10", aws_cost: 115.8, total_conversations: 1400, airline_conversations: 420, allocated_cost: 105.3 },
    { date: "04-10", aws_cost: 150.0, total_conversations: 1800, airline_conversations: 550, allocated_cost: 140.8 },
    { date: "05-10", aws_cost: 142.3, total_conversations: 1700, airline_conversations: 510, allocated_cost: 132.4 },
    { date: "06-10", aws_cost: 128.7, total_conversations: 1550, airline_conversations: 470, allocated_cost: 118.9 },
    { date: "07-10", aws_cost: 133.4, total_conversations: 1600, airline_conversations: 490, allocated_cost: 124.6 },
    { date: "08-10", aws_cost: 145.2, total_conversations: 1750, airline_conversations: 530, allocated_cost: 138.2 },
    { date: "09-10", aws_cost: 158.9, total_conversations: 1900, airline_conversations: 580, allocated_cost: 148.5 },
    { date: "10-10", aws_cost: 122.4, total_conversations: 1500, airline_conversations: 440, allocated_cost: 112.1 },
    { date: "11-10", aws_cost: 131.7, total_conversations: 1600, airline_conversations: 490, allocated_cost: 121.3 },
    { date: "12-10", aws_cost: 148.5, total_conversations: 1800, airline_conversations: 540, allocated_cost: 139.7 },
    { date: "13-10", aws_cost: 155.3, total_conversations: 1850, airline_conversations: 560, allocated_cost: 146.8 },
    { date: "14-10", aws_cost: 140.1, total_conversations: 1700, airline_conversations: 520, allocated_cost: 131.4 },
    { date: "15-10", aws_cost: 147.6, total_conversations: 1750, airline_conversations: 530, allocated_cost: 140.2 }
  ],
  total_allocated_cost: 1945.9,
  total_cost: 2097.6,
  total_conversations: 25550,
  total_airline_conversations: 7640
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const Empty: Story = {
  args: {
    data: {
      airline_name: "Sin Datos S.A.",
      start_date: "2023-11-01",
      end_date: "2023-11-07",
      daily: [],
      total_allocated_cost: 0,
      total_cost: 0,
      total_conversations: 0,
      total_airline_conversations: 0
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    data: mockData,
  },
};

