import { ref, computed, onMounted, onUnmounted, watch, type Ref } from 'vue'

export type Theme = 'light' | 'dark'

export interface ThemeColors {
  // Backgrounds
  bgPrimary: string
  bgSecondary: string
  bgCard: string
  bgCardGradientStart: string
  bgCardGradientEnd: string
  bgTable: string
  bgTableHeader: string
  bgTableHover: string
  
  // Text
  textPrimary: string
  textSecondary: string
  textMuted: string
  
  // Borders & Lines
  borderColor: string
  borderLight: string
  gridLines: string
  
  // Shadows
  shadowLight: string
  shadowMedium: string
  shadowHeavy: string
  
  // Charts specific
  tooltipBg: string
  tooltipText: string
  tooltipBorder: string
  
  // Status colors (same in both themes)
  success: string
  warning: string
  danger: string
  info: string
  
  // Brand colors (same in both themes)
  primaryLight: string
  primaryDefault: string
  primaryDark: string
}

// Light theme colors
const lightColors: ThemeColors = {
  // Backgrounds
  bgPrimary: '#f8f9fa',
  bgSecondary: '#ffffff',
  bgCard: '#ffffff',
  bgCardGradientStart: '#ffffff',
  bgCardGradientEnd: '#fafafa',
  bgTable: '#ffffff',
  bgTableHeader: '#f8fafc',
  bgTableHover: '#f8fafc',
  
  // Text
  textPrimary: '#1e293b',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  
  // Borders & Lines
  borderColor: 'rgba(93, 75, 147, 0.1)',
  borderLight: 'rgba(0, 0, 0, 0.05)',
  gridLines: 'rgba(148, 163, 184, 0.12)',
  
  // Shadows
  shadowLight: 'rgba(0, 0, 0, 0.05)',
  shadowMedium: 'rgba(0, 0, 0, 0.08)',
  shadowHeavy: 'rgba(0, 0, 0, 0.1)',
  
  // Charts specific
  tooltipBg: 'rgba(15, 23, 42, 0.95)',
  tooltipText: '#f1f5f9',
  tooltipBorder: 'rgba(148, 163, 184, 0.2)',
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  
  // Brand colors
  primaryLight: '#c67dff',
  primaryDefault: '#5d4b93',
  primaryDark: '#4a3a75',
}

// Dark theme colors
const darkColors: ThemeColors = {
  // Backgrounds
  bgPrimary: '#000000',
  bgSecondary: '#1a1a1d',
  bgCard: '#1a1a1d',
  bgCardGradientStart: '#1a1a1d',
  bgCardGradientEnd: '#0f0f11',
  bgTable: '#1a1a1d',
  bgTableHeader: '#252528',
  bgTableHover: '#252528',
  
  // Text
  textPrimary: '#f8f9fa',
  textSecondary: '#9ca3af',
  textMuted: '#6b7280',
  
  // Borders & Lines
  borderColor: 'rgba(198, 125, 255, 0.15)',
  borderLight: 'rgba(198, 125, 255, 0.08)',
  gridLines: 'rgba(198, 125, 255, 0.12)',
  
  // Shadows
  shadowLight: 'rgba(0, 0, 0, 0.3)',
  shadowMedium: 'rgba(0, 0, 0, 0.4)',
  shadowHeavy: 'rgba(0, 0, 0, 0.5)',
  
  // Charts specific
  tooltipBg: 'rgba(26, 26, 29, 0.98)',
  tooltipText: '#f8f9fa',
  tooltipBorder: 'rgba(198, 125, 255, 0.2)',
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  
  // Brand colors
  primaryLight: '#c67dff',
  primaryDefault: '#5d4b93',
  primaryDark: '#4a3a75',
}

// Chart series colors (work well in both themes)
export const chartSeriesColors = [
  '#C67DFF',  // Purple light
  '#5D4B93',  // Purple default
  '#73D1D3',  // Cyan
  '#1EC383',  // Green
  '#F496A6',  // Pink
  '#F3A332',  // Orange
  '#7D8AFA',  // Blue
]

/**
 * Composable for detecting and managing theme (dark/light mode)
 * 
 * @param themeProp - Optional theme prop to override automatic detection
 * @returns Object with isDark ref, currentTheme ref, and colors computed
 * 
 * @example
 * // Automatic detection
 * const { isDark, colors } = useThemeDetection()
 * 
 * @example
 * // With prop override
 * const props = defineProps<{ theme?: 'light' | 'dark' }>()
 * const { isDark, colors } = useThemeDetection(toRef(props, 'theme'))
 */
export function useThemeDetection(themeProp?: Ref<Theme | undefined>) {
  const detectedTheme = ref<Theme>('light')
  let observer: MutationObserver | null = null

  // Function to detect theme from DOM
  const detectTheme = (): Theme => {
    if (typeof document === 'undefined') return 'light'
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  }

  // Current theme: prop takes priority, then detected theme
  const currentTheme = computed<Theme>(() => {
    if (themeProp?.value) {
      return themeProp.value
    }
    return detectedTheme.value
  })

  // Boolean for convenience
  const isDark = computed(() => currentTheme.value === 'dark')

  // Get colors based on current theme
  const colors = computed<ThemeColors>(() => {
    return isDark.value ? darkColors : lightColors
  })

  // Setup MutationObserver to watch for class changes on documentElement
  const setupObserver = () => {
    if (typeof document === 'undefined') return

    // Initial detection
    detectedTheme.value = detectTheme()

    // Watch for changes
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          detectedTheme.value = detectTheme()
        }
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }

  // Cleanup observer
  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  onMounted(() => {
    setupObserver()
  })

  onUnmounted(() => {
    cleanup()
  })

  // Watch for prop changes
  if (themeProp) {
    watch(themeProp, () => {
      // Prop takes priority, no need to do anything special
      // The computed will automatically update
    })
  }

  return {
    isDark,
    currentTheme,
    colors,
    detectedTheme,
    // Export color constants for direct access if needed
    lightColors,
    darkColors,
    chartSeriesColors,
  }
}

// Export types and constants
export { lightColors, darkColors }
export default useThemeDetection

