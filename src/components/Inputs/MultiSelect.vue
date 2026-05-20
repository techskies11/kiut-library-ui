<template>
  <div ref="rootRef" class="ku:relative ku:font-sans">
    <label v-if="label" :id="labelId" :class="kiutLabelClass">{{ label }}</label>
    <button
      :id="buttonId"
      type="button"
      :disabled="disabled"
      :class="[
        kiutInputControlClass,
        'ku:flex ku:items-start ku:justify-between ku:gap-2 ku:text-left',
        open ? 'ku:border-[color:var(--kiut-primary)] ku:ring-2 ku:ring-[color:var(--kiut-primary)]/25' : '',
      ]"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-controls="listboxId"
      :aria-labelledby="label ? labelId : undefined"
      :aria-label="!label ? resolvedTriggerAriaLabel : undefined"
      @click="onTriggerClick"
      @keydown="onTriggerKeydown"
    >
      <div class="ku:min-h-[1.25rem] ku:min-w-0 ku:flex-1 ku:max-h-32 ku:overflow-y-auto ku:py-0.5">
        <template v-if="selectedOrdered.length === 0">
          <span
            class="ku:block ku:truncate ku:text-[color:var(--kiut-text-muted)] ku:dark:text-slate-500"
          >
            {{ placeholder }}
          </span>
        </template>
        <div v-else class="ku:flex ku:flex-wrap ku:gap-1">
          <span
            v-for="opt in selectedOrdered"
            :key="optionKey(opt)"
            class="ku:inline-flex ku:max-w-full ku:items-center ku:rounded-md ku:bg-slate-100 ku:px-2 ku:py-0.5 ku:text-xs ku:font-medium ku:text-[color:var(--kiut-text-primary)] ku:dark:bg-white/10 ku:dark:text-slate-100"
          >
            <span class="ku:truncate">{{ opt.label }}</span>
          </span>
        </div>
      </div>
      <ChevronDownIcon
        class="ku:mt-0.5 ku:h-5 ku:w-5 ku:shrink-0 ku:text-gray-400 ku:transition-transform ku:dark:text-slate-500"
        :class="open ? 'ku:rotate-180' : ''"
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
      class="ku:absolute ku:left-0 ku:right-0 ku:z-50 ku:mt-[-3px] ku:max-h-60 ku:overflow-auto ku:rounded-xl ku:border ku:border-gray-300 ku:bg-[color:var(--kiut-bg-secondary)] ku:py-1 ku:shadow-lg ku:dark:border-[color:var(--kiut-border-light)]"
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
        <span class="ku:flex ku:w-5 ku:shrink-0 ku:justify-center" aria-hidden="true">
          <CheckIcon v-if="isSelected(opt)" class="ku:h-4 ku:w-4 ku:text-white" />
        </span>
        <span class="ku:min-w-0 ku:flex-1">{{ opt.label }}</span>
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
  'ku:update:modelValue': [value: KiutSelectValue[]];
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
    'ku:flex ku:cursor-pointer ku:items-center ku:gap-1.5 ku:px-2 ku:py-2 ku:text-sm ku:outline-none ku:transition-colors',
    selected
      ? 'ku:mx-1 ku:rounded-lg ku:bg-[color:var(--kiut-primary)] ku:font-medium ku:text-white'
      : 'ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100',
    !selected && hi ? 'ku:bg-slate-100 ku:dark:bg-white/5' : '',
  ];
}

function toggleOption(opt: KiutSelectOption<KiutSelectValue>) {
  const next = [...(props.modelValue ?? [])];
  const i = next.indexOf(opt.value);
  if (i >= 0) next.splice(i, 1);
  else next.push(opt.value);
  emit('ku:update:modelValue', next);
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
