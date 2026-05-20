import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import InputRange from './InputRange.vue';

const meta: Meta<typeof InputRange> = {
  title: 'Components/Inputs/InputRange',
  component: InputRange,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Slider de rango con pista redondeada, relleno con color primario y thumb hueco. `caption` opcional (centro); `captionMin` / `captionMax` para extremos. ku:`orientation`: `horizontal` | `vertical`. Tema ku:claro/oscuro: toolbar **Theme** en Storybook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputRange>;

export const Horizontal: Story = {
  args: {
    modelValue: 42,
    label: 'Intensidad',
    caption: 'Valor medio',
    captionMin: 'Suave',
    captionMax: 'Fuerte',
    orientation: 'horizontal',
    min: 0,
    max: 100,
    step: 1,
  },
  render: (args) => ({
    components: { InputRange },
    setup() {
      const model = ref(args.modelValue ?? 0);
      return () =>
        h('div', { class: 'ku:max-w-md' }, [
          h(InputRange, {
            ...args,
            modelValue: model.value,
            'ku:onUpdate:modelValue': (v: number) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};

export const Vertical: Story = {
  args: {
    modelValue: 50,
    label: 'Estilo',
    captionMin: 'Relajado',
    captionMax: 'Formal',
    orientation: 'vertical',
    min: 0,
    max: 100,
    step: 1,
    trackLength: '14rem',
  },
  render: (args) => ({
    components: { InputRange },
    setup() {
      const model = ref(args.modelValue ?? 0);
      return () =>
        h(
          'div',
          {
            class:
              'dark ku:flex ku:min-h-[18rem] ku:w-48 ku:items-center ku:justify-center ku:rounded-2xl ku:bg-[#1e1e26] ku:p-6',
          },
          [
            h(InputRange, {
              ...args,
              modelValue: model.value,
              'ku:onUpdate:modelValue': (v: number) => {
                model.value = v;
              },
            }),
          ]
        );
    },
  }),
};

export const WithError: Story = {
  args: {
    modelValue: 10,
    label: 'Umbral',
    orientation: 'horizontal',
    invalid: true,
    errorText: 'El valor debe ser al menos 20.',
  },
  render: (args) => ({
    components: { InputRange },
    setup() {
      const model = ref(args.modelValue ?? 0);
      return () =>
        h('div', { class: 'ku:max-w-md' }, [
          h(InputRange, {
            ...args,
            modelValue: model.value,
            'ku:onUpdate:modelValue': (v: number) => {
              model.value = v;
            },
          }),
        ]);
    },
  }),
};
