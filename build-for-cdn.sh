#!/bin/bash

# Script para construir y preparar la biblioteca para CDN
# Uso: ./build-for-cdn.sh [versión]

set -e

echo "🚀 Construyendo Kiut Library UI para CDN..."
echo ""

# Limpiar directorio dist anterior
if [ -d "dist" ]; then
  echo "🗑️  Limpiando directorio dist anterior..."
  rm -rf dist
fi

# Construir la biblioteca
echo "📦 Construyendo la biblioteca..."
npm run build:lib

# Verificar que los archivos fueron generados
if [ ! -f "dist/kiut-ui.iife.js" ]; then
  echo "❌ Error: No se generó el archivo kiut-ui.iife.js"
  exit 1
fi

if [ ! -f "dist/kiut-ui.css" ]; then
  echo "❌ Error: No se generó el archivo kiut-ui.css"
  exit 1
fi

echo "✅ Build completado exitosamente!"
echo ""
echo "📂 Archivos generados en /dist:"
ls -lh dist/
echo ""

# Si se proporciona una versión, crear tag
if [ -n "$1" ]; then
  VERSION=$1
  echo "🏷️  Creando tag de versión: $VERSION"
  
  # Actualizar versión en package.json
  npm version $VERSION --no-git-tag-version
  
  echo ""
  echo "📝 Próximos pasos para desplegar en CDN:"
  echo "   1. Revisar los cambios: git status"
  echo "   2. Agregar archivos: git add ."
  echo "   3. Commit: git commit -m \"Build v$VERSION for CDN\""
  echo "   4. Crear tag: git tag v$VERSION"
  echo "   5. Push: git push origin main --tags"
  echo ""
  echo "📦 URL del CDN (después del push):"
  echo "   https://cdn.jsdelivr.net/gh/TU-USUARIO/kiut-library-ui@v$VERSION/dist/kiut-ui.iife.js"
  echo "   https://cdn.jsdelivr.net/gh/TU-USUARIO/kiut-library-ui@v$VERSION/dist/kiut-ui.css"
else
  echo "📝 Próximos pasos para desplegar en CDN:"
  echo "   1. Revisar los cambios: git status"
  echo "   2. Agregar archivos: git add ."
  echo "   3. Commit: git commit -m \"Build library for CDN\""
  echo "   4. Push: git push origin main"
  echo ""
  echo "📦 URL del CDN (después del push):"
  echo "   https://cdn.jsdelivr.net/gh/TU-USUARIO/kiut-library-ui@main/dist/kiut-ui.iife.js"
  echo "   https://cdn.jsdelivr.net/gh/TU-USUARIO/kiut-library-ui@main/dist/kiut-ui.css"
  echo ""
  echo "💡 Tip: Ejecuta './build-for-cdn.sh 1.0.0' para crear una versión específica"
fi

echo ""
echo "✨ ¡Listo!"


