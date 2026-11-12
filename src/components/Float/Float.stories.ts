import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import Float from "./Float.vue";
import type { FloatItem } from "./floatTypes";

const sample: FloatItem[] = [
  {
    id: "threat",
    tone: "danger",
    icon: "warning",
    title: "Amenaza detectada",
    subtitle: "Webchat · Se detectó lenguaje inapropiado en una conversación.",
    to: "/threats",
  },
  {
    id: "doc-error",
    tone: "danger",
    icon: "error",
    title: "Documento procesado con error",
    subtitle:
      "Política de equipaje · No se pudo procesar el documento. Revisá el error en la base de conocimiento.",
    to: "/knowledge",
  },
  {
    id: "doc-ok",
    tone: "success",
    icon: "check",
    title: "Documento procesado con éxito",
    subtitle:
      "Política de equipaje · El documento se procesó correctamente y está disponible en la base de conocimiento.",
    to: "/knowledge",
  },
  {
    id: "abandoned-user",
    tone: "warning",
    icon: "chat",
    title: "Conversación abandonada por usuario",
    subtitle:
      "Lucía Fernández (Webchat) · No respondió al último mensaje del agente y su conversación quedó abandonada.",
    to: "/conversations/abandoned-user",
  },
  {
    id: "abandoned-agent",
    tone: "danger",
    icon: "chat",
    title: "Conversación abandonada por agente",
    subtitle:
      "Lucía Fernández (Webchat) · Su consulta de cambio de asiento quedó sin respuesta del agente.",
    to: "/conversations/abandoned-agent",
  },
  {
    id: "sla",
    tone: "warning",
    icon: "clock",
    title: "SLA incumplido: tiempo sin respuesta posterior",
    subtitle:
      "Camila Duarte (WhatsApp) · Se superó el tiempo máximo para responder a su último mensaje sobre check-in.",
    to: "/conversations/sla-1",
  },
  {
    id: "message",
    tone: "info",
    icon: "chat",
    title: "Nuevo mensaje",
    subtitle: "Hola, necesito cambiar la fecha de mi vuelo para el sábado.",
    to: "/inbox?conversation=message-1",
  },
  {
    id: "disruption",
    tone: "info",
    icon: "chat",
    title: "Disrupción procesada o fallida",
    subtitle:
      "CA 2041 · La disrupción se procesó correctamente y los pasajeros fueron notificados.",
    to: "/disruptions",
  },
];

const meta: Meta<typeof Float> = {
  title: "Components/Float",
  component: Float,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Float>;

export const One: Story = {
  render: () => ({
    components: { Float },
    setup() {
      const items = ref<FloatItem[]>([sample[0]]);
      const onDismiss = (item: FloatItem) => {
        items.value = items.value.filter((entry) => entry.id !== item.id);
      };
      return { items, onDismiss };
    },
    template: `<Float :items="items" @dismiss="onDismiss" />`,
  }),
};

export const Stack: Story = {
  render: () => ({
    components: { Float },
    setup() {
      const items = ref<FloatItem[]>([...sample]);
      const onDismiss = (item: FloatItem) => {
        items.value = items.value.filter((entry) => entry.id !== item.id);
      };
      const onDismissAll = () => {
        items.value = [];
      };
      return { items, onDismiss, onDismissAll };
    },
    template: `
      <Float
        :items="items"
        @dismiss="onDismiss"
        @dismiss-all="onDismissAll"
      />
    `,
  }),
};

export const Tones: Story = {
  render: () => ({
    components: { Float },
    setup() {
      const items = ref<FloatItem[]>(sample.slice(0, 4));
      return { items };
    },
    template: `<Float :items="items" :max-visible="4" />`,
  }),
};
