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
          'Botón que abre un panel de emojis. Cada clic añade el emoji al campo enlazado con `v-model:draft`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmojiPicker>;

export const Default: Story = {
  args: {
    draft: '😀',
    searchPlaceholder: 'Buscar emoji…',
    hint: 'Haz clic en un emoji para añadirlo al campo.',
    ariaLabelTrigger: 'Abrir selector de emojis',
  },
  render: (args) => ({
    components: { EmojiPicker },
    setup() {
      const draft = ref((args.draft as string) ?? '');
      return () =>
        h('div', { class: 'flex max-w-md items-center gap-2' }, [
          h('input', {
            class:
              'min-h-[2.75rem] min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900',
            value: draft.value,
            placeholder: 'Campo de emojis…',
            onInput: (event: Event) => {
              draft.value = (event.target as HTMLInputElement).value;
            },
          }),
          h(EmojiPicker, {
            ...args,
            draft: draft.value,
            'onUpdate:draft': (value: string) => {
              draft.value = value;
            },
          }),
        ]);
    },
  }),
};

export const WithLabel: Story = {
  args: {
    draft: '',
    triggerLabel: 'Emojis',
    searchPlaceholder: 'Buscar emoji…',
    hint: 'Haz clic en un emoji para añadirlo al campo.',
  },
  render: (args) => ({
    components: { EmojiPicker },
    setup() {
      const draft = ref('');
      return () =>
        h('div', { class: 'flex max-w-md items-center gap-2' }, [
          h('input', {
            class:
              'min-h-[2.75rem] min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm',
            value: draft.value,
            onInput: (event: Event) => {
              draft.value = (event.target as HTMLInputElement).value;
            },
          }),
          h(EmojiPicker, {
            ...args,
            draft: draft.value,
            'onUpdate:draft': (value: string) => {
              draft.value = value;
            },
          }),
        ]);
    },
  }),
};

export const Disabled: Story = {
  args: {
    draft: '👍',
    disabled: true,
    ariaLabelTrigger: 'Selector deshabilitado',
  },
  render: (args) => ({
    components: { EmojiPicker },
    setup() {
      const draft = ref((args.draft as string) ?? '');
      return () =>
        h(EmojiPicker, {
          ...args,
          draft: draft.value,
          'onUpdate:draft': (value: string) => {
            draft.value = value;
          },
        });
    },
  }),
};
