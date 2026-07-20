import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import InputText from './InputText.vue';

const meta: Meta<typeof InputText> = {
  title: 'Components/Inputs/InputText',
  component: InputText,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Campo de texto con etiqueta e icono opcional a la izquierda. Tema claro/oscuro: toolbar **Theme** en Storybook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputText>;

function renderInputText(args: Story['args']) {
  return {
    components: { InputText },
    setup() {
      const model = ref(args?.modelValue ?? '');
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputText, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: string) => {
              model.value = v;
            },
          }),
        ]);
    },
  };
}

export const Default: Story = {
  args: {
    modelValue: '',
    label: 'Nombre',
    placeholder: 'Nombre completo',
  },
  render: (args) => renderInputText(args),
};

export const WithIcon: Story = {
  args: {
    modelValue: '',
    placeholder: 'Buscar aerolínea...',
    icon: MagnifyingGlassIcon,
  },
  render: (args) => renderInputText(args),
};

export const WithError: Story = {
  args: {
    modelValue: '',
    label: 'Email',
    placeholder: 'email@empresa.com',
    invalid: true,
    errorText: 'Introduce un email válido.',
  },
  render: (args) => renderInputText(args),
};
