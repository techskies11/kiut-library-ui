<template>
    <article class="agents-per-day-card">
        <header class="card-header">
            <div class="header-accent"></div>
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
                <div class="bar-loader">
                    <div class="bar bar-1"></div>
                    <div class="bar bar-2"></div>
                    <div class="bar bar-3"></div>
                    <div class="bar bar-4"></div>
                    <div class="bar bar-5"></div>
                </div>
                <p class="loading-text">Loading chart data...</p>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BarChart from '../../Bar/ChartBar.vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'

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
}>(), {
    data: () => ({}),
    loading: false,
    options: undefined
});

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

const defaultOptions = {
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
                color: '#475569',
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
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#f1f5f9',
            bodyColor: '#e2e8f0',
            borderColor: 'rgba(148, 163, 184, 0.2)',
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
                color: '#64748b',
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
                color: 'rgba(148, 163, 184, 0.12)',
                lineWidth: 1,
                drawTicks: false,
            },
            ticks: {
                font: {
                    family: "'DM Sans', sans-serif",
                    size: 12,
                    weight: 500 as any,
                },
                color: '#64748b',
                padding: 8,
            }
        }
    }
};

const chartOptions = computed(() => props.options || defaultOptions);
</script>

<style scoped>
/* Main Card Styles */
.agents-per-day-card {
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: linear-gradient(to bottom, #ffffff 0%, #fafafa 100%);
    border-radius: 20px;
    padding: 28px 32px;
    box-shadow: 
        0 1px 3px rgba(0, 0, 0, 0.05),
        0 10px 15px -3px rgba(0, 0, 0, 0.08),
        0 0 0 1px rgba(0, 0, 0, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.agents-per-day-card:hover {
    box-shadow: 
        0 4px 6px rgba(0, 0, 0, 0.05),
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
}

/* Header Styles */
.card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 32px;
    position: relative;
}

.header-accent {
    width: 4px;
    height: 40px;
    background: linear-gradient(to bottom, #f43f5e, #ec4899);
    border-radius: 4px;
    flex-shrink: 0;
}

.header-content {
    flex: 1;
}

.card-title {
    font-family: 'Space Grotesk', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    margin: 0;
    line-height: 1.3;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #f43f5e, #be123c);
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
    color: #64748b;
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
    background: linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%);
    border-radius: 20px;
    margin: 0 auto 20px;
    box-shadow: 0 4px 12px rgba(244, 63, 94, 0.15);
}

.empty-icon {
    width: 40px;
    height: 40px;
    color: #f43f5e;
}

.empty-title {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 8px 0;
    letter-spacing: -0.01em;
}

.empty-description {
    font-size: 14px;
    font-weight: 400;
    color: #64748b;
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

/* Bar Loader Animation */
.bar-loader {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 8px;
    height: 100px;
    margin-bottom: 24px;
}

.bar {
    width: 16px;
    background: linear-gradient(to top, #f43f5e 0%, #ec4899 50%, #f472b6 100%);
    border-radius: 4px;
    animation: bar-wave 1.2s ease-in-out infinite;
    box-shadow: 0 4px 12px rgba(244, 63, 94, 0.3);
}

.bar-1 {
    height: 40%;
    animation-delay: 0s;
}

.bar-2 {
    height: 70%;
    animation-delay: 0.1s;
}

.bar-3 {
    height: 50%;
    animation-delay: 0.2s;
}

.bar-4 {
    height: 85%;
    animation-delay: 0.3s;
}

.bar-5 {
    height: 60%;
    animation-delay: 0.4s;
}

.loading-text {
    font-size: 15px;
    font-weight: 500;
    color: #64748b;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    letter-spacing: -0.01em;
}

/* Animations */
@keyframes bar-wave {
    0%, 100% {
        transform: scaleY(1);
        opacity: 0.7;
    }
    50% {
        transform: scaleY(1.3);
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

    .header-accent {
        height: 32px;
    }
}
</style>

