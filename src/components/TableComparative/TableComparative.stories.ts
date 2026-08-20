import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import TableComparative from './TableComparative.vue';
import type {
  TableComparativeColumn,
  TableComparativeGroup,
} from './tableComparativeTypes';

const columns: TableComparativeColumn[] = [
  { key: 'ar', label: 'Aerolineas Argentinas', color: '#7C3AED' },
  { key: 'latam', label: 'LATAM Airlines', color: '#0891B2' },
];

const groups: TableComparativeGroup[] = [
  {
    id: 'volume',
    label: 'Volume',
    rows: [
      {
        id: 'conversations',
        label: 'Conversations',
        cells: {
          ar: { value: '42,756', delta: '+0.6%', tone: 'positive' },
          latam: { value: '42,262', delta: '-0.6%', tone: 'negative' },
        },
      },
      {
        id: 'transactions',
        label: 'Transactions',
        cells: {
          ar: { value: '6,756', delta: '+3.8%', tone: 'positive' },
          latam: { value: '6,262', delta: '-3.8%', tone: 'negative' },
        },
      },
    ],
  },
  {
    id: 'revenue',
    label: 'Revenue',
    rows: [
      {
        id: 'ai_revenue',
        label: 'AI Revenue',
        cells: {
          ar: { value: '$82,756', delta: '+0.3%', tone: 'positive' },
          latam: { value: '$82,262', delta: '-0.3%', tone: 'negative' },
        },
      },
      {
        id: 'seller_revenue',
        label: 'Seller Revenue',
        cells: {
          ar: { value: '$66,756', delta: '+0.4%', tone: 'positive' },
          latam: { value: '$66,262', delta: '-0.4%', tone: 'negative' },
        },
      },
      {
        id: 'booking_manager_revenue',
        label: 'Booking Manager Revenue',
        cells: {
          ar: { value: '$50,756', delta: '+0.5%', tone: 'positive' },
          latam: { value: '$50,262', delta: '-0.5%', tone: 'negative' },
        },
      },
    ],
  },
  {
    id: 'conversion',
    label: 'Conversion',
    rows: [
      {
        id: 'seller_cr',
        label: 'Seller CR',
        cells: {
          ar: { value: '10.0%', delta: '-23.1%', tone: 'negative' },
          latam: { value: '16.0%', delta: '+23.1%', tone: 'positive' },
        },
      },
      {
        id: 'booking_manager_cr',
        label: 'Booking Manager CR',
        cells: {
          ar: { value: '13.0%', delta: '-3.7%', tone: 'negative' },
          latam: { value: '14.0%', delta: '+3.7%', tone: 'positive' },
        },
      },
      {
        id: 'checkin_cr',
        label: 'Check-in CR',
        cells: {
          ar: { value: '67.0%', delta: '-8.2%', tone: 'negative' },
          latam: { value: '79.0%', delta: '+8.2%', tone: 'positive' },
        },
      },
      {
        id: 'human_escalations',
        label: 'Human Escalations',
        cells: {
          ar: { value: '62.0%', delta: '-2.1%', tone: 'negative' },
          latam: { value: '64.0%', delta: '+2.1%', tone: 'positive' },
        },
      },
    ],
  },
];

const meta: Meta<typeof TableComparative> = {
  title: 'Components/Table/Comparative',
  component: TableComparative,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Matriz comparativa de métricas (filas) × entidades (columnas), con grupos colapsables. Presentacional: el padre formatea valores, deltas y el tono best/worst. Prueba **Theme** en la toolbar de Storybook para modo claro y oscuro.',
      },
    },
  },
  argTypes: {
    loading: { control: 'boolean' },
    empty: { control: 'boolean' },
    columns: { control: 'object' },
    groups: { control: 'object' },
    maxHeight: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof TableComparative>;

export const Default: Story = {
  args: {
    columns,
    groups,
    loading: false,
  },
  render: (args) => ({
    components: { TableComparative },
    setup() {
      return () =>
        h('div', { class: 'w-full' }, [
          h(TableComparative, {
            columns: args.columns,
            groups: args.groups,
            loading: args.loading,
            empty: args.empty,
            maxHeight: args.maxHeight,
          }),
        ]);
    },
  }),
};

export const CollapsedGroups: Story = {
  name: 'Collapsed groups',
  render: () => ({
    components: { TableComparative },
    setup() {
      const expandedGroupIds = ref<string[]>(['volume']);
      return () =>
        h('div', { class: 'w-full' }, [
          h(TableComparative, {
            columns,
            groups,
            expandedGroupIds: expandedGroupIds.value,
            'onUpdate:expandedGroupIds': (ids: string[]) => {
              expandedGroupIds.value = ids;
            },
          }),
        ]);
    },
  }),
};

export const MissingValues: Story = {
  name: 'Missing values',
  render: () => ({
    components: { TableComparative },
    setup() {
      const sparseGroups: TableComparativeGroup[] = [
        {
          id: 'volume',
          label: 'Volume',
          rows: [
            {
              id: 'conversations',
              label: 'Conversations',
              cells: {
                ar: { value: '12,400', delta: '+2.1%', tone: 'positive' },
                latam: { empty: true, value: '' },
              },
            },
            {
              id: 'transactions',
              label: 'Transactions',
              cells: {
                ar: { empty: true, value: '' },
                latam: { value: '3,210', delta: '-1.4%', tone: 'negative' },
              },
            },
          ],
        },
      ];
      return () =>
        h('div', { class: 'w-full' }, [
          h(TableComparative, { columns, groups: sparseGroups }),
        ]);
    },
  }),
};

export const Loading: Story = {
  args: {
    columns,
    groups: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    groups: [],
    empty: true,
  },
};
