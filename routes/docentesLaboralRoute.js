// routes/docentesLaboralRoute.js
// Definición de rutas del recurso DocenteLaborales (la lógica vive en
// controllers/docentesLaboralController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const docentesLaboralController = require('../controllers/docentesLaboralController');

router.get('/report', docentesLaboralController.reporte);
router.get('/total', docentesLaboralController.total);
router.get('/', docentesLaboralController.listar);
router.get('/cod/:codigodocentes', docentesLaboralController.listarPorCodigoDocente);
router.post('/', docentesLaboralController.crear);
router.put('/:codigodocentes', docentesLaboralController.actualizar);
router.delete('/:id', docentesLaboralController.eliminar);

module.exports = router;
