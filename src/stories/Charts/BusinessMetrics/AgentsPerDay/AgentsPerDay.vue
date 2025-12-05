<template>
    <article class="agents-per-day-card">
        <header class="card-header">
            <div class="header-content">
                <h3 class="card-title">Agents Total Messages per Day</h3>
                <p class="card-subtitle">Daily agent interactions (stacked)</p>
            </div>
        </header>

        <div class="card-body" v-if="!loading">
            <section v-if="chartData.labels && chartData.labels.length" class="chart-section">
                <BarChart :data="chartData" :options="chartOptions" :stacked="true" />
            </section>
            <section v-else class="empty-state">
                <div class="empty-state-content">
                    <div class="empty-icon-wrapper">
                        <ChartBarIcon class="empty-icon" />
                    </div>
                    <p class="empty-title">No agents data per day</p>
                    <p class="empty-description">Try adjusting the date range or check your filters to see daily agent interactions.</p>
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
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

// Tipo para los datos por día (clave: categoría, valor: cantidad)
interface AgentsByDay {
    [date: string]: {
        [category: string]: number;
    };
}

// Modelo de datos que viene de la API
interface AgentsPerDayData {
    airline_name?: string;
    start_date?: string;
    end_date?: string;
    agents_by_day?: AgentsByDay;
    total_unique_agents?: number;
}

// Mapa de colores por categoría de agente
const colorMap: Record<string, string> = {
    checkin: '#3B82F6',
    faq: '#EF4444',
    disruption_manager: '#F59E0B',
    booking_manager: '#a78bfa',
    triage: '#10B981',
    seller: '#06B6D4',
    human: '#F472B6',
    agency: '#6366F1',
    loyalty: '#EAB308'
};

const props = withDefaults(defineProps<{
    data?: AgentsPerDayData;
    loading?: boolean;
    options?: Record<string, any>;
    theme?: Theme;
}>(), {
    data: () => ({}),
    loading: false,
    options: undefined,
    theme: undefined
});

// Theme detection with prop fallback
const { isDark, colors } = useThemeDetection(toRef(props, 'theme'))

// Función para formatear fecha a DD-MM
const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}-${month}`;
};

// Computed que procesa agents_by_day y genera labels + datasets para el gráfico
const chartData = computed(() => {
    const daysData = props.data?.agents_by_day || {};
    const sortedKeys = Object.keys(daysData).sort();

    // Si no hay datos, retornar estructura vacía
    if (sortedKeys.length === 0) {
        return { labels: [], datasets: [] };
    }

    // Formatear labels como DD-MM
    const labels = sortedKeys.map(d => formatDate(d));

    // Obtener todas las categorías únicas de todos los días
    const categoriesSet = new Set<string>();
    for (const dayData of Object.values(daysData)) {
        for (const category of Object.keys(dayData)) {
            categoriesSet.add(category);
        }
    }
    const categories = Array.from(categoriesSet);

    // Función para obtener el color del borde (sin opacidad)
    const borderFromBg = (color: string): string => color;

    // Crear datasets para cada categoría
    const datasets = categories.map(category => ({
        label: category,
        data: sortedKeys.map(date => daysData[date]?.[category] || 0),
        backgroundColor: `${colorMap[category] || '#94a3b8'}80`,
        borderColor: borderFromBg(colorMap[category] || '#94a3b8'),
        borderWidth: 1
    }));

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
            }
        },
        scales: {
            x: {
                stacked: true,
                border: {
                    display: false,
                },
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        family: "'DM Sans', sans-serif",
                        size: 12,
                        weight: 500 as any,
                    },
                    color: colors.value.textSecondary,
                    padding: 8,
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                border: {
                    display: false,
                },
                grid: {
                    color: colors.value.gridLines,
                    lineWidth: 1,
                    drawTicks: false,
                },
                ticks: {
                    font: {
                        family: "'DM Sans', sans-serif",
                        size: 12,
                        weight: 500 as any,
                    },
                    color: colors.value.textSecondary,
                    padding: 8,
                }
            }
        }
    };
});

// Expose isDark for potential use in templates
defineExpose({ isDark })
</script>

<style scoped>
/* Main Card Styles */
.agents-per-day-card {
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--kiut-bg-card-gradient);
    border-radius: 20px;
    padding: 28px 32px;
    box-shadow: var(--kiut-shadow-card);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.agents-per-day-card:hover {
    box-shadow: var(--kiut-shadow-card-hover);
    transform: translateY(-2px);
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
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    line-height: 1.3;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, var(--kiut-primary-light), var(--kiut-primary-default));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.75rem;
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
}

.chart-section {
    animation: fadeIn 0.5s ease-out;
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
    min-height: 320px;
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
    box-shadow: var(--kiut-shadow-loader);
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
    .agents-per-day-card {
        padding: 20px 24px;
        border-radius: 16px;
    }

    .card-title {
        font-size: 20px;
    }

    .card-subtitle {
        font-size: 13px;
    }

    .card-header {
        margin-bottom: 24px;
    }
    
    .chart-section {
        padding-right: 8px;
    }
}
</style>
