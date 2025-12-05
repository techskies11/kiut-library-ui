import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/main.ts'),
      name: 'KiutUI',
      fileName: (format) => `kiut-ui.${format}.js`,
      formats: ['es', 'umd', 'iife']
    },
    rollupOptions: {
      // Asegúrate de externalizar las dependencias que no quieres incluir en tu biblioteca
      external: ['vue'],
      output: {
        // Proporciona variables globales para usar en el build UMD/IIFE
        // para dependencias externalizadas
        globals: {
          vue: 'Vue'
        },
        // Usar solo exports nombrados para evitar advertencias
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'kiut-ui.css';
          return assetInfo.name || '';
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true,
    // Optimizar para CDN
    minify: 'esbuild'
  }
});


