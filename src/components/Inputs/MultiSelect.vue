<template>
  <div ref="rootRef" class="relative font-sans">
    <div class="flex flex-row gap-3 items-center">
      <span
        v-if="$slots.icon"
        class="mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4"
        aria-hidden="true"
      >
        <slot name="icon" />
      </span>
      <label v-if="label" :id="labelId" :class="kiutLabelClass">{{
        label
      }}</label>
    </div>
    <button
      :id="buttonId"
      type="button"
      :disabled="disabled"
      :class="[
        kiutInputControlClass,
        'flex items-start justify-between gap-2 text-left',
        open
          ? 'border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25'
          : '',
      ]"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-controls="listboxId"
      :aria-labelledby="label ? labelId : undefined"
      :aria-label="!label ? resolvedTriggerAriaLabel : undefined"
      @click="onTriggerClick"
      @keydown="onTriggerKeydown"
    >
      <div
        class="min-h-[1.25rem] min-w-0 flex-1 max-h-32 overflow-y-auto py-0.5"
      >
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

    <div
      v-show="open"
      class="absolute left-0 right-0 z-50 mt-[-3px] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
    >
      <div
        v-if="searchable"
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
            @click.stop
            @keydown.stop="onSearchKeydown"
          />
        </div>
      </div>
      <button
        v-if="showSelectAll"
        ref="selectAllRef"
        type="button"
        role="checkbox"
        :aria-checked="selectAllAriaChecked"
        :disabled="enabledOptions.length === 0"
        class="flex w-full items-center gap-2 border-b border-gray-200 px-3 py-2 text-left text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none transition-colors hover:bg-slate-100 focus-visible:bg-slate-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--kiut-primary)] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:text-slate-100 dark:hover:bg-white/5 dark:focus-visible:bg-white/5"
        @click.stop="toggleSelectAll"
        @keydown="onSelectAllKeydown"
      >
        <span
          class="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-gray-400 transition-colors dark:border-slate-500"
          :class="
            allEnabledSelected || someEnabledSelected
              ? 'border-[color:var(--kiut-primary)] bg-[color:var(--kiut-primary)] text-white dark:border-[color:var(--kiut-primary)]'
              : ''
          "
          aria-hidden="true"
        >
          <MinusIcon v-if="someEnabledSelected" class="h-3 w-3" />
          <CheckIcon v-else-if="allEnabledSelected" class="h-3 w-3" />
        </span>
        <span>{{ selectAllLabel }}</span>
      </button>
      <ul
        :id="listboxId"
        ref="listRef"
        role="listbox"
        tabindex="-1"
        aria-multiselectable="true"
        class="max-h-60 overflow-auto py-1"
        @keydown.stop="onListKeydown"
      >
        <li
          v-if="visibleOptions.length === 0"
          class="px-3 py-2 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-500"
        >
          {{ noResultsText }}
        </li>
        <li
          v-for="(opt, index) in visibleOptions"
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
  </div>
</template>

<script setup lang="ts">
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
import { CheckIcon, MinusIcon } from "@heroicons/vue/24/solid";
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { randomInstanceSuffix } from "../../utils/randomId";
import { kiutInputControlClass, kiutLabelClass } from "./inputFieldStyles";
import type { KiutSelectOption, KiutSelectValue } from "./Select.vue";

defineOptions({ name: "MultiSelect" });

const props = withDefaults(
  defineProps<{
    modelValue: KiutSelectValue[];
    options: KiutSelectOption<KiutSelectValue>[];
    label?: string;
    /** Si no hay `label` visible, usar para el botón (accesibilidad) */
    ariaLabelTrigger?: string;
    placeholder?: string;
    disabled?: boolean;
    /** Muestra un buscador dentro del panel desplegable para filtrar opciones por label. */
    searchable?: boolean;
    searchPlaceholder?: string;
    noResultsText?: string;
    /** Permite seleccionar o limpiar todas las opciones habilitadas. */
    showSelectAll?: boolean;
    selectAllLabel?: string;
  }>(),
  {
    placeholder: "Seleccionar…",
    searchable: false,
    searchPlaceholder: "Buscar…",
    noResultsText: "Sin resultados",
    showSelectAll: false,
    selectAllLabel: "Seleccionar todas",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: KiutSelectValue[]];
}>();

const uid = `kiut-multiselect-${randomInstanceSuffix()}`;
const labelId = `${uid}-label`;
const buttonId = `${uid}-btn`;
const listboxId = `${uid}-listbox`;

const rootRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);
const selectAllRef = ref<HTMLButtonElement | null>(null);
const open = ref(false);
const highlightIndex = ref(0);
const searchQuery = ref("");

const enabledOptions = computed(() => props.options.filter((o) => !o.disabled));

const visibleOptions = computed(() => {
  if (!props.searchable) return enabledOptions.value;
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return enabledOptions.value;
  return enabledOptions.value.filter((o) =>
    o.label.toLowerCase().includes(q),
  );
});

const selectedSet = computed(() => new Set(props.modelValue ?? []));
const selectedEnabledCount = computed(
  () =>
    enabledOptions.value.filter((option) => selectedSet.value.has(option.value))
      .length,
);
const allEnabledSelected = computed(
  () =>
    enabledOptions.value.length > 0 &&
    selectedEnabledCount.value === enabledOptions.value.length,
);
const someEnabledSelected = computed(
  () => selectedEnabledCount.value > 0 && !allEnabledSelected.value,
);
const selectAllAriaChecked = computed(() =>
  someEnabledSelected.value ? "mixed" : allEnabledSelected.value,
);

const selectedOrdered = computed(() =>
  props.options.filter((o) => selectedSet.value.has(o.value)),
);

const resolvedTriggerAriaLabel = computed(() => {
  const base =
    props.ariaLabelTrigger ?? props.placeholder ?? "Seleccionar opciones";
  const n = selectedOrdered.value.length;
  if (n === 0) return base;
  return `${base}, ${n} seleccionada${n === 1 ? "" : "s"}`;
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
    "flex cursor-pointer items-center gap-1.5 px-2 py-2 text-sm outline-none transition-colors",
    selected
      ? "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white"
      : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
    !selected && hi ? "bg-slate-100 dark:bg-white/5" : "",
  ];
}

function toggleOption(opt: KiutSelectOption<KiutSelectValue>) {
  const next = [...(props.modelValue ?? [])];
  const i = next.indexOf(opt.value);
  if (i >= 0) next.splice(i, 1);
  else next.push(opt.value);
  emit("update:modelValue", next);
}

function toggleSelectAll() {
  const enabledValues = new Set(enabledOptions.value.map((option) => option.value));
  const preservedValues = (props.modelValue ?? []).filter(
    (value) => !enabledValues.has(value),
  );

  emit(
    "update:modelValue",
    allEnabledSelected.value
      ? preservedValues
      : [...preservedValues, ...enabledOptions.value.map((option) => option.value)],
  );
}

function syncHighlightToSelection() {
  const opts = visibleOptions.value;
  if (opts.length === 0) {
    highlightIndex.value = 0;
    return;
  }
  const set = selectedSet.value;
  const firstSel = opts.findIndex((o) => set.has(o.value));
  highlightIndex.value = firstSel >= 0 ? firstSel : 0;
}

function focusPanel() {
  if (props.searchable) {
    searchInputRef.value?.focus();
    return;
  }
  if (props.showSelectAll) {
    selectAllRef.value?.focus();
    return;
  }
  listRef.value?.focus();
}

function openPanel() {
  searchQuery.value = "";
  syncHighlightToSelection();
  void nextTick(() => focusPanel());
}

function closePanel() {
  open.value = false;
  searchQuery.value = "";
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
  const el = rootRef.value;
  if (el && !el.contains(e.target as Node)) {
    closePanel();
  }
}

function onTriggerKeydown(e: KeyboardEvent) {
  if (props.disabled) return;
  if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    if (!open.value) {
      open.value = true;
      openPanel();
    }
  }
}

function onSearchKeydown(e: KeyboardEvent) {
  const opts = visibleOptions.value;
  if (e.key === "Escape") {
    e.preventDefault();
    closePanel();
    return;
  }
  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (props.showSelectAll) {
      selectAllRef.value?.focus();
      return;
    }
    if (opts.length === 0) return;
    highlightIndex.value = 0;
    listRef.value?.focus();
    return;
  }
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (opts.length === 0) return;
    highlightIndex.value = opts.length - 1;
    listRef.value?.focus();
    return;
  }
  if (e.key === "Enter") {
    e.preventDefault();
    const opt = opts[highlightIndex.value];
    if (opt) toggleOption(opt);
  }
}

function onSelectAllKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    e.preventDefault();
    closePanel();
    return;
  }
  if (e.key === "ArrowDown" && visibleOptions.value.length > 0) {
    e.preventDefault();
    highlightIndex.value = 0;
    listRef.value?.focus();
    return;
  }
  if (e.key === "ArrowUp" && props.searchable) {
    e.preventDefault();
    searchInputRef.value?.focus();
  }
}

function onListKeydown(e: KeyboardEvent) {
  const opts = visibleOptions.value;
  if (e.key === "Escape") {
    e.preventDefault();
    closePanel();
    return;
  }
  if (opts.length === 0) return;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    highlightIndex.value = Math.min(highlightIndex.value + 1, opts.length - 1);
    return;
  }
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (highlightIndex.value === 0 && props.showSelectAll) {
      selectAllRef.value?.focus();
      return;
    }
    if (highlightIndex.value === 0 && props.searchable) {
      searchInputRef.value?.focus();
      return;
    }
    highlightIndex.value = Math.max(highlightIndex.value - 1, 0);
    return;
  }
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    const opt = opts[highlightIndex.value];
    if (opt) toggleOption(opt);
  }
}

watch(searchQuery, () => {
  highlightIndex.value = 0;
});

onMounted(() => {
  document.addEventListener("click", onDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener("click", onDocumentClick);
});
</script>
