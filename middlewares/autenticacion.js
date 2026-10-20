// middlewares/autenticacion.js
// Exige el token JWT que emite `POST /login/login`.
//
// El panel lo manda en la cabecera `Authorization: Bearer <token>`. Sin esto,
// cualquier cliente que conociera la URL podía leer y escribir en la API sin
// haberse autenticado (bastaba un POST desde otra terminal).
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Corta la petición con 401 si no hay un token válido.
 *
 * Deja el contenido del token en `req.usuario` (`{ id, iat, exp }`) por si algún
 * controlador necesita saber quién llama.
 */
function autenticacion(req, res, next) {
  const cabecera = req.headers.authorization || '';
  const token = cabecera.startsWith('Bearer ') ? cabecera.slice(7).trim() : '';

  if (!token) {
    return res.status(401).json({ mensaje: 'Falta el token de sesión' });
  }

  try {
    req.usuario = jwt.verify(token, config.jwtSecret);
    next();
  } catch (error) {
    const caducado = error.name === 'TokenExpiredError';

    res.status(401).json({
      mensaje: caducado
        ? 'La sesión caducó: vuelve a iniciar sesión'
        : 'Token no válido',
    });
  }
}

module.exports = autenticacion;
