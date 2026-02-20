<template>
  <div class="chart-container">
    <svg 
      :viewBox="`0 0 ${chartWidth} ${chartHeight}`" 
      class="candlestick-svg"
      :style="`min-height: ${chartHeight}px; min-width: ${chartWidth}px;`" 
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

      <!-- Y-axis (vertical axis for scores 1-10) -->
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
      
      <!-- Y-axis labels -->
      <template v-for="(tick, index) in yAxisTicks" :key="index">
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
      
      <!-- Y-axis label "Score" -->
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
        {{ capitalizeText(yAxisLabel) }}
      </text>
      
      <!-- X-axis (horizontal axis for dates) -->
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
      
      <!-- Candlesticks -->
      <template v-for="(candle, index) in candlestickData" :key="index">
        <g :transform="`translate(${candle.centerX}, 0)`">
          <!-- Wick (high-low line) -->
          <line
            :x1="0"
            :y1="candle.highY"
            :x2="0"
            :y2="candle.lowY"
            :stroke="candle.isTotal ? '#8b5cf6' : '#C67DFF'"
            stroke-width="2.5"
            class="hover-line"
            @mouseenter="showTooltip($event, candle, 'wick')"
            @mouseleave="hideTooltip"
            style="cursor: pointer;"
          />
          
          <!-- Body (Q1-Q3 rectangle) -->
          <rect
            :x="-candleWidth / 2"
            :y="Math.min(candle.q1Y, candle.q3Y) - (Math.abs(candle.q3Y - candle.q1Y) < 4 ? 4 : 0)"
            :width="candleWidth"
            :height="Math.max(8, Math.abs(candle.q3Y - candle.q1Y))"
            :fill="candle.isTotal ? 'rgba(139, 92, 246, 0.15)' : 'rgba(198, 125, 255, 0.15)'"
            :stroke="candle.isTotal ? '#8b5cf6' : '#C67DFF'"
            stroke-width="2.5"
            rx="4"
            class="hover-rect"
            @mouseenter="showTooltip($event, candle, 'body')"
            @mouseleave="hideTooltip"
            style="cursor: pointer;"
          />
          
          <!-- Median line (horizontal line through body) -->
          <line
            v-if="candle.medianY"
            :x1="-candleWidth / 2"
            :y1="candle.medianY"
            :x2="candleWidth / 2"
            :y2="candle.medianY"
            stroke="#8b5cf6"
            stroke-width="3"
            class="hover-line"
            @mouseenter="showTooltip($event, candle, 'median')"
            @mouseleave="hideTooltip"
            style="cursor: pointer;"
          />
          
          <!-- Average line (dashed) -->
          <line
            v-if="candle.averageY"
            :x1="-candleWidth / 2"
            :y1="candle.averageY"
            :x2="candleWidth / 2"
            :y2="candle.averageY"
            stroke="#f97316"
            stroke-width="3"
            stroke-dasharray="6,4"
            class="hover-line"
            @mouseenter="showTooltip($event, candle, 'average')"
            @mouseleave="hideTooltip"
            style="cursor: pointer;"
          />
          
          <!-- Dots at key points -->
          <circle
            :cx="0"
            :cy="candle.lowY"
            r="5"
            fill="#5d4b93"
            :stroke="svgColors.dotStroke"
            stroke-width="2"
            class="hover-circle"
            @mouseenter="showTooltip($event, candle, 'min')"
            @mouseleave="hideTooltip"
            style="cursor: pointer;"
          />
          <circle
            :cx="0"
            :cy="candle.highY"
            r="5"
            fill="#C67DFF"
            :stroke="svgColors.dotStroke"
            stroke-width="2"
            class="hover-circle"
            @mouseenter="showTooltip($event, candle, 'max')"
            @mouseleave="hideTooltip"
            style="cursor: pointer;"
          />
        </g>
        
        <!-- X-axis labels (dates with response count) -->
        <text
          :x="candle.centerX"
          :y="chartHeight - chartBottomMargin + 22"
          text-anchor="middle"
          :fill="svgColors.labelText"
          font-size="13"
          font-weight="600"
          font-family="'DM Sans', sans-serif"
        >
          {{ capitalizeText(candle.label) }}
        </text>
        <text
          v-if="candle.responseCount"
          :x="candle.centerX"
          :y="chartHeight - chartBottomMargin + 38"
          text-anchor="middle"
          :fill="svgColors.tickText"
          font-size="11"
          font-weight="500"
          font-family="'DM Sans', sans-serif"
        >
          n={{ candle.responseCount }}
        </text>
      </template>
      
      <!-- Legend -->
      <g v-if="showLegend" :transform="`translate(${chartWidth / 2}, ${chartMargin - 35})`">
        <!-- Min -->
        <g transform="translate(-180, 0)">
          <circle cx="0" cy="0" r="5" fill="#5d4b93" :stroke="svgColors.dotStroke" stroke-width="1.5" />
          <text x="10" y="4" :fill="svgColors.legendText" font-size="12" font-family="'DM Sans', sans-serif" font-weight="500">
            Min
          </text>
        </g>
        
        <!-- Q1 -->
        <g transform="translate(-120, 0)">
          <rect x="-6" y="-6" width="12" height="12" fill="rgba(198, 125, 255, 0.15)" stroke="#C67DFF" stroke-width="1.5" rx="2" />
          <text x="10" y="4" :fill="svgColors.legendText" font-size="12" font-family="'DM Sans', sans-serif" font-weight="500">
            Q1
          </text>
        </g>
        
        <!-- Q3 -->
        <g transform="translate(-60, 0)">
          <rect x="-6" y="-6" width="12" height="12" fill="rgba(198, 125, 255, 0.15)" stroke="#C67DFF" stroke-width="1.5" rx="2" />
          <text x="10" y="4" :fill="svgColors.legendText" font-size="12" font-family="'DM Sans', sans-serif" font-weight="500">
            Q3
          </text>
        </g>
        
        <!-- Max -->
        <g transform="translate(0, 0)">
          <circle cx="0" cy="0" r="5" fill="#C67DFF" :stroke="svgColors.dotStroke" stroke-width="1.5" />
          <text x="10" y="4" :fill="svgColors.legendText" font-size="12" font-family="'DM Sans', sans-serif" font-weight="500">
            Max
          </text>
        </g>
        
        <!-- Average -->
        <g transform="translate(60, 0)">
          <line x1="0" y1="0" x2="14" y2="0" stroke="#f97316" stroke-width="2.5" stroke-dasharray="6,4" />
          <text x="18" y="4" :fill="svgColors.legendText" font-size="12" font-family="'DM Sans', sans-serif" font-weight="500">
            Avg
          </text>
        </g>
        
        <!-- Median -->
        <g transform="translate(130, 0)">
          <line x1="0" y1="0" x2="14" y2="0" stroke="#8b5cf6" stroke-width="2.5" />
          <text x="18" y="4" :fill="svgColors.legendText" font-size="12" font-family="'DM Sans', sans-serif" font-weight="500">
            Median
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRef } from 'vue';
import { useThemeDetection, type Theme } from '../../../composables/useThemeDetection';

interface CandlestickData {
  label: string;
  low: number;
  q1: number;
  median: number;
  q3: number;
  high: number;
  average?: number;
  responseCount?: number;
  isTotal?: boolean;
  centerX?: number;
  lowY?: number;
  q1Y?: number;
  medianY?: number;
  q3Y?: number;
  highY?: number;
  averageY?: number;
}

const props = withDefaults(defineProps<{
  candlestickData: CandlestickData[];
  chartWidth?: number;
  chartHeight?: number;
  chartMargin?: number;
  chartBottomMargin?: number;
  candleWidth?: number;
  showLegend?: boolean;
  yAxisLabel?: string;
  theme?: Theme;
}>(), {
  chartWidth: 800,
  chartHeight: 400,
  chartMargin: 70,
  chartBottomMargin: 90,
  candleWidth: 35,
  showLegend: true,
  yAxisLabel: 'score',
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
  // Dots
  dotStroke: isDark.value ? '#1a1a1d' : '#ffffff',
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

const capitalizeText = (text: string): string => {
  if (typeof text === 'string') {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  return text;
};

const showTooltip = (event: MouseEvent, candle: CandlestickData, type: string) => {
  const svg = (event.currentTarget as SVGElement).closest('svg');
  if (!svg) return;
  
  const rect = svg.getBoundingClientRect();
  const point = svg.createSVGPoint();
  point.x = event.clientX - rect.left;
  point.y = event.clientY - rect.top;
  
  let title = capitalizeText(candle.label);
  let text = '';
  
  switch (type) {
    case 'body':
      text = `Q1: ${candle.q1.toFixed(1)} | Q3: ${candle.q3.toFixed(1)}`;
      break;
    case 'wick':
      text = `Min: ${candle.low.toFixed(1)} | Max: ${candle.high.toFixed(1)}`;
      break;
    case 'median':
      text = `Median: ${candle.median.toFixed(1)}`;
      break;
    case 'average':
      text = `Average: ${candle.average?.toFixed(1)}`;
      break;
    case 'min':
      text = `Min: ${candle.low.toFixed(1)}`;
      break;
    case 'max':
      text = `Max: ${candle.high.toFixed(1)}`;
      break;
  }
  
  const tooltipWidth = Math.max(180, text.length * 7 + 40);
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

const yAxisTicks = computed(() => {
  const ticks = [];
  const numTicks = 10;
  const plotHeight = props.chartHeight - props.chartMargin - props.chartBottomMargin;
  
  for (let i = 1; i <= numTicks; i++) {
    const value = i;
    const normalized = (value - 1) / 9;
    const y = props.chartMargin + plotHeight - (normalized * plotHeight);
    ticks.push({ value, y });
  }
  
  return ticks;
});

// Expose isDark for potential use
defineExpose({ isDark });
</script>

<style scoped>
.chart-container {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  height: 100%;
  min-height: 400px;
  background: var(--kiut-bg-chart-wrapper);
  border-radius: 16px;
  position: relative;
}

.candlestick-svg {
  display: block;
}

.hover-line {
  transition: all 0.2s ease;
}

.hover-line:hover {
  stroke-width: 4;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.hover-rect {
  transition: all 0.2s ease;
}

.hover-rect:hover {
  opacity: 0.3;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.hover-circle {
  transition: all 0.2s ease;
}

.hover-circle:hover {
  r: 7;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .chart-container {
    padding: 16px;
    min-height: 350px;
  }
}

@media (max-width: 480px) {
  .chart-container {
    padding: 12px;
    min-height: 300px;
  }
}
</style>
