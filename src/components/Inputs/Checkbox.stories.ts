import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import Checkbox from './Checkbox.vue';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Checkbox circular (`role="checkbox"`). Probar tema con la toolbar **Theme**.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    modelValue: false,
    ariaLabel: 'Activar sonido',
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'flex items-center gap-3' }, [
          h(
            'span',
            { class: 'text-sm text-[color:var(--kiut-text-secondary)]' },
            'Sonido'
          ),
          h(Checkbox, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: boolean) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const Checked: Story = {
  args: {
    ...Default.args,
    modelValue: true,
  },
  render: Default.render,
};

export const Disabled: Story = {
  args: {
    modelValue: false,
    disabled: true,
  },
  render: Default.render,
};
