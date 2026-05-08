<template>
  <section class="text-left font-['Inter',system-ui,sans-serif]">
    <header
      v-if="$slots.description || $slots.actions"
      class="flex flex-col gap-4 sm:flex-row"
      :class="headerRowClass"
    >
      <div
        v-if="$slots.description"
        class="flex min-w-0 flex-1 flex-col gap-1.5"
      >
        <slot name="description" />
      </div>
      <div
        v-if="$slots.actions"
        class="flex shrink-0 flex-wrap items-center justify-end gap-2"
      >
        <slot name="actions" />
      </div>
    </header>

    <div
      v-if="$slots.content || $slots.default"
      :class="{ 'mt-6': $slots.description || $slots.actions }"
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

/** Sin descripción y con acciones: una sola fila debe alinear las acciones a la derecha (en columna también). */
const headerRowClass = computed(() => {
  const hasDescription = Boolean(slots.description);
  const hasActions = Boolean(slots.actions);
  if (hasDescription && hasActions) {
    return 'sm:justify-between sm:items-center';
  }
  if (!hasDescription && hasActions) {
    return 'max-sm:items-end sm:justify-end';
  }
  if (hasDescription && !hasActions) {
    return 'sm:items-start';
  }
  return '';
});
</script>
