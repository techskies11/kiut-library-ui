<template>
  <div ref="rootRef" class="relative font-sans">
    <label v-if="label" :id="labelId" :class="kiutLabelClass">{{ label }}</label>
    <button
      type="button"
      :class="[kiutInputControlClass, 'flex w-full items-center gap-2 text-left']"
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
          !modelValue.start || !modelValue.end
            ? 'text-[color:var(--kiut-text-muted)] dark:text-slate-500'
            : ''
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
      class="absolute left-0 top-full z-[120] mt-2 w-[min(calc(100vw-2rem),720px)] max-w-[100vw] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] p-4 shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]"
      @keydown.escape.stop="close"
    >
      <div class="mb-4 flex items-center justify-between gap-2">
        <button
          type="button"
          class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]"
          aria-label="Mes anterior"
          @click="shiftView(-1)"
        >
          <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
        </button>
        <div class="flex min-w-0 flex-1 justify-center gap-8 text-center text-sm font-semibold text-[color:var(--kiut-text-primary)] dark:text-slate-100">
          <span class="min-w-0 truncate">{{ formatMonthYearTitle(visibleMonths[0]) }}</span>
          <span class="min-w-0 truncate">{{ formatMonthYearTitle(visibleMonths[1]) }}</span>
        </div>
        <button
          type="button"
          class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-slate-300 dark:hover:bg-white/[0.06]"
          aria-label="Mes siguiente"
          @click="shiftView(1)"
        >
          <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div class="flex flex-col gap-6 sm:flex-row sm:gap-8">
        <div
          v-for="month in visibleMonths"
          :key="`${month.getFullYear()}-${month.getMonth()}`"
          class="min-w-0 flex-1"
        >
          <div
            class="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-[color:var(--kiut-text-secondary)] dark:text-slate-400"
          >
            <span v-for="wd in weekDays" :key="wd">{{ wd }}</span>
          </div>
          <div class="grid grid-cols-7 gap-y-1">
            <button
              v-for="cell in buildMonthCells(month)"
              :key="toISODate(cell)"
              type="button"
              :disabled="isDisabled(cell)"
              class="relative flex h-9 items-center justify-center rounded-lg text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40"
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
} from './dateRangeUtils';
import { randomInstanceSuffix } from '../../utils/randomId';
import { kiutInputControlClass, kiutLabelClass } from './inputFieldStyles';

defineOptions({ name: 'DateRangePicker' });

export interface KiutDateRange {
  start: string | null;
  end: string | null;
}

const props = withDefaults(
  defineProps<{
    modelValue: KiutDateRange;
    label?: string;
    placeholder?: string;
    ariaLabel?: string;
    minDate?: string | null;
    maxDate?: string | null;
  }>(),
  {
    placeholder: 'Seleccionar fechas',
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

const visibleMonths = computed(() => {
  const left = startOfMonth(viewMonth.value);
  return [left, addMonths(left, 1)] as const;
});

const resolvedAria = computed(() => props.ariaLabel ?? props.placeholder);

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

function dayClass(month: Date, cell: Date) {
  const inMonth = isInMonth(cell, month);
  const start = props.modelValue.start ? startOfDay(parseISODate(props.modelValue.start)) : null;
  const end = props.modelValue.end ? startOfDay(parseISODate(props.modelValue.end)) : null;
  const d = startOfDay(cell);

  const baseMuted = !inMonth
    ? 'text-slate-400 dark:text-slate-500'
    : 'text-[color:var(--kiut-text-primary)] dark:text-slate-100';

  if (!start || !end) {
    return `${baseMuted} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
  }

  const inRange = isSameOrAfterDay(d, start) && isSameOrBeforeDay(d, end);
  const isStart = sameDay(d, start);
  const isEnd = sameDay(d, end);

  if (isStart || isEnd) {
    return 'bg-[color:var(--kiut-primary)] font-semibold text-white shadow-sm';
  }
  if (inRange) {
    return `${baseMuted} bg-violet-100/90 dark:bg-violet-950/35 hover:bg-violet-200/80 dark:hover:bg-violet-900/40`;
  }
  return `${baseMuted} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
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
