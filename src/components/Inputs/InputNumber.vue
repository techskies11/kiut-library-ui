<template>
  <div class="ku:font-sans">
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
        'ku:[appearance:textfield] ku:[&::-webkit-inner-spin-button]:appearance-none ku:[&::-webkit-outer-spin-button]:appearance-none',
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
import { randomInstanceSuffix } from '../../utils/randomId';
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
  'ku:update:modelValue': [value: number | null];
}>();

const uid = `kiut-input-number-${randomInstanceSuffix()}`;
const inputId = computed(() => props.id ?? uid);
const errorId = computed(() => `${inputId.value}-err`);

const alignClass = computed(() => {
  switch (props.align) {
    case 'start':
      return 'ku:text-start';
    case 'end':
      return 'ku:text-end';
    default:
      return 'ku:text-center';
  }
});

const displayValue = computed(() =>
  props.modelValue === null || props.modelValue === undefined ? '' : String(props.modelValue)
);

function onInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value;
  if (raw === '') {
    emit('ku:update:modelValue', null);
    return;
  }
  const n = Number(raw);
  emit('ku:update:modelValue', Number.isNaN(n) ? null : n);
}
</script>
