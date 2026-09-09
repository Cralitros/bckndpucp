// config/index.js — Configuración centralizada de la aplicación.
// Carga variables de entorno (.env) y expone valores con los mismos
// comportamientos por defecto que tenía el código original.
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
};
