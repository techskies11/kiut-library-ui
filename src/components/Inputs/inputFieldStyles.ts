/**
 * Clases base compartidas para controles tipo input (texto, número, trigger de Select).
 * Convenciones Kiut: Tailwind + tokens CSS (--kiut-*).
 */

export const kiutLabelClass =
  'ku:mb-1.5 ku:block ku:text-sm ku:font-medium ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100';

/** Caja de control (input / trigger) */
export const kiutInputControlClass =
  'ku:min-h-[2.75rem] ku:w-full ku:rounded-xl ku:border ku:border-gray-300 ku:bg-white ku:px-3 ku:py-2 ku:text-sm ku:font-sans ku:text-[color:var(--kiut-text-primary)] ku:shadow-sm ku:outline-none ku:transition ku:placeholder:text-[color:var(--kiut-text-muted)] ku:focus:border-[color:var(--kiut-primary)] ku:focus:ring-2 ku:focus:ring-[color:var(--kiut-primary)]/25 ku:focus:ring-offset-0 ku:disabled:cursor-not-allowed ku:disabled:opacity-50 ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-[color:var(--kiut-bg-secondary)] ku:dark:text-slate-100 ku:dark:placeholder:text-slate-500';

/** Caja de control multilínea (textarea): mismo chrome que input, altura mínima y resize vertical. */
export const kiutTextareaControlClass =
  'ku:min-h-[5.5rem] ku:w-full ku:resize-y ku:rounded-xl ku:border ku:border-gray-300 ku:bg-white ku:px-3 ku:py-2 ku:text-sm ku:font-sans ku:leading-normal ku:text-[color:var(--kiut-text-primary)] ku:shadow-sm ku:outline-none ku:transition ku:placeholder:text-[color:var(--kiut-text-muted)] ku:focus:border-[color:var(--kiut-primary)] ku:focus:ring-2 ku:focus:ring-[color:var(--kiut-primary)]/25 ku:focus:ring-offset-0 ku:disabled:cursor-not-allowed ku:disabled:opacity-50 ku:dark:border-[color:var(--kiut-border-light)] ku:dark:bg-[color:var(--kiut-bg-secondary)] ku:dark:text-slate-100 ku:dark:placeholder:text-slate-500';

export const kiutInputControlInvalidClass =
  'ku:border-red-500 ku:focus:border-red-500 ku:focus:ring-red-500/25 ku:dark:border-red-400';

export const kiutFieldErrorTextClass =
  'ku:mt-1 ku:text-xs ku:font-medium ku:text-red-600 ku:dark:text-red-400';
