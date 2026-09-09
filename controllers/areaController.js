// controllers/areaController.js
// Lógica de negocio del recurso Areas. Extraída tal cual de la ruta
// original (routes/areaRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const Area = require('../models/Area');
const { enviarReporteTabla } = require('../pdf/reportesTabla');

// GET /report
async function reporte(req, res) {
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
}

// GET /
async function listar(req, res) {
  let areas;
  try {
    areas = await Area.findAll(  );
  } catch (error) {
    res.json(error);
  }
  res.json(areas);
}

// GET /total
async function total(req, res) {
  try {
    const total = await Area.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// POST /
async function crear(req, res) {
  let areas;
  try {
    console.log(req.params);
    areas = await Area.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(areas);
}

// PUT /:id
async function actualizar(req, res) {
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
}

// DELETE /:id
async function eliminar(req, res) {
  let areas;
  try {
    areas = await Area.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(areas);
}

module.exports = {
  reporte,
  listar,
  total,
  crear,
  actualizar,
  eliminar,
};
