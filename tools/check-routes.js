// tools/check-routes.js — Verifica que el mapa de endpoints no haya cambiado
// respecto a la referencia canónica (tools/routes-reference.txt).
// Uso: node tools/check-routes.js [prefijo]
const fs = require('fs');
const path = require('path');
const { collectRoutes } = require('./route-map');

const prefix = process.argv[2] || '';
const refFile = path.join(__dirname, 'routes-reference.txt');

if (!fs.existsSync(refFile)) {
  console.error('Falta tools/routes-reference.txt');
  process.exit(2);
}

const current = collectRoutes(prefix);
const ref = fs
  .readFileSync(refFile, 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('Total rutas'))
  .sort();

if (JSON.stringify(current) === JSON.stringify(ref)) {
  console.log(`OK: mapa de endpoints idéntico a la referencia (${current.length} rutas).`);
  process.exit(0);
} else {
  console.log(
    `ERROR: el mapa de endpoints cambió (referencia=${ref.length}, actual=${current.length}).`
  );
  const setA = new Set(ref);
  for (const l of current) if (!setA.has(l)) console.log('  añadida:   ' + l);
  const setB = new Set(current);
  for (const l of ref) if (!setB.has(l)) console.log('  eliminada: ' + l);
  process.exit(1);
}
