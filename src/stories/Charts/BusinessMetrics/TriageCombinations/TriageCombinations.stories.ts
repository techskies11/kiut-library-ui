import type { Meta, StoryObj } from '@storybook/vue3';
import TriageCombinations from './TriageCombinations.vue';

// Datos de ejemplo para las stories
const mockData = {
  airline_name: "Sky Airlines",
  start_date: "2026-01-01",
  end_date: "2026-01-23",
  total_conversations: 388,
  combinations: {
    "triage": 382,
    "triage+faq": 4,
    "triage+checkin": 0,
    "triage+disruption_manager": 0,
    "triage+booking_manager": 2,
  }
};

const mockDiverseData = {
  airline_name: "Premium Airlines",
  start_date: "2026-01-01",
  end_date: "2026-01-23",
  total_conversations: 250,
  combinations: {
    "triage": 125,
    "triage+booking_manager": 5,
    "triage+checkin": 32,
    "triage+disruption_manager": 8,
    "triage+faq": 45,
    "triage+faq+checkin": 12,
    "triage+seller": 3,
    "triage+faq+booking_manager+checkin": 8,
    "triage+disruption_manager+checkin": 7,
    "triage+faq+booking_manager": 5,
  }
};

const mockComplexData = {
  airline_name: "International Air",
  start_date: "2026-01-01",
  end_date: "2026-01-23",
  total_conversations: 450,
  combinations: {
    "triage": 50,
    "triage+faq": 120,
    "triage+checkin": 80,
    "triage+booking_manager": 60,
    "triage+disruption_manager": 40,
    "triage+faq+checkin": 35,
    "triage+faq+booking_manager": 25,
    "triage+faq+checkin+booking_manager": 18,
    "triage+faq+checkin+booking_manager+disruption_manager": 12,
    "triage+faq+checkin+booking_manager+disruption_manager+seller": 10,
  }
};

const mockBalancedData = {
  airline_name: "Balanced Air",
  start_date: "2026-01-15",
  end_date: "2026-01-23",
  total_conversations: 300,
  combinations: {
    "triage": 60,
    "triage+faq": 60,
    "triage+checkin": 60,
    "triage+faq+checkin": 60,
    "triage+faq+checkin+booking_manager": 30,
    "triage+faq+checkin+booking_manager+disruption_manager": 30,
  }
};

const meta = {
  title: 'Charts/BusinessMetrics/TriageCombinations',
  component: TriageCombinations,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Estado de carga del componente'
    },
    data: {
      control: 'object',
      description: 'Datos de combinaciones de triage con otras intenciones'
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
        component: 'Componente para mostrar la distribución del número de intenciones (además de triage) en conversaciones. Muestra un gráfico de barras apiladas horizontales con los porcentajes y una tabla con detalles de distribución.'
      }
    }
  }
} satisfies Meta<typeof TriageCombinations>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vista por defecto - Mayoría con solo triage (98%)
 */
export const Default: Story = {
  args: {
    loading: false,
    data: mockData,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el caso común donde la mayoría de conversaciones (98%) tienen solo triage sin intenciones adicionales, con algunas conversaciones que tienen 1-2 intenciones adicionales.'
      }
    }
  }
};

/**
 * Vista con distribución diversa
 */
export const DiverseDistribution: Story = {
  args: {
    loading: false,
    data: mockDiverseData,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Distribución más variada con conversaciones que tienen 0, 1, 2 y 3 intenciones adicionales a triage.'
      }
    }
  }
};

/**
 * Vista con combinaciones complejas
 */
export const ComplexCombinations: Story = {
  args: {
    loading: false,
    data: mockComplexData,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra un caso con múltiples intenciones combinadas, incluyendo conversaciones con 4 o más intenciones adicionales a triage.'
      }
    }
  }
};

/**
 * Vista con distribución balanceada
 */
export const BalancedDistribution: Story = {
  args: {
    loading: false,
    data: mockBalancedData,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Distribución equilibrada donde cada categoría tiene aproximadamente el mismo número de conversaciones.'
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
    data: mockData,
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
      start_date: "2026-01-01",
      end_date: "2026-01-23",
      total_conversations: 0,
      combinations: {}
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el estado vacío cuando no hay datos de combinaciones disponibles.'
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
    data: mockData,
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
 * Solo triage sin combinaciones
 */
export const OnlyTriage: Story = {
  args: {
    loading: false,
    data: {
      airline_name: "Simple Air",
      start_date: "2026-01-01",
      end_date: "2026-01-23",
      total_conversations: 500,
      combinations: {
        "triage": 500
      }
    },
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Caso extremo donde el 100% de las conversaciones tienen solo triage sin intenciones adicionales.'
      }
    }
  }
};

/**
 * Muchas intenciones combinadas (4+)
 */
export const ManyIntentions: Story = {
  args: {
    loading: false,
    data: {
      airline_name: "Complex Air",
      start_date: "2026-01-01",
      end_date: "2026-01-23",
      total_conversations: 200,
      combinations: {
        "triage": 20,
        "triage+faq": 30,
        "triage+faq+checkin": 30,
        "triage+faq+checkin+booking_manager": 40,
        "triage+faq+checkin+booking_manager+disruption_manager": 40,
        "triage+faq+checkin+booking_manager+disruption_manager+seller": 40,
      }
    },
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra un caso donde la mayoría de conversaciones tienen 4 o más intenciones combinadas con triage.'
      }
    }
  }
};

/**
 * Vista pequeña con pocos datos
 */
export const SmallDataset: Story = {
  args: {
    loading: false,
    data: {
      airline_name: "Small Air",
      start_date: "2026-01-20",
      end_date: "2026-01-23",
      total_conversations: 50,
      combinations: {
        "triage": 30,
        "triage+faq": 15,
        "triage+checkin": 5,
      }
    },
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente con un conjunto pequeño de datos (50 conversaciones totales).'
      }
    }
  }
};
