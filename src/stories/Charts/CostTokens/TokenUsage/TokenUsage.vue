<template>
  <ChartMetricContainer
    class="h-full min-h-0"
    title="Token Usage"
    subtitle="Token consumption over time (stacked)"
    :collapsible="false"
  >
    <div class="flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]">

        <div class="card-body" v-if="!loading">
            <section v-if="chartData.labels && chartData.labels.length" class="chart-section">
                <div class="chart-container">
                    <BarChart :data="chartData" :options="chartOptions" :stacked="true" />
                </div>
                
                <footer
                    class="mt-auto flex w-full min-w-0 flex-nowrap items-stretch gap-2 sm:gap-3"
                >
                    <CardInfo
                        class="min-w-0 flex-1"
                        title="Total Tokens"
                        :value="useNumberFormat(data.total_tokens)"
                    />
                    <CardInfo
                        class="min-w-0 flex-1"
                        title="Input"
                        :value="useNumberFormat(data.total_input_tokens)"
                        :color="tokenColors.input"
                    />
                    <CardInfo
                        class="min-w-0 flex-1"
                        title="Output"
                        :value="useNumberFormat(data.total_output_tokens)"
                        :color="tokenColors.output"
                    />
                    <CardInfo
                        class="min-w-0 flex-1"
                        title="Cache Read"
                        :value="useNumberFormat(data.total_cache_read_tokens)"
                        :color="tokenColors.cache_read"
                    />
                    <CardInfo
                        class="min-w-0 flex-1"
                        title="Cache Write"
                        :value="useNumberFormat(data.total_cache_write_tokens)"
                        :color="tokenColors.cache_write"
                    />
                </footer>
            </section>
            <section v-else class="empty-state">
                <div class="empty-state-content">
                    <div class="empty-icon-wrapper">
                        <ChartBarIcon class="empty-icon" />
                    </div>
                    <p class="empty-title">No token usage data</p>
                    <p class="empty-description">Try adjusting the date range or check your filters to see token consumption trends.</p>
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
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import BarChart from '../../Bar/ChartBar.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import CardInfo from '../../Utils/CardInfo/CardInfo.vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

// Modelo de datos para el uso de tokens por día
interface TokenDayData {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
    cache_read_tokens?: number;
    cache_write_tokens?: number;
}

interface TokensByDay {
    [date: string]: TokenDayData;
}

// Modelo de datos que recibe el componente
interface TokenUsageData {
    airline_name?: string;
    start_date?: string;
    end_date?: string;
    tokens_by_day?: TokensByDay;
    total_tokens?: number;
    total_input_tokens?: number;
    total_cache_read_tokens?: number;
    total_cache_write_tokens?: number;
    total_output_tokens?: number;
}

const props = withDefaults(defineProps<{
    data?: TokenUsageData;
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

/** Colores alineados con el gráfico apilado (CardInfo + datasets). */
const tokenColors = {
    input: '#a78bfa',
    output: '#f59e0b',
    cache_read: '#10b981',
    cache_write: '#ef4444'
};

// Computed que procesa tokens_by_day y genera labels + datasets para el gráfico
const chartData = computed(() => {
    const tokensData = props.data?.tokens_by_day || {};
    const sortedKeys = Object.keys(tokensData).sort();

    if (sortedKeys.length === 0) {
        return { labels: [], datasets: [] };
    }

    const labels = sortedKeys.map(d => formatDate(d));

    // Siempre mostrar las 4 categorías en el mismo orden que la imagen de referencia
    const datasets = [
        {
            label: 'Input Tokens',
            data: sortedKeys.map(date => tokensData[date]?.input_tokens || 0),
            backgroundColor: `${tokenColors.input}80`,
            borderColor: tokenColors.input,
            borderWidth: 1
        },
        {
            label: 'Output Tokens',
            data: sortedKeys.map(date => tokensData[date]?.output_tokens || 0),
            backgroundColor: `${tokenColors.output}80`,
            borderColor: tokenColors.output,
            borderWidth: 1
        },
        {
            label: 'Cache Read',
            data: sortedKeys.map(date => tokensData[date]?.cache_read_tokens || 0),
            backgroundColor: `${tokenColors.cache_read}80`,
            borderColor: tokenColors.cache_read,
            borderWidth: 1
        },
        {
            label: 'Cache Write',
            data: sortedKeys.map(date => tokensData[date]?.cache_write_tokens || 0),
            backgroundColor: `${tokenColors.cache_write}80`,
            borderColor: tokenColors.cache_write,
            borderWidth: 1
        }
    ];

    return {
        labels,
        datasets
    };
});

const chartFontFamily =
    "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

/** Mismo tamaño de caja que ChartBar.vue (LEGEND_BOX_PX). */
const LEGEND_BOX_PX = 10

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
                position: 'bottom' as const,
                align: 'center' as const,
                labels: {
                    font: {
                        family: chartFontFamily,
                        size: 13,
                        weight: '500',
                    },
                    color: colors.value.textSecondary,
                    padding: 12,
                    boxWidth: LEGEND_BOX_PX,
                    boxHeight: LEGEND_BOX_PX,
                    usePointStyle: false,
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
                    family: chartFontFamily,
                    size: 13,
                    weight: '600',
                },
                bodyFont: {
                    family: chartFontFamily,
                    size: 12,
                    weight: '500',
                },
            }
        },
        scales: {
            x: {
                stacked: true,
                border: { display: false },
                grid: { display: false },
                ticks: {
                    font: { family: chartFontFamily, size: 12, weight: '500' },
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
                    font: { family: chartFontFamily, size: 12, weight: '500' },
                    color: colors.value.textSecondary,
                    padding: 8,
                }
            }
        }
    };
});

defineExpose({ isDark })
</script>

<style scoped>
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
    margin-bottom: 24px;
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
@media (max-width: 768px) {
    .chart-section { padding-right: 8px; }
}
</style>
