// controllers/condicionController.js
// Lógica de negocio del recurso Condición. Extraída tal cual de la ruta
// original (routes/condicionRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const { Condicion } = require('../models');

// GET /
async function listar(req, res) {
    let condiciones;
    try {
        condiciones = await Condicion.findAll();
        res.json(condiciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /total
async function total(req, res) {
  try {
    const total = await Condicion.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// GET /:id
async function listarPorId(req, res) {
    try {
        const id = req.params.id;
        const condiciones = await Condicion.findAll(
            {
                where: { id },
            }
        );
        res.json(condiciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// POST /
async function crear(req, res) {
    try {
        const condiciones = await Condicion.create(req.body);
        res.status(201).json(condiciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// PUT /:id
async function actualizar(req, res) {
    try {
        const id = req.params.id;
        // Actualizar el registro de departamento en la base de datos
        await Condicion.update(req.body, {
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
        await Condicion.destroy({
            where: { id },
        });

        res.status(200).json({ mensaje: 'Registro eliminado' });;
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar' });
    }
}

module.exports = {
  listar,
  total,
  listarPorId,
  crear,
  actualizar,
  eliminar,
};
