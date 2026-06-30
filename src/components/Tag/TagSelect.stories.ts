import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import TagSelect from './TagSelect.vue';
import type { KiutTagColor, KiutTagSelectOption } from './tagTypes';

const statusOptions: KiutTagSelectOption[] = [
  { value: 'published', label: 'published', color: 'success' },
  { value: 'draft', label: 'draft', color: 'warning' },
  { value: 'archived', label: 'archived', color: 'neutral' },
];

const meta: Meta<typeof TagSelect> = {
  title: 'Components/Tag/TagSelect',
  component: TagSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tag seleccionable: el **trigger** usa el color semántico de la opción activa (como `Tag` outlined). El panel desplegable marca la opción seleccionada con check y fondo primario. Usar la toolbar **Theme** para revisar claro/oscuro.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TagSelect>;

export const Default: Story = {
  render: () => ({
    components: { TagSelect },
    setup() {
      const published = ref('published');
      const draft = ref('draft');
      return () =>
        h('div', { class: 'flex flex-col items-start gap-3' }, [
          h(TagSelect, {
            modelValue: published.value,
            options: statusOptions,
            'onUpdate:modelValue': (v: string) => {
              published.value = v;
            },
          }),
          h(TagSelect, {
            modelValue: draft.value,
            options: statusOptions,
            'onUpdate:modelValue': (v: string) => {
              draft.value = v;
            },
          }),
        ]);
    },
  }),
};

const semanticColors: KiutTagColor[] = [
  'purple',
  'warning',
  'success',
  'danger',
  'orange',
  'neutral',
];

const semanticLabels: Record<KiutTagColor, string> = {
  purple: 'Seguimiento',
  warning: 'Pendiente',
  success: 'Resuelto',
  danger: 'Crítico',
  orange: 'Inaccesible',
  neutral: 'Neutral',
};

export const AllColors: Story = {
  render: () => ({
    components: { TagSelect },
    setup() {
      const values = ref<Record<KiutTagColor, KiutTagColor>>(
        Object.fromEntries(semanticColors.map((c) => [c, c])) as Record<KiutTagColor, KiutTagColor>
      );
      const options: KiutTagSelectOption[] = semanticColors.map((color) => ({
        value: color,
        label: semanticLabels[color],
        color,
      }));
      return () =>
        h(
          'div',
          { class: 'flex flex-wrap gap-3' },
          semanticColors.map((color) =>
            h(TagSelect, {
              key: color,
              modelValue: values.value[color],
              options,
              'onUpdate:modelValue': (v: KiutTagColor) => {
                values.value[color] = v;
              },
            })
          )
        );
    },
  }),
};

export const SoftVariant: Story = {
  args: {
    outlined: false,
  },
  render: (args) => ({
    components: { TagSelect },
    setup() {
      const status = ref('published');
      return () =>
        h(TagSelect, {
          ...args,
          modelValue: status.value,
          options: statusOptions,
          'onUpdate:modelValue': (v: string) => {
            status.value = v;
          },
        });
    },
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { TagSelect },
    setup() {
      const status = ref('published');
      return () =>
        h(TagSelect, {
          modelValue: status.value,
          options: statusOptions,
          disabled: true,
          'onUpdate:modelValue': (v: string) => {
            status.value = v;
          },
        });
    },
  }),
};
