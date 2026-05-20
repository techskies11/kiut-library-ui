import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import Filters from './Filters.vue';
import type {
  FilterDefinition,
  FiltersModelValue,
} from './Filters.vue';

const baseDefinitions: FilterDefinition[] = [
  { id: 'code', label: 'Código', type: 'text', placeholder: 'Buscar por código' },
  {
    id: 'discount',
    label: 'Descuento',
    type: 'select',
    placeholder: 'Tipo de descuento',
    options: [
      { value: 'none', label: 'Sin descuento' },
      { value: '10', label: '10%' },
      { value: '20', label: '20%' },
      { value: 'promo', label: 'Promoción' },
    ],
  },
  { id: 'travel', label: 'Fechas de viaje', type: 'dateRange' },
  { id: 'purchase', label: 'Fechas de compra', type: 'dateRange' },
];

const meta: Meta<typeof Filters> = {
  title: 'Components/Filters',
  component: Filters,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Barra de filtros: pastillas para cada definición (selección múltiple en `type: "select"` con valor `string[]`), chips en una segunda fila y «Limpiar» al lado. Estado con `v-model`. Prueba **Theme** en Storybook (clase `dark`).',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    clearLabel: { control: 'text' },
    filterDefinitions: { control: 'object' },
    modelValue: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof Filters>;

export const Default: Story = {
  args: {
    filterDefinitions: baseDefinitions,
    modelValue: {} as FiltersModelValue,
    label: 'Filtros:',
    clearLabel: 'Limpiar filtros',
  },
  render: (args) => ({
    components: { Filters },
    setup() {
      const model = ref<FiltersModelValue>({ ...(args.modelValue ?? {}) });
      return () =>
        h('div', { class: 'max-w-4xl space-y-4' }, [
          h(Filters, {
            filterDefinitions: args.filterDefinitions,
            modelValue: model.value,
            label: args.label,
            clearLabel: args.clearLabel,
            'onUpdate:modelValue': (v: FiltersModelValue) => {
              model.value = v;
            },
          }),
          h(
            'pre',
            {
              class:
                'overflow-x-auto rounded-lg border border-[color:var(--kiut-border-light)] bg-slate-50 p-3 font-mono text-xs text-[color:var(--kiut-text-secondary)] dark:bg-[#1a1a1c]',
            },
            JSON.stringify(model.value, null, 2)
          ),
        ]);
    },
  }),
};

export const WithActiveFilters: Story = {
  args: {
    filterDefinitions: baseDefinitions,
    modelValue: {
      code: 'SUmmer',
      discount: ['10', '20'],
      travel: { start: '2025-06-01', end: '2025-06-15' },
    } as FiltersModelValue,
    label: 'Filtros:',
    clearLabel: 'Limpiar filtros',
  },
  render: (args) => ({
    components: { Filters },
    setup() {
      const model = ref<FiltersModelValue>({ ...(args.modelValue ?? {}) });
      return () =>
        h('div', { class: 'max-w-4xl space-y-4' }, [
          h(Filters, {
            filterDefinitions: args.filterDefinitions,
            modelValue: model.value,
            label: args.label,
            clearLabel: args.clearLabel,
            'onUpdate:modelValue': (v: FiltersModelValue) => {
              model.value = v;
            },
          }),
          h(
            'pre',
            {
              class:
                'overflow-x-auto rounded-lg border border-[color:var(--kiut-border-light)] bg-slate-50 p-3 font-mono text-xs text-[color:var(--kiut-text-secondary)] dark:bg-[#1a1a1c]',
            },
            JSON.stringify(model.value, null, 2)
          ),
        ]);
    },
  }),
};

export const ChangeLog: Story = {
  args: {
    filterDefinitions: baseDefinitions,
    modelValue: {} as FiltersModelValue,
  },
  render: (args) => ({
    components: { Filters },
    setup() {
      const model = ref<FiltersModelValue>({});
      const logs = ref<string[]>([]);
      return () =>
        h('div', { class: 'max-w-4xl space-y-3' }, [
          h(Filters, {
            filterDefinitions: args.filterDefinitions,
            modelValue: model.value,
            'onUpdate:modelValue': (v: FiltersModelValue) => {
              model.value = v;
            },
            onChange: (v: FiltersModelValue) => {
              logs.value = [`change → ${JSON.stringify(v)}`, ...logs.value].slice(0, 4);
            },
          }),
          h('p', { class: 'font-mono text-xs text-[color:var(--kiut-text-muted)]' }, [
            'Últimos change:',
            ...logs.value.map((line) => h('div', line)),
          ]),
        ]);
    },
  }),
};
