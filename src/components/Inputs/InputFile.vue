<template>
  <div class="font-sans">
    <label v-if="label" :for="inputId" :class="kiutLabelClass">{{ label }}</label>

    <!-- Single file mode (default, backward compatible) -->
    <template v-if="!multiple">
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
          @change="onNativeChangeSingle"
        />
        <label
          :for="inputId"
          class="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
          :class="disabled ? 'cursor-not-allowed opacity-50' : ''"
        >
          <ArrowUpTrayIcon class="h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]" aria-hidden="true" />
          {{ chooseLabel }}
        </label>
        <span
          class="min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-primary)] dark:text-slate-100"
          :title="singleDisplayName || undefined"
        >
          {{ singleDisplayName }}
        </span>
        <button
          v-if="singleModelValue && !disabled"
          type="button"
          class="inline-flex shrink-0 rounded-lg p-1.5 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100"
          :aria-label="clearAriaLabel"
          @click="clearSingle"
        >
          <XMarkIcon class="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </template>

    <!-- Multiple files mode -->
    <template v-else>
      <div class="space-y-3">
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
            multiple
            class="sr-only focus:outline-none focus:ring-0"
            :name="name"
            :accept="accept"
            :disabled="disabled || isMaxReached"
            :aria-invalid="invalid ? 'true' : undefined"
            :aria-describedby="errorText ? errorId : undefined"
            @change="onNativeChangeMultiple"
          />
          <label
            :for="inputId"
            class="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[color:var(--kiut-text-primary)] transition hover:bg-gray-100 dark:border-[color:var(--kiut-border-light)] dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
            :class="disabled || isMaxReached ? 'cursor-not-allowed opacity-50' : ''"
          >
            <ArrowUpTrayIcon class="h-4 w-4 shrink-0 text-[color:var(--kiut-primary)]" aria-hidden="true" />
            {{ chooseLabel }}
          </label>
          <span class="min-w-0 flex-1 truncate text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400">
            {{ multiplePlaceholder }}
          </span>
          <span
            v-if="filesCountLabel"
            class="shrink-0 text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400"
          >
            {{ filesCountLabel }}
          </span>
        </div>

        <ul v-if="multipleItems.length > 0" class="space-y-2" role="list">
          <li
            v-for="item in multipleItems"
            :key="item.id"
            class="rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--bg-secondary,#f9fafb)] p-3 dark:bg-white/[0.03]"
          >
            <div class="flex items-start gap-2">
              <DocumentIcon
                class="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--kiut-primary)]"
                aria-hidden="true"
              />
              <div class="min-w-0 flex-1 space-y-2">
                <div class="flex items-center gap-2">
                  <span
                    class="min-w-0 flex-1 truncate text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100"
                    :title="item.file.name"
                  >
                    {{ item.file.name }}
                  </span>
                  <span class="shrink-0 text-xs text-[color:var(--kiut-text-muted)]">
                    {{ formatFileSize(item.file.size) }}
                  </span>
                  <button
                    v-if="!disabled"
                    type="button"
                    class="inline-flex shrink-0 rounded-lg p-1 text-[color:var(--kiut-text-muted)] transition hover:bg-gray-100 hover:text-[color:var(--kiut-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 dark:hover:bg-white/[0.08] dark:hover:text-slate-100"
                    :aria-label="removeFileAriaLabel"
                    @click="removeItem(item.id)"
                  >
                    <XMarkIcon class="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <InputText
                  v-if="showDescriptions"
                  :model-value="item.description"
                  :label="descriptionLabel"
                  :placeholder="descriptionPlaceholder"
                  :disabled="disabled"
                  :invalid="isDescriptionInvalid(item)"
                  :error-text="isDescriptionInvalid(item) ? descriptionErrorText : ''"
                  @update:model-value="(value) => updateItemDescription(item.id, value)"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </template>

    <p v-if="errorText" :id="errorId" :class="kiutFieldErrorTextClass" role="alert">
      {{ errorText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpTrayIcon, DocumentIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { computed, ref } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';
import InputText from './InputText.vue';
import {
  kiutFieldErrorTextClass,
  kiutInputControlClass,
  kiutInputControlInvalidClass,
  kiutLabelClass,
} from './inputFieldStyles';

defineOptions({ name: 'InputFile' });

export interface FileUploadItem {
  id: string;
  file: File;
  description: string;
}

const props = withDefaults(
  defineProps<{
    /** Single: File | null. Multiple: FileUploadItem[]. */
    modelValue: File | null | FileUploadItem[];
    label?: string;
    chooseLabel?: string;
    placeholder?: string;
    accept?: string;
    name?: string;
    id?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorText?: string;
    clearAriaLabel?: string;
    /** When true, allows selecting one or more files with a list UI. */
    multiple?: boolean;
    maxFiles?: number;
    /** Show a description field per file (multiple mode only). */
    showDescriptions?: boolean;
    descriptionLabel?: string;
    descriptionPlaceholder?: string;
    removeFileAriaLabel?: string;
    /** e.g. "3 / 50 files" — pass from parent for i18n. */
    filesCountLabel?: string;
    /** When true, shows validation state (set by parent on submit attempt). */
    submitted?: boolean;
    /** Error message for empty description fields when submitted. */
    descriptionErrorText?: string;
    /** When true with submitted, empty per-row descriptions show as invalid. */
    requireDescriptions?: boolean;
  }>(),
  {
    chooseLabel: 'Elegir archivo',
    placeholder: 'Ningún archivo seleccionado',
    accept:
      '.pdf,.doc,.docx,.txt,.rtf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    clearAriaLabel: 'Quitar archivo',
    multiple: false,
    maxFiles: 50,
    showDescriptions: false,
    descriptionLabel: 'Descripción',
    descriptionPlaceholder: 'Ingresa una descripción',
    removeFileAriaLabel: 'Quitar archivo',
    submitted: false,
    descriptionErrorText: '',
    requireDescriptions: false,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: File | null | FileUploadItem[]];
}>();

const uid = `kiut-input-file-${randomInstanceSuffix()}`;
const inputId = computed(() => props.id ?? uid);
const errorId = computed(() => `${inputId.value}-err`);
const fileInputRef = ref<HTMLInputElement | null>(null);

const singleModelValue = computed(() =>
  props.multiple ? null : (props.modelValue as File | null)
);

const multipleItems = computed((): FileUploadItem[] => {
  if (!props.multiple) return [];
  const value = props.modelValue;
  return Array.isArray(value) ? value : [];
});

const singleDisplayName = computed(
  () => singleModelValue.value?.name ?? props.placeholder
);

const isMaxReached = computed(
  () => props.multiple && multipleItems.value.length >= props.maxFiles
);

const multiplePlaceholder = computed(() => {
  if (multipleItems.value.length === 0) {
    return props.placeholder;
  }
  if (multipleItems.value.length === 1) {
    return multipleItems.value[0].file.name;
  }
  return `${multipleItems.value.length} archivos seleccionados`;
});

function isDescriptionInvalid(item: FileUploadItem): boolean {
  return (
    props.showDescriptions &&
    props.submitted &&
    props.requireDescriptions &&
    item.description.trim() === ''
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function createUploadItem(file: File): FileUploadItem {
  return {
    id: `file-${randomInstanceSuffix()}`,
    file,
    description: '',
  };
}

function isDuplicateFile(existing: FileUploadItem[], file: File): boolean {
  return existing.some(
    (item) =>
      item.file.name === file.name &&
      item.file.size === file.size &&
      item.file.lastModified === file.lastModified
  );
}

function resetNativeInput() {
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
}

function onNativeChangeSingle(ev: Event) {
  const input = ev.target as HTMLInputElement;
  const file = input.files?.[0] ?? null;
  emit('update:modelValue', file);
}

function onNativeChangeMultiple(ev: Event) {
  const input = ev.target as HTMLInputElement;
  const selected = Array.from(input.files ?? []);
  if (selected.length === 0) return;

  const current = [...multipleItems.value];
  for (const file of selected) {
    if (current.length >= props.maxFiles) break;
    if (!isDuplicateFile(current, file)) {
      current.push(createUploadItem(file));
    }
  }

  emit('update:modelValue', current);
  resetNativeInput();
}

function clearSingle() {
  emit('update:modelValue', null);
  resetNativeInput();
}

function removeItem(id: string) {
  emit(
    'update:modelValue',
    multipleItems.value.filter((item) => item.id !== id)
  );
}

function updateItemDescription(id: string, description: string) {
  emit(
    'update:modelValue',
    multipleItems.value.map((item) =>
      item.id === id ? { ...item, description } : item
    )
  );
}
</script>
