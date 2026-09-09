// controllers/docentesEncuestaController.js
// Lógica de negocio del recurso Docentes-Encuesta. Extraída tal cual de la ruta
// original (routes/docentesEncuestaRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
// ADVERTENCIA: se conservan tal cual los bugs preexistentes de la ruta original
// (uso de `Encuesta` sin importar, uso de `DocenteCurso` en vez de la entidad
// DocenteEncuesta, etc.).
const { Docente, DocenteCurso, DocenteEncuesta } = require('../models');
const { enviarReporteTabla } = require('../pdf/reportesTabla');

// GET /report
async function reporte(req, res) {
    try {

      let general = await DocenteEncuesta.findAll();
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

// GET /total
async function total(req, res) {
  try {
    const total = await Encuesta.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// GET /
async function listar(req, res) {
    try {
        const docenteLaborales = await Encuesta.findAll(
            { include: [Docente] }
        );
        res.json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /docente/:codigoDocente
async function listarPorCodigoDocente(req, res) {
    try {
        const codigoDocente = req.params.codigoDocente;
        const docenteLaborales = await Encuesta.findAll(
            {
                include: [Docente],
                where: { codigoDocente },
            }
        );
        res.json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /encuesta/:id
async function listarPorEncuesta(req, res) {
    try {
        const id = req.params.id;
        const Encuesta = await Encuesta.findAll(
            {
                include: [Docente],
                where: { id },
            }
        );
        res.json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// POST /
async function crear(req, res) {
    try {
        const docenteLaborales = await DocenteCurso.create(req.body);
        res.status(201).json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /docente/:codigodocentes
async function actualizarPorDocente(req, res) {
    try {
        const codigoDocente = req.params.codigoDocente;
        // Actualizar el registro de departamento en la base de datos
        await DocenteCurso.update(req.body, {
            where: { codigoDocente },
        });

        res.status(201).json("Se actualizo correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar' });
    }
}

// PUT /encuesta/:codigoCurso
async function actualizarPorEncuesta(req, res) {
    try {
        const id = req.params.id;
        // Actualizar el registro de departamento en la base de datos
        await DocenteCurso.update(req.body, {
            where: { id },
        });

        res.status(201).json("Se actualizo correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar' });
    }
}

// DELETE /:id
async function eliminar(req, res) {
    try {
        const id = req.params.id;
        // Eliminar el registro de departamento de la base de datos
        await DocenteCurso.destroy({
            where: { id },
        });

        res.status(200).json({ mensaje: 'Registro eliminado' });;
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar' });
    }
}

module.exports = {
  reporte,
  total,
  listar,
  listarPorCodigoDocente,
  listarPorEncuesta,
  crear,
  actualizarPorDocente,
  actualizarPorEncuesta,
  eliminar,
};
