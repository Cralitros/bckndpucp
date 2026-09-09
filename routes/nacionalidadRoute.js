// routes/departamentos.js
const express = require('express');
const Nacionalidad = require('../models/Nacionalidad');
const { enviarReporteTabla } = require('../pdf/reportesTabla');


const router = express.Router();

router.get('/report', async (req, res) => {
  try {

    let nacionalidades = await Nacionalidad.findAll();
    console.log(nacionalidades);

   
    const tableBody = [
      ['ID', 'Nombre'] // Encabezados de la tabla
    ];
  
    // Añadir los departamentos como filas
    nacionalidades.forEach(nacionalidad => {
      tableBody.push([nacionalidad.id.toString(), nacionalidad.nombre]);
    });
    

    await enviarReporteTabla(res, {
      titulo: 'REPORTE DE NACIONALIDADES',
      subtitulo: 'Lista de nacionalidades',
      tableBody,
      columnWidths: ['auto', 'auto'],
    });
  } catch (error) {
    res.json(error);
  }
});


router.get('/', async (req, res) => {
  let nacionalidad;
  try {
    nacionalidad = await Nacionalidad.findAll(  );
  } catch (error) {
    res.json(error);
  }
  res.json(nacionalidad);
});

router.get('/total', async (req, res) => {
  try {
    const total = await Nacionalidad.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
});

router.post('/', async (req, res) => {
  let nacionalidad;
  try {
    console.log(req.params);
    nacionalidad = await Nacionalidad.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(nacionalidad);
});

router.put('/:id', async (req, res) => {
  let nacionalidad;
  try {
    console.log(req.body);
    nacionalidad = await Nacionalidad.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(nacionalidad);
});

router.delete('/:id', async (req, res) => {
  let nacionalidad;
  try {
    nacionalidad = await Nacionalidad.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(nacionalidad);
});

module.exports = router;
