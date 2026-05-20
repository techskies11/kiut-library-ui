import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import InputDateTime from './InputDateTime.vue';

const meta: Meta<typeof InputDateTime> = {
  title: 'Components/Inputs/InputDateTime',
  component: InputDateTime,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Fecha y hora con el selector nativo (`datetime-local`). El valor es una cadena `YYYY-MM-DDTHH:mm` o `null`. Tema claro/oscuro: toolbar **Theme** en Storybook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputDateTime>;

export const Default: Story = {
  args: {
    modelValue: null,
    label: 'Inicio del evento',
  },
  render: (args) => ({
    components: { InputDateTime },
    setup() {
      const model = ref<string | null>(args.modelValue ?? null);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputDateTime, {
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
    modelValue: '2026-04-08T09:30',
    label: 'Cita',
    min: '2026-01-01T00:00',
    max: '2026-12-31T23:59',
    step: 60,
  },
  render: (args) => ({
    components: { InputDateTime },
    setup() {
      const model = ref<string | null>(args.modelValue ?? null);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputDateTime, {
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
    label: 'Fecha límite',
    invalid: true,
    errorText: 'Selecciona una fecha y hora.',
  },
  render: (args) => ({
    components: { InputDateTime },
    setup() {
      const model = ref<string | null>(args.modelValue ?? null);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputDateTime, {
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
