<template>
  <div class="font-sans">
    <label v-if="label" :for="numberId" :class="kiutLabelClass">{{ label }}</label>
    <div class="flex gap-2">
      <div class="w-[7.5rem] shrink-0">
        <Select
          v-model="prefixModel"
          aria-label-trigger="Prefijo telefónico"
          :options="prefixOptions"
          :placeholder="prefixPlaceholder"
          :disabled="disabled"
        />
      </div>
      <div class="min-w-0 flex-1">
        <input
          :id="numberId"
          v-model="numberProxy"
          type="tel"
          inputmode="numeric"
          autocomplete="tel-national"
          :class="[kiutInputControlClass, invalid ? kiutInputControlInvalidClass : '']"
          :placeholder="numberPlaceholder"
          :disabled="disabled"
          :aria-invalid="invalid ? 'true' : undefined"
          :aria-describedby="errorText ? errorId : undefined"
        />
      </div>
    </div>
    <p v-if="errorText" :id="errorId" :class="kiutFieldErrorTextClass" role="alert">
      {{ errorText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Select from './Select.vue';
import type { KiutSelectOption, KiutSelectValue } from './Select.vue';
import {
  kiutFieldErrorTextClass,
  kiutInputControlClass,
  kiutInputControlInvalidClass,
  kiutLabelClass,
} from './inputFieldStyles';

defineOptions({ name: 'InputPhone' });

export interface KiutPhoneValue {
  prefix: KiutSelectValue;
  number: string;
}

const props = withDefaults(
  defineProps<{
    modelValue: KiutPhoneValue;
    /** Opciones del prefijo (bandera + código en `label`, valor en `value`) */
    prefixOptions: KiutSelectOption<KiutSelectValue>[];
    label?: string;
    prefixPlaceholder?: string;
    numberPlaceholder?: string;
    id?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorText?: string;
  }>(),
  {
    prefixPlaceholder: 'País',
    numberPlaceholder: '3001234567',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: KiutPhoneValue];
}>();

const uid = `kiut-phone-${Math.random().toString(36).slice(2, 9)}`;
const numberId = computed(() => props.id ?? `${uid}-num`);
const errorId = computed(() => `${numberId.value}-err`);

const prefixModel = computed({
  get: () => props.modelValue.prefix,
  set: (prefix: KiutSelectValue) => emit('update:modelValue', { ...props.modelValue, prefix }),
});

const numberProxy = computed({
  get: () => props.modelValue.number,
  set: (number: string) => emit('update:modelValue', { ...props.modelValue, number }),
});
</script>
