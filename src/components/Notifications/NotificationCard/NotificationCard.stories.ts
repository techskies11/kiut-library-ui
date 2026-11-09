import type { Meta, StoryObj } from "@storybook/vue3";
import NotificationCard from "./NotificationCard.vue";
import type { InboxNotification } from "./notificationCardTypes";

const items: InboxNotification[] = [
  {
    id: "1",
    tone: "message",
    title: "Nuevo mensaje de María González",
    body: "Hola, necesito cambiar la fecha de mi vuelo para el sábado, ¿es posible?",
    time: "1m ago",
    unread: true,
    type: "notificationList",
  },
  {
    id: "2",
    tone: "pending",
    title: "Pendiente primera respuesta",
    body: "La conversación de Lucas Pereyra (WhatsApp) superó los 5 min sin primera respuesta.",
    time: "3m ago",
    unread: true,
    type: "notificationList",
  },
  {
    id: "3",
    tone: "alert",
    title: "Amenaza detectada",
    body: "Mensaje con lenguaje inapropiado detectado en una conversación de Webchat.",
    time: "6m ago",
    unread: true,
    type: "notificationList",
  },
];

const meta: Meta<typeof NotificationCard> = {
  title: "Components/NotificationsModule/Card",
  component: NotificationCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NotificationCard>;

export const Default: Story = {
  render: () => ({
    components: { NotificationCard },
    setup() {
      return { items };
    },
    template: `
      <div class="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">
        <NotificationCard v-for="item in items" :key="item.id" :item="item" />
      </div>
    `,
  }),
};
