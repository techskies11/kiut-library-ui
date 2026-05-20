import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import InputPhone from './InputPhone.vue';
import type { KiutPhoneValue } from './InputPhone.vue';
import type { KiutSelectOption } from './Select.vue';

const prefixOptions: KiutSelectOption[] = [
  { value: '+57', label: '🇨🇴 +57' },
  { value: '+52', label: '🇲🇽 +52' },
  { value: '+34', label: '🇪🇸 +34' },
];

const meta: Meta<typeof InputPhone> = {
  title: 'Components/Inputs/InputPhone',
  component: InputPhone,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Prefijo con Select + campo nacional. Misma altura/radio que el resto de inputs.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputPhone>;

export const Default: Story = {
  args: {
    modelValue: { prefix: '+57', number: '' } satisfies KiutPhoneValue,
    label: 'Teléfono',
    prefixOptions,
    numberPlaceholder: '3001234567',
  },
  render: (args) => ({
    components: { InputPhone },
    setup() {
      const model = ref<KiutPhoneValue>({ ...args.modelValue });
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(InputPhone, {
            ...args,
            modelValue: model.value,
            'onUpdate:modelValue': (v: KiutPhoneValue) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};
