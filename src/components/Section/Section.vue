<template>
  <section class="ku:text-left ku:font-['Inter',system-ui,sans-serif]">
    <header
      v-if="$slots.description || $slots.filters || $slots.actions"
      class=""
    >
      <div v-if="$slots.description" class="ku:flex ku:min-w-0 ku:flex-col ku:gap-1.5 ku:mb-4">
        <slot name="description" />
      </div>

      <div
        v-if="$slots.filters || $slots.actions"
        :class="['ku:flex ku:flex-wrap ku:gap-2 ku:items-center', headerRowClass]"
      >
        <div
          v-if="$slots.filters"
          class="ku:flex ku:min-w-0 ku:flex-1 ku:flex-wrap ku:items-center ku:gap-2"
        >
          <slot name="filters" />
        </div>
        <div
          v-if="$slots.actions"
          class="ku:flex ku:shrink-0 ku:flex-wrap ku:items-center ku:gap-2"
        >
          <slot name="actions" />
        </div>
      </div>
    </header>

    <div
      v-if="$slots.content || $slots.default"
      :class="{
        'ku:mt-6': $slots.description || $slots.filters || $slots.actions,
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

  if (hasFilters && hasActions) return "justify-between";
  if (hasActions) return "justify-end";
  return "";
});
</script>
