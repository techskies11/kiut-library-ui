/** Utilidades de calendario sin dependencias (compatible con Vite/Storybook). */

export type KiutDateLocale = 'es' | 'en';

export interface KiutDateRange {
  start: string | null;
  end: string | null;
}

export type KiutDatePresetId =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last14'
  | 'last30'
  | 'last90'
  | 'thisMonth'
  | 'lastMonth'
  | 'yearToDate';

export interface KiutDatePreset {
  id: KiutDatePresetId;
  label: string;
}

const WEEKDAYS: Record<KiutDateLocale, readonly string[]> = {
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  es: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
};

const SHORT_MONTHS: Record<KiutDateLocale, readonly string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
};

const LONG_MONTHS: Record<KiutDateLocale, readonly string[]> = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  es: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
};

const PRESET_LABELS: Record<KiutDateLocale, Record<KiutDatePresetId, string>> = {
  es: {
    today: 'Hoy',
    yesterday: 'Ayer',
    last7: 'Últimos 7 días',
    last14: 'Últimos 14 días',
    last30: 'Últimos 30 días',
    last90: 'Últimos 90 días',
    thisMonth: 'Este mes',
    lastMonth: 'Mes anterior',
    yearToDate: 'Año hasta hoy',
  },
  en: {
    today: 'Today',
    yesterday: 'Yesterday',
    last7: 'Last 7 days',
    last14: 'Last 14 days',
    last30: 'Last 30 days',
    last90: 'Last 90 days',
    thisMonth: 'This month',
    lastMonth: 'Last month',
    yearToDate: 'Year to date',
  },
};

const PRESET_IDS: KiutDatePresetId[] = [
  'today',
  'yesterday',
  'last7',
  'last14',
  'last30',
  'last90',
  'thisMonth',
  'lastMonth',
  'yearToDate',
];

export function getWeekDays(locale: KiutDateLocale = 'en'): readonly string[] {
  return WEEKDAYS[locale];
}

export function getDatePresets(locale: KiutDateLocale = 'en'): KiutDatePreset[] {
  return PRESET_IDS.map((id) => ({ id, label: PRESET_LABELS[locale][id] }));
}

export function getPresetsSectionLabel(locale: KiutDateLocale = 'en'): string {
  return locale === 'es' ? 'Presets' : 'Presets';
}

/** Presets en español (retrocompatibilidad). */
export const KIUT_DATE_PRESETS: KiutDatePreset[] = getDatePresets('es');

export function parseISODate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${mo}-${day}`;
}

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, d.getDate());
}

export function addDays(d: Date, n: number): Date {
  const result = new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  return startOfDay(result);
}

export function subtractDays(d: Date, n: number): Date {
  return addDays(d, -n);
}

export function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

export function resolvePresetRange(
  id: KiutDatePresetId,
  ref: Date = new Date()
): { start: Date; end: Date } {
  const today = startOfDay(ref);

  switch (id) {
    case 'today':
      return { start: today, end: today };
    case 'yesterday': {
      const yesterday = subtractDays(today, 1);
      return { start: yesterday, end: yesterday };
    }
    case 'last7':
      return { start: subtractDays(today, 6), end: today };
    case 'last14':
      return { start: subtractDays(today, 13), end: today };
    case 'last30':
      return { start: subtractDays(today, 29), end: today };
    case 'last90':
      return { start: subtractDays(today, 89), end: today };
    case 'thisMonth':
      return { start: startOfMonth(today), end: today };
    case 'lastMonth': {
      const prevMonthStart = startOfMonth(addMonths(today, -1));
      return { start: prevMonthStart, end: endOfMonth(prevMonthStart) };
    }
    case 'yearToDate':
      return { start: new Date(today.getFullYear(), 0, 1), end: today };
  }
}

export function clampDateRange(
  range: { start: Date; end: Date },
  minDate?: string | null,
  maxDate?: string | null
): { start: Date; end: Date } {
  let start = startOfDay(range.start);
  let end = startOfDay(range.end);

  if (minDate) {
    const min = startOfDay(parseISODate(minDate));
    if (isBeforeDay(start, min)) start = min;
    if (isBeforeDay(end, min)) end = min;
  }
  if (maxDate) {
    const max = startOfDay(parseISODate(maxDate));
    if (isAfterDay(start, max)) start = max;
    if (isAfterDay(end, max)) end = max;
  }
  if (isAfterDay(start, end)) {
    return { start: end, end: start };
  }
  return { start, end };
}

export function rangesMatchPreset(
  range: KiutDateRange,
  id: KiutDatePresetId,
  ref: Date = new Date(),
  minDate?: string | null,
  maxDate?: string | null
): boolean {
  if (!range.start || !range.end) return false;
  const preset = clampDateRange(resolvePresetRange(id, ref), minDate, maxDate);
  return toISODate(preset.start) === range.start && toISODate(preset.end) === range.end;
}

export function compareDay(a: Date, b: Date): number {
  const ax = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const bx = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  if (ax < bx) return -1;
  if (ax > bx) return 1;
  return 0;
}

export function sameDay(a: Date, b: Date): boolean {
  return compareDay(a, b) === 0;
}

export function isBeforeDay(a: Date, b: Date): boolean {
  return compareDay(a, b) < 0;
}

export function isAfterDay(a: Date, b: Date): boolean {
  return compareDay(a, b) > 0;
}

export function isSameOrAfterDay(a: Date, b: Date): boolean {
  return compareDay(a, b) >= 0;
}

export function isSameOrBeforeDay(a: Date, b: Date): boolean {
  return compareDay(a, b) <= 0;
}

/** 42 celdas (6×7) desde el domingo de la semana que contiene el día 1 */
export function buildMonthCells(monthStart: Date): Date[] {
  const y = monthStart.getFullYear();
  const m = monthStart.getMonth();
  const first = new Date(y, m, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  const cells: Date[] = [];
  const cur = new Date(start);
  for (let i = 0; i < 42; i++) {
    cells.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return cells;
}

/** Ej. Mar 01 */
export function formatMonthDayLabel(d: Date, locale: KiutDateLocale = 'en'): string {
  return `${SHORT_MONTHS[locale][d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}`;
}

/** Ej. April 2026 */
export function formatMonthYearTitle(d: Date, locale: KiutDateLocale = 'en'): string {
  return `${LONG_MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`;
}
