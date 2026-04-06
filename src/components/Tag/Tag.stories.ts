import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';
import Tag, { type KiutTagColor } from './Tag.vue';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Pill de estado: modo **conexión** con `statusLive` (punto con pulso en verde si está conectado) o modo **semántico** con `color` y `outlined`. Usar la toolbar **Theme** para revisar claro/oscuro.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Connected: Story = {
  args: {
    statusLive: true,
  },
};

export const Disconnected: Story = {
  args: {
    statusLive: false,
  },
};

export const LiveLabelsCustom: Story = {
  args: {
    statusLive: true,
    labelConnected: 'En línea',
    labelDisconnected: 'Sin conexión',
  },
  render: (args) => ({
    components: { Tag },
    setup() {
      return () =>
        h('div', { class: 'flex flex-col gap-3' }, [
          h(Tag, { ...args, statusLive: true }),
          h(Tag, { ...args, statusLive: false }),
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

export const SemanticSoft: Story = {
  render: () => ({
    components: { Tag },
    setup() {
      return () =>
        h(
          'div',
          { class: 'flex flex-col gap-3' },
          semanticColors.map((color) =>
            h(
              'div',
              { key: color, class: 'flex items-center gap-2' },
              [
                h(Tag, { color, outlined: false }, () => semanticLabels[color]),
              ]
            )
          )
        );
    },
  }),
};

export const SemanticOutlined: Story = {
  render: () => ({
    components: { Tag },
    setup() {
      return () =>
        h(
          'div',
          { class: 'flex flex-col gap-3' },
          semanticColors.map((color) =>
            h(
              'div',
              { key: color, class: 'flex items-center gap-2' },
              [
                h(Tag, { color, outlined: true }, () => semanticLabels[color]),
              ]
            )
          )
        );
    },
  }),
};

export const SemanticSingle: Story = {
  args: {
    color: 'purple',
    outlined: false,
    label: 'Etiqueta',
  },
};
