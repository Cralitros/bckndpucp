// routes/docentesRoute.js
// Definición de rutas del recurso Docentes (la lógica vive en
// controllers/docentesController.js). El ORDEN de registro es idéntico al
// original: rutas específicas (contrato*, total, report, cod) ANTES del
// catch-all /:codigodocentes.
const express = require('express');
const router = express.Router();

const docentesController = require('../controllers/docentesController');

//generar word
router.get('/contratow/:codigo', docentesController.generarWord);

//generar pdf
router.get('/contrato/:codigo/:codr', docentesController.generarContratoPdf);

//pdf contratados
router.get('/total', docentesController.total);

router.get('/contratocontra/:codigo/:codr', docentesController.generarContratoContratadoPdf);

router.get('/report', docentesController.reporte);

router.get('/', docentesController.listar);

router.get('/cod/:codigo', docentesController.listarPorCodigo);

router.get('/:codigodocentes', docentesController.listarPorCodigoDocente);

// Crear un nuevo condicion
router.post('/', docentesController.crear);

// Actualizar un condicion
router.put('/:codigodocentes', docentesController.actualizar);

// Eliminar un condicion
router.delete('/:codigodocentes', docentesController.eliminar);

module.exports = router;
