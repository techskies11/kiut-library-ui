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
          'Marco de vista con tres ku:slots: **#description** (título, texto, filtros u otra información a la izquierda), **#actions** (acciones alineadas a la derecha en la misma fila) y **#content** o slot por defecto (cuerpo debajo). La primera fila usa `justify-between` en `sm+`. Usa la toolbar **Theme** para revisar claro/oscuro.',
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
      <div class="ku:rounded-2xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-secondary)] ku:p-6 ku:dark:bg-[#1a1a1d]">
        <Section>
          <template #description>
            <div class="ku:flex ku:min-w-0 ku:items-center ku:gap-2.5">
              <span class="ku:inline-flex ku:shrink-0 ku:items-center ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100 ku:[&>svg]:size-6" aria-hidden="true">
                <BuildingStorefrontIcon />
              </span>
              <div class="ku:min-w-0">
                <h2 class="ku:text-3xl ku:font-semibold ku:leading-tight ku:tracking-tight ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100">
                  Puntos de Venta
                </h2>
                <p class="ku:mt-1.5 ku:text-base ku:leading-snug ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-[#838395]">
                  Administra los puntos de venta y dispositivos asociados.
                </p>
              </div>
            </div>
          </template>
          <template #actions>
            <Button variant="primary" type="button">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ku:h-5 ku:w-5"><path d="M12 5v14M5 12h14"/></svg>
              </template>
              Agregar punto de venta
            </Button>
          </template>
          <template #content>
            <div class="ku:rounded-xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-primary)] ku:p-4 ku:text-sm ku:text-[color:var(--kiut-text-secondary)] ku:dark:bg-black/20 ku:dark:text-slate-400">
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
      <div class="ku:rounded-2xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-secondary)] ku:p-6 ku:dark:bg-[#1a1a1d]">
        <Section>
          <template #description>
            <div class="ku:flex ku:min-w-0 ku:items-start ku:gap-2.5">
              <span class="ku:inline-flex ku:shrink-0 ku:items-center ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100 ku:[&>svg]:size-6" aria-hidden="true">
                <BuildingStorefrontIcon />
              </span>
              <div class="ku:min-w-0">
                <h2 class="ku:text-3xl ku:font-semibold ku:leading-tight ku:tracking-tight ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100">
                  Con icono en la descripción
                </h2>
                <p class="ku:mt-1.5 ku:text-base ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-[#838395]">
                  El icono y el texto viven dentro del slot <code class="ku:rounded ku:bg-black/5 ku:px-1 ku:py-0.5 ku:text-sm ku:dark:bg-white/10">#description</code>.
                </p>
              </div>
            </div>
          </template>
          <template #content>
            <p class="ku:text-sm ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-slate-400">Contenido principal.</p>
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
      <div class="ku:rounded-2xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-secondary)] ku:p-6 ku:dark:bg-[#1a1a1d]">
        <Section>
          <template #description>
            <div class="ku:min-w-0">
              <h2 class="ku:text-3xl ku:font-semibold ku:leading-tight ku:tracking-tight ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100">
                Con filtros y acciones
              </h2>
              <p class="ku:mt-1.5 ku:text-base ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-[#838395]">
                El slot <code class="ku:rounded ku:bg-black/5 ku:px-1 ku:dark:bg-white/10">#filters</code> aparece sobre las acciones, ambos alineados a la derecha.
              </p>
            </div>
          </template>
          <template #filters>
            <input
              type="text"
              placeholder="Buscar..."
              class="ku:rounded-lg ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-primary)] ku:px-3 ku:py-1.5 ku:text-sm ku:text-[color:var(--kiut-text-primary)] ku:outline-none ku:focus:ring-2 ku:focus:ring-[color:var(--kiut-primary)]/30 ku:dark:bg-black/20 ku:dark:text-slate-100"
            />
            <select class="ku:rounded-lg ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-primary)] ku:px-3 ku:py-1.5 ku:text-sm ku:text-[color:var(--kiut-text-primary)] ku:dark:bg-black/20 ku:dark:text-slate-100">
              <option>Todos los estados</option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </template>
          <template #actions>
            <Button variant="primary" type="button">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ku:h-5 ku:w-5"><path d="M12 5v14M5 12h14"/></svg>
              </template>
              Agregar
            </Button>
          </template>
          <template #content>
            <div class="ku:rounded-xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-primary)] ku:p-4 ku:text-sm ku:text-[color:var(--kiut-text-secondary)] ku:dark:bg-black/20 ku:dark:text-slate-400">
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
      <div class="ku:rounded-2xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-secondary)] ku:p-6 ku:dark:bg-[#1a1a1d]">
        <Section>
          <template #filters>
            <input
              type="text"
              placeholder="Buscar..."
              class="ku:rounded-lg ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-primary)] ku:px-3 ku:py-1.5 ku:text-sm ku:text-[color:var(--kiut-text-primary)] ku:outline-none ku:focus:ring-2 ku:focus:ring-[color:var(--kiut-primary)]/30 ku:dark:bg-black/20 ku:dark:text-slate-100"
            />
            <select class="ku:rounded-lg ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-primary)] ku:px-3 ku:py-1.5 ku:text-sm ku:text-[color:var(--kiut-text-primary)] ku:dark:bg-black/20 ku:dark:text-slate-100">
              <option>Todos</option>
              <option>Activo</option>
            </select>
          </template>
          <template #content>
            <div class="ku:rounded-xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-primary)] ku:p-4 ku:text-sm ku:text-[color:var(--kiut-text-secondary)] ku:dark:bg-black/20 ku:dark:text-slate-400">
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
      <div class="ku:rounded-2xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-secondary)] ku:p-6 ku:dark:bg-[#1a1a1d]">
        <Section>
          <template #filters>
            <input
              type="text"
              placeholder="Buscar..."
              class="ku:rounded-lg ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-primary)] ku:px-3 ku:py-1.5 ku:text-sm ku:text-[color:var(--kiut-text-primary)] ku:outline-none ku:focus:ring-2 ku:focus:ring-[color:var(--kiut-primary)]/30 ku:dark:bg-black/20 ku:dark:text-slate-100"
            />
            <select class="ku:rounded-lg ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-primary)] ku:px-3 ku:py-1.5 ku:text-sm ku:text-[color:var(--kiut-text-primary)] ku:dark:bg-black/20 ku:dark:text-slate-100">
              <option>Todos los estados</option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </template>
          <template #actions>
            <Button variant="primary" type="button">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ku:h-5 ku:w-5"><path d="M12 5v14M5 12h14"/></svg>
              </template>
              Agregar
            </Button>
          </template>
          <template #content>
            <div class="ku:rounded-xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-primary)] ku:p-4 ku:text-sm ku:text-[color:var(--kiut-text-secondary)] ku:dark:bg-black/20 ku:dark:text-slate-400">
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
      <div class="ku:min-h-screen ku:bg-[color:var(--kiut-bg-primary)] ku:dark:bg-black ku:p-4">
        <div class="ku:rounded-2xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-secondary)] ku:p-4 ku:dark:bg-[#1a1a1d]">
          <Section>
            <template #filters>
              <input
                type="text"
                placeholder="Buscar..."
                class="ku:w-full ku:rounded-lg ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-primary)] ku:px-3 ku:py-2 ku:text-sm ku:text-[color:var(--kiut-text-primary)] ku:outline-none ku:focus:ring-2 ku:focus:ring-[color:var(--kiut-primary)]/30 ku:dark:bg-black/20 ku:dark:text-slate-100"
              />
              <select class="ku:w-full ku:rounded-lg ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-primary)] ku:px-3 ku:py-2 ku:text-sm ku:text-[color:var(--kiut-text-primary)] ku:dark:bg-black/20 ku:dark:text-slate-100">
                <option>Todos los estados</option>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </template>

            <template #actions>
              <Button variant="primary" type="button" class="ku:w-full ku:justify-center">
                <template #icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ku:h-4 ku:w-4"><path d="M12 5v14M5 12h14"/></svg>
                </template>
                Agregar punto de venta
              </Button>
            </template>

            <template #content>
              <div class="ku:space-y-3">
                <div
                  v-for="(item, i) in [
                    { name: 'Caja Central', status: 'Activo', devices: 3 },
                    { name: 'Terminal Norte', status: 'Inactivo', devices: 1 },
                    { name: 'Mostrador 2', status: 'Activo', devices: 2 },
                  ]"
                  :key="i"
                  class="ku:flex ku:items-center ku:justify-between ku:rounded-xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-primary)] ku:p-3 ku:dark:bg-black/20"
                >
                  <div class="ku:min-w-0">
                    <p class="ku:truncate ku:text-sm ku:font-medium ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100">{{ item.name }}</p>
                    <p class="ku:mt-0.5 ku:text-xs ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-[#838395]">{{ item.devices }} dispositivo{{ item.devices !== 1 ? 's' : '' }}</p>
                  </div>
                  <span
                    :class="item.status === 'Activo' ? 'ku:bg-emerald-100 ku:text-emerald-700 ku:dark:bg-emerald-900/40 ku:dark:text-emerald-400' : 'ku:bg-slate-100 ku:text-slate-500 ku:dark:bg-slate-700/40 ku:dark:text-slate-400'"
                    class="ku:ml-3 ku:shrink-0 ku:rounded-full ku:px-2.5 ku:py-0.5 ku:text-xs ku:font-medium"
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

export const SoloAcciones: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Solo el slot **#actions** sin descripción ni filtros. El botón se alinea automáticamente a la derecha gracias a `headerRowClass`.',
      },
    },
  },
  render: () => ({
    components: { Section, Button },
    template: `
      <div class="ku:rounded-2xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-secondary)] ku:p-6 ku:dark:bg-[#1a1a1d]">
        <Section>
          <template #actions>
            <Button variant="primary" type="button">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ku:h-5 ku:w-5"><path d="M12 5v14M5 12h14"/></svg>
              </template>
              Agregar
            </Button>
          </template>
          <template #content>
            <div class="ku:rounded-xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-primary)] ku:p-4 ku:text-sm ku:text-[color:var(--kiut-text-secondary)] ku:dark:bg-black/20 ku:dark:text-slate-400">
              Contenido de la sección.
            </div>
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
      <div class="ku:rounded-2xl ku:border ku:border-[color:var(--kiut-border-light)] ku:bg-[color:var(--kiut-bg-secondary)] ku:p-6 ku:dark:bg-[#1a1a1d]">
        <Section>
          <template #description>
            <div class="ku:min-w-0">
              <h2 class="ku:text-3xl ku:font-semibold ku:leading-tight ku:tracking-tight ku:text-[color:var(--kiut-text-primary)] ku:dark:text-slate-100">
                Solo título y subtítulo
              </h2>
              <p class="ku:mt-1.5 ku:text-base ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-[#838395]">
                Sin acciones en la cabecera.
              </p>
            </div>
          </template>
          <p class="ku:text-sm ku:text-[color:var(--kiut-text-secondary)] ku:dark:text-slate-400">Contenido con slot por defecto (sin <code class="ku:rounded ku:bg-black/5 ku:px-1 ku:dark:bg-white/10">#content</code>).</p>
        </Section>
      </div>
    `,
  }),
};
