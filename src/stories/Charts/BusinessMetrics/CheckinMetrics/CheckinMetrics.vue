<template>
    <ChartMetricContainer
        class="checkin-metrics-root h-full min-h-0"
        title="Check-in Metrics"
        subtitle="Check-in performance and failure analysis"
        :default-open="initiallyOpen"
    >
        <template
            v-if="enableExport && !loading && tableData && tableData.length > 0"
            #headerExport
        >
            <FooterExport
                variant="inline"
                @export="handleExport"
                :loading="exportLoading"
            />
        </template>
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

            <!-- Table Data (chrome de tabla: Utils/Table) -->
            <div v-if="tableData && tableData.length > 0" class="checkin-metrics-daily-section">
                <div class="w-full min-w-0">
                    <Table
                        :columns="checkinMetricsTableColumns"
                        :rows="checkinMetricsTableRows"
                        :max-visible-rows="3"
                        row-key="id"
                    >
                        <template #cell-date="{ row }">
                            <span class="font-medium whitespace-nowrap">{{ formatDate(String(row.date)) }}</span>
                        </template>
                        <template #cell-checkinInit="{ row }">
                            <span>{{ formatNumber(row.checkin_initiated as number) }}</span>
                        </template>
                        <template #cell-bookingRetrieval="{ row }">
                            <span>{{ formatValueWithPercentage(row.record_locator_init_count as number, row.checkin_initiated as number) }}</span>
                        </template>
                        <template #cell-bookingRetrieved="{ row }">
                            <span>{{ formatValueWithPercentage(row.record_locator_started_count as number, row.record_locator_init_count as number) }}</span>
                        </template>
                        <template #cell-completed="{ row }">
                            <span>{{ formatValueWithPercentage(row.record_locator_completed_count as number, row.record_locator_started_count as number) }}</span>
                        </template>
                        <template #cell-closed="{ row }">
                            <span class="cell-success">{{ formatValueWithPercentage(row.record_locator_closed_count as number, row.record_locator_started_count as number) }}</span>
                        </template>
                        <template #cell-failed="{ row }">
                            <span class="cell-danger">{{ formatValueWithPercentage(row.unrecovered_count as number, row.record_locator_started_count as number) }}</span>
                        </template>
                        <template #cell-reasons="{ row }">
                            <div v-if="Array.isArray(row.failed_steps) && row.failed_steps.length > 0" class="reasons-list">
                                <div v-for="step in row.failed_steps" :key="step.step_name" class="reason-item">
                                    <span class="reason-name">{{ formatStepName(step.step_name) }}:</span>
                                    <span class="reason-count">{{ step.failed_count }}</span>
                                </div>
                            </div>
                            <div v-else class="no-reasons">-</div>
                        </template>
                    </Table>
                </div>
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
    </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import moment from 'moment'
import SankeyChart from '../../Sankey/SankeyChart.vue'
import ChartMetricContainer from '../../Utils/ChartMetricContainer/ChartMetricContainer.vue'
import { ChartBarIcon } from '@heroicons/vue/24/outline'
import { FooterExport, type ExportFormat } from '../../Utils/FooterExport'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'
import Table, { type TableColumn } from '../../Utils/Table/Table.vue'

// Types
interface CheckinByDay {
    date: string;
    checkin_initiated: number;
    record_locator_init_count: number;
    record_locator_started_count: number;
    record_locator_completed_count: number;
    record_locator_closed_count: number;
    record_locator_abandoned_count: number;
}

interface CheckinData {
    airline_name?: string;
    start_date?: string;
    end_date?: string;
    total_record_locator_init?: number;
    total_record_locator_started?: number;
    total_record_locator_completed?: number;
    total_record_locator_closed?: number;
    total_record_locator_init_abandoned?: number;
    total_checkin_initiated?: number;
    total_record_locator_unrecovered?: number;
    total_record_locator_init_abandoned_error?: number | null;
    total_record_locator_init_abandoned_voluntary?: number | null;
    total_checkin_pre_init_abandoned_error?: number | null;
    total_checkin_pre_init_abandoned_voluntary?: number | null;
    record_locator_by_day?: CheckinByDay[];
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

interface UnrecoveredByStepByDay {
    date: string;
    steps: { step_name: string; count: number }[];
}

interface UnrecoveredByDay {
    date: string;
    unrecovered_count: number;
}

interface FailedData {
    airline_name?: string;
    start_date?: string;
    end_date?: string;
    total_checkin_failed?: number;
    total_checkin_unrecovered?: number;
    total_checkin_init_abandoned?: number;
    failed_by_step_by_day?: FailedByDay[];
    unrecovered_by_step_by_day?: UnrecoveredByStepByDay[];
    unrecovered_by_day?: UnrecoveredByDay[];
    unrecovered_by_step?: UnrecoveredByStep[];
}

interface TableRow extends CheckinByDay {
    failed_steps: FailedStep[];
    unrecovered_count: number;
}

const props = withDefaults(defineProps<{
    initiallyOpen?: boolean;
    checkinData?: CheckinData;
    failedData?: FailedData;
    loading?: boolean;
    theme?: Theme;
    enableExport?: boolean;
    exportLoading?: boolean;
}>(), {
    initiallyOpen: false,
    checkinData: () => ({
        total_record_locator_init: 0,
        total_checkin_initiated: 0,
        total_record_locator_init_abandoned: 0,
        total_record_locator_started: 0,
        total_record_locator_completed: 0,
        total_record_locator_closed: 0,
        total_record_locator_unrecovered: 0,
        total_record_locator_init_abandoned_error: null,
        total_record_locator_init_abandoned_voluntary: null,
        total_checkin_pre_init_abandoned_error: null,
        total_checkin_pre_init_abandoned_voluntary: null,
        record_locator_by_day: [],
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
    // Parse as local calendar date (Y-M-D parts) to avoid UTC midnight → previous day shift
    const [year, month, day] = dateStr.split('-').map(Number);
    return moment([year, month - 1, day]).format('MMM DD');
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

// Computed: Colores dinámicos del Sankey
const sankeyNodeColors = computed(() => {
    const baseColors: Record<string, string> = {
        'Checkin Init': '#93C5FD',
        'Booking Retrieval': '#C7D2FE',
        'Booking Retrieved': '#A5B4FC',
        'Completed': '#A7F3D0',
        'Closed with BP': '#7BE39E',
        'Abandoned (Init)': '#FACC15',
        'Booking not retreived': '#F87171',
        'Abandoned (Started)': '#FACC15',
        'Error': '#F87171',
        'Abandoned (Flow)': '#FACC15',
        'BP Error': '#EF4444',
        'Errors': '#F87171',
    };

    return baseColors;
});

// Computed: Datos combinados para la tabla
const tableData = computed((): TableRow[] => {
    const checkinByDay = props.checkinData?.record_locator_by_day || [];
    const failedByDay = props.failedData?.failed_by_step_by_day || [];
    const unrecoveredByDay = props.failedData?.unrecovered_by_day || [];

    const combined = checkinByDay.map(dayData => {
        const failedDayData = failedByDay.find(d => d.date === dayData.date);
        const unrecoveredDayData = unrecoveredByDay.find(d => d.date === dayData.date);
        return {
            ...dayData,
            failed_steps: failedDayData?.steps || [],
            unrecovered_count: unrecoveredDayData?.unrecovered_count || 0,
        };
    });

    return combined.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
});

const checkinMetricsTableColumns: TableColumn[] = [
    { key: 'date', label: 'Date', align: 'center' },
    { key: 'checkinInit', label: 'Checkin Init', align: 'center' },
    { key: 'bookingRetrieval', label: 'Booking Retrieval (%)', align: 'center' },
    { key: 'bookingRetrieved', label: 'Booking Retrieved', align: 'center' },
    { key: 'completed', label: 'Completed (%)', align: 'center' },
    { key: 'closed', label: 'Closed with BP (%)', align: 'center' },
    { key: 'failed', label: 'Errors (%)', align: 'center' },
    { key: 'reasons', label: 'Failed (Reasons)', align: 'left' },
];

const checkinMetricsTableRows = computed((): Record<string, unknown>[] =>
    tableData.value.map((row) => ({
        id: row.date,
        date: row.date,
        checkin_initiated: row.checkin_initiated,
        record_locator_init_count: row.record_locator_init_count,
        record_locator_started_count: row.record_locator_started_count,
        record_locator_completed_count: row.record_locator_completed_count,
        record_locator_closed_count: row.record_locator_closed_count,
        unrecovered_count: row.unrecovered_count,
        failed_steps: row.failed_steps,
    }))
);

// Computed: Datos del Sankey
const sankeyData = computed(() => {
    const nodes: { name: string }[] = [];
    const links: { source: string; target: string; value: number; label: string }[] = [];
    const nodeNames = new Set<string>();
    const addNode = (name: string): void => {
        if (!nodeNames.has(name)) {
            nodes.push({ name });
            nodeNames.add(name);
        }
    };

    if (!props.checkinData?.total_checkin_initiated) {
        return { nodes, links };
    }

    addNode('Checkin Init');
    addNode('Booking Retrieval');
    addNode('Booking Retrieved');
    addNode('Completed');
    addNode('Closed with BP');

    const initiated = props.checkinData.total_checkin_initiated || 0;
    const init = props.checkinData.total_record_locator_init || 0;
    const abandonedInit = props.checkinData.total_record_locator_init_abandoned || 0;
    const preInitAbandonedErrorRaw = props.checkinData.total_checkin_pre_init_abandoned_error;
    const preInitAbandonedVoluntaryRaw = props.checkinData.total_checkin_pre_init_abandoned_voluntary;
    const hasPreInitAbandonedSplit =
        (preInitAbandonedErrorRaw !== null && preInitAbandonedErrorRaw !== undefined) ||
        (preInitAbandonedVoluntaryRaw !== null && preInitAbandonedVoluntaryRaw !== undefined);
    const preInitAbandonedError = hasPreInitAbandonedSplit
        ? Math.max(Number(preInitAbandonedErrorRaw) || 0, 0)
        : 0;
    const preInitAbandonedVoluntary = hasPreInitAbandonedSplit
        ? Math.max(Number(preInitAbandonedVoluntaryRaw) || 0, 0)
        : 0;
    const abandonedErrorRaw = props.checkinData.total_record_locator_init_abandoned_error;
    const abandonedVoluntaryRaw = props.checkinData.total_record_locator_init_abandoned_voluntary;
    const hasAbandonedSplit =
        (abandonedErrorRaw !== null && abandonedErrorRaw !== undefined) ||
        (abandonedVoluntaryRaw !== null && abandonedVoluntaryRaw !== undefined);
    const abandonedError = hasAbandonedSplit ? Math.max(Number(abandonedErrorRaw) || 0, 0) : 0;
    const abandonedVoluntary = hasAbandonedSplit ? Math.max(Number(abandonedVoluntaryRaw) || 0, 0) : 0;
    const abandonedStartedFallback = hasAbandonedSplit
        ? Math.max(abandonedInit - abandonedError - abandonedVoluntary, 0)
        : abandonedInit;
    const bookingSuccess = init - abandonedInit;
    const started = props.checkinData.total_record_locator_started || 0;
    const completed = props.checkinData.total_record_locator_completed || 0;
    const closed = props.checkinData.total_record_locator_closed || 0;
    const totalUnrecovered = props.checkinData.total_record_locator_unrecovered || 0;

    // Flujo principal: Checkin Init -> Booking Retrieval
    if (init > 0) {
        const percentage = Math.round((init / initiated) * 100);
        links.push({
            source: 'Checkin Init',
            target: 'Booking Retrieval',
            value: init,
            label: `${init.toLocaleString()} (${percentage}%)`,
        });
    }

    // Abandono 1: Checkin Init -> Abandonados (antes de Booking retrive)
    const abandonedBeforeInit = initiated - init;
    if (hasPreInitAbandonedSplit) {
        if (preInitAbandonedVoluntary > 0) {
            const percentage = Math.round((preInitAbandonedVoluntary / initiated) * 100);
            addNode('Abandoned (Init)');
            links.push({
                source: 'Checkin Init',
                target: 'Abandoned (Init)',
                value: preInitAbandonedVoluntary,
                label: `${preInitAbandonedVoluntary.toLocaleString()} (${percentage}%)`,
            });
        }

        if (preInitAbandonedError > 0) {
            const percentage = Math.round((preInitAbandonedError / initiated) * 100);
            addNode('Booking not retreived');
            links.push({
                source: 'Checkin Init',
                target: 'Booking not retreived',
                value: preInitAbandonedError,
                label: `${preInitAbandonedError.toLocaleString()} (${percentage}%)`,
            });
        }
    } else if (abandonedBeforeInit > 0) {
        const percentage = Math.round((abandonedBeforeInit / initiated) * 100);
        addNode('Abandoned (Init)');
        links.push({
            source: 'Checkin Init',
            target: 'Abandoned (Init)',
            value: abandonedBeforeInit,
            label: `${abandonedBeforeInit.toLocaleString()} (${percentage}%)`,
        });
    }

    // Abandono 2: Booking Retrieval -> Abandonados
    if (hasAbandonedSplit) {
        if (abandonedError > 0) {
            const percentage = Math.round((abandonedError / initiated) * 100);
            addNode('Error');
            links.push({
                source: 'Booking Retrieval',
                target: 'Error',
                value: abandonedError,
                label: `${abandonedError.toLocaleString()} (${percentage}%)`,
            });
        }

        if (abandonedVoluntary > 0) {
            const percentage = Math.round((abandonedVoluntary / initiated) * 100);
            addNode('Abandoned (Started)');
            links.push({
                source: 'Booking Retrieval',
                target: 'Abandoned (Started)',
                value: abandonedVoluntary,
                label: `${abandonedVoluntary.toLocaleString()} (${percentage}%)`,
            });
        }

        if (abandonedStartedFallback > 0) {
            const percentage = Math.round((abandonedStartedFallback / initiated) * 100);
            addNode('Abandoned (Started)');
            links.push({
                source: 'Booking Retrieval',
                target: 'Abandoned (Started)',
                value: abandonedStartedFallback,
                label: `${abandonedStartedFallback.toLocaleString()} (${percentage}%)`,
            });
        }
    } else if (abandonedInit > 0) {
        const percentage = Math.round((abandonedInit / initiated) * 100);
        addNode('Abandoned (Started)');
        links.push({
            source: 'Booking Retrieval',
            target: 'Abandoned (Started)',
            value: abandonedInit,
            label: `${abandonedInit.toLocaleString()} (${percentage}%)`,
        });
    }

    // Flujo principal: Booking Retrieval -> Booking Retrieved
    if (bookingSuccess > 0) {
        const percentage = Math.round((bookingSuccess / initiated) * 100);
        links.push({
            source: 'Booking Retrieval',
            target: 'Booking Retrieved',
            value: bookingSuccess,
            label: `${bookingSuccess.toLocaleString()} (${percentage}%)`,
        });
    }

    // Flujo principal: Booking Retrieved -> Completed
    if (completed > 0) {
        const percentage = Math.round((completed / started) * 100);
        links.push({
            source: 'Booking Retrieved',
            target: 'Completed',
            value: completed,
            label: `${completed.toLocaleString()} (${percentage}%)`,
        });
    }

    // Unrecovered conversations (single node, no step sub-breakdown)
    if (totalUnrecovered > 0) {
        addNode('Errors');

        const unrecoveredPct = Math.round((totalUnrecovered / started) * 100);
        links.push({
            source: 'Booking Retrieved',
            target: 'Errors',
            value: totalUnrecovered,
            label: `${totalUnrecovered.toLocaleString()} (${unrecoveredPct}%)`,
        });
    }

    // Abandono 3: Booking Retrieved -> Abandonados (en flujo)
    const abandonedFlow = started - (completed + totalUnrecovered);
    if (abandonedFlow > 0) {
        const percentage = Math.round((abandonedFlow / started) * 100);
        addNode('Abandoned (Flow)');
        links.push({
            source: 'Booking Retrieved',
            target: 'Abandoned (Flow)',
            value: abandonedFlow,
            label: `${abandonedFlow.toLocaleString()} (${percentage}%)`,
        });
    }

    // Error Boarding Pass: Completed -> BP Error
    const bpError = completed - closed;
    if (bpError > 0) {
        const percentage = Math.round((bpError / started) * 100);
        addNode('BP Error');
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

/* Bloque tabla diaria (celdas: reasons-list, cell-success, etc.) */
.checkin-metrics-daily-section {
    margin-top: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
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

.cell-success {
    color: #059669 !important;
    font-weight: 600;
}

.cell-danger {
    color: #DC2626 !important;
    font-weight: 600;
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

</style>
