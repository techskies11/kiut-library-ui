# Kiut Library UI

Biblioteca de componentes Vue 3 con TypeScript y Storybook.
DOC: https://techskies11.github.io/kiut-library-ui/

---

## Instalación

### Opción 1: Desde GitHub (recomendado)

```bash
npm install github:TU-USUARIO/kiut-library-ui#v2.0.0
npm install chart.js vue-chartjs moment echarts  # peer dependencies
```

### Opción 2: CDN (jsDelivr)

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://cdn.jsdelivr.net/npm/moment@2/moment.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/TU-USUARIO/kiut-library-ui@v2.0.0/dist/kiut-ui.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/TU-USUARIO/kiut-library-ui@v2.0.0/dist/kiut-ui.css">
```

> Reemplaza `TU-USUARIO` con tu usuario de GitHub.

---

## Uso básico

### main.ts

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { KiutUIPlugin } from 'kiut-library-ui'
import 'kiut-library-ui/style.css'

const app = createApp(App)
app.use(KiutUIPlugin)
app.mount('#app')
```

### Componente

```vue
<template>
  <Button variant="primary">Guardar</Button>
  <ChartLine :data="chartData" />
</template>

<script setup lang="ts">
import { Button, ChartLine } from 'kiut-library-ui'

const chartData = {
  labels: ['Ene', 'Feb', 'Mar'],
  datasets: [{
    label: 'Ventas',
    data: [65, 59, 80],
    borderColor: 'rgb(75, 192, 192)',
  }],
}
</script>
```

También puedes importar componentes por nombre desde `kiut-library-ui` sin usar el plugin.

---

## Integración con Tailwind en el proyecto consumidor

Kiut compila sus utilidades Tailwind con **prefijo `ku:`** (`ku:flex`, `ku:h-9`, `ku:border-dashed`, etc.). Así las clases de tu app (`flex`, `h-9`, …) no pisan ni son pisadas por las de la librería.

### Importar el CSS

Importa la hoja de Kiut **después** del CSS principal de tu app si quieres que tus estilos base tengan prioridad sobre tokens y CSS scoped de componentes:

```typescript
// main.ts
import './app.css'           // Tailwind / estilos de tu app
import 'kiut-library-ui/style.css'  // kiut-ui.css — al final
```

O con capa explícita (Tailwind v4):

```css
/* app.css del consumidor */
@layer theme, base, components, utilities;
@import "kiut-library-ui/css" layer(kiut-library);
```

Con el prefijo `ku:`, el orden importa menos para **utilidades** genéricas, pero sigue siendo relevante para **variables `--kiut-*`** y estilos scoped de charts/modales.

### Modo oscuro (tokens `--kiut-*`)

Los tokens semánticos cambian con la clase **`dark`** en un ancestro. **Recomendado:** ponerla en `<html>`:

```typescript
function setTheme(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark)
}
```

**Importante:** Si solo añades `dark` en un wrapper interno (`#app`), los componentes que usan `Teleport to="body"` (Modal, Select, Filters) pueden seguir leyendo tokens en valores *light*. Usa `html.dark` para evitarlo.

No basta con `prefers-color-scheme: dark` sin la clase `.dark` si usas colores `var(--kiut-*)`.

### Resumen

| Cambio en v2 | Evita |
|--------------|--------|
| Prefijo `ku:` en utilidades | Colisión `border-dashed`, `h-9`, `flex`, etc. |
| `html.dark` + tokens | `--kiut-*` en light con UI en dark |
| CSS al final o `@layer` | Sobrescritura impredecible entre hojas |

---

## Migración 1.x → 2.0

1. Actualiza la dependencia: `#v2.0.0`.
2. Importa `kiut-library-ui/style.css` (alias de `dist/kiut-ui.css`).
3. Activa modo oscuro con `class="dark"` en `document.documentElement`.
4. No necesitas prefijar las clases de **tu** app; solo el bundle publicado de Kiut lleva `ku:`.
5. Si consumías `./src/*` y copiabas clases de la lib, antepone `ku:` a las utilidades Tailwind.

Ver [CHANGELOG.md](./CHANGELOG.md).

---

## Desarrollo

```bash
npm install
npm run storybook
npm run build:lib
```

Scripts de migración de prefijo (mantenimiento): `scripts/migrate-ku-prefix.mjs`, `scripts/fix-remaining-ku.mjs`.

---

## Publicar

```bash
npm run build:lib
git add .
git commit -m "Release v2.0.0"
git tag v2.0.0
git push origin main --tags
```

El directorio `dist/` debe estar en el repositorio para CDN y installs desde Git.

---

## Problemas comunes

**Estilos de Kiut se ven mal junto a Tailwind**

- Asegúrate de usar `v2.0.0+` (prefijo `ku:`).
- Importa `kiut-library-ui/style.css` según la sección de integración.

**Modo oscuro: tokens claros, utilidades oscuras**

- Añade `class="dark"` en `<html>`, no solo en un contenedor interno.

**Module not found**

```bash
npm install github:TU-USUARIO/kiut-library-ui#v2.0.0 --force
```

---

## Licencia

MIT
