<template>
  <span
    v-if="hasTooltip"
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
      class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-lg bg-white px-3 py-1.5 font-sans text-xs font-medium text-[color:var(--kiut-text-primary)] opacity-0 shadow-lg shadow-slate-900/10 ring-1 ring-black/5 transition-opacity duration-150 will-change-[opacity,visibility] invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 dark:bg-slate-800 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10"
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
import { computed, useAttrs } from 'vue';

defineOptions({ name: 'Button', inheritAttrs: false });

export type KiutButtonVariant = 'primary' | 'secondary' | 'action';

export type KiutButtonActionTone = 'default' | 'danger';

const props = withDefaults(
  defineProps<{
    variant?: KiutButtonVariant;
    /** Solo aplica a `variant="action"`: icono rojo y hover destructivo. */
    tone?: KiutButtonActionTone;
    disabled?: boolean;
    /** Texto del tooltip (posición superior). Útil en acciones solo icono. */
    tooltip?: string;
  }>(),
  {
    variant: 'primary',
    tone: 'default',
    disabled: false,
  }
);

const attrs = useAttrs();
const hasTooltip = computed(() => Boolean(props.tooltip?.trim()));

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
  if (props.variant === 'primary') {
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
      'dark:border-white/[0.12] dark:bg-slate-800/80 dark:text-slate-100',
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
</script>
