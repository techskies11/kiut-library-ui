<template>
  <div class="font-sans">
    <label v-if="label" :for="inputId" :class="kiutLabelClass">{{ label }}</label>
    <input
      :id="inputId"
      :value="displayValue"
      type="number"
      @input="onInput"
      :class="[
        kiutInputControlClass,
        invalid ? kiutInputControlInvalidClass : '',
        alignClass,
        '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
      ]"
      :placeholder="placeholder"
      :disabled="disabled"
      :min="min"
      :max="max"
      :step="step"
      :aria-invalid="invalid ? 'true' : undefined"
      :aria-describedby="errorText ? errorId : undefined"
    />
    <p v-if="errorText" :id="errorId" :class="kiutFieldErrorTextClass" role="alert">
      {{ errorText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  kiutFieldErrorTextClass,
  kiutInputControlClass,
  kiutInputControlInvalidClass,
  kiutLabelClass,
} from './inputFieldStyles';

defineOptions({ name: 'InputNumber' });

const props = withDefaults(
  defineProps<{
    modelValue: number | null;
    label?: string;
    placeholder?: string;
    id?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorText?: string;
    min?: number;
    max?: number;
    step?: number;
    /** Alineación del valor numérico en el campo */
    align?: 'start' | 'center' | 'end';
  }>(),
  {
    align: 'center',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: number | null];
}>();

const uid = `kiut-input-number-${Math.random().toString(36).slice(2, 9)}`;
const inputId = computed(() => props.id ?? uid);
const errorId = computed(() => `${inputId.value}-err`);

const alignClass = computed(() => {
  switch (props.align) {
    case 'start':
      return 'text-start';
    case 'end':
      return 'text-end';
    default:
      return 'text-center';
  }
});

const displayValue = computed(() =>
  props.modelValue === null || props.modelValue === undefined ? '' : String(props.modelValue)
);

function onInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value;
  if (raw === '') {
    emit('update:modelValue', null);
    return;
  }
  const n = Number(raw);
  emit('update:modelValue', Number.isNaN(n) ? null : n);
}
</script>
