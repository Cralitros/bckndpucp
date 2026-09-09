// tools/route-map.js — Lógica compartida para listar el mapa de rutas HTTP.
// Se usa tanto desde dump-routes.js (CLI) como desde check-routes.js.
const path = require('path');

// Montajes idénticos a app.js (sin la ruta de "prueba de funcionamiento").
const MOUNTS = [
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

// Resolver rutas relativas a la raíz del proyecto (no a tools/)
const resolve = (p) => require(path.resolve(__dirname, '..', p));

function collectRoutes(prefix = '') {
  const rows = [];
  const walk = (stack, basePath) => {
    for (const layer of stack) {
      if (!layer.route) continue;
      const route = layer.route;
      const routePath = (basePath + route.path).replace(/\/{2,}/g, '/');
      for (const method of Object.keys(route.methods)) {
        rows.push(`${method.toUpperCase().padEnd(6)} ${routePath}`);
      }
    }
  };

  for (const [mount, file] of MOUNTS) {
    const router = resolve(file);
    walk(router.stack, `${prefix}${mount}`);
  }
  return [...new Set(rows)].sort();
}

module.exports = { collectRoutes, MOUNTS };
