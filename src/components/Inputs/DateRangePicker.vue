<template>
  <div ref="rootRef" class="ku:relative ku:font-sans">
    <label v-if="label" :id="labelId" :class="kiutLabelClass">{{ label }}</label>
    <button
      type="button"
      :class="[kiutInputControlClass, 'ku:flex ku:w-full ku:items-center ku:gap-2 ku:text-left']"
      :aria-expanded="open"
      aria-haspopup="dialog"
      :aria-labelledby="label ? labelId : undefined"
      :aria-label="!label ? resolvedAria : undefined"
      @focus="openCalendar"
      @click="openCalendar"
    >
      <CalendarDaysIcon
        class="ku:h-5 ku:w-5 ku:shrink-0 ku:text-gray-500 ku:dark:text-slate-400"
        aria-hidden="true"
      />
      <span
        class="ku:min-w-0 ku:flex-1 ku:truncate"
        :class="!modelValue.start || !modelValue.end ? 'ku:text-[color:var(--kiut-text-muted)] ku:dark:text-slate-500' : ''"
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
        'ku:absolute ku:top-full ku:z-[120] ku:mt-2 ku:w-[min(calc(100vw-2rem),720px)] ku:max-w-[100vw] ku:rounded-2xl ku:border ku:border-gray-300 ku:bg-[color:var(--kiut-bg-secondary)] ku:p-4 ku:shadow-xl outline-none ku:dark:border-[color:var(--kiut-border-light)]',
      ]"
      @keydown.escape.stop="close"
    >
      <div class="ku:mb-4 ku:flex ku:items-center ku:justify-between ku:gap-2">
        <button
          type="button"
          class="ku:inline-flex ku:h-9 ku:w-9 ku:shrink-0 ku:items-center ku:justify-center ku:rounded-full ku:border ku:border-gray-300 ku:text-gray-600 ku:transition ku:hover:bg-black/[0.04] ku:focus-visible:outline ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/30 ku:dark:border-[color:var(--kiut-border-light)] ku:dark:text-slate-300 ku:dark:hover:bg-white/[0.06]"
          aria-label="Mes anterior"
          @click="shiftView(-1)"
        >
          <ChevronLeftIcon class="ku:h-5 ku:w-5" aria-hidden="true" />
        </button>
        <div class="ku:flex ku:min-w-0 ku:flex-1 ku:justify-center ku:gap-8 ku:text-center ku:text-sm ku:font-semibold ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100">
          <span class="ku:min-w-0 ku:truncate">{{ formatMonthYearTitle(visibleMonths[0]) }}</span>
          <span class="ku:min-w-0 ku:truncate">{{ formatMonthYearTitle(visibleMonths[1]) }}</span>
        </div>
        <button
          type="button"
          class="ku:inline-flex ku:h-9 ku:w-9 ku:shrink-0 ku:items-center ku:justify-center ku:rounded-full ku:border ku:border-gray-300 ku:text-gray-600 ku:transition ku:hover:bg-black/[0.04] ku:focus-visible:outline ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/30 ku:dark:border-[color:var(--kiut-border-light)] ku:dark:text-slate-300 ku:dark:hover:bg-white/[0.06]"
          aria-label="Mes siguiente"
          @click="shiftView(1)"
        >
          <ChevronRightIcon class="ku:h-5 ku:w-5" aria-hidden="true" />
        </button>
      </div>

      <div class="ku:flex ku:flex-col ku:gap-6 ku:sm:flex-row ku:sm:gap-8">
        <div
          v-for="month in visibleMonths"
          :key="`${month.getFullYear()}-${month.getMonth()}`"
          class="ku:min-w-0 ku:flex-1"
        >
          <div
            class="ku:mb-2 ku:grid ku:grid-cols-7 ku:gap-1 ku:text-center ku:text-[11px] ku:font-medium ku:uppercase ku:tracking-wide ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-slate-400"
          >
            <span v-for="wd in weekDays" :key="wd">{{ wd }}</span>
          </div>
          <div class="ku:grid ku:grid-cols-7 ku:gap-y-1">
            <button
              v-for="cell in buildMonthCells(month)"
              :key="toISODate(cell)"
              type="button"
              :disabled="isDisabled(cell)"
              class="ku:relative ku:flex ku:h-9 ku:items-center ku:justify-center ku:rounded-lg ku:text-sm ku:outline-none ku:transition ku:focus-visible:ring-2 ku:focus-visible:ring-[color:var(--kiut-primary)]/40"
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
    /** Ancla el panel al borde izquierdo (`start`) o derecho (`end`) del control; usa `end` cerca del borde derecho del viewport. */
    panelAlign?: 'start' | 'end';
  }>(),
  {
    placeholder: 'Seleccionar fechas',
    panelAlign: 'start',
  }
);

const emit = defineEmits<{
  'ku:update:modelValue': [value: KiutDateRange];
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

const panelPositionClass = computed(() =>
  props.panelAlign === 'end' ? 'ku:right-0 ku:left-auto' : 'ku:left-0 ku:right-auto'
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

function dayClass(month: Date, cell: Date) {
  const inMonth = isInMonth(cell, month);
  const start = props.modelValue.start ? startOfDay(parseISODate(props.modelValue.start)) : null;
  const end = props.modelValue.end ? startOfDay(parseISODate(props.modelValue.end)) : null;
  const d = startOfDay(cell);

  const baseMuted = !inMonth
    ? 'ku:text-slate-400 ku:dark:text-slate-500'
    : 'ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100';

  if (!start || !end) {
    return `${baseMuted} hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`;
  }

  const inRange = isSameOrAfterDay(d, start) && isSameOrBeforeDay(d, end);
  const isStart = sameDay(d, start);
  const isEnd = sameDay(d, end);

  if (isStart || isEnd) {
    return 'ku:bg-[color:var(--kiut-primary)] ku:font-semibold ku:text-white ku:shadow-sm';
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
    emit('ku:update:modelValue', { start: toISODate(d), end: toISODate(d) });
    return;
  }

  const a = startOfDay(pendingAnchor.value);
  let s = a;
  let e = new Date(d);
  if (isBeforeDay(e, s)) [s, e] = [e, s];
  emit('ku:update:modelValue', { start: toISODate(s), end: toISODate(e) });
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
