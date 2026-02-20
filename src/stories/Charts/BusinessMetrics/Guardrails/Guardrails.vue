<template>
  <article class="guardrails-card">
    <header class="card-header">
      <div class="header-content">
        <div class="title-section">
          <h3 class="card-title">Guardrails Metrics</h3>
          <p class="card-subtitle">Content safety guardrail events and actions</p>
        </div>
        <div class="total-badge" v-if="!props.loading">
          <p class="badge-label">Total Events</p>
          <p class="badge-value">{{ useNumberFormat(totalCount) }}</p>
        </div>
      </div>
    </header>

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
        <!-- Summary Card -->
        <div class="summary-card">
          <div class="summary-items">
            <div class="summary-item">
              <span class="summary-label">Top type:</span>
              <span class="summary-value">{{ topType.name }}</span>
              <span class="summary-pct">({{ topType.pct }}%)</span>
            </div>
            <span class="summary-dot">·</span>
            <div class="summary-item">
              <span class="summary-label">Top action:</span>
              <span :class="['summary-value', `summary-action-${topAction.name.toLowerCase()}`]">{{ topAction.name }}</span>
              <span class="summary-pct">({{ topAction.pct }}%)</span>
            </div>
            <span class="summary-dot">·</span>
            <div class="summary-item">
              <span class="summary-label">Top source:</span>
              <span class="summary-value">{{ topSource.name }}</span>
              <span class="summary-pct">({{ topSource.pct }}%)</span>
            </div>
          </div>
        </div>

        <!-- Daily Grouped Table -->
        <section v-if="groupedTableData.length > 0" class="table-section">
          <div class="section-header">
            <h4 class="section-title">Daily Overview</h4>
          </div>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr class="table-header-row">
                  <th class="table-header">Date</th>
                  <th class="table-header text-center">Count</th>
                  <th class="table-header">Types</th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr v-for="row in groupedTableData" :key="row.date" class="table-row">
                  <td class="table-cell font-medium text-center">
                    {{ moment(row.date).format('DD/MM') }}
                  </td>
                  <td class="table-cell text-center font-semibold">
                    {{ useNumberFormat(row.total) }}
                  </td>
                  <td class="table-cell">
                    <div class="type-badges-row">
                      <span
                        v-for="t in row.types"
                        :key="t.type"
                        class="type-count-badge"
                      >
                        {{ t.type }} ({{ t.count }})
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <FooterExport v-if="enableExport" @export="handleExport" :loading="exportLoading" />
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
  </article>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import moment from 'moment'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

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

defineExpose({ isDark })
</script>

<style scoped>
.guardrails-card {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--kiut-bg-card-gradient, linear-gradient(to bottom, #ffffff 0%, #fafafa 100%));
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: var(--kiut-shadow-card, 0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -3px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05));
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative; overflow: hidden;
  display: flex; flex-direction: column; height: 100%;
}
.guardrails-card:hover { box-shadow: var(--kiut-shadow-card-hover, 0 4px 6px rgba(0,0,0,0.05), 0 20px 25px -5px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)); transform: translateY(-2px); }
.card-header { margin-bottom: 28px; }
.header-content { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; flex-wrap: wrap; }
.title-section { flex: 1; text-align: left; }
.card-title { font-family: 'Space Grotesk', 'DM Sans', sans-serif; margin: 0; letter-spacing: -0.02em; background: linear-gradient(135deg, var(--kiut-primary-light, #c67dff), var(--kiut-primary-default, #5d4b93)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 600; font-size: 1.125rem; line-height: 1.75rem; }
.card-subtitle { font-size: .875rem; font-weight: 400; color: var(--kiut-text-secondary, #64748b); margin: 0; line-height: 1.25rem; }
.total-badge { background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 16px; padding: 12px 20px; text-align: center; }
.badge-label { font-size: 0.7rem; font-weight: 600; color: #b91c1c; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 2px 0; }
.badge-value { font-family: 'Space Grotesk', sans-serif; font-size: 1.25rem; font-weight: 700; color: #991b1b; margin: 0; letter-spacing: -0.02em; }
.card-body { animation: fadeIn 0.5s ease-out; flex: 1; display: flex; flex-direction: column; gap: 20px; }

/* Summary Card */
.summary-card {
  padding: 16px 20px;
  background: var(--kiut-bg-stats-badge, #f8fafc);
  border: 1px solid var(--kiut-border-light, rgba(0,0,0,0.05));
  border-radius: 12px;
}
.summary-items { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.summary-item { display: flex; align-items: center; gap: 5px; }
.summary-label { font-size: 0.8125rem; color: var(--kiut-text-secondary, #64748b); font-weight: 400; }
.summary-value { font-size: 0.8125rem; font-weight: 700; color: var(--kiut-text-primary, #1e293b); text-transform: capitalize; }
.summary-action-blocked { color: #b91c1c; }
.summary-action-warned { color: #92400e; }
.summary-action-allowed { color: #047857; }
.summary-action-detected { color: #0369a1; }
.summary-pct { font-size: 0.75rem; color: var(--kiut-text-secondary, #94a3b8); font-weight: 500; }
.summary-dot { font-size: 1rem; color: var(--kiut-text-secondary, #cbd5e1); font-weight: 700; line-height: 1; }

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

/* Table Section */
.table-section { animation: fadeIn 0.6s ease-out 0.1s backwards; flex: 1; display: flex; flex-direction: column; }
.section-header { margin-bottom: 16px; }
.section-title { font-family: 'Space Grotesk', 'DM Sans', sans-serif; font-size: 1rem; font-weight: 600; color: var(--kiut-text-primary, #1e293b); margin: 0; }
.table-wrapper { overflow-x: auto; border-radius: 12px; border: 1px solid var(--kiut-border-light, rgba(0,0,0,0.08)); background: var(--kiut-bg-card, white); }
.data-table { width: 100%; font-size: 0.8125rem; border-collapse: separate; border-spacing: 0; }
.table-header-row { background: var(--kiut-bg-stats-badge, linear-gradient(to bottom, #f9fafb, #f3f4f6)); }
.table-header { padding: 12px 10px; text-align: center; font-size: 0.7rem; font-weight: 600; color: var(--kiut-text-primary, #374151); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid var(--kiut-border-light, #e5e7eb); }
.table-body { background: var(--kiut-bg-card, white); }
.table-row { transition: background-color 0.2s ease; border-bottom: 1px solid var(--kiut-border-light, #f3f4f6); }
.table-row:hover { background: var(--kiut-bg-stats-badge, #fafafa); }
.table-row:last-child { border-bottom: none; }
.table-cell { padding: 12px 10px; font-size: 0.8125rem; color: var(--kiut-text-primary, #1e293b); }

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
@media (max-width: 768px) {
  .guardrails-card { padding: 20px 24px; border-radius: 16px; }
  .header-content { flex-direction: column; gap: 16px; }
  .summary-items { flex-direction: column; align-items: flex-start; gap: 6px; }
  .summary-dot { display: none; }
}
</style>
