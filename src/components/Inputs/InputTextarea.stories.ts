import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import InputTextarea from './InputTextarea.vue';

const meta: Meta<typeof InputTextarea> = {
  title: 'Components/Inputs/InputTextarea',
  component: InputTextarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Área de texto con etiqueta opcional. Tema claro/oscuro: toolbar **Theme** en Storybook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputTextarea>;

export const Default: Story = {
  args: {
    modelValue: '',
    label: 'Comentarios',
    placeholder: 'Escribe aquí…',
    rows: 4,
  },
  render: (args) => ({
    components: { InputTextarea },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputTextarea, {
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
    label: 'Descripción',
    placeholder: 'Descripción del ítem',
    invalid: true,
    errorText: 'La descripción debe tener al menos 20 caracteres.',
  },
  render: (args) => ({
    components: { InputTextarea },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputTextarea, {
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
