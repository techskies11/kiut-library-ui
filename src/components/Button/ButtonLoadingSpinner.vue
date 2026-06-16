<template>
  <svg
    class="inline-flex shrink-0 animate-spin"
    :class="sizeClass"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" stroke-opacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'ButtonLoadingSpinner' });

const props = withDefaults(
  defineProps<{
    /** Tamaño compacto para variant action; default para primary/secondary. */
    compact?: boolean;
  }>(),
  { compact: false }
);

const sizeClass = computed(() =>
  props.compact ? 'size-4' : 'h-[1.125rem] w-[1.125rem]'
);
</script>
