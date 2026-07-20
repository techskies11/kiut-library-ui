<template>
  <div class="font-sans">
    <label v-if="label" :for="inputId" :class="kiutLabelClass">{{ label }}</label>
    <div class="relative">
      <component
        :is="icon"
        v-if="icon"
        class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400"
        aria-hidden="true"
      />
      <input
        v-bind="inputAttrs"
        :id="inputId"
        :name="fieldName"
        :type="type"
        autocomplete="off"
        :class="[
          kiutInputControlClass,
          icon ? 'pl-10' : '',
          isInvalid ? kiutInputControlInvalidClass : '',
        ]"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="fieldValue"
        :aria-invalid="isInvalid ? 'true' : undefined"
        :aria-describedby="errorText ? errorId : undefined"
        @input="onInputHandler"
        @change="onChangeHandler"
        @blur="onBlurHandler"
      />
    </div>
    <p v-if="errorText" :id="errorId" :class="kiutFieldErrorTextClass" role="alert">
      {{ errorText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, useAttrs, watch, type Component } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';
import {
  kiutFieldErrorTextClass,
  kiutInputControlClass,
  kiutInputControlInvalidClass,
  kiutLabelClass,
} from './inputFieldStyles';

defineOptions({ name: 'InputText', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    placeholder?: string;
    id?: string;
    name?: string;
    type?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorText?: string;
    /** Icono opcional a la izquierda (p. ej. MagnifyingGlassIcon de Heroicons). */
    icon?: Component;
  }>(),
  { modelValue: '', type: 'text' }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const attrs = useAttrs();

// @primevue/forms integration — inject form context by string key (no package import needed)
const $pcForm = inject<any>('$pcForm', null);

const uid = `kiut-input-text-${randomInstanceSuffix()}`;
const inputId = computed(() => props.id ?? uid);
const errorId = computed(() => `${inputId.value}-err`);
const fieldName = computed(() => props.name ?? (attrs.name as string) ?? '');

// Internal value for standalone usage (outside a Form)
const internalValue = ref(props.modelValue ?? '');

// Keep internal value in sync when parent updates modelValue externally (controlled pattern)
watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal ?? '';
  }
);

// Register with @primevue/forms if inside a <Form>
onMounted(() => {
  if ($pcForm && fieldName.value) {
    $pcForm.register?.(fieldName.value, {});
  }
});

onUnmounted(() => {
  if ($pcForm && fieldName.value) {
    $pcForm.deregister?.(fieldName.value);
  }
});

// Read value from the form state if available, otherwise use internal ref
const fieldValue = computed(() => {
  if ($pcForm && fieldName.value) {
    return $pcForm.fields?.[fieldName.value]?.states?.value ?? internalValue.value;
  }
  return internalValue.value;
});

const isInvalid = computed(() => {
  if ($pcForm && fieldName.value) {
    return $pcForm.fields?.[fieldName.value]?.states?.invalid ?? props.invalid ?? false;
  }
  return props.invalid ?? false;
});

function onInputHandler(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  internalValue.value = value;
  emit('update:modelValue', value);

  const formFieldProps = $pcForm?.fields?.[fieldName.value]?.props;
  if (formFieldProps?.onInput) {
    formFieldProps.onInput(event);
  }
}

function onChangeHandler(event: Event) {
  const formFieldProps = $pcForm?.fields?.[fieldName.value]?.props;
  if (formFieldProps?.onChange) {
    formFieldProps.onChange(event);
  }
}

function onBlurHandler(event: Event) {
  const formFieldProps = $pcForm?.fields?.[fieldName.value]?.props;
  if (formFieldProps?.onBlur) {
    formFieldProps.onBlur(event);
  }
}

// Pass through any extra attrs (except name/id/type which we handle manually)
const inputAttrs = computed(() => {
  const { name: _n, id: _i, type: _t, ...rest } = attrs as Record<string, unknown>;
  return rest;
});
</script>
