<template>
  <div class="font-sans">
    <label v-if="label" :for="inputId" :class="kiutLabelClass">{{ label }}</label>
    <input
      :id="inputId"
      v-model="model"
      type="text"
      autocomplete="off"
      :class="[kiutInputControlClass, invalid ? kiutInputControlInvalidClass : '']"
      :placeholder="placeholder"
      :disabled="disabled"
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

defineOptions({ name: 'InputText' });

const props = withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    placeholder?: string;
    id?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorText?: string;
  }>(),
  {}
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const uid = `kiut-input-text-${Math.random().toString(36).slice(2, 9)}`;
const inputId = computed(() => props.id ?? uid);
const errorId = computed(() => `${inputId.value}-err`);

const model = computed({
  get: () => props.modelValue,
  set: (v: string) => emit('update:modelValue', v),
});
</script>
