// controllers/encuestaController.js
// Lógica de negocio del recurso Encuestas. Extraída tal cual de la ruta
// original (routes/encuestaRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const { Encuesta } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');

// GET /encuesta/report
async function reporte(req, res) {

  try {

    let general = await Encuesta.findAll();
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
      titulo: "REPORTE DE DOCENTE CATEGORIAS",
      subtitulo: "Lista de docentes por categoria",
      tableBody,
      columnWidths,
    });
  } catch (error) {
    res.json(error);
  }
}

// GET /encuesta/total
async function total(req, res) {
  try {
    const total = await Encuesta.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// GET /encuesta
async function listar(req, res) {
  let departamentos;
  try {
    departamentos = await Encuesta.findAll();
  } catch (error) {
    res.json(error);
  }
  res.json(departamentos);
}

// GET /encuesta/:id
async function listarPorCodigo(req, res) {
  let departamentos;
  try {
    departamentos = await Encuesta.findAll({
      where: { codigo: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(departamentos);
}

// POST /encuesta
async function crear(req, res) {
  let departamento;
  try {
    console.log(req.params);
    departamento = await Encuesta.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(departamento);
}

// PUT /encuesta/:id
async function actualizar(req, res) {
  let departamento;
  try {
    console.log(req.body);
    departamento = await Encuesta.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(departamento);
}

// DELETE /encuesta/:id
async function eliminar(req, res) {
  let result;
  try {
    result = await Encuesta.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(result);
}

module.exports = {
  reporte,
  total,
  listar,
  listarPorCodigo,
  crear,
  actualizar,
  eliminar,
};
