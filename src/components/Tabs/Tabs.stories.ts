import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import { CpuChipIcon, UserIcon, ClockIcon } from '@heroicons/vue/24/outline';
import Tabs from './Tabs.vue';
import type { TabItem } from './Tabs.vue';

const baseItems: TabItem[] = [
  { value: 'a', label: 'Primera' },
  { value: 'b', label: 'Segunda' },
  { value: 'c', label: 'Tercera' },
];

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Pestañas segmentadas (track redondeado + pill activo). El tema claro/oscuro se prueba con la toolbar **Theme** de Storybook (clase `dark` en el documento).',
      },
    },
  },
  argTypes: {
    modelValue: { control: 'text', description: 'Valor de la pestaña activa (v-model)' },
    ariaLabel: { control: 'text' },
    items: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    modelValue: 'a',
    items: baseItems,
    ariaLabel: 'Ejemplo de pestañas',
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'max-w-xl' }, [
          h(Tabs, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string) => {
              model.value = v;
            },
          }, {
            default: () =>
              h(
                'p',
                {
                  class: 'text-[color:var(--kiut-text-secondary)] text-sm',
                },
                `Contenido asociado al valor activo: ${model.value}`
              ),
          }),
        ]);
    },
  }),
};

export const WithIcons: Story = {
  args: {
    modelValue: 'ai',
    ariaLabel: 'Tabs con iconos',
    items: [
      { value: 'ai', label: 'IA', icon: CpuChipIcon },
      { value: 'human', label: 'Humano', icon: UserIcon },
      { value: 'history', label: 'Histórico', icon: ClockIcon },
    ],
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h('div', { class: 'max-w-2xl' }, [
          h(Tabs, {
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

export const WithDisabledTab: Story = {
  args: {
    modelValue: 'a',
    items: [
      { value: 'a', label: 'Disponible' },
      { value: 'b', label: 'Deshabilitado', disabled: true },
      { value: 'c', label: 'Otra' },
    ],
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      const model = ref(args.modelValue);
      return () =>
        h(Tabs, {
          ...args,
          modelValue: model.value,
          'onUpdate:modelValue': (v: string) => {
            model.value = v;
          },
        });
    },
  }),
};

export const Controlled: Story = {
  args: {
    modelValue: 'b',
    items: baseItems,
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      const model = ref(args.modelValue);
      const logs = ref<string[]>([]);
      const onChange = (payload: { value: string; previousValue: string }) => {
        logs.value = [`change → ${payload.previousValue} → ${payload.value}`, ...logs.value].slice(0, 5);
      };
      return () =>
        h('div', { class: 'max-w-xl space-y-4' }, [
          h(Tabs, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string) => {
              model.value = v;
            },
            onChange,
          }),
          h('p', { class: 'font-mono text-xs text-[color:var(--kiut-text-muted)]' }, [
            'Últimos eventos change:',
            ...logs.value.map((line) => h('div', line)),
          ]),
        ]);
    },
  }),
};
