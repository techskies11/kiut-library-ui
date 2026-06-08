<template>
  <details
    v-if="collapsible"
    class="chart-metric-container metric-collapsible"
    :open="isOpen"
    @toggle="onToggle"
  >
    <summary class="card-header metric-collapsible__summary">
      <div class="header-content metric-header-content">
        <div class="metric-header-content__main">
          <div class="metric-header-content__text">
            <Transition name="chart-metric-fade" mode="out-in">
              <div
                v-if="loading"
                key="header-skeleton"
                class="ut-skeleton-blink ut-skeleton-collapsible-title"
                aria-hidden="true"
                aria-busy="true"
              />
              <div v-else key="header-content" class="metric-header-content__loaded">
                <slot name="title">
                  <h3 v-if="title" class="card-title">{{ title }}</h3>
                </slot>
                <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
                <slot name="headerAppend" />
              </div>
            </Transition>
          </div>
          <div v-if="showHeaderExport" class="metric-header-content__export">
            <slot name="headerExport" />
          </div>
        </div>
        <div v-if="$slots.headerAside" class="cmc-header-aside">
          <slot name="headerAside" />
        </div>
      </div>
      <svg
        class="metric-collapsible__chevron"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </summary>

    <div class="chart-metric-container__body">
      <slot />
    </div>
  </details>

  <div v-else class="chart-metric-container chart-metric-container--static">
    <div class="card-header">
      <div class="header-content metric-header-content">
        <div class="metric-header-content__main">
          <div class="metric-header-content__text">
            <Transition name="chart-metric-fade" mode="out-in">
              <div
                v-if="loading"
                key="header-skeleton"
                class="ut-skeleton-container"
                aria-hidden="true"
                aria-busy="true"
              >
                <div class="ut-skeleton-title-subtitle">
                  <div class="ut-skeleton-blink ut-skeleton-title" />
                  <div class="ut-skeleton-blink ut-skeleton-subtitle" />
                </div>
                <div class="ut-skeleton-blink ut-skeleton-options" />
              </div>
              <div v-else key="header-content" class="metric-header-content__loaded">
                <slot name="title">
                  <h3 v-if="title" class="card-title">{{ title }}</h3>
                </slot>
                <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
                <slot name="headerAppend" />
              </div>
            </Transition>
          </div>
          <div v-if="showHeaderExport" class="metric-header-content__export">
            <slot name="headerExport" />
          </div>
        </div>
        <div v-if="$slots.headerAside" class="cmc-header-aside">
          <slot name="headerAside" />
        </div>
      </div>
    </div>

    <div class="chart-metric-container__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Comment, computed, ref, useSlots, watch, type VNode } from "vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    collapsible?: boolean;
    defaultOpen?: boolean;
    loading?: boolean;
  }>(),
  {
    title: "",
    collapsible: true,
    defaultOpen: false,
    loading: false,
  },
);

const isOpen = ref(props.defaultOpen);

const slots = useSlots();

function slotHasVisibleContent(vnodes: VNode[]): boolean {
  return vnodes.some((vnode) => {
    if (vnode.type === Comment) return false;
    if (vnode.type === Text) {
      const children = vnode.children;
      return typeof children === "string" && children.trim().length > 0;
    }
    return Boolean(vnode.type);
  });
}

/** Export en cabecera: slot siempre montado; visibilidad según contenido y estado colapsable */
const showHeaderExport = computed(() => {
  if (props.collapsible && !isOpen.value) return false;
  const render = slots.headerExport;
  if (!render) return false;
  return slotHasVisibleContent(render());
});

watch(
  () => props.defaultOpen,
  (value) => {
    if (props.collapsible) {
      isOpen.value = value;
    }
  },
);

function onToggle(event: Event): void {
  const el = event.currentTarget as HTMLDetailsElement | null;
  if (el?.tagName === "DETAILS") {
    isOpen.value = el.open;
  }
}
</script>

<style scoped>
@import "../ut-shared.css";
@import "../../BusinessMetrics/metric-collapsible.css";

.chart-metric-container {
  font-family:
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif), "Inter",
    sans-serif;
  background-color: var(--kiut-bg-card, #ffffff);
  border-radius: 0.75rem;
  padding: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow-x: clip;
  overflow-y: visible;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: stretch;
  min-height: 0;
}

.dark .chart-metric-container,
.dark details.chart-metric-container.metric-collapsible {
  background-color: #1a1a23;
  border-color: #2d2d39;
}

/*
 * metric-collapsible usa 28×32 abiertos y 0+padding en summary cerrados.
 * Un solo bloque con mayor especificidad y orden posterior al @import asegura
 * el mismo inset que el estado cerrado (12×16) también cuando está abierto.
 */
details.chart-metric-container.metric-collapsible {
  interpolate-size: allow-keywords;
  padding: 12px 16px;
  min-height: 0;
  /* Misma lectura visual que modo estático */
  border: 1px solid #d9d9dd;
}

details.chart-metric-container.metric-collapsible:not([open])
  .metric-collapsible__summary {
  padding-block: 0;
  padding-inline: 0;
  min-height: 0;
}

/*
 * Abrir no debe mover el título ni la flecha: sin cambio de line-height abierto/cerrado
 * (metric-collapsible usa 1.2 solo cerrado) y chevron alineado a la 1.ª línea, no al centro
 * del bloque cuando aparece el subtítulo.
 */
details.chart-metric-container.metric-collapsible .metric-collapsible__summary {
  align-items: flex-start;
}

details.chart-metric-container.metric-collapsible .metric-collapsible__chevron {
  margin-top: 0.15em;
}

details.chart-metric-container.metric-collapsible
  .metric-collapsible__summary
  .card-title {
  line-height: 1.75rem;
}

/*
 * Apertura/cierre suave: ::details-content (Chrome 131+, Safari 17.2+, etc.).
 * Fallback: solo fade-in al abrir si no hay soporte.
 */
details.chart-metric-container.metric-collapsible::details-content {
  height: 0;
  overflow: hidden;
  opacity: 0;
  transition:
    height 0.28s cubic-bezier(0.33, 1, 0.68, 1),
    opacity 0.22s ease-out,
    content-visibility 0.28s allow-discrete;
}

details.chart-metric-container.metric-collapsible[open]::details-content {
  height: auto;
  opacity: 1;
}

@supports not (selector(details::details-content)) {
  details.chart-metric-container.metric-collapsible[open]
    .chart-metric-container__body {
    animation: cmcBodyEnter 0.24s ease-out both;
  }
}

@media (prefers-reduced-motion: reduce) {
  details.chart-metric-container.metric-collapsible::details-content {
    transition: none;
  }

  details.chart-metric-container.metric-collapsible[open]::details-content,
  details.chart-metric-container.metric-collapsible:not(
      [open]
    )::details-content {
    opacity: 1;
  }

  details.chart-metric-container.metric-collapsible[open]
    .chart-metric-container__body {
    animation: none;
  }

  .chart-metric-container--static .chart-metric-container__body {
    animation: none;
  }
}

.chart-metric-container--static {
  box-sizing: border-box;
  color: var(--kiut-text-primary);
  border: 1px solid #d9d9dd;
}

.card-header {
  margin-bottom: 8px;
  position: relative;
  text-align: left;
}

.header-content {
  width: 100%;
  text-align: left;
}

.metric-header-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.metric-header-content__main {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  flex: 1 1 auto;
  min-width: 0;
  text-align: left;
}

.metric-header-content__text {
  flex: 1 1 auto;
  min-width: 0;
  text-align: left;
}

.metric-header-content__export {
  flex-shrink: 0;
  align-self: flex-start;
  padding-top: 0.1em;
}

.cmc-header-aside {
  flex-shrink: 0;
}

.chart-metric-container .card-title {
  font-family:
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif), "Inter",
    sans-serif;
  margin: 0;
  letter-spacing: -0.02em;
  background: none;
  -webkit-background-clip: unset;
  background-clip: unset;
  -webkit-text-fill-color: unset;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

/* Violeta marca solo cuando no es colapsable (p. ej. AWSCost, NPS Overview con collapsible=false) */
.chart-metric-container--static .card-title {
  color: var(--kiut-primary, #8b5cf6);
}

.chart-metric-container .card-subtitle,
details.chart-metric-container.metric-collapsible
  .metric-collapsible__summary
  .card-subtitle {
  font-size: 0.875rem;
  font-weight: 400;
  color: #61616b;
  margin: 0;
  line-height: 1.25rem;
}

.dark .chart-metric-container .card-subtitle,
.dark
  details.chart-metric-container.metric-collapsible
  .metric-collapsible__summary
  .card-subtitle {
  color: #9191a1;
}

.chart-metric-container__body {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

details.chart-metric-container.metric-collapsible
  .chart-metric-container__body {
  animation: none;
}

.chart-metric-container--static .chart-metric-container__body {
  animation: cmcBodyEnter 0.28s ease-out;
}

@keyframes cmcBodyEnter {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .card-title {
    font-size: 1rem;
  }

  .card-subtitle {
    font-size: 13px;
  }

  .card-header {
    margin-bottom: 8px;
  }
}

.ut-skeleton-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.ut-skeleton-title-subtitle {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.ut-skeleton-title {
  height: 22px;
  width: 38%;
  margin-bottom: 8px;
}

.ut-skeleton-subtitle {
  height: 20px;
  width: 56%;
}

.ut-skeleton-options {
  height: 50px;
  width: 15%;
}

.ut-skeleton-collapsible-title {
  height: 22px;
  width: 38%;
}

.metric-header-content__loaded {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.chart-metric-fade-enter-active,
.chart-metric-fade-leave-active {
  transition: opacity 0.2s ease;
}

.chart-metric-fade-enter-from,
.chart-metric-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .chart-metric-fade-enter-active,
  .chart-metric-fade-leave-active {
    transition: none;
  }
}
</style>
