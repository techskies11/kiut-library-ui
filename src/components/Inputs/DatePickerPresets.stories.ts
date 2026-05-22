import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import DatePickerPresets from './DatePickerPresets.vue';
import SegmentedControl from './SegmentedControl.vue';
import type { KiutDateRange } from './dateRangeUtils';

const meta: Meta<typeof DatePickerPresets> = {
  title: 'Components/Inputs/DatePickerPresets',
  component: DatePickerPresets,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Selector de rango con presets en sidebar y dos meses visibles. Trigger con fondo neutro; violeta solo en hover. Primer clic ancla el día; segundo clic completa el rango y cierra.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePickerPresets>;

export const Default: Story = {
  args: {
    modelValue: {
      start: '2026-02-01',
      end: '2026-03-31',
    } satisfies KiutDateRange,
    placeholder: 'Seleccionar fechas',
  },
  render: (args) => ({
    components: { DatePickerPresets },
    setup() {
      const model = ref<KiutDateRange>({ ...args.modelValue });
      return () =>
        h('div', { class: 'max-w-4xl' }, [
          h(DatePickerPresets, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: KiutDateRange) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const Empty: Story = {
  args: {
    modelValue: { start: null, end: null } satisfies KiutDateRange,
    placeholder: 'Seleccionar fechas',
  },
  render: (args) => ({
    components: { DatePickerPresets },
    setup() {
      const model = ref<KiutDateRange>({ ...args.modelValue });
      return () =>
        h(DatePickerPresets, {
          ...args,
          modelValue: model.value,
          'onUpdate:modelValue': (v: KiutDateRange) => {
            model.value = v;
          },
        });
    },
  }),
};

export const AlignedEnd: Story = {
  args: {
    ...Default.args,
    panelAlign: 'end',
  },
  render: (args) => ({
    components: { DatePickerPresets },
    setup() {
      const model = ref<KiutDateRange>({ ...args.modelValue });
      return () =>
        h('div', { class: 'flex w-full max-w-4xl justify-end' }, [
          h(DatePickerPresets, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: KiutDateRange) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const DarkMode: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    components: { DatePickerPresets },
    setup() {
      const model = ref<KiutDateRange>({ ...args.modelValue });
      return () =>
        h('div', { class: 'dark min-h-[200px] rounded-xl bg-[#14141a] p-6' }, [
          h(DatePickerPresets, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: KiutDateRange) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const English: Story = {
  args: {
    modelValue: {
      start: '2026-02-01',
      end: '2026-03-31',
    } satisfies KiutDateRange,
    locale: 'en',
  },
  render: (args) => ({
    components: { DatePickerPresets },
    setup() {
      const model = ref<KiutDateRange>({ ...args.modelValue });
      return () =>
        h('div', { class: 'max-w-4xl' }, [
          h(DatePickerPresets, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: KiutDateRange) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const Mobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    layout: 'fullscreen',
  },
  render: (args) => ({
    components: { DatePickerPresets },
    setup() {
      const model = ref<KiutDateRange>({ ...args.modelValue });
      return () =>
        h('div', { class: 'dark min-h-screen bg-[#14141a] p-4' }, [
          h(DatePickerPresets, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: KiutDateRange) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const DashboardContext: Story = {
  args: {
    modelValue: {
      start: '2026-02-01',
      end: '2026-03-31',
    } satisfies KiutDateRange,
    placeholder: 'Seleccionar fechas',
  },
  render: (args) => ({
    components: { DatePickerPresets, SegmentedControl },
    setup() {
      const model = ref<KiutDateRange>({ ...args.modelValue });
      const granularity = ref('day');
      return () =>
        h(
          'div',
          {
            class:
              'flex flex-wrap items-center gap-3 rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-4 dark:bg-[#1a1a1d]',
          },
          [
            h(DatePickerPresets, {
              ...args,
              modelValue: model.value,
              'onUpdate:modelValue': (v: KiutDateRange) => {
                model.value = v;
              },
            }),
            h(SegmentedControl, {
              modelValue: granularity.value,
              'onUpdate:modelValue': (v: string) => {
                granularity.value = v;
              },
              items: [
                { value: 'day', label: 'Day' },
                { value: 'week', label: 'Week' },
                { value: 'month', label: 'Month' },
              ],
              ariaLabel: 'Granularidad',
              class: 'w-auto min-w-[12rem]',
            }),
          ]
        );
    },
  }),
};
