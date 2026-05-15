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

export const ConFiltros: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Usa el slot **#filters** para colocar inputs o selects de filtrado encima de las acciones, alineados a la derecha.',
      },
    },
  },
  render: () => ({
    components: { Section, Button },
    template: `
      <div class="rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-6 dark:bg-[#1a1a1d]">
        <Section>
          <template #description>
            <div class="min-w-0">
              <h2 class="text-3xl font-semibold leading-tight tracking-tight text-[color:var(--kiut-text-primary)] dark:text-slate-100">
                Con filtros y acciones
              </h2>
              <p class="mt-1.5 text-base text-[color:var(--kiut-text-secondary)] dark:text-[#838395]">
                El slot <code class="rounded bg-black/5 px-1 dark:bg-white/10">#filters</code> aparece sobre las acciones, ambos alineados a la derecha.
              </p>
            </div>
          </template>
          <template #filters>
            <input
              type="text"
              placeholder="Buscar..."
              class="rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] px-3 py-1.5 text-sm text-[color:var(--kiut-text-primary)] outline-none focus:ring-2 focus:ring-[color:var(--kiut-primary)]/30 dark:bg-black/20 dark:text-slate-100"
            />
            <select class="rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] px-3 py-1.5 text-sm text-[color:var(--kiut-text-primary)] dark:bg-black/20 dark:text-slate-100">
              <option>Todos los estados</option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </template>
          <template #actions>
            <Button variant="primary" type="button">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M12 5v14M5 12h14"/></svg>
              </template>
              Agregar
            </Button>
          </template>
          <template #content>
            <div class="rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] p-4 text-sm text-[color:var(--kiut-text-secondary)] dark:bg-black/20 dark:text-slate-400">
              Contenido de la sección.
            </div>
          </template>
        </Section>
      </div>
    `,
  }),
};

export const SoloFiltros: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Solo el slot **#filters** sin descripción ni acciones.',
      },
    },
  },
  render: () => ({
    components: { Section },
    template: `
      <div class="rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-6 dark:bg-[#1a1a1d]">
        <Section>
          <template #filters>
            <input
              type="text"
              placeholder="Buscar..."
              class="rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] px-3 py-1.5 text-sm text-[color:var(--kiut-text-primary)] outline-none focus:ring-2 focus:ring-[color:var(--kiut-primary)]/30 dark:bg-black/20 dark:text-slate-100"
            />
            <select class="rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] px-3 py-1.5 text-sm text-[color:var(--kiut-text-primary)] dark:bg-black/20 dark:text-slate-100">
              <option>Todos</option>
              <option>Activo</option>
            </select>
          </template>
          <template #content>
            <div class="rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] p-4 text-sm text-[color:var(--kiut-text-secondary)] dark:bg-black/20 dark:text-slate-400">
              Contenido de la sección.
            </div>
          </template>
        </Section>
      </div>
    `,
  }),
};

export const FiltrosYAcciones: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Solo **#filters** y **#actions** sin descripción. Los filtros quedan a la izquierda y el botón a la derecha en la misma fila.',
      },
    },
  },
  render: () => ({
    components: { Section, Button },
    template: `
      <div class="rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-6 dark:bg-[#1a1a1d]">
        <Section>
          <template #filters>
            <input
              type="text"
              placeholder="Buscar..."
              class="rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] px-3 py-1.5 text-sm text-[color:var(--kiut-text-primary)] outline-none focus:ring-2 focus:ring-[color:var(--kiut-primary)]/30 dark:bg-black/20 dark:text-slate-100"
            />
            <select class="rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] px-3 py-1.5 text-sm text-[color:var(--kiut-text-primary)] dark:bg-black/20 dark:text-slate-100">
              <option>Todos los estados</option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </template>
          <template #actions>
            <Button variant="primary" type="button">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M12 5v14M5 12h14"/></svg>
              </template>
              Agregar
            </Button>
          </template>
          <template #content>
            <div class="rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] p-4 text-sm text-[color:var(--kiut-text-secondary)] dark:bg-black/20 dark:text-slate-400">
              Contenido de la sección.
            </div>
          </template>
        </Section>
      </div>
    `,
  }),
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
    docs: {
      description: {
        story:
          'Vista en móvil (≈ 390 px). El encabezado apila descripción, filtros y acciones en columna. Los filtros se expanden al ancho completo y el botón ocupa toda la fila.',
      },
    },
  },
  render: () => ({
    components: { Section, Button, BuildingStorefrontIcon },
    template: `
      <div class="min-h-screen bg-[color:var(--kiut-bg-primary)] dark:bg-black p-4">
        <div class="rounded-2xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-secondary)] p-4 dark:bg-[#1a1a1d]">
          <Section>
            <template #filters>
              <input
                type="text"
                placeholder="Buscar..."
                class="w-full rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] outline-none focus:ring-2 focus:ring-[color:var(--kiut-primary)]/30 dark:bg-black/20 dark:text-slate-100"
              />
              <select class="w-full rounded-lg border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] px-3 py-2 text-sm text-[color:var(--kiut-text-primary)] dark:bg-black/20 dark:text-slate-100">
                <option>Todos los estados</option>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </template>

            <template #actions>
              <Button variant="primary" type="button" class="w-full justify-center">
                <template #icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 5v14M5 12h14"/></svg>
                </template>
                Agregar punto de venta
              </Button>
            </template>

            <template #content>
              <div class="space-y-3">
                <div
                  v-for="(item, i) in [
                    { name: 'Caja Central', status: 'Activo', devices: 3 },
                    { name: 'Terminal Norte', status: 'Inactivo', devices: 1 },
                    { name: 'Mostrador 2', status: 'Activo', devices: 2 },
                  ]"
                  :key="i"
                  class="flex items-center justify-between rounded-xl border border-[color:var(--kiut-border-light)] bg-[color:var(--kiut-bg-primary)] p-3 dark:bg-black/20"
                >
                  <div class="min-w-0">
                    <p class="truncate text-sm font-medium text-[color:var(--kiut-text-primary)] dark:text-slate-100">{{ item.name }}</p>
                    <p class="mt-0.5 text-xs text-[color:var(--kiut-text-secondary)] dark:text-[#838395]">{{ item.devices }} dispositivo{{ item.devices !== 1 ? 's' : '' }}</p>
                  </div>
                  <span
                    :class="item.status === 'Activo'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-700/40 dark:text-slate-400'"
                    class="ml-3 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
                  >
                    {{ item.status }}
                  </span>
                </div>
              </div>
            </template>
          </Section>
        </div>
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
