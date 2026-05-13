import type { Meta, StoryObj } from '@storybook/vue3'
import ChartMetricContainer from './ChartMetricContainer.vue'
import FooterExport from '../FooterExport/FooterExport.vue'

const meta: Meta<typeof ChartMetricContainer> = {
  title: 'Charts/Utils/ChartMetricContainer',
  component: ChartMetricContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Contenedor reutilizable para charts/métricas: cabecera con título, subtítulo opcional y cuerpo colapsable (mismo patrón visual que BusinessMetrics).

## Props
- \`title\` (requerido): encabezado principal.
- \`subtitle\`: texto secundario; si se omite, no se renderiza.
- \`collapsible\` (default \`true\`): usa \`<details>/summary\` y chevron; si es \`false\`, el contenido siempre está visible.
- \`defaultOpen\` (default \`false\`): estado inicial abierto/cerrado cuando \`collapsible\` es \`true\`.

## Slots
- **default**: cuerpo (gráficos, tablas).
- **title**, **headerAppend**, **headerAside**: cabecera.
- **headerExport**: exportación junto al título; con \`collapsible: true\` solo visible al abrir la sección.

        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título del bloque',
    },
    subtitle: {
      control: 'text',
      description: 'Subtítulo opcional',
    },
    collapsible: {
      control: 'boolean',
      description: 'Permite colapsar el contenido',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Inicia abierto cuando es colapsable',
    },
  },
}

export default meta

type Story = StoryObj<typeof ChartMetricContainer>

const sampleBody = `
  <div style="min-height: 120px; display: flex; align-items: center; justify-content: center; border-radius: 12px; border: 1px dashed var(--kiut-border-light, #d9d9dd); color: var(--kiut-text-secondary, #73737c); font-size: 0.875rem;">
    Contenido del chart (slot)
  </div>
`

export const Default: Story = {
  args: {
    title: 'Métrica de ejemplo',
    subtitle: 'Descripción breve del bloque o del dataset.',
    collapsible: true,
    defaultOpen: true,
  },
  render: (args) => ({
    components: { ChartMetricContainer },
    setup() {
      return { args }
    },
    template: `
      <ChartMetricContainer v-bind="args">
        ${sampleBody}
      </ChartMetricContainer>
    `,
  }),
}

export const CollapsedByDefault: Story = {
  args: {
    ...Default.args,
    defaultOpen: false,
  },
  render: Default.render,
}

export const TitleOnly: Story = {
  args: {
    title: 'Solo título',
    subtitle: undefined,
    collapsible: true,
    defaultOpen: true,
  },
  render: Default.render,
}

export const StaticNotCollapsible: Story = {
  args: {
    title: 'Contenedor fijo',
    subtitle: 'Sin colapsar; útil cuando el bloque debe permanecer siempre expuesto.',
    collapsible: false,
    defaultOpen: false,
  },
  render: Default.render,
}

const exportSlot = `
  <template #headerExport>
    <FooterExport variant="inline" :formats="['pdf', 'csv']" @export="noopExport" />
  </template>
`

export const WithHeaderExport: Story = {
  args: {
    title: 'Métrica con export',
    subtitle: 'PDF/CSV en la cabecera (variante inline de FooterExport).',
    collapsible: false,
  },
  render: (args) => ({
    components: { ChartMetricContainer, FooterExport },
    setup() {
      const noopExport = () => {}
      return { args, noopExport }
    },
    template: `
      <ChartMetricContainer v-bind="args">
        ${exportSlot}
        ${sampleBody}
      </ChartMetricContainer>
    `,
  }),
}

export const CollapsibleExportHiddenWhenClosed: Story = {
  args: {
    title: 'Colapsable + export',
    subtitle: 'Los botones de export solo aparecen al expandir.',
    collapsible: true,
    defaultOpen: false,
  },
  render: (args) => ({
    components: { ChartMetricContainer, FooterExport },
    setup() {
      const noopExport = () => {}
      return { args, noopExport }
    },
    template: `
      <ChartMetricContainer v-bind="args">
        ${exportSlot}
        ${sampleBody}
      </ChartMetricContainer>
    `,
  }),
}
