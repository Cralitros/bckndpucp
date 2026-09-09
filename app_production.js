// app_production.js — Wrapper de despliegue (entorno PUCP con subcarpeta).
// Mantiene compatibilidad con despliegues que invocan `node app_production.js`.
// Toda la lógica vive ahora en app.js; aquí solo se fija la configuración.
//
// IMPORTANTE: dotenv se carga PRIMERO para que los valores del .env del
// servidor tengan prioridad sobre estos valores por defecto.
require('dotenv').config({ quiet: true });

process.env.BASE_PATH = process.env.BASE_PATH || '/backendpucp/';
process.env.DB_SYNC = process.env.DB_SYNC || 'none';
require('./app.js');
