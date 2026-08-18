<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline';
import { computed, nextTick, onUnmounted, ref } from 'vue'

const TOOLTIP_GAP = 8
const VIEWPORT_PADDING = 12

const props = defineProps<{
  title: string
  text: string
  dark?: boolean
}>()

const showTooltip = ref(false)
const tooltipStyle = ref<{ top: string; left: string }>({
  top: '0px',
  left: '0px',
})
const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)

const triggerClass = computed(() =>
  props.dark
    ? 'bg-[#3e3e4d] hover:bg-[#32323D] focus-visible:ring-[#8b5cf6]/50 focus-visible:ring-offset-[#1a1a23]'
    : 'bg-[#F4F4F5] hover:bg-[#D4C1F5] focus-visible:ring-[#7c3aed]/40',
)

function hideTooltip(): void {
  showTooltip.value = false
}

function updateTooltipPlacement(): void {
  const trigger = triggerRef.value
  const tooltip = tooltipRef.value
  if (!trigger || !tooltip) return

  const triggerRect = trigger.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()
  const spaceAbove = triggerRect.top - VIEWPORT_PADDING
  const spaceBelow = window.innerHeight - triggerRect.bottom - VIEWPORT_PADDING
  const fitsAbove = spaceAbove >= tooltipRect.height + TOOLTIP_GAP
  const fitsBelow = spaceBelow >= tooltipRect.height + TOOLTIP_GAP

  const placeBelow = fitsBelow || (!fitsAbove && spaceBelow >= spaceAbove)

  let top = placeBelow
    ? triggerRect.bottom + TOOLTIP_GAP
    : triggerRect.top - tooltipRect.height - TOOLTIP_GAP

  top = Math.max(
    VIEWPORT_PADDING,
    Math.min(top, window.innerHeight - tooltipRect.height - VIEWPORT_PADDING),
  )

  let right = triggerRect.right + triggerRect.width / 2 + tooltipRect.width / 2
  right = Math.max(
    VIEWPORT_PADDING,
    Math.min(right, window.innerWidth - tooltipRect.width - VIEWPORT_PADDING),
  )

  tooltipStyle.value = {
    top: `${top}px`,
    left: `${right}px`,
  }
}

async function openTooltip(): Promise<void> {
  if (!props.text.trim()) return

  showTooltip.value = true
  await nextTick()

  const tooltip = tooltipRef.value
  if (!tooltip) return

  tooltip.style.visibility = 'hidden'
  updateTooltipPlacement()
  tooltip.style.visibility = 'visible'
}

function onScrollOrResize(): void {
  if (!showTooltip.value) return
  hideTooltip()
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') hideTooltip()
}

window.addEventListener('scroll', onScrollOrResize, true)
window.addEventListener('resize', onScrollOrResize)
window.addEventListener('keydown', onKeydown)

onUnmounted(() => {
  window.removeEventListener('scroll', onScrollOrResize, true)
  window.removeEventListener('resize', onScrollOrResize)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <button
    ref="triggerRef"
    type="button"
    class="inline-flex size-3.5 shrink-0 cursor-help items-center justify-center rounded-full text-[8px] font-bold leading-none text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
    :class="triggerClass"
    :aria-label="`About ${title}`"
    :aria-expanded="showTooltip"
    @mouseenter="openTooltip"
    @mouseleave="hideTooltip"
    @focus="openTooltip"
    @blur="hideTooltip"
  >
    <ExclamationCircleIcon class="w-2.5 h-2.5 text-gray-600 dark:text-gray-200"/>
  </button>

  <Teleport to="body">
    <div
      v-if="showTooltip"
      ref="tooltipRef"
      role="tooltip"
      class="pointer-events-none w-max max-w-[min(20rem,calc(100vw-1.5rem))] rounded-xl px-3 py-2.5 font-[family-name:Inter,ui-sans-serif,system-ui,sans-serif] shadow-lg"
      :class="
        dark
          ? 'bg-[#25252e] text-white shadow-black/50 ring-1 ring-white/10'
          : 'bg-white text-slate-900 shadow-slate-900/10 ring-1 ring-black/10'
      "
      :style="{
        position: 'fixed',
        top: tooltipStyle.top,
        left: tooltipStyle.left,
        zIndex: 1100,
      }"
    >
      <p
        class="m-0 text-[13px] font-semibold leading-5"
        :class="dark ? 'text-white' : 'text-slate-900'"
      >
        {{ title }}
      </p>
      <p
        class="m-0 mt-1 text-[12px] font-normal leading-4"
        :class="dark ? 'text-[#b4b4be]' : 'text-slate-500'"
      >
        {{ text }}
      </p>
    </div>
  </Teleport>
</template>
