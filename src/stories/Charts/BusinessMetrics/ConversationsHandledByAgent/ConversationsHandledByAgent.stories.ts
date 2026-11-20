import type { Meta, StoryObj } from "@storybook/vue3";
import ConversationsHandledByAgent from "./ConversationsHandledByAgent.vue";

const meta = {
  title: "Charts/BusinessMetrics/ConversationsHandledByAgent",
  component: ConversationsHandledByAgent,
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
} satisfies Meta<typeof ConversationsHandledByAgent>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  { agent: "Ana Ruiz", conversations: 42 },
  { agent: "Carlos Méndez", conversations: 31 },
  { agent: "Laura Gómez", conversations: 18 },
  { agent: "Diego Pardo", conversations: 9 },
];

export const Default: Story = {
  args: {
    title: "Conversations handled by human agent",
    subtitle:
      "A conversation handled by more than one human agent is counted for each of them.",
    seriesLabel: "Conversations",
    items: sampleItems,
    loading: false,
    error: false,
    emptyTitle: "No conversations in this range.",
    errorMessage: "Unable to load conversations by agent.",
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
