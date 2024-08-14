# Dream Match App

## Configuración de Variables de Entorno

Antes de comenzar con el proyecto, debes configurar las variables de entorno necesarias. Sigue estos pasos:

1. **Obtén tu API Key:**

   - Regístrate o inicia sesión en [API-Football](https://apifootball.com/).
   - Accede a tu panel de usuario y copia tu API Key.

2. **Configura las variables de entorno:**
   - Copia el archivo `.env.example` a un archivo `.env` en el mismo directorio raíz del proyecto.
   - Abre el archivo `.env` y agrega tu API Key

## Getting Started

Tienes dos opciones para comenzar con este proyecto:

### Opción 1: Usando npm

1. **Instalar dependencias:**

```bash
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

2. **Iniciar el servidor de desarrollo:**

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

### Opción 2: Usando Docker

Alternativamente, puedes ejecutar el proyecto usando Docker. Sigue estos pasos:

1. **Construir la imagen de Docker:**

   ```bash
   docker build -t dream-match-app .
   ```

2. **Ejecutar el contenedor de Docker:**

   ```bash
   docker run -p 3000:3000 dream-match-app
   ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Konami Code

Para desbloquear una función oculta en la aplicación, sigue estos pasos en la vista **/myteams**:

1. **Abre** la vista de mis equipos [http://localhost:3000/myteams](http://localhost:3000/myteams).
2. **Introduce** el siguiente código usando tu teclado:

Arrow Up, Arrow Up, Arrow Down, Arrow Down, Arrow Left, Arrow Right, Arrow Left, Arrow Right, B, A

3. **Disfruta** de la función oculta que aparecerá en la página.

### Notas

- Asegúrate de ingresar el código en el orden exacto.
- Debes estar en la vista /myteams.
