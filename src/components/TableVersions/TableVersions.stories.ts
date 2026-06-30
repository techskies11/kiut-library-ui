import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import TableVersions from './TableVersions.vue';
import type { TableVersionsRow } from './tableVersionsTypes';

const mockRows: TableVersionsRow[] = [
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

const meta: Meta<typeof TableVersions> = {
  title: 'Components/TableVersions',
  component: TableVersions,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tabla de endpoints API con filas expandibles y panel de historial de versiones. Prueba **Theme** en la toolbar de Storybook para modo claro y oscuro (clase `dark`).',
      },
    },
  },
  argTypes: {
    rows: { control: 'object' },
    singleExpand: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TableVersions>;

export const Default: Story = {
  args: {
    rows: mockRows,
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

export const Expanded: Story = {
  name: 'Expanded (historial visible)',
  parameters: {
    docs: {
      description: {
        story:
          'Fila con historial pre-expandida vía `defaultExpandedKeys`. Muestra la card archived con acciones Ver y Crear draft.',
      },
    },
  },
  render: () => ({
    components: { TableVersions },
    setup() {
      return () =>
        h('div', { class: 'w-full' }, [
          h(TableVersions, {
            rows: mockRows,
            defaultExpandedKeys: ['endpoint-2'],
          }),
        ]);
    },
  }),
};

export const SingleExpand: Story = {
  name: 'Single Expand',
  parameters: {
    docs: {
      description: {
        story: 'Con `singleExpand`, solo una fila puede estar abierta a la vez.',
      },
    },
  },
  render: () => ({
    components: { TableVersions },
    setup() {
      const expandedKeys = ref<string[]>(['endpoint-1']);

      return () =>
        h('div', { class: 'w-full' }, [
          h(TableVersions, {
            rows: mockRows,
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
