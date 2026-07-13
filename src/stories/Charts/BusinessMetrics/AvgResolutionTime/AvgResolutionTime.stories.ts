import type { Meta, StoryObj } from '@storybook/vue3'
import AvgResolutionTime from './AvgResolutionTime.vue'

const meta = {
  title: 'Charts/BusinessMetrics/AvgResolutionTime',
  component: AvgResolutionTime,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Estado de carga del componente',
    },
    data: {
      control: 'object',
      description:
        'Datos de tiempo de resolucion promedio por segmento (AI Agent, Human, Hybrid) y su tendencia diaria, mas el desglose opcional por canal',
    },
    breakdownBy: {
      control: 'select',
      options: ['all', 'channel'],
      description: 'Modo de desglose del grafico: "all" (por segmento) o "channel" (por canal)',
    },
    enableExport: {
      control: 'boolean',
      description: 'Muestra el footer con botones de exportacion',
    },
    onChangeBreakdown: {
      action: 'changeBreakdown',
      description: 'Evento emitido cuando el usuario cambia el modo de desglose',
    },
    onExport: {
      action: 'export',
      description: 'Evento emitido cuando se hace clic en un boton de exportacion (pdf | csv | xlsx)',
    },
  },
  decorators: [
    () => ({
      template:
        '<div class="box-border h-[560px] w-full max-w-5xl px-2 py-4"><story /></div>',
    }),
  ],
} satisfies Meta<typeof AvgResolutionTime>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    loading: false,
    enableExport: true,
    data: {
      ai_agent_total_conversations: 820,
      ai_agent_avg_resolution_time_seconds: 615,
      ai_agent_avg_resolution_time_formatted: '10m 15s',
      human_total_conversations: 96,
      human_avg_resolution_time_seconds: 8145,
      human_avg_resolution_time_formatted: '2h 15m',
      hybrid_total_conversations: 284,
      hybrid_avg_resolution_time_seconds: 2120,
      hybrid_avg_resolution_time_formatted: '35m 20s',
      resolution_time_by_day: {
        '2026-05-01': { ai_agent: 590, human: 7800, hybrid: 2000 },
        '2026-05-02': { ai_agent: 630, human: 8500, hybrid: 2200 },
        '2026-05-03': { ai_agent: 605, human: 8100, hybrid: 2150 },
        '2026-05-04': { ai_agent: 640, human: null, hybrid: 2080 },
      },
      // Keys match ChannelMetrics.vue's channelColorMap so both charts render
      // the same channel with the same color.
      channel_breakdown_items: [
        {
          key: 'whatsapp',
          label: 'whatsapp',
          total_conversations: 720,
          avg_resolution_time_seconds: 2120,
          avg_resolution_time_formatted: '35m 20s',
          percentage: 60.0,
        },
        {
          key: 'web_chat',
          label: 'web_chat',
          total_conversations: 320,
          avg_resolution_time_seconds: 900,
          avg_resolution_time_formatted: '15m 0s',
          percentage: 26.7,
        },
        {
          key: 'voice',
          label: 'voice',
          total_conversations: 160,
          avg_resolution_time_seconds: 1500,
          avg_resolution_time_formatted: '25m 0s',
          percentage: 13.3,
        },
      ],
      channel_resolution_time_by_day: {
        '2026-05-01': { whatsapp: 2000, web_chat: 850, voice: 1400 },
        '2026-05-02': { whatsapp: 2200, web_chat: 920, voice: 1600 },
        '2026-05-03': { whatsapp: 2150, web_chat: 880, voice: null },
        '2026-05-04': { whatsapp: 2080, web_chat: 950, voice: 1550 },
      },
    },
  },
}

export const ByChannel: Story = {
  args: {
    ...Default.args,
    breakdownBy: 'channel',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    data: null,
  },
}

export const Empty: Story = {
  args: {
    loading: false,
    data: {
      ai_agent_total_conversations: 0,
      ai_agent_avg_resolution_time_seconds: null,
      ai_agent_avg_resolution_time_formatted: null,
      human_total_conversations: 0,
      human_avg_resolution_time_seconds: null,
      human_avg_resolution_time_formatted: null,
      hybrid_total_conversations: 0,
      hybrid_avg_resolution_time_seconds: null,
      hybrid_avg_resolution_time_formatted: null,
      resolution_time_by_day: {},
    },
  },
}
