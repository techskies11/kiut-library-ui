import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import InputTime from './InputTime.vue';

const meta: Meta<typeof InputTime> = {
  title: 'Components/Inputs/InputTime',
  component: InputTime,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Hora en 24 h con el selector nativo (`time`), solo horas y minutos (`step` 60). El valor es `HH:mm` o `null`. Tema claro/oscuro: toolbar **Theme** en Storybook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputTime>;

export const Default: Story = {
  args: {
    modelValue: null,
    label: 'Hora de inicio',
  },
  render: (args) => ({
    components: { InputTime },
    setup() {
      const model = ref<string | null>(args.modelValue ?? null);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputTime, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string | null) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const WithValue: Story = {
  args: {
    modelValue: '14:30',
    label: 'Fin del turno',
  },
  render: (args) => ({
    components: { InputTime },
    setup() {
      const model = ref<string | null>(args.modelValue ?? null);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputTime, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string | null) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const WithBounds: Story = {
  args: {
    modelValue: '09:00',
    label: 'Horario permitido',
    min: '08:00',
    max: '18:00',
  },
  render: (args) => ({
    components: { InputTime },
    setup() {
      const model = ref<string | null>(args.modelValue ?? null);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputTime, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string | null) => {
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
    label: 'Hora límite',
    invalid: true,
    errorText: 'Selecciona una hora válida.',
  },
  render: (args) => ({
    components: { InputTime },
    setup() {
      const model = ref<string | null>(args.modelValue ?? null);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputTime, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string | null) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};
