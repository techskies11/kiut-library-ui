<template>
  <ChartMetricContainer
    class="h-full min-h-0"
    title="Cost Per Conversation"
    subtitle="USD per conversation by agent"
    :collapsible="false"
    :loading="loading"
  >
    <template #headerExport>
      <FooterExport
        v-if="enableExport && !loading"
        variant="inline"
        @export="handleExport"
        :loading="exportLoading"
      />
    </template>
    <div class="flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]">

    <div class="card-body">
      <section v-if="chartData.labels && chartData.labels.length" class="chart-section">
        <div class="chart-container">
          <BarChart :data="chartData" :options="chartOptions" />
        </div>
        
        <footer class="kpi-grid">
          <CardInfo title="Total Agents" :value="String(topAgents.length)" />
          <CardInfo
            title="Total Conversations"
            :value="useNumberFormat(totalConversations)"
          />
          <CardInfo title="Total Cost" :value="useCurrencyFormat(totalCost)" />
          <CardInfo
            title="Avg Cost / Conv."
            :value="useCurrencyFormat(avgCostPerConversation)"
          />
        </footer>
      </section>

      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <ChartBarIcon class="empty-icon" />
          </div>
          <p class="empty-title">No cost per conversation data</p>
          <p class="empty-description">No agent data found for the selected period. Try adjusting the date range.</p>
        </div>
      </section>
    </div>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import BarChart from '../../Bar/ChartBar.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { CardInfo } from '../../Utils/CardInfo'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useCurrencyFormat, useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

// Modelo de datos para cada agente
interface TopAgent {
  agent_id?: string;
  agent_name?: string;
  agent_type?: string; // Nuevo campo del servicio
  avg_cost_per_conversation: number;
  avg_tokens_per_conversation: number;
  conversations: number;
  total_cost: number;
  total_tokens: number;
}

// Modelo de datos que recibe el componente
interface CostPerConversationData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  top_agents: TopAgent[];
  total_conversations?: number;
  total_cost?: number;
  overall_avg_cost_per_conversation?: number;
}

const props = withDefaults(defineProps<{
  data?: CostPerConversationData;
  loading?: boolean;
  options?: Record<string, any>;
  theme?: Theme;
  enableExport?: boolean;
  exportLoading?: boolean;
}>(), {
  data: () => ({ top_agents: [] }),
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

// Mapa de colores para los tipos de agentes
const agentColorMap: { [key: string]: string } = {
  'checkin': '#3B82F6',
  'faq': '#EF4444',
  'disruption_manager': '#F59E0B',
  'booking_manager': '#a78bfa',
  'triage': '#10B981',
  'seller': '#06B6D4',
  'human': '#F472B6',
  'customer_service': '#8b5cf6',
  'booking_assistant': '#06b6d4',
  'flight_info': '#f59e0b',
  'support': '#10b981',
};

// Función para normalizar el nombre del agente
const getAgentIdentifier = (agent: TopAgent): string => {
  return agent.agent_type || agent.agent_id || agent.agent_name || '';
};

// Función para obtener el nombre legible del agente
const getAgentDisplayName = (agent: TopAgent): string => {
  if (agent.agent_name) return agent.agent_name;
  
  // Convertir agent_type o agent_id a formato legible
  const identifier = getAgentIdentifier(agent);
  return identifier
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/V\d+$/, '')
    .trim();
};

// Función para obtener color por agent_id, agent_name o agent_type
const getAgentColor = (agent: TopAgent): string => {
  // Usar agent_type, agent_id o agent_name
  const identifier = getAgentIdentifier(agent).toLowerCase();
  
  // Buscar coincidencias en el mapa
  for (const [key, color] of Object.entries(agentColorMap)) {
    if (identifier.includes(key)) {
      return color;
    }
  }
  
  // Si no hay coincidencia, usar color gris por defecto
  return '#9ca3af';
};

// Computed para obtener los agentes ordenados por costo promedio descendente
const topAgents = computed(() => {
  const agents = props.data?.top_agents || [];
  return [...agents].sort((a, b) => b.avg_cost_per_conversation - a.avg_cost_per_conversation);
});

// Computed para calcular totales
const totalConversations = computed(() => {
  if (props.data?.total_conversations !== undefined) {
    return Number(props.data.total_conversations) || 0;
  }
  return topAgents.value.reduce((sum, agent) => sum + agent.conversations, 0);
});

const totalCost = computed(() => {
  if (props.data?.total_cost !== undefined) {
    return Number(props.data.total_cost) || 0;
  }
  return topAgents.value.reduce((sum, agent) => sum + agent.total_cost, 0);
});

const avgCostPerConversation = computed(() => {
  if (props.data?.overall_avg_cost_per_conversation !== undefined) {
    return Number(props.data.overall_avg_cost_per_conversation) || 0;
  }
  if (totalConversations.value === 0) return 0;
  return totalCost.value / totalConversations.value;
});

// Computed que procesa los agentes y genera el gráfico
const chartData = computed(() => {
  const agents = topAgents.value;

  if (agents.length === 0) {
    return { labels: [], datasets: [] };
  }

  // Usar la función getAgentDisplayName para obtener nombres legibles
  const labels = agents.map(agent => getAgentDisplayName(agent));
  const costs = agents.map(agent => agent.avg_cost_per_conversation);
  const colors = agents.map(agent => getAgentColor(agent));

  return {
    labels,
    datasets: [
      {
        label: 'USD per conversation',
        data: costs,
        backgroundColor: colors.map(c => `${c}80`),
        borderColor: colors,
        borderWidth: 1
      }
    ]
  };
});

const chartOptions = computed(() => {
  if (props.options) return props.options;
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const, // Barras horizontales
    plugins: {
      legend: {
        display: false
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
            const agent = topAgents.value[context.dataIndex];
            return [
              `Cost: ${useCurrencyFormat(context.parsed.x)}`,
              `Conversations: ${useNumberFormat(agent.conversations)}`,
              `Total Cost: ${useCurrencyFormat(agent.total_cost)}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
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
      },
      y: {
        border: { display: false },
        grid: { color: colors.value.gridLines, lineWidth: 1, drawTicks: false },
        ticks: {
          font: { family: "'DM Sans', sans-serif", size: 12, weight: 500 as any },
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

/* Footer KPI grid (CardInfo dentro) */
.kpi-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 20px;
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
  .kpi-grid {
    gap: 8px;
  }
}
</style>
