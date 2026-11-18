<template>
  <div ref="rootRef" class="relative font-sans">
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
          !hasRange ? 'text-[color:var(--kiut-text-muted)] dark:text-slate-500' : ''
        "
      >
        {{ displayRange }}
      </span>
    </button>

    <div
      v-show="open"
      ref="panelRef"
      role="dialog"
      tabindex="-1"
      aria-modal="true"
      aria-label="Calendario de rango"
      :class="[
        panelPositionClass,
        'absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]',
      ]"
      @keydown.escape.stop="close"
    >
      <div class="min-w-0 flex-1 overflow-x-hidden p-3">
        <div class="mb-4 flex items-center justify-between gap-2">
          <button
            type="button"
            class="inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[color:var(--kiut-text-subtitle)] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/[0.06]"
            aria-label="Mes anterior"
            @click="shiftView(-1)"
          >
            <ChevronLeftIcon class="h-4 w-4" aria-hidden="true" />
          </button>
          <div class="flex min-w-0 flex-1 justify-center text-center text-[color:var(--kiut-text-subtitle)] dark:text-[color:var(--kiut-text-primary)]">
            <span
              class="min-w-0 truncate px-1 text-sm font-medium sm:hidden"
            >
              {{ calendarHeaderTitle }}
            </span>
            <div class="hidden min-w-0 flex-1 justify-center gap-4 sm:flex">
              <span class="w-[252px] min-w-0 truncate text-sm font-medium">{{
                formatMonthYearTitle(visibleMonths[0])
              }}</span>
              <span class="w-[252px] min-w-0 truncate text-sm font-medium">{{
                formatMonthYearTitle(visibleMonths[1])
              }}</span>
            </div>
          </div>
          <button
            type="button"
            class="inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[color:var(--kiut-text-subtitle)] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[color:var(--kiut-text-primary)] dark:hover:bg-white/[0.06]"
            aria-label="Mes siguiente"
            @click="shiftView(1)"
          >
            <ChevronRightIcon class="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div class="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div
            v-for="month in visibleMonths"
            :key="`${month.getFullYear()}-${month.getMonth()}`"
            class="w-full max-w-[252px] shrink-0"
          >
            <div
              class="mb-2 grid grid-cols-7 text-center text-xs font-medium tracking-wide text-[color:var(--kiut-text-subtitle)] font-normal text-[0.8rem]"
            >
              <span v-for="wd in weekDays" :key="wd">{{ wd }}</span>
            </div>
            <div class="grid grid-cols-7 gap-y-2 mt-2">
              <button
                v-for="cell in buildMonthCells(month)"
                :key="toISODate(cell)"
                type="button"
                :disabled="isDisabled(cell)"
                class="relative flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed disabled:opacity-100"
                :class="dayClass(month, cell)"
                @click="onDayClick(cell)"
              >
                {{ cell.getDate() }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import {
  addMonths,
  buildMonthCells,
  formatMonthDayLabel,
  formatMonthYearTitle,
  isBeforeDay,
  isSameOrAfterDay,
  isSameOrBeforeDay,
  parseISODate,
  sameDay,
  startOfDay,
  startOfMonth,
  toISODate,
  type KiutDateRange,
} from './dateRangeUtils';
import { randomInstanceSuffix } from '../../utils/randomId';
import { kiutInputControlClass, kiutLabelClass } from './inputFieldStyles';

defineOptions({ name: 'DateRangePicker' });

export type { KiutDateRange };

const props = withDefaults(
  defineProps<{
    modelValue: KiutDateRange;
    label?: string;
    placeholder?: string;
    ariaLabel?: string;
    minDate?: string | null;
    maxDate?: string | null;
    /** Ancla el panel al borde izquierdo (`start`) o derecho (`end`) del control; usa `end` cerca del borde derecho del viewport. */
    panelAlign?: 'start' | 'end';
  }>(),
  {
    placeholder: 'Seleccionar fechas',
    panelAlign: 'start',
  }
);

const emit = defineEmits<{
  'update:modelValue': [value: KiutDateRange];
}>();

const uid = `kiut-drp-${randomInstanceSuffix()}`;
const labelId = `${uid}-lbl`;

const rootRef = ref<HTMLElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const open = ref(false);
const pendingAnchor = ref<Date | null>(null);

const viewMonth = ref(startOfMonth(new Date()));

const hasRange = computed(() => Boolean(props.modelValue.start && props.modelValue.end));

const visibleMonths = computed(() => {
  const left = startOfMonth(viewMonth.value);
  return [left, addMonths(left, 1)] as const;
});

const resolvedAria = computed(() => props.ariaLabel ?? props.placeholder);

const panelPositionClass = computed(() => {
  const mobileCenter = 'max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0';
  if (props.panelAlign === 'end') {
    return `right-0 left-auto ${mobileCenter}`;
  }
  return `left-0 right-auto ${mobileCenter}`;
});

const calendarHeaderTitle = computed(
  () =>
    `${formatMonthYearTitle(visibleMonths.value[0])} – ${formatMonthYearTitle(visibleMonths.value[1])}`
);

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const displayRange = computed(() => {
  if (!props.modelValue.start || !props.modelValue.end) return props.placeholder;
  const s = parseISODate(props.modelValue.start);
  const e = parseISODate(props.modelValue.end);
  return `${formatMonthDayLabel(s)} – ${formatMonthDayLabel(e)}`;
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

const dayDisabledClass = 'rounded-lg text-[color:var(--kiut-text-subtitle)]';
const dayActiveClass =
  'rounded-lg text-[color:var(--kiut-text-primary)] hover:bg-[color:var(--kiut-primary)] hover:text-white dark:hover:bg-[color:var(--kiut-primary)] dark:hover:text-white';
const dayOutOfMonthOpacity = 'opacity-30';
const dayRangeBgClass = 'bg-[color:var(--kiut-primary-hover)] font-medium text-white';
const daySelectedBgClass = 'bg-[color:var(--kiut-primary)] font-semibold text-white';

/** Radio por fila: redondeo izq en domingo o inicio; derecho en sábado o fin. */
function rangeSegmentRadiusClass(d: Date, start: Date, end: Date): string {
  const isStart = sameDay(d, start);
  const isEnd = sameDay(d, end);
  if (isStart && isEnd) return 'rounded-lg';

  const roundLeft = isStart || d.getDay() === 0;
  const roundRight = isEnd || d.getDay() === 6;

  if (roundLeft && roundRight) return 'rounded-lg';
  if (roundLeft) return 'rounded-l-lg';
  if (roundRight) return 'rounded-r-lg';
  return 'rounded-none';
}

function dayClass(month: Date, cell: Date) {
  const inMonth = isInMonth(cell, month);
  const disabled = isDisabled(cell);
  const start = props.modelValue.start ? startOfDay(parseISODate(props.modelValue.start)) : null;
  const end = props.modelValue.end ? startOfDay(parseISODate(props.modelValue.end)) : null;
  const d = startOfDay(cell);

  if (disabled) {
    return dayDisabledClass;
  }

  let classes = dayActiveClass;

  if (start && end) {
    const inRange = isSameOrAfterDay(d, start) && isSameOrBeforeDay(d, end);
    if (inRange) {
      const isStart = sameDay(d, start);
      const isEnd = sameDay(d, end);
      const radius = rangeSegmentRadiusClass(d, start, end);
      const bg = isStart || isEnd ? daySelectedBgClass : dayRangeBgClass;
      classes = `${radius} ${bg}`;
    }
  }

  if (!inMonth) {
    classes = `${classes} ${dayOutOfMonthOpacity}`;
  }

  return classes;
}

function onDayClick(day: Date) {
  if (isDisabled(day)) return;
  const d = startOfDay(day);

  if (!pendingAnchor.value) {
    pendingAnchor.value = new Date(d);
    emit('update:modelValue', { start: toISODate(d), end: toISODate(d) });
    return;
  }

  const a = startOfDay(pendingAnchor.value);
  let s = a;
  let e = new Date(d);
  if (isBeforeDay(e, s)) [s, e] = [e, s];
  emit('update:modelValue', { start: toISODate(s), end: toISODate(e) });
  pendingAnchor.value = null;
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
  pendingAnchor.value = null;
  if (props.modelValue.start) {
    try {
      viewMonth.value = startOfMonth(parseISODate(props.modelValue.start));
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

watch(open, (v) => {
  if (v) pendingAnchor.value = null;
});

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick);
});
</script>
