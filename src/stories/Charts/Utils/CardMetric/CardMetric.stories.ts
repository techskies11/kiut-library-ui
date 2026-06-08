import type { Meta, StoryObj } from '@storybook/vue3'
import CardMetric from './CardMetric.vue'

const sampleIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
  </svg>
`

const meta: Meta<typeof CardMetric> = {
  title: 'Charts/Utils/CardMetric',
  component: CardMetric,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Contenedor reutilizable para tarjetas KPI compactas: icono, badge de cambio, valor y etiqueta.

## Props
- \`label\`: texto descriptivo bajo el valor o en el header (según \`labelPosition\`).
- \`value\`: valor formateado para mostrar.
- \`prefix\`: prefijo opcional (ej. código de moneda).
- \`valueSize\`: \`default\` (24px) o \`large\` (28px).
- \`labelPosition\`: \`below\` (default) o \`header\` (junto al icono).
- \`loading\`: muestra skeleton completo con animación shimmer.
- \`currentValue\` / \`previousValue\`: calculan el badge de cambio
        `,
      },
    },
  },
  decorators: [
    () => ({
      template: '<div style="width: 320px;"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof CardMetric>

const renderWithIcon = (args: Record<string, unknown>) => ({
  components: { CardMetric },
  setup() {
    return { args }
  },
  template: `
    <CardMetric v-bind="args">
      <template #icon>${sampleIcon}</template>
    </CardMetric>
  `,
})

export const Default: Story = {
  args: {
    label: 'Total Conversations',
    value: '12,450',
    currentValue: 12450,
    previousValue: 11000,
    loading: false,
  },
  render: renderWithIcon,
}

export const Loading: Story = {
  args: {
    label: 'Total Conversations',
    value: '',
    loading: true,
  },
  render: renderWithIcon,
}

export const ChangeDown: Story = {
  args: {
    label: 'CSAT P95',
    value: '3.2',
    currentValue: 3.2,
    previousValue: 4.1,
    loading: false,
  },
  render: renderWithIcon,
}

export const WithPrefix: Story = {
  args: {
    label: 'AI Revenue',
    value: '$45.3K',
    prefix: 'USD',
    valueSize: 'large',
    currentValue: 45300,
    previousValue: 40250,
    loading: false,
  },
  render: renderWithIcon,
}

export const LargeValue: Story = {
  args: {
    label: 'AI Revenue',
    value: '$45.3K',
    valueSize: 'large',
    currentValue: 45300,
    previousValue: 40250,
    loading: false,
  },
  render: renderWithIcon,
}

export const NoPreviousData: Story = {
  args: {
    label: 'CSAT Pulse',
    value: '87.5%',
    currentValue: 87.5,
    previousValue: null,
    loading: false,
  },
  render: renderWithIcon,
}

export const LabelInHeader: Story = {
  args: {
    label: 'Conversations Opened',
    value: '1,284',
    labelPosition: 'header',
    currentValue: 1284,
    previousValue: 1185,
    loading: false,
  },
  render: renderWithIcon,
}

export const LabelInHeaderLoading: Story = {
  args: {
    label: 'Conversations Opened',
    value: '',
    labelPosition: 'header',
    loading: true,
  },
  render: renderWithIcon,
}

export const LoadingDark: Story = {
  args: {
    label: 'Total Conversations',
    value: '',
    loading: true,
    theme: 'dark',
  },
  render: renderWithIcon,
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
