<template>
  <article class="checkin-metrics-card">
    <header class="card-header">
      <div class="header-content">
        <h3 class="card-title">Check-in Metrics</h3>
        <p class="card-subtitle">Check-in performance and failure analysis</p>
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
        <p class="loading-text">Loading check-in data...</p>
      </div>
    </div>

    <!-- Content when loaded -->
    <div v-else class="card-body">
      <!-- Sankey Flow Chart -->
      <section v-if="sankeyData.nodes.length > 0" class="chart-section">
        <div class="chart-wrapper">
          <SankeyChart
            :data="sankeyData"
            :height="'500px'"
            :node-colors="sankeyNodeColors"
            :use-gradient="false"
            :node-gap="30"
          />
        </div>
      </section>

      <!-- Table Data -->
      <section v-if="tableData && tableData.length > 0" class="table-section">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr class="table-header-row">
                <th class="table-header">Date</th>
                <th class="table-header">Checkin Init</th>
                <th class="table-header">Booking Retrieve (%)</th>
                <th class="table-header">Number of Passengers</th>
                <th class="table-header">Completed (%)</th>
                <th class="table-header">Closed with BP (%)</th>
                <th class="table-header">Failed (%)</th>
                <th class="table-header">Failed (Reasons)</th>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr
                v-for="row in tableData"
                :key="row.date"
                class="table-row"
              >
                <td class="table-cell font-medium">
                  {{ moment(row.date).format('DD/MM/YYYY') }}
                </td>
                <td class="table-cell text-center">
                  {{ useNumberFormat(row.checkin_initiated_count) }}
                </td>
                <td class="table-cell text-center">
                  {{ formatValueWithPercentage(row.checkin_init_count, row.checkin_initiated_count) }}
                </td>
                <td class="table-cell text-center">
                  {{ useNumberFormat(row.checkin_started_count) }}
                </td>
                <td class="table-cell text-center">
                  {{ formatValueWithPercentage(row.checkin_completed_count, row.checkin_started_count) }}
                </td>
                <td class="table-cell text-center">
                  {{ formatValueWithPercentage(row.checkin_closed_count, row.checkin_started_count) }}
                </td>
                <td class="table-cell text-center">
                  {{ formatValueWithPercentage(getTotalFailedSteps(row.failed_steps), row.checkin_started_count) }}
                </td>
                <td class="table-cell text-left">
                  <div v-if="row.failed_steps && row.failed_steps.length > 0" class="failed-steps">
                    <div
                      v-for="step in row.failed_steps"
                      :key="step.step_name"
                      class="failed-step-item"
                    >
                      <span class="step-name">{{ step.step_name.replace(/_/g, ' ') }}:</span>
                      <span class="step-count">{{ step.failed_count }}</span>
                    </div>
                  </div>
                  <div v-else class="empty-cell">-</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <FooterExport v-if="enableExport" @export="handleExport" :loading="exportLoading" />
      </section>

      <!-- Empty State -->
      <section v-else class="empty-state">
        <div class="empty-state-content">
          <div class="empty-icon-wrapper">
            <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p class="empty-title">No check-in data available</p>
          <p class="empty-description">Try adjusting the date range or check your filters to see check-in performance data.</p>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'
  import moment from 'moment'
  import { useNumberFormat } from '../../../../plugins/numberFormat'
  import SankeyChart from '../../Sankey/SankeyChart.vue'
  import { FooterExport } from '../../Utils/FooterExport'

  const emit = defineEmits(['export'])

  const handleExport = (format) => {
    emit('export', format)
  }

  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
    enableExport: {
      type: Boolean,
      default: false,
    },
    exportLoading: {
      type: Boolean,
      default: false,
    },
    checkinData: {
      type: Object,
      default: () => ({
        total_checkin_init: 0,
        total_checkin_initiated: 0,
        total_checkin_init_abandoned: 0,
        total_checkin_started: 0,
        total_checkin_completed: 0,
        total_checkin_closed: 0,
        total_checkin_unrecovered: 0,
        checkin_by_day: [],
      }),
    },
    failedData: {
      type: Object,
      default: () => ({
        total_checkin_failed: 0,
        failed_by_step_by_day: [],
        unrecovered_by_step: [],
      }),
    },
  })

  const DEFAULT_CHECKIN_DATA = {
    total_checkin_init: 0,
    total_checkin_initiated: 0,
    total_checkin_init_abandoned: 0,
    total_checkin_started: 0,
    total_checkin_completed: 0,
    total_checkin_closed: 0,
    total_checkin_unrecovered: 0,
    checkin_by_day: [],
  }

  const DEFAULT_FAILED_DATA = {
    total_checkin_failed: 0,
    failed_by_step_by_day: [],
    unrecovered_by_step: [],
  }

  const tableData = ref([])

  // Normalize sources: support checkinData+failedData, or data (checkin shape), or data.checkin + data.failed
  const checkinDataInternal = computed(() => {
    const d = props.data
    const checkinFromData = d?.checkin ?? d
    const hasCheckin = checkinFromData && ((Array.isArray(checkinFromData.checkin_by_day) && checkinFromData.checkin_by_day.length > 0) || (checkinFromData.total_checkin_initiated ?? 0) > 0)
    if (hasCheckin) {
      return { ...DEFAULT_CHECKIN_DATA, ...checkinFromData }
    }
    return props.checkinData ?? DEFAULT_CHECKIN_DATA
  })

  const failedDataInternal = computed(() => {
    const d = props.data
    const failedFromData = d?.failed ?? d
    const hasFailed = failedFromData && ((Array.isArray(failedFromData.failed_by_step_by_day) && failedFromData.failed_by_step_by_day.length > 0) || (Array.isArray(failedFromData.unrecovered_by_step) && failedFromData.unrecovered_by_step.length > 0))
    if (hasFailed) {
      return {
        ...DEFAULT_FAILED_DATA,
        failed_by_step_by_day: failedFromData.failed_by_step_by_day ?? [],
        unrecovered_by_step: failedFromData.unrecovered_by_step ?? [],
      }
    }
    return props.failedData ?? DEFAULT_FAILED_DATA
  })

  // Computed para colores dinámicos del Sankey (basado en sellerMetrics)
  const sankeyNodeColors = computed(() => {
    const baseColors = {
      // Main flow progression - from blue to purple to green
      'Checkin Init': '#93C5FD', // Blue for started state
      'Booking retrive': '#C7D2FE', // Light purple
      'Booking retrive success': '#A5B4FC', // Medium purple for success
      'Number of Passengers': '#8B8CF6', // Medium purple
      Completed: '#A7F3D0', // Light green
      'Closed with BP': '#7BE39E', // Green for success

      // Abandoned states - progressive yellow/orange
      'Abandoned (Init)': '#FCA5A5', // Light red
      'Abandoned (Started)': '#F87171', // Medium red
      'Abandoned (Flow)': '#EF4444', // Darker red

      'BP Error': '#EF4444', // Darker red for boarding pass error
      // Failed states - progressive red intensity
      Unrecovered: '#F87171', // Medium red for main unrecovered node
    }

    // Agregar colores para pasos específicos de unrecovered dinámicamente
    const unrecoveredSteps = failedDataInternal.value.unrecovered_by_step || []
    unrecoveredSteps.forEach(step => {
      const stepName = step.step_name.replace(/_/g, ' ')
      const capitalizedStepName = stepName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      // Different red intensities for different error types
      const errorColors = {
        'Get Seatmap': '#DC2626',
        'Save Missing Info': '#F87171',
        'Checkin Segments': '#EF4444',
        'Assign Seat': '#F87171',
      }

      baseColors[capitalizedStepName] = errorColors[capitalizedStepName] || '#DC2626'
    })

    return baseColors
  })

  const calculatePercentage = (value, total) => {
    if (!total || total === 0) return '0%'
    return `${Math.round((value / total) * 100)}%`
  }

  const formatValueWithPercentage = (value, total) => {
    const formattedValue = useNumberFormat(value)
    const percentage = calculatePercentage(value, total)
    return `${formattedValue} (${percentage})`
  }

  const getTotalFailedSteps = failedSteps => {
    return failedSteps.reduce((acc, step) => acc + step.failed_count, 0)
  }

  // Computed para generar datos del Sankey
  const sankeyData = computed(() => {
    const nodes = []
    const links = []

    if (!checkinDataInternal.value.total_checkin_initiated) {
      return { nodes, links }
    }

    // Nodos principales del flujo
    nodes.push({ name: 'Checkin Init' })
    nodes.push({ name: 'Booking retrive' })
    nodes.push({ name: 'Booking retrive success' })
    nodes.push({ name: 'Number of Passengers' })
    nodes.push({ name: 'Completed' })
    nodes.push({ name: 'Closed with BP' })

    // Enlaces del flujo feliz
    const initiated = checkinDataInternal.value.total_checkin_initiated
    const init = checkinDataInternal.value.total_checkin_init
    const abandonedInit = checkinDataInternal.value.total_checkin_init_abandoned
    const bookingSuccess = init - abandonedInit
    const started = checkinDataInternal.value.total_checkin_started
    const completed = checkinDataInternal.value.total_checkin_completed
    const closed = checkinDataInternal.value.total_checkin_closed
    const unrecoveredSteps = failedDataInternal.value.unrecovered_by_step || []
    const totalUnrecovered = unrecoveredSteps.reduce((sum, step) => sum + step.count, 0)

    // Flujo principal: Checkin Init -> Booking retrive (usar initiated como base 100%)
    if (init > 0) {
      const percentage = Math.round((init / initiated) * 100)
      links.push({
        source: 'Checkin Init',
        target: 'Booking retrive',
        value: init,
        label: `${init.toLocaleString()} (${percentage}%)`,
      })
    }

    // Abandono 1: Checkin Init -> Abandonados (antes de Booking retrive) (usar initiated como base)
    const abandonedBeforeInit = initiated - init
    if (abandonedBeforeInit > 0) {
      const percentage = Math.round((abandonedBeforeInit / initiated) * 100)
      nodes.push({ name: 'Abandoned (Init)' })
      links.push({
        source: 'Checkin Init',
        target: 'Abandoned (Init)',
        value: abandonedBeforeInit,
        label: `${abandonedBeforeInit.toLocaleString()} (${percentage}%)`,
      })
    }

    // Abandono 2: Booking retrive -> Abandonados (después de Booking retrive) (usar initiated como base)
    if (abandonedInit > 0) {
      const percentage = Math.round((abandonedInit / initiated) * 100)
      nodes.push({ name: 'Abandoned (Started)' })
      links.push({
        source: 'Booking retrive',
        target: 'Abandoned (Started)',
        value: abandonedInit,
        label: `${abandonedInit.toLocaleString()} (${percentage}%)`,
      })
    }

    // Flujo principal: Booking retrive -> Booking retrive success (usar initiated como base 100%)
    if (bookingSuccess > 0) {
      const percentage = Math.round((bookingSuccess / initiated) * 100)
      links.push({
        source: 'Booking retrive',
        target: 'Booking retrive success',
        value: bookingSuccess,
        label: `${bookingSuccess.toLocaleString()} (${percentage}%)`,
      })
    }

    // Flujo principal: Booking retrive success -> Number of Passengers (usar initiated como base 100%)
    if (started > 0) {
      const percentage = Math.round((started / initiated) * 100)
      links.push({
        source: 'Booking retrive success',
        target: 'Number of Passengers',
        value: started,
        label: `${started.toLocaleString()} (${percentage}%)`,
      })
    }

    // Desde aquí, usar Number of Passengers como base 100%
    // Flujo principal: Number of Passengers -> Completed
    if (completed > 0) {
      const percentage = Math.round((completed / started) * 100)
      links.push({
        source: 'Number of Passengers',
        target: 'Completed',
        value: completed,
        label: `${completed.toLocaleString()} (${percentage}%)`,
      })
    }

    // Errores no recuperables por paso (usar started como base)
    if (unrecoveredSteps.length > 0 && totalUnrecovered > 0) {
      nodes.push({ name: 'Unrecovered' })

      // Number of Passengers -> Unrecovered (nodo intermedio)
      const percentage = Math.round((totalUnrecovered / started) * 100)
      links.push({
        source: 'Number of Passengers',
        target: 'Unrecovered',
        value: totalUnrecovered,
        label: `${totalUnrecovered.toLocaleString()} (${percentage}%)`,
      })

      // Unrecovered -> cada paso específico (usar started como base)
      unrecoveredSteps.forEach(step => {
        const stepName = step.step_name.replace(/_/g, ' ')
        const capitalizedStepName = stepName
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')

        const stepPercentage = Math.round((step.count / started) * 100)
        nodes.push({ name: capitalizedStepName })
        links.push({
          source: 'Unrecovered',
          target: capitalizedStepName,
          value: step.count,
          label: `${step.count.toLocaleString()} (${stepPercentage}%)`,
        })
      })
    }

    // Abandono 3: Number of Passengers -> Abandonados (en flujo) (usar started como base)
    // Usuarios que llegaron a Number of Passengers pero no completaron ni tuvieron error no recuperable
    const abandonedFlow = started - (completed + totalUnrecovered)
    if (abandonedFlow > 0) {
      const percentage = Math.round((abandonedFlow / started) * 100)
      nodes.push({ name: 'Abandoned (Flow)' })
      links.push({
        source: 'Number of Passengers',
        target: 'Abandoned (Flow)',
        value: abandonedFlow,
        label: `${abandonedFlow.toLocaleString()} (${percentage}%)`,
      })
    }

    // Error Boarding Pass: Completed -> BP Error (usar started como base)
    // Se agrega después de todos los errores para mantener el orden vertical
    const bpError = completed - closed
    if (bpError > 0) {
      const percentage = Math.round((bpError / started) * 100)
      nodes.push({ name: 'BP Error' })
      links.push({
        source: 'Completed',
        target: 'BP Error',
        value: bpError,
        label: `${bpError.toLocaleString()} (${percentage}%)`,
      })
    }

    // Flujo principal: Completed -> Closed with BP (usar started como base)
    if (closed > 0) {
      const percentage = Math.round((closed / started) * 100)
      links.push({
        source: 'Completed',
        target: 'Closed with BP',
        value: closed,
        label: `${closed.toLocaleString()} (${percentage}%)`,
      })
    }

    return { nodes, links }
  })

  // Procesa los datos para la tabla cuando cambian los props
  const processTableData = () => {
    const checkinByDay = checkinDataInternal.value.checkin_by_day || []
    const failedByStepByDay = failedDataInternal.value.failed_by_step_by_day || []

    if (checkinByDay.length === 0) {
      tableData.value = []
      return
    }

    // Combine data for table
    tableData.value = [...checkinByDay].map(dayData => {
      const failedDayData = failedByStepByDay.find(
        failedDay => failedDay.date === dayData.date
      )

      return {
        ...dayData,
        failed_steps: failedDayData?.steps || [],
      }
    })

    // Sort by date ascending
    tableData.value.sort((a, b) => new Date(a.date) - new Date(b.date))
  }

  // Watch para procesar datos cuando cambien los props
  watch(
    [() => props.checkinData, () => props.failedData],
    () => {
      processTableData()
    },
    { deep: true, immediate: true }
  )
</script>

<style scoped>
/* Main Card Styles */
.checkin-metrics-card {
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
  display: flex;
  flex-direction: column;
  height: 100%;
}

.checkin-metrics-card:hover {
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

/* Header Styles */
.card-header {
  margin-bottom: 32px;
  position: relative;
}

.header-content {
  width: 100%;
}

.card-title {
  font-family: 'Space Grotesk', 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 24px;
  font-weight: 700;
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
  animation: fadeIn 0.5s ease-out;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Chart Section */
.chart-section {
  margin-bottom: 32px;
  animation: fadeIn 0.5s ease-out;
}

.section-header {
  margin-bottom: 20px;
}

.section-title {
  font-family: 'Space Grotesk', 'DM Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px 0;
  letter-spacing: -0.01em;
}

.section-description {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.chart-wrapper {
  background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* Table Section */
.table-section {
  margin-top: 24px;
  animation: fadeIn 0.6s ease-out 0.1s backwards;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  background: white;
  flex: 1;
}

.data-table {
  width: 100%;
  font-size: 0.875rem;
  border-collapse: separate;
  border-spacing: 0;
}

.table-header-row {
  background: linear-gradient(to bottom, #f9fafb 0%, #f3f4f6 100%);
}

.table-header {
  padding: 16px 12px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid #e5e7eb;
}

.table-header:first-child {
  border-top-left-radius: 16px;
}

.table-header:last-child {
  border-top-right-radius: 16px;
}

.table-body {
  background: white;
}

.table-row {
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f3f4f6;
}

.table-row:hover {
  background: linear-gradient(to right, #fafafa 0%, #f9fafb 100%);
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 16px 12px;
  font-size: 0.875rem;
  color: #1e293b;
  white-space: nowrap;
}

.failed-steps {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.failed-step-item {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 0.75rem;
}

.step-name {
  color: #64748b;
  text-transform: capitalize;
}

.step-count {
  font-weight: 600;
  color: #ef4444;
}

.empty-cell {
  text-align: center;
  color: #cbd5e1;
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
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  border-radius: 20px;
  margin: 0 auto 20px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
}

.empty-icon {
  width: 40px;
  height: 40px;
  color: #10b981;
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
  min-height: 400px;
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
  height: 120px;
  margin-bottom: 24px;
}

.flow-line {
  width: 10px;
  background: linear-gradient(to top, #10b981 0%, #059669 50%, #047857 100%);
  border-radius: 5px;
  animation: wave 1.5s ease-in-out infinite;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.flow-1 {
  height: 35%;
  animation-delay: 0s;
}

.flow-2 {
  height: 55%;
  animation-delay: 0.1s;
}

.flow-3 {
  height: 75%;
  animation-delay: 0.2s;
}

.flow-4 {
  height: 55%;
  animation-delay: 0.3s;
}

.flow-5 {
  height: 45%;
  animation-delay: 0.4s;
}

.loading-text {
  font-size: 15px;
  font-weight: 500;
  color: #64748b;
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
  .checkin-metrics-card {
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

  .section-title {
    font-size: 1rem;
  }

  .section-description {
    font-size: 0.8125rem;
  }

  .chart-wrapper {
    padding: 16px;
  }

  .table-header {
    padding: 12px 8px;
    font-size: 0.7rem;
  }

  .table-cell {
    padding: 12px 8px;
    font-size: 0.8125rem;
  }
}
</style>
