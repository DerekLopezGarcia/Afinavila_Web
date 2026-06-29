# Afinavila Web

Aplicación web para la consulta de documentación de comunidades de propietarios.

## Stack

- **React 19** + **React Router 7**
- **Vite 8**
- **Tailwind CSS 4**

## Estructura

```
src/
├── App.jsx                  # Rutas (/, /clientes, /clientes/:id)
├── pages/
│   ├── Home.jsx             # Landing page corporativa
│   ├── Login.jsx            # Login con código de acceso
│   └── Cliente.jsx          # Grid de documentos con tabs por categoría
├── components/
│   ├── Header.jsx
│   └── Footer.jsx
└── services/
    └── api.js               # Cliente fetch (GET /api/comunidades, /api/archivos, etc.)
```

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
```

La API se accede vía proxy de Vite (`/api` → `http://localhost:8081`).

## Build

```bash
npm run build      # → dist/
```

## Docker

El `Dockerfile` usa multi-stage: Node 22 build → nginx alpine. El `nginx.conf` sirve la SPA y hace proxy de `/api/*` al contenedor `api:8081`.
