// routes/areaRoute.js
// Definición de rutas del recurso Areas (la lógica vive en
// controllers/areaController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const areaController = require('../controllers/areaController');

router.get('/report', areaController.reporte);
router.get('/', areaController.listar);
router.get('/total', areaController.total);
router.post('/', areaController.crear);
router.put('/:id', areaController.actualizar);
router.delete('/:id', areaController.eliminar);

module.exports = router;
