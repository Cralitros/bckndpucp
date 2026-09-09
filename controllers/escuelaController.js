// controllers/escuelaController.js
// Lógica de negocio del recurso Escuelas. Extraída tal cual de la ruta
// original (routes/escuelaRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const { Facultad, Escuela, Programas } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');

// GET /escuelas/report
async function reporte(req, res) {

  try {

    let general = await Escuela.findAll(
      {
        include: [Facultad, Programas]
      }
    );
    console.log(general);


    // Extrae los nombres de los campos del primer objeto y excluye 'createdAt' y 'updatedAt'
    const headers = Object.keys(general[0].dataValues).filter(
      (field) => field !== 'createdAt' && field !== 'updatedAt' && field !== 'Programas'
    );

    const columnWidths = Array.from({ length: headers.length }, () => 'auto');
    console.log(headers);

    // Convierte los nombres de campos en un array de encabezados
    const tableBody = [
      headers // Usamos los nombres de los campos como encabezados
    ];
    general.forEach(gen => {
      tableBody.push(headers.map(header => {
        // Si el header es 'Facultad' (que es un objeto), obtenemos el nombre
        if (header === 'Facultad') {
          return gen.dataValues.Facultad.nombre; // 'nombre' es el atributo deseado del objeto Facultad
        }
        return gen.dataValues[header];
      }));
    });



    await enviarReporteTabla(res, {
      titulo: 'REPORTE DE DEPARTAMENTO ACADÉMICO',
      subtitulo: 'Lista de departamento',
      tableBody,
      columnWidths,
    });
  } catch (error) {
    res.json(error);
  }
}

// GET /escuelas/total
async function total(req, res) {
  try {
    const total = await Escuela.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// GET /escuelas
async function listar(req, res) {
  let facultades;
  try {
    facultades = await Escuela.findAll(
      {
        include: [Facultad, Programas]
      }
    );
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
}

// GET /escuelas/:id
async function listarPorId(req, res) {
  let facultades;
  try {
    facultades = await Escuela.findAll(
      {
        include: [Facultad, Programas],
        where: { id: req.params.id }
      }
    );
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
}

// GET /escuelas/lista/:id
async function listarPorFacultad(req, res) {
  let facultades;
  try {
    facultades = await Escuela.findAll(
      {
        include: [Facultad, Programas],
        where: { idFacultad: req.params.id }
      }
    );
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
}

// POST /escuelas
async function crear(req, res) {
  let facultades;
  try {
    console.log(req.params);
    facultades = await Escuela.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
}

// PUT /escuelas/:id
async function actualizar(req, res) {
  let facultades;
  try {
    console.log(req.body);
    facultades = await Escuela.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(facultades);
}

// DELETE /escuelas/:id
async function eliminar(req, res) {
  let facultades;
  try {
    facultades = await Escuela.destroy({
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
  listarPorFacultad,
  crear,
  actualizar,
  eliminar,
};
