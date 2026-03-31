import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import Table from './Table.vue';
import type { TableColumn } from './Table.vue';

const baseColumns: TableColumn[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'role', label: 'Rol' },
  { key: 'status', label: 'Estado', align: 'center' },
];

const baseRows = [
  { id: '1', name: 'Ana López', role: 'Admin', status: 'Activo' },
  { id: '2', name: 'Carlos Ruiz', role: 'Editor', status: 'Activo' },
  { id: '3', name: 'María Soto', role: 'Lector', status: 'Inactivo' },
];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tabla declarativa con tokens Kiut. La selección múltiple es opcional (`selectable`). Prueba **Theme** en la toolbar de Storybook para modo claro y oscuro (clase `dark`).',
      },
    },
  },
  argTypes: {
    selectable: { control: 'boolean' },
    columns: { control: 'object' },
    rows: { control: 'object' },
    rowKey: { control: false },
    selectedKeys: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    columns: baseColumns,
    rows: baseRows,
    selectable: false,
    rowKey: 'id',
  },
  render: (args) => ({
    components: { Table },
    setup() {
      return () =>
        h('div', { class: 'max-w-4xl' }, [
          h(Table, {
            columns: args.columns,
            rows: args.rows,
            selectable: args.selectable,
            rowKey: args.rowKey,
          }),
        ]);
    },
  }),
};

export const Selectable: Story = {
  args: {
    columns: baseColumns,
    rows: baseRows,
    selectable: true,
    rowKey: 'id',
  },
  render: (args) => ({
    components: { Table },
    setup() {
      const selectedKeys = ref<string[]>(['2']);
      return () =>
        h('div', { class: 'max-w-4xl space-y-3' }, [
          h(Table, {
            columns: args.columns,
            rows: args.rows,
            selectable: true,
            rowKey: 'id',
            selectedKeys: selectedKeys.value,
            'onUpdate:selectedKeys': (keys: string[]) => {
              selectedKeys.value = keys;
            },
          }),
          h(
            'p',
            {
              class: 'font-mono text-xs text-[color:var(--kiut-text-muted)]',
            },
            `Seleccionados: ${selectedKeys.value.length ? selectedKeys.value.join(', ') : '(ninguno)'}`
          ),
        ]);
    },
  }),
};