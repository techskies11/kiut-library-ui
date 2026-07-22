<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref } from 'vue';
import type {
  KiutTranslationCountBadgeItem,
  KiutTranslationCountBadgeVariant,
} from './translationCountBadgeTypes';

defineOptions({ name: 'TranslationCountBadge' });

const TOOLTIP_GAP = 8;
const VIEWPORT_PADDING = 12;

const props = withDefaults(
  defineProps<{
    /** Badge text shown on the trigger (e.g. "2 Configured"). */
    label: string;
    /** Tooltip heading (e.g. "Configured languages"). */
    tooltipTitle: string;
    /** Items listed inside the tooltip. */
    items: KiutTranslationCountBadgeItem[];
    variant: KiutTranslationCountBadgeVariant;
    pulse?: boolean;
  }>(),
  {
    pulse: false,
  }
);

const showTooltip = ref(false);
const placement = ref<'top' | 'bottom'>('top');
const tooltipStyle = ref<{ top: string; left: string }>({
  top: '0px',
  left: '0px',
});
const triggerRef = ref<HTMLElement | null>(null);
const tooltipRef = ref<HTMLElement | null>(null);

const badgeClass = computed(() => {
  const base =
    'whitespace-nowrap rounded-md px-2 py-0.5 text-xs cursor-default font-[\'Inter\',system-ui,sans-serif]';
  if (props.variant === 'configured') {
    return `${base} border border-purple-300 text-purple-700 dark:border-purple-700/50 dark:text-purple-400`;
  }
  if (props.variant === 'autoconfigured') {
    return `${base} border border-dashed border-green-400 text-green-600 dark:border-green-600 dark:text-green-400`;
  }
  return `${base} border border-gray-500/40 text-gray-500 dark:border-gray-600 dark:text-gray-400`;
});

const pillClass = computed(
  () =>
    `kiut-translation-count-badge__pill kiut-translation-count-badge__pill--${props.variant}`
);

function hideTooltip(): void {
  showTooltip.value = false;
}

function updateTooltipPlacement(): void {
  const trigger = triggerRef.value;
  const tooltip = tooltipRef.value;
  if (!trigger || !tooltip) return;

  const triggerRect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const spaceAbove = triggerRect.top - VIEWPORT_PADDING;
  const spaceBelow = window.innerHeight - triggerRect.bottom - VIEWPORT_PADDING;
  const fitsAbove = spaceAbove >= tooltipRect.height + TOOLTIP_GAP;
  const fitsBelow = spaceBelow >= tooltipRect.height + TOOLTIP_GAP;

  let nextPlacement: 'top' | 'bottom' = 'top';
  if (fitsAbove) {
    nextPlacement = 'top';
  } else if (fitsBelow) {
    nextPlacement = 'bottom';
  } else {
    nextPlacement = spaceBelow >= spaceAbove ? 'bottom' : 'top';
  }

  placement.value = nextPlacement;

  let top =
    nextPlacement === 'top'
      ? triggerRect.top - tooltipRect.height - TOOLTIP_GAP
      : triggerRect.bottom + TOOLTIP_GAP;

  top = Math.max(
    VIEWPORT_PADDING,
    Math.min(top, window.innerHeight - tooltipRect.height - VIEWPORT_PADDING)
  );

  let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
  left = Math.max(
    VIEWPORT_PADDING,
    Math.min(left, window.innerWidth - tooltipRect.width - VIEWPORT_PADDING)
  );

  tooltipStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
  };
}

async function openTooltip(): Promise<void> {
  if (!props.items.length) return;

  showTooltip.value = true;
  await nextTick();

  const tooltip = tooltipRef.value;
  if (!tooltip) return;

  tooltip.style.visibility = 'hidden';
  updateTooltipPlacement();
  tooltip.style.visibility = 'visible';
}

function onScrollOrResize(): void {
  if (!showTooltip.value) return;
  hideTooltip();
}

window.addEventListener('scroll', onScrollOrResize, true);
window.addEventListener('resize', onScrollOrResize);

onUnmounted(() => {
  window.removeEventListener('scroll', onScrollOrResize, true);
  window.removeEventListener('resize', onScrollOrResize);
});
</script>

<template>
  <span
    ref="triggerRef"
    :class="[badgeClass, pulse && 'animate-pulse']"
    @mouseenter="openTooltip"
    @mouseleave="hideTooltip"
    @focus="openTooltip"
    @blur="hideTooltip"
  >
    {{ label }}
  </span>

  <Teleport to="body">
    <div
      v-if="showTooltip && items.length"
      ref="tooltipRef"
      role="tooltip"
      class="kiut-translation-count-badge__tooltip"
      :class="`kiut-translation-count-badge__tooltip--${placement}`"
      :style="{
        position: 'fixed',
        top: tooltipStyle.top,
        left: tooltipStyle.left,
        zIndex: 1100,
      }"
      @mouseenter="openTooltip"
      @mouseleave="hideTooltip"
    >
      <div class="kiut-translation-count-badge__content">
        <span class="kiut-translation-count-badge__title">
          {{ tooltipTitle }}
        </span>
        <div class="kiut-translation-count-badge__pills">
          <span v-for="item in items" :key="item.id" :class="pillClass">
            {{ item.label }}
            <span
              v-if="item.note"
              class="kiut-translation-count-badge__pill-note"
            >
              ({{ item.note }})
            </span>
          </span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
.kiut-translation-count-badge__tooltip {
  width: max-content;
  max-width: min(20rem, calc(100vw - 1.5rem));
  background: rgb(255 255 255);
  border: 1px solid rgb(0 0 0 / 0.08);
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 12px 40px rgb(0 0 0 / 0.12);
  pointer-events: auto;
}

.dark .kiut-translation-count-badge__tooltip {
  background: rgb(15 15 18);
  border-color: rgb(255 255 255 / 0.08);
  box-shadow: 0 12px 40px rgb(0 0 0 / 0.45);
}

.kiut-translation-count-badge__content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.kiut-translation-count-badge__title {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: rgb(17 24 39);
}

.dark .kiut-translation-count-badge__tooltip .kiut-translation-count-badge__title {
  color: rgb(255 255 255);
}

.kiut-translation-count-badge__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.kiut-translation-count-badge__pill {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
  white-space: nowrap;
}

.kiut-translation-count-badge__pill--configured {
  border: 1px solid rgb(168 85 247 / 0.55);
  background: rgb(243 232 255);
  color: rgb(107 33 168);
}

.dark .kiut-translation-count-badge__pill--configured {
  background: rgb(59 7 100 / 0.85);
  color: rgb(233 213 255);
}

.kiut-translation-count-badge__pill--autoconfigured {
  border: 1px dashed rgb(74 222 128 / 0.55);
  background: rgb(220 252 231);
  color: rgb(21 128 61);
}

.dark .kiut-translation-count-badge__pill--autoconfigured {
  background: rgb(5 46 22 / 0.85);
  color: rgb(187 247 208);
}

.kiut-translation-count-badge__pill--neutral {
  border: 1px solid rgb(107 114 128 / 0.45);
  background: rgb(243 244 246);
  color: rgb(55 65 81);
}

.dark .kiut-translation-count-badge__pill--neutral {
  background: rgb(31 41 55 / 0.85);
  color: rgb(209 213 219);
}

.kiut-translation-count-badge__pill-note {
  font-weight: 400;
  opacity: 0.85;
}
</style>
