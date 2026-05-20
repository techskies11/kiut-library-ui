<template>
  <div
    class="ku:font-sans"
    :role="multiple ? 'group' : 'radiogroup'"
    :aria-label="ariaLabel"
  >
    <div class="ku:flex ku:flex-wrap ku:gap-2">
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
          class="ku:flex ku:h-4 ku:w-4 ku:shrink-0 ku:items-center ku:justify-center ku:rounded-full ku:border-2 ku:border-[color:var(--kiut-primary)] ku:bg-white ku:transition ku:dark:bg-[color:var(--kiut-bg-secondary)]"
        >
          <span
            v-if="isSelected(item)"
            class="ku:h-2 ku:w-2 ku:rounded-full ku:bg-[color:var(--kiut-primary)]"
          />
        </span>
        <span
          v-if="item.dotColor"
          class="ku:h-2 ku:w-2 ku:shrink-0 ku:rounded-full"
          :style="{ backgroundColor: item.dotColor }"
          aria-hidden="true"
        />
        <span
          class="ku:text-sm ku:font-medium ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100"
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
  'ku:update:modelValue': [value: string | string[] | null];
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
    'ku:inline-flex ku:max-w-full ku:items-center ku:gap-2 ku:rounded-xl ku:border ku:px-3 ku:py-2 ku:text-left ku:transition',
    'ku:focus-visible:outline ku:focus-visible:outline-2 ku:focus-visible:outline-offset-2 ku:focus-visible:outline-[color:var(--kiut-primary)]',
    on
      ? 'ku:border-[color:var(--kiut-primary)]/50 ku:bg-violet-50/80 ku:dark:bg-violet-950/30'
      : 'ku:border-gray-300 ku:bg-white ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-[color:var(--kiut-bg-secondary)]',
  ];
}

function toggle(item: KiutPillItem) {
  if (props.multiple) {
    const arr = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const i = arr.indexOf(item.value);
    if (i >= 0) arr.splice(i, 1);
    else arr.push(item.value);
    emit('ku:update:modelValue', arr);
    return;
  }
  emit('ku:update:modelValue', item.value);
}
</script>
