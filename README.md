# Sistema de Gestión de Usuarios y Productos (CRUD Full Stack)

Este proyecto es una aplicación web completa que implementa un sistema CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de usuarios y productos. Está construido utilizando una arquitectura moderna con **Angular** en el frontend y **Node.js/Express** en el backend, utilizando **MySQL** como base de datos.

## 🚀 Tecnologías Utilizadas

### Frontend
*   **Framework:** Angular 21
*   **Diseño:** Bootstrap Material Design
*   **Estilos:** SCSS (Sass)
*   **Http Client:** Angular HttpClient
*   **Autenticación:** JWT (JSON Web Tokens) y Guards de Angular

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Base de Datos:** MySQL (usando `mysql2`)
*   **Autenticación:** `jsonwebtoken` (JWT) y `bcrypt` para hashing de contraseñas
*   **Logs:** Morgan
*   **Dev Tools:** Nodemon

## 📂 Estructura del Proyecto

El repositorio está dividido en dos carpetas principales:

*   `frontend/`: Contiene todo el código fuente de la aplicación Angular.
*   `BackendEjercicio/`: Contiene la API RESTful construida con Node.js y Express.

## ⚙️ Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:
*   **Node.js** (v18 o superior recomendado)
*   **npm** (Gestor de paquetes de Node)
*   **Angular CLI** (`npm install -g @angular/cli`)
*   **MySQL Server** (y una herramienta como Workbench o DBeaver)

---

## 🛠️ Configuración e Instalación

### 1. Configuración de la Base de Datos (MySQL)

1.  Asegúrate de que tu servicio MySQL esté corriendo.
2.  Crea una base de datos para el proyecto.
3.  Configura las credenciales de conexión en el backend.
    *   Navega a `BackendEjercicio/src/`.
    *   Revisa el archivo `.env` o la carpeta `config/` para ajustar el host, usuario, contraseña y nombre de la base de datos.

### 2. Instalación y Ejecución del Backend

1.  Abre una terminal y navega a la carpeta del backend:
    ```bash
    cd BackendEjercicio
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    *   El servidor debería estar corriendo (por defecto suele ser en el puerto 3000 o el definido en tus variables de entorno).

### 3. Instalación y Ejecución del Frontend

1.  Abre una nueva terminal y navega a la carpeta del frontend:
    ```bash
    cd frontend
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
    *   *Nota: Si encuentras conflictos de dependencias, puedes intentar con `npm install --legacy-peer-deps`.*
3.  Inicia el servidor de desarrollo de Angular:
    ```bash
    npm start
    ```
    *   O alternativamente: `ng serve`
4.  Abre tu navegador y visita: `http://localhost:4200/`

---

## ✨ Funcionalidades Principales

*   **Autenticación de Usuarios:**
    *   Login seguro con validación de credenciales.
    *   Generación y validación de Token JWT.
    *   Protección de rutas en el frontend mediante `AuthGuard`.
*   **Gestión de Usuarios:**
    *   Listado de usuarios.
    *   Registro de nuevos usuarios.
*   **Gestión de Productos:**
    *   Listado de productos con paginación (Angular Material).
    *   Creación, Edición y Eliminación de productos.
    *   Uso de modales para formularios.
*   **Interfaz de Usuario:**
    *   Diseño responsivo y moderno con Material Design.
    *   Sidebar de navegación y Dashboard.
    *   Notificaciones y alertas.

## 🤝 Contribución

Si deseas contribuir a este proyecto, por favor crea un fork y envía un Pull Request con tus mejoras.

## 📝 Licencia

Este proyecto está bajo la licencia ISC.
