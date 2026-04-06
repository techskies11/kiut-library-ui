import type { Meta, StoryObj } from '@storybook/vue3';
import { BuildingStorefrontIcon } from '@heroicons/vue/24/outline';
import Button from '../Button/Button.vue';
import Section from './Section.vue';

const meta: Meta<typeof Section> = {
  title: 'Components/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Cabecera de vista reutilizable: **title**, **subtitle** opcional, **icon** (componente o slot `#icon`), acciones en `#actions` y cuerpo en el slot por defecto. Usa la toolbar **Theme** para revisar claro/oscuro.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    title: 'Puntos de Venta',
    subtitle: 'Administra los puntos de venta y dispositivos asociados.',
    icon: BuildingStorefrontIcon,
  },
  render: (args) => ({
    components: { Section, Button, BuildingStorefrontIcon },
    setup() {
      return { args };
    },
    template: `
      <div class="rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-6 dark:border-white/[0.08] dark:bg-[#1a1a1d]">
        <Section v-bind="args">
          <template #actions>
            <Button variant="primary" type="button">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M12 5v14M5 12h14"/></svg>
              </template>
              Agregar punto de venta
            </Button>
          </template>
          <div class="rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] p-4 text-sm text-[color:var(--kiut-text-secondary)] dark:border-white/[0.08] dark:bg-black/20 dark:text-slate-400">
            Slot de contenido: filtros, tablas, formularios, etc.
          </div>
        </Section>
      </div>
    `,
  }),
};

export const IconSlot: Story = {
  args: {
    title: 'Con slot de icono',
    subtitle: 'El slot #icon sustituye la prop icon si ambos existen.',
  },
  render: (args) => ({
    components: { Section, BuildingStorefrontIcon },
    setup() {
      return { args };
    },
    template: `
      <div class="rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-6 dark:border-white/[0.08] dark:bg-[#1a1a1d]">
        <Section v-bind="args">
          <template #icon>
            <BuildingStorefrontIcon />
          </template>
          <p class="text-sm text-[color:var(--kiut-text-secondary)] dark:text-slate-400">Contenido principal.</p>
        </Section>
      </div>
    `,
  }),
};

export const SinIcono: Story = {
  args: {
    title: 'Solo título y subtítulo',
    subtitle: 'Sin icono ni acciones.',
  },
  render: (args) => ({
    components: { Section },
    setup() {
      return { args };
    },
    template: `
      <div class="rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-6 dark:border-white/[0.08] dark:bg-[#1a1a1d]">
        <Section v-bind="args">
          <p class="text-sm text-[color:var(--kiut-text-secondary)] dark:text-slate-400">Contenido.</p>
        </Section>
      </div>
    `,
  }),
};
