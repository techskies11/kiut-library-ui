<template>
  <CardMetric
    label="Average Resolution Time"
    :value="aiFormattedValue"
    :tooltip="tooltip"
    :loading="loading"
    :theme="theme"
    ref="cardMetricRef"
  >
    <template #icon>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </template>

    <template #value>
      <div :class="['art-values', { 'art-values--dark': isDark }]">
        <div class="art-values__item">
          <span class="art-values__number">{{ aiFormattedValue }}</span>
          <span class="art-values__label">AI Agent</span>
        </div>
        <div class="art-values__divider" aria-hidden="true" />
        <div class="art-values__item">
          <span class="art-values__number">{{ humanFormattedValue }}</span>
          <span class="art-values__label">Human</span>
        </div>
      </div>
    </template>
  </CardMetric>
</template>

<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import CardMetric from '../../Utils/CardMetric/CardMetric.vue'
import { formatDurationSeconds } from '../../formatDuration'
import { useThemeDetection, type Theme } from '../../../../composables/useThemeDetection'

const DEFAULT_TOOLTIP =
  'Average time from the first message to the resolution of each conversation, broken down by resolver: AI Agent vs. Human.'

const props = withDefaults(
  defineProps<{
    /** Average resolution time in seconds for conversations resolved by the AI agent only. */
    aiAgentAvgResolutionTimeSeconds?: number | null
    /** Average resolution time in seconds for conversations resolved by a human agent. */
    humanAvgResolutionTimeSeconds?: number | null
    loading?: boolean
    theme?: Theme
    tooltip?: string
  }>(),
  {
    aiAgentAvgResolutionTimeSeconds: null,
    humanAvgResolutionTimeSeconds: null,
    loading: false,
    theme: undefined,
    tooltip: DEFAULT_TOOLTIP,
  },
)

const cardMetricRef = ref<InstanceType<typeof CardMetric> | null>(null)
const { isDark } = useThemeDetection(toRef(props, 'theme'))

const aiFormattedValue = computed(() => formatDurationSeconds(props.aiAgentAvgResolutionTimeSeconds))
const humanFormattedValue = computed(() => formatDurationSeconds(props.humanAvgResolutionTimeSeconds))

defineExpose({ isDark })
</script>

<style scoped>
.art-values {
  display: flex;
  align-items: stretch;
  gap: 16px;
  width: 100%;
}

.art-values__item {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 6px;
  min-width: 0;
}

.art-values__number {
  font-family:
    'Inter',
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--kiut-text-primary);
  white-space: nowrap;
}

.art-values__label {
  font-family:
    'Inter',
    var(--kiut-font-ui, ui-sans-serif, system-ui, sans-serif);
  font-size: 11px;
  font-weight: 600;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #9191a1;
  white-space: nowrap;
}

.art-values__divider {
  width: 1px;
  align-self: stretch;
  background: rgba(148, 163, 184, 0.35);
}

.art-values--dark .art-values__divider {
  background: rgba(148, 163, 184, 0.2);
}
</style>
