<template>
  <article class="model-usage-card">
    <header class="card-header">
      <div class="header-content">
        <h3 class="card-title">Model Usage</h3>
        <p class="card-subtitle">AI model performance and costs</p>
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
        <p class="loading-text">Loading model usage data...</p>
      </div>
    </div>

    <!-- Content when loaded -->
    <div v-else class="card-body">
      <!-- Tabs Navigation -->
      <div class="tabs-container">
        <nav class="tabs-nav" aria-label="Model Usage Tabs">
          <button
            @click="activeTab = 'by_model'"
            :class="['tab-button', { 'tab-active': activeTab === 'by_model' }]"
            :aria-selected="activeTab === 'by_model'"
            role="tab"
          >
            Model
          </button>
          <button
            @click="activeTab = 'by_provider'"
            :class="['tab-button', { 'tab-active': activeTab === 'by_provider' }]"
            :aria-selected="activeTab === 'by_provider'"
            role="tab"
          >
            Provider
          </button>
        </nav>
      </div>

      <!-- Table Data -->
      <div v-if="currentData && Object.keys(currentData).length > 0" class="table-section">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr class="table-header-row">
                <th class="table-header">{{ activeTab === 'by_model' ? 'Model' : 'Provider' }}</th>
                <th class="table-header">Avg cost per message</th>
                <th class="table-header">Avg tokens per message</th>
                <th class="table-header">Message count</th>
                <th class="table-header">Total cost</th>
                <th class="table-header">Total tokens</th>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr v-for="(modelData, modelName) in currentData" :key="modelName" class="table-row">
                <td class="table-cell name-cell">{{ modelName }}</td>
                <td class="table-cell text-center">{{ formatCurrency(modelData.avg_cost_per_message) }}</td>
                <td class="table-cell text-center">{{ formatNumber(modelData.avg_tokens_per_message) }}</td>
                <td class="table-cell text-center">{{ formatNumber(modelData.message_count) }}</td>
                <td class="table-cell text-center cost-cell">{{ formatCurrency(modelData.total_cost) }}</td>
                <td class="table-cell text-center">{{ formatNumber(modelData.total_tokens) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <FooterExport v-if="enableExport" @export="handleExport" :loading="exportLoading" />
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <ChartBarIcon class="empty-icon" />
          </div>
          <p class="empty-title">No model usage data available</p>
          <p class="empty-description">Try adjusting the date range or check your filters to see model performance metrics.</p>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed, toRef } from 'vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useCurrencyFormat, useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

// Types
interface ModelStats {
  message_count: number;
  total_tokens: number;
  total_cost: number;
  avg_tokens_per_message: number;
  avg_cost_per_message: number;
}

interface ModelsByType {
  [key: string]: ModelStats;
}

interface DayUsage {
  by_provider: ModelsByType;
  by_model: ModelsByType;
}

interface ModelUsageByDay {
  [date: string]: DayUsage;
}

interface ModelUsageData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  model_usage_by_day?: ModelUsageByDay;
  total_by_provider?: ModelsByType;
  total_by_model?: ModelsByType;
}

const props = withDefaults(defineProps<{
  data?: ModelUsageData;
  loading?: boolean;
  theme?: Theme;
  enableExport?: boolean;
  exportLoading?: boolean;
}>(), {
  data: () => ({
    total_by_provider: {},
    total_by_model: {},
  }),
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
const { isDark } = useThemeDetection(toRef(props, 'theme'))

// Active tab state
const activeTab = ref<'by_model' | 'by_provider'>('by_model');

// Computed: Current data based on active tab
const currentData = computed(() => {
  if (activeTab.value === 'by_model') {
    return props.data?.total_by_model || {};
  } else {
    return props.data?.total_by_provider || {};
  }
});

// Utility functions
const formatNumber = (value: number | undefined): string => {
  if (value === undefined || value === null) return '0';
  return useNumberFormat(value);
};

const formatCurrency = (value: number | undefined): string => {
  if (value === undefined || value === null) return '$0.00';
  return useCurrencyFormat(value);
};

// Expose isDark for potential use in templates
defineExpose({ isDark })
</script>

<style scoped>
/* Main Card Styles */
.model-usage-card {
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

.model-usage-card:hover {
  box-shadow: var(--kiut-shadow-card-hover);
  transform: translateY(-2px);
}

/* Header Styles */
.card-header {
  margin-bottom: 28px;
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

/* Tabs Styles */
.tabs-container {
  border-bottom: 2px solid var(--kiut-border-light);
}

.tabs-nav {
  display: flex;
  gap: 12px;
}

.tab-button {
  position: relative;
  padding: 12px 4px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--kiut-text-secondary);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: -2px;
}

.tab-button:hover {
  color: var(--kiut-primary);
}

.tab-button.tab-active {
  color: var(--kiut-primary-light);
  font-weight: 600;
  border-bottom-color: var(--kiut-primary-light);
}

/* Table Section */
.table-section {
  margin-top: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid var(--kiut-border-table);
  flex: 1;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.data-table thead tr {
  background: var(--kiut-bg-table-header);
}

.table-header-row {
  background: var(--kiut-bg-table-header);
}

.data-table th,
.table-header {
  padding: 12px 16px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--kiut-text-table-header);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--kiut-border-table);
}

.table-header:first-child {
  text-align: left;
}

.data-table td,
.table-cell {
  padding: 12px 16px;
  text-align: center;
  color: var(--kiut-text-primary);
  border-bottom: 1px solid var(--kiut-border-table-row);
}

.data-table tbody tr:hover,
.table-row:hover {
  background: var(--kiut-bg-table-hover);
}

.data-table tbody tr:last-child td,
.table-row:last-child .table-cell {
  border-bottom: none;
}

.table-body {
  background: var(--kiut-bg-table);
}

.name-cell {
  font-weight: 500;
  text-align: left !important;
  white-space: nowrap;
}

.cost-cell {
  font-weight: 600;
  color: var(--kiut-primary);
}

.text-center {
  text-align: center;
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
  .model-usage-card {
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
    margin-bottom: 24px;
  }

  .tabs-nav {
    gap: 16px;
  }

  .tab-button {
    font-size: 0.8125rem;
  }

  .data-table th,
  .data-table td {
    padding: 10px 12px;
    font-size: 0.75rem;
  }

  .data-table th {
    font-size: 0.65rem;
  }
}
</style>

