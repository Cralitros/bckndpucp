const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors'); 
const jwt = require('jsonwebtoken');
const app = express();

let nombre_carpeta_Server="/backendpucp/";
app.use(express.json());
// Habilitar CORS
app.use(cors());


app.use(`${nombre_carpeta_Server}docentes`, require('./routes/docentesRoute'));
app.use(`${nombre_carpeta_Server}docenteslaboral`, require('./routes/docentesLaboralRoute'));
app.use(`${nombre_carpeta_Server}docentesgrado`, require('./routes/docentesGradoRoute'));
app.use(`${nombre_carpeta_Server}docentescategoria`, require('./routes/docentesCategoriaRoute'));
app.use(`${nombre_carpeta_Server}docentesinvestiga`, require('./routes/docentesInvestigaRoute'));
app.use(`${nombre_carpeta_Server}docentescurso`, require('./routes/docentesCursoRoute'));
app.use(`${nombre_carpeta_Server}docentesencuesta`, require('./routes/docentesEncuestaRoute'));
app.use(`${nombre_carpeta_Server}curso`, require('./routes/cursoRoute'));
app.use(`${nombre_carpeta_Server}encuesta`, require('./routes/encuestaRoute'));
//app.use(`${nombre_carpeta_Server}categoria`, require('./routes/condicionRoute'));
app.use(`${nombre_carpeta_Server}departamentos`, require('./routes/departamentoRoute'));
app.use(`${nombre_carpeta_Server}provincias`, require('./routes/provinciaRoute'));
app.use(`${nombre_carpeta_Server}distritos`, require('./routes/distritoRoute'));
app.use(`${nombre_carpeta_Server}facultad`, require('./routes/facultadRoute'));
app.use(`${nombre_carpeta_Server}escuela`, require('./routes/escuelaRoute'));
app.use(`${nombre_carpeta_Server}programa`, require('./routes/programaRoute'));
app.use(`${nombre_carpeta_Server}login`, require('./routes/loginRoute'));
app.use(`${nombre_carpeta_Server}nacionalidad`, require('./routes/nacionalidadRoute'));
app.use(`${nombre_carpeta_Server}bancos`, require('./routes/bancoRoute'));
app.use(`${nombre_carpeta_Server}afps`, require('./routes/afpRoute'));
app.use(`${nombre_carpeta_Server}area`, require('./routes/areaRoute'));
app.use(`${nombre_carpeta_Server}plan`, require('./routes/planRoute'));
app.use(`${nombre_carpeta_Server}firma`, require('./routes/firmaRoute'));

const PORT = process.env.PORT || 3000;

// Prueba de funcionamiento
app.get(`/${nombre_carpeta_Server}/distritos`, (req, res) => {
  res.send('Servidor está funcionando correctamente');
});

sequelize.sync({ force: false }).then(() => {
  try {
    app.listen(PORT, () => {
      console.log('Servidor iniciado en http://localhost:3000');
    });
  } catch (error) {
    console.log(error);
  }

}).catch(err => {
  console.error('No se pudo conectar a la base de datos:', err);
});