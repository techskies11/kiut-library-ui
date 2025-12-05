<template>
    <article class="top-agents-card">
        <header class="card-header">
            <div class="header-accent"></div>
            <div class="header-content">
                <h3 class="card-title">Top Agents</h3>
                <p class="card-subtitle">Interactions by agent (excluding triage)</p>
            </div>
        </header>

        <div class="card-body" v-if="!loading">
            <section v-if="chartData.labels && chartData.labels.length" class="chart-section">
                <PieChart :data="chartData" :options="chartOptions" />
            </section>
            <section v-else class="empty-state">
                <div class="empty-state-content">
                    <div class="empty-icon-wrapper">
                        <ChartPieIcon class="empty-icon" />
                    </div>
                    <p class="empty-title">No top agents data</p>
                    <p class="empty-description">Try adjusting the date range or check your filters to see agent interaction trends.</p>
                </div>
            </section>
        </div>
        
        <!-- Loading state con animación CSS personalizada -->
        <div class="loading-state" v-else>
            <div class="loading-container">
                <div class="pie-loader">
                    <div class="pie-slice slice-1"></div>
                    <div class="pie-slice slice-2"></div>
                    <div class="pie-slice slice-3"></div>
                    <div class="pie-slice slice-4"></div>
                </div>
                <p class="loading-text">Loading chart data...</p>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PieChart from '../../Pie/PieChart.vue'
import { ChartPieIcon } from '@heroicons/vue/24/outline'

// Tipo para un agente individual
interface TopAgent {
    agent_type: string;
    total_usage?: number;
    total_tokens?: number;
    total_cost?: number;
    total_input_tokens?: number;
    total_output_tokens?: number;
    total_read_tokens?: number;
    total_write_tokens?: number;
    total_input_tokens_cost?: number;
    total_output_tokens_cost?: number;
    total_read_tokens_cost?: number;
    total_write_tokens_cost?: number;
    conversations: number;
    avg_tokens_per_conversation?: number;
    avg_cost_per_conversation?: number;
}

// Modelo de datos que viene de la API
interface TopAgentsData {
    airline_name?: string;
    start_date?: string;
    end_date?: string;
    top_agents?: TopAgent[];
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
    data?: TopAgentsData;
    loading?: boolean;
    options?: Record<string, any>;
}>(), {
    data: () => ({}),
    loading: false,
    options: undefined
});

// Computed que procesa top_agents y genera labels + datasets para el gráfico
const chartData = computed(() => {
    const topAgents = props.data?.top_agents || [];

    // Filtrar agentes de tipo triage
    const filteredAgents = topAgents.filter(agent => 
        agent.agent_type?.toLowerCase() !== 'triage'
    );

    // Si no hay datos, retornar estructura vacía
    if (filteredAgents.length === 0) {
        return { labels: [], datasets: [] };
    }

    // Calcular total de conversaciones para porcentajes
    const totalConversations = filteredAgents.reduce(
        (sum, agent) => sum + (Number(agent.conversations) || 0), 
        0
    );

    // Generar colores para cada agente
    const colors = filteredAgents.map(agent => {
        const agentKey = agent.agent_type?.toLowerCase();
        return colorMap[agentKey] || '#94a3b8';
    });

    // Colores con opacidad para el fondo
    const backgroundColors = colors.map(color => `${color}80`);

    return {
        labels: filteredAgents.map(agent => {
            const count = Number(agent.conversations) || 0;
            const pct = totalConversations ? (count / totalConversations) * 100 : 0;
            return `${agent.agent_type} - ${count.toLocaleString()} (${pct.toFixed(1)}%)`;
        }),
        datasets: [
            {
                data: filteredAgents.map(agent => agent.conversations),
                backgroundColor: backgroundColors,
                borderColor: colors,
                borderWidth: 2
            }
        ]
    };
});

const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom' as const,
            labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                    family: "'DM Sans', sans-serif",
                    size: 13,
                    weight: 500 as any,
                },
                color: '#475569',
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
            callbacks: {
                label: (context: any) => {
                    const label = (context.label || '').toString().split(' - ')[0];
                    const value = Number(context.parsed) || 0;
                    const total = (context.dataset.data || []).reduce(
                        (acc: number, val: number) => acc + (Number(val) || 0), 
                        0
                    );
                    const percent = total ? ((value / total) * 100) : 0;
                    return `${label}: ${value.toLocaleString()} (${percent.toFixed(1)}%)`;
                }
            }
        }
    }
};

const chartOptions = computed(() => props.options || defaultOptions);
</script>

<style scoped>
/* Main Card Styles */
.top-agents-card {
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

.top-agents-card:hover {
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
    background: linear-gradient(to bottom, #a855f7, #ec4899);
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

/* Pie Loader Animation */
.pie-loader {
    position: relative;
    width: 100px;
    height: 100px;
    margin-bottom: 24px;
    animation: rotate 3s linear infinite;
}

.pie-slice {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%);
}

.slice-1 {
    background: linear-gradient(135deg, #a855f7, #8b5cf6);
    transform: rotate(0deg);
    animation: pulse-slice 1.5s ease-in-out infinite;
}

.slice-2 {
    background: linear-gradient(135deg, #ec4899, #f472b6);
    transform: rotate(90deg);
    animation: pulse-slice 1.5s ease-in-out infinite 0.2s;
}

.slice-3 {
    background: linear-gradient(135deg, #06b6d4, #22d3ee);
    transform: rotate(180deg);
    animation: pulse-slice 1.5s ease-in-out infinite 0.4s;
}

.slice-4 {
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
    transform: rotate(270deg);
    animation: pulse-slice 1.5s ease-in-out infinite 0.6s;
}

.loading-text {
    font-size: 15px;
    font-weight: 500;
    color: #64748b;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    letter-spacing: -0.01em;
}

/* Animations */
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes pulse-slice {
    0%, 100% {
        opacity: 0.6;
        transform: rotate(var(--rotation, 0deg)) scale(1);
    }
    50% {
        opacity: 1;
        transform: rotate(var(--rotation, 0deg)) scale(1.05);
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
    .top-agents-card {
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

