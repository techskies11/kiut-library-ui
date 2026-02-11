<template>
  <article class="top-agents-card">
    <header class="card-header">
      <div class="header-content">
        <h3 class="card-title">Top Agents</h3>
        <p class="card-subtitle">Interactions by agent (excluding triage)</p>
      </div>
    </header>

    <div class="card-body" v-if="!loading">
      <section v-if="hasData" class="chart-section">
        <div class="chart-container">
          <PieChart :data="chartData" :options="chartOptions" />
        </div>
      </section>
      
      <!-- Empty State -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <ChartBarIcon class="empty-icon" />
          </div>
          <p class="empty-title">No top agents data</p>
          <p class="empty-description">Try adjusting the date range or check your filters.</p>
        </div>
      </section>
    </div>
    
    <!-- Loading state -->
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
import PieChart from '../../Pie/PieChart.vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

// Modelo de datos para un agente
interface AgentData {
  agent_type: string;
  total_usage: number;
  total_tokens: number;
  total_cost: number;
  total_input_tokens: number;
  total_output_tokens: number;
  total_read_tokens: number;
  total_write_tokens: number;
  total_input_tokens_cost: number;
  total_output_tokens_cost: number;
  total_read_tokens_cost: number;
  total_write_tokens_cost: number;
  conversations: number;
  avg_tokens_per_conversation: number;
  avg_cost_per_conversation: number;
}

// Modelo de datos que recibe el componente
interface TopAgentsData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  top_agents?: AgentData[];
}

const props = withDefaults(defineProps<{
  data?: TopAgentsData;
  loading?: boolean;
  options?: Record<string, any>;
  theme?: Theme;
}>(), {
  data: () => ({}),
  loading: false,
  options: undefined,
  theme: undefined,
});

// Theme detection with prop fallback
const { isDark, colors } = useThemeDetection(toRef(props, 'theme'))

// Color map for different agent types
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

// Filter agents excluding triage
const filteredAgents = computed(() => {
  if (!props.data?.top_agents) return [];
  return props.data.top_agents.filter(agent => 
    agent.agent_type?.toLowerCase() !== 'triage'
  );
});

// Check if we have data
const hasData = computed(() => {
  return filteredAgents.value.length > 0;
});

// Calculate total conversations for percentages
const totalConversations = computed(() => {
  return filteredAgents.value.reduce((sum, agent) => sum + (agent.conversations || 0), 0);
});

// Chart data with colors and labels
const chartData = computed(() => {
  const agents = filteredAgents.value;
  
  if (agents.length === 0) {
    return { labels: [], datasets: [] };
  }

  // Get colors with opacity for backgrounds
  const backgroundColors = agents.map(agent => {
    const agentKey = agent.agent_type?.toLowerCase();
    const baseColor = colorMap[agentKey] || '#a78bfa';
    return baseColor + '80'; // Add 80 for 50% opacity
  });

  // Get solid colors for borders
  const borderColors = agents.map(agent => {
    const agentKey = agent.agent_type?.toLowerCase();
    return colorMap[agentKey] || '#a78bfa';
  });

  // Create labels with count and percentage
  const labels = agents.map(agent => {
    const count = agent.conversations || 0;
    const pct = totalConversations.value ? (count / totalConversations.value) * 100 : 0;
    return `${agent.agent_type} - ${count.toLocaleString()} (${pct.toFixed(1)}%)`;
  });

  return {
    labels,
    datasets: [
      {
        data: agents.map(agent => agent.conversations || 0),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2
      }
    ]
  };
});

// Chart options
const chartOptions = computed(() => {
  if (props.options) return props.options;
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            family: "'DM Sans', sans-serif",
            size: 12,
            weight: 500 as any,
          },
          color: colors.value.textSecondary,
          usePointStyle: true,
          padding: 16,
          boxWidth: 8,
          boxHeight: 8,
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
          label: (context: any) => {
            const label = (context.label || '').toString();
            const value = Number(context.parsed) || 0;
            const total = (context.dataset.data || []).reduce((acc: number, val: any) => acc + (Number(val) || 0), 0);
            const percent = total ? ((value / total) * 100) : 0;
            return `${label}: ${value.toLocaleString()} (${percent.toFixed(1)}%)`;
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
.top-agents-card {
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

.top-agents-card:hover {
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
  align-items: center;
  justify-content: center;
}

.chart-container {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  .top-agents-card {
    padding: 20px 24px;
    border-radius: 16px;
  }
  
  .card-title { font-size: 20px; }
  .card-subtitle { font-size: 13px; }
  .card-header { margin-bottom: 24px; }
  
  .chart-container {
    height: 350px;
  }
}
</style>

