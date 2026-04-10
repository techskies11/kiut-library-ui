/**
 * Clases base compartidas para controles tipo input (texto, número, trigger de Select).
 * Convenciones Kiut: Tailwind + tokens CSS (--kiut-*).
 */

export const kiutLabelClass =
  'mb-1.5 block text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100';

/** Caja de control (input / trigger) */
export const kiutInputControlClass =
  'min-h-[2.75rem] w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-sans text-[color:var(--kiut-text-primary)] shadow-sm outline-none transition placeholder:text-[color:var(--kiut-text-muted)] focus:border-[color:var(--kiut-primary)] focus:ring-2 focus:ring-[color:var(--kiut-primary)]/25 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[color:var(--kiut-border-light)] dark:bg-[color:var(--kiut-bg-secondary)] dark:text-slate-100 dark:placeholder:text-slate-500';

export const kiutInputControlInvalidClass =
  'border-red-500 focus:border-red-500 focus:ring-red-500/25 dark:border-red-400';

export const kiutFieldErrorTextClass =
  'mt-1 text-xs font-medium text-red-600 dark:text-red-400';
