<template>
  <ChartMetricContainer
    class="guardrails-root h-full min-h-0"
    title="Guardrails Metrics"
    subtitle="Content safety guardrail events and actions"
    :collapsible="false"
  >
    <template
      v-if="enableExport && !props.loading && hasData && groupedTableData.length > 0"
      #headerExport
    >
      <FooterExport
        variant="inline"
        @export="handleExport"
        :loading="exportLoading"
      />
    </template>

    <!-- Loading State -->
    <div class="loading-state" v-if="props.loading">
      <div class="loading-container">
        <div class="chart-bars-loader">
          <div class="bar bar-1"></div>
          <div class="bar bar-2"></div>
          <div class="bar bar-3"></div>
          <div class="bar bar-4"></div>
          <div class="bar bar-5"></div>
        </div>
        <p class="loading-text">Loading guardrails data...</p>
      </div>
    </div>

    <!-- Content when loaded -->
    <div v-else class="card-body">
      <template v-if="hasData">
        <!-- Daily Grouped Table (chrome: Utils/Table) -->
        <section v-if="groupedTableData.length > 0" class="guardrails-daily-section">
          <div class="w-full min-w-0">
            <Table
              :columns="guardrailsTableColumns"
              :rows="guardrailsTableRows"
              :max-visible-rows="3"
              row-key="id"
            >
              <template #cell-date="{ row }">
                <span class="font-medium">{{ moment(String(row.date)).format('MMM DD') }}</span>
              </template>
              <template #cell-count="{ row }">
                <span class="font-semibold">{{ useNumberFormat(row.total as number) }}</span>
              </template>
              <template #cell-types="{ row }">
                <div class="type-badges-row">
                  <span
                    v-for="t in (row.types as { type: string; count: number }[])"
                    :key="t.type"
                    class="type-count-badge"
                  >
                    {{ t.type }} ({{ t.count }})
                  </span>
                </div>
              </template>
            </Table>
          </div>
        </section>

        <!-- KPI cards debajo del contenido principal (tabla / vista diaria) -->
        <section class="guardrails-kpis grid grid-cols-2 gap-3 lg:grid-cols-4">
          <CardInfo title="Total Events" :value="useNumberFormat(totalCount)" />
          <CardInfo
            title="Top type"
            :value="topType.name"
            :subvalue="topType.pct > 0 ? `(${topType.pct}%)` : undefined"
          />
          <CardInfo
            title="Top action"
            :value="topAction.name"
            :subvalue="topAction.pct > 0 ? `(${topAction.pct}%)` : undefined"
          />
          <CardInfo
            title="Top source"
            :value="topSource.name"
            :subvalue="topSource.pct > 0 ? `(${topSource.pct}%)` : undefined"
          />
        </section>
      </template>

      <!-- Empty State -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p class="empty-title">No guardrail events</p>
          <p class="empty-description">No content safety events found for the selected period. This is a good sign!</p>
        </div>
      </section>
    </div>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import moment from 'moment'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'
import Table, { type TableColumn } from '../../Utils/Table/Table.vue'
import CardInfo from '../../Utils/CardInfo/CardInfo.vue'

interface GuardrailItem {
  date: string;
  guardrail_type: string;
  guardrail_action: string;
  guardrail_source: string;
  count: number;
}

interface GuardrailsData {
  items: GuardrailItem[];
}

const props = withDefaults(defineProps<{
  data?: GuardrailsData;
  loading?: boolean;
  theme?: Theme;
  enableExport?: boolean;
  exportLoading?: boolean;
}>(), {
  data: () => ({ items: [] }),
  loading: false,
  theme: undefined,
  enableExport: false,
  exportLoading: false,
})

const emit = defineEmits<{
  export: [format: ExportFormat]
}>()

const handleExport = (format: ExportFormat) => {
  emit('export', format)
}

const { isDark } = useThemeDetection(toRef(props, 'theme'))

const hasData = computed(() =>
  props.data?.items && props.data.items.length > 0
)

const totalCount = computed(() =>
  (props.data?.items || []).reduce((sum, item) => sum + item.count, 0)
)

const getTopEntry = (field: 'guardrail_type' | 'guardrail_action' | 'guardrail_source') => {
  const map: Record<string, number> = {}
  for (const item of props.data?.items || []) {
    map[item[field]] = (map[item[field]] || 0) + item.count
  }
  const sorted = Object.entries(map).sort((a, b) => b[1] - a[1])
  if (sorted.length === 0) return { name: '—', pct: 0 }
  const total = totalCount.value
  return {
    name: sorted[0][0],
    pct: total > 0 ? Math.round((sorted[0][1] / total) * 100) : 0,
  }
}

const topType = computed(() => getTopEntry('guardrail_type'))
const topAction = computed(() => getTopEntry('guardrail_action'))
const topSource = computed(() => getTopEntry('guardrail_source'))

const groupedTableData = computed(() => {
  const dayMap: Record<string, Record<string, number>> = {}
  for (const item of props.data?.items || []) {
    if (!dayMap[item.date]) dayMap[item.date] = {}
    dayMap[item.date][item.guardrail_type] =
      (dayMap[item.date][item.guardrail_type] || 0) + item.count
  }
  return Object.entries(dayMap)
    .map(([date, types]) => ({
      date,
      total: Object.values(types).reduce((s, v) => s + v, 0),
      types: Object.entries(types)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const guardrailsTableColumns: TableColumn[] = [
  { key: 'date', label: 'Date', align: 'center' },
  { key: 'count', label: 'Count', align: 'center' },
  { key: 'types', label: 'Types', align: 'left' },
]

const guardrailsTableRows = computed((): Record<string, unknown>[] =>
  groupedTableData.value.map((row) => ({
    id: row.date,
    date: row.date,
    total: row.total,
    types: row.types,
  }))
)

defineExpose({ isDark })
</script>

<style scoped>
.card-body { animation: fadeIn 0.5s ease-out; flex: 1; display: flex; flex-direction: column; gap: 20px; }

.guardrails-kpis { animation: fadeIn 0.55s ease-out 0.05s backwards; }

/* Type Count Badges in Table */
.type-badges-row { display: flex; flex-wrap: wrap; gap: 6px; }
.type-count-badge {
  display: inline-flex; align-items: center;
  padding: 3px 10px; border-radius: 6px;
  font-size: 0.7rem; font-weight: 600; white-space: nowrap;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(198, 125, 255, 0.12));
  color: var(--kiut-text-primary, #4b5563);
  text-transform: uppercase; letter-spacing: 0.02em;
}

/* Daily table block (Utils/Table) */
.guardrails-daily-section { animation: fadeIn 0.6s ease-out 0.1s backwards; flex: 1; display: flex; flex-direction: column; gap: 12px; }

/* Empty State */
.empty-state { display: flex; align-items: center; justify-content: center; min-height: 280px; }
.empty-state-content { text-align: center; max-width: 360px; animation: fadeIn 0.6s ease-out; }
.empty-icon-wrapper { display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: linear-gradient(135deg, #d1fae5, #a7f3d0); border-radius: 20px; margin: 0 auto 20px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15); }
.empty-icon { width: 40px; height: 40px; color: #10b981; }
.empty-title { font-size: 18px; font-weight: 600; color: var(--kiut-text-primary, #1e293b); margin: 0 0 8px 0; }
.empty-description { font-size: 14px; font-weight: 400; color: var(--kiut-text-secondary, #64748b); line-height: 1.6; margin: 0; }

/* Loading State */
.loading-state { display: flex; align-items: center; justify-content: center; min-height: 380px; }
.loading-container { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; }
.chart-bars-loader { display: flex; align-items: flex-end; justify-content: center; gap: 10px; height: 100px; margin-bottom: 24px; }
.bar { width: 8px; background: linear-gradient(to top, var(--kiut-primary-light, #c67dff), var(--kiut-primary, #8b5cf6), var(--kiut-primary-hover, #7c3aed)); border-radius: 4px; animation: wave 1.5s ease-in-out infinite; box-shadow: var(--kiut-shadow-loader, 0 4px 12px rgba(139, 92, 246, 0.4)); }
.bar-1 { height: 30%; animation-delay: 0s; } .bar-2 { height: 50%; animation-delay: 0.1s; } .bar-3 { height: 70%; animation-delay: 0.2s; } .bar-4 { height: 50%; animation-delay: 0.3s; } .bar-5 { height: 40%; animation-delay: 0.4s; }
.loading-text { font-size: 15px; font-weight: 500; color: var(--kiut-text-secondary, #64748b); animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
@keyframes wave { 0%, 100% { transform: scaleY(1); opacity: 0.7; } 50% { transform: scaleY(1.6); opacity: 1; } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
