import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import InputNumber from './InputNumber.vue';

const meta: Meta<typeof InputNumber> = {
  title: 'Components/Inputs/InputNumber',
  component: InputNumber,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Campo numérico; flechas nativas ocultas. Valor centrado por defecto.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputNumber>;

export const Default: Story = {
  args: {
    modelValue: 24,
    label: 'Cantidad',
    placeholder: '0',
    min: 0,
    max: 999,
    step: 1,
    align: 'center',
  },
  render: (args) => ({
    components: { InputNumber },
    setup() {
      const model = ref<number | null>(args.modelValue ?? null);
      return () =>
        h('div', { class: 'max-w-xs' }, [
          h(InputNumber, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: number | null) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};
