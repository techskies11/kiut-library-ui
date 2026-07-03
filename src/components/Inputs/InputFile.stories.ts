import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import InputFile, { type FileUploadItem } from './InputFile.vue';

const meta: Meta<typeof InputFile> = {
  title: 'Components/Inputs/InputFile',
  component: InputFile,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'File upload — single file (default) or multiple files with optional per-file descriptions. Light/dark: Storybook **Theme** toolbar.',
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

export const MultipleFiles: Story = {
  args: {
    modelValue: [],
    multiple: true,
    label: 'Adjuntar documentos',
    chooseLabel: 'Agregar archivos',
    placeholder: 'Ningún archivo seleccionado',
    accept: '.pdf,application/pdf',
    filesCountLabel: '0 / 50 archivos',
  },
  render: (args) => ({
    components: { InputFile },
    setup() {
      const model = ref<FileUploadItem[]>([]);
      return () =>
        h('div', { class: 'max-w-lg' }, [
          h(InputFile, {
            ...args,
            modelValue: model.value,
            filesCountLabel: `${model.value.length} / 50 archivos`,
            'onUpdate:modelValue': (v: FileUploadItem[]) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const MultipleWithDescriptions: Story = {
  args: {
    modelValue: [],
    multiple: true,
    showDescriptions: true,
    label: 'Knowledge base documents',
    chooseLabel: 'Add files',
    placeholder: 'No files selected',
    descriptionLabel: 'Description',
    descriptionPlaceholder: 'Enter description',
    accept: '.pdf,application/pdf',
  },
  render: (args) => ({
    components: { InputFile },
    setup() {
      const model = ref<FileUploadItem[]>([]);
      return () =>
        h('div', { class: 'max-w-lg' }, [
          h(InputFile, {
            ...args,
            modelValue: model.value,
            filesCountLabel: `${model.value.length} / 50 archivos`,
            'onUpdate:modelValue': (v: FileUploadItem[]) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};
