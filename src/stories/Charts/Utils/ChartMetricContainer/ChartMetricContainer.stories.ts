import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
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
- \`loading\` (default \`false\`): skeleton en el cuerpo mientras carga; el título siempre permanece visible.
- \`lazyMount\` (default \`false\`): si es colapsable, el cuerpo no se monta hasta el primer \`open\`.

## Eventos
- \`open\`: emitido al expandir por primera vez (útil para lazy fetch de API).
- \`toggle(open: boolean)\`: emitido en cada cambio de estado colapsable.

## Slots
- **default**: cuerpo (gráficos, tablas).
- **loading**: skeleton custom del cuerpo (opcional).
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
    loading: {
      control: 'boolean',
      description: 'Muestra skeleton en el cuerpo mientras carga (título siempre visible)',
    },
    lazyMount: {
      control: 'boolean',
      description: 'Monta el cuerpo solo tras el primer open',
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

export const Loading: Story = {
  name: 'Loading (skeleton en cuerpo)',
  args: {
    title: 'Agents Total Messages per Day',
    subtitle: 'Daily agent interactions (stacked)',
    collapsible: false,
    loading: true,
  },
  render: (args) => ({
    components: { ChartMetricContainer },
    setup() {
      return { args }
    },
    template: `<ChartMetricContainer v-bind="args" />`,
  }),
}

export const LoadingCollapsible: Story = {
  name: 'Loading – colapsable abierto',
  args: {
    title: 'Agents Total Messages per Day',
    subtitle: 'Daily agent interactions (stacked)',
    collapsible: true,
    defaultOpen: true,
    loading: true,
  },
  render: (args) => ({
    components: { ChartMetricContainer },
    setup() {
      return { args }
    },
    template: `<ChartMetricContainer v-bind="args" />`,
  }),
}

export const LoadingCollapsed: Story = {
  name: 'Loading – colapsado (título visible)',
  args: {
    title: 'Agents Total Messages per Day',
    subtitle: 'Daily agent interactions (stacked)',
    collapsible: true,
    defaultOpen: false,
    loading: true,
  },
  render: (args) => ({
    components: { ChartMetricContainer },
    setup() {
      return { args }
    },
    template: `<ChartMetricContainer v-bind="args" />`,
  }),
}

export const LazyLoadOnOpen: Story = {
  name: 'Lazy load al abrir',
  args: {
    title: 'CSAT',
    subtitle: 'Customer satisfaction score distribution.',
    collapsible: true,
    defaultOpen: false,
    lazyMount: true,
  },
  render: (args) => ({
    components: { ChartMetricContainer },
    setup() {
      const loading = ref(false)
      const dataLoaded = ref(false)
      const openCount = ref(0)

      async function onOpen() {
        openCount.value += 1
        if (dataLoaded.value) return
        loading.value = true
        await new Promise((resolve) => setTimeout(resolve, 1200))
        dataLoaded.value = true
        loading.value = false
      }

      return { args, loading, dataLoaded, openCount, onOpen }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <ChartMetricContainer
          v-bind="args"
          :loading="loading"
          @open="onOpen"
        >
          <div
            v-if="dataLoaded"
            style="min-height: 120px; display: flex; align-items: center; justify-content: center; border-radius: 12px; border: 1px dashed var(--kiut-border-light, #d9d9dd); color: var(--kiut-text-secondary, #73737c); font-size: 0.875rem;"
          >
            Datos cargados tras expandir
          </div>
        </ChartMetricContainer>
        <p style="font-size: 0.875rem; color: var(--kiut-text-secondary, #73737c); margin: 0;">
          Eventos open: {{ openCount }} · Datos: {{ dataLoaded ? 'sí' : 'no' }}
        </p>
      </div>
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
