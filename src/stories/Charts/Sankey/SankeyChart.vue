<template>
  <div class="chart-container">
    <div
      v-if="loadError"
      class="error-state"
      :style="{ height }"
    >
      <div class="error-content">
        <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="error-title">Chart could not be loaded</p>
        <p class="error-description">Please check the data format.</p>
      </div>
    </div>
    <div v-else class="chart-wrapper" :style="{ height }">
      <div ref="chartEl" class="chart-content"></div>
      <div
        v-if="isLoading"
        class="loading-state loading-overlay"
      >
        <div class="loading-container">
          <div class="sankey-loader">
            <div class="flow flow-1"></div>
            <div class="flow flow-2"></div>
            <div class="flow flow-3"></div>
            <div class="flow flow-4"></div>
          </div>
          <p class="loading-text">Loading Sankey diagram...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, nextTick, toRef, computed } from 'vue';
import * as echarts from 'echarts/core';
import { TooltipComponent, TitleComponent } from 'echarts/components';
import { SankeyChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useThemeDetection, type Theme } from '../../../composables/useThemeDetection';
import { useBreakpoint, type Breakpoint } from '../../../composables/useBreakpoint';

echarts.use([TooltipComponent, TitleComponent, SankeyChart, CanvasRenderer]);

type SankeyNodeStatus = 'success' | 'abandon' | 'error';

interface SankeyNode {
  name: string;
  status?: SankeyNodeStatus;
  /** Valor del paso; si falta, se infiere de links entrantes/salientes */
  value?: number;
  /** Etiqueta ya formateada (string) o config ECharts por nodo (objeto, generado al procesar) */
  label?: string | Record<string, unknown>;
  displayLabel?: string;
  [key: string]: any;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
  label?: string;
  originalValue?: number;
  [key: string]: any;
}

interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

const props = withDefaults(defineProps<{
  data: SankeyData;
  title?: string;
  /**
   * Altura del chart (cualquier valor CSS válido).
   * Ej. `500px` o `clamp(360px, 70vh, 600px)` para altura fluida.
   */
  height?: string;
  nodeColors?: Record<string, string>;
  /** Conservado por compatibilidad; los enlaces usan opacidad por tema (claro: negro 20%, oscuro: blanco 10%). */
  useGradient?: boolean;
  nodeGap?: number;
  theme?: Theme;
}>(), {
  data: () => ({ nodes: [], links: [] }),
  title: '',
  height: '500px',
  nodeColors: () => ({}),
  useGradient: true,
  nodeGap: 20,
  theme: undefined
});

// Theme detection with prop fallback
const { isDark, colors } = useThemeDetection(toRef(props, 'theme'));

const { breakpoint } = useBreakpoint();

const chartEl = ref<HTMLElement | null>(null);
const isLoading = ref(true);
const loadError = ref(false);

let chartInstance: echarts.ECharts | null = null;
let containerObserver: ResizeObserver | null = null;

const CHART_CONFIG = {
  animation: { duration: 1000, easing: 'cubicOut' as const },
  margins: { left: '3%', right: '8%', top: '4%', bottom: '4%' },
  node: { width: 88, gap: 24, align: 'left' as const, iterations: 0 },
  style: {
    shadowBlur: 0,
    shadowColor: 'transparent',
  },
};

const LABEL_PADDING = 12;

/** Colores sólidos tipo dashboard BM (verde / naranja / rojo sobre fondo oscuro). */
const STATUS_COLORS: Record<SankeyNodeStatus, string> = {
  success: '#66BB6A',
  abandon: '#FFA726',
  error: '#EF5350',
};

const STATUS_PRIORITY: Record<SankeyNodeStatus, number> = {
  success: 0,
  abandon: 1,
  error: 2,
};

const ABANDON_PATTERN =
  /abandon|exit|lost|bounce|cancelled|no pending|not paid|not confirmed|not delivered/i;
const ERROR_PATTERN =
  /error|failed|unrecovered|not retreiv|bp error|not found|rejected|redirect to human|invalid|unprocessed|data quality|failed:/i;

/** Opciones de layout/labels según viewport (mobile: vertical, tablet: compacto, desktop: actual). */
const responsiveConfig = computed(() => {
  const bp: Breakpoint = breakpoint.value;
  if (bp === 'mobile') {
    return {
      orient: 'vertical' as const,
      nodeWidth: 18,
      nodeGap: 12,
      labelPosition: 'right' as const,
      labelFontSize: 10,
      edgeLabelShow: true,
      edgeLabelFontSize: 8,
      labelWrap: true as const,
      labelCharsPerLine: 10,
      labelLineHeight: 12,
      labelTextWidth: 200,
      labelDistance: 6,
      contentMargins: { left: 10, right: 10, top: 28, bottom: 20 },
    };
  }
  if (bp === 'tablet') {
    return {
      orient: 'horizontal' as const,
      nodeWidth: 72,
      nodeGap: 20,
      labelPosition: 'inside' as const,
      labelFontSize: 11,
      edgeLabelShow: true,
      edgeLabelFontSize: 10,
      labelWrap: true as const,
      labelCharsPerLine: 11,
      labelLineHeight: 14,
      labelTextWidth: 0,
      labelDistance: 0,
      contentMargins: { ...CHART_CONFIG.margins },
    };
  }
  return {
    orient: 'horizontal' as const,
    nodeWidth: CHART_CONFIG.node.width,
    nodeGap: props.nodeGap,
    labelPosition: 'inside' as const,
    labelFontSize: 11,
    edgeLabelShow: true,
    edgeLabelFontSize: 10,
    labelWrap: true as const,
    labelCharsPerLine: 12,
    labelLineHeight: 15,
    labelTextWidth: 0,
    labelDistance: 0,
    contentMargins: { ...CHART_CONFIG.margins },
  };
});

const prepareLabelText = (text: string): string => {
  const normalized = text.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  const failedMatch = normalized.match(/^Failed:\s*(.+)$/i);
  if (failedMatch) {
    return `Failed:\n${failedMatch[1].trim()}`;
  }
  return normalized;
};

const wrapSingleLine = (line: string, maxCharsPerLine: number): string => {
  const t = line.trim();
  if (!t || maxCharsPerLine < 1) return t;
  if (t.length <= maxCharsPerLine) return t;

  const lines: string[] = [];
  let i = 0;
  while (i < t.length) {
    const hardEnd = Math.min(i + maxCharsPerLine, t.length);
    if (hardEnd >= t.length) {
      const rest = t.slice(i).trim();
      if (rest) lines.push(rest);
      break;
    }
    const slice = t.slice(i, hardEnd);
    const lastSpace = slice.lastIndexOf(' ');
    if (lastSpace > 0) {
      lines.push(t.slice(i, i + lastSpace).trim());
      i += lastSpace;
      while (i < t.length && t[i] === ' ') i += 1;
    } else {
      lines.push(slice);
      i = hardEnd;
    }
  }
  return lines.join('\n');
};

/**
 * Salto de línea real (`\\n`) para etiquetas; sin "...".
 * Respeta saltos existentes y palabras; si no caben, recorta por longitud fija.
 */
const wrapLabelName = (name: string, maxCharsPerLine: number): string => {
  const trimmed = name.trim();
  if (!trimmed || maxCharsPerLine < 1) return name;

  return trimmed
    .split('\n')
    .map((segment) => wrapSingleLine(segment.trim(), maxCharsPerLine))
    .filter(Boolean)
    .join('\n');
};

interface LabelBox {
  lines: string[];
  width: number;
  height: number;
  nodeWidth: number;
}

const resolveNodeStatus = (node: SankeyNode): SankeyNodeStatus => {
  if (node.status) return node.status;
  if (ABANDON_PATTERN.test(node.name)) return 'abandon';
  if (ERROR_PATTERN.test(node.name)) return 'error';
  return 'success';
};

const getLinkValue = (link: SankeyLink): number => link.originalValue ?? link.value;

const computeOriginTotal = (nodes: SankeyNode[], links: SankeyLink[]): number => {
  const hasIncoming = new Set(links.map((link) => link.target));
  const roots = nodes.filter((node) => !hasIncoming.has(node.name));

  for (const root of roots) {
    if (typeof root.value === 'number' && root.value > 0) return root.value;
    const outgoing = links.filter((link) => link.source === root.name);
    if (outgoing.length > 0) {
      return outgoing.reduce((sum, link) => sum + getLinkValue(link), 0);
    }
  }

  return links.reduce((max, link) => Math.max(max, getLinkValue(link)), 0);
};

const getNodeStepValue = (
  nodeName: string,
  links: SankeyLink[],
  node?: SankeyNode,
): number => {
  if (node && typeof node.value === 'number') return node.value;
  const incoming = links.filter((link) => link.target === nodeName);
  if (incoming.length > 0) {
    return incoming.reduce((sum, link) => sum + getLinkValue(link), 0);
  }
  const outgoing = links.filter((link) => link.source === nodeName);
  return outgoing.reduce((sum, link) => sum + getLinkValue(link), 0);
};

const computeNodeDepths = (nodes: SankeyNode[], links: SankeyLink[]): Map<string, number> => {
  const depths = new Map<string, number>();
  const hasIncoming = new Set(links.map((link) => link.target));
  const queue: { name: string; depth: number }[] = nodes
    .filter((node) => !hasIncoming.has(node.name))
    .map((node) => ({ name: node.name, depth: 0 }));

  while (queue.length > 0) {
    const { name, depth } = queue.shift()!;
    const existing = depths.get(name);
    if (existing !== undefined && existing >= depth) continue;
    depths.set(name, depth);

    for (const link of links) {
      if (link.source === name) {
        queue.push({ name: link.target, depth: depth + 1 });
      }
    }
  }

  for (const node of nodes) {
    if (!depths.has(node.name)) depths.set(node.name, 0);
  }

  return depths;
};

/** Camino principal success: raíz → mayor flujo success en cada paso. */
const computeMainSuccessPathOrder = (
  nodes: SankeyNode[],
  links: SankeyLink[],
): Map<string, number> => {
  const order = new Map<string, number>();
  const hasIncoming = new Set(links.map((link) => link.target));
  const roots = nodes.filter((node) => !hasIncoming.has(node.name));

  let index = 0;
  const visit = (start: string) => {
    let current: string | undefined = start;
    while (current && !order.has(current)) {
      order.set(current, index);
      index += 1;

      const successLinks = links
        .filter(
          (link) =>
            link.source === current &&
            resolveNodeStatus({ name: link.target } as SankeyNode) === 'success',
        )
        .sort((a, b) => getLinkValue(b) - getLinkValue(a));

      current = successLinks[0]?.target;
    }
  };

  roots.forEach((root) => visit(root.name));
  return order;
};

const getNodeLayoutRank = (
  node: SankeyNode,
  links: SankeyLink[],
  mainPathOrder: Map<string, number>,
): number => {
  const status = resolveNodeStatus(node);

  if (status === 'success' && mainPathOrder.has(node.name)) {
    return mainPathOrder.get(node.name)!;
  }

  if (status === 'success') {
    const incoming = links.filter((link) => link.target === node.name);
    const parentRank = incoming.length
      ? Math.min(
          ...incoming.map((link) =>
            mainPathOrder.has(link.source)
              ? (mainPathOrder.get(link.source) ?? 0) + 0.01
              : 500,
          ),
        )
      : 500;
    return 200 + parentRank;
  }

  if (status === 'abandon') return 1000;
  return 2000;
};

const prepareSankeyLayout = (nodes: SankeyNode[], links: SankeyLink[]): SankeyNode[] => {
  const depths = computeNodeDepths(nodes, links);
  const mainPathOrder = computeMainSuccessPathOrder(nodes, links);

  return [...nodes].sort((a, b) => {
    const depthA = depths.get(a.name) ?? 0;
    const depthB = depths.get(b.name) ?? 0;
    if (depthA !== depthB) return depthA - depthB;

    const prioA = STATUS_PRIORITY[resolveNodeStatus(a)];
    const prioB = STATUS_PRIORITY[resolveNodeStatus(b)];
    if (prioA !== prioB) return prioA - prioB;

    const rankA = getNodeLayoutRank(a, links, mainPathOrder);
    const rankB = getNodeLayoutRank(b, links, mainPathOrder);
    if (rankA !== rankB) return rankA - rankB;

    return a.name.localeCompare(b.name);
  });
};

const measureLabelBox = (
  text: string,
  fontSize: number,
  lineHeight: number,
  maxCharsPerLine: number,
): LabelBox => {
  const wrapped = wrapLabelName(text, maxCharsPerLine);
  const lines = wrapped.split('\n');
  const charWidth = fontSize * 0.58;
  const maxLineChars = Math.max(...lines.map((line) => line.length), 1);
  const width = maxLineChars * charWidth;
  const height = lines.length * lineHeight;

  return {
    lines,
    width,
    height,
    nodeWidth: width + LABEL_PADDING * 2,
  };
};

const formatPercentage = (value: number, total: number): string => {
  if (!total) return '0.0%';
  return `${((value / total) * 100).toFixed(1)}%`;
};

const buildNodeDisplayLabel = (
  node: SankeyNode,
  status: SankeyNodeStatus,
  originTotal: number,
  links: SankeyLink[],
  maxCharsPerLine: number,
): string => {
  if (typeof node.label === 'string' && node.label) {
    return wrapLabelName(prepareLabelText(node.label), maxCharsPerLine);
  }

  const wrappedName = wrapLabelName(prepareLabelText(node.name), maxCharsPerLine);
  if (status === 'success' && originTotal > 0) {
    const stepValue = getNodeStepValue(node.name, links, node);
    const pct = formatPercentage(stepValue, originTotal);
    return `${wrappedName}\n(${pct})`;
  }

  return wrappedName;
};

interface ProcessedSankeyData {
  nodes: SankeyNode[];
  maxNodeWidth: number;
  contentMargins: Record<string, number | string>;
  originTotal: number;
}

const parseChartHeightPx = (height: string, elementHeight = 0): number => {
  if (elementHeight > 0) return elementHeight;
  const pxMatch = height.match(/^(\d+(?:\.\d+)?)px$/);
  if (pxMatch) return Number(pxMatch[1]);
  const vhMatch = height.match(/^(\d+(?:\.\d+)?)vh$/);
  if (vhMatch && typeof window !== 'undefined') {
    return (Number(vhMatch[1]) / 100) * window.innerHeight;
  }
  return 500;
};

/**
 * ECharts calcula la altura del nodo según el valor del flujo.
 * Aumentamos `value` (conservando `originalValue`) para garantizar altura mínima legible.
 */
const applyMinNodeHeights = (
  links: SankeyLink[],
  processedNodes: SankeyNode[],
  cfg: {
    labelFontSize: number;
    labelLineHeight: number;
    labelCharsPerLine: number;
    nodeGap: number;
  },
  chartHeightPx: number,
  originTotal: number,
): SankeyLink[] => {
  if (!processedNodes.length || !links.length || originTotal <= 0) return links;

  const adjusted = links.map((link) => ({ ...link }));
  const lineHeight = cfg.labelLineHeight || Math.round(cfg.labelFontSize * 1.25);
  const maxCharsPerLine = Math.max(4, cfg.labelCharsPerLine);
  const usableHeight = Math.max(chartHeightPx * 0.88, 260);
  const depths = computeNodeDepths(processedNodes, adjusted);

  const nodesPerDepth = new Map<number, number>();
  processedNodes.forEach((node) => {
    const depth = depths.get(node.name) ?? 0;
    nodesPerDepth.set(depth, (nodesPerDepth.get(depth) ?? 0) + 1);
  });

  const getMinValue = (nodeName: string): number => {
    const node = processedNodes.find((item) => item.name === nodeName);
    const label = node?.displayLabel || nodeName;
    const box = measureLabelBox(label, cfg.labelFontSize, lineHeight, maxCharsPerLine);
    const minPx = box.height + LABEL_PADDING * 2;
    const depth = depths.get(nodeName) ?? 0;
    const columnCount = nodesPerDepth.get(depth) ?? 1;
    const gapPerNode = ((Math.max(columnCount, 1) - 1) * cfg.nodeGap) / Math.max(columnCount, 1);
    const effectiveHeight = Math.max(usableHeight - gapPerNode, minPx);
    return Math.max(1, (minPx / effectiveHeight) * originTotal);
  };

  const getNodeFlow = (nodeName: string): number => {
    const incoming = adjusted.filter((link) => link.target === nodeName);
    if (incoming.length > 0) {
      return incoming.reduce((sum, link) => sum + link.value, 0);
    }
    return adjusted
      .filter((link) => link.source === nodeName)
      .reduce((sum, link) => sum + link.value, 0);
  };

  for (let pass = 0; pass < 16; pass += 1) {
    let changed = false;
    for (const node of processedNodes) {
      const minVal = getMinValue(node.name);
      const current = getNodeFlow(node.name);
      if (current >= minVal) continue;

      const incoming = adjusted.filter((link) => link.target === node.name);
      const outgoing = adjusted.filter((link) => link.source === node.name);
      const linksToScale = incoming.length > 0 ? incoming : outgoing;
      if (linksToScale.length === 0) continue;

      const factor = minVal / Math.max(current, 1e-6);
      linksToScale.forEach((link) => {
        link.value *= factor;
      });
      changed = true;
    }
    if (!changed) break;
  }

  return adjusted;
};

const processSankeyData = (
  nodes: SankeyNode[],
  links: SankeyLink[],
  cfg: {
    orient: 'horizontal' | 'vertical';
    labelFontSize: number;
    labelLineHeight: number;
    labelCharsPerLine: number;
    labelDistance: number;
    nodeWidth: number;
    contentMargins: Record<string, number | string>;
  },
): ProcessedSankeyData => {
  const originTotal = computeOriginTotal(nodes, links);
  const sortedNodes = prepareSankeyLayout(nodes, links);
  const lineHeight = cfg.labelLineHeight || Math.round(cfg.labelFontSize * 1.25);
  const maxCharsPerLine = Math.max(4, cfg.labelCharsPerLine);

  let maxNodeWidth = cfg.nodeWidth;
  const displayLabels: string[] = [];

  const processedNodes = sortedNodes.map((node, index) => {
    const status = resolveNodeStatus(node);
    const displayLabel = buildNodeDisplayLabel(
      node,
      status,
      originTotal,
      links,
      maxCharsPerLine,
    );
    displayLabels.push(displayLabel);

    const box = measureLabelBox(displayLabel, cfg.labelFontSize, lineHeight, maxCharsPerLine);
    if (cfg.orient === 'vertical') {
      maxNodeWidth = Math.max(maxNodeWidth, box.height + LABEL_PADDING * 2);
    } else {
      maxNodeWidth = Math.max(maxNodeWidth, box.nodeWidth);
    }

    const color =
      props.nodeColors[node.name] ||
      STATUS_COLORS[status] ||
      DEFAULT_COLORS[index % DEFAULT_COLORS.length];

    const labelWidth = Math.max(Math.ceil(box.nodeWidth - LABEL_PADDING * 2), 48);

    return {
      ...node,
      displayLabel,
      label: {
        width: labelWidth,
        overflow: 'none' as const,
        lineHeight,
        fontSize: cfg.labelFontSize,
      },
      itemStyle: {
        color,
        borderRadius: 4,
        borderWidth: 0,
        shadowBlur: 0,
        shadowColor: 'transparent',
      },
    };
  });

  let contentMargins = { ...cfg.contentMargins };
  if (cfg.orient === 'vertical') {
    const maxLabelWidth = Math.max(
      ...displayLabels.map((label) =>
        measureLabelBox(label, cfg.labelFontSize, lineHeight, maxCharsPerLine).width,
      ),
      0,
    );
    const baseRight =
      typeof contentMargins.right === 'number' ? contentMargins.right : 10;
    contentMargins = {
      ...contentMargins,
      right: Math.max(baseRight, maxLabelWidth + LABEL_PADDING + cfg.labelDistance),
    };
  }

  return { nodes: processedNodes, maxNodeWidth, contentMargins, originTotal };
};

// Default purple colors from design system
const DEFAULT_COLORS = [
  '#C67DFF', // Primary light
  '#8b5cf6', // Primary medium
  '#a855f7', // Bright purple
  '#7c3aed', // Vibrant purple
  '#5d4b93', // Primary dark
  '#9333ea', // Deep purple
];

const validateData = () => {
  const validLinks = props.data.links.filter(
    link => link.source && link.target && typeof link.value === 'number'
  );

  const maxValue = Math.max(...validLinks.map(link => link.value), 1);
  const minThickness = Math.max(1, maxValue * 0.01);

  const linksWithMinThickness = validLinks.map(link => ({
    ...link,
    originalValue: link.value,
    value: link.value < maxValue * 0.01 ? minThickness : link.value,
  }));

  return {
    nodes: props.data.nodes.filter(node => node.name),
    links: linksWithMinThickness,
  };
};

const createTooltipFormatter = (validLinks: SankeyLink[]) => (params: any) => {
  const isNode = params.dataType === 'node';
  const tooltipTextColor = colors.value.tooltipText;
  const tooltipSecondaryColor = isDark.value ? '#d1d5db' : '#e2e8f0';

  if (isNode) {
    const incomingLinks = validLinks.filter(link => link.target === params.name);
    const outgoingLinks = validLinks.filter(link => link.source === params.name);

    const actualValue =
      incomingLinks.length > 0
        ? incomingLinks.reduce((sum, link) => sum + (link.originalValue || link.value), 0)
        : outgoingLinks.reduce((sum, link) => sum + (link.originalValue || link.value), 0);

    return `<div style="font-weight: 600; margin-bottom: 4px; color: ${tooltipTextColor};">${params.name}</div><div style="color: ${tooltipSecondaryColor}; font-size: 12px;">Count: ${actualValue.toLocaleString()}</div>`;
  }

  const sourceName = params.data?.source || params.source || 'Unknown';
  const targetName = params.data?.target || params.target || 'Unknown';
  const originalValue = params.data?.originalValue || params.data?.value || params.value || 0;
  const label = params.data?.label || `${originalValue.toLocaleString()}`;
  
  return `<div style="font-weight: 600; margin-bottom: 4px; color: ${tooltipTextColor};">${sourceName} → ${targetName}</div><div style="color: ${tooltipSecondaryColor}; font-size: 12px;">Flow: ${label}</div>`;
};

const setOptions = () => {
  if (!chartInstance || !props.data.nodes?.length || !props.data.links?.length) return;

  const cfg = responsiveConfig.value;
  /** Flujos entre nodos: cintas grises semitransparentes sobre fondo oscuro/claro. */
  const linkColor = isDark.value ? 'rgba(110, 110, 120, 0.35)' : 'rgba(148, 163, 184, 0.45)';
  const linkColorEmphasis = isDark.value ? 'rgba(130, 130, 140, 0.5)' : 'rgba(100, 116, 139, 0.55)';
  const edgeLabelColor = isDark.value ? 'rgba(203, 213, 225, 0.92)' : '#64748b';
  const nodeLabelColor =
    cfg.labelPosition === 'inside'
      ? '#ffffff'
      : isDark.value
        ? colors.value.textPrimary
        : '#334155';

  try {
    const { nodes: validNodes, links: validLinks } = validateData();
    const { nodes: processedNodes, maxNodeWidth, contentMargins, originTotal } = processSankeyData(
      validNodes,
      validLinks,
      cfg,
    );
    const chartHeightPx = parseChartHeightPx(props.height, chartEl.value?.clientHeight ?? 0);
    const layoutLinks = applyMinNodeHeights(
      validLinks,
      processedNodes,
      {
        labelFontSize: cfg.labelFontSize,
        labelLineHeight: cfg.labelLineHeight || Math.round(cfg.labelFontSize * 1.25),
        labelCharsPerLine: cfg.labelCharsPerLine,
        nodeGap: cfg.nodeGap,
      },
      chartHeightPx,
      originTotal,
    );

    const chartOptions = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove|click',
        confine: true,
        formatter: createTooltipFormatter(layoutLinks),
        backgroundColor: colors.value.tooltipBg,
        borderColor: isDark.value ? 'rgba(198, 125, 255, 0.2)' : 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        borderRadius: 8,
        padding: [10, 14],
        textStyle: {
          color: colors.value.tooltipText,
          fontSize: 13,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
        },
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
      },
      series: [
        {
          type: 'sankey',
          data: processedNodes,
          links: layoutLinks,
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              color: linkColorEmphasis,
              opacity: 1,
            },
          },
          lineStyle: {
            color: linkColor,
            curveness: 0.5,
            opacity: 1,
          },
          itemStyle: {
            ...CHART_CONFIG.style,
            borderWidth: 0,
          },
          label: {
            show: true,
            position: cfg.labelPosition,
            color: nodeLabelColor,
            fontWeight: 700,
            fontSize: cfg.labelFontSize,
            lineHeight: cfg.labelLineHeight || Math.round(cfg.labelFontSize * 1.25),
            padding: LABEL_PADDING,
            align: 'center',
            verticalAlign: 'middle',
            overflow: 'none' as const,
            ...(cfg.orient === 'horizontal'
              ? { width: Math.max(maxNodeWidth - LABEL_PADDING * 2, 48), overflow: 'none' as const }
              : cfg.labelWrap && cfg.labelTextWidth > 0
                ? { width: cfg.labelTextWidth, overflow: 'none' as const }
                : {}),
            ...(cfg.labelDistance > 0 ? { distance: cfg.labelDistance } : {}),
            fontFamily: "'Inter', 'DM Sans', sans-serif",
            formatter: (params: any) => params.data?.displayLabel || params.name || '',
          },
          edgeLabel: cfg.edgeLabelShow
            ? {
                show: true,
                fontSize: cfg.edgeLabelFontSize,
                color: edgeLabelColor,
                fontWeight: 500,
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                formatter: (params: any) => {
                  if (params.data?.label) return params.data.label;
                  const originalValue = params.data?.originalValue ?? params.value ?? 0;
                  const sourceName = params.data?.source ?? params.source;
                  const sourceTotal = layoutLinks
                    .filter((link) => link.source === sourceName)
                    .reduce((sum, link) => sum + getLinkValue(link), 0);
                  const pct = formatPercentage(originalValue, sourceTotal);
                  return `${Number(originalValue).toLocaleString()} (${pct})`;
                },
              }
            : { show: false },
          nodeAlign: CHART_CONFIG.node.align,
          nodeGap: cfg.nodeGap,
          nodeWidth: maxNodeWidth,
          layoutIterations: CHART_CONFIG.node.iterations,
          orient: cfg.orient,
          draggable: false,
          ...contentMargins,
        },
      ],
      backgroundColor: 'transparent',
      animation: true,
      animationDuration: CHART_CONFIG.animation.duration,
      animationEasing: CHART_CONFIG.animation.easing,
    };

    chartInstance.setOption(chartOptions);
    chartInstance.resize();
  } catch (error) {
    console.error('Error setting Sankey chart options:', error);
    loadError.value = true;
  }
};

const initChart = async () => {
  if (!chartEl.value) return;

  try {
    chartInstance = echarts.init(chartEl.value);
    setOptions();
    window.addEventListener('resize', handleResize);
  } catch (error) {
    console.error('Error initializing Sankey chart:', error);
    loadError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const hasContainerSize = () => {
  const el = chartEl.value;
  return Boolean(el && el.clientWidth > 0 && el.clientHeight > 0);
};

const waitForContainerAndInit = async () => {
  await nextTick();
  if (hasContainerSize()) return initChart();

  await new Promise<void>((resolve) => {
    const el = chartEl.value;
    if (!el) {
      resolve();
      return;
    }

    containerObserver = new ResizeObserver(() => {
      if (!hasContainerSize()) return;
      containerObserver?.disconnect();
      containerObserver = null;
      initChart().then(resolve);
    });

    containerObserver.observe(el);
  });
};

const handleResize = () => chartInstance?.resize();

const cleanup = () => {
  window.removeEventListener('resize', handleResize);
  containerObserver?.disconnect();
  containerObserver = null;
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
};

onMounted(() => waitForContainerAndInit());
onBeforeUnmount(cleanup);
watch(() => props.data, setOptions, { deep: true });
watch(isDark, setOptions); // Re-render when theme changes
watch(breakpoint, setOptions); // Re-render when viewport category changes

// Expose isDark for potential use in templates
defineExpose({ isDark });
</script>

<style scoped>
.chart-container {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
  overflow: hidden;
  background-color: transparent;
}

.chart-wrapper {
  position: relative;
  width: 100%;
  background-color: transparent;
}

.chart-content {
  width: 100%;
  height: 100%;
  background-color: transparent;
}

/* Móvil: evita que el padre recorte sombras o bordes; el clip del canvas lo hace ECharts */
@media (max-width: 639px) {
  .chart-container {
    overflow: visible;
  }
}

.chart-content {
  animation: fadeIn 0.5s ease-out;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
}

/* Error State */
.error-state {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.error-content {
  text-align: center;
  max-width: 320px;
}

.error-icon {
  width: 48px;
  height: 48px;
  color: var(--kiut-danger);
  margin: 0 auto 16px;
}

.error-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--kiut-text-primary);
  margin: 0 0 8px 0;
}

.error-description {
  font-size: 14px;
  font-weight: 400;
  color: var(--kiut-text-secondary);
  margin: 0;
}

/* Loading State */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.sankey-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 80px;
  margin-bottom: 24px;
}

.flow {
  width: 60px;
  height: 4px;
  background: linear-gradient(to right, var(--kiut-primary-light), var(--kiut-primary), var(--kiut-primary-default));
  border-radius: 2px;
  animation: flowAnimation 2s ease-in-out infinite;
  position: relative;
}

.flow::after {
  content: '';
  position: absolute;
  top: -6px;
  left: 0;
  width: 100%;
  height: 16px;
  background: linear-gradient(to right, 
    transparent 0%, 
    rgba(198, 125, 255, 0.3) 50%, 
    transparent 100%
  );
  border-radius: 8px;
  animation: flowGlow 2s ease-in-out infinite;
}

.flow-1 {
  transform: translateY(-20px);
  animation-delay: 0s;
}

.flow-2 {
  transform: translateY(-10px);
  animation-delay: 0.2s;
}

.flow-3 {
  transform: translateY(0px);
  animation-delay: 0.4s;
}

.flow-4 {
  transform: translateY(10px);
  animation-delay: 0.6s;
}

.loading-text {
  font-size: 15px;
  font-weight: 500;
  color: var(--kiut-text-secondary);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  letter-spacing: -0.01em;
}

/* Animations */
@keyframes flowAnimation {
  0%, 100% {
    opacity: 0.5;
    transform: translateY(0) scaleX(1);
  }
  50% {
    opacity: 1;
    transform: translateY(-2px) scaleX(1.05);
  }
}

@keyframes flowGlow {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .sankey-loader {
    gap: 6px;
    height: 60px;
  }

  .flow {
    width: 50px;
  }
}
</style>
