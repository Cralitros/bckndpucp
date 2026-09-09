// routes/planRoute.js
// Definición de rutas del recurso Plan (la lógica vive en
// controllers/planController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const planController = require('../controllers/planController');

router.get('/report', planController.reporte);
router.get('/total', planController.total);
router.get('/', planController.listar);
router.post('/', planController.crear);
router.put('/:id', planController.actualizar);
router.delete('/:id', planController.eliminar);

module.exports = router;
