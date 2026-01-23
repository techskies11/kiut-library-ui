import type { Meta, StoryObj } from '@storybook/vue3';
import ChannelMetrics from './ChannelMetrics.vue';

// Datos de ejemplo para las stories
const mockChannelData = {
  airline_name: "AeroLineas Plus",
  start_date: "2025-07-01",
  end_date: "2025-07-10",
  channels_by_day: {
    "2025-07-01": {
      sms: 23,
      voice: 7,
      web_chat: 12,
      whatsapp: 45
    },
    "2025-07-02": {
      sms: 28,
      voice: 9,
      web_chat: 15,
      whatsapp: 52
    },
    "2025-07-03": {
      sms: 31,
      voice: 11,
      web_chat: 18,
      whatsapp: 58
    },
    "2025-07-04": {
      sms: 26,
      voice: 8,
      web_chat: 14,
      whatsapp: 48
    },
    "2025-07-05": {
      sms: 35,
      voice: 13,
      web_chat: 21,
      whatsapp: 65
    },
    "2025-07-06": {
      sms: 29,
      voice: 10,
      web_chat: 16,
      whatsapp: 54
    },
    "2025-07-07": {
      sms: 33,
      voice: 12,
      web_chat: 19,
      whatsapp: 61
    },
    "2025-07-08": {
      sms: 37,
      voice: 14,
      web_chat: 23,
      whatsapp: 68
    },
    "2025-07-09": {
      sms: 30,
      voice: 11,
      web_chat: 17,
      whatsapp: 56
    },
    "2025-07-10": {
      sms: 34,
      voice: 13,
      web_chat: 20,
      whatsapp: 63
    }
  },
  total_by_channel: {
    sms: 306,
    voice: 108,
    web_chat: 175,
    whatsapp: 570
  },
  total_conversations: 1159
};

const mockWeekData = {
  airline_name: "Sky Airlines",
  start_date: "2025-07-15",
  end_date: "2025-07-21",
  channels_by_day: {
    "2025-07-15": {
      sms: 42,
      voice: 15,
      web_chat: 28,
      whatsapp: 85
    },
    "2025-07-16": {
      sms: 38,
      voice: 12,
      web_chat: 25,
      whatsapp: 78
    },
    "2025-07-17": {
      sms: 45,
      voice: 18,
      web_chat: 31,
      whatsapp: 92
    },
    "2025-07-18": {
      sms: 40,
      voice: 14,
      web_chat: 27,
      whatsapp: 82
    },
    "2025-07-19": {
      sms: 48,
      voice: 20,
      web_chat: 34,
      whatsapp: 98
    },
    "2025-07-20": {
      sms: 44,
      voice: 16,
      web_chat: 29,
      whatsapp: 88
    },
    "2025-07-21": {
      sms: 46,
      voice: 19,
      web_chat: 32,
      whatsapp: 95
    }
  },
  total_by_channel: {
    sms: 303,
    voice: 114,
    web_chat: 206,
    whatsapp: 618
  },
  total_conversations: 1241
};

const mockTwoChannelsData = {
  airline_name: "Quick Air",
  start_date: "2025-07-01",
  end_date: "2025-07-05",
  channels_by_day: {
    "2025-07-01": {
      whatsapp: 120,
      voice: 35
    },
    "2025-07-02": {
      whatsapp: 135,
      voice: 42
    },
    "2025-07-03": {
      whatsapp: 128,
      voice: 38
    },
    "2025-07-04": {
      whatsapp: 145,
      voice: 48
    },
    "2025-07-05": {
      whatsapp: 152,
      voice: 52
    }
  },
  total_by_channel: {
    whatsapp: 680,
    voice: 215
  },
  total_conversations: 895
};

const meta = {
  title: 'Charts/BusinessMetrics/ChannelMetrics',
  component: ChannelMetrics,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Estado de carga del componente'
    },
    data: {
      control: 'object',
      description: 'Datos de métricas de canales incluyendo totales por canal, datos por día y total de conversaciones'
    },
    enableExport: {
      control: 'boolean',
      description: 'Muestra el footer con botones de exportación'
    },
    onExport: {
      action: 'export',
      description: 'Evento emitido cuando se hace clic en un botón de exportación (pdf | csv | xlsx)'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Componente para mostrar métricas de canales de comunicación incluyendo tarjetas KPI con totales por canal y un gráfico de líneas con tendencias diarias de cada canal (SMS, Voice, Web Chat, WhatsApp, etc.).'
      }
    }
  }
} satisfies Meta<typeof ChannelMetrics>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vista por defecto con métricas de múltiples canales
 */
export const Default: Story = {
  args: {
    loading: false,
    data: mockChannelData,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el componente completo con los KPIs de todos los canales, el gráfico de líneas con tendencias diarias y los botones de exportación.'
      }
    }
  }
};

/**
 * Vista con datos de la última semana
 */
export const LastWeek: Story = {
  args: {
    loading: false,
    data: mockWeekData,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Métricas de canales para la última semana con datos de 7 días.'
      }
    }
  }
};

/**
 * Vista con solo dos canales
 */
export const TwoChannels: Story = {
  args: {
    loading: false,
    data: mockTwoChannelsData,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente mostrando solo dos canales de comunicación (WhatsApp y Voice).'
      }
    }
  }
};

/**
 * Estado de carga
 */
export const Loading: Story = {
  args: {
    loading: true,
    data: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el estado de carga con la animación de barras.'
      }
    }
  }
};

/**
 * Estado vacío (sin datos)
 */
export const EmptyState: Story = {
  args: {
    loading: false,
    data: {
      airline_name: "Empty Airlines",
      start_date: "2025-07-01",
      end_date: "2025-07-10",
      channels_by_day: {},
      total_by_channel: {},
      total_conversations: 0
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el estado vacío cuando no hay datos disponibles para el período seleccionado.'
      }
    }
  }
};

/**
 * Con datos parciales (algunos días sin datos en ciertos canales)
 */
export const PartialData: Story = {
  args: {
    loading: false,
    data: {
      airline_name: "Partial Data Airlines",
      start_date: "2025-07-01",
      end_date: "2025-07-05",
      channels_by_day: {
        "2025-07-01": {
          sms: 25,
          whatsapp: 60
        },
        "2025-07-02": {
          sms: 30,
          voice: 10,
          whatsapp: 65
        },
        "2025-07-03": {
          whatsapp: 70
        },
        "2025-07-04": {
          sms: 28,
          voice: 8,
          web_chat: 15,
          whatsapp: 68
        },
        "2025-07-05": {
          voice: 12,
          whatsapp: 75
        }
      },
      total_by_channel: {
        sms: 83,
        voice: 30,
        web_chat: 15,
        whatsapp: 338
      },
      total_conversations: 466
    },
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente mostrando datos parciales donde algunos canales tienen valores en cero para ciertos días.'
      }
    }
  }
};

/**
 * Sin botones de exportación
 */
export const WithoutExport: Story = {
  args: {
    loading: false,
    data: mockChannelData,
    enableExport: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente sin los botones de exportación (enableExport: false).'
      }
    }
  }
};

/**
 * Con volumen alto de conversaciones
 */
export const HighVolume: Story = {
  args: {
    loading: false,
    data: {
      airline_name: "MegaAir International",
      start_date: "2025-07-01",
      end_date: "2025-07-07",
      channels_by_day: {
        "2025-07-01": {
          sms: 450,
          voice: 320,
          web_chat: 580,
          whatsapp: 1250,
          email: 180
        },
        "2025-07-02": {
          sms: 480,
          voice: 340,
          web_chat: 620,
          whatsapp: 1320,
          email: 195
        },
        "2025-07-03": {
          sms: 520,
          voice: 380,
          web_chat: 680,
          whatsapp: 1450,
          email: 210
        },
        "2025-07-04": {
          sms: 490,
          voice: 350,
          web_chat: 640,
          whatsapp: 1380,
          email: 200
        },
        "2025-07-05": {
          sms: 550,
          voice: 420,
          web_chat: 720,
          whatsapp: 1580,
          email: 230
        },
        "2025-07-06": {
          sms: 510,
          voice: 390,
          web_chat: 670,
          whatsapp: 1440,
          email: 215
        },
        "2025-07-07": {
          sms: 530,
          voice: 410,
          web_chat: 700,
          whatsapp: 1520,
          email: 225
        }
      },
      total_by_channel: {
        sms: 3530,
        voice: 2610,
        web_chat: 4610,
        whatsapp: 9940,
        email: 1455
      },
      total_conversations: 22145
    },
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente mostrando un volumen alto de conversaciones con 5 canales diferentes y números grandes.'
      }
    }
  }
};
