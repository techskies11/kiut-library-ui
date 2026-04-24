import { ref, computed, onMounted, onUnmounted } from 'vue'

export type Breakpoint = 'mobile' | 'tablet' | 'desktop'

const MOBILE_MAX = 639
const TABLET_MAX = 1024

/**
 * Resuelve el breakpoint actual según el ancho de viewport.
 * - mobile: &lt; 640px
 * - tablet: 640px – 1024px
 * - desktop: &gt; 1024px
 */
export function resolveBreakpoint(width: number): Breakpoint {
  if (width < 640) return 'mobile'
  if (width <= TABLET_MAX) return 'tablet'
  return 'desktop'
}

/**
 * Composable reactivo basado en `matchMedia` (SSR-safe: default `desktop` sin `window`).
 */
export function useBreakpoint() {
  const breakpoint = ref<Breakpoint>(
    typeof window === 'undefined' ? 'desktop' : resolveBreakpoint(window.innerWidth)
  )

  const updateBreakpoint = () => {
    if (typeof window === 'undefined') return
    breakpoint.value = resolveBreakpoint(window.innerWidth)
  }

  let mqMobile: MediaQueryList | null = null
  let mqTablet: MediaQueryList | null = null
  let mqDesktop: MediaQueryList | null = null
  let handler: (() => void) | null = null

  onMounted(() => {
    if (typeof window === 'undefined') return

    updateBreakpoint()

    mqMobile = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`)
    mqTablet = window.matchMedia(`(min-width: 640px) and (max-width: ${TABLET_MAX}px)`)
    mqDesktop = window.matchMedia('(min-width: 1025px)')

    handler = () => {
      updateBreakpoint()
    }

    mqMobile.addEventListener('change', handler)
    mqTablet.addEventListener('change', handler)
    mqDesktop.addEventListener('change', handler)
  })

  onUnmounted(() => {
    if (!handler || !mqMobile || !mqTablet || !mqDesktop) return
    mqMobile.removeEventListener('change', handler)
    mqTablet.removeEventListener('change', handler)
    mqDesktop.removeEventListener('change', handler)
  })

  const isMobile = computed(() => breakpoint.value === 'mobile')
  const isTablet = computed(() => breakpoint.value === 'tablet')
  const isDesktop = computed(() => breakpoint.value === 'desktop')

  return {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
  }
}

export default useBreakpoint
