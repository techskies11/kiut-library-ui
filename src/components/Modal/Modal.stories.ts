import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import Button from '../Button/Button.vue';
import InputText from '../Inputs/InputText.vue';
import Select from '../Inputs/Select.vue';
import type { KiutSelectOption } from '../Inputs/Select.vue';
import Toggle from '../Inputs/Toggle.vue';
import Modal from './Modal.vue';

const discountOptions: KiutSelectOption[] = [
  { value: 'percent', label: 'Porcentaje' },
  { value: 'fixed', label: 'Importe fijo' },
];

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Diálogo modal con cabecera (título, subtítulo, cierre), cuerpo con **slot** y pie con **Cancelar** / **Guardar**. Usa `v-model` para la visibilidad y emite **`cancel`** y **`confirm`**. Revisa **Theme** en Storybook para modo claro y oscuro.',
      },
    },
  },
  argTypes: {
    modelValue: { control: false },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    cancelLabel: { control: 'text' },
    confirmLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const NuevoPromocode: Story = {
  args: {
    title: 'Nuevo promocode',
    subtitle: 'Completa los datos para crear un nuevo promocode.',
    cancelLabel: 'Cancelar',
    confirmLabel: 'Guardar',
  },
  render: (args) => ({
    components: { Modal, Button, InputText, Select, Toggle },
    setup() {
      const open = ref(true);
      const codigo = ref('');
      const tipo = ref<string | number | null>('percent');
      const usosOn = ref(false);
      return () =>
        h('div', { class: 'min-h-[480px] bg-[color:var(--kiut-bg-primary)] p-8 dark:bg-[#1a1a1c]' }, [
          h(
            Button,
            {
              variant: 'primary',
              onClick: () => {
                open.value = true;
              },
            },
            () => 'Abrir modal'
          ),
          h(
            Modal,
            {
              modelValue: open.value,
              'onUpdate:modelValue': (v: boolean) => {
                open.value = v;
              },
              title: args.title,
              subtitle: args.subtitle,
              cancelLabel: args.cancelLabel,
              confirmLabel: args.confirmLabel,
              onCancel: () => {},
              onConfirm: () => {},
            },
            {
              default: () =>
                h('div', { class: 'space-y-5' }, [
                  h(InputText, {
                    modelValue: codigo.value,
                    'onUpdate:modelValue': (v: string) => {
                      codigo.value = v;
                    },
                    label: 'Código',
                    placeholder: 'Ej: SUMMER25',
                  }),
                  h('div', { class: 'grid gap-4 sm:grid-cols-2' }, [
                    h(Select, {
                      modelValue: tipo.value,
                      'onUpdate:modelValue': (v: string | number | null) => {
                        tipo.value = v;
                      },
                      label: 'Tipo de descuento',
                      placeholder: 'Seleccionar',
                      options: discountOptions,
                    }),
                    h(InputText, {
                      modelValue: '',
                      'onUpdate:modelValue': () => {},
                      label: 'Valor',
                      placeholder: '0',
                    }),
                  ]),
                  h('div', { class: 'flex flex-wrap items-center gap-3' }, [
                    h('span', { class: 'text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-200' }, 'Usos'),
                    h(Toggle, {
                      modelValue: usosOn.value,
                      'onUpdate:modelValue': (v: boolean) => {
                        usosOn.value = v;
                      },
                      ariaLabel: 'Limitar usos',
                    }),
                  ]),
                ]),
            }
          ),
        ]);
    },
  }),
};
