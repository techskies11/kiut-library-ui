<template>
  <div class="font-sans">
    <label v-if="label" :for="inputId" :class="kiutLabelClass">{{ label }}</label>
    <div
      class="flex flex-col items-center gap-2"
      :class="orientation === 'vertical' ? 'w-full' : 'w-full'"
    >
      <p
        v-if="orientation === 'vertical' && captionMax"
        class="order-1 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
      >
        {{ captionMax }}
      </p>
      <div
        class="flex items-center justify-center"
        :class="[
          orientation === 'vertical'
            ? 'order-2 h-[var(--kiut-range-length)] w-11 shrink-0'
            : 'order-none w-full py-1',
        ]"
        :style="cssVars"
      >
        <input
          :id="inputId"
          type="range"
          :value="modelValue"
          :min="min"
          :max="max"
          :step="step"
          :disabled="disabled"
          :aria-orientation="orientation"
          :aria-invalid="invalid ? 'true' : undefined"
          :aria-describedby="describedBy"
          :class="[
            'kiut-range-input block appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            orientation === 'vertical' ? 'kiut-range-input--vertical' : 'kiut-range-input--horizontal w-full',
          ]"
          @input="onInput"
        />
      </div>
      <!-- Horizontal: una fila min | centro | max; o solo caption centrado -->
      <p
        v-if="orientation === 'horizontal' && simpleCaptionOnly"
        class="text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
      >
        {{ caption }}
      </p>
      <div
        v-else-if="orientation === 'horizontal' && showCaptionEndsRow"
        class="grid w-full max-w-full grid-cols-[1fr_auto_1fr] items-start gap-x-3 text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
      >
        <span class="min-w-0 text-left leading-snug">{{ captionMin }}</span>
        <span class="max-w-[min(100%,12rem)] shrink px-1 text-center leading-snug">{{ caption }}</span>
        <span class="min-w-0 text-right leading-snug">{{ captionMax }}</span>
      </div>
      <!-- Vertical: min bajo la pista, luego caption opcional -->
      <p
        v-if="orientation === 'vertical' && captionMin"
        class="order-3 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
      >
        {{ captionMin }}
      </p>
      <p
        v-if="orientation === 'vertical' && caption"
        class="order-4 text-center text-sm text-[color:var(--kiut-text-muted)] dark:text-slate-400"
      >
        {{ caption }}
      </p>
    </div>
    <p v-if="errorText" :id="errorId" :class="kiutFieldErrorTextClass" role="alert">
      {{ errorText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';
import { kiutFieldErrorTextClass, kiutLabelClass } from './inputFieldStyles';

defineOptions({ name: 'InputRange' });

export type InputRangeOrientation = 'horizontal' | 'vertical';

const props = withDefaults(
  defineProps<{
    modelValue: number;
    label?: string;
    /** Texto centrado entre extremos (horizontal) o bajo min (vertical); p. ej. estado actual. */
    caption?: string;
    /** Etiqueta del extremo mínimo (izquierda en horizontal, bajo la pista en vertical). */
    captionMin?: string;
    /** Etiqueta del extremo máximo (derecha en horizontal, sobre la pista en vertical). */
    captionMax?: string;
    orientation?: InputRangeOrientation;
    id?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorText?: string;
    min?: number;
    max?: number;
    step?: number;
    /** Longitud de la pista: en horizontal es el ancho, en vertical la altura (p. ej. `12rem`). */
    trackLength?: string;
  }>(),
  {
    orientation: 'horizontal',
    min: 0,
    max: 100,
    step: 1,
    trackLength: '12rem',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const uid = `kiut-input-range-${randomInstanceSuffix()}`;
const inputId = computed(() => props.id ?? uid);
const errorId = computed(() => `${inputId.value}-err`);

const describedBy = computed(() => {
  const ids: string[] = [];
  if (props.errorText) ids.push(errorId.value);
  return ids.length ? ids.join(' ') : undefined;
});

/** Solo `caption`, sin etiquetas de extremos. */
const simpleCaptionOnly = computed(
  () => !!(props.caption && !props.captionMin && !props.captionMax)
);

/** Fila con etiquetas de extremos (horizontal): min | opcional centro | max. */
const showCaptionEndsRow = computed(() => !!(props.captionMin || props.captionMax));

const fillPercent = computed(() => {
  const { min, max, modelValue } = props;
  if (max === min) return 0;
  const t = (modelValue - min) / (max - min);
  return Math.min(100, Math.max(0, t * 100));
});

const cssVars = computed(() => ({
  '--kiut-range-fill': `${fillPercent.value}%`,
  '--kiut-range-length': props.trackLength,
}));

function onInput(e: Event) {
  const v = Number((e.target as HTMLInputElement).value);
  emit('update:modelValue', Number.isNaN(v) ? props.min : v);
}
</script>

<style scoped>
/* Pista gris + relleno violeta (--kiut-primary); thumb hueco. Light/dark vía variables de pista. */

.kiut-range-input {
  --kiut-range-track: #e2e8f0;
}

:global(.dark) .kiut-range-input {
  --kiut-range-track: #2c2c36;
}

/* Horizontal */
.kiut-range-input--horizontal {
  height: 2.75rem;
}

.kiut-range-input--horizontal::-webkit-slider-runnable-track {
  height: 0.5rem;
  border-radius: 9999px;
  background: linear-gradient(
    to right,
    var(--kiut-primary) 0%,
    var(--kiut-primary) var(--kiut-range-fill),
    var(--kiut-range-track) var(--kiut-range-fill),
    var(--kiut-range-track) 100%
  );
}

.kiut-range-input--horizontal::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: -0.375rem;
  border-radius: 9999px;
  border: 3px solid var(--kiut-primary);
  background-color: transparent;
  box-shadow: none;
  transition: transform 0.12s ease;
}

.kiut-range-input--horizontal:focus-visible::-webkit-slider-thumb {
  outline: 2px solid var(--kiut-primary);
  outline-offset: 2px;
}

.kiut-range-input--horizontal::-moz-range-track {
  height: 0.5rem;
  border-radius: 9999px;
  background: var(--kiut-range-track);
}

.kiut-range-input--horizontal::-moz-range-progress {
  height: 0.5rem;
  border-radius: 9999px;
  background: var(--kiut-primary);
}

.kiut-range-input--horizontal::-moz-range-thumb {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  border: 3px solid var(--kiut-primary);
  background-color: transparent;
}

.kiut-range-input--horizontal:focus-visible::-moz-range-thumb {
  outline: 2px solid var(--kiut-primary);
  outline-offset: 2px;
}

/* Vertical: el input sigue siendo horizontal en el DOM; se rota -90° (abajo = min, arriba = max). */
.kiut-range-input--vertical {
  width: var(--kiut-range-length);
  height: 2.75rem;
  transform: rotate(-90deg);
  transform-origin: center center;
}

.kiut-range-input--vertical::-webkit-slider-runnable-track {
  height: 0.5rem;
  border-radius: 9999px;
  background: linear-gradient(
    to right,
    var(--kiut-primary) 0%,
    var(--kiut-primary) var(--kiut-range-fill),
    var(--kiut-range-track) var(--kiut-range-fill),
    var(--kiut-range-track) 100%
  );
}

.kiut-range-input--vertical::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: -0.375rem;
  border-radius: 9999px;
  border: 3px solid var(--kiut-primary);
  background-color: transparent;
}

.kiut-range-input--vertical:focus-visible::-webkit-slider-thumb {
  outline: 2px solid var(--kiut-primary);
  outline-offset: 2px;
}

.kiut-range-input--vertical::-moz-range-track {
  height: 0.5rem;
  border-radius: 9999px;
  background: var(--kiut-range-track);
}

.kiut-range-input--vertical::-moz-range-progress {
  height: 0.5rem;
  border-radius: 9999px;
  background: var(--kiut-primary);
}

.kiut-range-input--vertical::-moz-range-thumb {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  border: 3px solid var(--kiut-primary);
  background-color: transparent;
}
</style>
