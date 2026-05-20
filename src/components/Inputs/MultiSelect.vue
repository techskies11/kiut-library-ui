<template>
  <div ref="rootRef" class="relative font-sans">
    <label v-if="label" :id="labelId" :class="kiutLabelClass">{{ label }}</label>
    <button
      :id="buttonId"
      type="button"
      :disabled="disabled"
      :class="[
        kiutInputControlClass,
        'flex items-start justify-between gap-2 text-left',
        open ? 'border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25' : '',
      ]"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-controls="listboxId"
      :aria-labelledby="label ? labelId : undefined"
      :aria-label="!label ? resolvedTriggerAriaLabel : undefined"
      @click="onTriggerClick"
      @keydown="onTriggerKeydown"
    >
      <div class="min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5">
        <template v-if="selectedOrdered.length === 0">
          <span
            class="block truncate text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          >
            {{ placeholder }}
          </span>
        </template>
        <div v-else class="flex flex-wrap gap-1">
          <span
            v-for="opt in selectedOrdered"
            :key="optionKey(opt)"
            class="inline-flex max-w-full items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-[color:var(--kiut-text-primary)] dark:bg-white/10 dark:text-slate-100"
          >
            <span class="truncate">{{ opt.label }}</span>
          </span>
        </div>
      </div>
      <ChevronDownIcon
        class="mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500"
        :class="open ? 'rotate-180' : ''"
        aria-hidden="true"
      />
    </button>

    <ul
      v-show="open"
      :id="listboxId"
      ref="listRef"
      role="listbox"
      tabindex="-1"
      aria-multiselectable="true"
      class="absolute left-0 right-0 z-50 mt-[-3px] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]"
      @keydown.stop="onListKeydown"
    >
      <li
        v-for="(opt, index) in enabledOptions"
        :key="optionKey(opt)"
        role="option"
        :aria-selected="isSelected(opt)"
        :class="optionClass(opt, index)"
        @click.stop="toggleOption(opt)"
        @mouseenter="highlightIndex = index"
      >
        <span class="flex w-5 shrink-0 justify-center" aria-hidden="true">
          <CheckIcon v-if="isSelected(opt)" class="h-4 w-4 text-white" />
        </span>
        <span class="min-w-0 flex-1">{{ opt.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { CheckIcon } from '@heroicons/vue/24/solid';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';
import { kiutInputControlClass, kiutLabelClass } from './inputFieldStyles';
import type { KiutSelectOption, KiutSelectValue } from './Select.vue';

defineOptions({ name: 'MultiSelect' });

const props = withDefaults(
  defineProps<{
    modelValue: KiutSelectValue[];
    options: KiutSelectOption<KiutSelectValue>[];
    label?: string;
    /** Si no hay `label` visible, usar para el botón (accesibilidad) */
    ariaLabelTrigger?: string;
    placeholder?: string;
    disabled?: boolean;
  }>(),
  {
    placeholder: 'Seleccionar…',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: KiutSelectValue[]];
}>();

const uid = `kiut-multiselect-${randomInstanceSuffix()}`;
const labelId = `${uid}-label`;
const buttonId = `${uid}-btn`;
const listboxId = `${uid}-listbox`;

const rootRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
const open = ref(false);
const highlightIndex = ref(0);

const enabledOptions = computed(() => props.options.filter((o) => !o.disabled));

const selectedSet = computed(() => new Set(props.modelValue ?? []));

const selectedOrdered = computed(() =>
  props.options.filter((o) => selectedSet.value.has(o.value))
);

const resolvedTriggerAriaLabel = computed(() => {
  const base = props.ariaLabelTrigger ?? props.placeholder ?? 'Seleccionar opciones';
  const n = selectedOrdered.value.length;
  if (n === 0) return base;
  return `${base}, ${n} seleccionada${n === 1 ? '' : 's'}`;
});

function optionKey(opt: KiutSelectOption<KiutSelectValue>) {
  return `${String(opt.value)}-${opt.label}`;
}

function isSelected(opt: KiutSelectOption<KiutSelectValue>) {
  return selectedSet.value.has(opt.value);
}

function optionClass(opt: KiutSelectOption<KiutSelectValue>, index: number) {
  const selected = isSelected(opt);
  const hi = highlightIndex.value === index;
  return [
    'flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors',
    selected
      ? 'mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white'
      : 'text-[color:var(--kiut-text-primary)] dark:text-slate-100',
    !selected && hi ? 'bg-slate-100 dark:bg-white/5' : '',
  ];
}

function toggleOption(opt: KiutSelectOption<KiutSelectValue>) {
  const next = [...(props.modelValue ?? [])];
  const i = next.indexOf(opt.value);
  if (i >= 0) next.splice(i, 1);
  else next.push(opt.value);
  emit('update:modelValue', next);
}

function syncHighlightToSelection() {
  const opts = enabledOptions.value;
  if (opts.length === 0) {
    highlightIndex.value = 0;
    return;
  }
  const set = selectedSet.value;
  const firstSel = opts.findIndex((o) => set.has(o.value));
  highlightIndex.value = firstSel >= 0 ? firstSel : 0;
}

function toggle() {
  if (props.disabled) return;
  open.value = !open.value;
}

function onTriggerClick(e: MouseEvent) {
  e.stopPropagation();
  if (props.disabled) return;
  toggle();
  if (open.value) {
    syncHighlightToSelection();
    void nextTick(() => listRef.value?.focus());
  }
}

function onDocumentClick(e: MouseEvent) {
  if (!open.value) return;
  const el = rootRef.value;
  if (el && !el.contains(e.target as Node)) {
    open.value = false;
  }
}

function onTriggerKeydown(e: KeyboardEvent) {
  if (props.disabled) return;
  if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (!open.value) {
      open.value = true;
      syncHighlightToSelection();
      void nextTick(() => listRef.value?.focus());
    }
  }
}

function onListKeydown(e: KeyboardEvent) {
  const opts = enabledOptions.value;
  if (opts.length === 0) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    open.value = false;
    return;
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    highlightIndex.value = Math.min(highlightIndex.value + 1, opts.length - 1);
    return;
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    highlightIndex.value = Math.max(highlightIndex.value - 1, 0);
    return;
  }
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    const opt = opts[highlightIndex.value];
    if (opt) toggleOption(opt);
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick);
});
</script>
