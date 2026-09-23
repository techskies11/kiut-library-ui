<template>
  <ChartMetricContainer
    :collapsible="false"
    :class="[
      'card-metric',
      'w-full',
      {
        'card-metric--dark': isDark,
        'card-metric--label-header': labelInHeader,
        'card-metric--with-details': hasDetails,
      },
    ]"
  >
    <template #title>
      <Transition name="card-metric-fade" mode="out-in">
        <div
          v-if="loading"
          key="title-skeleton"
          class="header-title-group"
          aria-hidden="true"
        >
          <div class="ut-skeleton-blink skeleton-icon" />
          <div
            v-if="labelInHeader"
            class="ut-skeleton-blink skeleton-header-label"
          />
        </div>
        <div v-else key="title-content" class="header-title-group">
          <div class="icon-wrapper" aria-hidden="true">
            <slot name="icon" />
          </div>
          <span v-if="labelInHeader" class="metric-label metric-label--header">
            <span class="metric-label-text">{{ label }}</span>
            <CardMetricInfo
              v-if="tooltipText"
              :title="tooltipHeading"
              :text="tooltipText"
              :dark="isDark"
            />
          </span>
        </div>
      </Transition>
    </template>

    <template #headerAside>
      <Transition name="card-metric-fade" mode="out-in">
        <div
          v-if="loading"
          key="aside-skeleton"
          class="ut-skeleton-blink skeleton-badge"
          aria-hidden="true"
        />
        <div v-else key="aside-content">
          <slot name="headerAside">
            <div
              v-if="hasPreviousData"
              :class="['change-badge', changeBadgeClass]"
            >
              {{ changeLabel }}
            </div>
          </slot>
        </div>
      </Transition>
    </template>

    <Transition name="card-metric-fade" mode="out-in">
      <div
        v-if="loading"
        key="body-skeleton"
        class="skeleton-body"
        aria-busy="true"
        aria-label="Loading metric"
      >
        <div class="ut-skeleton-blink skeleton-value" />
        <div v-if="!labelInHeader" class="ut-skeleton-blink skeleton-label" />
      </div>

      <div v-else key="body-content" class="highlight-inner">
        <div class="card-body">
          <slot name="value">
            <div class="metric-row">
              <span v-if="prefix" class="metric-prefix">{{ prefix }}</span>
              <span
                :class="[
                  'metric-value',
                  { 'metric-value--large': valueSize === 'large' },
                ]"
              >
                {{ value }}
              </span>
            </div>
          </slot>

          <div v-if="!labelInHeader" class="metric-label-row">
            <div class="metric-label metric-label--row">
              <div class="metric-info">
                <span class="metric-label-text">{{ label }}</span>
                <CardMetricInfo
                  v-if="tooltipText"
                  :title="tooltipHeading"
                  :text="tooltipText"
                  :dark="isDark"
                />
              </div>
              <button
                v-if="hasDetails"
                type="button"
                class="details-toggle"
                :class="{ 'details-toggle--open': detailsOpen }"
                :aria-expanded="detailsOpen"
                :aria-label="detailsOpen ? 'Hide details' : 'Show details'"
                @click="toggleDetails"
              >
                <svg
                  class="details-toggle__chevron"
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
              </button>
            </div>
          </div>

          <div v-if="hasDetails && detailsOpen" class="metric-details">
            <slot name="details">
              <div
                v-for="(detail, index) in details"
                :key="`${detail.label}-${index}`"
                class="metric-details__row"
              >
                <span class="metric-details__label">{{ detail.label }}</span>
                <span class="metric-details__value">{{ detail.value }}</span>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, ref, toRef, useSlots, watch } from "vue";
import ChartMetricContainer from "../ChartMetricContainer/ChartMetricContainer.vue";
import {
  useThemeDetection,
  type Theme,
} from "../../../../composables/useThemeDetection";
import CardMetricInfo from "./CardMetricInfo.vue";

export interface CardMetricDetail {
  label: string;
  value: string;
}

const props = withDefaults(
  defineProps<{
    label: string;
    value: string;
    prefix?: string;
    /** Ubicación de la etiqueta: bajo el valor (default) o en la fila del header junto al icono. */
    labelPosition?: "below" | "header";
    /** Tamaño del valor principal. */
    valueSize?: "default" | "large";
    /** Descripción del KPI. Si se informa, muestra el icono de info junto a la etiqueta. */
    tooltip?: string;
    /** Título del tooltip. Por defecto usa `label`. */
    tooltipTitle?: string;
    /** Filas opcionales de desglose bajo el valor principal. */
    details?: CardMetricDetail[];
    /** Estado inicial del panel de desglose. */
    detailsDefaultOpen?: boolean;
    loading?: boolean;
    theme?: Theme;
    currentValue?: number;
    previousValue?: number | null;
  }>(),
  {
    prefix: undefined,
    labelPosition: "below",
    valueSize: "default",
    tooltip: undefined,
    tooltipTitle: undefined,
    details: () => [],
    detailsDefaultOpen: false,
    loading: false,
    theme: undefined,
    currentValue: 0,
    previousValue: null,
  },
);

const slots = useSlots();
const detailsOpen = ref(props.detailsDefaultOpen);

const { isDark } = useThemeDetection(toRef(props, "theme"));

const hasDetailsProp = computed(() => (props.details?.length ?? 0) > 0);
const hasDetailsSlot = computed(() => Boolean(slots.details));
const hasDetails = computed(() => hasDetailsProp.value || hasDetailsSlot.value);

watch(
  () => props.detailsDefaultOpen,
  (open) => {
    detailsOpen.value = open;
  },
);

function toggleDetails(): void {
  detailsOpen.value = !detailsOpen.value;
}

const labelInHeader = computed(() => props.labelPosition === "header");

const tooltipText = computed(() => props.tooltip?.trim() || "");

const tooltipHeading = computed(
  () => props.tooltipTitle?.trim() || props.label,
);

const hasPreviousData = computed(
  () => props.previousValue !== null && props.previousValue !== undefined,
);

const changePercent = computed(() => {
  if (!hasPreviousData.value) return 0;
  const previousValue = props.previousValue!;
  if (previousValue === 0) return props.currentValue > 0 ? 100 : 0;
  return ((props.currentValue - previousValue) / previousValue) * 100;
});

const changeLabel = computed(() => {
  const pctValue = changePercent.value;
  if (Number.isNaN(pctValue)) return "-";
  const pct = pctValue.toFixed(1);
  if (pctValue > 0) return `+${pct}%`;
  return `${pct}%`;
});

const changeBadgeClass = computed(() => {
  if (changePercent.value > 0) return "change-badge--up";
  if (changePercent.value < 0) return "change-badge--down";
  return "change-badge--neutral";
});

defineExpose({ isDark, changePercent });
</script>

<style scoped>
@import "../ut-shared.css";

.card-metric {
  gap: 8px;
}

.card-metric :deep(.card-header) {
  margin-bottom: 0;
}

.card-metric :deep(.header-content.metric-header-content) {
  height: 24px;
  align-items: center;
  gap: 8px;
}

.card-metric :deep(.metric-header-content) {
  align-items: center;
}

.card-metric--label-header :deep(.header-content.metric-header-content) {
  height: auto;
  min-height: 24px;
}

.card-metric--label-header .card-body {
  gap: 0;
}

.card-metric--with-details.card-metric--label-header .card-body,
.card-metric--with-details:not(.card-metric--label-header) .card-body {
  gap: 2px;
}

.card-metric--with-details :deep(.card-header) {
  margin-bottom: 2px;
}

.card-metric--with-details .metric-value,
.card-metric--with-details .metric-value--large {
  margin-bottom: 2px;
}

.header-title-group {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  flex: 1;
  gap: 3px;
}

.highlight-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  text-align: left;
}

.icon-wrapper {
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.icon-wrapper :deep(svg) {
  width: 22px;
  height: 22px;
  color: #7c3aed;
}

.card-metric--dark .icon-wrapper :deep(svg) {
  color: #8b5cf6;
}

.change-badge {
  font-family:
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif), "Inter",
    sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
  line-height: 1;
  letter-spacing: 0.01em;
}

.change-badge--up {
  background: #dcfce7;
  color: #166534;
}

.change-badge--down {
  background: #fee2e2;
  color: #b91c1c;
}

.change-badge--neutral {
  background: rgba(148, 163, 184, 0.16);
  color: #64748b;
}

.card-metric--dark .change-badge--up {
  background: rgba(74, 222, 128, 0.14);
  color: #4ade80;
}

.card-metric--dark .change-badge--down {
  background: rgba(251, 113, 133, 0.16);
  color: #fb7185;
}

.card-metric--dark .change-badge--neutral {
  background: rgba(148, 163, 184, 0.12);
  color: #94a3b8;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  text-align: left;
  width: 100%;
}

.metric-row {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  gap: 8px;
  flex-wrap: wrap;
  text-align: left;
}

.metric-prefix {
  font-family:
    "Inter", var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0;
  color: #9191a1;
}

.metric-value {
  font-family:
    "Inter", var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--kiut-text-primary);
}

.metric-value--large {
  font-size: 28px;
  line-height: 1.1;
}

.metric-label {
  font-family:
    "Inter", var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.25;
  color: #61616b;
}

.metric-info {
  display: flex;
  justify-content: row;
  gap: 5px;
}

.metric-label-row {
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
}

.metric-label--row {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  justify-content: space-between;
}

.metric-label--row .metric-label-text {
  font-size: 12px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.details-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  margin-left: 2px;
  padding: 0;
  border: none;
  background: transparent;
  color: #9191a1;
  cursor: pointer;
}

.details-toggle:hover {
  color: #61616b;
}

.details-toggle:focus-visible {
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
  border-radius: 4px;
}

.details-toggle__chevron {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.details-toggle--open .details-toggle__chevron {
  transform: rotate(180deg);
}

.card-metric--dark .details-toggle {
  color: #71717a;
}

.card-metric--dark .details-toggle:hover {
  color: #a1a1aa;
}

.metric-details {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  margin-top: 6px;
  padding-top: 8px;
  border-top: 1px solid #e4e4e7;
}

.card-metric--dark .metric-details {
  border-top-color: #2d2d39;
}

.metric-details__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}

.metric-details__label {
  font-family:
    "Inter", var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.25;
  color: #61616b;
}

.metric-details__value {
  font-family:
    "Inter", var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 12px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--kiut-text-primary);
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.card-metric--dark .metric-details__label {
  color: #9191a1;
}

.metric-label--header {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.metric-label-text {
  font-size: 12px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-metric--dark .metric-label--header {
  color: #9191a1;
}

.skeleton-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  text-align: left;
}

.skeleton-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 8px;
}

.skeleton-header-label {
  flex: 1;
  min-width: 0;
  height: 14px;
  border-radius: 6px;
}

.skeleton-badge {
  width: 72px;
  height: 24px;
  border-radius: 999px;
}

.skeleton-value {
  width: 55%;
  height: 29px;
}

.skeleton-label {
  width: 38%;
  height: 15px;
}

.card-metric-fade-enter-active,
.card-metric-fade-leave-active {
  transition: opacity 0.2s ease;
}

.card-metric-fade-enter-from,
.card-metric-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .card-metric-fade-enter-active,
  .card-metric-fade-leave-active {
    transition: none;
  }

  .details-toggle__chevron {
    transition: none;
  }
}
</style>
