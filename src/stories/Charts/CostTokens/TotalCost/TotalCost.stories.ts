import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TotalCost from './TotalCost.vue'

const meta: Meta<typeof TotalCost> = {
  title: 'Charts/CostTokens/TotalCost',
  component: TotalCost,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Tarjeta de visualización de costo total.

## Features
- Muestra el costo total con formato de moneda
- Promedio diario de costos
- Día pico con fecha y valor
- Estado de carga con animación
- Diseño glassmorphism con gradiantes violeta/azul

## Uso
\`\`\`vue
<TotalCost
  :totalCost="1250.75"
  :dailyMean="178.68"
  peakDayDate="October 4, 2023"
  :peakDayValue="300"
  :loading="false"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    totalCost: {
      control: 'number',
      description: 'El costo total ya calculado',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    dailyMean: {
      control: 'number',
      description: 'El promedio diario ya calculado',
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
      description: 'Valor del día pico',
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
type Story = StoryObj<typeof TotalCost>

/**
 * Visualización por defecto con datos de ejemplo
 */
export const Default: Story = {
  args: {
    totalCost: 1250.75,
    dailyMean: 178.68,
    peakDayDate: 'October 4, 2023',
    peakDayValue: 300,
    loading: false,
  },
}

/**
 * Estado de carga con animación
 */
export const Loading: Story = {
  args: {
    totalCost: 0,
    dailyMean: 0,
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
    totalCost: 0,
    dailyMean: 0,
    peakDayDate: '-',
    peakDayValue: 0,
    loading: false,
  },
}

/**
 * Con valores altos
 */
export const HighValues: Story = {
  args: {
    totalCost: 125750.99,
    dailyMean: 17964.43,
    peakDayDate: 'January 15, 2024',
    peakDayValue: 28500.50,
    loading: false,
  },
}
