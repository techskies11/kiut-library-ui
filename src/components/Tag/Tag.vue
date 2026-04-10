<template>
  <span
    v-if="isLiveMode"
    role="status"
    class="inline-flex w-min max-w-full min-h-[22px] items-center gap-2 rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug"
    :class="liveContainerClass"
  >
    <span
      v-if="statusLive === true"
      class="relative flex h-2 w-2 shrink-0 items-center justify-center"
      aria-hidden="true"
    >
      <span
        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 dark:bg-emerald-400/45"
      />
      <span
        class="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--kiut-success)]"
      />
    </span>
    <span class="min-w-0 flex-1 text-center" :class="liveTextClass">{{ liveLabel }}</span>
  </span>
  <span
    v-else
    class="inline-flex w-min max-w-full min-h-[22px] items-center justify-center rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] font-semibold leading-snug tracking-tight"
    :class="semanticClass"
  >
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'Tag' });

export type KiutTagColor =
  | 'purple'
  | 'warning'
  | 'success'
  | 'danger'
  | 'orange'
  | 'neutral';

const props = withDefaults(
  defineProps<{
    /** Si está definido (`true` / `false`), modo indicador de conexión. Si se omite, modo pill semántica. */
    statusLive?: boolean;
    /** Variante de color (solo modo semántico). */
    color?: KiutTagColor;
    /** `true`: borde acentuado y fondo mínimo; `false`: fondo suave tipo pastel. */
    outlined?: boolean;
    /** Texto cuando no hay slot (modo semántico). */
    label?: string;
    labelConnected?: string;
    labelDisconnected?: string;
  }>(),
  {
    color: 'neutral',
    outlined: false,
    labelConnected: 'Connected',
    labelDisconnected: 'Disconnected',
  }
);

const isLiveMode = computed(() => props.statusLive !== undefined);

const liveLabel = computed(() =>
  props.statusLive === true ? props.labelConnected : props.labelDisconnected
);

const liveContainerClass = computed(() => {
  if (props.statusLive === true) {
    return [
      'border border-emerald-200 bg-emerald-50',
      'dark:border-emerald-800/80 dark:bg-emerald-950/40',
    ];
  }
  return [
    'border border-transparent bg-slate-100 dark:border-slate-700/80 dark:bg-slate-800/90',
  ];
});

const liveTextClass = computed(() => {
  if (props.statusLive === true) {
    return 'text-emerald-700 dark:text-emerald-300';
  }
  return 'text-[color:var(--kiut-text-primary)] dark:text-slate-300';
});

const semanticClass = computed(() => {
  const o = props.outlined;
  switch (props.color) {
    case 'purple':
      return o
        ? 'border border-violet-500 bg-transparent text-violet-700 dark:border-violet-400 dark:text-violet-300'
        : 'border border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-700 dark:bg-violet-950/40 dark:text-violet-300';
    case 'warning':
      return o
        ? 'border border-amber-500 bg-transparent text-amber-800 dark:border-amber-400 dark:text-amber-200'
        : 'border border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/35 dark:text-amber-200';
    case 'success':
      return o
        ? 'border border-emerald-500 bg-transparent text-emerald-800 dark:border-emerald-400 dark:text-emerald-200'
        : 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/35 dark:text-emerald-200';
    case 'danger':
      return o
        ? 'border border-red-500 bg-transparent text-red-800 dark:border-red-400 dark:text-red-200'
        : 'border border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/35 dark:text-red-200';
    case 'orange':
      return o
        ? 'border border-orange-500 bg-transparent text-orange-800 dark:border-orange-400 dark:text-orange-200'
        : 'border border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950/35 dark:text-orange-200';
    case 'neutral':
    default:
      return o
        ? 'border border-slate-400 bg-transparent text-[color:var(--kiut-text-primary)] dark:border-slate-500 dark:text-slate-200'
        : 'border border-slate-200 bg-slate-100 text-[color:var(--kiut-text-primary)] dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200';
  }
});
</script>
