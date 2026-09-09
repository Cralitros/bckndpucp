// tools/smoke-json.js — Compara el comportamiento HTTP de endpoints JSON de
// lectura entre dos árboles del proyecto (para validar refactors).
// Uso: node tools/smoke-json.js <rutaProyecto>
//
// NOTA: los GET que listan docentes con includes pesados (docentes, curso,
// escuela...) emiten console.log enormes en el código original; para no
// saturar, esta herramienta captura solo el cuerpo/status y recorta salida.
const path = require('path');
const project = path.resolve(process.argv[2]);
const express = require('express');

// Rutas de lectura ligeras (catálogos) que existen en la BD local pucp
const checks = [
  ['/afps', 'routes/afpRoute'],
  ['/bancos', 'routes/bancoRoute'],
  ['/departamentos', 'routes/departamentoRoute'],
  ['/nacionalidad', 'routes/nacionalidadRoute'],
  ['/area', 'routes/areaRoute'],
  ['/firma', 'routes/firmaRoute'],
  ['/plan', 'routes/planRoute'],
];

(async () => {
  const app = express();
  for (const [m, r] of checks) {
    try {
      app.use(m, require(path.join(project, r)));
    } catch (e) {
      console.log(`${m} LOAD_ERROR ${e.message.split('\n')[0]}`);
    }
  }
  const srv = app.listen(0, async () => {
    const port = srv.address().port;
    const results = {};
    for (const [m] of checks) {
      try {
        const resp = await fetch(`http://127.0.0.1:${port}${m}/`);
        const text = await resp.text();
        results[m] = { status: resp.status, bytes: Buffer.byteLength(text) };
      } catch (e) {
        results[m] = { error: e.message };
      }
    }
    srv.close();
    console.log(JSON.stringify(results));
    process.exit(0);
  });
  setTimeout(() => {
    console.log('TIMEOUT');
    process.exit(2);
  }, 30000);
})();
