<template>
  <ChartMetricContainer
    class="h-full min-h-0"
    title="Model Usage"
    subtitle="AI model performance and costs"
    :collapsible="false"
  >
    <template
      v-if="
        enableExport &&
        !loading &&
        currentData &&
        Object.keys(currentData).length > 0
      "
      #headerExport
    >
      <FooterExport
        variant="inline"
        @export="handleExport"
        :loading="exportLoading"
      />
    </template>
    <div class="flex min-h-0 flex-1 flex-col font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif]">
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
      <Tabs
        v-model="activeTab"
        :items="modelUsageTabItems"
        aria-label="Model Usage Tabs"
        full-width
      >
        <template #default>
          <!-- Table Data -->
          <div v-if="currentData && Object.keys(currentData).length > 0" class="model-usage-table-block">
            <div class="w-full min-w-0">
              <Table
                :columns="modelUsageColumns"
                :rows="modelUsageTableRows"
                :max-visible-rows="3"
                row-key="id"
              />
            </div>
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
        </template>
      </Tabs>
    </div>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { ref, computed, toRef } from 'vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useCurrencyFormat, useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

import Table, { type TableColumn } from '../../Utils/Table/Table.vue'
import Tabs, { type TabItem } from '../../../../components/Tabs/Tabs.vue'

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

const modelUsageTabItems: TabItem[] = [
  { value: 'by_model', label: 'Model' },
  { value: 'by_provider', label: 'Provider' },
]

// Active tab state (values match keys in ModelUsageData totals)
const activeTab = ref<string>('by_model')

// Computed: Current data based on active tab
const currentData = computed(() => {
  if (activeTab.value === 'by_model') {
    return props.data?.total_by_model || {};
  } else {
    return props.data?.total_by_provider || {};
  }
});

const modelUsageColumns = computed((): TableColumn[] => [
  { key: 'name', label: activeTab.value === 'by_model' ? 'Model' : 'Provider', align: 'left' },
  { key: 'avgCost', label: 'Avg cost per message', align: 'center' },
  { key: 'avgTokens', label: 'Avg tokens per message', align: 'center' },
  { key: 'messageCount', label: 'Message count', align: 'center' },
  { key: 'totalCost', label: 'Total cost', align: 'center' },
  { key: 'totalTokens', label: 'Total tokens', align: 'center' },
])

const modelUsageTableRows = computed((): Record<string, unknown>[] =>
  Object.entries(currentData.value).map(([name, modelData]) => ({
    id: name,
    name,
    avgCost: formatCurrency(modelData.avg_cost_per_message),
    avgTokens: formatNumber(modelData.avg_tokens_per_message),
    messageCount: formatNumber(modelData.message_count),
    totalCost: formatCurrency(modelData.total_cost),
    totalTokens: formatNumber(modelData.total_tokens),
  }))
)

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
/* Card Body */
.card-body {
  animation: fadeIn 0.5s ease-out;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Tabla (chrome: Utils/Table) */
.model-usage-table-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
@media (max-width: 1024px) {
  .model-usage-table-block {
    overflow-x: auto;
  }
}
</style>

