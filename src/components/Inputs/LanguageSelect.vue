<template>
  <Select
    :model-value="modelValue"
    :options="mappedOptions"
    :label="label"
    :aria-label-trigger="ariaLabelTrigger"
    :placeholder="placeholder"
    :disabled="disabled"
    :show-option-check="showOptionCheck"
    searchable
    :search-placeholder="searchPlaceholder"
    :no-results-text="noResultsText"
    :list-section-label="listSectionLabel"
    @update:model-value="onUpdate"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Select from './Select.vue';
import type { KiutSelectValue } from './Select.vue';

defineOptions({ name: 'LanguageSelect' });

export interface KiutLanguageSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** CSS classes for the flag visual (e.g. `flag-icon flag-icon-es`). */
  flagClass?: string;
}

const props = withDefaults(
  defineProps<{
    modelValue: KiutSelectValue | null;
    options: KiutLanguageSelectOption[];
    label?: string;
    ariaLabelTrigger?: string;
    placeholder?: string;
    disabled?: boolean;
    showOptionCheck?: boolean;
    searchPlaceholder?: string;
    noResultsText?: string;
    listSectionLabel?: string;
  }>(),
  {
    placeholder: 'Seleccionar idioma…',
    showOptionCheck: false,
    searchPlaceholder: 'Buscar por nombre…',
    noResultsText: 'Sin resultados',
    listSectionLabel: 'Idioma',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: KiutSelectValue];
}>();

const mappedOptions = computed(() =>
  props.options.map((option) => ({
    value: option.value,
    label: option.label,
    disabled: option.disabled,
    leadingClass: option.flagClass,
  }))
);

function onUpdate(value: KiutSelectValue) {
  emit('update:modelValue', value);
}
</script>
