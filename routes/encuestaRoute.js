// routes/encuestaRoute.js
// Definición de rutas del recurso Encuestas (la lógica vive en
// controllers/encuestaController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const encuestaController = require('../controllers/encuestaController');

router.get('/report', encuestaController.reporte);
router.get('/total', encuestaController.total);
router.get('/', encuestaController.listar);
router.get('/:id', encuestaController.listarPorCodigo);
router.post('/', encuestaController.crear);
router.put('/:id', encuestaController.actualizar);
router.delete('/:id', encuestaController.eliminar);

module.exports = router;
