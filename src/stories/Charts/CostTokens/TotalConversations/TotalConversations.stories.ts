import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TotalConversations from './TotalConversations.vue'

const meta: Meta<typeof TotalConversations> = {
  title: 'Charts/CostTokens/TotalConversations',
  component: TotalConversations,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Tarjeta de visualización del total de conversaciones.

## Features
- Muestra el total de conversaciones con formato numérico
- Mediana diaria de conversaciones
- Día pico con fecha y cantidad
- Estado de carga con animación
- Diseño glassmorphism con tonos amber/naranja

## Uso
\`\`\`vue
<TotalConversations
  :totalConversations="15420"
  :dailyMedian="523"
  peakDayDate="January 15, 2024"
  :peakDayValue="892"
  :loading="false"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    totalConversations: {
      control: 'number',
      description: 'El total de conversaciones',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    dailyMedian: {
      control: 'number',
      description: 'La mediana diaria de conversaciones',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    peakDayDate: {
      control: 'text',
      description: 'Fecha del día pico ya formateada',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'-'" },
      },
    },
    peakDayValue: {
      control: 'number',
      description: 'Cantidad de conversaciones del día pico',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carga',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TotalConversations>

/**
 * Visualización por defecto con datos de ejemplo
 */
export const Default: Story = {
  args: {
    totalConversations: 15420,
    dailyMedian: 523,
    peakDayDate: 'January 15, 2024',
    peakDayValue: 892,
    loading: false,
  },
}

/**
 * Estado de carga con animación
 */
export const Loading: Story = {
  args: {
    totalConversations: 0,
    dailyMedian: 0,
    peakDayDate: '-',
    peakDayValue: 0,
    loading: true,
  },
}

/**
 * Sin datos (valores en cero)
 */
export const Empty: Story = {
  args: {
    totalConversations: 0,
    dailyMedian: 0,
    peakDayDate: '-',
    peakDayValue: 0,
    loading: false,
  },
}

/**
 * Con valores altos (alto volumen de conversaciones)
 */
export const HighVolume: Story = {
  args: {
    totalConversations: 1542089,
    dailyMedian: 52345,
    peakDayDate: 'December 25, 2024',
    peakDayValue: 89234,
    loading: false,
  },
}

/**
 * Volumen bajo de conversaciones
 */
export const LowVolume: Story = {
  args: {
    totalConversations: 127,
    dailyMedian: 18,
    peakDayDate: 'January 3, 2024',
    peakDayValue: 42,
    loading: false,
  },
}
