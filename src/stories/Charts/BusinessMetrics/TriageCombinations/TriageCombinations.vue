<template>
  <article class="triage-combinations-card">
    <header class="card-header">
      <div class="header-content">
        <h3 class="card-title">Distribution of Number of Intents</h3>
        <p class="card-subtitle">Analysis of intent combinations per conversation</p>
      </div>
      <span class="total-badge">
        Total: {{ totalIncluded }}
      </span>
    </header>

    <div class="card-body" v-if="!loading">
      <template v-if="hasValue">
        <div class="chart-container">
          <BarChart :data="barData" :options="barOptions" />
        </div>

        <div class="table-container">
          <!-- Header de la tabla -->
          <div class="table-header">
            <div class="table-cell header-cell">Number of intentions</div>
            <div class="table-cell header-cell text-center">0</div>
            <div class="table-cell header-cell text-center">1</div>
            <div class="table-cell header-cell text-center">2</div>
            <div class="table-cell header-cell text-center">3</div>
            <div class="table-cell header-cell text-center">4 or more</div>
          </div>

          <!-- Fila de porcentajes -->
          <div class="table-row">
            <div class="table-cell row-label">% of total</div>
            <div class="table-cell text-center percentage-cell" :style="{ color: borderFromBg(colors.c0) }">
              {{ formatPercent(buckets.pct0) }}%
            </div>
            <div class="table-cell text-center percentage-cell" :style="{ color: borderFromBg(colors.c1) }">
              {{ formatPercent(buckets.pct1) }}%
            </div>
            <div class="table-cell text-center percentage-cell" :style="{ color: borderFromBg(colors.c2) }">
              {{ formatPercent(buckets.pct2) }}%
            </div>
            <div class="table-cell text-center percentage-cell" :style="{ color: borderFromBg(colors.c3) }">
              {{ formatPercent(buckets.pct3) }}%
            </div>
            <div class="table-cell text-center percentage-cell" :style="{ color: borderFromBg(colors.c4p) }">
              {{ formatPercent(buckets.pct4p) }}%
            </div>
          </div>

          <!-- Fila de conteos -->
          <div class="table-row">
            <div class="table-cell row-label">Count</div>
            <div class="table-cell text-center count-cell">{{ useNumberFormat(countsByIntentions[0]) }}</div>
            <div class="table-cell text-center count-cell">{{ useNumberFormat(countsByIntentions[1]) }}</div>
            <div class="table-cell text-center count-cell">{{ useNumberFormat(countsByIntentions[2]) }}</div>
            <div class="table-cell text-center count-cell">{{ useNumberFormat(countsByIntentions[3]) }}</div>
            <div class="table-cell text-center count-cell">{{ useNumberFormat(countsByIntentions['4p']) }}</div>
          </div>
        </div>

        <FooterExport v-if="enableExport" @export="handleExport" :loading="exportLoading" />
      </template>

      <template v-else>
        <div class="empty-state">
          <div class="empty-state-content">
            <div class="empty-icon-wrapper">
              <ChartBarIcon class="empty-icon" />
            </div>
            <p class="empty-title">No triage combinations data</p>
            <p class="empty-description">No intent distribution data found for the selected period. Try adjusting the date range.</p>
          </div>
        </div>
      </template>
    </div>

    <!-- Loading State -->
    <div class="loading-state" v-else>
      <div class="loading-container">
        <div class="chart-bars-loader">
          <div class="bar bar-1"></div>
          <div class="bar bar-2"></div>
          <div class="bar bar-3"></div>
          <div class="bar bar-4"></div>
          <div class="bar bar-5"></div>
        </div>
        <p class="loading-text">Loading intent distribution...</p>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import BarChart from '../../Bar/ChartBar.vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

// Modelo de datos que recibe el componente
interface TriageCombinationsData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  total_conversations?: number;
  combinations: {
    [key: string]: number;
  };
}

const props = withDefaults(defineProps<{
  data?: TriageCombinationsData;
  loading?: boolean;
  theme?: Theme;
  enableExport?: boolean;
  exportLoading?: boolean;
}>(), {
  data: () => ({ combinations: {} }),
  loading: false,
  theme: undefined,
  enableExport: false,
  exportLoading: false
});

const emit = defineEmits<{
  export: [format: ExportFormat]
}>()

const handleExport = (format: ExportFormat) => {
  emit('export', format)
}

// Theme detection with prop fallback
const { isDark, colors: themeColors } = useThemeDetection(toRef(props, 'theme'))

// Computed para contar conversaciones por número de intenciones (además de triage)
const countsByIntentions = computed(() => {
  const combos = props.data?.combinations || {}
  const map = { 0: 0, 1: 0, 2: 0, 3: 0, '4p': 0 }
  
  for (const [combo, count] of Object.entries(combos)) {
    const intentions = combo.split('+').filter(Boolean)
    // Only consider combos that include triage
    if (!intentions.includes('triage')) continue
    // 0 intentions = only triage
    const others = intentions.filter(i => i !== 'triage').length
    if (others >= 4) map['4p'] += Number(count) || 0
    else map[others] += Number(count) || 0
  }
  return map
})

const totalIncluded = computed(() => {
  const c = countsByIntentions.value
  return c[0] + c[1] + c[2] + c[3] + c['4p'] || 0
})

const hasValue = computed(() => {
  return Object.keys(props.data?.combinations || {}).length > 0
})

const buckets = computed(() => {
  const total = totalIncluded.value
  if (!total) return { pct0: 0, pct1: 0, pct2: 0, pct3: 0, pct4p: 0 }
  const c = countsByIntentions.value
  return {
    pct0: (c[0] / total) * 100,
    pct1: (c[1] / total) * 100,
    pct2: (c[2] / total) * 100,
    pct3: (c[3] / total) * 100,
    pct4p: (c['4p'] / total) * 100,
  }
})

// Colores para cada bucket
const colors = {
  c0: '#ef444480',    // Rojo (0 intenciones adicionales)
  c1: '#10b98180',    // Verde (1 intención adicional)
  c2: '#f59e0b80',    // Ámbar (2 intenciones adicionales)
  c3: '#a78bfa80',    // Púrpura (3 intenciones adicionales)
  c4p: '#94a3b880',   // Gris (4+ intenciones adicionales)
}

const borderFromBg = (bg: string) => bg?.replace('80', '') || '#888888'

const barData = computed(() => ({
  labels: ['Distribution'],
  datasets: [
    {
      label: '0',
      data: [buckets.value.pct0],
      backgroundColor: colors.c0,
      borderColor: borderFromBg(colors.c0),
      borderWidth: 1,
    },
    {
      label: '1',
      data: [buckets.value.pct1],
      backgroundColor: colors.c1,
      borderColor: borderFromBg(colors.c1),
      borderWidth: 1,
    },
    {
      label: '2',
      data: [buckets.value.pct2],
      backgroundColor: colors.c2,
      borderColor: borderFromBg(colors.c2),
      borderWidth: 1,
    },
    {
      label: '3',
      data: [buckets.value.pct3],
      backgroundColor: colors.c3,
      borderColor: borderFromBg(colors.c3),
      borderWidth: 1,
    },
    {
      label: '4+',
      data: [buckets.value.pct4p],
      backgroundColor: colors.c4p,
      borderColor: borderFromBg(colors.c4p),
      borderWidth: 1,
    },
  ],
}))

const barOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      backgroundColor: themeColors.value.tooltipBg,
      titleColor: themeColors.value.tooltipText,
      bodyColor: themeColors.value.tooltipText,
      borderColor: isDark.value ? 'rgba(198, 125, 255, 0.2)' : 'rgba(148, 163, 184, 0.2)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      titleFont: {
        family: "'DM Sans', sans-serif",
        size: 13,
        weight: 600 as any,
      },
      bodyFont: {
        family: "'DM Sans', sans-serif",
        size: 12,
        weight: 500 as any,
      },
      callbacks: {
        label: (ctx: any) => `${ctx.dataset.label} intent(s): ${Number(ctx.raw || 0).toFixed(0)}%`,
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      stacked: true,
      max: 100,
      grid: { display: false },
      ticks: { display: false },
      border: { display: false },
    },
    y: {
      stacked: true,
      grid: { display: false },
      ticks: { display: false },
      border: { display: false },
    },
  },
}))

const formatPercent = (n: number) => `${(Number(n) || 0).toFixed(0)}`

defineExpose({ isDark })
</script>

<style scoped>
/* Main Card Styles */
.triage-combinations-card {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--kiut-bg-card-gradient);
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: var(--kiut-shadow-card);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.triage-combinations-card:hover {
  box-shadow: var(--kiut-shadow-card-hover);
  transform: translateY(-2px);
}

/* Header Styles */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  gap: 16px;
}

.header-content {
  flex: 1;
  text-align: left;
}

.card-title {
  font-family: 'Space Grotesk', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.75rem;
  margin: 0;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--kiut-primary-light), var(--kiut-primary-default));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-subtitle {
  font-size: .875rem;
  font-weight: 400;
  color: var(--kiut-text-secondary);
  margin: 0px;
  line-height: 1.25rem;
}

.total-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(198, 125, 255, 0.08) 100%);
  color: var(--kiut-text-primary);
  border: 1px solid var(--kiut-border-light);
  white-space: nowrap;
}

/* Card Body */
.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Chart Container */
.chart-container {
  height: 100px;
  margin-bottom: 4px;
}

/* Table Container */
.table-container {
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid var(--kiut-border-light);
  background: var(--kiut-bg-card);
}

.table-header {
  display: grid;
  grid-template-columns: 1.5fr repeat(5, 1fr);
  background: var(--kiut-bg-stats-badge);
  border-bottom: 1px solid var(--kiut-border-light);
}

.table-row {
  display: grid;
  grid-template-columns: 1.5fr repeat(5, 1fr);
  transition: background-color 0.2s ease;
}

.table-row:not(:last-child) {
  border-bottom: 1px solid var(--kiut-border-light);
}

.table-row:hover {
  background: var(--kiut-bg-stats-badge);
}

.table-cell {
  padding: 12px 16px;
  font-size: 0.875rem;
}

.header-cell {
  font-weight: 600;
  color: var(--kiut-text-primary);
}

.row-label {
  font-weight: 500;
  color: var(--kiut-text-primary);
}

.percentage-cell {
  font-weight: 700;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.01em;
}

.count-cell {
  font-weight: 500;
  color: var(--kiut-text-secondary);
}

.text-center {
  text-align: center;
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
}

.empty-state-content {
  text-align: center;
  max-width: 360px;
  animation: fadeIn 0.6s ease-out;
}

.empty-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: var(--kiut-bg-empty-icon);
  border-radius: 20px;
  margin: 0 auto 20px;
  box-shadow: var(--kiut-shadow-empty-icon);
}

.empty-icon {
  width: 40px;
  height: 40px;
  color: var(--kiut-primary);
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--kiut-text-primary);
  margin: 0 0 8px 0;
  letter-spacing: -0.01em;
}

.empty-description {
  font-size: 14px;
  font-weight: 400;
  color: var(--kiut-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Loading State */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 380px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.chart-bars-loader {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
  height: 100px;
  margin-bottom: 24px;
}

.bar {
  width: 8px;
  background: linear-gradient(to top, var(--kiut-primary-light) 0%, var(--kiut-primary) 50%, var(--kiut-primary-hover) 100%);
  border-radius: 4px;
  animation: wave 1.5s ease-in-out infinite;
  box-shadow: var(--kiut-shadow-loader);
}

.bar-1 { height: 30%; animation-delay: 0s; }
.bar-2 { height: 50%; animation-delay: 0.1s; }
.bar-3 { height: 70%; animation-delay: 0.2s; }
.bar-4 { height: 50%; animation-delay: 0.3s; }
.bar-5 { height: 40%; animation-delay: 0.4s; }

.loading-text {
  font-size: 15px;
  font-weight: 500;
  color: var(--kiut-text-secondary);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  letter-spacing: -0.01em;
}

/* Animations */
@keyframes wave {
  0%, 100% {
    transform: scaleY(1);
    opacity: 0.7;
  }
  50% {
    transform: scaleY(1.6);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
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
  .triage-combinations-card {
    padding: 20px 24px;
    border-radius: 16px;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .card-title {
    font-size: 1rem;
  }

  .card-subtitle {
    font-size: 0.8125rem;
  }

  .total-badge {
    align-self: flex-start;
  }

  .table-container {
    overflow-x: auto;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1.2fr repeat(5, 0.8fr);
  }

  .table-cell {
    padding: 10px 8px;
    font-size: 0.8125rem;
  }

  .chart-container {
    height: 80px;
  }
}
</style>
