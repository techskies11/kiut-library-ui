<template>
  <div ref="rootRef" class="relative font-sans">
    <input v-if="name" type="hidden" :name="name" :value="modelValue ?? ''" />
    <div class="flex flex-row gap-3 items-center">
      <span
        v-if="$slots.icon"
        class="mb-1.5 inline-flex shrink-0 text-[color:var(--kiut-text-muted)] [&>svg]:h-4 [&>svg]:w-4"
        aria-hidden="true"
      >
        <slot name="icon" />
      </span>
      <label
        v-if="label"
        :id="labelId"
        :for="buttonId"
        :class="kiutLabelClass"
        >{{ label }}</label
      >
    </div>

    <button
      :id="buttonId"
      ref="buttonRef"
      type="button"
      :disabled="disabled"
      :class="[
        kiutInputControlClass,
        'flex w-full items-center gap-2 text-left',
        invalid ? kiutInputControlInvalidClass : '',
        open && !invalid
          ? 'border-[color:var(--kiut-primary)] ring-2 ring-[color:var(--kiut-primary)]/25'
          : '',
      ]"
      :aria-expanded="open"
      aria-haspopup="dialog"
      :aria-controls="panelId"
      :aria-labelledby="label ? labelId : undefined"
      :aria-label="!label ? resolvedAriaLabel : undefined"
      :aria-invalid="invalid ? 'true' : undefined"
      :aria-describedby="errorText ? errorId : undefined"
      @click="togglePanel"
      @keydown="onTriggerKeydown"
    >
      <CalendarDaysIcon
        class="h-5 w-5 shrink-0 text-gray-500 dark:text-slate-400"
        aria-hidden="true"
      />
      <span
        class="min-w-0 flex-1 truncate"
        :class="
          !hasValue
            ? 'text-[color:var(--kiut-text-muted)] dark:text-slate-500'
            : ''
        "
      >
        {{ triggerLabel }}
      </span>
    </button>

    <p
      v-if="errorText"
      :id="errorId"
      :class="kiutFieldErrorTextClass"
      role="alert"
    >
      {{ errorText }}
    </p>

    <div
      v-show="open"
      ref="panelRef"
      :id="panelId"
      role="dialog"
      tabindex="-1"
      aria-modal="true"
      :aria-label="calendarDialogAriaLabel"
      :class="[
        panelPositionClass,
        'absolute top-full z-[120] mt-2 w-[min(calc(100vw-2rem),20rem)] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-300 bg-[color:var(--kiut-bg-secondary)] shadow-xl outline-none dark:border-[color:var(--kiut-border-light)]',
      ]"
      @keydown.escape.stop="closePanel"
    >
      <div class="p-3">
        <div class="mb-4 flex items-center justify-between gap-2">
          <button
            type="button"
            class="inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]"
            :aria-label="previousMonthAriaLabel"
            @click.stop="shiftView(-1)"
          >
            <ChevronLeftIcon class="h-4 w-4" aria-hidden="true" />
          </button>
          <span
            class="min-w-0 truncate px-1 text-sm font-medium text-[#61616b] dark:text-[#e3e3e8]"
          >
            {{ formatMonthYearTitle(viewMonth, locale) }}
          </span>
          <button
            type="button"
            class="inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-md border border-gray-300 text-[#61616b] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/30 dark:border-[color:var(--kiut-border-light)] dark:text-[#e3e3e8] dark:hover:bg-white/[0.06]"
            :aria-label="nextMonthAriaLabel"
            @click.stop="shiftView(1)"
          >
            <ChevronRightIcon class="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div
          class="mb-2 grid grid-cols-7 text-center text-xs font-normal tracking-wide text-[#61616b] dark:text-[#e3e3e8]"
        >
          <span v-for="wd in weekDays" :key="wd">{{ wd }}</span>
        </div>
        <div class="grid grid-cols-7 gap-y-2">
          <button
            v-for="cell in monthCells"
            :key="toISODate(cell)"
            type="button"
            :disabled="isDayDisabled(cell)"
            class="relative mx-auto flex h-[36px] w-[36px] items-center justify-center text-xs outline-none transition focus-visible:ring-2 focus-visible:ring-[color:var(--kiut-primary)]/40 disabled:cursor-not-allowed"
            :class="dayClass(cell)"
            @click.stop="onDayClick(cell)"
          >
            {{ cell.getDate() }}
          </button>
        </div>
      </div>

      <div
        class="border-t border-gray-200 px-3 py-3 dark:border-[color:var(--kiut-border-light)]"
      >
        <div class="relative">
          <ClockIcon
            class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-400"
            aria-hidden="true"
          />
          <input
            :value="draftTime"
            type="time"
            autocomplete="off"
            :class="[kiutInputControlClass, 'min-h-0 py-2 pl-10 pr-3 text-sm']"
            :disabled="!draftDate"
            :min="timeMin"
            :max="timeMax"
            :step="step"
            :aria-label="timeInputAriaLabel"
            @input="onTimeInput"
            @click.stop
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from "@heroicons/vue/24/outline";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { randomInstanceSuffix } from "../../utils/randomId";
import {
  addMonths,
  buildMonthCellsMondayFirst,
  extractTimeHHmm,
  formatDateTimeDisplay,
  formatMonthYearTitle,
  getWeekDaysMondayFirst,
  isAfterDay,
  isBeforeDay,
  isDateTimeAfter,
  isDateTimeBefore,
  parseDateTimeLocalValue,
  sameDay,
  startOfDay,
  startOfMonth,
  toDateTimeLocalValue,
  toISODate,
  type KiutDateLocale,
} from "./dateRangeUtils";
import {
  kiutFieldErrorTextClass,
  kiutInputControlClass,
  kiutInputControlInvalidClass,
  kiutLabelClass,
} from "./inputFieldStyles";

defineOptions({ name: "InputDateTime" });

/**
 * Valor en formato `YYYY-MM-DDTHH:mm` (p. ej. `2026-04-08T14:30`) o vacío.
 */
export type KiutDateTimeValue = string | null;

const props = withDefaults(
  defineProps<{
    modelValue: KiutDateTimeValue;
    label?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
    invalid?: boolean;
    errorText?: string;
    placeholder?: string;
    locale?: KiutDateLocale;
    /** Límite inferior, misma forma que el valor. */
    min?: string;
    /** Límite superior, misma forma que el valor. */
    max?: string;
    /** Paso en segundos para el selector de hora. */
    step?: number;
    /** Ancla el panel al borde izquierdo (`start`) o derecho (`end`) del control. */
    panelAlign?: "start" | "end";
  }>(),
  {
    placeholder: "Seleccionar…",
    locale: "es",
    panelAlign: "start",
    step: 60,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: KiutDateTimeValue];
}>();

const uid = `kiut-input-datetime-${randomInstanceSuffix()}`;
const labelId = `${uid}-label`;
const buttonId = computed(() => props.id ?? `${uid}-btn`);
const panelId = `${uid}-panel`;
const errorId = `${uid}-err`;

const rootRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLButtonElement | null>(null);
const panelRef = ref<HTMLElement | null>(null);
const open = ref(false);
const viewMonth = ref(startOfMonth(new Date()));
const draftDate = ref<Date | null>(null);
const draftTime = ref("00:00");

const hasValue = computed(() => Boolean(props.modelValue));
const weekDays = computed(() => getWeekDaysMondayFirst(props.locale));
const monthCells = computed(() => buildMonthCellsMondayFirst(viewMonth.value));

const resolvedAriaLabel = computed(() => props.placeholder);

const triggerLabel = computed(() => {
  if (!props.modelValue) return props.placeholder;
  return formatDateTimeDisplay(props.modelValue, props.locale);
});

const panelPositionClass = computed(() => {
  const mobileCenter =
    "max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:translate-x-0";
  if (props.panelAlign === "end") {
    return `right-0 left-auto ${mobileCenter}`;
  }
  return `left-0 right-auto ${mobileCenter}`;
});

const calendarDialogAriaLabel = computed(() =>
  props.locale === "es"
    ? "Calendario de fecha y hora"
    : "Date and time calendar",
);

const previousMonthAriaLabel = computed(() =>
  props.locale === "es" ? "Mes anterior" : "Previous month",
);

const nextMonthAriaLabel = computed(() =>
  props.locale === "es" ? "Mes siguiente" : "Next month",
);

const timeInputAriaLabel = computed(() =>
  props.locale === "es" ? "Hora" : "Time",
);

const parsedMin = computed(() => parseDateTimeLocalValue(props.min));
const parsedMax = computed(() => parseDateTimeLocalValue(props.max));

const timeMin = computed(() => {
  if (!draftDate.value || !parsedMin.value) return undefined;
  if (!sameDay(draftDate.value, parsedMin.value)) return undefined;
  return `${String(parsedMin.value.getHours()).padStart(2, "0")}:${String(parsedMin.value.getMinutes()).padStart(2, "0")}`;
});

const timeMax = computed(() => {
  if (!draftDate.value || !parsedMax.value) return undefined;
  if (!sameDay(draftDate.value, parsedMax.value)) return undefined;
  return `${String(parsedMax.value.getHours()).padStart(2, "0")}:${String(parsedMax.value.getMinutes()).padStart(2, "0")}`;
});

function isInMonth(cell: Date, month: Date) {
  return (
    cell.getMonth() === month.getMonth() &&
    cell.getFullYear() === month.getFullYear()
  );
}

function isDayDisabled(cell: Date) {
  const d = startOfDay(cell);
  if (parsedMin.value && isBeforeDay(d, startOfDay(parsedMin.value)))
    return true;
  if (parsedMax.value && isAfterDay(d, startOfDay(parsedMax.value)))
    return true;
  return false;
}

function dayClass(cell: Date) {
  const inMonth = isInMonth(cell, viewMonth.value);
  const disabled = isDayDisabled(cell);
  const selected = draftDate.value ? sameDay(cell, draftDate.value) : false;

  if (disabled) {
    return "rounded-lg text-[#61616b] opacity-40";
  }

  let classes =
    "rounded-lg text-[#17171C] hover:bg-[#895af6] hover:text-white dark:text-[#e3e3e8] dark:hover:bg-[#895af6] dark:hover:text-white";

  if (selected) {
    classes = "rounded-lg bg-[#895af6] font-semibold text-white";
  }

  if (!inMonth) {
    classes = `${classes} opacity-30`;
  }

  return classes;
}

function syncDraftFromModel() {
  const parsed = parseDateTimeLocalValue(props.modelValue);
  if (parsed) {
    draftDate.value = startOfDay(parsed);
    draftTime.value = extractTimeHHmm(props.modelValue);
    viewMonth.value = startOfMonth(parsed);
    return;
  }

  draftDate.value = null;
  draftTime.value = "00:00";
  viewMonth.value = startOfMonth(new Date());
}

function clampTimeToBounds(time: string): string {
  if (!draftDate.value) return time;

  let candidate = parseDateTimeLocalValue(
    `${toISODate(draftDate.value)}T${time}`,
  );
  if (!candidate) return time;

  if (
    parsedMin.value &&
    sameDay(draftDate.value, parsedMin.value) &&
    isDateTimeBefore(candidate, parsedMin.value)
  ) {
    candidate = parsedMin.value;
  }
  if (
    parsedMax.value &&
    sameDay(draftDate.value, parsedMax.value) &&
    isDateTimeAfter(candidate, parsedMax.value)
  ) {
    candidate = parsedMax.value;
  }

  return `${String(candidate.getHours()).padStart(2, "0")}:${String(candidate.getMinutes()).padStart(2, "0")}`;
}

function commitSelection() {
  if (!draftDate.value) {
    emit("update:modelValue", null);
    return;
  }

  const time = clampTimeToBounds(draftTime.value);
  draftTime.value = time;

  const combinedDate = new Date(
    draftDate.value.getFullYear(),
    draftDate.value.getMonth(),
    draftDate.value.getDate(),
    Number(time.slice(0, 2)),
    Number(time.slice(3, 5)),
  );
  const combined = toDateTimeLocalValue(combinedDate);

  if (parsedMin.value && isDateTimeBefore(combinedDate, parsedMin.value))
    return;
  if (parsedMax.value && isDateTimeAfter(combinedDate, parsedMax.value)) return;

  emit("update:modelValue", combined);
}

function onDayClick(day: Date) {
  if (isDayDisabled(day)) return;
  draftDate.value = startOfDay(day);
  draftTime.value = clampTimeToBounds(draftTime.value);
  commitSelection();
}

function onTimeInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value;
  if (!raw) return;
  draftTime.value = raw;
  commitSelection();
}

function shiftView(dir: -1 | 1) {
  viewMonth.value = addMonths(viewMonth.value, dir);
}

function closePanel() {
  open.value = false;
}

function openPanel() {
  if (props.disabled) return;
  syncDraftFromModel();
  open.value = true;
  void nextTick(() => panelRef.value?.focus());
}

function togglePanel(e: MouseEvent) {
  e.stopPropagation();
  if (props.disabled) return;
  if (open.value) {
    closePanel();
    return;
  }
  openPanel();
}

function onTriggerKeydown(e: KeyboardEvent) {
  if (props.disabled) return;
  if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    if (!open.value) openPanel();
  }
}

function onDocumentClick(e: MouseEvent) {
  if (!open.value) return;
  const root = rootRef.value;
  if (root && !root.contains(e.target as Node)) {
    closePanel();
  }
}

watch(
  () => props.modelValue,
  () => {
    if (!open.value) syncDraftFromModel();
  },
);

onMounted(() => {
  syncDraftFromModel();
  document.addEventListener("click", onDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener("click", onDocumentClick);
});
</script>
