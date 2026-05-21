import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import Select from './Select.vue';
import type { KiutSelectOption } from './Select.vue';

const unitOptions: KiutSelectOption[] = [
  { value: 'minutos', label: 'minutos' },
  { value: 'horas', label: 'horas' },
  { value: 'dias', label: 'días' },
];

const countryOptions: KiutSelectOption[] = [
  { value: 'ar', label: 'Argentina' },
  { value: 'bo', label: 'Bolivia' },
  { value: 'br', label: 'Brasil' },
  { value: 'cl', label: 'Chile' },
  { value: 'co', label: 'Colombia' },
  { value: 'cr', label: 'Costa Rica' },
  { value: 'cu', label: 'Cuba' },
  { value: 'ec', label: 'Ecuador' },
  { value: 'sv', label: 'El Salvador' },
  { value: 'gt', label: 'Guatemala' },
  { value: 'hn', label: 'Honduras' },
  { value: 'mx', label: 'México' },
  { value: 'ni', label: 'Nicaragua' },
  { value: 'pa', label: 'Panamá' },
  { value: 'py', label: 'Paraguay' },
  { value: 'pe', label: 'Perú' },
  { value: 'do', label: 'República Dominicana' },
  { value: 'uy', label: 'Uruguay' },
  { value: 've', label: 'Venezuela' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Listbox estilizado: ítem activo con check y fondo primario. Con `searchable` incluye un buscador interno que filtra opciones por label.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Searchable: Story = {
  args: {
    modelValue: 'mx',
    label: 'País',
    options: countryOptions,
    placeholder: 'Seleccionar país…',
    searchable: true,
    searchPlaceholder: 'Buscar país…',
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const model = ref<string | null>(args.modelValue ?? null);
      return () =>
        h('div', { class: 'max-w-xs' }, [
          h(Select, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string | number) => {
              model.value = v as string;
            },
          }),
        ]);
    },
  }),
};

export const Default: Story = {
  args: {
    modelValue: 'horas',
    label: 'Unidad',
    options: unitOptions,
    placeholder: 'Seleccionar…',
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const model = ref<string | null>(args.modelValue ?? null);
      return () =>
        h('div', { class: 'max-w-xs' }, [
          h(Select, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string | number) => {
              model.value = v as string;
            },
          }),
        ]);
    },
  }),
};
