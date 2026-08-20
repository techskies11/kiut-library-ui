<template>
  <div class="kiut-module-nav-layout flex min-h-0 w-full">
    <VerticalNavPanel
      :title="title"
      :items="items"
      :model-value="modelValue"
      :aria-label="ariaLabel"
      :panel-width="panelWidth"
      :font-size="fontSize"
      :icon-size="iconSize"
      @update:model-value="emit('update:modelValue', $event)"
      @change="emit('change', $event)"
    />

    <div class="min-w-0 flex-1">
      <Transition v-if="$slots.default" name="module-nav-panel" mode="out-in">
        <div :key="modelValue" class="module-nav-panel">
          <slot :active="modelValue" />
        </div>
      </Transition>
      <slot v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import VerticalNavPanel from "./VerticalNavPanel.vue";
import type { VerticalNavItem } from "./moduleNavTypes";

defineOptions({ name: "ModuleNavLayout" });

export type { VerticalNavItem };

withDefaults(
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
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [payload: { value: string; previousValue: string }];
}>();
</script>

<style scoped>
.kiut-module-nav-layout {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (min-width: 768px) {
  .kiut-module-nav-layout {
    flex-direction: row;
    align-items: flex-start;
  }
}

.module-nav-panel-enter-active,
.module-nav-panel-leave-active {
  transition: opacity 0.18s ease-out;
}

.module-nav-panel-enter-from,
.module-nav-panel-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .module-nav-panel-enter-active,
  .module-nav-panel-leave-active {
    transition: none;
  }
}
</style>
