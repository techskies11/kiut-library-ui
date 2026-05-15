<template>
  <section class="text-left font-['Inter',system-ui,sans-serif]">
    <header
      v-if="$slots.description || $slots.filters || $slots.actions"
      class=""
    >
      <div
        v-if="$slots.description"
        class="flex min-w-0 flex-col gap-1.5 mb-4"
      >
        <slot name="description" />
      </div>

      <div v-if="$slots.filters || $slots.actions" :class="['flex flex-row gap-2 items-center', headerRowClass]">
        <div
          v-if="$slots.filters"
          class="flex shrink-0 flex-wrap items-center justify-end gap-2"
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
      :class="{ 'mt-6': $slots.description || $slots.filters || $slots.actions }"
    >
      <slot name="content">
        <slot />
      </slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

defineOptions({ name: 'Section' });

const slots = useSlots();

const headerRowClass = computed(() => {
  const hasDescription = Boolean(slots.description);
  const hasActions = Boolean(slots.actions);
  const hasFilters = Boolean(slots.filters);
  const hasRight = hasActions || hasFilters;

  if (hasDescription && hasRight) {
    return 'sm:justify-between sm:items-start';
  }
  if (!hasDescription && hasRight) {
    return 'max-sm:items-end sm:justify-end';
  }
  if (hasDescription && !hasRight) {
    return 'sm:items-start';
  }
  if(!hasFilters && hasActions) {
    return 'justify-end';
  }
  return '';
});
</script>
