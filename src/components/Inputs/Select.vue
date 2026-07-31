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
      ref="buttonRef"
      :id="buttonId"
      type="button"
      :disabled="disabled"
      :class="[
        kiutInputControlClass,
        isInvalid ? kiutInputControlInvalidClass : '',
        open && !isInvalid
          ? 'border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25'
          : '',
        'flex items-center justify-between gap-2 text-left',
      ]"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-controls="listboxId"
      :aria-labelledby="label ? labelId : undefined"
      :aria-label="!label ? resolvedTriggerAriaLabel : undefined"
      :aria-invalid="isInvalid ? 'true' : undefined"
      :aria-describedby="errorText ? errorId : undefined"
      @click="onTriggerClick"
      @keydown="onTriggerKeydown"
    >
      <span class="flex min-w-0 flex-1 items-center gap-2.5 truncate">
        <span
          v-if="selectedLeadingClass"
          :class="selectedLeadingClass"
          class="shrink-0"
          aria-hidden="true"
        />
        <span
          v-if="selectedOption?.leadingIcon"
          :class="[
            'inline-flex shrink-0 items-center justify-center rounded-full',
            selectedOption.leadingIconWrapperClass,
          ]"
        >
          <component
            :is="selectedOption.leadingIcon"
            :class="['h-4 w-4', selectedOption.leadingIconClass]"
          />
        </span>
        <span
          class="min-w-0 truncate"
          :class="
            modelValue === null || modelValue === undefined || modelValue === ''
              ? 'text-[color:var(--kiut-text-muted)] dark:text-slate-500'
              : ''
          "
        >
          {{ displayLabel }}
        </span>
        <span
          v-if="selectedOption?.badge"
          :class="getSelectOptionBadgeClass(selectedOption.badge.variant)"
        >
          {{ selectedOption.badge.label }}
        </span>
      </span>
      <ChevronDownIcon
        class="h-5 w-5 shrink-0 text-gray-400 transition-transform dark:text-slate-500"
        :class="open ? 'rotate-180' : ''"
        aria-hidden="true"
      />
    </button>

    <p
      v-if="errorText"
      :id="errorId"
      :class="kiutFieldErrorTextClass"
      role="alert"
    >
      {{ errorText }}
    </p>

    <Teleport to="body">
      <div
        v-show="open"
        ref="panelRef"
        :style="floatingStyle"
        class="fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-lg dark:border-[color:var(--kiut-border-light)]"
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
          tabindex="-1"
          :class="
            listSectionLabel
              ? 'max-h-60 overflow-auto pb-1'
              : 'max-h-60 overflow-auto py-1'
          "
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
            @click.stop="choose(opt)"
            @mouseenter="highlightIndex = index"
          >
            <span
              v-if="opt.leadingClass"
              :class="opt.leadingClass"
              class="shrink-0"
              aria-hidden="true"
            />
            <span
              v-if="showOptionCheck"
              class="flex w-5 shrink-0 justify-center"
              aria-hidden="true"
            >
              <CheckIcon v-if="isSelected(opt)" class="h-4 w-4 text-white" />
            </span>
            <span class="min-w-0 flex-1 truncate">{{ opt.label }}</span>
            <span
              v-if="opt.badge"
              :class="getSelectOptionBadgeClass(opt.badge.variant)"
            >
              {{ opt.badge.label }}
            </span>
          </li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
import { CheckIcon } from "@heroicons/vue/24/solid";
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type Component,
} from "vue";
import { randomInstanceSuffix } from "../../utils/randomId";
import {
  kiutFieldErrorTextClass,
  kiutInputControlClass,
  kiutInputControlInvalidClass,
  kiutLabelClass,
} from "./inputFieldStyles";
import {
  getSelectOptionBadgeClass,
  type KiutSelectOptionBadge,
  type KiutSelectOptionBadgeVariant,
} from "./selectOptionBadgeStyles";

defineOptions({ name: "Select" });

export type KiutSelectValue = string | number;
export type { KiutSelectOptionBadge, KiutSelectOptionBadgeVariant };

export interface KiutSelectOption<T extends KiutSelectValue = string> {
  value: T;
  label: string;
  disabled?: boolean;
  /** Optional CSS classes for a leading visual (e.g. flag-icon). */
  leadingClass?: string;
  /** Optional trailing pill shown in the trigger and option row. */
  leadingIcon?: Component; // Heroicon por opción
  leadingIconClass?: string; // color del icono, ej. text-emerald-500
  leadingIconWrapperClass?: string; // círculo, ej. bg-emerald-100 rounded-full p-1
  badge?: KiutSelectOptionBadge;
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
    /** Muestra un buscador dentro del panel desplegable para filtrar opciones por label. */
    searchable?: boolean;
    searchPlaceholder?: string;
    noResultsText?: string;
    /** Encabezado de sección sobre la lista (p. ej. "Idioma"). */
    listSectionLabel?: string;
    invalid?: boolean;
    errorText?: string;
  }>(),
  {
    placeholder: "Seleccionar…",
    showOptionCheck: true,
    searchable: false,
    searchPlaceholder: "Buscar…",
    noResultsText: "Sin resultados",
    listSectionLabel: undefined,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: KiutSelectValue];
}>();

const uid = `kiut-select-${randomInstanceSuffix()}`;
const labelId = `${uid}-label`;
const buttonId = `${uid}-btn`;
const listboxId = `${uid}-listbox`;
const errorId = `${uid}-err`;

const isInvalid = computed(() => props.invalid ?? false);

const rootRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);
const open = ref(false);
const highlightIndex = ref(0);
const searchQuery = ref("");
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

const visibleOptions = computed(() => {
  if (!props.searchable) return enabledOptions.value;
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return enabledOptions.value;
  return enabledOptions.value.filter(
    (o) =>
      o.label.toLowerCase().includes(q) ||
      o.badge?.label.toLowerCase().includes(q),
  );
});

const resolvedTriggerAriaLabel = computed(
  () => props.ariaLabelTrigger ?? props.placeholder ?? "Seleccionar opción",
);

const selectedOption = computed(
  () => props.options.find((o) => o.value === props.modelValue) ?? null,
);

const displayLabel = computed(() => {
  if (
    props.modelValue === null ||
    props.modelValue === undefined ||
    props.modelValue === ""
  ) {
    return props.placeholder;
  }
  return selectedOption.value?.label ?? String(props.modelValue);
});

const selectedLeadingClass = computed(() => selectedOption.value?.leadingClass);

function optionKey(opt: KiutSelectOption<KiutSelectValue>) {
  return `${String(opt.value)}-${opt.label}`;
}

function isSelected(opt: KiutSelectOption<KiutSelectValue>) {
  return props.modelValue === opt.value;
}

function optionClass(opt: KiutSelectOption<KiutSelectValue>, index: number) {
  const selected = isSelected(opt);
  const hi = highlightIndex.value === index;
  const withSection = Boolean(props.listSectionLabel);
  return [
    "flex cursor-pointer items-center gap-2.5 text-sm outline-none transition-colors",
    withSection
      ? "border-b border-gray-200 px-3 py-2.5 last:border-b-0 dark:border-white/5"
      : "gap-1.5 px-2 py-2",
    selected
      ? withSection
        ? "bg-[color:var(--kiut-primary-section)] font-medium text-[color:var(--kiut-primary)] dark:bg-[color:var(--kiut-primary-section)]"
        : "mx-1 rounded-lg bg-[color:var(--kiut-primary)] font-medium text-white"
      : "text-[color:var(--kiut-text-primary)] dark:text-slate-100",
    !selected && hi ? "bg-slate-100 dark:bg-white/5" : "",
  ];
}

function syncHighlightToValue() {
  highlightIndex.value = Math.max(
    0,
    visibleOptions.value.findIndex((o) => o.value === props.modelValue),
  );
}

function focusPanel() {
  if (props.searchable) {
    searchInputRef.value?.focus();
    return;
  }
  listRef.value?.focus();
}

function openPanel() {
  updatePosition();
  searchQuery.value = "";
  syncHighlightToValue();
  void nextTick(() => focusPanel());
}

function closePanel() {
  open.value = false;
  searchQuery.value = "";
}

function choose(opt: KiutSelectOption<KiutSelectValue>) {
  emit("update:modelValue", opt.value);
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
    if (opt) choose(opt);
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
    if (highlightIndex.value === 0 && props.searchable) {
      searchInputRef.value?.focus();
      return;
    }
    highlightIndex.value = Math.max(highlightIndex.value - 1, 0);
    return;
  }
  if (e.key === "Enter") {
    e.preventDefault();
    const opt = opts[highlightIndex.value];
    if (opt) choose(opt);
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

<style>
.kiut-select-option-badge--configured {
  border: 1px solid rgb(168 85 247 / 0.55);
  background: rgb(243 232 255);
  color: rgb(107 33 168);
}

.dark .kiut-select-option-badge--configured {
  background: rgb(59 7 100 / 0.85);
  color: rgb(233 213 255);
}

.kiut-select-option-badge--autoconfigured {
  border: 1px dashed rgb(74 222 128 / 0.55);
  background: rgb(220 252 231);
  color: rgb(21 128 61);
}

.dark .kiut-select-option-badge--autoconfigured {
  background: rgb(5 46 22 / 0.85);
  color: rgb(187 247 208);
}

.kiut-select-option-badge--neutral {
  border: 1px solid rgb(107 114 128 / 0.45);
  background: rgb(243 244 246);
  color: rgb(55 65 81);
}

.dark .kiut-select-option-badge--neutral {
  background: rgb(31 41 55 / 0.85);
  color: rgb(209 213 219);
}
</style>
