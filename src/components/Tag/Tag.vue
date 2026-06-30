<template>
  <span
    v-if="isLiveMode"
    role="status"
    class="inline-flex w-min max-w-full min-h-[22px] items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-['Inter',system-ui,sans-serif] leading-snug"
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
    :class="[tagSemanticBaseClass, semanticClass]"
  >
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getTagSemanticClass, tagSemanticBaseClass } from './tagStyles';
import type { KiutTagColor } from './tagTypes';

defineOptions({ name: 'Tag' });

export type { KiutTagColor };

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

const semanticClass = computed(() =>
  getTagSemanticClass(props.color, props.outlined),
);
</script>
