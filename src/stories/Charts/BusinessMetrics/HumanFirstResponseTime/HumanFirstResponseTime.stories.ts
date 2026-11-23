import type { Meta, StoryObj } from "@storybook/vue3";
import HumanFirstResponseTime from "./HumanFirstResponseTime.vue";

const meta = {
  title: "Charts/BusinessMetrics/HumanFirstResponseTime",
  component: HumanFirstResponseTime,
  tags: ["autodocs"],
  argTypes: {
    loading: { control: "boolean" },
    error: { control: "boolean" },
    items: { control: "object" },
  },
  decorators: [
    () => ({
      template:
        '<div class="box-border w-full max-w-3xl px-2 py-4"><story /></div>',
    }),
  ],
} satisfies Meta<typeof HumanFirstResponseTime>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  { agent: "Ana Ruiz", minutes: 1.2 },
  { agent: "Carlos Méndez", minutes: 4.5 },
  { agent: "Laura Gómez", minutes: 8.1 },
  { agent: "Diego Pardo", minutes: 12.4 },
];

export const Default: Story = {
  args: {
    title: "Human first response time",
    subtitle: "Average until the first reply: 6m 20s. Bars are each agent's average in minutes.",
    seriesLabel: "Minutes",
    items: sampleItems,
    loading: false,
    error: false,
    emptyTitle: "No first replies in this range.",
    errorMessage: "Unable to load first response time.",
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
    items: [],
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    items: [],
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
    items: [],
  },
};
