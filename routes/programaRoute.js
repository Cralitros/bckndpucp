// routes/programaRoute.js
// Definición de rutas del recurso Programas (la lógica vive en
// controllers/programaController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const programaController = require('../controllers/programaController');

router.get('/report', programaController.reporte);
router.get('/total', programaController.total);
router.get('/', programaController.listar);
router.get('/:id', programaController.listarPorId);
router.get('/lista/:id', programaController.listarPorIdEscuela);
router.post('/', programaController.crear);
router.put('/:id', programaController.actualizar);
router.delete('/:id', programaController.eliminar);

module.exports = router;
