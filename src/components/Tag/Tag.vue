<template>
  <span
    v-if="isLiveMode"
    role="status"
    class="ku:inline-flex ku:w-min ku:max-w-full ku:min-h-[22px] ku:items-center ku:gap-2 ku:whitespace-nowrap ku:rounded-full ku:px-3 ku:py-1 ku:text-center ku:text-xs ku:font-['Inter',system-ui,sans-serif] ku:leading-snug"
    :class="liveContainerClass"
  >
    <span
      v-if="statusLive === true"
      class="ku:relative ku:flex ku:h-2 ku:w-2 ku:shrink-0 ku:items-center ku:justify-center"
      aria-hidden="true"
    >
      <span
        class="ku:absolute ku:inline-flex ku:h-full ku:w-full ku:animate-ping ku:rounded-full ku:bg-emerald-500/50 ku:dark:bg-emerald-400/45"
      />
      <span
        class="ku:relative ku:inline-flex ku:h-2 ku:w-2 ku:rounded-full ku:bg-[color:var(--kiut-success)]"
      />
    </span>
    <span class="ku:min-w-0 ku:flex-1 ku:text-center" :class="liveTextClass">{{ liveLabel }}</span>
  </span>
  <span
    v-else
    class="ku:inline-flex ku:w-min ku:max-w-full ku:min-h-[22px] ku:items-center ku:justify-center ku:whitespace-nowrap ku:rounded-full ku:px-3 ku:py-1 ku:text-center ku:text-xs ku:font-['Inter',system-ui,sans-serif] ku:font-semibold ku:leading-snug ku:tracking-tight"
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
    /**
     * Las props `boolean` opcionales en Vue pueden quedar en `false` cuando no se pasan,
     * lo que activaba el modo conexión y mostraba siempre "Disconnected".
     * `undefined` explícito mantiene el modo semántico (pill con slot / `label`).
     */
    statusLive: undefined,
  }
);

const isLiveMode = computed(
  () => props.statusLive === true || props.statusLive === false,
);

const liveLabel = computed(() =>
  props.statusLive === true ? props.labelConnected : props.labelDisconnected
);

const liveContainerClass = computed(() => {
  if (props.statusLive === true) {
    return [
      'ku:border ku:border-emerald-200 ku:bg-emerald-50',
      'ku:dark:border-emerald-800/80 ku:dark:bg-emerald-950/40',
    ];
  }
  return [
    'ku:border ku:border-transparent ku:bg-slate-100 ku:dark:border-slate-700/80 ku:dark:bg-slate-800/90',
  ];
});

const liveTextClass = computed(() => {
  if (props.statusLive === true) {
    return 'ku:text-emerald-700 ku:dark:text-emerald-300';
  }
  return 'ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-300';
});

const semanticClass = computed(() => {
  const o = props.outlined;
  switch (props.color) {
    case 'purple':
      return o
        ? 'ku:border ku:border-violet-500 ku:bg-transparent ku:text-violet-700 ku:dark:border-violet-400 ku:dark:text-violet-300'
        : 'ku:border ku:border-violet-200 ku:bg-violet-50 ku:text-violet-700 ku:dark:border-violet-700 ku:dark:bg-violet-950/40 ku:dark:text-violet-300';
    case 'warning':
      return o
        ? 'ku:border ku:border-amber-500 ku:bg-transparent ku:text-amber-800 ku:dark:border-amber-400 ku:dark:text-amber-200'
        : 'ku:border ku:border-amber-200 ku:bg-amber-50 ku:text-amber-800 ku:dark:border-amber-800 ku:dark:bg-amber-950/35 ku:dark:text-amber-200';
    case 'success':
      return o
        ? 'ku:border ku:border-emerald-500 ku:bg-transparent ku:text-emerald-800 ku:dark:border-emerald-400 ku:dark:text-emerald-200'
        : 'ku:border ku:border-emerald-200 ku:bg-emerald-50 ku:text-emerald-800 ku:dark:border-emerald-800 ku:dark:bg-emerald-950/35 ku:dark:text-emerald-200';
    case 'danger':
      return o
        ? 'ku:border ku:border-red-500 ku:bg-transparent ku:text-red-800 ku:dark:border-red-400 ku:dark:text-red-200'
        : 'ku:border ku:border-red-200 ku:bg-red-50 ku:text-red-800 ku:dark:border-red-800 ku:dark:bg-red-950/35 ku:dark:text-red-200';
    case 'orange':
      return o
        ? 'ku:border ku:border-orange-500 ku:bg-transparent ku:text-orange-800 ku:dark:border-orange-400 ku:dark:text-orange-200'
        : 'ku:border ku:border-orange-200 ku:bg-orange-50 ku:text-orange-800 ku:dark:border-orange-800 ku:dark:bg-orange-950/35 ku:dark:text-orange-200';
    case 'neutral':
    default:
      return o
        ? 'ku:border ku:border-slate-400 ku:bg-transparent ku:text-[color:var(--kiut-text-primary)] ku:dark:border-slate-500 ku:dark:text-slate-200'
        : 'ku:border ku:border-slate-200 ku:bg-slate-100 ku:text-[color:var(--kiut-text-primary)] ku:dark:border-slate-600 ku:dark:bg-slate-800 ku:dark:text-slate-200';
  }
});
</script>
