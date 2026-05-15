<template>
  <!-- ── DESKTOP: two-rail sidebar ── -->
  <aside
    v-if="!isMobile"
    class="kiut-app-shell-nav flex flex-col h-full overflow-hidden font-['Inter',system-ui,sans-serif]"
    role="navigation"
    aria-label="Main navigation"
    v-bind="restAttrs"
  >
    <div class="flex flex-1 min-h-0">
      <!-- ── Primary rail ── -->
      <div
        class="primary-rail flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r justify-center [border-color:var(--kiut-lateral-border-color)]"
        :style="{
          '--expanded-width': expandedPrimaryWidth,
          width: primaryRailWidth,
        }"
        @mouseenter="isHoveringRail = true"
        @mouseleave="isHoveringRail = false"
      >
        <div
          v-if="$slots.logo"
          class="flex justify-center items-center my-4 shrink-0"
        >
          <slot name="logo" :expanded="isHoveringRail" />
        </div>

        <nav
          class="flex-1 overflow-y-auto p-1 flex flex-col gap-1"
          aria-label="Sections"
        >
          <button
            v-for="section in sections"
            :key="section.id"
            type="button"
            :aria-current="
              selectedSectionId === section.id ? 'true' : undefined
            "
            :title="section.label"
            class="group relative flex flex-row items-center justify-start gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20"
            :class="sectionButtonClass(section)"
            @click="selectSection(section)"
          >
            <component
              :is="section.icon"
              v-if="section.icon"
              class="shrink-0"
              :style="{ width: primaryIconSize, height: primaryIconSize }"
              aria-hidden="true"
            />
            <span
              class="leading-tight font-semibold tracking-wide text-left w-full truncate px-1 color-"
              :style="{ fontSize: primaryFontSize }"
            >
              {{ section.label }}
            </span>
          </button>
        </nav>

        <div
          v-if="$slots.footer"
          class="shrink-0 border-t [border-color:var(--kiut-lateral-border-color)] [background-color:var(--kiut-lateral-bg)]"
        >
          <slot name="footer" :expanded="isHoveringRail" />
        </div>
      </div>

      <!-- ── Secondary panel ── -->
      <Transition name="ksn-sub">
        <div
          v-if="activeSection"
          key="secondary"
          class="secondary-panel flex flex-col shrink-0 [background-color:var(--kiut-lateral-bg)] border-r [border-color:var(--kiut-lateral-border-color)] overflow-hidden"
          :style="{ width: secondaryWidth }"
        >
          <div class="px-4 py-4 shrink-0">
            <p
              class="text-[12px] font-bold uppercase tracking-widest text-start [color:var(--kiut-text-subtitle)]"
            >
              {{ activeSection.label }}
            </p>
          </div>

          <nav
            class="flex-1 overflow-y-auto px-1 pb-3 flex flex-col gap-0.5"
            aria-label="Section items"
          >
            <button
              v-for="item in activeSection.items"
              :key="item.id"
              type="button"
              :data-nav-id="item.id"
              :aria-current="isItemActive(item) ? 'page' : undefined"
              class="group flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20"
              :class="itemButtonClass(item)"
              @click="navigateToItem(activeSection!, item)"
            >
              <component
                :is="item.icon"
                v-if="item.icon"
                :style="{ width: secondaryIconSize, height: secondaryIconSize }"
              />
              <span class="truncate" :style="{ fontSize: secondaryFontSize }">{{
                item.label
              }}</span>
            </button>
          </nav>
        </div>
      </Transition>
    </div>
  </aside>

  <!-- ── MOBILE: fixed bottom tab bar + bottom sheet ── -->
  <div
    v-else
    class="kiut-app-shell-nav font-['Inter',system-ui,sans-serif]"
    role="navigation"
    aria-label="Main navigation"
    v-bind="restAttrs"
  >
    <!-- Backdrop overlay -->
    <Transition name="ksn-overlay">
      <div
        v-if="activeSection"
        class="fixed inset-0 bg-black/40 z-40"
        aria-hidden="true"
        @click="closeSheet"
      />
    </Transition>

    <!-- Bottom sheet -->
    <Transition name="ksn-sheet">
      <div
        v-if="activeSection"
        class="fixed left-0 right-0 z-50 [background-color:var(--kiut-lateral-bg)] rounded-t-2xl shadow-2xl border-t [border-color:var(--kiut-lateral-border-color)] max-h-[70vh] flex flex-col"
        :style="{ bottom: mobileBottomOffset }"
      >
        <!-- Drag handle -->
        <div class="flex justify-center pt-3 pb-1 shrink-0">
          <div
            class="w-10 h-1 rounded-full [background-color:var(--kiut-lateral-border-color)] dark:bg-purple-500/30"
          />
        </div>

        <!-- Sheet header -->
        <div class="flex items-center justify-between px-5 py-3 shrink-0">
          <p
            class="text-xs font-bold uppercase tracking-widest [color:var(--kiut-text-muted)]"
          >
            {{ activeSection.label }}
          </p>
          <button
            type="button"
            class="w-8 h-8 flex items-center justify-center rounded-lg [color:var(--kiut-text-muted)] hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-500/20 dark:hover:text-purple-300 transition-colors"
            aria-label="Close"
            @click="closeSheet"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Items list -->
        <nav
          class="overflow-y-auto flex-1 px-3 pb-5 flex flex-col gap-1"
          aria-label="Section items"
        >
          <button
            v-for="item in activeSection.items"
            :key="item.id"
            type="button"
            :data-nav-id="item.id"
            :aria-current="isItemActive(item) ? 'page' : undefined"
            class="group flex items-center gap-3 w-full text-left px-4 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 min-h-[52px]"
            :class="itemButtonClass(item)"
            @click="mobileNavigateToItem(activeSection!, item)"
          >
            <component
              :is="item.icon"
              v-if="item.icon"
              class="shrink-0"
              :style="{ width: '18px', height: '18px' }"
              aria-hidden="true"
            />
            <span class="truncate text-[15px]">{{ item.label }}</span>
          </button>
        </nav>
      </div>
    </Transition>

    <!-- Mobile footer slot (language / timezone / theme) -->
    <div
      v-if="$slots.footer"
      class="fixed left-0 right-0 z-50 [background-color:var(--kiut-lateral-bg)] border-t [border-color:var(--kiut-lateral-border-color)] flex items-center justify-center"
      :style="{ bottom: mobileBarHeight, height: mobileFooterHeight }"
    >
      <slot name="footer" :expanded="true" />
    </div>

    <!-- Bottom tab bar -->
    <nav
      class="fixed bottom-0 left-0 right-0 z-50 [background-color:var(--kiut-lateral-bg)] border-t [border-color:var(--kiut-lateral-border-color)] flex items-stretch justify-around overflow-hidden"
      :style="{ height: mobileBarHeight }"
      aria-label="Sections"
    >
      <button
        v-for="section in sections"
        :key="section.id"
        type="button"
        :aria-current="selectedSectionId === section.id ? 'true' : undefined"
        class="relative flex-1 flex flex-col items-center justify-center gap-1 py-1 px-0.5 min-w-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--kiut-primary)]/30"
        :class="mobileSectionButtonClass(section)"
        @click="selectSection(section)"
      >
        <!-- Active indicator line at top -->
        <span
          v-if="
            selectedSectionId === section.id || hasSectionActiveItem(section)
          "
          class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full [background-color:var(--kiut-primary)]"
          aria-hidden="true"
        />
        <component
          :is="section.icon"
          v-if="section.icon"
          class="shrink-0"
          :style="{ width: primaryIconSize, height: primaryIconSize }"
          aria-hidden="true"
        />
        <span
          class="text-[10px] font-semibold leading-none truncate w-full text-center px-0.5"
        >
          {{ section.label }}
        </span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  onMounted,
  onUnmounted,
  useAttrs,
  useSlots,
  type Component,
} from "vue";

defineOptions({ name: "AppShellNavigation", inheritAttrs: false });

const isHoveringRail = ref(false);

export interface NavItem {
  id: string;
  label: string;
  icon?: Component;
  path: string;
}

export interface NavSection {
  id: string;
  label: string;
  icon?: Component;
  items?: NavItem[];
  path?: string;
}

const props = withDefaults(
  defineProps<{
    /** List of the sections and the items. */
    sections: NavSection[];

    /** What Section is open and with 'update:selectedSectionId' we say to the father will be the next */
    selectedSectionId?: string | null;

    /** Actual route */
    activePath?: string;

    /** Width of the Section Panel Expanded */
    expandedPrimaryWidth?: string;

    /** Width of the Items Panel */
    secondaryWidth?: string;

    /** Font Size of the Section Panel */
    primaryFontSize?: string;

    /** Font Size of the Items Panel */
    secondaryFontSize?: string;

    /** Icon size for the primary rail buttons */
    primaryIconSize?: string;

    /** Icon size for the secondary panel items */
    secondaryIconSize?: string;

    /** Base width of the primary rail (collapsed, no hover) */
    primaryRailWidth?: string;

    /**
     * Viewport width (px) below which the mobile layout is used.
     * @default 768
     */
    mobileBreakpoint?: number;

    /**
     * Height of the bottom tab bar on mobile. Consumers should add
     * padding-bottom of the same value to their main content area.
     * @default '4rem'
     */
    mobileBarHeight?: string;

    /**
     * Height of the footer slot strip rendered above the tab bar on mobile.
     * Only used when the footer slot is provided.
     * @default '3rem'
     */
    mobileFooterHeight?: string;
  }>(),
  {
    selectedSectionId: null,
    activePath: "",
    expandedPrimaryWidth: "8rem",
    secondaryWidth: "12.5rem",
    primaryFontSize: "11px",
    secondaryFontSize: "14px",
    primaryIconSize: "24px",
    secondaryIconSize: "14px",
    primaryRailWidth: "3.4rem",
    mobileBreakpoint: 768,
    mobileBarHeight: "4rem",
    mobileFooterHeight: "3rem",
  },
);

const emit = defineEmits<{
  /** Fired when the user clicks a section button. Toggle: clicking the active section closes it. */
  "update:selectedSectionId": [value: string | null];

  /** Fired when the user clicks a navigation item. Use this to call `router.push(item.path)`. */
  navigate: [payload: { section: NavSection; item: NavItem }];
}>();

const attrs = useAttrs();
const { class: _class, ...restAttrs } = attrs as Record<string, unknown>;
const slots = useSlots();

const mobileBottomOffset = computed(() =>
  slots.footer
    ? `calc(${props.mobileBarHeight} + ${props.mobileFooterHeight})`
    : props.mobileBarHeight,
);

// ── Mobile detection ──────────────────────────────────────────────

const isMobile = ref(false);

function checkMobile() {
  if (typeof window === "undefined") return;
  isMobile.value = window.innerWidth < props.mobileBreakpoint;
}

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

// ── Shared logic ──────────────────────────────────────────────────

const activeSection = computed<NavSection | null>(() => {
  const section = props.sections.find((s) => s.id === props.selectedSectionId);
  return section?.items?.length ? section : null;
});

function isItemActive(item: NavItem): boolean {
  if (!props.activePath) return false;
  return (
    props.activePath === item.path ||
    props.activePath.startsWith(item.path + "/")
  );
}

function hasSectionActiveItem(section: NavSection): boolean {
  if (!section.items?.length) {
    if (!props.activePath || !section.path) return false;
    return (
      props.activePath === section.path ||
      props.activePath.startsWith(section.path + "/")
    );
  }
  return section.items.some(isItemActive);
}

function selectSection(section: NavSection): void {
  if (!section.items?.length) {
    emit("update:selectedSectionId", null);
    emit("navigate", {
      section,
      item: { id: section.id, label: section.label, path: section.path! },
    });
    return;
  }
  const nextId = props.selectedSectionId === section.id ? null : section.id;
  emit("update:selectedSectionId", nextId);
}

function navigateToItem(section: NavSection, item: NavItem): void {
  emit("navigate", { section, item });
}

function closeSheet(): void {
  emit("update:selectedSectionId", null);
}

function mobileNavigateToItem(section: NavSection, item: NavItem): void {
  navigateToItem(section, item);
  closeSheet();
}

// ── Style helpers ─────────────────────────────────────────────────

function sectionButtonClass(section: NavSection): string[] {
  if (props.selectedSectionId === section.id) {
    return [
      "[background-color:var(--kiut-primary-section)] text-white shadow-sm dark:text-purple-300",
    ];
  }
  if (hasSectionActiveItem(section)) {
    return [
      "[color:var(--kiut-primary)]",
      "text-purple-800/90 dark:text-purple-400",
    ];
  }
  return [
    "[color:var(--kiut-text-secondary)]",
    "hover:bg-purple-100 hover:text-purple-900",
    "dark:hover:bg-purple-400/20 dark:hover:text-purple-50",
  ];
}

function itemButtonClass(item: NavItem): string[] {
  if (isItemActive(item)) {
    return [
      "[background-color:var(--kiut-secondary-section)] text-white",
      "dark:text-purple-300",
    ];
  }
  return [
    "[color:var(--kiut-text-primary)]",
    "hover:bg-purple-100 hover:text-purple-700",
    "dark:hover:bg-purple-500/30 dark:hover:text-purple-50",
  ];
}

function mobileSectionButtonClass(section: NavSection): string[] {
  if (props.selectedSectionId === section.id) {
    return ["[color:var(--kiut-primary)]"];
  }
  if (hasSectionActiveItem(section)) {
    return ["[color:var(--kiut-primary)]", "opacity-75"];
  }
  return [
    "[color:var(--kiut-text-muted)]",
    "active:[color:var(--kiut-text-secondary)]",
  ];
}
</script>

<style scoped>
/* ── Desktop: primary rail hover expand ── */
.primary-rail:hover {
  width: var(--expanded-width) !important;
}

.primary-rail {
  transition: width 0.1s ease;
}
.primary-rail:not(:hover) {
  transition: width 0.1s ease 0.2s;
}

.primary-rail span {
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;
  opacity: 1;
  visibility: visible;
}

.primary-rail:not(:hover) span {
  opacity: 0;
  visibility: hidden;
}

/* ── Desktop: secondary panel slide-in ── */
.ksn-sub-enter-active,
.ksn-sub-leave-active {
  transition:
    transform 0.22s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.ksn-sub-enter-from,
.ksn-sub-leave-to {
  transform: translateX(-12px);
  opacity: 0;
}

/* ── Mobile: backdrop fade ── */
.ksn-overlay-enter-active,
.ksn-overlay-leave-active {
  transition: opacity 0.22s ease;
}
.ksn-overlay-enter-from,
.ksn-overlay-leave-to {
  opacity: 0;
}

/* ── Mobile: bottom sheet slide-up ── */
.ksn-sheet-enter-active,
.ksn-sheet-leave-active {
  transition:
    transform 0.28s cubic-bezier(0.32, 0.72, 0, 1),
    opacity 0.2s ease;
}
.ksn-sheet-enter-from,
.ksn-sheet-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
