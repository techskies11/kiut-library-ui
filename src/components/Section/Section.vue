<template>
  <section
    class="text-left font-['Inter',system-ui,sans-serif]"
    :aria-labelledby="titleId"
  >
    <header
      class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
    >
      <div class="flex min-w-0 flex-1 flex-col gap-1.5">
        <div class="flex min-w-0 items-center gap-2.5">
          <span
            v-if="hasIcon"
            class="inline-flex shrink-0 items-center text-[color:var(--kiut-text-primary)] dark:text-slate-100 [&>svg]:size-6"
            aria-hidden="true"
          >
            <slot name="icon">
              <component
                :is="icon"
                v-if="icon"
              />
            </slot>
          </span>
          <h2
            :id="titleId"
            class="min-w-0 text-3xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
          >
            {{ title }}
          </h2>
        </div>
        <p
          v-if="subtitle"
          class="text-base leading-snug text-[color:var(--kiut-text-secondary)] dark:text-[#838395]"
        >
          {{ subtitle }}
        </p>
      </div>
      <div
        v-if="$slots.actions"
        class="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:pt-0.5"
      >
        <slot name="actions" />
      </div>
    </header>

    <div
      v-if="$slots.default"
      class="mt-6"
    >
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, useSlots, type Component } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';

defineOptions({ name: 'Section' });

const props = defineProps<{
  title: string;
  subtitle?: string;
  /** Componente de icono (p. ej. de `@heroicons/vue/24/outline`). También puedes usar `#icon`. */
  icon?: Component;
}>();

const slots = useSlots();
const uid = `kiut-section-${randomInstanceSuffix()}`;
const titleId = `${uid}-title`;

const hasIcon = computed(() => Boolean(slots.icon || props.icon));
</script>
