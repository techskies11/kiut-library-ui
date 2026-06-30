import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import TableVersions from './TableVersions.vue';
import {
  ENDPOINT_TABLE_VERSIONS_COLUMNS,
  RESOURCE_TABLE_VERSIONS_COLUMNS,
  type TableVersionsRow,
} from './tableVersionsTypes';

const endpointRows: TableVersionsRow[] = [
  {
    id: 'endpoint-1',
    method: 'GET',
    name: 'Get flight status',
    description: 'Consulta estado de vuelo por número de PNR',
    url: 'https://api.airline.com/flights/{{pnr}}',
    status: 'published',
    version: 'v1',
    updatedAt: '2026-06-30',
  },
  {
    id: 'endpoint-2',
    method: 'POST',
    name: 'Create booking',
    description: 'Crea una reserva con datos del pasajero',
    url: 'https://api.airline.com/bookings',
    status: 'published',
    version: 'v2',
    updatedAt: '2026-06-30',
    versions: [
      {
        id: 'endpoint-2-v1',
        method: 'POST',
        url: 'https://api.airline.com/bookings',
        version: 'v1',
        status: 'archived',
        updatedAt: '2026-06-25T14:23:31',
      },
    ],
  },
  {
    id: 'endpoint-3',
    method: 'GET',
    name: 'List airports',
    description: 'Lista aeropuertos disponibles',
    url: 'https://api.airline.com/airports',
    status: 'draft',
    version: 'v1',
    updatedAt: '2026-06-30',
    versions: [],
  },
];

const resourceRows: TableVersionsRow[] = [
  {
    id: 'bot-seller',
    name: 'Seller',
    description: 'Asiste en ventas, cotizaciones y reservas de vuelos',
    status: 'published',
    version: 'v2',
    updatedAt: '2026-06-30',
    active: true,
    versions: [
      {
        id: 'bot-seller-v1',
        version: 'v1',
        status: 'archived',
        updatedAt: '2026-06-23T17:53:46',
      },
    ],
  },
  {
    id: 'bot-checkin',
    name: 'Check In',
    description: 'Gestiona el check-in y emisión de boarding pass',
    status: 'draft',
    version: 'v1',
    updatedAt: '2026-06-30',
    active: false,
    versions: [],
  },
  {
    id: 'bot-faq',
    name: 'FAQ',
    description: 'Responde preguntas frecuentes sobre políticas y servicios',
    status: 'published',
    version: 'v1',
    updatedAt: '2026-06-30',
    active: true,
    versions: [],
  },
];

const meta: Meta<typeof TableVersions> = {
  title: 'Components/TableVersions',
  component: TableVersions,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tabla con filas expandibles y panel de historial de versiones. Configura las columnas con `columns` (presets `ENDPOINT_TABLE_VERSIONS_COLUMNS` o `RESOURCE_TABLE_VERSIONS_COLUMNS`). Prueba **Theme** en Storybook para light/dark.',
      },
    },
  },
  argTypes: {
    rows: { control: 'object' },
    columns: { control: 'object' },
    singleExpand: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TableVersions>;

export const Endpoints: Story = {
  name: 'Endpoints (API)',
  args: {
    rows: endpointRows,
    columns: ENDPOINT_TABLE_VERSIONS_COLUMNS,
    expandColumnKey: 'method',
    singleExpand: false,
  },
  render: (args) => ({
    components: { TableVersions },
    setup() {
      const expandedKeys = ref<string[]>([]);

      return () =>
        h('div', { class: 'w-full' }, [
          h(TableVersions, {
            rows: args.rows,
            columns: args.columns,
            expandColumnKey: args.expandColumnKey,
            singleExpand: args.singleExpand,
            expandedKeys: expandedKeys.value,
            'onUpdate:expandedKeys': (keys: string[]) => {
              expandedKeys.value = keys;
            },
          }),
        ]);
    },
  }),
};

export const EndpointsExpanded: Story = {
  name: 'Endpoints — historial visible',
  render: () => ({
    components: { TableVersions },
    setup() {
      return () =>
        h('div', { class: 'w-full' }, [
          h(TableVersions, {
            rows: endpointRows,
            columns: ENDPOINT_TABLE_VERSIONS_COLUMNS,
            expandColumnKey: 'method',
            defaultExpandedKeys: ['endpoint-2'],
          }),
        ]);
    },
  }),
};

export const Resources: Story = {
  name: 'Resources (bots)',
  parameters: {
    docs: {
      description: {
        story:
          'Preset `RESOURCE_TABLE_VERSIONS_COLUMNS`: nombre con chevron, status, versión, toggle activo y acciones view/createDraft/edit/delete.',
      },
    },
  },
  render: () => ({
    components: { TableVersions },
    setup() {
      const rows = ref<TableVersionsRow[]>(resourceRows.map((r) => ({ ...r })));
      const expandedKeys = ref<string[]>(['bot-seller']);

      return () =>
        h('div', { class: 'w-full' }, [
          h(TableVersions, {
            rows: rows.value,
            columns: RESOURCE_TABLE_VERSIONS_COLUMNS,
            expandColumnKey: 'name',
            expandedKeys: expandedKeys.value,
            'onUpdate:expandedKeys': (keys: string[]) => {
              expandedKeys.value = keys;
            },
            onToggleActive: (row: TableVersionsRow, active: boolean) => {
              rows.value = rows.value.map((r) =>
                r.id === row.id ? { ...r, active } : r,
              );
            },
          }),
        ]);
    },
  }),
};

export const SingleExpand: Story = {
  name: 'Single Expand',
  render: () => ({
    components: { TableVersions },
    setup() {
      const expandedKeys = ref<string[]>(['endpoint-1']);

      return () =>
        h('div', { class: 'w-full' }, [
          h(TableVersions, {
            rows: endpointRows,
            columns: ENDPOINT_TABLE_VERSIONS_COLUMNS,
            expandColumnKey: 'method',
            singleExpand: true,
            expandedKeys: expandedKeys.value,
            'onUpdate:expandedKeys': (keys: string[]) => {
              expandedKeys.value = keys;
            },
          }),
        ]);
    },
  }),
};

/** @deprecated Usar story `Endpoints`. */
export const Default = Endpoints;

/** @deprecated Usar story `EndpointsExpanded`. */
export const Expanded = EndpointsExpanded;
