import type { Meta, StoryObj } from '@storybook/vue3'
import CSATContainer from './CSATContainer.vue'

const mockCSATData = {
  total_nps_responses: 1250,
  min_score: 1,
  max_score: 10,
  q1_score: 6,
  median_score: 8,
  q3_score: 9,
  p95_score: 10,
  average_score: 7.5,
  histogram: [
    { score: 1, count: 25 },
    { score: 2, count: 18 },
    { score: 3, count: 32 },
    { score: 4, count: 45 },
    { score: 5, count: 78 },
    { score: 6, count: 125 },
    { score: 7, count: 198 },
    { score: 8, count: 285 },
    { score: 9, count: 312 },
    { score: 10, count: 132 },
  ],
  nps_by_day: [
    {
      date: '2024-11-01',
      nps_responses_count: 45,
      min_score: 2,
      max_score: 10,
      q1_score: 6,
      median_score: 8,
      q3_score: 9,
      p95_score: 10,
      average_score: 7.6,
    },
    {
      date: '2024-11-02',
      nps_responses_count: 52,
      min_score: 1,
      max_score: 10,
      q1_score: 5,
      median_score: 7,
      q3_score: 9,
      p95_score: 10,
      average_score: 7.2,
    },
    {
      date: '2024-11-03',
      nps_responses_count: 48,
      min_score: 3,
      max_score: 10,
      q1_score: 6,
      median_score: 8,
      q3_score: 9,
      p95_score: 10,
      average_score: 7.8,
    },
  ],
}

const meta = {
  title: 'Charts/BusinessMetrics/CSATContainer',
  component: CSATContainer,
  tags: ['autodocs'],
  argTypes: {
    containerInitiallyOpen: {
      control: 'boolean',
      description: 'Contenedor principal “CSAT” abierto o cerrado al montar',
    },
    loading: {
      control: 'boolean',
      description: 'Loading aplicado a las métricas internas',
    },
    enableExport: {
      control: 'boolean',
      description: 'Habilita o deshabilita el footer de exportación',
    },
    data: {
      control: 'object',
      description: 'Data con el shape esperado por NpsMetrics',
    },
    onExport: {
      action: 'export',
      description: 'Payload { source, format }',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Agrupa las métricas CSAT bajo un único colapsable y reutiliza NpsMetrics para mostrar distribución de score y tendencia diaria.',
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8f9fa' },
        { name: 'dark', value: '#1a1a1d' },
      ],
    },
  },
} satisfies Meta<typeof CSATContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    containerInitiallyOpen: true,
    loading: false,
    enableExport: true,
    data: mockCSATData,
  },
}

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
}

export const CollapsedOuter: Story = {
  args: {
    ...Default.args,
    containerInitiallyOpen: false,
  },
}
