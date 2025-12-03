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
          fill="rgba(15, 23, 42, 0.95)"
          rx="8"
          stroke="rgba(148, 163, 184, 0.2)"
          stroke-width="1"
        />
        <text
          x="0"
          :y="-tooltip.height + 8"
          text-anchor="middle"
          fill="#f1f5f9"
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
          fill="#e2e8f0"
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
          stroke="#e5e7eb"
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
        stroke="#475569"
        stroke-width="2"
      />
      
      <!-- Y-axis arrow -->
      <polygon
        :points="`${chartMargin - 4},${chartMargin} ${chartMargin + 4},${chartMargin} ${chartMargin},${chartMargin - 10}`"
        fill="#475569"
      />

      <!-- Y-axis ticks and labels -->
      <template v-for="(tick, index) in yAxisTicks" :key="`y-tick-${index}`">
        <line
          :x1="chartMargin - 6"
          :y1="tick.y"
          :x2="chartMargin"
          :y2="tick.y"
          stroke="#cbd5e1"
          stroke-width="1"
        />
        <text
          :x="chartMargin - 12"
          :y="tick.y + 4"
          text-anchor="end"
          fill="#64748b"
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
        fill="#475569"
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
        stroke="#475569"
        stroke-width="2"
      />

      <!-- X-axis arrow -->
      <polygon
        :points="`${chartWidth - chartMargin},${chartHeight - chartBottomMargin - 4} ${chartWidth - chartMargin},${chartHeight - chartBottomMargin + 4} ${chartWidth - chartMargin + 10},${chartHeight - chartBottomMargin}`"
        fill="#475569"
      />

      <!-- X-axis ticks and labels (scores 1-10) -->
      <template v-for="(bar, index) in histogramData" :key="`tick-${index}`">
        <line
          :x1="bar.x"
          :y1="chartHeight - chartBottomMargin"
          :x2="bar.x"
          :y2="chartHeight - chartBottomMargin + 5"
          stroke="#cbd5e1"
          stroke-width="1"
        />
        <text
          :x="bar.x"
          :y="chartHeight - chartBottomMargin + 20"
          text-anchor="middle"
          fill="#475569"
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
        fill="#475569"
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
        :y="chartMargin - 10"
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
        :y="chartMargin - 25"
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
        :y="chartMargin - 25"
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
        :y="chartMargin - 10"
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
          <text x="24" y="4" fill="#475569" font-size="11" font-family="'DM Sans', sans-serif" font-weight="500">
            Gaussian
          </text>
        </g>
        
        <!-- Min -->
        <g transform="translate(-140, 0)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#5d4b93" stroke-width="2.5" stroke-dasharray="6,4" />
          <text x="24" y="4" fill="#475569" font-size="11" font-family="'DM Sans', sans-serif" font-weight="500">
            Min
          </text>
        </g>
        
        <!-- Q1 -->
        <g transform="translate(-80, 0)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#a855f7" stroke-width="2.5" stroke-dasharray="6,4" />
          <text x="24" y="4" fill="#475569" font-size="11" font-family="'DM Sans', sans-serif" font-weight="500">
            Q1
          </text>
        </g>
        
        <!-- Median -->
        <g transform="translate(-20, 0)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#8b5cf6" stroke-width="3" stroke-dasharray="6,4" />
          <text x="24" y="4" fill="#475569" font-size="11" font-family="'DM Sans', sans-serif" font-weight="500">
            Median
          </text>
        </g>
        
        <!-- Average -->
        <g transform="translate(60, 0)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#f97316" stroke-width="3" stroke-dasharray="6,4" />
          <text x="24" y="4" fill="#475569" font-size="11" font-family="'DM Sans', sans-serif" font-weight="500">
            Avg
          </text>
        </g>
        
        <!-- Q3 -->
        <g transform="translate(130, 0)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#7c3aed" stroke-width="2.5" stroke-dasharray="6,4" />
          <text x="24" y="4" fill="#475569" font-size="11" font-family="'DM Sans', sans-serif" font-weight="500">
            Q3
          </text>
        </g>
        
        <!-- Max -->
        <g transform="translate(180, 0)">
          <line x1="0" y1="0" x2="20" y2="0" stroke="#C67DFF" stroke-width="2.5" stroke-dasharray="6,4" />
          <text x="24" y="4" fill="#475569" font-size="11" font-family="'DM Sans', sans-serif" font-weight="500">
            Max
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

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
});

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
  
  const availableHeight = plotHeight.value * 0.80;
  const scaleFactor = (availableHeight / maxGaussianValue) * totalCount * 0.007;
  
  for (let i = 0; i <= numPoints; i++) {
    const x = minX + (maxX - minX) * (i / numPoints);
    const gaussianValue = gaussianFunction(x, mean, stdDev);
    const scaledValue = gaussianValue * scaleFactor;
    
    const xCoord = valueToX(x);
    if (xCoord !== null) {
      const yCoord = props.chartHeight - props.chartBottomMargin - scaledValue;
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
</script>

<style scoped>
.chart-container {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  height: 100%;
  min-height: 450px;
  max-height: 550px;
  padding: 24px;
  background: linear-gradient(to bottom, #ffffff 0%, #fefefe 100%);
  border-radius: 16px;
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.03),
    0 4px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
  position: relative;
}

.chart-container:hover {
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 8px 16px rgba(0, 0, 0, 0.08);
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
    padding: 16px;
    min-height: 400px;
  }
}

@media (max-width: 480px) {
  .chart-container {
    padding: 12px;
    min-height: 350px;
  }
}
</style>

