import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import DateRangePicker from './DateRangePicker.vue';
import type { KiutDateRange } from './DateRangePicker.vue';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/Inputs/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Rango de fechas con dos meses. Primer clic ancla el día; segundo clic completa el rango y cierra.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  args: {
    modelValue: {
      start: '2026-03-01',
      end: '2026-03-15',
    } satisfies KiutDateRange,
    label: 'Rango',
    placeholder: 'Seleccionar fechas',
  },
  render: (args) => ({
    components: { DateRangePicker },
    setup() {
      const model = ref<KiutDateRange>({ ...args.modelValue });
      return () =>
        h('div', { class: 'max-w-2xl' }, [
          h(DateRangePicker, {
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
