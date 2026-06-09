<template>
  <div
    v-if="isDropdown"
    ref="rootRef"
    class="relative inline-flex shrink-0 font-sans"
  >
    <button
      ref="buttonRef"
      :id="buttonId"
      type="button"
      class="inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]"
      :class="[variantClass, attrs.class]"
      :disabled="disabled"
      :aria-expanded="open"
      aria-haspopup="menu"
      :aria-controls="menuId"
      :aria-label="effectiveAriaLabel"
      v-bind="forwardedAttrs"
      @click="onTriggerClick"
      @keydown="onTriggerKeydown"
    >
      <span
        v-if="$slots.icon"
        class="inline-flex shrink-0 [&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]"
        aria-hidden="true"
      >
        <slot name="icon" />
      </span>
      <span class="min-w-0 truncate">
        <slot />
      </span>
      <ChevronDownIcon
        class="h-[1.125rem] w-[1.125rem] shrink-0 transition-transform"
        :class="open ? 'rotate-180' : ''"
        aria-hidden="true"
      />
    </button>

    <Teleport to="body">
      <div
        v-show="open"
        ref="panelRef"
        :id="menuId"
        role="menu"
        tabindex="-1"
        class="fixed z-[300] overflow-hidden rounded-xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] py-1 shadow-lg dark:border-[color:var(--kiut-border-light)]"
        :style="floatingStyle"
        @keydown.stop="onMenuKeydown"
      >
        <button
          v-for="(opt, index) in enabledOptions"
          :key="optionKey(opt)"
          type="button"
          role="menuitem"
          :disabled="opt.disabled"
          :class="menuItemClass(index)"
          @click.stop="selectOption(opt)"
          @mouseenter="highlightIndex = index"
        >
          <span
            v-if="opt.icon"
            class="inline-flex shrink-0 text-[color:var(--kiut-text-muted)] dark:text-slate-400"
            aria-hidden="true"
          >
            <component :is="opt.icon" class="h-5 w-5" />
          </span>
          <span
            v-else
            class="h-5 w-5 shrink-0"
            aria-hidden="true"
          />
          <span class="min-w-0 flex-1 text-left">
            <span class="block text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100">
              {{ opt.label }}
            </span>
            <span
              v-if="opt.description"
              class="mt-0.5 block text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
            >
              {{ opt.description }}
            </span>
          </span>
        </button>
      </div>
    </Teleport>
  </div>
  <span
    v-else-if="hasTooltip"
    class="group relative inline-flex shrink-0"
  >
    <button
      :type="buttonType"
      class="inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]"
      :class="[variantClass, attrs.class]"
      :disabled="disabled"
      :aria-label="effectiveAriaLabel"
      v-bind="forwardedAttrs"
    >
      <span
        v-if="$slots.icon"
        class="inline-flex shrink-0"
        :class="isAction ? '[&>svg]:size-4' : '[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]'"
        aria-hidden="true"
      >
        <slot name="icon" />
      </span>
      <span
        v-if="showLabelSlot"
        class="min-w-0 truncate"
      >
        <slot />
      </span>
    </button>
    <span
      role="tooltip"
      aria-hidden="true"
      class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
    >
      {{ tooltip }}
    </span>
  </span>
  <button
    v-else
    :type="buttonType"
    class="inline-flex items-center justify-center gap-2 rounded-xl font-sans text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]"
    :class="[variantClass, attrs.class]"
    :disabled="disabled"
    :aria-label="effectiveAriaLabel"
    v-bind="forwardedAttrs"
  >
    <span
      v-if="$slots.icon"
      class="inline-flex shrink-0"
      :class="isAction ? '[&>svg]:size-4' : '[&>svg]:h-[1.125rem] [&>svg]:w-[1.125rem]'"
      aria-hidden="true"
    >
      <slot name="icon" />
    </span>
    <span
      v-if="showLabelSlot"
      class="min-w-0 truncate"
    >
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  useAttrs,
  type Component,
} from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';

defineOptions({ name: 'Button', inheritAttrs: false });

export type KiutButtonVariant = 'primary' | 'secondary' | 'action' | 'dropdown';

export type KiutButtonActionTone = 'default' | 'danger';

export interface KiutButtonMenuOption {
  value: string;
  label: string;
  description?: string;
  icon?: Component;
  disabled?: boolean;
}

/** Alineación horizontal del panel respecto al botón disparador. */
export type KiutButtonMenuAlign = 'left' | 'right';

const props = withDefaults(
  defineProps<{
    variant?: KiutButtonVariant;
    /** Solo aplica a `variant="action"`: icono rojo y hover destructivo. */
    tone?: KiutButtonActionTone;
    disabled?: boolean;
    /** Texto del tooltip (posición superior). Útil en acciones solo icono. */
    tooltip?: string;
    /** Opciones del menú. Requerido cuando `variant="dropdown"`. */
    options?: KiutButtonMenuOption[];
    /** Ancho mínimo del panel desplegable (CSS length). */
    menuMinWidth?: string;
    /**
     * Alineación del panel respecto al botón.
     * `left`: borde izquierdo del menú con el borde izquierdo del botón.
     * `right`: borde derecho del menú con el borde derecho del botón (útil cuando el botón está al borde derecho).
     */
    menuAlign?: KiutButtonMenuAlign;
  }>(),
  {
    variant: 'primary',
    tone: 'default',
    disabled: false,
    options: () => [],
    menuMinWidth: '280px',
    menuAlign: 'left',
  }
);

const emit = defineEmits<{
  select: [option: KiutButtonMenuOption];
}>();

const attrs = useAttrs();
const hasTooltip = computed(() => Boolean(props.tooltip?.trim()) && props.variant !== 'dropdown');

const isDropdown = computed(() => props.variant === 'dropdown');
const isAction = computed(() => props.variant === 'action');

const showLabelSlot = computed(() => !isAction.value);

const effectiveAriaLabel = computed(() => {
  const fromAttrs = attrs['aria-label'];
  if (typeof fromAttrs === 'string' && fromAttrs.length > 0) return fromAttrs;
  if (isAction.value && props.tooltip?.trim()) return props.tooltip.trim();
  return undefined;
});

const buttonType = computed((): 'button' | 'submit' | 'reset' => {
  const t = attrs.type;
  if (t === 'submit' || t === 'reset' || t === 'button') return t;
  return 'button';
});

const forwardedAttrs = computed(() => {
  const { class: _c, type: _t, 'aria-label': _a, ...rest } = attrs as Record<string, unknown>;
  return rest;
});

const variantClass = computed(() => {
  if (props.variant === 'primary' || props.variant === 'dropdown') {
    return [
      'px-4 py-2.5',
      'bg-[color:var(--kiut-primary)] text-white shadow-sm',
      'hover:bg-[color:var(--kiut-primary-hover)] active:bg-[color:var(--kiut-primary-dark)]',
      'dark:text-white dark:hover:brightness-110 dark:active:brightness-95',
    ];
  }
  if (props.variant === 'secondary') {
    return [
      'px-4 py-2.5',
      'border border-slate-200 bg-slate-50 text-[color:var(--kiut-text-primary)]',
      'hover:border-slate-300 hover:bg-slate-100',
      'active:bg-slate-200/80',
      'dark:border-[color:var(--kiut-border-light)] dark:bg-slate-800/80 dark:text-slate-100',
      'dark:hover:border-white/[0.18] dark:hover:bg-slate-800',
      'dark:active:bg-slate-700/90',
    ];
  }
  /* action: solo icono, sin borde ni fondo por defecto */
  const danger = props.tone === 'danger';
  if (danger) {
    return [
      'h-9 w-9 min-h-9 min-w-9 shrink-0 border-0 bg-transparent p-0 shadow-none',
      'text-red-600',
      'hover:bg-red-600 hover:text-white',
      'active:bg-red-700 active:text-white',
      'dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white',
      'dark:active:bg-red-700',
    ];
  }
  return [
    'h-9 w-9 min-h-9 min-w-9 shrink-0 border-0 bg-transparent p-0 shadow-none',
    'text-[color:var(--kiut-text-primary)]',
    'hover:bg-[color:var(--kiut-primary)] hover:text-white',
    'active:bg-[color:var(--kiut-primary-dark)] active:text-white',
    'dark:text-slate-200',
    'dark:hover:bg-[color:var(--kiut-primary)] dark:hover:text-white',
    'dark:active:bg-[color:var(--kiut-primary-dark)]',
  ];
});

const uid = `kiut-button-menu-${randomInstanceSuffix()}`;
const buttonId = `${uid}-btn`;
const menuId = `${uid}-menu`;

const rootRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const open = ref(false);
const highlightIndex = ref(0);
const floatingStyle = ref<Record<string, string>>({});

const enabledOptions = computed(() => props.options.filter((o) => !o.disabled));

function optionKey(opt: KiutButtonMenuOption) {
  return `${opt.value}-${opt.label}`;
}

function updatePosition() {
  const btn = buttonRef.value;
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const style: Record<string, string> = {
    top: `${rect.bottom - 3}px`,
    minWidth: `max(${rect.width}px, ${props.menuMinWidth})`,
  };

  if (props.menuAlign === 'right') {
    style.right = `${window.innerWidth - rect.right}px`;
    style.left = 'auto';
  } else {
    style.left = `${rect.left}px`;
    style.right = 'auto';
  }

  floatingStyle.value = style;
}

function menuItemClass(index: number) {
  const hi = highlightIndex.value === index;
  return [
    'mx-1 flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-45',
    hi ? 'bg-slate-100 dark:bg-white/5' : '',
  ];
}

function closePanel() {
  open.value = false;
}

function openPanel() {
  updatePosition();
  highlightIndex.value = 0;
  void nextTick(() => panelRef.value?.focus());
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

function selectOption(opt: KiutButtonMenuOption) {
  if (opt.disabled) return;
  emit('select', opt);
  closePanel();
}

function onTriggerClick(e: MouseEvent) {
  e.stopPropagation();
  if (props.disabled) return;
  toggle();
}

function onDocumentClick(e: MouseEvent) {
  if (!open.value) return;
  const target = e.target as Node;
  const root = rootRef.value;
  const panel = panelRef.value;
  if (root && !root.contains(target) && (!panel || !panel.contains(target))) {
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

function onMenuKeydown(e: KeyboardEvent) {
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
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    const opt = opts[highlightIndex.value];
    if (opt) selectOption(opt);
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick);
});
</script>
