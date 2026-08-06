import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import {
  ClockIcon,
  ShoppingBagIcon,
} from "@heroicons/vue/24/outline";
import ModuleNavLayout from "./ModuleNavLayout.vue";
import type { VerticalNavItem } from "./moduleNavTypes";

const items: VerticalNavItem[] = [
  {
    value: "times",
    label: "Times",
    icon: ClockIcon,
  },
  {
    value: "ancillaries",
    label: "Ancillaries",
    icon: ShoppingBagIcon,
  },
];

const meta: Meta<typeof ModuleNavLayout> = {
  title: "Components/ModuleNavLayout",
  component: ModuleNavLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "In-page section navigation with a vertical panel and content slot. Uses `v-model` for the active section (same idea as `Tabs`, but vertical). No routing — the parent decides what to render.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ModuleNavLayout>;

export const AirlineConfig: Story = {
  render: () => ({
    components: { ModuleNavLayout },
    setup() {
      const active = ref("times");
      return { items, active };
    },
    template: `
      <ModuleNavLayout
        v-model="active"
        title="Configuration"
        :items="items"
        aria-label="Airline configuration sections"
      >
        <template #default="{ active }">
          <div class="rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-6 dark:bg-[#1a1a1d]">
            <p class="text-sm text-[color:var(--kiut-text-secondary)]">
              Active section:
              <strong class="text-[color:var(--kiut-text-primary)]">{{ active }}</strong>
            </p>
          </div>
        </template>
      </ModuleNavLayout>
    `,
  }),
};

export const WithoutTitle: Story = {
  render: () => ({
    components: { ModuleNavLayout },
    setup() {
      const active = ref("times");
      return { items, active };
    },
    template: `
      <ModuleNavLayout v-model="active" :items="items">
        <template #default="{ active }">
          <div class="rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-6 dark:bg-[#1a1a1d]">
            <p class="text-sm">Section: {{ active }}</p>
          </div>
        </template>
      </ModuleNavLayout>
    `,
  }),
};
