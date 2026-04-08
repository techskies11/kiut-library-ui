<template>
  <div class="font-sans">
    <label v-if="label" :for="inputId" :class="kiutLabelClass">{{ label }}</label>
    <div
      :class="[
        kiutInputControlClass,
        'flex items-center gap-2 focus-within:ring-2 focus-within:ring-offset-0',
        invalid
          ? 'focus-within:border-red-500 focus-within:ring-red-500/25 dark:focus-within:border-red-400'
          : 'focus-within:border-[color:var(--kiut-primary)] focus-within:ring-[color:var(--kiut-primary)]/25',
        invalid ? kiutInputControlInvalidClass : '',
        disabled ? 'pointer-events-none' : '',
      ]"
    >
      <input
        :id="inputId"
        ref="fileInputRef"
        type="file"
        class="sr-only focus:outline-none focus:ring-0"
        :name="name"
        :accept="accept"
        :disabled="disabled"
        :aria-invalid="invalid ? 'true' : undefined"
        :aria-describedby="errorText ? errorId : undefined"
        @change="onNativeChange"
      />
      <label
        :for="inputId"
        class="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-white/[0.12] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
        :class="disabled ? 'cursor-not-allowed opacity-50' : ''"
      >
        <ArrowUpTrayIcon class="h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]" aria-hidden="true" />
        {{ chooseLabel }}
      </label>
      <span
        class="min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100"
        :title="displayName || undefined"
      >
        {{ displayName }}
      </span>
      <button
        v-if="modelValue && !disabled"
        type="button"
        class="inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100"
        :aria-label="clearAriaLabel"
        @click="clear"
      >
        <XMarkIcon class="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
    <p v-if="errorText" :id="errorId" :class="kiutFieldErrorTextClass" role="alert">
      {{ errorText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { computed, ref } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';
import {
  kiutFieldErrorTextClass,
  kiutInputControlClass,
  kiutInputControlInvalidClass,
  kiutLabelClass,
} from './inputFieldStyles';

defineOptions({ name: 'InputFile' });

const props = withDefaults(
  defineProps<{
    /** Archivo seleccionado (un solo fichero). */
    modelValue: File | null;
    label?: string;
    /** Texto del botón que abre el selector de archivos. */
    chooseLabel?: string;
    /** Texto cuando no hay archivo (p. ej. “Ningún archivo seleccionado”). */
    placeholder?: string;
    /** Valor HTML `accept` (tipos MIME y/o extensiones). Por defecto documentos habituales. */
    accept?: string;
    /** Nombre del control para envío en formularios HTML. */
    name?: string;
    id?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorText?: string;
    clearAriaLabel?: string;
  }>(),
  {
    chooseLabel: 'Elegir archivo',
    placeholder: 'Ningún archivo seleccionado',
    accept:
      '.pdf,.doc,.docx,.txt,.rtf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    clearAriaLabel: 'Quitar archivo',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: File | null];
}>();

const uid = `kiut-input-file-${randomInstanceSuffix()}`;
const inputId = computed(() => props.id ?? uid);
const errorId = computed(() => `${inputId.value}-err`);

const fileInputRef = ref<HTMLInputElement | null>(null);

const displayName = computed(() => props.modelValue?.name ?? props.placeholder);

function onNativeChange(ev: Event) {
  const input = ev.target as HTMLInputElement;
  const file = input.files?.[0] ?? null;
  emit('update:modelValue', file);
}

function clear() {
  emit('update:modelValue', null);
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
}
</script>
