// routes/departamentos.js
const express = require('express');
const { Departamento, Provincia, Distrito } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');
const router = express.Router();

router.get('/report', async (req, res) => {
  
  try {

    let departamentos = await Departamento.findAll();
  //  console.log(departamentos);


    // Extrae los nombres de los campos del primer objeto y excluye 'createdAt' y 'updatedAt'
    const headers = Object.keys(departamentos[0].dataValues).filter(
      (field) => field !== 'createdAt' && field !== 'updatedAt'
    );

    const columnWidths = Array.from({ length: headers.length }, () => 'auto');
  //  console.log(headers);

    // Convierte los nombres de campos en un array de encabezados
    const tableBody = [
      headers // Usamos los nombres de los campos como encabezados
    ];
    departamentos.forEach(departamento => {
      tableBody.push(headers.map(header => departamento.dataValues[header]));
    });

    await enviarReporteTabla(res, {
      titulo: 'REPORTE DE DEPARTAMENTOS',
      subtitulo: 'Lista de departamentos',
      tableBody,
      columnWidths,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get('/total', async (req, res) => {
  try {
    const total = await Departamento.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
});

router.get('/', async (req, res) => {
  let departamentos;
  try {
    departamentos = await Departamento.findAll(
      {
        include: [{
          model: Provincia,
          include: {
            model: Distrito,
          }
        }]
      }
    );
    console.log(departamentos);
    
  } catch (error) {
    res.json(error);
  }
  res.json(departamentos);
});




router.post('/', async (req, res) => {
  let departamento;
  try {
   // console.log(req.params);
    departamento = await Departamento.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(departamento);
});

router.put('/:id', async (req, res) => {
  let departamento;
  try {
  //  console.log(req.body);
    departamento = await Departamento.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(departamento);
});

router.delete('/:id', async (req, res) => {
  let result;
  try {
    result = await Departamento.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(result);
});

module.exports = router;
