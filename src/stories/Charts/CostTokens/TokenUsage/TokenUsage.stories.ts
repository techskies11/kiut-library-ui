import type { Meta, StoryObj } from '@storybook/vue3-vite';
import TokenUsage from './TokenUsage.vue';

const meta: Meta<typeof TokenUsage> = {
  title: 'Charts/CostTokens/TokenUsage',
  component: TokenUsage,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' },
    loading: { control: 'boolean' },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TokenUsage>;

const dayTemplate = (
  inputTokens: number,
  outputTokens: number,
  cacheReadTokens: number,
  cacheWriteTokens: number,
) => ({
  input_tokens: inputTokens,
  output_tokens: outputTokens,
  cache_read_tokens: cacheReadTokens,
  cache_write_tokens: cacheWriteTokens,
  total_tokens: inputTokens + outputTokens + cacheReadTokens + cacheWriteTokens,
});

const mockData = {
  airline_name: 'Aeroméxico',
  start_date: '2026-03-01',
  end_date: '2026-03-15',
  tokens_by_day: {
    '2026-03-01': dayTemplate(430_000, 175_000, 310_000, 95_000),
    '2026-03-02': dayTemplate(405_000, 168_000, 298_000, 88_000),
    '2026-03-03': dayTemplate(445_000, 182_000, 320_000, 102_000),
    '2026-03-04': dayTemplate(398_000, 165_000, 290_000, 86_000),
    '2026-03-05': dayTemplate(452_000, 188_000, 325_000, 108_000),
    '2026-03-06': dayTemplate(412_000, 170_000, 305_000, 91_000),
    '2026-03-07': dayTemplate(438_000, 180_000, 315_000, 99_000),
    '2026-03-08': dayTemplate(401_000, 166_000, 292_000, 87_000),
    '2026-03-09': dayTemplate(448_000, 185_000, 322_000, 105_000),
    '2026-03-10': dayTemplate(415_000, 172_000, 300_000, 90_000),
    '2026-03-11': dayTemplate(442_000, 178_000, 318_000, 97_000),
    '2026-03-12': dayTemplate(428_000, 176_000, 312_000, 94_000),
    '2026-03-13': dayTemplate(409_000, 169_000, 295_000, 89_000),
    '2026-03-14': dayTemplate(455_000, 190_000, 328_000, 110_000),
    '2026-03-15': dayTemplate(422_000, 176_000, 310_000, 96_000),
  },
  total_tokens: 14_900_000,
  total_input_tokens: 6_300_000,
  total_output_tokens: 2_600_000,
  total_cache_read_tokens: 4_600_000,
  total_cache_write_tokens: 1_400_000,
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const Empty: Story = {
  args: {
    data: {
      tokens_by_day: {},
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    data: mockData,
  },
};
