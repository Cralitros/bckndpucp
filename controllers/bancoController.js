// controllers/bancoController.js
// Lógica de negocio del recurso Bancos. Extraída tal cual de la ruta
// original (routes/bancoRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const Banco = require('../models/Banco');
const { enviarReporteTabla } = require('../pdf/reportesTabla');

// GET /report
async function reporte(req, res) {
  try {

    let bancos = await Banco.findAll();
    console.log(bancos);

    const tableBody = [
      ['ID', 'Nombre'] // Encabezados de la tabla
    ];

    // Añadir los departamentos como filas
    bancos.forEach(banco => {
      tableBody.push([banco.id.toString(), banco.nombre]);
    });

    await enviarReporteTabla(res, {
      titulo: 'REPORTE DE BANCOS',
      subtitulo: 'Lista de Bancos',
      tableBody,
      columnWidths: ['auto', 'auto'],
    });
  } catch (error) {
    res.json(error);
  }
}

// GET /
async function listar(req, res) {
  let bancos;
  try {
    bancos = await Banco.findAll(  );
  } catch (error) {
    res.json(error);
  }
  res.json(bancos);
}

// GET /total
async function total(req, res) {
  try {
    const total = await Banco.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// POST /
async function crear(req, res) {
  let bancos;
  try {
    console.log(req.params);
    bancos = await Banco.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(bancos);
}

// PUT /:id
async function actualizar(req, res) {
  let bancos;
  try {
    console.log(req.body);
    bancos = await Banco.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(bancos);
}

// DELETE /:id
async function eliminar(req, res) {
  let bancos;
  try {
    bancos = await Banco.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(bancos);
}

module.exports = {
  reporte,
  listar,
  total,
  crear,
  actualizar,
  eliminar,
};
