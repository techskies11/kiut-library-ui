import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import InputPassword from './InputPassword.vue';

const meta: Meta<typeof InputPassword> = {
  title: 'Components/Inputs/InputPassword',
  component: InputPassword,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Campo de contraseña con toggle mostrar/ocultar. Tema claro/oscuro: toolbar **Theme** en Storybook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputPassword>;

export const Default: Story = {
  args: {
    modelValue: '',
    label: 'Contraseña',
    placeholder: 'Introduce tu contraseña',
  },
  render: (args) => ({
    components: { InputPassword },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputPassword, {
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
    label: 'Contraseña',
    placeholder: 'Introduce tu contraseña',
    invalid: true,
    errorText: 'La contraseña es obligatoria.',
  },
  render: (args) => ({
    components: { InputPassword },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputPassword, {
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

export const Disabled: Story = {
  args: {
    modelValue: 'miContraseña123',
    label: 'Contraseña',
    placeholder: 'Introduce tu contraseña',
    disabled: true,
  },
  render: (args) => ({
    components: { InputPassword },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputPassword, {
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

export const NoLabel: Story = {
  args: {
    modelValue: '',
    placeholder: 'Introduce tu contraseña',
  },
  render: (args) => ({
    components: { InputPassword },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputPassword, {
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
