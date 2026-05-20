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
  { value: 'ku:fixed', label: 'Importe fijo' },
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
        h('div', { class: 'ku:min-h-[480px] ku:bg-[color:var(--kiut-bg-primary)] ku:p-8 ku:dark:bg-[#1a1a1c]' }, [
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
              'ku:onUpdate:modelValue': (v: boolean) => {
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
                h('div', { class: 'ku:space-y-5' }, [
                  h(InputText, {
                    modelValue: codigo.value,
                    'ku:onUpdate:modelValue': (v: string) => {
                      codigo.value = v;
                    },
                    label: 'Código',
                    placeholder: 'ku:Ej: SUMMER25',
                  }),
                  h('div', { class: 'ku:grid ku:gap-4 ku:sm:grid-cols-2' }, [
                    h(Select, {
                      modelValue: tipo.value,
                      'ku:onUpdate:modelValue': (v: string | number | null) => {
                        tipo.value = v;
                      },
                      label: 'Tipo de descuento',
                      placeholder: 'Seleccionar',
                      options: discountOptions,
                    }),
                    h(InputText, {
                      modelValue: '',
                      'ku:onUpdate:modelValue': () => {},
                      label: 'Valor',
                      placeholder: '0',
                    }),
                  ]),
                  h('div', { class: 'ku:flex ku:flex-wrap ku:items-center ku:gap-3' }, [
                    h('span', { class: 'ku:text-sm ku:font-medium ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-200' }, 'Usos'),
                    h(Toggle, {
                      modelValue: usosOn.value,
                      'ku:onUpdate:modelValue': (v: boolean) => {
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
