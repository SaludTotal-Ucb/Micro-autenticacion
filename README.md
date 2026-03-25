# 🏥 Sistema Salud Total - Microservicio de Autenticación - Backend

Este microservicio se encarga de la gestión de usuarios, generación de tokens JWT y validación de accesos para el ecosistema de Salud Total Bolivia.

## 🚀 Tecnologías Utilizadas

* **Runtime:** Node.js (v20+)
* **Lenguaje:** TypeScript
* **Framework:** Express.js
* **Herramientas de Calidad (Toolchain):** * [Biome](https://biomejs.dev/) (Linter & Formatter)
    * [Husky](https://typicode.github.io/husky/) (Pre-commit hooks)
* **Ejecutor:** [tsx](https://tsx.is/) (Reemplazo moderno de ts-node)

## 🛠️ Configuración Inicial

Para que el proyecto funcione en tu máquina (Windows o Mac), sigue estos pasos:

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz con lo siguiente:
    ```text
    PORT=3001
    JWT_SECRET=tu_clave_secreta_2026
    ```

3.  **Correr en modo desarrollo:**
    ```bash
    npm run dev
    ```

## 📏 Estándares de Código

Siguiendo el **Informe de Estándares**, este repositorio utiliza **Biome**. 
* **Comillas:** Simples (`singleQuote: true`)
* **Punto y coma:** Obligatorio (`semi: true`)
* **Indentación:** 2 espacios

Para formatear el código manualmente antes de un commit, puedes usar:
```bash
npm run format