<template>
  <button
    :id="id"
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :aria-disabled="disabled ? 'true' : undefined"
    :disabled="disabled"
    :class="[
      'ku:relative ku:inline-flex ku:h-8 ku:w-[3.75rem] ku:shrink-0 ku:cursor-pointer ku:items-center ku:rounded-full ku:p-0.5 ku:shadow-sm ku:transition-colors',
      'ku:focus-visible:outline ku:focus-visible:outline-2 ku:focus-visible:outline-offset-2 ku:focus-visible:outline-[color:var(--kiut-primary)]',
      'ku:disabled:cursor-not-allowed ku:disabled:opacity-50',
      modelValue
        ? 'ku:bg-[color:var(--kiut-primary)]'
        : 'ku:bg-[#DEDEE3] ku:dark:bg-slate-600',
    ]"
    @click="toggle"
    @keydown.prevent.stop.space="toggle"
    @keydown.enter.prevent="toggle"
  >
    <span
      class="ku:pointer-events-none ku:inline-block ku:h-7 ku:w-7 ku:translate-x-0 ku:transform ku:rounded-full ku:bg-white ku:shadow-sm ku:transition-transform ku:duration-200 ku:ease-out"
      :class="modelValue ? 'ku:translate-x-7' : 'ku:translate-x-0'"
      aria-hidden="true"
    />
    <span class="ku:sr-only">{{ ariaLabel }}</span>
  </button>
</template>

<script setup lang="ts">
defineOptions({ name: 'Toggle' });

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    disabled?: boolean;
    id?: string;
    /** Texto solo para lectores de pantalla */
    ariaLabel?: string;
  }>(),
  {
    ariaLabel: 'Interruptor',
  }
);

const emit = defineEmits<{
  'ku:update:modelValue': [value: boolean];
}>();

function toggle() {
  if (props.disabled) return;
  emit('ku:update:modelValue', !props.modelValue);
}
</script>
