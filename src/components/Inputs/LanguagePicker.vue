<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] font-sans shadow-sm dark:border-[color:var(--kiut-border-light)]"
    :class="disabled ? 'pointer-events-none opacity-50' : ''"
  >
    <div
      class="border-b border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-3 dark:border-[color:var(--kiut-border-light)]"
    >
      <div class="relative">
        <span
          class="pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center"
          aria-hidden="true"
        >
          <MagnifyingGlassIcon
            class="h-4 w-4 text-[color:var(--kiut-text-muted)] dark:text-slate-500"
          />
        </span>
        <input
          ref="searchInputRef"
          v-model="searchQuery"
          type="search"
          :class="[kiutInputControlClass, 'min-h-0 py-2 pl-9 pr-3 text-sm']"
          :placeholder="searchPlaceholder"
          :aria-label="searchPlaceholder"
          :disabled="disabled"
          @keydown="onSearchKeydown"
        />
      </div>
    </div>

    <p
      v-if="listSectionLabel"
      class="px-3 pb-1 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--kiut-text-muted)] dark:text-slate-500"
    >
      {{ listSectionLabel }}
    </p>

    <ul
      :id="listboxId"
      ref="listRef"
      role="listbox"
      tabindex="0"
      :aria-label="listSectionLabel || searchPlaceholder"
      :class="listMaxHeightClass"
      class="overflow-auto pb-1 outline-none"
      @keydown="onListKeydown"
    >
      <li
        v-if="visibleOptions.length === 0"
        class="px-3 py-6 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
      >
        {{ noResultsText }}
      </li>
      <li
        v-for="(option, index) in visibleOptions"
        :key="optionKey(option)"
        role="option"
        :aria-selected="isSelected(option)"
        :class="optionClass(option, index)"
        @click="choose(option)"
        @mouseenter="highlightIndex = index"
      >
        <span
          v-if="option.flagClass"
          :class="option.flagClass"
          class="shrink-0"
          aria-hidden="true"
        />
        <span class="min-w-0 flex-1 truncate">{{ option.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { computed, ref, watch } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';
import { kiutInputControlClass } from './inputFieldStyles';

defineOptions({ name: 'LanguagePicker' });

export interface KiutLanguagePickerOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** CSS classes for the flag visual (e.g. `flag-icon flag-icon-es`). */
  flagClass?: string;
}

const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    options: KiutLanguagePickerOption[];
    disabled?: boolean;
    searchPlaceholder?: string;
    noResultsText?: string;
    listSectionLabel?: string;
    /** Tailwind max-height utility for the scrollable list (e.g. `max-h-60`). */
    listMaxHeightClass?: string;
  }>(),
  {
    disabled: false,
    searchPlaceholder: 'Buscar por nombre…',
    noResultsText: 'Sin resultados',
    listSectionLabel: 'Idioma',
    listMaxHeightClass: 'max-h-60',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const uid = `kiut-language-picker-${randomInstanceSuffix()}`;
const listboxId = `${uid}-listbox`;

const searchInputRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLUListElement | null>(null);
const searchQuery = ref('');
const highlightIndex = ref(0);

const enabledOptions = computed(() => props.options.filter((option) => !option.disabled));

const visibleOptions = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return enabledOptions.value;
  return enabledOptions.value.filter((option) => option.label.toLowerCase().includes(query));
});

function optionKey(option: KiutLanguagePickerOption) {
  return `${option.value}-${option.label}`;
}

function isSelected(option: KiutLanguagePickerOption) {
  return props.modelValue === option.value;
}

function optionClass(option: KiutLanguagePickerOption, index: number) {
  const selected = isSelected(option);
  const highlighted = highlightIndex.value === index;
  return [
    'flex cursor-pointer items-center gap-2.5 border-b border-gray-200 px-3 py-2.5 text-sm transition-colors last:border-b-0 dark:border-white/5',
    selected
      ? 'bg-[color:var(--kiut-primary)]/10 font-medium text-[color:var(--kiut-text-primary)] dark:bg-[color:var(--kiut-primary)]/15 dark:text-slate-100'
      : 'text-[color:var(--kiut-text-primary)] dark:text-slate-100',
    !selected && highlighted ? 'bg-slate-100 dark:bg-white/5' : '',
  ];
}

function syncHighlightToValue() {
  highlightIndex.value = Math.max(
    0,
    visibleOptions.value.findIndex((option) => option.value === props.modelValue)
  );
}

function choose(option: KiutLanguagePickerOption) {
  if (option.disabled) return;
  emit('update:modelValue', option.value);
}

function onSearchKeydown(event: KeyboardEvent) {
  const options = visibleOptions.value;
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (options.length === 0) return;
    highlightIndex.value = 0;
    listRef.value?.focus();
    return;
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (options.length === 0) return;
    highlightIndex.value = options.length - 1;
    listRef.value?.focus();
    return;
  }
  if (event.key === 'Enter') {
    event.preventDefault();
    const option = options[highlightIndex.value];
    if (option) choose(option);
  }
}

function onListKeydown(event: KeyboardEvent) {
  const options = visibleOptions.value;
  if (options.length === 0) return;

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    highlightIndex.value = Math.min(highlightIndex.value + 1, options.length - 1);
    return;
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (highlightIndex.value === 0) {
      searchInputRef.value?.focus();
      return;
    }
    highlightIndex.value = Math.max(highlightIndex.value - 1, 0);
    return;
  }
  if (event.key === 'Enter') {
    event.preventDefault();
    const option = options[highlightIndex.value];
    if (option) choose(option);
  }
}

watch(searchQuery, () => {
  highlightIndex.value = 0;
});

watch(
  () => props.modelValue,
  () => {
    syncHighlightToValue();
  },
  { immediate: true }
);

defineExpose({
  focusSearch: () => searchInputRef.value?.focus(),
});
</script>
