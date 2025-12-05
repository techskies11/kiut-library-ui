<template>
  <div class="chart-container">
    <svg 
      :viewBox="`0 0 ${chartWidth} ${chartHeight}`" 
      class="w-full boxplot-svg"
      :style="`min-height: ${chartHeight}px;`" 
      @mousemove="handleMouseMove" 
      @mouseleave="handleMouseLeave"
    >
      <!-- Tooltip -->
      <g v-if="tooltip.visible" :transform="`translate(${tooltip.x}, ${tooltip.y})`">
        <rect
          :x="-(tooltip.text.length * 6 + 10)"
          :y="-16"
          :width="tooltip.text.length * 12 + 20"
          height="24"
          :fill="svgColors.tooltipBg"
          rx="6"
          :stroke="svgColors.tooltipBorder"
          stroke-width="1"
        />
        <text
          x="0"
          y="0"
          text-anchor="middle"
          :fill="svgColors.tooltipText"
          font-size="12"
          font-weight="500"
          font-family="'DM Sans', sans-serif"
          dominant-baseline="middle"
        >
          {{ tooltip.text }}
        </text>
      </g>

      <!-- Y-axis (vertical axis for values) -->
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
      
      <!-- X-axis (horizontal axis) -->
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
      
      <!-- Boxplots -->
      <template v-for="(boxplot, index) in boxplotData" :key="index">
        <g :transform="`translate(${boxplot.centerX}, 0)`">
          <!-- Color based on isTotal -->
          <template v-if="boxplot.isTotal">
            <!-- Whisker lines (min to Q1 and Q3 to max) - Purple for Total -->
            <line
              :x1="0"
              :y1="boxplot.minY"
              :x2="0"
              :y2="boxplot.q1Y"
              stroke="#8b5cf6"
              stroke-width="2.5"
            />
            <line
              :x1="0"
              :y1="boxplot.q3Y"
              :x2="0"
              :y2="boxplot.maxY"
              stroke="#8b5cf6"
              stroke-width="2.5"
            />
            
            <!-- Horizontal lines at min and max -->
            <line
              :x1="-18"
              :y1="boxplot.minY"
              :x2="18"
              :y2="boxplot.minY"
              stroke="#8b5cf6"
              stroke-width="2.5"
            />
            <line
              :x1="-18"
              :y1="boxplot.maxY"
              :x2="18"
              :y2="boxplot.maxY"
              stroke="#8b5cf6"
              stroke-width="2.5"
            />
            
            <!-- Box (Q1 to Q3) -->
            <rect
              :x="-24"
              :y="boxplot.q3Y"
              width="48"
              :height="boxplot.q1Y - boxplot.q3Y"
              fill="#8b5cf6"
              fill-opacity="0.15"
              stroke="#8b5cf6"
              stroke-width="2.5"
              rx="4"
            />
          </template>
          <template v-else>
            <!-- Whisker lines (min to Q1 and Q3 to max) - Light Purple for Daily -->
            <line
              :x1="0"
              :y1="boxplot.minY"
              :x2="0"
              :y2="boxplot.q1Y"
              stroke="#C67DFF"
              stroke-width="2.5"
            />
            <line
              :x1="0"
              :y1="boxplot.q3Y"
              :x2="0"
              :y2="boxplot.maxY"
              stroke="#C67DFF"
              stroke-width="2.5"
            />
            
            <!-- Horizontal lines at min and max -->
            <line
              :x1="-18"
              :y1="boxplot.minY"
              :x2="18"
              :y2="boxplot.minY"
              stroke="#C67DFF"
              stroke-width="2.5"
            />
            <line
              :x1="-18"
              :y1="boxplot.maxY"
              :x2="18"
              :y2="boxplot.maxY"
              stroke="#C67DFF"
              stroke-width="2.5"
            />
            
            <!-- Box (Q1 to Q3) -->
            <rect
              :x="-24"
              :y="boxplot.q3Y"
              width="48"
              :height="boxplot.q1Y - boxplot.q3Y"
              fill="#C67DFF"
              fill-opacity="0.15"
              stroke="#C67DFF"
              stroke-width="2.5"
              rx="4"
            />
          </template>
          
          <!-- Dots at key points with system colors -->
          <circle
            :cx="0"
            :cy="boxplot.minY"
            r="6"
            fill="#5d4b93"
            :stroke="svgColors.dotStroke"
            stroke-width="2"
            class="hover-circle"
            @mouseenter="showTooltip($event, `Min: ${boxplot.min.toFixed(1)}`)"
            @mouseleave="hideTooltip"
            style="cursor: pointer;"
          />
          <circle
            :cx="0"
            :cy="boxplot.q1Y"
            r="6"
            fill="#a855f7"
            :stroke="svgColors.dotStroke"
            stroke-width="2"
            class="hover-circle"
            @mouseenter="showTooltip($event, `Q1: ${boxplot.q1.toFixed(1)}`)"
            @mouseleave="hideTooltip"
            style="cursor: pointer;"
          />
          <circle
            :cx="0"
            :cy="boxplot.q3Y"
            r="6"
            fill="#7c3aed"
            :stroke="svgColors.dotStroke"
            stroke-width="2"
            class="hover-circle"
            @mouseenter="showTooltip($event, `Q3: ${boxplot.q3.toFixed(1)}`)"
            @mouseleave="hideTooltip"
            style="cursor: pointer;"
          />
          <circle
            :cx="0"
            :cy="boxplot.maxY"
            r="6"
            fill="#C67DFF"
            :stroke="svgColors.dotStroke"
            stroke-width="2"
            class="hover-circle"
            @mouseenter="showTooltip($event, `Max: ${boxplot.max.toFixed(1)}`)"
            @mouseleave="hideTooltip"
            style="cursor: pointer;"
          />
          
          <!-- Median line (purple) -->
          <line
            :x1="-24"
            :y1="boxplot.medianY"
            :x2="24"
            :y2="boxplot.medianY"
            stroke="#8b5cf6"
            stroke-width="3.5"
            class="hover-line"
            @mouseenter="showTooltip($event, `Median: ${boxplot.median.toFixed(1)}`)"
            @mouseleave="hideTooltip"
            style="cursor: pointer;"
          />
          
          <!-- Average line (orange dashed) -->
          <line
            v-if="boxplot.averageY"
            :x1="-24"
            :y1="boxplot.averageY"
            :x2="24"
            :y2="boxplot.averageY"
            stroke="#f97316"
            stroke-width="3"
            stroke-dasharray="6,4"
            class="hover-line"
            @mouseenter="showTooltip($event, `Avg: ${boxplot.average.toFixed(1)}`)"
            @mouseleave="hideTooltip"
            style="cursor: pointer;"
          />
        </g>
        
        <!-- X-axis labels -->
        <text
          :x="boxplot.centerX"
          :y="chartHeight - chartBottomMargin + 22"
          text-anchor="middle"
          :fill="svgColors.labelText"
          font-size="13"
          font-weight="600"
          font-family="'DM Sans', sans-serif"
        >
          {{ capitalizeText(boxplot.label) }}
        </text>
        <text
          v-if="boxplot.responseCount"
          :x="boxplot.centerX"
          :y="chartHeight - chartBottomMargin + 38"
          text-anchor="middle"
          :fill="svgColors.tickText"
          font-size="11"
          font-weight="500"
          font-family="'DM Sans', sans-serif"
        >
          n={{ boxplot.responseCount }}
        </text>
      </template>
      
      <!-- Legend -->
      <g v-if="showLegend" :transform="`translate(${chartWidth / 2}, ${chartMargin - 35})`">
        <!-- Min -->
        <g transform="translate(-200, 0)">
          <circle cx="0" cy="0" r="5" fill="#5d4b93" :stroke="svgColors.dotStroke" stroke-width="1.5" />
          <text x="10" y="4" :fill="svgColors.legendText" font-size="12" font-family="'DM Sans', sans-serif" font-weight="500">
            Min
          </text>
        </g>
        
        <!-- Q1 -->
        <g transform="translate(-130, 0)">
          <circle cx="0" cy="0" r="5" fill="#a855f7" :stroke="svgColors.dotStroke" stroke-width="1.5" />
          <text x="10" y="4" :fill="svgColors.legendText" font-size="12" font-family="'DM Sans', sans-serif" font-weight="500">
            Q1
          </text>
        </g>
        
        <!-- Q3 -->
        <g transform="translate(-60, 0)">
          <circle cx="0" cy="0" r="5" fill="#7c3aed" :stroke="svgColors.dotStroke" stroke-width="1.5" />
          <text x="10" y="4" :fill="svgColors.legendText" font-size="12" font-family="'DM Sans', sans-serif" font-weight="500">
            Q3
          </text>
        </g>
        
        <!-- Max -->
        <g transform="translate(10, 0)">
          <circle cx="0" cy="0" r="5" fill="#C67DFF" :stroke="svgColors.dotStroke" stroke-width="1.5" />
          <text x="10" y="4" :fill="svgColors.legendText" font-size="12" font-family="'DM Sans', sans-serif" font-weight="500">
            Max
          </text>
        </g>
        
        <!-- Average -->
        <g transform="translate(80, 0)">
          <line x1="0" y1="0" x2="14" y2="0" stroke="#f97316" stroke-width="2.5" stroke-dasharray="6,4" />
          <text x="18" y="4" :fill="svgColors.legendText" font-size="12" font-family="'DM Sans', sans-serif" font-weight="500">
            Avg
          </text>
        </g>
        
        <!-- Median -->
        <g transform="translate(150, 0)">
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

interface BoxplotData {
  label: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  average?: number;
  responseCount?: number;
  isTotal?: boolean;
  centerX?: number;
  minY?: number;
  q1Y?: number;
  medianY?: number;
  q3Y?: number;
  maxY?: number;
  averageY?: number;
}

const props = withDefaults(defineProps<{
  boxplotData: BoxplotData[];
  chartWidth?: number;
  chartHeight?: number;
  chartMargin?: number;
  chartBottomMargin?: number;
  showLegend?: boolean;
  theme?: Theme;
}>(), {
  chartWidth: 800,
  chartHeight: 400,
  chartMargin: 70,
  chartBottomMargin: 90,
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
  // Axis
  axis: isDark.value ? '#9ca3af' : '#475569',
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
  text: ''
});

const capitalizeText = (text: string): string => {
  if (typeof text === 'string') {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  return text;
};

const showTooltip = (event: MouseEvent, text: string) => {
  const svg = (event.currentTarget as SVGElement).closest('svg');
  if (!svg) return;
  
  const rect = svg.getBoundingClientRect();
  const point = svg.createSVGPoint();
  point.x = event.clientX - rect.left;
  point.y = event.clientY - rect.top;
  
  tooltip.value = {
    visible: true,
    x: point.x,
    y: point.y - 20,
    text: text
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
  max-height: 500px;
  background: var(--kiut-bg-chart-wrapper);
  border-radius: 16px;
  position: relative;
}

.boxplot-svg {
  display: block;
}

.hover-circle {
  transition: all 0.2s ease;
}

.hover-circle:hover {
  r: 8;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.hover-line {
  transition: all 0.2s ease;
}

.hover-line:hover {
  stroke-width: 5;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .chart-container {    
    min-height: 350px;
  }
}

@media (max-width: 480px) {
  .chart-container {
    min-height: 300px;
  }
}
</style>
