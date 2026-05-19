/** Máximo de marcas en eje Y (linear), incluye el origen con `beginAtZero`. */
export const CHART_Y_MAX_TICKS = 5

/** Máximo de marcas visibles en eje X (categorías), tras autoSkip. */
export const CHART_X_MAX_TICKS = 8

const X_KEYS = /^x\d*$/

const Y_KEYS = /^y\d*$/

/** Fuerza límites de ticks tras `deepMerge`; el consumidor no puede anularlos vía props.options. */
export function applyChartAxisTickLimits(
  options: Record<string, unknown>,
): Record<string, unknown> {
  if (!options || typeof options !== 'object') return options

  const out: Record<string, unknown> = { ...options }

  const scalesRaw = out.scales
  if (!scalesRaw || typeof scalesRaw !== 'object') return out

  const scales = { ...(scalesRaw as Record<string, unknown>) }

  for (const key of Object.keys(scales)) {
    const scale = scales[key]
    if (!scale || typeof scale !== 'object') continue
    const scaleCopy = { ...(scale as Record<string, unknown>) }
    const ticks = scaleCopy.ticks
    const ticksCopy =
      ticks && typeof ticks === 'object' ? { ...(ticks as Record<string, unknown>) } : {}

    if (X_KEYS.test(key)) {
      ticksCopy.maxTicksLimit = CHART_X_MAX_TICKS
      ticksCopy.autoSkip = true
      ticksCopy.minRotation = 0
      ticksCopy.maxRotation = 0
      ticksCopy.autoSkipPadding = ticksCopy.autoSkipPadding ?? 8
    }

    if (Y_KEYS.test(key)) {
      ticksCopy.maxTicksLimit = CHART_Y_MAX_TICKS
    }

    scaleCopy.ticks = ticksCopy
    scales[key] = scaleCopy
  }

  out.scales = scales
  return out
}
