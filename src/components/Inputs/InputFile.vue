<template>
  <div class="ku:font-sans">
    <label v-if="label" :for="inputId" :class="kiutLabelClass">{{ label }}</label>
    <div
      :class="[
        kiutInputControlClass,
        'ku:flex ku:items-center ku:gap-2 ku:focus-within:ring-2 ku:focus-within:ring-offset-0',
        invalid
          ? 'ku:focus-within:border-red-500 ku:focus-within:ring-red-500/25 ku:dark:focus-within:border-red-400'
          : 'ku:focus-within:border-[color:var(--kiut-primary)] ku:focus-within:ring-[color:var(--kiut-primary)]/25',
        invalid ? kiutInputControlInvalidClass : '',
        disabled ? 'ku:pointer-events-none' : '',
      ]"
    >
      <input
        :id="inputId"
        ref="fileInputRef"
        type="file"
        class="ku:sr-only ku:focus:outline-none ku:focus:ring-0"
        :name="name"
        :accept="accept"
        :disabled="disabled"
        :aria-invalid="invalid ? 'true' : undefined"
        :aria-describedby="errorText ? errorId : undefined"
        @change="onNativeChange"
      />
      <label
        :for="inputId"
        class="ku:inline-flex ku:shrink-0 ku:cursor-pointer ku:items-center ku:gap-1.5 ku:rounded-lg ku:border ku:border-gray-200 ku:bg-gray-50 ku:px-2.5 ku:py-1.5 ku:text-xs ku:font-semibold ku:text-[color:var(--kiut-text-primary)] ku:transition ku:hover:bg-gray-100 ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-white/[0.06] ku:dark:hover:bg-white/[0.1]"
        :class="disabled ? 'ku:cursor-not-allowed ku:opacity-50' : ''"
      >
        <ArrowUpTrayIcon class="ku:h-4 ku:w-4 ku:shrink-0 ku:text-[color:var(--kiut-primary)]" aria-hidden="true" />
        {{ chooseLabel }}
      </label>
      <span
        class="ku:min-w-0 ku:flex-1 ku:truncate ku:text-sm ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100"
        :title="displayName || undefined"
      >
        {{ displayName }}
      </span>
      <button
        v-if="modelValue && !disabled"
        type="button"
        class="ku:inline-flex ku:shrink-0 ku:rounded-lg ku:p-1.5 ku:text-[color:var(--kiut-text-muted)] ku:transition ku:hover:bg-gray-100 ku:hover:text-[color:var(--kiut-text-primary)] ku:focus-visible:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/40 ku:dark:hover:bg-white/[0.08] ku:dark:hover:text-slate-100"
        :aria-label="clearAriaLabel"
        @click="clear"
      >
        <XMarkIcon class="ku:h-4 ku:w-4" aria-hidden="true" />
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
  'ku:update:modelValue': [value: File | null];
}>();

const uid = `kiut-input-file-${randomInstanceSuffix()}`;
const inputId = computed(() => props.id ?? uid);
const errorId = computed(() => `${inputId.value}-err`);

const fileInputRef = ref<HTMLInputElement | null>(null);

const displayName = computed(() => props.modelValue?.name ?? props.placeholder);

function onNativeChange(ev: Event) {
  const input = ev.target as HTMLInputElement;
  const file = input.files?.[0] ?? null;
  emit('ku:update:modelValue', file);
}

function clear() {
  emit('ku:update:modelValue', null);
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
}
</script>
