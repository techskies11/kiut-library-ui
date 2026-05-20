import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import Toggle from './Toggle.vue';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Inputs/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Switch accesible (`role="switch"`). Probar tema con la toolbar **Theme**.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    modelValue: false,
    ariaLabel: 'Activar notificaciones',
  },
  render: (args) => ({
    components: { Toggle },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'flex items-center gap-3' }, [
          h('span', { class: 'text-sm text-[color:var(--kiut-text-secondary)]' }, 'Estado'),
          h(Toggle, {
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

export const On: Story = {
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
