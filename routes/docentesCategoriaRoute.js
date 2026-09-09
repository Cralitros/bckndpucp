// routes/docentesCategoriaRoute.js
// Definición de rutas del recurso DocenteCategorias (la lógica vive en
// controllers/docentesCategoriaController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const docentesCategoriaController = require('../controllers/docentesCategoriaController');

router.get('/report', docentesCategoriaController.reporte);
router.get('/total', docentesCategoriaController.total);
router.get('/', docentesCategoriaController.listar);
router.get('/:codigodocentes', docentesCategoriaController.listarPorCodigoDocente);
router.post('/', docentesCategoriaController.crear);
router.put('/:codigodocentes', docentesCategoriaController.actualizar);
router.delete('/:id', docentesCategoriaController.eliminar);

module.exports = router;
