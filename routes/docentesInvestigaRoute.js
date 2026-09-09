// routes/docentesInvestigaRoute.js
// Definición de rutas del recurso DocenteInvestigadores (la lógica vive en
// controllers/docentesInvestigaController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const docentesInvestigaController = require('../controllers/docentesInvestigaController');

router.get('/report', docentesInvestigaController.reporte);
router.get('/total', docentesInvestigaController.total);
router.get('/', docentesInvestigaController.listar);
router.get('/cod/:codigodocentes', docentesInvestigaController.listarPorCodigoDocente);
router.post('/', docentesInvestigaController.crear);
router.put('/:codigodocentes', docentesInvestigaController.actualizar);
router.delete('/:id', docentesInvestigaController.eliminar);

module.exports = router;
