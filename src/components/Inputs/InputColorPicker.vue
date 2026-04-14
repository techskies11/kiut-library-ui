<template>
  <div class="font-sans">
    <label v-if="label" :for="colorInputId" :class="kiutLabelClass">{{ label }}</label>
    <div
      :class="[
        compositeWrapperClass,
        invalid ? kiutInputControlInvalidClass : '',
        disabled ? 'cursor-not-allowed opacity-50' : '',
      ]"
    >
      <input
        :id="colorInputId"
        type="color"
        :value="safeHex"
        :disabled="disabled"
        :aria-invalid="invalid ? 'true' : undefined"
        :aria-describedby="errorText ? errorId : undefined"
        class="h-9 w-11 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-[color:var(--kiut-bg-secondary)] p-0.5 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/35 disabled:cursor-not-allowed dark:border-slate-600 dark:bg-slate-800/80"
        @input="onColorNativeInput"
      />
      <input
        v-if="showHexInput"
        v-model="hexDraft"
        type="text"
        :disabled="disabled"
        autocomplete="off"
        spellcheck="false"
        aria-label="Código hexadecimal del color"
        class="min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm font-medium text-[color:var(--kiut-text-primary)] outline-none ring-0 placeholder:text-[color:var(--kiut-text-muted)] focus:ring-0 disabled:cursor-not-allowed dark:text-slate-100 dark:placeholder:text-slate-500"
        :placeholder="placeholderHex"
        @focus="hexEditing = true"
        @blur="onHexBlur"
      />
    </div>
    <p v-if="errorText" :id="errorId" :class="kiutFieldErrorTextClass" role="alert">
      {{ errorText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';
import {
  kiutFieldErrorTextClass,
  kiutInputControlInvalidClass,
  kiutLabelClass,
} from './inputFieldStyles';

defineOptions({ name: 'InputColorPicker' });

const DEFAULT_HEX = '#3b82f6';

function normalizeHex(value: string): string | null {
  const s = value.trim();
  const six = /^#?([0-9a-fA-F]{6})$/.exec(s);
  if (six) return `#${six[1].toLowerCase()}`;
  const three = /^#?([0-9a-fA-F]{3})$/.exec(s);
  if (three) {
    const [a, b, c] = three[1].split('');
    return `#${a}${a}${b}${b}${c}${c}`.toLowerCase();
  }
  return null;
}

function coerceHex(value: string): string {
  return normalizeHex(value) ?? DEFAULT_HEX;
}

const props = withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    id?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorText?: string;
    /** Muestra campo de texto para editar el valor en hexadecimal */
    showHexInput?: boolean;
  }>(),
  {
    showHexInput: true,
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const uid = `kiut-input-color-${randomInstanceSuffix()}`;
const colorInputId = computed(() => props.id ?? uid);
const errorId = computed(() => `${colorInputId.value}-err`);

const safeHex = computed(() => coerceHex(props.modelValue));

const placeholderHex = '#aabbcc';

const hexDraft = ref(safeHex.value);
const hexEditing = ref(false);

watch(safeHex, (v) => {
  if (!hexEditing.value) hexDraft.value = v;
});

const compositeWrapperClass =
  'flex min-h-[2.75rem] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans shadow-sm outline-none transition focus-within:border-[color:var(--kiut-primary)] focus-within:ring-2 focus-within:ring-[color:var(--kiut-primary)]/25 focus-within:ring-offset-0 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)]';

function onColorNativeInput(e: Event) {
  const el = e.target as HTMLInputElement;
  const next = normalizeHex(el.value);
  if (next) emit('update:modelValue', next);
}

function onHexBlur() {
  hexEditing.value = false;
  const parsed = normalizeHex(hexDraft.value);
  if (parsed) {
    hexDraft.value = parsed;
    emit('update:modelValue', parsed);
  } else {
    hexDraft.value = safeHex.value;
  }
}

watch(hexDraft, (raw) => {
  if (!hexEditing.value) return;
  const parsed = normalizeHex(raw);
  if (parsed) emit('update:modelValue', parsed);
});
</script>
