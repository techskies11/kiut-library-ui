<template>
    <article class="checkin-metrics-card">
        <header class="card-header">
            <div class="header-content">
                <h3 class="card-title">Check-in Metrics</h3>
                <p class="card-subtitle">Check-in performance and failure analysis</p>
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
                <p class="loading-text">Loading check-in data...</p>
            </div>
        </div>

        <!-- Content when loaded -->
        <div v-else class="card-body">
            <!-- Sankey Flow Chart -->
            <div v-if="sankeyData.nodes.length > 0" class="sankey-section">
                <SankeyChart
                    :data="sankeyData"
                    :height="'500px'"
                    :node-colors="sankeyNodeColors"
                    :use-gradient="false"
                    :node-gap="30"
                />
            </div>

            <!-- Table Data -->
            <div v-if="tableData && tableData.length > 0" class="table-section">
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
                            <tr v-for="row in tableData" :key="row.date" class="table-row">
                                <td class="table-cell date-cell">{{ formatDate(row.date) }}</td>
                                <td class="table-cell text-center">{{ formatNumber(row.checkin_initiated_count) }}</td>
                                <td class="table-cell text-center">{{ formatValueWithPercentage(row.checkin_init_count, row.checkin_initiated_count) }}</td>
                                <td class="table-cell text-center">{{ formatNumber(row.checkin_started_count) }}</td>
                                <td class="table-cell text-center">{{ formatValueWithPercentage(row.checkin_completed_count, row.checkin_started_count) }}</td>
                                <td class="table-cell text-center">{{ formatValueWithPercentage(row.checkin_closed_count, row.checkin_started_count) }}</td>
                                <td class="table-cell text-center">{{ formatValueWithPercentage(getTotalFailedSteps(row.failed_steps), row.checkin_started_count) }}</td>
                                <td class="table-cell reasons-cell">
                                    <div v-if="row.failed_steps && row.failed_steps.length > 0" class="reasons-list">
                                        <div v-for="step in row.failed_steps" :key="step.step_name" class="reason-item">
                                            <span class="reason-name">{{ formatStepName(step.step_name) }}:</span>
                                            <span class="reason-count">{{ step.failed_count }}</span>
                                        </div>
                                    </div>
                                    <div v-else class="no-reasons">-</div>
                                </td>
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
                    <p class="empty-title">No check-in data available</p>
                    <p class="empty-description">Try adjusting the date range or check your filters to see check-in metrics.</p>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import SankeyChart from '../../Sankey/SankeyChart.vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

// Types
interface CheckinByDay {
    date: string;
    checkin_init_count: number;
    checkin_started_count: number;
    checkin_completed_count: number;
    checkin_closed_count: number;
    checkin_init_abandoned_count: number;
    checkin_initiated_count: number;
}

interface CheckinData {
    airline_name?: string;
    start_date?: string;
    end_date?: string;
    total_checkin_init?: number;
    total_checkin_started?: number;
    total_checkin_completed?: number;
    total_checkin_closed?: number;
    total_checkin_init_abandoned?: number;
    total_checkin_initiated?: number;
    total_checkin_unrecovered?: number;
    checkin_by_day?: CheckinByDay[];
}

interface FailedStep {
    step_name: string;
    failed_count: number;
}

interface FailedByDay {
    date: string;
    steps: FailedStep[];
}

interface UnrecoveredByStep {
    step_name: string;
    count: number;
}

interface FailedData {
    airline_name?: string;
    start_date?: string;
    end_date?: string;
    total_checkin_failed?: number;
    total_checkin_unrecovered?: number;
    total_checkin_init_abandoned?: number;
    failed_by_step_by_day?: FailedByDay[];
    unrecovered_by_step?: UnrecoveredByStep[];
}

interface TableRow extends CheckinByDay {
    failed_steps: FailedStep[];
}

const props = withDefaults(defineProps<{
    checkinData?: CheckinData;
    failedData?: FailedData;
    loading?: boolean;
    theme?: Theme;
    enableExport?: boolean;
    exportLoading?: boolean;
}>(), {
    checkinData: () => ({
        total_checkin_init: 0,
        total_checkin_initiated: 0,
        total_checkin_init_abandoned: 0,
        total_checkin_started: 0,
        total_checkin_completed: 0,
        total_checkin_closed: 0,
        total_checkin_unrecovered: 0,
        checkin_by_day: [],
    }),
    failedData: () => ({
        total_checkin_failed: 0,
        failed_by_step_by_day: [],
        unrecovered_by_step: [],
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

// Utility functions
const formatNumber = (value: number | undefined): string => {
    if (value === undefined || value === null) return '0';
    return value.toLocaleString();
};

const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const formatStepName = (stepName: string): string => {
    return stepName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const calculatePercentage = (value: number, total: number): string => {
    if (!total || total === 0) return '0%';
    return `${Math.round((value / total) * 100)}%`;
};

const formatValueWithPercentage = (value: number | undefined, total: number | undefined): string => {
    const v = value || 0;
    const t = total || 0;
    const formattedValue = formatNumber(v);
    const percentage = calculatePercentage(v, t);
    return `${formattedValue} (${percentage})`;
};

const getTotalFailedSteps = (failedSteps: FailedStep[] | undefined): number => {
    if (!failedSteps) return 0;
    return failedSteps.reduce((acc, step) => acc + step.failed_count, 0);
};

// Computed: Colores dinámicos del Sankey
const sankeyNodeColors = computed(() => {
    const baseColors: Record<string, string> = {
        'Checkin Init': '#93C5FD',
        'Booking retrive': '#C7D2FE',
        'Booking retrive success': '#A5B4FC',
        'Number of Passengers': '#8B8CF6',
        'Completed': '#A7F3D0',
        'Closed with BP': '#7BE39E',
        'Abandoned (Init)': '#FCA5A5',
        'Abandoned (Started)': '#F87171',
        'Abandoned (Flow)': '#EF4444',
        'BP Error': '#EF4444',
        'Unrecovered': '#F87171',
    };

    const unrecoveredSteps = props.failedData?.unrecovered_by_step || [];
    unrecoveredSteps.forEach(step => {
        const stepName = step.step_name.replace(/_/g, ' ');
        const capitalizedStepName = stepName
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const errorColors: Record<string, string> = {
            'Get Seatmap': '#DC2626',
            'Save Missing Info': '#F87171',
            'Checkin Segments': '#EF4444',
            'Assign Seat': '#F87171',
        };

        baseColors[capitalizedStepName] = errorColors[capitalizedStepName] || '#DC2626';
    });

    return baseColors;
});

// Computed: Datos combinados para la tabla
const tableData = computed((): TableRow[] => {
    const checkinByDay = props.checkinData?.checkin_by_day || [];
    const failedByDay = props.failedData?.failed_by_step_by_day || [];

    const combined = checkinByDay.map(dayData => {
        const failedDayData = failedByDay.find(failedDay => failedDay.date === dayData.date);
        return {
            ...dayData,
            failed_steps: failedDayData?.steps || [],
        };
    });

    // Sort by date ascending
    return combined.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
});

// Computed: Datos del Sankey
const sankeyData = computed(() => {
    const nodes: { name: string }[] = [];
    const links: { source: string; target: string; value: number; label: string }[] = [];

    if (!props.checkinData?.total_checkin_initiated) {
        return { nodes, links };
    }

    // Nodos principales del flujo
    nodes.push({ name: 'Checkin Init' });
    nodes.push({ name: 'Booking retrive' });
    nodes.push({ name: 'Booking retrive success' });
    nodes.push({ name: 'Number of Passengers' });
    nodes.push({ name: 'Completed' });
    nodes.push({ name: 'Closed with BP' });

    // Valores
    const initiated = props.checkinData.total_checkin_initiated || 0;
    const init = props.checkinData.total_checkin_init || 0;
    const abandonedInit = props.checkinData.total_checkin_init_abandoned || 0;
    const bookingSuccess = init - abandonedInit;
    const started = props.checkinData.total_checkin_started || 0;
    const completed = props.checkinData.total_checkin_completed || 0;
    const closed = props.checkinData.total_checkin_closed || 0;
    const unrecoveredSteps = props.failedData?.unrecovered_by_step || [];
    const totalUnrecovered = unrecoveredSteps.reduce((sum, step) => sum + step.count, 0);

    // Flujo principal: Checkin Init -> Booking retrive
    if (init > 0) {
        const percentage = Math.round((init / initiated) * 100);
        links.push({
            source: 'Checkin Init',
            target: 'Booking retrive',
            value: init,
            label: `${init.toLocaleString()} (${percentage}%)`,
        });
    }

    // Abandono 1: Checkin Init -> Abandonados (antes de Booking retrive)
    const abandonedBeforeInit = initiated - init;
    if (abandonedBeforeInit > 0) {
        const percentage = Math.round((abandonedBeforeInit / initiated) * 100);
        nodes.push({ name: 'Abandoned (Init)' });
        links.push({
            source: 'Checkin Init',
            target: 'Abandoned (Init)',
            value: abandonedBeforeInit,
            label: `${abandonedBeforeInit.toLocaleString()} (${percentage}%)`,
        });
    }

    // Abandono 2: Booking retrive -> Abandonados
    if (abandonedInit > 0) {
        const percentage = Math.round((abandonedInit / initiated) * 100);
        nodes.push({ name: 'Abandoned (Started)' });
        links.push({
            source: 'Booking retrive',
            target: 'Abandoned (Started)',
            value: abandonedInit,
            label: `${abandonedInit.toLocaleString()} (${percentage}%)`,
        });
    }

    // Flujo principal: Booking retrive -> Booking retrive success
    if (bookingSuccess > 0) {
        const percentage = Math.round((bookingSuccess / initiated) * 100);
        links.push({
            source: 'Booking retrive',
            target: 'Booking retrive success',
            value: bookingSuccess,
            label: `${bookingSuccess.toLocaleString()} (${percentage}%)`,
        });
    }

    // Flujo principal: Booking retrive success -> Number of Passengers
    if (started > 0) {
        const percentage = Math.round((started / initiated) * 100);
        links.push({
            source: 'Booking retrive success',
            target: 'Number of Passengers',
            value: started,
            label: `${started.toLocaleString()} (${percentage}%)`,
        });
    }

    // Flujo principal: Number of Passengers -> Completed
    if (completed > 0) {
        const percentage = Math.round((completed / started) * 100);
        links.push({
            source: 'Number of Passengers',
            target: 'Completed',
            value: completed,
            label: `${completed.toLocaleString()} (${percentage}%)`,
        });
    }

    // Errores no recuperables por paso
    if (unrecoveredSteps.length > 0 && totalUnrecovered > 0) {
        nodes.push({ name: 'Unrecovered' });

        const percentage = Math.round((totalUnrecovered / started) * 100);
        links.push({
            source: 'Number of Passengers',
            target: 'Unrecovered',
            value: totalUnrecovered,
            label: `${totalUnrecovered.toLocaleString()} (${percentage}%)`,
        });

        unrecoveredSteps.forEach(step => {
            const stepName = step.step_name.replace(/_/g, ' ');
            const capitalizedStepName = stepName
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            const stepPercentage = Math.round((step.count / started) * 100);
            nodes.push({ name: capitalizedStepName });
            links.push({
                source: 'Unrecovered',
                target: capitalizedStepName,
                value: step.count,
                label: `${step.count.toLocaleString()} (${stepPercentage}%)`,
            });
        });
    }

    // Abandono 3: Number of Passengers -> Abandonados (en flujo)
    const abandonedFlow = started - (completed + totalUnrecovered);
    if (abandonedFlow > 0) {
        const percentage = Math.round((abandonedFlow / started) * 100);
        nodes.push({ name: 'Abandoned (Flow)' });
        links.push({
            source: 'Number of Passengers',
            target: 'Abandoned (Flow)',
            value: abandonedFlow,
            label: `${abandonedFlow.toLocaleString()} (${percentage}%)`,
        });
    }

    // Error Boarding Pass: Completed -> BP Error
    const bpError = completed - closed;
    if (bpError > 0) {
        const percentage = Math.round((bpError / started) * 100);
        nodes.push({ name: 'BP Error' });
        links.push({
            source: 'Completed',
            target: 'BP Error',
            value: bpError,
            label: `${bpError.toLocaleString()} (${percentage}%)`,
        });
    }

    // Flujo principal: Completed -> Closed with BP
    if (closed > 0) {
        const percentage = Math.round((closed / started) * 100);
        links.push({
            source: 'Completed',
            target: 'Closed with BP',
            value: closed,
            label: `${closed.toLocaleString()} (${percentage}%)`,
        });
    }

    return { nodes, links };
});

// Expose isDark for potential use in templates
defineExpose({ isDark })
</script>

<style scoped>
/* Main Card Styles */
.checkin-metrics-card {
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

.checkin-metrics-card:hover {
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

/* Sankey Section */
.sankey-section {
    margin-bottom: 32px;
}

/* Table Section */
.table-section {
    margin-top: 24px;
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
.table-row:last-child {
    border-bottom: none;
}

.table-body {
    background: var(--kiut-bg-table);
}

.date-cell {
    font-weight: 500;
    white-space: nowrap;
}

.reasons-cell {
    text-align: left !important;
    min-width: 150px;
}

.reasons-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.reason-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
}

.reason-name {
    color: var(--kiut-text-secondary);
}

.reason-count {
    font-weight: 600;
    color: var(--kiut-danger);
}

.no-reasons {
    color: var(--kiut-text-muted);
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
    .checkin-metrics-card {
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
