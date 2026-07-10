<template>
  <div
    class="font-sans flex w-full flex-col gap-2"
    v-bind="$attrs"
  >
    <label v-if="label" :for="inputId" :class="kiutLabelClass">
      {{ label }}
    </label>
    <div class="flex w-full min-w-0 items-center gap-3">
      <label
        :for="inputId"
        class="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] text-[color:var(--kiut-text-muted)] transition hover:border-[color:var(--kiut-primary)]/40"
        :class="[
          sizeClass,
          isInteractive
            ? 'cursor-pointer hover:bg-[color:var(--kiut-bg-secondary)]'
            : 'cursor-not-allowed opacity-60',
        ]"
        :aria-label="uploadAriaLabel"
      >
        <img
          v-if="modelValue && !imageError && !loading"
          :src="modelValue"
          alt=""
          class="h-full w-full object-cover"
          @error="imageError = true"
        />
        <ArrowPathIcon
          v-else-if="loading"
          :class="[iconClass, 'animate-spin text-[color:var(--kiut-primary)]']"
          aria-hidden="true"
        />
        <ArrowUpTrayIcon
          v-else
          :class="[iconClass, 'text-[color:var(--kiut-primary)]']"
          aria-hidden="true"
        />
      </label>
      <input
        :id="inputId"
        ref="fileInputRef"
        type="file"
        class="sr-only focus:outline-none focus:ring-0"
        :accept="accept"
        :disabled="disabled || loading"
        @change="onFileChange"
      />
      <div
        v-if="showUrlInput"
        class="min-w-0 flex-1 basis-0"
        :class="urlInputClass"
      >
        <input
          :id="urlInputId"
          type="text"
          autocomplete="off"
          :value="modelValue"
          :placeholder="urlPlaceholder"
          :disabled="disabled"
          :class="kiutInputControlClass"
          class="w-full min-w-0"
          @input="onUrlInput"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { ArrowPathIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline';
import { randomInstanceSuffix } from '../../utils/randomId';
import { kiutInputControlClass, kiutLabelClass } from './inputFieldStyles';

export type ImageUploadCircleSize = 'sm' | 'md' | 'lg';

defineOptions({ name: 'ImageUploadCircle', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    id?: string;
    accept?: string;
    disabled?: boolean;
    loading?: boolean;
    showUrlInput?: boolean;
    urlPlaceholder?: string;
    uploadAriaLabel?: string;
    size?: ImageUploadCircleSize;
    /** Tailwind classes for the URL field wrapper (e.g. `max-w-xs`, `w-64`). */
    urlInputClass?: string;
  }>(),
  {
    modelValue: '',
    accept: '.png,.jpg,.jpeg,.gif,.webp,.svg,image/*',
    disabled: false,
    loading: false,
    showUrlInput: true,
    size: 'md',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  select: [file: File];
}>();

const imageError = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null);
const uid = `kiut-image-upload-circle-${randomInstanceSuffix()}`;
const inputId = computed(() => props.id ?? uid);
const urlInputId = computed(() => `${inputId.value}-url`);

const sizeClass = computed(() => {
  if (props.size === 'sm') return 'h-10 w-10';
  if (props.size === 'lg') return 'h-16 w-16';
  return 'h-12 w-12';
});

const iconClass = computed(() => {
  if (props.size === 'sm') return 'h-4 w-4';
  if (props.size === 'lg') return 'h-6 w-6';
  return 'h-5 w-5';
});

const isInteractive = computed(() => !props.disabled && !props.loading);

watch(
  () => props.modelValue,
  () => {
    imageError.value = false;
  }
);

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    emit('select', file);
  }
  input.value = '';
}

function onUrlInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>
