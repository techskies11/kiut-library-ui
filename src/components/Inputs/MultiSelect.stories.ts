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

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/Inputs/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Listbox múltiple con los mismos estilos que Select: chips en el trigger y check en opciones activas.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

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
