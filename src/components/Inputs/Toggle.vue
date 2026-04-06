<template>
  <button
    :id="id"
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :aria-disabled="disabled ? 'true' : undefined"
    :disabled="disabled"
    :class="[
      'relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-sm transition-colors',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]',
      'disabled:cursor-not-allowed disabled:opacity-50',
      modelValue
        ? 'bg-[color:var(--kiut-primary)]'
        : 'bg-[#DEDEE3] dark:bg-slate-600',
    ]"
    @click="toggle"
    @keydown.prevent.stop.space="toggle"
    @keydown.enter.prevent="toggle"
  >
    <span
      class="pointer-events-none inline-block h-7 w-7 translate-x-0 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-out"
      :class="modelValue ? 'translate-x-7' : 'translate-x-0'"
      aria-hidden="true"
    />
    <span class="sr-only">{{ ariaLabel }}</span>
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
  'update:modelValue': [value: boolean];
}>();

function toggle() {
  if (props.disabled) return;
  emit('update:modelValue', !props.modelValue);
}
</script>
