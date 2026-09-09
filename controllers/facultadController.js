// controllers/facultadController.js
// Lógica de negocio del recurso Facultades. Extraída tal cual de la ruta
// original (routes/facultadRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const { Facultad, Escuela, Programas } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');

// GET /facultad/report
async function reporte(req, res) {

  try {

    let general = await Facultad.findAll();
    console.log(general);


    // Extrae los nombres de los campos del primer objeto y excluye 'createdAt' y 'updatedAt'
    const headers = Object.keys(general[0].dataValues).filter(
      (field) => field !== 'createdAt' && field !== 'updatedAt'
    );

    const columnWidths = Array.from({ length: headers.length }, () => 'auto');
    console.log(headers);

    // Convierte los nombres de campos en un array de encabezados
    const tableBody = [
      headers // Usamos los nombres de los campos como encabezados
    ];
    general.forEach(gen => {
      tableBody.push(headers.map(header => gen.dataValues[header]));
    });



    await enviarReporteTabla(res, {
      titulo: 'REPORTE DE UNIDAD ACADÉMICA',
      subtitulo: 'Lista de unidad',
      tableBody,
      columnWidths,
    });
  } catch (error) {
    res.json(error);
  }
}

// GET /facultad/total
async function total(req, res) {
  try {
    const total = await Facultad.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// GET /facultad
async function listar(req, res) {
  let facultades;
  try {
    facultades = await Facultad.findAll(
      {
        include: [{
          model: Escuela,
          include: {
            model: Programas,
          }
        }]
      }
    );
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
}

// GET /facultad/getid/:id
async function listarPorId(req, res) {
  let facultades;
  try {
    facultades = await Facultad.findAll(
      {
        where: { id: req.params.id },
        include: [{
          model: Escuela,
          include: {
            model: Programas,
          }
        }]
      }
    );
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
}

// GET /facultad/excel
async function listarExcel(req, res) {
  let facultades;
  try {
    facultades = await Facultad.findAll();
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
}

// POST /facultad
async function crear(req, res) {
  let facultades;
  try {
    console.log(req.params);
    facultades = await Facultad.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
}

// PUT /facultad/:id
async function actualizar(req, res) {
  let facultades;
  try {
    console.log(req.body);
    facultades = await Facultad.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
}

// DELETE /facultad/:id
async function eliminar(req, res) {
  let facultades;
  try {
    facultades = await Facultad.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
}

module.exports = {
  reporte,
  total,
  listar,
  listarPorId,
  listarExcel,
  crear,
  actualizar,
  eliminar,
};
