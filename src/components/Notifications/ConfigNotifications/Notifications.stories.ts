import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import Notifications from "./Notifications.vue";
import type {
  NotificationItem,
  NotificationRole,
} from "./notificationTypes.ts";

const roles: NotificationRole[] = [
  { id: "admin", label: "Administrador" },
  { id: "supervisor", label: "Supervisor" },
  { id: "agent", label: "Agente" },
  { id: "analyst", label: "Analista" },
];

const seed: NotificationItem[] = [
  {
    id: "assigned-message",
    title: "Nuevo mensaje en conversación asignada",
    description: "Un cliente respondió en una conversación que tenés asignada.",
    roleIds: ["admin", "supervisor", "agent"],
    userLinked: true,
    userLinkedEditable: false,
  },
  {
    id: "new-conversation",
    title: "Nueva conversación asignada",
    description: "Se te asignó una conversación nueva para atender.",
    roleIds: ["admin", "supervisor", "agent"],
    userLinked: true,
    userLinkedEditable: false,
  },
  {
    id: "unassigned",
    title: "Conversación sin asignación",
    description:
      "Una conversación escalada a humano quedó sin agente asignado.",
    roleIds: ["admin", "supervisor"],
    userLinked: false,
    userLinkedEditable: false,
  },
  {
    id: "sla",
    title: "SLA incumplido",
    description:
      "Se superó el tiempo de asignación, primera respuesta o respuesta posterior.",
    roleIds: ["admin", "supervisor"],
    userLinked: false,
    userLinkedEditable: true,
  },
  {
    id: "abandoned",
    title: "Conversación abandonada",
    description:
      "Una conversación quedó sin respuesta del cliente o del agente.",
    roleIds: ["admin", "supervisor"],
    userLinked: false,
    userLinkedEditable: true,
  },
  {
    id: "document",
    title: "Documento generado o fallido",
    description:
      "Resultado de la generación de un documento de la base de conocimiento.",
    roleIds: [],
    userLinked: true,
    userLinkedEditable: false,
  },
  {
    id: "disruption",
    title: "Disrupción procesada o fallida",
    description: "Resultado del procesamiento de una disrupción de vuelo.",
    roleIds: ["supervisor"],
    userLinked: true,
    userLinkedEditable: false,
  },
  {
    id: "threat",
    title: "Amenaza detectada",
    description:
      "Se detectó lenguaje inapropiado o contenido de riesgo en una conversación.",
    roleIds: ["admin", "supervisor"],
    userLinked: false,
    userLinkedEditable: false,
  },
];

const meta: Meta<typeof Notifications> = {
  title: "Components/NotificationsModule/NotificationConfig",
  component: Notifications,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Tabla de avisos y roles destinatarios. Presentacional: la app pasa `items` y `roles`, y escucha `update:items` y `preferences`. Usar la toolbar Theme para claro y oscuro.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Notifications>;

export const Default: Story = {
  render: () => ({
    components: { Notifications },
    setup() {
      const items = ref<NotificationItem[]>(
        seed.map((item) => ({ ...item, roleIds: [...item.roleIds] })),
      );
      return { items, roles };
    },
    template: `
      <div class="bg-[color:var(--kiut-bg-primary)] p-6">
        <Notifications v-model:items="items" :roles="roles" />
      </div>
    `,
  }),
};
