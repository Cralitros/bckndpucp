// routes/ciudades.js
const express = require('express');

const { Departamento, Provincia, Distrito } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');
const router = express.Router();

router.get('/report', async (req, res) => {
  try {

    let provincias = await Provincia.findAll({
      include:[Departamento, Distrito]
    });
    console.log(provincias);

    const tableBody = [
      ['ID', 'Departamento','Provincia', 'Ubigeo'] // Encabezados de la tabla
    ];
    // Añadir los departamentos como filas
    provincias.forEach(provincia => {
      tableBody.push([provincia.id.toString(),provincia.Departamento.nombre, provincia.nombre, provincia.Departamento.valor+provincia.valor]);
    });

    console.log(tableBody);
    
    await enviarReporteTabla(res, {
      titulo: 'REPORTE DE PROVINCIAS',
      subtitulo: 'Lista de provincias',
      tableBody,
      columnWidths: ['auto', 'auto', 'auto','auto'],
    });
  } catch (error) {
    res.json(error);
  }
});

router.get('/total', async (req, res) => {
  try {
    const total = await Provincia.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
});

router.get('/', async (req, res) => {
  let provincias;
  try {
    provincias = await Provincia.findAll({
      include:[Departamento, Distrito]
    });
  } catch (error) {
    res.json(error);
  }
  //const provincias = await Provincia.findAll();
  res.json(provincias);
});

router.get('/:departamento_id', async (req, res) => {
  const { departamento_id } = req.params;
  let provincias;

 // console.log(departamento_id);
  try {
    provincias = await Provincia.findAll({
      include:[Departamento, Distrito],
      where: {
        departamento_id: departamento_id
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(provincias);
});
router.get('/provin/:id', async (req, res) => {
  const { id } = req.params;
  let provincias;

  try {
    provincias = await Provincia.findAll({
      include:[Departamento, Distrito],
      where: { id: id }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(provincias);
});


router.post('/', async (req, res) => {
  let provincia;
  try {
    provincia = await Provincia.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(provincia);
});

router.put('/:id', async (req, res) => {
  let provincia;
  try {
    provincia = await Provincia.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(provincia);
});

router.delete('/:id', async (req, res) => {
  let result;
  try {
    result = await Provincia.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(result);
});

module.exports = router;
