<template>
  <section class="text-left font-['Inter',system-ui,sans-serif]">
    <header
      v-if="$slots.description || $slots.filters || $slots.actions"
      class=""
    >
      <div v-if="$slots.description" class="flex min-w-0 flex-col gap-1.5 mb-4">
        <slot name="description" />
      </div>

      <div
        v-if="$slots.filters || $slots.actions"
        :class="['flex flex-wrap gap-2 items-center', headerRowClass]"
      >
        <div
          v-if="$slots.filters"
          class="flex min-w-0 flex-1 flex-wrap items-center gap-2"
        >
          <slot name="filters" />
        </div>
        <div
          v-if="$slots.actions"
          class="flex shrink-0 flex-wrap items-center justify-end gap-2"
        >
          <slot name="actions" />
        </div>
      </div>
    </header>

    <div
      v-if="$slots.content || $slots.default"
      :class="{
        'mt-6': $slots.description || $slots.filters || $slots.actions,
      }"
    >
      <slot name="content">
        <slot />
      </slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

defineOptions({ name: "Section" });

const slots = useSlots();

const headerRowClass = computed(() => {
  const hasFilters = Boolean(slots.filters);
  const hasActions = Boolean(slots.actions);

  if (hasFilters) return "justify-between";
  if (hasActions) return "justify-end";
  return "";
});
</script>
