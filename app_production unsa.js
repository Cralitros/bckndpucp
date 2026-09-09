// app_production unsa.js — Wrapper de despliegue (entorno UNSA con subcarpeta).
// Mantiene compatibilidad con despliegues que invocan este archivo.
// Toda la lógica vive ahora en app.js; aquí solo se fija la configuración.
process.env.BASE_PATH = process.env.BASE_PATH || '/backendunsa/';
process.env.DB_SYNC = process.env.DB_SYNC || 'none';
require('./app.js');
