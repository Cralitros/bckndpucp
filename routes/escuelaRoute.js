// routes/escuelaRoute.js
// Definición de rutas del recurso Escuelas (la lógica vive en
// controllers/escuelaController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const escuelaController = require('../controllers/escuelaController');

router.get('/report', escuelaController.reporte);
router.get('/total', escuelaController.total);
router.get('/', escuelaController.listar);
router.get('/:id', escuelaController.listarPorId);
router.get('/lista/:id', escuelaController.listarPorFacultad);
router.post('/', escuelaController.crear);
router.put('/:id', escuelaController.actualizar);
router.delete('/:id', escuelaController.eliminar);

module.exports = router;
