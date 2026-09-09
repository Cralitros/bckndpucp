// routes/afpRoute.js
// Definición de rutas del recurso AFP (la lógica vive en
// controllers/afpController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const afpController = require('../controllers/afpController');

router.get('/report', afpController.reporte);
router.get('/', afpController.listar);
router.get('/total', afpController.total);
router.post('/', afpController.crear);
router.put('/:id', afpController.actualizar);
router.delete('/:id', afpController.eliminar);

module.exports = router;
