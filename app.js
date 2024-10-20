const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors'); 
const jwt = require('jsonwebtoken');
const app = express();

let nombre_carpeta_Server="";
app.use(express.json());
// Habilitar CORS
app.use(cors());


app.use(`/docentes`, require('./routes/docentesRoute'));
app.use(`/docenteslaboral`, require('./routes/docentesLaboralRoute'));
app.use(`/docentesgrado`, require('./routes/docentesGradoRoute'));
app.use(`/docentescategoria`, require('./routes/docentesCategoriaRoute'));
app.use(`/docentesinvestiga`, require('./routes/docentesInvestigaRoute'));
app.use(`/docentescurso`, require('./routes/docentesCursoRoute'));
app.use(`/docentesencuesta`, require('./routes/docentesEncuestaRoute'));
app.use(`/curso`, require('./routes/cursoRoute'));
app.use(`/encuesta`, require('./routes/encuestaRoute'));
//app.use(`/categoria`, require('./routes/condicionRoute'));
app.use(`/departamentos`, require('./routes/departamentoRoute'));
app.use(`/provincias`, require('./routes/provinciaRoute'));
app.use(`/distritos`, require('./routes/distritoRoute'));
app.use(`/facultad`, require('./routes/facultadRoute'));
app.use(`/escuela`, require('./routes/escuelaRoute'));
app.use(`/programa`, require('./routes/programaRoute'));
app.use(`/login`, require('./routes/loginRoute'));


const PORT = process.env.PORT || 3000;

// Prueba de funcionamiento
app.get(`/distritos`, (req, res) => {
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