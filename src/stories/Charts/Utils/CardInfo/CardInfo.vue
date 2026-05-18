<template>
  <div
    class="box-border flex w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl border border-[color:var(--kiut-border-light,rgba(0,0,0,0.05))] bg-[color:var(--kiut-bg-stats-badge,#fafafa)] px-3 py-2 text-center font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] text-[color:var(--kiut-text-secondary,#64748b)]"
    :class="subvalue ? 'h-[72px]' : 'h-[58px]'"
  >
    <div class="flex w-full min-w-0 justify-center">
      <div class="flex max-w-full min-w-0 items-center gap-2">
        <span
          v-if="color"
          class="inline-block h-2.5 w-2.5 shrink-0 rounded-full align-middle"
          :style="{ backgroundColor: color }"
          aria-hidden="true"
        />
        <span class="min-w-0 truncate text-[12px] leading-normal">{{ title }}</span>
      </div>
    </div>
    <p class="text-[14px] font-bold leading-tight text-[color:var(--kiut-text-primary,#1e293b)]">
      {{ value }}
    </p>
    <p v-if="subvalue" class="min-w-0 w-full truncate text-[10px] leading-normal">
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
