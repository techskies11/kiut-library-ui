/** Utilidades de calendario sin dependencias (compatible con Vite/Storybook). */

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

const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const LONG_MONTHS = [
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
];

/** Ej. Mar 01 */
export function formatMonthDayLabel(d: Date): string {
  return `${SHORT_MONTHS[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}`;
}

/** Ej. April 2026 */
export function formatMonthYearTitle(d: Date): string {
  return `${LONG_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}
