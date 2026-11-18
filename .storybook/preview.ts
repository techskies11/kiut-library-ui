import type { Preview } from '@storybook/vue3';

// Import global styles with CSS variables for theming
import '../src/style.css';
import '../src/tailwind.css';

const BRAND_TOKENS = [
  '--kiut-primary',
  '--kiut-primary-hover',
  '--kiut-primary-light',
  '--kiut-primary-default',
  '--kiut-primary-dark',
] as const;

/** Local-only ramps. "violet" clears the override and uses style.css. */
const BRANDS: Record<string, Record<(typeof BRAND_TOKENS)[number], string> | null> = {
  violet: null,
  teal: {
    '--kiut-primary': '#0f766e',
    '--kiut-primary-hover': '#0d9488',
    '--kiut-primary-light': '#5eead4',
    '--kiut-primary-default': '#115e59',
    '--kiut-primary-dark': '#134e4a',
  },
  orange: {
    '--kiut-primary': '#ea580c',
    '--kiut-primary-hover': '#c2410c',
    '--kiut-primary-light': '#fdba74',
    '--kiut-primary-default': '#9a3412',
    '--kiut-primary-dark': '#7c2d12',
  },
  blue: {
    '--kiut-primary': '#2563eb',
    '--kiut-primary-hover': '#1d4ed8',
    '--kiut-primary-light': '#93c5fd',
    '--kiut-primary-default': '#1e3a8a',
    '--kiut-primary-dark': '#1e40af',
  },
};

function applyBrand(brand: string) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const ramp = BRANDS[brand] ?? null;
  for (const token of BRAND_TOKENS) {
    if (ramp) root.style.setProperty(token, ramp[token]);
    else root.style.removeProperty(token);
  }
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8f9fa' },
        { name: 'dark', value: '#1a1a1d' },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    brand: {
      description: 'Brand ramp. Overrides --kiut-primary* on :root for this Storybook session only.',
      defaultValue: 'violet',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'violet', title: 'Violet' },
          { value: 'teal', title: 'Teal' },
          { value: 'orange', title: 'Orange' },
          { value: 'blue', title: 'Blue' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      const brand = context.globals.brand || 'violet';
      applyBrand(brand);
      
      // Apply theme class to document
      if (typeof document !== 'undefined') {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      
      return {
        components: { story },
        template: `
          <div :key="brand" :class="['storybook-wrapper', theme === 'dark' ? 'dark-mode' : 'light-mode']">
            <story />
          </div>
        `,
        data() {
          return { theme, brand };
        },
      };
    },
  ],
};

export default preview;
