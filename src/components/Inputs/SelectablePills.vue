<template>
  <div
    class="font-sans"
    :role="multiple ? 'group' : 'radiogroup'"
    :aria-label="ariaLabel"
  >
    <div class="flex flex-wrap gap-2">
      <button
        v-for="item in items"
        :key="item.value"
        type="button"
        :class="pillClass(item)"
        :aria-checked="isSelected(item)"
        :role="multiple ? 'checkbox' : 'radio'"
        @click="toggle(item)"
      >
        <span
          class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] bg-white transition dark:bg-[color:var(--kiut-bg-secondary)]"
        >
          <span
            v-if="isSelected(item)"
            class="h-2 w-2 rounded-full bg-[color:var(--kiut-primary)]"
          />
        </span>
        <span
          v-if="item.dotColor"
          class="h-2 w-2 shrink-0 rounded-full"
          :style="{ backgroundColor: item.dotColor }"
          aria-hidden="true"
        />
        <span
          class="text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100"
        >
          {{ item.label }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'SelectablePills' });

export interface KiutPillItem {
  value: string;
  label: string;
  /** Si se define, se muestra un punto de categoría (variante “Áreas”) */
  dotColor?: string;
}

const props = withDefaults(
  defineProps<{
    items: KiutPillItem[];
    /** false = un solo valor (radio); true = varios (checkbox) */
    multiple?: boolean;
    /** Un valor o lista según `multiple` */
    modelValue: string | string[] | null;
    ariaLabel?: string;
  }>(),
  {
    multiple: false,
    ariaLabel: 'Opciones',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string | string[] | null];
}>();

const selectedList = computed(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) ? props.modelValue : [];
  }
  return [];
});

function isSelected(item: KiutPillItem): boolean {
  if (props.multiple) {
    return selectedList.value.includes(item.value);
  }
  return props.modelValue === item.value;
}

function pillClass(item: KiutPillItem) {
  const on = isSelected(item);
  return [
    'inline-flex max-w-full items-center gap-2 rounded-xl border px-3 py-2 text-left transition',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]',
    on
      ? 'border-[color:var(--kiut-primary)]/50 bg-violet-50/80 dark:bg-violet-950/30'
      : 'border-gray-300 bg-white dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]',
  ];
}

function toggle(item: KiutPillItem) {
  if (props.multiple) {
    const arr = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const i = arr.indexOf(item.value);
    if (i >= 0) arr.splice(i, 1);
    else arr.push(item.value);
    emit('update:modelValue', arr);
    return;
  }
  emit('update:modelValue', item.value);
}
</script>
