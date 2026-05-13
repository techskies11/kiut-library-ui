<template>
  <div
    class="flex w-full min-w-0 flex-col items-center gap-2 rounded-2xl border border-[color:var(--kiut-border-light,rgba(0,0,0,0.05))] bg-[color:var(--kiut-bg-stats-badge,#fafafa)] p-4 text-center font-sans text-[color:var(--kiut-text-secondary,#64748b)]"
  >
    <div class="flex min-w-0 w-full max-w-full items-center justify-center gap-2">
      <span
        v-if="color"
        class="inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle"
        :style="{ backgroundColor: color }"
        aria-hidden="true"
      />
      <span class="min-w-0 max-w-full truncate text-[12px] leading-normal">{{ title }}</span>
    </div>
    <p class="text-[16px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]">
      {{ value }}
    </p>
    <p v-if="subvalue" class="text-[12px] leading-normal">
      {{ subvalue }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  /** Si se omite, no se muestra el punto indicador */
  color?: string
  title: string
  value: string
  /** Detalle opcional bajo el valor principal */
  subvalue?: string
}>()
</script>
