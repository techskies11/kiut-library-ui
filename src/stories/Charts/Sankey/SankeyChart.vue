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
    <div v-else class="chart-wrapper">
      <div v-show="!isLoading" ref="chartEl" class="chart-content" :style="{ height }"></div>
      <div
        v-show="isLoading"
        class="loading-state"
        :style="{ height }"
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
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue';
import * as echarts from 'echarts/core';
import { TooltipComponent, TitleComponent } from 'echarts/components';
import { SankeyChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, TitleComponent, SankeyChart, CanvasRenderer]);

interface SankeyNode {
  name: string;
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
  height?: string;
  nodeColors?: Record<string, string>;
  useGradient?: boolean;
  nodeGap?: number;
}>(), {
  data: () => ({ nodes: [], links: [] }),
  title: '',
  height: '500px',
  nodeColors: () => ({}),
  useGradient: true,
  nodeGap: 20,
});

const chartEl = ref<HTMLElement | null>(null);
const isLoading = ref(true);
const loadError = ref(false);

let chartInstance: echarts.ECharts | null = null;

const CHART_CONFIG = {
  animation: { duration: 1000, easing: 'cubicOut' as const },
  margins: { left: '2%', right: '2%', top: '2%', bottom: '2%' },
  node: { width: 70, gap: 20, align: 'left' as const, iterations: 64 },
  style: {
    shadowBlur: 4,
    shadowColor: 'rgba(139, 92, 246, 0.15)',
  },
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

const createNodesWithColors = (nodes: SankeyNode[]) =>
  nodes.map((node, index) => ({
    ...node,
    itemStyle: {
      color: props.nodeColors[node.name] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      borderRadius: 8,
    },
  }));

const createTooltipFormatter = (validLinks: SankeyLink[]) => (params: any) => {
  const isNode = params.dataType === 'node';

  if (isNode) {
    const incomingLinks = validLinks.filter(link => link.target === params.name);
    const outgoingLinks = validLinks.filter(link => link.source === params.name);

    const actualValue =
      incomingLinks.length > 0
        ? incomingLinks.reduce((sum, link) => sum + (link.originalValue || link.value), 0)
        : outgoingLinks.reduce((sum, link) => sum + (link.originalValue || link.value), 0);

    return `<div style="font-weight: 600; margin-bottom: 4px; color: #f1f5f9;">${params.name}</div><div style="color: #e2e8f0; font-size: 12px;">Count: ${actualValue.toLocaleString()}</div>`;
  }

  const sourceName = params.data?.source || params.source || 'Unknown';
  const targetName = params.data?.target || params.target || 'Unknown';
  const originalValue = params.data?.originalValue || params.data?.value || params.value || 0;
  const label = params.data?.label || `${originalValue.toLocaleString()}`;
  
  return `<div style="font-weight: 600; margin-bottom: 4px; color: #f1f5f9;">${sourceName} → ${targetName}</div><div style="color: #e2e8f0; font-size: 12px;">Flow: ${label}</div>`;
};

const setOptions = () => {
  if (!chartInstance || !props.data.nodes?.length || !props.data.links?.length) return;

  try {
    const { nodes: validNodes, links: validLinks } = validateData();
    const nodesWithColors = createNodesWithColors(validNodes);

    const chartOptions = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: createTooltipFormatter(validLinks),
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        borderColor: 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        borderRadius: 8,
        padding: [10, 14],
        textStyle: {
          color: '#f1f5f9',
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
          data: nodesWithColors,
          links: validLinks,
          emphasis: { focus: 'adjacency' },
          levels: [
            {
              depth: 0,
              itemStyle: { 
                color: '#8b5cf6',
                borderRadius: 8,
              },
              lineStyle: { color: 'source', opacity: 0.5 },
            },
            {
              depth: 1,
              itemStyle: { 
                color: '#8b5cf6',
                borderRadius: 8,
              },
              lineStyle: { color: 'source', opacity: 0.5 },
            },
          ],
          lineStyle: {
            color: props.useGradient ? 'gradient' : 'source',
            curveness: 0.5,
            opacity: 0.6,
          },
          itemStyle: CHART_CONFIG.style,
          label: {
            show: true,
            position: 'inside',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: 12,
            fontFamily: "'DM Sans', sans-serif",
            formatter: (params: any) => {
              const name = params.name || '';
              return name.length > 15 ? `${name.substring(0, 15)}...` : name;
            },
          },
          edgeLabel: {
            show: true,
            fontSize: 11,
            color: '#475569',
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            formatter: (params: any) => {
              const originalValue = params.data?.originalValue || params.value || 0;
              return params.data?.label || `${originalValue.toLocaleString()}`;
            },
          },
          nodeAlign: CHART_CONFIG.node.align,
          nodeGap: props.nodeGap,
          nodeWidth: CHART_CONFIG.node.width,
          layoutIterations: CHART_CONFIG.node.iterations,
          orient: 'horizontal',
          draggable: false,
          ...CHART_CONFIG.margins,
        },
      ],
      backgroundColor: 'transparent',
      animation: true,
      animationDuration: CHART_CONFIG.animation.duration,
      animationEasing: CHART_CONFIG.animation.easing,
    };

    chartInstance.setOption(chartOptions);
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

const waitForContainerAndInit = async (maxTries = 40) => {
  await nextTick();

  for (let tries = 0; tries < maxTries; tries++) {
    if (chartEl.value?.clientWidth && chartEl.value.clientWidth > 0 && 
        chartEl.value?.clientHeight && chartEl.value.clientHeight > 0) {
      return await initChart();
    }
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  await initChart();
  setTimeout(handleResize, 50);
};

const handleResize = () => chartInstance?.resize();

const cleanup = () => {
  window.removeEventListener('resize', handleResize);
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
};

onMounted(() => chartEl.value && waitForContainerAndInit());
onBeforeUnmount(cleanup);
watch(() => props.data, setOptions, { deep: true });
</script>

<style scoped>
.chart-container {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
  overflow: hidden;
}

.chart-content {
  width: 100%;
  animation: fadeIn 0.5s ease-out;
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
  color: #ef4444;
  margin: 0 auto 16px;
}

.error-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.error-description {
  font-size: 14px;
  font-weight: 400;
  color: #64748b;
  margin: 0;
}

/* Loading State */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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
  background: linear-gradient(to right, #C67DFF, #8b5cf6, #5d4b93);
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
  color: #64748b;
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
  .chart-container {
    padding: 20px 24px;
    border-radius: 16px;
  }

  .chart-title {
    font-size: 1rem;
    margin-bottom: 16px;
  }

  .sankey-loader {
    gap: 6px;
    height: 60px;
  }

  .flow {
    width: 50px;
  }
}
</style>

