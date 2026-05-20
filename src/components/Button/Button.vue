<template>
  <span
    v-if="hasTooltip"
    class="group ku:relative ku:inline-flex ku:shrink-0"
  >
    <button
      :type="buttonType"
      class="ku:inline-flex ku:items-center ku:justify-center ku:gap-2 ku:rounded-xl ku:font-sans ku:text-sm ku:font-semibold ku:tracking-tight ku:transition-colors ku:focus-visible:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/40 ku:focus-visible:ring-offset-2 ku:disabled:pointer-events-none ku:disabled:opacity-45 ku:dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]"
      :class="[variantClass, attrs.class]"
      :disabled="disabled"
      :aria-label="effectiveAriaLabel"
      v-bind="forwardedAttrs"
    >
      <span
        v-if="$slots.icon"
        class="ku:inline-flex ku:shrink-0"
        :class="isAction ? 'ku:[&>svg]:size-4' : 'ku:[&>svg]:h-[1.125rem] ku:[&>svg]:w-[1.125rem]'"
        aria-hidden="true"
      >
        <slot name="icon" />
      </span>
      <span
        v-if="showLabelSlot"
        class="ku:min-w-0 ku:truncate"
      >
        <slot />
      </span>
    </button>
    <span
      role="tooltip"
      aria-hidden="true"
      class="ku:pointer-events-none ku:absolute ku:bottom-full ku:left-1/2 ku:z-50 ku:mb-2 ku:-translate-x-1/2 ku:whitespace-nowrap ku:rounded-lg ku:bg-white ku:px-3 ku:py-1.5 ku:font-sans ku:text-xs ku:font-medium ku:text-[color:var(--kiut-text-primary)] ku:opacity-0 ku:shadow-lg ku:shadow-slate-900/10 ku:ring-1 ku:ring-black/5 ku:transition-opacity ku:duration-150 ku:will-change-[opacity,visibility] ku:invisible ku:group-hover:visible ku:group-hover:opacity-100 ku:group-focus-within:visible ku:group-focus-within:opacity-100 ku:dark:bg-slate-800 ku:dark:text-slate-100 ku:dark:shadow-black/40 ku:dark:ring-white/10"
    >
      {{ tooltip }}
    </span>
  </span>
  <button
    v-else
    :type="buttonType"
    class="ku:inline-flex ku:items-center ku:justify-center ku:gap-2 ku:rounded-xl ku:font-sans ku:text-sm ku:font-semibold ku:tracking-tight ku:transition-colors ku:focus-visible:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/40 ku:focus-visible:ring-offset-2 ku:disabled:pointer-events-none ku:disabled:opacity-45 ku:dark:focus-visible:ring-offset-[color:var(--kiut-bg-secondary)]"
    :class="[variantClass, attrs.class]"
    :disabled="disabled"
    :aria-label="effectiveAriaLabel"
    v-bind="forwardedAttrs"
  >
    <span
      v-if="$slots.icon"
      class="ku:inline-flex ku:shrink-0"
      :class="isAction ? 'ku:[&>svg]:size-4' : 'ku:[&>svg]:h-[1.125rem] ku:[&>svg]:w-[1.125rem]'"
      aria-hidden="true"
    >
      <slot name="icon" />
    </span>
    <span
      v-if="showLabelSlot"
      class="ku:min-w-0 ku:truncate"
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
      'ku:px-4 ku:py-2.5',
      'ku:bg-[color:var(--kiut-primary)] ku:text-white ku:shadow-sm',
      'ku:hover:bg-[color:var(--kiut-primary-hover)] ku:active:bg-[color:var(--kiut-primary-dark)]',
      'ku:dark:text-white ku:dark:hover:brightness-110 ku:dark:active:brightness-95',
    ];
  }
  if (props.variant === 'secondary') {
    return [
      'ku:px-4 ku:py-2.5',
      'ku:border ku:border-slate-200 ku:bg-slate-50 ku:text-[color:var(--kiut-text-primary)]',
      'ku:hover:border-slate-300 ku:hover:bg-slate-100',
      'ku:active:bg-slate-200/80',
      'ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-slate-800/80 ku:dark:text-slate-100',
      'ku:dark:hover:border-white/[0.18] ku:dark:hover:bg-slate-800',
      'ku:dark:active:bg-slate-700/90',
    ];
  }
  /* action: solo icono, sin borde ni fondo por defecto */
  const danger = props.tone === 'danger';
  if (danger) {
    return [
      'ku:h-9 ku:w-9 ku:min-h-9 ku:min-w-9 ku:shrink-0 ku:border-0 ku:bg-transparent ku:p-0 ku:shadow-none',
      'ku:text-red-600',
      'ku:hover:bg-red-600 ku:hover:text-white',
      'ku:active:bg-red-700 ku:active:text-white',
      'ku:dark:text-red-400 ku:dark:hover:bg-red-600 ku:dark:hover:text-white',
      'ku:dark:active:bg-red-700',
    ];
  }
  return [
    'ku:h-9 ku:w-9 ku:min-h-9 ku:min-w-9 ku:shrink-0 ku:border-0 ku:bg-transparent ku:p-0 ku:shadow-none',
    'ku:text-[color:var(--kiut-text-primary)]',
    'ku:hover:bg-[color:var(--kiut-primary)] ku:hover:text-white',
    'ku:active:bg-[color:var(--kiut-primary-dark)] ku:active:text-white',
    'ku:dark:text-slate-200',
    'ku:dark:hover:bg-[color:var(--kiut-primary)] ku:dark:hover:text-white',
    'ku:dark:active:bg-[color:var(--kiut-primary-dark)]',
  ];
});
</script>
