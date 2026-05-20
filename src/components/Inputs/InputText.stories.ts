import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import InputText from './InputText.vue';

const meta: Meta<typeof InputText> = {
  title: 'Components/Inputs/InputText',
  component: InputText,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Campo de texto con etiqueta opcional. Tema claro/oscuro: toolbar **Theme** en Storybook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    modelValue: '',
    label: 'Nombre',
    placeholder: 'Nombre completo',
  },
  render: (args) => ({
    components: { InputText },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputText, {
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
    modelValue: '',
    label: 'Email',
    placeholder: 'email@empresa.com',
    invalid: true,
    errorText: 'Introduce un email válido.',
  },
  render: (args) => ({
    components: { InputText },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputText, {
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
