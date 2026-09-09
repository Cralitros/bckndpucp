// routes/nacionalidadRoute.js
// Definición de rutas del recurso Nacionalidades (la lógica vive en
// controllers/nacionalidadController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const nacionalidadController = require('../controllers/nacionalidadController');

router.get('/report', nacionalidadController.reporte);
router.get('/', nacionalidadController.listar);
router.get('/total', nacionalidadController.total);
router.post('/', nacionalidadController.crear);
router.put('/:id', nacionalidadController.actualizar);
router.delete('/:id', nacionalidadController.eliminar);

module.exports = router;
