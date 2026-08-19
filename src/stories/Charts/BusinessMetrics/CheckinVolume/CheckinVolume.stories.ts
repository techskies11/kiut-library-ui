import type { Meta, StoryObj } from "@storybook/vue3";
import CheckinVolume from "./CheckinVolume.vue";

const mockByDay = [
  { date: "2026-02-01", initiated: 240, success: 180, abandoned: 38, errors: 18 },
  { date: "2026-02-05", initiated: 255, success: 195, abandoned: 42, errors: 16 },
  { date: "2026-02-09", initiated: 268, success: 210, abandoned: 36, errors: 20 },
  { date: "2026-02-13", initiated: 250, success: 198, abandoned: 40, errors: 17 },
  { date: "2026-02-17", initiated: 275, success: 225, abandoned: 35, errors: 15 },
  { date: "2026-02-21", initiated: 260, success: 205, abandoned: 39, errors: 19 },
  { date: "2026-02-25", initiated: 248, success: 190, abandoned: 41, errors: 18 },
  { date: "2026-03-01", initiated: 270, success: 220, abandoned: 37, errors: 16 },
  { date: "2026-03-05", initiated: 285, success: 238, abandoned: 34, errors: 14 },
  { date: "2026-03-09", initiated: 258, success: 200, abandoned: 40, errors: 18 },
  { date: "2026-03-13", initiated: 240, success: 185, abandoned: 36, errors: 17 },
  { date: "2026-03-18", initiated: 214, success: 164, abandoned: 34, errors: 16 },
  { date: "2026-03-22", initiated: 230, success: 178, abandoned: 38, errors: 15 },
  { date: "2026-03-26", initiated: 245, success: 192, abandoned: 35, errors: 17 },
  { date: "2026-03-31", initiated: 238, success: 186, abandoned: 37, errors: 16 },
];

const meta = {
  title: "Charts/BusinessMetrics/CheckinVolume",
  component: CheckinVolume,
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: "boolean",
      description: "Estado de carga del componente",
    },
    data: {
      control: "object",
      description: "Override plano by_day. Si hay checkinData, se ignora.",
    },
    checkinData: {
      control: "object",
      description: "Mismos datos que CheckinMetrics (record_locator_by_day)",
    },
    failedData: {
      control: "object",
      description: "Mismos datos de fallos que CheckinMetrics",
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
          "Volumen diario de check-in por resultado, con área en degradado bajo cada serie.",
      },
    },
  },
  decorators: [
    () => ({
      template:
        '<div class="box-border h-[560px] w-full max-w-5xl px-2 py-4"><story /></div>',
    }),
  ],
} satisfies Meta<typeof CheckinVolume>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    data: { by_day: mockByDay },
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
    data: { by_day: [] },
  },
};

export const WithoutExport: Story = {
  args: {
    loading: false,
    data: { by_day: mockByDay },
    enableExport: false,
  },
};
