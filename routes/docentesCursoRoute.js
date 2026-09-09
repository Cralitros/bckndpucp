// routes/docentesCursoRoute.js
// Definición de rutas del recurso Docentes-Curso (la lógica vive en
// controllers/docentesCursoController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const docentesCursoController = require('../controllers/docentesCursoController');

router.get('/report', docentesCursoController.reporte);
router.get('/total', docentesCursoController.total);
router.get('/', docentesCursoController.listar);
router.get('/docente/:codigoDocente', docentesCursoController.listarPorCodigoDocente);
router.get('/curso/:codigoCurso', docentesCursoController.listarPorCodigoCurso);
router.post('/', docentesCursoController.crear);
router.put('/docente/:codigodocentes', docentesCursoController.actualizarPorDocente);
router.put('/:codigoCurso', docentesCursoController.actualizar);
router.delete('/:id', docentesCursoController.eliminar);

module.exports = router;
