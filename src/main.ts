import type { App } from 'vue';

// ============================================
// Charts básicos
// ============================================
import ChartBar from './stories/Charts/Bar/ChartBar.vue';
import ChartLine from './stories/Charts/Line/ChartLine.vue';
import PieChart from './stories/Charts/Pie/PieChart.vue';
import BoxplotChart from './stories/Charts/Boxplot/BoxplotChart.vue';
import CandlestickChart from './stories/Charts/Candlestick/CandlestickChart.vue';
import HistogramChart from './stories/Charts/Histogram/HistogramChart.vue';
import SankeyChart from './stories/Charts/Sankey/SankeyChart.vue';

// ============================================
// Business Metrics
// ============================================
import BookingManager from './stories/Charts/BusinessMetrics/BookingManager/BookingManager.vue';
import Checkin from './stories/Charts/BusinessMetrics/Checkin/Checkin.vue';
import CheckinSegments from './stories/Charts/BusinessMetrics/CheckinSegments/checkinSegments.vue';
import Disruption from './stories/Charts/BusinessMetrics/Disruption/Disruption.vue';
import FAQ from './stories/Charts/BusinessMetrics/FAQ/FAQ.vue';
import MessagesPerAgent from './stories/Charts/BusinessMetrics/MessagesPerAgent/MessagesPerAgent.vue';
import RecordLocator from './stories/Charts/BusinessMetrics/RecordLocator/RecordLocator.vue';
import Seller from './stories/Charts/BusinessMetrics/Seller/Seller.vue';

// NPS Metrics
import NpsDailyMetrics from './stories/Charts/BusinessMetrics/Nps/npsDailyMetrics.vue';
import NpsMetrics from './stories/Charts/BusinessMetrics/Nps/npsMetrics.vue';
import NpsOverviewMetrics from './stories/Charts/BusinessMetrics/Nps/npsOverviewMetrics.vue';

// ============================================
// Estilos
// ============================================
import './style.css';

// ============================================
// Exports nombrados para importación directa
// ============================================
export {
  // Charts básicos
  ChartBar,
  ChartLine,
  PieChart,
  BoxplotChart,
  CandlestickChart,
  HistogramChart,
  SankeyChart,
  // Business Metrics
  BookingManager,
  Checkin,
  CheckinSegments,
  Disruption,
  FAQ,
  MessagesPerAgent,
  RecordLocator,
  Seller,
  // NPS Metrics
  NpsDailyMetrics,
  NpsMetrics,
  NpsOverviewMetrics,
};

// ============================================
// Plugin de Vue (para app.use())
// ============================================
export const KiutUIPlugin = {
  install(app: App) {
    // Charts básicos
    app.component('KiutChartBar', ChartBar);
    app.component('KiutChartLine', ChartLine);
    app.component('KiutPieChart', PieChart);
    app.component('KiutBoxplotChart', BoxplotChart);
    app.component('KiutCandlestickChart', CandlestickChart);
    app.component('KiutHistogramChart', HistogramChart);
    app.component('KiutSankeyChart', SankeyChart);
    
    // Business Metrics
    app.component('KiutBookingManager', BookingManager);
    app.component('KiutCheckin', Checkin);
    app.component('KiutCheckinSegments', CheckinSegments);
    app.component('KiutDisruption', Disruption);
    app.component('KiutFAQ', FAQ);
    app.component('KiutMessagesPerAgent', MessagesPerAgent);
    app.component('KiutRecordLocator', RecordLocator);
    app.component('KiutSeller', Seller);
    app.component('KiutNpsDailyMetrics', NpsDailyMetrics);
    app.component('KiutNpsMetrics', NpsMetrics);
    app.component('KiutNpsOverviewMetrics', NpsOverviewMetrics);
  }
};
