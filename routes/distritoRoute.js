// routes/distritos.js
const express = require('express');

const { Departamento, Provincia, Distrito } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');
const router = express.Router();

router.get('/report', async (req, res) => {
  try {

    distritos = await Distrito.findAll({
      include:[{
        model: Provincia,
        include: {
          model: Departamento,
        }
      }]
    });
   // console.log(distritos);

    const tableBody = [
      ['ID', 'Provincia','Distrito', 'Ubigeo'] // Encabezados de la tabla
    ];
    // Añadir los departamentos como filas
    distritos.forEach(distrito => {
      tableBody.push([distrito.id.toString(),distrito.Provincium.nombre, distrito.nombre,  distrito.Provincium.Departamento.valor+distrito.Provincium.valor+distrito.valor]);
    });

   // console.log(tableBody);
    
    await enviarReporteTabla(res, {
      titulo: 'REPORTE DE DISTRITOS',
      subtitulo: 'Lista de DISTRITOS',
      tableBody,
      columnWidths: ['auto', 'auto', 'auto','auto'],
    });
  } catch (error) {
    res.json(error);
  }
});

router.get('/total', async (req, res) => {
  try {
    const total = await Distrito.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
});

router.get('/', async (req, res) => {
  let distritos;
  try {
    distritos = await Distrito.findAll({
      include:[{
        model: Provincia,
        include: {
          model: Departamento,
        }
      }]
    });
  } catch (error) {
    res.json(error);
  }
  res.json(distritos);
});


router.get('/:provincia_id', async (req, res) => {
  const { provincia_id } = req.params;
  let distritos;

  try {
    distritos = await Distrito.findAll({
      include:[{
        model: Provincia,
        include: {
          model: Departamento,
        }
      }],
      where: {
        provincia_id: provincia_id
      }
    });
    console.log(distritos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(distritos);
});

router.post('/', async (req, res) => {
  let distrito;
  try {
    distrito = await Distrito.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(distrito);
});

router.put('/:id', async (req, res) => {
  let distrito;
  try {
    distrito = await Distrito.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(distrito);
});

router.delete('/:id', async (req, res) => {
  let result;
  try {
    result = await Distrito.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(result);
});

module.exports = router;
