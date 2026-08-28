import type { Meta, StoryObj } from "@storybook/vue3";
import SalesVolume from "./SalesVolume.vue";

const mockSellerByDay = [
  { date: "2026-02-01", seller_conversations: 240, sell_started_count: 210, sell_get_quote_count: 175, sell_booking_created_count: 140, sell_success_count: 118, sell_success_bank_transfer_count: 8, sell_success_cash_count: 4, daily_value_sell_success: 52000 },
  { date: "2026-02-05", seller_conversations: 255, sell_started_count: 225, sell_get_quote_count: 188, sell_booking_created_count: 152, sell_success_count: 128, sell_success_bank_transfer_count: 6, sell_success_cash_count: 5, daily_value_sell_success: 54500 },
  { date: "2026-02-09", seller_conversations: 268, sell_started_count: 238, sell_get_quote_count: 198, sell_booking_created_count: 160, sell_success_count: 135, sell_success_bank_transfer_count: 7, sell_success_cash_count: 3, daily_value_sell_success: 56800 },
  { date: "2026-02-13", seller_conversations: 250, sell_started_count: 220, sell_get_quote_count: 182, sell_booking_created_count: 148, sell_success_count: 122, sell_success_bank_transfer_count: 9, sell_success_cash_count: 4, daily_value_sell_success: 53100 },
  { date: "2026-02-17", seller_conversations: 275, sell_started_count: 245, sell_get_quote_count: 205, sell_booking_created_count: 168, sell_success_count: 142, sell_success_bank_transfer_count: 8, sell_success_cash_count: 6, daily_value_sell_success: 58200 },
  { date: "2026-02-21", seller_conversations: 260, sell_started_count: 228, sell_get_quote_count: 190, sell_booking_created_count: 155, sell_success_count: 130, sell_success_bank_transfer_count: 7, sell_success_cash_count: 5, daily_value_sell_success: 55600 },
  { date: "2026-02-25", seller_conversations: 248, sell_started_count: 218, sell_get_quote_count: 178, sell_booking_created_count: 142, sell_success_count: 118, sell_success_bank_transfer_count: 6, sell_success_cash_count: 4, daily_value_sell_success: 52800 },
  { date: "2026-03-01", seller_conversations: 270, sell_started_count: 240, sell_get_quote_count: 200, sell_booking_created_count: 165, sell_success_count: 138, sell_success_bank_transfer_count: 8, sell_success_cash_count: 5, daily_value_sell_success: 57100 },
  { date: "2026-03-05", seller_conversations: 285, sell_started_count: 252, sell_get_quote_count: 212, sell_booking_created_count: 175, sell_success_count: 148, sell_success_bank_transfer_count: 9, sell_success_cash_count: 6, daily_value_sell_success: 59800 },
  { date: "2026-03-09", seller_conversations: 258, sell_started_count: 228, sell_get_quote_count: 188, sell_booking_created_count: 152, sell_success_count: 126, sell_success_bank_transfer_count: 7, sell_success_cash_count: 4, daily_value_sell_success: 54900 },
  { date: "2026-03-13", seller_conversations: 240, sell_started_count: 212, sell_get_quote_count: 172, sell_booking_created_count: 138, sell_success_count: 112, sell_success_bank_transfer_count: 6, sell_success_cash_count: 3, daily_value_sell_success: 51200 },
  { date: "2026-03-18", seller_conversations: 214, sell_started_count: 188, sell_get_quote_count: 152, sell_booking_created_count: 122, sell_success_count: 98, sell_success_bank_transfer_count: 5, sell_success_cash_count: 3, daily_value_sell_success: 46800 },
  { date: "2026-03-22", seller_conversations: 230, sell_started_count: 202, sell_get_quote_count: 165, sell_booking_created_count: 132, sell_success_count: 108, sell_success_bank_transfer_count: 6, sell_success_cash_count: 4, daily_value_sell_success: 49500 },
  { date: "2026-03-26", seller_conversations: 245, sell_started_count: 216, sell_get_quote_count: 178, sell_booking_created_count: 145, sell_success_count: 120, sell_success_bank_transfer_count: 7, sell_success_cash_count: 5, daily_value_sell_success: 52400 },
  { date: "2026-03-31", seller_conversations: 238, sell_started_count: 208, sell_get_quote_count: 170, sell_booking_created_count: 138, sell_success_count: 114, sell_success_bank_transfer_count: 6, sell_success_cash_count: 4, daily_value_sell_success: 50800 },
];

const mockFailedByDay = [
  { date: "2026-02-01", reasons: [{ reason: "payment_processing", failed_count: 12 }, { reason: "timeout", failed_count: 6 }] },
  { date: "2026-02-05", reasons: [{ reason: "payment_processing", failed_count: 10 }, { reason: "booking_validation", failed_count: 5 }] },
  { date: "2026-02-09", reasons: [{ reason: "payment_processing", failed_count: 14 }, { reason: "system_error", failed_count: 4 }] },
  { date: "2026-02-13", reasons: [{ reason: "payment_processing", failed_count: 11 }, { reason: "seat_selection", failed_count: 5 }] },
  { date: "2026-02-17", reasons: [{ reason: "payment_processing", failed_count: 9 }, { reason: "flight_availability", failed_count: 4 }] },
  { date: "2026-02-21", reasons: [{ reason: "payment_processing", failed_count: 13 }, { reason: "timeout", failed_count: 5 }] },
  { date: "2026-02-25", reasons: [{ reason: "payment_processing", failed_count: 10 }, { reason: "passenger_data", failed_count: 6 }] },
  { date: "2026-03-01", reasons: [{ reason: "payment_processing", failed_count: 8 }, { reason: "booking_validation", failed_count: 4 }] },
  { date: "2026-03-05", reasons: [{ reason: "payment_processing", failed_count: 11 }, { reason: "system_error", failed_count: 3 }] },
  { date: "2026-03-09", reasons: [{ reason: "payment_processing", failed_count: 12 }, { reason: "timeout", failed_count: 5 }] },
  { date: "2026-03-13", reasons: [{ reason: "payment_processing", failed_count: 10 }, { reason: "seat_selection", failed_count: 4 }] },
  { date: "2026-03-18", reasons: [{ reason: "payment_processing", failed_count: 9 }, { reason: "flight_availability", failed_count: 3 }] },
  { date: "2026-03-22", reasons: [{ reason: "payment_processing", failed_count: 11 }, { reason: "passenger_data", failed_count: 4 }] },
  { date: "2026-03-26", reasons: [{ reason: "payment_processing", failed_count: 10 }, { reason: "booking_validation", failed_count: 5 }] },
  { date: "2026-03-31", reasons: [{ reason: "payment_processing", failed_count: 8 }, { reason: "timeout", failed_count: 4 }] },
];

const mockSellerData = {
  airline_name: "Demo Air",
  start_date: "2026-02-01",
  end_date: "2026-03-31",
  total_seller_conversations: 3776,
  total_sell_started: 3330,
  total_sell_get_quote: 2763,
  total_sell_booking_created: 2232,
  total_sell_success: 1860,
  total_sell_success_bank_transfer: 110,
  total_sell_success_cash: 65,
  total_value_sell_success: [{ currency: "USD", total_value: 785000, count: 1860 }],
  total_value_sell_success_bank_transfer: [{ currency: "USD", total_value: 42000, count: 110 }],
  total_value_sell_success_cash: [{ currency: "USD", total_value: 28000, count: 65 }],
  seller_by_day: mockSellerByDay,
};

const mockFailedData = {
  total_sell_failed: 280,
  failed_by_reason_by_day: mockFailedByDay,
};

const meta = {
  title: "Charts/BusinessMetrics/SalesVolume",
  component: SalesVolume,
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: "boolean",
      description: "Estado de carga del componente",
    },
    data: {
      control: "object",
      description: "Datos Seller API o override plano by_day",
    },
    failedData: {
      control: "object",
      description: "Errores diarios por razón (failed_by_reason_by_day)",
    },
    enableExport: {
      control: "boolean",
      description: "Muestra el footer con botones de exportación",
    },
    onExport: {
      action: "export",
      description: "Evento emitido al exportar (pdf | csv | xlsx)",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Volumen diario de ventas por resultado, con área en degradado bajo cada serie. Con datos Seller + failedData, las categorías coinciden con Seller Metrics (Sankey).",
      },
    },
  },
  decorators: [
    () => ({
      template:
        '<div class="box-border h-[560px] w-full max-w-5xl px-2 py-4"><story /></div>',
    }),
  ],
} satisfies Meta<typeof SalesVolume>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    data: mockSellerData,
    failedData: mockFailedData,
    enableExport: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    data: null,
  },
};

export const EmptyState: Story = {
  args: {
    loading: false,
    data: { ...mockSellerData, seller_by_day: [] },
  },
};

export const WithoutExport: Story = {
  args: {
    loading: false,
    data: mockSellerData,
    failedData: mockFailedData,
    enableExport: false,
  },
};
