import type { Meta, StoryObj } from '@storybook/vue3';
import { h, ref } from 'vue';
import ImageUploadCircle from './ImageUploadCircle.vue';

const meta: Meta<typeof ImageUploadCircle> = {
  title: 'Components/Inputs/ImageUploadCircle',
  component: ImageUploadCircle,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Circular image upload trigger with optional URL field. Emits `select` with the chosen file; parent handles upload.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageUploadCircle>;

export const Default: Story = {
  args: {
    label: 'Brand image',
    urlPlaceholder: 'https://…',
    uploadAriaLabel: 'Upload image',
  },
  render: (args) => ({
    components: { ImageUploadCircle },
    setup() {
      const url = ref('');
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(ImageUploadCircle, {
            ...args,
            modelValue: url.value,
            'onUpdate:modelValue': (v: string) => {
              url.value = v;
            },
            onSelect: (file: File) => {
              url.value = URL.createObjectURL(file);
            },
          }),
        ]);
    },
  }),
};

export const WithImage: Story = {
  args: {
    label: 'Avatar',
    modelValue: 'https://platform-dev.onservice.ai/assets/Iso-sXSTtMkE.png',
    urlPlaceholder: 'Image URL',
    uploadAriaLabel: 'Change image',
  },
  render: (args) => ({
    components: { ImageUploadCircle },
    setup() {
      const url = ref(args.modelValue ?? '');
      return () =>
        h('div', { class: 'max-w-md' }, [
          h(ImageUploadCircle, {
            ...args,
            modelValue: url.value,
            'onUpdate:modelValue': (v: string) => {
              url.value = v;
            },
          }),
        ]);
    },
  }),
};

export const Loading: Story = {
  args: {
    label: 'Logo',
    loading: true,
    uploadAriaLabel: 'Uploading',
  },
  render: (args) => ({
    components: { ImageUploadCircle },
    setup() {
      return () => h('div', { class: 'max-w-md' }, [h(ImageUploadCircle, args)]);
    },
  }),
};
