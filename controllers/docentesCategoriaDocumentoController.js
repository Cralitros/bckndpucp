// controllers/docentesCategoriaDocumentoController.js
// Documento que sustenta un evento del histórico de categoría.
//
// El hosting corta con 413 cualquier petición de más de 128 KB (mod_security),
// así que el archivo no puede viajar dentro del JSON de la columna `categoria`
// ni en una sola petición: el navegador lo manda en trozos binarios de 120 KB y
// aquí se van pegando en disco. En `categoria` sólo queda la referencia
// { nombre, tipo, tamano, archivo }.
//
//   POST   /docentescategoria/documento/:archivo?indice=N  → un trozo
//   GET    /docentescategoria/documento/:archivo           → el archivo
//   DELETE /docentescategoria/documento/:archivo           → lo borra
const fs = require('fs');
const path = require('path');
const config = require('../config');

/** Carpeta de los documentos (ver `documentosDir` en config/index.js). */
const DIR_DOCUMENTOS = config.documentosDir;

/** Tipos MIME por extensión. Los tres primeros se ven en el navegador. */
const TIPOS = {
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

/** Nombres que genera el panel: `cat-<codigo>-<marca>.<extension>`. */
const NOMBRE_VALIDO = /^[A-Za-z0-9][A-Za-z0-9._-]{0,120}$/;

/** La carpeta ya se comprobó en este proceso. */
let carpetaLista = false;

/**
 * Crea la carpeta de documentos y su `.htaccess` si aún no están.
 *
 * Se llama una sola vez por proceso. Si la carpeta acaba dentro del sitio web,
 * el `.htaccess` impide que los documentos se puedan abrir por URL.
 */
function asegurarCarpeta() {
  if (carpetaLista) {
    return;
  }

  fs.mkdirSync(DIR_DOCUMENTOS, { recursive: true });

  const htaccess = path.join(DIR_DOCUMENTOS, '.htaccess');
  if (!fs.existsSync(htaccess)) {
    fs.writeFileSync(
      htaccess,
      '# Documentos de docentes: los sirve la API, no el servidor web.\nRequire all denied\n'
    );
  }

  carpetaLista = true;
}

/**
 * Prepara la carpeta al arrancar la aplicación y deja constancia en el log.
 *
 * La llama `app.js`; si no se llamara, el primer trozo que se suba la crearía
 * igualmente (ver `asegurarCarpeta`).
 */
function prepararCarpeta() {
  try {
    asegurarCarpeta();
    console.log('Documentos de categoría en:', DIR_DOCUMENTOS);

    if (/[\\/]public_html[\\/]/i.test(DIR_DOCUMENTOS + path.sep)) {
      console.warn(
        'AVISO: la carpeta de documentos está dentro de public_html. ' +
        'Define DIR_DOCUMENTOS en el .env con una ruta fuera del sitio web.'
      );
    }
  } catch (error) {
    console.error('No se pudo preparar la carpeta de documentos:', DIR_DOCUMENTOS, '-', error.message);
  }
}

/**
 * Ruta absoluta del documento dentro de la carpeta.
 *
 * Devuelve `null` si el nombre no es de fiar (barras, `..`, otra extensión):
 * se comprueba el nombre Y que la ruta resuelta siga dentro de la carpeta, para
 * que nadie pueda leer o escribir fuera de ella.
 */
function rutaSegura(nombre) {
  if (typeof nombre !== 'string' || !NOMBRE_VALIDO.test(nombre) || nombre.includes('..')) {
    return null;
  }

  const destino = path.resolve(DIR_DOCUMENTOS, nombre);
  const base = path.resolve(DIR_DOCUMENTOS) + path.sep;

  return destino.startsWith(base) ? destino : null;
}

// POST /docentescategoria/documento/:archivo?indice=N
// El cuerpo es binario (`application/octet-stream`), se lee con `express.raw`
// en la ruta. `indice=0` crea (o reemplaza) el archivo; el resto añade al final.
async function subirTrozo(req, res) {
  const destino = rutaSegura(req.params.archivo);

  if (!destino) {
    return res.status(400).json({ mensaje: 'Nombre de documento no válido' });
  }

  if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
    return res.status(400).json({ mensaje: 'El trozo llegó vacío' });
  }

  const indice = Number(req.query.indice ?? 0);

  try {
    asegurarCarpeta();

    if (indice === 0) {
      fs.writeFileSync(destino, req.body);
    } else if (fs.existsSync(destino)) {
      fs.appendFileSync(destino, req.body);
    } else {
      return res.status(409).json({ mensaje: 'Se perdió el primer trozo: vuelve a adjuntar el archivo' });
    }

    res.json({ archivo: req.params.archivo, bytes: fs.statSync(destino).size });
  } catch (error) {
    console.error('Error al guardar un trozo del documento:', error);
    res.status(500).json({ mensaje: `No se pudo guardar el documento: ${error.message}` });
  }
}

// GET /docentescategoria/documento/:archivo
async function descargar(req, res) {
  const destino = rutaSegura(req.params.archivo);

  if (!destino || !fs.existsSync(destino)) {
    return res.status(404).json({ mensaje: 'El documento no está en el servidor' });
  }

  const tipo = TIPOS[path.extname(destino).toLowerCase()] || 'application/octet-stream';
  const seVeEnElNavegador = tipo === 'application/pdf' || tipo.startsWith('image/');

  res.setHeader('Content-Type', tipo);
  res.setHeader('Content-Length', fs.statSync(destino).size);
  res.setHeader(
    'Content-Disposition',
    `${seVeEnElNavegador ? 'inline' : 'attachment'}; filename="${req.params.archivo}"`
  );

  fs.createReadStream(destino).pipe(res);
}

// DELETE /docentescategoria/documento/:archivo
async function eliminar(req, res) {
  const destino = rutaSegura(req.params.archivo);

  if (!destino) {
    return res.status(400).json({ mensaje: 'Nombre de documento no válido' });
  }

  try {
    await fs.promises.unlink(destino);
    res.json({ eliminado: req.params.archivo });
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Ya no estaba: para quien lo pide, el resultado es el mismo.
      return res.json({ eliminado: null });
    }

    console.error('Error al borrar el documento:', error);
    res.status(500).json({ mensaje: 'No se pudo borrar el documento' });
  }
}

module.exports = {
  subirTrozo,
  descargar,
  eliminar,
  prepararCarpeta,
  // Se exporta para poder comprobar la carpeta desde las herramientas de `tools/`.
  DIR_DOCUMENTOS,
};
