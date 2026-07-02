import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import EmojiPicker from './EmojiPicker.vue';

const meta: Meta<typeof EmojiPicker> = {
  title: 'Components/Inputs/EmojiPicker',
  component: EmojiPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Selector multi-emojis con búsqueda y categorías curadas (marca segura). Tema claro/oscuro: toolbar **Theme** en Storybook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmojiPicker>;

export const Default: Story = {
  args: {
    modelValue: ['😀', '✈️', '❤️'],
    searchPlaceholder: 'Buscar emoji…',
    hint: 'Click para agregar o quitar. Los seleccionados aparecen resaltados.',
    ariaLabel: 'Emojis permitidos',
  },
  render: (args) => ({
    components: { EmojiPicker },
    setup() {
      const model = ref<string[]>([...(args.modelValue as string[])]);
      return () =>
        h('div', { class: 'max-w-sm' }, [
          h(EmojiPicker, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (value: string[]) => {
              model.value = value;
            },
          }),
        ]);
    },
  }),
};

export const EmptySelection: Story = {
  args: {
    modelValue: [],
    searchPlaceholder: 'Buscar emoji…',
    hint: 'Click para agregar o quitar. Los seleccionados aparecen resaltados.',
  },
  render: (args) => ({
    components: { EmojiPicker },
    setup() {
      const model = ref<string[]>([]);
      return () =>
        h('div', { class: 'max-w-sm' }, [
          h(EmojiPicker, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (value: string[]) => {
              model.value = value;
            },
          }),
        ]);
    },
  }),
};

export const Disabled: Story = {
  args: {
    modelValue: ['👍', '🎉'],
    disabled: true,
    searchPlaceholder: 'Buscar emoji…',
    hint: 'Selector deshabilitado.',
  },
  render: (args) => ({
    components: { EmojiPicker },
    setup() {
      const model = ref<string[]>([...(args.modelValue as string[])]);
      return () =>
        h('div', { class: 'max-w-sm' }, [
          h(EmojiPicker, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (value: string[]) => {
              model.value = value;
            },
          }),
        ]);
    },
  }),
};
