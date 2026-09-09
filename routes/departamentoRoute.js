// routes/departamentoRoute.js
// Definición de rutas del recurso Departamentos (la lógica vive en
// controllers/departamentoController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const departamentoController = require('../controllers/departamentoController');

router.get('/report', departamentoController.reporte);
router.get('/total', departamentoController.total);
router.get('/', departamentoController.listar);
router.post('/', departamentoController.crear);
router.put('/:id', departamentoController.actualizar);
router.delete('/:id', departamentoController.eliminar);

module.exports = router;
