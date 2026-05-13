import type { Meta, StoryObj } from '@storybook/vue3'
import CardInfo from './CardInfo.vue'

const meta: Meta<typeof CardInfo> = {
  title: 'Charts/Utils/CardInfo',
  component: CardInfo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Tarjeta compacta para mostrar una métrica etiquetada (punto de color, título, valor principal y texto secundario).

## Props
- \`color\` (opcional): color CSS del indicador circular; si no se pasa, no se muestra el punto.
- \`title\` (requerido): etiqueta (junto al punto si hay \`color\`).
- \`value\` (requerido): valor destacado.
- \`subvalue\` (opcional): detalle o unidad bajo el valor.
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: 'color',
      description:
        'Color del punto indicador (hex, rgb, etc.). Sin valor → sin punto.',
    },
    title: {
      control: 'text',
      description: 'Título junto al indicador',
    },
    value: {
      control: 'text',
      description: 'Valor principal',
    },
    subvalue: {
      control: 'text',
      description: 'Texto secundario bajo el valor',
    },
  },
}

export default meta

type Story = StoryObj<typeof CardInfo>

export const Default: Story = {
  args: {
    color: '#22c55e',
    title: 'Triage',
    value: '6.9%',
    subvalue: '310 msgs',
  },
}
