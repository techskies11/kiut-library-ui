<template>
  <div ref="rootRef" class="relative font-sans" @focusout="onFocusOut">
    <label v-if="label" :id="labelId" :class="kiutLabelClass">{{ label }}</label>
    <button
      type="button"
      :class="[
        kiutInputControlClass,
        'flex w-full items-center gap-2 text-left',
        open ? 'border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25' : '',
      ]"
      :aria-expanded="open"
      aria-haspopup="dialog"
      :aria-labelledby="label ? labelId : undefined"
      :aria-label="!label ? resolvedAria : undefined"
      @focus="openPanel"
      @click="openPanel"
    >
      <ClockIcon
        class="h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400"
        aria-hidden="true"
      />
      <span
        class="min-w-0 flex-1 truncate"
        :class="
          !hasValue ? 'text-[color:var(--kiut-text-muted)] dark:text-slate-500' : ''
        "
      >
        {{ displayTime }}
      </span>
    </button>

    <div
      v-show="open"
      ref="panelRef"
      role="dialog"
      tabindex="-1"
      aria-modal="true"
      aria-label="Selector de hora"
      :class="[
        panelPositionClass,
        'absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),16rem)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]',
      ]"
      @keydown.escape.stop="close"
      @mousedown.prevent
    >
      <div class="p-3">
        <div
          class="mb-2 grid grid-cols-2 gap-2 text-center text-xs font-medium tracking-wide text-[#61616b] dark:text-[#e3e3e8]"
        >
          <span>Hora</span>
          <span>Min</span>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div
            ref="hourListRef"
            class="max-h-[12rem] overflow-y-auto overscroll-contain rounded-lg border border-gray-200 dark:border-[color:var(--kiut-border-light)]"
            role="listbox"
            aria-label="Horas"
          >
            <button
              v-for="hour in hourOptions"
              :key="hour"
              type="button"
              role="option"
              :aria-selected="draftHour === hour"
              :disabled="isHourOptionDisabled(hour)"
              class="flex h-9 w-full items-center justify-center text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-40"
              :class="timeOptionClass(hour, 'hour')"
              @mousedown.prevent="onHourClick(hour)"
            >
              {{ pad2(hour) }}
            </button>
          </div>

          <div
            ref="minuteListRef"
            class="max-h-[12rem] overflow-y-auto overscroll-contain rounded-lg border border-gray-200 dark:border-[color:var(--kiut-border-light)]"
            role="listbox"
            aria-label="Minutos"
          >
            <button
              v-for="minute in minuteOptions"
              :key="minute"
              type="button"
              role="option"
              :aria-selected="draftMinute === minute"
              :disabled="isMinuteOptionDisabled(minute)"
              class="flex h-9 w-full items-center justify-center text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-40"
              :class="timeOptionClass(minute, 'minute')"
              @mousedown.prevent="onMinuteClick(minute)"
            >
              {{ pad2(minute) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClockIcon } from '@heroicons/vue/24/outline';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { randomInstanceSuffix } from '../../utils/randomId';
import { kiutInputControlClass, kiutLabelClass } from './inputFieldStyles';
import {
  buildHourOptions,
  buildMinuteOptions,
  clampTimeToBounds,
  formatTimeDisplay,
  isHourDisabled,
  isMinuteDisabled,
  parseTimeHHmm,
  toTimeHHmm,
  type KiutTimeValue,
} from './timePickerUtils';

defineOptions({ name: 'TimePicker' });

export type { KiutTimeValue };

const props = withDefaults(
  defineProps<{
    modelValue: KiutTimeValue;
    label?: string;
    placeholder?: string;
    ariaLabel?: string;
    minTime?: string | null;
    maxTime?: string | null;
    /** Intervalo en minutos entre opciones del selector (1–30). */
    minuteStep?: number;
    /** Ancla el panel al borde izquierdo (`start`) o derecho (`end`) del control; usa `end` cerca del borde derecho del viewport. */
    panelAlign?: 'start' | 'end';
  }>(),
  {
    placeholder: 'Seleccionar hora',
    minuteStep: 1,
    panelAlign: 'start',
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: KiutTimeValue];
}>();

const uid = `kiut-tp-${randomInstanceSuffix()}`;
const labelId = `${uid}-lbl`;

const rootRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const hourListRef = ref<HTMLElement | null>(null);
const minuteListRef = ref<HTMLElement | null>(null);
const open = ref(false);
const draftHour = ref<number | null>(null);
const draftMinute = ref<number | null>(null);

const hasValue = computed(() => Boolean(props.modelValue));

const hourOptions = computed(() => buildHourOptions());
const minuteOptions = computed(() => buildMinuteOptions(props.minuteStep));

const resolvedAria = computed(() => props.ariaLabel ?? props.placeholder);

const panelPositionClass = computed(() => {
  const mobileCenter = 'max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0';
  if (props.panelAlign === 'end') {
    return `right-0 left-auto ${mobileCenter}`;
  }
  return `left-0 right-auto ${mobileCenter}`;
});

const displayTime = computed(() => {
  if (!props.modelValue) return props.placeholder;
  return formatTimeDisplay(props.modelValue);
});

const timeOptionActiveClass =
  'text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white';
const timeOptionSelectedClass = 'bg-[#895af6] font-semibold text-white';

function pad2(value: number) {
  return String(value).padStart(2, '0');
}

function syncDraftFromModel() {
  const parsed = parseTimeHHmm(props.modelValue);
  if (parsed) {
    draftHour.value = parsed.hours;
    draftMinute.value = parsed.minutes;
    return;
  }

  draftHour.value = null;
  draftMinute.value = null;
}

function isHourOptionDisabled(hour: number) {
  return isHourDisabled(hour, props.minTime, props.maxTime);
}

function isMinuteOptionDisabled(minute: number) {
  const hour = draftHour.value ?? 0;
  return isMinuteDisabled(hour, minute, props.minTime, props.maxTime);
}

function timeOptionClass(value: number, kind: 'hour' | 'minute') {
  const selected =
    kind === 'hour' ? draftHour.value === value : draftMinute.value === value;
  return selected ? timeOptionSelectedClass : timeOptionActiveClass;
}

function commitDraft() {
  if (draftHour.value == null || draftMinute.value == null) return;

  const clamped = clampTimeToBounds(
    draftHour.value,
    draftMinute.value,
    props.minTime,
    props.maxTime,
  );

  draftHour.value = clamped.hours;
  draftMinute.value = clamped.minutes;
  emit('update:modelValue', toTimeHHmm(clamped.hours, clamped.minutes));
}

function onHourClick(hour: number) {
  if (isHourOptionDisabled(hour)) return;

  draftHour.value = hour;
  if (draftMinute.value == null) {
    draftMinute.value = 0;
  }

  if (isMinuteOptionDisabled(draftMinute.value)) {
    const firstValid = minuteOptions.value.find((m) => !isMinuteDisabled(hour, m, props.minTime, props.maxTime));
    draftMinute.value = firstValid ?? 0;
  }

  commitDraft();
}

function onMinuteClick(minute: number) {
  if (draftHour.value == null) {
    draftHour.value = 0;
  }
  if (isMinuteDisabled(draftHour.value, minute, props.minTime, props.maxTime)) return;

  draftMinute.value = minute;
  commitDraft();
}

function scrollSelectionIntoView() {
  const scrollToSelected = (container: HTMLElement | null, selected: number | null) => {
    if (!container || selected == null) return;
    const el = container.querySelector<HTMLElement>(`[aria-selected="true"]`);
    el?.scrollIntoView({ block: 'nearest' });
  };

  scrollToSelected(hourListRef.value, draftHour.value);
  scrollToSelected(minuteListRef.value, draftMinute.value);
}

function close() {
  open.value = false;
}

function openPanel(e?: MouseEvent | FocusEvent) {
  e?.stopPropagation();
  if (open.value) return;

  syncDraftFromModel();
  open.value = true;
  void nextTick(() => {
    panelRef.value?.focus();
    scrollSelectionIntoView();
  });
}

function onDocumentClick(e: MouseEvent) {
  if (!open.value) return;
  const root = rootRef.value;
  if (root && !root.contains(e.target as Node)) {
    open.value = false;
  }
}

function onFocusOut(e: FocusEvent) {
  if (!open.value) return;
  const root = rootRef.value;
  const related = e.relatedTarget as Node | null;
  if (root && related && root.contains(related)) return;

  window.setTimeout(() => {
    if (!open.value) return;
    const active = document.activeElement;
    if (root && active && root.contains(active)) return;
    open.value = false;
  }, 0);
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick);
});
</script>
