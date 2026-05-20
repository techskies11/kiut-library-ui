import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import InputFile from './InputFile.vue';

const meta: Meta<typeof InputFile> = {
  title: 'Components/Inputs/InputFile',
  component: InputFile,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Carga de un documento con vista del nombre del archivo. Tema claro/oscuro: toolbar **Theme** en Storybook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputFile>;

export const Default: Story = {
  args: {
    modelValue: null,
    label: 'Adjuntar documento',
    placeholder: 'Ningún archivo seleccionado',
  },
  render: (args) => ({
    components: { InputFile },
    setup() {
      const model = ref<File | null>(args.modelValue ?? null);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputFile, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: File | null) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const WithError: Story = {
  args: {
    modelValue: null,
    label: 'Justificante',
    invalid: true,
    errorText: 'Debes adjuntar un archivo PDF o Word.',
  },
  render: (args) => ({
    components: { InputFile },
    setup() {
      const model = ref<File | null>(args.modelValue ?? null);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputFile, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: File | null) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};
