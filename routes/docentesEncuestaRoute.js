// routes/docentesEncuestaRoute.js
// Definición de rutas del recurso Docentes-Encuesta (la lógica vive en
// controllers/docentesEncuestaController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const docentesEncuestaController = require('../controllers/docentesEncuestaController');

router.get('/report', docentesEncuestaController.reporte);
router.get('/total', docentesEncuestaController.total);
router.get('/', docentesEncuestaController.listar);
router.get('/docente/:codigoDocente', docentesEncuestaController.listarPorCodigoDocente);
router.get('/encuesta/:id', docentesEncuestaController.listarPorEncuesta);
router.post('/', docentesEncuestaController.crear);
router.put('/docente/:codigodocentes', docentesEncuestaController.actualizarPorDocente);
router.put('/encuesta/:codigoCurso', docentesEncuestaController.actualizarPorEncuesta);
router.delete('/:id', docentesEncuestaController.eliminar);

module.exports = router;
