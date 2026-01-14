import type { Meta, StoryObj } from "@storybook/vue3-vite";
import MeanConversationCost from "./MeanConversationCost.vue";

const meta: Meta<typeof MeanConversationCost> = {
  title: "Charts/CostTokens/MeanConversationCost",
  component: MeanConversationCost,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Tarjeta de visualización del costo medio de conversación

## Features
- Muestra total del costo medio de conversación
- Mediana diaria de costo
- Día pico con fecha y valor
- Estado de carga con animación
- Diseño glassmorphism con tonos esmeralda y verde azulado

##Uso
\`\`\`vue
<MeanConversationCost
  :mean="2.23"
  :minDaily="0.23"
  peakDay="January 15, 2024"
  :peakDayValue="0.50"
  :loading="false"
/>
\`\`\`
                `,
      },
    },
  },
  argTypes: {
    mean: {
      control: "number",
      description: "El total de costo medio de conversación",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    minDaily: {
      control: "number",
      description: "La mediana diaria de costo",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    peakDay: {
      control: "text",
      description: "Fecha del día pico ya formateada",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "'-'" },
      },
    },
    peakDayValue: {
      control: "number",
      description: "Valor pico del día",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    loading: {
      control: "boolean",
      description: "Estado de carga",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MeanConversationCost>;

/**
 * Visualización por defecto con datos de ejemplo
 */
export const Default: Story = {
  args: {
    mean: 0.06,
    minDaily: 0.01,
    peakDay: "January 15, 2024",
    peakDayValue: 0.02,
    loading: false,
  },
};

/**
 * Visualización en carga
 */
export const Loading: Story = {
  args: {
    mean: 0,
    minDaily: 0,
    peakDay: "-",
    peakDayValue: 0,
    loading: true,
  },
};

/**
 * Visualización vacía (Sin datos)
 */
export const Empty: Story = {
  args: {
    mean: 0,
    minDaily: 0,
    peakDay: "-",
    peakDayValue: 0,
    loading: false,
  },
};

/**
 * Visualización con valores alto
 */
export const HighMean: Story = {
  args: {
    mean: 150.43,
    minDaily: 130.23,
    peakDay: "January 15, 2024",
    peakDayValue: 140,
    loading: false,
  },
};
