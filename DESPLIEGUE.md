# Despliegue del backend (Node + Express) en BanaHosting

Al subir cambios a la rama **main** en GitHub, el flujo
`.github/workflows/desplegar-backend.yml` sube el código por FTP y reinicia la
aplicación. No hace falta entrar al servidor.

```
git push  →  GitHub Actions: FTP  →  carpeta del backend  →  reinicio (tmp/restart.txt)
```

## 1. Preparar el repositorio en GitHub

En la máquina local, dentro de `D:\Proyectos\backendpucp`:

```bash
git add -A
git commit -m "Historial de reconocimientos + limpieza de campos fijos"
git remote add origin https://github.com/TU_USUARIO/backendpucp.git
git push -u origin main
```

> Recomendado: repositorio **privado**. El archivo `.env` (con las credenciales de
> MySQL y el `JWT_SECRET`) ya está en el `.gitignore` y **no se sube nunca**. El
> del servidor se queda como está: el despliegue no lo toca.

## 2. Crear la cuenta FTP en cPanel

cPanel → **FTP Accounts**. Anota servidor, usuario y contraseña.

## 3. Averiguar la carpeta del backend

cPanel → **File Manager**: busca la carpeta que contiene `app.js`, `models/` y
`routes/` (la aplicación Node). Suele ser algo como:

```
/home/USUARIO/backendPucp2/        (o /public_html/backendPucp2/)
```

Esa es la carpeta de destino.

## 4. Guardar los datos en GitHub como Secrets

GitHub → repositorio → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Ejemplo |
|---|---|
| `FTP_SERVER` | `ftp.derechopucp.com` |
| `FTP_USUARIO` | `usuario@derechopucp.com` |
| `FTP_PASSWORD` | (la contraseña del FTP) |
| `FTP_CARPETA_BACK` | `/home/USUARIO/backendPucp2/` |

## 5. Desplegar

- Automático: cualquier `git push` a `main`.
- Manual: GitHub → **Actions** → *Desplegar backend* → **Run workflow**.

El flujo sube el código (sin `node_modules`, sin `.env`) y luego sube
`.deploy/restart.txt` a `tmp/`, que es lo que hace que Passenger reinicie la app.

## Notas importantes

- **Si cambian las dependencias** (`package.json`), después del despliegue entra
  en cPanel → **Setup Node.js App** → tu aplicación → **Run NPM Install** (el FTP
  no instala paquetes).
- **Si el reinicio no ocurre**: cPanel → Setup Node.js App → **Restart**, o crea
  la carpeta `tmp/` dentro del backend si no existe.
- **La base de datos no se migra sola**: los scripts de `sql/` se ejecutan a mano
  en phpMyAdmin (por ejemplo el `ALTER TABLE` de `reconocimientos` o el borrado de
  los campos fijos).
- El despliegue **nunca borra** archivos del servidor (`dangerous-clean-slate:
  false`): no se pierden `.env`, `node_modules` ni nada que exista sólo allí.
- Los archivos `fonts/` y `pdf/` sí se suben: los necesita la generación de
  reportes.
