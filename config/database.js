// config/database.js
// Conexión a MySQL vía Sequelize. Lee la configuración desde variables de
// entorno (archivo .env). Los valores por defecto reproducen la configuración
// local original (pucp / root / sin contraseña) para no romper nada.
require('dotenv').config({ quiet: true });

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'pucp',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    // Por defecto se loguea SQL a consola (comportamiento original de Sequelize);
    // con DB_LOGGING=false se silencia.
    logging: process.env.DB_LOGGING === 'false' ? false : console.log,
  }
);

module.exports = sequelize;
