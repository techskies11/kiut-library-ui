<template>
  <section class="text-left font-['Inter',system-ui,sans-serif]">
    <header
      v-if="$slots.description || $slots.tabs || $slots.filters || $slots.actions"
      class=""
    >
      <!-- Description -->
      <div v-if="$slots.description" class="flex min-w-0 flex-col gap-1.5 mb-4">
        <slot name="description" />
      </div>

      <!--
        Tabs row: always full-width left.
        Actions are placed here only when there are NO filters
        (if filters exist, actions go in the filters row below).
      -->
      <div
        v-if="$slots.tabs"
        class="flex flex-wrap items-center gap-2"
        :class="!$slots.filters ? 'justify-between' : ''"
      >
        <div class="flex min-w-0 flex-1 items-center">
          <slot name="tabs" />
        </div>
        <div
          v-if="$slots.actions && !$slots.filters"
          class="flex shrink-0 flex-wrap items-center gap-2"
        >
          <slot name="actions" />
        </div>
      </div>

      <!--
        Filters + Actions row.
        Rendered when:
          - There are filters (with or without tabs), OR
          - There are actions but no tabs (legacy: actions-only row)
        When tabs also exist, a small top margin separates the two rows.
      -->
      <div
        v-if="$slots.filters || ($slots.actions && !$slots.tabs)"
        :class="[
          'flex flex-wrap gap-2 items-center',
          $slots.tabs ? 'mt-2' : '',
          filtersRowClass,
        ]"
      >
        <div
          v-if="$slots.filters"
          class="flex min-w-0 flex-1 flex-wrap items-center gap-2"
        >
          <slot name="filters" />
        </div>
        <div
          v-if="$slots.actions"
          class="flex shrink-0 flex-wrap items-center gap-2"
        >
          <slot name="actions" />
        </div>
      </div>
    </header>

    <div
      v-if="$slots.content || $slots.default"
      :class="{
        'mt-6': $slots.description || $slots.tabs || $slots.filters || $slots.actions,
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

const filtersRowClass = computed(() => {
  const hasFilters = Boolean(slots.filters);
  const hasActions = Boolean(slots.actions);

  if (hasFilters && hasActions) return "justify-between";
  if (hasActions) return "justify-end";
  return "";
});
</script>
