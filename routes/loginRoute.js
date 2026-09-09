// routes/loginRoute.js
// Definición de rutas del recurso Login (la lógica vive en
// controllers/loginController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.get('/', loginController.listar);
router.get('/total', loginController.total);
router.get('/:id', loginController.listarPorId);
router.get('/dni/:dni', loginController.listarPorDni);
router.post('/register', loginController.registrar);
router.post('/login', loginController.iniciarSesion);
router.put('/:id', loginController.actualizar);
router.delete('/:id', loginController.eliminar);

module.exports = router;
