// routes/departamentos.js
const express = require('express');
const Banco = require('../models/Banco');
const { enviarReporteTabla } = require('../pdf/reportesTabla');


const router = express.Router();

router.get('/report', async (req, res) => {
  try {

    let bancos = await Banco.findAll();
    console.log(bancos);

   
    const tableBody = [
      ['ID', 'Nombre'] // Encabezados de la tabla
    ];
  
    // Añadir los departamentos como filas
    bancos.forEach(banco => {
      tableBody.push([banco.id.toString(), banco.nombre]);
    });
    

    await enviarReporteTabla(res, {
      titulo: 'REPORTE DE BANCOS',
      subtitulo: 'Lista de Bancos',
      tableBody,
      columnWidths: ['auto', 'auto'],
    });
  } catch (error) {
    res.json(error);
  }
});


router.get('/', async (req, res) => {
  let bancos;
  try {
    bancos = await Banco.findAll(  );
  } catch (error) {
    res.json(error);
  }
  res.json(bancos);
});

router.get('/total', async (req, res) => {
  try {
    const total = await Banco.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
});


router.post('/', async (req, res) => {
  let bancos;
  try {
    console.log(req.params);
    bancos = await Banco.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(bancos);
});

router.put('/:id', async (req, res) => {
  let bancos;
  try {
    console.log(req.body);
    bancos = await Banco.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(bancos);
});

router.delete('/:id', async (req, res) => {
  let bancos;
  try {
    bancos = await Banco.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(bancos);
});

module.exports = router;
