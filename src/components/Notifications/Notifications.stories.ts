import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Notifications from './Notifications.vue';
import type { NotificationItem, NotificationRole } from './notificationTypes';

const roles: NotificationRole[] = [
  { id: 'admin', label: 'Administrador' },
  { id: 'supervisor', label: 'Supervisor' },
  { id: 'agent', label: 'Agente' },
  { id: 'analyst', label: 'Analista' },
];

const seed: NotificationItem[] = [
  {
    id: 'assigned-message',
    title: 'Nuevo mensaje en conversación asignada',
    description: 'Un cliente respondió en una conversación que tenés asignada.',
    roleIds: ['admin', 'supervisor', 'agent'],
    userLinked: true,
    userLinkMode: 'locked-on',
  },
  {
    id: 'new-conversation',
    title: 'Nueva conversación asignada',
    description: 'Se te asignó una conversación nueva para atender.',
    roleIds: ['admin', 'supervisor', 'agent'],
    userLinked: true,
    userLinkMode: 'locked-on',
  },
  {
    id: 'unassigned',
    title: 'Conversación sin asignación',
    description: 'Una conversación escalada a humano quedó sin agente asignado.',
    hint: 'Parámetro asignación abandonada en config SLAs e inactividad',
    roleIds: ['admin', 'supervisor'],
    userLinked: false,
    userLinkMode: 'locked-off',
  },
  {
    id: 'sla',
    title: 'SLA incumplido',
    description: 'Se superó el tiempo de asignación, primera respuesta o respuesta posterior.',
    hint: 'Parámetro SLAs tiempo sin asignación, primera respuesta o respuesta posterior en config SLAs e inactividad',
    roleIds: ['admin', 'supervisor'],
    userLinked: false,
    userLinkMode: 'editable',
  },
  {
    id: 'abandoned',
    title: 'Conversación abandonada',
    description: 'Una conversación quedó sin respuesta del cliente o del agente.',
    hint: 'Parámetro conversación abandonada por cliente o por agente en config SLAs e inactividad',
    roleIds: ['admin', 'supervisor'],
    userLinked: false,
    userLinkMode: 'editable',
  },
  {
    id: 'document',
    title: 'Documento generado o fallido',
    description: 'Resultado de la generación de un documento de la base de conocimiento.',
    roleIds: [],
    userLinked: true,
    userLinkMode: 'locked-on',
  },
  {
    id: 'disruption',
    title: 'Disrupción procesada o fallida',
    description: 'Resultado del procesamiento de una disrupción de vuelo.',
    roleIds: ['supervisor'],
    userLinked: true,
    userLinkMode: 'locked-on',
  },
  {
    id: 'threat',
    title: 'Amenaza detectada',
    description: 'Se detectó lenguaje inapropiado o contenido de riesgo en una conversación.',
    roleIds: ['admin', 'supervisor'],
    userLinked: false,
    userLinkMode: 'locked-off',
  },
];

const meta: Meta<typeof Notifications> = {
  title: 'Components/Notifications',
  component: Notifications,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Notifications>;

export const Default: Story = {
  render: () => ({
    components: { Notifications },
    setup() {
      const items = ref(seed.map((item) => ({ ...item, roleIds: [...item.roleIds] })));
      return { items, roles };
    },
    template: `
      <div class="bg-[color:var(--kiut-bg-primary)] p-6">
        <Notifications v-model:items="items" :roles="roles" />
      </div>
    `,
  }),
};
