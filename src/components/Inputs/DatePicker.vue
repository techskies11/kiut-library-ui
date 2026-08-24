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
      @focus="openCalendar"
      @click="openCalendar"
    >
      <CalendarDaysIcon
        class="h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400"
        aria-hidden="true"
      />
      <span
        class="min-w-0 flex-1 truncate"
        :class="
          !hasValue ? 'text-[color:var(--kiut-text-muted)] dark:text-slate-500' : ''
        "
      >
        {{ displayDate }}
      </span>
    </button>

    <div
      v-show="open"
      ref="panelRef"
      role="dialog"
      tabindex="-1"
      aria-modal="true"
      aria-label="Calendario"
      :class="[
        panelPositionClass,
        'absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),20rem)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]',
      ]"
      @keydown.escape.stop="close"
    >
      <div class="p-3">
        <div class="mb-4 flex items-center justify-between gap-2">
          <button
            type="button"
            class="inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]"
            aria-label="Mes anterior"
            @click="shiftView(-1)"
          >
            <ChevronLeftIcon class="h-4 w-4" aria-hidden="true" />
          </button>
          <span
            class="min-w-0 truncate px-1 text-sm font-medium text-[#61616b] dark:text-[#e3e3e8]"
          >
            {{ formatMonthYearTitle(viewMonth) }}
          </span>
          <button
            type="button"
            class="inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]"
            aria-label="Mes siguiente"
            @click="shiftView(1)"
          >
            <ChevronRightIcon class="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div
          class="mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[#61616b] font-normal text-[0.8rem]"
        >
          <span v-for="wd in weekDays" :key="wd">{{ wd }}</span>
        </div>
        <div class="grid grid-cols-7 gap-y-2 mt-2">
          <button
            v-for="cell in monthCells"
            :key="toISODate(cell)"
            type="button"
            :disabled="isDisabled(cell)"
            class="relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100"
            :class="dayClass(cell)"
            @click="onDayClick(cell)"
          >
            {{ cell.getDate() }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import {
  addMonths,
  buildMonthCells,
  formatMonthDayLabel,
  formatMonthYearTitle,
  isBeforeDay,
  parseISODate,
  sameDay,
  startOfDay,
  startOfMonth,
  toISODate,
} from './dateRangeUtils';
import { randomInstanceSuffix } from '../../utils/randomId';
import { kiutInputControlClass, kiutLabelClass } from './inputFieldStyles';

defineOptions({ name: 'DatePicker' });

export type KiutDateValue = string | null;

const props = withDefaults(
  defineProps<{
    modelValue: KiutDateValue;
    label?: string;
    placeholder?: string;
    ariaLabel?: string;
    minDate?: string | null;
    maxDate?: string | null;
    /** Ancla el panel al borde izquierdo (`start`) o derecho (`end`) del control; usa `end` cerca del borde derecho del viewport. */
    panelAlign?: 'start' | 'end';
  }>(),
  {
    placeholder: 'Seleccionar fecha',
    panelAlign: 'start',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: KiutDateValue];
}>();

const uid = `kiut-dp-${randomInstanceSuffix()}`;
const labelId = `${uid}-lbl`;

const rootRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const open = ref(false);

const viewMonth = ref(startOfMonth(new Date()));

const hasValue = computed(() => Boolean(props.modelValue));

const monthCells = computed(() => buildMonthCells(viewMonth.value));

const resolvedAria = computed(() => props.ariaLabel ?? props.placeholder);

const panelPositionClass = computed(() => {
  const mobileCenter = 'max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0';
  if (props.panelAlign === 'end') {
    return `right-0 left-auto ${mobileCenter}`;
  }
  return `left-0 right-auto ${mobileCenter}`;
});

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const displayDate = computed(() => {
  if (!props.modelValue) return props.placeholder;
  return formatMonthDayLabel(parseISODate(props.modelValue));
});

function isInMonth(cell: Date, month: Date) {
  return cell.getMonth() === month.getMonth() && cell.getFullYear() === month.getFullYear();
}

function isDisabled(cell: Date) {
  const d = startOfDay(cell);
  if (props.minDate) {
    const min = startOfDay(parseISODate(props.minDate));
    if (isBeforeDay(d, min)) return true;
  }
  if (props.maxDate) {
    const max = startOfDay(parseISODate(props.maxDate));
    if (isBeforeDay(max, d)) return true;
  }
  return false;
}

const dayDisabledClass = 'rounded-lg text-[#61616b]';
const dayActiveClass =
  'rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white';
const dayOutOfMonthOpacity = 'opacity-30';
const daySelectedBgClass = 'bg-[#895af6] font-semibold text-white';

function dayClass(cell: Date) {
  const inMonth = isInMonth(cell, viewMonth.value);
  const disabled = isDisabled(cell);
  const selected = props.modelValue
    ? sameDay(cell, startOfDay(parseISODate(props.modelValue)))
    : false;

  if (disabled) {
    return dayDisabledClass;
  }

  let classes = dayActiveClass;

  if (selected) {
    classes = daySelectedBgClass;
  }

  if (!inMonth) {
    classes = `${classes} ${dayOutOfMonthOpacity}`;
  }

  return classes;
}

function onDayClick(day: Date) {
  if (isDisabled(day)) return;
  const d = startOfDay(day);
  emit('update:modelValue', toISODate(d));
  open.value = false;
}

function shiftView(dir: -1 | 1) {
  viewMonth.value = addMonths(viewMonth.value, dir);
}

function close() {
  open.value = false;
}

function openCalendar(e?: MouseEvent | FocusEvent) {
  e?.stopPropagation();
  if (open.value) return;

  open.value = true;
  if (props.modelValue) {
    try {
      viewMonth.value = startOfMonth(parseISODate(props.modelValue));
    } catch {
      /* ignore */
    }
  }
  void nextTick(() => panelRef.value?.focus());
}

function onDocumentClick(e: MouseEvent) {
  if (!open.value) return;
  const root = rootRef.value;
  if (root && !root.contains(e.target as Node)) {
    open.value = false;
  }
}

function onFocusOut() {
  if (!open.value) return;
  const root = rootRef.value;
  void nextTick(() => {
    const active = document.activeElement;
    if (root && active && root.contains(active)) return;
    open.value = false;
  });
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick);
});
</script>
