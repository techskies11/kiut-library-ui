# Sistema de Diseño - Backoffice UI

## 🎨 Resumen de Cambios

Este documento describe el nuevo sistema de diseño implementado en el backoffice, que incluye:

- ✅ Nueva paleta de colores púrpura/violeta
- ✅ Tipografía moderna (Space Grotesk + DM Sans)
- ✅ Modo oscuro funcional
- ✅ Efectos glassmorphism
- ✅ Gradientes personalizados
- ✅ Librería de iconos @hugeicons/vue instalada
- ✅ Componentes rediseñados con nuevos estilos

---

## 🎭 Tipografía

### Fuentes Principales

```css
/* Primaria - Para títulos y headings */
font-family: 'Space Grotesk'
Class: font-display

/* Secundaria - Para texto general */
font-family: 'DM Sans'
Class: font-sans (default)
```

### Uso en Componentes

```vue
<!-- Título con Space Grotesk -->
<h1 class="font-display text-3xl font-bold">Mi Título</h1>

<!-- Texto normal con DM Sans -->
<p class="font-sans text-base">Mi texto</p>
```

---

## 🌈 Paleta de Colores

### Colores Primarios

```javascript
Primary Light: #C67DFF
Primary Default: #5D4B93
Primary Dark: #4a3a75
```

### Escala Púrpura

```javascript
purple-50: #f5f3ff
purple-100: #ede9fe
purple-200: #ddd6fe
purple-300: #C67DFF
purple-400: #B776F0
purple-500: #A86FE0
purple-600: #99C8D1
purple-700: #7B59B2
purple-800: #6C52A2
purple-900: #5D4B93
purple-950: #4a3a75
```

### Uso en Tailwind

```vue
<!-- Fondo púrpura -->
<div class="bg-purple-500"></div>

<!-- Texto púrpura -->
<p class="text-purple-700">Texto</p>

<!-- Border púrpura -->
<div class="border border-purple-300"></div>
```

---

## 🌓 Modo Oscuro

### Composable useTheme

```javascript
import { useTheme } from '@/utils/useTheme';

const { isDark, toggleTheme, setTheme, initTheme } = useTheme();

// Alternar tema
toggleTheme();

// Establecer tema específico
setTheme(true); // dark
setTheme(false); // light

// Inicializar (ya se hace automáticamente en App.vue)
initTheme();
```

### Variables CSS

El modo oscuro utiliza variables CSS que se adaptan automáticamente:

```css
/* Light Mode */
--bg-primary: #f8f9fa
--bg-secondary: #ffffff
--text-primary: #1a1a1d
--text-secondary: #6b7280
--border-color: rgba(93, 75, 147, 0.1)

/* Dark Mode (con clase .dark en html) */
--bg-primary: #000000
--bg-secondary: #1a1a1d
--text-primary: #f8f9fa
--text-secondary: #9ca3af
--border-color: rgba(198, 125, 255, 0.15)
```

### Uso en Componentes

```vue
<!-- Usa variables CSS para adaptarse automáticamente -->
<div style="background: var(--bg-secondary); color: var(--text-primary)">
  Contenido adaptable
</div>

<!-- O con Tailwind -->
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  Contenido adaptable
</div>
```

---

## ✨ Gradientes

### Gradientes Disponibles

```css
/* Gradiente primario */
bg-gradient-primary
/* #C67DFF → #5D4B93 */

/* Otros gradientes */
bg-gradient-cyan-purple /* #73D1D3 → #5D4B93 */
bg-gradient-green-purple /* #1EC383 → #5D4B93 */
bg-gradient-purple-pink /* #5D4B93 → #F496A6 */
bg-gradient-purple-orange /* #C67DFF → #F3A332 */
bg-gradient-purple-blue /* #C67DFF → #7D8AFA */
bg-gradient-blue-purple /* #47AAFF → #C67DFF */
bg-gradient-blue-purple-alt /* #4A75FB → #BD00FF */
bg-gradient-yellow-purple /* #F4EA95 → #643BA2 */
bg-gradient-purple-teal /* #6A47C7 → #BADCC3 */
```

### Uso en Botones

```vue
<!-- Botón con gradiente primario -->
<button class="bg-gradient-primary text-white px-6 py-3 rounded-xl">
  Click me
</button>

<!-- Botón con hover effect -->
<button class="bg-gradient-primary hover:shadow-purple transition-all">
  Hover me
</button>
```

### Texto con Gradiente

```vue
<!-- Usando la clase utility -->
<h1 class="gradient-text text-4xl font-bold">
  Título con gradiente
</h1>

<!-- Inline style -->
<span style="background: linear-gradient(135deg, #C67DFF 0%, #5D4B93 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
  Texto gradiente
</span>
```

---

## 🔮 Efectos Glassmorphism

### Clases Disponibles

```css
/* Efecto glass básico */
.glass
/* background: rgba(255, 255, 255, 0.7) + blur */

/* Efecto glass más opaco */
.glass-light
/* background: rgba(255, 255, 255, 0.9) + blur */
```

### Uso en Componentes

```vue
<!-- Card con efecto glass -->
<div class="glass rounded-2xl p-6 border border-purple-200/20">
  <h3>Contenido</h3>
  <p>Texto con fondo glassmorphism</p>
</div>

<!-- Modal con glass effect -->
<div class="glass-light backdrop-blur-xl rounded-2xl p-8 shadow-glass-lg">
  Modal content
</div>
```

### Backdrop Blur

```vue
<!-- Diferentes intensidades de blur -->
<div class="backdrop-blur-xs"></div>  <!-- 2px -->
<div class="backdrop-blur-sm"></div>  <!-- 4px -->
<div class="backdrop-blur-md"></div>  <!-- 12px -->
<div class="backdrop-blur-lg"></div>  <!-- 16px -->
<div class="backdrop-blur-xl"></div>  <!-- 24px -->
```

---

## 🎯 Sombras

### Sombras Glass

```vue
<!-- Sombras con efecto glass -->
<div class="shadow-glass"></div>      <!-- Estándar -->
<div class="shadow-glass-sm"></div>   <!-- Pequeña -->
<div class="shadow-glass-lg"></div>   <!-- Grande -->
```

### Sombras Púrpura

```vue
<!-- Sombras con color púrpura -->
<div class="shadow-purple"></div>     <!-- Estándar: 0 10px 40px -->
<div class="shadow-purple-sm"></div>  <!-- Pequeña: 0 4px 20px -->
```

---

## 🎨 Componentes Rediseñados

### Header

- ✅ Glassmorphism aplicado
- ✅ Toggle de modo oscuro agregado
- ✅ Badge de estadísticas con gradiente
- ✅ Estilos adaptables light/dark

### Lateral Menu

- ✅ Glassmorphism con backdrop blur
- ✅ Items activos con gradiente primario
- ✅ Hover effects mejorados
- ✅ Transiciones suaves
- ✅ Responsive móvil actualizado

### Modal

- ✅ Fondo glassmorphism
- ✅ Botón de acción con gradiente
- ✅ Sombras mejoradas
- ✅ Animaciones suaves

### Buttons (PrimeVue)

Los botones automáticamente usan el nuevo tema:

```vue
<!-- Botón primario (usa el gradiente automáticamente) -->
<Button label="Save" class="p-button-primary" />

<!-- Botón custom con gradiente -->
<Button label="Custom" class="bg-gradient-primary !text-white" />
```

---

## 📦 Iconos - Hugeicons

### Instalación

```bash
npm install @hugeicons/vue
```

### Uso

```vue
<script setup>
// Importar iconos específicos
import { HomeIcon, UserIcon, SettingsIcon } from '@hugeicons/vue';
</script>

<template>
  <!-- Usar como componente -->
  <HomeIcon class="w-6 h-6 text-purple-500" />
  
  <!-- Con props -->
  <UserIcon :size="24" color="#C67DFF" />
</template>
```

### Migración desde Heroicons

Para migrar los iconos existentes a Hugeicons:

1. Buscar el icono equivalente en https://hugeicons.com/
2. Importar desde @hugeicons/vue
3. Reemplazar el componente

**Pendiente**: Migración completa de todos los iconos del proyecto

---

## 🔧 Utilidades CSS Personalizadas

### Animaciones

```vue
<!-- Animación float -->
<div class="animate-float">
  Elemento flotante
</div>
```

### Inputs de PrimeVue

Todos los inputs han sido actualizados automáticamente con:
- Fondo semitransparente púrpura
- Bordes suaves
- Border radius de 12px
- Transiciones suaves

---

## 📝 Ejemplos Prácticos

### Card con Glassmorphism

```vue
<div class="glass rounded-2xl p-6 border border-purple-200/20 shadow-glass">
  <h3 class="font-display text-xl font-bold mb-3 gradient-text">
    Título del Card
  </h3>
  <p class="text-gray-600 dark:text-gray-300">
    Contenido del card con efecto glassmorphism
  </p>
  <button class="mt-4 bg-gradient-primary text-white px-6 py-2 rounded-xl hover:shadow-purple transition-all">
    Acción
  </button>
</div>
```

### Form con Nuevo Diseño

```vue
<div class="glass-light rounded-2xl p-8 backdrop-blur-xl">
  <h2 class="font-display text-2xl font-bold mb-6">Formulario</h2>
  
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-2">Nombre</label>
      <InputText class="w-full" placeholder="Ingresa tu nombre" />
    </div>
    
    <div>
      <label class="block text-sm font-medium mb-2">Email</label>
      <InputText type="email" class="w-full" placeholder="email@example.com" />
    </div>
    
    <Button 
      label="Enviar" 
      class="w-full bg-gradient-primary !text-white !py-3"
    />
  </div>
</div>
```

---

## 🚀 Próximos Pasos

### Pendiente de Completar:

1. **Migración de Iconos**: Reemplazar todos los Heroicons por Hugeicons
2. **Actualización de Vistas**: Aplicar el nuevo diseño a todas las vistas del backoffice:
   - Dashboard
   - Chats
   - Agents
   - Settings
   - etc.

### Recomendaciones:

1. Usar siempre las variables CSS (--bg-primary, --text-primary, etc.) para compatibilidad con modo oscuro
2. Aplicar efectos glassmorphism en cards y modals para mantener consistencia
3. Usar gradientes en botones primarios y elementos destacados
4. Mantener el border-radius entre 12px-24px para elementos modernos
5. Usar Space Grotesk para títulos/headings importantes

---

## 📚 Recursos

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [PrimeVue Docs](https://primevue.org/)
- [Hugeicons](https://hugeicons.com/)
- [Google Fonts - Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- [Google Fonts - DM Sans](https://fonts.google.com/specimen/DM+Sans)

---

**Última actualización**: $(date)
**Versión del Sistema de Diseño**: 2.0.0

