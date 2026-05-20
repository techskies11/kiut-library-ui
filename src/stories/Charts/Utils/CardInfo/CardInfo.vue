<template>
  <div
    class="card-info ku:box-border ku:flex ku:w-full ku:min-w-0 ku:flex-col ku:items-center ku:justify-center ku:gap-1 ku:overflow-hidden ku:rounded-2xl ku:px-3 ku:py-2 ku:text-center ku:font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] ku:text-[color:var(--kiut-text-secondary,#64748b)]"
    :class="subvalue ? 'ku:h-[75px]' : 'ku:h-[58px]'"
  >
    <div class="ku:flex ku:w-full ku:min-w-0 ku:justify-center">
      <div class="ku:flex ku:max-w-full ku:min-w-0 ku:items-center ku:gap-2">
        <span
          v-if="color"
          class="ku:inline-block ku:h-2.5 ku:w-2.5 ku:shrink-0 ku:rounded-full ku:align-middle"
          :style="{ backgroundColor: color }"
          aria-hidden="true"
        />
        <span class="ku:min-w-0 ku:truncate ku:text-[12px] ku:leading-normal">{{ title }}</span>
      </div>
    </div>
    <p class="ku:text-[14px] ku:font-bold ku:leading-tight ku:text-[color:var(--kiut-text-primary,#1e293b)]">
      {{ value }}
    </p>
    <p v-if="subvalue" class="ku:min-w-0 ku:w-full ku:truncate ku:text-[10px] ku:leading-normal">
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

<style scoped>
.card-info {
  background-color: var(--kiut-bg-stats-badge, #fafafa);
  border: 1px solid var(--kiut-border-light, rgba(0, 0, 0, 0.05));
}
</style>
