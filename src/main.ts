import type { App } from 'vue';

// ============================================
// Charts básicos
// ============================================
export { default as ChartBar } from './stories/Charts/Bar/ChartBar.vue';
export { default as ChartLine } from './stories/Charts/Line/ChartLine.vue';
export { default as PieChart } from './stories/Charts/Pie/PieChart.vue';
export { default as BoxplotChart } from './stories/Charts/Boxplot/BoxplotChart.vue';
export { default as CandlestickChart } from './stories/Charts/Candlestick/CandlestickChart.vue';
export { default as HistogramChart } from './stories/Charts/Histogram/HistogramChart.vue';
export { default as SankeyChart } from './stories/Charts/Sankey/SankeyChart.vue';

// ============================================
// Business Metrics
// ============================================
export { default as BookingManager } from './stories/Charts/BusinessMetrics/BookingManager/BookingManager.vue';
export { default as Checkin } from './stories/Charts/BusinessMetrics/Checkin/Checkin.vue';
export { default as CheckinSegments } from './stories/Charts/BusinessMetrics/CheckinSegments/checkinSegments.vue';
export { default as Disruption } from './stories/Charts/BusinessMetrics/Disruption/Disruption.vue';
export { default as FAQ } from './stories/Charts/BusinessMetrics/FAQ/FAQ.vue';
export { default as MessagesPerAgent } from './stories/Charts/BusinessMetrics/MessagesPerAgent/MessagesPerAgent.vue';
export { default as RecordLocator } from './stories/Charts/BusinessMetrics/RecordLocator/RecordLocator.vue';
export { default as Seller } from './stories/Charts/BusinessMetrics/Seller/Seller.vue';

// NPS Metrics
export { default as NpsDailyMetrics } from './stories/Charts/BusinessMetrics/Nps/npsDailyMetrics.vue';
export { default as NpsMetrics } from './stories/Charts/BusinessMetrics/Nps/npsMetrics.vue';
export { default as NpsOverviewMetrics } from './stories/Charts/BusinessMetrics/Nps/npsOverviewMetrics.vue';

// ============================================
// Estilos
// ============================================
import './style.css';

// ============================================
// Plugin de Vue
// ============================================
export default {
  install(app: App) {
    // Charts básicos
    app.component('KiutChartBar', () => import('./stories/Charts/Bar/ChartBar.vue'));
    app.component('KiutChartLine', () => import('./stories/Charts/Line/ChartLine.vue'));
    app.component('KiutPieChart', () => import('./stories/Charts/Pie/PieChart.vue'));
    app.component('KiutBoxplotChart', () => import('./stories/Charts/Boxplot/BoxplotChart.vue'));
    app.component('KiutCandlestickChart', () => import('./stories/Charts/Candlestick/CandlestickChart.vue'));
    app.component('KiutHistogramChart', () => import('./stories/Charts/Histogram/HistogramChart.vue'));
    app.component('KiutSankeyChart', () => import('./stories/Charts/Sankey/SankeyChart.vue'));
    
    // Business Metrics
    app.component('KiutBookingManager', () => import('./stories/Charts/BusinessMetrics/BookingManager/BookingManager.vue'));
    app.component('KiutCheckin', () => import('./stories/Charts/BusinessMetrics/Checkin/Checkin.vue'));
    app.component('KiutCheckinSegments', () => import('./stories/Charts/BusinessMetrics/CheckinSegments/checkinSegments.vue'));
    app.component('KiutDisruption', () => import('./stories/Charts/BusinessMetrics/Disruption/Disruption.vue'));
    app.component('KiutFAQ', () => import('./stories/Charts/BusinessMetrics/FAQ/FAQ.vue'));
    app.component('KiutMessagesPerAgent', () => import('./stories/Charts/BusinessMetrics/MessagesPerAgent/MessagesPerAgent.vue'));
    app.component('KiutRecordLocator', () => import('./stories/Charts/BusinessMetrics/RecordLocator/RecordLocator.vue'));
    app.component('KiutSeller', () => import('./stories/Charts/BusinessMetrics/Seller/Seller.vue'));
    app.component('KiutNpsDailyMetrics', () => import('./stories/Charts/BusinessMetrics/Nps/npsDailyMetrics.vue'));
    app.component('KiutNpsMetrics', () => import('./stories/Charts/BusinessMetrics/Nps/npsMetrics.vue'));
    app.component('KiutNpsOverviewMetrics', () => import('./stories/Charts/BusinessMetrics/Nps/npsOverviewMetrics.vue'));
  }
};
