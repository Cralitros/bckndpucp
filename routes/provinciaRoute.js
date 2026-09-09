// routes/provinciaRoute.js
// Definición de rutas del recurso Provincias (la lógica vive en
// controllers/provinciaController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const provinciaController = require('../controllers/provinciaController');

router.get('/report', provinciaController.reporte);
router.get('/total', provinciaController.total);
router.get('/', provinciaController.listar);
router.get('/:departamento_id', provinciaController.listarPorDepartamento);
router.get('/provin/:id', provinciaController.listarPorId);
router.post('/', provinciaController.crear);
router.put('/:id', provinciaController.actualizar);
router.delete('/:id', provinciaController.eliminar);

module.exports = router;
