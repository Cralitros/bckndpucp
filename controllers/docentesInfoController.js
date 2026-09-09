// controllers/docentesInfoController.js
// Lógica de negocio del recurso Docentes-Info. Extraída tal cual de la ruta
// original (routes/docentesInfoRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const { Docente, DocenteInfo } = require('../models');

// GET /total
async function total(req, res) {
  try {
    const total = await DocenteInfo.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// GET /
async function listar(req, res) {
    try {
        const docenteLaborales = await DocenteInfo.findAll(
            { include: [Docente] }
        );
        res.json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /cod/:codigodocentes
async function listarPorCodigo(req, res) {
    try {
        const codigodocente = req.params.codigodocentes;
        const docenteLaborales = await DocenteInfo.findAll(
            {
                include: [Docente],
                where: { codigodocente },
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
        const docenteLaborales = await DocenteInfo.create(req.body);
        res.status(201).json(docenteLaborales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /:codigodocentes
async function actualizar(req, res) {
    try {
        const codigodocente = req.params.codigodocentes;
        // Actualizar el registro de departamento en la base de datos
        await DocenteInfo.update(req.body, {
            where: { codigodocente },
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
        await DocenteInfo.destroy({
            where: { id },
        });

        res.status(200).json({ mensaje: 'Registro eliminado' });;
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar' });
    }
}

module.exports = {
  total,
  listar,
  listarPorCodigo,
  crear,
  actualizar,
  eliminar,
};
