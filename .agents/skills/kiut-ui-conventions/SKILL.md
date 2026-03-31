---
name: kiut-ui-conventions
description: >-
  Establece estándares no negociables para UI en Kiut: Tailwind para estilos,
  tipografía Inter, componentes con soporte explícito light y dark, y
  construcción guiada por la skill frontend-design. Usar en cualquier prompt o
  implementación de componentes, páginas, Storybook, o estilos en este
  repositorio; también cuando el usuario pida interfaces, diseño UI o librería
  de componentes Kiut.
---

# Convenciones Kiut UI

Esta skill **debe aplicarse junto con** la skill **frontend-design** (`.agents/skills/frontend-design/SKILL.md`). No sustituye el criterio creativo de frontend-design; **lo complementa** con reglas técnicas fijas del proyecto. Si frontend-design desaconseja Inter de forma genérica, **en Kiut prevalece esta skill**: la UI usa **Inter** como fuente principal.

## Reglas obligatorias (siempre)

### 1. Tailwind para estilos

- **Toda** implementación de UI en este repo usa **Tailwind CSS** (utilidades `@layer`, clases en plantillas, y cuando haga falta `@apply` en CSS del proyecto de forma acotada).
- No introducir estilos “a mano” con CSS suelto que duplique lo que Tailwind ya resuelve (excepciones puntuales: animaciones muy específicas, máscaras, o efectos que no encajen en utilidades; documentar el motivo en el propio archivo).
- Respetar la entrada de estilos del proyecto (por ejemplo `src/tailwind.css` y la configuración de Tailwind vigente).

### 2. Tipografía: Inter

- El texto de interfaz (cuerpo, etiquetas, botones, navegación, tablas, etc.) debe usar la familia **`Inter`** de forma consistente.
- Asegurar carga de la fuente donde corresponda (p. ej. enlaces a Google Fonts como en `index.html` o `.storybook/preview-head.html` para Storybook).
- En clases Tailwind, preferir el stack que resuelva a Inter (p. ej. `font-sans` si el tema del proyecto define `sans` como Inter, o `font-[family-name:Inter]` / utilidades equivalentes según la configuración vigente). No sustituir Inter por otra familia salvo casos muy acotados (p. ej. `font-mono` para código o datos técnicos).

### 3. Light mode y dark mode en componentes

- **Cada componente** debe verse correctamente en **modo claro y oscuro**.
- En este proyecto el modo oscuro se activa con la clase **`dark`** en un ancestro (p. ej. `<html class="dark">`); el variant de Tailwind es **`dark:`** según `@custom-variant` en `src/tailwind.css`.
- Para colores de fondo, texto, bordes y estados (hover, focus, disabled), definir **pares coherentes**: estilos base = light, variantes `dark:` = dark (o la convención que ya use el componente padre, pero siempre ambos modos cubiertos).
- No dar por hecho un solo tema: revisar contraste y legibilidad en **ambos** modos antes de considerar la tarea terminada.

### 4. Construcción con frontend-design

- Antes de implementar o rediseñar UI, **leer y seguir** `.agents/skills/frontend-design/SKILL.md` (dirección estética, motion, composición, color, anti-patrones “genéricos”). La **familia tipográfica** queda fijada por esta skill (**Inter**).
- Orden de trabajo recomendado:
  1. Leer **frontend-design** y fijar dirección (tono, diferenciación).
  2. Aplicar **esta skill** (Tailwind + **Inter** + light/dark).
  3. Implementar código y stories si aplica.

## Checklist rápido antes de cerrar una tarea UI

- [ ] Estilos resueltos principalmente con **Tailwind**.
- [ ] Tipografía de interfaz con **Inter** (y carga de fuente donde aplique).
- [ ] Vista **light** y **dark** revisadas (clase `dark` donde corresponda).
- [ ] Criterios de **frontend-design** considerados en la propuesta visual y en el código.

## Nota para el agente

Si el usuario no menciona tema, Tailwind o tipografía, **igual** aplicar estas convenciones en implementaciones de UI en este repositorio.
