<template>
  <div class="font-sans">
    <label v-if="label" :for="inputId" :class="kiutLabelClass">{{ label }}</label>
    <div class="relative">
      <ClockIcon
        class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400"
        aria-hidden="true"
      />
      <input
        :id="inputId"
        :value="displayValue"
        type="time"
        autocomplete="off"
        :class="[
          kiutInputControlClass,
          'pl-10',
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
import { ClockIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';
import {
  kiutFieldErrorTextClass,
  kiutInputControlClass,
  kiutInputControlInvalidClass,
  kiutLabelClass,
} from './inputFieldStyles';

defineOptions({ name: 'InputTime' });

/**
 * Hora en 24 h solo con horas y minutos: `HH:mm`, o vacío.
 */
export type KiutTimeValue = string | null;

function toHHmm(value: string): string | null {
  const m = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(value.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (!Number.isInteger(h) || !Number.isInteger(min) || h < 0 || h > 23 || min < 0 || min > 59) {
    return null;
  }
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
}

function normalizeTimeInput(raw: string): KiutTimeValue {
  if (raw === '') return null;
  return toHHmm(raw);
}

const props = withDefaults(
  defineProps<{
    modelValue: KiutTimeValue;
    label?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorText?: string;
    /** Límite inferior (`min` HTML), forma `HH:mm`. */
    min?: string;
    /** Límite superior (`max` HTML), forma `HH:mm`. */
    max?: string;
    /**
     * Paso en segundos para el input nativo. Por defecto `60` = solo minutos (sin segundos).
     */
    step?: number;
  }>(),
  {
    step: 60,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: KiutTimeValue];
}>();

const uid = `kiut-input-time-${randomInstanceSuffix()}`;
const inputId = computed(() => props.id ?? uid);
const errorId = computed(() => `${inputId.value}-err`);

const displayValue = computed(() => {
  if (props.modelValue == null || props.modelValue === '') return '';
  const normalized = toHHmm(props.modelValue);
  return normalized ?? '';
});

function onInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value;
  emit('update:modelValue', normalizeTimeInput(raw));
}
</script>
