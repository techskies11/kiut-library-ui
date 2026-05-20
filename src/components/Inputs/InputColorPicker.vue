<template>
  <div class="ku:font-sans">
    <label v-if="label" :for="colorInputId" :class="kiutLabelClass">{{ label }}</label>
    <div
      :class="[
        compositeWrapperClass,
        invalid ? kiutInputControlInvalidClass : '',
        disabled ? 'ku:cursor-not-allowed ku:opacity-50' : '',
      ]"
    >
      <input
        :id="colorInputId"
        type="color"
        :value="safeHex"
        :disabled="disabled"
        :aria-invalid="invalid ? 'true' : undefined"
        :aria-describedby="errorText ? errorId : undefined"
        class="ku:h-9 ku:w-11 ku:shrink-0 ku:cursor-pointer ku:rounded-lg ku:border ku:border-gray-200 ku:bg-[color:var(--kiut-bg-secondary)] ku:p-0.5 ku:shadow-inner ku:outline-none ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/35 ku:disabled:cursor-not-allowed ku:dark:border-slate-600 ku:dark:bg-slate-800/80"
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
        class="ku:min-h-0 ku:min-w-0 ku:flex-1 ku:border-0 ku:bg-transparent ku:p-0 ku:font-mono ku:text-sm ku:font-medium ku:text-[color:var(--kiut-text-primary)] ku:outline-none ku:ring-0 ku:placeholder:text-[color:var(--kiut-text-muted)] ku:focus:ring-0 ku:disabled:cursor-not-allowed ku:dark:text-slate-100 ku:dark:placeholder:text-slate-500"
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
  'ku:update:modelValue': [value: string];
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
  'ku:flex ku:min-h-[2.75rem] ku:w-full ku:items-center ku:gap-3 ku:rounded-xl ku:border ku:border-gray-300 ku:bg-white ku:px-3 ku:py-2 ku:text-sm ku:font-sans ku:shadow-sm ku:outline-none ku:transition ku:focus-within:border-[color:var(--kiut-primary)] ku:focus-within:ring-2 ku:focus-within:ring-[color:var(--kiut-primary)]/25 ku:focus-within:ring-offset-0 ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-[color:var(--kiut-bg-secondary)]';

function onColorNativeInput(e: Event) {
  const el = e.target as HTMLInputElement;
  const next = normalizeHex(el.value);
  if (next) emit('ku:update:modelValue', next);
}

function onHexBlur() {
  hexEditing.value = false;
  const parsed = normalizeHex(hexDraft.value);
  if (parsed) {
    hexDraft.value = parsed;
    emit('ku:update:modelValue', parsed);
  } else {
    hexDraft.value = safeHex.value;
  }
}

watch(hexDraft, (raw) => {
  if (!hexEditing.value) return;
  const parsed = normalizeHex(raw);
  if (parsed) emit('ku:update:modelValue', parsed);
});
</script>
