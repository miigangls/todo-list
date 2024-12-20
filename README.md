# To-Do List · v2.0.0

Reescritura en **Vite + React 18 + TypeScript** del proyecto v1.0.0
(Create React App + JS). Misma funcionalidad, base más moderna.

## Stack

- **Vite 6** + React 18 + TypeScript (strict)
- **Firebase v10 (modular SDK)** — Auth + Firestore (listeners en tiempo real)
- **Formik** — formularios y validación
- **styled-components** — estilos componibles tipados
- **react-router-dom v6** — rutas con `PrivateRoute` / `PublicOnlyRoute`
- **lucide-react** — iconos

## Funcionalidad

- Login y registro con validación cliente y mapeo de errores de Firebase.
- Sesión persistida por Firebase; redirect a la URL original tras login.
- Tareas en tiempo real (`onSnapshot`) por usuario:
  - Crear, completar/reactivar, renombrar, eliminar.
  - Filtros (todas / activas / completadas).
  - Orden por fecha (recientes / antiguas) con `useMemo`.
  - Skeletons mientras carga.
- Logout en el header.

## Estructura

```
src/
  components/      # UI reutilizable (Button, Input, Message, Skeleton, …)
  firebase/        # config, context, helpers (auth + tasks), tipos
  hooks/           # useAuthenticated, useTasks, useComponents (legacy)
  modules/
    Auth/          # /login
    Register/      # /register
    Tasks/         # /  (dashboard)
  theme/           # tokens de styled-components
  utils.ts         # validateEmail, filter
```

## Setup

1. Instalar dependencias:
   ```bash
   yarn install
   ```
2. Copiar variables de entorno y completar con tus credenciales del proyecto
   Firebase:
   ```bash
   cp .env.example .env
   ```
3. Levantar dev server:
   ```bash
   yarn dev
   ```

## Variables de entorno

Todas con prefijo `VITE_` (ver `.env.example`):

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

`config.ts` valida que todas estén presentes y falla rápido si falta alguna.

## Reglas e índices de Firestore

- [`firestore.rules`](./firestore.rules) restringe `tasks-list` a documentos
  del propio usuario (`request.auth.uid == resource.data.userId`) y valida
  tipos/longitudes en `create`.
- [`firestore.indexes.json`](./firestore.indexes.json) declara el índice
  compuesto `userId ASC + createdAt DESC` que requiere la query de
  `subscribeToTasks`.

```bash
yarn deploy:rules
```

## Despliegue

Configurado en [`firebase.json`](./firebase.json) y
[`.firebaserc`](./.firebaserc). Hosting sirve `dist/` con SPA fallback a
`index.html` y cabeceras de cache inmutables para assets versionados.

```bash
# Solo hosting
yarn deploy:hosting

# Hosting + reglas + índices
yarn deploy
```

Requiere `firebase login` previa.

## Diferencias clave vs v1.0.0

| Tema | v1.0.0 | v2.0.0 |
|---|---|---|
| Build | CRA | Vite 6 |
| Lenguaje | JS | TS strict |
| Firebase SDK | v8 namespaced | v10 modular |
| Credenciales | hardcoded en `env.js` | `import.meta.env` validadas |
| Cookies de sesión | guardaba el `User` completo | confía en la persistencia interna de Firebase |
| Forms | hook propio + estado manual | Formik |
| Estilos | CSS plano + skeleton.css | styled-components |
| Listas | fetch + re-fetch en cada mutación | `onSnapshot` en tiempo real |
| Orden | por `key` de iteración | por `createdAt` (server timestamp) |
| Reglas FS | sin reglas explícitas | scope por `userId`, validación de tipos |
