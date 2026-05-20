<template>
  <!-- ── DESKTOP: two-rail sidebar ── -->
  <aside
    v-if="!isMobile"
    class="kiut-app-shell-nav ku:flex ku:flex-col ku:h-full ku:overflow-hidden ku:font-['Inter',system-ui,sans-serif]"
    role="navigation"
    aria-label="Main navigation"
    v-bind="restAttrs"
  >
    <div class="ku:flex ku:flex-1 ku:min-h-0">
      <!-- ── Primary rail ── -->
      <div
        class="primary-rail ku:flex ku:flex-col ku:shrink-0 ku:[background-color:var(--kiut-lateral-bg)] ku:border-r ku:justify-center"
        :style="{
          '--expanded-width': expandedPrimaryWidth,
          width: primaryRailWidth,
        }"
        @mouseenter="isHoveringRail = true"
        @mouseleave="isHoveringRail = false"
      >
        <div
          v-if="$slots.logo"
          class="ku:flex ku:justify-center ku:items-center ku:my-4 ku:shrink-0"
        >
          <slot name="logo" :expanded="isHoveringRail" />
        </div>

        <nav
          class="ku:flex-1 ku:overflow-y-auto ku:p-1 ku:flex ku:flex-col ku:gap-1"
          aria-label="Sections"
        >
          <button
            v-for="section in sections"
            :key="section.id"
            type="button"
            :aria-current="
              selectedSectionId === section.id ? 'true' : undefined
            "
            :data-has-active="
              hasSectionActiveItem(section) ? 'true' : undefined
            "
            :title="section.label"
            class="ksn-section-btn group ku:relative ku:flex ku:flex-row ku:items-center ku:justify-start ku:gap-1 ku:px-3 ku:py-2.5 ku:rounded-xl ku:transition-all ku:duration-200 ku:focus-visible:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[var(--kiut-primary)]/20"
            @click="selectSection(section)"
          >
            <component
              :is="section.icon"
              v-if="section.icon"
              class="ku:shrink-0"
              :style="{ width: primaryIconSize, height: primaryIconSize }"
              aria-hidden="true"
            />
            <span
              class="ku:leading-tight ku:font-semibold ku:tracking-wide ku:text-left ku:w-full ku:truncate ku:px-1 color-"
              :style="{ fontSize: primaryFontSize }"
            >
              {{ section.label }}
            </span>
          </button>
        </nav>

        <div
          v-if="$slots.footer"
          class="footer-section ku:shrink-0 ku:border-t ku:[background-color:var(--kiut-lateral-bg)]"
        >
          <slot name="footer" :expanded="isHoveringRail" />
        </div>
      </div>

      <!-- ── Secondary panel ── -->
      <Transition name="ksn-sub">
        <div
          v-if="activeSection"
          key="secondary"
          class="secondary-panel ku:flex ku:flex-col ku:shrink-0 ku:[background-color:var(--kiut-lateral-bg)] ku:border-r ku:[border-color:var(--kiut-lateral-border-color)] ku:overflow-hidden"
          :style="{ width: secondaryWidth }"
        >
          <div class="ku:px-4 ku:py-4 ku:shrink-0">
            <p
              class="ku:text-[12px] ku:font-bold ku:uppercase ku:tracking-widest ku:text-start ku:[color:var(--kiut-text-subtitle)]"
            >
              {{ activeSection.label }}
            </p>
          </div>

          <nav
            class="ku:flex-1 ku:overflow-y-auto ku:px-1 ku:pb-3 ku:flex ku:flex-col ku:gap-0.5"
            aria-label="Section items"
          >
            <button
              v-for="item in activeSection.items"
              :key="item.id"
              type="button"
              :data-nav-id="item.id"
              :aria-current="isItemActive(item) ? 'page' : undefined"
              class="ksn-item-btn group ku:flex ku:items-center ku:gap-2.5 ku:w-full ku:text-left ku:px-3 ku:py-2.5 ku:rounded-lg ku:text-sm ku:font-medium ku:transition-all ku:duration-200 ku:focus-visible:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[var(--kiut-primary)]/20"
              @click="navigateToItem(activeSection!, item)"
            >
              <component
                :is="item.icon"
                v-if="item.icon"
                :style="{ width: secondaryIconSize, height: secondaryIconSize }"
              />
              <span class="ku:truncate" :style="{ fontSize: secondaryFontSize }">{{
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
    class="kiut-app-shell-nav ku:font-['Inter',system-ui,sans-serif]"
    role="navigation"
    aria-label="Main navigation"
    v-bind="restAttrs"
  >
    <!-- Backdrop overlay -->
    <Transition name="ksn-overlay">
      <div
        v-if="activeSection"
        class="ku:fixed ku:inset-0 ku:bg-black/40 ku:z-40"
        aria-hidden="true"
        @click="closeSheet"
      />
    </Transition>

    <!-- Bottom sheet -->
    <Transition name="ksn-sheet">
      <div
        v-if="activeSection"
        class="mobile-subsections ku:fixed ku:left-0 ku:right-0 ku:bottom-0 ku:z-50 ku:[background-color:var(--kiut-lateral-bg)] ku:rounded-t-2xl ku:shadow-2xl ku:border-t ku:max-h-[70vh] ku:flex ku:flex-col"
        :style="{ paddingBottom: props.mobileBarHeight }"
      >
        <!-- Drag handle -->
        <div class="ku:flex ku:justify-center ku:pt-3 ku:pb-1 ku:shrink-0">
          <div
            class="ku:w-10 ku:h-1 ku:rounded-full ku:[background-color:var(--kiut-lateral-border-color)] ku:dark:bg-purple-500/30"
          />
        </div>

        <!-- Sheet header -->
        <div class="ku:flex ku:items-center ku:justify-between ku:px-5 ku:py-3 ku:shrink-0">
          <p
            class="ku:text-xs ku:font-bold ku:uppercase ku:tracking-widest ku:[color:var(--kiut-text-muted)]"
          >
            {{ activeSection.label }}
          </p>
          <button
            type="button"
            class="ku:w-8 ku:h-8 ku:flex ku:items-center ku:justify-center ku:rounded-lg ku:[color:var(--kiut-text-muted)] ku:hover:bg-purple-50 ku:hover:text-purple-700 ku:dark:hover:bg-purple-500/20 ku:dark:hover:text-purple-300 ku:transition-colors"
            aria-label="Close"
            @click="closeSheet"
          >
            <svg
              class="ku:w-4 ku:h-4"
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
          class="ku:overflow-y-auto ku:flex-1 ku:px-3 ku:pb-5 ku:flex ku:flex-col ku:gap-1"
          aria-label="Section items"
        >
          <button
            v-for="item in activeSection.items"
            :key="item.id"
            type="button"
            :data-nav-id="item.id"
            :aria-current="isItemActive(item) ? 'page' : undefined"
            class="ksn-item-btn group ku:flex ku:items-center ku:gap-3 ku:w-full ku:text-left ku:px-4 ku:rounded-xl ku:font-medium ku:transition-all ku:duration-200 ku:focus-visible:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[var(--kiut-primary)]/20 ku:min-h-[52px]"
            @click="mobileNavigateToItem(activeSection!, item)"
          >
            <component
              :is="item.icon"
              v-if="item.icon"
              class="ku:shrink-0"
              :style="{ width: '18px', height: '18px' }"
              aria-hidden="true"
            />
            <span class="ku:truncate ku:text-[15px]">{{ item.label }}</span>
          </button>
        </nav>
      </div>
    </Transition>

    <!-- Bottom tab bar -->
    <nav
      class="ksn-mobile-bar ku:fixed ku:bottom-0 ku:left-0 ku:right-0 ku:z-50 ku:border-t ku:flex ku:items-stretch ku:justify-around ku:overflow-hidden"
      :style="{ height: mobileBarHeight }"
      aria-label="Sections"
    >
      <button
        v-for="section in sections"
        :key="section.id"
        type="button"
        :aria-current="selectedSectionId === section.id ? 'true' : undefined"
        :data-has-active="hasSectionActiveItem(section) ? 'true' : undefined"
        class="ksn-section-btn ku:relative ku:flex-1 ku:flex ku:flex-col ku:items-center ku:justify-center ku:gap-1 ku:py-1 ku:px-0.5 ku:min-w-0 ku:transition-colors ku:duration-200 ku:focus-visible:outline-2 ku:focus-visible:ring-2 ku:focus-visible:ring-inset"
        @click="selectSection(section)"
      >
        <!-- Active indicator line at top -->
        <span
          v-if="
            selectedSectionId === section.id || hasSectionActiveItem(section)
          "
          class="ku:absolute ku:top-0 ku:w-1/2 ku:h-0.5 ku:rounded-full ku:[background-color:var(--kiut-primary)]"
          aria-hidden="true"
        />
        <component
          :is="section.icon"
          v-if="section.icon"
          class="ku:shrink-0"
          :style="{ width: primaryIconSize, height: primaryIconSize }"
          aria-hidden="true"
        />
        <span
          class="ku:text-[9px] ku:font-semibold ku:leading-none ku:truncate ku:w-full ku:text-center ku:px-0.5"
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

    /** What Section is open and with 'ku:update:selectedSectionId' we say to the father will be the next */
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
</script>

<style scoped>
/* Normal */
.primary-rail .ksn-section-btn {
  color: var(--kiut-text-secondary, #64748b);
}

/* Hover */
.primary-rail .ksn-section-btn:not([aria-current="true"]):hover {
  background-color: var(--kiut-primary-section);
  color: var(--kiut-text);
}

.dark .primary-rail .ksn-section-btn:not([aria-current="true"]):hover {
  background-color: var(--kiut-primary-section);
  color: #f5f3ff;
}

/* Activa vista */
.primary-rail .ksn-section-btn[data-has-active="true"] {
  color: var(--kiut-text);
}

.dark .primary-rail .ksn-section-btn[data-has-active="true"] {
  color: var(--kiut-text);
}

/* Buscando otra */
.primary-rail .ksn-section-btn[aria-current="true"] {
  background-color: var(--kiut-primary-section);
  color: var(--kiut-text);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.dark .primary-rail .ksn-section-btn[aria-current="true"] {
  background-color: var(--kiut-primary-section);
  color: var(--kiut-text);
}

/* Second Rail */
/* Normal */
.ksn-item-btn {
  color: var(--kiut-text-primary, #1e293b);
}

.dark .ksn-item-btn {
  color: var(--kiut-text-primary, #f8f9fa);
}

/* Hover */
.ksn-item-btn:not([aria-current="page"]):hover {
  background-color: var(--kiut-primary-section);
  color: var(--kiut-text);
}

.dark .ksn-item-btn:not([aria-current="page"]):hover {
  background-color: var(--kiut-primary-section);
  color: #f5f3ff;
}

/* Active */
.ksn-item-btn[aria-current="page"] {
  background-color: var(--kiut-secondary-section, #895af6);
  color: var(--kiut-text);
}

.dark .ksn-item-btn[aria-current="page"] {
  color: var(--kiut-text); /* purple-300 */
}

/* Rail Mobile */

.mobile-subsections {
  border-color: var(--kiut-lateral-border-color);
}

.ksn-mobile-bar {
  background-color: var(--kiut-lateral-bg);
  border-color: var(--kiut-lateral-border-color);
}

.ksn-mobile-bar .ksn-section-btn {
  color: var(--kiut-text-muted, #94a3b8);
}

.ksn-mobile-bar .ksn-section-btn[data-has-active="true"] {
  color: var(--kiut-primary, #8b5cf6);
  opacity: 0.75;
}

.ksn-mobile-bar .ksn-section-btn[aria-current="true"] {
  color: var(--kiut-primary, #8b5cf6);
  opacity: 1;
}

.ksn-mobile-bar .ksn-section-btn[data-has-active="true"]:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--kiut-primary, #8b5cf6) 30%, transparent);
}

/* ── Desktop: primary rail hover expand ── */
.primary-rail:hover {
  width: var(--expanded-width) !important;
}

.primary-rail {
  border-color: var(--kiut-lateral-border-color);
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

.primary-rail .footer-section {
  border-color: var(--kiut-lateral-border-color);
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
