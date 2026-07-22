import type { Meta, StoryObj } from '@storybook/vue3';
import TranslationCountBadge from './TranslationCountBadge.vue';
import type { KiutTranslationCountBadgeItem } from './translationCountBadgeTypes';

const sampleItems: KiutTranslationCountBadgeItem[] = [
  { id: 'en', label: 'EN · English' },
  { id: 'es', label: 'ES · Spanish' },
];

const meta: Meta<typeof TranslationCountBadge> = {
  title: 'Components/TranslationCountBadge',
  component: TranslationCountBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Compact count badge with a hover/focus tooltip listing related items. Pass translated `label` and `tooltipTitle` from the host app. Use the **Theme** toolbar to review light and dark modes.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TranslationCountBadge>;

export const Configured: Story = {
  args: {
    label: '2 Configured',
    tooltipTitle: 'Configured languages',
    items: sampleItems,
    variant: 'configured',
  },
};

export const Autoconfigured: Story = {
  args: {
    label: '3 Autoconfigured',
    tooltipTitle: 'Autotranslated languages',
    items: [
      { id: 'fr', label: 'FR · French' },
      { id: 'pt', label: 'PT · Portuguese' },
      { id: 'de', label: 'DE · German' },
    ],
    variant: 'autoconfigured',
  },
};

export const NeutralWithNotes: Story = {
  args: {
    label: '2 Pending',
    tooltipTitle: 'Languages pending translation',
    items: [
      { id: 'it', label: 'IT · Italian', note: 'Translating' },
      { id: 'ja', label: 'JA · Japanese' },
    ],
    variant: 'neutral',
    pulse: true,
  },
};
