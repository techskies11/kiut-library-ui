import type { Meta, StoryObj } from "@storybook/vue3";
import AncillariesCR from "./AncillariesCR.vue";

const meta: Meta<typeof AncillariesCR> = {
  title: "Charts/BusinessMetrics/AncillariesCR",
  component: AncillariesCR,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof AncillariesCR>;

export const Default: Story = {
  args: {
    ancillariesCr: 42.0,
    previousAncillariesCr: 38.5,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Down: Story = {
  args: {
    ancillariesCr: 35.2,
    previousAncillariesCr: 42.0,
    loading: false,
  },
};
