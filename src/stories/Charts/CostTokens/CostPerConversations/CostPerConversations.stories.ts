import type { Meta, StoryObj } from '@storybook/vue3';
import CostPerConversations from './CostPerConversations.vue';

// Datos de ejemplo para las stories
const mockData = {
  airline_name: "Sky Airlines",
  start_date: "2026-01-01",
  end_date: "2026-01-23",
  top_agents: [
    {
      agent_id: "seller_v1",
      agent_name: "Seller",
      avg_cost_per_conversation: 0.058,
      avg_tokens_per_conversation: 450,
      conversations: 890,
      total_cost: 51.62,
      total_tokens: 400500
    },
    {
      agent_id: "disruption_manager_v2",
      agent_name: "Disruption Manager",
      avg_cost_per_conversation: 0.018,
      avg_tokens_per_conversation: 280,
      conversations: 456,
      total_cost: 8.21,
      total_tokens: 127680
    },
    {
      agent_id: "checkin_v1",
      agent_name: "Checkin",
      avg_cost_per_conversation: 0.014,
      avg_tokens_per_conversation: 220,
      conversations: 1250,
      total_cost: 17.50,
      total_tokens: 275000
    },
    {
      agent_id: "booking_manager_v1",
      agent_name: "Booking Manager",
      avg_cost_per_conversation: 0.007,
      avg_tokens_per_conversation: 180,
      conversations: 670,
      total_cost: 4.69,
      total_tokens: 120600
    },
    {
      agent_id: "triage_v2",
      agent_name: "Triage",
      avg_cost_per_conversation: 0.006,
      avg_tokens_per_conversation: 150,
      conversations: 1580,
      total_cost: 9.48,
      total_tokens: 237000
    },
    {
      agent_id: "faq_v1",
      agent_name: "FAQ",
      avg_cost_per_conversation: 0.003,
      avg_tokens_per_conversation: 120,
      conversations: 2340,
      total_cost: 7.02,
      total_tokens: 280800
    },
    {
      agent_id: "human_agent",
      agent_name: "Human",
      avg_cost_per_conversation: 0.001,
      avg_tokens_per_conversation: 50,
      conversations: 120,
      total_cost: 0.12,
      total_tokens: 6000
    }
  ]
};

const mockSmallData = {
  airline_name: "Quick Air",
  start_date: "2026-01-15",
  end_date: "2026-01-23",
  top_agents: [
    {
      agent_id: "customer_service_v1",
      agent_name: "Customer Service",
      avg_cost_per_conversation: 0.28,
      avg_tokens_per_conversation: 340,
      conversations: 1250,
      total_cost: 350.00,
      total_tokens: 425000
    },
    {
      agent_id: "booking_assistant_v2",
      agent_name: "Booking Assistant",
      avg_cost_per_conversation: 0.30,
      avg_tokens_per_conversation: 200,
      conversations: 890,
      total_cost: 267.00,
      total_tokens: 178000
    },
    {
      agent_id: "flight_info_v1",
      agent_name: "Flight Information",
      avg_cost_per_conversation: 0.34,
      avg_tokens_per_conversation: 200,
      conversations: 456,
      total_cost: 155.04,
      total_tokens: 91200
    }
  ]
};

const mockHighCostData = {
  airline_name: "Premium Airlines",
  start_date: "2026-01-01",
  end_date: "2026-01-23",
  top_agents: [
    {
      agent_id: "premium_concierge_v1",
      agent_name: "Premium Concierge",
      avg_cost_per_conversation: 1.25,
      avg_tokens_per_conversation: 1200,
      conversations: 340,
      total_cost: 425.00,
      total_tokens: 408000
    },
    {
      agent_id: "vip_support_v2",
      agent_name: "VIP Support",
      avg_cost_per_conversation: 0.95,
      avg_tokens_per_conversation: 980,
      conversations: 520,
      total_cost: 494.00,
      total_tokens: 509600
    },
    {
      agent_id: "luxury_booking_v1",
      agent_name: "Luxury Booking",
      avg_cost_per_conversation: 0.75,
      avg_tokens_per_conversation: 850,
      conversations: 680,
      total_cost: 510.00,
      total_tokens: 578000
    },
    {
      agent_id: "elite_checkin_v1",
      agent_name: "Elite Check-in",
      avg_cost_per_conversation: 0.42,
      avg_tokens_per_conversation: 520,
      conversations: 890,
      total_cost: 373.80,
      total_tokens: 462800
    }
  ]
};

const meta = {
  title: 'Charts/CostTokens/CostPerConversations',
  component: CostPerConversations,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Estado de carga del componente'
    },
    data: {
      control: 'object',
      description: 'Datos de costo por conversación por agente'
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
        component: 'Componente para mostrar el costo promedio por conversación de cada agente. Muestra un gráfico de barras horizontales con los agentes ordenados por costo descendente, junto con KPIs de resumen.'
      }
    }
  }
} satisfies Meta<typeof CostPerConversations>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vista por defecto con múltiples agentes
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
        story: 'Muestra el componente completo con 7 agentes diferentes ordenados por costo promedio por conversación descendente.'
      }
    }
  }
};

/**
 * Vista con pocos agentes
 */
export const FewAgents: Story = {
  args: {
    loading: false,
    data: mockSmallData,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente mostrando solo 3 agentes para casos de uso más simples.'
      }
    }
  }
};

/**
 * Vista con agentes de alto costo
 */
export const HighCost: Story = {
  args: {
    loading: false,
    data: mockHighCostData,
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente mostrando agentes premium con costos más altos por conversación.'
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
      top_agents: []
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Muestra el estado vacío cuando no hay datos de agentes disponibles.'
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
 * Un solo agente
 */
export const SingleAgent: Story = {
  args: {
    loading: false,
    data: {
      airline_name: "Solo Agent Air",
      start_date: "2026-01-01",
      end_date: "2026-01-23",
      top_agents: [
        {
          agent_id: "only_agent_v1",
          agent_name: "Support Agent",
          avg_cost_per_conversation: 0.15,
          avg_tokens_per_conversation: 250,
          conversations: 500,
          total_cost: 75.00,
          total_tokens: 125000
        }
      ]
    },
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Caso de uso con un solo agente disponible.'
      }
    }
  }
};

/**
 * Con costos muy bajos
 */
export const VeryLowCost: Story = {
  args: {
    loading: false,
    data: {
      airline_name: "Budget Air",
      start_date: "2026-01-01",
      end_date: "2026-01-23",
      top_agents: [
        {
          agent_id: "basic_bot_v1",
          agent_name: "Basic Bot",
          avg_cost_per_conversation: 0.001,
          avg_tokens_per_conversation: 50,
          conversations: 5000,
          total_cost: 5.00,
          total_tokens: 250000
        },
        {
          agent_id: "simple_faq_v1",
          agent_name: "Simple FAQ",
          avg_cost_per_conversation: 0.0008,
          avg_tokens_per_conversation: 40,
          conversations: 8000,
          total_cost: 6.40,
          total_tokens: 320000
        },
        {
          agent_id: "auto_reply_v1",
          agent_name: "Auto Reply",
          avg_cost_per_conversation: 0.0005,
          avg_tokens_per_conversation: 30,
          conversations: 12000,
          total_cost: 6.00,
          total_tokens: 360000
        }
      ]
    },
    enableExport: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Componente mostrando agentes con costos muy bajos por conversación (menos de $0.001).'
      }
    }
  }
};
