import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import SelectablePills from './SelectablePills.vue';
import type { KiutPillItem } from './SelectablePills.vue';

const roleItems: KiutPillItem[] = [
  { value: 'admin', label: 'Administrador' },
  { value: 'supervisor', label: 'Supervisor' },
  { value: 'agent', label: 'Agente' },
];

const areaItems: KiutPillItem[] = [
  { value: 'faq', label: 'FAQ', dotColor: '#8b5cf6' },
  { value: 'seller', label: 'Seller', dotColor: '#38bdf8' },
  { value: 'support', label: 'Support', dotColor: '#22c55e' },
  { value: 'billing', label: 'Billing', dotColor: '#f59e0b' },
  { value: 'marketing', label: 'Marketing', dotColor: '#ec4899' },
  { value: 'ops', label: 'Operaciones', dotColor: '#3b82f6' },
];

const meta: Meta<typeof SelectablePills> = {
  title: 'Components/Inputs/SelectablePills',
  component: SelectablePills,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Pills tipo radio o checkbox. Variante con `dotColor` para categorías (Áreas).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectablePills>;

export const RolesSingle: Story = {
  args: {
    items: roleItems,
    multiple: false,
    modelValue: 'agent',
    ariaLabel: 'Roles',
  },
  render: (args) => ({
    components: { SelectablePills },
    setup() {
      const model = ref<string | null>(args.modelValue as string | null);
      return () =>
        h('div', { class: 'max-w-2xl space-y-2' }, [
          h('p', { class: 'text-sm font-medium text-[color:var(--kiut-text-secondary)]' }, 'Roles'),
          h(SelectablePills, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string | string[] | null) => {
              model.value = v as string | null;
            },
          }),
        ]);
    },
  }),
};

export const AreasWithDots: Story = {
  args: {
    items: areaItems,
    multiple: true,
    modelValue: ['faq', 'support'],
    ariaLabel: 'Áreas',
  },
  render: (args) => ({
    components: { SelectablePills },
    setup() {
      const model = ref<string[]>((args.modelValue as string[]) ?? []);
      return () =>
        h('div', { class: 'max-w-2xl space-y-2' }, [
          h('p', { class: 'text-sm font-medium text-[color:var(--kiut-text-secondary)]' }, 'Áreas'),
          h(SelectablePills, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string | string[] | null) => {
              model.value = (v as string[]) ?? [];
            },
          }),
        ]);
    },
  }),
};
