// app.js — Punto de entrada único del backend.
// Reemplaza a los antiguos app.js / app_production.js / "app_production unsa.js":
// el comportamiento de cada entorno se controla con variables de entorno (.env):
//   PORT, BASE_PATH (prefijo de URL, ej. /backendpucp/), CORS_ORIGIN, DB_SYNC...
const express = require('express');
const cors = require('cors');
const config = require('./config');
const sequelize = require('./config/database');

//EXPREESS ES EL SERIVDOR POR EXCELNCIA Y VALIDA PAR AVER SI FUNCIONA MI PRUEBA
const app = express();

app.use(express.json());

// CORS: si CORS_ORIGIN es "*" se permite todo (comportamiento original);
// si se lista un origen concreto (o varios separados por coma), se restringe.
const origins = config.corsOrigin;
app.use(cors(origins.includes('*') ? {} : { origin: origins }));

const basePath = config.basePath; // '' en local, '/backendpucp' en producción con subcarpeta

// ---------------------------------------------------------------------------
// Comprobación de despliegue (visible en el navegador).
//   https://derechopucp.com/backendPucp2/version
// Devuelve qué versión está corriendo AHORA en el servidor. El archivo
// version.json lo genera el despliegue (GitHub Actions) en cada subida: si el
// commit que ves aquí no es el último que subiste, el despliegue no llegó.
// Se registra ANTES de los routers para que nada lo tape.
// ---------------------------------------------------------------------------
const fs = require('fs');
const path = require('path');

app.get(`${basePath}/version`, (req, res) => {
  let datos = { commit: 'desconocido', nota: 'No hay version.json en el servidor.' };
  try {
    datos = JSON.parse(fs.readFileSync(path.join(__dirname, 'version.json'), 'utf8'));
  } catch (error) {
    datos.nota = `No se pudo leer version.json: ${error.message}`;
  }
  res.json({
    ...datos,
    basePath,
    node: process.version,
    consultado: new Date().toISOString(),
  });
});

// ---------------------------------------------------------------
// Registro de rutas (mismo conjunto que el app.js original de desarrollo)
// ---------------------------------------------------------------
app.use(`${basePath}/docentes`, require('./routes/docentesRoute'));
app.use(`${basePath}/docenteslaboral`, require('./routes/docentesLaboralRoute'));
app.use(`${basePath}/docentesgrado`, require('./routes/docentesGradoRoute'));
app.use(`${basePath}/docentescategoria`, require('./routes/docentesCategoriaRoute'));
app.use(`${basePath}/docentesinvestiga`, require('./routes/docentesInvestigaRoute'));
app.use(`${basePath}/docentescurso`, require('./routes/docentesCursoRoute'));
app.use(`${basePath}/docentesencuesta`, require('./routes/docentesEncuestaRoute'));
app.use(`${basePath}/docentesinfo`, require('./routes/docentesInfoRoute'));
app.use(`${basePath}/curso`, require('./routes/cursoRoute'));
app.use(`${basePath}/encuesta`, require('./routes/encuestaRoute'));
app.use(`${basePath}/departamentos`, require('./routes/departamentoRoute'));
app.use(`${basePath}/provincias`, require('./routes/provinciaRoute'));
app.use(`${basePath}/distritos`, require('./routes/distritoRoute'));
app.use(`${basePath}/facultad`, require('./routes/facultadRoute'));
app.use(`${basePath}/escuela`, require('./routes/escuelaRoute'));
app.use(`${basePath}/programa`, require('./routes/programaRoute'));
app.use(`${basePath}/login`, require('./routes/loginRoute'));
app.use(`${basePath}/bancos`, require('./routes/bancoRoute'));
app.use(`${basePath}/nacionalidad`, require('./routes/nacionalidadRoute'));
app.use(`${basePath}/afps`, require('./routes/afpRoute'));
app.use(`${basePath}/area`, require('./routes/areaRoute'));
app.use(`${basePath}/plan`, require('./routes/planRoute'));
app.use(`${basePath}/firma`, require('./routes/firmaRoute'));

const PORT = config.port;

// Prueba de funcionamiento (mismo comportamiento que el app.js original:
// se registra después de las rutas, por lo que /distritos lo responde el router).
app.get(`${basePath}/distritos`, (req, res) => {
  res.send('Servidor está funcionando correctamente');
});

// ---------------------------------------------------------------------------
// Sincronización de modelos con la BD. Controlada por DB_SYNC:
//   none  -> no se toca la BD (recomendado en producción)
//   alter -> ALTER TABLE (peligroso: modifica el esquema)
//   force -> DROP + CREATE (¡borra datos! solo desarrollo)
// El app.js original sincronizaba con alter:false y los archivos de producción
// con alter:true / force:false; con .env se replica cualquiera de esos modos.
// ---------------------------------------------------------------------------
async function start() {
  try {
    if (config.dbSync !== 'none') {
      await sequelize.sync(
        config.dbSync === 'force'
          ? { force: true }
          : config.dbSync === 'alter'
            ? { alter: true }
            : {}
      );
    } else {
      await sequelize.authenticate();
    }

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}${basePath}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
}

start();

module.exports = app;
