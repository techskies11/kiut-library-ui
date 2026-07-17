import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import LanguageSelect from './LanguageSelect.vue';
import type { KiutLanguageSelectOption } from './LanguageSelect.vue';

const languageOptions: KiutLanguageSelectOption[] = [
  { value: 'zh', label: 'Chino', flagClass: 'inline-block h-4 w-6 rounded-sm bg-red-600' },
  { value: 'hr', label: 'Croata', flagClass: 'inline-block h-4 w-6 rounded-sm bg-blue-700' },
  { value: 'da', label: 'Danés', flagClass: 'inline-block h-4 w-6 rounded-sm bg-red-500' },
  { value: 'fi', label: 'Finés', flagClass: 'inline-block h-4 w-6 rounded-sm bg-blue-500' },
  { value: 'el', label: 'Griego', flagClass: 'inline-block h-4 w-6 rounded-sm bg-blue-800' },
  { value: 'hu', label: 'Húngaro', flagClass: 'inline-block h-4 w-6 rounded-sm bg-green-700' },
  { value: 'ja', label: 'Japonés', flagClass: 'inline-block h-4 w-6 rounded-sm bg-red-700' },
  { value: 'no', label: 'Noruego', flagClass: 'inline-block h-4 w-6 rounded-sm bg-blue-900' },
  { value: 'pl', label: 'Polaco', flagClass: 'inline-block h-4 w-6 rounded-sm bg-red-700' },
  { value: 'pt', label: 'Portugués', flagClass: 'inline-block h-4 w-6 rounded-sm bg-green-600' },
  { value: 'es', label: 'Español', flagClass: 'inline-block h-4 w-6 rounded-sm bg-yellow-500' },
];

const meta: Meta<typeof LanguageSelect> = {
  title: 'Components/Inputs/LanguageSelect',
  component: LanguageSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Selector de idioma con buscador, encabezado de sección y bandera por opción. Pensado para modales de configuración de voces e idiomas.',
      },
    },
  },
  args: {
    listSectionLabel: 'Idioma',
    searchPlaceholder: 'Buscar por nombre…',
    placeholder: 'Seleccionar idioma…',
  },
};

export default meta;
type Story = StoryObj<typeof LanguageSelect>;

export const Default: Story = {
  render: (args) => ({
    components: { LanguageSelect },
    setup() {
      const model = ref<string | null>(null);
      return () =>
        h('div', { class: 'max-w-md space-y-3' }, [
          h(
            'p',
            { class: 'text-sm text-[color:var(--kiut-text-secondary)]' },
            'Haz clic en el selector para ver el panel con buscador y lista.'
          ),
          h(LanguageSelect, {
            ...args,
            options: languageOptions,
            modelValue: model.value,
            'onUpdate:modelValue': (value: string | number) => {
              model.value = value as string;
            },
          }),
        ]);
    },
  }),
};

export const WithSelection: Story = {
  args: {
    modelValue: 'es',
  },
  render: (args) => ({
    components: { LanguageSelect },
    setup() {
      const model = ref<string | null>((args.modelValue as string | null) ?? 'es');
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(LanguageSelect, {
            ...args,
            options: languageOptions,
            modelValue: model.value,
            'onUpdate:modelValue': (value: string | number) => {
              model.value = value as string;
            },
          }),
        ]);
    },
  }),
};
