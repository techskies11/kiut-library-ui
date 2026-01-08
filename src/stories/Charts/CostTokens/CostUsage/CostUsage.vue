<template>
    <article class="cost-usage-card">
        <header class="card-header">
            <div class="header-content">
                <h3 class="card-title">Cost Usage</h3>
                <p class="card-subtitle">Cost breakdown over time (stacked)</p>
            </div>
        </header>

        <div class="card-body" v-if="!loading">
            <section v-if="chartData.labels && chartData.labels.length" class="chart-section">
                <div class="chart-container">
                    <BarChart :data="chartData" :options="chartOptions" :stacked="true" />
                </div>
                
                <footer class="kpi-grid">
                    <div class="kpi-card">
                        <span class="kpi-label">Total Cost</span>
                        <span class="kpi-value">{{ useCurrencyFormat(data.total_cost) }}</span>
                    </div>
                    <div class="kpi-card">
                        <span class="kpi-label">Input Cost</span>
                        <span class="kpi-value">{{ useCurrencyFormat(totalInputCost) }}</span>
                    </div>
                    <div class="kpi-card">
                        <span class="kpi-label">Output Cost</span>
                        <span class="kpi-value">{{ useCurrencyFormat(totalOutputCost) }}</span>
                    </div>
                    <div class="kpi-card">
                        <span class="kpi-label">Cache Read</span>
                        <span class="kpi-value">{{ useCurrencyFormat(totalCacheReadCost) }}</span>
                    </div>
                    <div class="kpi-card">
                        <span class="kpi-label">Cache Write</span>
                        <span class="kpi-value">{{ useCurrencyFormat(totalCacheWriteCost) }}</span>
                    </div>
                    <div class="kpi-card highlighted">
                        <span class="kpi-label">Avg / Conv.</span>
                        <span class="kpi-value gradient-text">{{ useCurrencyFormat(data.avg_cost_per_conversation) }}</span>
                    </div>
                </footer>
            </section>
            <section v-else class="empty-state">
                <div class="empty-state-content">
                    <div class="empty-icon-wrapper">
                        <ChartBarIcon class="empty-icon" />
                    </div>
                    <p class="empty-title">No cost usage data</p>
                    <p class="empty-description">Try adjusting the date range or check your filters to see cost breakdown trends.</p>
                </div>
            </section>
        </div>
        
        <!-- Loading state con animación CSS personalizada -->
        <div class="loading-state" v-else>
            <div class="loading-container">
                <div class="chart-lines-loader">
                    <div class="line line-1"></div>
                    <div class="line line-2"></div>
                    <div class="line line-3"></div>
                    <div class="line line-4"></div>
                    <div class="line line-5"></div>
                </div>
                <p class="loading-text">Loading chart data...</p>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import BarChart from '../../Bar/ChartBar.vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useCurrencyFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

// Modelo de datos para el uso de costos por día
interface CostDayData {
    input_tokens: number;
    output_tokens: number;
    cache_read_tokens: number;
    cache_write_tokens: number;
    total_tokens: number;
    input_cost: number;
    output_cost: number;
    cache_read_cost: number;
    cache_write_cost: number;
    total_cost: number;
}

interface CostsByDay {
    [date: string]: CostDayData;
}

// Modelo de datos que recibe el componente
interface CostUsageData {
    airline_name?: string;
    start_date?: string;
    end_date?: string;
    costs_by_day?: CostsByDay;
    total_cost?: number;
    avg_cost_per_conversation?: number;
}

const props = withDefaults(defineProps<{
    data?: CostUsageData;
    loading?: boolean;
    options?: Record<string, any>;
    theme?: Theme;
    enableExport?: boolean;
    exportLoading?: boolean;
}>(), {
    data: () => ({}),
    loading: false,
    options: undefined,
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
const { isDark, colors } = useThemeDetection(toRef(props, 'theme'))

// Función para formatear fecha a DD-MM
const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}-${month}`;
};

// Mapa de colores para los tipos de costos (mismos que tokens para consistencia)
const costColors = {
    input: '#a78bfa',
    output: '#f59e0b',
    cache_read: '#10b981',
    cache_write: '#ef4444'
};

// Computed para calcular totales por categoría
const totalInputCost = computed(() => {
    const costsData = props.data?.costs_by_day || {};
    return Object.values(costsData).reduce((sum, day) => sum + (day.input_cost || 0), 0);
});

const totalOutputCost = computed(() => {
    const costsData = props.data?.costs_by_day || {};
    return Object.values(costsData).reduce((sum, day) => sum + (day.output_cost || 0), 0);
});

const totalCacheReadCost = computed(() => {
    const costsData = props.data?.costs_by_day || {};
    return Object.values(costsData).reduce((sum, day) => sum + (day.cache_read_cost || 0), 0);
});

const totalCacheWriteCost = computed(() => {
    const costsData = props.data?.costs_by_day || {};
    return Object.values(costsData).reduce((sum, day) => sum + (day.cache_write_cost || 0), 0);
});

// Computed que procesa costs_by_day y genera labels + datasets para el gráfico
const chartData = computed(() => {
    const costsData = props.data?.costs_by_day || {};
    const sortedKeys = Object.keys(costsData).sort();

    if (sortedKeys.length === 0) {
        return { labels: [], datasets: [] };
    }

    const labels = sortedKeys.map(d => formatDate(d));

    // Mostrar las 4 categorías de costos en el mismo orden
    const datasets = [
        {
            label: 'Input Cost',
            data: sortedKeys.map(date => costsData[date]?.input_cost || 0),
            backgroundColor: `${costColors.input}80`,
            borderColor: costColors.input,
            borderWidth: 1
        },
        {
            label: 'Output Cost',
            data: sortedKeys.map(date => costsData[date]?.output_cost || 0),
            backgroundColor: `${costColors.output}80`,
            borderColor: costColors.output,
            borderWidth: 1
        },
        {
            label: 'Cache Read Cost',
            data: sortedKeys.map(date => costsData[date]?.cache_read_cost || 0),
            backgroundColor: `${costColors.cache_read}80`,
            borderColor: costColors.cache_read,
            borderWidth: 1
        },
        {
            label: 'Cache Write Cost',
            data: sortedKeys.map(date => costsData[date]?.cache_write_cost || 0),
            backgroundColor: `${costColors.cache_write}80`,
            borderColor: costColors.cache_write,
            borderWidth: 1
        }
    ];

    return {
        labels,
        datasets
    };
});

const chartOptions = computed(() => {
    if (props.options) return props.options;
    
    return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
                align: 'end' as const,
                labels: {
                    font: {
                        family: "'DM Sans', sans-serif",
                        size: 13,
                        weight: 500 as any,
                    },
                    color: colors.value.textSecondary,
                    padding: 12,
                    boxWidth: 12,
                    boxHeight: 12,
                    borderRadius: 4,
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: colors.value.tooltipBg,
                titleColor: colors.value.tooltipText,
                bodyColor: colors.value.tooltipText,
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
                    label: function(context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += useCurrencyFormat(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                border: { display: false },
                grid: { display: false },
                ticks: {
                    font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 as any },
                    color: colors.value.textSecondary,
                    padding: 8,
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                border: { display: false },
                grid: {
                    color: colors.value.gridLines,
                    lineWidth: 1,
                    drawTicks: false,
                },
                ticks: {
                    font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 as any },
                    color: colors.value.textSecondary,
                    padding: 8,
                    callback: function(value: any) {
                        return useCurrencyFormat(value);
                    }
                }
            }
        }
    };
});

defineExpose({ isDark })
</script>

<style scoped>
/* Main Card Styles */
.cost-usage-card {
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--kiut-bg-card-gradient);
    border-radius: 20px;
    padding: 28px 32px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
}

/* Header Styles */
.card-header {
    margin-bottom: 32px;
    position: relative;
}

.header-content {
    width: 100%;
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

/* Card Body */
.card-body {
    min-height: 300px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.chart-section {
    animation: fadeIn 0.5s ease-out;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.chart-container {
    height: 320px;
    margin-bottom: 24px;
}

/* Footer KPI Grid */
.kpi-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
    margin-top: auto;
}

.kpi-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 16px;
    background: var(--kiut-bg-stats-badge);
    border: 1px solid var(--kiut-border-light);
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: center;
}

.kpi-card:hover {
    background: var(--kiut-bg-card);
    border-color: var(--kiut-border-color);
}

.kpi-card.highlighted {
    border-color: var(--kiut-primary-light);
    background: var(--kiut-bg-card);
}

.kpi-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--kiut-text-secondary);
    line-height: 1.2;
}

.kpi-value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--kiut-text-primary);
    letter-spacing: -0.02em;
    line-height: 1.2;
}

.gradient-text {
    background: linear-gradient(135deg, var(--kiut-primary-light) 0%, var(--kiut-primary-default) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Empty State */
.empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 320px;
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
    min-height: 320px;
    flex: 1;
}

.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.chart-lines-loader {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 10px;
    height: 100px;
    margin-bottom: 24px;
}

.line {
    width: 8px;
    background: linear-gradient(to top, var(--kiut-primary-light) 0%, var(--kiut-primary) 50%, var(--kiut-primary-hover) 100%);
    border-radius: 4px;
    animation: wave 1.5s ease-in-out infinite;
}

.line-1 { height: 30%; animation-delay: 0s; }
.line-2 { height: 50%; animation-delay: 0.1s; }
.line-3 { height: 70%; animation-delay: 0.2s; }
.line-4 { height: 50%; animation-delay: 0.3s; }
.line-5 { height: 40%; animation-delay: 0.4s; }

.loading-text {
    font-size: 15px;
    font-weight: 500;
    color: var(--kiut-text-secondary);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    letter-spacing: -0.01em;
}

/* Animations */
@keyframes wave {
    0%, 100% { transform: scaleY(1); opacity: 0.7; }
    50% { transform: scaleY(1.6); opacity: 1; }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Responsive Design */
@media (max-width: 1280px) {
    .kpi-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .cost-usage-card {
        padding: 20px 24px;
        border-radius: 16px;
    }
    .card-title { font-size: 20px; }
    .card-subtitle { font-size: 13px; }
    .card-header { margin-bottom: 24px; }
    .chart-section { padding-right: 8px; }

    .kpi-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
    }

    .kpi-card {
        padding: 10px 12px;
    }

    .kpi-label {
        font-size: 0.6875rem;
    }

    .kpi-value {
        font-size: 1.125rem;
    }
}
</style>

