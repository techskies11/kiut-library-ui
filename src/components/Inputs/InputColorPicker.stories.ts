import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import InputColorPicker from './InputColorPicker.vue';

const meta: Meta<typeof InputColorPicker> = {
  title: 'Components/Inputs/InputColorPicker',
  component: InputColorPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Selector de color nativo con campo hexadecimal opcional. Tema claro/oscuro: toolbar **Theme** en Storybook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputColorPicker>;

export const Default: Story = {
  args: {
    modelValue: '#6366f1',
    label: 'Color principal',
    showHexInput: true,
  },
  render: (args) => ({
    components: { InputColorPicker },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputColorPicker, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const SwatchOnly: Story = {
  args: {
    modelValue: '#0ea5e9',
    label: 'Solo muestra',
    showHexInput: false,
  },
  render: (args) => ({
    components: { InputColorPicker },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'max-w-xs' }, [
          h(InputColorPicker, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const WithError: Story = {
  args: {
    modelValue: '#22c55e',
    label: 'Color de acento',
    invalid: true,
    errorText: 'Este color no cumple las restricciones de marca.',
  },
  render: (args) => ({
    components: { InputColorPicker },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputColorPicker, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};
