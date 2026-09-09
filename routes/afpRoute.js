// routes/departamentos.js
const express = require('express');
const Afp = require('../models/Afp');
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
  let afps;
  try {
    afps = await Afp.findAll(  );
  } catch (error) {
    res.json(error);
  }
  res.json(afps);
});
router.get('/total', async (req, res) => {
  try {
    const total = await Afp.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
});


router.post('/', async (req, res) => {
  let afps;
  try {
    console.log(req.params);
    afps = await Afp.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(afps);
});

router.put('/:id', async (req, res) => {
  let afps;
  try {
    console.log(req.body);
    afps = await Afp.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(bancos);
});

router.delete('/:id', async (req, res) => {
  let afps;
  try {
    afps = await Afp.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(afps);
});

module.exports = router;
