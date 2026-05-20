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
          'Barra de ku:filtros: pastillas para cada definición (selección múltiple en ku:`type: "select"` con valor `string[]`), chips en una segunda fila y «Limpiar» al lado. Estado con `v-model`. Prueba **Theme** en Storybook (clase `dark`).',
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
    label: 'ku:Filtros:',
    clearLabel: 'Limpiar filtros',
  },
  render: (args) => ({
    components: { Filters },
    setup() {
      const model = ref<FiltersModelValue>({ ...(args.modelValue ?? {}) });
      return () =>
        h('div', { class: 'ku:max-w-4xl ku:space-y-4' }, [
          h(Filters, {
            filterDefinitions: args.filterDefinitions,
            modelValue: model.value,
            label: args.label,
            clearLabel: args.clearLabel,
            'ku:onUpdate:modelValue': (v: FiltersModelValue) => {
              model.value = v;
            },
          }),
          h(
            'pre',
            {
              class:
                'ku:overflow-x-auto ku:rounded-lg ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-slate-50 ku:p-3 ku:font-mono ku:text-xs ku:text-[color:var(--kiut-text-secondary)] ku:dark:bg-[#1a1a1c]',
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
    label: 'ku:Filtros:',
    clearLabel: 'Limpiar filtros',
  },
  render: (args) => ({
    components: { Filters },
    setup() {
      const model = ref<FiltersModelValue>({ ...(args.modelValue ?? {}) });
      return () =>
        h('div', { class: 'ku:max-w-4xl ku:space-y-4' }, [
          h(Filters, {
            filterDefinitions: args.filterDefinitions,
            modelValue: model.value,
            label: args.label,
            clearLabel: args.clearLabel,
            'ku:onUpdate:modelValue': (v: FiltersModelValue) => {
              model.value = v;
            },
          }),
          h(
            'pre',
            {
              class:
                'ku:overflow-x-auto ku:rounded-lg ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-slate-50 ku:p-3 ku:font-mono ku:text-xs ku:text-[color:var(--kiut-text-secondary)] ku:dark:bg-[#1a1a1c]',
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
        h('div', { class: 'ku:max-w-4xl ku:space-y-3' }, [
          h(Filters, {
            filterDefinitions: args.filterDefinitions,
            modelValue: model.value,
            'ku:onUpdate:modelValue': (v: FiltersModelValue) => {
              model.value = v;
            },
            onChange: (v: FiltersModelValue) => {
              logs.value = [`change → ${JSON.stringify(v)}`, ...logs.value].slice(0, 4);
            },
          }),
          h('p', { class: 'ku:font-mono ku:text-xs ku:text-[color:var(--kiut-text-muted)]' }, [
            'Últimos ku:change:',
            ...logs.value.map((line) => h('div', line)),
          ]),
        ]);
    },
  }),
};
