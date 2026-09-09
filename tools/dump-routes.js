// Herramienta de diagnóstico: imprime el mapa de rutas HTTP tal como las monta app.js.
// No conecta a la BD; solo crea el app Express y registra los routers.
// Uso: node tools/dump-routes.js [prefijo]
const path = require('path');
const express = require('express');

// Resolver rutas relativas a la raíz del proyecto (no a tools/)
const resolve = (p) => require(path.resolve(__dirname, '..', p));

const mounts = [
  ['/docentes', './routes/docentesRoute'],
  ['/docenteslaboral', './routes/docentesLaboralRoute'],
  ['/docentesgrado', './routes/docentesGradoRoute'],
  ['/docentescategoria', './routes/docentesCategoriaRoute'],
  ['/docentesinvestiga', './routes/docentesInvestigaRoute'],
  ['/docentescurso', './routes/docentesCursoRoute'],
  ['/docentesencuesta', './routes/docentesEncuestaRoute'],
  ['/docentesinfo', './routes/docentesInfoRoute'],
  ['/curso', './routes/cursoRoute'],
  ['/encuesta', './routes/encuestaRoute'],
  ['/departamentos', './routes/departamentoRoute'],
  ['/provincias', './routes/provinciaRoute'],
  ['/distritos', './routes/distritoRoute'],
  ['/facultad', './routes/facultadRoute'],
  ['/escuela', './routes/escuelaRoute'],
  ['/programa', './routes/programaRoute'],
  ['/login', './routes/loginRoute'],
  ['/bancos', './routes/bancoRoute'],
  ['/nacionalidad', './routes/nacionalidadRoute'],
  ['/afps', './routes/afpRoute'],
  ['/area', './routes/areaRoute'],
  ['/plan', './routes/planRoute'],
  ['/firma', './routes/firmaRoute'],
];

const app = express();
const prefix = process.argv[2] || '';
const rows = [];

function walk(stack, basePath) {
  for (const layer of stack) {
    if (!layer.route) continue;
    const route = layer.route;
    const path = (basePath + route.path).replace(/\/{2,}/g, '/');
    for (const method of Object.keys(route.methods)) {
      rows.push(`${method.toUpperCase().padEnd(6)} ${path}`);
    }
  }
}

for (const [mount, file] of mounts) {
  const router = resolve(file);
  walk(router.stack, `${prefix}${mount}`);
}

// Ruta de prueba de app.js (GET /distritos y GET /distritos/  -> queda detrás del router; igual se lista)
rows.push('GET     ' + `${prefix}/distritos`.replace(/\/{2,}/g, '/') + '  <- app.js health check (tras router, inalcanzable si router responde)');

rows.sort();
console.log(`Total rutas (sin health): ${rows.length - 1}`);
for (const r of rows) console.log(r);
