<template>
  <article class="agent-human-conv-card">
    <header class="card-header">
      <div class="header-content">
        <h3 class="card-title">Agent Human Conversations</h3>
        <p class="card-subtitle">Human conversation assignments and closures by agent</p>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-container">
        <div class="chart-bars-loader">
          <div class="bar bar-1"></div>
          <div class="bar bar-2"></div>
          <div class="bar bar-3"></div>
          <div class="bar bar-4"></div>
          <div class="bar bar-5"></div>
        </div>
        <p class="loading-text">Loading agent data...</p>
      </div>
    </div>

    <!-- Content when loaded -->
    <div v-else class="card-body">
      <!-- Summary Cards -->
      <div class="summary-cards">
        <!-- Total Assigned Card -->
        <div class="summary-card assigned-card">
          <div class="card-decoration"></div>
          <div class="card-content">
            <p class="card-label">Total Assigned</p>
            <p class="card-value assigned-value">{{ formatNumber(data.total_assigned) }}</p>
          </div>
        </div>

        <!-- Total Closed Card -->
        <div class="summary-card closed-card">
          <div class="card-decoration"></div>
          <div class="card-content">
            <p class="card-label">Total Closed</p>
            <p class="card-value closed-value">{{ formatNumber(data.total_closed) }}</p>
          </div>
        </div>
      </div>

      <!-- Agents by Day -->
      <div v-if="hasData" class="agents-section">
        <div
          v-for="(agents, date) in groupedByDate"
          :key="date"
          class="date-group"
        >
          <!-- Date Header -->
          <div class="date-header">
            <h4 class="date-title">{{ formatDate(date) }}</h4>
            <div class="date-stats">
              <span class="stat-item assigned-stat">
                <span class="stat-value">{{ formatNumber(getTotalAssignedForDate(agents)) }}</span>
                Assigned
              </span>
              <span class="stat-item closed-stat">
                <span class="stat-value">{{ formatNumber(getTotalClosedForDate(agents)) }}</span>
                Closed
              </span>
            </div>
          </div>

          <!-- Agents Table -->
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr class="table-header-row">
                  <th class="table-header">Agent Name</th>
                  <th class="table-header">Email</th>
                  <th class="table-header">Assigned</th>
                  <th class="table-header">Closed</th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr
                  v-for="agent in agents"
                  :key="`${date}-${agent.agent_email}`"
                  class="table-row"
                >
                  <td class="table-cell name-cell">{{ agent.agent_name || '-' }}</td>
                  <td class="table-cell email-cell">{{ agent.agent_email }}</td>
                  <td class="table-cell text-center">
                    <span class="badge assigned-badge">
                      {{ formatNumber(agent.assigned_count) }}
                    </span>
                  </td>
                  <td class="table-cell text-center">
                    <span class="badge closed-badge">
                      {{ formatNumber(agent.closed_count) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p class="empty-title">No agent human conversation data available</p>
          <p class="empty-description">Try adjusting the date range or check your filters.</p>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

// Types
interface AgentDayData {
  date: string;
  agent_name: string;
  agent_email: string;
  assigned_count: number;
  closed_count: number;
}

interface AgentHumanConvData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  total_assigned?: number;
  total_closed?: number;
  agents_by_day?: AgentDayData[];
}

const props = withDefaults(defineProps<{
  data?: AgentHumanConvData;
  loading?: boolean;
  theme?: Theme;
}>(), {
  data: () => ({
    total_assigned: 0,
    total_closed: 0,
    agents_by_day: [],
  }),
  loading: false,
  theme: undefined,
});

// Theme detection with prop fallback
const { isDark } = useThemeDetection(toRef(props, 'theme'))

// Check if we have data
const hasData = computed(() => {
  return props.data?.agents_by_day && props.data.agents_by_day.length > 0;
});

// Group agents by date (sorted descending)
const groupedByDate = computed(() => {
  if (!hasData.value) return {};

  const grouped: Record<string, AgentDayData[]> = {};
  
  for (const agent of props.data!.agents_by_day!) {
    if (!grouped[agent.date]) {
      grouped[agent.date] = [];
    }
    grouped[agent.date].push(agent);
  }

  // Sort dates descending
  const sortedDates = Object.keys(grouped).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  const sortedGrouped: Record<string, AgentDayData[]> = {};
  for (const date of sortedDates) {
    sortedGrouped[date] = grouped[date];
  }

  return sortedGrouped;
});

// Utility functions
const formatNumber = (value: number | undefined): string => {
  if (value === undefined || value === null) return '0';
  return useNumberFormat(value);
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

const getTotalAssignedForDate = (agents: AgentDayData[]): number => {
  return agents.reduce((sum, agent) => sum + (agent.assigned_count || 0), 0);
};

const getTotalClosedForDate = (agents: AgentDayData[]): number => {
  return agents.reduce((sum, agent) => sum + (agent.closed_count || 0), 0);
};

// Expose isDark for potential use in templates
defineExpose({ isDark })
</script>

<style scoped>
/* Main Card Styles */
.agent-human-conv-card {
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

.agent-human-conv-card:hover {
  box-shadow: var(--kiut-shadow-card-hover);
  transform: translateY(-2px);
}

/* Header Styles */
.card-header {
  margin-bottom: 24px;
  position: relative;
  text-align: left;
}

.header-content {
  width: 100%;
  text-align: left;
}

.card-title {
  font-family: 'Space Grotesk', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
  animation: fadeIn 0.5s ease-out;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Summary Cards */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.summary-card {
  position: relative;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid var(--kiut-border-light);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.assigned-card {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
}

.closed-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(20, 184, 166, 0.05) 100%);
}

.card-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  transform: translate(32px, -32px);
  opacity: 0.3;
}

.assigned-card .card-decoration {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.3) 100%);
}

.closed-card .card-decoration {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(20, 184, 166, 0.3) 100%);
}

.card-content {
  position: relative;
  z-index: 10;
}

.card-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--kiut-text-secondary);
  margin: 0 0 4px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
}

.assigned-value {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.closed-value {
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Agents Section */
.agents-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.date-group {
  border-radius: 12px;
  border: 1px solid var(--kiut-border-table);
  overflow: hidden;
}

.date-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--kiut-bg-table-header);
  border-bottom: 1px solid var(--kiut-border-table);
}

.date-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--kiut-text-primary);
  margin: 0;
}

.date-stats {
  display: flex;
  gap: 16px;
  font-size: 0.75rem;
  color: var(--kiut-text-secondary);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-weight: 600;
}

.assigned-stat .stat-value {
  color: #6366f1;
}

.closed-stat .stat-value {
  color: #10b981;
}

/* Table Styles */
.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  background: var(--kiut-bg-table);
}

.table-header-row {
  background: var(--kiut-bg-table-header);
}

.table-header {
  padding: 10px 12px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--kiut-text-table-header);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table-header:first-child,
.table-header:nth-child(2) {
  text-align: left;
}

.table-cell {
  padding: 10px 12px;
  text-align: center;
  color: var(--kiut-text-primary);
  border-top: 1px solid var(--kiut-border-table-row);
}

.table-row:hover {
  background: var(--kiut-bg-table-hover);
}

.name-cell {
  font-weight: 500;
  text-align: left !important;
  white-space: nowrap;
}

.email-cell {
  text-align: left !important;
  color: var(--kiut-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}

.text-center {
  text-align: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.assigned-badge {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

.closed-badge {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  flex: 1;
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
  .agent-human-conv-card {
    padding: 20px 24px;
    border-radius: 16px;
  }

  .card-title {
    font-size: 1rem;
  }

  .card-subtitle {
    font-size: 13px;
  }

  .card-header {
    margin-bottom: 20px;
  }

  .summary-cards {
    grid-template-columns: 1fr;
  }

  .date-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .date-stats {
    width: 100%;
    justify-content: space-between;
  }

  .email-cell {
    max-width: 150px;
  }
}
</style>
