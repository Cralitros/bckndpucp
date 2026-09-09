// routes/distritoRoute.js
// Definición de rutas del recurso Distritos (la lógica vive en
// controllers/distritoController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const distritoController = require('../controllers/distritoController');

router.get('/report', distritoController.reporte);
router.get('/total', distritoController.total);
router.get('/', distritoController.listar);
router.get('/:provincia_id', distritoController.listarPorProvincia);
router.post('/', distritoController.crear);
router.put('/:id', distritoController.actualizar);
router.delete('/:id', distritoController.eliminar);

module.exports = router;
