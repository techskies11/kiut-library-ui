import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import TimePicker from './TimePicker.vue';
import type { KiutTimeValue } from './TimePicker.vue';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/Inputs/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Selector de hora con panel desplegable y columnas de horas y minutos. El valor es `HH:mm` o `null`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
    modelValue: '14:30',
    label: 'Hora',
    placeholder: 'Seleccionar hora',
  },
  render: (args) => ({
    components: { TimePicker },
    setup() {
      const model = ref<KiutTimeValue>(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(TimePicker, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: KiutTimeValue) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const Empty: Story = {
  args: {
    modelValue: null,
    label: 'Hora de inicio',
    placeholder: 'Seleccionar hora',
  },
  render: (args) => ({
    components: { TimePicker },
    setup() {
      const model = ref<KiutTimeValue>(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(TimePicker, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: KiutTimeValue) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

/** Panel anclado al borde derecho del control (útil en headers alineados a la derecha). */
export const AlignedEnd: Story = {
  args: {
    ...Default.args,
    panelAlign: 'end',
    label: 'Hora (panel a la derecha)',
  },
  render: (args) => ({
    components: { TimePicker },
    setup() {
      const model = ref<KiutTimeValue>(args.modelValue);
      return () =>
        h('div', { class: 'flex w-full max-w-4xl justify-end' }, [
          h('div', { class: 'w-full max-w-md' }, [
            h(TimePicker, {
              ...args,
              modelValue: model.value,
              'onUpdate:modelValue': (v: KiutTimeValue) => {
                model.value = v;
              },
            }),
          ]),
        ]);
    },
  }),
};

export const WithLimits: Story = {
  args: {
    modelValue: '09:00',
    label: 'Horario permitido',
    minTime: '08:00',
    maxTime: '18:00',
  },
  render: (args) => ({
    components: { TimePicker },
    setup() {
      const model = ref<KiutTimeValue>(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(TimePicker, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: KiutTimeValue) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const FiveMinuteStep: Story = {
  args: {
    modelValue: '10:15',
    label: 'Intervalos de 5 min',
    minuteStep: 5,
  },
  render: (args) => ({
    components: { TimePicker },
    setup() {
      const model = ref<KiutTimeValue>(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(TimePicker, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: KiutTimeValue) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};
