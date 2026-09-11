# bckndpucp — Backend de gestión de docentes (PUCP)
# esto es una prueba quiero saber si se actualiza
API Node.js/Express + Sequelize (MySQL) para la administración de docentes,
cursos, encuestas, grados académicos y generación de documentos (PDF/DOCX).

## Requisitos

- Node.js 18+ (probado con Node 25)
- MySQL (base de datos local `pucp` para desarrollo)

## Configuración

1. Copia `.env.example` a `.env` y ajusta los valores:

   ```powershell
   Copy-Item .env.example .env
   ```

2. Instala dependencias:

   ```powershell
   npm install
   ```

3. Arranca en desarrollo:

   ```powershell
   npm run dev        # con nodemon (recarga automática)
   # o
   npm start          # node app.js
   ```

## Variables de entorno (`.env`)

| Variable       | Descripción                                                       | Default  |
| -------------- | ----------------------------------------------------------------- | -------- |
| `PORT`         | Puerto HTTP                                                       | `3000`   |
| `BASE_PATH`    | Prefijo de URL, p. ej. `/backendpucp/` en hosting con subcarpeta  | *(vacío)*|
| `DB_HOST`      | Host de MySQL                                                     | `localhost` |
| `DB_PORT`      | Puerto de MySQL                                                   | `3306`   |
| `DB_NAME`      | Nombre de la BD                                                   | `pucp`   |
| `DB_USER`      | Usuario MySQL                                                     | `root`   |
| `DB_PASSWORD`  | Contraseña MySQL                                                  | *(vacío)*|
| `DB_LOGGING`   | `false` para silenciar el SQL en consola                          | `true`   |
| `DB_SYNC`      | `none` (default), `alter` o `force` — ver abajo                   | `none`   |
| `JWT_SECRET`   | Secreto para firmar tokens JWT (fallback `secretkey`)             | *(vacío)*|
| `CORS_ORIGIN`  | Orígenes permitidos, separados por coma. `*` = todos              | `*`      |

### Sincronización de modelos (`DB_SYNC`)

Sequelize puede sincronizar el esquema al arrancar:

- `none` — no toca la BD (recomendado para producción)
- `alter` — ejecuta `ALTER TABLE` (peligroso: modifica el esquema)
- `force` — recrea las tablas (**borra datos**, solo desarrollo)

> Históricamente el proyecto sincronizaba en cada arranque (`app.js` con
> `alter:false`, `app_production.js` con `alter:true`). Eso puede crear o
> alterar tablas solas; por eso ahora está desactivado por defecto.

## Despliegue

Un único `app.js` cubre todos los entornos mediante `.env`:

- **Local** (dev): `npm start` con `BASE_PATH` vacío.
- **Producción PUCP** (subcarpeta): `BASE_PATH=/backendpucp/` — o ejecuta el
  wrapper `app_production.js`, que fija ese prefijo y delega en `app.js`.
- **Producción UNSA** (subcarpeta): `BASE_PATH=/backendunsa/` — o ejecuta el
  wrapper `app_production unsa.js`.

En el hosting, crea el `.env` con las credenciales de esa BD y **no uses
`DB_SYNC=alter/force`** salvo que sepas lo que haces.

## Estructura

```
app.js                  Punto de entrada único (rutas + arranque)
app_production.js       Wrapper de despliegue (prefijo /backendpucp/)
app_production unsa.js  Wrapper de despliegue (prefijo /backendunsa/)
config/
  index.js              Configuración central (variables de entorno)
  database.js           Conexión Sequelize
models/                 Modelos Sequelize (+ index.js con asociaciones)
routes/                 Routers Express por recurso
pdf/                    Generadores de documentos (reportes PDF, contratos)
tools/
  route-map.js          Lógica de inspección del mapa de rutas
  dump-routes.js        CLI: lista endpoints (node tools/dump-routes.js)
  check-routes.js       Verifica que el mapa de rutas no cambió
public/images/logo.png  Logo usado en los reportes PDF
fonts/                  Tipografías Roboto para pdfmake
```

## Verificación de regresión de rutas

Hay un mapa canónico de endpoints en `tools/routes-reference.txt`. Tras
cualquier cambio estructural puedes comprobar que la API no perdió ni ganó
rutas:

```powershell
node tools/check-routes.js
# o con prefijo de producción:
node tools/check-routes.js /backendpucp
```

## Notas de seguridad

- El repositorio **no debe contener credenciales**. Se eliminaron los archivos
  `config/database - unsa.js` y `config/database - copia.js`, que tenían
  contraseñas reales y estaban publicados en un repo público de GitHub.
  **Rota esas contraseñas de BD** (siguen en el historial de git) y usa `.env`.
- El secreto JWT por defecto es `secretkey` (compatibilidad); en producción
  define `JWT_SECRET`.
- Las rutas de la API no exigen token todavía (comportamiento original); si se
  quiere proteger, hay que añadir un middleware de autenticación.
