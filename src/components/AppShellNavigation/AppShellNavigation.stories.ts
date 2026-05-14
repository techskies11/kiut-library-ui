import type { Meta, StoryObj } from "@storybook/vue3";
import { ref, computed } from "vue";
import {
  HomeIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  SignalIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BoltIcon,
  MicrophoneIcon,
  EnvelopeIcon,
  FlagIcon,
  RocketLaunchIcon,
  ShieldExclamationIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/vue/24/outline";
import AppShellNavigation from "./AppShellNavigation.vue";
import type { NavSection } from "./AppShellNavigation.vue";

const meta: Meta<typeof AppShellNavigation> = {
  title: "Components/AppShellNavigation",
  component: AppShellNavigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Two-rail navigation sidebar. The primary rail shows top-level sections with icons; clicking a section reveals a secondary panel with navigable items. All routing is delegated to the parent via the `navigate` emit.",
      },
    },
  },
  argTypes: {
    primaryRailWidth: {
      description:
        "Base width of the primary rail in its collapsed state (no hover). Accepts any valid CSS length value.",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "3.4rem" },
        category: "Layout",
      },
    },
    expandedPrimaryWidth: {
      description:
        "Width of the primary rail when hovered/expanded. Accepts any valid CSS length value.",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "8rem" },
        category: "Layout",
      },
    },
    secondaryWidth: {
      description:
        "Width of the secondary panel. Accepts any valid CSS length value.",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "12.5rem" },
        category: "Layout",
      },
    },
    primaryIconSize: {
      description:
        "Size (width and height) of icons rendered inside the primary rail buttons. Accepts any valid CSS length value.",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "24px" },
        category: "Typography & Icons",
      },
    },
    secondaryIconSize: {
      description:
        "Size (width and height) of icons rendered inside the secondary panel item buttons. Accepts any valid CSS length value.",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "14px" },
        category: "Typography & Icons",
      },
    },
    primaryFontSize: {
      description:
        "Font size for the section labels in the primary rail (visible on hover). Accepts any valid CSS length value.",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "11px" },
        category: "Typography & Icons",
      },
    },
    secondaryFontSize: {
      description:
        "Font size for the item labels in the secondary panel. Accepts any valid CSS length value.",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "14px" },
        category: "Typography & Icons",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppShellNavigation>;

// ──────────────────────────────────────────────────────────────────
// Shared demo sections
// ──────────────────────────────────────────────────────────────────

const demoSections: NavSection[] = [
  {
    id: "home",
    label: "Home",
    icon: HomeIcon,
    path: "/",
  },
  {
    id: "home",
    label: "Analytics",
    icon: ChartBarIcon,
    path: "/analytics",
  },
  {
    id: "conversations",
    label: "Conversations",
    icon: ChatBubbleLeftRightIcon,
    items: [
      {
        id: "assigned-chats",
        label: "Inbox",
        icon: ChatBubbleLeftRightIcon,
        path: "/assigned-chats",
      },
      {
        id: "pending-chats",
        label: "Human escalations",
        icon: CpuChipIcon,
        path: "/pending-chats",
      },
      {
        id: "chats",
        label: "All Conversation",
        icon: UserGroupIcon,
        path: "/chats",
      },
      {
        id: "human-agents",
        label: "Team Status",
        icon: UserGroupIcon,
        path: "/human-agents",
      },
    ],
  },
  {
    id: "aiAgents",
    label: "AI Agent Configuration",
    icon: CpuChipIcon,
    items: [
      {
        id: "personality",
        label: "Personality",
        icon: CpuChipIcon,
        path: "/personality",
      },
      { id: "voices", label: "Voices", icon: MicrophoneIcon, path: "/voices" },
      {
        id: "documents",
        label: "Knowledge Base",
        icon: DocumentTextIcon,
        path: "/documents",
      },
      {
        id: "skills-flows",
        label: "Actions",
        icon: RocketLaunchIcon,
        path: "/skills-flows",
      },
      {
        id: "guardrails",
        label: "Guardrails",
        icon: ShieldExclamationIcon,
        path: "/guardrails",
      },
      {
        id: "templates",
        label: "System messages",
        icon: EnvelopeIcon,
        path: "/templates",
      },
      { id: "channels", label: "Actions", icon: BoltIcon, path: "/channels" },
      {
        id: "feature-flags",
        label: "Feature flags",
        icon: FlagIcon,
        path: "/featureFlags",
      },
    ],
  },
  {
    id: "channels",
    label: "Channels",
    icon: SignalIcon,
    items: [
      {
        id: "userContact",
        label: "Contacts",
        icon: UserGroupIcon,
        path: "/userContact",
      },
      {
        id: "promotions",
        label: "Promotions",
        icon: BoltIcon,
        path: "/promotions",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Cog6ToothIcon,
    items: [
      { id: "users", label: "Users", icon: UserGroupIcon, path: "/users" },
      {
        id: "documents",
        label: "Documents",
        icon: DocumentTextIcon,
        path: "/documents",
      },
      {
        id: "tools",
        label: "Tools",
        icon: WrenchScrewdriverIcon,
        path: "/tools",
      },
      {
        id: "settings",
        label: "Configuration",
        icon: AdjustmentsHorizontalIcon,
        path: "/settings",
      },
      { id: "audit", label: "Audit", icon: ShieldCheckIcon, path: "/audit" },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────
// Interactive story (default)
// ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => ({
    components: { AppShellNavigation },
    setup() {
      const selectedSectionId = ref<string | null>("aiAgents");
      const activePath = ref("/agent");

      function onNavigate({ item }: { item: { path: string } }) {
        activePath.value = item.path;
      }

      return { demoSections, selectedSectionId, activePath, onNavigate };
    },
    template: `
      <div class="flex h-screen bg-[color:var(--kiut-bg-primary)]">
        <AppShellNavigation
          :sections="demoSections"
          v-model:selectedSectionId="selectedSectionId"
          :activePath="activePath"
          @navigate="onNavigate"
          class="h-full rounded-xl m-3"
          style="box-shadow: var(--kiut-shadow-card)"
          expandedPrimaryWidth= "13rem"
        >
          <template #logo>
            <div class="w-9 h-9 rounded-xl bg-[color:var(--kiut-primary)] flex items-center justify-center">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </template>
          <template #footer="{ expanded }">
            <!-- Expanded: full row with labels -->
            <div v-if="expanded" class="flex items-center justify-between px-3 py-2.5 gap-2 text-[color:var(--kiut-text-muted)]">
              <button class="flex flex-col items-center gap-0.5 hover:text-[color:var(--kiut-primary)] transition-colors">
                <span class="text-[9px] font-semibold uppercase tracking-wider">EN</span>
              </button>
              <button class="flex flex-col items-center gap-0.5 hover:text-[color:var(--kiut-primary)] transition-colors">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                <span class="text-[8px] font-medium">GMT-5</span>
              </button>
              <button class="flex flex-col items-center gap-0.5 hover:text-[color:var(--kiut-primary)] transition-colors">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              </button>
            </div>
            <!-- Collapsed: single centered icon -->
            <div v-else class="flex items-center justify-center py-2.5 text-[color:var(--kiut-text-muted)]">
              <button class="hover:text-[color:var(--kiut-primary)] transition-colors">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              </button>
            </div>
          </template>
        </AppShellNavigation>

        <main class="flex-1 p-6">
          <p class="text-sm text-[color:var(--kiut-text-secondary)]">
            Selected section: <strong>{{ selectedSectionId }}</strong><br />
            Active path: <strong>{{ activePath }}</strong>
          </p>
          <p class="mt-4 text-xs text-[color:var(--kiut-text-muted)]">
            Click a section in the primary rail to reveal its items. Click an item to navigate.
          </p>
        </main>
      </div>
    `,
  }),
};

// ──────────────────────────────────────────────────────────────────
// No section selected (collapsed secondary)
// ──────────────────────────────────────────────────────────────────

export const NothingSelected: Story = {
  render: () => ({
    components: { AppShellNavigation },
    setup() {
      const selectedSectionId = ref<string | null>(null);
      const activePath = ref("/dashboard");
      function onNavigate({ item }: { item: { path: string } }) {
        activePath.value = item.path;
      }
      return { demoSections, selectedSectionId, activePath, onNavigate };
    },
    template: `
      <div class="flex h-screen bg-[color:var(--kiut-bg-primary)]">
        <AppShellNavigation
          :sections="demoSections"
          v-model:selectedSectionId="selectedSectionId"
          :activePath="activePath"
          @navigate="onNavigate"
          class="h-full rounded-xl m-3"
          style="box-shadow: var(--kiut-shadow-card)"
            expandedPrimaryWidth= "13rem"
        >
          <template #logo>
            <div class="w-9 h-9 rounded-xl bg-[color:var(--kiut-primary)] flex items-center justify-center">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </template>
          <template #footer="{ expanded }">
            <!-- Expanded: full row with labels -->
            <div v-if="expanded" class="flex items-center justify-between px-3 py-2.5 gap-2 text-[color:var(--kiut-text-muted)]">
              <button class="flex flex-col items-center gap-0.5 hover:text-[color:var(--kiut-primary)] transition-colors">
                <span class="text-[9px] font-semibold uppercase tracking-wider">EN</span>
              </button>
              <button class="flex flex-col items-center gap-0.5 hover:text-[color:var(--kiut-primary)] transition-colors">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                <span class="text-[8px] font-medium">GMT-5</span>
              </button>
              <button class="flex flex-col items-center gap-0.5 hover:text-[color:var(--kiut-primary)] transition-colors">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              </button>
            </div>
            <!-- Collapsed: single centered icon -->
            <div v-else class="flex items-center justify-center py-2.5 text-[color:var(--kiut-text-muted)]">
              <button class="hover:text-[color:var(--kiut-primary)] transition-colors">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              </button>
            </div>
          </template>
        </AppShellNavigation>
        <main class="flex-1 p-6">
          <p class="text-sm text-[color:var(--kiut-text-secondary)]">
            No section selected — secondary panel is hidden. Click a section to reveal it.
          </p>
        </main>
      </div>
    `,
  }),
};

// ──────────────────────────────────────────────────────────────────
// Dark mode
// ──────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => ({
    components: { AppShellNavigation },
    setup() {
      const selectedSectionId = ref<string | null>("settings");
      const activePath = ref("/users");
      function onNavigate({ item }: { item: { path: string } }) {
        activePath.value = item.path;
      }
      return { demoSections, selectedSectionId, activePath, onNavigate };
    },
    template: `
      <div class="dark flex h-screen bg-[#000]">
        <AppShellNavigation
          :sections="demoSections"
          v-model:selectedSectionId="selectedSectionId"
          :activePath="activePath"
          @navigate="onNavigate"
          class="h-full rounded-xl m-3"
          style="box-shadow: var(--kiut-shadow-card)"
          expandedPrimaryWidth= "13rem"
        >
          <template #logo>
            <div class="w-9 h-9 rounded-xl bg-[color:var(--kiut-primary)] flex items-center justify-center">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </template>
          <template #footer="{ expanded }">
            <!-- Expanded: full row with labels -->
            <div v-if="expanded" class="flex items-center justify-between px-3 py-2.5 gap-2 text-[color:var(--kiut-text-muted)]">
              <button class="flex flex-col items-center gap-0.5 hover:text-[color:var(--kiut-primary)] transition-colors">
                <span class="text-[9px] font-semibold uppercase tracking-wider">EN</span>
              </button>
              <button class="flex flex-col items-center gap-0.5 hover:text-[color:var(--kiut-primary)] transition-colors">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                <span class="text-[8px] font-medium">GMT-5</span>
              </button>
              <button class="flex flex-col items-center gap-0.5 hover:text-[color:var(--kiut-primary)] transition-colors">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              </button>
            </div>
            <!-- Collapsed: single centered icon -->
            <div v-else class="flex items-center justify-center py-2.5 text-[color:var(--kiut-text-muted)]">
              <button class="hover:text-[color:var(--kiut-primary)] transition-colors">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              </button>
            </div>
          </template>
        </AppShellNavigation>
        <main class="flex-1 p-6">
          <p class="text-sm text-[color:var(--kiut-text-secondary)]">Dark mode preview</p>
        </main>
      </div>
    `,
  }),
};

// ──────────────────────────────────────────────────────────────────
// Custom icon sizes + collapsed rail width
// ──────────────────────────────────────────────────────────────────

export const CustomSizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates `primaryRailWidth` (collapsed width without hover), `primaryIconSize` (icons in the primary rail), and `secondaryIconSize` (icons in the secondary panel). All three accept any valid CSS length.",
      },
    },
  },
  render: () => ({
    components: { AppShellNavigation },
    setup() {
      const selectedSectionId = ref<string | null>("aiAgents");
      const activePath = ref("/documents");
      function onNavigate({ item }: { item: { path: string } }) {
        activePath.value = item.path;
      }
      return { demoSections, selectedSectionId, activePath, onNavigate };
    },
    template: `
      <div class="flex h-screen bg-[color:var(--kiut-bg-primary)]">
        <AppShellNavigation
          :sections="demoSections"
          v-model:selectedSectionId="selectedSectionId"
          :activePath="activePath"
          @navigate="onNavigate"
          primaryRailWidth="4.5rem"
          expandedPrimaryWidth="13rem"
          secondaryWidth="14rem"
          primaryIconSize="20px"
          secondaryIconSize="12px"
          primaryFontSize="11px"
          secondaryFontSize="13px"
          class="h-full rounded-xl m-3"
          style="box-shadow: var(--kiut-shadow-card)"
        >
          <template #logo>
            <div class="w-9 h-9 rounded-xl bg-[color:var(--kiut-primary)] flex items-center justify-center">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </template>
        </AppShellNavigation>
        <main class="flex-1 p-6">
          <p class="text-sm text-[color:var(--kiut-text-secondary)]">
            Props used in this story:
          </p>
          <ul class="mt-2 space-y-1 text-xs text-[color:var(--kiut-text-muted)] list-disc list-inside">
            <li><code>primaryRailWidth="4.5rem"</code> — wider collapsed rail</li>
            <li><code>primaryIconSize="20px"</code> — slightly smaller section icons</li>
            <li><code>secondaryIconSize="12px"</code> — smaller item icons</li>
          </ul>
          <p class="mt-4 text-xs text-[color:var(--kiut-text-muted)]">
            Active path: <strong>{{ activePath }}</strong>
          </p>
        </main>
      </div>
    `,
  }),
};

// ──────────────────────────────────────────────────────────────────
// Mobile layout (bottom tab bar + bottom sheet)
// ──────────────────────────────────────────────────────────────────

export const Mobile: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "On viewports narrower than `mobileBreakpoint` (default 768px) the navigation switches to a fixed bottom tab bar. Tapping a section with sub-items reveals a bottom sheet. Tapping outside the sheet or a close button dismisses it.",
      },
    },
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => ({
    components: { AppShellNavigation },
    setup() {
      const selectedSectionId = ref<string | null>(null);
      const activePath = ref("/personality");
      function onNavigate({ item }: { item: { path: string } }) {
        activePath.value = item.path;
      }
      return { demoSections, selectedSectionId, activePath, onNavigate };
    },
    template: `
      <div class="relative h-screen bg-[color:var(--kiut-bg-primary)] overflow-hidden" style="max-width:390px">
        <main class="flex-1 p-5 pb-[7rem]">
          <h2 class="text-base font-semibold text-[color:var(--kiut-text-primary)] mb-1">Mobile Navigation</h2>
          <p class="text-sm text-[color:var(--kiut-text-secondary)] mb-4">
            Tap a section in the bottom bar to open its items in a sheet.
          </p>
          <p class="text-xs text-[color:var(--kiut-text-muted)]">
            Selected section: <strong>{{ selectedSectionId ?? '—' }}</strong><br />
            Active path: <strong>{{ activePath }}</strong>
          </p>
        </main>
        <AppShellNavigation
          :sections="demoSections"
          v-model:selectedSectionId="selectedSectionId"
          :activePath="activePath"
          :mobileBreakpoint="9999"
          @navigate="onNavigate"
        >
          <template #footer>
            <div class="flex items-center justify-between px-1 py-2.5 gap-0.5 text-[color:var(--kiut-text-muted)] w-full">
              <button class="flex flex-col items-center gap-0.5 hover:text-[color:var(--kiut-primary)] transition-colors w-1/3">
                <strong class="text-[8px] font-semibold uppercase tracking-wider">Lang</strong>
                <span class="text-[8px] font-medium">EN</span>
              </button>
              <button class="flex flex-col items-center gap-0.5 hover:text-[color:var(--kiut-primary)] transition-colors w-1/3">
                <strong class="text-[8px] font-semibold uppercase tracking-wider">Zone</strong>
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                <span class="text-[8px] font-medium">GMT-5</span>
              </button>
              <button class="flex flex-col items-center gap-0.5 hover:text-[color:var(--kiut-primary)] transition-colors w-1/3">
                <strong class="text-[8px] font-semibold uppercase tracking-wider">Theme</strong>
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              </button>
            </div>
          </template>
        </AppShellNavigation>
      </div>
    `,
  }),
};

export const MobileDark: Story = {
  parameters: {
    docs: {
      description: {
        story: "Mobile layout in dark mode.",
      },
    },
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => ({
    components: { AppShellNavigation },
    setup() {
      const selectedSectionId = ref<string | null>("aiAgents");
      const activePath = ref("/personality");
      function onNavigate({ item }: { item: { path: string } }) {
        activePath.value = item.path;
      }
      return { demoSections, selectedSectionId, activePath, onNavigate };
    },
    template: `
      <div class="dark relative h-screen bg-[#000] overflow-hidden" style="max-width:390px">
        <main class="flex-1 p-5 pb-[7rem]">
          <h2 class="text-base font-semibold text-[color:var(--kiut-text-primary)] mb-1">Dark Mobile</h2>
          <p class="text-sm text-[color:var(--kiut-text-secondary)]">
            Active path: <strong>{{ activePath }}</strong>
          </p>
        </main>
        <AppShellNavigation
          :sections="demoSections"
          v-model:selectedSectionId="selectedSectionId"
          :activePath="activePath"
          :mobileBreakpoint="9999"
          @navigate="onNavigate"
        >
          <template #footer>
            <div class="flex items-center justify-between px-1 py-2.5 gap-0.5 text-[color:var(--kiut-text-muted)] w-full">
              <button class="flex flex-col items-center gap-0.5 hover:text-[color:var(--kiut-primary)] transition-colors w-1/3">
                <strong class="text-[8px] font-semibold uppercase tracking-wider">Lang</strong>
                <span class="text-[8px] font-medium">EN</span>
              </button>
              <button class="flex flex-col items-center gap-0.5 hover:text-[color:var(--kiut-primary)] transition-colors w-1/3">
                <strong class="text-[8px] font-semibold uppercase tracking-wider">Zone</strong>
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                <span class="text-[8px] font-medium">GMT-5</span>
              </button>
              <button class="flex flex-col items-center gap-0.5 hover:text-[color:var(--kiut-primary)] transition-colors w-1/3">
                <strong class="text-[8px] font-semibold uppercase tracking-wider">Theme</strong>
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              </button>
            </div>
          </template>
        </AppShellNavigation>
      </div>
    `,
  }),
};

// ──────────────────────────────────────────────────────────────────
// Custom rail widths
// ──────────────────────────────────────────────────────────────────

export const WiderRail: Story = {
  render: () => ({
    components: { AppShellNavigation },
    setup() {
      const selectedSectionId = ref<string | null>("channels");
      const activePath = ref("/userContact");
      function onNavigate({ item }: { item: { path: string } }) {
        activePath.value = item.path;
      }
      return { demoSections, selectedSectionId, activePath, onNavigate };
    },
    template: `
      <div class="flex h-screen bg-[color:var(--kiut-bg-primary)]">
        <AppShellNavigation
          :sections="demoSections"
          v-model:selectedSectionId="selectedSectionId"
          :activePath="activePath"
          expandedPrimaryWidth= "13rem"
          secondaryWidth="14rem"
          @navigate="onNavigate"
          class="h-full rounded-xl m-3"
          style="box-shadow: var(--kiut-shadow-card)"
        >
          <template #logo>
            <div class="w-9 h-9 rounded-xl bg-[color:var(--kiut-primary)] flex items-center justify-center">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </template>
        </AppShellNavigation>
        <main class="flex-1 p-6">
          <p class="text-sm text-[color:var(--kiut-text-secondary)]">
            Using <code>expandedPrimaryWidth="13rem"</code> and <code>secondaryWidth="14rem"</code>.
          </p>
        </main>
      </div>
    `,
  }),
};
