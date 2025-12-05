<template>
  <div class="chart-container">
    <svg
      :viewBox="`0 0 ${chartWidth} ${chartHeight}`"
      class="w-full histogram-svg"
      :style="`min-height: ${chartHeight}px;`"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <!-- Tooltip -->
      <g v-if="tooltip.visible" :transform="`translate(${tooltip.x}, ${tooltip.y})`">
        <rect
          :x="-tooltip.width / 2"
          :y="-tooltip.height - 10"
          :width="tooltip.width"
          :height="tooltip.height"
          :fill="svgColors.tooltipBg"
          rx="8"
          :stroke="svgColors.tooltipBorder"
          stroke-width="1"
        />
        <text
          x="0"
          :y="-tooltip.height + 8"
          text-anchor="middle"
          :fill="svgColors.tooltipText"
          font-size="13"
          font-weight="600"
          font-family="'DM Sans', sans-serif"
          dominant-baseline="hanging"
        >
          {{ tooltip.title }}
        </text>
        <text
          x="0"
          :y="-tooltip.height + 26"
          text-anchor="middle"
          :fill="svgColors.tooltipTextSecondary"
          font-size="11"
          font-weight="500"
          font-family="'DM Sans', sans-serif"
          dominant-baseline="hanging"
        >
          {{ tooltip.text }}
        </text>
      </g>

      <!-- Grid lines -->
      <template v-for="(tick, index) in yAxisTicks" :key="`grid-${index}`">
        <line
          :x1="chartMargin"
          :y1="tick.y"
          :x2="chartWidth - chartMargin"
          :y2="tick.y"
          :stroke="svgColors.gridLine"
          stroke-width="1"
          stroke-dasharray="4,4"
          opacity="0.6"
        />
      </template>

      <!-- Y-axis (vertical axis for count) -->
      <line
        :x1="chartMargin"
        :y1="chartMargin"
        :x2="chartMargin"
        :y2="chartHeight - chartBottomMargin"
        :stroke="svgColors.axis"
        stroke-width="2"
      />
      
      <!-- Y-axis arrow -->
      <polygon
        :points="`${chartMargin - 4},${chartMargin} ${chartMargin + 4},${chartMargin} ${chartMargin},${chartMargin - 10}`"
        :fill="svgColors.axis"
      />

      <!-- Y-axis ticks and labels -->
      <template v-for="(tick, index) in yAxisTicks" :key="`y-tick-${index}`">
        <line
          :x1="chartMargin - 6"
          :y1="tick.y"
          :x2="chartMargin"
          :y2="tick.y"
          :stroke="svgColors.tickLine"
          stroke-width="1"
        />
        <text
          :x="chartMargin - 12"
          :y="tick.y + 4"
          text-anchor="end"
          :fill="svgColors.tickText"
          font-size="12"
          font-weight="500"
          font-family="'DM Sans', sans-serif"
        >
          {{ tick.value }}
        </text>
      </template>

      <!-- Y-axis label -->
      <text
        :x="chartMargin - 35"
        :y="chartHeight / 2"
        text-anchor="middle"
        :fill="svgColors.labelText"
        font-size="14"
        font-weight="600"
        font-family="'DM Sans', sans-serif"
        :transform="`rotate(-90, ${chartMargin - 35}, ${chartHeight / 2})`"
      >
        Count
      </text>

      <!-- X-axis (horizontal axis for scores 1-10) -->
      <line
        :x1="chartMargin"
        :y1="chartHeight - chartBottomMargin"
        :x2="chartWidth - chartMargin"
        :y2="chartHeight - chartBottomMargin"
        :stroke="svgColors.axis"
        stroke-width="2"
      />

      <!-- X-axis arrow -->
      <polygon
        :points="`${chartWidth - chartMargin},${chartHeight - chartBottomMargin - 4} ${chartWidth - chartMargin},${chartHeight - chartBottomMargin + 4} ${chartWidth - chartMargin + 10},${chartHeight - chartBottomMargin}`"
        :fill="svgColors.axis"
      />

      <!-- X-axis ticks and labels (scores 1-10) -->
      <template v-for="(bar, index) in histogramData" :key="`tick-${index}`">
        <line
          :x1="bar.x"
          :y1="chartHeight - chartBottomMargin"
          :x2="bar.x"
          :y2="chartHeight - chartBottomMargin + 5"
          :stroke="svgColors.tickLine"
          stroke-width="1"
        />
        <text
          :x="bar.x"
          :y="chartHeight - chartBottomMargin + 20"
          text-anchor="middle"
          :fill="svgColors.labelText"
          font-size="13"
          font-weight="600"
          font-family="'DM Sans', sans-serif"
        >
          {{ bar.score }}
        </text>
      </template>

      <!-- X-axis label -->
      <text
        :x="chartWidth / 2"
        :y="chartHeight - chartBottomMargin + 40"
        text-anchor="middle"
        :fill="svgColors.labelText"
        font-size="14"
        font-weight="600"
        font-family="'DM Sans', sans-serif"
      >
        Score
      </text>

      <!-- Gaussian bell curve (normal distribution) -->
      <path
        v-if="gaussianPath"
        :d="gaussianPath"
        fill="none"
        stroke="#8b5cf6"
        stroke-width="2.5"
        opacity="0.7"
        class="gaussian-curve"
      />

      <!-- Histogram bars -->
      <template v-for="(bar, index) in histogramData" :key="`bar-${index}`">
        <rect
          :x="bar.x - barWidth / 2"
          :y="bar.y"
          :width="barWidth"
          :height="bar.height"
          fill="rgba(198, 125, 255, 0.6)"
          stroke="#C67DFF"
          stroke-width="2"
          rx="4"
          class="histogram-bar"
          @mouseenter="showTooltip($event, bar)"
          @mouseleave="hideTooltip"
          style="cursor: pointer;"
        />
      </template>

      <!-- Statistical lines -->
      <!-- Min line -->
      <line
        v-if="minX"
        :x1="minX"
        :y1="chartMargin"
        :x2="minX"
        :y2="chartHeight - chartBottomMargin"
        stroke="#5d4b93"
        stroke-width="2.5"
        stroke-dasharray="6,4"
        opacity="0.8"
      />
      <text
        v-if="minX"
        :x="minX"
        :y="chartHeight - chartBottomMargin + 60"
        text-anchor="middle"
        fill="#5d4b93"
        font-size="12"
        font-weight="600"
        font-family="'DM Sans', sans-serif"
      >
        Min: {{ minValue.toFixed(1) }}
      </text>

      <!-- Q1 line -->
      <line
        v-if="q1X"
        :x1="q1X"
        :y1="chartMargin"
        :x2="q1X"
        :y2="chartHeight - chartBottomMargin"
        stroke="#a855f7"
        stroke-width="2.5"
        stroke-dasharray="6,4"
        opacity="0.8"
      />
      <text
        v-if="q1X"
        :x="q1X"
        :y="getLabelY('q1')"
        text-anchor="middle"
        fill="#a855f7"
        font-size="12"
        font-weight="600"
        font-family="'DM Sans', sans-serif"
      >
        Q1: {{ q1Value.toFixed(1) }}
      </text>

      <!-- Median line -->
      <line
        v-if="medianX"
        :x1="medianX"
        :y1="chartMargin"
        :x2="medianX"
        :y2="chartHeight - chartBottomMargin"
        stroke="#8b5cf6"
        stroke-width="3"
        stroke-dasharray="6,4"
        opacity="0.9"
      />
      <text
        v-if="medianX"
        :x="medianX"
        :y="getLabelY('median')"
        text-anchor="middle"
        fill="#8b5cf6"
        font-size="13"
        font-weight="700"
        font-family="'DM Sans', sans-serif"
      >
        Median: {{ medianValue.toFixed(1) }}
      </text>

      <!-- Average line -->
      <line
        v-if="averageX"
        :x1="averageX"
        :y1="chartMargin"
        :x2="averageX"
        :y2="chartHeight - chartBottomMargin"
        stroke="#f97316"
        stroke-width="3"
        stroke-dasharray="6,4"
        opacity="0.9"
      />
      <text
        v-if="averageX"
        :x="averageX"
        :y="getLabelY('avg')"
        text-anchor="middle"
        fill="#f97316"
        font-size="13"
        font-weight="700"
        font-family="'DM Sans', sans-serif"
      >
        Avg: {{ averageValue.toFixed(1) }}
      </text>

      <!-- Q3 line -->
      <line
        v-if="q3X"
        :x1="q3X"
        :y1="chartMargin"
        :x2="q3X"
        :y2="chartHeight - chartBottomMargin"
        stroke="#7c3aed"
        stroke-width="2.5"
        stroke-dasharray="6,4"
        opacity="0.8"
      />
      <text
        v-if="q3X"
        :x="q3X"
        :y="getLabelY('q3')"
        text-anchor="middle"
        fill="#7c3aed"
        font-size="12"
        font-weight="600"
        font-family="'DM Sans', sans-serif"
      >
        Q3: {{ q3Value.toFixed(1) }}
      </text>

      <!-- Max line -->
      <line
        v-if="maxX"
        :x1="maxX"
        :y1="chartMargin"
        :x2="maxX"
        :y2="chartHeight - chartBottomMargin"
        stroke="#C67DFF"
        stroke-width="2.5"
        stroke-dasharray="6,4"
        opacity="0.8"
      />
      <text
        v-if="maxX"
        :x="maxX"
        :y="chartHeight - chartBottomMargin + 60"
        text-anchor="middle"
        fill="#C67DFF"
        font-size="12"
        font-weight="600"
        font-family="'DM Sans', sans-serif"
      >
        Max: {{ maxValue.toFixed(1) }}
      </text>

      <!-- Legend -->
      <g v-if="showLegend" :transform="`translate(${chartWidth / 2}, ${chartMargin - 50})`">
        <!-- Gaussian curve -->
        <g transform="translate(-220, 0)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#8b5cf6" stroke-width="2.5" />
          <text x="24" y="4" :fill="svgColors.legendText" font-size="11" font-family="'DM Sans', sans-serif" font-weight="500">
            Gaussian
          </text>
        </g>
        
        <!-- Min -->
        <g transform="translate(-140, 0)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#5d4b93" stroke-width="2.5" stroke-dasharray="6,4" />
          <text x="24" y="4" :fill="svgColors.legendText" font-size="11" font-family="'DM Sans', sans-serif" font-weight="500">
            Min
          </text>
        </g>
        
        <!-- Q1 -->
        <g transform="translate(-80, 0)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#a855f7" stroke-width="2.5" stroke-dasharray="6,4" />
          <text x="24" y="4" :fill="svgColors.legendText" font-size="11" font-family="'DM Sans', sans-serif" font-weight="500">
            Q1
          </text>
        </g>
        
        <!-- Median -->
        <g transform="translate(-20, 0)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#8b5cf6" stroke-width="3" stroke-dasharray="6,4" />
          <text x="24" y="4" :fill="svgColors.legendText" font-size="11" font-family="'DM Sans', sans-serif" font-weight="500">
            Median
          </text>
        </g>
        
        <!-- Average -->
        <g transform="translate(60, 0)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#f97316" stroke-width="3" stroke-dasharray="6,4" />
          <text x="24" y="4" :fill="svgColors.legendText" font-size="11" font-family="'DM Sans', sans-serif" font-weight="500">
            Avg
          </text>
        </g>
        
        <!-- Q3 -->
        <g transform="translate(130, 0)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#7c3aed" stroke-width="2.5" stroke-dasharray="6,4" />
          <text x="24" y="4" :fill="svgColors.legendText" font-size="11" font-family="'DM Sans', sans-serif" font-weight="500">
            Q3
          </text>
        </g>
        
        <!-- Max -->
        <g transform="translate(180, 0)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#C67DFF" stroke-width="2.5" stroke-dasharray="6,4" />
          <text x="24" y="4" :fill="svgColors.legendText" font-size="11" font-family="'DM Sans', sans-serif" font-weight="500">
            Max
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRef } from 'vue';
import { useThemeDetection, type Theme } from '../../../composables/useThemeDetection';

interface HistogramItem {
  score: number;
  count: number;
}

const props = withDefaults(defineProps<{
  histogram: HistogramItem[];
  minScore?: number;
  maxScore?: number;
  q1Score?: number;
  medianScore?: number;
  q3Score?: number;
  averageScore?: number;
  chartWidth?: number;
  chartHeight?: number;
  chartMargin?: number;
  chartBottomMargin?: number;
  showLegend?: boolean;
  theme?: Theme;
}>(), {
  histogram: () => [],
  minScore: 0,
  maxScore: 0,
  q1Score: 0,
  medianScore: 0,
  q3Score: 0,
  averageScore: 0,
  chartWidth: 800,
  chartHeight: 450,
  chartMargin: 60,
  chartBottomMargin: 80,
  showLegend: true,
  theme: undefined
});

// Theme detection with prop fallback
const { isDark } = useThemeDetection(toRef(props, 'theme'));

// SVG colors based on theme
const svgColors = computed(() => ({
  // Tooltip
  tooltipBg: isDark.value ? 'rgba(26, 26, 29, 0.98)' : 'rgba(15, 23, 42, 0.95)',
  tooltipBorder: isDark.value ? 'rgba(198, 125, 255, 0.2)' : 'rgba(148, 163, 184, 0.2)',
  tooltipText: isDark.value ? '#f8f9fa' : '#f1f5f9',
  tooltipTextSecondary: isDark.value ? '#d1d5db' : '#e2e8f0',
  // Axis
  axis: isDark.value ? '#9ca3af' : '#475569',
  // Grid
  gridLine: isDark.value ? '#374151' : '#e5e7eb',
  // Ticks
  tickLine: isDark.value ? '#4b5563' : '#cbd5e1',
  tickText: isDark.value ? '#9ca3af' : '#64748b',
  // Labels
  labelText: isDark.value ? '#d1d5db' : '#475569',
  legendText: isDark.value ? '#d1d5db' : '#475569',
}));

const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  title: '',
  text: '',
  width: 0,
  height: 0,
});

const plotWidth = computed(() => props.chartWidth - props.chartMargin * 2);
const plotHeight = computed(() => props.chartHeight - props.chartMargin - props.chartBottomMargin);
const barWidth = computed(() => plotWidth.value / 10 * 0.6);

const maxCount = computed(() => {
  if (!props.histogram || props.histogram.length === 0) return 1;
  const actualMax = Math.max(...props.histogram.map(item => item.count || 0), 1);
  return actualMax + 30;
});

// Calculate standard deviation from histogram data
const standardDeviation = computed(() => {
  if (!props.histogram || props.histogram.length === 0) return 1;
  
  const mean = props.averageScore || 0;
  let totalCount = 0;
  let sumSquaredDiff = 0;
  
  props.histogram.forEach(item => {
    const count = item.count || 0;
    totalCount += count;
    const diff = item.score - mean;
    sumSquaredDiff += count * (diff * diff);
  });
  
  if (totalCount === 0) return 1;
  
  const variance = sumSquaredDiff / totalCount;
  return Math.sqrt(variance) || 1;
});

// Gaussian probability density function
const gaussianFunction = (x: number, mean: number, stdDev: number) => {
  if (stdDev === 0) return 0;
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
  return coefficient * Math.exp(exponent);
};

// Generate Gaussian bell curve path
const gaussianPath = computed(() => {
  if (!props.histogram || props.histogram.length === 0) return null;
  if (props.averageScore === 0 && standardDeviation.value === 0) return null;
  
  const mean = props.averageScore;
  const stdDev = standardDeviation.value;
  
  const points = [];
  const numPoints = 100;
  const minX = 1;
  const maxX = 10;
  
  const totalCount = props.histogram.reduce((sum, item) => sum + (item.count || 0), 0);
  if (totalCount === 0) return null;
  
  let maxGaussianValue = 0;
  for (let i = 0; i <= numPoints; i++) {
    const x = minX + (maxX - minX) * (i / numPoints);
    const gaussianValue = gaussianFunction(x, mean, stdDev);
    if (gaussianValue > maxGaussianValue) {
      maxGaussianValue = gaussianValue;
    }
  }
  
  // Calcular el factor de escala para que la curva no exceda el área disponible
  // Usamos el 75% del área disponible para dar margen a las etiquetas
  const availableHeight = plotHeight.value * 0.75;
  const scaleFactor = (availableHeight / maxGaussianValue) * totalCount * 0.006;
  
  // Límite mínimo de Y para no exceder el área del gráfico
  const minYLimit = props.chartMargin;
  
  for (let i = 0; i <= numPoints; i++) {
    const x = minX + (maxX - minX) * (i / numPoints);
    const gaussianValue = gaussianFunction(x, mean, stdDev);
    const scaledValue = gaussianValue * scaleFactor;
    
    const xCoord = valueToX(x);
    if (xCoord !== null) {
      // Calcular Y y asegurar que no exceda el límite superior
      let yCoord = props.chartHeight - props.chartBottomMargin - scaledValue;
      yCoord = Math.max(yCoord, minYLimit); // No permitir que suba más allá del margen
      
      points.push(`${i === 0 ? 'M' : 'L'} ${xCoord} ${yCoord}`);
    }
  }
  
  return points.join(' ');
});

const histogramData = computed(() => {
  if (!props.histogram || props.histogram.length === 0) return [];
  
  const barSpacing = plotWidth.value / 10;
  return props.histogram.map((item, index) => {
    const x = props.chartMargin + (index + 0.5) * barSpacing;
    const height = item.count > 0 ? (item.count / maxCount.value) * plotHeight.value : 0;
    const y = props.chartHeight - props.chartBottomMargin - height;
    
    return {
      score: item.score,
      count: item.count,
      x,
      y,
      height
    };
  });
});

const valueToX = (value: number): number | null => {
  if (value < 1 || value > 10) return null;
  const barSpacing = plotWidth.value / 10;
  return props.chartMargin + (value - 0.5) * barSpacing;
};

const minX = computed(() => valueToX(props.minScore));
const maxX = computed(() => valueToX(props.maxScore));
const q1X = computed(() => valueToX(props.q1Score));
const medianX = computed(() => valueToX(props.medianScore));
const q3X = computed(() => valueToX(props.q3Score));
const averageX = computed(() => valueToX(props.averageScore));

const minValue = computed(() => props.minScore);
const maxValue = computed(() => props.maxScore);
const q1Value = computed(() => props.q1Score);
const medianValue = computed(() => props.medianScore);
const q3Value = computed(() => props.q3Score);
const averageValue = computed(() => props.averageScore);

// Sistema de posicionamiento de etiquetas con detección de colisiones
interface LabelPosition {
  x: number | null;
  y: number;
  value: number;
  label: string;
  color: string;
  id: string;
  width: number;
}

// Calcular posiciones de etiquetas superiores (Q1, Median, Avg, Q3) con detección de colisiones
const topLabelPositions = computed(() => {
  const labels: LabelPosition[] = [];
  const baseY = props.chartMargin - 8;
  const levelHeight = 18; // Espacio vertical entre niveles
  
  // Recopilar todas las etiquetas que van arriba, con sus anchos aproximados
  if (q1X.value !== null) {
    labels.push({ 
      x: q1X.value, 
      y: baseY, 
      value: props.q1Score, 
      label: `Q1: ${q1Value.value.toFixed(1)}`,
      color: '#a855f7',
      id: 'q1',
      width: 55
    });
  }
  if (medianX.value !== null) {
    labels.push({ 
      x: medianX.value, 
      y: baseY - levelHeight, 
      value: props.medianScore, 
      label: `Median: ${medianValue.value.toFixed(1)}`,
      color: '#8b5cf6',
      id: 'median',
      width: 90
    });
  }
  if (averageX.value !== null) {
    labels.push({ 
      x: averageX.value, 
      y: baseY - levelHeight, 
      value: props.averageScore, 
      label: `Avg: ${averageValue.value.toFixed(1)}`,
      color: '#f97316',
      id: 'avg',
      width: 65
    });
  }
  if (q3X.value !== null) {
    labels.push({ 
      x: q3X.value, 
      y: baseY, 
      value: props.q3Score, 
      label: `Q3: ${q3Value.value.toFixed(1)}`,
      color: '#7c3aed',
      id: 'q3',
      width: 55
    });
  }
  
  // Ordenar por posición X
  labels.sort((a, b) => (a.x || 0) - (b.x || 0));
  
  // Agrupar etiquetas por niveles y detectar colisiones
  // Crear niveles de posición vertical
  const levels: LabelPosition[][] = [[], [], []]; // 3 niveles posibles
  
  labels.forEach(label => {
    if (label.x === null) return;
    
    // Encontrar el nivel apropiado sin colisiones
    let assignedLevel = -1;
    
    for (let levelIdx = 0; levelIdx < levels.length; levelIdx++) {
      let hasCollision = false;
      
      for (const existingLabel of levels[levelIdx]) {
        if (existingLabel.x === null) continue;
        
        // Verificar si hay superposición horizontal
        const distance = Math.abs(label.x - existingLabel.x);
        const minDistance = (label.width + existingLabel.width) / 2 + 10;
        
        if (distance < minDistance) {
          hasCollision = true;
          break;
        }
      }
      
      if (!hasCollision) {
        assignedLevel = levelIdx;
        break;
      }
    }
    
    // Si no encontró nivel sin colisión, usar el último
    if (assignedLevel === -1) {
      assignedLevel = levels.length - 1;
    }
    
    // Asignar posición Y basada en el nivel
    label.y = baseY - (assignedLevel * levelHeight);
    levels[assignedLevel].push(label);
  });
  
  // Asegurar que las etiquetas no salgan del viewBox (límite superior)
  const minY = 15;
  labels.forEach(label => {
    if (label.y < minY) {
      label.y = minY;
    }
  });
  
  return labels;
});

// Función helper para obtener la posición Y de una etiqueta específica
const getLabelY = (id: string): number => {
  const label = topLabelPositions.value.find(l => l.id === id);
  return label?.y || props.chartMargin - 10;
};

const yAxisTicks = computed(() => {
  const ticks = [];
  const numTicks = 5;
  for (let i = 0; i <= numTicks; i++) {
    const value = Math.round((maxCount.value / numTicks) * i);
    const y = props.chartHeight - props.chartBottomMargin - (i / numTicks) * plotHeight.value;
    ticks.push({ value, y });
  }
  return ticks;
});

const showTooltip = (event: MouseEvent, bar: any) => {
  const svg = (event.currentTarget as SVGElement).closest('svg');
  if (!svg) return;
  
  const rect = svg.getBoundingClientRect();
  const point = svg.createSVGPoint();
  point.x = event.clientX - rect.left;
  point.y = event.clientY - rect.top;
  
  const title = `Score: ${bar.score}`;
  const text = `Count: ${bar.count}`;
  const tooltipWidth = 120;
  const tooltipHeight = 48;
  
  tooltip.value = {
    visible: true,
    x: point.x,
    y: point.y - 20,
    title,
    text,
    width: tooltipWidth,
    height: tooltipHeight,
  };
};

const handleMouseMove = (event: MouseEvent) => {
  if (tooltip.value.visible) {
    const svg = event.currentTarget as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    const point = svg.createSVGPoint();
    point.x = event.clientX - rect.left;
    point.y = event.clientY - rect.top;
    
    tooltip.value.x = point.x;
    tooltip.value.y = point.y - 20;
  }
};

const handleMouseLeave = () => {
  tooltip.value.visible = false;
};

const hideTooltip = () => {
  tooltip.value.visible = false;
};

// Expose isDark for potential use
defineExpose({ isDark });
</script>

<style scoped>
.chart-container {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  height: 100%;
  min-height: 450px;
  max-height: 550px;
  background: var(--kiut-bg-chart-wrapper);
  border-radius: 16px;
  position: relative;
}

.chart-container:hover {
  box-shadow: var(--kiut-shadow-card-hover);
}

.histogram-svg {
  display: block;
}

.histogram-bar {
  transition: all 0.2s ease;
}

.histogram-bar:hover {
  opacity: 0.8;
  filter: drop-shadow(0 2px 4px rgba(198, 125, 255, 0.4));
}

.gaussian-curve {
  transition: all 0.2s ease;
}

.gaussian-curve:hover {
  stroke-width: 3;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .chart-container {
    min-height: 400px;
  }
}

@media (max-width: 480px) {
  .chart-container {
    min-height: 350px;
  }
}
</style>
