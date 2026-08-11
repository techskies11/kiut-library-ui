import type { Meta, StoryObj } from "@storybook/vue3";
import Ancillaries from "./Ancillaries.vue";

const mockAncillariesData = {
  total_ancillaries_offered: 1000,
  total_ancillaries_selected: 420,
  total_ancillaries_declined: 380,
  ancillaries_cr: 42.0,
  declined_by_reason: [
    { reason: "declined", count: 200 },
    { reason: "skipped", count: 100 },
    { reason: "no_offers_available", count: 50 },
    { reason: "route_restricted", count: 30 },
  ],
  ancillaries_by_day: [
    {
      date: "2026-08-01",
      offered_count: 120,
      selected_count: 50,
      declined_count: 45,
    },
    {
      date: "2026-08-02",
      offered_count: 110,
      selected_count: 48,
      declined_count: 40,
    },
    {
      date: "2026-08-03",
      offered_count: 130,
      selected_count: 55,
      declined_count: 50,
    },
  ],
  declined_by_reason_by_day: [
    {
      date: "2026-08-01",
      reasons: [
        { reason: "declined", count: 25 },
        { reason: "skipped", count: 12 },
      ],
    },
    {
      date: "2026-08-02",
      reasons: [
        { reason: "declined", count: 20 },
        { reason: "route_restricted", count: 8 },
      ],
    },
  ],
};

const meta = {
  title: "Charts/BusinessMetrics/Ancillaries",
  component: Ancillaries,
  tags: ["autodocs"],
  argTypes: {
    ancillariesData: {
      control: "object",
      description: "Ancillaries funnel metrics payload",
    },
    loading: {
      control: "boolean",
      description: "Loading state indicator",
    },
    initiallyOpen: {
      control: "boolean",
      description: "Whether the collapsible starts open",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Ancillaries funnel Sankey (Offered → Selected / Declined by reason) with CR highlight card.",
      },
    },
  },
} satisfies Meta<typeof Ancillaries>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ancillariesData: mockAncillariesData,
    loading: false,
    initiallyOpen: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    initiallyOpen: true,
  },
};

export const Empty: Story = {
  args: {
    ancillariesData: {
      total_ancillaries_offered: 0,
      total_ancillaries_selected: 0,
      total_ancillaries_declined: 0,
      ancillaries_cr: 0,
      declined_by_reason: [],
      ancillaries_by_day: [],
      declined_by_reason_by_day: [],
    },
    loading: false,
    initiallyOpen: true,
  },
};
