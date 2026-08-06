<template>
  <aside
    class="kiut-vertical-nav-panel flex shrink-0 flex-col overflow-hidden rounded-xl border border-[color:var(--kiut-border-light)] [background-color:var(--kiut-lateral-bg)] font-['Inter',system-ui,sans-serif]"
    :style="{ width: panelWidth }"
    role="navigation"
    :aria-label="ariaLabel"
  >
    <div v-if="title" class="shrink-0 px-4 py-4">
      <p
        class="text-start text-[12px] font-bold uppercase tracking-widest [color:var(--kiut-text-subtitle)]"
      >
        {{ title }}
      </p>
    </div>

    <nav
      class="flex flex-1 flex-col gap-0.5 overflow-y-auto px-1 pb-3"
      :class="{ 'pt-2': !title }"
      :aria-label="title || ariaLabel"
    >
      <button
        v-for="item in items"
        :key="item.value"
        type="button"
        :data-nav-id="item.value"
        :data-testid="item.testId"
        :disabled="item.disabled === true"
        :aria-current="isItemActive(item) ? 'true' : undefined"
        class="kvnp-item group flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kiut-primary)]/20 disabled:cursor-not-allowed disabled:opacity-40"
        @click="onItemClick(item)"
      >
        <component
          :is="item.icon"
          v-if="item.icon"
          class="shrink-0"
          :style="{ width: iconSize, height: iconSize }"
          aria-hidden="true"
        />
        <span class="min-w-0 flex-1 truncate" :style="{ fontSize }">{{
          item.label
        }}</span>
        <svg
          v-if="isItemActive(item)"
          class="h-3.5 w-3.5 shrink-0 opacity-70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import type { VerticalNavItem } from "./moduleNavTypes";

defineOptions({ name: "VerticalNavPanel" });

export type { VerticalNavItem };

const props = withDefaults(
  defineProps<{
    items: VerticalNavItem[];
    modelValue: string;
    title?: string;
    ariaLabel?: string;
    panelWidth?: string;
    fontSize?: string;
    iconSize?: string;
  }>(),
  {
    ariaLabel: "Section navigation",
    panelWidth: "14rem",
    fontSize: "14px",
    iconSize: "16px",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [payload: { value: string; previousValue: string }];
}>();

function isItemActive(item: VerticalNavItem): boolean {
  return item.value === props.modelValue;
}

function onItemClick(item: VerticalNavItem) {
  if (item.disabled || item.value === props.modelValue) return;
  const previousValue = props.modelValue;
  emit("update:modelValue", item.value);
  emit("change", { value: item.value, previousValue });
}
</script>

<style scoped>
.kvnp-item {
  color: var(--kiut-text-primary, #1e293b);
}

.dark .kvnp-item {
  color: var(--kiut-text-primary, #f8f9fa);
}

.kvnp-item:not([aria-current="true"]):not(:disabled):hover {
  background-color: var(--kiut-primary-section);
  color: var(--kiut-text);
}

.dark .kvnp-item:not([aria-current="true"]):not(:disabled):hover {
  background-color: var(--kiut-primary-section);
  color: #f5f3ff;
}

.kvnp-item[aria-current="true"] {
  background-color: var(--kiut-secondary-section, #895af6);
  color: var(--kiut-text);
}

.dark .kvnp-item[aria-current="true"] {
  color: var(--kiut-text);
}
</style>
