<template>
  <article class="select-language-card">
    <header class="card-header">
      <div class="header-content">
        <div class="title-section">
          <h3 class="card-title">Language Selection</h3>
          <p class="card-subtitle">Language distribution across conversations</p>
        </div>
        <div class="total-badge" v-if="!props.loading">
          <p class="badge-label">Total</p>
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
        <p class="loading-text">Loading language data...</p>
      </div>
    </div>

    <!-- Content when loaded -->
    <div v-else class="card-body">
      <template v-if="hasData">


        <!-- Pie Chart (Distribution) -->
        <section class="pie-section">
          <PieChart :data="pieData" :options="pieOptions" />
        </section>
      </template>

      <!-- Empty State -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          <p class="empty-title">No language data available</p>
          <p class="empty-description">No language selection data found for the selected period. Try adjusting the date range.</p>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import PieChart from '../../Pie/PieChart.vue'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

interface LanguageDayItem {
  date: string;
  language: string;
  count: number;
}

interface SelectLanguageData {
  items: LanguageDayItem[];
}

const props = withDefaults(defineProps<{
  data?: SelectLanguageData;
  loading?: boolean;
  theme?: Theme;
  enableExport?: boolean;
  exportLoading?: boolean;
}>(), {
  data: () => ({ items: [] }),
  loading: false,
  theme: undefined,
  enableExport: false,
  exportLoading: false
})

const { isDark, colors } = useThemeDetection(toRef(props, 'theme'))

const languageColors = [
  '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ef4444',
  '#ec4899', '#6366f1', '#14b8a6', '#f97316', '#84cc16',
]

const LANGUAGE_MAP: Record<string, { label: string }> = {
  es: { label: 'Spanish' },
  en: { label: 'English' },
  pt: { label: 'Portuguese' },
  fr: { label: 'French' },
  de: { label: 'German' },
  it: { label: 'Italian' },
  ja: { label: 'Japanese' },
  zh: { label: 'Chinese' },
  ko: { label: 'Korean' },
  ru: { label: 'Russian' },
}

const getLanguageLabel = (code: string): string =>
  LANGUAGE_MAP[code]?.label || code.toUpperCase()

const hasData = computed(() =>
  props.data?.items && props.data.items.length > 0
)

const totalCount = computed(() =>
  (props.data?.items || []).reduce((sum, item) => sum + item.count, 0)
)

const languageSummary = computed(() => {
  const map: Record<string, number> = {}
  for (const item of props.data?.items || []) {
    map[item.language] = (map[item.language] || 0) + item.count
  }
  return Object.entries(map)
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count)
})

const pieData = computed(() => ({
  labels: languageSummary.value.map(lang => getLanguageLabel(lang.language)),
  datasets: [{
    data: languageSummary.value.map(lang => lang.count),
    backgroundColor: languageSummary.value.map((_, idx) => languageColors[idx % languageColors.length] + '80'),
    borderColor: languageSummary.value.map((_, idx) => languageColors[idx % languageColors.length]),
    borderWidth: 2,
    hoverOffset: 6,
  }],
}))

const pieOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '55%',
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 16,
        font: { family: "'DM Sans', sans-serif", size: 12 },
        color: colors.value.textSecondary,
      },
    },
    tooltip: {
      backgroundColor: colors.value.tooltipBg,
      titleColor: colors.value.tooltipText,
      bodyColor: colors.value.tooltipText,
      borderColor: isDark.value ? 'rgba(198, 125, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      titleFont: { family: "'Space Grotesk', sans-serif", size: 13, weight: 600 as any },
      bodyFont: { family: "'DM Sans', sans-serif", size: 12 },
      callbacks: {
        label: (ctx: any) => {
          const value = ctx.raw || 0
          const pct = totalCount.value > 0 ? ((value / totalCount.value) * 100).toFixed(1) : '0'
          return ` ${ctx.label}: ${value} (${pct}%)`
        },
      },
    },
  },
}))

defineExpose({ isDark })
</script>

<style scoped>
.select-language-card {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--kiut-bg-card-gradient, linear-gradient(to bottom, #ffffff 0%, #fafafa 100%));
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: var(--kiut-shadow-card, 0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -3px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05));
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.select-language-card:hover {
  box-shadow: var(--kiut-shadow-card-hover, 0 4px 6px rgba(0,0,0,0.05), 0 20px 25px -5px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05));
  transform: translateY(-2px);
}
.card-header { margin-bottom: 28px; }
.header-content { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; flex-wrap: wrap; }
.title-section { flex: 1; text-align: left; }
.card-title {
  font-family: 'Space Grotesk', 'DM Sans', sans-serif;
  margin: 0; letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--kiut-primary-light, #c67dff), var(--kiut-primary-default, #5d4b93));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  font-weight: 600; font-size: 1.125rem; line-height: 1.75rem;
}
.card-subtitle { font-size: .875rem; font-weight: 400; color: var(--kiut-text-secondary, #64748b); margin: 0; line-height: 1.25rem; }
.total-badge {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(198, 125, 255, 0.08));
  border: 1px solid var(--kiut-border-light, rgba(0,0,0,0.05));
  border-radius: 16px; padding: 12px 20px; text-align: center;
}
.badge-label { font-size: 0.7rem; font-weight: 600; color: var(--kiut-text-secondary, #64748b); text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 2px 0; }
.badge-value { font-family: 'Space Grotesk', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--kiut-text-primary, #1e293b); margin: 0; letter-spacing: -0.02em; }
.card-body { animation: fadeIn 0.5s ease-out; flex: 1; display: flex; flex-direction: column; }
.language-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin-bottom: 24px; }
.language-card {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 16px; background: var(--kiut-bg-stats-badge, #f8fafc);
  border: 1px solid var(--kiut-border-light, rgba(0,0,0,0.05));
  border-left: 4px solid; border-radius: 12px; transition: all 0.2s ease;
}
.language-card:hover { background: var(--kiut-bg-card, #fff); transform: translateY(-1px); }
.language-info { display: flex; align-items: center; gap: 8px; }
.language-flag { font-size: 1.25rem; }
.language-name { font-size: 0.875rem; font-weight: 500; color: var(--kiut-text-primary, #1e293b); }
.language-stats { display: flex; flex-direction: column; align-items: flex-end; }
.language-count { font-family: 'Space Grotesk', sans-serif; font-size: 1.125rem; font-weight: 700; color: var(--kiut-text-primary, #1e293b); }
.language-pct { font-size: 0.75rem; color: var(--kiut-text-secondary, #64748b); }
.pie-section { margin-bottom: 24px; height: 260px; }
.section-header { margin-bottom: 16px; }
.section-title { font-family: 'Space Grotesk', 'DM Sans', sans-serif; font-size: 1rem; font-weight: 600; color: var(--kiut-text-primary, #1e293b); margin: 0; }
.empty-state { display: flex; align-items: center; justify-content: center; min-height: 280px; }
.empty-state-content { text-align: center; max-width: 360px; animation: fadeIn 0.6s ease-out; }
.empty-icon-wrapper { display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: var(--kiut-bg-empty-icon, linear-gradient(135deg, #ede9fe, #ddd6fe)); border-radius: 20px; margin: 0 auto 20px; box-shadow: var(--kiut-shadow-empty-icon, 0 4px 12px rgba(139, 92, 246, 0.15)); }
.empty-icon { width: 40px; height: 40px; color: var(--kiut-primary, #8b5cf6); }
.empty-title { font-size: 18px; font-weight: 600; color: var(--kiut-text-primary, #1e293b); margin: 0 0 8px 0; }
.empty-description { font-size: 14px; font-weight: 400; color: var(--kiut-text-secondary, #64748b); line-height: 1.6; margin: 0; }
.loading-state { display: flex; align-items: center; justify-content: center; min-height: 380px; }
.loading-container { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; }
.chart-bars-loader { display: flex; align-items: flex-end; justify-content: center; gap: 10px; height: 100px; margin-bottom: 24px; }
.bar { width: 8px; background: linear-gradient(to top, var(--kiut-primary-light, #c67dff), var(--kiut-primary, #8b5cf6), var(--kiut-primary-hover, #7c3aed)); border-radius: 4px; animation: wave 1.5s ease-in-out infinite; box-shadow: var(--kiut-shadow-loader, 0 4px 12px rgba(139, 92, 246, 0.4)); }
.bar-1 { height: 30%; animation-delay: 0s; }
.bar-2 { height: 50%; animation-delay: 0.1s; }
.bar-3 { height: 70%; animation-delay: 0.2s; }
.bar-4 { height: 50%; animation-delay: 0.3s; }
.bar-5 { height: 40%; animation-delay: 0.4s; }
.loading-text { font-size: 15px; font-weight: 500; color: var(--kiut-text-secondary, #64748b); animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
@keyframes wave { 0%, 100% { transform: scaleY(1); opacity: 0.7; } 50% { transform: scaleY(1.6); opacity: 1; } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 768px) {
  .select-language-card { padding: 20px 24px; border-radius: 16px; }
  .header-content { flex-direction: column; gap: 16px; }
  .card-title { font-size: 1rem; }
}
</style>
