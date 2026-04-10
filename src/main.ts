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
import AgentsPerDay from './stories/Charts/BusinessMetrics/AgentsPerDay/AgentsPerDay.vue';
import BookingManager from './stories/Charts/BusinessMetrics/BookingManager/BookingManager.vue';
import Checkin from './stories/Charts/BusinessMetrics/Checkin/Checkin.vue';
import CheckinMetrics from './stories/Charts/BusinessMetrics/CheckinMetrics/CheckinMetrics.vue';
import CheckinSegments from './stories/Charts/BusinessMetrics/CheckinSegments/checkinSegments.vue';
import Disruption from './stories/Charts/BusinessMetrics/Disruption/Disruption.vue';
import FAQ from './stories/Charts/BusinessMetrics/FAQ/FAQ.vue';
import MessagesPerAgent from './stories/Charts/BusinessMetrics/MessagesPerAgent/MessagesPerAgent.vue';
import RecordLocator from './stories/Charts/BusinessMetrics/RecordLocator/RecordLocator.vue';
import SalesByChannel from './stories/Charts/BusinessMetrics/SalesByChannel/SalesByChannel.vue';
import Seller from './stories/Charts/BusinessMetrics/Seller/Seller.vue';
import TopAgents from './stories/Charts/BusinessMetrics/TopAgents/TopAgents.vue';
import PaymentMethod from './stories/Charts/BusinessMetrics/PaymentMethod/PaymentMethod.vue';
import AgentHumanConversations from './stories/Charts/BusinessMetrics/AgentHumanConv/AgentHumanConversations.vue';
import ChannelMetrics from './stories/Charts/BusinessMetrics/ChannelMetrics/ChannelMetrics.vue';
import TriageCombinations from './stories/Charts/BusinessMetrics/TriageCombinations/TriageCombinations.vue';
import SelectLanguage from './stories/Charts/BusinessMetrics/SelectLanguage/SelectLanguage.vue';
import Guardrails from './stories/Charts/BusinessMetrics/Guardrails/Guardrails.vue';
import DisruptionNotifier from './stories/Charts/BusinessMetrics/DisruptionNotifier/DisruptionNotifier.vue';
import TotalConversationsCard from './stories/Charts/BusinessMetrics/TotalConversationsCard/TotalConversationsCard.vue';
import CsatP95Card from './stories/Charts/BusinessMetrics/CsatP95Card/CsatP95Card.vue';
import AiGeneratedRevenueCard from './stories/Charts/BusinessMetrics/AiGeneratedRevenueCard/AiGeneratedRevenueCard.vue';

// NPS Metrics
import NpsDailyMetrics from './stories/Charts/BusinessMetrics/Nps/npsDailyMetrics.vue';
import NpsMetrics from './stories/Charts/BusinessMetrics/Nps/npsMetrics.vue';
import NpsOverviewMetrics from './stories/Charts/BusinessMetrics/Nps/npsOverviewMetrics.vue';

// ============================================
// Cost & Tokens
// ============================================
import AWSCost from './stories/Charts/AWSCost/AWSCost/AWSCost.vue';
import CostUsage from './stories/Charts/CostTokens/CostUsage/CostUsage.vue';
import TokenUsage from './stories/Charts/CostTokens/TokenUsage/TokenUsage.vue';
import ConversationCount from './stories/Charts/CostTokens/ConversationCount/ConversationCount.vue';
import TopAgentsAnalysis from './stories/Charts/CostTokens/TopAgentsAnalysis/TopAgentsAnalysis.vue';
import TopAgentsPie from './stories/Charts/CostTokens/TopAgents/TopAgents.vue';
import DailyCostTrends from './stories/Charts/CostTokens/DailyCostTrends/DailyCostTrends.vue';
import ModelUsage from './stories/Charts/CostTokens/ModelUsage/ModelUsage.vue';
import MessageRoles from './stories/Charts/CostTokens/MessageRoles/MessageRoles.vue';
import CostPerConversations from './stories/Charts/CostTokens/CostPerConversations/CostPerConversations.vue';

// ============================================
// Componentes UI
// ============================================
import Tabs from './components/Tabs/Tabs.vue';
export type { TabItem } from './components/Tabs/Tabs.vue';
import Table from './components/Table/Table.vue';
export type { TableColumn, TableColumnAlign } from './components/Table/Table.vue';
import Filters from './components/Filters/Filters.vue';
export type {
  FilterDefinition,
  FilterDefinitionDateRange,
  FilterDefinitionSelect,
  FilterDefinitionText,
  FilterOption,
  FiltersModelValue,
} from './components/Filters/Filters.vue';

import InputText from './components/Inputs/InputText.vue';
import InputFile from './components/Inputs/InputFile.vue';
import InputDateTime from './components/Inputs/InputDateTime.vue';
export type { KiutDateTimeValue } from './components/Inputs/InputDateTime.vue';
import InputRange from './components/Inputs/InputRange.vue';
export type { InputRangeOrientation } from './components/Inputs/InputRange.vue';
import InputNumber from './components/Inputs/InputNumber.vue';
import Select from './components/Inputs/Select.vue';
export type { KiutSelectOption, KiutSelectValue } from './components/Inputs/Select.vue';
import Toggle from './components/Inputs/Toggle.vue';
import InputPhone from './components/Inputs/InputPhone.vue';
export type { KiutPhoneValue } from './components/Inputs/InputPhone.vue';
import SelectablePills from './components/Inputs/SelectablePills.vue';
export type { KiutPillItem } from './components/Inputs/SelectablePills.vue';
import SegmentedControl from './components/Inputs/SegmentedControl.vue';
export type { SegmentedItem } from './components/Inputs/SegmentedControl.vue';
import DateRangePicker from './components/Inputs/DateRangePicker.vue';
export type { KiutDateRange } from './components/Inputs/DateRangePicker.vue';
import Tag from './components/Tag/Tag.vue';
export type { KiutTagColor } from './components/Tag/Tag.vue';
import Button from './components/Button/Button.vue';
export type { KiutButtonVariant, KiutButtonActionTone } from './components/Button/Button.vue';
import Modal from './components/Modal/Modal.vue';
import Section from './components/Section/Section.vue';

// ============================================
// Estilos
// ============================================
import './style.css';
import './tailwind.css';

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
  AgentsPerDay,
  BookingManager,
  Checkin,
  CheckinMetrics,
  CheckinSegments,
  Disruption,
  FAQ,
  MessagesPerAgent,
  RecordLocator,
  SalesByChannel,
  Seller,
  TopAgents,
  PaymentMethod,
  AgentHumanConversations,
  ChannelMetrics,
  TriageCombinations,
  SelectLanguage,
  Guardrails,
  DisruptionNotifier,
  TotalConversationsCard,
  CsatP95Card,
  AiGeneratedRevenueCard,
  // NPS Metrics
  NpsDailyMetrics,
  NpsMetrics,
  NpsOverviewMetrics,
  // Cost & Tokens
  AWSCost,
  CostUsage,
  TokenUsage,
  ConversationCount,
  TopAgentsAnalysis,
  TopAgentsPie,
  DailyCostTrends,
  ModelUsage,
  MessageRoles,
  CostPerConversations,
  // UI
  Tabs,
  Table,
  Filters,
  InputText,
  InputFile,
  InputDateTime,
  InputRange,
  InputNumber,
  Select,
  Toggle,
  InputPhone,
  SelectablePills,
  SegmentedControl,
  DateRangePicker,
  Tag,
  Button,
  Modal,
  Section,
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
    app.component('KiutAgentsPerDay', AgentsPerDay);
    app.component('KiutBookingManager', BookingManager);
    app.component('KiutCheckin', Checkin);
    app.component('KiutCheckinMetrics', CheckinMetrics);
    app.component('KiutCheckinSegments', CheckinSegments);
    app.component('KiutDisruption', Disruption);
    app.component('KiutFAQ', FAQ);
    app.component('KiutMessagesPerAgent', MessagesPerAgent);
    app.component('KiutRecordLocator', RecordLocator);
    app.component('KiutSalesByChannel', SalesByChannel);
    app.component('KiutSeller', Seller);
    app.component('KiutTopAgents', TopAgents);
    app.component('KiutPaymentMethod', PaymentMethod);
    app.component('KiutAgentHumanConversations', AgentHumanConversations);
    app.component('KiutChannelMetrics', ChannelMetrics);
    app.component('KiutTriageCombinations', TriageCombinations);
    app.component('KiutSelectLanguage', SelectLanguage);
    app.component('KiutGuardrails', Guardrails);
    app.component('KiutDisruptionNotifier', DisruptionNotifier);
    app.component('KiutTotalConversationsCard', TotalConversationsCard);
    app.component('KiutCsatP95Card', CsatP95Card);
    app.component('KiutAiGeneratedRevenueCard', AiGeneratedRevenueCard);
    app.component('KiutNpsDailyMetrics', NpsDailyMetrics);
    app.component('KiutNpsMetrics', NpsMetrics);
    app.component('KiutNpsOverviewMetrics', NpsOverviewMetrics);
    
    // Cost & Tokens
    app.component('KiutAWSCost', AWSCost);
    app.component('KiutCostUsage', CostUsage);
    app.component('KiutTokenUsage', TokenUsage);
    app.component('KiutConversationCount', ConversationCount);
    app.component('KiutTopAgentsAnalysis', TopAgentsAnalysis);
    app.component('KiutTopAgentsPie', TopAgentsPie);
    app.component('KiutDailyCostTrends', DailyCostTrends);
    app.component('KiutModelUsage', ModelUsage);
    app.component('KiutMessageRoles', MessageRoles);
    app.component('KiutCostPerConversations', CostPerConversations);
    app.component('Tabs', Tabs);
    app.component('Table', Table);
    app.component('Filters', Filters);
    app.component('InputText', InputText);
    app.component('InputFile', InputFile);
    app.component('InputDateTime', InputDateTime);
    app.component('InputRange', InputRange);
    app.component('InputNumber', InputNumber);
    app.component('Select', Select);
    app.component('Toggle', Toggle);
    app.component('InputPhone', InputPhone);
    app.component('SelectablePills', SelectablePills);
    app.component('SegmentedControl', SegmentedControl);
    app.component('DateRangePicker', DateRangePicker);
    app.component('Tag', Tag);
    app.component('Button', Button);
    app.component('Modal', Modal);
    app.component('Section', Section);
  }
};
