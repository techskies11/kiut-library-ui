import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import DatePicker from './DatePicker.vue';
import type { KiutDateValue } from './DatePicker.vue';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Inputs/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Selector de fecha única con calendario de un mes. Un clic selecciona la fecha y cierra el panel.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    modelValue: '2026-03-15',
    label: 'Fecha',
    placeholder: 'Seleccionar fecha',
  },
  render: (args) => ({
    components: { DatePicker },
    setup() {
      const model = ref<KiutDateValue>(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(DatePicker, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: KiutDateValue) => {
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
    label: 'Fecha',
    placeholder: 'Seleccionar fecha',
  },
  render: (args) => ({
    components: { DatePicker },
    setup() {
      const model = ref<KiutDateValue>(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(DatePicker, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: KiutDateValue) => {
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
    label: 'Fecha (panel a la derecha)',
  },
  render: (args) => ({
    components: { DatePicker },
    setup() {
      const model = ref<KiutDateValue>(args.modelValue);
      return () =>
        h('div', { class: 'flex w-full max-w-4xl justify-end' }, [
          h('div', { class: 'w-full max-w-md' }, [
            h(DatePicker, {
              ...args,
              modelValue: model.value,
              'onUpdate:modelValue': (v: KiutDateValue) => {
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
    modelValue: '2026-03-15',
    label: 'Fecha con límites',
    minDate: '2026-03-01',
    maxDate: '2026-03-31',
  },
  render: (args) => ({
    components: { DatePicker },
    setup() {
      const model = ref<KiutDateValue>(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(DatePicker, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: KiutDateValue) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};
