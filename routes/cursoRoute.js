// routes/cursoRoute.js
// Definición de rutas del recurso Cursos (la lógica vive en
// controllers/cursoController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const cursoController = require('../controllers/cursoController');

router.get('/report', cursoController.reporte);
router.get('/total', cursoController.total);
router.get('/', cursoController.listar);
router.get('/:codigo', cursoController.listarPorCodigo);
router.post('/', cursoController.crear);
router.put('/:codigo', cursoController.actualizar);
router.delete('/:codigo', cursoController.eliminar);

module.exports = router;
