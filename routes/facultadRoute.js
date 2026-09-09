// routes/facultadRoute.js
// Definición de rutas del recurso Facultades (la lógica vive en
// controllers/facultadController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const facultadController = require('../controllers/facultadController');

router.get('/report', facultadController.reporte);
router.get('/total', facultadController.total);
router.get('/', facultadController.listar);
router.get('/getid/:id', facultadController.listarPorId);
router.get('/excel', facultadController.listarExcel);
router.post('/', facultadController.crear);
router.put('/:id', facultadController.actualizar);
router.delete('/:id', facultadController.eliminar);

module.exports = router;
