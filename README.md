# CineTrack Desktop 🎬

**CineTrack Desktop** es una aplicación multiplataforma diseñada para que los amantes del cine gestionen su diario personal de películas de forma privada y local. Inspirada en la estética de **Letterboxd**, permite buscar títulos, gestionar una colección y realizar un seguimiento del estado de visionado.

## 🚀 Características Principales

* **Buscador en Tiempo Real**: Conexión directa con la API de **The Movie Database (TMDB)** para obtener información actualizada de cualquier película.
* **Gestión de Colección (CRUD)**:
    * **Añadir**: Guarda películas desde el buscador a tu base de datos local.
    * **Visualizar**: Lista completa de tu diario personal.
    * **Actualizar**: Alterna el estado de una película entre "Pendiente" y "Vista".
    * **Eliminar**: Borra títulos de tu colección con confirmación de seguridad.
* **Privacidad Local**: Almacenamiento 100% local mediante **SQLite**, garantizando que tus datos te pertenecen.
* **Interfaz Moderna**: Diseño oscuro y minimalista optimizado para la experiencia de usuario en escritorio.

## 🛠️ Tecnologías Utilizadas

* **Frontend**: React 19 (Vite) para una interfaz reactiva.
* **Backend/Escritorio**: Electron.js para empaquetado nativo.
* **Base de Datos**: SQLite (mediante `better-sqlite3`) para persistencia local.
* **Estilos**: CSS3 con variables personalizadas para un modo oscuro elegante.

## 📦 Instalación y Ejecución

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

1. **Clonar el repositorio**:
   ```bash
   git clone [https://github.com/martincordero06052002-ux/cinetrack-desktop.git](https://github.com/martincordero06052002-ux/cinetrack-desktop.git)
   ```
2. **Instalar dependencias**:
   ```bash
   npm install
   ```
3. **Configurar la API Key**:
* **Obtén una API Key gratuita en The Movie Database.**
* **Añade tu clave en la variable TMDB_API_KEY dentro de electron/main.cjs.**

4. **Ejecutar en modo desarrollo**:
   ```bash
    npm run dev
   ```
## 📂 Estructura del Proyecto

src/: Contiene el código fuente de la interfaz en React (componentes y páginas).

electron/: Lógica del proceso principal de Electron, base de datos y puente de comunicación (Preload).

database/: Directorio donde se genera el archivo cinetrack.db local.
