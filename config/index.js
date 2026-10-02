// config/index.js — Configuración centralizada de la aplicación.
// Carga variables de entorno (.env) y expone valores con los mismos
// comportamientos por defecto que tenía el código original.
const path = require('path');
require('dotenv').config({ quiet: true });

module.exports = {
  // Prefijo de URL para montar las rutas ("" en local, "/backendpucp/" en
  // producción con subcarpeta). Se normaliza para que empiece y termine con "/".
  get basePath() {
    const raw = process.env.BASE_PATH || '';
    let p = raw.trim();
    if (p && !p.startsWith('/')) p = '/' + p;
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
    return p;
  },
  port: Number(process.env.PORT || 3000),
  // Secreto JWT. Fallback a 'secretkey' (valor original) para no invalidar
  // tokens emitidos antes de la migración a variables de entorno.
  jwtSecret: process.env.JWT_SECRET || 'secretkey',
  corsOrigin: (process.env.CORS_ORIGIN || '*')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  // Modo de sincronización: none | alter | force (por defecto no sincroniza).
  dbSync: (process.env.DB_SYNC || 'none').toLowerCase(),
  // Carpeta donde viven los documentos que sustentan los eventos del histórico
  // de categoría. Por defecto, una hermana de la carpeta de la aplicación: el
  // despliegue por FTP sube el código a su carpeta y no toca lo de al lado.
  // Conviene fijarla con DIR_DOCUMENTOS fuera de public_html (son documentos de
  // docentes y no deben poder abrirse por URL).
  get documentosDir() {
    return process.env.DIR_DOCUMENTOS || path.join(__dirname, '..', 'documentos-docentes');
  },
};
