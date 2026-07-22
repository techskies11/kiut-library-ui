import type { Meta, StoryObj } from "@storybook/vue3";

import ConversationVolume from "./ConversationVolume.vue";

const breakdownOptions = [
  { value: "all", label: "All" },
  { value: "resolution_mode", label: "Resolution Mode" },
  { value: "agent", label: "Agent Type" },
  { value: "channel", label: "Channel" },
  { value: "agent_channel", label: "Channel & Agent" },
];

const titles = {
  all: "Conversations",
  resolution_mode: "Conversations by Resolution Mode",
  agent: "Conversations by Agent",
  channel: "Conversations by Channel",
  agent_channel: "Conversations by Agent and Channel",
};

const meta = {
  title: "Charts/BusinessMetrics/ConversationVolume",
  component: ConversationVolume,
  tags: ["autodocs"],
  argTypes: {
    breakdownBy: {
      control: "select",
      options: breakdownOptions.map((option) => option.value),
      description: "Conversation grouping shown in the chart",
    },
    onChangeBreakdown: {
      action: "changeBreakdown",
      description: "Emitted when the breakdown filter changes",
    },
  },
  decorators: [
    () => ({
      template: '<div class="box-border h-[560px] w-full max-w-5xl px-2 py-4"><story /></div>',
    }),
  ],
} satisfies Meta<typeof ConversationVolume>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  loading: false,
  breakdownOptions,
  titles,
  subtitle: "Conversations over time",
  emptyTitle: "No conversation data",
  emptyDescription: "Try adjusting the date range or filters.",
};

export const All: Story = {
  args: {
    ...baseArgs,
    breakdownBy: "all",
    data: {
      total_conversations: 116,
      breakdown_items: [],
      breakdown_by_day: {
        "2026-05-01": { All: 34 },
        "2026-05-02": { All: 41 },
        "2026-05-03": { All: 41 },
      },
    },
  },
};

export const ByResolutionMode: Story = {
  args: {
    ...baseArgs,
    breakdownBy: "resolution_mode",
    data: {
      total_conversations: 116,
      breakdown_items: [
        { key: "AI Agent", total_conversations: 68 },
        { key: "Human", total_conversations: 29 },
        { key: "AI Agent + Human", total_conversations: 19 },
      ],
      breakdown_by_day: {
        "2026-05-01": { "AI Agent": 20, Human: 9, "AI Agent + Human": 5 },
        "2026-05-02": { "AI Agent": 24, Human: 10, "AI Agent + Human": 7 },
        "2026-05-03": { "AI Agent": 24, Human: 10, "AI Agent + Human": 7 },
      },
    },
  },
};

export const ByAgentType: Story = {
  args: {
    ...baseArgs,
    breakdownBy: "agent",
    data: {
      total_conversations: 116,
      breakdown_items: [
        { key: "faq", total_conversations: 43 },
        { key: "seller", total_conversations: 31 },
        { key: "checkin", total_conversations: 26 },
        { key: "Unassigned", total_conversations: 16 },
      ],
      breakdown_by_day: {
        "2026-05-01": { faq: 14, seller: 9, checkin: 7, Unassigned: 4 },
        "2026-05-02": { faq: 15, seller: 11, checkin: 9, Unassigned: 6 },
        "2026-05-03": { faq: 14, seller: 11, checkin: 10, Unassigned: 6 },
      },
    },
  },
};

export const ByChannel: Story = {
  args: {
    ...baseArgs,
    breakdownBy: "channel",
    data: {
      total_conversations: 116,
      breakdown_items: [
        { key: "WhatsApp", total_conversations: 70 },
        { key: "Web", total_conversations: 31 },
        { key: "Instagram", total_conversations: 15 },
      ],
      breakdown_by_day: {
        "2026-05-01": { WhatsApp: 21, Web: 9, Instagram: 4 },
        "2026-05-02": { WhatsApp: 25, Web: 11, Instagram: 5 },
        "2026-05-03": { WhatsApp: 24, Web: 11, Instagram: 6 },
      },
    },
  },
};

export const ByChannelAndAgent: Story = {
  args: {
    ...baseArgs,
    breakdownBy: "agent_channel",
    data: {
      total_conversations: 116,
      breakdown_items: [
        { key: "faq | WhatsApp", total_conversations: 28 },
        { key: "seller | WhatsApp", total_conversations: 24 },
        { key: "checkin | Web", total_conversations: 19 },
        { key: "faq | Web", total_conversations: 15 },
        { key: "seller | Web", total_conversations: 12 },
        { key: "Unassigned | WhatsApp", total_conversations: 10 },
        { key: "checkin | WhatsApp", total_conversations: 8 },
        { key: "faq | Instagram", total_conversations: 7 },
      ],
      breakdown_by_day: {
        "2026-05-01": {
          "faq | WhatsApp": 9,
          "seller | WhatsApp": 8,
          "checkin | Web": 6,
          "faq | Web": 4,
          "seller | Web": 3,
          "Unassigned | WhatsApp": 2,
          "checkin | WhatsApp": 1,
          "faq | Instagram": 1,
        },
        "2026-05-02": {
          "faq | WhatsApp": 10,
          "seller | WhatsApp": 8,
          "checkin | Web": 6,
          "faq | Web": 5,
          "seller | Web": 4,
          "Unassigned | WhatsApp": 4,
          "checkin | WhatsApp": 2,
          "faq | Instagram": 2,
        },
        "2026-05-03": {
          "faq | WhatsApp": 9,
          "seller | WhatsApp": 8,
          "checkin | Web": 7,
          "faq | Web": 6,
          "seller | Web": 5,
          "Unassigned | WhatsApp": 4,
          "checkin | WhatsApp": 5,
          "faq | Instagram": 4,
        },
      },
    },
  },
};

export const Loading: Story = {
  args: {
    ...baseArgs,
    loading: true,
    breakdownBy: "all",
    data: null,
  },
};

export const Empty: Story = {
  args: {
    ...baseArgs,
    breakdownBy: "all",
    data: {
      total_conversations: 0,
      breakdown_items: [],
      breakdown_by_day: {},
    },
  },
};
