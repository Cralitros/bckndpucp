// routes/firmaRoute.js
// Definición de rutas del recurso Firmas (la lógica vive en
// controllers/firmaController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const firmaController = require('../controllers/firmaController');

router.get('/', firmaController.listar);
router.get('/total', firmaController.total);
router.get('/:id', firmaController.listarPorId);
router.get('/dni/:dni', firmaController.listarPorDni);
router.post('/', firmaController.crear);
router.put('/:id', firmaController.actualizar);
router.delete('/:id', firmaController.eliminar);

module.exports = router;
