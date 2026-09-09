// routes/departamentos.js
const express = require('express');
const Area = require('../models/Area');
const { enviarReporteTabla } = require('../pdf/reportesTabla');


const router = express.Router();

router.get('/report', async (req, res) => {
  try {

    let afps = await Afp.findAll();
    console.log(afps);

   
    const tableBody = [
      ['ID', 'Nombre'] // Encabezados de la tabla
    ];
  
    // Añadir los departamentos como filas
    afps.forEach(afp => {
      tableBody.push([afp.id.toString(), afp.nombre]);
    });
    

    await enviarReporteTabla(res, {
      titulo: 'REPORTE DE AFP',
      subtitulo: 'Lista de AFP',
      tableBody,
      columnWidths: ['auto', 'auto'],
    });
  } catch (error) {
    res.json(error);
  }
});


router.get('/', async (req, res) => {
  let areas;
  try {
    areas = await Area.findAll(  );
  } catch (error) {
    res.json(error);
  }
  res.json(areas);
});

router.get('/total', async (req, res) => {
  try {
    const total = await Area.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
});

router.post('/', async (req, res) => {
  let areas;
  try {
    console.log(req.params);
    areas = await Area.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(areas);
});

router.put('/:id', async (req, res) => {
  let areas;
  try {
    console.log(req.body);
    areas = await Area.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(bancos);
});

router.delete('/:id', async (req, res) => {
  let areas;
  try {
    areas = await Area.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(areas);
});

module.exports = router;
