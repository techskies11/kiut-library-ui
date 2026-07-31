import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import MultiSelect from './MultiSelect.vue';
import type { KiutSelectOption } from './Select.vue';

const tagOptions: KiutSelectOption[] = [
  { value: 'ventas', label: 'Ventas' },
  { value: 'soporte', label: 'Soporte' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'rrhh', label: 'RR. HH.' },
];

const countryOptions: KiutSelectOption[] = [
  { value: 'ar', label: 'Argentina' },
  { value: 'bo', label: 'Bolivia' },
  { value: 'br', label: 'Brasil' },
  { value: 'cl', label: 'Chile' },
  { value: 'co', label: 'Colombia' },
  { value: 'mx', label: 'México' },
  { value: 'pe', label: 'Perú' },
  { value: 'uy', label: 'Uruguay' },
  { value: 've', label: 'Venezuela' },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/Inputs/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Listbox múltiple con los mismos estilos que Select: chips en el trigger y check en opciones activas. Con `searchable` incluye un buscador interno y con `showSelectAll` permite seleccionar o limpiar todas las opciones habilitadas.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Searchable: Story = {
  args: {
    modelValue: ['mx', 'ar'],
    label: 'Países',
    options: countryOptions,
    placeholder: 'Seleccionar países…',
    searchable: true,
    searchPlaceholder: 'Buscar país…',
    showSelectAll: true,
    selectAllLabel: 'Seleccionar todos los países',
  },
  render: (args) => ({
    components: { MultiSelect },
    setup() {
      const model = ref<string[]>([...(args.modelValue ?? [])]);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(MultiSelect, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string[]) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const Default: Story = {
  args: {
    modelValue: ['ventas', 'marketing'],
    label: 'Departamentos',
    options: tagOptions,
    placeholder: 'Seleccionar…',
  },
  render: (args) => ({
    components: { MultiSelect },
    setup() {
      const model = ref<string[]>([...(args.modelValue ?? [])]);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(MultiSelect, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string[]) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};
