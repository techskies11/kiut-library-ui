<template>
  <article class="checkin-segments-card">
    <header class="card-header">
      <div class="header-content">
        <h3 class="card-title">Checkin Segments</h3>
        <p class="card-subtitle">Breakdown by flight segment with connection when applicable</p>
      </div>
    </header>

    <!-- Loading State con animación CSS personalizada -->
    <div class="loading-state" v-if="props.loading">
      <div class="loading-container">
        <div class="chart-flow-loader">
          <div class="flow-line flow-1"></div>
          <div class="flow-line flow-2"></div>
          <div class="flow-line flow-3"></div>
          <div class="flow-line flow-4"></div>
          <div class="flow-line flow-5"></div>
        </div>
        <p class="loading-text">Loading segment data...</p>
      </div>
    </div>

    <!-- Content when loaded -->
    <div v-else class="card-body">
      <section v-if="props.data.length > 0" class="table-section">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr class="table-header-row">
                <th class="table-header">Departure</th>
                <th class="table-header">Connection</th>
                <th class="table-header">Arrival</th>
                <th class="table-header">Trip</th>
                <th class="table-header">Init</th>
                <th class="table-header">Started (%)</th>
                <th class="table-header">Completed (%)</th>
                <th class="table-header">Closed (%)</th>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr v-for="(row, idx) in props.data" :key="idx" class="table-row">
                <td class="table-cell font-medium text-center">
                  <span class="airport-badge">{{ formatAirport(row.departure_airport) }}</span>
                </td>
                <td class="table-cell text-center">
                  <span v-if="formatAirport(row.conexion_airport) !== '-'" class="airport-badge connection">
                    {{ formatAirport(row.conexion_airport) }}
                  </span>
                  <span v-else class="empty-connection">-</span>
                </td>
                <td class="table-cell text-center">
                  <span class="airport-badge">{{ formatAirport(row.arrival_airport) }}</span>
                </td>
                <td class="table-cell text-center">
                  <span v-if="isRoundtrip(row)" class="trip-badge roundtrip">
                    <svg class="trip-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Roundtrip
                  </span>
                  <span v-else class="trip-badge oneway">
                    <svg class="trip-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    One way
                  </span>
                </td>
                <td class="table-cell text-center">
                  {{ useNumberFormat(row.segment_init_count) }}
                </td>
                <td class="table-cell text-center">
                  <span class="percentage-value">{{ calculatePercentage(row.segment_started_count, row.segment_init_count) }}</span>
                </td>
                <td class="table-cell text-center">
                  <span class="percentage-value">{{ calculatePercentage(row.segment_completed_count, row.segment_init_count) }}</span>
                </td>
                <td class="table-cell text-center">
                  <span class="percentage-value success">{{ calculatePercentage(row.segment_closed_count, row.segment_init_count) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Empty State -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="empty-title">No segment data available</p>
          <p class="empty-description">No flight segment data found for the selected period. Try adjusting the date range.</p>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useNumberFormat } from '../../../../plugins/numberFormat'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

interface SegmentData {
  departure_airport: string;
  conexion_airport: string;
  arrival_airport: string;
  segment_init_count: number;
  segment_started_count: number;
  segment_completed_count: number;
  segment_closed_count: number;
}

const props = withDefaults(defineProps<{
  data?: SegmentData[];
  loading?: boolean;
  theme?: Theme;
}>(), {
  data: () => [],
  loading: false,
  theme: undefined
})

// Theme detection with prop fallback
const { isDark } = useThemeDetection(toRef(props, 'theme'))

const calculatePercentage = (value: number, total: number): string => {
  if (!total || total === 0 || !value) return '0%'
  return `${Math.round((value / total) * 100)}%`
}

const formatAirport = (value: string | null | undefined): string => {
  if (!value || value === 'None') return '-'
  const str = String(value).trim()
  // Remove suffix like _0, _1, _23 at the end
  return str.replace(/_[0-9]+$/i, '')
}

const isRoundtrip = (row: SegmentData): boolean => {
  const dep = formatAirport(row?.departure_airport)
  const arr = formatAirport(row?.arrival_airport)
  if (dep === '-' || arr === '-') return false
  return dep === arr
}

// Expose isDark for potential use in templates
defineExpose({ isDark })
</script>

<style scoped>
/* Main Card Styles */
.checkin-segments-card {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--kiut-bg-card-gradient);
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: var(--kiut-shadow-card);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.checkin-segments-card:hover {
  box-shadow: var(--kiut-shadow-card-hover);
  transform: translateY(-2px);
}

/* Header Styles */
.card-header {
  margin-bottom: 28px;
  position: relative;
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
}

/* Table Section */
.table-section {
  animation: fadeIn 0.5s ease-out;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 16px;
  border: 1px solid var(--kiut-border-table);
  box-shadow: var(--kiut-shadow-chart-wrapper);
  background: var(--kiut-bg-table);
}

.data-table {
  width: 100%;
  font-size: 0.875rem;
  border-collapse: separate;
  border-spacing: 0;
}

.table-header-row {
  background: var(--kiut-bg-table-header);
}

.table-header {
  padding: 16px 12px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--kiut-text-table-header);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid var(--kiut-border-table);
}

.table-header:first-child {
  border-top-left-radius: 16px;
}

.table-header:last-child {
  border-top-right-radius: 16px;
}

.table-body {
  background: var(--kiut-bg-table);
}

.table-row {
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--kiut-border-table-row);
}

.table-row:hover {
  background: var(--kiut-bg-table-hover);
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 16px 12px;
  font-size: 0.875rem;
  color: var(--kiut-text-primary);
  white-space: nowrap;
}

/* Airport Badge */
.airport-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #1e40af;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
}

.airport-badge.connection {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
}

.empty-connection {
  color: var(--kiut-text-muted);
  font-size: 0.875rem;
}

/* Trip Badge */
.trip-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.trip-badge.roundtrip {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #047857;
}

.trip-badge.oneway {
  background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
  color: #0369a1;
}

.trip-icon {
  width: 14px;
  height: 14px;
}

/* Percentage Value */
.percentage-value {
  font-weight: 500;
  color: var(--kiut-text-secondary);
}

.percentage-value.success {
  color: var(--kiut-success);
  font-weight: 600;
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
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
  min-height: 320px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.chart-flow-loader {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
  height: 100px;
  margin-bottom: 24px;
}

.flow-line {
  width: 10px;
  background: linear-gradient(to top, var(--kiut-primary-light) 0%, var(--kiut-primary) 50%, var(--kiut-primary-hover) 100%);
  border-radius: 5px;
  animation: wave 1.5s ease-in-out infinite;
  box-shadow: var(--kiut-shadow-loader);
}

.flow-1 { height: 35%; animation-delay: 0s; }
.flow-2 { height: 55%; animation-delay: 0.1s; }
.flow-3 { height: 75%; animation-delay: 0.2s; }
.flow-4 { height: 55%; animation-delay: 0.3s; }
.flow-5 { height: 45%; animation-delay: 0.4s; }

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
  .table-wrapper {
    overflow-x: scroll;
  }
  
  .table-cell {
    padding: 12px 8px;
    font-size: 0.8125rem;
  }
}

@media (max-width: 768px) {
  .checkin-segments-card {
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

  .table-header {
    padding: 12px 8px;
    font-size: 0.7rem;
  }

  .table-cell {
    padding: 12px 8px;
    font-size: 0.8125rem;
  }

  .airport-badge {
    padding: 4px 8px;
    font-size: 0.75rem;
  }

  .trip-badge {
    padding: 4px 8px;
    font-size: 0.7rem;
  }
}
</style>
