// tools/dump-routes.js — Imprime el mapa de rutas HTTP (CLI).
// Uso: node tools/dump-routes.js [prefijo]
const { collectRoutes } = require('./route-map');

const prefix = process.argv[2] || '';
const rows = collectRoutes(prefix);
console.log(`Total rutas: ${rows.length}`);
for (const r of rows) console.log(r);
