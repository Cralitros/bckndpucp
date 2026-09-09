// routes/departamentos.js
const express = require('express');

const { Facultad, Escuela, Programas } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');
const router = express.Router();

router.get('/report', async (req, res) => {

  try {

    let general = await Escuela.findAll(
      {
        include: [Facultad, Programas]
      }
    );
    console.log(general);


    // Extrae los nombres de los campos del primer objeto y excluye 'createdAt' y 'updatedAt'
    const headers = Object.keys(general[0].dataValues).filter(
      (field) => field !== 'createdAt' && field !== 'updatedAt' && field !== 'Programas'
    );

    const columnWidths = Array.from({ length: headers.length }, () => 'auto');
    console.log(headers);

    // Convierte los nombres de campos en un array de encabezados
    const tableBody = [
      headers // Usamos los nombres de los campos como encabezados
    ];
    general.forEach(gen => {
      tableBody.push(headers.map(header => {
        // Si el header es 'Facultad' (que es un objeto), obtenemos el nombre
        if (header === 'Facultad') {
          return gen.dataValues.Facultad.nombre; // 'nombre' es el atributo deseado del objeto Facultad
        }
        return gen.dataValues[header];
      }));
    });



    await enviarReporteTabla(res, {
      titulo: 'REPORTE DE DEPARTAMENTO ACADÉMICO',
      subtitulo: 'Lista de departamento',
      tableBody,
      columnWidths,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get('/total', async (req, res) => {
  try {
    const total = await Escuela.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
});

router.get('/', async (req, res) => {
  let facultades;
  try {
    facultades = await Escuela.findAll(
      {
        include: [Facultad, Programas]
      }
    );
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});
router.get('/:id', async (req, res) => {
  let facultades;
  try {
    facultades = await Escuela.findAll(
      {
        include: [Facultad, Programas],
        where: { id: req.params.id }
      }
    );
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});

router.get('/lista/:id', async (req, res) => {
  let facultades;
  try {
    facultades = await Escuela.findAll(
      {
        include: [Facultad, Programas],
        where: { idFacultad: req.params.id }
      }
    );
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});


router.post('/', async (req, res) => {
  let facultades;
  try {
    console.log(req.params);
    facultades = await Escuela.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});

router.put('/:id', async (req, res) => {
  let facultades;
  try {
    console.log(req.body);
    facultades = await Escuela.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});

router.delete('/:id', async (req, res) => {
  let facultades;
  try {
    facultades = await Escuela.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});

module.exports = router;
