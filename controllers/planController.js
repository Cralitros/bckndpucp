// controllers/planController.js
// Lógica de negocio del recurso Plan. Extraída tal cual de la ruta
// original (routes/planRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const Plan = require('../models/Plan');
const { enviarReporteTabla } = require('../pdf/reportesTabla');

// GET /plan/report
async function reporte(req, res) {
  try {

    let general = await Plan.findAll();
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
      titulo: 'REPORTE DE PLAN ACADËMICO',
      subtitulo: 'Lista de plan',
      tableBody,
      columnWidths,
    });
  } catch (error) {
    res.json(error);
  }
}

// GET /plan/total
async function total(req, res) {
  try {
    const total = await Plan.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// GET /plan
async function listar(req, res) {
  let planes;
  try {
    planes = await Plan.findAll(  );
  } catch (error) {
    res.json(error);
  }
  res.json(planes);
}

// POST /plan
async function crear(req, res) {
  let planes;
  try {
    console.log(req.params);
    planes = await Plan.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(planes);
}

// PUT /plan/:id
async function actualizar(req, res) {
  let planes;
  try {
    console.log(req.body);
    planes = await Plan.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(planes);
}

// DELETE /plan/:id
async function eliminar(req, res) {
  let planes;
  try {
    planes = await Plan.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(planes);
}

module.exports = {
  reporte,
  total,
  listar,
  crear,
  actualizar,
  eliminar,
};
