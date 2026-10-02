// tools/smoke-documentos.js — Prueba de extremo a extremo de los endpoints del
// documento que sustenta un evento del histórico de categoría.
//
// Uso: node tools/smoke-documentos.js
//
// Monta el router real (`routes/docentesCategoriaRoute.js`) en un servidor
// temporal y habla por HTTP: subida por trozos, descarga, borrado, nombres con
// salto de carpeta, trozo vacío y trozo demasiado grande.
//
// No toca la base de datos (el router se importa, no se ejecuta `app.js`) y
// apunta DIR_DOCUMENTOS a una carpeta temporal, así que no toca los documentos
// reales.
const fs = require('fs');
const os = require('os');
const path = require('path');
const express = require('express');

const DIR = path.join(os.tmpdir(), 'prueba-documentos-categoria');
fs.rmSync(DIR, { recursive: true, force: true });
process.env.DIR_DOCUMENTOS = DIR;

// El router lee la carpeta al importarse: DIR_DOCUMENTOS ya está puesto.
const router = require('../routes/docentesCategoriaRoute');

const app = express();
app.use(express.json({ limit: '10mb' })); // igual que app.js
app.use('/docentescategoria', router);

const TROZO = 64 * 1024; // el mismo tamaño que manda el panel

const servidor = app.listen(0, async () => {
  const base = `http://127.0.0.1:${servidor.address().port}/docentescategoria`;
  const fallos = [];

  const comprobar = (nombre, condicion, detalle = '') => {
    console.log(`${condicion ? 'OK  ' : 'FALLA'} ${nombre}${detalle ? ' -> ' + detalle : ''}`);
    if (!condicion) {
      fallos.push(nombre);
    }
  };

  try {
    // "PDF" de 300 KB: 5 trozos de 64 KB.
    const original = Buffer.alloc(300 * 1024);
    for (let i = 0; i < original.length; i++) {
      original[i] = i % 251;
    }

    const archivo = 'cat-20201234-prueba.pdf';
    const total = Math.ceil(original.length / TROZO);

    // 1) Un trozo suelto que no es el primero: no se puede pegar sobre nada.
    let r = await fetch(`${base}/documento/${archivo}?indice=1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: original.subarray(0, TROZO),
    });
    comprobar('trozo sin el primero responde 409', r.status === 409, `estado ${r.status}`);

    // 2) Los trozos en orden, acumulando bytes.
    for (let i = 0; i < total; i++) {
      const parte = original.subarray(i * TROZO, Math.min((i + 1) * TROZO, original.length));
      r = await fetch(`${base}/documento/${archivo}?indice=${i}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: parte,
      });
      const cuerpo = await r.json();
      const esperado = Math.min((i + 1) * TROZO, original.length);

      comprobar(`trozo ${i} de ${total - 1} sube (200)`, r.status === 200, `estado ${r.status}`);
      comprobar(`trozo ${i} acumula bytes`, cuerpo.bytes === esperado, `bytes ${cuerpo.bytes}`);
    }

    // 3) Descarga completa, byte a byte.
    r = await fetch(`${base}/documento/${archivo}`);
    const descargado = Buffer.from(await r.arrayBuffer());
    comprobar(
      'descarga 200 con application/pdf',
      r.status === 200 && r.headers.get('content-type') === 'application/pdf',
      `${r.status} ${r.headers.get('content-type')}`
    );
    comprobar(
      'el archivo llega completo e idéntico',
      descargado.equals(original),
      `${descargado.length} de ${original.length} bytes`
    );

    // 4) Trozo por encima del límite del parser: 413 del propio Express.
    r = await fetch(`${base}/documento/${archivo}?indice=0`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: Buffer.alloc(200 * 1024),
    });
    comprobar('trozo de 200 KB responde 413', r.status === 413, `estado ${r.status}`);

    // 5) Nombre que intenta salir de la carpeta: 400.
    r = await fetch(`${base}/documento/..%2Ffuera.pdf?indice=0`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: Buffer.from('x'),
    });
    comprobar('nombre con ../ responde 400', r.status === 400, `estado ${r.status}`);

    // 6) Trozo vacío: 400.
    r = await fetch(`${base}/documento/${archivo}?indice=0`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: Buffer.alloc(0),
    });
    comprobar('trozo vacío responde 400', r.status === 400, `estado ${r.status}`);

    // 7) Borrado (y borrar dos veces no es un error).
    r = await fetch(`${base}/documento/${archivo}`, { method: 'DELETE' });
    comprobar('borrado 200', r.status === 200, `estado ${r.status}`);
    r = await fetch(`${base}/documento/${archivo}`, { method: 'DELETE' });
    comprobar('borrar dos veces no falla', r.status === 200, `estado ${r.status}`);
    r = await fetch(`${base}/documento/${archivo}`);
    comprobar('tras borrar responde 404', r.status === 404, `estado ${r.status}`);

    // 8) La carpeta queda con su .htaccess y sin documentos.
    comprobar('.htaccess creado en la carpeta', fs.existsSync(path.join(DIR, '.htaccess')));
    comprobar('la carpeta quedó sin archivos', fs.readdirSync(DIR).length === 1, fs.readdirSync(DIR).join(', '));
  } catch (error) {
    console.error('ERROR en la prueba:', error);
    fallos.push('excepción');
  } finally {
    console.log(fallos.length === 0 ? '\nTODO OK' : `\nFALLOS: ${fallos.join(' | ')}`);
    // Se cierran las conexiones y se sale en el siguiente tick: salir antes deja
    // a Express escribiendo el 413 y Node aborta con una aserción de libuv.
    servidor.closeAllConnections?.();
    servidor.close(() => setTimeout(() => process.exit(fallos.length === 0 ? 0 : 1), 100));
  }
});
