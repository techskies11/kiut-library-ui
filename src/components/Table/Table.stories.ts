import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import {
  ArrowDownTrayIcon,
  PencilSquareIcon,
  SparklesIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';
import Tag, { type KiutTagColor } from '../Tag/Tag.vue';
import Table from './Table.vue';
import type { TableColumn } from './Table.vue';

const STATUS_COLORS: Record<string, string> = {
  Confirmed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'Change required': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Disabled: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
};

const ROLE_COLORS: Record<string, string> = {
  Admin: 'border border-violet-300 text-violet-700 dark:border-violet-600 dark:text-violet-300',
  Chats: 'border border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-300',
  Agent: 'border border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-300',
  'Agent Chats': 'border border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-300',
  Users: 'border border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-300',
};

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
          'Tabla declarativa con tokens Kiut. La selección múltiple es opcional (`selectable`). Con `expandable` y `children` en cada fila, las filas hijas se muestran en cascada con chevron e indentación. Prueba **Theme** en la toolbar de Storybook para modo claro y oscuro (clase `dark`).',
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

const usersColumns: TableColumn[] = [
  { key: 'name',   label: 'Name',    headerClass: 'w-[150px]', cellClass: 'w-[150px]' },
  { key: 'email',  label: 'Email',   headerClass: 'w-[200px]', cellClass: 'w-[200px]' },
  { key: 'phone',  label: 'Phone',   headerClass: 'w-[130px]', cellClass: 'w-[130px]' },
  { key: 'groups', label: 'Role',    headerClass: 'w-[160px]', cellClass: 'w-[160px]' },
  { key: 'area',   label: 'Area',    headerClass: 'w-[100px]', cellClass: 'w-[100px]' },
  { key: 'status', label: 'Status',  headerClass: 'w-[140px]', cellClass: 'w-[140px]' },
  { key: 'active', label: 'Active',  headerClass: 'w-[70px]',  cellClass: 'w-[70px]'  },
  { key: 'actions',label: 'Actions', headerClass: 'w-[90px]',  cellClass: 'w-[90px]'  },
];

const usersRows = [
  { id: '1', name: 'Ana López',      email: 'ana@empresa.com',     phone: '+57 311 1111111',  groups: ['Admin', 'Chats'],        area: '',    status: 'Confirmed',      active: true },
  { id: '2', name: 'Carlos Ruiz',    email: 'carlos@empresa.com',  phone: '+54 011 2222-2222', groups: ['Agent', 'Agent Chats'],  area: 'Faq', status: 'Confirmed',      active: true },
  { id: '3', name: 'María Soto',     email: 'maria@empresa.com',   phone: '+57 312 3333333',  groups: ['Users'],                 area: '',    status: 'Change required', active: true },
  { id: '4', name: 'Diego Medina',   email: 'diego@empresa.com',   phone: '+54 379 4444-4444', groups: ['Admin'],                 area: '',    status: 'Confirmed',      active: false },
  { id: '5', name: 'Sofía Herrera',  email: 'sofia@empresa.com',   phone: '+57 316 5555555',  groups: ['Admin', 'Chats'],        area: '',    status: 'Change required', active: true },
];

type KbRow = {
  id: string;
  description: string;
  created_at: string;
  status: string;
  statusCount?: number;
  aiGenerated?: boolean;
  children?: KbRow[];
};

const KB_STATUS_COLORS: Record<string, KiutTagColor> = {
  processed: 'success',
  pending: 'warning',
  rejected: 'danger',
  processing: 'neutral',
};

const KB_STATUS_LABELS: Record<string, string> = {
  processed: 'Procesado',
  pending: 'Pendiente de aprobación',
  rejected: 'Rechazado',
  processing: 'Procesando',
};

const kbColumns: TableColumn[] = [
  { key: 'description', label: 'DESCRIPCIÓN', headerClass: 'min-w-0', cellClass: 'min-w-0' },
  { key: 'created_at', label: 'FECHA DE CREACIÓN', headerClass: 'w-40', cellClass: 'w-40' },
  { key: 'status', label: 'ESTADO', headerClass: 'w-52', cellClass: 'w-52' },
  { key: 'actions', label: 'ACCIONES', headerClass: 'w-28', cellClass: 'w-28', align: 'right' },
];

const kbRows: KbRow[] = [
  {
    id: 'doc-1',
    description: 'Política de equipaje actualizada 2026',
    created_at: '2026-01-15',
    status: 'processed',
    aiGenerated: true,
  },
  {
    id: 'site-1',
    description: 'www.vivaaerobus.com',
    created_at: '2026-01-15',
    status: 'processing',
    statusCount: 23,
    children: [
      {
        id: 'site-1-page-1',
        description: 'Página principal — www.vivaaerobus.com',
        created_at: '2026-01-15',
        status: 'processed',
        aiGenerated: true,
      },
      {
        id: 'site-1-page-2',
        description: 'About — www.vivaaerobus.com',
        created_at: '2026-01-15',
        status: 'pending',
        aiGenerated: true,
      },
      {
        id: 'site-1-page-3',
        description: 'Contact — www.vivaaerobus.com',
        created_at: '2026-01-15',
        status: 'rejected',
      },
      {
        id: 'site-1-page-4',
        description: 'FAQ — www.vivaaerobus.com',
        created_at: '2026-01-15',
        status: 'processing',
      },
    ],
  },
  {
    id: 'doc-2',
    description: 'Manual de check-in digital',
    created_at: '2026-01-14',
    status: 'pending',
  },
  {
    id: 'doc-3',
    description: 'Términos y condiciones v3',
    created_at: '2026-01-12',
    status: 'rejected',
  },
];

export const NestedRows: Story = {
  name: 'Nested Rows (Knowledge Base)',
  parameters: {
    docs: {
      description: {
        story:
          'Filas en cascada con `expandable`, `children` en cada fila padre y chevron en la columna `description`. Usa `v-model:expanded-keys` para controlar qué filas están abiertas.',
      },
    },
  },
  render: () => ({
    components: { Table, Tag },
    setup() {
      const expandedKeys = ref<string[]>(['site-1']);

      const statusLabel = (row: KbRow) => {
        const base = KB_STATUS_LABELS[row.status] ?? row.status;
        if (row.status === 'processing' && row.statusCount != null) {
          return `${base} (${row.statusCount} documentos)`;
        }
        return base;
      };

      return () =>
        h('div', { class: 'w-full' }, [
          h(Table, {
            columns: kbColumns,
            rows: kbRows,
            rowKey: 'id',
            expandable: true,
            expandColumnKey: 'description',
            fixedLayout: true,
            expandedKeys: expandedKeys.value,
            'onUpdate:expandedKeys': (keys: string[]) => {
              expandedKeys.value = keys;
            },
          }, {
            'cell-description': ({ row }: { row: KbRow }) =>
              h('div', { class: 'flex min-w-0 items-center gap-1.5' }, [
                row.aiGenerated
                  ? h(SparklesIcon, {
                      class: 'h-4 w-4 shrink-0 text-violet-400',
                      'aria-hidden': 'true',
                    })
                  : null,
                h(
                  'span',
                  {
                    class: [
                      'truncate',
                      row.children?.length
                        ? 'font-medium text-[color:var(--kiut-text-primary)]'
                        : 'text-[color:var(--kiut-text-secondary)]',
                    ].join(' '),
                  },
                  row.description,
                ),
              ]),

            'cell-created_at': ({ row }: { row: KbRow }) =>
              h(
                'span',
                { class: 'text-[color:var(--kiut-text-secondary)] text-xs whitespace-nowrap' },
                row.created_at,
              ),

            'cell-status': ({ row }: { row: KbRow }) =>
              h(
                Tag,
                { color: KB_STATUS_COLORS[row.status] ?? 'neutral', outlined: false },
                () => statusLabel(row),
              ),

            'cell-actions': () =>
              h('div', { class: 'flex items-center justify-end gap-2' }, [
                h('button', {
                  class: 'text-gray-400 hover:text-violet-500 transition-colors',
                  title: 'Editar',
                  type: 'button',
                }, [h(PencilSquareIcon, { class: 'h-4 w-4' })]),
                h('button', {
                  class: 'text-gray-400 hover:text-violet-500 transition-colors',
                  title: 'Descargar',
                  type: 'button',
                }, [h(ArrowDownTrayIcon, { class: 'h-4 w-4' })]),
                h('button', {
                  class: 'text-gray-400 hover:text-red-500 transition-colors',
                  title: 'Eliminar',
                  type: 'button',
                }, [h(TrashIcon, { class: 'h-4 w-4' })]),
              ]),
          }),
        ]);
    },
  }),
};

export const FixedLayout: Story = {
  name: 'Fixed Layout (Users)',
  parameters: {
    docs: {
      description: {
        story:
          'Con `fixedLayout` activo, las columnas respetan los anchos definidos en `headerClass`/`cellClass` sin redistribuirse. Ideal para tablas con muchas columnas como la de usuarios.',
      },
    },
  },
  render: () => ({
    components: { Table },
    setup() {
      const active = ref<Record<string, boolean>>(
        Object.fromEntries(usersRows.map((r) => [r.id, r.active]))
      );

      return () =>
        h('div', { class: 'w-full' }, [
          h(Table, {
            columns: usersColumns,
            rows: usersRows,
            rowKey: 'id',
            fixedLayout: true,
          }, {
            'cell-name': ({ row }: { row: typeof usersRows[0] }) =>
              h('span', { class: 'font-medium capitalize text-[color:var(--kiut-text-primary)] truncate block' }, row.name),

            'cell-email': ({ row }: { row: typeof usersRows[0] }) =>
              h('span', { class: 'text-[#838395] truncate block text-xs' }, row.email),

            'cell-phone': ({ row }: { row: typeof usersRows[0] }) =>
              h('span', { class: 'text-[color:var(--kiut-text-secondary)] text-xs' }, row.phone),

            'cell-groups': ({ row }: { row: typeof usersRows[0] }) =>
              h('div', { class: 'flex flex-wrap gap-1' },
                row.groups.map((g) =>
                  h('span', {
                    class: `inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_COLORS[g] ?? 'border border-gray-300 text-gray-600'}`,
                  }, g)
                )
              ),

            'cell-area': ({ row }: { row: typeof usersRows[0] }) =>
              row.area
                ? h('span', { class: 'inline-flex items-center rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/40 dark:text-violet-300' }, row.area)
                : h('span', {}, ''),

            'cell-status': ({ row }: { row: typeof usersRows[0] }) =>
              h('span', {
                class: `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS[row.status] ?? ''}`,
              }, row.status),

            'cell-active': ({ row }: { row: typeof usersRows[0] }) =>
              h('button', {
                role: 'switch',
                'aria-checked': active.value[row.id],
                onClick: () => { active.value[row.id] = !active.value[row.id]; },
                class: [
                  'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200',
                  active.value[row.id] ? 'bg-violet-600' : 'bg-gray-300 dark:bg-gray-600',
                ].join(' '),
              }, [
                h('span', {
                  class: [
                    'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow ring-0 transition-transform duration-200',
                    active.value[row.id] ? 'translate-x-4' : 'translate-x-0',
                  ].join(' '),
                }),
              ]),

            'cell-actions': () =>
              h('div', { class: 'flex items-center gap-2' }, [
                h('button', { class: 'text-gray-400 hover:text-violet-600 transition-colors', title: 'Edit' }, [
                  h(PencilSquareIcon, { class: 'h-4 w-4' }),
                ]),
                h('button', { class: 'text-gray-400 hover:text-red-500 transition-colors', title: 'Delete' }, [
                  h(TrashIcon, { class: 'h-4 w-4' }),
                ]),
              ]),
          }),
        ]);
    },
  }),
};