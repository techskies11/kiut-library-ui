import type { Meta, StoryObj } from '@storybook/vue3'
import Table from './Table.vue'

const travelColumns = [
  { key: 'departure', label: 'Departure', emphasis: true },
  { key: 'connections', label: 'Connections' },
  { key: 'arrival', label: 'Arrival', emphasis: true },
  { key: 'trip', label: 'Trip', emphasis: true },
  { key: 'initiated', label: 'Initiated' },
  { key: 'started', label: 'Started' },
  { key: 'completed', label: 'Completed' },
  { key: 'closed', label: 'Closed' },
] as const

const travelRowsBase = [
  {
    departure: 'BOG',
    connections: null,
    arrival: 'MDE',
    trip: 'One Way',
    initiated: '120',
    started: '100',
    completed: '92',
    closed: '88',
  },
  {
    departure: 'BOG',
    connections: 'MDE',
    arrival: 'CTG',
    trip: 'Round Trip',
    initiated: '85',
    started: '72',
    completed: '65',
    closed: '60',
  },
  {
    departure: 'MDE',
    connections: '',
    arrival: 'BOG',
    trip: 'One Way',
    initiated: '95',
    started: '80',
    completed: '74',
    closed: '70',
  },
]

const travelRowsExtended = [
  ...travelRowsBase,
  {
    departure: 'CLO',
    connections: 'BOG',
    arrival: 'ADZ',
    trip: 'One Way',
    initiated: '42',
    started: '38',
    completed: '35',
    closed: '33',
  },
  {
    departure: 'BAQ',
    connections: null,
    arrival: 'MDE',
    trip: 'Round Trip',
    initiated: '110',
    started: '98',
    completed: '90',
    closed: '85',
  },
]

const paymentColumns = [
  { key: 'date', label: 'Date' },
  { key: 'paymentMethod', label: 'Payment Method' },
  { key: 'currency', label: 'Currency' },
  { key: 'amount', label: 'Amount' },
  { key: 'exchangeRate', label: 'Exchange Rate' },
  { key: 'usdAmount', label: 'USD Amount' },
] as const

const paymentRows = [
  {
    date: 'Mar 15',
    paymentMethod: 'Credit Card',
    currency: 'USD',
    amount: '4850',
    exchangeRate: '1.0850',
    usdAmount: 'USD 2300,20',
  },
  {
    date: 'Mar 15',
    paymentMethod: 'Debit Card',
    currency: 'EUR',
    amount: '3200',
    exchangeRate: '1.0920',
    usdAmount: 'USD 1890,50',
  },
  {
    date: 'Mar 15',
    paymentMethod: 'PayPal',
    currency: 'GBP',
    amount: '2100',
    exchangeRate: '1.2780',
    usdAmount: 'USD 1644,75',
  },
]

const meta: Meta<typeof Table> = {
  title: 'Charts/Utils/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Tabla compacta para métricas en dashboards (modo claro y oscuro).

- **Tailwind** + **Inter** (\`font-sans\`).
- Celdas vacías → **—**.
- **View more / View less**: mismo comportamiento que **Checkin** — muestra hasta \`maxVisibleRows\` filas (por defecto **3**), el botón alterna el resto y muestra el chevron rotado al expandir. Estilos del CTA vía \`view-more-cta.css\`.

Props \`viewMoreLabel\` / \`viewLessLabel\`; en “more”, \`{count}\` son las filas ocultas.
        `,
      },
    },
  },
  argTypes: {
    columns: { control: 'object', description: 'Definición de columnas (key, label, emphasis opc.)' },
    rows: { control: 'object', description: 'Todas las filas (se truncan hasta maxVisibleRows si aplica)' },
    maxVisibleRows: {
      control: 'number',
      description: 'Máximo de filas visibles antes del toggle (default 3, como Checkin)',
    },
    viewMoreLabel: {
      control: 'text',
      description: 'Colapsado; usa `{count}` para filas ocultas',
    },
    viewLessLabel: {
      control: 'text',
      description: 'Expandido',
    },
  },
}

export default meta

type Story = StoryObj<typeof Table>

export const TravelDark: Story = {
  args: {
    columns: [...travelColumns],
    rows: [...travelRowsExtended],
    maxVisibleRows: 3,
    viewMoreLabel: 'View more ({count} rows)',
    viewLessLabel: 'View less',
  },
  render: (args) => ({
    components: { Table },
    setup() {
      return { args }
    },
    template: `
      <div class="dark min-h-[280px] p-6 font-sans">
        <Table v-bind="args" />
      </div>
    `,
  }),
}

export const PaymentsLight: Story = {
  args: {
    columns: [...paymentColumns],
    rows: [...paymentRows],
    maxVisibleRows: 2,
    viewMoreLabel: 'View more ({count} rows)',
    viewLessLabel: 'View less',
  },
  render: (args) => ({
    components: { Table },
    setup() {
      return { args }
    },
    template: `
      <div class="min-h-[260px] p-6 font-sans">
        <Table v-bind="args" />
      </div>
    `,
  }),
}

export const SinViewMore: Story = {
  args: {
    columns: [...paymentColumns],
    rows: [...paymentRows],
    maxVisibleRows: 10,
  },
  render: PaymentsLight.render,
}
