const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors'); 
const jwt = require('jsonwebtoken');
const app = express();

let nombre_carpeta_Server="backendpucp";
app.use(express.json());
// Habilitar CORS
app.use(cors());


app.use(`/${nombre_carpeta_Server}/docentes`, require('./routes/docentesRoute'));
app.use(`/${nombre_carpeta_Server}/docenteslaboral`, require('./routes/docentesLaboralRoute'));
app.use(`/${nombre_carpeta_Server}/docentesgrado`, require('./routes/docentesGradoRoute'));
app.use(`/${nombre_carpeta_Server}/docentescategoria`, require('./routes/docentesCategoriaRoute'));
app.use(`/${nombre_carpeta_Server}/docentesinvestiga`, require('./routes/docentesInvestigaRoute'));
app.use(`/${nombre_carpeta_Server}/docentescurso`, require('./routes/docentesCursoRoute'));
app.use(`/${nombre_carpeta_Server}/docentesencuesta`, require('./routes/docentesEncuestaRoute'));
app.use(`/${nombre_carpeta_Server}/curso`, require('./routes/cursoRoute'));
app.use(`/${nombre_carpeta_Server}/encuesta`, require('./routes/encuestaRoute'));
app.use(`/${nombre_carpeta_Server}/categoria`, require('./routes/condicionRoute'));
app.use(`/${nombre_carpeta_Server}/departamentos`, require('./routes/departamentoRoute'));
app.use(`/${nombre_carpeta_Server}/provincias`, require('./routes/provinciaRoute'));
app.use(`/${nombre_carpeta_Server}/distritos`, require('./routes/distritoRoute'));


const PORT = process.env.PORT || 3000;

// Prueba de funcionamiento
app.get(`/${nombre_carpeta_Server}/distritos`, (req, res) => {
  res.send('Servidor está funcionando correctamente');
});

// Inicializar Sequelize
sequelize.sync({ alter: true }) // Sincronizar los modelos con la base de datos (alter: true permite hacer cambios en la estructura de las tablas)
  .then(() => {
    console.log('Conexión exitosa con la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });


try {
  app.listen( );
} catch (err) {
  console.error('Error al iniciar el servidor:', err);
}