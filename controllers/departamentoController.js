// controllers/departamentoController.js
// Lógica de negocio del recurso Departamentos. Extraída tal cual de la ruta
// original (routes/departamentoRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const { Departamento, Provincia, Distrito } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');

// GET /departamentos/report
async function reporte(req, res) {
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
}

// GET /departamentos/total
async function total(req, res) {
  try {
    const total = await Departamento.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// GET /departamentos
async function listar(req, res) {
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
}

// POST /departamentos
async function crear(req, res) {
  let departamento;
  try {
    // console.log(req.params);
    departamento = await Departamento.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(departamento);
}

// PUT /departamentos/:id
async function actualizar(req, res) {
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
}

// DELETE /departamentos/:id
async function eliminar(req, res) {
  let result;
  try {
    result = await Departamento.destroy({
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
  crear,
  actualizar,
  eliminar,
};
