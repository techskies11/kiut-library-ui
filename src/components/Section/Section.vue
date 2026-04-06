<template>
  <section
    class="text-left font-['Inter',system-ui,sans-serif]"
    :aria-labelledby="titleId"
  >
    <header
      class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
    >
      <div class="flex min-w-0 flex-1 gap-3 sm:items-start">
        <div
          v-if="hasIcon"
          class="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] text-[color:var(--kiut-primary)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-white/[0.08] dark:bg-[color:var(--kiut-bg-card)] dark:shadow-black/20 [&>svg]:h-5 [&>svg]:w-5"
          aria-hidden="true"
        >
          <slot name="icon">
            <component
              :is="icon"
              v-if="icon"
            />
          </slot>
        </div>
        <div class="min-w-0 space-y-1">
          <h2
            :id="titleId"
            class="text-xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100"
          >
            {{ title }}
          </h2>
          <p
            v-if="subtitle"
            class="text-sm leading-snug text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
          >
            {{ subtitle }}
          </p>
        </div>
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
      class="mt-8"
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
