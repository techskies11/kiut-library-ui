import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import Select from './Select.vue';
import type { KiutSelectOption } from './Select.vue';

const unitOptions: KiutSelectOption[] = [
  { value: 'minutos', label: 'minutos' },
  { value: 'horas', label: 'horas' },
  { value: 'dias', label: 'días' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Listbox estilizado: ítem activo con check y fondo primario.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

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
