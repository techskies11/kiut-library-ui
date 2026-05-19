/** Stack tipográfico Kiut para texto dibujado en canvas (Chart.js). */
export const CHART_INTER_FONT_FAMILY =
  "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const TOOLTIP_FONT_KEYS = ['titleFont', 'bodyFont', 'footerFont'] as const;

/** Fuerza Inter en ejes, leyenda y tooltips aunque el consumidor pase otra familia en `options`. */
export function applyInterFontToChartOptions(
  options: Record<string, unknown>,
  family: string = CHART_INTER_FONT_FAMILY,
): Record<string, unknown> {
  if (!options || typeof options !== 'object') return options;

  const out: Record<string, unknown> = { ...options };
  const baseFont =
    typeof out.font === 'object' && out.font !== null ? (out.font as Record<string, unknown>) : {};
  out.font = { ...baseFont, family };

  if (out.scales && typeof out.scales === 'object') {
    const scales = { ...(out.scales as Record<string, unknown>) };
    for (const key of Object.keys(scales)) {
      const scale = scales[key];
      if (!scale || typeof scale !== 'object') continue;
      const scaleCopy = { ...(scale as Record<string, unknown>) };
      const ticks = scaleCopy.ticks;
      if (ticks && typeof ticks === 'object') {
        const ticksCopy = { ...(ticks as Record<string, unknown>) };
        const tickFont =
          typeof ticksCopy.font === 'object' && ticksCopy.font !== null
            ? (ticksCopy.font as Record<string, unknown>)
            : {};
        ticksCopy.font = { ...tickFont, family };
        scaleCopy.ticks = ticksCopy;
      }
      const title = scaleCopy.title;
      if (title && typeof title === 'object') {
        const titleCopy = { ...(title as Record<string, unknown>) };
        const titleFont =
          typeof titleCopy.font === 'object' && titleCopy.font !== null
            ? (titleCopy.font as Record<string, unknown>)
            : {};
        titleCopy.font = { ...titleFont, family };
        scaleCopy.title = titleCopy;
      }
      scales[key] = scaleCopy;
    }
    out.scales = scales;
  }

  if (out.plugins && typeof out.plugins === 'object') {
    const plugins = { ...(out.plugins as Record<string, unknown>) };
    const legend = plugins.legend;
    if (legend && typeof legend === 'object') {
      const legendCopy = { ...(legend as Record<string, unknown>) };
      const labels = legendCopy.labels;
      if (labels && typeof labels === 'object') {
        const labelsCopy = { ...(labels as Record<string, unknown>) };
        const labelFont =
          typeof labelsCopy.font === 'object' && labelsCopy.font !== null
            ? (labelsCopy.font as Record<string, unknown>)
            : {};
        labelsCopy.font = { ...labelFont, family };
        legendCopy.labels = labelsCopy;
      }
      plugins.legend = legendCopy;
    }
    const tooltip = plugins.tooltip;
    if (tooltip && typeof tooltip === 'object') {
      const tooltipCopy = { ...(tooltip as Record<string, unknown>) };
      for (const fontKey of TOOLTIP_FONT_KEYS) {
        const font = tooltipCopy[fontKey];
        if (font && typeof font === 'object') {
          tooltipCopy[fontKey] = { ...(font as Record<string, unknown>), family };
        }
      }
      plugins.tooltip = tooltipCopy;
    }
    out.plugins = plugins;
  }

  return out;
}
