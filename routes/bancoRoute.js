// routes/bancoRoute.js
// Definición de rutas del recurso Bancos (la lógica vive en
// controllers/bancoController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const bancoController = require('../controllers/bancoController');

router.get('/report', bancoController.reporte);
router.get('/', bancoController.listar);
router.get('/total', bancoController.total);
router.post('/', bancoController.crear);
router.put('/:id', bancoController.actualizar);
router.delete('/:id', bancoController.eliminar);

module.exports = router;
