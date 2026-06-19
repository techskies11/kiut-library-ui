import { ArrowUpTrayIcon, LinkIcon } from '@heroicons/vue/24/outline';
import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import Button from './Button.vue';
import type { KiutButtonMenuOption } from './Button.vue';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Variantes **primary**, **secondary**, **action** (solo icono, fondo transparente; hover con acento de marca), **dropdown** (menú con opciones de icono, título y descripción) y **split** (solo icono como `action`, sin tooltip: clic abre el menú). Prop **`loading`** en primary/secondary/action: spinner, cursor de espera y clics bloqueados mientras se espera respuesta de backend. Prop **`menuAlign`** (`left` | `right`) para anclar el panel al borde izquierdo o derecho del botón. Prop **`tooltip`** para burbuja encima del botón (no aplica a `split`). **`tone="danger"`** en `action` y `split` para acciones destructivas. Usar la toolbar **Theme** para revisar claro/oscuro.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'action', 'dropdown', 'split'],
    },
    tone: {
      control: 'select',
      options: ['default', 'danger'],
    },
    loading: {
      control: 'boolean',
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
const addDocumentOptions: KiutButtonMenuOption[] = [
  {
    value: 'attach',
    label: 'Adjuntar documento',
    description: 'Sube un archivo PDF',
    icon: ArrowUpTrayIcon,
  },
  {
    value: 'url',
    label: 'Generar desde URL',
    description: 'Extrae contenido de una página web',
    icon: LinkIcon,
  },
];

export const Dropdown: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => ({
    components: { Button },
    setup() {
      const onSelect = (option: KiutButtonMenuOption) => {
        // eslint-disable-next-line no-console
        console.log('select', option.value);
      };
      return () =>
        h(
          'div',
          { class: 'rounded-xl bg-[color:var(--kiut-bg-primary)] p-6 dark:bg-[#1a1a1c]' },
          [
            h(
              Button,
              {
                variant: 'dropdown',
                options: addDocumentOptions,
                onSelect,
              },
              {
                icon: iconPlus,
                default: () => 'Agregar documento',
              }
            ),
          ]
        );
    },
  }),
};

/** Botón al borde derecho: `menuAlign="right"` evita que el panel se salga de la pantalla. */
export const DropdownAlignRight: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
  render: () => ({
    components: { Button },
    setup() {
      const onSelect = (option: KiutButtonMenuOption) => {
        // eslint-disable-next-line no-console
        console.log('select', option.value);
      };
      return () =>
        h(
          'div',
          { class: 'flex min-h-[12rem] items-start justify-end rounded-xl bg-[color:var(--kiut-bg-primary)] p-6 dark:bg-[#1a1a1c]' },
          [
            h(
              Button,
              {
                variant: 'dropdown',
                menuAlign: 'right',
                options: addDocumentOptions,
                onSelect,
              },
              {
                icon: iconPlus,
                default: () => 'Agregar documento',
              }
            ),
          ]
        );
    },
  }),
};

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

const editDocumentOptions: KiutButtonMenuOption[] = [
  {
    value: 'edit-metadata',
    label: 'Editar metadatos',
    description: 'Título, idioma y categoría',
    icon: ArrowUpTrayIcon,
  },
  {
    value: 'edit-content',
    label: 'Editar contenido',
    description: 'Abre el editor de texto',
    icon: LinkIcon,
  },
];

/** Solo icono (estilo action): clic abre el menú; sin tooltip en hover. */
export const SplitAction: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const onSelect = (option: KiutButtonMenuOption) => {
        // eslint-disable-next-line no-console
        console.log('select', option.value);
      };
      const deleteOptions: KiutButtonMenuOption[] = [
        {
          value: 'archive',
          label: 'Archivar',
          description: 'Oculta el documento sin borrarlo',
        },
        {
          value: 'delete',
          label: 'Eliminar permanentemente',
          description: 'Esta acción no se puede deshacer',
        },
      ];
      return () =>
        h('div', { class: 'flex flex-col gap-6' }, [
          h('div', { class: 'flex flex-col gap-2' }, [
            h(
              'p',
              { class: 'text-sm font-semibold text-[color:var(--kiut-text-primary)]' },
              'Split (icono + menú)'
            ),
            h(
              'div',
              { class: 'flex items-center gap-1' },
              [
                h(
                  Button,
                  {
                    variant: 'split',
                    'aria-label': 'Editar documento',
                    options: editDocumentOptions,
                    onSelect,
                  },
                  { icon: iconPencil }
                ),
                h(
                  Button,
                  {
                    variant: 'split',
                    tone: 'danger',
                    'aria-label': 'Eliminar',
                    options: deleteOptions,
                    onSelect,
                  },
                  { icon: iconTrash }
                ),
                h(
                  Button,
                  {
                    variant: 'split',
                    disabled: true,
                    'aria-label': 'Deshabilitado',
                    options: editDocumentOptions,
                    onSelect,
                  },
                  { icon: iconDownload }
                ),
              ]
            ),
          ]),
          h(
            'p',
            { class: 'text-xs text-[color:var(--kiut-text-muted)] dark:text-slate-400' },
            'Clic en el icono abre el menú de opciones.'
          ),
        ]);
    },
  }),
};

export const PrimaryLoading: Story = {
  args: {
    variant: 'primary',
    loading: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return () =>
        h(Button, { variant: args.variant, loading: args.loading }, {
          icon: iconPlus,
          default: () => 'Agregar idioma',
        });
    },
  }),
};

export const SecondaryLoading: Story = {
  args: {
    variant: 'secondary',
    loading: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return () =>
        h(Button, { variant: args.variant, loading: args.loading }, {
          icon: iconRefresh,
          default: () => 'Refresh',
        });
    },
  }),
};

export const ActionLoading: Story = {
  args: {
    variant: 'action',
    loading: true,
    tooltip: 'Guardando cambios',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return () =>
        h(Button, {
          variant: args.variant,
          loading: args.loading,
          tooltip: args.tooltip,
        }, {
          icon: iconPencil,
        });
    },
  }),
};

/** Simula una llamada a backend de 2 s al hacer clic. */
export const LoadingInteractive: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const loading = ref(false);

      const handleClick = () => {
        if (loading.value) return;
        loading.value = true;
        window.setTimeout(() => {
          loading.value = false;
        }, 2000);
      };

      return () =>
        h('div', { class: 'flex flex-wrap items-center gap-3' }, [
          h(
            Button,
            {
              variant: 'primary',
              loading: loading.value,
              onClick: handleClick,
            },
            {
              icon: iconPlus,
              default: () => 'Guardar',
            }
          ),
          h(
            Button,
            {
              variant: 'secondary',
              loading: loading.value,
              onClick: handleClick,
            },
            {
              icon: iconRefresh,
              default: () => 'Sincronizar',
            }
          ),
        ]);
    },
  }),
};
