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
          'Marco de vista con tres slots: **#description** (título, texto, filtros u otra información a la izquierda), **#actions** (acciones alineadas a la derecha en la misma fila) y **#content** o slot por defecto (cuerpo debajo). La primera fila usa `justify-between` en `sm+`. Usa la toolbar **Theme** para revisar claro/oscuro.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: () => ({
    components: { Section, Button, BuildingStorefrontIcon },
    template: `
      <div class="rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-6 dark:bg-[#1a1a1d]">
        <Section>
          <template #description>
            <div class="flex min-w-0 items-center gap-2.5">
              <span class="inline-flex shrink-0 items-center text-[color:var(--kiut-text-primary)] dark:text-slate-100 [&>svg]:size-6" aria-hidden="true">
                <BuildingStorefrontIcon />
              </span>
              <div class="min-w-0">
                <h2 class="text-3xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100">
                  Puntos de Venta
                </h2>
                <p class="mt-1.5 text-base leading-snug text-[color:var(--kiut-text-secondary)] dark:text-[#838395]">
                  Administra los puntos de venta y dispositivos asociados.
                </p>
              </div>
            </div>
          </template>
          <template #actions>
            <Button variant="primary" type="button">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M12 5v14M5 12h14"/></svg>
              </template>
              Agregar punto de venta
            </Button>
          </template>
          <template #content>
            <div class="rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] p-4 text-sm text-[color:var(--kiut-text-secondary)] dark:bg-black/20 dark:text-slate-400">
              Slot de contenido: filtros, tablas, formularios, etc.
            </div>
          </template>
        </Section>
      </div>
    `,
  }),
};

export const DescripcionConSlotDeIcono: Story = {
  render: () => ({
    components: { Section, BuildingStorefrontIcon },
    template: `
      <div class="rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-6 dark:bg-[#1a1a1d]">
        <Section>
          <template #description>
            <div class="flex min-w-0 items-start gap-2.5">
              <span class="inline-flex shrink-0 items-center text-[color:var(--kiut-text-primary)] dark:text-slate-100 [&>svg]:size-6" aria-hidden="true">
                <BuildingStorefrontIcon />
              </span>
              <div class="min-w-0">
                <h2 class="text-3xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100">
                  Con icono en la descripción
                </h2>
                <p class="mt-1.5 text-base text-[color:var(--kiut-text-secondary)] dark:text-[#838395]">
                  El icono y el texto viven dentro del slot <code class="rounded bg-black/5 px-1 py-0.5 text-sm dark:bg-white/10">#description</code>.
                </p>
              </div>
            </div>
          </template>
          <template #content>
            <p class="text-sm text-[color:var(--kiut-text-secondary)] dark:text-slate-400">Contenido principal.</p>
          </template>
        </Section>
      </div>
    `,
  }),
};

export const SoloDescripcionYContenido: Story = {
  render: () => ({
    components: { Section },
    template: `
      <div class="rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-6 dark:bg-[#1a1a1d]">
        <Section>
          <template #description>
            <div class="min-w-0">
              <h2 class="text-3xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100">
                Solo título y subtítulo
              </h2>
              <p class="mt-1.5 text-base text-[color:var(--kiut-text-secondary)] dark:text-[#838395]">
                Sin acciones en la cabecera.
              </p>
            </div>
          </template>
          <p class="text-sm text-[color:var(--kiut-text-secondary)] dark:text-slate-400">Contenido con slot por defecto (sin <code class="rounded bg-black/5 px-1 dark:bg-white/10">#content</code>).</p>
        </Section>
      </div>
    `,
  }),
};
