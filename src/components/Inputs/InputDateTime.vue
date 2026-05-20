<template>
  <div class="ku:font-sans">
    <label v-if="label" :for="inputId" :class="kiutLabelClass">{{ label }}</label>
    <div class="ku:relative">
      <CalendarDaysIcon
        class="ku:pointer-events-none ku:absolute ku:left-3 ku:top-1/2 ku:h-5 ku:w-5 -translate-y-1/2 ku:text-gray-500 ku:dark:text-slate-400"
        aria-hidden="true"
      />
      <input
        :id="inputId"
        :value="displayValue"
        type="datetime-local"
        autocomplete="off"
        :class="[
          kiutInputControlClass,
          'ku:pl-10',
          invalid ? kiutInputControlInvalidClass : '',
        ]"
        :name="name"
        :disabled="disabled"
        :min="min"
        :max="max"
        :step="step"
        :aria-invalid="invalid ? 'true' : undefined"
        :aria-describedby="errorText ? errorId : undefined"
        @input="onInput"
      />
    </div>
    <p v-if="errorText" :id="errorId" :class="kiutFieldErrorTextClass" role="alert">
      {{ errorText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { CalendarDaysIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';
import {
  kiutFieldErrorTextClass,
  kiutInputControlClass,
  kiutInputControlInvalidClass,
  kiutLabelClass,
} from './inputFieldStyles';

defineOptions({ name: 'InputDateTime' });

/**
 * Valor en el formato de `input[type="datetime-local"]` (p. ej. `2026-04-08T14:30`) o vacío.
 */
export type KiutDateTimeValue = string | null;

const props = withDefaults(
  defineProps<{
    modelValue: KiutDateTimeValue;
    label?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorText?: string;
    /** Límite inferior (`min` HTML), misma forma que el valor. */
    min?: string;
    /** Límite superior (`max` HTML), misma forma que el valor. */
    max?: string;
    /** Paso en segundos (atributo `step` del input nativo). */
    step?: number;
  }>(),
  {}
);

const emit = defineEmits<{
  'ku:update:modelValue': [value: KiutDateTimeValue];
}>();

const uid = `kiut-input-datetime-${randomInstanceSuffix()}`;
const inputId = computed(() => props.id ?? uid);
const errorId = computed(() => `${inputId.value}-err`);

const displayValue = computed(() => props.modelValue ?? '');

function onInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value;
  emit('ku:update:modelValue', raw === '' ? null : raw);
}
</script>
