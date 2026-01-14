import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TotalTokens from './TotalTokens.vue'

const meta: Meta<typeof TotalTokens> = {
  title: 'Charts/CostTokens/TotalTokens',
  component: TotalTokens,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Tarjeta de visualización de tokens totales.

## Features
- Muestra el total de tokens utilizados
- Desglose por tipo: Input, Output, Cache Read, Cache Write
- Estado de carga con animación
- Diseño glassmorphism con gradientes azul/indigo

## Uso
\`\`\`vue
<TotalTokens
  :totalTokens="1250000"
  :inputTokens="500000"
  :outputTokens="350000"
  :cacheReadTokens="250000"
  :cacheWriteTokens="150000"
  :loading="false"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    totalTokens: {
      control: 'number',
      description: 'El total de tokens utilizados',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    inputTokens: {
      control: 'number',
      description: 'Total de tokens de entrada',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    outputTokens: {
      control: 'number',
      description: 'Total de tokens de salida',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    cacheReadTokens: {
      control: 'number',
      description: 'Total de tokens leídos de caché',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    cacheWriteTokens: {
      control: 'number',
      description: 'Total de tokens escritos en caché',
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
type Story = StoryObj<typeof TotalTokens>

/**
 * Visualización por defecto con datos de ejemplo
 */
export const Default: Story = {
  args: {
    totalTokens: 1250000,
    inputTokens: 500000,
    outputTokens: 350000,
    cacheReadTokens: 250000,
    cacheWriteTokens: 150000,
    loading: false,
  },
}

/**
 * Estado de carga con animación
 */
export const Loading: Story = {
  args: {
    totalTokens: 0,
    inputTokens: 0,
    outputTokens: 0,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    loading: true,
  },
}

/**
 * Sin datos (valores en cero)
 */
export const Empty: Story = {
  args: {
    totalTokens: 0,
    inputTokens: 0,
    outputTokens: 0,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    loading: false,
  },
}

/**
 * Con valores altos (millones de tokens)
 */
export const HighValues: Story = {
  args: {
    totalTokens: 125750000,
    inputTokens: 50000000,
    outputTokens: 35000000,
    cacheReadTokens: 25750000,
    cacheWriteTokens: 15000000,
    loading: false,
  },
}

/**
 * Uso predominante de caché
 */
export const CacheHeavy: Story = {
  args: {
    totalTokens: 2500000,
    inputTokens: 250000,
    outputTokens: 150000,
    cacheReadTokens: 1500000,
    cacheWriteTokens: 600000,
    loading: false,
  },
}
