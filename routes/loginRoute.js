// routes/loginRoute.js
// Definición de rutas del recurso Login (la lógica vive en
// controllers/loginController.js). El orden de registro se mantiene
// idéntico al original para no alterar el enrutado de Express.
const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');
const autenticacion = require('../middlewares/autenticacion');

// Público: es el endpoint que devuelve el token.
router.post('/login', loginController.iniciarSesion);

// De aquí en adelante hace falta sesión. El registro también: si no, cualquiera
// podría crearse un usuario y obtener un token válido.
router.use(autenticacion);

router.get('/', loginController.listar);
router.get('/total', loginController.total);
router.post('/register', loginController.registrar);
router.get('/:id', loginController.listarPorId);
router.get('/dni/:dni', loginController.listarPorDni);
router.put('/:id', loginController.actualizar);
router.delete('/:id', loginController.eliminar);

module.exports = router;
