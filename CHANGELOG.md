# Changelog

## 2.0.0

### Breaking

- **Prefijo Tailwind `ku:`** en el build de la librería. Las utilidades compiladas en `dist/kiut-ui.css` usan el prefijo (`ku:flex`, `ku:dark:bg-slate-800`, etc.) para no colisionar con Tailwind del proyecto consumidor.
- Si importas código fuente (`kiut-library-ui/src/*`), las clases en plantillas deben usar el prefijo `ku:`.

### Added

- Selectores dark reforzados para tokens `--kiut-*`: `html.dark`, `html.dark body`, `:root.dark`, `.dark`, `.dark-mode`.
- Documentación de integración con proyectos que también usan Tailwind (orden de CSS, `@layer`, modo oscuro).

### Fixed

- Tokens `--kiut-*` en modo oscuro cuando `class="dark"` está en `<html>` (necesario para componentes con `Teleport to="body"`).

## 1.0.0

- Versión inicial.
