<template>
  <div ref="rootRef" class="ku:relative ku:font-sans">
    <label v-if="label" :id="labelId" :class="kiutLabelClass">{{ label }}</label>
    <button
      ref="buttonRef"
      :id="buttonId"
      type="button"
      :disabled="disabled"
      :class="[
        kiutInputControlClass,
        'ku:flex ku:items-center ku:justify-between ku:gap-2 ku:text-left',
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
      <span
        class="ku:min-w-0 ku:flex-1 ku:truncate"
        :class="modelValue === null || modelValue === undefined || modelValue === '' ? 'ku:text-[color:var(--kiut-text-muted)] ku:dark:text-slate-500' : ''"
      >
        {{ displayLabel }}
      </span>
      <ChevronDownIcon
        class="ku:h-5 ku:w-5 ku:shrink-0 ku:text-gray-400 ku:transition-transform ku:dark:text-slate-500"
        :class="open ? 'ku:rotate-180' : ''"
        aria-hidden="true"
      />
    </button>

    <Teleport to="body">
      <ul
        v-show="open"
        :id="listboxId"
        ref="listRef"
        role="listbox"
        tabindex="-1"
        :style="floatingStyle"
        class="ku:fixed ku:z-[300] ku:max-h-60 ku:overflow-auto ku:rounded-xl ku:border ku:border-gray-300 ku:bg-[color:var(--kiut-bg-secondary)] ku:py-1 ku:shadow-lg ku:dark:border-[color:var(--kiut-border-light)]"
        @keydown.stop="onListKeydown"
      >
        <li
          v-for="(opt, index) in enabledOptions"
          :key="optionKey(opt)"
          role="option"
          :aria-selected="isSelected(opt)"
          :class="optionClass(opt, index)"
          @click.stop="choose(opt)"
          @mouseenter="highlightIndex = index"
        >
          <span
            v-if="showOptionCheck"
            class="ku:flex ku:w-5 ku:shrink-0 ku:justify-center"
            aria-hidden="true"
          >
            <CheckIcon v-if="isSelected(opt)" class="ku:h-4 ku:w-4 ku:text-white" />
          </span>
          <span class="ku:min-w-0 ku:flex-1">{{ opt.label }}</span>
        </li>
      </ul>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { CheckIcon } from '@heroicons/vue/24/solid';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';
import { kiutInputControlClass, kiutLabelClass } from './inputFieldStyles';

defineOptions({ name: 'Select' });

export type KiutSelectValue = string | number;

export interface KiutSelectOption<T extends KiutSelectValue = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue: KiutSelectValue | null;
    options: KiutSelectOption<KiutSelectValue>[];
    label?: string;
    /** Si no hay `label` visible, usar para el botón (accesibilidad) */
    ariaLabelTrigger?: string;
    placeholder?: string;
    disabled?: boolean;
    /** Si es false, la opción activa solo se distingue por el fondo (sin columna de check). */
    showOptionCheck?: boolean;
  }>(),
  {
    placeholder: 'Seleccionar…',
    showOptionCheck: true,
  }
);

const emit = defineEmits<{
  'ku:update:modelValue': [value: KiutSelectValue];
}>();

const uid = `kiut-select-${randomInstanceSuffix()}`;
const labelId = `${uid}-label`;
const buttonId = `${uid}-btn`;
const listboxId = `${uid}-listbox`;

const rootRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
const open = ref(false);
const highlightIndex = ref(0);
const floatingStyle = ref<Record<string, string>>({});

function updatePosition() {
  const btn = buttonRef.value;
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  floatingStyle.value = {
    top: `${rect.bottom - 3}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
  };
}

const enabledOptions = computed(() => props.options.filter((o) => !o.disabled));

const resolvedTriggerAriaLabel = computed(
  () => props.ariaLabelTrigger ?? props.placeholder ?? 'Seleccionar opción'
);

const displayLabel = computed(() => {
  if (props.modelValue === null || props.modelValue === undefined || props.modelValue === '') {
    return props.placeholder;
  }
  const found = props.options.find((o) => o.value === props.modelValue);
  return found?.label ?? String(props.modelValue);
});

function optionKey(opt: KiutSelectOption<KiutSelectValue>) {
  return `${String(opt.value)}-${opt.label}`;
}

function isSelected(opt: KiutSelectOption<KiutSelectValue>) {
  return props.modelValue === opt.value;
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

function choose(opt: KiutSelectOption<KiutSelectValue>) {
  emit('ku:update:modelValue', opt.value);
  open.value = false;
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
    updatePosition();
    const i = Math.max(
      0,
      enabledOptions.value.findIndex((o) => o.value === props.modelValue)
    );
    highlightIndex.value = i;
    void nextTick(() => listRef.value?.focus());
  }
}

function onDocumentClick(e: MouseEvent) {
  if (!open.value) return;
  const target = e.target as Node;
  const el = rootRef.value;
  const list = listRef.value;
  if (el && !el.contains(target) && (!list || !list.contains(target))) {
    open.value = false;
  }
}

function onTriggerKeydown(e: KeyboardEvent) {
  if (props.disabled) return;
  if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (!open.value) {
      open.value = true;
      updatePosition();
      highlightIndex.value = Math.max(
        0,
        enabledOptions.value.findIndex((o) => o.value === props.modelValue)
      );
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
  if (e.key === 'Enter') {
    e.preventDefault();
    const opt = opts[highlightIndex.value];
    if (opt) choose(opt);
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick);
});
</script>
