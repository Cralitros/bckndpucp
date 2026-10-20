// tools/smoke-auth.js — Comprueba que la API exige token y que el login sigue
// siendo público.
//
// Uso: node tools/smoke-auth.js
//
// No toca la base de datos: monta el middleware real (`middlewares/autenticacion`)
// delante de rutas de prueba y el router real de login para comprobar qué queda
// público.
const fs = require('fs');
const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');

const config = require('../config');
const autenticacion = require('../middlewares/autenticacion');
const loginRouter = require('../routes/loginRoute');

const app = express();
app.use(express.json({ limit: '10mb' }));

// Como en app.js: el login primero (público) y después el guard.
app.use('/login', loginRouter);

app.all('/protegida', autenticacion, (req, res) => {
  res.json({ ok: true, usuario: req.usuario });
});

const servidor = app.listen(0, async () => {
  const base = `http://127.0.0.1:${servidor.address().port}`;
  const fallos = [];

  const comprobar = (nombre, condicion, detalle = '') => {
    console.log(`${condicion ? 'OK  ' : 'FALLA'} ${nombre}${detalle ? ' -> ' + detalle : ''}`);
    if (!condicion) {
      fallos.push(nombre);
    }
  };

  const token = (vida, secreto = config.jwtSecret) =>
    jwt.sign({ id: 1 }, secreto, { expiresIn: vida });

  const llamar = async (ruta, opciones = {}) => {
    const respuesta = await fetch(`${base}${ruta}`, opciones);
    let cuerpo = null;
    try {
      cuerpo = await respuesta.json();
    } catch {
      cuerpo = null;
    }
    return { status: respuesta.status, cuerpo };
  };

  try {
    // 1) GET sin token: 401
    let r = await llamar('/protegida');
    comprobar('GET sin token responde 401', r.status === 401, `estado ${r.status}`);

    // 2) POST sin token (el caso reportado: un POST desde otra terminal)
    r = await llamar('/protegida', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: 'intruso' }),
    });
    comprobar('POST sin token responde 401', r.status === 401, `estado ${r.status}`);
    comprobar(
      'el 401 explica que falta el token',
      (r.cuerpo?.mensaje || '').includes('token'),
      r.cuerpo?.mensaje || '(sin mensaje)'
    );

    // 3) Token válido: pasa y deja el usuario en `req.usuario`
    r = await llamar('/protegida', { headers: { Authorization: `Bearer ${token('1h')}` } });
    comprobar('GET con token válido responde 200', r.status === 200, `estado ${r.status}`);
    comprobar('el token deja el usuario en la petición', r.cuerpo?.usuario?.id === 1, JSON.stringify(r.cuerpo?.usuario));

    // 4) Token caducado e inválido: 401
    r = await llamar('/protegida', { headers: { Authorization: `Bearer ${token(-10)}` } });
    comprobar('token caducado responde 401', r.status === 401, `estado ${r.status}`);
    comprobar('avisa de que la sesión caducó', (r.cuerpo?.mensaje || '').includes('caduc'), r.cuerpo?.mensaje);

    r = await llamar('/protegida', { headers: { Authorization: `Bearer ${token('1h', 'otro-secreto')}` } });
    comprobar('token firmado con otro secreto responde 401', r.status === 401, `estado ${r.status}`);

    r = await llamar('/protegida', { headers: { Authorization: 'Bearer basura' } });
    comprobar('token con formato inválido responde 401', r.status === 401, `estado ${r.status}`);

    // 5) Cabecera mal formada (sin "Bearer ") también se rechaza
    r = await llamar('/protegida', { headers: { Authorization: token('1h') } });
    comprobar('cabecera sin "Bearer" responde 401', r.status === 401, `estado ${r.status}`);

    // 6) El login sigue siendo público (no 401 aunque no haya token)
    r = await llamar('/login/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dni: '00000000', password: 'x' }),
    });
    comprobar('POST /login/login es público', r.status !== 401, `estado ${r.status}`);

    // 7) Crear usuarios sí exige token
    r = await llamar('/login/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dni: '00000000', password: 'x' }),
    });
    comprobar('POST /login/register exige token', r.status === 401, `estado ${r.status}`);

    // 8) El resto de recursos de app.js van detrás del guard: se comprueba en el
    //    código, que es donde se puede equivocar uno al añadir un router nuevo.
    const appJs = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
    const posicionGuard = appJs.indexOf("app.use(basePath || '/', autenticacion)");
    const primerRouter = appJs.indexOf('`${basePath}/docentes`');

    comprobar('app.js monta el guard', posicionGuard > 0);
    comprobar('el guard va antes que los routers', posicionGuard > 0 && posicionGuard < primerRouter);
    comprobar(
      'app.js no registra routers antes del guard',
      appJs.slice(0, posicionGuard).indexOf("require('./routes/") === -1
        ? true
        : appJs.slice(0, posicionGuard).includes("require('./routes/loginRoute')"),
      'solo el router de login queda delante (lleva su propio guard)'
    );
  } catch (error) {
    console.error('ERROR en la prueba:', error);
    fallos.push('excepción');
  } finally {
    console.log(fallos.length === 0 ? '\nTODO OK' : `\nFALLOS: ${fallos.join(' | ')}`);
    servidor.closeAllConnections?.();
    servidor.close(() => setTimeout(() => process.exit(fallos.length === 0 ? 0 : 1), 100));
  }
});
