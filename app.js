const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
// Habilitar CORS
app.use(cors());


app.use('/docentes', require('./routes/docentesRoute'));
app.use('/docenteslaboral', require('./routes/docentesLaboralRoute'));
app.use('/docentesgrado', require('./routes/docentesGradoRoute'));
app.use('/docentescategoria', require('./routes/docentesCategoriaRoute'));
app.use('/docentesinvestiga', require('./routes/docentesInvestigaRoute'));
app.use('/docentescurso', require('./routes/docentesCursoRoute'));
app.use('/docentesencuesta', require('./routes/docentesEncuestaRoute'));
app.use('/curso', require('./routes/cursoRoute'));
app.use('/encuesta', require('./routes/encuestaRoute'));
app.use('/categoria', require('./routes/condicionRoute'));
app.use('/departae', require('./routes/condicionRoute'));
app.use('/categoria', require('./routes/condicionRoute'));
app.use('/departamentos', require('./routes/departamentoRoute'));
app.use('/provincias', require('./routes/provinciaRoute'));
app.use('/distritos', require('./routes/distritoRoute'));


const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
      console.log('Servidor iniciado en http://localhost:3000');
  });
}).catch(err => {
  console.error('No se pudo conectar a la base de datos:', err);
});

