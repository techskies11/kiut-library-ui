# Kiut Library UI

Biblioteca de componentes Vue 3 con TypeScript y Storybook.
DOC: https://techskies11.github.io/kiut-library-ui/

---

## 📦 Instalación

### Opción 1: Desde GitHub (Recomendado)

```bash
# Instalar en tu proyecto
npm install github:TU-USUARIO/kiut-library-ui

# Con versión específica (recomendado)
npm install github:TU-USUARIO/kiut-library-ui#v1.0.0
```

**Ventajas:**
- ✅ No requiere npm registry
- ✅ Funciona con repos privados
- ✅ Control de versiones con Git tags
- ✅ Instalación directa del código fuente

### Opción 2: CDN (jsDelivr)

```html
<!-- Vue 3 (requerido) -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- Moment.js (requerido para componentes de fecha) -->
<script src="https://cdn.jsdelivr.net/npm/moment@2/moment.min.js"></script>

<!-- Kiut UI -->
<script src="https://cdn.jsdelivr.net/gh/TU-USUARIO/kiut-library-ui@v1.0.0/dist/kiut-ui.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/TU-USUARIO/kiut-library-ui@v1.0.0/dist/kiut-ui.css">
```

> **Nota:** Reemplaza `TU-USUARIO` con tu usuario de GitHub.

---

## 🚀 Uso

### En Proyectos Vue/Vite

**1. Instalar:**
```bash
npm install github:TU-USUARIO/kiut-library-ui#v1.0.0
npm install chart.js vue-chartjs moment echarts  # Dependencias peer
```

**2. Configurar (main.ts):**
```typescript
import { createApp } from 'vue'
import KiutUI from 'kiut-library-ui'
import 'kiut-library-ui/dist/style.css'

createApp(App).use(KiutUI).mount('#app')
```

**3. Usar en componentes:**
```vue
<template>
  <KiutButton label="Click me" :primary="true" @click="handleClick" />
  <KiutChartLine :data="chartData" />
</template>

<script setup lang="ts">
const chartData = {
  labels: ['Ene', 'Feb', 'Mar'],
  datasets: [{
    label: 'Ventas',
    data: [65, 59, 80],
    borderColor: 'rgb(75, 192, 192)'
  }]
}

const handleClick = () => console.log('Click!')
</script>
```

### Con CDN (HTML)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/TU-USUARIO/kiut-library-ui@v1.0.0/dist/kiut-ui.css">
</head>
<body>
  <div id="app">
    <kiut-button label="Hola" :primary="true"></kiut-button>
  </div>

  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/moment@2/moment.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/TU-USUARIO/kiut-library-ui@v1.0.0/dist/kiut-ui.iife.js"></script>
  <script>
    Vue.createApp({}).use(KiutUI).mount('#app')
  </script>
</body>
</html>
```


---

## 🎨 Componentes

### KiutButton
```vue
<KiutButton 
  label="Click me" 
  :primary="true"
  size="medium"
  @click="handleClick"
/>
```

**Props:**
- `label` (string): Texto del botón
- `primary` (boolean): Estilo primario o secundario
- `size` ('small' | 'medium' | 'large'): Tamaño
- `backgroundColor` (string): Color personalizado

### KiutChartLine
```vue
<KiutChartLine 
  :data="{
    labels: ['Ene', 'Feb', 'Mar'],
    datasets: [{
      label: 'Ventas',
      data: [10, 20, 15],
      borderColor: 'rgb(75, 192, 192)'
    }]
  }"
/>
```

**Props:**
- `data` (object): Datos de Chart.js
- `options` (object): Opciones de configuración

---

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Ver componentes en Storybook
npm run storybook

# Build de la biblioteca
npm run build:lib

# Script de ayuda para build y versionado
./build-for-cdn.sh 1.0.0
```

---

## 📝 Publicar

### 1. Build y Commit

```bash
npm run build:lib
git add .
git commit -m "Build v1.0.0"
git tag v1.0.0
git push origin main --tags
```

### 2. Usar en Otros Proyectos

```bash
# Desde Git
npm install github:TU-USUARIO/kiut-library-ui#v1.0.0

# Desde CDN
# https://cdn.jsdelivr.net/gh/TU-USUARIO/kiut-library-ui@v1.0.0/dist/kiut-ui.iife.js
```

**Nota:** El directorio `dist/` debe estar en GitHub para que funcione el CDN.

---

## 🔄 Actualizar la Librería

```bash
# Actualizar a la última versión
npm update kiut-library-ui

# O forzar reinstalación
npm install github:TU-USUARIO/kiut-library-ui#v1.1.0 --force
```

---

## 🆘 Problemas Comunes

**Error: "Module not found"**
```bash
npm install github:TU-USUARIO/kiut-library-ui --force
```

**Error: "Cannot find module 'chart.js'"**
```bash
npm install chart.js vue-chartjs
```

**No se actualizan los cambios**
```bash
npm cache clean --force
rm -rf node_modules/kiut-library-ui
npm install
```

**Repos privados**
```bash
# Usar SSH en lugar de HTTPS
npm install git+ssh://git@github.com/TU-USUARIO/kiut-library-ui.git
```

---

## 📄 Licencia

MIT
