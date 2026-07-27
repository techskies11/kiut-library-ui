import type { Meta, StoryObj } from "@storybook/vue3";
import Banner from "./Banner.vue";

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Banner para información del backoffice: **mantenimiento**, o **nuevas funcionalidades**. Incluye íconos prestablecidos según la variante. Permite cambiar título, descripción, fechas de inicio y fin, y color según el tipo de banner.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["warning", "info", "success", "feature", "danger"],
    },
    title: { control: "text" },
    description: { control: "text" },
    date_start: { control: "text" },
    date_final: { control: "text" },
    subtitle_date_start: { control: "text" },
    subtitle_date_final: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    variant: "warning",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Mantenimiento programado de plataforma",
    description:
      "El servicio completo estará fuera de línea durante la ventana de mantenimiento. No se procesarán conversaciones ni notificaciones.",
    subtitle_date_start: "Inicio: ",
    subtitle_date_final: "Fin: ",
    date_start: "20 jun 2026, 02:00 a.m.",
    date_final: "20 jun 2026, 03:30 a.m.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Reportes actualizados cada 24 horas",
    description:
      "Las métricas del dashboard se recalculan automáticamente una vez al día. Los datos que ves pueden tener hasta 24 horas de antigüedad.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Integración conectada correctamente",
    description:
      "Tu canal de WhatsApp quedó vinculado y ya está recibiendo conversaciones.",
  },
};

export const Feature: Story = {
  args: {
    variant: "feature",
    title: "Nueva funcionalidad disponible",
    description: "Ya puedes exportar tus conversaciones en formato CSV.",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    title: "Servicio de voz interrumpido",
    description:
      "No se están procesando llamadas en este momento. Nuestro equipo ya está trabajando para restablecer el servicio.",
  },
};
