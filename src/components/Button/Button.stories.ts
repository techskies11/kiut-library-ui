import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';
import Button from './Button.vue';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Variantes **primary**, **secondary** y **action** (solo icono, fondo transparente; hover con acento de marca). Prop **`tooltip`** para burbuja encima del botón. **`tone="danger"`** en `action` para acciones destructivas. Usar la toolbar **Theme** para revisar claro/oscuro.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'action'],
    },
    tone: {
      control: 'select',
      options: ['default', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const iconPlus = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [h('path', { d: 'M12 5v14M5 12h14' })]
  );

const iconRefresh = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      h('path', { d: 'M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' }),
      h('path', { d: 'M3 3v5h5' }),
      h('path', { d: 'M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16' }),
      h('path', { d: 'M16 16h5v5' }),
    ]
  );

const iconPencil = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [h('path', { d: 'M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' }), h('path', { d: 'm15 5 4 4' })]
  );

const iconDownload = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      h('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
      h('path', { d: 'm7 10 5 5 5-5' }),
      h('path', { d: 'M12 15V3' }),
    ]
  );

const iconTrash = () =>
  h(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
    [
      h('path', { d: 'M3 6h18' }),
      h('path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' }),
      h('path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' }),
    ]
  );

export const Primary: Story = {
  args: {
    variant: 'primary',
    disabled: false,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return () =>
        h(Button, { variant: args.variant, disabled: args.disabled }, {
          icon: iconPlus,
          default: () => 'Agregar idioma',
        });
    },
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    disabled: false,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return () =>
        h(Button, { variant: args.variant, disabled: args.disabled }, {
          icon: iconRefresh,
          default: () => 'Refresh',
        });
    },
  }),
};

export const TextOnly: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return () => h(Button, { variant: args.variant }, () => 'Continuar');
    },
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Button },
    setup() {
      return () =>
        h('div', { class: 'flex flex-wrap items-center gap-3' }, [
          h(Button, { variant: 'primary', disabled: true }, () => 'Primary deshabilitado'),
          h(Button, { variant: 'secondary', disabled: true }, () => 'Secondary deshabilitado'),
        ]);
    },
  }),
};

export const SideBySide: Story = {
  render: () => ({
    components: { Button },
    setup() {
      return () =>
        h('div', { class: 'flex flex-wrap items-center gap-3' }, [
          h(Button, { variant: 'primary' }, { icon: iconPlus, default: () => 'Agregar idioma' }),
          h(Button, { variant: 'secondary' }, { icon: iconRefresh, default: () => 'Refresh' }),
        ]);
    },
  }),
};

/** Fila tipo columna "Acciones": solo icono, tooltip arriba, borde/fondo transparentes por defecto */
export const ActionableRow: Story = {
  render: () => ({
    components: { Button },
    setup() {
      return () =>
        h('div', { class: 'flex flex-col gap-2' }, [
          h('p', { class: 'text-sm font-semibold text-[color:var(--kiut-text-primary)]' }, 'Acciones'),
          h(
            'div',
            { class: 'flex items-center gap-1' },
            [
              h(
                Button,
                { variant: 'action', tooltip: 'Editar documento' },
                { icon: iconPencil }
              ),
              h(
                Button,
                { variant: 'action', tooltip: 'Descargar' },
                { icon: iconDownload }
              ),
              h(
                Button,
                { variant: 'action', tone: 'danger', tooltip: 'Eliminar' },
                { icon: iconTrash }
              ),
            ]
          ),
        ]);
    },
  }),
};
