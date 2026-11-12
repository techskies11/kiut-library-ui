<template>
  <button
    :id="id"
    type="button"
    role="checkbox"
    :aria-checked="modelValue"
    :aria-label="ariaLabel"
    :disabled="disabled"
    :class="[
      'flex h-5 w-5 items-center justify-center rounded-full border-2 border-[color:var(--kiut-primary)] transition-colors',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--kiut-primary)]',
      'disabled:cursor-not-allowed disabled:opacity-50',
      modelValue
        ? 'bg-[color:var(--kiut-primary)] text-white'
        : 'bg-transparent',
    ]"
    @click="toggle"
  >
    <svg
      v-if="modelValue"
      viewBox="0 0 16 16"
      class="h-3 w-3"
      fill="none"
      stroke="currentColor"
      stroke-width="2.2"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.2 6.4 11 12.5 5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
defineOptions({ name: 'Checkbox' });

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    disabled?: boolean;
    id?: string;
    ariaLabel?: string;
  }>(),
  {
    ariaLabel: 'Checkbox',
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
