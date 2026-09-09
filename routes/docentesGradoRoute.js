// routes/docentesGradoRoute.js
// Definición de rutas del recurso DocenteGrados (la lógica vive en
// controllers/docentesGradoController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const docentesGradoController = require('../controllers/docentesGradoController');

router.get('/report', docentesGradoController.reporte);
router.get('/total', docentesGradoController.total);
router.get('/', docentesGradoController.listar);
router.get('/:codigodocentes', docentesGradoController.listarPorCodigoDocente);
router.post('/', docentesGradoController.crear);
router.put('/:codigodocentes', docentesGradoController.actualizar);
router.delete('/:id', docentesGradoController.eliminar);

module.exports = router;
