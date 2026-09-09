// routes/departamentos.js
const express = require('express');

const { Facultad, Escuela,Programas } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');
const router = express.Router();

router.get('/report', async (req, res) => {
  
  try {

    let general =  await Programas.findAll(
      {
        include:[{
          model: Escuela,
          include: {
            model: Facultad,
          }
        }]
      }
    );
    console.log(general);


    // Extrae los nombres de los campos del primer objeto y excluye 'createdAt' y 'updatedAt'
    const headers = Object.keys(general[0].dataValues).filter(
      (field) => field !== 'createdAt' && field !== 'updatedAt'&& field !== 'idEscuela'
    );
    headers.push('Facultad');

    const columnWidths = Array.from({ length: headers.length }, () => 'auto');
    console.log(headers);

    // Convierte los nombres de campos en un array de encabezados
    const tableBody = [
      headers // Usamos los nombres de los campos como encabezados
    ];
    general.forEach(gen => {
      tableBody.push(headers.map(header => {
        // Si el header es 'Facultad' (que es un objeto), obtenemos el nombre
        if (header === 'Escuela') {
          return gen.dataValues.Escuela.nombre; // 'nombre' es el atributo deseado del objeto Facultad
        }else if (header === 'Facultad') {
          return gen.dataValues.Escuela.Facultad.nombre; // 'nombre' es el atributo deseado del objeto Facultad
        }
        return gen.dataValues[header];
      }));
    });

   // console.log(tableBody);
    console.log("***************************");
    

    await enviarReporteTabla(res, {
      titulo: 'REPORTE DE ESCUELA Y PROGRAMAS',
      subtitulo: 'Lista de escuela y progranas',
      tableBody,
      columnWidths,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get('/total', async (req, res) => {
  try {
    const total = await Programas.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
});


router.get('/', async (req, res) => {
  let facultades;
  try {
    facultades = await Programas.findAll(
      {
        include:[{
          model: Escuela,
          include: {
            model: Facultad,
          }
        }]
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
    facultades = await Programas.findAll(
      {
        include:[{
          model: Escuela,
          include: {
            model: Facultad,
          }
        }],
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
  console.log("programa************************");
  
  console.log(req.params.id);
  
  try {
    facultades = await Programas.findAll(
      {
        include:[{
          model: Escuela,
          include: {
            model: Facultad,
          }
        }],
        where: { idEscuela: req.params.id }
      }
    );
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});



router.post('/', async (req, res) => {
  let facultades;
  console.log(req.body);
  
  try {
    console.log(req.params);
    facultades = await Programas.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});

router.put('/:id', async (req, res) => {
  let facultades;
  try {
    console.log(req.body);
    facultades = await Programas.update(req.body, {
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
    facultades = await Programas.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
});

module.exports = router;
