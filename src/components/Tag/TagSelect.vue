<template>
  <div ref="rootRef" class="relative inline-flex font-sans">
    <button
      ref="buttonRef"
      type="button"
      :disabled="disabled"
      :class="[
        tagSemanticBaseClass,
        'cursor-pointer gap-1.5 transition-opacity disabled:cursor-not-allowed disabled:opacity-50',
        triggerSemanticClass,
        open ? 'ring-2 ring-[color:var(--kiut-primary)]/25' : '',
      ]"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-controls="listboxId"
      :aria-label="resolvedAriaLabel"
      @click="onTriggerClick"
      @keydown="onTriggerKeydown"
    >
      <span class="min-w-0 flex-1 truncate">{{ displayLabel }}</span>
      <ChevronDownIcon
        class="h-3.5 w-3.5 shrink-0 opacity-70 transition-transform"
        :class="open ? 'rotate-180' : ''"
        aria-hidden="true"
      />
    </button>

    <Teleport to="body">
      <div
        v-show="open"
        ref="panelRef"
        :style="floatingStyle"
        class="fixed z-[300] max-h-60 overflow-auto rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]"
      >
        <ul
          :id="listboxId"
          ref="listRef"
          role="listbox"
          tabindex="-1"
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
            <span class="flex w-5 shrink-0 justify-center" aria-hidden="true">
              <CheckIcon v-if="isSelected(opt)" class="h-4 w-4 text-white" />
            </span>
            <span class="min-w-0 flex-1">{{ opt.label }}</span>
          </li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { CheckIcon } from '@heroicons/vue/24/solid';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';
import { getTagSemanticClass, tagSemanticBaseClass } from './tagStyles';
import type { KiutTagColor, KiutTagSelectOption, KiutTagSelectValue } from './tagTypes';

defineOptions({ name: 'TagSelect' });

const props = withDefaults(
  defineProps<{
    modelValue: KiutTagSelectValue | null;
    options: KiutTagSelectOption<KiutTagSelectValue>[];
    disabled?: boolean;
    /** `true`: borde acentuado y fondo mínimo; `false`: fondo suave tipo pastel. */
    outlined?: boolean;
    ariaLabel?: string;
  }>(),
  {
    disabled: false,
    outlined: true,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: KiutTagSelectValue];
}>();

const uid = `kiut-tag-select-${randomInstanceSuffix()}`;
const listboxId = `${uid}-listbox`;

const rootRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
const open = ref(false);
const highlightIndex = ref(0);
const floatingStyle = ref<Record<string, string>>({});

const enabledOptions = computed(() => props.options.filter((o) => !o.disabled));

const selectedOption = computed(() =>
  props.options.find((o) => o.value === props.modelValue) ?? null
);

const triggerColor = computed((): KiutTagColor => selectedOption.value?.color ?? 'neutral');

const triggerSemanticClass = computed(() =>
  getTagSemanticClass(triggerColor.value, props.outlined)
);

const displayLabel = computed(() => {
  if (selectedOption.value) return selectedOption.value.label;
  if (props.modelValue !== null && props.modelValue !== undefined && props.modelValue !== '') {
    return String(props.modelValue);
  }
  return enabledOptions.value[0]?.label ?? 'Seleccionar…';
});

const resolvedAriaLabel = computed(
  () => props.ariaLabel ?? `Estado: ${displayLabel.value}`
);

function updatePosition() {
  const btn = buttonRef.value;
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  floatingStyle.value = {
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`,
  };
}

function optionKey(opt: KiutTagSelectOption<KiutTagSelectValue>) {
  return `${String(opt.value)}-${opt.label}`;
}

function isSelected(opt: KiutTagSelectOption<KiutTagSelectValue>) {
  return props.modelValue === opt.value;
}

function optionClass(opt: KiutTagSelectOption<KiutTagSelectValue>, index: number) {
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

function syncHighlightToValue() {
  highlightIndex.value = Math.max(
    0,
    enabledOptions.value.findIndex((o) => o.value === props.modelValue)
  );
}

function openPanel() {
  updatePosition();
  syncHighlightToValue();
  void nextTick(() => listRef.value?.focus());
}

function closePanel() {
  open.value = false;
}

function choose(opt: KiutTagSelectOption<KiutTagSelectValue>) {
  emit('update:modelValue', opt.value);
  closePanel();
}

function toggle() {
  if (props.disabled) return;
  if (open.value) {
    closePanel();
    return;
  }
  open.value = true;
  openPanel();
}

function onTriggerClick(e: MouseEvent) {
  e.stopPropagation();
  if (props.disabled) return;
  toggle();
}

function onDocumentClick(e: MouseEvent) {
  if (!open.value) return;
  const target = e.target as Node;
  const el = rootRef.value;
  const panel = panelRef.value;
  if (el && !el.contains(target) && (!panel || !panel.contains(target))) {
    closePanel();
  }
}

function onTriggerKeydown(e: KeyboardEvent) {
  if (props.disabled) return;
  if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (!open.value) {
      open.value = true;
      openPanel();
    }
  }
}

function onListKeydown(e: KeyboardEvent) {
  const opts = enabledOptions.value;
  if (e.key === 'Escape') {
    e.preventDefault();
    closePanel();
    buttonRef.value?.focus();
    return;
  }
  if (opts.length === 0) return;
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
