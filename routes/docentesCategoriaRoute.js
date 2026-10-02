// routes/docentesCategoriaRoute.js
// Definición de rutas del recurso DocenteCategorias (la lógica vive en
// controllers/docentesCategoriaController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const docentesCategoriaController = require('../controllers/docentesCategoriaController');
const documentosController = require('../controllers/docentesCategoriaDocumentoController');

// ---------------------------------------------------------------------------
// Documento que sustenta un evento del histórico.
//
// Se declaran antes de las rutas con parámetro y usan dos segmentos
// (`/documento/:archivo`), así que no chocan con `/:codigodocentes`.
//
// El cuerpo del trozo es binario y se lee con `express.raw`. El panel manda
// trozos de 64 KB y aquí se aceptan hasta 96 KB: ambos valores quedan por debajo
// del corte de ~100 KB que aplicaba el parser JSON por defecto, de modo que un
// trozo demasiado grande falla aquí con un 413 claro en vez de que la conexión
// se corte sin respuesta.
// ---------------------------------------------------------------------------
router.post(
  '/documento/:archivo',
  express.raw({ type: '*/*', limit: '96kb' }),
  documentosController.subirTrozo
);
router.get('/documento/:archivo', documentosController.descargar);
router.delete('/documento/:archivo', documentosController.eliminar);

router.get('/report', docentesCategoriaController.reporte);
router.get('/total', docentesCategoriaController.total);
router.get('/', docentesCategoriaController.listar);
router.get('/:codigodocentes', docentesCategoriaController.listarPorCodigoDocente);
router.post('/', docentesCategoriaController.crear);
router.put('/:codigodocentes', docentesCategoriaController.actualizar);
router.delete('/:id', docentesCategoriaController.eliminar);

module.exports = router;
