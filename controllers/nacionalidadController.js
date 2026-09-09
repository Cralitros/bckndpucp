// controllers/nacionalidadController.js
// Lógica de negocio del recurso Nacionalidades. Extraída tal cual de la ruta
// original (routes/nacionalidadRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const Nacionalidad = require('../models/Nacionalidad');
const { enviarReporteTabla } = require('../pdf/reportesTabla');

// GET /report
async function reporte(req, res) {
  try {

    let nacionalidades = await Nacionalidad.findAll();
    console.log(nacionalidades);

    const tableBody = [
      ['ID', 'Nombre'] // Encabezados de la tabla
    ];

    // Añadir los departamentos como filas
    nacionalidades.forEach(nacionalidad => {
      tableBody.push([nacionalidad.id.toString(), nacionalidad.nombre]);
    });

    await enviarReporteTabla(res, {
      titulo: 'REPORTE DE NACIONALIDADES',
      subtitulo: 'Lista de nacionalidades',
      tableBody,
      columnWidths: ['auto', 'auto'],
    });
  } catch (error) {
    res.json(error);
  }
}

// GET /
async function listar(req, res) {
  let nacionalidad;
  try {
    nacionalidad = await Nacionalidad.findAll(  );
  } catch (error) {
    res.json(error);
  }
  res.json(nacionalidad);
}

// GET /total
async function total(req, res) {
  try {
    const total = await Nacionalidad.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// POST /
async function crear(req, res) {
  let nacionalidad;
  try {
    console.log(req.params);
    nacionalidad = await Nacionalidad.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(nacionalidad);
}

// PUT /:id
async function actualizar(req, res) {
  let nacionalidad;
  try {
    console.log(req.body);
    nacionalidad = await Nacionalidad.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(nacionalidad);
}

// DELETE /:id
async function eliminar(req, res) {
  let nacionalidad;
  try {
    nacionalidad = await Nacionalidad.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(nacionalidad);
}

module.exports = {
  reporte,
  listar,
  total,
  crear,
  actualizar,
  eliminar,
};
