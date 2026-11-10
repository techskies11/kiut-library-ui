import type { Meta, StoryObj } from "@storybook/vue3";
import ButtonNotification from "./ButtonNotification.vue";

const meta: Meta<typeof ButtonNotification> = {
  title: "Components/NotificationsModule/Button",
  component: ButtonNotification,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ButtonNotification>;

export const Default: Story = {
  render: () => ({
    components: { ButtonNotification },
    template: `
      <div class="flex min-h-screen items-start justify-end bg-[color:var(--kiut-bg-primary)] p-8">
        <ButtonNotification />
      </div>
    `,
  }),
};
