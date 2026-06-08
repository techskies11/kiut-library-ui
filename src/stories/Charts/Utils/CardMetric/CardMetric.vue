<template>
  <ChartMetricContainer
    :collapsible="false"
    :class="['card-metric', 'w-full', { 'card-metric--dark': isDark }]"
  >
    <template #title>
      <Transition name="card-metric-fade" mode="out-in">
        <div
          v-if="loading"
          key="title-skeleton"
          class="ut-skeleton-blink skeleton-icon"
          aria-hidden="true"
        />
        <div v-else key="title-content" class="header-title-group">
          <div class="icon-wrapper" aria-hidden="true">
            <slot name="icon" />
          </div>
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
        <div class="ut-skeleton-blink skeleton-label" />
      </div>

      <div v-else key="body-content" class="highlight-inner">
        <div class="card-body">
          <slot name="value">
            <div class="metric-row">
              <span v-if="prefix" class="metric-prefix">{{ prefix }}</span>
              <span :class="['metric-value', valueSize === 'large' ? 'metric-value--large' : '']">
                {{ value }}
              </span>
            </div>
          </slot>
          <span class="metric-label">{{ label }}</span>
        </div>
      </div>
    </Transition>
  </ChartMetricContainer>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import ChartMetricContainer from '../ChartMetricContainer/ChartMetricContainer.vue'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

const props = withDefaults(
  defineProps<{
    label: string
    value: string
    prefix?: string
    valueSize?: 'default' | 'large'
    loading?: boolean
    theme?: Theme
    currentValue?: number
    previousValue?: number | null
  }>(),
  {
    prefix: undefined,
    valueSize: 'default',
    loading: false,
    theme: undefined,
    currentValue: 0,
    previousValue: null,
  },
)

const { isDark } = useThemeDetection(toRef(props, 'theme'))

const hasPreviousData = computed(
  () => props.previousValue !== null && props.previousValue !== undefined,
)

const changePercent = computed(() => {
  if (!hasPreviousData.value) return 0
  const previousValue = props.previousValue!
  if (previousValue === 0) return props.currentValue > 0 ? 100 : 0
  return ((props.currentValue - previousValue) / previousValue) * 100
})

const changeLabel = computed(() => {
  const pct = changePercent.value.toFixed(1)
  if (changePercent.value > 0) return `+${pct}%`
  return `${pct}%`
})

const changeBadgeClass = computed(() => {
  if (changePercent.value > 0) return 'change-badge--up'
  if (changePercent.value < 0) return 'change-badge--down'
  return 'change-badge--neutral'
})

defineExpose({ isDark, changePercent })
</script>

<style scoped>
@import '../ut-shared.css';

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

.header-title-group {
  display: inline-flex;
  align-items: center;
  min-width: 0;
}

.highlight-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  text-align: left;
}

.icon-wrapper {
  width: 24px;
  height: 24px;
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
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif),
    'Inter',
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
  background: #162d24;
  color: #4ade80;
}

.card-metric--dark .change-badge--down {
  background: #3f1d20;
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
  font-family: 'Inter', var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0;
  color: #9191a1;
}

.metric-value {
  font-family:
    'Inter',
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
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
    'Inter',
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.25;
  color: #61616b;
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
  border-radius: 8px;
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
}
</style>
