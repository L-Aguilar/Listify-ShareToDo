# Listify - ShareToDo

Una aplicación de listas de tareas compartidas construida con React, Redux y Firebase.

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior recomendada)
- npm (incluido con Node.js)

### Instalación de Dependencias
```bash
npm install
```

### Ejecutar el Proyecto

#### Opción 1: Usando el script legacy (recomendado para Node.js 18+)
```bash
npm run start:legacy
```

#### Opción 2: Usando el script estándar
```bash
npm start
```

**Nota:** Si usas Node.js 18 o superior y encuentras errores de OpenSSL, usa la Opción 1.

### Construir para Producción
```bash
npm run build:legacy
```

## 🔧 Solución de Problemas

### Error de OpenSSL
Si encuentras el error `error:0308010C:digital envelope routines::unsupported`, ejecuta:
```bash
export NODE_OPTIONS="--openssl-legacy-provider"
npm start
```

### Problemas con node-sass
El proyecto usa `sass` en lugar de `node-sass` para compatibilidad con Node.js moderno.

### Configuración de Firebase
El proyecto requiere configuración de Firebase para funcionar completamente:

1. **Crear proyecto en Firebase Console:**
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto o usa uno existente
   - Habilita Firestore Database

2. **Obtener credenciales:**
   - En la configuración del proyecto, ve a "Configuración del proyecto"
   - En la pestaña "General", busca "Tus apps"
   - Crea una nueva app web si no tienes una
   - Copia la configuración

3. **Configurar el archivo:**
   - Edita `src/firebase.js`
   - Reemplaza los comentarios con tus credenciales reales
   - Ejemplo:
   ```javascript
   var firebaseConfig = {
     apiKey: "tu-api-key-real",
     authDomain: "tu-proyecto.firebaseapp.com",
     projectId: "tu-proyecto-id-real",
     storageBucket: "tu-proyecto.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef123456"
   };
   ```

## 📱 Características
- Crear y gestionar listas de tareas
- Compartir listas con otros usuarios
- Interfaz responsive con Bootstrap
- Autenticación con Firebase
- Estado global con Redux

## 🛠️ Tecnologías
- React 16.13.1
- Redux
- Firebase
- Bootstrap 4
- SCSS
- React Router

## 🌐 Acceso
Una vez ejecutado, la aplicación estará disponible en:
- **Desarrollo:** http://localhost:3000
- **Producción:** Según la configuración de despliegue

## 📝 Notas
- Este proyecto usa versiones más antiguas de React y dependencias para mantener compatibilidad
- Se recomienda usar Node.js 18+ con el script legacy para mejor compatibilidad
