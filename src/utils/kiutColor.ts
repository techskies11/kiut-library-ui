/** Resolved CSS color for canvas/chart libraries, which do not read `var()`. */
export function kiutColor(variable: string, fallback: string): string {
  if (typeof document === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim()
  return value || fallback
}
