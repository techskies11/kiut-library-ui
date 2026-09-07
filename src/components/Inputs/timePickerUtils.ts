/** Hora en 24 h solo con horas y minutos: `HH:mm`, o vacío. */
export type KiutTimeValue = string | null;

export function parseTimeHHmm(
  value: string | null | undefined,
): { hours: number; minutes: number } | null {
  if (!value?.trim()) return null;

  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }

  return { hours, minutes };
}

export function toTimeHHmm(hours: number, minutes: number): string {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function normalizeTimeHHmm(value: string): KiutTimeValue {
  const parsed = parseTimeHHmm(value);
  if (!parsed) return null;
  return toTimeHHmm(parsed.hours, parsed.minutes);
}

export function timeToMinutes(value: string): number {
  const parsed = parseTimeHHmm(value);
  if (!parsed) return 0;
  return parsed.hours * 60 + parsed.minutes;
}

export function isTimeBefore(a: string, b: string): boolean {
  return timeToMinutes(a) < timeToMinutes(b);
}

export function isTimeAfter(a: string, b: string): boolean {
  return timeToMinutes(a) > timeToMinutes(b);
}

export function buildHourOptions(): number[] {
  return Array.from({ length: 24 }, (_, i) => i);
}

export function buildMinuteOptions(step = 1): number[] {
  const safeStep = Math.max(1, Math.min(30, Math.floor(step)));
  const options: number[] = [];
  for (let m = 0; m < 60; m += safeStep) {
    options.push(m);
  }
  return options;
}

export function isHourDisabled(
  hour: number,
  minTime?: string | null,
  maxTime?: string | null,
): boolean {
  const earliest = toTimeHHmm(hour, 0);
  const latest = toTimeHHmm(hour, 59);

  if (minTime && isTimeBefore(latest, minTime)) return true;
  if (maxTime && isTimeAfter(earliest, maxTime)) return true;
  return false;
}

export function isMinuteDisabled(
  hour: number,
  minute: number,
  minTime?: string | null,
  maxTime?: string | null,
): boolean {
  const candidate = toTimeHHmm(hour, minute);
  if (minTime && isTimeBefore(candidate, minTime)) return true;
  if (maxTime && isTimeAfter(candidate, maxTime)) return true;
  return false;
}

export function clampTimeToBounds(
  hours: number,
  minutes: number,
  minTime?: string | null,
  maxTime?: string | null,
): { hours: number; minutes: number } {
  let candidate = toTimeHHmm(hours, minutes);

  if (minTime && isTimeBefore(candidate, minTime)) {
    const min = parseTimeHHmm(minTime);
    if (min) return min;
  }

  if (maxTime && isTimeAfter(candidate, maxTime)) {
    const max = parseTimeHHmm(maxTime);
    if (max) return max;
  }

  return { hours, minutes };
}

export function formatTimeDisplay(value: string | null | undefined): string {
  const parsed = parseTimeHHmm(value);
  if (!parsed) return '';
  return toTimeHHmm(parsed.hours, parsed.minutes);
}
