import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import SegmentedControl from './SegmentedControl.vue';
import type { SegmentedItem } from './SegmentedControl.vue';

const periodItems: SegmentedItem[] = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/Inputs/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Control segmentado (p. ej. Day / Week / Month): segmento activo con fondo primario y texto blanco.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const TripleTabs: Story = {
  name: 'DayWeekMonth',
  args: {
    items: periodItems,
    modelValue: 'month',
    ariaLabel: 'Periodo',
  },
  render: (args) => ({
    components: { SegmentedControl },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(SegmentedControl, {
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
