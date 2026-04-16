<template>
  <aside
    class="kiut-app-shell-nav flex flex-col h-full overflow-hidden"
    role="navigation"
    aria-label="Main navigation"
    v-bind="restAttrs"
  >
    <!-- Top area: two rails side by side, grow to fill height -->
    <div class="flex flex-1 min-h-0">
      <!-- ── Primary rail ── -->
      <div
        class="primary-rail w-[3.4rem] flex flex-col shrink-0 bg-[color:var(--kiut-bg-secondary)] border-r border-[color:var(--kiut-border-light)]"
        :style="{
          '--expanded-width': expandedPrimaryWidth,
        }"
        @mouseenter="isHoveringRail = true"
        @mouseleave="isHoveringRail = false"
      >

        <div
          v-if="$slots.logo"
          class="flex justify-center items-center mt-3 shrink-0"
        >
          <slot name="logo" :expanded="isHoveringRail" />
        </div>

        <!-- Section buttons -->
        <nav
          class="flex-1 overflow-y-auto p-1.5 flex flex-col gap-1"
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
            class="group relative flex flex-row items-center justify-start gap-1 px-2 py-2 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--kiut-primary)/20"
            :class="sectionButtonClass(section)"
            @click="selectSection(section)"
          >
            <component
              :is="section.icon"
              v-if="section.icon"
              class="w-[24px] h-[24px] shrink-0"
              aria-hidden="true"
            />
            <span
              class="leading-tight font-semibold tracking-wide text-left w-full truncate px-1"
              :style="{ fontSize: primaryFontSize }"
            >
              {{ section.label }}
            </span>
          </button>
        </nav>
        <!-- ── Footer slot – spans full width ── -->
        <div
          v-if="$slots.footer"
          class="shrink-0 border-t border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)]"
        >
          <slot name="footer" :expanded="isHoveringRail" />
        </div>
      </div>

      <!-- ── Secondary panel ── -->
      <Transition name="ksn-sub">
        <div
          v-if="activeSection"
          key="secondary"
          class="secondary-panel flex flex-col shrink-0 bg-[color:var(--kiut-bg-secondary)] border-r border-[color:var(--kiut-border-light)] overflow-hidden"
          :style="{ width: secondaryWidth }"
        >
          <!-- Section title -->
          <div class="px-4 pt-4 pb-2 shrink-0">
            <p
              class="text-[12px] font-bold uppercase tracking-widest text-(--kiut-text-muted)"
            >
              {{ activeSection.label }}
            </p>
          </div>

          <!-- Item list -->
          <nav
            class="flex-1 overflow-y-auto px-2 pb-3 flex flex-col gap-1"
            aria-label="Section items"
          >
            <button
              v-for="item in activeSection.items"
              :key="item.id"
              type="button"
              :data-nav-id="item.id"
              :aria-current="isItemActive(item) ? 'page' : undefined"
              class="group flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--kiut-primary)/20"
              :class="itemButtonClass(item)"
              @click="navigateToItem(activeSection!, item)"
            >
              <component
                :is="item.icon"
                v-if="item.icon"
                class="w-[14px] h-[14px]"
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
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, type Component } from "vue";

defineOptions({ name: "AppShellNavigation", inheritAttrs: false });

const isHoveringRail = ref(false);

/* Interface for the Navs of every Section*/
export interface NavItem {
  id: string;
  label: string;
  icon?: Component;
  path: string;
}

/* Every Section of the Menu Lateral. */
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

    /* What Section is open and with 'update:selectedSectionId' we say to the father will be the next */
    selectedSectionId?: string | null;

    /* Actual route  */
    activePath?: string;

    /* Width of the Section Panel Expanded */
    expandedPrimaryWidth?: string;

    /** Width of the Items Panel */
    secondaryWidth?: string;

    /* Font Size of the Section Panel */
    primaryFontSize?: string;

    /** Font Size of the Items Panel */
    secondaryFontSize?: string;
  }>(),
  {
    /* Default value of the props */
    selectedSectionId: null,
    activePath: "",
    expandedPrimaryWidth: "8rem",
    secondaryWidth: "12.5rem",
    primaryFontSize: "11px",
    secondaryFontSize: "14px",
  },
);

const emit = defineEmits<{
  /** Fired when the user clicks a section button. Toggle: clicking the active section closes it. */
  "update:selectedSectionId": [value: string | null];

  /** Fired when the user clicks a navigation item. Use this to call `router.push(item.path)`. */
  navigate: [payload: { section: NavSection; item: NavItem }];
}>();

const attrs = useAttrs();
// Separate class from the rest so we don't double-apply it this is for the two panels.
const { class: _class, ...restAttrs } = attrs as Record<string, unknown>;

/* Control if the items panel shows comparing if the selecedSectionID with props.section */
const activeSection = computed<NavSection | null>(() => {
  const section = props.sections.find((s) => s.id === props.selectedSectionId);
  // Just return if have items
  return section?.items?.length ? section : null;
});

/* Compare the activePath with the props.activePath is active if the match is exactly */
function isItemActive(item: NavItem): boolean {
  if (!props.activePath) return false;
  return (
    props.activePath === item.path ||
    props.activePath.startsWith(item.path + "/")
  );
}

/* Return true or false depending if is active a section with that highlight the selected section */
function hasSectionActiveItem(section: NavSection): boolean {
  return (section.items ?? []).some(isItemActive);
}

/* If click again the selected section will be closed or click another one will be opened */
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

/* Navigate to the new section */
function navigateToItem(section: NavSection, item: NavItem): void {
  emit("navigate", { section, item });
}

/* Style when is active or not */
function sectionButtonClass(section: NavSection): string[] {
  if (props.selectedSectionId === section.id) {
    return [
      "bg-purple-100 text-purple-900 shadow-sm dark:bg-purple-500/30 dark:text-purple-50",
    ];
  }
  if (hasSectionActiveItem(section)) {
    return ["text-(--kiut-primary)", "text-purple-800/90 dark:text-purple-400"];
  }
  return [
    "text-(--kiut-text-secondary)",
    "hover:bg-purple-100/50 hover:text-purple-900",
    "dark:hover:bg-purple-400/20 dark:hover:text-purple-50",
  ];
}

function itemButtonClass(item: NavItem): string[] {
  if (isItemActive(item)) {
    return [
      "bg-purple-100 text-purple-700",
      "dark:bg-purple-600/19 dark:text-purple-500",
    ];
  }
  return [
    "text-(--kiut-text-primary)",
    "hover:bg-purple-50 hover:text-purple-900",
    "dark:hover:bg-purple-500/30 dark:hover:text-purple-50",
  ];
}
</script>

<style scoped>
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
</style>
