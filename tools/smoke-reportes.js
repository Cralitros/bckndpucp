// tools/smoke-reportes.js — Compara el comportamiento HTTP de los endpoints
// /report entre dos árboles del proyecto (para validar refactors).
// Uso: node tools/smoke-reportes.js <rutaProyecto>
const path = require('path');
const project = path.resolve(process.argv[2]);
const express = require('express');

const routers = {
  '/afps': 'routes/afpRoute',
  '/departamentos': 'routes/departamentoRoute',
  '/bancos': 'routes/bancoRoute',
  '/docentes': 'routes/docentesRoute',
  '/docentescategoria': 'routes/docentesCategoriaRoute',
  '/curso': 'routes/cursoRoute',
  '/escuela': 'routes/escuelaRoute',
  '/nacionalidad': 'routes/nacionalidadRoute',
  '/encuesta': 'routes/encuestaRoute',
  '/facultad': 'routes/facultadRoute',
  '/plan': 'routes/planRoute',
  '/docenteslaboral': 'routes/docentesLaboralRoute',
  '/docentesinfo': 'routes/docentesInfoRoute',
};

(async () => {
  const app = express();
  for (const [m, r] of Object.entries(routers)) {
    try {
      app.use(m, require(path.join(project, r)));
    } catch (e) {
      console.log(`${m} LOAD_ERROR ${e.message.split('\n')[0]}`);
    }
  }
  const srv = app.listen(0, async () => {
    const port = srv.address().port;
    const results = {};
    for (const m of Object.keys(routers)) {
      try {
        const resp = await fetch(`http://127.0.0.1:${port}${m}/report`);
        const buf = Buffer.from(await resp.arrayBuffer());
        const isPdf = buf.slice(0, 5).toString() === '%PDF-';
        results[m] = { status: resp.status, pdf: isPdf, bytes: buf.length };
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
  }, 40000);
})();
