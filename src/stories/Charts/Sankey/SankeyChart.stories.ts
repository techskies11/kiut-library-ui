import type { Meta, StoryObj } from '@storybook/vue3';
import SankeyChart from './SankeyChart.vue';

const meta: Meta<typeof SankeyChart> = {
  title: 'Charts/Sankey',
  component: SankeyChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Diagrama Sankey con etiquetas internas, porcentajes por nodo y recorte automático cuando el flujo es muy bajo.

### Etiquetas en nodos pequeños

Cuando un nodo representa un **valor muy bajo**, su altura depende del flujo y puede no alcanzar para mostrar todo el texto. El componente resuelve esto en tres pasos:

1. **Crecer el nodo si hay espacio** — Ajusta los valores de los links para que el nodo alcance una altura mínima legible, respetando la escala global de ECharts (\`ky\`) y el espacio disponible en la columna.
2. **Recortar el texto al layout real** — Tras renderizar, mide la altura real de cada nodo y recorta \`displayLabel\` con ellipsis (\`…\`), priorizando el porcentaje \`(X.X%)\`.
3. **Clip de seguridad** — \`labelLayout\` limita ancho y alto al rectángulo del nodo con \`overflow: truncate\`.

El **tooltip** siempre muestra el nombre completo al pasar el mouse. Ver la story **LowValueLabelTruncation** para un caso con ramas del 1–5 % y nombres largos.
        `,
      },
    },
  },
  argTypes: {
    useGradient: {
      control: 'boolean',
      description: 'Use gradient for link colors',
      defaultValue: true,
    },
    nodeGap: {
      control: 'number',
      description: 'Gap between nodes',
      defaultValue: 16,
    },
    height: {
      control: 'text',
      description: 'Chart height',
      defaultValue: '400px',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SankeyChart>;

// Data: Customer journey flow
const customerJourneyData = {
  nodes: [
    { name: 'Website Visit' },
    { name: 'Product Page' },
    { name: 'Cart' },
    { name: 'Checkout' },
    { name: 'Purchase' },
    { name: 'Exit' },
  ],
  links: [
    { source: 'Website Visit', target: 'Product Page', value: 1000 },
    { source: 'Website Visit', target: 'Exit', value: 300 },
    { source: 'Product Page', target: 'Cart', value: 600 },
    { source: 'Product Page', target: 'Exit', value: 400 },
    { source: 'Cart', target: 'Checkout', value: 400 },
    { source: 'Cart', target: 'Exit', value: 200 },
    { source: 'Checkout', target: 'Purchase', value: 300 },
    { source: 'Checkout', target: 'Exit', value: 100 },
  ],
};

// Data: Energy flow
const energyFlowData = {
  nodes: [
    { name: 'Coal' },
    { name: 'Gas' },
    { name: 'Solar' },
    { name: 'Wind' },
    { name: 'Electricity' },
    { name: 'Residential' },
    { name: 'Industrial' },
    { name: 'Commercial' },
  ],
  links: [
    { source: 'Coal', target: 'Electricity', value: 450 },
    { source: 'Gas', target: 'Electricity', value: 380 },
    { source: 'Solar', target: 'Electricity', value: 220 },
    { source: 'Wind', target: 'Electricity', value: 280 },
    { source: 'Electricity', target: 'Residential', value: 480 },
    { source: 'Electricity', target: 'Industrial', value: 520 },
    { source: 'Electricity', target: 'Commercial', value: 330 },
  ],
};

// Data: User flow through app
const userFlowData = {
  nodes: [
    { name: 'Landing' },
    { name: 'Sign Up' },
    { name: 'Login' },
    { name: 'Dashboard' },
    { name: 'Settings' },
    { name: 'Profile' },
    { name: 'Logout' },
  ],
  links: [
    { source: 'Landing', target: 'Sign Up', value: 500 },
    { source: 'Landing', target: 'Login', value: 800 },
    { source: 'Sign Up', target: 'Dashboard', value: 450 },
    { source: 'Login', target: 'Dashboard', value: 750 },
    { source: 'Dashboard', target: 'Settings', value: 300 },
    { source: 'Dashboard', target: 'Profile', value: 400 },
    { source: 'Dashboard', target: 'Logout', value: 500 },
    { source: 'Settings', target: 'Logout', value: 250 },
    { source: 'Profile', target: 'Logout', value: 350 },
  ],
};

// Data: Sales funnel
const salesFunnelData = {
  nodes: [
    { name: 'Leads' },
    { name: 'Qualified' },
    { name: 'Proposal' },
    { name: 'Negotiation' },
    { name: 'Closed Won' },
    { name: 'Lost' },
  ],
  links: [
    { source: 'Leads', target: 'Qualified', value: 850 },
    { source: 'Leads', target: 'Lost', value: 150 },
    { source: 'Qualified', target: 'Proposal', value: 650 },
    { source: 'Qualified', target: 'Lost', value: 200 },
    { source: 'Proposal', target: 'Negotiation', value: 500 },
    { source: 'Proposal', target: 'Lost', value: 150 },
    { source: 'Negotiation', target: 'Closed Won', value: 400 },
    { source: 'Negotiation', target: 'Lost', value: 100 },
  ],
};

// Data: Traffic sources
const trafficSourcesData = {
  nodes: [
    { name: 'Organic' },
    { name: 'Direct' },
    { name: 'Social' },
    { name: 'Paid' },
    { name: 'Desktop' },
    { name: 'Mobile' },
    { name: 'Tablet' },
    { name: 'Conversion' },
    { name: 'Bounce' },
  ],
  links: [
    { source: 'Organic', target: 'Desktop', value: 400 },
    { source: 'Organic', target: 'Mobile', value: 600 },
    { source: 'Direct', target: 'Desktop', value: 300 },
    { source: 'Direct', target: 'Mobile', value: 200 },
    { source: 'Social', target: 'Mobile', value: 450 },
    { source: 'Social', target: 'Tablet', value: 50 },
    { source: 'Paid', target: 'Desktop', value: 200 },
    { source: 'Paid', target: 'Mobile', value: 300 },
    { source: 'Desktop', target: 'Conversion', value: 300 },
    { source: 'Desktop', target: 'Bounce', value: 600 },
    { source: 'Mobile', target: 'Conversion', value: 400 },
    { source: 'Mobile', target: 'Bounce', value: 1150 },
    { source: 'Tablet', target: 'Conversion', value: 20 },
    { source: 'Tablet', target: 'Bounce', value: 30 },
  ],
};

// Data: Simple flow
const simpleFlowData = {
  nodes: [
    { name: 'A' },
    { name: 'B' },
    { name: 'C' },
    { name: 'D' },
  ],
  links: [
    { source: 'A', target: 'B', value: 100 },
    { source: 'A', target: 'C', value: 80 },
    { source: 'B', target: 'D', value: 70 },
    { source: 'C', target: 'D', value: 60 },
  ],
};

// Custom colors for nodes
const customColors = {
  'Website Visit': '#C67DFF',
  'Product Page': '#8b5cf6',
  'Cart': '#a855f7',
  'Checkout': '#7c3aed',
  'Purchase': '#5d4b93',
  'Exit': '#cbd5e1',
};

// Data: BM funnel with semantic status (success / abandon / error)
const bmFunnelData = {
  nodes: [
    { name: 'Checkin Init', status: 'success' as const },
    { name: 'Booking retrive', status: 'success' as const },
    { name: 'Checkin Started', status: 'success' as const },
    { name: 'Checkin Completed', status: 'success' as const },
    { name: 'Checkin Closed', status: 'success' as const },
    { name: 'Abandoned (Init)', status: 'abandon' as const },
    { name: 'Abandoned (Started)', status: 'abandon' as const },
    { name: 'Booking not retreived', status: 'error' as const },
    { name: 'Checkin Failed', status: 'error' as const },
  ],
  links: [
    { source: 'Checkin Init', target: 'Booking retrive', value: 850, label: '850 (85.0%)' },
    { source: 'Checkin Init', target: 'Abandoned (Init)', value: 100, label: '100 (10.0%)' },
    { source: 'Checkin Init', target: 'Booking not retreived', value: 50, label: '50 (5.0%)' },
    { source: 'Booking retrive', target: 'Checkin Started', value: 700, label: '700 (70.0%)' },
    { source: 'Booking retrive', target: 'Abandoned (Started)', value: 100, label: '100 (10.0%)' },
    { source: 'Booking retrive', target: 'Checkin Failed', value: 50, label: '50 (5.0%)' },
    { source: 'Checkin Started', target: 'Checkin Completed', value: 600, label: '600 (60.0%)' },
    { source: 'Checkin Completed', target: 'Checkin Closed', value: 550, label: '550 (55.0%)' },
  ],
};

// Data: long inside labels with small terminal nodes (Check-in Metrics case)
const longInsideLabelData = {
  nodes: [
    { name: 'Initiated by agent', status: 'success' as const },
    { name: 'Check In Started', status: 'success' as const },
    { name: 'Check In Success', status: 'success' as const },
    { name: 'Boarding Pass Issued', status: 'success' as const },
    { name: 'Abandoned: No booking provided', status: 'abandon' as const },
    { name: 'Abandoned: Check In Incomplete', status: 'abandon' as const },
    { name: 'Error: On Retrieval', status: 'error' as const },
    { name: 'Error: On Check In Process', status: 'error' as const },
    { name: 'Error: User error', status: 'error' as const },
  ],
  links: [
    { source: 'Initiated by agent', target: 'Check In Started', value: 353 },
    { source: 'Initiated by agent', target: 'Abandoned: No booking provided', value: 280 },
    { source: 'Initiated by agent', target: 'Error: On Retrieval', value: 180 },
    { source: 'Initiated by agent', target: 'Error: User error', value: 87 },
    { source: 'Check In Started', target: 'Check In Success', value: 179 },
    { source: 'Check In Started', target: 'Abandoned: Check In Incomplete', value: 118 },
    { source: 'Check In Started', target: 'Error: On Check In Process', value: 56 },
    { source: 'Check In Success', target: 'Boarding Pass Issued', value: 179 },
  ],
};

// Data: ramas con valor muy bajo y nombres largos (ellipsis forzado)
const lowValueTruncationData = {
  nodes: [
    { name: 'Checkin Init', status: 'success' as const },
    { name: 'Checkin Completed', status: 'success' as const },
    { name: 'Abandoned: User closed browser without completing', status: 'abandon' as const },
    { name: 'Error: Payment gateway timeout on final retry', status: 'error' as const },
    { name: 'Error: Invalid travel document format uploaded', status: 'error' as const },
  ],
  links: [
    { source: 'Checkin Init', target: 'Checkin Completed', value: 940 },
    { source: 'Checkin Init', target: 'Abandoned: User closed browser without completing', value: 35 },
    { source: 'Checkin Init', target: 'Error: Payment gateway timeout on final retry', value: 18 },
    { source: 'Checkin Init', target: 'Error: Invalid travel document format uploaded', value: 7 },
  ],
};

// Story: BM funnel with semantic colors and success percentages
export const BusinessMetricsFunnel: Story = {
  args: {
    data: bmFunnelData,
    title: 'Check-in Funnel (Semantic Status)',
    height: '420px',
    useGradient: true,
    nodeGap: 16,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Business Metrics funnel with semantic colors (green/orange/red), success→abandon→error ordering per column, node percentages against the funnel total, and link percentages against the immediately preceding node.',
      },
    },
  },
};

// Story: valores bajos donde el nodo no alcanza a cubrir el texto completo
export const LowValueLabelTruncation: Story = {
  args: {
    data: lowValueTruncationData,
    title: 'Low-value branches with long labels',
    height: '420px',
    useGradient: false,
    nodeGap: 16,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ramas del 1–4 % con nombres largos: el nodo crece lo que puede dentro de la columna y, si aún no alcanza, la etiqueta se recorta con ellipsis. El porcentaje se mantiene visible; el nombre completo aparece en el tooltip.',
      },
    },
  },
};

// Story: long labels that used to overflow short nodes
export const LongInsideLabels: Story = {
  args: {
    data: longInsideLabelData,
    title: 'Check-in Metrics',
    height: '480px',
    useGradient: false,
    nodeGap: 16,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Reproduction of Check-in Metrics: long multi-line labels on small abandon/error nodes. Nodes grow to fit the text when the column has room; otherwise the label truncates with an ellipsis.',
      },
    },
  },
};

// Story: Default - Customer journey
export const Default: Story = {
  args: {
    data: customerJourneyData,
    title: 'Customer Journey Flow',
    height: '400px',
    useGradient: true,
    nodeGap: 16,
  },
};

// Story: Energy flow
export const EnergyFlow: Story = {
  args: {
    data: energyFlowData,
    title: 'Energy Distribution',
    height: '400px',
    useGradient: true,
    nodeGap: 16,
  },
};

// Story: User flow
export const UserFlow: Story = {
  args: {
    data: userFlowData,
    title: 'User Flow Through App',
    height: '400px',
    useGradient: true,
    nodeGap: 16,
  },
};

// Story: Sales funnel
export const SalesFunnel: Story = {
  args: {
    data: salesFunnelData,
    title: 'Sales Funnel',
    height: '400px',
    useGradient: true,
    nodeGap: 16,
  },
};

// Story: Traffic sources
export const TrafficSources: Story = {
  args: {
    data: trafficSourcesData,
    title: 'Traffic Sources & Conversions',
    height: '480px',
    useGradient: true,
    nodeGap: 16,
  },
};

// Story: Simple flow
export const Simple: Story = {
  args: {
    data: simpleFlowData,
    title: 'Simple Flow',
    height: '400px',
    useGradient: true,
    nodeGap: 30,
  },
};

// Story: With custom colors
export const CustomColors: Story = {
  args: {
    data: customerJourneyData,
    title: 'Customer Journey with Custom Colors',
    height: '400px',
    nodeColors: customColors,
    useGradient: true,
    nodeGap: 16,
  },
};

// Story: Without gradient
export const WithoutGradient: Story = {
  args: {
    data: energyFlowData,
    title: 'Energy Distribution (No Gradient)',
    height: '400px',
    useGradient: false,
    nodeGap: 16,
  },
};

// Story: Compact nodes
export const CompactNodes: Story = {
  args: {
    data: userFlowData,
    title: 'User Flow (Compact)',
    height: '400px',
    useGradient: true,
    nodeGap: 10,
  },
};

// Story: Spacious layout
export const SpaciousLayout: Story = {
  args: {
    data: simpleFlowData,
    title: 'Simple Flow (Spacious)',
    height: '400px',
    useGradient: true,
    nodeGap: 40,
  },
};







