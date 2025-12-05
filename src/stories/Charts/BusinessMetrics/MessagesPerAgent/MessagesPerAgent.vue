<template>
    <article class="messages-per-agent-card">
        <header class="card-header">
            <div class="header-content">
                <h3 class="card-title">Messages per Agent</h3>
                <p class="card-subtitle">Agent interaction trends over time</p>
            </div>
        </header>

        <div class="card-body" v-if="!loading">
            <section v-if="chartData.labels && chartData.labels.length" class="chart-section">
                <LineChart :data="chartData" :options="chartOptions" />
            </section>
            <section v-else class="empty-state">
                <div class="empty-state-content">
                    <div class="empty-icon-wrapper">
                        <ChartBarIcon class="empty-icon" />
                    </div>
                    <p class="empty-title">No agent interactions data</p>
                    <p class="empty-description">Try adjusting the date range or check your filters to see agent interaction trends.</p>
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
import { computed } from 'vue'
import LineChart from '../../Line/ChartLine.vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'

// Tipo para los datos por día (clave: categoría, valor: cantidad)
interface AgentsByDay {
    [date: string]: {
        [category: string]: number;
    };
}

// Modelo de datos que viene de la API
interface AgentInteractionsData {
    airline_name?: string;
    start_date?: string;
    end_date?: string;
    agents_by_day?: AgentsByDay;
    total_unique_agents?: number;
}

// Mapa de colores por categoría de agente
const colorMap: Record<string, string> = {
    checkin: '#3B82F680',
    faq: '#EF444480',
    disruption_manager: '#F59E0B80',
    booking_manager: '#a78bfa80',
    triage: '#10B98180',
    seller: '#06B6D480',
    human: '#F472B680',
    agency: '#6366F180',
    loyalty: '#EAB30880'
};

const props = withDefaults(defineProps<{
    data?: AgentInteractionsData;
    loading?: boolean;
    options?: Record<string, any>;
}>(), {
    data: () => ({}),
    loading: false,
    options: undefined
});

// Computed que procesa agents_by_day y genera labels + datasets para el gráfico
const chartData = computed(() => {
    const daysData = props.data?.agents_by_day || {};
    const labels = Object.keys(daysData).sort();

    // Si no hay datos, retornar estructura vacía
    if (labels.length === 0) {
        return { labels: [], datasets: [] };
    }

    // Obtener todas las categorías únicas de todos los días
    const categoriesSet = new Set<string>();
    for (const dayData of Object.values(daysData)) {
        for (const category of Object.keys(dayData)) {
            categoriesSet.add(category);
        }
    }
    const categories = Array.from(categoriesSet);

    // Crear datasets para cada categoría
    const datasets = categories.map(category => ({
        label: category,
        data: labels.map(date => daysData[date]?.[category] || 0),
        borderColor: colorMap[category] || 'gray',
        tension: 0.3
    }));

    return {
        labels,
        datasets
    };
});

const chartOptions = computed(() => props.options);
</script>

<style scoped>
/* Main Card Styles */
.messages-per-agent-card {
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

.messages-per-agent-card:hover {
    box-shadow: 
        0 4px 6px rgba(0, 0, 0, 0.05),
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
}

/* Header Styles */
.card-header {
    margin-bottom: 32px;
    position: relative;
}

.header-content {
    width: 100%;
}

.card-title {
    font-family: 'Space Grotesk', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    line-height: 1.3;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #c67dff, #5d4b93);
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
    background: linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%);
    border-radius: 20px;
    margin: 0 auto 20px;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
}

.empty-icon {
    width: 40px;
    height: 40px;
    color: #8b5cf6;
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
    background: linear-gradient(to top, #c67dff 0%, #8b5cf6 50%, #7c3aed 100%);
    border-radius: 4px;
    animation: wave 1.5s ease-in-out infinite;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
}

.line-1 {
    height: 30%;
    animation-delay: 0s;
}

.line-2 {
    height: 50%;
    animation-delay: 0.1s;
}

.line-3 {
    height: 70%;
    animation-delay: 0.2s;
}

.line-4 {
    height: 50%;
    animation-delay: 0.3s;
}

.line-5 {
    height: 40%;
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
    .messages-per-agent-card {
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

