// routes/condicionRoute.js
// Definición de rutas del recurso Condición (la lógica vive en
// controllers/condicionController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const condicionController = require('../controllers/condicionController');

router.get('/', condicionController.listar);
router.get('/total', condicionController.total);
router.get('/:id', condicionController.listarPorId);
router.post('/', condicionController.crear);
router.put('/:id', condicionController.actualizar);
router.delete('/:id', condicionController.eliminar);

module.exports = router;
