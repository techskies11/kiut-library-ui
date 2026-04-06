import type { StorybookConfig } from '@storybook/vue3-vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    /**
     * Necesario para el store UniversalStore `storybook/test`: el preset del addon registra
     * `experimental_serverChannel` en Node (leader). Sin esto, el manager (follower en dev)
     * falla con: "No existing state found for follower with id: 'storybook/test'".
     */
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Base path para GitHub Pages
    if (process.env.NODE_ENV === 'production') {
      config.base = '/kiut-library-ui/';
    }
    config.plugins = [tailwindcss(), ...(config.plugins ?? [])];
    // Evita fallos intermitentes "Failed to fetch dynamically imported module" con deps CJS
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [...(config.optimizeDeps?.include ?? []), '@heroicons/vue'],
    };
    return config;
  },
};
export default config;

