// routes/docentesInfoRoute.js
// Definición de rutas del recurso Docentes-Info (la lógica vive en
// controllers/docentesInfoController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const docentesInfoController = require('../controllers/docentesInfoController');

router.get('/total', docentesInfoController.total);
router.get('/', docentesInfoController.listar);
router.get('/cod/:codigodocentes', docentesInfoController.listarPorCodigo);
router.post('/', docentesInfoController.crear);
router.put('/:codigodocentes', docentesInfoController.actualizar);
router.delete('/:id', docentesInfoController.eliminar);

module.exports = router;
