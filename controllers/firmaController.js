// controllers/firmaController.js
// Lógica de negocio del recurso Firmas. Extraída tal cual de la ruta
// original (routes/firmaRoute.js) para no alterar ningún comportamiento:
// mismas consultas, mismas respuestas, mismos mensajes y códigos HTTP.
const { Firma, Login } = require('../models');

// GET /firma
async function listar(req, res) {
  try {
    const firmas = await Firma.findAll(
      {
        include: [{
          model: Login,
        }]
      }
    );
    res.json(firmas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /firma/total
async function total(req, res) {
  try {
    const total = await Firma.count();
    res.json({ total });
  } catch (error) {
    console.error('Error al contar AFPs:', error);
    res.status(500).json({ error: 'Error al obtener el total de AFPs' });
  }
}

// GET /firma/:id
async function listarPorId(req, res) {
  try {
    const idLogin = req.params.id;
    console.log(idLogin);


    const firma = await Firma.findAll(
      {
        where: { idLogin },
        include: [{
          model: Login,
        }]
      }
    );
    console.log(firma);
    res.json(firma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /firma/dni/:dni
async function listarPorDni(req, res) {
  try {
    const dni = req.params.dni;
    console.log(dni);
    console.log("********************");


    const firma = await Firma.findAll(
      {

        include: [{
          model: Login,
          attributes: ['dni', 'nombres', 'apellidos'], // solo campos específicos
          where: { dni },
        }]
      }
    );
    console.log(firma);
    res.json(firma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// POST /firma
async function crear(req, res) {
  let firmas;
  try {
    console.log(req.params);
    firmas = await Firma.create(req.body);
  } catch (error) {
    res.json(error);
  }
  res.json(firmas);
}

// PUT /firma/:id
async function actualizar(req, res) {
  let firmas;
  try {
    console.log(req.body);
    firmas = await Firma.update(req.body, {
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(firmas);
}

// DELETE /firma/:id
async function eliminar(req, res) {
  let firmas;
  try {
    firmas = await Firma.destroy({
      where: { id: req.params.id }
    });
  } catch (error) {
    res.json(error);
  }
  res.json(firmas);
}

module.exports = {
  listar,
  total,
  listarPorId,
  listarPorDni,
  crear,
  actualizar,
  eliminar,
};
