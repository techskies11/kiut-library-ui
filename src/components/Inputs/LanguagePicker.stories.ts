import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import LanguagePicker from './LanguagePicker.vue';
import type { KiutLanguagePickerOption } from './LanguagePicker.vue';

const languageOptions: KiutLanguagePickerOption[] = [
  { value: 'zh', label: 'Chino', flagClass: 'inline-block h-4 w-6 rounded-sm bg-red-600' },
  { value: 'hr', label: 'Croata', flagClass: 'inline-block h-4 w-6 rounded-sm bg-blue-700' },
  { value: 'da', label: 'Danés', flagClass: 'inline-block h-4 w-6 rounded-sm bg-red-500' },
  { value: 'fi', label: 'Finés', flagClass: 'inline-block h-4 w-6 rounded-sm bg-blue-500' },
  { value: 'el', label: 'Griego', flagClass: 'inline-block h-4 w-6 rounded-sm bg-blue-800' },
  { value: 'hu', label: 'Húngaro', flagClass: 'inline-block h-4 w-6 rounded-sm bg-green-700' },
  { value: 'ja', label: 'Japonés', flagClass: 'inline-block h-4 w-6 rounded-sm bg-red-700' },
  { value: 'no', label: 'Noruego', flagClass: 'inline-block h-4 w-6 rounded-sm bg-blue-900' },
  { value: 'pl', label: 'Polaco', flagClass: 'inline-block h-4 w-6 rounded-sm bg-red-700' },
];

const meta: Meta<typeof LanguagePicker> = {
  title: 'Components/Inputs/LanguagePicker',
  component: LanguagePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Lista inline de idiomas con buscador y banderas. Pensado para modales donde la selección debe estar visible de inmediato, sin abrir un select.',
      },
    },
  },
  args: {
    listSectionLabel: 'Idioma',
    searchPlaceholder: 'Buscar por nombre…',
  },
};

export default meta;
type Story = StoryObj<typeof LanguagePicker>;

export const Default: Story = {
  render: (args) => ({
    components: { LanguagePicker },
    setup() {
      const model = ref<string | null>(null);
      return () =>
        h('div', { class: 'max-w-md space-y-3' }, [
          h(
            'p',
            { class: 'text-sm text-[color:var(--kiut-text-secondary)]' },
            'Selecciona un idioma soportado por el LLM. En el próximo paso vas a poder configurar la voz.'
          ),
          h(LanguagePicker, {
            ...args,
            options: languageOptions,
            modelValue: model.value,
            'onUpdate:modelValue': (value: string) => {
              model.value = value;
            },
          }),
        ]);
    },
  }),
};

export const WithSelection: Story = {
  render: (args) => ({
    components: { LanguagePicker },
    setup() {
      const model = ref<string | null>('hr');
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(LanguagePicker, {
            ...args,
            options: languageOptions,
            modelValue: model.value,
            'onUpdate:modelValue': (value: string) => {
              model.value = value;
            },
          }),
        ]);
    },
  }),
};
