// tools/asegurar-columnas.js — Añade las columnas que el modelo ya declara y la
// base de datos todavía no tiene.
//
// Uso:
//   node tools/asegurar-columnas.js
//   (o cPanel → Setup Node.js App → Run JS script → tools/asegurar-columnas.js)
//
// Es idempotente: si la columna ya existe, no hace nada. No borra ni modifica
// ninguna otra columna ni ningún dato.
//
// POR QUÉ HACE FALTA
// El backend arranca con DB_SYNC=none, así que añadir un campo al modelo NO crea
// la columna. Si el modelo la declara y la base no la tiene, cada INSERT/UPDATE
// falla con «Unknown column '...' in 'field list'» y el formulario no guarda nada
// (aunque el resto de pantallas sí funcione, porque son otras tablas).
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const DocenteInvestigador = require('../models/DocenteInvestigador');

/**
 * Columnas que deben existir, por tabla.
 *
 * Al añadir un campo nuevo al modelo, agrégalo también aquí: es el paso que
 * sustituye a `DB_SYNC=alter` (peligroso en producción).
 */
const COLUMNAS = {
  [DocenteInvestigador.getTableName()]: {
    fechaRegistro: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Fecha de registro del investigador (texto ISO)',
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Observaciones generales del investigador',
    },
  },
};

async function main() {
  let faltaron = false;

  for (const [tabla, columnas] of Object.entries(COLUMNAS)) {
    const existentes = await sequelize.getQueryInterface().describeTable(tabla);
    const pendientes = Object.entries(columnas).filter(([nombre]) => !existentes[nombre]);

    if (pendientes.length === 0) {
      console.log(`OK: ${tabla} ya tiene todas las columnas.`);
      continue;
    }

    for (const [nombre, definicion] of pendientes) {
      console.log(`Añadiendo ${tabla}.${nombre}...`);
      await sequelize.getQueryInterface().addColumn(tabla, nombre, definicion);
    }

    faltaron = true;
  }

  if (faltaron) {
    console.log('Listo: vuelve a guardar desde el panel.');
  }
}

main()
  .catch((error) => {
    console.error('No se pudieron asegurar las columnas:', error.message);
    process.exitCode = 1;
  })
  .finally(() => sequelize.close());
