#!/bin/bash

echo "🚀 Iniciando Listify - ShareToDo..."
echo "📁 Directorio: $(pwd)"
echo "🔧 Configurando variables de entorno..."

# Configurar Node.js para compatibilidad con versiones antiguas
export NODE_OPTIONS="--openssl-legacy-provider"

echo "✅ Variables configuradas"
echo "🌐 Iniciando servidor de desarrollo..."
echo "📱 La aplicación estará disponible en: http://localhost:3000"
echo "⏹️  Presiona Ctrl+C para detener el servidor"
echo ""

# Iniciar el proyecto
npm start
