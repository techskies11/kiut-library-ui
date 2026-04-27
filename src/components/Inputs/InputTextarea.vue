<template>
  <div class="font-sans">
    <label v-if="label" :for="inputId" :class="kiutLabelClass">{{ label }}</label>
    <textarea
      :id="inputId"
      v-model="model"
      :rows="rows"
      autocomplete="off"
      :class="[kiutTextareaControlClass, invalid ? kiutInputControlInvalidClass : '']"
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
import { randomInstanceSuffix } from '../../utils/randomId';
import {
  kiutFieldErrorTextClass,
  kiutInputControlInvalidClass,
  kiutLabelClass,
  kiutTextareaControlClass,
} from './inputFieldStyles';

defineOptions({ name: 'InputTextarea' });

const props = withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    placeholder?: string;
    id?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorText?: string;
    rows?: number;
  }>(),
  { rows: 4 }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const uid = `kiut-input-textarea-${randomInstanceSuffix()}`;
const inputId = computed(() => props.id ?? uid);
const errorId = computed(() => `${inputId.value}-err`);

const model = computed({
  get: () => props.modelValue,
  set: (v: string) => emit('update:modelValue', v),
});
</script>
